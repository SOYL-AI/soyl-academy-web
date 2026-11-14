// CBSE 11 Computer Science, ch02 Introduction to Problem Solving — question bank. Every algorithm, scenario and data
// value is written by SOYL (imagined people, shops and school events); no textbook, NCERT or board-paper algorithm is reused.
// Every value, trace and output stated anywhere in an item is produced by running a Python version of the algorithm
// with runPy()/pyOut() in lib.mjs; nothing is typed by hand. Pseudocode shown to students is the readable twin of
// the Python that is executed behind the scenes.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, pyOut, pyErr } from './lib.mjs';

const S2 = [25, 50];
/** A Python code fence. */
export const F = (...lines) => '```python\n' + lines.join('\n') + '\n```';
/** A pseudocode fence. */
export const P = (...lines) => '```text\n' + lines.join('\n') + '\n```';
export const code = (...lines) => lines.join('\n');
export const ic = (s) => '`' + s + '`';
const outIc = (c, opts) => ic(pyOut(c, opts));
const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
export const rowsOf = (c) => JSON.parse(pyOut(c));
export const mdTable = (headers, rows) =>
  [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map(String).join(' | ')} |`)].join('\n');

// ---------------------------------------------------------------- Python twins of the algorithms (exported for decks and notes)
/** Largest of three: rows [step, test, answer, big]. */
export const maxSrc = (a, b, c) =>
  code(
    `a, b, c = ${a}, ${b}, ${c}`, 'rows = []', 'big = a', 'rows.append(["big = a", "-", big])',
    'yes = b > big', 'if yes:', '    big = b', 'rows.append(["Is b > big?", "Yes" if yes else "No", big])',
    'yes = c > big', 'if yes:', '    big = c', 'rows.append(["Is c > big?", "Yes" if yes else "No", big])',
    'import json', 'print(json.dumps(rows))',
  );
/** Euclid's algorithm: { rows: [[pass, a, b, r]], gcd }. */
export const gcdSrc = (a, b) =>
  code(
    `a, b = ${a}, ${b}`, 'rows = []', 'k = 0', 'while b != 0:', '    k += 1', '    r = a % b', '    rows.append([k, a, b, r])', '    a, b = b, r',
    'import json', 'print(json.dumps({"rows": rows, "gcd": a}))',
  );
/** Sum of 1 to n: rows [pass, i, total]. */
export const sumSrc = (n) =>
  code(`n = ${n}`, 'total = 0', 'i = 1', 'rows = []', 'while i <= n:', '    total = total + i', '    rows.append([i, total])', '    i = i + 1', 'import json', 'print(json.dumps(rows))');
/** Counting digits: rows [pass, x, count]. */
export const digitsSrc = (x) =>
  code(`x = ${x}`, 'count = 0', 'rows = []', 'while x > 0:', '    x = x // 10', '    count = count + 1', '    rows.append([count, x])', 'import json', 'print(json.dumps(rows))');
/** Linear search comparisons; binary search comparisons (one comparison per probe). */
export const searchSrc = (lst, target) =>
  code(
    `data = ${JSON.stringify(lst)}`, `target = ${target}`,
    'lin = 0', 'for v in data:', '    lin += 1', '    if v == target:', '        break',
    'lo, hi, binc = 0, len(data) - 1, 0', 'while lo <= hi:', '    mid = (lo + hi) // 2', '    binc += 1', '    if data[mid] == target:', '        break', '    elif data[mid] < target:', '        lo = mid + 1', '    else:', '        hi = mid - 1',
    'import json', 'print(json.dumps([lin, binc]))',
  );
export const ROLLS = [3, 8, 12, 17, 21, 26, 30, 35, 41, 47, 52, 58, 63, 69, 74];
/** Worst-case probes of binary search on n sorted items. */
export const binWorst = (n) =>
  Number(pyOut(code(`n = ${n}`, 'data = list(range(n))', 'worst = 0', 'for target in data:', '    lo, hi, c = 0, n - 1, 0', '    while lo <= hi:', '        mid = (lo + hi) // 2', '        c += 1', '        if data[mid] == target:', '            break', '        elif data[mid] < target:', '            lo = mid + 1', '        else:', '            hi = mid - 1', '    worst = max(worst, c)', 'print(worst)')));

// ================================================================ t01 objective items
Q('m_first_step', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Before Zoya writes a single step of her algorithm for the school fete ticket counter, which stage of problem solving must she complete first?',
  opts: ['Analysing the problem', 'Coding the solution', 'Testing the program', 'Debugging the program'],
  sol: 'Problem solving begins by understanding what is given, what is wanted and any constraints. The algorithm, code, tests and debugging all depend on that analysis.',
}));
Q('m_oval', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In the flowchart that Nikhil draws for his locker-allotment algorithm, which shape marks the Start and the End of the algorithm?',
  opts: ['Oval (terminator)', 'Rectangle', 'Diamond', 'Parallelogram'],
  sol: 'The oval is the terminator symbol for start and stop. Rectangles show processing, diamonds show decisions and parallelograms show input and output.',
}));
Q('m_parallelogram', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A flowchart box says "Read the length and breadth of the garden plot". Which symbol should be used for it?',
  opts: ['Parallelogram', 'Rectangle', 'Oval', 'Diamond'],
  sol: 'Reading values and displaying results are input and output operations, drawn in a parallelogram. A rectangle would be used for a calculation.',
}));
Q('m_diamond', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A flowchart box contains the question "Is the bill amount 500 or more?" and has two lines leaving it, labelled Yes and No. Which symbol is it?',
  opts: ['Diamond (decision)', 'Rectangle (process)', 'Oval (terminator)', 'Parallelogram (input/output)'],
  sol: 'A question with two exits is a decision, drawn as a diamond. Every other symbol has only one line leaving it, apart from the end symbol, which has none.',
}));
Q('m_definite', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'One step of Pranav\'s recipe-scaling algorithm says "Add a suitable amount of salt". Which characteristic of a good algorithm does this step violate?',
  opts: ['Definiteness: each step must be clear and unambiguous', 'Finiteness: the algorithm must end', 'Input: the algorithm must accept values', 'Output: the algorithm must produce a result'],
  sol: 'A step that depends on guesswork is not precisely defined, so two people could carry it out differently. Each step of an algorithm must have exactly one meaning.',
}));
Q('m_constructs', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Every algorithm is built from basic control structures. Which of the following is **NOT** one of them?',
  opts: ['Compilation', 'Sequence', 'Selection', 'Iteration'],
  sol: 'The three basic constructs are sequence (steps in order), selection (choosing by a condition) and iteration (repeating). Compilation is the translation of a program into machine code, a different idea.',
}));
Q('m_pseudocode', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement about the pseudocode that Ishita wrote for her library-fine calculation is correct?',
  opts: [
    'It describes the logic in structured, English-like steps and cannot be run directly by a computer',
    'It follows exact grammar rules that a compiler checks before it runs',
    'It must use the keywords of Python only',
    'It can be given to the computer to run once it has no spelling mistakes',
  ],
  sol: 'Pseudocode is informal: it has conventions but no fixed syntax and no translator. It must be converted into a real programming language before a computer can execute it.',
}));
Q('m_decomp', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A club plans a three-day science exhibition. It splits the work into venue, stalls, invitations and refreshments, and gives each part to a small team. This technique is called',
  opts: ['decomposition', 'debugging', 'compilation', 'dry running'],
  sol: 'Breaking a large problem into smaller, manageable sub-problems that can be solved separately and then combined is decomposition.',
}));
Q('m_process_step', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An algorithm for Hemant\'s bicycle-shop interest calculator reads the principal, rate and time and then shows the interest. Which of its steps is the **processing** step?',
  opts: ['Multiplying the principal, rate and time and dividing the product by 100', 'Reading the principal, rate and time', 'Displaying the interest on the screen', 'Beginning the algorithm'],
  sol: 'Processing is the computation that turns inputs into the result. Reading is input, displaying is output, and beginning is only the start marker.',
}));
Q('m_first_pass', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Sheela must choose between two correct algorithms that both look up a name in the school directory. Algorithm A needs at most 500 steps and algorithm B at most 9 steps, and both use the same memory. What is the best reason to prefer B?',
  opts: ['It reaches the answer in far fewer steps, so it is more efficient', 'It is shorter to write on paper', 'It was thought of first', 'It uses simpler words in its steps'],
  sol: 'When two algorithms are both correct, they are compared on efficiency: the number of steps (time) and the memory used. Neither the order of invention nor the wording affects efficiency.',
}));
Q('m_loop_flow', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the flowchart of Rhea\'s attendance-counting algorithm, a part of the work is repeated. How is a repetition (loop) drawn in a flowchart?',
  opts: ['A flow line goes back from a later box to an earlier box', 'An extra oval is drawn inside the process box', 'A second Start symbol is added', 'The diamond is drawn twice in a row'],
  sol: 'A loop is shown by a flow line that returns to an earlier box, usually to the decision that tests whether to repeat again.',
}));

const cOdd = code('n = 9', 'total = 0', 'for i in range(1, n + 1):', '    if i % 2 == 1:', '        total = total + i', 'print(total)');
Q('m_sum_odd', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Bhavna's school sells raffle tickets numbered 1 to n and she adds up only the odd ticket numbers using the pseudocode below. What does it output when n is 9?\n\n${P('INPUT n', 'SET total = 0', 'FOR i FROM 1 TO n', '    IF i is odd THEN', '        SET total = total + i', '    END IF', 'END FOR', 'OUTPUT total')}`,
  opts: distinct([outIc(cOdd), ic('45'), ic('20'), ic('16')]),
  sol: 'The odd numbers from 1 to 9 are 1, 3, 5, 7 and 9, and their sum is 25. The sum of all the numbers would be 45, the even ones alone give 20, and stopping at 7 gives 16.',
}));
const cRoot = code('x = 98765', 'while x >= 10:', '    x = sum(int(d) for d in str(x))', 'print(x)');
const cRoot1 = code('x = 98765', 'x = sum(int(d) for d in str(x))', 'print(x)');
Q('m_digital_root', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Aarav repeats a digit-adding game on the number 98765 using this pseudocode. What does it output?\n\n${P('INPUT x', 'WHILE x >= 10', '    SET x = sum of the digits of x', 'END WHILE', 'OUTPUT x')}`,
  opts: distinct([outIc(cRoot), outIc(cRoot1), ic('9'), ic('26')]),
  sol: 'The first pass turns 98765 into 9 + 8 + 7 + 6 + 5 = 35. Since 35 is still 10 or more, a second pass gives 3 + 5 = 8. Now x is below 10, the loop stops and 8 is output; 35 is only the value after one pass.',
}));
Q('m_boundary', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Dhruv\'s sweet shop gives a free gift when the bill is 500 rupees or more (the test is "IF bill >= 500"). To check that the test is written correctly, which input is the best **boundary** test case?',
  opts: [ic('500'), ic('250'), ic('750'), ic('1000')],
  sol: 'Errors in comparisons such as using > instead of >= appear exactly at the boundary value, so 500 is the most revealing input. Values far from the boundary pass either way.',
}));
const bugSrc = (a, b, c) => code(`a, b, c = ${a}, ${b}, ${c}`, 'if b < a:', '    small = b', 'else:', '    small = a', 'if c < a:', '    small = c', 'print(small)');
const triples = [[7, 9, 4], [9, 4, 6], [5, 8, 9], [3, 6, 2]];
const failing = triples.filter(([a, b, c]) => pyOut(bugSrc(a, b, c)) !== String(Math.min(a, b, c)));
if (failing.length !== 1 || failing[0].join() !== '9,4,6') throw new Error(`smallest-of-three bug triples: ${JSON.stringify(failing)}`);
Q('m_smallest_bug', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `Pooja's algorithm is meant to output the smallest of three numbers a, b and c, but it is faulty.\n\n${P('INPUT a, b, c', 'IF b < a THEN', '    SET small = b', 'ELSE', '    SET small = a', 'END IF', 'IF c < a THEN', '    SET small = c', 'END IF', 'OUTPUT small')}\n\nFor which input does it output a wrong answer?`,
  opts: distinct(['a = 9, b = 4, c = 6', 'a = 7, b = 9, c = 4', 'a = 5, b = 8, c = 9', 'a = 3, b = 6, c = 2']),
  sol: `The last test compares c with a instead of with the current small. For a = 9, b = 4, c = 6 the first part sets small to 4, but 6 is less than 9, so small is overwritten by 6 and the output is ${pyOut(bugSrc(9, 4, 6))} instead of 4. The other three inputs give the correct minimum.`,
}));
const w63 = binWorst(63);
Q('m_binary_max', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A school keeps 63 admission numbers in increasing order. Binary search compares the target with the middle item and discards half of the remaining list each time. What is the largest number of comparisons it will ever need to find a number or decide that it is absent?`,
  opts: distinct([ic(String(w63)), ic('63'), ic('32'), ic('9')]),
  sol: `Each comparison halves the list: 63 items become 31, then 15, 7, 3, 1 and finally nothing, so at most ${w63} comparisons are needed. Linear search could need all 63.`,
}));
const gcdRows = (a, b) => JSON.parse(pyOut(gcdSrc(a, b))).rows.length;
Q('m_gcd_passes', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Jaya uses Euclid's method to find the highest common factor of 84 and 36: repeat "replace a by b and b by the remainder of a divided by b" until b is 0. How many times is a remainder calculated?\n\n${P('INPUT a, b', 'WHILE b is not 0', '    SET r = remainder of a divided by b', '    SET a = b', '    SET b = r', 'END WHILE', 'OUTPUT a')}`,
  opts: distinct([ic(String(gcdRows(84, 36))), ic('1'), ic('3'), ic('4')]),
  sol: 'First pass: remainder of 84 divided by 36 is 12, so (a, b) becomes (36, 12). Second pass: remainder of 36 divided by 12 is 0, so (a, b) becomes (12, 0). The loop stops after those two calculations and outputs 12.',
}));
const cFlow = code('x = 3820', 'y = 0', 'while x > 0:', '    y = y * 10 + x % 10', '    x = x // 10', 'print(y)');
Q('m_flow_desc', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A flowchart for a number game has these boxes. Box 1: Start. Box 2: Read x. Box 3: y = 0. Box 4 (decision): Is x > 0? Yes goes to box 5, No goes to box 8. Box 5: y = y * 10 + (remainder of x divided by 10). Box 6: x = quotient of x divided by 10. Box 7: go back to box 4. Box 8: Print y. Box 9: Stop. What does it print when 3820 is read?`,
  opts: distinct([outIc(cFlow), ic('0283'), ic('2830'), ic('3820')]),
  sol: 'The loop peels the last digit of x each pass and attaches it to y: y becomes 0, 82, 283 (the leading zero adds nothing) and the printed value is 283. A number cannot keep a leading zero, so 0283 is impossible.',
}));
const cNever = code('n = 10', 'seen = []', 'for _ in range(60):', '    if n == 0:', '        break', '    n = n - 3', '    seen.append(n)', 'print(0 in seen)');
if (pyOut(cNever) !== 'False') throw new Error('never-ending loop check failed');
Q('m_never_ends', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Manish writes this pseudocode to count a stock of 10 pencils down to nothing, 3 at a time. What is wrong with it?\n\n${P('SET n = 10', 'WHILE n is not 0', '    SET n = n - 3', 'END WHILE', 'OUTPUT n')}`,
  opts: ['n goes 7, 4, 1, -2, ... and never equals 0, so the loop never ends', 'The loop body runs only once', 'The output statement should be inside the loop', 'n must be set to 0 before the loop'],
  sol: 'The test is "n is not 0", but subtracting 3 from 10 jumps over 0 (10, 7, 4, 1, -2, -5, ...). The condition stays true for ever, so the algorithm violates finiteness. Testing n > 0 would fix it.',
}));
const cSwapOk = code('a = 14', 'b = 9', 't = a', 'a = b', 'b = t', 'print(a, b)');
const cSwapBad = code('a = 14', 'b = 9', 'a = b', 'b = a', 'print(a, b)');
Q('m_swap', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Two jars hold 14 and 9 marbles. The pseudocode below uses a helper value t to exchange the contents. What does it output?\n\n${P('SET a = 14', 'SET b = 9', 'SET t = a', 'SET a = b', 'SET b = t', 'OUTPUT a, b')}`,
  opts: distinct([outIc(cSwapOk), outIc(cSwapBad), ic('14 9'), ic('14 14')]),
  sol: 't remembers the old a (14) before a is overwritten by 9, and then b receives 14, so the jars are exchanged. Without t, the two assignments a = b and b = a would leave both jars holding 9.',
}));

// ---- assertion-reason
Q('ar_finite', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'An algorithm must terminate after a finite number of steps.',
  r: 'A procedure that never ends cannot deliver the required output to the user.',
  sol: 'Both are true and R explains A: if the steps could go on for ever, no answer would ever be produced, so finiteness is a basic requirement.',
}));
Q('ar_dry', ar({
  t: 1, d: 2, c: 'understanding', key: 'b',
  a: 'A dry run helps to find logical errors in an algorithm before it is coded.',
  r: 'In a flowchart, a decision is drawn as a diamond with two exits.',
  sol: 'Both statements are true, but R is about flowchart symbols and does not explain why a dry run finds errors: tracing the values by hand exposes wrong steps.',
}));
Q('ar_decomp', ar({
  t: 1, d: 2, c: 'understanding', key: 'c',
  a: 'Dividing a large problem into smaller sub-problems is called decomposition.',
  r: 'Decomposition makes a problem harder because every sub-problem has to be solved from the beginning together with all the others.',
  sol: 'A is true. R is false: decomposition makes a big problem easier because each small part can be understood, solved and tested on its own.',
}));
Q('ar_loopflow', ar({
  t: 1, d: 2, c: 'understanding', key: 'd',
  a: 'A flowchart can show only sequence and selection, never repetition.',
  r: 'A flow line that goes back to an earlier box makes the steps repeat.',
  sol: 'A is false: repetition is shown by a flow line returning to an earlier box. R is true and describes exactly how a loop is drawn.',
}));
const gcdAB = JSON.parse(pyOut(gcdSrc(36, 24)));
Q('ar_gcd', ar({
  t: 1, d: 3, c: 'application', key: 'a',
  a: `Euclid's method outputs ${gcdAB.gcd} when it is run on 36 and 24.`,
  r: 'The method replaces (a, b) by (b, remainder of a divided by b) until b is 0, and the last non-zero value of a is the highest common factor.',
  sol: `Both are true and R explains A. 36 and 24 give remainder ${gcdAB.rows[0][3]}, so (24, 12); then remainder ${gcdAB.rows[1][3]}, so (12, 0); the loop stops with a = ${gcdAB.gcd}.`,
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_one_decision', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Every flowchart must contain exactly one decision (diamond) symbol.',
  sol: 'A flowchart may have no decision at all (a pure sequence) or several. Only the start and end terminators are compulsory.',
}));
Q('tf_pseudo_versions', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Two students can write different pseudocode for the same problem and both be correct.',
  sol: 'Pseudocode has no fixed syntax, and a problem usually has many correct algorithms. What matters is that every step is clear and the result is right.',
}));
Q('tf_testing_once', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? If an algorithm gives the right answer for one sample input, it is proved correct for all inputs.',
  sol: 'One passing case proves nothing about the others. An algorithm must be tested with several inputs, including boundary and unusual ones.',
}));
const lin40 = Number(rowsOf(searchSrc([...Array(40).keys()], 0))[0]);
Q('tf_linear_always', tf({
  t: 1, d: 3, c: 'analysis', ans: false,
  stem: 'True or false? Linear search through a list of 40 names always makes 40 comparisons.',
  sol: `It stops at the first match: if the wanted name is first, only ${lin40} comparison is needed. It makes 40 comparisons only in the worst case, when the name is last or absent.`,
}));
Q('fb_analyse', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The first step of problem solving is ___ the problem.',
  acc: [['analysing', 'analyzing', 'understanding']],
  sol: 'Analysing the problem means finding what is given, what is required and what rules apply, before any algorithm is written.',
}));
Q('fb_debug', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Finding and removing the errors that testing has revealed is called ___.',
  acc: [['debugging']],
  sol: 'Debugging is the last stage of the cycle: locate the cause of a wrong result, correct it and test again.',
}));
Q('fb_dry', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'Tracing an algorithm by hand, with sample values written in a table, is called a ___ run.',
  acc: [['dry']],
  sol: 'A dry run (trace) follows each step on paper without a computer and records how the variables change.',
}));
Q('fb_symbols', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'In a flowchart, Start and End are drawn in an ___ and input or output is drawn in a ___.',
  acc: [['oval', 'terminator', 'rounded rectangle'], ['parallelogram']],
  sol: 'The terminator is an oval; input and output use a parallelogram.',
}));
Q('mt_symbols', match({
  t: 1, d: 1, c: 'understanding',
  stem: 'Match each flowchart symbol, as used in a bus-ticket billing flowchart, with its purpose.',
  pairs: [
    ['Oval', 'Start or end of the algorithm'],
    ['Parallelogram', 'Reading a value or showing a result'],
    ['Rectangle', 'A calculation or assignment'],
    ['Diamond', 'A yes/no decision'],
  ],
  sol: 'The oval is the terminator, the parallelogram handles input and output, the rectangle is a process and the diamond is a decision.',
}));
Q('mt_terms', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each term used while a team builds a quiz-scoring program with its meaning.',
  pairs: [
    ['Algorithm', 'A finite, ordered list of clear steps that solves a problem'],
    ['Decomposition', 'Splitting a big problem into smaller sub-problems'],
    ['Dry run', 'Following the steps by hand with sample values'],
    ['Pseudocode', 'Informal, English-like description of the steps'],
  ],
  sol: 'These are the four key terms of the chapter: algorithm, decomposition, dry run and pseudocode, each paired with its definition.',
}));
Q('ord_steps', ord({
  t: 1, d: 1, c: 'understanding', marks: 2,
  stem: 'Arrange the stages of solving a problem, such as building a marks-entry program for a class, in the order in which they are carried out.',
  items: ['Analyse the problem', 'Develop an algorithm', 'Write the code', 'Test the program', 'Debug the errors found'],
  sol: 'Analysis comes first, then the algorithm, then coding. Testing reveals errors, which are removed by debugging, and the program is tested again.',
}));
Q('ord_largest', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these steps of an algorithm that finds the tallest height in a list of student heights in the correct order.',
  items: [
    'Set big to the first height',
    'Take the next height in the list',
    'If it is greater than big, make it the new big',
    'Repeat the last two steps until the list is finished',
    'Output big',
  ],
  sol: 'big must be initialised before any comparison, each new height is compared with the current big, the repetition continues until no heights remain, and only then is big output.',
}));
Q('ord_dry', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the actions of a proper dry run of an algorithm in order.',
  items: [
    'Choose a sample input',
    'Draw a table with a column for each variable',
    'Follow the steps one by one, recording the new values',
    'Compare the final output with the expected answer',
  ],
  sol: 'The input and the table are prepared first, the steps are then followed and recorded, and the final output is checked against what was expected.',
}));

// ---- code-output items (pseudocode is traced; the executed Python twin gives the key)
Q('co_stall', co({
  pre: 'Gauri keeps a running total of the cups of lemonade her stall sells in five hours. Write the exact output of her program.',
  t: 1, d: 2, c: 'understanding', marks: 1, time: 60,
  code: code('cups = [4, 7, 3, 9, 6]', 'total = 0', 'for c in cups:', '    total = total + c', 'print(total)'),
  sol: 'The loop adds each hourly figure to total: 4, 11, 14, 23 and 29, and the final value is printed once, after the loop.',
}));
const cCount = code('tokens = 20', 'served = 0', 'while tokens > 0:', '    tokens = tokens - 6', '    served = served + 1', '    print(served, tokens)');
Q('co_countdown', co({
  pre: 'Kabir\'s clinic hands out tokens with the pseudocode below. Write exactly what it outputs.',
  lang: 'text',
  t: 1, d: 3, c: 'analysis', marks: 2,
  code: P('SET tokens = 20', 'SET served = 0', 'WHILE tokens > 0', '    SET tokens = tokens - 6', '    SET served = served + 1', '    OUTPUT served, tokens', 'END WHILE').replace(/^```text\n|\n```$/g, ''),
  output: pyOut(cCount),
  sol: 'Each pass subtracts 6 and counts one patient served. The test is checked only before a pass, so the pass that starts with 2 tokens still runs and takes tokens below zero.',
}));
const cHalf = code('amount = 100', 'count = 0', 'while amount > 1:', '    amount = amount / 2', '    count = count + 1', 'print(count, amount)');
Q('co_halving', co({
  pre: 'Leela keeps halving a 100 gram block of clay until what is left is 1 gram or less. Trace the pseudocode and write its output.',
  lang: 'text',
  t: 1, d: 3, c: 'application', marks: 2,
  code: P('SET amount = 100', 'SET count = 0', 'WHILE amount > 1', '    SET amount = amount / 2', '    SET count = count + 1', 'END WHILE', 'OUTPUT count, amount').replace(/^```text\n|\n```$/g, ''),
  output: pyOut(cHalf),
  sol: 'amount takes the values 50, 25, 12.5, 6.25, 3.125, 1.5625 and 0.78125. The loop stops when amount is no longer above 1, after 7 halvings.',
}));
const cLeap = code('for y in [1900, 2000, 2024, 2100]:', '    if y % 400 == 0 or (y % 4 == 0 and y % 100 != 0):', '        print(y, "leap")', '    else:', '        print(y, "not leap")');
Q('co_leap', co({
  pre: 'The heritage society of Mehsana checks four years with this pseudocode. Write the output line by line.',
  lang: 'text',
  t: 1, d: 3, c: 'application', marks: 2,
  code: P('FOR each year y in 1900, 2000, 2024, 2100', '    IF y is divisible by 400 OR (y is divisible by 4 AND y is not divisible by 100) THEN', '        OUTPUT y, "leap"', '    ELSE', '        OUTPUT y, "not leap"', '    END IF', 'END FOR').replace(/^```text\n|\n```$/g, ''),
  output: pyOut(cLeap),
  sol: 'A century year is a leap year only when divisible by 400, so 2000 qualifies but 1900 and 2100 do not; 2024 is divisible by 4 and not by 100.',
}));
const cRot = code('a = 3', 'b = 8', 'c = 5', 't = a', 'a = b', 'b = c', 'c = t', 'print(a, b, c)');
Q('co_rotate', co({
  pre: 'Three cups at a tea stall hold 3, 8 and 5 spoons of sugar. Dry run the pseudocode that moves the sugar around and write its output.',
  lang: 'text',
  t: 1, d: 3, c: 'application', marks: 2,
  code: P('SET a = 3', 'SET b = 8', 'SET c = 5', 'SET t = a', 'SET a = b', 'SET b = c', 'SET c = t', 'OUTPUT a, b, c').replace(/^```text\n|\n```$/g, ''),
  output: pyOut(cRot),
  sol: 't keeps 3. Then a takes 8, b takes 5 and c takes the saved 3, so the three values rotate one place to the left.',
}));
Q('co_python_max', co({
  pre: 'Tanvi tracks the daily temperature of her town for five days. Write the exact output of her program.',
  t: 1, d: 2, c: 'understanding', marks: 1, time: 60,
  code: code('temps = [31, 35, 33, 38, 36]', 'hottest = temps[0]', 'for t in temps:', '    if t > hottest:', '        hottest = t', 'print(hottest)'),
  sol: 'hottest starts at 31 and is replaced whenever a bigger reading is found (35, then 38). The last reading, 36, is not bigger than 38.',
}));
Q('co_search_count', co({
  pre: 'Naveen\'s roll-call checker looks for the roll number 22 in a list and counts the comparisons it makes. What does it print?',
  t: 1, d: 3, c: 'analysis', marks: 2,
  code: code('roll = [14, 9, 31, 22, 5, 40]', 'target = 22', 'count = 0', 'found = -1', 'for i in range(len(roll)):', '    count = count + 1', '    if roll[i] == target:', '        found = i', '        break', 'print(found, count)'),
  sol: 'Positions are counted from 0, so 22 is at index 3. Four comparisons (with 14, 9, 31 and 22) are made before break stops the search; the last two items are never compared.',
}));
const cFact = code('n = 6', 'product = 1', 'for k in range(1, n + 1):', '    product = product * k', '    print(k, product)');
Q('co_factorial', co({
  pre: 'Imran counts the ways of seating 6 guests in a row with the pseudocode below. Write its output.',
  lang: 'text',
  t: 1, d: 2, c: 'understanding', marks: 2,
  code: P('SET n = 6', 'SET product = 1', 'FOR k FROM 1 TO n', '    SET product = product * k', '    OUTPUT k, product', 'END FOR').replace(/^```text\n|\n```$/g, ''),
  output: pyOut(cFact),
  sol: 'product is multiplied by 1, 2, 3, 4, 5 and 6 in turn, and a line is printed after every multiplication.',
}));
const cGrade = code('for m in [88, 59, 72, 45, 44]:', '    if m >= 80:', '        print("Distinction")', '    elif m >= 60:', '        print("First")', '    elif m >= 45:', '        print("Second")', '    else:', '        print("Needs support")');
Q('co_grade', co({
  pre: 'A coaching centre grades five test marks with this pseudocode. Write the five lines it outputs.',
  lang: 'text',
  t: 1, d: 3, c: 'application', marks: 2,
  code: P('FOR each mark m in 88, 59, 72, 45, 44', '    IF m >= 80 THEN OUTPUT "Distinction"', '    ELSE IF m >= 60 THEN OUTPUT "First"', '    ELSE IF m >= 45 THEN OUTPUT "Second"', '    ELSE OUTPUT "Needs support"', '    END IF', 'END FOR').replace(/^```text\n|\n```$/g, ''),
  output: pyOut(cGrade),
  sol: 'Each mark takes the first branch whose test is true: 88 is a Distinction, 59 fails the First test and lands in Second, 72 is First, 45 is exactly on the Second boundary and 44 falls through to the else.',
}));
const cWeeks = code('n = 45', 'w = 0', 'while n >= 7:', '    n = n - 7', '    w = w + 1', 'print(w, n)');
Q('co_flowchart', co({
  pre: 'A flowchart for Sunita\'s holiday counter has these boxes. Box 1: Start. Box 2: Read n (45 is entered). Box 3: w = 0. Box 4 (decision): Is n >= 7? Yes goes to box 5, No goes to box 8. Box 5: n = n - 7. Box 6: w = w + 1. Box 7: go back to box 4. Box 8: Print w and n. Box 9: Stop. What does the flowchart print for the input 45?',
  lang: 'text',
  t: 1, d: 3, c: 'application', marks: 2,
  code: 'Start -> Read n -> w = 0 -> (n >= 7 ?) -> yes: n = n - 7, w = w + 1, back to the test -> no: Print w, n -> Stop',
  output: pyOut(cWeeks),
  sol: 'The loop removes 7 days at a time: n goes 38, 31, 24, 17, 10, 3 while w counts up to 6. Now n is below 7, so the decision sends control to the Print box.',
}));

// ---- short answers (2 marks)
Q('s2_qualities', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Ritvik says "any list of instructions is an algorithm". State any **two** characteristics that a list of instructions must have to be a good algorithm.',
  model: '1. **Definiteness:** every step is clear and has only one meaning.\n2. **Finiteness:** it ends after a limited number of steps and produces the output.\n\n(Also accepted: it takes zero or more inputs, gives at least one output, and every step is effective, that is, possible to carry out.)',
  sol: 'One mark for each correct characteristic, named and explained.',
  scheme: [['First characteristic with explanation', 1], ['Second characteristic with explanation', 1]],
}));
Q('s2_why_dry', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Before coding her timetable-planner, Sana is asked to do a dry run of the algorithm on paper. Give two reasons why this is useful.',
  model: '1. Logical mistakes such as a wrong test or a missing update show up in the trace table without needing a computer.\n2. Errors found at this stage are cheaper to correct than errors found after the program has been written, and it confirms that the algorithm is clear to someone else.',
  sol: 'One mark for each valid reason.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
const cNameErr = code('total = 0', 'for i in range(1, 5):', '    total = total + i', 'print(totl)');
const cNameFix = code('total = 0', 'for i in range(1, 5):', '    total = total + i', 'print(total)');
Q('s2_name_error', short({
  t: 1, d: 2, c: 'analysis', marks: 2,
  stem: `Arjun turned his "add the first four numbers" algorithm into Python, but the last statement stops with an error when the program runs. Find the mistake and write the corrected program.\n\n${F(cNameErr)}`,
  model: `Python reports ${ic(pyErr(cNameErr))}.\n\nThe variable that was used to collect the sum is **total**, but the last line asks for **totl**, a name that was never created.\n\n${F(cNameFix)}\n\nOutput: ${ic(pyOut(cNameFix))}`,
  sol: 'One mark for naming the misspelt variable, one for the corrected program.',
  scheme: [['Misspelt name identified', 1], ['Corrected program', 1]],
}));
Q('s2_symbols', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Name the flowchart symbol you would use for each of these three boxes of a circle-area algorithm: (i) "Read the radius r", (ii) "area = 3.14 * r * r", (iii) "Display area".',
  model: '(i) Parallelogram (input).\n\n(ii) Rectangle (process).\n\n(iii) Parallelogram (output).\n\nThe whole flowchart also begins and ends with an oval.',
  sol: 'Award a mark for each of the process and the input-output symbols named correctly; both reading and displaying use the same parallelogram.',
  scheme: [['Input and output boxes as parallelograms', 1], ['Calculation as a rectangle', 1]],
}));
Q('s2_flaw', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: 'Vanya\'s algorithm to total the weekly pocket money is: 1. Read the first amount. 2. Keep adding the next amount to the total. 3. Display the total. Name one characteristic of an algorithm that is missing and say how step 2 could be improved.',
  model: 'The algorithm lacks **finiteness**: step 2 has no condition for stopping, so it never finishes. Improve it by repeating for the 7 amounts only, or "repeat until there are no more amounts" and then go to step 3.',
  sol: 'One mark for naming the missing finiteness (or definiteness) and one for a valid stopping condition.',
  scheme: [['Missing characteristic named', 1], ['Stopping condition suggested', 1]],
}));
Q('s2_decompose', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'The Eco Club must organise an inter-house quiz. Use decomposition to break this problem into three sub-problems and mention one input and one output of the scoring sub-problem.',
  model: 'Sub-problems: (1) preparing the questions, (2) scheduling the rounds and the hall, (3) scoring and announcing the results. For scoring, an input is the points scored by each house in each round, and an output is the total score of each house and the winner.',
  sol: 'One mark for three sensible sub-problems, one for a valid input and output of scoring.',
  scheme: [['Three sub-problems', 1], ['Input and output of scoring', 1]],
}));
const cX = code('x = 5', 'x = x * 2', 'x = x + 3', 'y = x - 4', 'print(x, y)');
Q('s2_dry_small', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: `Lalit's calculator pseudocode is shown below. Do a dry run and write the final values of x and y.\n\n${P('SET x = 5', 'SET x = x * 2', 'SET x = x + 3', 'SET y = x - 4', 'OUTPUT x, y')}`,
  model: `x becomes 5, then 10, then 13; y is 13 - 4 = 9.\n\nOutput: ${ic(pyOut(cX))}`,
  sol: 'One mark for the values of x after each step, one for y and the output.',
  scheme: [['x traced through the three steps', 1], ['y and the final output', 1]],
}));
Q('s2_flow_use', short({
  t: 1, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'A 12-year-old can follow a flowchart of the library-card process at a glance, yet programmers still write pseudocode for long programs. Give one advantage of a flowchart and one limitation.',
  model: '**Advantage:** its shapes and arrows show the flow of control and the decisions visually, so it is easy to follow and explain.\n\n**Limitation:** for a long or deeply nested algorithm it becomes large and untidy, and it is harder to change than a few lines of text.',
  sol: 'One mark for a valid advantage and one for a valid limitation.',
  scheme: [['Advantage', 1], ['Limitation', 1]],
}));

// ---- short answers (3 marks)
const swapRows = rowsOf(code('a, b = 25, 40', 'rows = [["start", a, b]]', 'a = b', 'rows.append(["a = b", a, b])', 'b = a', 'rows.append(["b = a", a, b])', 'import json', 'print(json.dumps(rows))'));
Q('s3_swap_bug', short({
  t: 1, d: 3, c: 'analysis', marks: 3,
  stem: `Dev wants to exchange the amounts in his two wallets (25 and 40 rupees) with the pseudocode below, but the amounts do not get exchanged. Dry run it, say what goes wrong and rewrite it correctly.\n\n${P('SET a = 25', 'SET b = 40', 'SET a = b', 'SET b = a', 'OUTPUT a, b')}`,
  model: `Dry run:\n\n${mdTable(['Step', 'a', 'b'], swapRows)}\n\nThe old value of a is lost when a = b is carried out, so both wallets end with ${swapRows[2][2]}. Use a helper:\n\n${P('SET t = a', 'SET a = b', 'SET b = t')}\n\nNow a = ${pyOut(code('a, b = 25, 40', 't = a', 'a = b', 'b = t', 'print(a)'))} and b = ${pyOut(code('a, b = 25, 40', 't = a', 'a = b', 'b = t', 'print(b)'))}.`,
  sol: 'One mark for the trace, one for the diagnosis (the first value is overwritten) and one for the helper variable fix.',
  scheme: [['Correct dry run', 1], ['Reason: value overwritten', 1], ['Corrected steps using a helper', 1]],
}));
const mulBug = code('count = 0', 'i = 1', 'while i < 12:', '    if i % 4 == 0:', '        count = count + 1', '    i = i + 1', 'print(count)');
const mulFix = code('count = 0', 'i = 1', 'while i <= 12:', '    if i % 4 == 0:', '        count = count + 1', '    i = i + 1', 'print(count)');
Q('s3_off_by_one', short({
  t: 1, d: 4, c: 'analysis', marks: 3,
  stem: `Geeta wants to count the multiples of 4 from 1 to 12 (they are 4, 8 and 12). Her pseudocode is shown below. Dry run it, state the output and correct the fault.\n\n${P('SET count = 0', 'SET i = 1', 'WHILE i < 12', '    IF i is a multiple of 4 THEN', '        SET count = count + 1', '    END IF', '    SET i = i + 1', 'END WHILE', 'OUTPUT count')}`,
  model: `The loop runs for i = 1 to 11 only, because 12 < 12 is false, so 12 is never examined. The multiples found are 4 and 8, and the output is ${ic(pyOut(mulBug))} instead of ${pyOut(mulFix)}.\n\nCorrection: use the test **WHILE i <= 12** (or i < 13).`,
  sol: 'One mark for the trace, one for the wrong output and one for the corrected condition.',
  scheme: [['Loop range traced (1 to 11)', 1], ['Wrong output explained', 1], ['Correct condition', 1]],
}));
const fareSrc = (age) => code(`age = ${age}`, 'if age < 5:', '    fare = 0', 'elif age <= 12:', '    fare = 20', 'elif age <= 59:', '    fare = 45', 'else:', '    fare = 25', 'print(fare)');
const ages = [4, 5, 12, 59, 60];
Q('s3_fare_table', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `A toy-train ride sets its fare from the rider's age with the pseudocode below. Draw a table of the fare for the ages 4, 5, 12, 59 and 60 and say why these are good test inputs.\n\n${P('INPUT age', 'IF age < 5 THEN', '    SET fare = 0', 'ELSE IF age <= 12 THEN', '    SET fare = 20', 'ELSE IF age <= 59 THEN', '    SET fare = 45', 'ELSE', '    SET fare = 25', 'END IF', 'OUTPUT fare')}`,
  model: `${mdTable(['Age', 'Fare (rupees)'], ages.map((a) => [a, pyOut(fareSrc(a))]))}\n\nThese ages lie on or next to the boundaries 5, 12 and 59 where the comparison operators change the branch taken, so a mistake such as < in place of <= would show up.`,
  sol: 'One mark for the first three fares, one for the last two and one for the boundary reasoning.',
  scheme: [['Fares for 4, 5 and 12', 1], ['Fares for 59 and 60', 1], ['Boundary values explained', 1]],
}));
const n100 = pyOut(code('n = 100', 'total = 0', 'for i in range(1, n + 1):', '    total = total + i', 'print(total)'));
const nBig = pyOut(code('n = 1000000', 'print(n * (n + 1) // 2)'));
Q('s3_compare_sum', short({
  t: 1, d: 5, c: 'evaluation', marks: 3,
  stem: 'Two ways to add the whole numbers from 1 to n are: (A) a loop that adds 1, 2, 3, ... n one by one, and (B) the single calculation n * (n + 1) / 2. Both give the correct total for n = 100. Compare the two algorithms and say which you would use when n is a million.',
  model: `For n = 100 both give ${n100}. Algorithm A performs n additions (a million for n = 1000000), while B performs a fixed three operations whatever n is, so B takes far less time and needs no loop. For n = 1000000 it gives ${nBig} at once. B is preferable here; A is simpler to understand and generalises to sums that have no formula.`,
  sol: 'One mark for the comparison of the number of steps, one for the correct total or checking both agree, and one for a justified choice.',
  scheme: [['Steps compared: n versus fixed', 1], ['Both agree on the answer', 1], ['B chosen with reason', 1]],
}));
Q('s3_flowchart_seq', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Leela\'s teacher asks the class to flowchart this rule: "Read the marks of a Class 7 monthly test. If the marks are 40 or more display Pass, otherwise display Fail." List the boxes of the flowchart in order and name the symbol used for each.',
  model: '1. Start: oval.\n2. Read marks: parallelogram.\n3. Is marks >= 40? Diamond, with two exits.\n4. Yes: Display "Pass": parallelogram.\n5. No: Display "Fail": parallelogram.\n6. End: oval, which both display boxes lead to.',
  sol: 'One mark for the correct terminators and input, one for the decision with both Yes and No exits, and one for both outputs joining at the end.',
  scheme: [['Oval and input parallelogram', 1], ['Diamond with Yes and No exits', 1], ['Two outputs both leading to End', 1]],
}));

// ---- long answers (5 marks)
const mxRows = rowsOf(maxSrc(47, 62, 55));
const mx2 = rowsOf(maxSrc(81, 36, 94));
Q('l_max3', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'Zoya records the heights of three plants in centimetres. Write the pseudocode of an algorithm that reads three numbers and outputs the largest. Then dry run it, with a trace table, for the heights 81, 36 and 94.',
  model: `${P('INPUT a, b, c', 'SET big = a', 'IF b > big THEN', '    SET big = b', 'END IF', 'IF c > big THEN', '    SET big = c', 'END IF', 'OUTPUT big')}\n\nDry run for 81, 36, 94:\n\n${mdTable(['Step', 'Test result', 'big'], mx2)}\n\nOutput: ${mx2[2][2]}. Each new value is compared with the largest seen so far, so only two comparisons are needed.`,
  sol: 'Marks: input, initialising big, two correct decisions, trace table and the final output.',
  scheme: [['Input and big initialised with a', 1], ['Two decisions comparing with big', 1], ['Output after the decisions', 1], ['Trace table with all rows', 1], ['Final output correct', 1]],
}));
const mulRows = rowsOf(code('n = 4', 'total = 0', 'k = 1', 'rows = []', 'while k <= n:', '    total = total + 3 * k', '    rows.append([k, total])', '    k = k + 1', 'import json', 'print(json.dumps(rows))'));
Q('l_flow_multiples', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'Gopal wants the total of the first n multiples of 3 (3, 6, 9, ...). List, box by box, a flowchart for this algorithm, naming the symbol of each box and showing where the loop returns. Then dry run it for n = 4.',
  model: `1. Start (oval).\n2. Read n (parallelogram).\n3. total = 0 and k = 1 (rectangle).\n4. Is k <= n? (diamond). Yes goes to box 5, No goes to box 7.\n5. total = total + 3 * k (rectangle).\n6. k = k + 1 (rectangle); the flow line returns to box 4.\n7. Display total (parallelogram).\n8. End (oval).\n\nDry run for n = 4:\n\n${mdTable(['k', 'total after the pass'], mulRows)}\n\nThe loop stops when k becomes 5, and the displayed total is ${mulRows[3][1]}.`,
  sol: 'Marks: correct symbols, initialisation, decision with both exits, return line, and a correct dry run.',
  scheme: [['Start, input and initialisation boxes', 1], ['Diamond with Yes and No exits', 1], ['Body boxes and return line to the decision', 1], ['Output and end', 1], ['Trace table and total', 1]],
}));
const g2 = JSON.parse(pyOut(gcdSrc(126, 84)));
Q('l_gcd', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'Farida needs the largest tile size that exactly fits a 126 cm by 84 cm floor. Write pseudocode that uses Euclid\'s method to find the highest common factor of two numbers, and dry run it for 126 and 84 with a trace table.',
  model: `${P('INPUT a, b', 'WHILE b is not 0', '    SET r = remainder of a divided by b', '    SET a = b', '    SET b = r', 'END WHILE', 'OUTPUT a')}\n\nDry run for 126 and 84:\n\n${mdTable(['Pass', 'a', 'b', 'r'], g2.rows)}\n\nWhen b becomes 0 the loop stops, and the output is ${g2.gcd}, so tiles of ${g2.gcd} cm fit exactly.`,
  sol: 'Marks: input, loop condition, remainder step with reassignment, trace table, and the final answer.',
  scheme: [['Input and loop condition', 1], ['Remainder calculated', 1], ['Reassignment of a and b', 1], ['Trace table', 1], ['Final output and meaning', 1]],
}));
const slab = (u) => code(`units = ${u}`, 'if units <= 50:', '    bill = 40 + units * 3', 'elif units <= 150:', '    bill = 40 + 50 * 3 + (units - 50) * 5', 'else:', '    bill = 40 + 50 * 3 + 100 * 5 + (units - 150) * 8', 'print(bill)');
const slabUnits = [30, 120, 200];
Q('l_slab', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'A village society charges for water as follows: a fixed charge of 40 rupees, plus 3 rupees per unit for the first 50 units, 5 rupees per unit for the next 100 units, and 8 rupees per unit above 150 units. Write the pseudocode to read the units used and output the bill, and show the bill for 30, 120 and 200 units.',
  model: `${P('INPUT units', 'IF units <= 50 THEN', '    SET bill = 40 + units * 3', 'ELSE IF units <= 150 THEN', '    SET bill = 40 + 50 * 3 + (units - 50) * 5', 'ELSE', '    SET bill = 40 + 50 * 3 + 100 * 5 + (units - 150) * 8', 'END IF', 'OUTPUT bill')}\n\n${mdTable(['Units', 'Bill (rupees)'], slabUnits.map((u) => [u, pyOut(slab(u))]))}`,
  sol: 'Marks: input, three correct branches, charges for the earlier slabs carried into the later ones, and correct bills.',
  scheme: [['Input and selection structure', 1], ['First slab correct', 1], ['Second slab with the earlier charge added', 1], ['Third slab', 1], ['Three correct bills', 1]],
}));
const primeAll = (n) => code(`n = ${n}`, 'count = 0', 'prime = n > 1', 'for d in range(2, n):', '    count += 1', '    if n % d == 0:', '        prime = False', '        break', 'print(count, prime)');
const primeRoot = (n) => code(`n = ${n}`, 'count = 0', 'prime = n > 1', 'd = 2', 'while d * d <= n:', '    count += 1', '    if n % d == 0:', '        prime = False', '        break', '    d += 1', 'print(count, prime)');
const pr = (n) => [pyOut(primeAll(n)), pyOut(primeRoot(n))];
Q('l_prime_compare', long({
  t: 1, d: 5, c: 'evaluation', marks: 5,
  stem: 'Bimal has two correct algorithms to test whether a number n is prime. Algorithm A divides n by every number from 2 to n - 1. Algorithm B divides only by 2, 3, 4, ... while the divisor times itself is not more than n, and both stop at the first divisor that divides n exactly. Count the divisions each makes for n = 97 and for n = 91, then say which algorithm is better and why.',
  model: `Counts (divisions made, then whether n is prime):\n\n${mdTable(['n', 'Algorithm A', 'Algorithm B'], [97, 91].map((n) => [n, pr(n)[0], pr(n)[1]]))}\n\nThe row for 97, a prime, shows how many divisions each algorithm needs before it can say "prime"; for 91 = 7 x 13 both stop at the first divisor, 7, after the same number of divisions. B is better: any factor larger than the square root pairs with a smaller one that B has already tried, so it needs about the square root of n divisions instead of n. Both are correct; the difference is efficiency.`,
  sol: 'Marks: counts for each algorithm (two marks), the observation that A and B agree on the answer, a reason based on the square root and a clear conclusion on efficiency.',
  scheme: [['Counts of A for both numbers', 1], ['Counts of B for both numbers', 1], ['Both give the same correct decision', 1], ['Reason (factor pairs / square root)', 1], ['Conclusion: B more efficient', 1]],
}));
Q('l_decompose', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: [80, 140],
  stem: 'The Sunrise School annual day needs a "Programme Management System" that registers items, assigns time slots, issues invitations and prints the final programme. Show how decomposition would be applied: list four sub-problems, give the input and output of each, say how they join up, and write the steps of the algorithm for one sub-problem.',
  model: '**Sub-problems (input, output):**\n1. Register items: names of performers and items entered by teachers, giving the list of items.\n2. Assign time slots: the item list with durations, giving a start time for each item.\n3. Issue invitations: the guest list, giving a printed invitation for each guest.\n4. Print the programme: the items with slots, giving the final programme sheet.\n\n**Joining up:** the output of one module is the input of the next (the list of items goes to the slot assignment, and the slots go to the programme sheet); the modules can be built and tested by different students.\n\n**Algorithm for sub-problem 2:** 1. Set the time to 4.00 pm. 2. For each item in the list, give it the current time as its start and add its duration to the time. 3. Stop when all items have a slot and output the slots.',
  sol: 'Marks: four sub-problems, their inputs and outputs, a statement of how outputs feed other modules, and a clear algorithm for one module.',
  scheme: [['Four sensible sub-problems', 1], ['Inputs and outputs stated', 1], ['How the modules join', 1], ['Algorithm with a repeated step', 1], ['Algorithm ends with an output', 1]],
}));

// ================================================================ case-based
const fineSrc = (d) => code(`late_days = ${d}`, 'fine = 0', 'if late_days > 0:', '    if late_days <= 5:', '        fine = late_days * 2', '    else:', '        fine = 5 * 2 + (late_days - 5) * 5', 'print(fine)');
const fineNew = (d) => code(`late_days = ${d}`, 'fine = 0', 'if late_days > 0:', '    if late_days <= 7:', '        fine = late_days * 2', '    else:', '        fine = 7 * 2 + (late_days - 7) * 5', 'print(fine)');
Q('cb_fine', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the library fine rule of Greenmeadow School and answer the questions. *(Imagined school and fine rates, written by SOYL for practice.)*',
  passage: `The librarian of Greenmeadow School charges a fine for late books. The first five late days cost 2 rupees a day and every further day costs 5 rupees. Anika writes the algorithm below to calculate the fine.\n\n${P('INPUT late_days', 'SET fine = 0', 'IF late_days > 0 THEN', '    IF late_days <= 5 THEN', '        SET fine = late_days * 2', '    ELSE', '        SET fine = 5 * 2 + (late_days - 5) * 5', '    END IF', 'END IF', 'OUTPUT fine')}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'a', stem: 'What does the algorithm output when late_days is 9?', opts: [ic(pyOut(fineSrc(9))), ic('18'), ic('45'), ic('25')], sol: 'The first 5 days cost 5 x 2 = 10 rupees and the other 4 days cost 4 x 5 = 20 rupees, so the fine is 30. Charging all 9 days at 2 rupees would give 18.' })),
    child('b', fb({ t: 1, d: 1, c: 'recall', stem: 'The control structure that lets the algorithm choose between two ways of working out the fine is called ___.', acc: [['selection', 'decision', 'conditional']], sol: 'IF ... ELSE is selection: a condition decides which block of steps is carried out.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Dry run the algorithm for 3 late days and for 12 late days and write both outputs.', model: `For 3 days the first branch gives 3 x 2 = ${pyOut(fineSrc(3))}. For 12 days the second branch gives 10 + 7 x 5 = ${pyOut(fineSrc(12))}.`, sol: 'One mark for each correct output with its branch.', scheme: [['3 days', 1], ['12 days', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): The school now charges 2 rupees a day for the first **seven** days and 5 rupees after that. Rewrite the changed lines of the algorithm and give the fine for 10 late days.', model: `Replace the 5 by 7 in the condition, in the first slab and in the subtraction:\n\n${P('IF late_days <= 7 THEN', '    SET fine = late_days * 2', 'ELSE', '    SET fine = 7 * 2 + (late_days - 7) * 5')}\n\nFor 10 days: 14 + 3 x 5 = ${pyOut(fineNew(10))} rupees.`, sol: 'One mark for the changed lines and one for the fine.', scheme: [['Changed lines', 1], ['Fine for 10 days', 1]] }),
    ]),
  ],
}));
const feeSrc = (n) => code(`n = ${n}`, 'total = n * 150', 'if n >= 6:', '    total = total - 100', 'print(total)');
Q('cb_fete', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the planning of the Lakeview School fete and answer the questions. *(Imagined school and amounts, written by SOYL for practice.)*',
  passage: 'Class 9 B of Lakeview School has to run a winter fete with food stalls, games and a cultural show. Their teacher asks them not to plan everything at once, but to split the fete into three parts: **Stalls**, **Games** and **Show**. The Stalls team then splits its own work into allotting space, collecting stall fees and checking hygiene. Each team will test its part separately before the parts are put together.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'understanding', fixed: true, key: 'b', stem: 'Splitting the fete into Stalls, Games and Show is an example of', opts: ['debugging', 'decomposition', 'a dry run', 'iteration'], sol: 'Breaking a large problem into smaller sub-problems is decomposition. Here it has been applied twice, since Stalls is split again.' })),
    child('b', tf({ t: 1, d: 2, c: 'understanding', ans: true, stem: 'True or false? Because the fete is divided into parts, the Games team can work out its part without waiting for the Show team.', sol: 'Independent sub-problems can be solved separately and in parallel, and combined at the end.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Decompose the **Show** into three sub-problems, one line each.', model: 'For example: (1) choosing and rehearsing the items, (2) arranging the stage, sound and lights, (3) preparing the order of items and the announcements.', sol: 'One mark for two sensible sub-problems and a second for the third, each different from the others and related to the show.', scheme: [['Two sub-problems', 1], ['Third sub-problem', 1]] }), [
      short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Each stall pays 150 rupees, and if 6 or more stalls take part the total fee is reduced by 100 rupees. Write the pseudocode to read the number of stalls n and output the total fee, and give the fee for 8 stalls.', model: `${P('INPUT n', 'SET total = n * 150', 'IF n >= 6 THEN', '    SET total = total - 100', 'END IF', 'OUTPUT total')}\n\nFor 8 stalls: 8 x 150 - 100 = ${pyOut(feeSrc(8))} rupees.`, sol: 'One mark for the pseudocode (input, calculation, decision) and one for the fee.', scheme: [['Pseudocode with the decision', 1], ['Fee for 8 stalls', 1]] }),
    ]),
  ],
}));
const saveSrc = (goal, add) => code('balance = 500', 'month = 0', 'rows = []', `while balance < ${goal}:`, `    balance = balance + ${add}`, '    month = month + 1', '    rows.append([month, balance])', 'import json', 'print(json.dumps(rows))');
const saveRows = rowsOf(saveSrc(800, 120));
const saveRows2 = rowsOf(saveSrc(1000, 150));
Q('cb_savings', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about Mira\'s savings plan and answer the questions. *(Imagined person and amounts, written by SOYL for practice.)*',
  passage: `Mira has 500 rupees and saves 120 rupees every month towards a bicycle that costs 800 rupees. She writes this algorithm and traces it in a table.\n\n${P('SET balance = 500', 'SET month = 0', 'WHILE balance < 800', '    SET balance = balance + 120', '    SET month = month + 1', '    OUTPUT month, balance', 'END WHILE')}\n\n${mdTable(['month', 'balance after the pass'], saveRows)}`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', fixed: true, key: 'c', stem: 'How many times does the body of the loop run?', opts: ['1', '2', String(saveRows.length), '4'], sol: 'After the third pass balance is 860, which is not below 800, so the test fails and the loop ends. The body ran 3 times.' })),
    child('b', tf({ t: 1, d: 3, c: 'analysis', ans: true, stem: 'True or false? If the statement SET balance = balance + 120 were left out, the loop would never end.', sol: 'balance would stay at 500 for ever, so the test balance < 800 would always be true: the algorithm would lose finiteness.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): The bicycle now costs 1000 rupees and Mira saves 150 rupees a month. How many months does the algorithm take, and what is the final balance?', model: `The table of passes ends at month ${saveRows2.length} with balance ${saveRows2[saveRows2.length - 1][1]}, so it takes ${saveRows2.length} months and the balance is ${saveRows2[saveRows2.length - 1][1]} rupees.`, sol: 'One mark for the number of months and one for the final balance.', scheme: [['Months', 1], ['Final balance', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): List the boxes of the flowchart of Mira\'s algorithm and say which box the loop line returns to.', model: '1. Start (oval). 2. balance = 500 and month = 0 (rectangle). 3. Is balance < 800? (diamond). Yes: 4. balance = balance + 120 (rectangle), 5. month = month + 1 (rectangle), 6. Display month and balance (parallelogram), and the flow line goes back to box 3. No: 7. End (oval).', sol: 'One mark for the boxes and symbols and one for the return line to the decision.', scheme: [['Boxes with correct symbols', 1], ['Return line to the decision', 1]] }),
    ]),
  ],
}));
