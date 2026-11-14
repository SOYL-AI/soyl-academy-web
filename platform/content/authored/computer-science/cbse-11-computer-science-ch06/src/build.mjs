// Build CBSE 11 Computer Science ch06 Lists and Tuples. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-11-computer-science-ch06/src/build.mjs
// Every output, trace table, count and error message shown in decks, notes and flashcards is produced by running the
// Python program with pyOut()/pyErr() (recorded in src/py-cache.json); nothing is typed by hand.
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, setAuthor, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache, pyOut, pyErr } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-11-computer-science-ch06', 'computer-science');
setAuthor('claude-sonnet-5-5 (writer; reviewed by the subject-producer)');
usePyCache(SRC);
const { F, O, code, ic, rowsOf, mdTable, val, pv, pe, traceList } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const wordsOf = (s) => s.trim().split(/\s+/).length;
const json = (setup, expr) => JSON.parse(pyOut(code(setup, 'import json', `print(json.dumps(${expr}))`)));
/** One-line table cells: the statement as inline code and its value from a run. */
const exprRows = (setup, exprs) => exprs.map(([e, note]) => [ic(e), ic(pv(setup, e)), note]);
const tr = (name, stmts, setup) => traceList(name, stmts, setup).map(([s, l]) => [ic(s), ic(l)]);

// ---------------------------------------------------------------- programs used in decks (not used as item stems)
const scoresSet = 'scores = [72, 55, 90, 64, 81, 47, 88]';
const scoreExprs = ['scores[:3]', 'scores[-2:]', 'scores[1::2]', 'scores[::-1]'];
const showScores = code(scoresSet, ...scoreExprs.map((e) => `print(${e})`));
const priceSet = 'prices = [120, 85, 60, 135]';
const showMean = code(priceSet, 'total = 0', 'for p in prices:', '    total = total + p', 'print(total, total / len(prices))');
const meanRows = json(code(priceSet, 'rows = []', 'total = 0', 'for p in prices:', '    total = total + p', '    rows.append([p, total])'), 'rows');
const showMax = code('nums = [34, 71, 19, 88, 52]', 'biggest = nums[0]', 'smallest = nums[0]', 'for n in nums:', '    if n > biggest:', '        biggest = n', '    if n < smallest:', '        smallest = n', 'print(biggest, smallest)');
const maxRows = json(code('nums = [34, 71, 19, 88, 52]', 'rows = []', 'biggest = nums[0]', 'smallest = nums[0]', 'for n in nums:', '    if n > biggest:', '        biggest = n', '    if n < smallest:', '        smallest = n', '    rows.append([n, biggest, smallest])'), 'rows');
const showSearch = (key) => code('club = ["Ravi", "Sana", "Tilak", "Sana", "Uday"]', `key = "${key}"`, 'pos = -1', 'for i in range(len(club)):', '    if club[i] == key:', '        pos = i', '        break', 'print(pos)');
const searchRows = json(code('club = ["Ravi", "Sana", "Tilak", "Sana", "Uday"]', 'key = "Tilak"', 'rows = []', 'for i in range(len(club)):', '    rows.append([i, club[i], club[i] == key])', '    if club[i] == key:', '        break'), 'rows');
const showFreq = code('shoes = [7, 9, 7, 8, 9, 7, 10]', 'seen = []', 'for s in shoes:', '    if s not in seen:', '        seen.append(s)', '        print(s, shoes.count(s))');
const freqRows = pyOut(showFreq).split('\n').map((l) => l.split(' '));
const roomsSet = 'rooms = [["Asha", "Bela"], ["Chitra", "Dev"], ["Esha", "Firoz"]]';
const showRows = code(roomsSet, 'for row in rooms:', '    print(len(row), row[0], row[-1])');
const showTMean = code('temps = (31, 28, 35, 30, 28)', 'biggest = temps[0]', 'total = 0', 'for t in temps:', '    total = total + t', '    if t > biggest:', '        biggest = t', 'print(biggest, min(temps), total / len(temps))');
const tMeanRows = json(code('temps = (31, 28, 35, 30, 28)', 'rows = []', 'biggest = temps[0]', 'total = 0', 'for t in temps:', '    total = total + t', '    if t > biggest:', '        biggest = t', '    rows.append([t, total, biggest])'), 'rows');
const showTSearch = code('temps = (31, 28, 35, 30, 28)', 'for key in (28, 40):', '    if key in temps:', '        print(key, temps.index(key), temps.count(key))', '    else:', '        print(key, "absent")');
const tSearchRows = pyOut(showTSearch).split('\n').map((l) => l.split(' '));
const showSwapTemp = code('a, b = 6, 11', 't = a', 'a = b', 'b = t', 'print(a, b)');
const showSwapTuple = code('a, b = 6, 11', 'a, b = b, a', 'print(a, b)');

// ---------------------------------------------------------------- SVG diagrams
const ST = { fill: 'fill', color: 'accent', sw: 1.6 };
const cells = (s, items, x0, y, w, h, o = {}) => items.forEach((t, i) => { s.rect(x0 + i * w, y, w, h, { ...ST, rx: 4 }); s.text(x0 + i * w + w / 2, y + h / 2, t, { size: o.size ?? 14 }); });
const fruitItems = json('fruits = ["mango", "guava", "lychee", "papaya", "kiwi"]', 'fruits');
const vIndexSvg = (() => {
  const n = fruitItems.length;
  const s = new Svg(520, 150);
  cells(s, fruitItems, 30, 45, 92, 40);
  fruitItems.forEach((_, i) => {
    s.text(30 + i * 92 + 46, 28, String(i), { size: 15, bold: true, color: 'accent' });
    s.text(30 + i * 92 + 46, 108, String(i - n), { size: 15, muted: true });
  });
  s.text(260, 135, 'top: indexes from the front   bottom: indexes from the back', { size: 12, muted: true });
  return s.visual(`Diagram of the list of five fruits ${fruitItems.join(', ')} in boxes; above each box is its index ${fruitItems.map((_, i) => i).join(', ')} counted from the front and below it the negative index ${fruitItems.map((_, i) => i - n).join(', ')} counted from the back`, 'Every item has two indexes: one from the front, one from the back.');
})();
const listTxt = val('[1, 2, 3]');
const vAliasSvg = (() => {
  const s = new Svg(560, 220);
  s.text(130, 18, 'b = a', { size: 14, bold: true, color: 'accent' });
  s.text(430, 18, 'c = list(a)', { size: 14, bold: true, color: 'accent' });
  s.rect(10, 35, 40, 28, { ...ST, rx: 4 }); s.text(30, 49, 'a');
  s.rect(10, 110, 40, 28, { ...ST, rx: 4 }); s.text(30, 124, 'b');
  s.rect(150, 70, 120, 40, { ...ST, rx: 4 }); s.text(210, 90, listTxt);
  s.arrow(50, 49, 150, 80, { sw: 1.6 }); s.arrow(50, 124, 150, 100, { sw: 1.6 });
  s.text(210, 128, 'one list, two names', { size: 12, muted: true });
  s.rect(320, 35, 40, 28, { ...ST, rx: 4 }); s.text(340, 49, 'a');
  s.rect(320, 130, 40, 28, { ...ST, rx: 4 }); s.text(340, 144, 'c');
  s.rect(440, 35, 110, 36, { ...ST, rx: 4 }); s.text(495, 53, listTxt);
  s.rect(440, 130, 110, 36, { ...ST, rx: 4 }); s.text(495, 148, listTxt);
  s.arrow(360, 49, 440, 49, { sw: 1.6 }); s.arrow(360, 144, 440, 148, { sw: 1.6 });
  s.text(495, 190, 'two lists, same items', { size: 12, muted: true });
  return s.visual('Diagram with two panels. Left panel: the names a and b both point by arrows to one single list holding 1, 2, 3. Right panel: the name a points to one list holding 1, 2, 3 and the name c points to a different, separate list holding the same items', 'b = a shares the list; list(a) builds a new one.');
})();
const packItems = json('t = 12, 35, 8', 'list(t)');
const vPackSvg = (() => {
  const s = new Svg(520, 190);
  s.text(260, 16, 'point = 12, 35, 8   (packing)', { size: 14, bold: true, color: 'accent' });
  cells(s, packItems.map(String), 140, 35, 80, 36);
  ['x', 'y', 'z'].forEach((v, i) => {
    const cx = 140 + i * 80 + 40;
    const vx = 100 + i * 160;
    s.arrow(cx, 71, vx, 128, { sw: 1.6 });
    s.rect(vx - 30, 130, 60, 30, { ...ST, rx: 4 });
    s.text(vx, 145, v, { size: 14, bold: true });
  });
  s.text(260, 180, 'x, y, z = point   (unpacking: item i goes to variable i)', { size: 13, bold: true, color: 'accent' });
  return s.visual(`Diagram of a tuple with three boxes holding ${packItems.join(', ')} produced by packing; arrows from the first, second and third box lead to the variables x, y and z, which is unpacking`, 'Packing makes one tuple; unpacking spreads its items over variables.');
})();

// ---------------------------------------------------------------- Part 1 visuals
const vRoute1 = flow('LR', ['What a list is', 'Indexing and slicing', 'Operators', 'Mutability and copies', 'Loops and methods'], 'Route map of Part 1: what a list is, indexing and slicing, operators, mutability and copies, then loops and the list methods', 'Part 1 at a glance');
const createRows = [['[]', 'an empty list'], ['[10, 20, 30]', 'items of one type'], ['["tea", 5, 2.5]', 'items may differ in type'], ['list("tea")', 'one item per character'], ['list(range(4))', 'from a range'], ['[[1, 2], [3, 4]]', 'a list inside a list']];
const vCreate = table(
  ['Statement', 'Value', 'Note'],
  createRows.map(([e, n]) => [ic(e), ic(val(e)), n]),
  `Table of six ways to create a list: ${createRows.map(([e]) => `${e} gives ${val(e)}`).join('; ')}`,
  'Values found by running each statement.',
);
const marksSet = 'marks = [45, 62, 38, 91, 77, 54, 83]';
const sliceRows = [['marks[2:5]', 'index 2 up to 4'], ['marks[:3]', 'the first three'], ['marks[4:]', 'from index 4 to the end'], ['marks[-3:]', 'the last three'], ['marks[::2]', 'every second item'], ['marks[::-1]', 'reversed copy']];
const vSlices = table(
  ['Slice', `Value for ${marksSet.slice(8)}`, 'Meaning'],
  exprRows(marksSet, sliceRows),
  `Table of slices of the list ${marksSet.slice(8)}; the results are ${sliceRows.map(([e]) => `${e} gives ${pv(marksSet, e)}`).join('; ')}`,
  'The stop index is never included.',
);
const vScores = table(
  ['Expression', 'Value'],
  scoreExprs.map((e) => [ic(e), ic(pv(scoresSet, e))]),
  `Table of four slices of the score list: ${scoreExprs.map((e) => `${e} gives ${pv(scoresSet, e)}`).join('; ')}`,
  'Each value comes from running the program.',
);
const opSet = 'a = [1, 2, 3]\nb = [4, 5]';
const opRows = [['a + b', 'joins two lists into a new one'], ['b * 3', 'repeats the list'], ['2 in a', 'membership test'], ['9 not in a', 'absence test'], ['len(a + b)', 'number of items']];
const vOps = table(
  ['Expression', 'Value', 'Meaning'],
  exprRows(opSet, opRows),
  `Table of list operators for a equal to [1, 2, 3] and b equal to [4, 5]; the results are ${opRows.map(([e]) => `${e} gives ${pv(opSet, e)}`).join('; ')}`,
  'Concatenation, repetition and membership.',
);
const mutStmts = ['p[1] = 85', 'p[3:5] = [110, 130, 150]', 'p[-1] = 0', 'p[:2] = []'];
const vMut = table(
  ['Statement run in this order', 'p afterwards'],
  [[ic('p = [60, 80, 100, 120, 140]'), ic(pv('p = [60, 80, 100, 120, 140]', 'p'))], ...tr('p', mutStmts, 'p = [60, 80, 100, 120, 140]')],
  `Table showing the list p changing as four assignments run: ${traceList('p', mutStmts, 'p = [60, 80, 100, 120, 140]').map(([s, l]) => `after ${s} it is ${l}`).join('; ')}`,
  'An item or a slice can be assigned; the same list object is changed.',
);
const aliasCases = [['b = a', 'b = a'], ['c = list(a)', 'b = list(a)'], ['c = a[:]', 'b = a[:]']];
const aliasRows = aliasCases.map(([lbl, line]) => [ic(lbl), pyOut(code('a = [5, 6]', line, 'a.append(9)', 'print(b)')).replace(/^/, '`').replace(/$/, '`'), ic(pyOut(code('a = [5, 6]', line, 'a.append(9)', 'print(a is b)')))]);
const vAliasTbl = table(
  ['Statement', 'b after a.append(9)', 'a is b'],
  aliasRows,
  `Table comparing three ways of making b from the list a, then appending 9 to a: ${aliasCases.map(([l, line], i) => `${l} leaves b as ${aliasRows[i][1]}`).join('; ')}`,
  'Only the assignment shares the list; list() and a full slice copy it.',
);
const travSet = 'bags = [4, 7, 5]';
const travRows = [['for x in bags: print(x * 2, end=" ")', 'each item itself'], ['for i in range(len(bags)): print(i, bags[i], end=" ")', 'index, then item']];
const vTrav = table(
  ['Loop', 'Output', 'It gives you'],
  travRows.map(([c, n]) => [ic(c), ic(pyOut(code(travSet, c)).trim()), n]),
  `Table of two ways to traverse the list bags equal to [4, 7, 5]; the results are ${travRows.map(([c]) => `${c} prints ${pyOut(code(travSet, c)).trim()}`).join('; ')}`,
  'Use the index loop when you must change items or need positions.',
);
const vMean = table(
  ['price p', 'total after the pass'],
  meanRows.map((r) => r.map(String)),
  `Trace table of the total of the prices ${meanRows.map((r) => r[0]).join(', ')}: the running total becomes ${meanRows.map((r) => r[1]).join(', ')}; the program prints ${pyOut(showMean)}`,
  `The last line printed is ${pyOut(showMean)}.`,
);
const addStmts = ['s.append("fig")', 's.extend(["lime", "plum"])', 's.insert(1, "date")'];
const addSet = 's = ["amla", "berry"]';
const vAdd = table(
  ['Statement run in this order', 's afterwards'],
  [[ic(addSet), ic(pv(addSet, 's'))], ...tr('s', addStmts, addSet)],
  `Table showing the list s growing under append, extend and insert: ${traceList('s', addStmts, addSet).map(([st, l]) => `after ${st} it is ${l}`).join('; ')}`,
  'append and extend add at the end; insert adds at a position.',
);
const remSet = 's = ["amla", "berry", "cherry", "date", "berry"]';
const remStmts = ['s.remove("berry")', 'x = s.pop()', 'y = s.pop(0)'];
const remRows = traceList('s', remStmts, remSet);
const xVal = pyOut(code(remSet, ...remStmts.slice(0, 2), 'print(x)'));
const yVal = pyOut(code(remSet, ...remStmts, 'print(y)'));
const vRemove = table(
  ['Statement run in this order', 's afterwards', 'Value given back'],
  [[ic(remSet), ic(pv(remSet, 's')), ''], [ic(remStmts[0]), ic(remRows[0][1]), 'nothing (None)'], [ic(remStmts[1]), ic(remRows[1][1]), ic(xVal)], [ic(remStmts[2]), ic(remRows[2][1]), ic(yVal)]],
  `Table showing the list s shrinking: ${remRows.map(([st, l]) => `after ${st} it is ${l}`).join('; ')}; the pop calls give back ${xVal} and ${yVal}`,
  'remove deletes the first match by value; pop removes by position and returns the item.',
);
const wSet = 'w = [12, 7, 19, 7]';
const wRows = [['w.count(7)', 'how many times 7 occurs'], ['w.index(19)', 'position of the first 19'], ['len(w)', 'number of items'], ['min(w)', 'smallest item'], ['max(w)', 'largest item'], ['sum(w)', 'total of the items']];
const vMethods = table(
  ['Call', `Value for ${wSet}`, 'Meaning'],
  exprRows(wSet, wRows),
  `Table of list functions for w equal to [12, 7, 19, 7]; the results are ${wRows.map(([e]) => `${e} gives ${pv(wSet, e)}`).join('; ')}`,
  'These calls read the list; none of them changes it.',
);
const sortCases = [['sorted(L)', 'r = sorted(L)'], ['L.sort()', 'r = L.sort()'], ['L.sort(reverse=True)', 'r = L.sort(reverse=True)'], ['L.reverse()', 'r = L.reverse()']];
const sortRows = sortCases.map(([lbl, line]) => { const [r, l] = pyOut(code('L = [30, 10, 20]', line, 'print(r)', 'print(L)')).split('\n'); return [ic(lbl), ic(r), ic(l)]; });
const vSort = table(
  ['Call on L = [30, 10, 20]', 'Value it returns', 'L afterwards'],
  sortRows,
  `Table comparing four calls on the list L equal to [30, 10, 20]; the results are ${sortCases.map(([l], i) => `${l} returns ${sortRows[i][1]} and leaves L as ${sortRows[i][2]}`).join('; ')}`,
  'sort() and reverse() work in place and return None; sorted() returns a new list.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Indexing', 'from 0 at the front, from -1 at the back'],
    ['Slicing', '`L[start:stop:step]`; the stop index is excluded'],
    ['Operators', '`+` joins, `*` repeats, `in` tests membership'],
    ['Mutable', 'items and slices can be assigned; `b = a` shares the list'],
    ['Adding, removing', '`append`, `extend`, `insert`; `remove`, `pop`'],
    ['Sorting', '`sort()` changes the list and returns None; `sorted()` returns a new list'],
  ],
  'Summary table of Part 1: indexing, slicing, operators, mutability and aliasing, adding and removing items, and sorting',
);

// ---------------------------------------------------------------- Part 2 visuals
const vRoute2 = flow('LR', ['List programs', 'Nested lists', 'Tuples', 'Tuple assignment', 'Tuple programs'], 'Route map of Part 2: programs on lists, nested lists, tuples, tuple assignment and programs on tuples', 'Part 2 at a glance');
const vMaxTrace = table(
  ['n', 'biggest', 'smallest'],
  maxRows.map((r) => r.map(String)),
  `Trace table of the maximum and minimum of 34, 71, 19, 88, 52: biggest becomes ${maxRows.map((r) => r[1]).join(', ')} and smallest ${maxRows.map((r) => r[2]).join(', ')}; the program prints ${pyOut(showMax)}`,
  `The last line printed is ${pyOut(showMax)}.`,
);
const vSearchTrace = table(
  ['i', 'club[i]', 'equal to the key Tilak?'],
  searchRows.map(([i, n, e]) => [String(i), n, e ? 'True' : 'False']),
  `Trace table of a linear search for Tilak: it compares ${searchRows.map(([i, n]) => `index ${i} ${n}`).join(', ')} and stops at the first match; the program prints ${pyOut(showSearch('Tilak'))}, and for the missing name Zubin it prints ${pyOut(showSearch('Zubin'))}`,
  `Searching for Tilak prints ${pyOut(showSearch('Tilak'))}; for Zubin it prints ${pyOut(showSearch('Zubin'))}.`,
);
const vSearchFlow = flow('TB', ['Read the key', 'Start at the first item', 'Items left?', 'Item equals the key?', 'Report the index and stop', 'Move to the next item', 'Report not found'], 'Flow of a linear search: read the key and start at the first item; if an item is left compare it with the key; on a match report the index and stop; otherwise move to the next item; when no item is left report not found', 'Compare one item at a time, from the front.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4', label: 'Yes' }, { from: 'n4', to: 'n5', label: 'Yes' }, { from: 'n4', to: 'n6', label: 'No' }, { from: 'n6', to: 'n3' }, { from: 'n3', to: 'n7', label: 'No' },
]);
const vFreq = table(
  ['Shoe size', 'Times it occurs'],
  freqRows.map((r) => r.map(String)),
  `Table of the frequency of each shoe size in the list 7, 9, 7, 8, 9, 7, 10: ${freqRows.map(([s, c]) => `size ${s} occurs ${c} times`).join('; ')}`,
  'The list seen makes sure each size is reported once.',
);
const rooms = json(roomsSet, 'rooms');
const vRooms = table(
  ['', 'column 0', 'column 1'],
  rooms.map((r, i) => [`row ${i}`, ...r]),
  `Table of the nested list rooms with three rows and two columns: ${rooms.map((r, i) => `row ${i} holds ${r.join(' and ')}`).join('; ')}`,
  'rooms[r][c] picks row r, then column c.',
);
const roomExprs = [['rooms[1]', 'a whole row'], ['rooms[2][1]', 'row 2, column 1'], ['rooms[0][-1]', 'last item of row 0'], ['len(rooms)', 'number of rows'], ['len(rooms[0])', 'items in row 0']];
const vRoomIdx = table(
  ['Expression', 'Value', 'Meaning'],
  exprRows(roomsSet, roomExprs),
  `Table of expressions on the nested list rooms: ${roomExprs.map(([e]) => `${e} gives ${pv(roomsSet, e)}`).join('; ')}`,
  'The first index chooses the row, the second the item inside it.',
);
const vRowLoop = table(
  ['Row', 'Line printed'],
  pyOut(showRows).split('\n').map((l, i) => [String(i), ic(l)]),
  `Table of the lines printed by a loop over the rows of rooms: ${pyOut(showRows).split('\n').map((l, i) => `row ${i} prints ${l}`).join('; ')}`,
  'One pass of the loop per inner list.',
);
const tcRows = [['()', 'empty tuple'], ['(5,)', 'one item: the comma is needed'], ['(5)', 'not a tuple: just a number'], ['4, 5, 6', 'brackets are optional'], ['tuple([7, 8])', 'made from a list'], ['tuple("go")', 'made from a string']];
const vTupleCreate = table(
  ['Statement', 'Value', 'Type', 'Note'],
  tcRows.map(([e, n]) => [ic(e), ic(val(`(${e})`)), ic(val(`type((${e})).__name__`)), n]),
  `Table of six statements and the types they give: ${tcRows.map(([e]) => `${e} gives ${val(`(${e})`)} of type ${val(`type((${e})).__name__`)}`).join('; ')}`,
  'It is the comma that makes a tuple.',
);
const topSet = 't = (10, 20, 30)\nu = (40, 50)';
const topRows = [['t + u', 'concatenation'], ['u * 2', 'repetition'], ['t[1]', 'indexing'], ['t[-1]', 'last item'], ['t[0:2]', 'slice'], ['20 in t', 'membership'], ['len(t)', 'number of items']];
const vTupleOps = table(
  ['Expression', 'Value', 'Operation'],
  exprRows(topSet, topRows),
  `Table of tuple operations for t equal to (10, 20, 30) and u equal to (40, 50); the results are ${topRows.map(([e]) => `${e} gives ${pv(topSet, e)}`).join('; ')}`,
  'Each result is a new tuple or a single value; t and u stay the same.',
);
const immCases = [['L[0] = 9', 'L = [1, 2, 3]'], ['t[0] = 9', 't = (1, 2, 3)'], ['L.append(4)', 'L = [1, 2, 3]'], ['t.append(4)', 't = (1, 2, 3)'], ['t = t + (4,)', 't = (1, 2, 3)']];
const immRows = immCases.map(([stmt, setup]) => {
  const r = require_run(setup, stmt);
  return [ic(stmt), r];
});
function require_run(setup, stmt) {
  const v = stmt.startsWith('L') ? 'L' : 't';
  try { return `works: ${ic(pv(code(setup, stmt), v))}`; } catch { return `fails: ${ic(pe(setup, stmt))}`; }
}
const vImm = table(
  ['Statement (L is a list, t is a tuple)', 'Result'],
  immRows,
  `Table comparing changes to a list and a tuple: ${immCases.map(([s], i) => `${s} ${immRows[i][1].replace(/`/g, '')}`).join('; ')}`,
  'Error lines come from running each statement.',
);
const tfSet = 't = (6, 2, 9, 2)';
const tfRows = [['len(t)', 'number of items'], ['t.count(2)', 'times 2 occurs'], ['t.index(9)', 'position of the first 9'], ['min(t)', 'smallest item'], ['max(t)', 'largest item'], ['sum(t)', 'total of the items'], ['sorted(t)', 'a sorted list, not a tuple'], ['tuple(sorted(t))', 'a sorted tuple']];
const vTupleFuncs = table(
  ['Call', `Value for ${tfSet}`, 'Meaning'],
  exprRows(tfSet, tfRows),
  `Table of tuple functions for t equal to (6, 2, 9, 2); the results are ${tfRows.map(([e]) => `${e} gives ${pv(tfSet, e)}`).join('; ')}`,
  'A tuple has only count() and index() as methods.',
);
const vSwap = table(
  ['Method', 'Code', 'a, b afterwards'],
  [['With a helper variable', ic('t = a; a = b; b = t'), ic(pyOut(showSwapTemp))], ['Tuple assignment', ic('a, b = b, a'), ic(pyOut(showSwapTuple))]],
  `Table comparing two ways to swap a equal to 6 and b equal to 11: the helper variable method and the tuple assignment both give ${pyOut(showSwapTemp)}`,
  'Both start from a = 6 and b = 11.',
);
assert.equal(pyOut(showSwapTemp), pyOut(showSwapTuple));
const ntSet = 'info = ("Meera", (10, 12), [3, 4])';
const ntRows = [['info[1]', 'an inner tuple'], ['info[1][0]', 'first item of the inner tuple'], ['info[2][-1]', 'last item of the list'], ['len(info)', 'three items']];
const ntList = pyOut(code(ntSet, 'info[2].append(5)', 'print(info)'));
const vNestedTuple = table(
  ['Expression', 'Value', 'Meaning'],
  [...exprRows(ntSet, ntRows), [ic('info[2].append(5)'), ic(ntList), 'allowed: the list inside can change']],
  `Table of expressions on the tuple info that holds a name, a tuple and a list: ${ntRows.map(([e]) => `${e} gives ${pv(ntSet, e)}`).join('; ')}; after appending 5 to the list inside, info shows ${ntList}`,
  'The tuple cannot change, but a list inside it can.',
);
const vTMean = table(
  ['t', 'total', 'biggest'],
  tMeanRows.map((r) => r.map(String)),
  `Trace table for the tuple 31, 28, 35, 30, 28: the total becomes ${tMeanRows.map((r) => r[1]).join(', ')} and the biggest ${tMeanRows.map((r) => r[2]).join(', ')}; the program prints ${pyOut(showTMean)}`,
  `The last line printed is ${pyOut(showTMean)}.`,
);
const vTSearch = table(
  ['key', 'First index', 'Times it occurs'],
  tSearchRows.map((r) => (r.length === 3 ? r : [r[0], 'absent', '0'])),
  `Table of the results of searching the tuple 31, 28, 35, 30, 28: ${pyOut(showTSearch).split('\n').join('; ')}`,
  'index() and count() are safe only after the membership test.',
);
const vCompare = table(
  ['Feature', 'List', 'Tuple'],
  [
    ['Brackets', 'square `[ ]`', 'round `( )` or none'],
    ['Items can be changed', 'yes (mutable)', 'no (immutable)'],
    ['Methods', '`append`, `insert`, `remove`, `pop`, `sort` and more', '`count` and `index` only'],
    ['One-item form', '`[5]`', '`(5,)`'],
    ['Best for', 'data that grows or changes', 'fixed records and values'],
  ],
  'Comparison table of list and tuple: brackets, whether items can change, available methods, the one-item form and what each is best for',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Max, min, mean', 'start from the first item; mean is `sum(L) / len(L)`'],
    ['Linear search', 'compare each item with the key; `-1` or a flag means not found'],
    ['Frequency', '`count()` for each distinct value; keep a list of those done'],
    ['Nested list', '`L[row][column]`; loop over rows, then over items'],
    ['Tuple', 'immutable; a one-item tuple needs a comma'],
    ['Assignment', 'packing `t = 1, 2`; unpacking `a, b = t`; swap with `a, b = b, a`'],
  ],
  'Summary table of Part 2: maximum, minimum and mean, linear search, frequency, nested lists, tuples and tuple assignment',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Lists and Tuples — Part 1: Lists, Indexing, Mutability and Methods',
  goals: [
    'Create lists and use indexing, slicing, concatenation, repetition and membership',
    'Explain mutability, assign to items and slices, and tell an alias from a copy',
    'Traverse a list with loops and use len, append, extend, insert, remove, pop, count, index, reverse, sort and sorted',
  ],
  slides: [
    sl('title', 'Lists and Tuples', {
      b: 'Part 1 — a **list** keeps many values in one named, ordered, changeable collection.',
      v: vRoute1,
      n: 'Welcome to Chapter six. So far each variable held one value. A list holds many values in order, and it can be changed after it is made. In this first part we learn indexing and slicing, the list operators, why lists can be changed, how to copy them, and the methods that add, remove and sort items.',
    }),
    sl('concept', 'What a list is', {
      b: 'A **list** is an ordered sequence of items written in square brackets. Its items may be of different types.',
      v: vCreate,
      n: 'A list is an ordered sequence written in square brackets, with items separated by commas. The items may be numbers, strings or even other lists. The table shows six ways to create one, including the empty list, and the list function, which turns a string or a range into a list of items.',
    }),
    sl('diagram', 'Indexing: forward and backward', {
      b: 'The first item has index **0**. The last item has index **-1**, whatever the length of the list.',
      v: vIndexSvg,
      n: 'Every item of a list has an index. Counting from the front starts at zero, so the first item has index zero. Counting from the back starts at minus one, so the last item always has index minus one. An index that does not exist, such as one past the end, raises an index error.',
    }),
    sl('concept', 'Slicing', {
      b: 'A slice `L[start:stop:step]` makes a **new list**. The item at `stop` is **not** included.',
      v: vSlices,
      n: 'A slice takes part of a list. We write start, stop and step between square brackets, separated by colons. The item at the stop index is never included. If start or stop is left out, the slice runs to that end. A step of minus one reverses the list. A slice is always a new list.',
    }),
    sl('example', 'Worked example 1: slicing a score list', {
      b: `The table is the output of the program for a list of seven scores.\n\n${F(showScores)}`,
      v: vScores,
      n: 'Here is a list of seven scores, and four different slices of it. The first slice takes the first three scores. The second takes the last two. Starting at index one with a step of two takes every second score. The last slice, with a step of minus one, gives the scores in reverse order. The original list is unchanged.',
    }),
    sl('check', 'Quick check: where a slice stops', {
      b: 'Fill in the blank.',
      chk: 'fb_slice_end',
      n: 'Remember that the stop index of a slice is not included. Work out the last position that is taken.',
    }),
    sl('concept', 'Operators on lists', {
      b: 'Use `+` to join, `*` to repeat, and `in` or `not in` to test membership.',
      v: vOps,
      n: 'Plus joins two lists into a new list, and star repeats a list. The operator in tests whether a value is an item of the list, and not in tests that it is absent. The function len gives the number of items. These operators build new values and leave the original lists alone.',
    }),
    sl('concept', 'Lists are mutable', {
      b: 'A list can be changed **in place**: assign to an item with `p[i]`, or to a slice `p[a:b]`, even with a list of another length.',
      v: vMut,
      n: 'Lists are mutable, which means their items can be changed after the list is made. Assign to an index to change one item. Assign to a slice to replace several items, and the new part may have a different length, so the list grows or shrinks. The table follows one list through four changes.',
    }),
    sl('diagram', 'Alias or copy?', {
      b: '`b = a` gives the same list a second **name**. `list(a)` or `a[:]` builds a **new** list with the same items.',
      v: vAliasSvg,
      n: 'A list name stores a reference to the list. When we write b equals a, both names refer to one and the same list, so a change made through b shows through a. To get an independent copy we use the list function or a full slice. Then the two lists can change separately.',
    }),
    sl('check', 'Quick check: slices and copies', {
      b: 'Choose the correct option.',
      chk: 'ar_slice_copy',
      n: 'Ask yourself whether a slice is the same list as the original or a new one, and what that means for changes.',
    }),
    sl('concept', 'Traversing a list', {
      b: 'Visit every item with `for x in L`. Use `range(len(L))` when you need the **index** or must change items.',
      v: vTrav,
      n: 'To traverse a list, loop over it. The first form gives each item itself, which is simple and clear. The second loops over the indexes using range of len, so we can use both the position and the item, and we can assign to an item. Changing the loop variable of the first form does not change the list.',
    }),
    sl('example', 'Worked example 2: total and mean', {
      b: `Add the items one by one, then divide the total by the number of items.\n\n${F(showMean)}`,
      v: vMean,
      n: 'This program finds the total of four prices and then the arithmetic mean. The running total starts at zero, and each pass of the loop adds one price. The trace table shows the total after every pass. After the loop, the total is divided by the length of the list, which gives the mean.',
    }),
    sl('check', 'Quick check: a method that removes', {
      b: 'True or false?',
      chk: 'tf_remove_all',
      n: 'Think about what the remove method does when the same value occurs more than once in the list.',
    }),
    sl('concept', 'Adding items: append, extend, insert', {
      b: '`append(x)` adds one item at the end. `extend(s)` adds each item of `s`. `insert(i, x)` adds before position `i`.',
      v: vAdd,
      n: 'Append adds one item at the end. Extend adds every item of another list one by one at the end. Insert places an item before a given position and moves the later items along. The trace table shows the list after each call. All three change the list itself and return nothing.',
    }),
    sl('concept', 'Removing items: remove and pop', {
      b: '`remove(x)` deletes the **first** item equal to `x`; it fails if there is none. `pop(i)` removes the item at `i` and **returns** it; `pop()` takes the last.',
      v: vRemove,
      n: 'Remove deletes the first item with a given value, and raises an error if the value is not present. Pop removes the item at a position and gives it back. Without an argument, pop takes the last item. The table shows the list after each call, and the value that pop returned.',
    }),
    sl('concept', 'count, index, min, max and sum', {
      b: 'These calls **read** the list and give a value; none of them changes it.',
      v: vMethods,
      n: 'Count tells how many times a value occurs. Index gives the position of the first occurrence, and raises an error if the value is absent. The functions min, max and sum work on lists of numbers, and len gives the length. None of these calls change the list.',
    }),
    sl('concept', 'sort(), sorted() and reverse()', {
      b: '`sort()` and `reverse()` change the list and return `None`. `sorted(L)` returns a **new** sorted list.',
      v: vSort,
      n: 'The method sort arranges the list in place and returns nothing, so storing its result gives none. The function sorted builds a new sorted list and leaves the original alone. Sort with reverse equal to true gives decreasing order. The method reverse turns the list round in place.',
    }),
    sl('check', 'Quick check: counting grades', {
      b: 'Predict the output.',
      chk: 'co_count_index',
      n: 'Remember that count gives the number of occurrences, even zero, while index gives the position of the first match.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Lists are ordered and mutable. Indexes start at zero from the front and minus one from the back. A slice excludes its stop index and makes a new list. Plain assignment shares a list, while the list function copies it. Sort changes a list, and sorted returns a new one.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'The stop index of a slice and the stop value of `range()` are **never included**.',
        '`b = a` does not copy a list; use `list(a)` or `a[:]` for an independent copy.',
        '`sort()`, `reverse()`, `append()`, `extend()`, `insert()`, `remove()` return **None**; do not store their result.',
        '`append([3, 4])` adds one nested item; `extend([3, 4])` adds two items.',
        'In a trace table, show the **whole list** after every statement.',
      ],
      n: 'Some advice for the exam. The stop index of a slice is never included. Plain assignment does not copy a list, so use the list function or a full slice. Methods such as sort and append return nothing, so do not store their result. Append adds one nested item, extend adds each item. In a trace, show the whole list after every statement.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Lists and Tuples — Part 2: List Programs, Nested Lists and Tuples',
  goals: [
    'Write programs for maximum, minimum, mean, linear search and frequency on a list',
    'Use nested lists with two indexes and traverse them with loops',
    'Create and use tuples, including the one-item tuple, tuple functions, packing, unpacking and swapping',
  ],
  slides: [
    sl('title', 'Programs and Tuples', {
      b: 'Part 2 — **programs** on lists, **nested** lists, and the **tuple**, a list that cannot change.',
      v: vRoute2,
      n: 'Welcome to Part two. First we use what we know about lists in three classic programs: finding the largest and smallest value, searching for a value, and counting how often values occur. Then we look at lists inside lists, and finally at the tuple, which is like a list that can never be changed.',
    }),
    sl('example', 'Worked example 1: maximum and minimum', {
      b: `Start with the first item, then compare every item.\n\n${F(showMax)}`,
      v: vMaxTrace,
      n: 'To find the largest and smallest values, begin by taking the first item as both. Then visit every item. If it is bigger than the largest so far, it becomes the new largest. If it is smaller than the smallest so far, it becomes the new smallest. The trace table shows both values after each pass.',
    }),
    sl('example', 'Worked example 2: linear search', {
      b: `Compare each item with the key and stop at the first match. The value minus one means not found.\n\n${F(showSearch('Tilak'))}`,
      v: vSearchTrace,
      n: 'A linear search looks at the items one by one from the front. The variable pos starts at minus one. When an item equals the key, we store its index and break out of the loop. If the loop ends without a match, pos is still minus one, which tells us the key is not in the list.',
    }),
    sl('example', 'Worked example 3: frequency of each value', {
      b: `Report each distinct value once, using the list \`seen\`, and use \`count()\` for its frequency.\n\n${F(showFreq)}`,
      v: vFreq,
      n: 'To count how often each value occurs, we keep a second list of the values already reported. For each item that is not yet in that list, we add it and print it together with its count. This way every distinct shoe size is printed exactly once, with the number of times it occurs.',
    }),
    sl('check', 'Quick check: planning a search', {
      b: 'Put the steps in order.',
      chk: 'ord_search',
      n: 'Think about what must happen first, what is repeated for every item, and when the key can be declared absent.',
    }),
    sl('concept', 'Nested lists', {
      b: 'A list whose items are lists is a **nested list**. Use two indexes: `rooms[row][column]`.\n\n' + F(showRows),
      v: vRooms,
      n: 'A nested list is a list whose items are themselves lists. We can picture it as rows and columns. To pick one value we use two indexes. The first chooses the row, the second chooses the item inside that row. The function len of the whole list gives the number of rows.',
    }),
    sl('check', 'Quick check: a nested loop', {
      b: 'Predict the output.',
      chk: 'co_nested_traverse',
      n: 'The outer loop takes one inner list at a time. Then the inner loop visits the items of that list.',
    }),
    sl('concept', 'Tuples: creation', {
      b: 'A **tuple** is an ordered sequence in round brackets, or just separated by commas. A one-item tuple needs a **comma**.',
      v: vTupleCreate,
      n: 'A tuple is an ordered sequence, usually written in round brackets. It is the comma that makes a tuple, and the brackets are often optional. A tuple with one item must end with a comma. Without the comma, the brackets just group a number. The tuple function converts a list or a string into a tuple.',
    }),
    sl('concept', 'Tuple operations', {
      b: 'Indexing, slicing, `+`, `*`, `in` and `len()` work as for lists, and they **build new tuples**.',
      v: vTupleOps,
      n: 'Tuples support the same read operations as lists. Indexing and slicing work in the same way, including negative indexes. Plus joins two tuples into a new one, star repeats a tuple, in tests membership, and len counts the items. Each operation gives a new value and leaves the original tuples alone.',
    }),
    sl('concept', 'Tuples are immutable', {
      b: 'An item of a tuple **cannot be assigned**, and a tuple has no `append()`. To get a different tuple, build a new one.',
      v: vImm,
      n: 'A tuple is immutable. Assigning to an item causes a type error, and a tuple has no append method. A list accepts both. We can still make a new tuple by joining tuples, as the last row shows, but the old tuple is not changed. Use a tuple for data that must stay fixed.',
    }),
    sl('concept', 'Tuple functions and methods', {
      b: 'Use `len`, `min`, `max`, `sum`, `sorted` and `tuple()`; the only methods are `count()` and `index()`.',
      v: vTupleFuncs,
      n: 'The functions len, min, max and sum work on tuples of numbers. A tuple has only two methods: count, and index. The function sorted accepts a tuple but always returns a list. If we want a sorted tuple, we pass that list to the tuple function. The last two rows show the difference.',
    }),
    sl('check', 'Quick check: a missing method', {
      b: 'True or false?',
      chk: 'tf_tuple_append',
      n: 'Think about why a tuple, which cannot change, would not have a method that adds items.',
    }),
    sl('diagram', 'Packing and unpacking', {
      b: '**Packing** collects values into a tuple. **Unpacking** assigns the items to variables, in order.',
      v: vPackSvg,
      n: 'Writing several values separated by commas packs them into one tuple. Writing several variables on the left of an assignment unpacks a tuple: the first item goes to the first variable, the second to the second, and so on. The number of variables must match the number of items.',
    }),
    sl('example', 'Worked example 4: swapping two values', {
      b: 'The right side of a tuple assignment is evaluated **first**, so no helper variable is needed.',
      v: vSwap,
      n: 'To swap two values, the old way uses a helper variable. Tuple assignment is shorter. Python first evaluates the whole right side, which gives a tuple with the old values, and only then assigns them. So a and b exchange values with no helper variable, and both methods give the same result.',
    }),
    sl('concept', 'Nested tuples and a list inside a tuple', {
      b: 'Tuples can hold tuples. A tuple holding a **list** keeps the same list, and that list can still change.',
      v: vNestedTuple,
      n: 'Tuples can contain tuples, and we use two indexes to reach an inner item. A tuple can also contain a list. The tuple always refers to the same list, so it is unchanged in that sense, but the list itself is mutable. Appending to it is allowed, and the tuple then shows the longer list.',
    }),
    sl('example', 'Worked example 5: maximum, minimum and mean of a tuple', {
      b: `Loops, \`min()\` and \`sum()\` work on a tuple just as on a list.\n\n${F(showTMean)}`,
      v: vTMean,
      n: 'This program finds the largest reading of a tuple of five temperatures with a loop, the smallest with the function min, and the mean from the total. The trace shows the running total and the largest so far. The tuple is only read, never changed, so a tuple is perfectly suitable.',
    }),
    sl('example', 'Worked example 6: searching a tuple', {
      b: `Test with \`in\` first; then \`index()\` and \`count()\` are safe.\n\n${F(showTSearch)}`,
      v: vTSearch,
      n: 'To search a tuple, first test membership with the operator in. If the key is present, index gives the position of its first occurrence, and count gives its frequency. For a key that is absent, calling index would cause an error, so we print a message instead, as the second row of the table shows.',
    }),
    sl('check', 'Quick check: unpacking', {
      b: 'Fill in the blanks.',
      chk: 'fb_pack_unpack',
      n: 'Recall which operation collects values into a tuple, and which one spreads a tuple over variables.',
    }),
    sl('concept', 'List or tuple?', {
      b: 'Choose a **list** for data that changes, and a **tuple** for fixed records.',
      v: vCompare,
      n: 'Choose a list when the data will grow, shrink or be edited. Choose a tuple for a fixed record, such as a date or a point, because it protects the data from changes by mistake. Both are ordered, both support indexing and slicing, and both can be traversed with a for loop.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. For maximum and minimum, start from the first item. For a search, compare each item with the key. For frequency, use count once for each distinct value. A nested list needs two indexes. A tuple cannot change, a one item tuple needs a comma, and tuple assignment can swap two values.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write a one-item tuple as `(5,)`; `(5)` is only the number 5.',
        'Assigning to a tuple item is a **TypeError**; build a new tuple by joining slices instead.',
        '`sorted()` of a tuple is a **list**; wrap it in `tuple()` for a tuple.',
        'Start a maximum or minimum search from `L[0]`, not from `0`.',
        'Test `key in L` before `L.index(key)` or `L.remove(key)`; both fail if the key is absent.',
      ],
      n: 'Some advice for the exam. A one item tuple needs a comma. Assigning to an item of a tuple causes a type error. The function sorted always returns a list. Start a maximum or minimum search from the first item, not from zero. Test membership before calling index or remove, because both fail when the value is absent.',
    }),
  ],
});

// narration limit of the brief (66 words)
const longN = [part1, part2].flatMap((d) => d.slides.filter((s) => wordsOf(s.narration) > 66).map((s) => d.part + '/' + s.id + ': ' + wordsOf(s.narration)));
assert.equal(longN.length, 0, 'narration over 66 words: ' + longN.join(', '));

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Lists and Tuples — Notes',
  sections: [
    {
      h: '1. Lists: creation, indexing, slicing and operators',
      t: 1,
      b: 'A **list** is an ordered sequence of items in square brackets; the items may be of different types, and a list may be empty. `list()` converts a string, a range or a tuple into a list.\n\n- **Indexing:** the first item has index 0 and the last has index -1; a missing index raises an `IndexError`.\n- **Slicing:** `L[start:stop:step]` makes a **new list**; the stop index is excluded; a negative step goes backwards, and `L[::-1]` reverses.\n- **Operators:** `+` concatenates, `*` repeats, `in` and `not in` test membership; `len(L)` gives the number of items.',
      terms: [
        ['List', 'An ordered, mutable sequence of items written in square brackets.'],
        ['Index', 'The position of an item: from 0 at the front, or from -1 at the back.'],
        ['Slice', 'A new list made from part of a list, with `[start:stop:step]`; the stop index is excluded.'],
      ],
      v: vCreate,
      vs: [vIndexSvg, vSlices, vOps],
    },
    {
      h: '2. Mutability, aliasing and traversal',
      t: 1,
      b: 'A list is **mutable**: an item can be assigned (`L[i] = x`) and a slice can be replaced by a list of any length (`L[a:b] = [...]`). The list object is changed in place.\n\nA list name holds a **reference**. After `b = a` the names `a` and `b` refer to the **same list**, so a change through one shows through the other; `a is b` is `True`. `list(a)` and `a[:]` build an independent **copy**.\n\nTo **traverse**, use `for x in L` (items) or `for i in range(len(L))` (indexes). Assigning to the loop variable `x` does not change the list; assigning to `L[i]` does.',
      terms: [
        ['Mutable', 'Can be changed after it is created, in place.'],
        ['Alias', 'A second name that refers to the same list object.'],
        ['Traversal', 'Visiting every item of a sequence with a loop.'],
      ],
      v: vMut,
      vs: [vAliasSvg, vAliasTbl, vTrav],
    },
    {
      h: '3. List methods and functions',
      t: 1,
      b: '- **Add:** `append(x)` adds one item at the end; `extend(s)` adds each item of `s`; `insert(i, x)` adds before position `i`.\n- **Remove:** `remove(x)` deletes the first item equal to `x` (a `ValueError` if absent); `pop(i)` removes and returns the item at `i`; `pop()` takes the last item.\n- **Read:** `count(x)`, `index(x)` (a `ValueError` if absent), `len`, `min`, `max`, `sum`.\n- **Order:** `sort()` and `reverse()` change the list in place and return `None`; `sorted(L)` returns a new sorted list; `sort(reverse=True)` gives decreasing order.',
      terms: [
        ['append()', 'Adds one item at the end of a list.'],
        ['extend()', 'Adds each item of another sequence at the end of a list.'],
        ['sorted()', 'A function that returns a new sorted list and leaves the original unchanged.'],
      ],
      v: vAdd,
      vs: [vRemove, vMethods, vSort],
    },
    {
      h: '4. Nested lists and programs on lists',
      t: 1,
      b: 'A **nested list** has lists as items; `L[r][c]` picks row `r`, column `c`, and a loop inside a loop visits every item.\n\nStandard programs:\n- **Maximum and minimum:** start from `L[0]` and replace it when a better item appears.\n- **Mean:** `sum(L) / len(L)`, or a running total divided by the length.\n- **Linear search:** compare each item with the key from the front; stop at the first match, or report not found (a position of `-1` or a flag).\n- **Frequency:** `L.count(v)` for each distinct value; keep the values already reported in a second list.',
      terms: [
        ['Nested list', 'A list whose items are themselves lists.'],
        ['Linear search', 'Comparing the key with each item in turn from the first.'],
        ['Frequency', 'The number of times a value occurs in a sequence.'],
      ],
      v: vRooms,
      vs: [vRoomIdx, vMaxTrace, vSearchTrace, vSearchFlow, vFreq],
    },
    {
      h: '5. Tuples: creation, operations and immutability',
      t: 2,
      b: 'A **tuple** is an ordered, **immutable** sequence written in round brackets (or only with commas). `()` is the empty tuple and a **one-item tuple needs a comma**: `(5,)`; `(5)` is a number. `tuple()` converts a list or a string.\n\nIndexing, slicing, `+`, `*`, `in` and `len` work as for lists and build new tuples. Assigning to an item raises a `TypeError`, and a tuple has no `append()`, `remove()` or `sort()`. Its methods are `count()` and `index()`; the functions `len`, `min`, `max`, `sum` and `sorted` also work (`sorted` returns a **list**).',
      terms: [
        ['Tuple', 'An ordered, immutable sequence written in round brackets.'],
        ['Immutable', 'Cannot be changed after it is created.'],
      ],
      v: vTupleCreate,
      vs: [vTupleOps, vImm, vTupleFuncs],
    },
    {
      h: '6. Tuple assignment, nested tuples and programs',
      t: 2,
      b: '**Packing** puts values into a tuple (`t = 4, 5, 6`); **unpacking** assigns its items to variables in order (`a, b, c = t`), and the number of variables must equal the number of items. The right side is evaluated first, so `a, b = b, a` **swaps** two values with no helper variable.\n\nA tuple can hold other tuples (`T[i][j]`) or even a list; the tuple cannot be changed, but a list inside it can. To get a changed tuple, build a new one, for example by joining slices.\n\nThe programs of the lists (maximum, minimum, mean, linear search and frequency) work on a tuple too, since they only read it; use `in` before `index()`.',
      terms: [
        ['Packing', 'Collecting values into a tuple.'],
        ['Unpacking', 'Assigning the items of a tuple to separate variables.'],
      ],
      v: vPackSvg,
      vs: [vSwap, vNestedTuple, vTMean, vTSearch, vCompare],
    },
  ],
  tips: '**Common mistakes**\n- Reading `L[len(L)]`; the last index is `len(L) - 1`, or just -1.\n- Expecting a slice to include its stop index.\n- Using `b = a` and expecting a copy.\n- Storing the result of `sort()` or `append()` (it is `None`).\n- Confusing `append([3, 4])` with `extend([3, 4])`.\n- Calling `remove()` or `index()` for a value that is not in the list.\n- Writing `(5)` for a one-item tuple, or assigning to a tuple item.\n- Starting a maximum search from `0`, which fails for negative numbers.\n\n**How marks are usually awarded**\n- Output questions: the exact output, line by line, with the list or tuple brackets and quotes as Python prints them.\n- Error-finding: naming the error, then the corrected program.\n- Programs: marks for the input, the loop, the comparison or update, the result and the output for the given input.\n- Trace tables: the whole list after every statement, and the final output.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is a **list** in Python?', 'An ordered, mutable sequence of items written in square brackets; the items may be of different types.', 'definition', 1],
  ['What are the indexes of the first and the last item of a list?', '0 for the first; -1 for the last (or `len(L) - 1`).', 'fact', 1],
  [`${ic('marks[2:5]')} for ${ic(marksSet.slice(8))}: value?`, `${ic(pv(marksSet, 'marks[2:5]'))}: the stop index 5 is excluded.`, 'example', 1],
  [`${ic('marks[::-1]')} gives what?`, `A reversed **copy**: ${ic(pv(marksSet, 'marks[::-1]'))}.`, 'example', 1],
  ['Does a slice change the list it is taken from?', '**No.** A slice is a new list.', 'concept', 1],
  ['What do `+` and `*` do to lists?', '`+` joins two lists into a new one; `*` repeats a list; the original lists are unchanged.', 'fact', 1],
  ['What does **mutable** mean?', 'The object can be changed in place after it is created.', 'definition', 1],
  ['What happens after `b = a` when `a` is a list?', 'Both names refer to the **same** list; a change through one shows through the other.', 'concept', 1],
  ['How do you make an independent copy of a list?', '`b = list(a)` or `b = a[:]`.', 'exam-tip', 1],
  ['What is the difference between `for x in L` and `for i in range(len(L))`?', 'The first gives each item; the second gives each index, so items can be changed with `L[i] = ...`.', 'concept', 1],
  ['What do `append(x)` and `extend(s)` do?', '`append` adds `x` as one item at the end; `extend` adds each item of `s` at the end.', 'concept', 1],
  [`After ${ic('s = [1, 2]')} then ${ic('s.append([3, 4])')}, what is ${ic('len(s)')}?`, `${ic(pyOut(code('s = [1, 2]', 's.append([3, 4])', 'print(len(s))')))}, because the list [3, 4] is one nested item.`, 'example', 1],
  ['What does `insert(i, x)` do?', 'Places `x` before position `i` and moves the later items to the right.', 'fact', 1],
  ['What is the difference between `remove(x)` and `pop(i)`?', '`remove` deletes the first item equal to `x`; `pop` removes the item at position `i` and returns it.', 'concept', 1],
  ['What do `index(x)` and `remove(x)` do if `x` is not in the list?', 'Both raise a `ValueError`; test with `in` first.', 'exam-tip', 1],
  ['What is the difference between `sort()` and `sorted()`?', '`sort()` sorts in place and returns `None`; `sorted()` returns a new sorted list.', 'exam-tip', 1],
  ['How do you start a program for the **maximum** of a list?', 'Take the first item, `L[0]`, as the largest so far, then compare every item.', 'concept', 1],
  ['How do you find the **mean** of a list of numbers?', '`sum(L) / len(L)`.', 'fact', 1],
  ['How does a **linear search** work?', 'It compares the key with each item from the front; it stops at the first match or reports not found at the end.', 'concept', 1],
  ['What does `L[2][1]` mean for a nested list?', 'The item at index 1 of the inner list at index 2: row 2, column 1.', 'concept', 1],
  ['What is a **tuple**?', 'An ordered, immutable sequence written in round brackets (or with commas).', 'definition', 2],
  ['How do you write a tuple with one item, 5?', `${ic('(5,)')}; ${ic('(5)')} is only the number 5, of type ${ic(val('type((5)).__name__'))}.`, 'exam-tip', 2],
  ['What happens if you assign to an item of a tuple?', `Python raises ${ic(pe('t = (1, 2, 3)', 't[0] = 9'))}.`, 'exam-tip', 2],
  ['Which methods does a tuple have?', 'Only `count()` and `index()`; it has no `append()` or `sort()`.', 'fact', 2],
  [`What is ${ic('sorted((5, 2, 8))')}?`, `${ic(val('sorted((5, 2, 8))'))}, a **list**, not a tuple.`, 'example', 2],
  ['What are tuple **packing** and **unpacking**?', 'Packing: `t = 4, 5, 6` collects values into a tuple. Unpacking: `a, b, c = t` assigns the items to variables in order.', 'definition', 2],
  [`After ${ic('a, b = 6, 11')} and ${ic('a, b = b, a')}, what are a and b?`, `${ic(pyOut(showSwapTuple))}: the right side is evaluated first, so no helper variable is needed.`, 'example', 2],
  ['Can a tuple that contains a list change?', '**Not its items**, but the list inside it is mutable and can be changed in place.', 'concept', 2],
  [`What is ${ic('(1, 2) * 2 + (3,)')}?`, `${ic(val('(1, 2) * 2 + (3,)'))}`, 'example', 2],
  ['When is a tuple a better choice than a list?', 'For fixed data that must not be changed by mistake, such as a point or the days of each month.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests (cbse-11-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Lists and Tuples',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_neg_index', 'm_remove_pop', 'm_one_elem', 'ar_alias'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s2_err_index', 's2_pack_unpack', 's3_trace_methods'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions. Show the program and its output.', items: [{ attempt: 1, keys: ['l_stats_input', 'l_tuple_stats'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_queue'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Lists and Tuples',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_slice_back', 'm_alias', 'm_append_extend', 'm_nested_idx', 'm_traverse_modify', 'm_tuple_err', 'm_unpack_swap', 'm_nested_tuple_mut', 'ar_sorted', 'ar_tuple_imm'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words.', items: ['s2_err_remove', 's2_alias_copy', { attempt: 1, keys: ['s2_slice_results', 's2_tuple_vs_list'] }, 's3_bug_max', { attempt: 1, keys: ['s3_search_prog', 's3_swap_trace'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18.', items: ['l_matrix', { attempt: 1, keys: ['l_frequency', 'l_list_menu'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_scores', 'cb_rainfall'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 (list operations, methods and nested lists; max, min, mean, linear search and frequency programs) and t02 (tuples: operations, functions, packing and unpacking, nested tuples, programs) of cbse-11-computer-science-ch06 only; no def functions and no dictionaries',
    originality: 'every program, scenario and data value written for this chapter by SOYL; no textbook, NCERT or board-paper program reused',
    execution: 'every output, trace, count and error message in items, slides, notes and flashcards produced by running the program (runPy in lib.mjs); results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
