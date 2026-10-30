// Build CBSE 12 Computer Science ch02 Functions. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-12-computer-science-ch02/src/build.mjs
// Every program output shown in decks, notes and flashcards is produced by pyOut() (Python 3), never typed.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache, pyOut, pyErr } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-12-computer-science-ch02', 'computer-science');
usePyCache(SRC);
const { F, code, ic } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
/** Rows printed by a Python program as one JSON list. */
const rowsOf = (c) => JSON.parse(pyOut(c));
const expect = (actual, expected, what) => {
  if (actual !== expected) throw new Error(`${what}: Python printed ${JSON.stringify(actual)}, the narration assumes ${JSON.stringify(expected)}`);
  return actual;
};

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Why functions', 'Built-in functions', 'Module functions', 'Defining a function', 'Calling and returning', 'Return versus print'], 'Route map of Part 1: why functions are used, built-in functions, functions from modules, defining a function, calling and returning, and return versus print', 'Part 1 at a glance');
const vWhy = table(
  ['Benefit', 'What it means'],
  [
    ['Reuse', 'Write the code once, call it many times'],
    ['Modularity', 'Split a big program into small, named parts'],
    ['Readability', 'A good name such as `gst()` explains the code'],
    ['Easier testing', 'Check each function on its own'],
    ['Less repetition', 'A change is made in one place only'],
  ],
  'Table of the benefits of functions: reuse, modularity, readability, easier testing and less repetition',
);
const vTypes = table(
  ['Type', 'Where it comes from', 'Examples'],
  [
    ['Built-in', 'Always available', '`len()`, `print()`, `max()`, `round()`, `type()`'],
    ['From a module', 'Needs `import` first', '`math.sqrt()`, `random.randint()`, `statistics.mean()`'],
    ['User-defined', 'Written by you with `def`', '`def area(l, w): ...`'],
  ],
  'Table of the three types of functions: built-in functions such as len and print, functions from modules such as math sqrt, random randint and statistics mean, and user-defined functions written with def',
);
const modCalls = [
  ['math', 'math.sqrt(81)'], ['math', 'math.ceil(6.1)'], ['math', 'math.floor(-6.1)'], ['math', 'math.pow(2, 3)'], ['math', 'math.fabs(-4)'],
  ['statistics', 'statistics.mean([4, 8, 9])'], ['statistics', 'statistics.median([7, 1, 5, 3])'], ['statistics', 'statistics.mode([2, 5, 2, 9])'],
];
const vModules = table(
  ['Call', 'Result'],
  modCalls.map(([m, c]) => [ic(c), ic(pyOut(`import ${m}\nprint(${c})`))]),
  'Table of math and statistics functions, each run in Python: square root of 81, ceil of 6.1, floor of minus 6.1, pow of 2 and 3, fabs of minus 4, mean of 4, 8 and 9, median of 7, 1, 5 and 3, and mode of 2, 5, 2 and 9',
  'math.sqrt(), math.pow() and math.fabs() always return a float.',
);
const vRandom = table(
  ['Call', 'Can return'],
  [
    [ic('random.random()'), 'a float from 0.0 up to (not including) 1.0'],
    [ic('random.randint(1, 6)'), 'an integer from 1 to 6 (both included)'],
    [ic('random.randrange(0, 20, 5)'), `one of ${ic(pyOut('print(list(range(0, 20, 5)))'))} (stop excluded)`],
  ],
  'Table of random module functions: random gives a float from zero up to one, randint 1, 6 gives an integer from one to six including both, randrange 0, 20, 5 gives one of 0, 5, 10 or 15',
  'Outputs change on every run, so exam questions ask for the possible values.',
);
const vAnatomy = (() => {
  const s = new Svg(600, 250);
  const lines = ['def gst(amount, rate=18):', '    tax = amount * rate / 100', '    return tax', '', 'bill = gst(500)'];
  lines.forEach((t, i) => s.text(40, 40 + i * 30, t, { anchor: 'start', size: 15 }));
  s.rect(30, 22, 250, 34, { color: 'accent', sw: 1.6, rx: 4 });
  s.text(300, 39, 'header: def, name, parameters, colon', { anchor: 'start', size: 13, color: 'accent' });
  s.rect(30, 58, 270, 64, { color: 'muted', sw: 1.4, rx: 4, dash: true });
  s.text(320, 90, 'body: indented block', { anchor: 'start', size: 13, muted: true });
  s.text(320, 112, 'return sends a value back', { anchor: 'start', size: 13, muted: true });
  s.rect(30, 142, 180, 34, { color: 'accent', sw: 1.6, rx: 4 });
  s.text(230, 159, 'call with an argument; the result is stored in bill', { anchor: 'start', size: 13, color: 'accent' });
  s.text(40, 215, `bill becomes ${pyOut('def gst(amount, rate=18):\n    tax = amount * rate / 100\n    return tax\nbill = gst(500)\nprint(bill)')}`, { anchor: 'start', size: 14, bold: true });
  return s.visual('Labelled diagram of a function: the header line def gst with parameters amount and rate equals 18 and a colon; the indented body that computes tax and returns it; and a call gst of 500 whose result is stored in bill, which becomes 90.0', 'The parts of a function definition and a call.');
})();
const cCallFlow = code('def gst(amount, rate=18):', '    return amount * rate / 100', '', 'print("before")', 'tax = gst(500)', 'print("after", tax)');
const vCallFlow = flow(
  'TB',
  ['Python reads def and stores the function (body not run yet)', 'Main program runs from the top', 'Call gst(500): jump into the body, amount receives 500', 'return sends 90.0 back to the call', 'Main program continues on the next line'],
  'Flow of a function call: def only stores the function; the main program runs from the top; a call jumps into the body with the argument; return sends the value back; the main program continues',
  `Output of the program: ${pyOut(cCallFlow).split('\n').join(' then ')}.`,
);
const cRetVsPrint = code('def show_sq(n):', '    print(n * n)', '', 'def get_sq(n):', '    return n * n', '', 'a = show_sq(4)', 'b = get_sq(4)', 'print(a, b)');
const vRetVsPrint = table(
  ['', '`print()` inside', '`return`'],
  [
    ['What it does', 'Shows the value on screen', 'Sends the value back to the caller'],
    ['Value of the call', ic(pyOut(cRetVsPrint).split('\n')[1].split(' ')[0]), ic(pyOut(cRetVsPrint).split('\n')[1].split(' ')[1])],
    ['Can be used in an expression?', 'No', 'Yes, e.g. `get_sq(4) + 1`'],
  ],
  'Table comparing print inside a function with return: print shows the value but the call gives None; return sends 16 back so it can be used in an expression',
  `Program run: show_sq(4) prints 16 and returns None; get_sq(4) returns 16.`,
);
const cTraceArea = code(
  'import json',
  'rows = []',
  'def area(l, w):',
  '    a = l * w',
  '    rows.append(["area", l, w, a])',
  '    return a',
  'def cost(l, w, rate):',
  '    c = area(l, w) * rate',
  '    rows.append(["cost", l, w, c])',
  '    return c',
  'total = cost(12, 10, 45) + cost(4, 3, 60)',
  'rows.append(["main", "-", "-", total])',
  'print(json.dumps(rows))',
);
const vTraceArea = table(
  ['Step', 'Function returning', 'Arguments', 'Value returned'],
  rowsOf(cTraceArea).map(([f, l, w, v], i) => [String(i + 1), f === 'main' ? 'main program (total)' : `${f}()`, f === 'main' ? '—' : `${l}, ${w}`, String(v)]),
  'Trace table of a flooring cost program: area 12 by 10 returns 120, cost returns 5400, area 4 by 3 returns 12, cost returns 720, and the main program adds them to 6120',
  'Dry run produced by running the program in Python.',
);
const cFahr = code('import json', 'def to_f(c):', '    return c * 9 / 5 + 32', 'print(json.dumps([[c, to_f(c)] for c in [-10, 0, 25, 37, 100]]))');
const vFahr = table(
  ['Celsius `c`', '`to_f(c)`'],
  rowsOf(cFahr).map(([c, f]) => [String(c), String(f)]),
  'Table of to_f applied to minus 10, 0, 25, 37 and 100 degrees Celsius, run in Python: 14.0, 32.0, 77.0, 98.6 and 212.0',
  'Each value is returned by the function, not printed inside it.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Three types', 'built-in, from a module (import first), user-defined (`def`)'],
    ['Header', '`def name(parameters):` then an indented body'],
    ['Define before calling', 'a call above the `def` gives a NameError'],
    ['`return`', 'sends a value back and ends the call'],
    ['No `return`', 'the call gives `None`'],
    ['`randint(a, b)`', 'both ends included; `randrange` excludes the stop'],
  ],
  'Summary table of Part 1: the three types of functions, the header, defining before calling, return, the value None when there is no return, and randint versus randrange',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Parameters and arguments', 'Positional', 'Default', 'Keyword', 'Returning several values', 'Flow of execution', 'Local and global scope', 'Mutable and immutable arguments'], 'Route map of Part 2: parameters and arguments, positional, default and keyword arguments, returning several values, flow of execution, local and global scope, and mutable and immutable arguments', 'Part 2 at a glance');
const vParamArg = table(
  ['Term', 'Also called', 'Where', 'Example'],
  [
    ['Parameter', 'formal parameter', 'in the `def` header', '`days`, `rate` in `def fee(days, rate):`'],
    ['Argument', 'actual parameter', 'in the call', '`4`, `60` in `fee(4, 60)`'],
  ],
  'Table distinguishing parameters, the names in the def header such as days and rate, from arguments, the values in the call such as 4 and 60',
);
const argCalls = ['ticket(10)', 'ticket(30)', 'ticket(8, 200)', 'ticket(fare=90, age=5)'];
const cTicket = 'def ticket(age, fare=120):\n    if age < 12:\n        fare = fare // 2\n    return fare';
const vArgs = table(
  ['Call of `ticket(age, fare=120)`', 'Kind of passing', 'Returns'],
  argCalls.map((c, i) => [ic(c), ['positional, default fare', 'positional, default fare', 'positional, fare given', 'keyword, any order'][i], ic(pyOut(`${cTicket}\nprint(${c})`))]),
  'Table of four calls of ticket, run in Python: ticket 10 returns 60 using the default fare; ticket 30 returns 120; ticket 8, 200 returns 100; the keyword call with fare 90 and age 5 returns 45',
  'Children under 12 pay half; the default fare is 120.',
);
const vArgRules = table(
  ['Rule', 'Wrong', 'Python says'],
  [
    ['Defaults come last in the header', ic('def f(a=1, b):'), ic(pyErr('def f(a=1, b):\n    pass').split(':')[0])],
    ['Positional before keyword in a call', ic('f(a=1, 2)'), ic(pyErr('def f(a, b):\n    pass\nf(a=1, 2)').split(':')[0])],
    ['Every parameter needs a value', ic('f(1)') + ' for `def f(a, b)`', ic(pyErr('def f(a, b):\n    pass\nf(1)').split(':')[0])],
    ['No value twice', ic('f(1, a=2)'), ic(pyErr('def f(a, b):\n    pass\nf(1, a=2)').split(':')[0])],
  ],
  'Table of four argument rules with the error Python raises for each broken rule: defaults last in the header, positional arguments before keyword ones, a value for every parameter, and no parameter given twice',
);
const cMulti = code('def stats(marks):', '    return max(marks), min(marks), sum(marks) / len(marks)', '', 'r = stats([60, 90, 75])', 'hi, lo, avg = stats([60, 90, 75])', 'print(r)', 'print(hi, lo, avg)');
const vMulti = flow(
  'LR',
  ['return max, min, average', 'Python packs them into one tuple', `Store whole: r = ${pyOut(cMulti).split('\n')[0]}`, `Or unpack: hi, lo, avg = ${pyOut(cMulti).split('\n')[1].split(' ').join(', ')}`],
  'Flow of returning several values: the return statement lists three values, Python packs them into one tuple, which can be stored whole or unpacked into three names',
  'The number of names must match the number of values when unpacking.',
);
const cFlowOrder = code('def a():', '    print("2: in a")', '    b()', '    print("4: back in a")', '', 'def b():', '    print("3: in b")', '', 'print("1: start")', 'a()', 'print("5: end")');
const vFlowOrder = table(
  ['Order', 'Line printed'],
  pyOut(cFlowOrder).split('\n').map((l, i) => [String(i + 1), ic(l)]),
  'Table of the order in which lines are printed when a calls b: start, in a, in b, back in a, end',
  'def statements only create the functions; execution begins at the first line outside them.',
);
const cScope = code('rate = 18', 'def gst(amount):', '    tax = amount * rate / 100', '    return tax', 'print(gst(500))');
const vScope = (() => {
  const s = new Svg(600, 230);
  s.rect(20, 20, 560, 190, { color: 'accent', sw: 1.8, rx: 8 });
  s.text(36, 42, 'Global scope (whole program)', { anchor: 'start', size: 14, bold: true, color: 'accent' });
  s.text(36, 70, 'rate = 18', { anchor: 'start', size: 15 });
  s.text(36, 94, 'gst  →  function', { anchor: 'start', size: 15 });
  s.rect(250, 60, 310, 130, { fill: 'fill', color: 'muted', sw: 1.4, rx: 8 });
  s.text(266, 82, 'Local scope of one call: gst(500)', { anchor: 'start', size: 13, bold: true });
  s.text(266, 110, 'amount = 500', { anchor: 'start', size: 15 });
  s.text(266, 136, `tax = ${pyOut(cScope)}`, { anchor: 'start', size: 15 });
  s.text(266, 166, 'reads rate from the global scope', { anchor: 'start', size: 12, muted: true });
  s.text(36, 160, 'tax and amount do not', { anchor: 'start', size: 12, muted: true });
  s.text(36, 178, 'exist out here', { anchor: 'start', size: 12, muted: true });
  return s.visual('Diagram of scope: a large box for the global scope holding rate equal to 18 and the function gst; inside it a smaller box for the local scope of the call gst of 500, holding amount equal to 500 and tax equal to 90.0, which reads rate from the global scope; tax and amount do not exist outside the call', 'A function can read global names; its local names vanish when the call ends.');
})();
const cGlobalKw = code('count = 0', 'def visit():', '    global count', '    count += 1', 'visit()', 'visit()', 'print(count)');
const cNoGlobal = code('count = 0', 'def visit():', '    count += 1', 'visit()');
const vGlobalKw = table(
  ['Inside the function', 'Effect', 'Result'],
  [
    ['only reads `rate`', 'uses the global value', 'works'],
    ['assigns `count = 5` (no `global`)', 'creates a new **local** `count`', 'global unchanged'],
    ['`count += 1` (no `global`)', 'reads a local name before it has a value', ic(pyErr(cNoGlobal).split(':')[0])],
    ['`global count` then `count += 1`', 'changes the global variable', `two calls give ${ic(pyOut(cGlobalKw))}`],
  ],
  'Table of what happens to a global name inside a function: reading works; assigning without global creates a local; updating without global raises UnboundLocalError; with global the global value changes, so two calls give 2',
);
const cMutImm = code('def update(n, L):', '    n = n + 1', '    L.append(n)', 'num = 7', 'lst = [7]', 'update(num, lst)', 'print(num, lst)');
const vMutImm = (() => {
  const s = new Svg(600, 230);
  s.text(20, 24, 'After update(num, lst) runs:', { anchor: 'start', size: 14, bold: true });
  s.rect(20, 50, 80, 36, { fill: 'fill', color: 'accent', sw: 1.4, rx: 6 });
  s.text(60, 68, 'num', { bold: true });
  s.rect(20, 110, 80, 36, { fill: 'fill', color: 'muted', sw: 1.4, rx: 6 });
  s.text(60, 128, 'n (local)', { size: 12 });
  s.rect(200, 50, 60, 36, { color: 'accent', sw: 1.8, rx: 4 });
  s.text(230, 68, '7', { size: 16 });
  s.rect(200, 110, 60, 36, { color: 'muted', sw: 1.8, rx: 4 });
  s.text(230, 128, '8', { size: 16 });
  s.arrow(100, 68, 196, 68, { color: 'accent', sw: 1.6 });
  s.arrow(100, 128, 196, 128, { color: 'muted', sw: 1.6 });
  s.text(130, 175, 'int: n moved to a new object', { size: 12, muted: true });
  s.rect(330, 50, 80, 36, { fill: 'fill', color: 'accent', sw: 1.4, rx: 6 });
  s.text(370, 68, 'lst', { bold: true });
  s.rect(330, 110, 80, 36, { fill: 'fill', color: 'muted', sw: 1.4, rx: 6 });
  s.text(370, 128, 'L (local)', { size: 12 });
  s.rect(470, 75, 100, 46, { color: 'accent', sw: 1.8, rx: 4 });
  s.text(520, 98, pyOut(cMutImm).split(' ').slice(1).join(' '), { size: 16 });
  s.arrow(410, 68, 466, 90, { color: 'accent', sw: 1.6 });
  s.arrow(410, 128, 466, 106, { color: 'accent', sw: 1.6 });
  s.text(450, 175, 'list: one object, changed in place', { size: 12, muted: true });
  s.text(300, 215, `print(num, lst) shows ${pyOut(cMutImm)}`, { size: 13 });
  return s.visual(`Diagram of passing an integer and a list: num points to 7 while the local n is moved to a new object 8; lst and the local L both point to the same list, which becomes 7, 8 after append; printing gives ${pyOut(cMutImm)}`, 'Immutable arguments are safe; mutable ones can be changed in place.');
})();
const cTraceMystery = code(
  'import json',
  'rows = []',
  'def mystery(a, b=3):',
  '    a = a + b',
  '    b = a - b',
  '    rows.append([a, b, a * b])',
  '    return a * b',
  'x = 4',
  'r1 = mystery(x)',
  'r2 = mystery(x, 1)',
  'rows.append([x, r1, r2])',
  'print(json.dumps(rows))',
);
const traceRows = rowsOf(cTraceMystery);
const vTraceMystery = table(
  ['Call', 'a after line 2', 'b after line 3', 'Returns'],
  [
    [ic('mystery(4)'), String(traceRows[0][0]), String(traceRows[0][1]), String(traceRows[0][2])],
    [ic('mystery(4, 1)'), String(traceRows[1][0]), String(traceRows[1][1]), String(traceRows[1][2])],
  ],
  `Trace table of mystery with a default b of 3: mystery 4 gives a 7, b 4 and returns 28; mystery 4, 1 gives a 5, b 4 and returns 20; x stays ${traceRows[2][0]}`,
  'Dry run produced by running the function in Python; x in the caller stays 4.',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Parameter vs argument', 'name in the header vs value in the call'],
    ['Default parameter', 'used when the argument is left out; defaults come last'],
    ['Keyword argument', 'matched by name, so order does not matter; after positional ones'],
    ['Several return values', 'packed into one tuple; unpack with matching names'],
    ['Local vs global', 'local lives only during the call; `global` is needed to assign'],
    ['Mutable argument', 'changed in place, the caller sees it; immutable ones are safe'],
  ],
  'Summary table of Part 2: parameters and arguments, default parameters, keyword arguments, several return values, local and global variables, and mutable arguments',
);

// Narration below states these Python results in words; stop if any differs.
expect(pyOut(cRetVsPrint), '16\nNone 16', 'return vs print');
expect(pyOut(`${cTicket}\nprint(ticket(10), ticket(30), ticket(8, 200), ticket(fare=90, age=5))`), '60 120 100 45', 'ticket');
expect(pyOut(cMutImm), '7 [7, 8]', 'mutable vs immutable');
expect(pyOut(cGlobalKw), '2', 'global keyword');
expect(String(rowsOf(cTraceArea)[4][3]), '6120', 'flooring total');
expect(pyOut(cScope), '90.0', 'gst');

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Functions — Part 1: Types of Functions, Defining and Calling',
  goals: [
    'Distinguish built-in functions, functions from modules and user-defined functions',
    'Use functions of the math, random and statistics modules after importing them',
    'Define and call a function, and explain the difference between return and print',
  ],
  slides: [
    sl('title', 'Functions', {
      b: 'Part 1 — what a function is, the **three types** of functions, and how to **define**, **call** and **return** from one.',
      v: vRoute1,
      n: 'Welcome to the chapter on functions. A function is a named block of code that does one job and can be used again and again. In this first part we meet the three types of functions, use some ready-made functions from modules, and then write our own functions, call them, and get values back from them.',
    }),
    sl('concept', 'Why use functions?', {
      b: 'A **function** is a named block of statements that performs one task and runs only when it is called.',
      v: vWhy,
      n: 'Why bother with functions? Imagine a billing program that works out tax in ten places. Without a function, the same lines appear ten times, and one change must be made ten times. With a function, you write the code once and call it by name. Programs become shorter, easier to read and easier to test, one function at a time.',
    }),
    sl('concept', 'Three types of functions', {
      v: vTypes,
      n: 'Python functions come in three types. Built-in functions such as len, print and max are always available. Functions from modules, such as square root in the math module, can be used only after you import the module. User-defined functions are the ones you write yourself with the def keyword. Exam questions often ask you to classify a function.',
    }),
    sl('concept', 'Functions from the math and statistics modules', {
      b: F('import math', 'import statistics', 'print(math.sqrt(81), statistics.median([7, 1, 5, 3]))'),
      v: vModules,
      n: 'To use a module, import it at the top of the program and call its functions with the module name and a dot. The math module rounds numbers up with ceil and down with floor, and its square root, power and absolute value functions give decimal answers. The statistics module finds the mean, median and mode of a list of numbers.',
    }),
    sl('check', 'Quick check: which module?', {
      b: 'Match each function with its module.',
      chk: 'mt_modules',
      n: 'Think of where each function lives. Remember that one of them needs no import at all.',
    }),
    sl('concept', 'The random module', {
      b: F('import random', 'die = random.randint(1, 6)', 'seat = random.randrange(0, 20, 5)'),
      v: vRandom,
      n: 'The random module gives different values on every run, which is useful for games and simulations. Random gives a decimal from zero up to one. Randint includes both its end values. Randrange works like range, so its stop value is never chosen. Because the output changes, exam questions ask which values are possible rather than the exact output.',
    }),
    sl('diagram', 'Anatomy of a function', {
      v: vAnatomy,
      n: 'A function definition begins with a header: the keyword def, the function name, the parameters in brackets and a colon. The body is indented below it. A return statement sends a value back to the caller and ends the call. To use the function, call it by name with arguments, and store or print the value it returns.',
    }),
    sl('two-column', 'Defining and calling', {
      cols: [
        `**Define first**\n\n${F('def square(n):', '    return n * n', '', 'print(square(6))')}\n\nOutput: ${ic(pyOut('def square(n):\n    return n * n\nprint(square(6))'))}`,
        `**Calling before the def**\n\n${F('print(square(6))', '', 'def square(n):', '    return n * n')}\n\nError: ${ic(pyErr('print(square(6))\ndef square(n):\n    return n * n'))}`,
      ],
      n: 'Python runs a program from the top, line by line. A def statement only creates the function; it does not run the body. So the function must be defined before the line that calls it. If you call it first, Python has not yet seen the name and stops with a name error.',
    }),
    sl('check', 'Quick check: calling too early', {
      b: 'What happens when this program runs?',
      chk: 'm_define_first',
      n: 'Remember that Python reads and runs the program from the top.',
    }),
    sl('diagram', 'What happens during a call', {
      b: F(cCallFlow),
      v: vCallFlow,
      n: 'Follow the flow of a call. When Python meets the def, it stores the function but does not run it. The main program starts at the first line outside the function. At the call, control jumps into the body and the parameter receives the argument. The return statement sends the value back, and the main program carries on from where it left off.',
    }),
    sl('concept', 'return versus print', {
      b: F(cRetVsPrint),
      v: vRetVsPrint,
      n: 'Students often mix up return and print. Print inside a function only shows a value on the screen; the call itself gives back nothing, which Python calls None. Return sends the value back to the caller, so it can be stored, printed or used in a calculation. A function may have several return statements, but the first one that runs ends the call.',
    }),
    sl('check', 'Quick check: two returns', {
      b: 'True or false?',
      chk: 'tf_multi_return',
      n: 'Think of a function with an if and an else, each sending back a different value.',
    }),
    sl('example', 'Worked example 1: one function calling another (dry run)', {
      b: F('def area(l, w):', '    return l * w', '', 'def cost(l, w, rate):', '    return area(l, w) * rate', '', 'total = cost(12, 10, 45) + cost(4, 3, 60)', `print(total)    # ${pyOut('def area(l, w):\n    return l * w\ndef cost(l, w, rate):\n    return area(l, w) * rate\nprint(cost(12, 10, 45) + cost(4, 3, 60))')}`),
      v: vTraceArea,
      n: 'Here a flooring shop works out the cost of two rooms. The cost function calls the area function. Follow the trace table. For the first room, area returns one hundred and twenty square feet, and cost multiplies by the rate to return five thousand four hundred. The second room costs seven hundred and twenty, and the main program adds the two to get six thousand one hundred and twenty.',
    }),
    sl('example', 'Worked example 2: writing a function that returns a value', {
      b: `**Task:** write \`to_f(c)\` to convert Celsius to Fahrenheit (F = C × 9 / 5 + 32).\n\n${F('def to_f(c):', '    return c * 9 / 5 + 32')}\n\n1. Choose a clear name and one parameter.\n2. Compute and **return** the value; do not print it inside.\n3. Call it wherever needed.`,
      v: vFahr,
      n: 'Let us write a function from a task. We need one input, the Celsius value, so the function has one parameter. The body works out the formula and returns the answer instead of printing it. That makes the function flexible: the table shows it used for five temperatures, and the same function could be used inside any other calculation.',
    }),
    sl('check', 'Quick check: a function with two returns', {
      b: 'Write the exact output.',
      chk: 'co_bonus',
      n: 'Decide which return statement runs for each call, and notice whether the answer is a whole number or a decimal.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1: functions are built-in, from a module, or user-defined. Import a module before using its functions. A header has def, a name, parameters and a colon. Define a function before calling it. Return sends a value back and ends the call, and a function with no return gives None. Randint includes both ends; randrange leaves out the stop.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Classify functions correctly: `len()` built-in, `math.sqrt()` from a module, your own with `def`.',
        'In output questions, a function without `return` gives `None`; print it as `None`.',
        '`math.sqrt()` and `math.pow()` return floats: write `7.0`, not `7`.',
        'For `random` questions, list the **possible** values; `randint(a, b)` includes b.',
        'Error-finding: look for a missing `:` after the header, a call before the `def`, and wrong indentation.',
      ],
      n: 'A few exam tips. Know the three types of functions with one example each. A function without a return statement gives None, and that word appears in the output. Square root and power from the math module give decimals. For random questions, list every possible value. In error questions, check the colon after the header and whether the function is defined before it is called.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Functions — Part 2: Arguments, Return Values, Flow of Execution and Scope',
  goals: [
    'Use positional, default and keyword arguments correctly',
    'Return several values from a function and unpack them',
    'Trace the flow of execution and tell local from global variables',
    'Predict how mutable and immutable arguments behave inside a function',
  ],
  slides: [
    sl('title', 'Arguments, scope and flow', {
      b: 'Part 2 — how values go **into** a function, how several values come **out**, and which names a function can **see**.',
      v: vRoute2,
      n: 'In Part 2 we look at how values travel into and out of a function. We cover three ways of passing arguments, returning more than one value, the order in which Python runs a program with functions, and the scope of variables. We end with a classic exam trap: what happens to lists and numbers passed to a function.',
    }),
    sl('concept', 'Parameters and arguments', {
      v: vParamArg,
      n: 'Two words are easy to confuse. Parameters, also called formal parameters, are the names written in the def header. Arguments, also called actual parameters, are the values written in the call. When the function is called, each parameter receives the value of its argument, and the body works with those names.',
    }),
    sl('concept', 'Positional, default and keyword arguments', {
      b: F(cTicket),
      v: vArgs,
      n: 'Positional arguments are matched to parameters by their position, first to first and second to second. A default parameter has a value in the header, which is used when the call leaves that argument out. Keyword arguments name the parameter in the call, so they can come in any order. The table shows all three styles with a bus ticket function.',
    }),
    sl('check', 'Quick check: a default parameter', {
      b: 'Write the exact output.',
      chk: 'co_power',
      n: 'Work out each call separately. Which ones use the default value?',
    }),
    sl('concept', 'Rules for arguments', {
      v: vArgRules,
      n: 'Python enforces four rules. In the header, parameters with default values must come after those without. In a call, positional arguments must come before keyword arguments. Every parameter without a default must get a value. And no parameter can be given a value twice. Each broken rule produces the error shown in the table, a favourite in error-finding questions.',
    }),
    sl('diagram', 'Returning several values', {
      b: F(cMulti),
      v: vMulti,
      n: 'A function can send back several values by listing them after return, separated by commas. Python packs them into a single tuple. You can store the whole tuple in one name, or unpack it straight into several names, one for each value. The number of names must match the number of values, or Python raises an error.',
    }),
    sl('check', 'Quick check: unpacking returned values', {
      b: 'Choose the correct output.',
      chk: 'm_unpack',
      n: 'Work out the two values the function returns, then see where each one goes.',
    }),
    sl('concept', 'Flow of execution', {
      b: F(cFlowOrder),
      v: vFlowOrder,
      n: 'The flow of execution is the order in which statements run. Python first reads each def and stores the function. It then starts at the first statement outside any function. Each call jumps into the function body; when the function ends, control returns to the very place it was called from. Follow the numbered lines to see the order.',
    }),
    sl('diagram', 'Local and global scope', {
      b: F(cScope),
      v: vScope,
      n: 'The scope of a name is the part of the program where it can be used. A name created at the top level of the program is global and can be read anywhere. A name created inside a function, including its parameters, is local: it exists only during that call and disappears when the call ends. Here the function reads the global rate.',
    }),
    sl('concept', 'The global keyword', {
      v: vGlobalKw,
      n: 'Reading a global name inside a function works without any declaration. Assigning to it is different: without the global keyword, Python creates a new local name instead. Updating with plus equals then fails with an unbound local error, because the local name has no value yet. Declaring the name global inside the function makes the assignment change the global variable.',
    }),
    sl('check', 'Quick check: the global keyword', {
      b: 'Fill in the blank.',
      chk: 'fb_global',
      n: 'Which keyword lets a function change a variable that belongs to the whole program?',
    }),
    sl('diagram', 'Mutable and immutable arguments', {
      b: F(cMutImm),
      v: vMutImm,
      n: 'When you pass a value, the parameter refers to the same object as the argument. With an immutable integer, any change inside the function moves the local name to a new object, so the caller sees no change. With a mutable list, append changes that very object, so the caller sees the change. Here num stays seven, while the list gains an eight.',
    }),
    sl('check', 'Quick check: an integer argument', {
      b: 'Choose the correct output.',
      chk: 'm_immutable_arg',
      n: 'Is an integer mutable? Was the returned value stored anywhere?',
    }),
    sl('example', 'Worked example 3: tracing a function with a default parameter', {
      b: F('def mystery(a, b=3):', '    a = a + b', '    b = a - b', '    return a * b', '', 'x = 4', 'print(mystery(x), mystery(x, 1), x)'),
      v: vTraceMystery,
      n: 'Let us trace a function call by call. In the first call, b takes its default of three, so a becomes seven, b becomes four, and the call returns twenty eight. In the second call, b is one, so a becomes five, b becomes four, and it returns twenty. The caller variable x is never changed, so it stays four.',
    }),
    sl('example', 'Worked example 4: answering a scope question', {
      b: `**Question:** why does this fail, and how do you fix it?\n\n${F('points = 0', 'def score(run):', '    points = points + run')}\n\n1. Name the error: ${ic(pyErr('points = 0\ndef score(run):\n    points = points + run\nscore(4)').split(':')[0])}.\n2. Reason: the assignment makes \`points\` local, and it is read before it has a value.\n3. Fix: add \`global points\` as the first line of the body (or pass and return the value).`,
      v: vGlobalKw,
      n: 'Scope questions follow a pattern. First name the error exactly. Then give the reason: because the function assigns to the name, Python treats it as local throughout the function, and reading it first fails. Finally give the fix, which is usually the global keyword. A second fix is to pass the value in and return the new value.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2: parameters are names in the header and arguments are values in the call. Defaults are used when an argument is left out and must come last. Keyword arguments can come in any order but after positional ones. Several return values become one tuple. Local names live only during a call. Mutable arguments can be changed in place.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Trace function programs with a table: one row per call, with the parameter values.',
        'A function changes a global only with `global`; otherwise assignment makes a local.',
        'Lists and dictionaries passed to a function can be changed in place; numbers and strings cannot.',
        'Returned tuples print with brackets, e.g. `(4, 9)`; unpacked values print without them.',
        'Marks: ½ or 1 for each correct output line or each error corrected; programs earn marks for the header, logic, return and output.',
      ],
      n: 'Some exam tips for this chapter. Trace every program with functions in a table, one row per call. Remember that a function changes a global variable only with the global keyword. Lists and dictionaries can be changed through a parameter; numbers and strings cannot. Print returned tuples with their brackets. Marks are usually given for each correct line of output or each corrected error.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Functions — notes',
  sections: [
    {
      h: '1. What a function is, and the three types',
      t: 1,
      b: `A **function** is a named block of statements that performs one task and runs only when called. Functions give **reuse**, **modularity** and **readability**, and make programs easier to test.\n\n- **Built-in:** always available, e.g. \`len()\`, \`print()\`, \`max()\`, \`round()\`, \`type()\`, \`int()\`.\n- **From modules:** need \`import\` first, e.g. \`math.sqrt()\`, \`random.randint()\`, \`statistics.mean()\`.\n- **User-defined:** written with \`def\`.`,
      terms: [
        ['Function', 'A named, reusable block of code that runs when it is called.'],
        ['Module', 'A file of ready-made functions and constants, used after import, e.g. math.'],
      ],
      v: vTypes,
      vs: [vWhy],
    },
    {
      h: '2. math, random and statistics',
      t: 1,
      b: `\`import math\` then call \`math.name()\`; or \`from math import sqrt\` and call \`sqrt()\` directly.\n\n- **math:** \`sqrt()\`, \`pow()\`, \`fabs()\` return floats; \`ceil()\` rounds up and \`floor()\` rounds down (towards minus infinity); \`math.pi\`.\n- **random:** \`random()\` gives 0.0 ≤ x < 1.0; \`randint(a, b)\` includes **both** a and b; \`randrange(start, stop, step)\` excludes stop.\n- **statistics:** \`mean()\`, \`median()\`, \`mode()\`.\n\n${F('import math', 'from statistics import mean', 'print(math.floor(-2.5), math.ceil(-2.5), mean([3, 4, 8]))')}\n\nOutput: ${ic(pyOut('import math\nfrom statistics import mean\nprint(math.floor(-2.5), math.ceil(-2.5), mean([3, 4, 8]))'))}`,
      terms: [
        ['import', 'The statement that makes a module available, e.g. import math.'],
        ['randint(a, b)', 'Returns a random integer from a to b, including both ends.'],
      ],
      v: vModules,
      vs: [vRandom],
    },
    {
      h: '3. Defining, calling and returning',
      t: 1,
      b: `**Header:** \`def name(parameters):\`, then an **indented body**. A function must be defined **before** it is called (else NameError). \`return\` sends a value back and ends the call; a function may have several returns, but only one runs. Without \`return\`, the call gives **None**.\n\n${F(cRetVsPrint)}\n\nOutput:\n\n${F(pyOut(cRetVsPrint))}`,
      terms: [
        ['Function header', 'The first line of a definition: def, name, parameters in brackets and a colon.'],
        ['return statement', 'Sends a value back to the caller and ends the function call.'],
        ['None', 'The value a function call gives when the function has no return statement.'],
      ],
      v: vAnatomy,
      vs: [vRetVsPrint, vTraceArea],
    },
    {
      h: '4. Arguments and parameters',
      t: 2,
      b: `**Parameters** (formal) are the names in the header; **arguments** (actual) are the values in the call.\n\n- **Positional:** matched by position.\n- **Default:** \`def f(a, b=5)\`; used when the argument is left out; defaults must come **after** non-defaults.\n- **Keyword:** \`f(b=2, a=1)\`; matched by name, any order; must come **after** positional arguments.\n\n${F('def fee(days, rate=50, late=0):', '    return days * rate + late', '', 'print(fee(3), fee(3, 60), fee(3, late=25))')}\n\nOutput: ${ic(pyOut('def fee(days, rate=50, late=0):\n    return days * rate + late\nprint(fee(3), fee(3, 60), fee(3, late=25))'))}`,
      terms: [
        ['Default parameter', 'A parameter given a value in the header, used when the call leaves it out.'],
        ['Keyword argument', 'An argument passed as name=value, matched by name rather than position.'],
      ],
      v: vArgs,
      vs: [vParamArg, vArgRules],
    },
    {
      h: '5. Returning several values; flow of execution',
      t: [2, 3],
      b: `\`return a, b, c\` returns **one tuple**; receive it whole or **unpack** it: \`x, y, z = f()\`.\n\n**Flow of execution:** def statements are read first but their bodies run only when called; execution starts at the first statement outside functions; a call jumps into the body and control returns to the point of call when the function ends.\n\n${F('def split_time(m):', '    return m // 60, m % 60', '', 't = split_time(200)', 'h, m = split_time(200)', 'print(t, h, m)')}\n\nOutput: ${ic(pyOut('def split_time(m):\n    return m // 60, m % 60\nt = split_time(200)\nh, m = split_time(200)\nprint(t, h, m)'))}`,
      terms: [
        ['Flow of execution', 'The order in which the statements of a program are run, including jumps into and out of functions.'],
        ['Unpacking', 'Assigning the items of a returned tuple to the same number of names.'],
      ],
      v: vMulti,
      vs: [vFlowOrder],
    },
    {
      h: '6. Scope; mutable and immutable arguments',
      t: 3,
      b: `- **Local:** created inside a function (parameters too); exists only during the call.\n- **Global:** created at the top level; can be **read** inside functions.\n- To **assign** to a global inside a function, write \`global name\` first; otherwise an assignment creates a local name (reading it first gives **UnboundLocalError**).\n- **Immutable** arguments (int, float, str, tuple) cannot be changed by the function; **mutable** ones (list, dict) can be changed in place and the caller sees the change. Rebinding a parameter (\`L = []\`) never affects the caller.\n\n${F(cMutImm)}\n\nOutput: ${ic(pyOut(cMutImm))}`,
      terms: [
        ['Scope', 'The part of a program in which a name can be used.'],
        ['Local variable', 'A variable created inside a function; it exists only while that call runs.'],
        ['global keyword', 'Declares that a name inside a function refers to the global variable, so assignments change it.'],
      ],
      v: vScope,
      vs: [vGlobalKw, vMutImm, vTraceMystery],
    },
  ],
  tips: '**Common mistakes**\n- Calling a function above its `def` (NameError).\n- Printing inside a function and then using the call in an expression: it gives `None`.\n- Writing defaults first: `def f(a=1, b)` is a SyntaxError.\n- Putting a keyword argument before a positional one in a call.\n- Forgetting `global` before assigning to a global (UnboundLocalError), or adding `global` when the function only reads the value.\n- Expecting an integer argument to change after the call, or a list argument to stay the same.\n\n**How marks are usually awarded**\n- Output questions: marks for each correct line, in the exact format (`None`, tuples with brackets, floats with `.0`).\n- Error-finding: ½ or 1 mark per error found and corrected.\n- Programs: marks for a correct header, correct logic, `return` used properly, the call, and the output.\n- Theory (2–3 marks): one point per mark, with a short code example where it helps.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a **function**?', 'A named block of code that performs one task and runs only when called.', 'definition', 1],
  ['Three types of functions', 'Built-in, from a module (import first), user-defined (`def`).', 'concept', 1],
  ['Name two benefits of functions', 'Reuse of code and modularity (also readability, easier testing).', 'concept', 1],
  ['Module of `median()`', '`statistics` (with `mean()` and `mode()`).', 'fact', 1],
  [ic('math.floor(-4.2)'), ic(pyOut('import math\nprint(math.floor(-4.2))')), 'example', 1],
  [ic('math.sqrt(49)'), `${ic(pyOut('import math\nprint(math.sqrt(49))'))}: sqrt() returns a float.`, 'example', 1],
  ['Values of `random.randint(1, 6)`', '1, 2, 3, 4, 5 or 6: both ends included.', 'fact', 1],
  ['Values of `random.randrange(0, 20, 5)`', `${ic(pyOut('print(list(range(0, 20, 5)))'))}: the stop is excluded.`, 'fact', 1],
  ['`import math` vs `from math import sqrt`', 'Call `math.sqrt()` in the first; `sqrt()` directly in the second.', 'concept', 1],
  ['Parts of a function header', '`def`, the name, parameters in brackets, and a colon.', 'fact', 1],
  ['Calling a function above its `def`', `${ic(pyErr('print(sq(2))\ndef sq(n):\n    return n * n').split(':')[0])}: define before calling.`, 'exam-tip', 1],
  ['What does a function without `return` give?', '`None`.', 'fact', 1],
  ['`return` vs `print()`', '`return` sends the value back to the caller; `print()` only shows it.', 'concept', 1],
  ['How many returns can a function have?', 'Several, but the first one that runs ends the call.', 'concept', 1],
  ['Parameter vs argument', 'Name in the `def` header vs value in the call.', 'definition', 2],
  ['What is a **default parameter**?', 'A parameter with a value in the header, used when the argument is left out.', 'definition', 2],
  ['Is `def f(a=1, b):` valid?', '**No**: parameters with defaults must come after those without.', 'exam-tip', 2],
  ['What is a **keyword argument**?', 'An argument passed as `name=value`, matched by name in any order.', 'definition', 2],
  ['Is `f(a=1, 2)` a valid call?', '**No**: positional arguments must come before keyword arguments.', 'exam-tip', 2],
  ['`return a, b` returns…', 'One **tuple** `(a, b)`.', 'fact', 2],
  ['`h, m = split_time(135)` where split_time returns `m // 60, m % 60`', `h = ${pyOut('print(135 // 60)')}, m = ${pyOut('print(135 % 60)')}.`, 'example', 2],
  ['What is **flow of execution**?', 'The order in which statements run, jumping into a function at a call and back after it.', 'definition', 3],
  ['Where does execution begin in a program with functions?', 'At the first statement outside any function; def only stores the function.', 'concept', 3],
  ['**Local** variable', 'Created inside a function; exists only during the call.', 'definition', 3],
  ['**Global** variable', 'Created at the top level; can be read anywhere.', 'definition', 3],
  ['When is `global` needed?', 'Only to **assign** to a global variable inside a function.', 'concept', 3],
  ['Error for `count += 1` in a function without `global`', ic(pyErr('count = 0\ndef v():\n    count += 1\nv()').split(':')[0]), 'exam-tip', 3],
  ['List passed to a function and appended to', 'The caller sees the change: lists are mutable.', 'concept', 3],
  ['Integer passed to a function and changed', 'The caller does **not** see it: integers are immutable.', 'concept', 3],
  ['Does `L = []` inside a function empty the caller\'s list?', '**No**: it only rebinds the local name to a new list.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests (cbse-12-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Functions',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_header', 'm_default', 'm_global', 'ar_args'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words (or code) and the 3-mark question in about 60 words (or code).', items: ['s_builtin_udf', 's_err_scope', 's3_min_max'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions. Show the output asked for.', items: [{ attempt: 1, keys: ['l_fahrenheit', 'l_bank'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_canteen'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Functions',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_types', 'm_math', 'm_none_return', 'm_keyword', 'm_tuple_return', 'm_flow', 'm_local', 'm_mutable_arg', 'ar_scope', 'ar_return_print'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words (or code) and 3-mark questions in about 60 words (or code).', items: ['s_args_params', 's_local_global', { attempt: 1, keys: ['s_err_def', 's_err_args'] }, 's3_trace_fn', { attempt: 1, keys: ['s3_arg_kinds', 's3_mut_imm'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18. Show the output for the input given.', items: ['l_primes', { attempt: 1, keys: ['l_emi', 'l_marksheet'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_quiz', 'cb_parking'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-computer-science-ch02 only (types of functions and defining them; arguments and parameters; flow of execution and scope)',
    originality: 'every program, scenario and data value written for this chapter by SOYL; no textbook, NCERT or board-paper program reused (D-036)',
    execution: 'every output in items, slides, notes and flashcards produced by running the code with Python 3 (runPy in lib.mjs); random-module values described as possible values, checked over seeded runs; results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
