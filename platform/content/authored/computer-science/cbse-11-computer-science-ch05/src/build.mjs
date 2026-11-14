// Build CBSE 11 Computer Science ch05 Strings. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-11-computer-science-ch05/src/build.mjs
// Every output, trace table, count and error message shown in decks, notes and flashcards is produced by running the
// Python program with pyOut()/pyErr() (recorded in src/py-cache.json); nothing is typed by hand.
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, setAuthor, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache, pyOut, pyErr } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-11-computer-science-ch05', 'computer-science');
setAuthor('claude-sonnet-5-5 (writer; reviewed by the subject-producer)');
usePyCache(SRC);
const { F, code, ic, val, rv, outRows } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const wordsOf = (s) => s.trim().split(/\s+/).length;
/** Rows of [expression, repr of value] for expressions evaluated after a setup line. */
const evalRows = (setup, exprs) => exprs.map((e) => ['`' + e + '`', '`' + pyOut(`${setup}\nprint(repr(${e}))`) + '`']);
const bt = (s) => '`' + s + '`';

// ---------------------------------------------------------------- Part 1 visuals
const IDX = 'SUNRISE';
const idxInfo = JSON.parse(pyOut(`import json\ns = "${IDX}"\nassert all(s[i] == s[i - len(s)] for i in range(len(s)))\nprint(json.dumps([[s[i], i, i - len(s)] for i in range(len(s))]))`));
const vIndexSvg = (() => {
  const s = new Svg(470, 170);
  const x0 = 70;
  s.text(30, 40, 'index', { size: 12, anchor: 'middle', color: 'accent', bold: true });
  s.text(30, 128, 'negative', { size: 12, anchor: 'middle', color: 'accent', bold: true });
  idxInfo.forEach(([ch, i, n], k) => {
    const x = x0 + k * 52;
    s.rect(x, 62, 46, 40, { fill: 'fill', color: 'accent', sw: 1.6, rx: 4 });
    s.text(x + 23, 82, ch, { size: 18, bold: true });
    s.text(x + 23, 40, String(i), { size: 14 });
    s.text(x + 23, 128, String(n), { size: 14 });
  });
  s.text(235, 156, 'len = ' + idxInfo.length, { size: 13, muted: true });
  return s.visual(`The string ${IDX} drawn as seven boxes: the letters ${idxInfo.map((r) => r[0]).join(', ')} with positive indexes ${idxInfo.map((r) => r[1]).join(', ')} above them and negative indexes ${idxInfo.map((r) => r[2]).join(', ')} below them`, 'Each character has a positive index counted from the left and a negative index counted from the right.');
})();
const vRoute1 = flow('LR', ['What a string is', 'Indexing', 'Join, repeat, in', 'Slicing', 'Immutability and loops'], 'Route map of Part 1: what a string is, indexing, concatenation and repetition and membership, slicing, immutability and traversal', 'Part 1 at a glance');
const litRows = [['"SOYL"', '"SOYL"'], ["'Class 11'", "'Class 11'"], ['""', '""'], ['"7"', '"7"']];
const vLit = table(
  ['Literal', 'len()', 'type'],
  litRows.map(([l, e]) => [bt(l), val(`len(${e})`), bt(val(`type(${e}).__name__`))]),
  `Table of four string literals with their length and type: ${litRows.map(([l, e]) => `${l} has length ${val(`len(${e})`)} and type ${val(`type(${e}).__name__`)}`).join('; ')}`,
  'A digit in quotes is still a string; the empty string has length 0.',
);
const idxExprs = ['s[0]', 's[3]', 's[-1]', 's[-4]', 's[len(s) - 1]'];
const idxSetup = `s = "${IDX}"`;
const vIdxTable = table(
  ['Expression (s is SUNRISE)', 'Value'],
  [...evalRows(idxSetup, idxExprs), ['`s[7]`', bt(pyErr(`${idxSetup}\nprint(s[7])`))]],
  `Table of indexing expressions on the string ${IDX}: ${idxExprs.map((e) => `${e} gives ${pyOut(`${idxSetup}\nprint(${e})`)}`).join('; ')}; the index 7 is out of range and Python reports ${pyErr(`${idxSetup}\nprint(s[7])`)}`,
  'Index 7 does not exist because the valid indexes are 0 to 6.',
);
const catOk = ['"Sun" + "rise"', '"Row " + "5"', '"ha" * 3', '3 * "-"'];
const vCat = table(
  ['Expression', 'Value or error'],
  [...catOk.map((e) => [bt(e), bt(pyOut(`print(repr(${e}))`))]), ['`"Row " + 5`', bt(pyErr('print("Row " + 5)'))]],
  `Table of concatenation and repetition: ${catOk.map((e) => `${e} gives ${pyOut(`print(repr(${e}))`)}`).join('; ')}; joining a string and an integer gives ${pyErr('print("Row " + 5)')}`,
  'Both operators build new strings; + needs two strings.',
);
const memSetup = 's = "Sunrise Cafe"';
const memExprs = ['"Sun" in s', '"sun" in s', '"ise C" in s', '"Sun" not in s', '"" in s'];
const vMem = table(
  ['Test (s is Sunrise Cafe)', 'Value'],
  memExprs.map((e) => [bt(e), bt(pyOut(`${memSetup}\nprint(${e})`))]),
  `Table of membership tests on Sunrise Cafe: ${memExprs.map((e) => `${e} is ${pyOut(`${memSetup}\nprint(${e})`)}`).join('; ')}`,
  'The test is case sensitive and looks for the characters together, in order.',
);
const slS = 's = "SUNRISE"';
const slExprs = [['1:4', 's[1:4]'], [':3', 's[:3]'], ['4:', 's[4:]'], ['2:2', 's[2:2]'], ['-4:-1', 's[-4:-1]'], ['3:99', 's[3:99]']];
const slIdx = (a) => pyOut(`print(", ".join(str(i) for i in range(7)[${a}]) or "none")`);
const sliceRows = (list) => table(
  ['Slice', 'Indexes taken', 'Result'],
  list.map(([a, e]) => [bt(e), slIdx(a), bt(pyOut(`${slS}\nprint(repr(${e}))`))]),
  `Table of slices of SUNRISE: ${list.map(([a, e]) => `${e} takes indexes ${slIdx(a)} and gives ${pyOut(`${slS}\nprint(repr(${e}))`)}`).join('; ')}`,
  'The start index is included and the stop index is not.',
);
const vSlice = sliceRows(slExprs);
const stExprs = [['::2', 's[::2]'], ['1::2', 's[1::2]'], ['::-1', 's[::-1]'], ['5:1:-2', 's[5:1:-2]'], ['-1:-4:-1', 's[-1:-4:-1]']];
const vStep = sliceRows(stExprs);
const bkSrc = code('bk = "BK-2025-0417"', 'print(bk[:2])', 'print(bk[3:7])', 'print(bk[8:])', 'print(int(bk[8:]) + 1)');
const bkOut = pyOut(bkSrc).split('\n');
const vBk = table(
  ['Statement', 'Printed'],
  [['`bk[:2]`', bkOut[0]], ['`bk[3:7]`', bkOut[1]], ['`bk[8:]`', bkOut[2]], ['`int(bk[8:]) + 1`', bkOut[3]]].map(([a, b]) => [a, bt(b)]),
  `Table of the book-code program: the four statements print ${bkOut.join(', ')}`,
  'Slices cut the fixed-width code; int() turns the serial into a number.',
);
const immSetup = 's = "SUNRISE"';
const vImm = table(
  ['Statement', 'What happens'],
  [
    ['`s[0] = "T"`', bt(pyErr(`${immSetup}\ns[0] = "T"`))],
    ['`s = "T" + s[1:]`', 'Works: s now holds ' + bt(pyOut(`${immSetup}\ns = "T" + s[1:]\nprint(s)`))],
    ['`s.lower()` on its own line', 'The original still holds ' + bt(pyOut(`${immSetup}\ns.lower()\nprint(s)`))],
    ['`s = s.lower()`', 'Stored back: s now holds ' + bt(pyOut(`${immSetup}\ns = s.lower()\nprint(s)`))],
  ],
  'Table of four statements on a string: assigning to an index gives a type error; building a new string with a slice works; a method result that is not stored leaves the original unchanged; storing the result back changes what the variable holds',
  'Strings are immutable: operations build new strings.',
);
const vLoops = table(
  ['Loop', 'Gives you', 'Output for ZEBRA'],
  [
    ['`for ch in s:`', 'each character', bt(pyOut('s = "ZEBRA"\nr = ""\nfor ch in s:\n    r = r + ch + " "\nprint(r.strip())'))],
    ['`for i in range(len(s)):`', 'each index; use `s[i]`', bt(pyOut('s = "ZEBRA"\nr = ""\nfor i in range(len(s)):\n    r = r + str(i) + s[i] + " "\nprint(r.strip())'))],
    ['`while i < len(s):`', 'an index you must update', bt(pyOut('s = "ZEBRA"\ni = 0\nr = ""\nwhile i < len(s):\n    r = r + s[i] + " "\n    i = i + 1\nprint(r.strip())'))],
  ],
  'Table of three ways to traverse the string ZEBRA: a for loop over the characters, a for loop over the indexes, and a while loop with an index that is updated; each visits every character',
  'The output column shows each loop visiting every character.',
);
const vowSrc = code('word = "Rainfall"', 'count = 0', 'for ch in word:', '    if ch.lower() in "aeiou":', '        count += 1', '    print(ch, count)');
const vowRows = outRows(vowSrc);
const vVowel = table(
  ['ch', 'count after the pass'],
  vowRows,
  `Trace table of counting the vowels of Rainfall: the count after each character is ${vowRows.map((r) => r[1]).join(', ')}; the last row gives the answer ${vowRows.at(-1)[1]}`,
  'The count grows only on a vowel.',
);
const errRows = [
  ['Index beyond the length', 'print("Pune"[4])'],
  ['Assigning to an index', 's = "Pune"\ns[0] = "T"'],
  ['Joining a string and a number', 'print("Pune" + 4)'],
  ['Subtracting strings', 'print("Pune" - "e")'],
  ['Missing closing quote', 'print("Pune)'],
];
const vErr1 = table(
  ['Mistake', 'What Python reports'],
  errRows.map(([m, c]) => [m, bt(pyErr(c))]),
  'Table of five common string mistakes and the error line Python reports for each: an index beyond the length, assigning to an index, joining a string and a number, subtracting strings and a missing closing quote',
  'Each error line comes from running the faulty statement.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['String', 'an immutable sequence of characters; len() counts them'],
    ['Index', '0 to len - 1 from the left, -1 to -len from the right'],
    ['+ and *', 'concatenate and repeat; both build new strings'],
    ['in / not in', 'substring test, case sensitive'],
    ['Slice', 's[start:stop:step]; stop excluded; [::-1] reverses'],
    ['Traversal', 'for ch in s, or for i in range(len(s)) with s[i]'],
  ],
  'Summary table of Part 1: string, index, plus and star, in and not in, slice and traversal',
);

// ---------------------------------------------------------------- Part 2 visuals
const vRoute2 = flow('LR', ['Change case', 'Search and count', 'Test characters', 'Strip and replace', 'Split, join, partition', 'Programs'], 'Route map of Part 2: change case, search and count, test characters, strip and replace, split join and partition, and complete programs', 'Part 2 at a glance');
const csSetup = 's = "gOa BEACH tRIP"';
const csM = ['upper()', 'lower()', 'capitalize()', 'title()'];
const vCase = table(
  ['Method (s is gOa BEACH tRIP)', 'Result'],
  csM.map((m) => ['`s.' + m + '`', bt(pyOut(`${csSetup}\nprint(repr(s.${m}))`))]),
  `Table of four case methods on gOa BEACH tRIP: ${csM.map((m) => `${m} gives ${pyOut(`${csSetup}\nprint(s.${m})`)}`).join('; ')}`,
  'Every method returns a new string; s itself is unchanged.',
);
const cfSetup = 's = "sweet sweet home"';
const cfExprs = ['s.count("sweet")', 's.count("e")', 's.find("sweet")', 's.find("sweet", 1)', 's.find("z")', 's.index("home")'];
const vFind = table(
  ['Call (s is sweet sweet home)', 'Value'],
  [...cfExprs.map((e) => [bt(e), bt(pyOut(`${cfSetup}\nprint(${e})`))]), ['`s.index("z")`', bt(pyErr(`${cfSetup}\nprint(s.index("z"))`))]],
  `Table of count, find and index on the string sweet sweet home: ${cfExprs.map((e) => `${e} gives ${pyOut(`${cfSetup}\nprint(${e})`)}`).join('; ')}; index of an absent substring gives ${pyErr(`${cfSetup}\nprint(s.index("z"))`)}`,
  'find() returns -1 when there is no match; index() stops with an error.',
);
const swSetup = 'f = "report_final.pdf"';
const swExprs = ['f.startswith("report")', 'f.startswith("final")', 'f.endswith(".pdf")', 'f.endswith(".PDF")', 'f.startswith("")'];
const vStarts = table(
  ['Call (f is report_final.pdf)', 'Value'],
  swExprs.map((e) => [bt(e), bt(pyOut(`${swSetup}\nprint(${e})`))]),
  `Table of startswith and endswith on report_final.pdf: ${swExprs.map((e) => `${e} is ${pyOut(`${swSetup}\nprint(${e})`)}`).join('; ')}`,
  'Both are case sensitive.',
);
const tests6 = ['isalpha()', 'isdigit()', 'isalnum()', 'islower()', 'isupper()', 'isspace()'];
const testStrs = ['"Goa"', '"goa2"', '"2024"', '"GOA"', '"  "', '""'];
const vTests = table(
  ['String', ...tests6],
  testStrs.map((x) => [bt(x), ...tests6.map((t) => pyOut(`print(${x}.${t})`))]),
  `Table of six test methods on six strings: ${testStrs.map((x) => `${x} gives ${tests6.map((t) => pyOut(`print(${x}.${t})`)).join(', ')}`).join('; ')} for ${tests6.join(', ')} in that order`,
  'Every test is False for the empty string.',
);
const stripExprs = ['"  tea time  ".strip()', '"  tea time  ".lstrip()', '"  tea time  ".rstrip()', '"**sale**".strip("*")', '"**sale**".strip()'];
const vStrip = table(
  ['Call', 'Result', 'len()'],
  stripExprs.map((e) => [bt(e), bt(pyOut(`print(repr(${e}))`)), val(`len(${e})`)]),
  `Table of strip, lstrip and rstrip: ${stripExprs.map((e) => `${e} gives ${pyOut(`print(repr(${e}))`)}`).join('; ')}`,
  'Spaces inside the string are never removed by these methods.',
);
const rpSetup = 's = "tea time"';
const rpExprs = ['s.replace("t", "T")', 's.replace("t", "T", 1)', 's.replace("tea", "coffee")', 's.replace("x", "y")', 's.replace(" ", "")', 's'];
const vReplace = table(
  ['Call (s is tea time)', 'Value'],
  rpExprs.map((e) => [bt(e), bt(pyOut(`${rpSetup}\nprint(repr(${e}))`))]),
  `Table of replace calls on tea time: ${rpExprs.map((e) => `${e} gives ${pyOut(`${rpSetup}\nprint(repr(${e}))`)}`).join('; ')}`,
  'The last row shows that s itself never changes.',
);
const sjExprs = [
  ['"pen,pencil,eraser".split(",")', 'print("pen,pencil,eraser".split(","))'],
  ['"a  b".split()', 'print("a  b".split())'],
  ['"a  b".split(" ")', 'print("a  b".split(" "))'],
  ['len("pen,pencil,eraser".split(","))', 'print(len("pen,pencil,eraser".split(",")))'],
  ['"-".join("pen,pencil,eraser".split(","))', 'print("-".join("pen,pencil,eraser".split(",")))'],
];
const vSplit = table(
  ['Expression', 'Value'],
  sjExprs.map(([e, c]) => [bt(e), bt(pyOut(c))]),
  `Table of split and join: ${sjExprs.map(([e, c]) => `${e} gives ${pyOut(c)}`).join('; ')}`,
  'split() gives a list of strings; join() builds one string again.',
);
const ptExprs = ['"key=value=more".partition("=")', '"key=value=more".partition(":")', '"2025-11-14".partition("-")'];
const vPart = table(
  ['Call', 'Three parts'],
  ptExprs.map((e) => [bt(e), bt(pyOut(`print(${e})`))]),
  `Table of partition: ${ptExprs.map((e) => `${e} gives ${pyOut(`print(${e})`)}`).join('; ')}`,
  'Always three parts: before, the separator, after. If the separator is missing, the last two are empty.',
);
const palSrc = code('s = "radar"', 'if s == s[::-1]:', '    print("Palindrome")', 'else:', '    print("Not a palindrome")');
const palWords = ['radar', 'kayak', 'sunrise', 'Noon'];
const palRes = (w) => pyOut(palSrc.replace('"radar"', `"${w}"`));
const vPal = table(
  ['s', 's[::-1]', 'Printed'],
  palWords.map((w) => [w, pyOut(`print("${w}"[::-1])`), palRes(w)]),
  `Table of the palindrome program for ${palWords.join(', ')}: printed ${palWords.map((w) => palRes(w)).join('; ')}; with lower() added, Noon gives ${pyOut(palSrc.replace('"radar"', '"Noon".lower()'))}`,
  'Noon is not a palindrome until the case is ignored.',
);
const wcSrc = code('line = "  the sea and the sky and the hills  "', 'words = line.split()', 'print(len(words))', 'print(line.count("the"))', 'print(line.strip().replace("the", "a"))');
const wcOut = pyOut(wcSrc).split('\n');
const vWc = table(
  ['Statement', 'Printed'],
  [['`len(words)`', wcOut[0]], ['`line.count("the")`', wcOut[1]], ['`line.strip().replace("the", "a")`', wcOut[2]]].map(([a, b]) => [a, bt(b)]),
  `Table of the word-count program: it prints ${wcOut.join('; ')}`,
  'split() ignores the extra spaces; count() counts a substring, not words.',
);
const revSrc = code('word = "STOP"', 'rev = ""', 'for ch in word:', '    rev = ch + rev', '    print(ch, rev)');
const revRows = outRows(revSrc);
const vRev = table(
  ['ch', 'rev after the pass'],
  revRows,
  `Trace table of reversing STOP with a loop: rev becomes ${revRows.map((r) => r[1]).join(', ')}`,
  'Each new character is put in front of the result.',
);
const chooseRows = [
  ['Is a piece of text present?', '`in`, `find()`, `startswith()`, `endswith()`'],
  ['How many times does it occur?', '`count()`'],
  ['Change the text', '`replace()`, `upper()`, `lower()`, `title()`'],
  ['Get the words, or build a line', '`split()` and `join()`'],
  ['Clean the ends', '`strip()`, `lstrip()`, `rstrip()`'],
  ['Validate characters', '`isalpha()`, `isdigit()`, `isalnum()`'],
];
const vChoose = table(['Task', 'Method'], chooseRows, 'Table of tasks and the string method for each: search with in or find, count with count, change text with replace and the case methods, get words with split and join, clean ends with strip, validate with the test methods');
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Case', 'upper, lower, capitalize, title; each returns a new string'],
    ['Search', 'count; find gives -1 if absent, index raises ValueError'],
    ['Test', 'startswith, endswith, isalpha, isdigit, isalnum, islower, isupper, isspace'],
    ['Clean', 'strip, lstrip, rstrip; replace(old, new)'],
    ['Split and join', 'split() gives a list; join() builds a string; partition() gives 3 parts'],
    ['Programs', 'build a new string in a loop; compare with the reverse; split then len'],
  ],
  'Summary table of Part 2: case methods, searching, testing, cleaning, splitting and joining, and programs',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Strings — Part 1: Indexing, Operations, Slicing and Traversal',
  goals: [
    'Explain what a string is, and reach characters with positive and negative indexes',
    'Use concatenation, repetition, in and not in, and slices with a step, and explain why strings are immutable',
    'Traverse a string with for and while loops and trace the loop with a table',
  ],
  slides: [
    sl('title', 'Strings', {
      b: 'Part 1 — how Python **stores, reaches, joins and cuts** text.',
      v: vRoute1,
      n: 'Welcome to Chapter five. A string is text, and almost every program reads, joins, cuts or checks text. In this first part we learn what a string is and how indexing reaches each character. Then we join, repeat, test and slice strings. We finish with why strings cannot be changed in place, and how a loop visits each character.',
    }),
    sl('concept', 'What a string is', {
      b: 'A **string** is a sequence of characters inside single, double or triple quotes. `len()` counts the characters.',
      v: vLit,
      n: 'A string is a sequence of characters written inside single, double or triple quotes. The characters can be letters, digits, spaces or symbols. The length of a string is the number of characters, found with len. An empty string has length zero, and a digit inside quotes is still a string, not a number.',
    }),
    sl('diagram', 'Indexes from the left and from the right', {
      b: 'The first character has index **0**; the last has index **-1**. A string of length n has indexes 0 to n - 1.',
      v: vIndexSvg,
      n: 'Every character has two indexes. Counting from the left, the first character has index zero. Counting from the right, the last character has index minus one. For a string of length seven, the valid positive indexes run from zero to six, and the valid negative indexes run from minus one down to minus seven.',
    }),
    sl('example', 'Worked example 1: indexing', {
      b: `Square brackets with an index give one character.\n\n${F('s = "SUNRISE"', 'print(s[0], s[3], s[-1])')}`,
      v: vIdxTable,
      n: 'This table shows indexing on one string. Square brackets with a positive index count from the left, and a negative index counts from the right. The expression with len of the string minus one always reaches the last character. An index outside the range stops the program with an index error.',
    }),
    sl('check', 'Quick check: the last character', {
      b: 'Fill in the blank.',
      chk: 'fb_last_index',
      n: 'Think about which negative index always points to the last character of a string that is not empty.',
    }),
    sl('concept', 'Joining and repeating strings', {
      b: 'Use `+` to **concatenate** and `*` to **repeat**. Convert numbers with `str()` before joining.',
      v: vCat,
      n: 'The plus operator joins two strings, which is called concatenation. The star operator repeats a string a whole number of times. Both make new strings. Joining a string and a number with plus is a type error, so convert the number with str first.',
    }),
    sl('concept', 'Membership: in and not in', {
      b: '`a in b` is **True** when the characters of a appear together, in order, inside b.',
      v: vMem,
      n: 'The in operator tests whether one string appears inside another, as a block of characters in the same order. The test is case sensitive, so a small s is not a capital S. Not in gives the opposite answer, and the empty string is found in every string.',
    }),
    sl('check', 'Quick check: a substring', {
      b: 'True or false?',
      chk: 'tf_in_substring',
      n: 'Decide whether the three letters a, n, a appear together, in that order, inside the word Banana.',
    }),
    sl('concept', 'Slicing: start and stop', {
      b: '`s[start:stop]` takes the characters from index **start** up to, but **not including**, index **stop**.',
      v: vSlice,
      n: 'A slice takes part of a string. Write the start index, a colon and the stop index. The character at the start index is included, and the character at the stop index is not. If the start is missing the slice begins at the first character, and if the stop is missing it runs to the end.',
    }),
    sl('concept', 'Slicing with a step; reversing', {
      b: '`s[start:stop:step]` takes every step-th character. A **negative step** walks to the left, so `s[::-1]` is the reverse.',
      v: vStep,
      n: 'A third number gives the step. A step of two takes every second character. A negative step walks from right to left, so colon colon minus one reverses a whole string. A slice never causes an error when its limits lie outside the string. Python simply stops at the end.',
    }),
    sl('example', 'Worked example 2: cutting a book code', {
      b: `A fixed-width code is cut with slices.\n\n${F(bkSrc)}`,
      v: vBk,
      n: 'Here a book code is cut into parts. The first slice gives the two letter kind, the second gives the year, and the last slice gives the serial number. We turn the serial into an integer and add one to get the next number. Slices make fixed width codes easy to read.',
    }),
    sl('check', 'Quick check: slices', {
      b: 'Match each slice with its result.',
      chk: 'mt_slices',
      n: 'Work out each slice of the word monsoon on its own, remembering that the stop index is left out.',
    }),
    sl('concept', 'Strings are immutable', {
      b: 'A character **cannot be changed in place**. Build a **new** string, and assign it back if you want to keep it.',
      v: vImm,
      n: 'Strings are immutable, which means that no character can be changed in place. Assigning to an index gives a type error. To make a changed copy, build a new string with slices and concatenation. Methods like lower also return new strings and leave the original untouched.',
    }),
    sl('concept', 'Traversing a string', {
      b: '**Traversing** means visiting the characters one by one.',
      v: vLoops,
      n: 'To traverse a string means to visit its characters one by one. The simplest loop is for ch in the string, which gives each character directly. A loop over range of len of the string gives indexes, and a while loop needs an index that you update yourself. All three show the same characters.',
    }),
    sl('example', 'Worked example 3: counting vowels', {
      b: `The running count changes only for a vowel.\n\n${F(vowSrc)}`,
      v: vVowel,
      n: 'This program counts the vowels of a word. The loop takes each character, converts it to lower case, and tests whether it is in the string of vowels. The trace table shows the running count after every character. The count grows only on a vowel, and the last row gives the answer.',
    }),
    sl('check', 'Quick check: reading two ends', {
      b: 'Predict the output.',
      chk: 'co_mirror',
      n: 'Trace the program and write what it prints for each position of the word.',
    }),
    sl('concept', 'Common mistakes and their error messages', {
      b: 'Python reports the error and its type. Read the message before you change the code.',
      v: vErr1,
      n: 'Five mistakes are common with strings. An index beyond the length gives an index error. Assigning to an index gives a type error, and so does joining a string to a number with plus. Subtracting strings is also a type error, and a missing closing quote is a syntax error. Read the message, it names the problem.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. A string is an immutable sequence of characters with indexes from the left and from the right. Plus joins and star repeats. The in operator tests for a substring, and slices take start, stop and step, with the stop excluded. A for loop over the string visits each character.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'The **stop** index of a slice is **excluded**; the **start** is included.',
        'Negative indexes start at **-1**; the last valid index is `len(s) - 1`.',
        'Strings never change in place: **assign the new string back** to a variable.',
        'Use `str()` before joining a number to a string with `+`.',
        'When you trace a loop, write the value after **every pass**.',
      ],
      n: 'Some advice for the exam. The stop index of a slice is excluded. Negative indexes start at minus one. Strings never change in place, so assign the new string back to a variable. Convert numbers with str before joining them to a string. When you trace a loop, write the value after every pass.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Strings — Part 2: Built-in Methods and Programs',
  goals: [
    'Use the case, search, test, strip, replace, split, join and partition methods of strings',
    'Predict what a method returns, knowing that strings are never changed in place',
    'Write programs for palindromes, word counts and reversing, with trace tables',
  ],
  slides: [
    sl('title', 'String methods', {
      b: 'Part 2 — ready-made **methods** for changing, searching, testing, cleaning and splitting text.',
      v: vRoute2,
      n: 'Welcome to Part 2 of Chapter five. Python gives strings many ready made methods. We change case, search and count, test the kinds of characters, strip spaces, replace text, and split and join words. We finish with complete programs for palindromes, word counts and reversing. Remember that every method returns a new string.',
    }),
    sl('concept', 'Changing case', {
      b: 'A method is called with a dot: `s.upper()`. Each case method **returns a new string**.',
      v: vCase,
      n: 'Four methods change case. Upper makes every letter a capital and lower makes every letter small. Capitalize changes only the first character of the whole string to a capital and the rest to small. Title starts every word with a capital. Each method returns a new string and leaves the original as it was.',
    }),
    sl('concept', 'count(), find() and index()', {
      b: '`count()` counts non-overlapping matches. `find()` gives the first index, or **-1**. `index()` gives it too, but raises **ValueError** when absent.',
      v: vFind,
      n: 'Count tells how many times a substring appears without overlapping. Find gives the index of the first match, or minus one if there is none. Index also gives the first match, but stops with a value error when there is none. Both can take a start index to begin searching later.',
    }),
    sl('concept', 'startswith() and endswith()', {
      b: 'Both give **True** or **False**, and both are case sensitive.',
      v: vStarts,
      n: 'Starts with and ends with test the two ends of a string and give True or False. They are case sensitive. They are handy for checking file names and prefixes, as in this table, where only the exact matches give True.',
    }),
    sl('concept', 'Testing the kind of characters', {
      b: 'The test methods give **True** or **False**. All are False for an empty string.',
      v: vTests,
      n: 'The test methods return True or False. The isalpha method needs letters only, isdigit needs digits only, and isalnum accepts letters and digits together. Islower and isupper need at least one cased letter. Isspace needs only whitespace. All of them are False for the empty string.',
    }),
    sl('check', 'Quick check: two strings, one test', {
      b: 'True or false?',
      chk: 'tf_isalpha_space',
      n: 'Remember what happens to isalpha when a string contains a space between two words.',
    }),
    sl('concept', 'strip(), lstrip() and rstrip()', {
      b: 'They remove **spaces at the ends** only; with an argument they remove those characters instead.',
      v: vStrip,
      n: 'Strip removes whitespace from both ends of a string, lstrip from the left end only and rstrip from the right end only. They never touch spaces in the middle. If you give a string of characters as an argument, those characters are removed from the ends instead of spaces.',
    }),
    sl('check', 'Quick check: cleaning the ends', {
      b: 'Fill in the blank.',
      chk: 'fb_strip',
      n: 'Name the method that removes whitespace from both the beginning and the end of a string.',
    }),
    sl('concept', 'replace()', {
      b: '`s.replace(old, new)` replaces **every** match. A third number limits the replacements.',
      v: vReplace,
      n: 'Replace takes the old text and the new text, and replaces every match. A third number limits how many matches are replaced. If nothing matches, the same text comes back. The original string never changes, so store the result in a variable if you need it later.',
    }),
    sl('concept', 'split() and join()', {
      b: '`split()` cuts a string into a list of pieces; `sep.join(pieces)` joins pieces with a separator between them.',
      v: vSplit,
      n: 'Split cuts a string into pieces and gives a list. With no argument it cuts at any run of white space. With a separator it cuts at every separator, even when two are together. Join does the opposite, putting a separator between the pieces. For the list we use only len and indexes.',
    }),
    sl('concept', 'partition()', {
      b: '`partition(sep)` cuts at the **first** separator into **three** parts. `a, b, c = s.partition(sep)` receives them.',
      v: vPart,
      n: 'Partition cuts at the first separator only and always gives three parts: the text before, the separator, and the text after. If the separator is missing, the first part is the whole string and the other two are empty. Three variables can receive the three parts at once.',
    }),
    sl('example', 'Worked example 1: palindrome check', {
      b: `A palindrome equals its own reverse.\n\n${F(palSrc)}`,
      v: vPal,
      n: 'A palindrome reads the same in both directions. The program compares the string with its reverse made by a slice. The table shows several words. Notice that capital N and small n are different characters, so convert to lower case before the test when case should be ignored.',
    }),
    sl('check', 'Quick check: planning a palindrome test', {
      b: 'Put the steps in order.',
      chk: 'ord_palindrome',
      n: 'Decide which step must happen before the word is compared with its reverse.',
    }),
    sl('example', 'Worked example 2: counting words', {
      b: `Split the line, then take the length of the list.\n\n${F(wcSrc)}`,
      v: vWc,
      n: 'To count the words in a line, split it and take the length. Split with no argument also ignores extra spaces at the ends and in between. The table shows the word count, how many times the letters t h e occur together, and the line with the replaced. Count looks for a substring, not for whole words.',
    }),
    sl('example', 'Worked example 3: reversing with a loop', {
      b: `Put each new character **in front** of the result.\n\n${F(revSrc)}`,
      v: vRev,
      n: 'To reverse a string with a loop, start with an empty string and put each new character in front of the result. The trace table shows the result after every pass. This builds the same answer as the slice with step minus one, and shows how a new string is built because the old one cannot change.',
    }),
    sl('check', 'Quick check: methods and their jobs', {
      b: 'Match each method with what it does.',
      chk: 'mt_methods',
      n: 'Recall the job of each method: testing digits, splitting once, counting matches and capitalising words.',
    }),
    sl('concept', 'Choosing the right method', {
      b: 'A chain such as `s.strip().lower()` is worked out from **left to right**.',
      v: vChoose,
      n: 'Choose the method by the task. Use find or in to search, count to count, and replace to change text. Use split to get the words and join to build a line. Use strip to clean the ends, and the test methods to validate input. Chains such as strip then lower run from left to right.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Case methods, strip and replace return new strings. Find gives minus one when a substring is absent, while index raises a value error. The test methods give True or False. Split gives a list of words, join builds a string, and partition gives three parts. Loops build new strings one character at a time.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Methods **return** a new string: write `s = s.upper()` to keep the result.',
        '`find()` gives **-1** when there is no match; `index()` raises **ValueError**.',
        '`split()` with no argument ignores extra spaces; `split(" ")` does not.',
        'The test methods are False for an empty string.',
        'For a palindrome compare with `s[::-1]`, and use `lower()` when case is ignored.',
      ],
      n: 'Some advice for the exam. Methods return a new string, so assign the result back to keep it. Find gives minus one when there is no match, while index raises a value error. Split with no argument ignores extra spaces. The test methods are False for an empty string. For a palindrome compare with the reverse, and use lower when case is ignored.',
    }),
  ],
});

// narration limit of the brief (66 words)
const longN = [part1, part2].flatMap((d) => d.slides.filter((s) => wordsOf(s.narration) > 66).map((s) => d.part + '/' + s.id + ': ' + wordsOf(s.narration)));
assert.equal(longN.length, 0, 'narration over 66 words: ' + longN.join(', '));

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Strings — Notes',
  sections: [
    {
      h: '1. What a string is, and indexing',
      t: 1,
      b: 'A **string** is a sequence of characters written inside single, double or triple quotes: letters, digits, spaces and symbols. `len(s)` gives the number of characters; the empty string `""` has length 0. A digit inside quotes, such as `"7"`, is a string and not a number.\n\nEach character has a **positive index** counted from the left (the first is 0) and a **negative index** counted from the right (the last is -1). For a string of length n the valid indexes are 0 to n - 1 and -n to -1; any other index raises an `IndexError`.',
      terms: [
        ['String', 'An immutable sequence of characters.'],
        ['Index', 'The position of a character: 0 for the first from the left, -1 for the last from the right.'],
      ],
      v: vIndexSvg,
      vs: [vLit, vIdxTable],
    },
    {
      h: '2. Concatenation, repetition and membership',
      t: 1,
      b: '- `+` **concatenates** two strings; `*` **repeats** a string a whole number of times (`"ha" * 3`).\n- `+` needs two strings: joining a string and an integer is a `TypeError`, so convert with `str()`.\n- `in` and `not in` test whether one string appears inside another, **as a block of characters in order**. The test is case sensitive, and the empty string is in every string.\n\nAll of these build or test strings; none changes the strings they use.',
      terms: [
        ['Concatenation', 'Joining two strings with the + operator.'],
        ['Repetition', 'Repeating a string with the * operator and an integer.'],
        ['Membership', 'Testing with in or not in whether a substring is present.'],
      ],
      v: vCat,
      vs: [vMem],
    },
    {
      h: '3. Slicing',
      t: 1,
      b: '`s[start:stop]` gives the characters from index `start` up to, but **not including**, index `stop`. A missing start means the beginning and a missing stop means the end. `s[start:stop:step]` takes every step-th character; a **negative step** walks to the left, and `s[::-1]` reverses the string.\n\nLimits outside the string never cause an error in a slice (Python stops at the end), but a single index outside the string raises `IndexError`. An empty slice such as `s[2:2]` is the empty string.',
      terms: [
        ['Slice', 'A part of a string taken with s[start:stop:step].'],
        ['Step', 'The third number of a slice; a negative step reverses the direction.'],
      ],
      v: vSlice,
      vs: [vStep, vBk],
    },
    {
      h: '4. Immutability and traversal',
      t: 1,
      b: 'Strings are **immutable**: a character cannot be changed in place, and `s[0] = "T"` raises a `TypeError`. To get a changed string, build a new one with slices, concatenation or a method, and assign it to a variable.\n\n**Traversing** a string visits its characters one by one: `for ch in s:` gives each character; `for i in range(len(s)):` gives each index, used as `s[i]`; a `while` loop needs an index that the program updates. A result string is built by starting with `""` and adding to it in the loop.',
      terms: [
        ['Immutable', 'Cannot be changed in place after it is created.'],
        ['Traversal', 'Visiting each character of a string in turn, usually with a loop.'],
      ],
      v: vImm,
      vs: [vLoops, vVowel, vErr1],
    },
    {
      h: '5. String methods',
      t: 1,
      b: 'A method is called with a dot and returns a **new** string (or a value); the original does not change.\n- **Case:** `upper()`, `lower()`, `capitalize()`, `title()`.\n- **Search:** `count(sub)` (non-overlapping), `find(sub)` (first index or -1), `index(sub)` (first index, or `ValueError`), `startswith()`, `endswith()`; `find`, `index` and `count` can take a start index.\n- **Tests:** `isalpha()`, `isdigit()`, `isalnum()`, `islower()`, `isupper()`, `isspace()`; all are False for the empty string.\n- **Clean and change:** `strip()`, `lstrip()`, `rstrip()` remove whitespace from the ends; `replace(old, new)` replaces every match.',
      terms: [
        ['Method', 'A function that belongs to an object, called with a dot, as in s.upper().'],
        ['Substring', 'A block of consecutive characters inside a string.'],
      ],
      v: vCase,
      vs: [vFind, vStarts, vTests, vStrip, vReplace],
    },
    {
      h: '6. split, join, partition and programs',
      t: 1,
      b: '- `s.split()` cuts at runs of whitespace; `s.split(sep)` cuts at every separator and keeps empty pieces. The result is a list: here we only take its length `len(words)`, an element `words[i]`, or join it.\n- `sep.join(pieces)` builds one string with the separator between the pieces.\n- `s.partition(sep)` cuts at the **first** separator into three parts (before, separator, after); if the separator is missing the last two parts are empty.\n- **Programs:** a palindrome equals its reverse (`s == s[::-1]`, with `lower()` to ignore case); the number of words is `len(s.split())`; a string is reversed by putting each new character in front of the result.',
      terms: [
        ['Palindrome', 'A string that reads the same forwards and backwards.'],
        ['Separator', 'The text at which split(), partition() and join() cut or connect pieces.'],
      ],
      v: vSplit,
      vs: [vPart, vPal, vWc, vRev],
    },
  ],
  tips: '**Common mistakes**\n- Taking the stop index of a slice as included.\n- Writing `s[len(s)]`, which is one past the last index.\n- Trying `s[0] = "x"` instead of building a new string.\n- Calling `s.upper()` and forgetting to store the result.\n- Joining a number to a string with `+` and no `str()`.\n- Treating `find()` and `index()` alike: only `find()` returns -1.\n- Expecting `split(" ")` to ignore repeated spaces like `split()`.\n- Forgetting that `in` and the methods are case sensitive.\n\n**How marks are usually awarded**\n- Output questions: the exact output, line by line, with the quotes only where `repr` would show them.\n- Error-finding: naming the error and its cause, then the corrected statement.\n- Programs: marks for input, the traversal, the test or method, building the result and the output for the given input.\n- Trace tables: a column per variable, a row per character, and the final value.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a **string** in Python?', 'An immutable sequence of characters written inside quotes.', 'definition', 1],
  ['What does `len()` give for a string?', 'The number of characters, spaces included; the empty string has length 0.', 'fact', 1],
  ['What are the indexes of a string of length n?', 'From the left 0 to n - 1; from the right -1 to -n.', 'concept', 1],
  [`What does ${ic('"SUNRISE"[-1]')} give?`, `${ic(rv('"SUNRISE"[-1]'))}, the last character.`, 'example', 1],
  [`What happens for ${ic('"Pune"[4]')}?`, `Python stops with ${ic(pyErr('print("Pune"[4])'))}.`, 'exam-tip', 1],
  ['Which operator **concatenates** and which **repeats** strings?', '`+` concatenates and `*` repeats; for example `"ha" * 3`.', 'fact', 1],
  [`What is ${ic('"ha" * 3')}?`, ic(rv('"ha" * 3')), 'example', 1],
  [`What happens for ${ic('"Row " + 5')}?`, `${ic(pyErr('print("Row " + 5)'))}; write ${ic('"Row " + str(5)')} instead.`, 'exam-tip', 1],
  ['What does `x in s` test?', 'Whether the characters of x appear together, in order, inside s; it is case sensitive.', 'definition', 1],
  [`${ic('"sun" in "Sunrise"')}?`, `${ic(val('"sun" in "Sunrise"'))}, because the test is case sensitive.`, 'example', 1],
  ['Which characters does `s[a:b]` take?', 'Indexes a up to b - 1; the stop index is not included.', 'concept', 1],
  [`What does ${ic('"SUNRISE"[1:4]')} give?`, ic(rv('"SUNRISE"[1:4]')), 'example', 1],
  ['What do a missing start and a missing stop mean in a slice?', 'Start at the beginning, and go on to the end of the string.', 'concept', 1],
  [`What does ${ic('"SUNRISE"[::-1]')} give?`, `${ic(rv('"SUNRISE"[::-1]'))}: a negative step walks from right to left, so it reverses the string.`, 'example', 1],
  [`What does ${ic('"SUNRISE"[::2]')} give?`, ic(rv('"SUNRISE"[::2]')), 'example', 1],
  ['Does a slice with limits outside the string cause an error?', '**No.** Python stops at the end: `"abc"[1:10]` is ' + ic(rv('"abc"[1:10]')) + '.', 'fact', 1],
  ['What does **immutable** mean for a string?', 'Its characters cannot be changed in place; every change builds a new string.', 'definition', 1],
  [`What happens for ${ic('s[0] = "T"')} when s is a string?`, `${ic(pyErr('s = "SUNRISE"\ns[0] = "T"'))}.`, 'exam-tip', 1],
  ['Three ways to traverse a string', '`for ch in s`, `for i in range(len(s))` with `s[i]`, and a `while` loop with an index that is updated.', 'concept', 1],
  ['How do you start building a new string in a loop?', 'Start with the empty string `""` and add to it with `+` on every pass.', 'concept', 1],
  ['Do case methods such as `upper()` change the original string?', '**No.** They return a new string; write `s = s.upper()` to keep it.', 'exam-tip', 1],
  [`What do ${ic('capitalize()')} and ${ic('title()')} give for ${ic('"gOa BEACH tRIP"')}?`, `${ic(rv('"gOa BEACH tRIP".capitalize()'))} and ${ic(rv('"gOa BEACH tRIP".title()'))}.`, 'example', 1],
  ['What is the difference between `find()` and `index()`?', 'Both give the first index; when the substring is absent `find()` returns -1 and `index()` raises ValueError.', 'concept', 1],
  [`What does ${ic('"sweet sweet home".count("sweet")')} give?`, ic(val('"sweet sweet home".count("sweet")')), 'example', 1],
  ['Name the six character-test methods', '`isalpha()`, `isdigit()`, `isalnum()`, `islower()`, `isupper()` and `isspace()`; all are False for the empty string.', 'fact', 1],
  ['Which method removes spaces from **both ends**?', '`strip()`; `lstrip()` works on the left end only and `rstrip()` on the right end only.', 'definition', 1],
  [`What does ${ic('"tea time".replace("t", "T", 1)')} give?`, `${ic(rv('"tea time".replace("t", "T", 1)'))}: the third number limits the replacements.`, 'example', 1],
  [`What do ${ic('"a  b".split()')} and ${ic('"a  b".split(" ")')} give?`, `${ic(pyOut('print("a  b".split())'))} and ${ic(pyOut('print("a  b".split(" "))'))}: with no argument runs of spaces count as one separator.`, 'exam-tip', 1],
  ['What does `partition(sep)` return?', 'Three parts: the text before the first separator, the separator itself, and the text after it.', 'definition', 1],
  ['How do you test whether a string is a palindrome?', 'Compare it with its reverse, `s == s[::-1]`, after `lower()` if case is ignored.', 'concept', 1],
]);

// ---------------------------------------------------------------- tests (cbse-11-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Strings',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_slice_basic', 'm_immutable', 'm_split_len', 'ar_index'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s2_err_assign', 's2_slice_write', 's3_trace_count'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions. Show the program and its output.', items: [{ attempt: 1, keys: ['l_palindrome', 'l_kinds'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_email'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Strings',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_neg_index', 'm_len', 'm_repeat', 'm_find_start', 'm_count', 'm_partition', 'm_replace_orig', 'm_upper_loop', 'ar_isupper', 'ar_repeat'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words.', items: ['s2_err_concat', 's2_neg_pos', { attempt: 1, keys: ['s2_err_index', 's2_find_index'] }, 's3_palindrome_slice', { attempt: 1, keys: ['s3_methods_three', 's3_plate'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18.', items: ['l_wordstats', { attempt: 1, keys: ['l_mask', 'l_initials'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_roll', 'cb_dna'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topic t01 (introduction, indexing, concatenation, repetition, membership, slicing, immutability, traversal, built-in functions and methods, simple string programs) of cbse-11-computer-science-ch05 only; lists appear only as the result of split(); no def functions, dictionaries or list methods',
    originality: 'every program, scenario and data value written for this chapter by SOYL; no textbook, NCERT or board-paper program reused',
    execution: 'every output, trace, count and error message in items, slides, notes and flashcards produced by running the program (runPy in lib.mjs); results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
