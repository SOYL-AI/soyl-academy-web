// Build CBSE 11 Computer Science ch07 Dictionaries and Python Modules. Run from platform/:
//   npx tsx content/authored/computer-science/cbse-11-computer-science-ch07/src/build.mjs
// Every output, trace table, count and error message shown in decks, notes and flashcards is produced by running the
// Python program with pyOut()/pyErr() (recorded in src/py-cache.json); nothing is typed by hand. Random code is shown
// only with its POSSIBLE outputs, enumerated in hidden Python and cross-checked against thousands of real runs.
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, setAuthor, deck, sl, table, flow, notes, cards, test, build, Svg, usePyCache, pyOut, pyErr } from './lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('cbse-11-computer-science-ch07', 'computer-science');
setAuthor('claude-sonnet-5-5 (writer; reviewed by the subject-producer)');
usePyCache(SRC);
const { F, O, code, ic, rowsOf, mdTable, val, pv, pe, traceDict, possible } = await import('./questions.mjs');
const DIR = path.resolve(SRC, '..');
const wordsOf = (s) => s.trim().split(/\s+/).length;
const json = (setup, expr) => JSON.parse(pyOut(code(setup, 'import json', `print(json.dumps(${expr}))`)));
/** One-line table cells: the statement as inline code and its value from a run. */
const exprRows = (setup, exprs) => exprs.map(([e, note]) => [ic(e), ic(pv(setup, e)), note]);
const tr = (name, stmts, setup) => traceDict(name, stmts, setup).map(([s, l]) => [ic(s), ic(l)]);
/** Value of an expression, or its error line when it fails. */
const evalOrErr = (setup, expr) => {
  try { return ic(pv(setup, expr)); } catch { return ic(pe(setup, `print(${expr})`)); }
};
/** Rows [statement, value returned, dictionary afterwards] for expressions and statements run in order. */
const stepRows = (name, setup, stmts) =>
  rowsOf(code(setup, 'import json', `STMTS = ${JSON.stringify(stmts)}`, 'rows = []', 'for s in STMTS:', '    try:', '        r = repr(eval(s))', '    except SyntaxError:', '        exec(s)', '        r = ""', `    rows.append([s, r, str(${name})])`, 'print(json.dumps(rows))'));
const stepTable = (name, setup, stmts, alt, caption) => {
  const rows = stepRows(name, setup, stmts);
  return { rows, v: table(['Statement run in this order', 'Value it returns', `${name} afterwards`], [['(start)', '', ic(pv(setup, name))], ...rows.map(([s, r, d]) => [ic(s), r ? ic(r) : '', ic(d)])], alt(rows), caption) };
};

// ---------------------------------------------------------------- SVG diagrams
const ST = { fill: 'fill', color: 'accent', sw: 1.6 };
const dictItems = json('d = {"pen": 12, "ink": 40, "pad": 55}', 'list(d.items())');
const vDictSvg = (() => {
  const s = new Svg(520, 200);
  s.text(120, 18, 'keys (unique, immutable)', { size: 13, bold: true, color: 'accent' });
  s.text(400, 18, 'values (any type)', { size: 13, bold: true, color: 'accent' });
  dictItems.forEach(([k, v], i) => {
    const y = 40 + i * 52;
    s.rect(60, y, 120, 38, { ...ST, rx: 4 }); s.text(120, y + 19, `"${k}"`, { size: 15 });
    s.rect(340, y, 120, 38, { ...ST, rx: 4 }); s.text(400, y + 19, String(v), { size: 15 });
    s.arrow(180, y + 19, 340, y + 19, { sw: 1.6 });
  });
  return s.visual(`Diagram of a dictionary with three key-value pairs: ${dictItems.map(([k, v]) => `the key ${k} points to the value ${v}`).join('; ')}`, 'Each key leads to exactly one value; the pairs are written key: value.');
})();
const cpText = val('{"n": 1}');
const vCopySvg = (() => {
  const s = new Svg(560, 220);
  s.text(130, 18, 'b = a', { size: 14, bold: true, color: 'accent' });
  s.text(430, 18, 'c = a.copy()', { size: 14, bold: true, color: 'accent' });
  s.rect(10, 35, 40, 28, { ...ST, rx: 4 }); s.text(30, 49, 'a');
  s.rect(10, 110, 40, 28, { ...ST, rx: 4 }); s.text(30, 124, 'b');
  s.rect(150, 70, 120, 40, { ...ST, rx: 4 }); s.text(210, 90, cpText);
  s.arrow(50, 49, 150, 80, { sw: 1.6 }); s.arrow(50, 124, 150, 100, { sw: 1.6 });
  s.text(210, 128, 'one dictionary, two names', { size: 12, muted: true });
  s.rect(320, 35, 40, 28, { ...ST, rx: 4 }); s.text(340, 49, 'a');
  s.rect(320, 130, 40, 28, { ...ST, rx: 4 }); s.text(340, 144, 'c');
  s.rect(440, 35, 110, 36, { ...ST, rx: 4 }); s.text(495, 53, cpText);
  s.rect(440, 130, 110, 36, { ...ST, rx: 4 }); s.text(495, 148, cpText);
  s.arrow(360, 49, 440, 49, { sw: 1.6 }); s.arrow(360, 144, 440, 148, { sw: 1.6 });
  s.text(495, 190, 'two dictionaries, same pairs', { size: 12, muted: true });
  return s.visual(`Diagram with two panels. Left panel: the names a and b both point by arrows to one single dictionary ${cpText}. Right panel: the name a points to one dictionary ${cpText} and the name c points to a different, separate dictionary with the same pair`, 'b = a shares the dictionary; copy() builds a new one.');
})();
const vNameSvg = (() => {
  const s = new Svg(560, 210);
  s.text(140, 16, 'import math', { size: 14, bold: true, color: 'accent' });
  s.text(430, 16, 'from math import sqrt', { size: 14, bold: true, color: 'accent' });
  s.rect(20, 40, 70, 30, { ...ST, rx: 4 }); s.text(55, 55, 'math');
  s.rect(150, 30, 220, 110, { ...ST, rx: 8 }); s.text(260, 45, 'the module math', { size: 12, muted: true });
  ['pi', 'sqrt()', 'ceil()', 'floor()'].forEach((n, i) => s.text(190 + (i % 2) * 100, 75 + Math.floor(i / 2) * 32, n, { size: 14 }));
  s.arrow(90, 55, 150, 70, { sw: 1.6 });
  s.text(190, 170, 'call: math.sqrt(9)', { size: 14, bold: true });
  s.rect(400, 40, 70, 30, { ...ST, rx: 4 }); s.text(435, 55, 'sqrt');
  s.rect(500, 40, 50, 30, { ...ST, rx: 4 }); s.text(525, 55, 'f');
  s.arrow(470, 55, 500, 55, { sw: 1.6 });
  s.text(480, 100, 'only the name sqrt is created', { size: 12, muted: true });
  s.text(465, 170, 'call: sqrt(9)', { size: 14, bold: true });
  return s.visual('Diagram with two panels. Left panel: after import math, the name math points to the whole module that holds pi, sqrt, ceil and floor, so the call is written math.sqrt(9). Right panel: after from math import sqrt, only the name sqrt is created and points to the function, so the call is written sqrt(9)', 'import math brings the module name; from math import brings only the named items.');
})();
const rngCalls = [
  ['randint(3, 7)', "random.randint(3, 7)", 'range(3, 8)'],
  ['randrange(3, 7)', "random.randrange(3, 7)", 'range(3, 7)'],
  ['randrange(3, 12, 4)', "random.randrange(3, 12, 4)", 'range(3, 12, 4)'],
];
const rngVals = rngCalls.map(([, call, rg]) => [...possible(code('import random', `k = ${call}`, 'print(k)'), [['k', rg]], 'str(k)')].map(Number).sort((a, b) => a - b));
const vRngSvg = (() => {
  const s = new Svg(560, 230);
  rngCalls.forEach(([lbl], i) => {
    const y = 60 + i * 62;
    s.text(20, y - 28, lbl, { size: 14, bold: true, color: 'accent', anchor: 'start' });
    s.line(30, y, 530, y, { sw: 1.4 });
    for (let v = 0; v <= 12; v++) {
      const x = 30 + v * 40;
      s.line(x, y - 4, x, y + 4, { sw: 1 });
      if (i === 2) s.text(x, y + 18, String(v), { size: 11, muted: true });
    }
    rngVals[i].forEach((v) => s.dot(30 + v * 40, y, 7));
  });
  return s.visual(`Number lines from 0 to 12 showing the whole numbers each call can return: randint(3, 7) can return ${rngVals[0].join(', ')}; randrange(3, 7) can return ${rngVals[1].join(', ')}; randrange(3, 12, 4) can return ${rngVals[2].join(', ')}`, 'Dots mark the possible values; randrange never returns its stop value.');
})();

// ---------------------------------------------------------------- Part 1 visuals (dictionaries)
const vRoute1 = flow('LR', ['What a dictionary is', 'Creating and accessing', 'Changing and traversing', 'Functions and methods', 'Programs'], 'Route map of Part 1: what a dictionary is, creating and accessing items, changing and traversing, functions and methods, and programs', 'Part 1 at a glance');
const createRows = [['{}', 'an empty dictionary'], ['{"red": 3, "blue": 5}', 'key: value pairs in braces'], ['dict([("a", 1), ("b", 2)])', 'from a list of pairs'], ['dict(x=1, y=2)', 'keywords become string keys'], ['dict.fromkeys(["p", "q"], 0)', 'one starting value for every key']];
const vCreate = table(['Statement', 'Value', 'Note'], createRows.map(([e, n]) => [ic(e), ic(val(e)), n]), `Table of five ways to create a dictionary: ${createRows.map(([e]) => `${e} gives ${val(e)}`).join('; ')}`, 'Values found by running each statement.');
const accSet = 'price = {"tea": 15, "bun": 12}';
const accRows = [['price["tea"]', 'key found'], ['price.get("bun")', 'key found'], ['price["jam"]', 'missing key: error'], ['price.get("jam")', 'missing key: None'], ['price.get("jam", 0)', 'missing key: the default']];
const vAccess = table(['Expression', 'Result', 'Note'], accRows.map(([e, n]) => [ic(e), evalOrErr(accSet, e), n]), `Table of five ways to read the dictionary price equal to tea 15 and bun 12: ${accRows.map(([e]) => `${e} gives ${pyOutOrErr(accSet, e)}`).join('; ')}`, 'Square brackets raise a KeyError; get() does not.');
function pyOutOrErr(setup, e) { try { return pv(setup, e); } catch { return pe(setup, `print(${e})`); } }
const mutSet = 'shop = {"tea": 15, "bun": 12}';
const mutStmts = ['shop["jam"] = 40', 'shop["tea"] = 18', 'shop["bun"] += 3'];
const vMut = table(['Statement run in this order', 'shop afterwards'], [[ic(mutSet), ic(pv(mutSet, 'shop'))], ...tr('shop', mutStmts, mutSet)], `Table showing the dictionary shop changing as three statements run: ${traceDict('shop', mutStmts, mutSet).map(([s, l]) => `after ${s} it is ${l}`).join('; ')}`, 'A new key adds a pair; an existing key has its value replaced.');
const keyRows = [['{"a": 1, "a": 2}', 'a repeated key keeps the last value'], ['{(1, 2): "point"}', 'a tuple is immutable: allowed'], ['{"k": [1, 2]}', 'a list is allowed as a value'], ['{k: "point"}', 'k holds a list a list is mutable, so not allowed as a key', 'k = [1, 2]']];
const vKeys = table(['Literal', 'Result', 'Rule'], keyRows.map(([e, n, su = '']) => [ic(e), evalOrErr(su, e), n]), `Table of four dictionary literals and what happens: ${keyRows.map(([e, , su = '']) => `${e}${su ? ` where ${su}` : ''} gives ${pyOutOrErr(su, e)}`).join('; ')}`, 'Keys: unique and immutable. Values: anything.');
const travSet = 'marks = {"Ria": 82, "Sam": 74}';
const travLoops = [['for k in marks:\n    print(k)', 'for k in marks: print(k)'], ['for v in marks.values():\n    print(v)', 'for v in marks.values(): print(v)'], ['for k, v in marks.items():\n    print(k, v)', 'for k, v in marks.items(): print(k, v)']];
const travWhat = ['each key', 'each value', 'each key and value pair'];
const vTrav = table(['Loop', 'Output, line by line', 'It gives you'], travLoops.map(([c, sh], i) => [ic(sh), ic(pyOut(code(travSet, c)).replace(/\n/g, ' / ')), travWhat[i]]), `Table of three ways to traverse the dictionary marks equal to Ria 82 and Sam 74; the lines printed are ${travLoops.map(([c, sh]) => `${sh} prints ${pyOut(code(travSet, c)).replace(/\n/g, ' then ')}`).join('; ')}`, 'The lines of each output are shown separated by a slash.');
const staffSet ='staff = {"Hema": 36000, "Imran": 41500, "Jaya": 29800}';
const staffProg = code(staffSet, 'print(staff["Imran"])', 'staff["Jaya"] += 2200', 'staff["Kiran"] = 33000', 'total = 0', 'for name in staff:', '    total += staff[name]', 'print(len(staff), total)');
const staffStmts = ['staff["Jaya"] += 2200', 'staff["Kiran"] = 33000'];
const vStaff = table(['Step', 'staff afterwards', 'Printed'], [['start', ic(pv(staffSet, 'staff')), ''], ['print(staff["Imran"])', ic(pv(staffSet, 'staff')), ic(pv(staffSet, 'staff["Imran"]'))], ...traceDict('staff', staffStmts, staffSet).map(([s, l]) => [ic(s), ic(l), '']), ['loop and last print', ic(pv(code(staffSet, ...staffStmts), 'staff')), ic(pyOut(staffProg).split('\n').pop())]], `Table following the dictionary staff through the program: the salary of Imran is printed first, then Jaya gets a raise and Kiran is added; the last line printed is ${pyOut(staffProg).split('\n').pop()}`, `The program prints ${pyOut(staffProg).replace(/\n/g, ' and then ')}.`);
const fnSet = 't = {"x": 3, "y": 8, "z": 5}';
const fnRows = [['len(t)', 'number of pairs'], ['list(t.keys())', 'the keys'], ['list(t.values())', 'the values'], ['list(t.items())', 'the pairs, as tuples'], ['"y" in t', 'membership tests keys'], ['8 in t', 'a value is not a key']];
const vFuncs = table(['Call', `Value for ${fnSet.slice(4)}`, 'Meaning'], exprRows(fnSet, fnRows), `Table of dictionary functions for t equal to x 3, y 8, z 5; the results are ${fnRows.map(([e]) => `${e} gives ${pv(fnSet, e)}`).join('; ')}`, 'keys(), values() and items() return views; list() makes them lists.');
const gm = stepTable('box', 'box = {"cap": 4, "lid": 6}', ['box.get("cap")', 'box.get("jar", 9)', 'box.update({"lid": 7, "jar": 2})', 'box.setdefault("cap", 50)', 'box.setdefault("tin", 50)'], (rows) => `Table of get, update and setdefault on the dictionary box: ${rows.map(([s, r, d]) => `${s} returns ${r || 'nothing'} and box becomes ${d}`).join('; ')}`, 'update() overwrites existing keys; setdefault() never overwrites.');
const rm = stepTable('bag', 'bag = {"a": 1, "b": 2, "c": 3, "d": 4}', ['bag.pop("b")', 'bag.popitem()', 'del bag["a"]', 'bag.clear()'], (rows) => `Table of the ways to remove pairs from the dictionary bag: ${rows.map(([s, r, d]) => `${s} returns ${r || 'nothing'} and bag becomes ${d}`).join('; ')}`, 'pop() takes a key; popitem() takes the last pair; del and clear() return nothing.');
const mmSet = 's = {"Pia": 88, "Ravi": 64, "Tej": 75}';
const mmRows = [['max(s)', 'largest key (text order)'], ['min(s)', 'smallest key'], ['max(s.values())', 'largest value'], ['min(s.values())', 'smallest value'], ['sorted(s)', 'keys in order, as a list'], ['sorted(s.values())', 'values in order, as a list'], ['sum(s.values())', 'total of the values']];
const vMaxMin = table(['Call', `Value for ${mmSet.slice(4)}`, 'Meaning'], exprRows(mmSet, mmRows), `Table of max, min, sorted and sum applied to the dictionary s equal to Pia 88, Ravi 64, Tej 75; the results are ${mmRows.map(([e]) => `${e} gives ${pv(mmSet, e)}`).join('; ')}`, 'On the dictionary itself the functions work on the keys.');
const balRows = json(code('word = "balloon"', 'freq = {}', 'rows = []', 'for ch in word:', '    freq[ch] = freq.get(ch, 0) + 1', '    rows.append([ch, str(freq)])'), 'rows');
const balProg = code('word = "balloon"', 'freq = {}', 'for ch in word:', '    freq[ch] = freq.get(ch, 0) + 1', 'print(freq)');
const vBal = table(['ch', 'freq after the pass'], balRows.map(([c, f]) => [c, ic(f)]), `Trace table of counting the characters of balloon: ${balRows.map(([c, f]) => `after ${c} the dictionary is ${f}`).join('; ')}; the program prints ${pyOut(balProg)}`, `The program prints ${pyOut(balProg)}.`);
const vSummary1 = table(['Idea', 'Remember'], [
  ['Dictionary', 'unordered by position, but keeps insertion order; pairs `key: value` in braces'],
  ['Keys', 'unique and immutable (string, number, tuple); a list key is a `TypeError`'],
  ['Reading', '`d[key]` raises `KeyError`; `d.get(key, default)` does not'],
  ['Changing', 'assign to a new key to add, to an old key to change; `update()` merges'],
  ['Removing', '`pop(key)`, `popitem()`, `del d[key]`, `clear()`'],
  ['Loops and tests', '`for k in d` gives keys; `in` tests keys; `items()` gives pairs'],
], 'Summary table of Part 1: dictionary basics, keys, reading, changing, removing, loops and membership');

// ---------------------------------------------------------------- Part 2 visuals (modules)
const vRoute2 = flow('LR', ['Modules and import', 'The math module', 'The random module', 'The statistics module', 'Putting it together'], 'Route map of Part 2: modules and import, the math module, the random module, the statistics module, and putting them together', 'Part 2 at a glance');
const impRows = [['import math', 'math.sqrt(9)'], ['import math', 'sqrt(9)'], ['from math import sqrt, pi', 'sqrt(9) + pi'], ['from math import sqrt', 'math.sqrt(9)'], ['import math as m', 'm.floor(2.7)']];
const vImports = table(['Import statement', 'Then we write', 'Result'], impRows.map(([i, e]) => [ic(i), ic(e), evalOrErr(i, e)]), `Table of import statements and the calls that follow: ${impRows.map(([i, e]) => `after ${i}, ${e} gives ${pyOutOrErr(i, e)}`).join('; ')}`, 'The form of the import decides how the name is written.');
const mathRows = [['math.pi', 'the constant pi'], ['math.e', 'the constant e'], ['math.sqrt(144)', 'square root: always a float'], ['math.ceil(2.1)', 'round up to an integer'], ['math.floor(2.9)', 'round down to an integer'], ['math.pow(2, 5)', 'power: always a float'], ['math.fabs(-6.5)', 'absolute value: a float']];
const vMath = table(['Expression', 'Value', 'Meaning'], exprRows('import math', mathRows), `Table of the math module: ${mathRows.map(([e]) => `${e} gives ${pv('import math', e)}`).join('; ')}`, 'Values found by running each expression.');
const cfRows = json(code('import math', 'xs = [6.1, -6.1, 8, -0.9]', 'rows = []', 'for x in xs:', '    rows.append([x, math.ceil(x), math.floor(x)])'), 'rows');
const vCeilFloor = table(['x', 'math.ceil(x)', 'math.floor(x)'], cfRows.map((r) => r.map(String)), `Table of ceil and floor for four numbers: ${cfRows.map(([x, c, f]) => `for ${x}, ceil gives ${c} and floor gives ${f}`).join('; ')}`, 'For a negative number, floor moves away from zero.');
const trigRows = [['math.sin(0)', 'angle 0'], ['math.sin(math.pi / 2)', 'angle pi by 2 radians'], ['math.cos(math.pi)', 'angle pi radians'], ['math.tan(math.pi / 4)', 'angle pi by 4 radians'], ['math.sin(math.pi)', 'exact zero in mathematics'], ['round(math.sin(math.pi), 6)', 'rounded to 6 places']];
const vTrig = table(['Expression', 'Value printed by Python', 'Note'], exprRows('import math', trigRows), `Table of sin, cos and tan for angles in radians: ${trigRows.map(([e]) => `${e} gives ${pv('import math', e)}`).join('; ')}`, 'Angles are in radians; floating point arithmetic leaves tiny errors.');
const ladProg = code('import math', 'base = 6', 'height = 8', 'slant = math.sqrt(base ** 2 + height ** 2)', 'print(slant)', 'print(math.ceil(slant / 3))');
const ladRows = json(code('import math', 'base = 6', 'height = 8', 'slant = math.sqrt(base ** 2 + height ** 2)', 'rows = [["base", base], ["height", height], ["base ** 2 + height ** 2", base ** 2 + height ** 2], ["slant", slant], ["math.ceil(slant / 3)", math.ceil(slant / 3)]]'), 'rows');
const vLadder = table(['Step', 'Value'], ladRows.map(([s, v]) => [ic(s), ic(String(v))]), `Table following the ladder program: ${ladRows.map(([s, v]) => `${s} is ${v}`).join('; ')}; it prints ${pyOut(ladProg).replace(/\n/g, ' and ')}`, `The program prints ${pyOut(ladProg).replace(/\n/g, ' and ')}.`);
const rngTblRows = [['random.randint(1, 4)', 'range(1, 5)'], ['random.randrange(1, 4)', 'range(1, 4)'], ['random.randrange(0, 20, 5)', 'range(0, 20, 5)'], ['random.randrange(6)', 'range(6)']].map(([c, rg]) => {
  const vals = [...possible(code('import random', `k = ${c}`, 'print(k)'), [['k', rg]], 'str(k)')].map(Number).sort((a, b) => a - b);
  return [ic(c), vals.join(', '), String(vals[0]), String(vals[vals.length - 1])];
});
const vRngTbl = table(['Call', 'Values it can return', 'Smallest', 'Largest'], rngTblRows, `Table of the possible values of four random calls: ${rngTblRows.map(([c, v]) => `${c.replace(/`/g, '')} can return ${v}`).join('; ')}`, 'randint includes both ends; randrange excludes the stop value.');
const exProg = code('import random', 'slot = random.randint(5, 7)', 'bonus = random.randrange(0, 9, 4)', 'print(slot + bonus)');
const exSet = possible(exProg, [['slot', 'range(5, 8)'], ['bonus', 'range(0, 9, 4)']], 'str(slot + bonus)');
const exVals = [...exSet].map(Number).sort((a, b) => a - b);
const exRows = json(code('rows = []', 'for slot in range(5, 8):', '    for bonus in range(0, 9, 4):', '        rows.append([slot, bonus, slot + bonus])'), 'rows').map((r) => r.map(String));
assert.deepEqual([...new Set(exRows.map((r) => Number(r[2])))].sort((a, b) => a - b), exVals);
const vExRandom = table(['slot', 'bonus', 'slot + bonus'], exRows, `Table of all nine combinations of slot from 5 to 7 and bonus from 0, 4 and 8; the possible outputs are ${exVals.join(', ')}`, `The ${exVals.length} possible outputs: ${exVals.join(', ')}.`);
const statRows = [['[14, 9, 12, 9, 16]', 'odd number of values'], ['[8, 3, 5, 3, 9, 6]', 'even number of values']].map(([l, n]) => [ic(l), ic(pv(`import statistics\ndata = ${l}`, 'statistics.mean(data)')), ic(pv(`import statistics\ndata = ${l}`, 'statistics.median(data)')), ic(pv(`import statistics\ndata = ${l}`, 'statistics.mode(data)')), n]);
const vStat = table(['data', 'mean', 'median', 'mode', 'Note'], statRows, `Table of mean, median and mode for two lists: ${statRows.map((r) => `${r[0].replace(/`/g, '')} gives mean ${r[1].replace(/`/g, '')}, median ${r[2].replace(/`/g, '')}, mode ${r[3].replace(/`/g, '')}`).join('; ')}`, 'The median of an even number of values is the average of the two middle ones.');
const sumProg = code('import statistics', 'scores = [60, 75, 60, 90, 75, 60]', 'print("Mean:", statistics.mean(scores))', 'print("Median:", statistics.median(scores))', 'print("Mode:", statistics.mode(scores))', 'print("Spread:", max(scores) - min(scores))');
const vSumm = table(['Line printed', 'How it is found'], pyOut(sumProg).split('\n').map((l, i) => [ic(l), ['sum divided by the number of values', 'average of the two middle sorted values', 'the value that occurs most often', 'largest minus smallest'][i]]), `Table of the four lines printed by the score summary program: ${pyOut(sumProg).replace(/\n/g, '; ')}`, 'Each line comes from one function of the statistics module or from max() and min().');
const comboProg = code('import statistics', 'marks = {"Dia": [70, 80, 90], "Eli": [60, 65, 100]}', 'for name in marks:', '    print(name, statistics.mean(marks[name]), max(marks[name]))');
const vCombo = table(['Name', 'Line printed'], pyOut(comboProg).split('\n').map((l) => [l.split(' ')[0], ic(l)]), `Table of the lines printed by a loop over a dictionary of mark lists: ${pyOut(comboProg).replace(/\n/g, '; ')}`, 'The values of the dictionary are lists, and the statistics functions accept them.');
const errRows = [['print(sqrt(4))', ''], ['import math\nprint(math.sqroot(4))', ''], ['import maths', ''], ['import statistics\nprint(statistics.median([]))', ''], ['import random\nprint(random.randint(5))', ''], ['import random\nprint(random.randrange(5, 5))', '']].map(([c]) => [ic(c.replace(/\n/g, '; ')), ic(pyErr(c))]);
const vErrors = table(['Statement', 'What Python reports'], errRows, `Table of six module mistakes and their error lines: ${errRows.map(([c, e]) => `${c.replace(/`/g, '')} gives ${e.replace(/`/g, '')}`).join('; ')}`, 'Error lines come from running each statement.');
const vSummary2 = table(['Idea', 'Remember'], [
  ['import', '`import math` then `math.sqrt(9)`; `from math import sqrt` then `sqrt(9)`; `as` gives an alias'],
  ['math', '`pi`, `e`, `sqrt`, `ceil`, `floor`, `pow`, `fabs`, `sin`, `cos`, `tan` (radians)'],
  ['random', '`random()` is from 0.0 up to but not 1.0; `randint(a, b)` includes b; `randrange` excludes stop'],
  ['Possible outputs', 'list the values of each call, then combine them'],
  ['statistics', '`mean`, `median` (sorts for you), `mode` (most frequent)'],
  ['Errors', 'forgetting the import or the module name gives a `NameError`'],
], 'Summary table of Part 2: import forms, math functions, random calls, listing possible outputs, statistics functions and errors');

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Dictionaries — Part 1: Keys, Values, Methods and Programs',
  goals: [
    'Create dictionaries and read items with square brackets and get(), telling a KeyError from a safe lookup',
    'Add and change pairs, traverse keys, values and items, and state the rules for keys',
    'Use len, keys, values, items, update, setdefault, pop, popitem, del, clear, fromkeys, copy, max, min and sorted on a dictionary, and count frequencies with a dictionary',
  ],
  slides: [
    sl('title', 'Dictionaries', {
      b: 'Part 1 — a **dictionary** stores **key: value** pairs and finds a value by its key.',
      v: vRoute1,
      n: 'Welcome to Chapter seven. A list finds an item by its position, but a dictionary finds a value by a name that we choose, called the key. In Part one we create dictionaries, read and change them, and learn their methods. Part two moves on to modules, which are ready made tools for mathematics, chance and statistics.',
    }),
    sl('concept', 'What a dictionary is', {
      b: 'A **dictionary** is a mutable collection of **key-value pairs** in curly braces. Python keeps the pairs in the order they were inserted.',
      v: vDictSvg,
      n: 'A dictionary is a collection of pairs. Each pair has a key and a value, written with a colon between them, and the pairs are enclosed in curly braces. The key is used to find the value. Python remembers the order in which pairs were inserted, but we never use a position number to reach an item.',
    }),
    sl('concept', 'Creating a dictionary', {
      b: 'Use braces, or the `dict()` function with a list of pairs, or `fromkeys()`.',
      v: vCreate,
      n: 'We can create a dictionary in several ways. Empty braces make an empty dictionary. Braces with key value pairs make a filled one. The dict function can take a list of two item pairs or keyword arguments. The fromkeys method gives every key the same starting value. The table shows what each statement produces.',
    }),
    sl('concept', 'Accessing items: brackets or get()', {
      b: 'Square brackets raise a **KeyError** for a missing key. `get(key)` returns **None**, or a default you supply.',
      v: vAccess,
      n: 'To read a value, put the key in square brackets. If the key is missing, Python stops with a key error. The get method is safer. It returns none for a missing key, or a default value if we give one as a second argument. Choose get whenever a key might be absent.',
    }),
    sl('concept', 'Dictionaries are mutable', {
      b: 'Assign to a **new** key to add a pair; assign to an **existing** key to change its value.',
      v: vMut,
      n: 'A dictionary can be changed after it is created. Assigning to a key that is not present adds a new pair. Assigning to a key that is already present replaces its value, so a key never appears twice. The table follows one dictionary through three changes. Augmented assignment, such as plus equals, works on a value too.',
    }),
    sl('check', 'Quick check: a safe lookup', {
      b: 'Fill in the blank.',
      chk: 'fb_get_default',
      n: 'Remember that the second argument of get is the value returned when the key is missing.',
    }),
    sl('concept', 'The rules for keys', {
      b: 'Keys must be **unique** and of an **immutable** type. Values can be any object, and can repeat.',
      v: vKeys,
      n: 'Keys must be unique, so a repeated key keeps only its last value. Keys must also be immutable, such as strings, numbers and tuples. A list is mutable, so using a list as a key gives a type error. Values have no such limits. A value can be a list or another dictionary, and different keys may share a value.',
    }),
    sl('concept', 'Traversing a dictionary', {
      b: '`for k in d` gives the **keys**; `d.values()` gives the values; `d.items()` gives **(key, value)** pairs.',
      v: vTrav,
      n: 'A plain for loop over a dictionary gives its keys. To loop over the values, use the values method. To get both together, use the items method, which gives pairs that we can unpack into two loop variables. The table shows what each loop prints for a small dictionary of marks.',
    }),
    sl('example', 'Worked example 1: staff salaries', {
      b: `Read a salary, change one, add one, then total all salaries.\n\n${F(staffProg)}`,
      v: vStaff,
      n: 'A small firm stores salaries in a dictionary keyed by name. The program prints the salary of one employee, gives another a raise, and adds a new employee. Then a loop over the keys adds up every salary, and the last line prints the number of employees and the total. The table follows the dictionary step by step.',
    }),
    sl('check', 'Quick check: what in tests', {
      b: 'Choose the correct option.',
      chk: 'm_membership',
      n: 'Think about whether the operator in looks at the keys or at the values of a dictionary.',
    }),
    sl('concept', 'Functions on a dictionary', {
      b: '`len(d)` counts pairs. `keys()`, `values()` and `items()` return **views**; wrap them in `list()` to see a list.',
      v: vFuncs,
      n: 'The function len gives the number of pairs. The methods keys, values and items return views of the dictionary, and the list function turns a view into an ordinary list. The operators in and not in test keys, never values. The table shows each call, its value and its meaning.',
    }),
    sl('concept', 'get(), update() and setdefault()', {
      b: '`update(other)` merges another dictionary. `setdefault(k, v)` returns the value of `k`, adding it with `v` only if missing.',
      v: gm.v,
      n: 'The get method reads without risk. The update method adds the pairs of another dictionary and overwrites the values of keys that already exist. The setdefault method returns the existing value if the key is present, and otherwise inserts the key with the given value. The table shows what each call returns and how the dictionary changes.',
    }),
    sl('concept', 'Removing pairs', {
      b: '`pop(key)` returns the value; `popitem()` removes the **last** pair; `del d[key]` and `clear()` return nothing.',
      v: rm.v,
      n: 'The pop method removes a chosen key and returns its value. The popitem method removes the most recently inserted pair and returns it as a tuple. The del statement removes one key, and the clear method empties the whole dictionary, but the dictionary itself still exists. The table shows each call in order.',
    }),
    sl('check', 'Quick check: clear or delete', {
      b: 'True or false?',
      chk: 'tf_clear_del',
      n: 'Think about whether clear removes the items only, or the name of the dictionary as well.',
    }),
    sl('concept', 'Alias or copy?', {
      b: '`b = a` gives the same dictionary a second **name**. `a.copy()` builds a **new** dictionary with the same pairs.',
      v: vCopySvg,
      n: 'Like a list, a dictionary name holds a reference. When we write b equals a, both names refer to one and the same dictionary, so a change through b shows through a. The copy method builds an independent dictionary with the same pairs, and then the two can change separately.',
    }),
    sl('concept', 'max(), min() and sorted()', {
      b: 'On the dictionary itself, these work on the **keys**. Use `values()` to work on the values.',
      v: vMaxMin,
      n: 'The functions max, min and sorted look at the keys when given a dictionary directly. Keys that are strings are compared in alphabetical order. To find the largest or smallest value, or to sort the values, pass the values method instead. The sum function also works on values.',
    }),
    sl('example', 'Worked example 2: counting characters', {
      b: `Start with an empty dictionary and add one to the count of each character.\n\n${F(balProg)}`,
      v: vBal,
      n: 'This is the classic frequency program. The dictionary starts empty. For every character, get returns the count so far, or zero for a new character, and we add one and store it. The trace table shows the dictionary after each pass. The final print shows each character with the number of times it occurs.',
    }),
    sl('check', 'Quick check: get() and KeyError', {
      b: 'Choose the correct option.',
      chk: 'ar_get',
      n: 'Decide whether the assertion is true, and whether the reason is true, before you pick an option.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part one. A dictionary holds key value pairs and keeps their insertion order. Keys are unique and immutable. Square brackets fail for a missing key, while get does not. We can add, change and remove pairs, traverse keys, values and items, and count frequencies by adding one with get.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'A list **cannot** be a key; a tuple can. Values may be anything.',
        '`d[key]` on a missing key is a **KeyError**; `d.get(key)` gives `None`.',
        '`in` tests the **keys**, not the values.',
        '`pop(key)` returns a value; `popitem()` returns a **tuple** of the last pair.',
        '`b = a` shares the dictionary; use `a.copy()` for a separate one.',
      ],
      n: 'Some advice for the exam. A list cannot be a key, but a tuple can. Reading a missing key with square brackets gives a key error, while get gives none. The operator in tests keys only. Pop returns a value, and popitem returns a tuple of the last pair. Use copy when you need an independent dictionary.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Python Modules — Part 2: math, random and statistics',
  goals: [
    'Import a module with import, from-import and an alias, and avoid a NameError',
    'Use pi, e, sqrt, ceil, floor, pow, fabs, sin, cos and tan of the math module',
    'Use random, randint and randrange, work out their possible outputs, and use mean, median and mode of the statistics module',
  ],
  slides: [
    sl('title', 'Python Modules', {
      b: 'Part 2 — a **module** is a file of ready-made functions that we bring in with **import**.',
      v: vRoute2,
      n: 'Welcome to Part two. A module is a collection of ready made functions and values. Instead of writing a square root routine ourselves, we import the math module and use one. We also meet the random module for chance, and the statistics module for the mean, median and mode of data.',
    }),
    sl('concept', 'Importing a module', {
      b: '`import math` keeps the **module name**: write `math.sqrt()`. `from math import sqrt` creates only the name `sqrt`.',
      v: vNameSvg,
      n: 'There are two ways to use a module. The statement import math brings in the module name, so each function is called with the name math, a dot and the function. The statement from math import sqrt brings in only that function, which is then called by its own name. In the second case, the name math does not exist.',
    }),
    sl('concept', 'Import forms and errors', {
      b: 'Use `as` for a short **alias**. A name that was not imported raises a **NameError**.',
      v: vImports,
      n: 'This table tries five import statements and the calls that follow. Calling sqrt after import math fails with a name error, because only the name math exists. Calling math dot sqrt after from math import sqrt fails the same way. An alias, written with as, gives the module a short name that must then be used in every call.',
    }),
    sl('concept', 'The math module', {
      b: '`pi` and `e` are constants. `sqrt()`, `pow()` and `fabs()` return **floats**; `ceil()` and `floor()` return integers.',
      v: vMath,
      n: 'The math module has the constants pi and e, and many functions. Sqrt gives the square root. Pow raises a number to a power, and fabs gives the absolute value. These three always return a float. Ceil rounds up to an integer and floor rounds down to an integer. The table shows each value as Python prints it.',
    }),
    sl('concept', 'ceil() and floor()', {
      b: '`ceil(x)` is the smallest integer **not below** x; `floor(x)` is the largest integer **not above** x.',
      v: vCeilFloor,
      n: 'Ceil rounds up and floor rounds down, and this matters for negative numbers. For a positive number, floor drops the fraction. For a negative number, floor moves to the next lower integer, away from zero, while ceil moves toward zero. For a whole number, both give the same value.',
    }),
    sl('check', 'Quick check: matching math calls', {
      b: 'Match each expression with its value.',
      chk: 'mt_math_exprs',
      n: 'Work out each value and remember which functions always return floats.',
    }),
    sl('concept', 'sin(), cos() and tan()', {
      b: 'Angles are in **radians**. Floating point arithmetic leaves tiny errors, so use `round()` or a tolerance, not `==`.',
      v: vTrig,
      n: 'The functions sin, cos and tan take the angle in radians, not degrees. Pi radians is one hundred eighty degrees. Because computers store decimals approximately, the sine of pi is a very small number, not exactly zero. So we round results before printing, or compare with a small tolerance instead of using double equals.',
    }),
    sl('example', 'Worked example 1: a ladder', {
      b: `The ladder must reach the top of a wall; find its length and how many 3 metre pieces are needed.\n\n${F(ladProg)}`,
      v: vLadder,
      n: 'A ladder leans on a wall whose base is six metres from the wall and whose height is eight metres. The length is the square root of the sum of the squares. Sqrt returns a float. Dividing by three and applying ceil tells us how many three metre pieces are needed. The table lists every value.',
    }),
    sl('check', 'Quick check: from-import', {
      b: 'Fill in the blank.',
      chk: 'fb_from_import',
      n: 'Recall the form of the statement that brings only chosen names from a module.',
    }),
    sl('concept', 'The random module', {
      b: '`random()` gives a float from 0.0 up to, but not including, 1.0. `randint(a, b)` includes **both** ends; `randrange(a, b, step)` **excludes** b.',
      v: vRngSvg,
      n: 'The random module chooses values by chance. The call random with no arguments gives a float from zero up to but not including one. Randint includes both of its end values. Randrange behaves like range, so the stop value is never chosen, and a step limits the choices. The number lines show which values each call can return.',
    }),
    sl('concept', 'Reading the range of a call', {
      b: 'For any call, list the whole numbers it can return, then find the **smallest** and the **largest**.',
      v: vRngTbl,
      n: 'To answer questions on random numbers, list what each call can return. Randint one to four can return one, two, three or four. Randrange one to four stops before four. A step of five from zero to twenty gives only multiples of five. From the list we read the smallest and the largest value and how many values there are.',
    }),
    sl('example', 'Worked example 2: possible outputs', {
      b: `Two random calls are added. List every output the program **can** print.\n\n${F(exProg)}`,
      v: vExRandom,
      n: 'This program adds two random numbers. The first can be five, six or seven. The second can be zero, four or eight. We cannot say what is printed in any one run, but we can list all nine combinations and their sums. The distinct sums are the possible outputs, and any other number can never appear.',
    }),
    sl('check', 'Quick check: stop value', {
      b: 'True or false?',
      chk: 'tf_randrange_stop',
      n: 'Remember that randrange works like range and does not include its stop value.',
    }),
    sl('concept', 'The statistics module', {
      b: '`mean()` is the average; `median()` is the middle of the **sorted** data; `mode()` is the most frequent value.',
      v: vStat,
      n: 'The statistics module has three functions you need. Mean is the sum divided by the number of values. Median sorts the data itself and picks the middle value, or the average of the two middle values when there is an even number of values. Mode is the value that occurs most often. The table shows both an odd and an even list.',
    }),
    sl('example', 'Worked example 3: summarising scores', {
      b: `Report the centre and the spread of six scores.\n\n${F(sumProg)}`,
      v: vSumm,
      n: 'A teacher summarises six test scores. The mean is the sum divided by six. The median is the average of the two middle sorted scores, which is why it ends in point five. The mode is the most frequent score. The last line uses max and min to print the difference between the best and worst scores.',
    }),
    sl('check', 'Quick check: mean, median and mode', {
      b: 'Predict the output.',
      chk: 'co_statistics',
      n: 'Work out the mean, then sort each list for the median, then find the most frequent value.',
    }),
    sl('concept', 'Dictionaries and modules together', {
      b: 'The values of a dictionary can be lists, so the **statistics** functions can summarise each key.',
      v: vCombo,
      n: 'Modules and dictionaries work well together. Here a dictionary maps each student to a list of marks. A loop over the keys passes each list to the mean function and to max. The table shows the line printed for each student.',
    }),
    sl('concept', 'Common module mistakes', {
      b: 'Read the **last line** of the error message: it names the problem.',
      v: vErrors,
      n: 'Most module errors are simple to fix. A name error means the name was never imported. An attribute error means the module has no function of that name. A module not found error means the module name is misspelled. Empty data and wrong numbers of arguments also raise errors. The table shows six of them.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part two. Import a module with import, with from import, or with an alias, and write the call to match. The math module gives constants and functions, with angles in radians. Randint includes both ends and randrange excludes its stop. For random code, list the possible outputs. The statistics module gives mean, median and mode.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'After `import math`, write **`math.`** before the name; after `from math import sqrt`, do not.',
        '`randint(a, b)` includes **b**; `randrange(a, b)` does **not**.',
        'Never state one output of a random program: list the **possible** outputs.',
        '`sqrt`, `pow` and `fabs` return floats; `ceil` and `floor` return integers.',
        'The median of an even number of values is the **average** of the two middle ones.',
      ],
      n: 'Some advice for the exam. After import math, write math dot before every name. Randint includes both ends, while randrange excludes its stop value. For random programs, list the possible outputs and never claim one output. Sqrt, pow and fabs return floats. The median of an even number of values is the average of the two middle values.',
    }),
  ],
});

// narration limit of the brief (66 words)
const longN = [part1, part2].flatMap((d) => d.slides.filter((s) => wordsOf(s.narration) > 66).map((s) => d.part + '/' + s.id + ': ' + wordsOf(s.narration)));
assert.equal(longN.length, 0, 'narration over 66 words: ' + longN.join(', '));

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Dictionaries and Python Modules — Notes',
  sections: [
    {
      h: '1. Dictionaries: creation and access',
      t: 1,
      b: 'A **dictionary** is a mutable collection of **key-value pairs** in curly braces; since Python 3.7 it keeps the pairs in the order they were inserted, and items are reached by key, never by position.\n\n- **Creating:** `{}`, `{k: v, ...}`, `dict([(k, v), ...])`, `dict(x=1, y=2)` and `dict.fromkeys(keys, value)`.\n- **Accessing:** `d[key]` raises a `KeyError` if the key is missing; `d.get(key)` returns `None`, and `d.get(key, default)` returns the default.\n- **Rules:** keys are unique (a repeated key keeps the last value) and must be immutable; a list as a key raises a `TypeError`. Values can be any object and can repeat.',
      terms: [
        ['Dictionary', 'A mutable collection of key-value pairs, written in curly braces.'],
        ['Key', 'The unique, immutable name used to find a value.'],
        ['KeyError', 'The error raised by `d[key]` when the key is not in the dictionary.'],
      ],
      v: vDictSvg,
      vs: [vCreate, vAccess, vKeys],
    },
    {
      h: '2. Mutability, aliases and traversal',
      t: 1,
      b: 'A dictionary is **mutable**: `d[key] = value` adds a pair if the key is new and replaces the value if it exists.\n\nA dictionary name holds a **reference**. After `b = a` both names refer to the **same dictionary**; `a.copy()` builds an independent copy.\n\nTo **traverse**: `for k in d` (keys), `for v in d.values()` (values), `for k, v in d.items()` (pairs). The operators `in` and `not in` test the **keys**.',
      terms: [
        ['Mutable', 'Can be changed in place after it is created.'],
        ['Alias', 'A second name that refers to the same dictionary object.'],
        ['Traversal', 'Visiting every key, value or pair with a loop.'],
      ],
      v: vMut,
      vs: [vCopySvg, vTrav],
    },
    {
      h: '3. Dictionary functions and methods',
      t: 1,
      b: '- **Read:** `len(d)` (number of pairs), `d.keys()`, `d.values()`, `d.items()` (views; wrap in `list()`), `d.get(key, default)`.\n- **Add or merge:** `d[key] = value`, `d.update(other)` (new keys added, existing keys overwritten), `d.setdefault(key, value)` (returns the value; inserts only if the key is missing).\n- **Remove:** `d.pop(key)` returns the value, `d.popitem()` removes and returns the last pair as a tuple, `del d[key]` and `d.clear()` return nothing.\n- **Create and copy:** `dict.fromkeys(keys, value)` and `d.copy()`.\n- **Numbers:** `max(d)`, `min(d)` and `sorted(d)` work on the keys; use `d.values()` for the values; `sum(d.values())`.',
      terms: [
        ['get()', 'Returns the value of a key, or None (or a given default) if the key is missing.'],
        ['update()', 'Adds the pairs of another dictionary, overwriting existing keys.'],
        ['popitem()', 'Removes and returns the last inserted pair as a tuple.'],
      ],
      v: vFuncs,
      vs: [gm.v, rm.v, vMaxMin],
    },
    {
      h: '4. Programs on dictionaries',
      t: 1,
      b: 'Standard patterns:\n- **Frequency:** `freq[x] = freq.get(x, 0) + 1` for every item; the keys are the distinct items and the values their counts.\n- **Records:** names as keys and numbers as values; loop over the keys, read each value with `d[key]`, keep a total or look for `max(d.values())`.\n- **Most frequent:** find `max(freq.values())`, then print every key whose value equals it (a tie is possible).\n- **Words:** `line.lower().split()` turns a sentence into a list of words to count.\n\nGuard a missing key with `in` or `get()`; a missing key read with brackets stops the program.',
      terms: [
        ['Frequency', 'The number of times a value occurs; counted with a dictionary.'],
        ['Default value', 'The value get() returns for a missing key.'],
      ],
      v: vBal,
      vs: [vStaff],
    },
    {
      h: '5. Modules and the math module',
      t: 2,
      b: 'A **module** is a file of functions and values that a program brings in with `import`.\n\n- `import math` keeps the module name: call `math.sqrt(9)`.\n- `from math import sqrt, pi` creates only those names: call `sqrt(9)`.\n- `import math as m` gives an alias: call `m.sqrt(9)`.\n\nA name that was not imported raises a `NameError`.\n\n**math:** constants `pi` and `e`; `sqrt(x)`, `pow(x, y)`, `fabs(x)` return floats; `ceil(x)` rounds up and `floor(x)` rounds down to integers; `sin(x)`, `cos(x)` and `tan(x)` take radians, and floating point arithmetic leaves tiny errors.',
      terms: [
        ['Module', 'A file of ready-made functions and values brought in with import.'],
        ['Alias', 'A short name given to a module with `as`.'],
        ['Radian', 'The unit of angle used by sin(), cos() and tan(); pi radians is 180 degrees.'],
      ],
      v: vNameSvg,
      vs: [vImports, vMath, vCeilFloor, vTrig],
    },
    {
      h: '6. random and statistics',
      t: 2,
      b: '**random:** `random()` gives a float with `0.0 <= x < 1.0`; `randint(a, b)` gives a whole number from a to b **inclusive**; `randrange(start, stop, step)` behaves like `range` and **excludes** the stop value.\n\nThe output of a random program changes from run to run, so questions ask for the **possible** outputs, the smallest and largest values, or which value can never appear: list the values of each call, then combine them.\n\n**statistics:** `mean(data)` is the average, `median(data)` is the middle of the sorted data (the average of the two middle values for an even count) and `mode(data)` is the most frequent value.',
      terms: [
        ['randint(a, b)', 'A random whole number from a to b, both included.'],
        ['randrange(a, b, s)', 'A random value from range(a, b, s); b is never returned.'],
        ['Median', 'The middle value of sorted data.'],
        ['Mode', 'The value that occurs most often.'],
      ],
      v: vRngSvg,
      vs: [vRngTbl, vExRandom, vStat, vSumm, vCombo, vErrors],
    },
  ],
  tips: '**Common mistakes**\n- Reading a missing key with square brackets (use `get()` or test with `in`).\n- Using a list as a key.\n- Expecting `in` to test values.\n- Thinking `b = a` copies a dictionary.\n- Forgetting that `popitem()` returns a tuple and `pop()` needs a key.\n- Writing `sqrt(9)` after `import math`, or `math.sqrt(9)` after `from math import sqrt`.\n- Treating `randrange(a, b)` as if `b` could be returned.\n- Stating a single output for a random program instead of the possible outputs.\n- Passing degrees to `sin()`, `cos()` or `tan()`.\n- Forgetting that the median of an even number of values is an average.\n\n**How marks are usually awarded**\n- Output questions: the exact output, line by line, with the brackets, quotes and decimal points that Python prints.\n- Error-finding: naming the error, then the corrected program.\n- Programs: marks for the input, the dictionary, the loop, the update or test, the result and the output for the given input.\n- Random questions: marks for listing the possible values of each call and for the smallest and largest result.',
});

// ---------------------------------------------------------------- flashcards
const mathSet = 'import math';
const FC = cards([
  ['What is a **dictionary** in Python?', 'A mutable collection of key-value pairs in curly braces; items are found by key and the pairs keep their insertion order.', 'definition', 1],
  ['What are the rules for dictionary keys?', 'Unique and immutable (string, number, tuple). A list key raises a `TypeError`.', 'fact', 1],
  ['What do the values of a dictionary have to be?', 'Nothing special: any object, and values may repeat.', 'fact', 1],
  [`${ic('{"a": 1, "a": 2}')} gives what?`, `${ic(val('{"a": 1, "a": 2}'))}: the repeated key keeps its last value.`, 'example', 1],
  ['What happens when you read a missing key with `d[key]`?', `A \`KeyError\`, for example ${ic(pe('d = {"a": 1}', 'print(d["z"])'))}.`, 'exam-tip', 1],
  ['What does `d.get(key)` return for a missing key?', `\`None\`; with a second argument it returns that default, such as ${ic(val('{"a": 1}.get("z", 0)'))}.`, 'concept', 1],
  ['What does `d[key] = value` do?', 'Adds the pair if the key is new, replaces the value if the key already exists.', 'concept', 1],
  ['What does the operator `in` test for a dictionary?', 'The **keys**, never the values.', 'exam-tip', 1],
  ['What does a plain `for k in d` loop give?', 'The keys, in insertion order.', 'fact', 1],
  ['What do `keys()`, `values()` and `items()` return?', 'Views of the keys, the values and the (key, value) pairs; use `list()` to make a list.', 'fact', 1],
  [`What is ${ic('len({"x": 3, "y": 8})')}?`, `${ic(val('len({"x": 3, "y": 8})'))}: the number of pairs.`, 'example', 1],
  ['What does `update(other)` do?', 'Adds the pairs of `other`; an existing key has its value overwritten.', 'concept', 1],
  ['What does `setdefault(k, v)` do?', 'Returns the value of `k`; if `k` is missing it inserts `k` with `v` and returns `v`. An existing value is never changed.', 'concept', 1],
  ['What is the difference between `pop(key)` and `popitem()`?', '`pop(key)` removes that key and returns its value; `popitem()` removes the last inserted pair and returns it as a tuple.', 'concept', 1],
  ['What is the difference between `del d` and `d.clear()`?', '`clear()` empties the dictionary; `del d` removes the name d altogether.', 'exam-tip', 1],
  ['What does `dict.fromkeys(keys, value)` do?', `Makes a new dictionary in which every key has the same value, such as ${ic(val('dict.fromkeys(["p", "q"], 0)'))}.`, 'concept', 1],
  ['How do you make an independent copy of a dictionary?', '`b = a.copy()`; `b = a` only gives a second name.', 'exam-tip', 1],
  ['What do `max(d)`, `min(d)` and `sorted(d)` work on?', 'The **keys**; use `d.values()` to work on the values.', 'exam-tip', 1],
  ['How do you count the frequency of each character of a string `s`?', '`freq = {}` then `for ch in s: freq[ch] = freq.get(ch, 0) + 1`.', 'concept', 1],
  ['What is a **module**?', 'A file of ready-made functions and values that a program brings in with `import`.', 'definition', 2],
  ['How do `import math` and `from math import sqrt` differ?', 'After `import math` the call is `math.sqrt(9)`; after `from math import sqrt` it is `sqrt(9)` and the name `math` does not exist.', 'concept', 2],
  ['What error follows `print(sqrt(4))` after only `import math`?', `${ic(pyErr('import math\nprint(sqrt(4))'))}.`, 'exam-tip', 2],
  [`What are ${ic('math.ceil(-2.5)')} and ${ic('math.floor(-2.5)')}?`, `${ic(pv(mathSet, 'math.ceil(-2.5)'))} and ${ic(pv(mathSet, 'math.floor(-2.5)'))}: ceil rounds up, floor rounds down.`, 'example', 2],
  ['Which `math` functions always return a float?', `\`sqrt()\`, \`pow()\` and \`fabs()\`, for example ${ic(pv(mathSet, 'math.pow(2, 3)'))}.`, 'fact', 2],
  ['In which unit do `sin()`, `cos()` and `tan()` take angles?', 'Radians. Pi radians is 180 degrees.', 'fact', 2],
  [`Is ${ic('math.sin(math.pi) == 0')} true?`, `${ic(pv(mathSet, 'math.sin(math.pi) == 0'))}: floating point leaves a tiny error, so round or use a tolerance.`, 'exam-tip', 2],
  ['What does `random.random()` return?', 'A float `x` with `0.0 <= x < 1.0`.', 'fact', 2],
  ['What is the difference between `randint(a, b)` and `randrange(a, b)`?', '`randint` can return `b`; `randrange` never returns `b`.', 'exam-tip', 2],
  ['How do you answer "which output is possible?" for random code?', 'List the possible values of each random call, combine them, and test the option; never claim a single output.', 'concept', 2],
  ['What do `mean()`, `median()` and `mode()` of `statistics` give?', 'The average; the middle of the sorted data (the average of the two middle values for an even count); the most frequent value.', 'definition', 2],
]);

// ---------------------------------------------------------------- tests (cbse-11-default chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Dictionaries and Python Modules',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_missing_key', 'm_random_poss', 'm_ceil_floor_neg', 'ar_list_key'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s2_err_keyerror', 's2_err_import', 's3_trace_dict'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions. Show the program and its output.', items: [{ attempt: 1, keys: ['l_char_freq', 'l_stat_spread'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_veg_stall'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Dictionaries and Python Modules',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_dup_keys', 'm_update_merge', 'm_pop_popitem', 'm_copy_dict', 'm_pow_fabs', 'm_random_minmax', 'm_stat_funcs', 'm_trig_radians', 'ar_from_import', 'ar_len'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Questions 13 and 15 have an internal choice. Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words.', items: ['s2_get_vs_index', 's2_random_range', { attempt: 1, keys: ['s2_update_demo', 's2_ceil_floor'] }, 's3_bug_count', { attempt: 1, keys: ['s3_salary_access', 's3_hypotenuse'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16 and any ONE of questions 17 and 18.', items: ['l_marks_dict', { attempt: 1, keys: ['l_word_freq', 'l_garden_math'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_votes', 'cb_dice_game'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 (dictionaries: creation, access, mutability, traversal, functions and methods, frequency programs) and t02 (modules: import forms, math, random, statistics) of cbse-11-computer-science-ch07 only; no def functions and no file handling',
    originality: 'every program, scenario and data value written for this chapter by SOYL; no textbook, NCERT or board-paper program reused',
    execution: 'every output, trace, count and error message in items, slides, notes and flashcards produced by running the program (runPy in lib.mjs); random programs shown only with their enumerated possible outputs, cross-checked by sampling; results cached in src/py-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
