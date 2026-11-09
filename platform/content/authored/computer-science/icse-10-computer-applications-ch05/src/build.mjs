// Build ICSE 10 Computer Applications ch05 "Revision: Iterative Constructs and Nested Loops". Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch05/src/build.mjs
// Every program output, value and error shown in decks, notes, flashcards and questions is produced by running Java.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, useJavaCache } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch05', 'computer-science');
useJavaCache(SRC);
const A = await import('./q_a.mjs');
const B = await import('./q_b.mjs');
const C = await import('./q_c.mjs');
const D = await import('./q_d.mjs');
await import('./q_e.mjs');
const { code, F, ic, ev, out, num, oline, mustCompile, mustFail, expect } = await import('./q_util.mjs');
const DIR = path.resolve(SRC, '..');

const nothing = (s) => (s === '' ? '(nothing is printed)' : s);
const rowsOf = (src) => out(src).split('\n').map((l) => l.split(' '));

// ---------------------------------------------------------------- facts the text states in words; stop if Java disagrees
expect(out(A.cForMult), '3 6 9 12 15', 'for multiples');
expect(out(A.cWhileMult), '3 6 9 12 15', 'while multiples');
expect(out(A.cDoMult), '3 6 9 12 15', 'do-while multiples');
expect(out(A.cWhileFalse), 'after the loop, n = 10', 'while with a false start');
expect(out(A.cDoFalse), 'body runs, n = 10\nafter the loop, n = 11', 'do-while with a false start');
expect(out(A.cForSum).split('\n').pop(), 'i = 5, sum = 15', 'sum of 1 to 5');
expect(out(B.cMulti(2)), '1-10 3-8 5-6', 'two counters');
expect(out(B.cBreakLoop), '1 2 3 4 done', 'break loop');
expect(out(B.cContLoop), '1 2 3 4 6 7 8 done', 'continue loop');
expect(out(B.cEmptyBody), '6', 'final value after an empty-body loop');
expect(out(B.cDelayOne), 'Start\nReady', 'delay loop');
expect(out(B.cBounded), '4', 'bounded loop with break');
expect(out(code('int c = 0;', 'for (int w = 1; w <= 1000000; w++);', '    c++;', 'System.out.println(c);')), '1', 'statement after a delay loop');
expect(out(C.cExtract(4825)), '5\n2\n8\n4', 'digits of 4825');
expect(out(C.cDigitSum(4825)), '19', 'digit sum 4825');
expect(out(C.cDigitSum(5029)), '16', 'digit sum 5029');
expect(out(C.cRev(3472)), '2743', 'reverse 3472');
expect(out(C.cPalin(1221)), '1221 is a palindrome', 'palindrome 1221');
expect(out(C.cPalin(4592)), '4592 is not a palindrome', 'not palindrome 4592');
expect(out(C.cPrime(29)), '29 is prime', 'prime 29');
expect(out(C.cPrime(21)), '21 is not prime', 'composite 21');
expect(out(C.cPrimeBreak(91)), '91 is not prime', 'prime test with break, 91');
expect(out(C.cPrimeBreak(29)), '29 is prime', 'prime test with break, 29');
expect(out(C.cPrimeBreak(1)), '1 is not prime', 'prime test with break, 1');
expect(out(C.cPerfect(28)), '28 is perfect', 'perfect 28');
expect(out(C.cPerfect(12)), '12 is not perfect, factors add up to 16', 'not perfect 12');
expect(out(C.cArm(153)), '153 is an Armstrong number', 'Armstrong 153');
expect(out(C.cArm(123)), '123 is not an Armstrong number, sum = 36', 'not Armstrong 123');
expect(out(C.cFib), '0 1 1 2 3 5 8 13', 'Fibonacci terms');
expect(out(C.cHcf(84, 120)), 'HCF = 12\nLCM = 840', 'HCF and LCM');
expect(out(C.cEuclid(84, 36)), '12', 'Euclid');
expect(out(D.cRect(3, 5)), '*****\n*****\n*****', 'rectangle');
expect(out(D.cTriUp), '1\n12\n123\n1234', 'number triangle');
expect(out(D.cTriStar(4)), '*\n**\n***\n****', 'star triangle');
expect(out(D.cSeriesDiv).split('\n').pop(), 'term 4, sum = 12.25', 'series sum');
expect(out(D.cNestCount(4, 'j <= 3')), '12', 'nested count 4 x 3');
expect(out(code('int c = 0;', 'for (int i = 1; i <= 4; i++)', '    for (int j = 1; j <= i; j++)', '        c++;', 'System.out.println(c);')), '10', 'triangular count');
// facts typed in solutions and model answers (explanatory traces), checked here
expect(out(code('int cups = 12, round = 0;', 'while (cups > 0) {', '    cups -= 5;', '    round++;', '    System.out.println(cups);', '}')), '7\n2\n-3', 'cups trace');
expect(out(code('int a = 100;', 'while (a > 10) {', '    System.out.print(a + " ");', '    a -= 15;', '}', 'System.out.print(a);')), '100 85 70 55 40 25 10', 'a trace');
expect(out(code('for (int n = 5; n < 30; n += 5)', '    System.out.print(n + " ");')), '5 10 15 20 25', 'token values');
expect(out(code('int x = 40;', 'while (x > 5) {', '    System.out.print(x + " ");', '    x = x / 2;', '}', 'System.out.print(x);')), '40 20 10 5', 'halving values');
expect(out(code('for (int i = 1; i <= 10; i += 3)', '    System.out.print(i + " ");')), '1 4 7 10', 'first match loop');
expect(out(code('for (int i = 10; i > 0; i -= 5)', '    System.out.print(i + " ");')), '10 5', 'second match loop');
expect(out(code('int total = 0;', 'for (int i = 1; i <= 10; i++) {', '    if (total > 20)', '        break;', '    total += i;', '    System.out.print(total + " ");', '}')), '1 3 6 10 15 21', 'running totals');
expect(out(code('int n = 20;', 'do {', '    System.out.println(n);', '    n += 5;', '} while (n < 10);', 'System.out.println(n);')), '20\n25', 'do-while once');
expect(out(code('int level = 8;', 'do {', '    System.out.println(level);', '    level++;', '} while (level < 8);', 'System.out.println(level);')), '8\n9', 'level');
expect(out(code('double s = 0;', 'for (int i = 1; i <= 4; i++) {', '    s += Math.pow(i, 2) / 2;', '    System.out.print(s + " ");', '}')), '0.5 2.5 7.0 15.0', 'series partial sums');
expect(out(code('for (int i = 1; i <= 4; i++)', '    System.out.print(Math.pow(i, 2) / 2 + " ");')), '0.5 2.0 4.5 8.0', 'series terms');
expect(out(code('int count = 0;', 'for (int i = 1; i <= 3; i++)', '    for (int j = i; j <= 3; j++)', '        count++;', 'System.out.println(count);')), '6', 'staircase count');
expect(out(code('for (int i = 1; i <= 3; i++) {', '    int c = 0;', '    for (int j = i; j <= 3; j++)', '        c++;', '    System.out.print(c + " ");', '}')), '3 2 1', 'passes per row');
expect(out(code('int x, y;', 'for (x = 2, y = 20; x < y; x += 4, y -= 3)', '    System.out.println(x + " " + y);', 'System.out.println(x + " " + y);')), '2 20\n6 17\n10 14\n14 11', 'two counters trace');
expect(out(code('int sum = 0;', 'for (int i = 1; i <= 5; i++)', '    sum += i;', 'System.out.println(sum);')), '15', 'sum 15');
expect(out(code('int d = 2;', 'int n = 5029;', 'System.out.println(n % 10 + " " + n / 10 % 10 + " " + n / 100 % 10 + " " + n / 1000);')), '9 2 0 5', 'digits of 5029');
expect(out(code('int n = 3472;', 'System.out.println(n % 10 + " " + n / 10 % 10 + " " + n / 100 % 10 + " " + n / 1000);')), '2 7 4 3', 'digits of 3472');
expect(out(code('int a = 2, b = 3;', 'for (int i = 1; i <= 4; i++) {', '    int c = a + b;', '    a = b;', '    b = c;', '    System.out.print("(" + a + ", " + b + ") ");', '}')), '(3, 5) (5, 8) (8, 13) (13, 21)', 'fib pairs');
expect(out(code('int n = 12, s = 0;', 'for (int i = 1; i < n; i++)', '    if (n % i == 0)', '        s += i;', 'System.out.println(s);')), '16', 'factor sum 12');
expect(out(code('int n = 21;', 'for (int i = 1; i <= n; i++)', '    if (n % i == 0)', '        System.out.print(i + " ");')), '1 3 7 21', 'factors of 21');
expect(out(code('for (int i = 1; i <= 3; i++) {', '    for (int j = 1; j <= 4; j++)', '        System.out.print(i * j + " ");', '    System.out.println();', '}')), '1 2 3 4\n2 4 6 8\n3 6 9 12', 'product table');
expect(out(code('for (int n = 28, i = 1; i < n; i++)', '    if (n % i == 0)', '        System.out.print(i + " ");')), '1 2 4 7 14', 'factors of 28');
expect(ev('1 * 1 * 1 + 5 * 5 * 5 + 3 * 3 * 3'), '153', 'cubes of 153');
expect(ev('12 * 840'), '10080', 'HCF x LCM');
expect(ev('84 * 120'), '10080', 'a x b');

// ---------------------------------------------------------------- SVG helpers
const term = (s, x, y, label, w = 90) => { s.rect(x - w / 2, y - 17, w, 34, { rx: 17, fill: 'fill', color: 'accent', sw: 1.6 }); s.text(x, y, label, { size: 14, bold: true }); };
const proc = (s, x, y, w, h, label, o = {}) => { s.rect(x - w / 2, y - h / 2, w, h, { rx: 6, fill: 'fill', color: o.color ?? 'accent', sw: 1.6, dash: o.dash }); s.text(x, y, label, { size: 13, muted: o.muted }); };
const dec = (s, x, y, w, h, label) => { s.polygon([[x, y - h / 2], [x + w / 2, y], [x, y + h / 2], [x - w / 2, y]], { fill: 'fill', color: 'accent', sw: 1.8 }); s.text(x, y, label, { size: 13 }); };

// ---------------------------------------------------------------- visuals: Part 1 (loop kinds, flow, variations, break and continue)
const vRoute1 = flow('LR', ['Parts of a loop', 'for loop', 'while and do-while', 'Converting loops', 'Counting passes', 'Variations', 'break and continue'], 'Route map of Part 1: parts of a loop, the for loop, the while and do-while loops, converting loops, counting passes, loop variations, break and continue', 'Part 1 at a glance');
const vParts = table(
  ['Part', 'Job', 'When it is executed'],
  [
    ['Initialisation', 'gives the loop variable its first value', 'once, before the first test'],
    ['Test (condition)', 'decides whether another pass is made', 'before each pass (after it in do-while)'],
    ['Body', 'the statements that are repeated', 'once in every pass'],
    ['Update', 'changes the loop variable', 'at the end of every pass'],
  ],
  'Table of the four parts of a loop: initialisation once at the start, the test before each pass, the body in every pass and the update at the end of every pass',
);
const vForFlow = (() => {
  const s = new Svg(600, 400);
  term(s, 200, 24, 'Start');
  s.arrow(200, 41, 200, 62, { sw: 1.6 });
  proc(s, 200, 80, 200, 36, 'Initialisation (once)');
  s.arrow(200, 98, 200, 128, { sw: 1.6 });
  dec(s, 200, 168, 200, 76, 'condition?');
  s.arrow(200, 206, 200, 244, { sw: 1.6 });
  s.text(222, 226, 'true', { size: 13, bold: true, anchor: 'start' });
  proc(s, 200, 262, 200, 36, 'Body');
  s.arrow(200, 280, 200, 314, { sw: 1.6 });
  proc(s, 200, 332, 200, 36, 'Update');
  s.line(100, 332, 40, 332, { sw: 1.6 });
  s.line(40, 332, 40, 168, { sw: 1.6 });
  s.arrow(40, 168, 100, 168, { sw: 1.6 });
  s.line(300, 168, 420, 168, { sw: 1.6 });
  s.arrow(420, 168, 450, 168, { sw: 1.6 });
  s.text(360, 154, 'false', { size: 13, bold: true });
  term(s, 500, 168, 'Exit', 80);
  s.text(430, 380, 'The test comes first: an entry-controlled loop', { size: 13, muted: true });
  return s.visual('Flowchart of a for loop: after Start the initialisation is done once, then the condition is tested; if true the body runs, then the update, and control returns to the test; if false the loop exits. The test comes before the body, so this is an entry-controlled loop', 'for: initialisation once, then test, body, update, test again.');
})();
const sumRows = rowsOf(code('int sum = 0;', 'for (int i = 1; i <= 5; i++) {', '    sum += i;', '    System.out.println(i + " " + sum);', '}'));
const vEx1 = table(
  ['i', 'Test i <= 5', 'sum after the body'],
  [...sumRows.map(([i, s]) => [i, ev(`${i} <= 5`), s]), ['6', ev('6 <= 5'), '(loop ends)']],
  `Trace table of the sum loop: the values of i from ${sumRows[0][0]} to ${sumRows[4][0]} make the test true and sum grows to ${sumRows[4][1]}; when i becomes 6 the test is ${ev('6 <= 5')} and the loop ends`,
  'The last test is made with i equal to 6, and it fails.',
);
const vWhileFor = table(
  ['Part', 'for loop', 'while loop'],
  [
    ['Initialisation', ic('int i = 3') + ' in the header', ic('int i = 3;') + ' before the loop'],
    ['Test', ic('i <= 15') + ' in the header', ic('while (i <= 15)')],
    ['Update', ic('i += 3') + ' in the header', ic('i += 3;') + ' as the last statement of the body'],
    ['Output', ic(out(A.cForMult)), ic(out(A.cWhileMult))],
  ],
  `Table comparing a for loop and a while loop that both print ${out(A.cForMult)}: the for loop keeps initialisation, test and update in the header, while the while loop puts the initialisation before the loop and the update inside the body`,
);
const vDoFlow = (() => {
  const s = new Svg(600, 380);
  term(s, 200, 24, 'Start');
  s.arrow(200, 41, 200, 62, { sw: 1.6 });
  proc(s, 200, 80, 200, 36, 'Initialisation (once)');
  s.arrow(200, 98, 200, 128, { sw: 1.6 });
  proc(s, 200, 146, 200, 36, 'Body (with the update)');
  s.arrow(200, 164, 200, 204, { sw: 1.6 });
  dec(s, 200, 244, 200, 76, 'condition?');
  s.line(100, 244, 40, 244, { sw: 1.6 });
  s.line(40, 244, 40, 146, { sw: 1.6 });
  s.arrow(40, 146, 100, 146, { sw: 1.6 });
  s.text(70, 262, 'true', { size: 13, bold: true });
  s.arrow(200, 282, 200, 322, { sw: 1.6 });
  s.text(222, 302, 'false', { size: 13, bold: true, anchor: 'start' });
  term(s, 200, 340, 'Exit', 80);
  s.text(420, 244, 'The test comes last:', { size: 13, muted: true, anchor: 'start' });
  s.text(420, 264, 'an exit-controlled loop', { size: 13, muted: true, anchor: 'start' });
  return s.visual('Flowchart of a do-while loop: after Start and the initialisation the body runs first, then the condition is tested; if true control returns to the body, if false the loop exits. The test comes after the body, so the body runs at least once and the loop is exit-controlled', 'do-while: body first, test afterwards; the body runs at least once.');
})();
const vEntryExit = table(
  ['Loop (n = 10, condition n < 5)', 'Output', 'Times the body ran'],
  [
    ['while', ic(oline(A.cWhileFalse)), '0'],
    ['do-while', ic(oline(A.cDoFalse)), '1'],
  ],
  `Table showing that with a condition that is false from the start the while loop prints only ${out(A.cWhileFalse)} while the do-while loop runs its body once and prints ${oline(A.cDoFalse)}`,
  'The only difference is where the test is made.',
);
const vConvert = table(
  ['Part', 'for', 'while', 'do-while'],
  [
    ['Initialisation', 'in the header', 'before the loop', 'before the loop'],
    ['Test', 'in the header, before the body', 'in the header, before the body', 'after the body, followed by a semicolon'],
    ['Update', 'in the header', 'last statement of the body', 'last statement of the body'],
    ['Output', ic(out(A.cForMult)), ic(out(A.cWhileMult)), ic(out(A.cDoMult))],
  ],
  `Table of the three forms of the same loop: the initialisation moves before the loop, the update moves into the body, and the do-while puts the test at the end; all three print ${out(A.cForMult)}`,
  'The three loops give the same output here because the condition is true at the start.',
);
const valsOf = (init, cond, upd) => out(code(`for (${init}; ${cond}; ${upd})`, '    System.out.print(i + " ");')) || '(none)';
const countRows = [
  ['int i = 2', 'i <= 20', 'i += 4'],
  ['int i = 5', 'i < 30', 'i += 5'],
  ['int i = 10', 'i > 0', 'i -= 3'],
  ['int i = 1', 'i < 1', 'i++'],
].map(([a, b, c]) => [ic(`for (${a}; ${b}; ${c})`), valsOf(a, b, c), String(num(A.countFor(a, b, c)))]);
const vCount = table(
  ['Loop header', 'Values of i in the passes', 'Passes'],
  countRows,
  `Table of how often the body runs: ${countRows.map(([h, v, n]) => `${h.replace(/`/g, '')} gives ${v} and ${n} passes`).join('; ')}`,
  'List the values of the variable that pass the test: their number is the number of passes.',
);
const multiRows = rowsOf(code('for (int a = 1, b = 10; a < b; a += 2, b -= 2)', '    System.out.println(a + " " + b);'));
const multiEnd = out(code('int a, b;', 'for (a = 1, b = 10; a < b; a += 2, b -= 2);', 'System.out.println(a + " " + b);')).split(' ');
const vMulti = table(
  ['Pass', 'a', 'b', 'Test a < b'],
  [...multiRows.map(([a, b], i) => [String(i + 1), a, b, ev(`${a} < ${b}`)]), ['end', multiEnd[0], multiEnd[1], ev(`${multiEnd[0]} < ${multiEnd[1]}`)]],
  `Trace table of the loop with two counters: the pairs ${multiRows.map(([a, b]) => `${a} and ${b}`).join(', ')} pass the test, and the next pair ${multiEnd[0]} and ${multiEnd[1]} fails it`,
  'Both counters are initialised and updated together; the commas separate the expressions.',
);
const vInfinite = table(
  ['Loop (code only, never run)', 'Why it never ends', 'How to end it'],
  [
    [ic('while (true) { ... }'), 'the condition is always true', 'if (...) break; inside the body'],
    [ic('while (i <= 5) { ... }'), 'i is never updated, so the test never fails', 'add i++; to the body'],
    [ic('for (;;) { ... }'), 'an empty condition counts as true', 'break inside the body'],
    [ic('for (int i = 1; i <= 5; ) { ... }'), 'the update part is empty', 'put i++ in the header or the body'],
  ],
  'Table of four loops that never end, with the reason for each and the way to end it: while true needs a break, a missing update needs an update statement, for with empty parts needs a break, and an empty update part needs an update',
  'These loops are shown, never executed.',
);
const vDelay = table(
  ['Code', 'Output', 'Remark'],
  [
    [ic('for (int w = 1; w <= 1000000; w++);') + ' between two println statements', ic(oline(B.cDelayOne)), 'empty body: the loop only uses time'],
    [ic('int i; for (i = 1; i <= 5; i++); println(i);'), ic(out(B.cEmptyBody)), 'i is 6 when the test finally fails'],
    [ic('for (...); c++;') + ' (c starts at 0)', ic('1'), 'c++ is outside the loop and runs once'],
  ],
  `Table of delay loops: a loop with an empty body between two println statements prints ${oline(B.cDelayOne)}; with the variable declared before the loop its final value is ${out(B.cEmptyBody)}; a statement after the semicolon runs only once`,
  'A semicolon after the header makes the body empty.',
);
const brkRows = rowsOf(code('for (int i = 1; i <= 5; i++) {', '    System.out.println(i + " " + (i == 5));', '}'));
const vBreak = table(
  ['i', 'i == 5', 'What happens'],
  brkRows.map(([i, t]) => [i, t, t === 'true' ? 'break: the loop ends at once' : 'print i']),
  `Trace table of the break loop: for i from ${brkRows[0][0]} to ${brkRows[3][0]} the test i == 5 is false and i is printed; at i equal to 5 the test is true and break ends the loop, so the output is ${out(B.cBreakLoop)}`,
);
const vBC = table(
  ['', 'break', 'continue'],
  [
    ['Effect', 'leaves the loop completely', 'skips the rest of this pass only'],
    ['Output when i == 5 triggers it', ic(out(B.cBreakLoop)), ic(out(B.cContLoop))],
    ['Control goes to', 'the statement after the loop', 'the update of the for loop, then the test'],
  ],
  `Table comparing break and continue on the same loop: break prints ${out(B.cBreakLoop)} and continue prints ${out(B.cContLoop)}`,
);
const cEx3 = code('for (int i = 1; i <= 12; i++) {', '    if (i % 5 == 0)', '        continue;', '    if (i * i > 60)', '        break;', '    System.out.print(i + " ");', '}');
const ex3Rows = rowsOf(code('for (int i = 1; i <= 12; i++) {', '    String act = "print";', '    if (i % 5 == 0)', '        act = "continue";', '    else if (i * i > 60)', '        act = "break";', '    System.out.println(i + " " + act);', '    if (act.equals("break"))', '        break;', '}'));
expect(ex3Rows.filter(([, a]) => a === 'print').map(([i]) => i).join(' '), out(cEx3), 'worked example 3 trace agrees with the code');
const vEx3 = table(
  ['i', 'Action'],
  ex3Rows.map(([i, a]) => [i, a === 'print' ? 'printed' : a === 'continue' ? 'continue: skipped' : 'break: loop ends']),
  `Trace table of the loop with continue and break: ${ex3Rows.map(([i, a]) => `i ${i} is ${a === 'print' ? 'printed' : a}`).join('; ')}; the printed numbers are ${out(cEx3)}`,
);
const vSummary1 = table(
  ['Topic', 'Remember'],
  [
    ['for, while', 'entry-controlled: the test comes first, so the body may not run at all'],
    ['do-while', 'exit-controlled: the body runs at least once; semicolon after the condition'],
    ['converting', 'initialisation before the loop, update in the body; same output'],
    ['counting passes', 'list the values of the variable that pass the test'],
    ['infinite and delay loops', 'condition always true or no update; empty body from a stray semicolon'],
    ['break, continue', 'break leaves the loop; continue skips one pass'],
  ],
  'Summary table of Part 1: entry and exit-controlled loops, converting between loops, counting passes, infinite and delay loops, and break against continue',
);

// ---------------------------------------------------------------- visuals: Part 2 (number programs, nested loops, series)
const vRoute2 = flow('LR', ['Digits of a number', 'Reverse and palindrome', 'Prime and perfect', 'Armstrong and Fibonacci', 'HCF and LCM', 'Nested for loops', 'Patterns', 'Series'], 'Route map of Part 2: digits of a number, reverse and palindrome, prime and perfect numbers, Armstrong and Fibonacci, HCF and LCM, nested for loops, patterns and series', 'Part 2 at a glance');
const exRows = rowsOf(code('int n = 4825;', 'while (n > 0) {', '    System.out.println(n + " " + n % 10 + " " + n / 10);', '    n = n / 10;', '}'));
const vExtract = table(
  ['n', 'n % 10 (last digit)', 'n / 10 (new n)'],
  [...exRows, ['0', '', 'loop ends']],
  `Trace table of digit extraction for 4825: the last digits taken are ${exRows.map((r) => r[1]).join(', ')}, and n becomes ${exRows.map((r) => r[2]).join(', ')}, which ends the loop`,
  'n % 10 takes the last digit; n / 10 removes it.',
);
const cDigits = (n) => code(`int n = ${n}, count = 0, sum = 0;`, 'while (n > 0) {', '    int d = n % 10;', '    count++;', '    sum += d;', '    n /= 10;', '}', 'System.out.println("Digits = " + count);', 'System.out.println("Sum = " + sum);');
const dsRows = rowsOf(code('int n = 4825, count = 0, sum = 0;', 'while (n > 0) {', '    int d = n % 10;', '    count++;', '    sum += d;', '    n /= 10;', '    System.out.println(d + " " + count + " " + sum + " " + n);', '}'));
expect(oline(cDigits(4825)), 'Digits = 4 / Sum = 19', 'digits program');
const vEx1b = table(
  ['Pass', 'digit d', 'count', 'sum', 'n left'],
  dsRows.map(([d, c, s, n], i) => [String(i + 1), d, c, s, n]),
  `Trace table for the number 4825: the digits ${dsRows.map((r) => r[0]).join(', ')} are taken one by one, count reaches ${dsRows[3][1]} and sum reaches ${dsRows[3][2]}`,
);
const rvRows = rowsOf(code('int n = 3472, rev = 0;', 'while (n > 0) {', '    int d = n % 10;', '    rev = rev * 10 + d;', '    n = n / 10;', '    System.out.println(d + " " + rev + " " + n);', '}'));
const vRev = table(
  ['Pass', 'digit d', 'rev = rev * 10 + d', 'n left'],
  rvRows.map(([d, r, n], i) => [String(i + 1), d, r, n]),
  `Trace table of reversing 3472: rev becomes ${rvRows.map((r) => r[1]).join(', ')}, so the reverse is ${rvRows[3][1]}`,
  'Multiplying rev by 10 moves the earlier digits one place to the left.',
);
const palNums = [1221, 4592, 12321];
const vPalin = table(
  ['Number', 'Reverse', 'Output'],
  palNums.map((n) => [String(n), out(C.cRev(n)), ic(out(C.cPalin(n)))]),
  `Table of palindrome tests: ${palNums.map((n) => `${n} has reverse ${out(C.cRev(n))} and prints ${out(C.cPalin(n))}`).join('; ')}`,
  'A palindrome equals its reverse.',
);
const primeNs = [13, 21, 29, 1];
const factorCount = (n) => num(code(`int n = ${n}, f = 0;`, 'for (int i = 1; i <= n; i++)', '    if (n % i == 0)', '        f++;', 'System.out.println(f);'));
const vPrime = table(
  ['n', 'Factors found (f)', 'Output'],
  primeNs.map((n) => [String(n), String(factorCount(n)), ic(out(C.cPrime(n)))]),
  `Table of prime tests by counting factors: ${primeNs.map((n) => `${n} has ${factorCount(n)} factors and prints ${out(C.cPrime(n))}`).join('; ')}`,
  'A prime number has exactly two factors.',
);
const pbRows = rowsOf(code('int n = 91;', 'for (int i = 2; i < n; i++) {', '    System.out.println(i + " " + n % i);', '    if (n % i == 0)', '        break;', '}'));
const vPrimeBreak = table(
  ['i', '91 % i', 'Action'],
  pbRows.map(([i, r]) => [i, r, r === '0' ? 'divisor found: prime = false, break' : 'go on']),
  `Trace table of the prime test with break for 91: the remainders for i from ${pbRows[0][0]} are ${pbRows.map((r) => r[1]).join(', ')}; at i equal to ${pbRows[pbRows.length - 1][0]} the remainder is 0, so the loop stops and the program prints ${out(C.cPrimeBreak(91))}`,
  'break stops the search as soon as one divisor is found.',
);
const vPerfectFlow = flow('LR', ['sum = 0', 'for i = 1 to n - 1', 'if i divides n: add i to sum', 'sum equal to n?', 'perfect / not perfect'], 'Flow of the perfect-number test: set sum to 0, loop i from 1 to n minus 1, add every i that divides n, then compare sum with n', 'The number itself is not added.');
const perfNs = [6, 12, 28];
const perfRows = perfNs.map((n) => {
  const [list, s] = out(code(`int n = ${n}, s = 0;`, 'String list = "";', 'for (int i = 1; i < n; i++)', '    if (n % i == 0) {', '        s += i;', '        list += i + " ";', '    }', 'System.out.println(list.trim().replace(" ", ", ") + "|" + s);')).split('|');
  return [String(n), list, s, Number(s) === n ? 'perfect' : 'not perfect'];
});
const vEx2 = table(
  ['n', 'Factors other than n', 'Sum', 'Verdict'],
  perfRows,
  `Table of perfect-number tests: ${perfRows.map(([n, l, s, v]) => `${n} has factors ${l} with sum ${s}, so it is ${v}`).join('; ')}`,
);
const armRows = (n) => rowsOf(code(`int n = ${n}, t = n, sum = 0;`, 'while (t > 0) {', '    int d = t % 10;', '    sum += (int) Math.pow(d, 3);', '    System.out.println(d + " " + (int) Math.pow(d, 3) + " " + sum);', '    t /= 10;', '}'));
const a153 = armRows(153);
const a123 = armRows(123);
const vArm = table(
  ['Number', 'Digits taken', 'Cubes', 'Running sum', 'Verdict'],
  [
    ['153', a153.map((r) => r[0]).join(', '), a153.map((r) => r[1]).join(', '), a153.map((r) => r[2]).join(', '), ic(out(C.cArm(153)))],
    ['123', a123.map((r) => r[0]).join(', '), a123.map((r) => r[1]).join(', '), a123.map((r) => r[2]).join(', '), ic(out(C.cArm(123)))],
  ],
  `Table of Armstrong tests with cubes: for 153 the cubes ${a153.map((r) => r[1]).join(', ')} give the sum ${a153[2][2]}, so ${out(C.cArm(153))}; for 123 the sum is ${a123[2][2]}, so ${out(C.cArm(123))}`,
  'The power is the number of digits; here there are three digits.',
);
const fbRows = rowsOf(code('int a = 0, b = 1;', 'for (int i = 3; i <= 8; i++) {', '    int c = a + b;', '    System.out.println(i + " " + a + " " + b + " " + c);', '    a = b;', '    b = c;', '}'));
const vFib = table(
  ['Term no. (i)', 'a', 'b', 'c = a + b (new term)'],
  fbRows,
  `Trace table of the Fibonacci loop: the new terms are ${fbRows.map((r) => r[3]).join(', ')}; with the first two terms 0 and 1 the series is ${out(C.cFib)}`,
  'After each pass a takes the old b and b takes the new term.',
);
const hcfPairs = [[84, 120], [17, 5], [36, 48]];
const hcfRows = hcfPairs.map(([a, b]) => { const [h, l] = out(C.cHcf(a, b)).split('\n').map((x) => x.split(' = ')[1]); return [String(a), String(b), h, l]; });
const vHcf = table(
  ['a', 'b', 'HCF', 'LCM'],
  hcfRows,
  `Table of HCF and LCM results: ${hcfRows.map(([a, b, h, l]) => `${a} and ${b} give HCF ${h} and LCM ${l}`).join('; ')}`,
  'HCF x LCM = a x b, so LCM = a * b / hcf.',
);
const vNestGrid = (() => {
  const rows = 3, cols = 4, x0 = 110, y0 = 60, cw = 80, ch = 46;
  const s = new Svg(560, 270);
  s.text(x0 + (cols * cw) / 2, 22, 'inner loop: j runs 1, 2, 3, 4 in every row', { size: 13, bold: true });
  for (let i = 1; i <= rows; i++) {
    s.text(x0 - 12, y0 + (i - 0.5) * ch, `i = ${i}`, { size: 13, bold: true, anchor: 'end' });
    for (let j = 1; j <= cols; j++) {
      s.rect(x0 + (j - 1) * cw + 4, y0 + (i - 1) * ch + 4, cw - 8, ch - 8, { rx: 6, fill: 'fill', color: 'accent', sw: 1.4 });
      s.text(x0 + (j - 0.5) * cw, y0 + (i - 0.5) * ch, `i${i} j${j}`.replace('i', 'i=').replace(' j', ', j='), { size: 12 });
    }
    s.text(x0 + cols * cw + 8, y0 + (i - 0.5) * ch, 'println', { size: 12, anchor: 'start', muted: true });
  }
  s.text(x0 + (cols * cw) / 2, y0 + rows * ch + 26, 'outer loop: i runs 1, 2, 3 (one row each)', { size: 13, bold: true });
  return s.visual(`Grid of the passes of two nested for loops with i from 1 to ${rows} and j from 1 to ${cols}: each row is one pass of the outer loop and holds ${cols} passes of the inner loop, so the inner body is executed ${rows * cols} times`, 'The inner loop completes a full row for each pass of the outer loop.');
})();
const vNestRun = table(
  ['Outer pass', 'Inner passes', 'Line printed'],
  out(code('for (int i = 1; i <= 3; i++) {', '    for (int j = 1; j <= 4; j++)', '        System.out.print(i * j + " ");', '    System.out.println();', '}')).split('\n').map((l, i) => [`i = ${i + 1}`, `j = 1 to 4`, ic(l)]),
  `Table of the lines printed by nested loops with i from 1 to 3 and j from 1 to 4, each line showing the products i times j: ${out(code('for (int i = 1; i <= 3; i++) {', '    for (int j = 1; j <= 4; j++)', '        System.out.print(i * j + " ");', '    System.out.println();', '}')).split('\n').join('; ')}`,
  'The println after the inner loop ends each line.',
);
const vRect = table(
  ['Code', 'Output'],
  [
    [ic('for i = 1 to 3, for j = 1 to 5, print("*")') + ' then println', ic(oline(D.cRect(3, 5)))],
    [ic('for i = 1 to 2, for j = 1 to 4, print("#")') + ' then println', ic(oline(D.cRect(2, 4, '#')))],
  ],
  `Table of rectangular patterns: three rows of five stars print ${oline(D.cRect(3, 5))}, and two rows of four hash symbols print ${oline(D.cRect(2, 4, '#'))}`,
  'A rectangle: the inner limit does not depend on i.',
);
const triVariants = [
  ['j <= i, print j', D.cTriUp],
  ['j <= i, print i', D.cTriSame],
  ['j <= 5 - i, print j', D.cTriDown],
  ['j <= i, print "*"', D.cTriStar(4)],
];
const vTri = table(
  ['Inner loop (outer: i = 1 to 4)', 'Output'],
  triVariants.map(([h, c]) => [ic(h), ic(oline(c))]),
  `Table of right-angled triangle patterns: ${triVariants.map(([h, c]) => `${h} prints ${oline(c)}`).join('; ')}`,
  'A triangle: the inner limit depends on i.',
);
const cDownStars = code('for (int i = 5; i >= 1; i--) {', '    for (int j = 1; j <= i; j++)', '        System.out.print("*");', '    System.out.println();', '}');
const dsLines = out(cDownStars).split('\n');
const vEx3b = table(
  ['Row', 'i', 'Stars (inner loop j <= i)', 'Line'],
  dsLines.map((l, k) => [String(k + 1), String(5 - k), String(l.length), ic(l)]),
  `Trace table of the decreasing star triangle: the outer variable i counts down from 5 to 1 and each row prints i stars, so the lines are ${dsLines.join(', ')}`,
);
const serRows = rowsOf(code('double x = 3, s = 0;', 'for (int i = 1; i <= 4; i++) {', '    double term = Math.pow(x, i - 1) / i;', '    s += term;', '    System.out.println(i + " " + term + " " + s);', '}'));
const vSeriesTrace = table(
  ['i', 'term = Math.pow(x, i - 1) / i', 'sum'],
  serRows,
  `Trace table of the series 1 + x/2 + x squared/3 + ... for x equal to 3: the terms are ${serRows.map((r) => r[1]).join(', ')} and the sum after four terms is ${serRows[3][2]}`,
  'Each term is added to a sum that starts at 0.',
);
const serForms = [
  ['1 + 2 + 3 + ... + n', 's += i;', 'i'],
  ['1 + 4 + 9 + ... (squares)', 's += i * i;', 'i * i'],
  ['1 + 1/2 + 1/3 + ... + 1/n', 's += 1.0 / i;', '1.0 / i'],
  ['2 + 4 + 8 + ... (powers of 2)', 's += Math.pow(2, i);', 'Math.pow(2, i)'],
];
const serVals = serForms.map(([, , e]) => out(code('double s = 0;', 'for (int i = 1; i <= 4; i++)', `    s += ${e};`, 'System.out.println(s);')));
const vSeriesForms = table(
  ['Series (n = 4 terms)', 'Statement in the body', 'Sum'],
  serForms.map(([t, st], i) => [t, ic(st), serVals[i]]),
  `Table of series and the statement that adds each term, with the sum of four terms: ${serForms.map(([t, st], i) => `${t} uses ${st} and gives ${serVals[i]}`).join('; ')}`,
  'Use 1.0 (a decimal) in a division, or the integer division loses the fraction.',
);
const vSummary2 = table(
  ['Topic', 'Remember'],
  [
    ['digits', 'n % 10 is the last digit; n / 10 removes it; loop while n > 0'],
    ['reverse, palindrome', 'rev = rev * 10 + d; palindrome when rev equals the original'],
    ['prime, perfect', 'prime has exactly two factors; perfect equals the sum of its smaller factors'],
    ['Armstrong, Fibonacci', 'digits raised to the number of digits; next term is the sum of the last two'],
    ['HCF, LCM', 'largest common divisor by a loop; LCM = a * b / hcf'],
    ['nested for, series', 'inner loop runs fully for each outer pass; Math.pow and 1.0 / i in series'],
  ],
  'Summary table of Part 2: digit extraction, reverse and palindrome, prime and perfect numbers, Armstrong and Fibonacci, HCF and LCM, nested for loops and series',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Loops: for, while, do-while, break and continue',
  goals: [
    'Rewrite a for loop as a while loop and as a do-while loop, and count how often a loop body executes',
    'Tell entry-controlled loops from the exit-controlled loop',
    'Recognise infinite loops, delay loops and loops with several counters',
    'Predict the output of loops that contain break and continue',
  ],
  slides: [
    sl('title', 'Iterative constructs: loops', {
      b: 'Part 1: **for**, **while**, **do-while**, converting one loop into another, **counting passes**, loop variations, **break** and **continue**.',
      v: vRoute1,
      n: 'Welcome to the revision of iterative constructs. In this part we meet the three loops of Java: for, while and do while. We compare entry controlled and exit controlled loops, convert one loop into another, and count how many times a body runs. Then we study loops that never end, delay loops, loops with two counters, and the statements break and continue.',
    }),
    sl('concept', 'The four parts of a loop', {
      b: 'A **loop** repeats a statement or block while a condition is true. Every loop has an **initialisation**, a **test**, a **body** and an **update**. Each pass of the body is called an **iteration**.',
      v: vParts,
      n: 'A loop repeats a statement or a block while a condition is true. Every loop has four parts. The initialisation gives the loop variable its first value, and it is done once. The test decides whether another pass is made. The body holds the statements that are repeated. The update changes the loop variable at the end of every pass.',
    }),
    sl('concept', 'The for loop', {
      b: `${F(A.cForSum)}\n\nThe **for** loop keeps initialisation, test and update in one header, separated by semicolons. The test is made **before** every pass.`,
      v: vForFlow,
      n: 'The for loop keeps the initialisation, the test and the update together in one header, separated by semicolons. The flowchart shows the order. The initialisation is done once. Then the condition is tested. If it is true the body runs, then the update, and control goes back to the test. If it is false, the loop ends. Because the test comes first, a for loop is entry controlled.',
    }),
    sl('example', 'Worked example 1: sum of 1 to 5', {
      b: `${F(A.cForSum)}\n\nTrace the loop: for each value of \`i\`, check the test, run the body and note \`sum\`.`,
      v: vEx1,
      n: 'Let us trace the loop that adds the numbers one to five. For each value of i, the test is true, the body adds i to sum, and sum grows. After the pass with i equal to five, the update makes i six. The test now fails and the loop ends, with sum equal to fifteen. Notice that the last test is made with i equal to six.',
    }),
    sl('check', 'Quick check: counting passes', {
      b: 'How many tokens are issued?',
      chk: 'm_count_for',
      n: 'List the values of n that pass the test, and count them.',
    }),
    sl('concept', 'The while loop', {
      b: `${F(A.cWhileMult)}\n\nThe **while** loop has only the test in its header. The initialisation goes **before** the loop and the update **inside** the body.`,
      v: vWhileFor,
      n: 'The while loop has only the test in its header. The initialisation is written before the loop, and the update is written inside the body, usually as its last statement. The table compares it with a for loop that prints the multiples of three up to fifteen. Both loops print the same numbers. A while loop is also entry controlled, because the test comes first.',
    }),
    sl('concept', 'The do-while loop', {
      b: `${F(A.cDoMult)}\n\nIn **do-while** the body comes first and the test is made **after** it. The condition is followed by a **semicolon**.`,
      v: vDoFlow,
      n: 'In the do while loop the body comes first and the test comes afterwards. The flowchart shows that the body is executed, then the condition is tested, and if it is true control returns to the body. Because the test is at the end, the loop is exit controlled. Do not forget the semicolon after the closing bracket of the condition.',
    }),
    sl('concept', 'Entry-controlled and exit-controlled loops', {
      b: 'The for and while loops are **entry-controlled**: the body may not run at all. The do-while loop is **exit-controlled**: the body runs **at least once**.',
      v: vEntryExit,
      n: 'Here the condition is false from the start. The while loop tests first, finds the condition false, and never runs its body, so only the last line is printed. The do while loop runs its body once before the test, so the body line appears once, and n becomes eleven. This is the one difference between the two kinds of loops.',
    }),
    sl('check', 'Quick check: a do-while that starts false', {
      b: 'Write the exact output.',
      chk: 'co_dowhile_false',
      n: 'Remember that the body of a do while loop runs before its test.',
    }),
    sl('example', 'Worked example 2: converting a for loop', {
      b: `${F(A.cForMult)}\n\nRewrite this loop as a **while** loop and as a **do-while** loop. Move the initialisation before the loop, put the update at the end of the body, and keep the same test.`,
      v: vConvert,
      n: 'Let us convert this for loop. The initialisation moves before the loop. The update moves to the end of the body. The test stays the same, in the header for a while loop and after the body for a do while loop. The table shows the three forms, and all three print the multiples of three from three to fifteen.',
    }),
    sl('concept', 'Counting the passes of a loop', {
      b: 'To count the passes, write down the values of the loop variable that **satisfy the test**. The number of such values is the number of times the body is executed. If the test is false at the start, the number is **0**.',
      v: vCount,
      n: 'To count how often a body runs, list the values of the loop variable that satisfy the test. The number of those values is the number of passes. The table shows four loops, including one that counts down and one whose test is false at the start, so its body never runs. Be careful with the limit: less than and less than or equal to give different counts.',
    }),
    sl('check', 'Quick check: match the loops', {
      b: 'Match each loop with the number of times its body runs.',
      chk: 'mt_loops',
      n: 'Count the values for each loop, and remember that a do while body runs at least once.',
    }),
    sl('concept', 'Two counters in one for loop', {
      b: `${F(B.cMulti(2))}\n\nSeveral variables can be initialised and updated in one header, separated by **commas**. The test is a single condition.`,
      v: vMulti,
      n: 'A for loop may have more than one counter. In the header the initialisations are separated by commas, and so are the updates, but there is only one test. In this loop a starts at one and goes up by two, while b starts at ten and goes down by two. The loop continues while a is less than b, and it stops when the pair seven and four fails the test.',
    }),
    sl('concept', 'Infinite loops', {
      b: `A loop whose condition **never becomes false** is an **infinite loop**. It is shown here but never run.\n\n${F(B.showInfinite)}\n\nA bounded form that ends with **break** prints ${ic(out(B.cBounded))}.`,
      v: vInfinite,
      n: 'An infinite loop never ends by itself. It happens when the condition is always true, when the update statement is missing, or when the for header has empty parts. The table lists four such loops and how to end them: add a break inside an if, or correct the update. A loop written with the condition true and a break, run for four passes, ends with the counter equal to four.',
    }),
    sl('concept', 'Delay loops and the stray semicolon', {
      b: `${F(B.cDelayOne)}\n\nA **delay loop** has an **empty body**, written as a semicolon directly after the header. It only counts, and so uses up time. The same semicolon placed by mistake after a loop header gives surprising results.`,
      v: vDelay,
      n: 'A delay loop repeats an empty body many times just to use up time. The semicolon right after the header is the empty body. The first row shows a delay between the words Start and Ready. If the semicolon is put there by mistake, the statement that follows is outside the loop. The second row shows that i is six when the loop ends, and the third shows that a counter statement runs only once.',
    }),
    sl('concept', 'break: leaving the loop', {
      b: `${F(B.cBreakLoop)}\n\nThe **break** statement leaves the loop at once. Control goes to the first statement after the loop.`,
      v: vBreak,
      n: 'The break statement ends the loop immediately. In this loop, i takes the values one to four and each is printed. When i reaches five, the test is true, break runs, and control jumps to the line after the loop, so the word done is printed. The value five is never printed, and the loop never reaches six, seven or eight.',
    }),
    sl('concept', 'continue: skipping one pass', {
      b: `${F(B.cContLoop)}\n\nThe **continue** statement skips the rest of the **current pass**. In a for loop control goes to the update, and then to the test.`,
      v: vBC,
      n: 'The continue statement skips the rest of the current pass only. In a for loop control goes to the update, and then to the test, so the loop goes on. Compare the two loops. With break, the output stops after four. With continue, only the value five is missing and the loop runs on to eight. This is the difference between break and continue.',
    }),
    sl('example', 'Worked example 3: break and continue together', {
      b: `${F(cEx3)}\n\nTrace the loop for each \`i\`: first the test for \`continue\`, then the test for \`break\`, then the print.`,
      v: vEx3,
      n: 'Let us trace a loop that uses both statements. Multiples of five are skipped with continue. When the square of i is above sixty, break ends the loop. For one, two, three and four, the number is printed. Five is skipped. Six and seven are printed. For eight the square is sixty four, so break ends the loop. The printed numbers are one, two, three, four, six and seven.',
    }),
    sl('check', 'Quick check: break and continue', {
      b: 'Write the exact output.',
      chk: 'co_break_continue',
      n: 'Follow the two tests in order for each value of i, and remember where break leaves the loop.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. For and while loops are entry controlled, and the do while loop is exit controlled, with a semicolon after its condition. A for loop can be converted into a while or do while loop by moving the initialisation before the loop and the update into the body. Count passes by listing the values that satisfy the test. Infinite loops never end, delay loops have an empty body, and break leaves a loop while continue skips one pass.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'To count passes or find output, make a trace table: one row for each value of the loop variable, ending with the failing test.',
        'When you convert loops, keep the initialisation, the test and the update; do not forget the semicolon after do-while.',
        'A semicolon right after a for or while header is an empty body: the next statement runs only once.',
        'break leaves the loop; continue skips one pass and the for loop still executes its update.',
        'Never write an infinite loop in an answer unless a break ends it.',
      ],
      n: 'Some exam tips. To count passes or find output, make a trace table with one row for each value of the loop variable, and end with the test that fails. When you convert loops, keep the three parts and do not forget the semicolon after a do while. A semicolon right after a loop header is an empty body. Break leaves the loop, and continue skips only one pass. Never leave an infinite loop in an answer unless a break ends it.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Number programs, nested for loops and series',
  goals: [
    'Extract and process the digits of a number with % and /',
    'Write loop programs for prime, perfect, Armstrong, palindrome, Fibonacci, HCF and LCM',
    'Write nested for loops for rectangular and right-angled triangular patterns',
    'Find the sum of a series in one variable with a loop and Math.pow',
  ],
  slides: [
    sl('title', 'Programs with loops', {
      b: 'Part 2: digits of a number, reverse and palindrome, prime, perfect, Armstrong, Fibonacci, HCF and LCM, then **nested for loops**, patterns and **series**.',
      v: vRoute2,
      n: 'Welcome to Part 2. Here we use loops to solve problems. We start by taking a number apart digit by digit. Then we write programs to reverse a number and test for palindrome, prime, perfect and Armstrong numbers, to print a Fibonacci series, and to find the HCF and LCM. After that we study nested for loops, print rectangular and triangular patterns, and find the sum of a series.',
    }),
    sl('concept', 'Taking a number apart', {
      b: `${F(C.cExtract(4825))}\n\nFor an int \`n\`, **n % 10** is the last digit and **n / 10** removes it. Repeat while \`n > 0\`.`,
      v: vExtract,
      n: 'To take a number apart, use two operators. The remainder after division by ten is the last digit. Integer division by ten removes the last digit. In the loop for four thousand eight hundred twenty five, the digits come out as five, two, eight and four, and n shrinks until it reaches zero, which ends the loop.',
    }),
    sl('example', 'Worked example 1: digit count and digit sum', {
      b: `${F(cDigits(4825))}\n\nTrace the loop for 4825: take the digit, count it, add it, and remove it.`,
      v: vEx1b,
      n: 'In this program each pass takes the last digit, counts it, adds it to the sum, and removes it from n. For four thousand eight hundred twenty five the digits are five, two, eight and four. The count reaches four and the sum reaches nineteen. The program prints the two results after the loop.',
    }),
    sl('check', 'Quick check: the two operators', {
      b: 'Fill in the blanks.',
      chk: 'fb_digit',
      n: 'Recall which operator gives the last digit and which operator removes it.',
    }),
    sl('concept', 'Reversing a number', {
      b: `${F(C.cRev(3472))}\n\nEach digit is added at the right end of \`rev\`: **rev = rev * 10 + d**.`,
      v: vRev,
      n: 'To reverse a number, build a new number digit by digit. Before adding a digit, multiply rev by ten to move the earlier digits one place to the left. For three thousand four hundred seventy two, rev becomes two, then twenty seven, then two hundred seventy four, and finally two thousand seven hundred forty three.',
    }),
    sl('concept', 'Palindrome numbers', {
      b: `${F(C.cPalin(1221))}\n\nA number is a **palindrome** if it equals its **reverse**. Work on a **copy** of the number so that the original is still available for the comparison.`,
      v: vPalin,
      n: 'A palindrome reads the same from both ends. To test one, reverse a copy of the number and compare the reverse with the original. The copy is needed because the loop destroys the number it works on. The table shows that one thousand two hundred twenty one and twelve thousand three hundred twenty one are palindromes, and four thousand five hundred ninety two is not.',
    }),
    sl('concept', 'Prime numbers', {
      b: `${F(C.cPrime(29))}\n\nA **prime number** has exactly **two factors**, 1 and itself. Count the factors from 1 to n and test whether the count is 2.`,
      v: vPrime,
      n: 'A prime number has exactly two factors, one and itself. The program counts the factors of n with a loop from one to n. Thirteen and twenty nine have two factors, so they are prime. Twenty one has four factors, so it is not prime. The number one has only one factor, so it is not prime either.',
    }),
    sl('concept', 'Perfect numbers', {
      b: `${F(C.cPerfect(28))}\n\nA **perfect number** equals the **sum of its factors other than itself**. The loop therefore stops at **n - 1**.`,
      v: vPerfectFlow,
      n: 'A perfect number is equal to the sum of its factors other than itself. The flow shows the plan. Start with the sum zero. Loop the counter from one to n minus one, and add every counter value that divides n. At the end compare the sum with n. The number itself is not added, which is why the loop stops one short of n.',
    }),
    sl('example', 'Worked example 2: perfect or not?', {
      b: 'Run the perfect-number test for 6, 12 and 28 and list the factors found.',
      v: vEx2,
      n: 'Let us test three numbers. The factors of six other than six itself are one, two and three, and they add up to six, so six is perfect. For twelve the factors one, two, three, four and six add up to sixteen, which is not twelve, so twelve is not perfect. For twenty eight the factors add up to twenty eight, so twenty eight is perfect.',
    }),
    sl('concept', 'Armstrong numbers', {
      b: `${F(C.cArm(153))}\n\nAn **Armstrong number** equals the sum of its digits, each raised to the **power of the number of digits**. Count the digits first, then add the powers with \`(int) Math.pow(d, digits)\`.`,
      v: vArm,
      n: 'An Armstrong number equals the sum of its digits, each raised to the power of the number of digits. The program first counts the digits, then adds the powers. The Math dot pow method returns a double, so it must be cast to int. For one hundred fifty three the cubes are one, one hundred twenty five and twenty seven, and they add up to one hundred fifty three. For one hundred twenty three the sum is thirty six.',
    }),
    sl('concept', 'The Fibonacci series', {
      b: `${F(C.cFib)}\n\nEach new term is the **sum of the two terms before it**. The new term is found first, and then a and b move one term forward.`,
      v: vFib,
      n: 'In a Fibonacci series each term is the sum of the two terms before it. Start with a as zero and b as one. In each pass, first calculate the new term c as a plus b. Then move a to the old b and b to the new term. The trace shows the new terms one, two, three, five, eight and thirteen, which follow the first two terms zero and one.',
    }),
    sl('check', 'Quick check: order of statements', {
      b: 'Arrange the three statements of the loop body.',
      chk: 'ord_fib',
      n: 'The new term must be calculated before a and b are changed.',
    }),
    sl('concept', 'HCF and LCM', {
      b: `${F(C.cHcf(84, 120))}\n\nThe loop remembers the **last** common factor, which is the largest: the **HCF**. Then **LCM = a * b / hcf**.`,
      v: vHcf,
      n: 'To find the HCF, test every number from one up to the smaller of the two numbers. Each number that divides both is stored, so the last one stored is the largest. The LCM follows from the fact that the HCF times the LCM equals the product of the two numbers. For eighty four and one hundred twenty the HCF is twelve and the LCM is eight hundred forty.',
    }),
    sl('concept', 'Nested for loops', {
      b: 'A **nested loop** is a loop inside the body of another loop. The inner loop runs **completely** for every pass of the outer loop, so the inner body executes **rows x columns** times.',
      v: vNestGrid,
      n: 'A nested for loop is a for loop placed inside the body of another for loop. The grid shows an outer loop with three passes, one for each row, and an inner loop with four passes in every row. The inner loop runs completely for each pass of the outer loop, so the inner body is executed three times four, which is twelve times.',
    }),
    sl('concept', 'Rectangular patterns', {
      b: `${F(D.cRect(3, 5))}\n\nThe outer loop counts the **rows**, the inner loop prints the items of **one row**, and \`System.out.println()\` after the inner loop starts a **new line**.`,
      v: vRect,
      n: 'In a rectangular pattern the inner limit is a fixed number. The outer loop counts the rows. The inner loop prints the items of one row. The empty println after the inner loop moves to the next line. Three rows with five stars each print a block of fifteen stars, and the second row of the table shows a block of hash symbols.',
    }),
    sl('concept', 'Right-angled triangle patterns', {
      b: `${F(D.cTriUp)}\n\nIn a **triangle** the inner limit **depends on the outer variable**, for example \`j <= i\`. Other limits such as \`5 - i\` make the rows shorter instead.`,
      v: vTri,
      n: 'In a triangle pattern the inner limit depends on the outer variable. With j less than or equal to i, row one has one item, row two has two, and so on. The table shows the same shape with j printed, with i printed, and with stars. The limit five minus i makes the rows shorter instead, so the triangle shrinks.',
    }),
    sl('example', 'Worked example 3: a decreasing triangle', {
      b: `${F(cDownStars)}\n\nHere the **outer** variable counts **down** from 5 to 1, and the inner loop prints \`i\` stars.`,
      v: vEx3b,
      n: 'In this program the outer variable i counts down from five to one. Each row prints i stars, because the inner loop runs while j is at most i. The first row has five stars, the second four, and so on, down to one star in the last row. The table lists each row with its number of stars.',
    }),
    sl('check', 'Quick check: count the passes', {
      b: 'Write the exact output.',
      chk: 'co_nested_count',
      n: 'The inner loop starts at the value of i, so it runs fewer times in each later row.',
    }),
    sl('concept', 'Sum of a series', {
      b: `${F(D.cSeriesDiv)}\n\nThe series \`1 + x/2 + x^2/3 + ...\` has the term \`Math.pow(x, i - 1) / i\`. Add each term to a **sum that starts at 0**.`,
      v: vSeriesTrace,
      n: 'To find the sum of a series, find a formula for the term in terms of the loop variable i, and add it to a sum that starts at zero. Here the term is x to the power i minus one, divided by i. With x equal to three the terms are one, one point five, three and six point seven five, and the sum after four terms is twelve point two five.',
    }),
    sl('concept', 'Choosing the statement for a series', {
      b: 'Write the term of the series in terms of `i`. Use **Math.pow** for powers, a **double** sum, and **1.0 / i** for fractions so that the division does not become an integer division.',
      v: vSeriesForms,
      n: 'The table shows four common series and the statement that adds each term. The sum of the natural numbers adds i. The squares add i times i. The reciprocal series adds one point zero divided by i, and the decimal point matters, because one divided by i with two ints would be an integer division. Powers of a number use Math dot pow.',
    }),
    sl('check', 'Quick check: a series', {
      b: 'Choose the correct output.',
      chk: 'm_series_val',
      n: 'Find each term with Math dot pow, add them, and remember that the sum is a double.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. The remainder by ten gives the last digit and division by ten removes it. A reverse is built with rev times ten plus the digit, and a palindrome equals its reverse. A prime has two factors and a perfect number equals the sum of its smaller factors. An Armstrong number uses the power of the number of digits. In a nested loop, the inner loop runs fully for each outer pass. In a series, add each term to a sum that starts at zero.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Work on a copy of the number when you extract digits, if the original is needed later.',
        'A perfect-number loop stops at n - 1; a prime test needs n > 1.',
        'Cast Math.pow to int when the result is stored in an int, and use 1.0 / i for fractional terms.',
        'In a pattern program put System.out.println() after the inner loop, inside the outer loop.',
        'Show a variable description and a sample output with every program.',
      ],
      n: 'Some exam tips. Work on a copy of the number when you extract digits, if the original is needed later. A perfect number loop stops at n minus one, and a prime test needs n greater than one. Cast the result of Math dot pow to int when it is stored in an int. In a pattern program put the empty println after the inner loop. Always add a variable description and a sample output to a program.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Iterative Constructs and Nested Loops: notes',
  sections: [
    {
      h: '1. Loops and the for loop',
      t: 1,
      b: `A **loop** (iterative construct) repeats a statement or block while a condition is true. Every loop has an **initialisation**, a **test**, a **body** and an **update**; each execution of the body is an **iteration** or pass.\n\nThe **for** loop keeps the three control parts in one header:\n\n${F(A.cForSum)}\n\nOutput:\n\n\`\`\`\n${out(A.cForSum)}\n\`\`\`\n\nThe initialisation is done once; the test is made before every pass; the update follows the body.`,
      terms: [
        ['Loop', 'A construct that repeats a statement or a block of statements as long as a condition is true.'],
        ['Iteration', 'One execution of the body of a loop.'],
        ['for loop', 'An entry-controlled loop that keeps the initialisation, the test and the update in one header.'],
      ],
      v: vForFlow,
      vs: [vParts, vEx1],
    },
    {
      h: '2. while, do-while, entry and exit control, and conversion',
      t: 1,
      b: `The **while** loop has the test in its header; the initialisation comes before the loop and the update is inside the body. The **do-while** loop runs the body first and tests afterwards, so it runs **at least once**; its condition ends with a semicolon.\n\n${F(A.cWhileMult)}\n\n${F(A.cDoMult)}\n\nBoth print ${ic(out(A.cWhileMult))}, as does the for loop ${ic('for (int i = 3; i <= 15; i += 3)')}.\n\nWith n = 10 and the condition n < 5 the while loop prints ${ic(out(A.cWhileFalse))} only, but the do-while loop prints ${ic(oline(A.cDoFalse))}.\n\n**Counting passes:** list the values of the loop variable that satisfy the test. For example ${ic('for (int i = 2; i <= 20; i += 4)')} takes the values ${out(code('for (int i = 2; i <= 20; i += 4)', '    System.out.print(i + " ");'))}, so the body runs ${num(A.countFor('int i = 2', 'i <= 20', 'i += 4'))} times.`,
      terms: [
        ['Entry-controlled loop', 'A loop that tests its condition before the body is executed (for and while); the body may not run at all.'],
        ['Exit-controlled loop', 'A loop that tests its condition after the body is executed (do-while); the body runs at least once.'],
      ],
      v: vWhileFor,
      vs: [vDoFlow, vEntryExit, vConvert, vCount],
    },
    {
      h: '3. Variations: counters, infinite loops and delay loops',
      t: 2,
      b: `**Several counters:** a for header may initialise and update several variables, separated by commas, with one test.\n\n${F(B.cMulti(2))}\n\nOutput: ${ic(out(B.cMulti(2)))}.\n\n**Infinite loop:** a loop whose condition never becomes false (for example the condition true, a missing update, or ${ic('for (;;)')}). It is ended only by break (or by correcting the update). Such a loop is never run in these notes; a bounded version prints ${ic(out(B.cBounded))}.\n\n**Delay loop:** a loop with an empty body used only to use up time. ${ic('for (int i = 1; i <= 5; i++);')} leaves i equal to ${out(B.cEmptyBody)} after the loop, and a statement after such a semicolon runs only once.`,
      terms: [
        ['Infinite loop', 'A loop whose condition never becomes false, so it never ends by itself.'],
        ['Delay loop', 'A loop with an empty body that is repeated many times only to use up time.'],
      ],
      v: vMulti,
      vs: [vInfinite, vDelay],
    },
    {
      h: '4. break and continue',
      t: 2,
      b: `**break** ends the loop at once; control goes to the first statement after the loop. **continue** skips the rest of the current pass; in a for loop control goes to the update and then to the test. Both are written inside an if in the body, and neither may be used outside a loop (or switch).\n\n${F(B.cBreakLoop)}\n\nOutput: ${ic(out(B.cBreakLoop))}. With continue in place of break the output is ${ic(out(B.cContLoop))}.`,
      terms: [
        ['break', 'A statement that ends the loop (or switch) in which it is written and passes control to the statement after it.'],
        ['continue', 'A statement that skips the remaining statements of the current pass of a loop and goes on with the next pass.'],
      ],
      v: vBreak,
      vs: [vBC, vEx3],
    },
    {
      h: '5. Programs on numbers',
      t: 3,
      b: `**Digits:** for an int n, ${ic('n % 10')} is the last digit and ${ic('n / 10')} removes it; loop while n > 0. Digit sum of 4825 and number of digits: ${ic(oline(cDigits(4825)))}.\n\n**Reverse and palindrome:** ${ic('rev = rev * 10 + d')} (the reverse of 3472 is ${out(C.cRev(3472))}); a number is a palindrome if it equals its reverse; work on a copy.\n\n**Prime:** exactly two factors. ${ic(out(C.cPrime(29)))}; ${ic(out(C.cPrime(21)))}. With a boolean flag and break the search stops at the first divisor: ${ic(out(C.cPrimeBreak(91)))}.\n\n**Perfect:** equals the sum of its factors other than itself (loop to n - 1): ${ic(out(C.cPerfect(28)))}; ${ic(out(C.cPerfect(12)))}.\n\n**Armstrong:** equals the sum of its digits each raised to the power of the number of digits, using ${ic('(int) Math.pow(d, digits)')}: ${ic(out(C.cArm(153)))}; ${ic(out(C.cArm(123)))}.\n\n**Fibonacci:** each term is the sum of the two before it; compute c first, then a = b and b = c:\n\n${F(C.cFib)}\n\nOutput: ${ic(out(C.cFib))}.\n\n**HCF and LCM:** the HCF is the last i that divides both numbers, and the LCM is ${ic('a * b / hcf')}: for 84 and 120, ${ic(oline(C.cHcf(84, 120)))}. Euclid's way (repeat the remainder) also gives ${out(C.cEuclid(84, 36))} for 84 and 36.`,
      terms: [
        ['Palindrome number', 'A number that is equal to the number formed by reversing its digits.'],
        ['Prime number', 'A number greater than 1 that has exactly two factors, 1 and itself.'],
        ['Perfect number', 'A number that is equal to the sum of its factors other than itself.'],
        ['Armstrong number', 'A number that is equal to the sum of its digits, each raised to the power of the number of digits.'],
        ['Fibonacci series', 'A series in which each term is the sum of the two terms before it.'],
      ],
      v: vExtract,
      vs: [vEx1b, vRev, vPalin, vPrime, vPrimeBreak, vEx2, vArm, vFib, vHcf],
    },
    {
      h: '6. Nested for loops and patterns',
      t: 4,
      b: `A **nested loop** has one loop in the body of another. The inner loop runs completely for each pass of the outer loop, so its body executes (outer passes) x (inner passes) times. In pattern programs the **outer loop counts the rows**, the **inner loop prints one row**, and ${ic('System.out.println();')} after the inner loop starts a new line.\n\n**Rectangle** (inner limit fixed):\n\n${F(D.cRect(3, 5))}\n\nOutput: ${ic(oline(D.cRect(3, 5)))} (lines shown separated by a slash).\n\n**Right-angled triangle** (inner limit depends on i):\n\n${F(D.cTriUp)}\n\nOutput: ${ic(oline(D.cTriUp))}. The limit ${ic('5 - i')} makes the rows shorter, and counting the outer variable down also reverses the shape.`,
      terms: [
        ['Nested loop', 'A loop that is placed inside the body of another loop.'],
        ['Pattern', 'A figure of symbols or numbers displayed row by row with nested loops.'],
      ],
      v: vNestGrid,
      vs: [vNestRun, vRect, vTri, vEx3b],
    },
    {
      h: '7. Series with one variable',
      t: 4,
      b: `To find the sum of a **series**, write the term in terms of the loop variable i and add it to a sum that starts at 0. Use ${ic('Math.pow(x, i)')} for powers (it returns a double) and ${ic('1.0 / i')} for fractions, because ${ic('1 / i')} with two ints is an integer division.\n\n${F(D.cSeriesDiv)}\n\nThe last line shows the sum of 1 + x/2 + x^2/3 + x^3/4 for x = 3: ${ic(out(D.cSeriesDiv).split('\n').pop())}.`,
      terms: [
        ['Series', 'A sum of terms that follow a rule, found in a program by adding each term to a running sum inside a loop.'],
        ['Math.pow(a, b)', 'A method that returns a raised to the power b as a double.'],
      ],
      v: vSeriesTrace,
      vs: [vSeriesForms],
    },
  ],
  tips: '**Common mistakes**\n- A semicolon after a for or while header: the body is empty and the next statement runs once.\n- Forgetting the semicolon after the condition of a do-while.\n- Forgetting the update, which makes the loop infinite.\n- Off-by-one errors with < and <= when counting passes.\n- Destroying the number while extracting digits and then comparing with the changed value.\n- Using 1 / i instead of 1.0 / i, or storing Math.pow in an int without a cast.\n- Putting println inside the inner loop of a pattern, or after the outer loop.\n- Using the same variable name in the outer and the inner loop.\n\n**How marks are usually awarded**\n- Output questions: each line in the exact order and format; for a trace, show the values of the variables.\n- Error questions: the error named, with the line.\n- Programs (15 marks): class and method structure, input, loop logic (limits, update, condition), output, variable description or comments.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a loop?', 'A construct that repeats a statement or block as long as a condition is true.', 'definition', 1],
  ['Name the four parts of a loop', 'Initialisation, test (condition), body and update.', 'fact', 1],
  ['What is an entry-controlled loop?', 'A loop that tests its condition before the body: for and while. The body may not run at all.', 'definition', 1],
  ['What is an exit-controlled loop?', 'A loop that tests its condition after the body: do-while. The body runs at least once.', 'definition', 1],
  ['Which loop runs its body at least once?', 'The do-while loop.', 'fact', 1],
  ['What must follow the condition of a do-while?', `A semicolon. Without it javac reports "${mustFail(code('int n = 1;', 'do {', '    n++;', '} while (n <= 3)', 'System.out.println(n);'))}".`, 'exam-tip', 1],
  ['Output of a for loop and a while loop for the multiples of 3 up to 15', ic(out(A.cForMult)), 'example', 1],
  ['How to convert a for loop to a while loop', 'Move the initialisation before the loop, keep the test, and put the update as the last statement of the body.', 'concept', 1],
  ['How to count the passes of a loop', 'List the values of the loop variable that satisfy the test; their number is the number of passes (0 if the test is false at the start).', 'concept', 1],
  ['While and do-while with n = 10 and condition n < 5', `while prints ${ic(out(A.cWhileFalse))} only; do-while prints ${ic(oline(A.cDoFalse))}.`, 'example', 1],
  ['What is an infinite loop?', 'A loop whose condition never becomes false, so it never ends by itself (for example while (true) without break, or a missing update).', 'definition', 2],
  ['Name two causes of an infinite loop', 'A condition that is always true, and a missing or wrong update statement.', 'fact', 2],
  ['What is a delay loop?', 'A loop with an empty body that repeats many times only to use up time.', 'definition', 2],
  ['What does a semicolon after a for header do?', `It is an empty body. After ${ic('for (i = 1; i <= 5; i++);')} the value of i is ${out(B.cEmptyBody)}, and the next statement runs only once.`, 'exam-tip', 2],
  ['Two counters in a for header', `Separate them with commas: ${ic('for (int a = 1, b = 10; a < b; a += 2, b -= 2)')} prints ${ic(out(B.cMulti(2)))}.`, 'fact', 2],
  ['What does break do?', 'Ends the loop (or switch) at once; control goes to the statement after it.', 'definition', 2],
  ['What does continue do?', 'Skips the rest of the current pass; in a for loop the update and then the test follow.', 'definition', 2],
  ['break against continue on the same loop (skip i == 5)', `break prints ${ic(out(B.cBreakLoop))}; continue prints ${ic(out(B.cContLoop))}.`, 'example', 2],
  ['Last digit of n and removing it', 'n % 10 gives the last digit; n / 10 removes it.', 'fact', 3],
  ['How to reverse a number', 'In a loop: d = n % 10; rev = rev * 10 + d; n = n / 10.', 'concept', 3],
  ['When is a number a palindrome?', 'When it is equal to its reverse (compare with the original, so work on a copy).', 'definition', 3],
  ['What is a prime number?', 'A number with exactly two factors, 1 and itself. 1 is not prime.', 'definition', 3],
  ['What is a perfect number?', `A number equal to the sum of its factors other than itself. ${ic(out(C.cPerfect(28)))}.`, 'definition', 3],
  ['Why does the perfect-number loop stop at n - 1?', 'The number itself is not added to the sum of its factors.', 'exam-tip', 3],
  ['What is an Armstrong number?', 'A number equal to the sum of its digits each raised to the power of the number of digits (153 = 1 cubed + 5 cubed + 3 cubed).', 'definition', 3],
  ['Math.pow in an int variable', `Math.pow returns a double, so int p = Math.pow(3, 4); gives "${mustFail(code('int p = Math.pow(3, 4);'))}". Cast it: (int) Math.pow(3, 4).`, 'exam-tip', 3],
  ['Fibonacci loop body in the right order', 'c = a + b; a = b; b = c;', 'fact', 3],
  ['First eight Fibonacci terms', ic(out(C.cFib)), 'example', 3],
  ['How to find the HCF with a loop', 'Test every i from 1 to the smaller number; store the last i that divides both.', 'concept', 3],
  ['How to find the LCM from the HCF', 'LCM = a * b / hcf (HCF x LCM = a x b).', 'fact', 3],
  ['What is a nested loop?', 'A loop placed inside the body of another loop; the inner loop runs fully for each pass of the outer loop.', 'definition', 4],
  ['Number of executions of the inner body', 'Outer passes x inner passes (for 4 and 3 it is 12).', 'fact', 4],
  ['Where does System.out.println() go in a pattern?', 'After the inner loop, inside the outer loop, to end each row.', 'exam-tip', 4],
  ['Inner limit for a triangle and a rectangle', 'Triangle: the limit depends on the outer variable (j <= i). Rectangle: a fixed limit.', 'concept', 4],
  ['Sum of a series in one variable', 'Write the term in terms of i, and add it to a sum that starts at 0; use Math.pow for powers and 1.0 / i for fractions.', 'concept', 4],
]);

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): Iterative Constructs and Nested Loops',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1 to 6 are multiple-choice (1 mark each); questions 7 and 8 carry 2 marks each.', items: ['m_entry_exit', 'm_break_trace', 'm_reverse', 'm_prime_count', 'm_nested_count', 'm_series_term', 's_break_continue', 's_pattern_stmt'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Attempt any ONE of the two programs. Write the program in Java with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_plate', 'l_tiles'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): Iterative Constructs and Nested Loops',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1 to 10 are multiple-choice (1 mark each); questions 11 to 13 are short answers and questions 14 and 15 are predict-the-output items, 2 marks each.', items: ['m_loop_def', 'm_dowhile_syntax', 'm_convert', 'm_infinite_def', 'm_continue_for', 'm_multi_counter', 'm_last_digit', 'm_perfect', 'm_arm_power', 'm_tri_out', 's_convert', 's_hcf_lcm', 's_series_stmt', 'co_digit_sum', 'co_tri_dec'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Attempt any TWO of the three programs. Write each program in Java with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_quiz', 'l_series', 'l_stall'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t04 of icse-10-computer-applications-ch05 only; nested while and nested do-while loops and patterns other than rectangles and right-angled triangles are not taught or tested',
    originality: 'every program, scenario and data value written for this chapter by SOYL with imagined names; no textbook, specimen or past-paper program reused',
    execution: 'every output, value and error in items, slides, notes and flashcards produced by compiling and running the code with JDK 21 (runJava in lib.mjs); results cached in src/java-cache.json; no infinite loop is ever run',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
