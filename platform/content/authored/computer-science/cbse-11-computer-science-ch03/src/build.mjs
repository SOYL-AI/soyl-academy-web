// Build CBSE 11 Computer Science ch03 Python Fundamentals. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-11-computer-science-ch03/src/build.mjs
// Every output, value, type name, error line and trace table shown in decks, notes and flashcards is produced by
// running the code with runPy()/pyOut()/pyErr() (never typed by hand).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, setAuthor, deck, sl, table, flow, notes, cards, test, build, usePyCache, pyOut, pyErr, runPy } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-11-computer-science-ch03', 'computer-science');
setAuthor('claude-sonnet-5-5 (writer; reviewed by the subject-producer)');
usePyCache(SRC);
const { F, code, ic, O, ev, rowsOf, traceSrc } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');

/** Output of a program, or its error line if it fails. */
const R = (c, o) => {
  const r = runPy(c, o);
  return r.err || r.out;
};
/** Type name of an expression, e.g. tn('3 / 2') is float. */
const tn = (e) => ev(`type(${e}).__name__`);
const tbl = (headers, rows, alt, caption) => table(headers, rows.map((r) => r.map(String)), alt, caption);
const yn = (b) => (b ? 'Yes' : 'No');

// ================================================================ Part 1 visuals
const vRoute1 = flow('LR', ['Features and tokens', 'Variables and comments', 'Data types', 'Mutable and immutable', 'Operators'], 'Route map of Part 1: features and tokens, variables and comments, data types, mutable and immutable objects, and operators', 'Part 1 at a glance');

const vFeatures = tbl(
  ['Feature', 'What it means for you'],
  [
    ['Interpreted', 'Statements are translated and run one at a time, so errors show up quickly'],
    ['High-level', 'Close to English; no need to manage memory or hardware'],
    ['Dynamically typed', 'No declarations: the type belongs to the object, not to the name'],
    ['Case-sensitive', 'Total and total are two different names'],
    ['Free and portable', 'Open source, and the same program runs on many systems'],
  ],
  'Table of five features of Python: interpreted, high-level, dynamically typed, case-sensitive, and free and portable, each with what it means',
);
const vModes = tbl(
  ['', 'Interactive mode', 'Script mode'],
  [
    ['Where you type', 'At the >>> prompt', 'In a file saved with the extension .py'],
    ['How it runs', 'One statement at a time', 'The whole file from the first line to the last'],
    ['A value is shown', 'At once, even without print()', 'Only when the program prints it'],
    ['Best for', 'Trying a small idea quickly', 'Programs you want to keep and run again'],
  ],
  'Comparison table of interactive mode and script mode: where you type, how the code runs, when a value is shown, and what each is best for',
);
const vTokens = tbl(
  ['Token', 'Meaning', 'Examples'],
  [
    ['Keyword', 'Reserved word with a fixed meaning', '`while`, `True`, `import`'],
    ['Identifier', 'Name chosen by the programmer', '`total_fee`, `Roll_No`'],
    ['Literal', 'A fixed value written in the program', '`42`, `3.75`, `"Isha"`'],
    ['Operator', 'Symbol that works on values', '`+`, `//`, `==`, `and`'],
    ['Punctuator', 'Symbol that structures the code', '`( )`, `[ ]`, `:`, `,`'],
  ],
  'Table of the five kinds of tokens: keyword, identifier, literal, operator and punctuator, each with its meaning and examples',
  'The character set is the set of letters, digits and symbols that tokens are made of.',
);
const names = [['total_fee', 'Letters and underscore'], ['2nd_bus', 'Starts with a digit'], ['fee-paid', 'Hyphen is the minus operator'], ['class', 'Keyword'], ['Fee', 'Capital letters are allowed'], ['my name', 'Space not allowed']];
const nameRows = names.map(([n, why]) => [ic(n), yn(!runPy(`${n} = 1`).err), why]);
const vIdent = tbl(
  ['Name', 'Valid identifier?', 'Reason'],
  nameRows,
  `Table that tests six names as identifiers: ${nameRows.map((r) => `${r[0].replace(/`/g, '')} ${r[1]}`).join(', ')}; each tested by assigning a value to it`,
  'Validity checked by running an assignment to each name.',
);
const vLr = tbl(
  ['Statement', 'l-value', 'r-value', 'Value stored'],
  [
    ['`rate = 12`', '`rate`', '`12`', ev('12')],
    ['`fare = rate * 5`', '`fare`', '`rate * 5`', R(code('rate = 12', 'fare = rate * 5', 'print(fare)'))],
    ['`rate = rate + 3`', '`rate`', '`rate + 3`', R(code('rate = 12', 'rate = rate + 3', 'print(rate)'))],
  ],
  'Table of three assignment statements showing the l-value, the r-value and the value stored in the variable',
  'The right side is worked out first, then the result is stored in the name on the left.',
);
const trStmts = ['a = 6', 'b = a + 4', 'a = a * b', 'b = a - b', 'a, b = b, a'];
const trRows1 = rowsOf(traceSrc(trStmts, ['a', 'b']));
const vTrace1 = tbl(
  ['Statement', 'a', 'b'],
  trStmts.map((s, i) => [ic(s), ...trRows1[i]]),
  `Trace table of five assignment statements; after the last statement a is ${trRows1[4][0]} and b is ${trRows1[4][1]}`,
  'A dash means the variable does not exist yet. The last statement swaps the values.',
);
const lits = ['42', '3.75', '4 + 2j', 'True', '"Isha"', '[3, 6]', '(3, 6)', '{"pen": 5}', 'None'];
const dtypes = lits.map((l) => [ic(l), ic(tn(l)), ['list', 'dict'].includes(tn(l)) ? 'Mutable' : 'Immutable']);
const vTypes = tbl(
  ['Literal', 'Type name', 'Kind'],
  dtypes,
  `Table of nine literals with the type name Python reports and whether the type is mutable: ${dtypes.map((r) => `${r[0].replace(/`/g, '')} is ${r[1].replace(/`/g, '')}`).join(', ')}`,
  'Type names found with type(...).__name__.',
);
const mutRows = [
  ['list', '`rack = [3, 6]`', '`rack[0] = 9`', R(code('rack = [3, 6]', 'rack[0] = 9', 'print(rack)'))],
  ['dict', '`stock = {"pen": 5}`', '`stock["pen"] = 9`', R(code('stock = {"pen": 5}', 'stock["pen"] = 9', 'print(stock)'))],
  ['tuple', '`shelf = (3, 6)`', '`shelf[0] = 9`', R(code('shelf = (3, 6)', 'shelf[0] = 9'))],
  ['str', '`word = "ice"`', '`word[0] = "m"`', R(code('word = "ice"', 'word[0] = "m"'))],
];
const vMut = tbl(
  ['Type', 'Created with', 'Change tried', 'Result'],
  mutRows.map((r) => [r[0], r[1], r[2], ic(r[3])]),
  'Table that tries to change an item of a list, a dictionary, a tuple and a string; the list and dictionary change, the tuple and string raise a TypeError',
  'Results produced by running each change.',
);
const aliasStmts = ['plan = ["Maths", "Art"]', 'copy = plan', 'copy.append("Music")', 'copy = copy + ["Yoga"]'];
const aliasCode = code('rows = []', ...aliasStmts.flatMap((s) => [s, 'rows.append([str(globals().get("plan", "-")), str(globals().get("copy", "-")), "plan" in globals() and "copy" in globals() and plan is copy])']), 'import json', 'print(json.dumps(rows))');
const aliasRows = rowsOf(aliasCode);
const vAlias = tbl(
  ['After the statement', 'plan', 'copy', 'Same object?'],
  aliasStmts.map((s, i) => [ic(s), ...aliasRows[i].slice(0, 2).map((x) => `\`${x}\``), aliasRows[i][2] ? 'Yes' : 'No']),
  `Trace table of a list and a second name; after the append both names show the same three subjects, but after copy is rebuilt with plus, plan is ${aliasRows[3][0]} and copy is ${aliasRows[3][1]}`,
  'Rows produced by running the statements and testing with is.',
);
const arith = [['+', 'Addition', '17 + 5'], ['-', 'Subtraction', '17 - 5'], ['*', 'Multiplication', '17 * 5'], ['/', 'True division', '17 / 5'], ['//', 'Floor division', '17 // 5'], ['%', 'Modulus (remainder)', '17 % 5'], ['**', 'Exponentiation', '17 ** 2']];
const vArith = tbl(
  ['Operator', 'Name', 'Example', 'Value'],
  arith.map(([o, n, e]) => [`\`${o}\``, n, ic(e), ic(ev(e))]),
  `Table of the seven arithmetic operators with an example and its value: ${arith.map(([o, , e]) => `${e} is ${ev(e)}`).join(', ')}`,
);
const rel = ['7 > 5', '7 == 7.0', '7 != 5', '7 <= 5', '7 > 5 and 5 > 9', '7 > 5 or 5 > 9', 'not 7 > 5'];
const vRel = tbl(
  ['Expression', 'Value', 'Kind'],
  rel.map((e) => [ic(e), ic(ev(e)), /and|or|not/.test(e) ? 'Logical' : 'Relational']),
  `Table of relational and logical expressions with their values: ${rel.map((e) => `${e} is ${ev(e)}`).join(', ')}`,
  'Relational operators give True or False; and, or, not combine those answers.',
);
const augs = ['+=', '-=', '*=', '//=', '%=', '**='];
const vAug = tbl(
  ['Statement', 'Same as', 'n afterwards (n starts at 20)'],
  augs.map((o) => [ic(`n ${o} 3`), ic(`n = n ${o.slice(0, -1)} 3`), ic(R(code('n = 20', `n ${o} 3`, 'print(n)')))]),
  `Table of six augmented assignment operators applied to n equal to 20 with the operand 3, giving ${augs.map((o) => R(code('n = 20', `n ${o} 3`, 'print(n)'))).join(', ')}`,
  'Values produced by running each statement on n = 20.',
);
const idm = code('q = [2, 4]', 'r = [2, 4]', 's = q');
const idmExprs = ['q == r', 'q is r', 'q is s', 'q is not r', '4 in q', '5 not in q', '"ab" in "cabin"'];
const vIdMem = tbl(
  ['Expression', 'Value', 'Tests'],
  idmExprs.map((e) => [ic(e), ic(R(code(idm, `print(${e})`))), /is/.test(e) && !/ in /.test(e) ? 'Identity (same object?)' : / in /.test(e) ? 'Membership' : 'Equality (same value?)']),
  `Table of identity and membership expressions after two equal lists and a second name for the first; values: ${idmExprs.map((e) => `${e} is ${R(code(idm, `print(${e})`))}`).join(', ')}`,
  'Setup: q and r are equal lists; s is another name for q.',
);
const vSummary1 = tbl(
  ['Idea', 'Remember'],
  [
    ['Tokens', 'keyword, identifier, literal, operator, punctuator'],
    ['Identifiers', 'letters, digits, underscore; not a digit first; not a keyword; case-sensitive'],
    ['Variable', 'a name bound to an object; the type belongs to the object'],
    ['Types', 'int, float, complex, bool, str, list, tuple, dict, None'],
    ['Mutable', 'list and dict change in place; the others cannot'],
    ['Operators', 'arithmetic, relational, logical, assignment, identity, membership'],
  ],
  'Summary table of Part 1: tokens, identifiers, variables, data types, mutable types and operators',
);

// ================================================================ Part 2 visuals
const vRoute2 = flow('LR', ['Expressions and precedence', 'Type conversion', 'print and input', 'Kinds of errors', 'Debugging'], 'Route map of Part 2: expressions and precedence, type conversion, print and input, kinds of errors, and debugging', 'Part 2 at a glance');
const vExpr = tbl(
  ['Text', 'Kind', 'What happens'],
  [
    ['`7 * 3 + 2`', 'Expression', `Evaluates to ${ev('7 * 3 + 2')}`],
    ['`total = 7 * 3 + 2`', 'Statement (assignment)', `Stores ${R(code('total = 7 * 3 + 2', 'print(total)'))} in total; shows nothing`],
    ['`print(total)`', 'Statement (function call)', `Shows ${R(code('total = 7 * 3 + 2', 'print(total)'))}`],
    ['`total > 20`', 'Expression', `Evaluates to ${R(code('total = 7 * 3 + 2', 'print(total > 20)'))}`],
  ],
  'Table that tells expressions from statements: an expression produces a value, a statement carries out an action; four examples with what happens',
  'An expression produces a value; a statement is a complete instruction.',
);
const vPrec = tbl(
  ['Priority', 'Operators', 'Note'],
  [
    ['1 (highest)', '`( )`', 'Brackets always win'],
    ['2', '`**`', 'Works right to left'],
    ['3', '`+x`, `-x`', 'Unary plus and minus'],
    ['4', '`*`, `/`, `//`, `%`', 'Left to right'],
    ['5', '`+`, `-`', 'Left to right'],
    ['6', '`<`, `<=`, `>`, `>=`, `==`, `!=`, `is`, `in`', 'Relational, identity, membership'],
    ['7', '`not`', ''],
    ['8', '`and`', ''],
    ['9 (lowest)', '`or`', ''],
  ],
  'Table of operator priority from highest to lowest: brackets, exponent, unary signs, multiply divide floor-divide modulus, add subtract, comparisons, not, and, or',
);
const exSteps = [['2 ** 3', 'Exponent first'], ['3 * 8', 'Then * from the left'], ['24 // 4', 'Then //'], ['10 % 4', 'Then %'], ['8 + 6', 'Now + from the left'], ['14 - 2', 'Then -']];
const exWhole = '8 + 3 * 2 ** 3 // 4 - 10 % 4';
if (ev(exWhole) !== ev('14 - 2')) throw new Error('worked example 3 steps do not add up');
const vSteps = tbl(
  ['Step', 'Work', 'Result', 'Why'],
  exSteps.map(([e, why], i) => [String(i + 1), ic(e), ic(ev(e)), why]),
  `Step table for evaluating ${exWhole}: ${exSteps.map(([e]) => `${e} is ${ev(e)}`).join(', ')}; the final value is ${ev(exWhole)}`,
  `Final value of ${exWhole}: ${ev(exWhole)}.`,
);
const asc = [['64 / 8 / 2', 'Left to right: (64 / 8) / 2'], ['2 ** 3 ** 2', 'Right to left: 2 ** (3 ** 2)'], ['-3 ** 2', '** is applied before the minus sign'], ['(-3) ** 2', 'Brackets change the order'], ['-17 // 5', 'Floor division rounds down, towards minus infinity'], ['-17 % 5', 'The remainder takes the sign of the divisor']];
const vAssoc = tbl(
  ['Expression', 'Value', 'Why'],
  asc.map(([e, why]) => [ic(e), ic(ev(e)), why]),
  `Table of six tricky expressions: ${asc.map(([e]) => `${e} is ${ev(e)}`).join(', ')}`,
  'Every value was produced by running the expression.',
);
const imp = ['5 + 2.0', '5 + True', '5 + 2j', 'True + True', '7 / 2'];
const vImplicit = tbl(
  ['Expression', 'Value', 'Type of the result'],
  imp.map((e) => [ic(e), ic(ev(e)), ic(tn(e))]),
  `Table of implicit conversion: ${imp.map((e) => `${e} gives ${ev(e)} of type ${tn(e)}`).join('; ')}`,
  'Python promotes to the wider type: bool, then int, then float, then complex.',
);
const expl = ['int(7.9)', 'int("42")', 'float(3)', 'float("2.5")', 'str(15) + "0"', 'bool(0)', 'int("3.7")'];
const vExplicit = tbl(
  ['Statement', 'Result'],
  expl.map((e) => [ic(`print(${e})`), ic(R(`print(${e})`))]),
  `Table of explicit conversion calls with their results: ${expl.map((e) => `${e} gives ${R(`print(${e})`)}`).join('; ')}`,
  'The last call fails because int() accepts only a string that spells a whole number.',
);
const pcalls = [
  ['print("Rs", 40)', 'print("Rs", 40)'],
  ['print("Rs", 40, sep="")', 'print("Rs", 40, sep="")'],
  ['print("12", "05", "26", sep="-")', 'print("12", "05", "26", sep="-")'],
  ['print("Go", end="!"); print("Stop")', 'print("Go", end="!")\nprint("Stop")'],
];
const vPrint = tbl(
  ['Statement', 'Exact output'],
  pcalls.map(([s, c]) => [ic(s), ic(pyOut(c))]),
  `Table of print calls with sep and end and their exact output: ${pcalls.map(([s, c]) => `${s} shows ${pyOut(c)}`).join('; ')}`,
  'sep goes between the values; end goes after the last one.',
);
const typed = ['25', '2.5', 'abc'];
const vInput = tbl(
  ['User types', 'Type from input()', 'After int()', 'After float()'],
  typed.map((t) => [ic(t), ic(R(code('x = input()', 'print(type(x).__name__)'), { stdin: t + '\n' })), ic(R('print(int(input()))', { stdin: t + '\n' })), ic(R('print(float(input()))', { stdin: t + '\n' }))]),
  `Table showing that input() always returns a string, and what int() and float() do to the typed text: ${typed.map((t) => `${t} gives ${R('print(int(input()))', { stdin: t + '\n' })} with int and ${R('print(float(input()))', { stdin: t + '\n' })} with float`).join('; ')}`,
  'Error lines were produced by running the conversions.',
);
const payStmts = ['name = "Meera"', 'rate = float("300")', 'hours = int("8")', 'pay = rate * hours'];
const payRows = rowsOf(traceSrc(payStmts, ['name', 'rate', 'hours', 'pay']));
const payProg = code('name = input()', 'rate = float(input())', 'hours = int(input())', 'pay = rate * hours', 'print(name, "earns", pay)');
const payIn = 'Meera\n300\n8\n';
const vPay = tbl(
  ['Statement', 'name', 'rate', 'hours', 'pay'],
  payStmts.map((s, i) => [ic(s), ...payRows[i]]),
  `Trace table of a pay program for the typed values Meera, 300 and 8; pay becomes ${payRows[3][3]} and the program prints ${pyOut(payProg, { stdin: payIn })}`,
  `Typed values are shown inside the statements; the program prints: ${pyOut(payProg, { stdin: payIn })}`,
);
const eSyn = 'print("Hi"';
const eRun = 'print(10 // 0)';
const eLog = 'print(40 + 60 / 2)';
const vErrKinds = tbl(
  ['Kind', 'When it shows up', 'Example', 'What you see'],
  [
    ['Syntax error', 'Before the program starts', ic(eSyn), ic(pyErr(eSyn))],
    ['Run-time error', 'While a statement is running', ic(eRun), ic(pyErr(eRun))],
    ['Logical error', 'Never: the answer is just wrong', ic(eLog), `Prints ${ic(pyOut(eLog))}, not the mean of 40 and 60`],
  ],
  'Table of three kinds of error: syntax error found before running, run-time error found while running, and logical error that gives no message but a wrong answer; each with an example and what you see',
);
const msgs = ['print(total)', 'print("Rs" + 50)', 'int("fifty")', 'print(7 / 0)', 'print("a" "b" 3)'];
const vMsgs = tbl(
  ['Statement', 'Last line of the message'],
  msgs.map((m) => [ic(m), ic(pyErr(m))]),
  `Table of five faulty statements with the last line of the error message: ${msgs.map((m) => pyErr(m)).join('; ')}`,
  'Read the last line first: it names the error and says what went wrong.',
);
const vDebug = flow('LR', ['Read the last line of the message', 'Find the line number', 'Fix the statement', 'Run again', 'Check against a hand calculation'], 'Debugging flow: read the last line of the message, find the line number, fix the statement, run again, and check the answer against a hand calculation', 'A logical error gives no message, so the last step matters most.');
const vSummary2 = tbl(
  ['Idea', 'Remember'],
  [
    ['Expression', 'produces a value; a statement is an instruction'],
    ['Precedence', 'brackets, **, * / // %, + -, comparisons, not, and, or'],
    ['Implicit conversion', 'Python promotes to the wider type (bool, int, float, complex)'],
    ['Explicit conversion', 'int(), float(), str(), bool() called by the programmer'],
    ['print()', 'sep goes between values; end goes after the last value'],
    ['input()', 'always returns a string; convert it before arithmetic'],
    ['Errors', 'syntax (before running), run-time (while running), logical (wrong answer)'],
  ],
  'Summary table of Part 2: expressions, precedence, implicit and explicit conversion, print, input and the three kinds of error',
);

// ================================================================ deck 1
const part1 = deck({
  part: 1,
  title: 'Python Fundamentals — Part 1: Tokens, Variables, Data Types and Operators',
  goals: [
    'Describe the features of Python and use interactive and script mode',
    'Identify tokens, write valid identifiers and explain variables, l-values and r-values',
    'Name the data types, tell mutable from immutable objects, and use arithmetic, relational, logical, assignment, identity and membership operators',
  ],
  slides: [
    sl('title', 'Python Fundamentals', {
      b: 'Part 1 — **tokens**, **variables**, **data types** and **operators**.',
      v: vRoute1,
      n: 'Welcome to Python. In this first part we learn what a Python program is made of. We meet tokens, variables and data types, and we find out which objects can be changed and which cannot. Then we study the operators that combine values. Every output you see in these slides was produced by running real Python code.',
    }),
    sl('concept', 'Features of Python', {
      b: 'Python is an **interpreted**, **high-level**, **dynamically typed** language.',
      v: vFeatures,
      n: 'Python is interpreted, which means statements are translated and run one at a time. It is high level, so it reads almost like English. It is dynamically typed, so we never declare a type. And it is case sensitive. Because it is free and runs on many systems, it is an excellent first language.',
    }),
    sl('concept', 'Interactive mode and script mode', {
      b: 'Use **interactive mode** to try ideas and **script mode** to keep programs.',
      v: vModes,
      n: 'There are two ways to run Python. In interactive mode you type one statement at the prompt and the answer appears at once, even without print. In script mode you save the program in a file and run it as a whole, and a value appears only when the program prints it. Choose interactive for quick trials.',
    }),
    sl('concept', 'Character set and tokens', {
      b: 'A program is made of **tokens**: the smallest units that have a meaning.',
      v: vTokens,
      n: 'Every program is written with letters, digits and symbols, which together are the character set. These are grouped into tokens. A keyword is a reserved word. An identifier is a name you choose. A literal is a fixed value. An operator works on values, and a punctuator such as a bracket or a colon gives the code its structure.',
    }),
    sl('concept', 'Identifiers and keywords', {
      b: 'An identifier uses **letters, digits and underscores**, must not **start with a digit** and must not be a **keyword**.',
      v: vIdent,
      n: 'The rules for identifiers are simple. Use letters, digits and the underscore. Never start with a digit. Never use a space or a symbol such as the hyphen, because the hyphen is the minus operator. And never use a keyword. Capital letters are allowed, but remember that Fee and fee are different names.',
    }),
    sl('check', 'Quick check: valid identifier', {
      b: 'Choose the valid name.',
      chk: 'm_ident_valid',
      n: 'Apply the rules for identifiers to each choice. Remember that a name may not start with a digit and may not contain a space or a hyphen.',
    }),
    sl('concept', 'Variables, l-value and r-value', {
      b: 'A **variable** is a name that refers to an object. In an assignment the **right side is worked out first**.',
      v: vLr,
      n: 'A variable is a name bound to an object. In an assignment, the name on the left is the l-value, and the expression on the right is the r-value. Python works out the right side first and then binds the result to the name. So a statement such as rate equals rate plus three is perfectly sensible. Comments begin with a hash sign and are ignored.',
    }),
    sl('example', 'Worked example 1: tracing assignments', {
      b: `Follow each statement and write the values.\n\n${F(...trStmts)}`,
      v: vTrace1,
      n: 'Trace these five statements one at a time. Each statement uses the current values of the names on its right side. The last statement swaps the two names in a single step, so the values of a and b change places. A trace table like this is the safest way to find the output of a program.',
    }),
    sl('concept', 'Data types', {
      b: 'Every value has a **type**. The type name is found with `type(value).__name__`.',
      v: vTypes,
      n: 'Python has numbers of type int, float and complex, the truth values of type bool, text of type str, and the collections list, tuple and dict. The special value None stands for no value. The table shows the type name that Python itself reports for each literal, and whether the type is mutable.',
    }),
    sl('check', 'Quick check: literals and types', {
      b: 'Match each literal with its type.',
      chk: 'mt_literal',
      n: 'Remember that a number in quote marks is text, not a number, and that True and False belong to the type bool.',
    }),
    sl('concept', 'Mutable and immutable objects', {
      b: 'A **mutable** object can be changed in place; an **immutable** object cannot.',
      v: vMut,
      n: 'A list and a dictionary are mutable, so we can change their items in place. Numbers, strings and tuples are immutable. Trying to assign to an item of a tuple or a string stops the program with a type error. To get a different value from an immutable object, we build a new object instead.',
    }),
    sl('example', 'Worked example 2: two names, one list', {
      b: `Does changing one name change the other?\n\n${F(...aliasStmts)}`,
      v: vAlias,
      n: 'In this example a second name is bound to the same list. Because a list is mutable, append changes the shared object, and both names show the new subject. But joining with plus builds a brand new list. The second name is then bound to that new list, and the two names no longer refer to the same object.',
    }),
    sl('check', 'Quick check: mutable object', {
      b: 'Which object can be changed in place?',
      chk: 'm_mutable_obj',
      n: 'Think about which of these types allows its items to be changed after it has been created.',
    }),
    sl('concept', 'Arithmetic operators', {
      b: 'Seven operators work on numbers. Note that `/` always gives a **float**.',
      v: vArith,
      n: 'The arithmetic operators are plus, minus, times, true division, floor division, modulus and exponentiation. True division always gives a float. Floor division gives the whole part of the quotient, rounded down. The modulus gives the remainder. And the double star raises a number to a power.',
    }),
    sl('concept', 'Relational and logical operators', {
      b: 'Relational operators compare; `and`, `or` and `not` combine the answers.',
      v: vRel,
      n: 'Relational operators compare two values and give true or false. Notice that seven double equals seven point zero is true, because only the values are compared. The logical operators and, or and not combine true and false answers. And is true only when both sides are true, while or is true when at least one side is true.',
    }),
    sl('concept', 'Assignment and augmented assignment', {
      b: 'An **augmented assignment** such as `n += 3` updates the variable in one step.',
      v: vAug,
      n: 'A single equals sign assigns a value. An augmented assignment combines an operator with the assignment and updates the same variable. Plus equals adds, star equals multiplies, and double slash equals does floor division. Each statement in the table was run on a variable that starts at twenty.',
    }),
    sl('check', 'Quick check: augmented assignment', {
      b: 'Predict the output.',
      chk: 'm_aug',
      n: 'Apply the three updates one after another. Each statement works on the value left by the previous one.',
    }),
    sl('concept', 'Identity and membership operators', {
      b: '`==` compares **values**; `is` compares **objects**; `in` tests whether an item is present.',
      v: vIdMem,
      n: 'The identity operators is and is not ask whether two names refer to the very same object. Double equals only asks whether the values are equal. Two equal lists made separately are not the same object. The membership operators in and not in test whether an item is present in a list or a text.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. A program is made of tokens. Identifiers follow simple rules and are case sensitive. A variable is a name bound to an object, and the type belongs to the object. Lists and dictionaries are mutable. Python has arithmetic, relational, logical, assignment, identity and membership operators.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'List the **five kinds of tokens** with one example of each.',
        'For identifiers, check three things: the first character, the characters used, and whether it is a **keyword**.',
        'Remember `/` gives a **float**, `//` rounds **down** and `%` has the sign of the divisor.',
        'Do not confuse `==` (same value) with `is` (same object).',
        'Show a **trace table** whenever the output depends on several updates.',
      ],
      n: 'Some advice for the exam. Learn the five kinds of tokens with an example of each. Check identifiers by their first character, their other characters and whether they are keywords. Remember that true division gives a float and floor division rounds down. Do not confuse double equals with is. And draw a trace table whenever several updates are involved.',
    }),
  ],
});

// ================================================================ deck 2
const part2 = deck({
  part: 2,
  title: 'Python Fundamentals — Part 2: Expressions, Type Conversion, Input/Output and Errors',
  goals: [
    'Evaluate expressions using precedence and associativity, and tell an expression from a statement',
    'Convert types implicitly and explicitly, and use input() and print() with sep and end',
    'Recognise syntax, run-time and logical errors and read an error message',
  ],
  slides: [
    sl('title', 'Expressions, conversion, input and errors', {
      b: 'Part 2 — **evaluating**, **converting**, **reading and printing**, and **debugging**.',
      v: vRoute2,
      n: 'In Part 2 we put the operators to work. We learn the order in which Python evaluates an expression, how types are converted, how a program reads input and prints output, and how to recognise the three kinds of error. Try each example in your own editor as you go.',
    }),
    sl('concept', 'Expressions and statements', {
      b: 'An **expression** produces a value. A **statement** is a complete instruction.',
      v: vExpr,
      n: 'An expression is a combination of values and operators that produces a value. A statement is a complete instruction that Python carries out, such as an assignment or a call to print. An assignment statement stores a value and shows nothing. A statement can contain an expression, but an expression on its own does not do anything in a script.',
    }),
    sl('concept', 'Precedence of operators', {
      b: 'When operators are mixed, the one with **higher priority** is applied first. Equal priority goes **left to right**.',
      v: vPrec,
      n: 'Python follows a fixed order. Brackets come first, then the exponent, then the unary signs. Then multiplication, the two divisions and the modulus share one level, and addition and subtraction share the next. Comparisons come after the arithmetic, then not, then and, and finally or. When in doubt, use brackets.',
    }),
    sl('example', 'Worked example 3: evaluating an expression', {
      b: `Evaluate step by step.\n\n${F(`print(${exWhole})`)}`,
      v: vSteps,
      n: 'Let us evaluate a long expression. The exponent has the highest priority, so two to the power three comes first. Then multiplication, floor division and modulus are applied from left to right. Only then do we add and subtract, again from left to right. Each result in the table was worked out by Python itself.',
    }),
    sl('check', 'Quick check: order of evaluation', {
      b: 'Put the steps in order.',
      chk: 'ord_eval',
      n: 'Decide which operator is applied first, then which comes next. Remember that plus and minus are applied last.',
    }),
    sl('concept', 'Associativity and tricky cases', {
      b: 'The exponent works **right to left**. Floor division and `%` need care with **negative** numbers.',
      v: vAssoc,
      n: 'Most operators work from left to right, but the exponent works from right to left. A minus sign in front of a number is applied after the exponent. With negative numbers, floor division rounds down, towards minus infinity, and the remainder takes the sign of the divisor. Test such cases before you rely on them.',
    }),
    sl('concept', 'Implicit type conversion', {
      b: 'When types are mixed, Python **promotes** to the wider type automatically.',
      v: vImplicit,
      n: 'In implicit conversion, Python changes the type for you. A bool counts as an int, an int mixed with a float becomes a float, and a float mixed with a complex number becomes complex. The result always has the widest type in the expression. True division always gives a float, even for whole numbers.',
    }),
    sl('concept', 'Explicit type conversion', {
      b: 'In **explicit conversion**, the programmer calls `int()`, `float()`, `str()` or `bool()`.',
      v: vExplicit,
      n: 'In explicit conversion, also called type casting, we call a function. Int cuts off the decimal part of a float. Int and float can read a number from a string. Str turns a number into text, so plus then joins two texts. A string that does not spell a whole number cannot be passed to int, and Python reports a value error.',
    }),
    sl('check', 'Quick check: a conversion error', {
      b: 'Which statement causes a ValueError?',
      chk: 'm_value_err',
      n: 'Remember that int can read a string only when the string spells a whole number.',
    }),
    sl('concept', 'Output with print(): sep and end', {
      b: '`sep` sets what goes **between** values; `end` sets what comes **after** the last value.',
      v: vPrint,
      n: 'The print function separates its values by a single space and ends with a new line. The sep argument changes the separator, and an empty text joins the values. The end argument changes what is added after the last value. With end set to an exclamation mark, the next print continues on the same line.',
    }),
    sl('concept', 'Input with input()', {
      b: '`input()` **always returns a string**. Convert it before arithmetic.',
      v: vInput,
      n: 'Whatever the user types, input gives back a string. To do arithmetic, convert it with int or float. Int accepts only a whole number in the text, so a typed decimal point makes it fail. Float accepts both. Text that is not a number at all fails with both functions.',
    }),
    sl('example', 'Worked example 4: a pay program', {
      b: `Read a name, a rate and some hours, and print the pay.\n\n${F(payProg)}`,
      v: vPay,
      n: 'Here is a complete program with input and output. The name stays text, the rate is converted to a float and the hours to an int. The pay is the product, which is a float. The final print joins the three values with spaces. The table shows each variable after each statement for the typed values.',
    }),
    sl('check', 'Quick check: print and sep', {
      b: 'Predict the output.',
      chk: 'm_printsep',
      n: 'With an empty separator, no space is placed between the values. Join them exactly as they are.',
    }),
    sl('concept', 'Three kinds of error', {
      b: 'A **syntax** error stops the program before it starts, a **run-time** error stops it while it runs, and a **logical** error gives a wrong answer silently.',
      v: vErrKinds,
      n: 'There are three kinds of error. A syntax error breaks the rules of the language, and Python reports it before running anything. A run-time error happens while a valid statement is being carried out, such as dividing by zero. A logical error gives no message at all, only a wrong answer, so it is the hardest to find.',
    }),
    sl('example', 'Worked example 5: reading error messages', {
      b: 'The **last line** of an error message names the error and says what went wrong.',
      v: vMsgs,
      n: 'Always read the last line of an error message first. A name error means a name has no value. A type error means two types cannot be combined, for example a string and a number. A value error means the type is right but the value is not. A zero division error and a syntax error have their own clear messages.',
    }),
    sl('concept', 'Debugging', {
      b: '**Debugging** is finding and fixing errors. Always compare the output with a hand calculation.',
      v: vDebug,
      n: 'To debug, read the last line of the message, find the line number, fix the statement and run again. A logical error gives no message, so check the output against a small example that you work out by hand. Fix one error at a time, and run the program after each fix.',
    }),
    sl('check', 'Quick check: when is an error found?', {
      b: 'Which problem appears only while the program runs?',
      chk: 'm_runtime',
      n: 'Think about which of these problems Python can detect before it starts running the program, and which only when a statement is carried out.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. An expression produces a value. Precedence decides the order of evaluation. Types are converted implicitly or explicitly. Print has the sep and end arguments, and input always returns a string. Syntax errors are found before running, run-time errors while running, and logical errors only by checking the answer.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Apply the **priority order** and write each step of an evaluation.',
        'Convert `input()` with **`int()` or `float()`** before any arithmetic.',
        'Say whether a conversion is **implicit** (done by Python) or **explicit** (called by you).',
        'Name an error **and** its cause, then write the corrected statement.',
        'For `print()` outputs, mark where **sep** and **end** change the usual spacing and new lines.',
      ],
      n: 'Some advice for the exam. Apply the priority order and write each step. Convert input with int or float before any arithmetic. State whether a conversion is implicit or explicit. When asked about an error, name it, give its cause and write the corrected statement. And for print questions, watch where sep and end change the spacing and the new lines.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Python Fundamentals — Notes',
  sections: [
    {
      h: '1. Python, modes and tokens',
      t: 1,
      b: 'Python is an **interpreted**, **high-level**, **dynamically typed** and **case-sensitive** language. It is free and runs on many systems.\n\n**Interactive mode** runs one statement at a time at the `>>>` prompt and shows the value of an expression at once. **Script mode** runs a whole program saved in a `.py` file; a value is shown only when the program prints it.\n\nA program is written with a **character set** (letters, digits and symbols) and is made of **tokens**: keywords, identifiers, literals, operators and punctuators.',
      terms: [
        ['Token', 'The smallest unit of a program that has a meaning: keyword, identifier, literal, operator or punctuator.'],
        ['Keyword', 'A reserved word with a fixed meaning, such as while; it cannot be used as a name.'],
        ['Literal', 'A fixed value written directly in the program, such as 42 or "Isha".'],
      ],
      v: vFeatures,
      vs: [vModes, vTokens],
    },
    {
      h: '2. Identifiers, variables and comments',
      t: 1,
      b: 'An **identifier** is a name chosen by the programmer. It may use letters, digits and underscores, must not start with a digit, must not contain spaces or symbols, and must not be a keyword. Identifiers are case-sensitive.\n\nA **variable** is a name that refers to an object. In `fare = rate * 5` the name on the left is the **l-value** and the expression on the right is the **r-value**; the right side is worked out first, so `rate = rate + 3` is valid. Every object has an **identity**, a **type** and a **value**.\n\nA **comment** starts with `#` and runs to the end of the line; Python ignores it.',
      terms: [
        ['Identifier', 'A programmer-chosen name for a variable or other object.'],
        ['l-value', 'The name on the left of an assignment, which receives the value.'],
        ['r-value', 'The value or expression on the right of an assignment.'],
      ],
      v: vIdent,
      vs: [vLr, vTrace1],
    },
    {
      h: '3. Data types, mutable and immutable',
      t: 1,
      b: 'The data types in this chapter are `int`, `float`, `complex`, `bool`, `str`, `list`, `tuple`, `dict` and the special value `None` (no value, type `NoneType`). Use `type(value).__name__` to see a type name.\n\nA **mutable** object (list, dict) can be changed in place. An **immutable** object (int, float, complex, bool, str, tuple) cannot: an apparent change builds a new object and rebinds the name.\n\nTwo names can refer to the same mutable object, so a change made through one name is seen through the other.',
      terms: [
        ['Mutable', 'An object whose contents can be changed in place, such as a list or dictionary.'],
        ['Immutable', 'An object that cannot be changed after it is created, such as a number, string or tuple.'],
        ['Dynamic typing', 'The type belongs to the object, so a name may refer to objects of different types at different times.'],
      ],
      v: vTypes,
      vs: [vMut, vAlias],
    },
    {
      h: '4. Operators',
      t: 1,
      b: '**Arithmetic:** `+ - * / // % **`. `/` always gives a float; `//` rounds down; `%` is the remainder; `**` is the power.\n\n**Relational:** `< <= > >= == !=` give `True` or `False`. **Logical:** `and`, `or`, `not`.\n\n**Assignment:** `=` and the **augmented** forms `+= -= *= /= //= %= **=`, which update a variable in one step.\n\n**Identity:** `is`, `is not` (same object?). **Membership:** `in`, `not in` (is the item present?). `==` compares values; `is` compares objects.',
      terms: [
        ['Floor division', 'The // operator: the quotient rounded down towards minus infinity.'],
        ['Augmented assignment', 'An operator such as += that combines an operation with assignment.'],
      ],
      v: vArith,
      vs: [vRel, vAug, vIdMem],
    },
    {
      h: '5. Expressions, precedence and type conversion',
      t: 1,
      b: 'An **expression** produces a value; a **statement** is a complete instruction. The order of evaluation is: brackets, `**` (right to left), unary signs, `* / // %`, `+ -`, comparisons with `is` and `in`, `not`, `and`, `or`; operators of equal priority go left to right.\n\n**Implicit conversion** is done by Python: the result is promoted to the wider type (bool, int, float, complex). **Explicit conversion** (type casting) is done by calling `int()`, `float()`, `str()` or `bool()`. `int("3.7")` fails with a `ValueError`.',
      terms: [
        ['Expression', 'A combination of values and operators that produces a value.'],
        ['Type casting', 'Explicit conversion of a value to another type with a function such as int().'],
      ],
      v: vPrec,
      vs: [vSteps, vAssoc, vImplicit, vExplicit],
    },
    {
      h: '6. Input, output and errors',
      t: 2,
      b: '`print()` separates values with `sep` (default one space) and ends with `end` (default a new line). `input()` always returns a **string**; convert it with `int()` or `float()` before arithmetic.\n\nA **syntax error** breaks the rules of the language and is found before the program starts. A **run-time error** (for example `ZeroDivisionError`, `NameError`, `TypeError`, `ValueError`) stops the program while it runs. A **logical error** gives no message but a wrong result. Read the **last line** of an error message first, and check logical errors with a hand-worked example.',
      terms: [
        ['Syntax error', 'A violation of the rules of the language, reported before the program runs.'],
        ['Run-time error', 'An error that occurs while a valid statement is being executed.'],
        ['Logical error', 'A mistake in the logic that produces a wrong result without any error message.'],
      ],
      v: vPrint,
      vs: [vInput, vPay, vErrKinds, vMsgs],
    },
  ],
  tips: `**Common mistakes**\n- Using a keyword, a name that starts with a digit or a name with a hyphen as an identifier.\n- Forgetting that \`input()\` returns a string, so adding it to a number raises a TypeError.\n- Writing \`int("3.7")\`: use \`int(float("3.7"))\`.\n- Confusing \`==\` (same value) with \`is\` (same object).\n- Forgetting that \`/\` gives a float and that \`//\` and \`%\` need care with negative numbers.\n- Thinking that a name and an object are the same: two names can refer to one list.\n\n**How marks are usually awarded**\n- Definitions (2 marks): one point for the meaning and one for a correct example.\n- Evaluating an expression: marks for the order of operators and for the final value.\n- Output questions: the exact output, including the spaces from print().\n- Error questions: the kind of error, its cause and the corrected statement.\n- Programs: input with conversion, correct calculation, and correct output for the sample.`,
});

// ================================================================ flashcards
const FC = cards([
  ['What are the **features of Python**?', 'Interpreted, high-level, dynamically typed, case-sensitive, free and portable.', 'fact', 1],
  ['**Interactive mode** versus **script mode**', 'Interactive: one statement at a time at the >>> prompt, value shown at once. Script: a saved .py file run as a whole.', 'concept', 1],
  ['What is a **token**?', 'The smallest unit of a program that has a meaning.', 'definition', 1],
  ['The **five kinds of token**', 'Keyword, identifier, literal, operator, punctuator.', 'fact', 1],
  ['What is a **keyword**?', 'A reserved word with a fixed meaning; it cannot be used as an identifier.', 'definition', 1],
  ['Rules for an **identifier**', 'Letters, digits and underscore; must not start with a digit; no spaces or symbols; not a keyword; case-sensitive.', 'concept', 1],
  [`Is ${ic('2nd_bus')} a valid identifier?`, `**${yn(!runPy('2nd_bus = 1').err)}.** An identifier must not start with a digit.`, 'example', 1],
  ['What is a **variable**?', 'A name that refers to an object in memory.', 'definition', 1],
  ['**l-value** and **r-value**', 'l-value: the name on the left of an assignment. r-value: the value or expression on the right, worked out first.', 'definition', 1],
  ['How is a **comment** written?', 'Start with # ; the rest of the line is ignored by Python.', 'fact', 1],
  ['The three properties of every **object**', 'Identity, type and value.', 'fact', 1],
  ['What is **dynamic typing**?', 'The type belongs to the object, not the name, so a name can refer to objects of different types.', 'concept', 1],
  ['Python **data types** in this chapter', 'int, float, complex, bool, str, list, tuple, dict and None.', 'fact', 1],
  [`Type name of ${ic('4 + 2j')}?`, `${ic(tn('4 + 2j'))}, a complex number with real part 4 and imaginary part 2.`, 'example', 1],
  ['**Mutable** or **immutable**? list, dict', 'Both are **mutable**: they can be changed in place.', 'concept', 1],
  ['**Mutable** or **immutable**? int, str, tuple', 'All **immutable**: any change builds a new object.', 'concept', 1],
  [`${ic('shelf = (3, 6)')} then ${ic('shelf[0] = 9')}`, `Fails: ${ic(pyErr(code('shelf = (3, 6)', 'shelf[0] = 9')))}.`, 'example', 1],
  [`${ic('/')} versus ${ic('//')}: ${ic('17 / 5')} and ${ic('17 // 5')}`, `${ic(ev('17 / 5'))} (always a float) and ${ic(ev('17 // 5'))} (rounded down).`, 'example', 1],
  [`${ic('-17 // 5')} and ${ic('-17 % 5')}`, `${ic(ev('-17 // 5'))} and ${ic(ev('-17 % 5'))}: floor division rounds down; the remainder takes the sign of the divisor.`, 'example', 1],
  ['**Priority order** of operators', 'Brackets, **, unary signs, * / // %, + -, comparisons (with is and in), not, and, or.', 'fact', 1],
  [`Evaluate ${ic('2 ** 3 ** 2')}`, `${ic(ev('2 ** 3 ** 2'))}: the exponent works right to left.`, 'example', 1],
  [`What does ${ic('n += 3')} mean?`, 'The same as n = n + 3: an **augmented assignment** that updates n in one step.', 'concept', 1],
  [`${ic('==')} versus ${ic('is')}`, '== compares values; is compares identity (the same object).', 'concept', 1],
  [`${ic('"an" in "banana"')}?`, `${ic(ev('"an" in "banana"'))}: the membership operator tests whether the item is present.`, 'example', 1],
  ['**Implicit** type conversion', 'Python promotes mixed types to the wider type automatically (bool, int, float, complex).', 'definition', 1],
  ['**Explicit** type conversion', 'The programmer calls int(), float(), str() or bool() (type casting).', 'definition', 1],
  [`${ic('int("3.7")')}`, `Fails: ${ic(pyErr('print(int("3.7"))'))}. Use ${ic('int(float("3.7"))')}, which gives ${ic(ev('int(float("3.7"))'))}.`, 'exam-tip', 1],
  ['What type does **input()** return?', 'Always a **string** (str), whatever the user types.', 'fact', 2],
  [`${ic('print("Rs", 40, sep="")')}`, `Shows ${ic(pyOut('print("Rs", 40, sep="")'))}: sep sets the separator, end sets what follows the last value.`, 'example', 2],
  ['The **three kinds of error**', 'Syntax (before running), run-time (while running), logical (wrong result, no message).', 'fact', 2],
]);

// ================================================================ tests (cbse-11-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Python Fundamentals',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_keyword', 'm_type_div', 'm_typeerr', 'ar_input'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s_conv', 's_err_name', 's3_print_forms'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions. Show the program and its output.', items: [{ attempt: 1, keys: ['l_bill', 'l_digits'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_library'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Python Fundamentals',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_features', 'm_lvalue', 'm_dynamic', 'm_prec', 'm_member', 'm_bool', 'm_syntax_which', 'm_logical_err', 'ar_floor', 'ar_syntax'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words.', items: ['s_tokens', 's_err_indent', { attempt: 1, keys: ['s_mut_immut', 's_eq_is'] }, 's3_expr', { attempt: 1, keys: ['s3_trace_assign', 's3_three_errors'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18.', items: ['l_time', { attempt: 1, keys: ['l_types', 'l_errors'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_stall', 'cb_pocket'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-computer-science-ch03 only (tokens, variables, data types, operators, expressions, type conversion, input and output, errors); no flow of control',
    originality: 'every program, scenario and data value written for this chapter by SOYL; no textbook, NCERT or board-paper program reused',
    execution: 'every output, value, type name, error line and trace table in items, slides, notes and flashcards produced by running the code (runPy in lib.mjs); results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
