// Build CBSE 11 Computer Science ch02 Introduction to Problem Solving. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-11-computer-science-ch02/src/build.mjs
// Every trace table, output and value shown in decks, notes and flashcards is produced by running a Python twin of
// the algorithm with pyOut() (never typed). The pseudocode students read is the readable version of that Python.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, setAuthor, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache, pyOut } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-11-computer-science-ch02', 'computer-science');
setAuthor('claude-sonnet-5-5 (writer; reviewed by the subject-producer)');
usePyCache(SRC);
const { F, P, code, ic, rowsOf, mdTable, maxSrc, gcdSrc, sumSrc, digitsSrc, searchSrc, ROLLS } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const S = (rows) => rows.map((r) => r.map(String));

// ---------------------------------------------------------------- flowchart symbols drawn with the Svg builder
const ST = { fill: 'fill', color: 'accent', sw: 1.6 };
const term = (s, cx, cy, t, w = 100, h = 32) => { s.rect(cx - w / 2, cy - h / 2, w, h, { ...ST, rx: h / 2 }); s.text(cx, cy, t, { size: 13, bold: true }); };
const proc = (s, cx, cy, t, w = 150, h = 34) => { s.rect(cx - w / 2, cy - h / 2, w, h, { ...ST, rx: 2 }); s.text(cx, cy, t, { size: 13 }); };
const io = (s, cx, cy, t, w = 130, h = 34) => { const k = 14; s.polygon([[cx - w / 2 + k, cy - h / 2], [cx + w / 2 + k, cy - h / 2], [cx + w / 2 - k, cy + h / 2], [cx - w / 2 - k, cy + h / 2]], ST); s.text(cx, cy, t, { size: 13 }); };
const dec = (s, cx, cy, t, w = 150, h = 76) => { s.polygon([[cx, cy - h / 2], [cx + w / 2, cy], [cx, cy + h / 2], [cx - w / 2, cy]], ST); s.text(cx, cy, t, { size: 13 }); };
const down = (s, x, y1, y2) => s.arrow(x, y1, x, y2, { sw: 1.6 });
const lbl = (s, x, y, t) => s.text(x, y, t, { size: 12, color: 'accent', bold: true });

const vSymbols = (() => {
  const s = new Svg(560, 210);
  term(s, 70, 50, 'Start', 100, 36);
  io(s, 215, 50, 'Read n', 100, 36);
  proc(s, 365, 50, 'x = x + 1', 110, 36);
  dec(s, 500, 50, 'x > 0 ?', 100, 64);
  [[70, 'Oval', 'Start or end'], [215, 'Parallelogram', 'Input or output'], [365, 'Rectangle', 'Process (calculation)'], [500, 'Diamond', 'Decision (Yes / No)']].forEach(([x, a, b]) => {
    s.text(x, 112, a, { size: 14, bold: true });
    s.text(x, 134, b, { size: 12, muted: true });
  });
  s.arrow(60, 180, 180, 180, { sw: 1.6 });
  s.text(300, 180, 'Flow line: shows the order in which the boxes are followed', { size: 13, anchor: 'start' });
  return s.visual('Diagram of the four main flowchart symbols: an oval for start or end, a parallelogram for input or output, a rectangle for a process such as a calculation, and a diamond for a decision with Yes and No exits; below them an arrow labelled flow line', 'The four symbols you must know, and the flow line.');
})();
const vFlowA = (() => {
  const s = new Svg(400, 440);
  term(s, 200, 26, 'Start'); down(s, 200, 42, 70);
  io(s, 200, 88, 'Read a, b'); down(s, 200, 105, 130);
  dec(s, 200, 170, 'a > b ?', 150, 80);
  s.polyline([[125, 170], [80, 170], [80, 250]], { sw: 1.6 }); s.head(80, 252, 0, 1); lbl(s, 100, 158, 'Yes');
  s.polyline([[275, 170], [320, 170], [320, 250]], { sw: 1.6 }); s.head(320, 252, 0, 1); lbl(s, 300, 158, 'No');
  proc(s, 80, 270, 'big = a', 110); proc(s, 320, 270, 'big = b', 110);
  s.polyline([[80, 287], [80, 325], [200, 325]], { sw: 1.6 }); s.polyline([[320, 287], [320, 325], [200, 325]], { sw: 1.6 });
  down(s, 200, 325, 348);
  io(s, 200, 366, 'Print big'); down(s, 200, 383, 402);
  term(s, 200, 420, 'End');
  return s.visual('Flowchart for finding the larger of two numbers: Start, read a and b, a decision a greater than b; on Yes big becomes a, on No big becomes b; both paths join, print big, End', 'Selection: one decision, two paths that join again.');
})();
const vFlowB = (() => {
  const s = new Svg(440, 400);
  term(s, 190, 24, 'Start'); down(s, 190, 40, 63);
  io(s, 190, 80, 'Read n'); down(s, 190, 97, 118);
  proc(s, 190, 136, 'total = 0, i = 1', 160); down(s, 190, 153, 180);
  dec(s, 190, 220, 'i <= n ?', 150, 80);
  down(s, 190, 260, 292); lbl(s, 210, 276, 'Yes');
  proc(s, 190, 310, 'total = total + i', 170); down(s, 190, 327, 350);
  proc(s, 190, 368, 'i = i + 1', 150);
  s.polyline([[115, 368], [40, 368], [40, 220], [113, 220]], { sw: 1.6 }); s.head(115, 220, 1, 0);
  s.polyline([[265, 220], [345, 220], [345, 292]], { sw: 1.6 }); s.head(345, 293, 0, 1); lbl(s, 290, 208, 'No');
  io(s, 345, 310, 'Print total', 120); down(s, 345, 327, 350);
  term(s, 345, 368, 'End');
  return s.visual('Flowchart for the sum of the first n whole numbers: Start, read n, set total to 0 and i to 1, decision i less than or equal to n; on Yes add i to total and increase i by 1 and return to the decision; on No print total and End', 'Iteration: the line from the last box returns to the decision.');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Analyse the problem', 'Write an algorithm', 'Draw a flowchart', 'Sequence, selection, iteration', 'Trace a worked example'], 'Route map of Part 1: analysing a problem, writing an algorithm, drawing a flowchart, the three building blocks sequence, selection and iteration, and tracing worked examples', 'Part 1 at a glance');
const vSteps = flow('LR', ['Analyse the problem', 'Develop the algorithm', 'Code it', 'Test it', 'Debug it'], 'Flow of problem solving: analyse the problem, develop the algorithm, code it, test it, debug it, and then test again', 'Testing and debugging repeat until the program is right.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n5', label: 'errors found' }, { from: 'n5', to: 'n4', label: 'test again' },
]);
const vAnalyse = table(
  ['Question to ask', 'For a bicycle-shop interest calculator'],
  [
    ['What is given (input)?', 'Principal, rate of interest, time in years'],
    ['What is wanted (output)?', 'The simple interest'],
    ['What is the rule (process)?', 'Interest = principal * rate * time / 100'],
    ['Any limits or special cases?', 'Rate and time cannot be negative'],
  ],
  'Table that analyses a simple interest problem by asking what is given, what is wanted, what the rule is and what limits apply',
);
const vProps = table(
  ['Characteristic', 'Meaning'],
  [
    ['Input', 'Takes zero or more values to start with'],
    ['Output', 'Gives at least one result'],
    ['Definiteness', 'Each step is clear and has one meaning'],
    ['Finiteness', 'Ends after a limited number of steps'],
    ['Effectiveness', 'Each step is simple enough to be carried out'],
  ],
  'Table of the five characteristics of an algorithm: input, output, definiteness, finiteness and effectiveness, each with its meaning',
);
const vConstructs = table(
  ['Construct', 'What it does', 'In a flowchart', 'Pseudocode'],
  [
    ['Sequence', 'Steps one after another', 'Boxes joined in a line', 'Lines in order'],
    ['Selection', 'Chooses a path by a condition', 'Diamond with Yes and No', '`IF ... THEN ... ELSE`'],
    ['Iteration', 'Repeats steps', 'Flow line back to a box', '`WHILE`, `FOR`'],
  ],
  'Table of the three control structures: sequence runs steps in order, selection chooses by a condition using a diamond, iteration repeats using a line back to an earlier box',
);
const vSel = flow('TB', ['Read the age', 'Is the age below 5?', 'Fare is 0', 'Fare is 20', 'Print the fare'], 'Selection flow: read the age; if the age is below 5 the fare is 0, otherwise the fare is 20; both paths then print the fare', 'One question, two paths that meet again.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3', label: 'Yes' }, { from: 'n2', to: 'n4', label: 'No' }, { from: 'n3', to: 'n5' }, { from: 'n4', to: 'n5' },
]);
const vIter = flow('TB', ['Set the starting values', 'Is there more work to do?', 'Do the work and update', 'Print the result'], 'Iteration flow: set starting values; test whether more work remains; if yes do the work and update then return to the test; if no print the result', 'The update inside the loop makes it end.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3', label: 'Yes' }, { from: 'n3', to: 'n2', label: 'back to the test' }, { from: 'n2', to: 'n4', label: 'No' },
]);
const sumRows = rowsOf(sumSrc(5));
const vSumTrace = table(
  ['Pass', 'i used', 'total after the pass'],
  sumRows.map(([i, t], k) => [String(k + 1), String(i), String(t)]),
  `Trace table for the sum of the first 5 whole numbers: i goes 1 to 5 and total becomes ${sumRows.map((r) => r[1]).join(', ')}`,
  'Dry run produced by running the loop; the test i <= n then fails at i = 6.',
);
const digRows = rowsOf(digitsSrc(40729));
const vDigitTrace = table(
  ['Pass', 'x after dropping the last digit', 'count'],
  digRows.map(([c, x]) => [String(c), String(x), String(c)]),
  `Trace table for counting the digits of 40729: x becomes ${digRows.map((r) => r[1]).join(', ')} and count reaches ${digRows[digRows.length - 1][0]}`,
  'Dry run produced by running the loop.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Stages', 'analyse, algorithm, code, test, debug'],
    ['Algorithm', 'finite, definite, effective; takes input and gives output'],
    ['Symbols', 'oval, parallelogram, rectangle, diamond, flow line'],
    ['Constructs', 'sequence, selection, iteration'],
    ['Loops', 'initialise, test, update'],
  ],
  'Summary table of Part 1: the stages of problem solving, the characteristics of an algorithm, the four flowchart symbols, the three constructs and the three parts of a loop',
);

// ---- Part 2 visuals
const vRoute2 = flow('LR', ['Pseudocode', 'Decomposition', 'Dry runs and test cases', 'Debugging', 'Comparing algorithms'], 'Route map of Part 2: pseudocode, decomposition, dry runs and test cases, debugging and comparing algorithms', 'Part 2 at a glance');
const vPseudoKw = table(
  ['Purpose', 'Pseudocode words', 'Example'],
  [
    ['Input / output', '`INPUT`, `OUTPUT`', '`INPUT km`'],
    ['Assignment', '`SET`', '`SET fare = 30`'],
    ['Selection', '`IF`, `THEN`, `ELSE`, `END IF`', '`IF km <= 2 THEN`'],
    ['Counted loop', '`FOR ... TO`, `END FOR`', '`FOR i FROM 1 TO n`'],
    ['Conditional loop', '`WHILE`, `END WHILE`', '`WHILE b is not 0`'],
  ],
  'Table of common pseudocode words with their purpose: INPUT and OUTPUT, SET, IF THEN ELSE END IF, FOR TO and WHILE, each with an example line',
  'These are conventions, not strict rules; clarity matters most.',
);
const vCompare3 = table(
  ['Form', 'Written as', 'Strength', 'Can the computer run it?'],
  [
    ['Algorithm', 'Plain steps', 'Shows the idea', 'No'],
    ['Flowchart', 'Symbols and arrows', 'Easy to follow visually', 'No'],
    ['Pseudocode', 'Structured English-like lines', 'Close to a program, easy to edit', 'No'],
    ['Program', 'A programming language', 'Exact and complete', 'Yes, after translation'],
  ],
  'Comparison table of algorithm, flowchart, pseudocode and program, showing how each is written, its strength, and that only a program can be run by a computer',
);
const fareSrc = (km) => code(`km = ${km}`, 'if km <= 2:', '    fare = 30', 'else:', '    fare = 30 + (km - 2) * 12', 'print(fare)');
const kms = [1, 2, 5, 10];
const vFareTrace = table(
  ['km', 'Branch taken', 'fare'],
  kms.map((k) => [String(k), k <= 2 ? 'IF part' : 'ELSE part', pyOut(fareSrc(k))]),
  `Table of the auto-rickshaw fare for 1, 2, 5 and 10 kilometres: ${kms.map((k) => pyOut(fareSrc(k))).join(', ')} rupees`,
  'Each value found by running the algorithm.',
);
const vDecomp = flow('TB', ['Run the school fete', 'Stalls', 'Games', 'Show', 'Allot space', 'Collect fees', 'Check hygiene'], 'Decomposition tree: the school fete splits into stalls, games and show; stalls splits again into allotting space, collecting fees and checking hygiene', 'A problem split into sub-problems, and one of them split again.', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' }, { from: 'n2', to: 'n5' }, { from: 'n2', to: 'n6' }, { from: 'n2', to: 'n7' },
]);
const vDecompTable = table(
  ['Module', 'Input', 'Output'],
  [
    ['Enter marks', 'Marks typed by the teacher', 'List of marks'],
    ['Find total and percentage', 'List of marks', 'Total, percentage'],
    ['Decide grade', 'Percentage', 'Grade'],
    ['Print report card', 'Name, marks, total, grade', 'Report card'],
  ],
  'Table of four modules of a report-card program with the input and output of each; the output of one module feeds the next',
  'The output of each module becomes the input of the next.',
);
const vTestCases = table(
  ['Kind of test', 'Example for "free ride below age 5"', 'Why'],
  [
    ['Normal', 'Age 8', 'Typical value'],
    ['Boundary', 'Ages 4 and 5', 'Where the answer changes'],
    ['Extreme', 'Age 0 and age 99', 'Smallest and largest values'],
    ['Invalid', 'Age -3', 'Shows how the algorithm copes with wrong data'],
  ],
  'Table of kinds of test case with examples: normal, boundary, extreme and invalid',
);
const g1 = JSON.parse(pyOut(gcdSrc(48, 18)));
const vGcdTrace = table(
  ['Pass', 'a', 'b', 'r = a mod b'],
  S(g1.rows),
  `Trace table of Euclid's method on 48 and 18: remainders ${g1.rows.map((r) => r[3]).join(', ')}; the loop stops when b is 0 and a is ${g1.gcd}`,
  `The highest common factor of 48 and 18 is ${g1.gcd}.`,
);
const bugRows = rowsOf(code('n = 4', 'total = 0', 'rows = []', 'for i in range(1, n):', '    total = total + i', '    rows.append([i, total])', 'import json', 'print(json.dumps(rows))'));
const bugWant = pyOut(code('n = 4', 'print(sum(range(1, n + 1)))'));
const vBugTrace = table(
  ['i', 'total after the pass'],
  S(bugRows),
  `Trace table of a faulty sum algorithm for n = 4: the loop stops at i = ${bugRows[bugRows.length - 1][0]} and total is ${bugRows[bugRows.length - 1][1]}, but the correct total is ${bugWant}`,
  `Expected ${bugWant}, obtained ${bugRows[bugRows.length - 1][1]}: the last value is missing.`,
);
const vCriteria = table(
  ['Criterion', 'Question to ask'],
  [
    ['Correctness', 'Does it give the right output for every valid input?'],
    ['Time', 'How many steps does it take for the largest expected input?'],
    ['Memory', 'How much storage do its variables need?'],
    ['Clarity', 'Can another person read, check and change it easily?'],
  ],
  'Table of criteria for comparing algorithms: correctness, time in steps, memory used and clarity',
  'Correctness comes first; then compare efficiency.',
);
const targets = [3, 35, 74, 40];
const srchRows = targets.map((t) => [t, ...rowsOf(searchSrc(ROLLS, t))]);
const vSearchCompare = table(
  ['Roll number searched', 'Linear search comparisons', 'Binary search comparisons'],
  srchRows.map((r) => [String(r[0]), String(r[1]), String(r[2])]),
  `Table of comparisons made by linear and binary search on a sorted list of 15 roll numbers: for ${srchRows.map((r) => `${r[0]} linear ${r[1]} and binary ${r[2]}`).join('; ')}`,
  'The roll number 40 is not in the list.',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Pseudocode', 'structured English-like steps with no fixed syntax'],
    ['Decomposition', 'split a big problem into smaller parts that join up'],
    ['Dry run', 'follow the steps with sample data in a trace table'],
    ['Test cases', 'normal, boundary, extreme, invalid'],
    ['Comparing', 'both must be correct; then compare steps, memory and clarity'],
  ],
  'Summary table of Part 2: pseudocode, decomposition, dry runs, test cases and comparing algorithms',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Introduction to Problem Solving — Part 1: Steps, Algorithms and Flowcharts',
  goals: [
    'Describe the stages of problem solving and analyse a problem into input, process and output',
    'State the characteristics of an algorithm and use the three constructs: sequence, selection and iteration',
    'Draw and read flowcharts with the standard symbols, and dry run them',
  ],
  slides: [
    sl('title', 'Introduction to Problem Solving', {
      b: 'Part 1 — from a **problem** to a clear **algorithm** and a **flowchart**.',
      v: vRoute1,
      n: 'Welcome to Class 11 Computer Science. Computers solve problems only when we tell them exactly what to do, one clear step at a time. In this first part we learn how to understand a problem, how to describe the solution as an algorithm, and how to draw that algorithm as a flowchart. We will trace every example by hand.',
    }),
    sl('concept', 'Steps of problem solving', {
      b: 'A computer problem is solved in **stages**. Testing and debugging are repeated until the program is right.',
      v: vSteps,
      n: 'Problem solving has five stages. First analyse the problem. Then develop an algorithm. Then code it in a programming language. Then test it with sample data. If testing shows a wrong result, debug the program, which means find and remove the error, and test again. Skipping the first two stages is the commonest reason for programs that do not work.',
    }),
    sl('concept', 'Analysing the problem', {
      b: 'Ask four questions before writing anything.',
      v: vAnalyse,
      n: 'Analysis means understanding the problem completely. What is given? That is the input. What must be produced? That is the output. What rule turns one into the other? That is the process. And are there limits, such as a negative rate that makes no sense? Writing the answers down for a small example makes the algorithm much easier to write.',
    }),
    sl('check', 'Quick check: the first stage', {
      b: 'Fill in the blank.',
      chk: 'fb_analyse',
      n: 'Remember what must be done before any algorithm can be written.',
    }),
    sl('concept', 'What is an algorithm?', {
      b: 'An **algorithm** is a finite, ordered set of clear steps that solves a problem.',
      v: vProps,
      n: 'An algorithm is a step by step method for solving a problem. A good one has five characteristics. It takes input, gives output, and every step is definite, meaning clear with only one meaning. It must be finite, so it ends. And each step must be effective, simple enough to actually carry out. A recipe is a familiar example.',
    }),
    sl('diagram', 'Flowchart symbols', {
      b: 'A **flowchart** draws an algorithm with standard symbols joined by flow lines.',
      v: vSymbols,
      n: 'A flowchart is a picture of an algorithm. The oval marks start and end. The parallelogram is for input and output. The rectangle is for a process, such as a calculation or an assignment. The diamond asks a yes or no question, so it has two exits. Flow lines with arrowheads show the order in which the boxes are followed.',
    }),
    sl('check', 'Quick check: which symbol?', {
      b: 'Choose the correct symbol.',
      chk: 'm_parallelogram',
      n: 'Reading a value is an input operation. Which symbol is used for input and output?',
    }),
    sl('example', 'Worked example 1: the larger of two numbers', {
      b: `Read two numbers and print the larger.\n\n${P('INPUT a, b', 'IF a > b THEN', '    SET big = a', 'ELSE', '    SET big = b', 'END IF', 'OUTPUT big')}`,
      v: vFlowA,
      n: 'Here is a complete flowchart. Start, read the two numbers, then a diamond compares them. If a is greater, big becomes a. Otherwise big becomes b. The two paths join again, big is printed, and the flowchart ends. Notice that the diamond has exactly two exits, labelled yes and no, and that every other box has one way out.',
    }),
    sl('example', 'Worked example 2: sum of the first n numbers', {
      b: `Add 1, 2, 3 and so on up to n.\n\n${P('INPUT n', 'SET total = 0', 'SET i = 1', 'WHILE i <= n', '    SET total = total + i', '    SET i = i + 1', 'END WHILE', 'OUTPUT total')}`,
      v: vFlowB,
      n: 'This flowchart repeats. After setting total to zero and i to one, a diamond asks whether i is still within n. If yes, add i to total, increase i, and follow the line back to the diamond. If no, print the total. The line that returns to an earlier box is what makes it a loop. Without the increase of i, the loop would never end.',
    }),
    sl('example', 'Worked example 2: dry run for n = 5', {
      b: 'A **dry run** follows the steps by hand and records every change.',
      v: vSumTrace,
      n: 'Let us dry run the algorithm for n equal to five. In each pass we add the current value of i to the total. The total becomes one, three, six, ten and finally fifteen. Then i becomes six, the test fails, and the loop ends. The trace table is the proof that the algorithm works for this input.',
    }),
    sl('concept', 'Three building blocks', {
      b: 'Every algorithm is built from three **control structures**.',
      v: vConstructs,
      n: 'Any algorithm, however large, is built from three ideas. Sequence means steps are followed one after another. Selection means a condition chooses between paths, using if and else. Iteration means steps are repeated, using a while or a for loop. In a flowchart, selection is a diamond with two exits and iteration is a line that returns to an earlier box.',
    }),
    sl('diagram', 'Selection in a flowchart', {
      b: 'A condition decides which path is followed; the paths usually **join again**.',
      v: vSel,
      n: 'In selection, one question is asked and one of two paths is followed. Here the fare depends on whether the age is below five. Whichever path is taken, the flowchart continues to the same next box, where the fare is printed. Every diamond must have both exits labelled, yes and no, so that nobody has to guess.',
    }),
    sl('diagram', 'Iteration in a flowchart', {
      b: 'A loop has a **test**, a **body** and an **update**.',
      v: vIter,
      n: 'In iteration, the test is asked again and again. While the answer is yes, the body is done and the line goes back to the test. When the answer becomes no, control leaves the loop. For the loop to end, something inside the body must change the values that the test looks at. That change is called the update.',
    }),
    sl('check', 'Quick check: decisions in flowcharts', {
      b: 'True or false?',
      chk: 'tf_one_decision',
      n: 'Think about the flowchart of the larger of two numbers, and then about the sum of numbers. How many diamonds does each have?',
    }),
    sl('example', 'Worked example 3: counting digits', {
      b: `Count the digits of 40729 by dropping one digit at a time.\n\n${P('INPUT x', 'SET count = 0', 'WHILE x > 0', '    SET x = quotient of x divided by 10', '    SET count = count + 1', 'END WHILE', 'OUTPUT count')}`,
      v: vDigitTrace,
      n: 'This algorithm drops the last digit in each pass by dividing by ten and keeping only the whole part. The count goes up by one each time. Starting from forty thousand seven hundred twenty nine, x becomes four thousand and seventy two, four hundred and seven, forty, four, and finally zero, so the count is five.',
    }),
    sl('check', 'Quick check: a running total', {
      b: 'Predict the output.',
      chk: 'co_stall',
      n: 'Follow the loop and keep a running total of the hourly numbers.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Problem solving goes through analysis, algorithm, coding, testing and debugging. An algorithm is finite and definite, takes input and gives output. Flowcharts use the oval, the parallelogram, the rectangle, the diamond and flow lines. Every algorithm uses sequence, selection and iteration, and a loop needs a start, a test and an update.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name the symbol **and** its purpose: oval (start/end), parallelogram (input/output), rectangle (process), diamond (decision).',
        'Label both exits of every diamond **Yes** and **No**.',
        'In a loop, show the **update** and the line that returns to the test.',
        'For a trace table, give one column for every variable and one row for every pass.',
        'Write the final output clearly after the table.',
      ],
      n: 'Some advice for the exam. When you draw a flowchart, use the right symbol for each box and label both exits of every diamond. In a loop, do not forget the update step and the line returning to the test. For a dry run, make a table with a column for each variable and a row for each pass, and state the final output clearly.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Introduction to Problem Solving — Part 2: Pseudocode, Decomposition, Dry Runs and Comparing Algorithms',
  goals: [
    'Write algorithms in pseudocode using INPUT, OUTPUT, SET, IF, FOR and WHILE',
    'Decompose a problem into sub-problems and show how they join',
    'Verify an algorithm by a dry run with good test cases, and compare two algorithms',
  ],
  slides: [
    sl('title', 'Pseudocode, decomposition and dry runs', {
      b: 'Part 2 — **writing**, **splitting**, **checking** and **comparing** algorithms.',
      v: vRoute2,
      n: 'In Part 2 we write algorithms in pseudocode, split large problems into smaller ones, check an algorithm by a dry run with well chosen test cases, and finally compare two algorithms to decide which is better. Keep paper and pencil ready, because every example here is meant to be traced by hand.',
    }),
    sl('concept', 'Pseudocode', {
      b: '**Pseudocode** describes the steps in structured, English-like lines. It has conventions but no fixed syntax.',
      v: vPseudoKw,
      n: 'Pseudocode is a way of writing an algorithm in structured plain language. We use words such as input, output, set, if, then, else, for and while, and we indent the steps that belong inside a decision or loop. There is no strict grammar, and no computer can run it, but it is very close to a program and easy to edit.',
    }),
    sl('concept', 'Algorithm, flowchart, pseudocode, program', {
      v: vCompare3,
      n: 'The same solution can be shown in four forms. An algorithm in plain steps shows the idea. A flowchart shows it visually. Pseudocode is closer to a program. Only the last form, a program in a language such as Python, can be run by a computer after translation. Choose the form that makes the logic easiest to check.',
    }),
    sl('example', 'Worked example 4: an auto-rickshaw fare', {
      b: `The fare is 30 rupees for up to 2 km, plus 12 rupees for every further km.\n\n${P('INPUT km', 'IF km <= 2 THEN', '    SET fare = 30', 'ELSE', '    SET fare = 30 + (km - 2) * 12', 'END IF', 'OUTPUT fare')}`,
      v: vFareTrace,
      n: 'This pseudocode uses selection. If the distance is two kilometres or less, the fare is a flat thirty rupees. Otherwise, thirty rupees is added to twelve rupees for each extra kilometre. The table shows the result for four distances, including the boundary value of two kilometres, where the branch changes.',
    }),
    sl('check', 'Quick check: versions of pseudocode', {
      b: 'True or false?',
      chk: 'tf_pseudo_versions',
      n: 'Think about whether pseudocode has a fixed grammar like a programming language.',
    }),
    sl('diagram', 'Decomposition', {
      b: '**Decomposition** splits a complex problem into smaller sub-problems, which can be split again.',
      v: vDecomp,
      n: 'Large problems are hard to solve all at once. Decomposition splits the problem into smaller parts that are easier to understand, solve and test. Here a school fete is divided into stalls, games and show, and the stalls are divided again. Different people can work on different parts at the same time.',
    }),
    sl('concept', 'Joining the parts together', {
      b: 'Each module has its own **input** and **output**; the output of one is the input of the next.',
      v: vDecompTable,
      n: 'After solving the parts, we must join them. The report card program has four modules. The marks module produces a list. The next module turns the list into a total and a percentage. The grade module uses the percentage. The last module prints everything. Clear inputs and outputs make the parts fit together.',
    }),
    sl('concept', 'Dry run and test cases', {
      b: 'A **dry run** with well-chosen **test cases** verifies an algorithm before it is coded.',
      v: vTestCases,
      n: 'To verify an algorithm, run it by hand on test cases. Use normal values, boundary values where the answer changes, extreme values, and invalid values to see how the algorithm copes. One passing input proves nothing, because an error may only appear on the boundary. Record every variable in a trace table as you go.',
    }),
    sl('example', 'Worked example 5: dry run of Euclid\'s method', {
      b: `Find the highest common factor of 48 and 18.\n\n${P('INPUT a, b', 'WHILE b is not 0', '    SET r = remainder of a divided by b', '    SET a = b', '    SET b = r', 'END WHILE', 'OUTPUT a')}`,
      v: vGcdTrace,
      n: 'Euclid had a clever method for the highest common factor. Repeat: find the remainder of a divided by b, then let a become b and b become the remainder. In the first pass the remainder is twelve, in the second it is six, and in the third it is zero. Then b is zero, the loop stops, and a, which is six, is the answer.',
    }),
    sl('check', 'Quick check: arranging a dry run', {
      b: 'Put the actions in order.',
      chk: 'ord_dry',
      n: 'Decide which actions come before the table is filled in and which come after.',
    }),
    sl('example', 'Worked example 6: finding a bug by dry run', {
      b: `This algorithm should add the numbers 1 to n, but the loop is wrong.\n\n${P('SET total = 0', 'FOR i FROM 1 TO n - 1', '    SET total = total + i', 'END FOR', 'OUTPUT total')}`,
      v: vBugTrace,
      n: 'A dry run often reveals a logical error. This algorithm is meant to add the numbers from one to n. We dry run it for n equal to four. The loop stops one pass too early, so the last number is never added. The expected total is ten, but the trace gives six. The fix is to run the loop up to n, not n minus one.',
    }),
    sl('check', 'Quick check: exchanging two values', {
      b: 'Predict the output.',
      chk: 'm_swap',
      n: 'A helper variable remembers the old value before it is overwritten. Follow each step carefully.',
    }),
    sl('concept', 'Comparing algorithms', {
      b: 'Two algorithms may both be correct. Then compare how **efficient** and how **clear** they are.',
      v: vCriteria,
      n: 'A problem usually has more than one correct algorithm. We first make sure each is correct. Then we compare how many steps each takes for the largest expected input, how much memory each needs, and how easy each is to read and change. Fewer steps is better for large inputs, but clarity matters for small ones.',
    }),
    sl('example', 'Worked example 7: linear search and binary search', {
      b: 'Both find a roll number in a sorted list of 15 numbers. **Linear search** checks one by one from the start; **binary search** checks the middle and discards half.',
      v: vSearchCompare,
      n: 'Linear search starts at the first roll number and compares each in turn. Binary search starts in the middle of a sorted list and throws away half of the list after each comparison. For the first roll number, linear search wins. For the last one, and for a missing one, binary search needs far fewer comparisons. For big lists the difference is enormous.',
    }),
    sl('check', 'Quick check: why debug?', {
      b: 'Fill in the blank.',
      chk: 'fb_debug',
      n: 'Remember the last stage of the problem solving cycle.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Pseudocode describes steps in structured language with no fixed syntax. Decomposition splits a problem into modules whose outputs feed each other. A dry run on normal, boundary, extreme and invalid test cases verifies an algorithm. When two algorithms are correct, compare their steps, memory and clarity.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Indent the steps inside `IF`, `WHILE` and `FOR`, and close each with `END IF`, `END WHILE` or `END FOR`.',
        'Do a dry run on a **boundary** value as well as a normal one.',
        'For decomposition answers, name the sub-problems **and** their inputs and outputs.',
        'When comparing, say which is better **and why**: fewer steps, less memory or clearer.',
        'Do not claim that an algorithm is correct from a single test.',
      ],
      n: 'Some advice for the exam. Indent the steps inside decisions and loops, and close each with an end line. Always include a boundary value in your dry run. In decomposition answers, give inputs and outputs for each part. When you compare two algorithms, say which is better and give the reason. And never claim an algorithm is correct because one test worked.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Introduction to Problem Solving — Notes',
  sections: [
    {
      h: '1. Steps of problem solving',
      t: 1,
      b: 'A computer cannot solve a problem that the programmer has not understood. The work goes through **five stages**.\n\n1. **Analysing the problem:** find the input, the output, the rule that joins them and any limits.\n2. **Developing an algorithm:** write the solution as clear steps (algorithm, flowchart or pseudocode).\n3. **Coding:** translate the algorithm into a programming language.\n4. **Testing:** run the program on sample data, including awkward values.\n5. **Debugging:** find and remove the cause of every wrong result, then test again.\n\nIt is far cheaper to correct a mistake in the algorithm than in finished code.',
      terms: [
        ['Debugging', 'Locating and removing the errors found by testing.'],
        ['Input, process, output', 'What goes in, the rule applied to it, and what comes out.'],
      ],
      v: vSteps,
      vs: [vAnalyse],
    },
    {
      h: '2. Algorithms and control structures',
      t: 1,
      b: 'An **algorithm** is a finite, ordered set of clear steps for solving a problem. It takes input (possibly none), gives output, is definite (each step has one meaning), finite (it ends) and effective (each step can be carried out).\n\nEvery algorithm is built from three **constructs**:\n- **Sequence:** steps one after another.\n- **Selection:** a condition chooses a path (`IF ... THEN ... ELSE`).\n- **Iteration:** steps repeat (`WHILE`, `FOR`). A loop needs an initial value, a test and an update, otherwise it may never end.',
      terms: [
        ['Algorithm', 'A finite, ordered set of definite, effective steps that solves a problem.'],
        ['Selection', 'Choosing between paths according to a condition.'],
        ['Iteration', 'Repeating a group of steps.'],
      ],
      v: vProps,
      vs: [vConstructs],
    },
    {
      h: '3. Flowcharts',
      t: 1,
      b: 'A **flowchart** shows an algorithm with standard symbols joined by flow lines with arrowheads.\n\n- **Oval:** start or end.\n- **Parallelogram:** input or output.\n- **Rectangle:** process such as a calculation or assignment.\n- **Diamond:** decision with two exits, Yes and No.\n\nRules: one Start, at least one End; every box except End has an outgoing line; a loop is a line that returns to an earlier box; label both exits of a diamond. A flowchart is easy to follow, but a big one becomes untidy and hard to change.',
      terms: [
        ['Flowchart', 'A diagram that shows the steps of an algorithm with standard symbols and arrows.'],
        ['Terminator', 'The oval symbol that marks the start or the end.'],
      ],
      v: vSymbols,
      vs: [vFlowA, vFlowB, vSel, vIter],
    },
    {
      h: '4. Pseudocode',
      t: 1,
      b: '**Pseudocode** writes the steps in structured, English-like lines. Common words: `INPUT`, `OUTPUT`, `SET`, `IF ... THEN ... ELSE ... END IF`, `FOR ... END FOR`, `WHILE ... END WHILE`. Indentation shows which steps belong to a decision or a loop.\n\nThere is no fixed syntax and a computer cannot run it, so two correct versions may look different. It must still be clear and complete so that it can be turned into a program easily.',
      terms: [['Pseudocode', 'An informal, structured description of an algorithm; it is not a programming language.']],
      v: vPseudoKw,
      vs: [vCompare3, vFareTrace],
    },
    {
      h: '5. Decomposition',
      t: 1,
      b: '**Decomposition** breaks a complex problem into smaller sub-problems. Each can be understood, solved and tested separately, and different people can work in parallel.\n\nFor each module note its **input** and **output**; the output of one module is usually the input of the next. A module that is still too large can be decomposed again.',
      terms: [['Decomposition', 'Splitting a problem into smaller, more manageable sub-problems.'], ['Module', 'One sub-problem solved by its own group of steps.']],
      v: vDecomp,
      vs: [vDecompTable],
    },
    {
      h: '6. Verifying algorithms: dry runs, test cases and debugging',
      t: 1,
      b: 'A **dry run** follows the algorithm by hand on sample data, with a **trace table** that has a column for each variable and a row for each pass. Compare the final output with the expected answer.\n\nChoose **test cases** of four kinds: normal, boundary (where the answer changes), extreme and invalid. One passing case does not prove correctness.\n\nThe usual faults are a wrong comparison (for example `<` in place of `<=`), a loop that runs one pass too few or too many, a missing update that gives an endless loop, and a value overwritten before it was saved.',
      terms: [['Dry run', 'Tracing an algorithm by hand with sample values.'], ['Trace table', 'A table recording the value of each variable after each step or pass.'], ['Test case', 'A chosen input with its expected output.']],
      v: vGcdTrace,
      vs: [vBugTrace, vTestCases],
    },
    {
      h: '7. Comparing algorithms',
      t: 1,
      b: 'First make sure that both algorithms are **correct**. Then compare:\n- **Time:** the number of steps for the largest expected input.\n- **Memory:** the storage needed for variables and data.\n- **Clarity:** how easily another person can read and change it.\n\nLinear search may need to examine every item, whereas binary search on a sorted list discards half the items after each comparison, so it needs far fewer comparisons for a long list.',
      terms: [['Efficiency', 'How few steps and how little memory an algorithm needs.']],
      v: vCriteria,
      vs: [vSearchCompare],
    },
  ],
  tips: '**Common mistakes**\n- Using the wrong symbol: a calculation in a parallelogram, or input in a rectangle.\n- A diamond with one exit, or with exits that are not labelled Yes and No.\n- A loop with no update, or with no line back to the test.\n- A dry run that fills only the final row: show every pass.\n- Testing with a single normal input and calling the algorithm correct.\n- Writing real Python syntax and calling it pseudocode, or the reverse.\n\n**How marks are usually awarded**\n- Definitions and differences (2 marks): one point each, with an example.\n- Flowchart: marks for correct symbols, the decision with both exits, the return line of a loop and the output.\n- Dry run: marks for the table, the intermediate values and the final output.\n- Algorithm or pseudocode: marks for input, initialisation, loop or decision, update and output; any correct method earns full marks.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['List the **stages of problem solving** in order.', 'Analysing the problem, developing an algorithm, coding, testing and debugging.', 'fact', 1],
  ['What is done in **analysing** a problem?', 'Find the input, the output, the rule (process) and any limits.', 'concept', 1],
  ['What is **debugging**?', 'Finding and removing the cause of errors that testing has revealed.', 'definition', 1],
  ['Define **algorithm**.', 'A finite, ordered set of clear steps that solves a problem.', 'definition', 1],
  ['Five **characteristics** of an algorithm', 'Input, output, definiteness, finiteness and effectiveness.', 'fact', 1],
  ['What does **definiteness** mean?', 'Every step is clear and has exactly one meaning.', 'concept', 1],
  ['What does **finiteness** mean?', 'The algorithm ends after a limited number of steps.', 'concept', 1],
  ['The three **control structures**', 'Sequence, selection and iteration.', 'fact', 1],
  ['What is **selection**?', 'A condition decides which path of steps is followed (IF ... ELSE).', 'concept', 1],
  ['What is **iteration**?', 'A group of steps is repeated (WHILE or FOR).', 'concept', 1],
  ['Three parts of a **loop**', 'Initial value, test of the condition, and an update in the body.', 'concept', 1],
  ['What is a **flowchart**?', 'A diagram of an algorithm using standard symbols and flow lines.', 'definition', 1],
  ['Flowchart symbol for **start and end**', 'Oval (terminator).', 'fact', 1],
  ['Flowchart symbol for **input and output**', 'Parallelogram.', 'fact', 1],
  ['Flowchart symbol for a **calculation**', 'Rectangle (process).', 'fact', 1],
  ['Flowchart symbol for a **decision**', 'Diamond, with Yes and No exits.', 'fact', 1],
  ['How is a **loop** drawn in a flowchart?', 'By a flow line that returns to an earlier box, usually the decision.', 'exam-tip', 1],
  ['What is **pseudocode**?', 'Structured, English-like description of the steps; no fixed syntax and not runnable.', 'definition', 1],
  ['Can two different pseudocodes be correct for one problem?', '**Yes.** Only clarity and correct results matter.', 'concept', 1],
  ['Which form can a computer run?', 'Only a **program** (after translation). Algorithm, flowchart and pseudocode cannot be run.', 'fact', 1],
  ['What is **decomposition**?', 'Breaking a complex problem into smaller sub-problems that are solved separately and then combined.', 'definition', 1],
  ['Why decompose a problem?', 'Parts are easier to solve and test, and several people can work at once.', 'concept', 1],
  ['What is a **dry run**?', 'Following an algorithm by hand with sample values and recording the variables in a trace table.', 'definition', 1],
  ['What is a **trace table**?', 'A table with a column for each variable and a row for each pass or step.', 'definition', 1],
  ['What is a **boundary** test case?', 'A value where the answer changes, such as 500 for the test "bill >= 500".', 'exam-tip', 1],
  ['Does one passing test prove an algorithm correct?', '**No.** Test normal, boundary, extreme and invalid inputs.', 'exam-tip', 1],
  ['Why does a loop with a missing **update** fail?', 'The test never becomes false, so it never ends (loses finiteness).', 'concept', 1],
  [`Euclid's method on ${ic('48')} and ${ic('18')}: answer?`, `${ic(String(g1.gcd))}, found in ${g1.rows.length} passes.`, 'example', 1],
  ['How to compare **two correct** algorithms?', 'Compare time (steps), memory and clarity.', 'concept', 1],
  [`Binary search on 15 sorted items, target ${ic('35')}: comparisons?`, `${ic(String(srchRows[1][2]))} (the middle item), against ${ic(String(srchRows[1][1]))} for linear search.`, 'example', 1],
]);

// ---------------------------------------------------------------- tests (cbse-11-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Introduction to Problem Solving',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_diamond', 'm_sum_odd', 'm_first_pass', 'ar_finite'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s2_symbols', 's2_why_dry', 's3_fare_table'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions. Show the trace table.', items: [{ attempt: 1, keys: ['l_max3', 'l_gcd'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_fine'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Introduction to Problem Solving',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_first_step', 'm_definite', 'm_digital_root', 'm_boundary', 'm_smallest_bug', 'm_binary_max', 'm_flow_desc', 'm_never_ends', 'ar_gcd', 'ar_dry'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words.', items: ['s2_name_error', 's2_decompose', { attempt: 1, keys: ['s2_dry_small', 's2_flow_use'] }, 's3_swap_bug', { attempt: 1, keys: ['s3_off_by_one', 's3_compare_sum'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18.', items: ['l_flow_multiples', { attempt: 1, keys: ['l_slab', 'l_prime_compare'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_fete', 'cb_savings'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topic t01 of cbse-11-computer-science-ch02 only (steps of problem solving, algorithms, flowcharts, pseudocode, decomposition, dry runs, comparing algorithms)',
    originality: 'every algorithm, scenario and data value written for this chapter by SOYL; no textbook, NCERT or board-paper algorithm reused',
    execution: 'every trace, value and output in items, slides, notes and flashcards produced by running a Python twin of the algorithm (runPy in lib.mjs); results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
