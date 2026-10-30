// Build CBSE 12 Computer Science ch01 Python Revision Tour. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-12-computer-science-ch01/src/build.mjs
// Every program output shown in decks, notes and flashcards is produced by pyOut() (Python 3), never typed.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache, pyOut, pyErr } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-12-computer-science-ch01', 'computer-science');
usePyCache(SRC);
const { F } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const code = (...lines) => lines.join('\n');
const ic = (s) => '`' + s + '`';
/** Rows printed by a Python program as one JSON list. */
const rowsOf = (c) => JSON.parse(pyOut(c));

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Tokens', 'Data types', 'Operators and precedence', 'Expressions', 'if, elif, else', 'for and while', 'break and continue'], 'Route map of Part 1: tokens, data types, operators and precedence, expressions, if-elif-else, for and while loops, break and continue', 'Part 1 at a glance');
const vTokens = table(
  ['Token', 'What it is', 'Examples'],
  [
    ['Keyword', 'Reserved word with a fixed meaning', '`if`, `for`, `while`, `True`, `None`'],
    ['Identifier', 'Name chosen by the programmer', '`total_fee`, `_count`, `marks2`'],
    ['Literal', 'A fixed value written in the code', '`25`, `3.75`, `"Pune"`, `True`'],
    ['Operator', 'Symbol that acts on values', '`+`, `//`, `**`, `==`, `and`, `in`'],
    ['Punctuator', 'Symbol that organises code', '`( )`, `[ ]`, `{ }`, `:`, `,`'],
  ],
  'Table of the five kinds of tokens: keywords such as if and while, identifiers such as total_fee, literals such as 25 and Pune, operators such as plus and floor division, and punctuators such as brackets, colon and comma',
);
const vTypes = table(
  ['Type', 'Example', 'Mutable?'],
  [
    ['`int`, `float`, `complex`', '`42`, `3.5`, `2+3j`', 'No'],
    ['`bool`', '`True`, `False`', 'No'],
    ['`str`', '`"Kochi"`', 'No'],
    ['`tuple`', '`(12, "B")`', 'No'],
    ['`list`', '`[72, 85, 64]`', 'Yes'],
    ['`dict`', '`{"pen": 10}`', 'Yes'],
    ['`NoneType`', '`None`', 'No'],
  ],
  'Table of Python data types with examples: numbers, booleans, strings, tuples and None are immutable; lists and dictionaries are mutable',
  'Mutable = can be changed in place.',
);
const vOperators = table(
  ['Category', 'Operators', 'Example and result'],
  [
    ['Arithmetic', '`+ - * / // % **`', `${ic('17 // 5')} gives ${ic(pyOut('print(17 // 5)'))}; ${ic('17 % 5')} gives ${ic(pyOut('print(17 % 5)'))}`],
    ['Relational', '`== != < > <= >=`', `${ic('4 == 4.0')} gives ${ic(pyOut('print(4 == 4.0)'))}`],
    ['Logical', '`not and or`', `${ic('not 0')} gives ${ic(pyOut('print(not 0)'))}`],
    ['Identity', '`is`, `is not`', 'same object or not'],
    ['Membership', '`in`, `not in`', `${ic('"a" in "chai"')} gives ${ic(pyOut('print("a" in "chai")'))}`],
    ['Assignment', '`= += -= *= //=`', '`x += 3` means `x = x + 3`'],
  ],
  'Table of operator categories: arithmetic, relational, logical, identity, membership and assignment, with an example of each; 17 floor-divided by 5 gives 3 and 17 mod 5 gives 2',
);
const vPrecedence = table(
  ['Priority', 'Operators', 'Note'],
  [
    ['1 (highest)', '`( )`', 'Brackets first'],
    ['2', '`**`', 'Right to left: `2 ** 3 ** 2` is `2 ** 9`'],
    ['3', 'unary `-`', '`-2 ** 2` is `-(2 ** 2)`'],
    ['4', '`* / // %`', 'Left to right'],
    ['5', '`+ -`', 'Left to right'],
    ['6', 'comparisons, `in`, `is`', 'Can be chained: `1 < x < 9`'],
    ['7', '`not`', ''],
    ['8', '`and`', ''],
    ['9 (lowest)', '`or`', ''],
  ],
  'Table of operator precedence from highest to lowest: brackets, exponent (right to left), unary minus, multiplication and division group, addition and subtraction, comparisons, not, and, or',
);
const eExpr = code('x = 4 + 18 // 4 * 3 ** 2 % 7');
const vExprSteps = table(
  ['Step', 'Rule', 'Expression becomes'],
  [
    ['1', '`**` first', '`4 + 18 // 4 * 9 % 7`'],
    ['2', '`//` (left to right)', '`4 + 4 * 9 % 7`'],
    ['3', '`*`', '`4 + 36 % 7`'],
    ['4', '`%`', '`4 + 1`'],
    ['5', '`+`', `${ic(pyOut(eExpr + '\nprint(x)'))}`],
  ],
  `Step table for evaluating 4 plus 18 floor-divided by 4 times 3 to the power 2 mod 7: exponent gives 9, floor division gives 4, multiplication gives 36, mod 7 gives 1, so the result is ${pyOut(eExpr + '\nprint(x)')}`,
  'Worked out by Python; each step follows the precedence table.',
);
const vIdentity = table(
  ['Code', 'Output', 'Why'],
  [
    [ic('int("42") + int(3.9)'), ic(pyOut('print(int("42") + int(3.9))')), 'int() truncates 3.9 to 3'],
    [ic('str(5) * 2'), ic(pyOut('print(str(5) * 2)')), 'string repetition'],
    [ic('bool("0")'), ic(pyOut('print(bool("0"))')), 'non-empty string is truthy'],
    [ic('float(7) // 2'), ic(pyOut('print(float(7) // 2)')), 'float operand gives a float'],
    [ic('True + True'), ic(pyOut('print(True + True)')), 'True counts as 1'],
  ],
  'Table of type-conversion examples, each run in Python: int of the string 42 plus int of 3.9 gives 45; the string 5 repeated twice gives 55; bool of the string zero is True; float 7 floor-divided by 2 gives 3.0; True plus True gives 2',
);
const vIfFlow = flow(
  'TB',
  ['Test the if condition', 'True: run the if block and skip the rest', 'False: test each elif in turn', 'No test True: run the else block (if any)', 'Continue after the whole statement'],
  'Flow of an if-elif-else statement: test the if condition; if true run its block and skip the rest; otherwise test each elif in turn; if none is true run the else block; then continue after the statement',
  'Only one block of an if-elif-else ever runs.',
);
const rangeCalls = ['range(5)', 'range(2, 9, 3)', 'range(10, 0, -4)', 'range(3, 3)'];
const vRange = table(
  ['Call', 'Values produced'],
  rangeCalls.map((r) => [ic(r), ic(pyOut(`print(list(${r}))`))]),
  'Table of range calls run in Python: range 5 gives 0 to 4; range 2, 9, 3 gives 2, 5 and 8; range 10, 0, minus 4 gives 10, 6 and 2; range 3, 3 gives an empty list',
  'The stop value is never included.',
);
const vWhileFlow = flow(
  'LR',
  ['Initialise the variable', 'Test the condition', 'True: run the body and update', 'Back to the test', 'False: leave the loop'],
  'Flow of a while loop: initialise the loop variable, test the condition, if true run the body and update the variable and go back to the test, if false leave the loop',
  'Forgetting the update makes an infinite loop.',
);
const vJumps = table(
  ['Statement', 'Effect', 'Example result'],
  [
    ['`break`', 'Leaves the innermost loop at once', ic(pyOut('for c in "Diwali":\n    if c == "l":\n        break\n    print(c, end="")'))],
    ['`continue`', 'Skips the rest of this pass, goes to the next', ic(pyOut('for c in "Diwali":\n    if c in "aeiou":\n        continue\n    print(c, end="")'))],
    ['loop `else`', 'Runs only if the loop ended without break', ic(pyOut('for n in [4, 6]:\n    if n % 5 == 0:\n        break\nelse:\n    print("no multiple of 5")'))],
    ['`pass`', 'Does nothing (a placeholder)', '—'],
  ],
  'Table of jump statements: break leaves the innermost loop, so looping over Diwali and breaking at l prints Diwa; continue skips vowels, printing Dwl; a loop else runs only when no break happens; pass does nothing',
);
const cRev = code('n = 2607', 'r = 0', 'rows = []', 'while n > 0:', '    d = n % 10', '    r = r * 10 + d', '    n //= 10', '    rows.append([d, r, n])', 'import json', 'print(json.dumps(rows))');
const vRevTrace = table(
  ['Pass', 'Digit `d = n % 10`', 'r after `r * 10 + d`', 'n after `n //= 10`'],
  rowsOf(cRev).map(([d, r, n], i) => [String(i + 1), String(d), String(r), String(n)]),
  `Trace table for reversing 2607: the digits taken are 7, 0, 6 and 2; r becomes 7, 70, 706 and 7062; n becomes 260, 26, 2 and 0, when the loop stops`,
  'Dry run produced by running the loop in Python.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Tokens', 'keywords, identifiers, literals, operators, punctuators'],
    ['Mutable', 'list, dict; everything else in this chapter is immutable'],
    ['`/` vs `//`', '`/` always gives a float; `//` floors towards minus infinity'],
    ['`**`', 'highest arithmetic priority, right to left'],
    ['`range(a, b, s)`', 'starts at a, stops before b, steps by s'],
    ['`break` / `continue`', 'leave the loop / skip to the next pass'],
  ],
  'Summary table of Part 1: the five token types, mutable and immutable types, true and floor division, the exponent operator, range, and break and continue',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Strings: index and slice', 'String methods', 'Lists and their methods', 'Aliasing and copies', 'Tuples', 'Dictionaries'], 'Route map of Part 2: string indexing and slicing, string methods, lists and their methods, aliasing and copies, tuples and dictionaries', 'Part 2 at a glance');
const WORD = 'MONSOON';
const vIndex = (() => {
  const s = new Svg(560, 170);
  const w = 64, x0 = 56, y = 60;
  s.text(20, 30, 'word', { anchor: 'start', size: 14, bold: true });
  s.text(70, 30, '=', { size: 14 });
  s.text(90, 30, `"${WORD}"`, { anchor: 'start', size: 14 });
  [...WORD].forEach((ch, i) => {
    s.rect(x0 + i * w, y, w, 46, { fill: 'fill', color: 'accent', sw: 1.5, rx: 2 });
    s.text(x0 + i * w + w / 2, y + 23, ch, { size: 18, bold: true });
    s.text(x0 + i * w + w / 2, y - 12, String(i), { size: 13, color: 'accent' });
    s.text(x0 + i * w + w / 2, y + 66, String(i - WORD.length), { size: 13, muted: true });
  });
  s.text(20, y - 12, '+', { anchor: 'start', size: 13, color: 'accent' });
  s.text(20, y + 66, '−', { anchor: 'start', size: 13, muted: true });
  s.text(280, 160, `word[2:5] is ${pyOut(`print("${WORD}"[2:5])`)}, word[-2] is ${pyOut(`print("${WORD}"[-2])`)}`, { size: 13 });
  return s.visual(`Diagram of the string MONSOON in seven boxes with positive indexes 0 to 6 above and negative indexes minus 7 to minus 1 below; word from 2 to 5 is ${pyOut(`print("${WORD}"[2:5])`)} and word at minus 2 is ${pyOut(`print("${WORD}"[-2])`)}`, 'Positive indexes count from 0 at the left; negative ones from −1 at the right.');
})();
const sliceCalls = ['s[2:7]', 's[-4:]', 's[::3]', 's[::-1]', 's[:3] + s[-3:]'];
const vSlices = table(
  ['Slice of `s = "Monsoon Mela"`', 'Result'],
  sliceCalls.map((c) => [ic(c), ic(pyOut(`s = "Monsoon Mela"\nprint(repr(${c}))`))]),
  'Table of slices of the string Monsoon Mela, each run in Python: from 2 to 7, the last four characters, every third character, the reversed string, and the first three plus the last three characters',
  'Start is included, stop is excluded; a negative step goes backwards.',
);
const strCalls = ['t.upper()', 't.title()', 't.count("a")', 't.find("bus")', 't.replace("bus", "train")', 't.split()', '"-".join(["9", "30"])', '"  hi ".strip()', '"R2D2".isalnum()'];
const vStrMethods = table(
  ['Call (t = "a bus at nine")', 'Result'],
  strCalls.map((c) => [ic(c), ic(pyOut(`t = "a bus at nine"\nprint(repr(${c}))`))]),
  'Table of string methods applied to the text a bus at nine, each run in Python: upper, title, count of a, find bus, replace bus with train, split, join, strip and isalnum',
  'Methods return new values; the original string never changes.',
);
const listCode = code('L = [5, 3, 8]', 'out = []', 'L.append(1); out.append(repr(L))', 'L.insert(0, 9); out.append(repr(L))', 'L.extend([2, 2]); out.append(repr(L))', 'L.remove(2); out.append(repr(L))', 'x = L.pop(); out.append(repr(L) + " (popped " + str(x) + ")")', 'L.sort(); out.append(repr(L))', 'print("\\n".join(out))');
const listSteps = pyOut(listCode).split('\n');
const vListMethods = table(
  ['Statement', 'List afterwards'],
  [ic('L.append(1)'), ic('L.insert(0, 9)'), ic('L.extend([2, 2])'), ic('L.remove(2)'), ic('L.pop()'), ic('L.sort()')].map((c, i) => [c, ic(listSteps[i])]),
  'Table of list methods applied in turn to the list 5, 3, 8, run in Python: append 1, insert 9 at the front, extend with two 2s, remove the first 2, pop the last item, and sort',
  'Starting list: L = [5, 3, 8].',
);
const vAlias = (() => {
  const s = new Svg(600, 200);
  s.rect(30, 30, 90, 40, { fill: 'fill', color: 'accent', sw: 1.5, rx: 6 });
  s.text(75, 50, 'L', { bold: true });
  s.rect(30, 120, 90, 40, { fill: 'fill', color: 'accent', sw: 1.5, rx: 6 });
  s.text(75, 140, 'M', { bold: true });
  s.rect(250, 70, 300, 50, { color: 'accent', sw: 2, rx: 4 });
  s.text(400, 95, '[10, 9, 2, 7, 5]', { size: 16 });
  s.arrow(120, 50, 245, 88, { color: 'accent', sw: 1.8 });
  s.arrow(120, 140, 245, 104, { color: 'accent', sw: 1.8 });
  s.text(400, 150, 'M = L: two names, one list', { size: 13, muted: true });
  s.text(400, 172, 'M = L[:] or L.copy() makes a new list', { size: 13, muted: true });
  return s.visual('Diagram of aliasing: two name boxes, L and M, both point by arrows to one list object holding 10, 9, 2, 7, 5; a note says that slicing or copy makes a separate list', 'Changing the list through one name is seen through the other.');
})();
const cMarksWE = code('marks = [72, 85, 64, 91, 58]', 'rows = []', 'top = marks[0]', 'for m in marks:', '    if m > top:', '        top = m', '    rows.append([m, top])', 'import json', 'print(json.dumps(rows))');
const vMarksTrace = table(
  ['m (current mark)', 'top after the if'],
  rowsOf(cMarksWE).map(([m, t]) => [String(m), String(t)]),
  'Trace table for finding the highest mark in 72, 85, 64, 91 and 58: top stays 72, becomes 85, stays 85, becomes 91 and stays 91',
  'Dry run produced by running the loop in Python.',
);
const tupleCalls = ['t[1]', 't[-1]', 't.count(3)', 't.index(8)', 't + (5,)', 'len(t)'];
const vTuple = table(
  ['Operation on `t = (3, 8, 3, 1)`', 'Result'],
  tupleCalls.map((c) => [ic(c), ic(pyOut(`t = (3, 8, 3, 1)\nprint(repr(${c}))`))]),
  'Table of tuple operations on 3, 8, 3, 1, run in Python: indexing, negative indexing, count of 3, index of 8, concatenation with a one-item tuple and length',
  'A one-item tuple needs a comma: (5,).',
);
const dictCode = code('d = {"ink": 12, "pen": 25}', 'out = []', 'd["pad"] = 40; out.append(repr(d))', 'd["ink"] = 15; out.append(repr(d))', 'out.append(repr(d.get("ruler", 0)))', 'del d["pen"]; out.append(repr(d))', 'out.append(repr(list(d.items())))', 'print("\\n".join(out))');
const dictSteps = pyOut(dictCode).split('\n');
const vDict = table(
  ['Statement', 'Result'],
  [ic('d["pad"] = 40'), ic('d["ink"] = 15'), ic('d.get("ruler", 0)'), ic('del d["pen"]'), ic('list(d.items())')].map((c, i) => [c, ic(dictSteps[i])]),
  'Table of dictionary operations starting from ink 12 and pen 25, run in Python: add pad, update ink, get a missing key with a default, delete pen, and list the items',
  'Starting dictionary: d = {"ink": 12, "pen": 25}.',
);
const cFreqWE = code('text = "red blue red green blue red"', 'freq = {}', 'rows = []', 'for w in text.split():', '    freq[w] = freq.get(w, 0) + 1', '    rows.append([w, repr(freq)])', 'import json', 'print(json.dumps(rows))');
const vFreqTrace = table(
  ['Word read', 'freq after the update'],
  rowsOf(cFreqWE).map(([w, f]) => [w, ic(f)]),
  'Trace table for counting words in red blue red green blue red: the dictionary grows as each word is read and ends with red 3, blue 2 and green 1',
  'Dry run produced by running the loop in Python.',
);
const vCompare = table(
  ['Feature', 'list', 'tuple', 'dict'],
  [
    ['Brackets', '`[ ]`', '`( )`', '`{key: value}`'],
    ['Mutable?', 'Yes', 'No', 'Yes'],
    ['Access by', 'index', 'index', 'key'],
    ['Duplicates', 'allowed', 'allowed', 'keys unique'],
    ['Can be a dict key?', 'No', 'Yes (if items immutable)', 'No'],
  ],
  'Comparison table of list, tuple and dictionary: brackets, mutability, access by index or key, duplicates and whether each can be a dictionary key',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Slicing `s[a:b:c]`', 'a included, b excluded, step c'],
    ['String methods', 'return new strings; strings never change'],
    ['append vs extend', 'one item vs each item'],
    ['`M = L`', 'alias (same list); `L[:]` or `L.copy()` copies'],
    ['Tuples', 'immutable, can be keys, `(5,)` for one item'],
    ['Dictionaries', 'keys unique and immutable; `get()` avoids KeyError'],
  ],
  'Summary table of Part 2: slicing rules, string methods, append versus extend, aliasing, tuples and dictionaries',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Python Revision Tour — Part 1: Tokens, Types, Operators and Flow of Control',
  goals: [
    'Identify tokens and data types, and tell mutable types from immutable ones',
    'Evaluate expressions using operator precedence, true and floor division and type conversion',
    'Trace and write programs with if, elif, else, for, while, break and continue',
  ],
  slides: [
    sl('title', 'Python Revision Tour', {
      b: 'Part 1 — the building blocks: **tokens**, **data types**, **operators**, **expressions** and **flow of control**.',
      v: vRoute1,
      n: 'Welcome to Class 12 Computer Science. Before we build bigger programs, we revise the Python you learnt in Class 11. In this first part we look at the smallest pieces of a program, the kinds of data Python handles, how expressions are worked out, and how a program decides and repeats. Keep a Python window open and try each example yourself.',
    }),
    sl('concept', 'Tokens: the smallest units', {
      b: 'Python reads a program as a stream of **tokens**.',
      v: vTokens,
      n: 'Python first breaks a program into tokens, the smallest meaningful pieces. Keywords are reserved words such as if and while. Identifiers are names that you choose; they cannot start with a digit and they are case-sensitive. Literals are fixed values such as numbers and strings. Operators act on values, and punctuators such as brackets, colons and commas organise the code.',
    }),
    sl('concept', 'Data types and mutability', {
      b: 'Every value has a **type**. A **mutable** object can be changed in place; an **immutable** one cannot.',
      v: vTypes,
      n: 'Python has numbers, booleans, strings, tuples, lists, dictionaries and the special value None. The important exam idea is mutability. Lists and dictionaries are mutable: you can change them in place. Numbers, strings and tuples are immutable: any change creates a brand new object. This decides, for example, which values can be dictionary keys.',
    }),
    sl('check', 'Quick check: an expression', {
      b: 'Predict the output, then check the answer.',
      chk: 'co_expr',
      n: 'Use what you know about floor division, remainder and the order of operations. Work it out on paper before you look at the answer.',
    }),
    sl('concept', 'Operators', {
      b: 'Arithmetic, relational, logical, identity, membership and assignment operators.',
      v: vOperators,
      n: 'Here are the operator families. Notice the three kinds of division: a single slash always gives a decimal answer, floor division drops down to a whole number, and the percent sign gives the remainder. Relational operators compare values. Logical operators combine conditions. The identity operator asks whether two names refer to the same object, and the membership operator asks whether a value is inside a sequence.',
    }),
    sl('concept', 'Operator precedence', {
      b: 'When an expression has several operators, Python follows this order.',
      v: vPrecedence,
      n: 'Precedence decides which operator acts first. Brackets come first, then the exponent operator, which is worked from right to left. Multiplication, the two kinds of division and the remainder share a level and work from left to right, followed by addition and subtraction. Comparisons come next, and then not, and, and or, in that order.',
    }),
    sl('example', 'Worked example 1: evaluating an expression', {
      b: `Evaluate step by step:\n\n${F(eExpr, 'print(x)')}`,
      v: vExprSteps,
      n: 'Let us evaluate this together. The exponent is done first, so three to the power two becomes nine. Then floor division and multiplication are taken from left to right: eighteen floor divided by four is four, and four times nine is thirty six. The remainder of thirty six divided by seven is one. Finally four plus one gives five, which is what Python prints.',
    }),
    sl('two-column', 'Division, signs and conversion', {
      cols: [
        `**Negative numbers**\n\n${F('print(-17 // 5)', 'print(-17 % 5)')}\n\nOutput: ${ic(pyOut('print(-17 // 5)'))} and ${ic(pyOut('print(-17 % 5)'))} — floor division rounds **down** to minus infinity.`,
        `**Conversion**\n\n${F('print(int("7") + 2)', 'print(float(9) / 2)', 'print(str(4) + "4")')}\n\nOutput: ${ic(pyOut('print(int("7") + 2)'))}, ${ic(pyOut('print(float(9) / 2)'))}, ${ic(pyOut('print(str(4) + "4")'))}.`,
      ],
      n: 'Two traps appear often in exams. With a negative number, floor division rounds down towards minus infinity, so minus seventeen floor divided by five is minus four, not minus three, and the remainder becomes three. Type conversion functions build new values: int turns a numeric string into a number, and str turns a number into text that can be joined to other text.',
    }),
    sl('concept', 'Conversion results to remember', {
      v: vIdentity,
      n: 'This table shows conversions that students often get wrong. The int function cuts off the decimal part instead of rounding. Multiplying a string repeats it. Any non-empty string, even the string zero, counts as True. A float anywhere in a floor division makes the answer a float. And True behaves like the number one in arithmetic.',
    }),
    sl('check', 'Quick check: booleans', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_bool_add',
      n: 'Think about what the value True means when Python does arithmetic with it.',
    }),
    sl('diagram', 'Decisions: if, elif, else', {
      b: F('if marks >= 90:', '    grade = "A1"', 'elif marks >= 75:', '    grade = "A2"', 'else:', '    grade = "B"'),
      v: vIfFlow,
      n: 'A program decides with if, elif and else. Python tests the if condition first. If it is true, that block runs and everything else in the statement is skipped. If not, each elif is tested in turn. If none is true, the else block runs. Only one block ever runs. Remember the colon at the end of each header and the indentation of each block.',
    }),
    sl('concept', 'The for loop and range()', {
      b: F('for k in range(3, 15, 4):', '    print(k, end=" ")'),
      v: vRange,
      n: 'A for loop goes through every item of a sequence. The range function produces numbers: it starts at the first value, stops before the second, and moves by the step. The stop value is never included. With a negative step, range counts down. A range whose start equals its stop produces nothing, so the loop body never runs.',
    }),
    sl('check', 'Quick check: range with a negative step', {
      b: 'Which list does this range produce?',
      chk: 'm_range_neg',
      n: 'Count down from the start in steps of three and stop before you reach the stop value.',
    }),
    sl('diagram', 'The while loop', {
      b: F('i = 1', 'while i < 50:', '    i *= 3'),
      v: vWhileFlow,
      n: 'A while loop repeats as long as its condition stays true. It needs three things: a variable set before the loop, a condition that is tested before every pass, and an update inside the body that eventually makes the condition false. Forget the update and the loop never ends. Use while when you do not know in advance how many passes you need.',
    }),
    sl('concept', 'break, continue, loop else and pass', {
      v: vJumps,
      n: 'Jump statements change the normal flow of a loop. Break leaves the innermost loop at once. Continue skips the rest of the current pass and moves to the next one. A loop can also have an else block, which runs only if the loop finishes without a break. Pass simply does nothing and is used as a placeholder.',
    }),
    sl('example', 'Worked example 2: reversing a number (dry run)', {
      b: F('n = 2607', 'r = 0', 'while n > 0:', '    r = r * 10 + n % 10', '    n //= 10', 'print(r)'),
      v: vRevTrace,
      n: 'A dry run means tracing a program by hand, line by line. Here the remainder by ten gives the last digit, which is attached to r, and floor division by ten removes that digit from n. Follow the table: r grows to seven, seventy, seven hundred and six, and finally seven thousand and sixty two, when n becomes zero and the loop stops.',
    }),
    sl('check', 'Quick check: choosing the range', {
      b: 'Fill in the blank.',
      chk: 'fb_range',
      n: 'Remember that range never includes its stop value.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1: a program is made of tokens. Lists and dictionaries are mutable; the other types here are not. Single slash division gives a decimal, floor division rounds down, and the exponent operator works from right to left. Range stops before its stop value. Break leaves a loop, and continue skips to the next pass.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Output questions: write the output **exactly** — spaces, brackets, quotes and line breaks all count.',
        'Do a **dry run** with a trace table for every loop; note the value of the loop variable after the loop ends.',
        'Watch `//` and `%` with negative numbers, `**` right to left, and `int()` truncating.',
        'Error-finding: look for a missing `:`, `=` used for `==`, wrong indentation, wrong case in names, and mixing `str` with `int`.',
        'Marks: 1 for each correct line of output or each error corrected; programs earn marks for input, logic and output.',
      ],
      n: 'Some advice for the exam. In output questions every character counts, so copy spacing and brackets carefully. Always dry run loops in a table. Be careful with floor division and remainder of negative numbers, and with the exponent operator. In error-finding questions, check colons, comparison operators, indentation and the spelling of names. Marks are given line by line.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Python Revision Tour — Part 2: Strings, Lists, Tuples and Dictionaries',
  goals: [
    'Index and slice strings and use string methods',
    'Use list methods and explain aliasing and copying',
    'Use tuples and dictionaries and choose the right structure for a task',
  ],
  slides: [
    sl('title', 'Strings, lists, tuples and dictionaries', {
      b: 'Part 2 — the four **collection** types and their built-in methods.',
      v: vRoute2,
      n: 'In Part 2 we revise the four ways Python stores collections of values: strings, lists, tuples and dictionaries. For each one we will see how to reach individual items, which built-in methods are useful, and whether the object can be changed. Board papers ask many output questions on these, so we will run every example.',
    }),
    sl('diagram', 'Indexing a string', {
      b: 'Each character has a **positive** index from the left and a **negative** index from the right.',
      v: vIndex,
      n: 'A string is an ordered sequence of characters. Positions are counted from zero at the left, so the first character is at index zero. You can also count from the right using negative indexes, where minus one is the last character. Asking for an index that does not exist stops the program with an index error.',
    }),
    sl('concept', 'Slicing', {
      b: 'A slice `s[start:stop:step]` takes characters from start up to, but not including, stop.',
      v: vSlices,
      n: 'A slice takes a part of a sequence. Write the start, the stop and an optional step, separated by colons. The start is included and the stop is not. Leaving out the start means from the beginning, and leaving out the stop means to the end. A step of minus one walks backwards, which is the quickest way to reverse a string.',
    }),
    sl('concept', 'String methods', {
      v: vStrMethods,
      n: 'Strings come with many methods. Upper and title change case, count and find search, replace swaps text, split breaks a string into a list of words, and join does the opposite. Strip removes spaces at both ends. Methods whose names begin with is return True or False. None of them changes the original string: each returns a new value.',
    }),
    sl('check', 'Quick check: do methods change strings?', {
      b: 'True or false?',
      chk: 'tf_upper',
      n: 'Recall that strings are immutable. What does the upper method actually do?',
    }),
    sl('concept', 'Lists and their methods', {
      b: 'A list is an ordered, **mutable** collection in square brackets.',
      v: vListMethods,
      n: 'A list can hold any values and can be changed in place. Append adds one item at the end, insert adds an item at a chosen position, and extend adds every item of another list. Remove deletes the first matching value, pop deletes by position and gives the item back, and sort arranges the list in order. Follow the list as it changes in the table.',
    }),
    sl('diagram', 'Aliasing and copying', {
      b: F('L = [4, 9, 2, 7]', 'M = L          # alias: same list', 'M.append(5)', 'L[0] = 10', 'print(L is M)'),
      v: vAlias,
      n: 'Assigning a list to a second name does not copy it. Both names now refer to the same list object, so a change through either name is seen through the other. This is called aliasing, and it is a favourite exam trap. To get an independent copy, use a full slice or the copy method.',
    }),
    sl('example', 'Worked example 3: highest mark in a list', {
      b: F('marks = [72, 85, 64, 91, 58]', 'top = marks[0]', 'for m in marks:', '    if m > top:', '        top = m', `print(top)    # ${pyOut('marks = [72, 85, 64, 91, 58]\ntop = marks[0]\nfor m in marks:\n    if m > top:\n        top = m\nprint(top)')}`),
      v: vMarksTrace,
      n: 'Here is a classic list program: finding the highest mark without using the max function. We start by assuming the first mark is the highest. Then we look at each mark in turn, and whenever we find a bigger one, we update top. The trace table shows top changing only twice, at eighty five and at ninety one.',
    }),
    sl('check', 'Quick check: adding a whole list', {
      b: 'Choose the correct method.',
      chk: 'm_extend',
      n: 'One method adds a list as a single item; another adds its items one by one. Which is which?',
    }),
    sl('concept', 'Tuples', {
      b: 'A tuple is an ordered, **immutable** collection in round brackets.',
      v: vTuple,
      n: 'A tuple is like a list that cannot be changed. You can index it, slice it, count items and find their positions, and join tuples to make new ones. Because tuples cannot change, they are safe for fixed data such as the days of the week, and they can be used as dictionary keys. A tuple with one item needs a trailing comma.',
    }),
    sl('check', 'Quick check: tuple unpacking', {
      b: 'Predict the output.',
      chk: 'co_unpack',
      n: 'Unpacking assigns each item of a tuple to a separate name, in order.',
    }),
    sl('concept', 'Dictionaries', {
      b: 'A dictionary stores **key: value** pairs in braces; keys are unique and immutable.',
      v: vDict,
      n: 'A dictionary maps keys to values, like item names to prices. Assigning to a new key adds a pair, and assigning to an existing key changes its value. Asking for a missing key with square brackets raises a key error, but the get method returns a default instead. Del removes a pair, and items gives all the pairs for a loop.',
    }),
    sl('example', 'Worked example 4: counting words with a dictionary', {
      b: F('text = "red blue red green blue red"', 'freq = {}', 'for w in text.split():', '    freq[w] = freq.get(w, 0) + 1', 'print(freq)'),
      v: vFreqTrace,
      n: 'This pattern counts how often each word appears. For every word, get returns its count so far, or zero if the word is new, and we store that count plus one. Follow the table: the dictionary grows as new words appear, and the counts rise as words repeat. The final dictionary keeps the words in the order they first appeared.',
    }),
    sl('check', 'Quick check: a built-in function', {
      b: 'Fill in the blank.',
      chk: 'fb_len',
      n: 'This one function works on strings, lists, tuples and dictionaries alike.',
    }),
    sl('concept', 'Choosing a structure', {
      v: vCompare,
      n: 'How do you choose? Use a list when items are in order and may change, such as marks being entered. Use a tuple for fixed data that must not change. Use a dictionary when you look things up by a key, such as a price by item name or a name by roll number. Remember that only immutable values can be keys.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2: slices include the start and exclude the stop. String methods return new strings. Append adds one item, extend adds each item. Assigning a list to a new name makes an alias, not a copy. Tuples are immutable and can be keys. Dictionary keys are unique, and get avoids a key error.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Print a list or dictionary **exactly** as Python does: `[1, 2]`, `{\'a\': 1}`, with spaces after commas.',
        'Strings are immutable: `s[0] = "X"` is an error, and `s.upper()` alone changes nothing.',
        '`M = L` is an alias; check whether a question copies (`L[:]`, `L.copy()`) or aliases.',
        '`d[key]` on a missing key is a **KeyError**; `d.get(key, default)` is not.',
        'In programs, state the input you assume and show the output for it.',
      ],
      n: 'For the exam, copy Python output exactly, including brackets, quotes and the spaces after commas. Remember that strings cannot be changed in place, and that calling a string method alone changes nothing. Check carefully whether a list is copied or only aliased. A missing key with square brackets is an error, but get is safe. In program questions, show a sample input and its output.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Python Revision Tour — Notes',
  sections: [
    {
      h: '1. Tokens and data types',
      t: 1,
      b: `A program is made of **tokens**: keywords (\`if\`, \`while\`, \`True\`), identifiers (names you choose: letters, digits and _ but not starting with a digit; case-sensitive), literals (\`25\`, \`3.75\`, \`"Agra"\`), operators and punctuators.\n\n**Types:** \`int\`, \`float\`, \`complex\`, \`bool\`, \`str\`, \`list\`, \`tuple\`, \`dict\`, \`None\`. Use \`type(x)\` to check.\n\n**Mutable** (can change in place): list, dict. **Immutable**: numbers, bool, str, tuple.\n\n${F('t = (4, 6, 8)', 't[0] = 5')}\n\nraises ${ic(pyErr('t = (4, 6, 8)\nt[0] = 5'))}.`,
      terms: [
        ['Token', 'The smallest meaningful unit of a program: keyword, identifier, literal, operator or punctuator.'],
        ['Mutable', 'An object that can be changed in place after creation (list, dict).'],
        ['Immutable', 'An object that cannot be changed in place (int, float, str, tuple).'],
      ],
      v: vTokens,
      vs: [vTypes],
    },
    {
      h: '2. Operators and expressions',
      t: 1,
      b: `**Arithmetic:** \`/\` always gives a float; \`//\` floors towards minus infinity; \`%\` takes the sign of the divisor; \`**\` is right-associative.\n\n${F('print(-17 // 5, -17 % 5)', 'print(2 ** 3 ** 2)', 'print(10 / 4, 10 // 4)')}\n\nOutput:\n\n${F(pyOut('print(-17 // 5, -17 % 5)\nprint(2 ** 3 ** 2)\nprint(10 / 4, 10 // 4)'))}\n\n**Logical operators** return one of their operands: \`0 or 7\` gives ${ic(pyOut('print(0 or 7)'))}; \`not\` > \`and\` > \`or\` in priority. **Identity** (\`is\`) compares objects; **equality** (\`==\`) compares values. **Conversion:** \`int()\` truncates, \`str()\` makes text, \`float()\` makes a decimal.`,
      terms: [
        ['Floor division', 'The // operator: divides and rounds down to the nearest whole number (towards minus infinity).'],
        ['Precedence', 'The order in which operators in an expression are applied.'],
        ['Short-circuit evaluation', 'and/or stop as soon as the result is known and return the operand that decided it.'],
      ],
      v: vPrecedence,
      vs: [vOperators, vIdentity],
    },
    {
      h: '3. Flow of control',
      t: 2,
      b: `**Selection:** \`if … elif … else\` — exactly one block runs. **Iteration:** \`for\` goes through a sequence; \`range(start, stop, step)\` stops **before** stop. \`while\` repeats while a condition is True; the body must update the variable.\n\n**Jumps:** \`break\` leaves the innermost loop; \`continue\` skips to the next pass; a loop \`else\` runs only when there was no break; \`pass\` does nothing.\n\n${F('for n in [9, 15, 21]:', '    if n % 7 == 0:', '        print("found", n)', '        break', 'else:', '    print("none")')}\n\nOutput: ${ic(pyOut('for n in [9, 15, 21]:\n    if n % 7 == 0:\n        print("found", n)\n        break\nelse:\n    print("none")'))}`,
      terms: [
        ['Dry run', 'Tracing a program by hand, recording variable values after each step in a trace table.'],
        ['Infinite loop', 'A loop whose condition never becomes False, usually because the update is missing.'],
        ['Loop else', 'An else block after a loop that runs only if the loop ends without break.'],
      ],
      v: vIfFlow,
      vs: [vRange, vWhileFlow, vJumps, vRevTrace],
    },
    {
      h: '4. Strings',
      t: 3,
      b: `A string is an immutable sequence of characters. **Indexing:** \`s[0]\` first, \`s[-1]\` last. **Slicing:** \`s[a:b:c]\` (a included, b excluded, step c); \`s[::-1]\` reverses.\n\n**Methods** (all return new values): \`upper()\`, \`lower()\`, \`title()\`, \`capitalize()\`, \`count()\`, \`find()\` (−1 if absent), \`replace()\`, \`split()\`, \`join()\`, \`strip()\`, \`isalpha()\`, \`isdigit()\`, \`isalnum()\`.\n\n${F('s = "chai"', 's.upper()', 'print(s, s.upper())')}\n\nOutput: ${ic(pyOut('s = "chai"\ns.upper()\nprint(s, s.upper())'))} — the first call's result was thrown away.`,
      terms: [
        ['Slice', 'A part of a sequence taken with [start:stop:step]; start included, stop excluded.'],
        ['find()', 'Returns the index of the first occurrence of a substring, or −1 if it is not found.'],
      ],
      v: vIndex,
      vs: [vSlices, vStrMethods],
    },
    {
      h: '5. Lists and tuples',
      t: 3,
      b: `**Lists** are mutable: \`append()\`, \`insert()\`, \`extend()\`, \`remove()\`, \`pop()\`, \`sort()\`, \`reverse()\`, \`index()\`, \`count()\`; slice assignment \`L[1:4] = [0]\` replaces a part.\n\n**Aliasing:** \`M = L\` gives a second name for the same list; \`L[:]\` or \`L.copy()\` makes a new list.\n\n${F('L = [1, 2, 3]', 'M = L', 'N = L[:]', 'L.append(4)', 'print(M, N)')}\n\nOutput: ${ic(pyOut('L = [1, 2, 3]\nM = L\nN = L[:]\nL.append(4)\nprint(M, N)'))}\n\n**Tuples** are immutable: indexing, slicing, \`count()\`, \`index()\`, \`+\` and \`*\` make new tuples; one item needs a comma, \`(5,)\`; unpacking: \`a, b = (1, 2)\`.`,
      terms: [
        ['Aliasing', 'Two or more names referring to the same mutable object, so a change through one is seen through all.'],
        ['Tuple unpacking', 'Assigning the items of a tuple to the same number of names in one statement.'],
      ],
      v: vListMethods,
      vs: [vAlias, vMarksTrace, vTuple],
    },
    {
      h: '6. Dictionaries',
      t: 3,
      b: `A dictionary holds **key: value** pairs; keys are unique and must be immutable (numbers, strings, tuples). \`d[k] = v\` adds or updates; \`d[k]\` on a missing key raises **KeyError**; \`d.get(k, default)\` does not. Methods: \`keys()\`, \`values()\`, \`items()\`, \`update()\`, \`pop()\`, \`len()\`; \`del d[k]\` removes a pair. A for loop over a dictionary goes through its **keys** in insertion order.\n\n${F('stock = {"rice": 40, "dal": 15}', 'stock.update({"oil": 8, "dal": 20})', 'print(stock)')}\n\nOutput: ${ic(pyOut('stock = {"rice": 40, "dal": 15}\nstock.update({"oil": 8, "dal": 20})\nprint(stock)'))}`,
      terms: [
        ['Key', 'The unique, immutable label used to look up a value in a dictionary.'],
        ['KeyError', 'The error raised when a dictionary is indexed with a key it does not contain.'],
      ],
      v: vDict,
      vs: [vFreqTrace, vCompare],
    },
  ],
  tips: '**Common mistakes**\n- Writing `-17 // 5` as -3: floor division rounds **down**, giving -4.\n- Working `2 ** 3 ** 2` left to right: it is `2 ** 9`.\n- Thinking `s.upper()` changes s, or that `M = L` copies a list.\n- Forgetting that `range(1, 10)` stops at 9.\n- Printing lists or dictionaries without the exact brackets, quotes and spaces Python uses.\n- Missing `:` after `if`, `for`, `while`, `def`; using `=` in place of `==`.\n\n**How marks are usually awarded**\n- Output questions: marks for each correct line or value, as stated; the format must match.\n- Error-finding: ½ or 1 mark for each error found **and** corrected.\n- Programs: marks for input, correct logic, and the output; any correct method earns full marks.\n- Theory (2–3 marks): one point per mark, with a short code example where it helps.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a **token**?', 'The smallest meaningful unit of a program: keyword, identifier, literal, operator or punctuator.', 'definition', 1],
  ['Can an identifier start with a digit?', '**No.** It may start with a letter or `_`; names are case-sensitive.', 'fact', 1],
  ['Two **mutable** types', '`list` and `dict`.', 'fact', 1],
  ['Four **immutable** types', '`int`, `float`, `str`, `tuple` (also `bool`).', 'fact', 1],
  [`${ic('-17 // 5')} and ${ic('-17 % 5')}`, `${ic(pyOut('print(-17 // 5)'))} and ${ic(pyOut('print(-17 % 5)'))}: floor division rounds towards minus infinity.`, 'example', 1],
  [ic('2 ** 3 ** 2'), `${ic(pyOut('print(2 ** 3 ** 2)'))}: ** is right-associative (2 ** 9).`, 'example', 1],
  ['`/` vs `//`', '`/` always gives a float; `//` gives the floor (a float only if an operand is a float).', 'concept', 1],
  ['`is` vs `==`', '`is` tests the **same object**; `==` tests **equal values**.', 'concept', 1],
  [ic('int(3.9)'), `${ic(pyOut('print(int(3.9))'))}: int() truncates, it does not round.`, 'example', 1],
  [ic('bool("0")'), `${ic(pyOut('print(bool("0"))'))}: any non-empty string is truthy.`, 'exam-tip', 1],
  ['Priority of logical operators', '`not` first, then `and`, then `or`.', 'fact', 1],
  ['In an if-elif-else, how many blocks run?', '**Exactly one.**', 'concept', 2],
  [ic('list(range(10, 0, -3))'), ic(pyOut('print(list(range(10, 0, -3)))')), 'example', 2],
  ['Does `range(a, b)` include b?', '**No**, it stops before b.', 'exam-tip', 2],
  ['`break` vs `continue`', '`break` leaves the innermost loop; `continue` skips to the next pass.', 'concept', 2],
  ['When does a loop `else` run?', 'Only when the loop ends **without** a break.', 'concept', 2],
  ['Three parts of a `while` loop', 'Initialise, test the condition, update inside the body.', 'concept', 2],
  ['What is a **dry run**?', 'Tracing a program by hand with a table of variable values.', 'definition', 2],
  [`${ic('s = "MONSOON"')}: ${ic('s[-2]')}`, ic(pyOut('print("MONSOON"[-2])')), 'example', 3],
  ['Reverse a string `s`', '`s[::-1]`', 'fact', 3],
  ['`find()` when not found', `Returns ${ic(pyOut('print("abc".find("z"))'))}.`, 'fact', 3],
  ['Does `s.upper()` change s?', '**No.** Strings are immutable; it returns a new string.', 'exam-tip', 3],
  ['`append` vs `extend`', '`append` adds one item (even a list); `extend` adds each item.', 'concept', 3],
  ['`remove(x)` vs `pop(i)`', '`remove` deletes by **value**; `pop` deletes by **index** and returns the item.', 'concept', 3],
  ['What does `M = L` do for a list?', 'Makes an **alias**: both names refer to the same list.', 'concept', 3],
  ['Two ways to copy a list', '`L[:]` and `L.copy()` (also `list(L)`).', 'fact', 3],
  ['Tuple with one item', '`(5,)` — the comma makes it a tuple.', 'fact', 3],
  ['Which values can be dictionary keys?', 'Immutable ones: numbers, strings, tuples (of immutable items).', 'concept', 3],
  ['`d["x"]` vs `d.get("x", 0)` for a missing key', 'The first raises **KeyError**; the second returns 0.', 'concept', 3],
  ['Looping over a dictionary gives…', 'Its **keys**, in insertion order (use `items()` for pairs).', 'fact', 3],
]);

// ---------------------------------------------------------------- tests (cbse-12-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Python Revision Tour',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_identifier', 'm_slice', 'm_while_count', 'ar_precedence'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words (or code) and the 3-mark question in about 60 words (or code).', items: ['s_mut_immut', 's_err_key', 's3_evaluate'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions. Show a sample input and its output.', items: [{ attempt: 1, keys: ['l_prime', 'l_vowels'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_canteen'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Python Revision Tour',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_mutable', 'm_floor_neg', 'm_power_assoc', 'm_logic', 'm_if_elif', 'm_break_continue', 'm_alias', 'm_dict_ops', 'ar_tuple', 'ar_copy'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words (or code) and 3-mark questions in about 60 words (or code).', items: ['s_for_while', 's_list_tuple', { attempt: 1, keys: ['s_err_concat', 's_err_if'] }, 's3_trace', { attempt: 1, keys: ['s3_dict_ops', 's3_err_initials'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18. Show the output for the input given.', items: ['l_marks_list', { attempt: 1, keys: ['l_digits', 'l_dict_bill'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_library', 'cb_scores'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-computer-science-ch01 only (tokens, types, operators and expressions; flow of control; strings, lists, tuples and dictionaries)',
    originality: 'every program, scenario and data value written for this chapter by SOYL; no textbook, NCERT or board-paper program reused (D-036)',
    execution: 'every output in items, slides, notes and flashcards produced by running the code with Python 3 (runPy in lib.mjs); results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
