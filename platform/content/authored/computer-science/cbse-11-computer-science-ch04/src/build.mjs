// Build CBSE 11 Computer Science ch04 Flow of Control. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-11-computer-science-ch04/src/build.mjs
// Every output, trace table, count and error message shown in decks, notes and flashcards is produced by running the
// Python program with pyOut()/pyErr() (recorded in src/py-cache.json); nothing is typed by hand.
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, setAuthor, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache, pyOut, pyErr } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-11-computer-science-ch04', 'computer-science');
setAuthor('claude-sonnet-5-5 (writer; reviewed by the subject-producer)');
usePyCache(SRC);
const { F, O, code, ic, rowsOf, mdTable, rng, capped, val, listOf, truths, sortSrc } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const S = (rows) => rows.map((r) => r.map(String));
/** Output lines of a program, each split at spaces: the rows of a trace table. */
const outRows = (src, opts) => pyOut(src, opts).split('\n').map((l) => l.split(' '));
const wordsOf = (s) => s.trim().split(/\s+/).length;

// ---------------------------------------------------------------- programs used in decks (not used as item stems)
const ticketSrc = (age) => code(`age = ${age}`, 'if age >= 60:', '    fare = 0', 'else:', '    fare = 25', 'print("Fare:", fare)');
const gradeSrc = (m) => code(`marks = ${m}`, 'if marks >= 80:', '    grade = "A"', 'elif marks >= 60:', '    grade = "B"', 'elif marks >= 40:', '    grade = "C"', 'else:', '    grade = "D"', 'print(grade)');
const parcelSrc = (w, good) => code(`weight = ${w}`, `if weight >= ${good ? 5 : 1}:`, `    label = "${good ? 'Heavy' : 'Standard'}"`, `elif weight >= ${good ? 1 : 5}:`, `    label = "${good ? 'Standard' : 'Heavy'}"`, 'else:', '    label = "Tiny"', 'print(label)');
const museumSrc = (age, student) => code(`age = ${age}`, `student = ${student ? 'True' : 'False'}`, 'if age >= 18:', '    print("Adult entry")', '    if student:', '        print("Student discount")', 'else:', '    print("Child entry")', '    if student:', '        print("School group pass")');
const evenSevenSrc = (n) => code(`n = ${n}`, 'if n % 2 == 0 and n % 7 == 0:', '    print("Even multiple of 7")', 'elif n % 2 == 0:', '    print("Even")', 'elif n % 7 == 0:', '    print("Odd multiple of 7")', 'else:', '    print("Other")');
const sortTrace = (a, b, c) => rowsOf(code(`a, b, c = ${a}, ${b}, ${c}`, 'rows = [["start", a, b, c]]', 'if a > b:', '    t = a', '    a = b', '    b = t', 'rows.append(["after first if", a, b, c])', 'if b > c:', '    t = b', '    b = c', '    c = t', 'rows.append(["after second if", a, b, c])', 'if a > b:', '    t = a', '    a = b', '    b = t', 'rows.append(["after third if", a, b, c])', 'import json', 'print(json.dumps(rows))'));
const showSave = code('saved = 0', 'for week in range(1, 6):', '    saved = saved + 50', '    print(week, saved)');
const showPond = code('n = 5', 'week = 0', 'while n < 200:', '    n = n * 2', '    week = week + 1', '    print(week, n)', 'print("Weeks:", week)');
const bcSrc = (kw) => code('for n in range(1, 9):', '    if n % 4 == 0:', `        ${kw}`, '    print(n, end=" ")');
const showPrime = code('n = 35', 'prime = True', 'for d in range(2, n):', '    print(d, n % d)', '    if n % d == 0:', '        prime = False', '        break', 'print(prime)');
const showGrid = code('for r in range(1, 4):', '    for c in range(1, 5):', '        print(r * c, end=" ")', '    print()');
const showStars = code('for r in range(1, 5):', '    for c in range(r):', '        print("*", end="")', '    print()');
const showFact = code('n = 6', 'f = 1', 'for k in range(1, n + 1):', '    f = f * k', '    print(k, f)');
const showAge = code('age = 65', 'if age >= 60:', '    fare = 0', 'else:', '    fare = 25', 'print("Fare:", fare)');
const tfWord = (expr, xs) => pyOut(`print(", ".join(str(bool(${expr})) for x in ${JSON.stringify(xs)}))`);

// ---------------------------------------------------------------- flowchart symbols drawn with the Svg builder
const ST = { fill: 'fill', color: 'accent', sw: 1.6 };
const term = (s, cx, cy, t, w = 100, h = 32) => { s.rect(cx - w / 2, cy - h / 2, w, h, { ...ST, rx: h / 2 }); s.text(cx, cy, t, { size: 13, bold: true }); };
const proc = (s, cx, cy, t, w = 150, h = 34) => { s.rect(cx - w / 2, cy - h / 2, w, h, { ...ST, rx: 2 }); s.text(cx, cy, t, { size: 13 }); };
const io = (s, cx, cy, t, w = 130, h = 34) => { const k = 14; s.polygon([[cx - w / 2 + k, cy - h / 2], [cx + w / 2 + k, cy - h / 2], [cx + w / 2 - k, cy + h / 2], [cx - w / 2 - k, cy + h / 2]], ST); s.text(cx, cy, t, { size: 13 }); };
const dec = (s, cx, cy, t, w = 150, h = 76) => { s.polygon([[cx, cy - h / 2], [cx + w / 2, cy], [cx, cy + h / 2], [cx - w / 2, cy]], ST); s.text(cx, cy, t, { size: 13 }); };
const down = (s, x, y1, y2) => s.arrow(x, y1, x, y2, { sw: 1.6 });
const lbl = (s, x, y, t) => s.text(x, y, t, { size: 12, color: 'accent', bold: true });

const vIfElse = (() => {
  const s = new Svg(400, 440);
  term(s, 200, 26, 'Start'); down(s, 200, 42, 70);
  io(s, 200, 88, 'Read age'); down(s, 200, 105, 130);
  dec(s, 200, 170, 'age >= 60 ?', 160, 80);
  s.polyline([[120, 170], [80, 170], [80, 250]], { sw: 1.6 }); s.head(80, 252, 0, 1); lbl(s, 100, 158, 'Yes');
  s.polyline([[280, 170], [320, 170], [320, 250]], { sw: 1.6 }); s.head(320, 252, 0, 1); lbl(s, 300, 158, 'No');
  proc(s, 80, 270, 'fare = 0', 110); proc(s, 320, 270, 'fare = 25', 110);
  s.polyline([[80, 287], [80, 325], [200, 325]], { sw: 1.6 }); s.polyline([[320, 287], [320, 325], [200, 325]], { sw: 1.6 });
  down(s, 200, 325, 348);
  io(s, 200, 366, 'Print fare'); down(s, 200, 383, 402);
  term(s, 200, 420, 'End');
  return s.visual('Flowchart of the if-else fare program: Start, read age, a decision age greater than or equal to 60; on Yes the fare becomes 0, on No the fare becomes 25; both paths join, print the fare, End', 'if-else: one test, two blocks, and the paths join again.');
})();
const vWhileSvg = (() => {
  const s = new Svg(460, 420);
  term(s, 200, 24, 'Start'); down(s, 200, 40, 62);
  proc(s, 200, 80, 'n = 5, week = 0', 170); down(s, 200, 97, 124);
  dec(s, 200, 164, 'n < 200 ?', 150, 80);
  down(s, 200, 204, 236); lbl(s, 220, 220, 'Yes');
  proc(s, 200, 254, 'n = n * 2, week = week + 1', 230, 36);
  s.polyline([[85, 254], [40, 254], [40, 164], [125, 164]], { sw: 1.6 }); s.head(125, 164, 1, 0);
  s.polyline([[275, 164], [370, 164], [370, 236]], { sw: 1.6 }); s.head(370, 237, 0, 1); lbl(s, 322, 152, 'No');
  io(s, 370, 254, 'Print week', 120); down(s, 370, 271, 300);
  term(s, 370, 318, 'End');
  return s.visual('Flowchart of a while loop: Start, set n to 5 and week to 0, decision n less than 200; on Yes double n and add 1 to week and return to the decision; on No print week and End', 'while: the test comes first, and the body changes the variable the test reads.');
})();

// ---------------------------------------------------------------- Part 1 visuals
const vRoute1 = flow('LR', ['Kinds of flow', 'if and if-else', 'elif chains', 'Nested if', 'Flowcharts and programs'], 'Route map of Part 1: the three kinds of flow, if and if-else, elif chains, nested if, and flowcharts with complete programs', 'Part 1 at a glance');
const vKinds = table(
  ['Kind of flow', 'What happens', 'Python'],
  [
    ['Sequential', 'Statements run one after another in the order written', 'Ordinary statements'],
    ['Conditional (selection)', 'A condition chooses which block runs', '`if`, `if-else`, `if-elif-else`'],
    ['Iterative (repetition)', 'A block runs again and again', '`for` loop, `while` loop'],
  ],
  'Table of the three kinds of flow of control: sequential, conditional (selection) and iterative (repetition), with what happens and the Python statements for each',
);
const mixedIndent = code('x = 3', 'if x > 2:', '    print("big")', '      print("very big")');
const vIndent = table(
  ['Version of the if block', 'What Python does'],
  [
    ['Body indented by 4 spaces under the `if` line', `Runs: ${ic(pyOut(code('x = 3', 'if x > 2:', '    print("big")')))} is printed`],
    ['Body written at the same level as `if`', ic(pyErr(code('x = 3', 'if x > 2:', 'print("big")')))],
    ['Two lines of one block indented by different amounts', ic(pyErr(mixedIndent))],
  ],
  'Table comparing three versions of an if block: a correctly indented body runs; a body at the same level as if gives an indentation error; lines of one block indented by different amounts give an unexpected indent error',
  'The error lines come from running each program.',
);
const ages = [12, 45, 59, 60, 72];
const vTicket = table(
  ['age', 'Condition `age >= 60`', 'Printed'],
  ages.map((a) => [String(a), tfWord('x >= 60', [a]), pyOut(ticketSrc(a))]),
  `Table of the fare program for ages ${ages.join(', ')}: the printed lines are ${ages.map((a) => pyOut(ticketSrc(a))).join('; ')}`,
  'Each line found by running the program.',
);
const vElifFlow = flow('TB', ['Read marks', 'Marks 80 or more?', 'Grade A', 'Marks 60 or more?', 'Grade B', 'Marks 40 or more?', 'Grade C', 'Grade D', 'Print the grade'], 'Flow of an if-elif-else chain for grades: read marks; if 80 or more the grade is A, else if 60 or more it is B, else if 40 or more it is C, otherwise D; every path then prints the grade', 'The tests are made from the top; the first Yes ends the search.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3', label: 'Yes' }, { from: 'n2', to: 'n4', label: 'No' }, { from: 'n4', to: 'n5', label: 'Yes' }, { from: 'n4', to: 'n6', label: 'No' },
  { from: 'n6', to: 'n7', label: 'Yes' }, { from: 'n6', to: 'n8', label: 'No' }, { from: 'n3', to: 'n9' }, { from: 'n5', to: 'n9' }, { from: 'n7', to: 'n9' }, { from: 'n8', to: 'n9' },
]);
const marksList = [35, 40, 59, 60, 79, 80, 92];
const vGrade = table(
  ['marks', 'grade printed'],
  marksList.map((m) => [String(m), pyOut(gradeSrc(m))]),
  `Table of the grade program for marks ${marksList.join(', ')}: grades ${marksList.map((m) => pyOut(gradeSrc(m))).join(', ')}`,
  'Boundary values 40, 60 and 80 belong to the higher grade.',
);
const xs = [5, 10, 15, 20, 25];
const opRows = [
  ['x >= 10', 'x is 10 or more'],
  ['x > 10 and x < 25', 'x is between 10 and 25, both excluded'],
  ['x < 10 or x > 20', 'x is below 10 or above 20'],
  ['not (x == 15)', 'x is anything except 15'],
  ['x % 5 == 0', 'x is a multiple of 5'],
];
const vOps = table(
  ['Condition', 'Meaning', `Value for x = ${xs.join(', ')}`],
  opRows.map(([e, m]) => ['`' + e + '`', m, tfWord(e, xs)]),
  'Table of five conditions built with comparison and logical operators, with their meaning and the True or False value for x equal to 5, 10, 15, 20 and 25',
  'Values produced by running each condition.',
);
const parcelW = [0, 3, 8];
const vOrder = table(
  ['weight', 'Narrow test first (correct)', 'Wide test first (faulty)'],
  parcelW.map((w) => [String(w), pyOut(parcelSrc(w, true)), pyOut(parcelSrc(w, false))]),
  `Table comparing two orders of the tests in a parcel program for weights ${parcelW.join(', ')}: the correct order prints ${parcelW.map((w) => pyOut(parcelSrc(w, true))).join(', ')} and the faulty order prints ${parcelW.map((w) => pyOut(parcelSrc(w, false))).join(', ')}`,
  'For weight 8 the faulty order never reaches the Heavy test.',
);
assert.notEqual(pyOut(parcelSrc(8, true)), pyOut(parcelSrc(8, false)));
const museumCases = [[20, true], [20, false], [15, true], [15, false]];
const vNested = table(
  ['age', 'student', 'Lines printed'],
  museumCases.map(([a, st]) => [String(a), st ? 'True' : 'False', pyOut(museumSrc(a, st)).split('\n').join(' then ')]),
  `Table of the museum program for four cases: ${museumCases.map(([a, st]) => `age ${a} student ${st ? 'True' : 'False'} prints ${pyOut(museumSrc(a, st)).split('\n').join(' then ')}`).join('; ')}`,
  'The inner if is tested only inside the block chosen by the outer test.',
);
const st3 = sortTrace(22, 7, 15);
const vSortTrace = table(
  ['Moment', 'a', 'b', 'c'],
  S(st3),
  `Trace table of sorting the numbers 22, 7 and 15: ${st3.map((r) => `${r[0]} gives ${r[1]}, ${r[2]}, ${r[3]}`).join('; ')}`,
  'Produced by running the three comparisons.',
);
const vDivFlow = flow('TB', ['Read n', 'n divisible by 2 and by 7?', 'Print Even multiple of 7', 'n divisible by 2?', 'Print Even', 'n divisible by 7?', 'Print Odd multiple of 7', 'Print Other', 'End'], 'Flow of a divisibility decision: read n; if divisible by both 2 and 7 print Even multiple of 7; else if divisible by 2 print Even; else if divisible by 7 print Odd multiple of 7; else print Other; all paths end', 'Four outcomes, three diamonds; the combined test comes first.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3', label: 'Yes' }, { from: 'n2', to: 'n4', label: 'No' }, { from: 'n4', to: 'n5', label: 'Yes' }, { from: 'n4', to: 'n6', label: 'No' },
  { from: 'n6', to: 'n7', label: 'Yes' }, { from: 'n6', to: 'n8', label: 'No' }, { from: 'n3', to: 'n9' }, { from: 'n5', to: 'n9' }, { from: 'n7', to: 'n9' }, { from: 'n8', to: 'n9' },
]);
const divNs = [14, 8, 21, 5];
const vDivTable = table(
  ['n', 'n % 2', 'n % 7', 'Printed'],
  divNs.map((n) => [String(n), val(`${n} % 2`), val(`${n} % 7`), pyOut(evenSevenSrc(n))]),
  `Table of the divisibility program for n equal to ${divNs.join(', ')}: printed ${divNs.map((n) => pyOut(evenSevenSrc(n))).join('; ')}`,
  'Remainders and results found by running the program.',
);
const errs = [
  ['Colon missing after `else`', code('x = 3', 'if x > 2:', '    print("big")', 'else', '    print("small")')],
  ['`=` used in a condition', code('count = 0', 'while count = 3:', '    count += 1')],
  ['`elif` written after `else`', code('x = 3', 'if x > 2:', '    print("big")', 'else:', '    print("small")', 'elif x > 1:', '    print("mid")')],
  ['One line indented more than its block', mixedIndent],
];
const vErr = table(
  ['Mistake', 'What Python reports'],
  errs.map(([m, c]) => [m, ic(pyErr(c))]),
  'Table of four common mistakes with conditions and blocks, and the error line Python reports for each',
  'Each error line comes from running the faulty program.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Kinds of flow', 'sequential, conditional, iterative'],
    ['Blocks', 'a colon opens the block; indent the body equally'],
    ['if-else, elif', 'exactly one block of the chain runs'],
    ['Order', 'narrow conditions first; boundaries need `>=` or `<=`'],
    ['Nested if', 'the inner test runs only when the outer test allows it'],
    ['== and =', 'double equals compares; single equals assigns'],
  ],
  'Summary table of Part 1: the three kinds of flow, blocks and indentation, if-else and elif chains, the order of tests, nested if, and the difference between double equals and single equals',
);

// ---------------------------------------------------------------- Part 2 visuals
const vRoute2 = flow('LR', ['Why loops', 'for and range()', 'while loops', 'break and continue', 'Nested loops and programs'], 'Route map of Part 2: why loops, the for loop with range, while loops, break and continue, nested loops and programs', 'Part 2 at a glance');
const vWhy = table(
  ['Task', 'Count known in advance?', 'Loop that fits'],
  [
    ['Print the 12 times table', 'Yes, 12 lines', '`for` with `range()`'],
    ['Ask for a password until it is right', 'No', '`while`'],
    ['Add the marks of 40 students', 'Yes, 40 values', '`for` with `range()`'],
    ['Keep halving a length until it is below 1', 'No', '`while`'],
  ],
  'Table of four repetition tasks, whether the number of repetitions is known in advance, and the loop that fits: for with range when the count is known, while when it is not',
);
const rangeCalls = [['6', 'range(6)'], ['2, 7', 'range(2, 7)'], ['1, 20, 6', 'range(1, 20, 6)'], ['30, 10, -7', 'range(30, 10, -7)'], ['4, 1', 'range(4, 1)']];
const vRange = table(
  ['Call', 'Numbers generated', 'Why'],
  rangeCalls.map(([a, c], i) => ['`' + c + '`', rng(a), ['start 0, stop 6 excluded', 'start 2, stop 7 excluded', 'step 6 from 1', 'negative step counts down', 'step +1 cannot reach a smaller stop'][i]]),
  `Table of range calls and the numbers they generate: ${rangeCalls.map(([a, c]) => `${c} gives ${rng(a)}`).join('; ')}`,
  'The stop value is never generated.',
);
const vForFlow = flow('TB', ['Take the first value of the range', 'Is there a value left?', 'Put it in the loop variable and run the body', 'Leave the loop'], 'Flow of a for loop: take the first value of the range; if a value is left put it in the loop variable and run the body, then return for the next value; when none is left leave the loop', 'The loop variable changes by itself; no update statement is needed.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3', label: 'Yes' }, { from: 'n3', to: 'n2', label: 'next value' }, { from: 'n2', to: 'n4', label: 'No' },
]);
const saveRows = outRows(showSave);
const vSave = table(
  ['week', 'saved after the pass'],
  saveRows,
  `Trace table of the saving program: after weeks 1 to 5 the saved amounts are ${saveRows.map((r) => r[1]).join(', ')}`,
  'The loop variable week takes the values 1 to 5; 6 is never taken.',
);
const pondAll = outRows(showPond);
const pondRows = pondAll.slice(0, -1);
const vPond = table(
  ['Pass', 'n after the pass'],
  pondRows,
  `Trace table of the doubling pond: n becomes ${pondRows.map((r) => r[1]).join(', ')} and the loop stops; the program ends by printing ${pyOut(showPond).split('\n').at(-1)}`,
  `The last line printed is: ${pyOut(showPond).split('\n').at(-1)}`,
);
const endCases = [
  ['n = 10, `while n > 0:` with `n = n - 3`', code('n = 10', 'while n > 0:', '    n = n - 3')],
  ['n = 10, `while n != 0:` with `n = n - 3`', code('n = 10', 'while n != 0:', '    n = n - 3')],
  ['n = 10, `while n > 0:` with `n = n + 3`', code('n = 10', 'while n > 0:', '    n = n + 3')],
  ['n = 10, `while n > 0:` with nothing changing n', code('n = 10', 'while n > 0:', '    pass')],
];
const vEndless = table(
  ['Loop', 'Result when run under a step limit'],
  endCases.map(([l, c]) => [l, capped(c)]),
  `Table of four while loops and whether each ends: ${endCases.map(([l, c]) => `${l} ${capped(c)}`).join('; ')}`,
  'The update must move the condition towards false; a test of != can jump over its target.',
);
const vBC = table(
  ['Statement used', 'Output of the loop'],
  [['`break` when n is a multiple of 4', ic(pyOut(bcSrc('break')))], ['`continue` when n is a multiple of 4', ic(pyOut(bcSrc('continue')))]],
  `Table comparing break and continue in a loop over 1 to 8 that treats multiples of 4 specially: break prints ${pyOut(bcSrc('break'))} and continue prints ${pyOut(bcSrc('continue'))}`,
  'break leaves the loop; continue only skips the rest of one pass.',
);
const primeRows = outRows(showPrime);
const primeTrace = primeRows.slice(0, -1);
const vPrimeTrace = table(
  ['d', 'n % d'],
  primeTrace,
  `Trace table for testing whether 35 is prime: d goes ${primeTrace.map((r) => r[0]).join(', ')} and the remainders are ${primeTrace.map((r) => r[1]).join(', ')}; the loop stops at the first remainder 0, and the flag printed is ${pyOut(showPrime).split('\n').at(-1)}`,
  `The last line printed is ${pyOut(showPrime).split('\n').at(-1)}.`,
);
const gridLines = pyOut(showGrid).split('\n').map((l) => l.trim().split(' '));
const vGrid = table(
  ['r', 'c = 1', 'c = 2', 'c = 3', 'c = 4'],
  gridLines.map((r, i) => [String(i + 1), ...r]),
  `Table of the products printed by two nested loops with r from 1 to 3 and c from 1 to 4: ${gridLines.map((r, i) => `row ${i + 1}: ${r.join(', ')}`).join('; ')}`,
  'The inner loop runs completely for every pass of the outer loop.',
);
const starLines = pyOut(showStars).split('\n');
const vStars = table(
  ['r (outer)', 'Inner passes', 'Line printed'],
  starLines.map((l, i) => [String(i + 1), String(l.length), '`' + l + '`']),
  `Table for the triangle of stars: for r from 1 to 4 the inner loop runs ${starLines.map((l) => l.length).join(', ')} times and prints ${starLines.join(', ')}`,
  'Total stars printed: ' + starLines.join('').length,
);
const factRows = outRows(showFact);
const vFact = table(
  ['k', 'f after the pass'],
  factRows,
  `Trace table of the factorial of 6: f becomes ${factRows.map((r) => r[1]).join(', ')}`,
  'Each value is the previous one multiplied by k.',
);
const vChoose = table(
  ['Question', 'Choose'],
  [
    ['Do I know how many times to repeat?', '`for` with `range()`'],
    ['Do I repeat while some condition holds?', '`while`'],
    ['Must the loop end early on a special case?', 'add `break` inside an `if`'],
    ['Must one pass skip the rest of its work?', 'add `continue` inside an `if`'],
    ['Do I need rows and columns?', 'a loop inside a loop (nested)'],
  ],
  'Table of questions for choosing a loop: known count means for with range, a condition means while, early exit means break, skipping a pass means continue, rows and columns mean nested loops',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['range()', 'range(stop), range(start, stop), range(start, stop, step); stop is excluded'],
    ['for', 'the loop variable takes each value by itself'],
    ['while', 'initialise, test, update; the body may run zero times'],
    ['break, continue', 'break leaves the loop; continue skips to the next pass'],
    ['Nested loops', 'the inner loop restarts in every pass of the outer loop'],
    ['Endless loop', 'a missing or wrong update keeps the condition true'],
  ],
  'Summary table of Part 2: range, the for loop, the while loop, break and continue, nested loops and endless loops',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Flow of Control — Part 1: Making Decisions with if, if-else and elif',
  goals: [
    'Distinguish sequential, conditional and iterative flow, and use indentation to form blocks',
    'Write programs with if, if-else, if-elif-else and nested if, and test the boundaries of each condition',
    'Draw and read a flowchart for a decision, and dry run a simple decision program',
  ],
  slides: [
    sl('title', 'Flow of Control', {
      b: 'Part 1 — how a program **decides** which statements to run.',
      v: vRoute1,
      n: 'Welcome to Chapter four. A program normally runs line by line, but real problems need decisions and repetition. In this first part we learn how Python chooses which statements to run, using if, if else and if elif else. We also learn why indentation matters, and we finish with nested decisions, flowcharts and small complete programs.',
    }),
    sl('concept', 'Three kinds of flow', {
      b: 'The **flow of control** is the order in which statements are executed.',
      v: vKinds,
      n: 'Python can run statements in three ways. Sequential flow runs them one after another, in the order written. Conditional flow, also called selection, tests a condition to choose which statements to run. Iterative flow repeats statements using a loop. Every program, however large, is built from these three kinds of flow.',
    }),
    sl('concept', 'Indentation: the shape of a block', {
      b: 'A colon opens a **block**. The **indentation** of the lines that follow shows which statements belong to it.',
      v: vIndent,
      n: 'In Python, a colon opens a block, and indentation shows which statements are inside it. Every statement of one block must be indented by the same amount, usually four spaces. If the body is not indented, Python reports an indentation error. If one line has extra indentation, it reports an unexpected indent.',
    }),
    sl('diagram', 'if and if-else', {
      b: `The **if** block runs only when its condition is true; the **else** block runs otherwise.\n\n${showAge}`,
      v: vIfElse,
      n: 'An if statement tests a condition. If it is true, the indented block runs. Add an else block, and exactly one of the two blocks runs, never both and never neither. In this flowchart the diamond asks whether the age is at least sixty. After either path the program joins up again and prints the fare.',
    }),
    sl('example', 'Worked example 1: a senior-citizen fare', {
      b: `The bus fare is 25 rupees, and 0 for age 60 or more. The table is the output of the program for five ages.\n\n${F(ticketSrc(60))}`,
      v: vTicket,
      n: 'Here is the fare program, run for five different ages. For ages below sixty the condition is false, so the else block sets the fare to twenty five. From sixty upwards the fare is zero. Notice the boundary: exactly sixty already travels free, because the test uses greater than or equal to. Always try the boundary values.',
    }),
    sl('concept', 'if-elif-else chains', {
      b: `With more than two outcomes, use **elif**. The first true condition runs its block and the rest of the chain is skipped.\n\n${F(gradeSrc(72))}`,
      v: vElifFlow,
      n: 'When there are more than two outcomes, use an elif chain. Python tests the conditions from the top, and the first true one runs its block. The rest of the chain is skipped. The final else is optional and catches everything that is left. So in a chain of if, elif and else, exactly one block runs.',
    }),
    sl('example', 'Worked example 2: grades from marks', {
      b: 'The program gives A for 80 or more, B for 60 or more, C for 40 or more, and D below 40.',
      v: vGrade,
      n: 'This table shows the grade program run for marks on both sides of each boundary. Marks of thirty five give D, and forty gives C. Fifty nine gives C, and sixty gives B. Seventy nine gives B, and eighty gives A. Each boundary belongs to the higher grade, because the conditions use greater than or equal to.',
    }),
    sl('check', 'Quick check: the extra test', {
      b: 'Fill in the blank.',
      chk: 'fb_elif',
      n: 'Name the keyword that adds one more test between the first if and the final else.',
    }),
    sl('concept', 'Conditions: comparison and logical operators', {
      b: 'A **condition** is true or false. Join conditions with `and`, `or` and `not`.',
      v: vOps,
      n: 'A condition is an expression that is true or false. The comparison operators are double equals, not equal, less than, greater than, and their or equal to forms. Join conditions with and, or and not. Remember that a single equals sign assigns a value, while a double equals compares two values. Mixing them up is a common error.',
    }),
    sl('diagram', 'The order of the tests matters', {
      b: 'Put the **narrowest** condition first. In the faulty order the wider test catches every heavy parcel.',
      v: vOrder,
      n: 'In a chain, put the narrowest condition first. In this parcel program, heavy means five or more and standard means one or more. If we test for one or more first, a parcel of weight eight matches immediately and the heavy test is never reached. Testing for five first gives the right answer. The table compares both orders.',
    }),
    sl('check', 'Quick check: planning a chain', {
      b: 'Put the steps in order.',
      chk: 'ord_elif',
      n: 'Think about which test must come first so that every later test is only reached when the earlier ones failed.',
    }),
    sl('concept', 'Nested if', {
      b: `An **if** inside another **if** block is a **nested if**. An `+ '`else`' + ` belongs to the `+ '`if`' + ` lined up with it.\n\n${F(museumSrc(20, true))}`,
      v: vNested,
      n: 'An if statement inside another if block is called a nested if. The inner test is made only when the outer condition lets its block run. In this museum program the age decides the kind of entry, and then the student card decides whether a discount is given. Each else belongs to the if that is lined up with it.',
    }),
    sl('example', 'Worked example 3: sorting three numbers', {
      b: `Compare neighbours and swap them with a helper variable \`t\` when they are in the wrong order.\n\n${F(sortSrc(22, 7, 15))}`,
      v: vSortTrace,
      n: 'To arrange three numbers in increasing order, compare neighbours and swap them, using a helper variable, when they are in the wrong order. The trace table shows a, b and c after each if. Three comparisons are enough: first a and b, then b and c, then a and b again. At the end the numbers are in order.',
    }),
    sl('check', 'Quick check: a decision inside a decision', {
      b: 'Fill in the blank.',
      chk: 'fb_nested',
      n: 'Remember the name for an if statement that is written inside another if block.',
    }),
    sl('diagram', 'Reading a decision flowchart', {
      b: 'Each **diamond** is one test with **Yes** and **No** exits. A chain of `elif` becomes a chain of diamonds, and all paths meet at the end.',
      v: vDivFlow,
      n: 'In a flowchart, every diamond is one test with a yes exit and a no exit. An elif chain becomes a chain of diamonds, where the no exit leads to the next test. This flowchart has three diamonds and four outcomes. The combined test, divisible by both, comes first, otherwise a number like fourteen would be caught too early.',
    }),
    sl('example', 'Worked example 4: divisibility', {
      b: `A number is **divisible** by d when the remainder \`n % d\` is 0.\n\n${F(evenSevenSrc(14))}`,
      v: vDivTable,
      n: 'This program uses the remainder operator to test divisibility. A number is divisible by another when the remainder is zero. The table shows the remainders and the printed result for four numbers. Fourteen is even and a multiple of seven. Eight is only even, twenty one is only a multiple of seven, and five is neither.',
    }),
    sl('concept', 'Common mistakes and their error messages', {
      b: 'Python reports the **first** error it finds. Read the message and the line number.',
      v: vErr,
      n: 'Four mistakes are very common. A missing colon after else, a single equals sign used where a condition needs a double equals, an elif written after an else, and a line indented more than the rest of its block. Python names each one in its error message, so read the message and the line number before you change the code.',
    }),
    sl('check', 'Quick check: counting with if-else', {
      b: 'Predict the output.',
      chk: 'co_count',
      n: 'Follow the loop over the six readings and count how many fall in each group.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Programs use sequential, conditional and iterative flow. A colon opens a block, and equal indentation forms it. In an if elif else chain exactly one block runs, so put the narrowest test first and check the boundary values. A nested if is tested only when the outer test allows it. Double equals compares, and single equals assigns.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'End every `if`, `elif` and `else` line with a **colon**, and indent the body by the **same** amount.',
        'Use `==` to compare and `=` to assign; a single `=` in a condition is a **SyntaxError**.',
        'In an `elif` chain put the **narrowest** condition first, and test the **boundary** values.',
        'For a trace, show the value of every variable and which branch ran.',
        'State the final output clearly, exactly as `print` shows it.',
      ],
      n: 'Some advice for the exam. End every if, elif and else line with a colon, and indent the body by the same amount. Use double equals to compare and single equals to assign. In an elif chain put the narrowest condition first, and try the boundary values. When you trace a program, show every variable, and write the final output exactly as print shows it.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Flow of Control — Part 2: Repeating Work with for and while Loops',
  goals: [
    'Use for with range() and while loops, and choose the right loop for a task',
    'Control loops with break and continue, and avoid endless loops',
    'Write nested loops and programs for patterns, series, factorial and primality, using trace tables',
  ],
  slides: [
    sl('title', 'Loops', {
      b: 'Part 2 — how a program **repeats** work.',
      v: vRoute2,
      n: 'In Part 2 we learn to repeat work. Loops let a few lines of code do a job a thousand times. We meet the for loop with range, the while loop, and the statements break and continue. Then we put one loop inside another, and finish with programs for patterns, series, factorial and prime numbers, traced step by step.',
    }),
    sl('concept', 'Why loops?', {
      b: 'A **loop** repeats a block. Choose the loop by asking whether the number of repetitions is known.',
      v: vWhy,
      n: 'Some tasks repeat a known number of times, such as printing a times table of twelve lines. Others repeat until something happens, such as asking for a password until it is right. For a known count we use a for loop with range. When the count is not known in advance, we use a while loop with a condition.',
    }),
    sl('concept', 'The for loop and range()', {
      b: `\`for i in range(start, stop, step):\` — the loop variable takes each value in turn. The **stop value is never generated**.\n\n${F('for i in range(2, 7):', '    print(i, end=" ")')}\n\nOutput: ${ic(pyOut(code('for i in range(2, 7):', '    print(i, end=" ")')))}`,
      v: vRange,
      n: 'The range function generates a sequence of whole numbers. With one value it starts at zero. With two values it starts at the first and stops before the second. A third value gives the step, which may be negative to count down. The stop value is never generated, and if the step points away from the stop, the sequence is empty.',
    }),
    sl('diagram', 'How a for loop runs', {
      b: `The loop variable is set by Python on every pass. After the loop it keeps its **last value**.\n\n${F(showSave)}`,
      v: vForFlow,
      n: 'In a for loop Python takes the next value from the range and puts it in the loop variable. Then it runs the body. When no value is left, it leaves the loop. You do not write an update statement, because the loop variable changes by itself. After the loop ends, the variable still holds the last value it took.',
    }),
    sl('example', 'Worked example 1: saving for a bicycle', {
      b: 'Fifty rupees are saved each week for five weeks. The table is the output of the program above.',
      v: vSave,
      n: 'This program adds fifty rupees to the savings in each pass. The loop variable week takes the values one to five, and six is never taken, because it is the stop value. The saved amount grows by fifty each time, so the table has five rows. Compare the printed output with the trace table to be sure that they match.',
    }),
    sl('check', 'Quick check: matching range calls', {
      b: 'Match each call with its numbers.',
      chk: 'mt_range',
      n: 'Work out the first value, the step and the stop value of each call, and remember that the stop value is excluded.',
    }),
    sl('diagram', 'The while loop', {
      b: `A **while** loop repeats while its condition is true: **initialise, test, update**.\n\n${F(showPond)}`,
      v: vWhileSvg,
      n: 'A while loop has three parts. Set the starting values before the loop. The condition is tested before every pass. The body must update a variable that the condition reads, so that the condition becomes false in the end. If the condition is false at the very first test, the body runs zero times.',
    }),
    sl('example', 'Worked example 2: a doubling pond', {
      b: 'Five lilies double every week. Count the weeks until there are 200 or more.',
      v: vPond,
      n: 'The pond starts with five lilies, and the number doubles every week. Each pass of the loop doubles the number and adds one to the week. The table shows the value after every pass. The loop stops when the number reaches two hundred or more, and the last line of the program prints the number of weeks.',
    }),
    sl('check', 'Quick check: can a while body be skipped?', {
      b: 'True or false?',
      chk: 'tf_while_zero',
      n: 'Think about what happens if the condition is already false when the loop is reached.',
    }),
    sl('concept', 'Endless loops', {
      b: 'A loop that never ends has a condition that **stays true**. Always check the **update**.',
      v: vEndless,
      n: 'An endless loop is a while loop whose condition never becomes false. This happens when the variable is not updated, when it is updated in the wrong direction, or when a test of not equal jumps over its target value. The table shows four loops, each run with a step limit, so we can see which ones end.',
    }),
    sl('concept', 'break and continue', {
      b: '`break` leaves the loop at once. `continue` skips the rest of **this** pass and goes to the next.',
      v: vBC,
      n: 'The statement break leaves the loop completely. The statement continue skips the rest of the current pass and goes straight to the next one. Both are usually placed inside an if. This table runs the same loop over the numbers one to eight twice. See how break stops at the first multiple of four, while continue only leaves that number out.',
    }),
    sl('check', 'Quick check: the two statements', {
      b: 'Fill in the blanks.',
      chk: 'fb_keyword',
      n: 'Decide which statement ends the loop and which one only ends the pass.',
    }),
    sl('example', 'Worked example 3: is 35 a prime number?', {
      b: `Try each divisor **d** from 2; the first exact divisor shows the number is not prime, so we \`break\`.\n\n${F(showPrime)}`,
      v: vPrimeTrace,
      n: 'To test whether thirty five is prime, we try the divisors two, three, four and so on. A flag, which starts as true, is switched off at the first divisor that divides exactly. Then break leaves the loop, because nothing more needs to be tried. The table shows the divisors tried and the remainders. The last line shows the flag.',
    }),
    sl('concept', 'Nested loops', {
      b: `A loop inside a loop. The **inner loop restarts and runs completely** in every pass of the outer loop.\n\n${F(showGrid)}`,
      v: vGrid,
      n: 'In nested loops the inner loop runs completely for every single pass of the outer loop. Here the outer loop gives the row, from one to three, and the inner loop gives the column, from one to four. The program prints the product of the two. An empty print at the end of each row moves to the next line.',
    }),
    sl('example', 'Worked example 4: a triangle of stars', {
      b: `The inner loop runs \`r\` times in pass \`r\` of the outer loop.\n\n${F(showStars)}\n\n${O(pyOut(showStars))}`,
      v: vStars,
      n: 'To print a triangle, let the number of stars depend on the row. The outer loop gives the row number. The inner loop runs that many times, printing a star each time without a new line. An empty print at the end of each row starts the next line. The table lists the passes of the inner loop and the line printed for each row.',
    }),
    sl('check', 'Quick check: the order of a while loop', {
      b: 'Put the steps in order.',
      chk: 'ord_while',
      n: 'Remember the sequence: starting value, test, body, update, and back to the test.',
    }),
    sl('example', 'Worked example 5: the factorial', {
      b: `The **factorial** of n is 1 × 2 × 3 × ... × n. Start the product at 1, not 0.\n\n${F(showFact)}`,
      v: vFact,
      n: 'The factorial of a number is the product of all whole numbers from one up to it. We keep a running product that starts at one, because starting at zero would make every product zero. In each pass we multiply by the loop variable and print the result. The table shows the running product for each value from one to six.',
    }),
    sl('concept', 'Choosing the right loop', {
      b: 'Ask these questions before writing the loop.',
      v: vChoose,
      n: 'Before writing a loop, ask a few questions. If the number of repetitions is known, use for with range. If the loop depends on a condition, use while. If the loop must stop early, put a break inside an if. To skip part of a pass, use continue. And if the task needs rows and columns, use a loop inside a loop.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. The range function stops before the stop value. A for loop sets its variable itself. A while loop needs a starting value, a test and an update, and its body may run zero times. Break leaves a loop and continue skips a pass. In nested loops the inner loop restarts in every pass. A missing update gives an endless loop.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        '`range(1, n)` stops at **n - 1**; write `range(1, n + 1)` to include n.',
        'Give a running **total** or **product** a starting value **before** the loop.',
        'Every `while` loop needs an **update** that moves the condition towards false.',
        '`break` ends the loop; `continue` skips only the current pass; both leave only the **innermost** loop.',
        'For a trace table, use one column per variable and one row per pass.',
      ],
      n: 'Some advice for the exam. Range of one comma n stops at n minus one, so add one to include n. Give a running total or product a starting value before the loop. Every while loop needs an update that moves the condition towards false. Break and continue affect only the innermost loop. A trace table has a column per variable.',
    }),
  ],
});

// narration limit of the brief (66 words)
const longN = [part1, part2].flatMap((d) => d.slides.filter((s) => wordsOf(s.narration) > 66).map((s) => d.part + "/" + s.id + ": " + wordsOf(s.narration)));
assert.equal(longN.length, 0, "narration over 66 words: " + longN.join(", "));

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Flow of Control — Notes',
  sections: [
    {
      h: '1. Flow of control and indentation',
      t: 1,
      b: 'The **flow of control** is the order in which the statements of a program are executed. There are three kinds:\n- **Sequential:** statements run one after another in the order written.\n- **Conditional (selection):** a condition decides which block runs (`if`, `if-else`, `if-elif-else`).\n- **Iterative (repetition):** a block is repeated (`for`, `while`).\n\nA statement that ends in a **colon** (`if`, `elif`, `else`, `for`, `while`) opens a **block**. Python has no braces: the **indentation** of the lines that follow shows what belongs to the block. All statements of one block must be indented by the same amount (four spaces is the usual choice), otherwise Python reports an `IndentationError`.',
      terms: [
        ['Flow of control', 'The order in which statements are executed.'],
        ['Block', 'A group of statements that are executed together, shown by equal indentation after a colon.'],
        ['Indentation', 'The leading spaces that show which statements belong to a block.'],
      ],
      v: vKinds,
      vs: [vIndent],
    },
    {
      h: '2. The if, if-else and if-elif-else statements',
      t: 1,
      b: '- **if:** the block runs only when the condition is true.\n- **if-else:** exactly one of the two blocks runs.\n- **if-elif-else:** the conditions are tested from the top; the first true one runs its block and the rest of the chain is skipped. The last `else` is optional.\n\nA **condition** is made with the comparison operators `==`, `!=`, `<`, `>`, `<=`, `>=`, joined by `and`, `or` and `not`. Use `==` to compare; a single `=` assigns and is a `SyntaxError` in a condition.\n\nBecause the first true test wins, put the **narrowest** condition first, and test the **boundary** values (the numbers at which the answer changes).',
      terms: [
        ['elif', 'Short for else if: an extra test in a chain, run only if all earlier tests were false.'],
        ['Condition', 'An expression that is true or false, used to choose a block or to control a loop.'],
      ],
      v: vElifFlow,
      vs: [vIfElse, vGrade, vOps, vOrder],
    },
    {
      h: '3. Nested if, flowcharts and decision programs',
      t: 1,
      b: 'An `if` statement written inside the block of another `if` is a **nested if**. The inner test is made only when the outer condition allows its block to run, and an `else` belongs to the `if` with the same indentation.\n\nIn a **flowchart** a decision is a **diamond** with two exits, **Yes** and **No**; an `if-elif-else` chain is a chain of diamonds, and the paths meet again at the next statement.\n\nTypical programs: absolute value, the largest or the sorted order of three numbers (compare neighbours and swap with a helper variable), and divisibility (`n % d == 0`). Put the combined test (divisible by both) before the single tests.',
      terms: [
        ['Nested if', 'An if statement inside the block of another if statement.'],
        ['Boundary value', 'A value at which the result of a condition changes.'],
      ],
      v: vNested,
      vs: [vDivFlow, vSortTrace, vDivTable, vErr],
    },
    {
      h: '4. The for loop and range()',
      t: 2,
      b: 'A `for` loop repeats a block for each value of a sequence. With `range()`:\n- `range(stop)` gives 0 to stop - 1;\n- `range(start, stop)` gives start to stop - 1;\n- `range(start, stop, step)` adds step each time; a **negative step** counts down.\n\nThe **stop value is never generated**, and the sequence is empty if the step points away from the stop. `range()` accepts only integers. The loop variable is set by Python on every pass and **keeps its last value** after the loop. To include n, write `range(1, n + 1)`.',
      terms: [
        ['range()', 'A function that generates a sequence of integers from start up to, but not including, stop.'],
        ['Loop variable', 'The variable of a for loop that takes the next value on each pass.'],
      ],
      v: vRange,
      vs: [vForFlow, vSave, vWhy],
    },
    {
      h: '5. The while loop and endless loops',
      t: 2,
      b: 'A `while` loop repeats its block **while the condition is true**. A correct loop has three parts: an **initial value** before the loop, a **test**, and an **update** inside the body. The test is made before every pass, so the body may run **zero times**.\n\nIf the update is missing or moves the wrong way, the condition stays true and the loop is **endless**. A test such as `n != 0` can also jump over its target (for example 10, 7, 4, 1, -2, ...). Use a `while` loop when the number of repetitions is not known in advance, such as asking for input until it is valid.',
      terms: [
        ['while loop', 'A loop that repeats its block as long as its condition is true.'],
        ['Endless loop', 'A loop whose condition never becomes false.'],
      ],
      v: vWhileSvg,
      vs: [vPond, vEndless],
    },
    {
      h: '6. break, continue, nested loops and common programs',
      t: 2,
      b: '- `break` leaves the loop at once; `continue` skips the rest of the current pass and starts the next. Both are usually placed in an `if`, and both affect only the **innermost** loop.\n- In **nested loops** the inner loop runs completely, from its start, in every pass of the outer loop; use them for patterns, tables and grids.\n- A running **total** starts at 0, a running **product** (factorial) starts at 1, and both are set before the loop.\n- A number is prime if no divisor from 2 to n - 1 divides it exactly: use a flag and `break` at the first exact divisor.\n- Digits of a number are taken with `n % 10` and removed with `n // 10`.',
      terms: [
        ['break', 'A statement that ends the innermost loop immediately.'],
        ['continue', 'A statement that skips the rest of the current pass of the loop.'],
        ['Nested loop', 'A loop written inside the body of another loop.'],
      ],
      v: vBC,
      vs: [vGrid, vStars, vPrimeTrace, vFact],
    },
  ],
  tips: '**Common mistakes**\n- Forgetting the colon after `if`, `elif`, `else`, `for` or `while`.\n- Using `=` instead of `==` in a condition.\n- Indenting the body of a block by different amounts, or not at all.\n- An `elif` chain with a wide condition first, so the narrow one is never reached.\n- `range(1, n)` when n itself must be included.\n- A `while` loop with no update, or with an update that moves away from the condition.\n- A running total or product with no starting value before the loop.\n- Thinking that `break` in an inner loop also ends the outer loop.\n\n**How marks are usually awarded**\n- Output questions: the exact output, line by line, with `end=" "` and empty `print()` behaviour respected.\n- Error-finding: naming the error, then the corrected program.\n- Programs: marks for input, the loop or decision, the update, the result and the output for the given input.\n- Trace tables: a column for each variable, a row for each pass, and the final output.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is the **flow of control**?', 'The order in which the statements of a program are executed.', 'definition', 1],
  ['Name the **three kinds** of flow of control.', 'Sequential, conditional (selection) and iterative (repetition).', 'fact', 1],
  ['What opens a **block** in Python, and what shows its extent?', 'A colon opens it; the indentation of the following lines shows which statements belong to it.', 'concept', 1],
  ['What happens if the body of an `if` is not indented?', `Python stops with ${ic(pyErr(code('x = 3', 'if x > 2:', 'print("big")')))}.`, 'exam-tip', 1],
  ['How many blocks of an `if-elif-else` chain run?', '**Exactly one** (the first whose condition is true, or the else).', 'concept', 1],
  ['What does `elif` mean?', 'Else if: an extra test in a chain, tried only if all earlier tests were false.', 'definition', 1],
  ['Which operator **compares**, and which **assigns**?', '`==` compares and `=` assigns; a single `=` in a condition is a SyntaxError.', 'exam-tip', 1],
  ['Why put the narrowest condition first in an `elif` chain?', 'The first true test wins; a wider test first would catch values meant for the narrower one.', 'concept', 1],
  ['What is a **boundary value**?', 'A value at which the result of a condition changes, such as 60 for the test `age >= 60`.', 'definition', 1],
  ['What is a **nested if**?', 'An if statement inside the block of another if statement.', 'definition', 1],
  [`Fare program with ${ic('age = 60')}: what is printed?`, `${ic(pyOut(ticketSrc(60)))}, because the test is \`>=\`.`, 'example', 1],
  [`Grade program with ${ic('marks = 59')}: which grade?`, `${ic(pyOut(gradeSrc(59)))}; marks of 60 give ${ic(pyOut(gradeSrc(60)))}.`, 'example', 1],
  ['How is a decision drawn in a flowchart?', 'As a diamond with two exits, Yes and No.', 'fact', 1],
  ['Which function supplies the numbers for a counted `for` loop?', '`range()`, used as `for i in range(...)`.', 'fact', 2],
  [`What does ${ic('range(2, 17, 5)')} generate?`, `${ic(rng('2, 17, 5'))}`, 'example', 2],
  [`What does ${ic('range(20, 4, -6)')} generate?`, `${ic(rng('20, 4, -6'))}`, 'example', 2],
  ['Is the **stop value** of `range()` generated?', '**No.** The sequence ends just before it.', 'fact', 2],
  ['How do you make `i` run from 1 to n **including n**?', '`for i in range(1, n + 1):`', 'exam-tip', 2],
  ['Which loop do you use when the count is **known**, and which when it is **not**?', '`for` with `range()` when known; `while` when the number of repetitions depends on a condition.', 'concept', 2],
  ['Three parts of a **while** loop', 'An initial value, a test of the condition, and an update inside the body.', 'concept', 2],
  ['Can a `while` loop body run **zero times**?', '**Yes**, if the condition is false at the first test.', 'concept', 2],
  ['Why does a `while` loop with no update never end?', 'The condition keeps its truth value, so it stays true for ever.', 'concept', 2],
  ['What does `break` do?', 'Leaves the innermost loop at once.', 'definition', 2],
  ['What does `continue` do?', 'Skips the rest of the current pass and goes to the next pass.', 'definition', 2],
  [`Loop over 1 to 8 with ${ic('break')} at multiples of 4: output?`, `${ic(pyOut(bcSrc('break')))}; with ${ic('continue')}: ${ic(pyOut(bcSrc('continue')))}.`, 'example', 2],
  ['What is a **nested loop**?', 'A loop inside the body of another loop; the inner loop runs completely in every pass of the outer loop.', 'definition', 2],
  ['Starting value of a running **total** and of a running **product**?', '0 for a total; 1 for a product (factorial).', 'exam-tip', 2],
  [`Factorial of ${ic('6')} by the loop: result?`, `${ic(factRows.at(-1)[1])}, reached after ${factRows.length} passes.`, 'example', 2],
  ['How is the last digit of `n` taken, and how is it removed?', '`n % 10` takes it; `n // 10` removes it.', 'concept', 2],
  ['How do you test whether `n` is divisible by `d`?', 'The remainder `n % d` is 0.', 'concept', 1],
]);

// ---------------------------------------------------------------- tests (cbse-11-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Flow of Control',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_between', 'm_range_down', 'm_nested_last', 'ar_two_ifs'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s2_err_colon', 's2_range_lists', 's3_trace_while'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions. Show the program and its output.', items: [{ attempt: 1, keys: ['l_prime', 'l_pattern'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_canteen'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Flow of Control',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_elif_one', 'm_order_bug', 'm_last_value', 'm_while_count', 'm_endless', 'm_digit_sum', 'm_sort_three', 'm_pattern_total', 'ar_continue', 'ar_empty_range'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words.', items: ['s2_err_indent', 's2_for_while', { attempt: 1, keys: ['s2_err_name', 's2_flowchart_abs'] }, 's3_off_by_one', { attempt: 1, keys: ['s3_endless', 's3_divisible'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18.', items: ['l_menu', { attempt: 1, keys: ['l_guess', 'l_series'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_band', 'cb_lockers'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 (conditional statements, indentation, if, if-else, if-elif-else, nested if, flowcharts for decisions, simple programs) and t02 (for with range(), while, break and continue, nested loops, patterns, series, factorial) of cbse-11-computer-science-ch04 only; no string or list methods',
    originality: 'every program, scenario and data value written for this chapter by SOYL; no textbook, NCERT or board-paper program reused',
    execution: 'every output, trace, count and error message in items, slides, notes and flashcards produced by running the program (runPy in lib.mjs); results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
