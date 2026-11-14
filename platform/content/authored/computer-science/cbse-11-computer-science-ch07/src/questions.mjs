// CBSE 11 Computer Science, ch07 Dictionaries and Python Modules — question bank. Every program, scenario and data
// value is written by SOYL (imagined people, shops and schools); no textbook, NCERT or board-paper program is reused.
// Every output, error, count and trace table stated anywhere is produced by running the program with
// runPy()/pyOut()/pyErr(). Random code is never given a stated output: its possible outputs are enumerated in hidden
// Python and cross-checked against thousands of real runs.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child, co, pyOut, pyErr } from './lib.mjs';

/** A Python code fence. */
export const F = (...lines) => '```python\n' + lines.join('\n') + '\n```';
/** A plain output fence. */
export const O = (text) => '```text\n' + text + '\n```';
export const code = (...lines) => lines.join('\n');
export const ic = (s) => '`' + s + '`';
const outIc = (c, opts) => ic(pyOut(c, opts));
const distinct = (opts) => {
  if (new Set(opts).size !== opts.length) throw new Error(`duplicate options: ${opts.join(' | ')}`);
  return opts;
};
export const rowsOf = (c, opts) => JSON.parse(pyOut(c, opts));
export const mdTable = (headers, rows) =>
  [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map(String).join(' | ')} |`)].join('\n');
/** Value of a Python expression, as text. */
export const val = (expr) => pyOut(`print(${expr})`);
/** Value of an expression after a setup program has run. */
export const pv = (setup, expr) => pyOut(code(setup, `print(${expr})`));
/** Error line of a statement run after a setup program. */
export const pe = (setup, stmt) => pyErr(code(setup, stmt));
/** Asserts that every wrong option differs from the real output. */
const differs = (real, ...wrong) => {
  wrong.forEach((w) => {
    if (w === real) throw new Error(`wrong option equals the real output: ${w}`);
  });
  return wrong;
};
/** True when the program runs without an error. */
export const runsOk = (c, o) => { try { pyOut(c, o); return true; } catch { return false; } };

// ---------------------------------------------------------------- random code: possible outputs, never one stated output
/** Sorted distinct output lines seen in many real runs of a program (the program must have few possible outputs). */
export const sampledLines = (prog, n = 4000) => JSON.parse(pyOut(code('import io, contextlib, json', `src = ${JSON.stringify(prog)}`, 'seen = set()', `for _ in range(${n}):`, '    buf = io.StringIO()', '    with contextlib.redirect_stdout(buf):', '        exec(src, {})', '    seen.add(buf.getvalue().strip())', 'print(json.dumps(sorted(seen)))')));
/** Sorted distinct output lines computed by enumerating every combination of the ranges of the random calls. */
export const enumLines = (vars, lineExpr) => JSON.parse(pyOut(code('import itertools, json', 'res = set()', `for (${vars.map((v) => v[0]).join(', ')},) in itertools.product(${vars.map((v) => v[1]).join(', ')}):`, `    res.add(${lineExpr})`, 'print(json.dumps(sorted(res)))')));
/**
 * The set of possible output lines of a random program. `vars` lists each random call as [name, range expression],
 * `lineExpr` is the Python expression for the printed line. The enumeration is cross-checked against real runs.
 */
export const possible = (prog, vars, lineExpr, n) => {
  const e = enumLines(vars, lineExpr);
  const s = sampledLines(prog, n);
  if (JSON.stringify(e) !== JSON.stringify(s)) throw new Error(`enumeration differs from sampling:\n${JSON.stringify(e)}\n${JSON.stringify(s)}`);
  return new Set(e);
};
/** Asserts that `good` is possible and every one of `bad` is not. */
export const poss = (set, good, ...bad) => {
  if (!set.has(good)) throw new Error(`not possible but keyed: ${good}`);
  bad.forEach((b) => { if (set.has(b)) throw new Error(`possible but a distractor: ${b}`); });
};

// ---------------------------------------------------------------- programs reused by decks, notes and items (exported)
/** Trace rows [statement, dictionary] of a dictionary program: every statement is run and the dictionary printed after it. */
export const traceDict = (name, stmts, setup = '') =>
  rowsOf(code(setup, 'import json', 'rows = []', ...stmts.flatMap((s) => [s, `rows.append([${JSON.stringify(s)}, str(${name})])`]), 'print(json.dumps(rows))'));

// ================================================================ t01-t02 objective items
// ---- multiple choice: dictionaries
const faresSet = 'fares = {"Pune": 180, "Nashik": 140, "Surat": 310}';
const faresProg = code(faresSet, 'print(fares["Surat"] - fares["Pune"], len(fares))');
Q('m_dict_access', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `A bus agency stores one-way fares in a dictionary. What does this program print?\n\n${F(faresProg)}`,
  opts: distinct([outIc(faresProg), ...differs(pyOut(faresProg), '490 3', '130 6', '130 2').map(ic)]),
  sol: 'A key in square brackets gives its value, so the subtraction uses 310 and 180. The function len() counts the key-value pairs, not the keys and values separately.',
}));
const stockSet = 'stock = {"rice": 40, "dal": 25}';
const missStmts = ['stock.get("oil")', 'stock["oil"]', 'stock.pop("oil")', 'del stock["oil"]'];
if (!runsOk(code(stockSet, missStmts[0])) || missStmts.slice(1).some((s) => runsOk(code(stockSet, s)))) throw new Error('missing key statements');
Q('m_missing_key', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `A grocer keeps ${ic(stockSet)}. The key "oil" is not in it. Which one of these statements, run on its own, does NOT stop with an error?`,
  opts: missStmts.map(ic),
  sol: `The method get() returns None for a missing key instead of failing. Reading with square brackets, pop() without a default and del all raise ${ic(pe(stockSet, missStmts[1]))} (the same error type for each).`,
}));
const dupProg = code('d = {"a": 1, "b": 2, "a": 3}', 'print(len(d), d["a"], d)');
Q('m_dup_keys', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `Karan writes the same key twice in a dictionary literal. What does his program print?\n\n${F(dupProg)}`,
  opts: distinct([outIc(dupProg), outIc(code('d = {"a": 1, "b": 2, "a": 3}', 'print(len(d) + 1, d["a"], d)')), ...differs(pyOut(dupProg), "3 1 {'a': 1, 'b': 2}", "2 1 {'a': 1, 'b': 2}").map(ic)]),
  sol: 'Keys in a dictionary are unique. When a key repeats, the later value replaces the earlier one and no new item is made, so there are two items and "a" now maps to 3. The key stays in the position where it was first inserted.',
}));
const updProg = code('a = {"x": 1, "y": 2}', 'b = {"y": 20, "z": 30}', 'a.update(b)', 'print(a, len(a))');
Q('m_update_merge', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Two dictionaries of lab-kit counts are merged with update(). What does the program print?\n\n${F(updProg)}`,
  opts: distinct([outIc(updProg), ...differs(pyOut(updProg), "{'x': 1, 'y': 2, 'z': 30} 3", "{'x': 1, 'y': 20, 'z': 30} 4", "{'y': 20, 'z': 30} 2").map(ic)]),
  sol: 'update() adds the new keys of the other dictionary and overwrites the value of any key that already exists, so "y" becomes 20 and "z" is added. The dictionary b is not changed.',
}));
const ppProg = code('d = {"p": 5, "q": 6, "r": 7}', 'x = d.pop("q")', 'y = d.popitem()', 'print(x, y, d)');
Q('m_pop_popitem', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Both pop() and popitem() are used on a dictionary below. What does the program print?\n\n${F(ppProg)}`,
  opts: distinct([outIc(ppProg), outIc(code('d = {"p": 5, "q": 6, "r": 7}', 'x = d.pop("q")', 'y = d.popitem()', 'print(x, y[0], d)')), ...differs(pyOut(ppProg), "6 ('p', 5) {'r': 7}", "q ('r', 7) {'p': 5}").map(ic)]),
  sol: 'pop("q") removes that key and returns its value, 6. popitem() removes and returns the most recently inserted pair, as a tuple, which is ("r", 7). Only the pair for "p" is left.',
}));
const sdProg = code('d = {"a": 1}', 'r1 = d.setdefault("a", 9)', 'r2 = d.setdefault("b", 9)', 'print(r1, r2, d)');
Q('m_setdefault', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `The method setdefault() is called twice on a small dictionary. What does this program print?\n\n${F(sdProg)}`,
  opts: distinct([outIc(sdProg), ...differs(pyOut(sdProg), "9 9 {'a': 9, 'b': 9}", "1 9 {'a': 1}", "1 None {'a': 1, 'b': 9}").map(ic)]),
  sol: 'setdefault(key, value) returns the existing value when the key is present and leaves it alone, so the first call returns 1. For a missing key it inserts the key with the given value and returns that value, so the second call returns 9 and adds "b".',
}));
const ffProg = code('k = ("red", "green", "blue")', 'd = dict.fromkeys(k, 0)', 'd["green"] += 5', 'print(d)');
Q('m_fromkeys', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `A paint shop sets every colour to a starting count with fromkeys() and then updates one. What does this program print?\n\n${F(ffProg)}`,
  opts: distinct([outIc(ffProg), ...differs(pyOut(ffProg), "{'red': 5, 'green': 5, 'blue': 5}", "{'red': 0, 'green': 0, 'blue': 0}", "{'green': 5}").map(ic)]),
  sol: 'fromkeys() makes a new dictionary with every given key set to the same starting value, here 0. The statement d["green"] += 5 then changes only the value of "green".',
}));
const cpProg = code('a = {"n": 1}', 'b = a', 'c = a.copy()', 'b["n"] = 2', 'c["n"] = 3', 'print(a, b, c)');
Q('m_copy_dict', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `Three names are linked to dictionaries in the program below. What does it print?\n\n${F(cpProg)}`,
  opts: distinct([outIc(cpProg), ...differs(pyOut(cpProg), "{'n': 1} {'n': 2} {'n': 3}", "{'n': 3} {'n': 3} {'n': 3}", "{'n': 1} {'n': 1} {'n': 3}").map(ic)]),
  sol: 'The statement b = a gives the same dictionary a second name, so the change through b shows in a too. The method copy() builds a separate dictionary, so only c carries the value 3.',
}));
const keyOpts = ['{[1, 2]: "a"}', '{(1, 2): [3, 4]}', '{"k": 1, ["k"]: 2}', '{[]: 0}'];
if (!runsOk(`print(${keyOpts[1]})`) || keyOpts.filter((_, i) => i !== 1).some((s) => runsOk(`print(${s})`))) throw new Error('key options');
Q('m_key_valid', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Exactly one of these dictionary literals can be evaluated without an error. Which one is it?',
  opts: [ic(keyOpts[1]), ic(keyOpts[0]), ic(keyOpts[2]), ic(keyOpts[3])],
  sol: `Keys must be of an immutable type, so a tuple is allowed as a key, while a list is not and raises ${ic(pyErr(`print(${keyOpts[0]})`))}. A list is allowed as a value, as in the correct literal.`,
}));
const itSet = 'marks = {"Ria": 82, "Sam": 74, "Tia": 91}';
const itProg = code(itSet, 'names = []', 'total = 0', 'for k, v in marks.items():', '    if v > 80:', '        names.append(k)', '        total += v', 'print(names, total)');
Q('m_items_loop', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A teacher walks through the items of a dictionary of test marks. What does the program print?\n\n${F(itProg)}`,
  opts: distinct([outIc(itProg), ...differs(pyOut(itProg), "['Ria', 'Sam', 'Tia'] 247", '[82, 91] 173', "['Ria', 'Tia'] 82").map(ic)]),
  sol: 'The loop unpacks every (key, value) pair of marks.items() into k and v. Only Ria (82) and Tia (91) have more than 80, so their names are appended and their marks add up to 173.',
}));
const fnSet = 'd = {"b": 40, "a": 90, "c": 10}';
const fnQ = 'print(max(d), min(d.values()), sorted(d), len(d))';
Q('m_dict_funcs', mcq({
  t: 1, d: 3, c: 'application',
  stem: `For ${ic(fnSet)}, what does ${ic(fnQ)} print?`,
  opts: distinct([outIc(code(fnSet, fnQ)), outIc(code(fnSet, 'print(max(d.values()), min(d.values()), sorted(d), len(d))')), outIc(code(fnSet, 'print(max(d), min(d), sorted(d.values()), len(d))')), outIc(code(fnSet, 'print(max(d), min(d.values()), sorted(d), len(d.values()) + 1)'))]),
  sol: 'On a dictionary itself, max(), min() and sorted() work on the keys, so max(d) compares the key strings and sorted(d) is the list of keys in alphabetical order. min(d.values()) looks at the values, and len() counts the pairs.',
}));
const mbSet = 'd = {"tea": 15, "bun": 12}';
const mbQ = 'print("tea" in d, 12 in d, "bun" not in d)';
Q('m_membership', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `A canteen price list is ${ic(mbSet)}. What does ${ic(mbQ)} print?`,
  opts: distinct([outIc(code(mbSet, mbQ)), ...differs(pyOut(code(mbSet, mbQ)), 'True True False', 'True False True', 'False True False').map(ic)]),
  sol: 'The operators in and not in test the keys, never the values. "tea" is a key; 12 is only a value, so the second test is False; and "bun" is a key, so "bun" not in d is False.',
}));
const viewQ = 'print(d.keys(), list(d.values()))';
const viewSet = 'd = {"lamp": 3, "fan": 2}';
Q('m_view_print', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `For ${ic(viewSet)}, what does ${ic(viewQ)} print?`,
  opts: distinct([outIc(code(viewSet, viewQ)), outIc(code(viewSet, 'print(list(d.keys()), d.values())')), ...differs(pyOut(code(viewSet, viewQ)), "['lamp', 'fan'] [3, 2]", "('lamp', 'fan') (3, 2)").map(ic)]),
  sol: 'keys() returns a view object that Python prints with its type name, dict_keys, followed by the keys in insertion order. Wrapping values() in list() turns that view into an ordinary list of values.',
}));
const ctorOpts = ['dict([("x", 1), ("y", 2)])', 'dict("x", 1, "y", 2)', 'dict(["x", 1], ["y", 2])', '{"x", 1, "y", 2}'];
const ctorGood = pyOut(`print(${ctorOpts[0]})`);
if (ctorOpts.slice(1).some((s) => runsOk(`print(${s} == ${ctorOpts[0]})`) && pyOut(`print(${s} == ${ctorOpts[0]})`) === "True")) throw new Error('constructor options');
Q('m_ctor_pairs', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `Which of these statements creates the dictionary ${ic(ctorGood)}?`,
  opts: ctorOpts.map(ic),
  sol: `dict() accepts one list of two-item pairs, and each pair becomes a key and its value. The call with four loose arguments fails with ${ic(pyErr(`print(${ctorOpts[1]})`))}; the call with two separate lists fails as well; and four items in braces without colons make a different type, ${ic(val(`type(${ctorOpts[3]}).__name__`))}, not a dictionary.`,
}));

// ---- multiple choice: modules
const imOpts = [['import math', 'print(math.sqrt(16))'], ['import math', 'print(sqrt(16))'], ['from math import sqrt', 'print(math.sqrt(16))'], ['from math import pi', 'print(sqrt(16))']];
if (!runsOk(code(...imOpts[0])) || imOpts.slice(1).some((o) => runsOk(code(...o)))) throw new Error('import options');
Q('m_import_forms', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Exactly one of these two-line programs prints a result without an error. Which one?',
  opts: imOpts.map((o) => '`' + o.join('; ') + '`'),
  sol: `After import math the function must be called with the module name, math.sqrt(). After from math import sqrt only the name sqrt exists, so math.sqrt() fails with ${ic(pyErr(code(...imOpts[2])))}; and a name that was not imported cannot be called either.`,
}));
const cfProg = code('import math', 'print(math.ceil(-3.2), math.floor(-3.2), math.ceil(3.2), math.floor(3.8))');
Q('m_ceil_floor_neg', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Anand tests ceil() and floor() on positive and negative numbers. What does this program print?\n\n${F(cfProg)}`,
  opts: distinct([outIc(cfProg), ...differs(pyOut(cfProg), '-4 -3 3 4', '-4 -4 4 3', '-3 -3 4 3').map(ic)]),
  sol: 'ceil() gives the smallest integer not below the number and floor() the largest integer not above it. On the number line -3 lies to the right of -3.2 and -4 to the left, so ceil(-3.2) is -3 and floor(-3.2) is -4.',
}));
const pfProg = code('import math', 'print(math.pow(3, 2), math.fabs(-3), 3 ** 2, math.sqrt(9))');
Q('m_pow_fabs', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `Four ways of getting a square or a size are printed together. What does this program print?\n\n${F(pfProg)}`,
  opts: distinct([outIc(pfProg), ...differs(pyOut(pfProg), '9 3 9 3', '9.0 3 9 3', '9.0 3.0 9.0 3.0').map(ic)]),
  sol: 'math.pow(), math.fabs() and math.sqrt() always return a float, so they print 9.0, 3.0 and 3.0. The operator ** on two integers gives an integer, 9.',
}));
const rpProg = code('import random', 'a = random.randint(2, 4)', 'b = random.randrange(10, 31, 10)', 'print(a, b)');
const rpSet = possible(rpProg, [['a', 'range(2, 5)'], ['b', 'range(10, 31, 10)']], 'f"{a} {b}"');
poss(rpSet, '4 20', '1 20', '3 40', '2 15');
Q('m_random_poss', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The program below uses two functions of the random module. Which one of these lines can it print?\n\n${F(rpProg)}`,
  opts: ['`4 20`', '`1 20`', '`3 40`', '`2 15`'],
  sol: 'randint(2, 4) can give 2, 3 or 4 (both ends are included). randrange(10, 31, 10) can give 10, 20 or 30 (the stop value 31 is excluded, and the step is 10). So a line must have a first number from 2 to 4 and a second number from 10, 20 and 30.',
}));
const rmProg = code('import random', 'n = random.randint(1, 4) * 10 + random.randrange(3)', 'print(n)');
const rmSet = possible(rmProg, [['a', 'range(1, 5)'], ['b', 'range(3)']], 'str(a * 10 + b)');
const rmMin = Math.min(...[...rmSet].map(Number));
const rmMax = Math.max(...[...rmSet].map(Number));
Q('m_random_minmax', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `What are the smallest and the largest value that n can take in the program below?\n\n${F(rmProg)}`,
  opts: distinct([`${rmMin} and ${rmMax}`, `${rmMin} and ${rmMax + 1}`, `${rmMin + 1} and ${rmMax}`, `${rmMin} and ${rmMax - 2}`].map(ic)),
  sol: `randint(1, 4) * 10 is one of 10, 20, 30 and 40; randrange(3) is one of 0, 1 and 2, because its stop value 3 is excluded. The smallest sum is ${rmMin} and the largest is ${rmMax}.`,
}));
const rfOk = pyOut(code('import random', 'ok = True', 'for _ in range(20000):', '    r = random.random() * 10', '    if not (0 <= r < 10):', '        ok = False', 'print(ok)'));
if (rfOk !== 'True') throw new Error('random() range');
Q('m_random_float', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `A game uses ${ic('r = random.random() * 10')} after import random. Which statement about r is correct?`,
  opts: ['r is a float that can be 0.0 but is always less than 10', 'r is an integer from 0 to 10, both included', 'r is a float that is always greater than 0 and can be 10.0', 'r is a float that is always between 1 and 9'],
  sol: 'random() returns a float x with 0.0 <= x < 1.0, so the lower end is possible but 1.0 is not. Multiplying by 10 gives a float from 0.0 up to, but not including, 10.',
}));
const stSet = 'data = [4, 8, 6, 5, 3, 4]';
const stQ = 'print(statistics.mean(data), statistics.median(data), statistics.mode(data))';
Q('m_stat_funcs', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A scorer records six values, ${ic(stSet)}, and imports the statistics module. What does ${ic(stQ)} print?`,
  opts: distinct([outIc(code('import statistics', stSet, stQ)), ...differs(pyOut(code('import statistics', stSet, stQ)), '5.0 4.5 4', '5 5 4', '5 4.5 8').map(ic)]),
  sol: `The sum is ${pv(stSet, 'sum(data)')} and there are ${pv(stSet, 'len(data)')} values, so the mean is ${pv('import statistics\n' + stSet, 'statistics.mean(data)')}. For six values the median is the average of the two middle values of the sorted data, ${pv('import statistics\n' + stSet, 'statistics.median(data)')}. The mode is ${pv('import statistics\n' + stSet, 'statistics.mode(data)')}, the value that occurs most often.`,
}));
const aliasOpts = ['m.sqrt(25)', 'math.sqrt(25)', 'sqrt(25)', 'm.square(25)'];
const aliasHead = 'import math as m';
if (!runsOk(code(aliasHead, `print(${aliasOpts[0]})`)) || aliasOpts.slice(1).some((s) => runsOk(code(aliasHead, `print(${s})`)))) throw new Error('alias options');
Q('m_import_alias', mcq({
  t: 2, d: 3, c: 'application',
  stem: `After the statement ${ic(aliasHead)}, which expression gives the square root of 25?`,
  opts: aliasOpts.map(ic),
  sol: `The alias m replaces the module name, so functions are called as m.sqrt(). The original name no longer exists, so math.sqrt(25) fails with ${ic(pe(aliasHead, 'math.sqrt(25)'))}; a bare sqrt is not defined, and the math module has no function square.`,
}));
const trigProg = code('import math', 'print(round(math.sin(30), 2))');
Q('m_trig_radians', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `Ira expects the sine of 30 degrees to be 0.5, but her program prints something else. What does it print, and why?\n\n${F(trigProg)}`,
  opts: distinct([`${ic(pyOut(trigProg))}, because sin() treats 30 as an angle in radians`, '`0.5`, because sin() treats 30 as degrees', `${ic(String(-Number(pyOut(trigProg))))}, because sin() of 30 is always negative`, '`30.0`, because sin() returns its argument when it is a whole number']),
  sol: 'The functions sin(), cos() and tan() of the math module take the angle in radians. Thirty radians is a different angle from thirty degrees, and its sine is not 0.5. To use degrees, convert first, for example with math.pi * 30 / 180.',
}));

// ---- assertion-reason
Q('ar_list_key', ar({
  t: 1, d: 3, c: 'understanding', key: 'a',
  a: 'The statement `d = {[1, 2]: "x"}` raises a TypeError.',
  r: 'A key of a dictionary must be of an immutable type.',
  sol: 'Both are true and R explains A: a list is mutable, so it is not allowed as a key, and Python reports that the type is unhashable.',
}));
Q('ar_get', ar({
  t: 1, d: 3, c: 'understanding', key: 'd',
  a: 'The call `d.get(k)` raises a KeyError when `k` is not a key of `d`.',
  r: 'The call `d.get(k)` returns None when `k` is absent, or a default value if one is given.',
  sol: 'A is false: get() never raises a KeyError for a missing key. R is true, and it is exactly the reason why A fails; square brackets are the form that raises the error.',
}));
Q('ar_from_import', ar({
  t: 2, d: 3, c: 'understanding', key: 'c',
  a: 'After the statement `from math import sqrt`, the call `sqrt(25)` works.',
  r: 'The statement `from math import sqrt` also makes the name `math` available in the program.',
  sol: 'A is true: the imported function can be called by its own name. R is false: only the named function is imported, so the name math does not exist and math.sqrt() would fail.',
}));
Q('ar_len', ar({
  t: 1, d: 2, c: 'understanding', key: 'b',
  a: 'For a dictionary `d`, the call `len(d)` gives the number of key-value pairs.',
  r: 'For every dictionary `d`, `len(d.values())` is equal to `len(d.keys())`.',
  sol: 'Both statements are true, but R does not explain A: len(d) counts pairs because each pair is one item of the dictionary, which is a separate fact from the keys and the values being equally many.',
}));
Q('ar_randint', ar({
  t: 2, d: 3, c: 'understanding', key: 'a',
  a: 'The call `random.randint(1, 6)` can return 6.',
  r: 'The function `randint()` includes both of its end values, whereas `randrange()` leaves out its stop value.',
  sol: 'Both are true and R explains A: because the upper end 6 is included for randint(), it is a possible result.',
}));

// ---- true-false, fill in the blanks, match, ordering
const tfClear = pyOut(code('d = {"a": 1}', 'd.clear()', 'print(d)'));
const tfClearDel = pyErr(code('d = {"a": 1}', 'del d', 'print(d)'));
Q('tf_clear_del', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? After the statement `d.clear()`, the name `d` no longer exists in the program.',
  sol: `clear() only removes the items: d still exists and prints as ${tfClear}. It is the statement del d that removes the name itself, after which using d gives ${tfClearDel}.`,
}));
Q('tf_values_dup', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Two different keys of one dictionary may have the same value.',
  sol: 'Only the keys must be unique. Values can repeat, as in {"a": 5, "b": 5}.',
}));
const rsOk = pyOut(code('import random', 'ok = True', 'for _ in range(20000):', '    if random.randrange(5) == 5:', '        ok = False', 'print(ok)'));
if (rsOk !== 'True') throw new Error('randrange stop');
Q('tf_randrange_stop', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The call `random.randrange(5)` can return the number 5.',
  sol: 'randrange(5) chooses from 0, 1, 2, 3 and 4; the stop value is excluded, as in range().',
}));
const medOut = val('__import__("statistics").median([9, 1, 5])');
Q('tf_median_sorted', tf({
  t: 2, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? The function `statistics.median()` gives the right answer only if the data is already in sorted order.',
  sol: `median() sorts the values itself. For example statistics.median([9, 1, 5]) gives ${medOut}, the middle value of the sorted data.`,
}));
Q('fb_dict_pairs', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A dictionary stores ___ pairs, and in each pair the ___ must be unique and of an immutable type.',
  acc: [['key-value', 'key value', 'key: value'], ['key']],
  sol: 'A dictionary is a collection of key-value pairs; the key identifies the pair, so it must be unique and immutable.',
}));
const getDef = val('{"a": 1}.get("z", 0)');
Q('fb_get_default', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'If `k` is not a key of the dictionary `d`, the call `d.get(k, 0)` returns ___ instead of raising an error.',
  acc: [['0', 'zero']],
  sol: `The second argument of get() is the default value to return for a missing key, here ${getDef}.`,
}));
Q('fb_popitem', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The dictionary method ___ removes the last inserted key-value pair and returns it as a tuple.',
  acc: [['popitem', 'popitem()']],
  sol: 'popitem() removes and returns the most recently inserted pair as a tuple; pop(key) removes one chosen key instead.',
}));
Q('fb_from_import', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'To bring only the value of pi into a program, we write `from math ___ pi`.',
  acc: [['import']],
  sol: 'The form is from module import name; after it, pi can be used without writing math.',
}));
Q('mt_dict_methods', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each dictionary method or function used in a stock program with what it gives or does.',
  pairs: [
    ['keys()', 'A view of all the keys'],
    ['values()', 'A view of all the values'],
    ['items()', 'A view of the (key, value) pairs'],
    ['update(other)', 'Adds or overwrites the pairs of another dictionary'],
  ],
  sol: 'keys(), values() and items() give views of the keys, the values and the pairs; update() merges another dictionary into the first, replacing the value of a key that is already there.',
}));
const mm = ['math.ceil(4.2)', 'math.floor(4.8)', 'math.fabs(-4)', 'math.pow(2, 3)'].map((e) => [e, pyOut(code('import math', `print(${e})`))]);
Q('mt_math_exprs', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each math-module expression, used by a carpenter to round and scale measurements, with its value.',
  pairs: mm.map(([e, v]) => [ic(e), ic(v)]),
  sol: 'ceil() rounds up to an integer, floor() rounds down to an integer, fabs() gives the absolute value as a float, and pow() returns a float.',
}));
Q('ord_char_count', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of the usual program that counts how many times each character occurs in a word, using a dictionary.',
  items: ['Create an empty dictionary', 'Visit each character of the word in turn', 'If the character is already a key add 1 to its value, otherwise insert it with the value 1', 'After the loop ends, display the dictionary'],
  sol: 'The empty dictionary is made first, the loop visits every character, each visit either increases an existing count or starts a new one, and the finished dictionary is displayed once the loop is over.',
}));
Q('ord_stat_use', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of a program that reports the median of the weekly rainfall readings of a village, using the statistics module.',
  items: ['Import the statistics module', 'Store the weekly readings in a list', 'Call statistics.median() with the list and keep the result', 'Display the result'],
  sol: 'The module is imported first, the data is stored, the function is called with the data, and only then is the stored result displayed.',
}));

// ================================================================ code-output items
export const cBuild = code('menu = {"idli": 30, "dosa": 45}', 'menu["vada"] = 25', 'menu["idli"] = 35', 'del menu["dosa"]', 'print(menu)', 'print(len(menu), "vada" in menu, "dosa" in menu)');
Q('co_dict_build', co({
  pre: 'A tiffin stall edits its price dictionary by adding, changing and deleting items. Write exactly what the program below prints.',
  t: 1, d: 2, c: 'understanding', marks: 2,
  code: cBuild,
  sol: 'Assigning to a new key adds a pair, assigning to an existing key replaces its value, and del removes a pair. The dictionary is printed with its remaining pairs in insertion order.',
}));
export const cTrav = code('sc = {"Anu": 3, "Biju": 5, "Chhavi": 2}', 'for k in sc:', '    print(k, end=" ")', 'print()', 'for v in sc.values():', '    print(v * 2, end=" ")', 'print()', 'for k, v in sc.items():', '    print(k[0] + str(v), end=" ")', 'print()');
Q('co_traverse_three', co({
  pre: 'Three loops walk through the goals scored by three players, once over the keys, once over the values and once over the items. Write the exact output.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cTrav,
  sol: 'A plain for loop over a dictionary gives its keys; values() gives the values, which are doubled here; items() gives (key, value) pairs that are unpacked into k and v. Each end=" " keeps the output of a loop on one line.',
}));
export const cChars = code('word = "committee"', 'freq = {}', 'for ch in word:', '    freq[ch] = freq.get(ch, 0) + 1', 'print(freq)', 'print(len(freq), max(freq.values()))');
Q('co_char_count', co({
  pre: 'The word committee is analysed character by character with get() and a dictionary. What exactly does the program print?',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cChars,
  sol: 'get(ch, 0) gives the count so far, or 0 for a character met for the first time, and 1 is added. The keys appear in the order in which the characters first occur; len() counts the distinct characters and max() of the values is the highest count.',
}));
export const cMeth = code('cart = {"pen": 2, "ink": 1}', 'cart.update({"pad": 4, "pen": 3})', 'print(cart)', 'print(cart.pop("ink"), cart.pop("tape", 0))', 'cart.setdefault("clip", 10)', 'cart.setdefault("pad", 99)', 'print(cart)', 'print(cart.popitem(), len(cart))');
Q('co_methods_chain', co({
  pre: 'A shopping cart dictionary goes through update(), pop(), setdefault() and popitem() in the program below. Write exactly what it prints.',
  t: 1, d: 4, c: 'analysis', marks: 2,
  code: cMeth,
  sol: 'update() overwrites "pen" and adds "pad". pop("ink") returns its value, and pop("tape", 0) returns the default 0 because the key is missing. setdefault() inserts "clip" but leaves the existing "pad" alone. popitem() removes and returns the last inserted pair, and len() is taken after that removal.',
}));
export const cFk = code('slots = dict.fromkeys(["A", "B", "C"], "free")', 'mirror = slots.copy()', 'alias = slots', 'slots["B"] = "taken"', 'print(slots)', 'print(mirror)', 'print(alias == slots, mirror == slots, alias is slots)');
Q('co_fromkeys_copy', co({
  pre: 'A car park starts with every slot free, keeps a copy and also a second name for the dictionary, and then one slot is taken. What does this program print?',
  t: 1, d: 4, c: 'analysis', marks: 2,
  code: cFk,
  sol: 'fromkeys() gives each slot the value "free". mirror is an independent copy and does not see the change; alias is the same dictionary under another name and does. The operator == compares contents, and is compares identity.',
}));
export const cAgg = code('runs = {"Dev": 45, "Esha": 72, "Farid": 38, "Gita": 72}', 'top = max(runs.values())', 'print(top, sum(runs.values()), min(runs), max(runs))', 'print(sorted(runs.values(), reverse=True))', 'for n in sorted(runs):', '    if runs[n] == top:', '        print(n)');
Q('co_dict_agg', co({
  pre: 'Four batters share a dictionary of runs, and max, min, sum and sorted are applied to it in different ways. Write the exact output.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cAgg,
  sol: 'On the values, max() and sum() give the best score and the total; min(runs) and max(runs) compare the key strings. sorted() of the values in reverse gives a list, and the loop over the sorted keys prints every player whose runs equal the top score.',
}));
export const cIn = code('n = int(input())', 'price = {}', 'for i in range(n):', '    name = input()', '    price[name] = int(input())', 'total = 0', 'for name in price:', '    total += price[name]', 'print(price)', 'print(total, len(price))');
export const cInIn = '4\nmango\n80\nplum\n120\nmango\n95\nfig\n60\n';
Q('co_dict_input', co({
  pre: 'The program below reads a count and then that many pairs of a fruit name and its price, one value per line. It is run with the input 4, mango, 80, plum, 120, mango, 95, fig and 60. Write the exact output.',
  t: 1, d: 4, c: 'analysis', marks: 2, run: { stdin: cInIn },
  code: cIn,
  sol: 'Four pairs are read, but the name mango is entered twice, so the second price replaces the first and the dictionary has three keys. The total and the length are taken from that dictionary, not from the four inputs.',
}));
export const cNest = code('team = {"A": [4, 6], "B": [3]}', 'team["B"].append(9)', 'team["C"] = []', 'for k in team:', '    print(k, len(team[k]), sum(team[k]))');
Q('co_dict_of_lists', co({
  pre: 'A dictionary maps team letters to lists of match scores, and a list inside it is changed in place. What exactly does the program print?',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cNest,
  sol: 'A value may be a list, and team["B"] is that list, so append() changes it in place. The new key "C" holds an empty list. The loop prints each key with the length and sum of its list.',
}));
export const cMath = code('import math', 'print(math.sqrt(81), math.ceil(7.01), math.floor(-0.5))', 'print(math.fabs(-2.5), math.pow(5, 2), round(math.pi, 3))', 'print(int(math.sqrt(50)), math.e > 2.7)');
Q('co_math_funcs', co({
  pre: 'A student explores the math module with constants and rounding functions. Write the exact output of the three print lines below.',
  t: 2, d: 3, c: 'understanding', marks: 2,
  code: cMath,
  sol: 'sqrt(), fabs() and pow() return floats, so they print with a decimal point; ceil() and floor() return integers, and floor rounds a negative fraction down, away from zero. round(pi, 3) keeps three decimals, int() cuts the float root of 50 to its whole part, and the constant e is greater than 2.7.',
}));
export const cTrig = code('import math', 'a = math.pi / 2', 'print(round(math.sin(a), 3), round(math.cos(a), 3), round(math.tan(math.pi / 4), 3))', 'print(math.sin(math.pi) == 0, abs(math.sin(math.pi)) < 1e-9)', 'print(math.cos(0), math.sin(0))');
Q('co_math_trig', co({
  pre: 'Angles in radians are fed to sin, cos and tan, and one result is compared with zero. Write exactly what this program prints.',
  t: 2, d: 4, c: 'analysis', marks: 2,
  code: cTrig,
  sol: 'The angles are in radians, and round() hides the tiny errors of floating point arithmetic in the first line. The exact comparison of sin(pi) with 0 is False, because the stored value is a very small number, not zero; testing that its size is below a tolerance is True.',
}));
export const cStat = code('import statistics as st', 'a = [12, 7, 9, 7, 15, 10]', 'b = [2, 5, 5, 8]', 'print(st.mean(a), st.median(a), st.mode(a))', 'print(st.mean(b), st.median(b), st.mode(b))');
Q('co_statistics', co({
  pre: 'Two lists of ratings are summarised with mean, median and mode through an alias of the statistics module. What does the program print?',
  t: 2, d: 3, c: 'application', marks: 2,
  code: cStat,
  sol: 'For an even number of values the median is the average of the two middle sorted values, so it can be a float even when the data holds integers. The mean here is exact, and the mode is the value that occurs most often.',
}));
export const cAlias = code('from math import sqrt as root, pi', 'import random as rd', 'print(root(16) + 1, round(pi * 2, 2))', 'print(rd.randint(7, 7), rd.randrange(4, 5))', 'print(rd.random() < 1)');
Q('co_import_alias', co({
  pre: 'Names are imported with aliases, and random functions are called with ranges that leave only one choice. Write the exact output of this program.',
  t: 2, d: 4, c: 'analysis', marks: 2,
  code: cAlias,
  sol: 'root is another name for sqrt, so root(16) + 1 is a float. randint(7, 7) can only give 7, and randrange(4, 5) can only give 4. random() is always below 1, so the comparison is always True; the output is the same on every run.',
}));

// ================================================================ short answers (2 marks)
export const errKey = code('rates = {"Delhi": 12, "Jaipur": 10}', 'print(rates["Agra"])');
const errKeyFix = code('rates = {"Delhi": 12, "Jaipur": 10}', 'print(rates.get("Agra", "no rate found"))');
Q('s2_err_keyerror', short({
  t: 1, d: 2, c: 'analysis', marks: 2,
  stem: `Nisha's parcel program should print the rate for Agra, but it stops with an error. Name the error, say why it occurs and correct the program so that it prints a message instead.\n\n${F(errKey)}`,
  model: `Python reports ${ic(pyErr(errKey))}.\n\nThe key "Agra" is not in the dictionary, and reading a missing key with square brackets raises a KeyError. The method get() with a default avoids it:\n\n${F(errKeyFix)}\n\nOutput: ${ic(pyOut(errKeyFix))}`,
  sol: 'One mark for naming the KeyError with its cause, one for the corrected program (get() with a default, or a test with in).',
  scheme: [['KeyError and its cause', 1], ['Corrected program', 1]],
}));
export const errList = code('gates = {[2, 3]: "north"}', 'print(gates)');
const errListFix = code('gates = {(2, 3): "north"}', 'print(gates)');
Q('s2_err_listkey', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: `Ojas stores the grid position of each school gate in a dictionary, but the program fails on the first line. Find the error, explain it and give a corrected version.\n\n${F(errList)}`,
  model: `Python reports ${ic(pyErr(errList))}.\n\nA dictionary key must be of an immutable (hashable) type, and a list is mutable. A tuple is immutable, so the position can be written as a tuple:\n\n${F(errListFix)}\n\nOutput: ${ic(pyOut(errListFix))}`,
  sol: 'One mark for the TypeError with the reason (a list is mutable), one for using a tuple as the key.',
  scheme: [['TypeError because a list key is mutable', 1], ['Tuple used as the key', 1]],
}));
export const errImp = code('import math', 'r = 5', 'print(pi * r * r)');
const errImpFix = code('import math', 'r = 5', 'print(math.pi * r * r)');
Q('s2_err_import', short({
  t: 2, d: 2, c: 'analysis', marks: 2,
  stem: `Pranav imports the math module to find the area of a circle, but the program stops with an error. Explain the error and give two different ways to correct the program.\n\n${F(errImp)}`,
  model: `Python reports ${ic(pyErr(errImp))}.\n\nThe statement import math makes only the module name math available, so the constant must be written math.pi:\n\n${F(errImpFix)}\n\nOutput: ${ic(pyOut(errImpFix))}\n\nThe other way is to replace the first line by ${ic('from math import pi')}, after which pi can be used on its own.`,
  sol: 'One mark for the NameError and its cause, one for the two corrections (math.pi, or from math import pi).',
  scheme: [['NameError: pi is not defined by import math', 1], ['Both corrections', 1]],
}));
const giProg = code('d = {"a": 1}', 'print(d.get("b"))', 'print(d["b"])');
Q('s2_get_vs_index', short({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'State the difference between reading a value with `d[key]` and with `d.get(key)` when the key is missing, and show it with a short program.',
  model: `${F(giProg)}\n\nThe first print line shows ${ic(pyOut(code('d = {"a": 1}', 'print(d.get("b"))')))}, because get() returns None (or a default value that was given) for a missing key. The second line then stops the program with ${ic(pyErr(giProg))}, because square brackets raise an error for a missing key.`,
  sol: 'One mark for get() returning None or a default, one for the square brackets raising a KeyError.',
  scheme: [['get() gives None or the default', 1], ['d[key] raises KeyError', 1]],
}));
const upSetup = 'kit = {"tape": 4, "glue": 2}';
const upProg = code(upSetup, 'kit.update({"glue": 5, "clip": 9})', 'print(kit)');
Q('s2_update_demo', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: `A craft club has ${ic(upSetup)}. Write a statement that uses update() to set glue to 5 and add a new item clip with 9, and show the dictionary afterwards. Say what update() does when a key already exists.`,
  model: `${F(upProg)}\n\nOutput: ${ic(pyOut(upProg))}\n\nupdate() adds the pairs whose keys are new and replaces the value of a key that already exists, which is why the glue count is changed instead of repeated.`,
  sol: 'One mark for the statement and the printed dictionary, one for the behaviour on an existing key.',
  scheme: [['update() statement and output', 1], ['Existing key is overwritten', 1]],
}));
const cdProg = code('a = {"x": 1, "y": 2}', 'b = a', 'c = a.copy()', 'a["x"] = 99', 'print(b)', 'print(c)');
Q('s2_copy_alias_dict', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: 'Explain, with a short program, how `b = a` and `c = a.copy()` differ when `a` is a dictionary.',
  model: `${F(cdProg)}\n\nOutput:\n\n${O(pyOut(cdProg))}\n\nThe statement b = a gives the same dictionary a second name, so b shows the change made through a. The method copy() builds a new dictionary with the same pairs, so c does not change.`,
  sol: 'One mark for the alias explained with its output, one for the copy explained with its output.',
  scheme: [['b = a shares the dictionary', 1], ['copy() is independent', 1]],
}));
const pdProg = code('d = {"p": 1, "q": 2, "r": 3, "s": 4}', 'print(d.pop("q"))', 'print(d.popitem())', 'del d["p"]', 'print(d)');
Q('s2_pop_popitem_del', short({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Distinguish between `pop(key)`, `popitem()` and the statement `del d[key]` for a dictionary, and show all three in one program.',
  model: `${F(pdProg)}\n\nOutput:\n\n${O(pyOut(pdProg))}\n\npop(key) removes the given key and returns its value. popitem() removes the last inserted pair and returns it as a tuple. The statement del d[key] removes the key too, but returns nothing.`,
  sol: 'One mark for pop() and popitem() with what each returns, one for del and the program with its output.',
  scheme: [['pop() and popitem() return values', 1], ['del removes without a return value; output', 1]],
}));
Q('s2_import_forms', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Show the two common ways of using the function sqrt() of the math module in a program, and state one difference in how the function is called.',
  model: `${F(code('import math', 'print(math.sqrt(36))'))}\n\nOutput: ${ic(pyOut(code('import math', 'print(math.sqrt(36))')))}\n\n${F(code('from math import sqrt', 'print(sqrt(36))'))}\n\nOutput: ${ic(pyOut(code('from math import sqrt', 'print(sqrt(36))')))}\n\nAfter import math the function has to be called with the module name, math.sqrt(). After from math import sqrt it is called by its own name, sqrt(), and the name math is not defined.`,
  sol: 'One mark for each correct form with its output, with the difference in the call explained.',
  scheme: [['import math form', 1], ['from math import form and the difference', 1]],
}));
const rr = possible(code('import random', 'k = random.randrange(20, 51, 10)', 'print(k)'), [['k', 'range(20, 51, 10)']], 'str(k)');
const rrVals = [...rr].map(Number).sort((a, b) => a - b);
Q('s2_random_range', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'A quiz program uses `k = random.randrange(20, 51, 10)`. List all the values that k can take and give the smallest and the largest. Does randrange(20, 51, 10) behave differently from randint(20, 50)?',
  model: `The values are ${rrVals.join(', ')}; the smallest is ${rrVals[0]} and the largest is ${rrVals[rrVals.length - 1]}.\n\nThe step 10 means only every tenth number is possible, and the stop value 51 is excluded, so 50 is the last one. The call randint(20, 50) could give any whole number from 20 to 50 including both ends, so it is not the same.`,
  sol: 'One mark for the list of values with the smallest and largest, one for the comparison with randint().',
  scheme: [['All possible values, smallest and largest', 1], ['Step and end values compared with randint()', 1]],
}));
const cfSet = 'import math';
const cfE = ['math.ceil(5.2)', 'math.floor(5.8)', 'math.ceil(-5.2)', 'math.floor(-5.2)'];
Q('s2_ceil_floor', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: `Explain what ceil() and floor() of the math module do, and give the values of ${cfE.map((e, i) => `(${'abcd'[i]}) ${ic(e)}`).join(', ')}.`,
  model: `ceil() gives the smallest integer that is not less than the number (it rounds up) and floor() gives the largest integer that is not greater than the number (it rounds down).\n\n${cfE.map((e, i) => `(${'abcd'[i]}) ${ic(e)} is ${ic(pv(cfSet, e))}`).join('\n\n')}`,
  sol: 'One mark for the meanings of ceil() and floor(), one for the four correct values.',
  scheme: [['Meaning of ceil() and floor()', 1], ['Four values', 1]],
}));

// ================================================================ short answers (3 marks)
const tdSetup = 'inv = {"nut": 20, "bolt": 15}';
const tdStmts = ['inv["nut"] -= 5', 'inv["washer"] = 40', 'inv.update({"bolt": 30, "pin": 8})', 'x = inv.pop("nut")', 'inv.setdefault("pin", 0)', 'inv.setdefault("cap", 2)'];
const tdRows = traceDict('inv', tdStmts, tdSetup);
const tdProg = code(tdSetup, ...tdStmts, 'print(x, inv)');
Q('s3_trace_dict', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Dry run the program below and write the dictionary inv after each statement, then give the output.\n\n${F(tdProg)}`,
  model: `Starting dictionary: ${ic(pv(tdSetup, 'inv'))}\n\n${mdTable(['Statement', 'inv afterwards'], tdRows.map(([s, l]) => [ic(s), ic(l)]))}\n\nOutput: ${ic(pyOut(tdProg))}`,
  sol: 'One mark for the first three statements, one for the rest of the table and one for the printed output.',
  scheme: [['First three rows', 1], ['Remaining rows', 1], ['Printed output', 1]],
}));
export const bugCount = code('word = "mississippi"', 'freq = {}', 'for ch in word:', '    freq[ch] += 1', 'print(freq)');
const bugFix = code('word = "mississippi"', 'freq = {}', 'for ch in word:', '    freq[ch] = freq.get(ch, 0) + 1', 'print(freq)');
Q('s3_bug_count', short({
  t: 1, d: 4, c: 'analysis', marks: 3,
  stem: `A program should count the letters of the word mississippi, but it stops with an error on its very first pass.\n\n${F(bugCount)}\n\nName the error, explain which statement causes it and why, and correct the program, giving its output.`,
  model: `Python reports ${ic(pyErr(bugCount))}.\n\nThe statement freq[ch] += 1 first reads freq[ch], but the dictionary is empty, so the key for the first letter does not exist yet. A count must be started for a new letter, for example with get() and a default of 0:\n\n${F(bugFix)}\n\nOutput: ${ic(pyOut(bugFix))}`,
  sol: 'One mark for the KeyError, one for the explanation of the missing key, one for the corrected program and its output.',
  scheme: [['KeyError named', 1], ['Explanation: reading a missing key', 1], ['Corrected program and output', 1]],
}));
const empSet = 'emp = {"Arjun": 42000, "Bela": 38500, "Chandan": 51000}';
const empProg = code(empSet, 'print(emp["Bela"])', 'emp["Arjun"] += 2000', 'for name in emp:', '    if emp[name] > 40000:', '        print(name, emp[name])');
Q('s3_salary_access', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `A small firm stores salaries as ${ic(empSet)}. Write statements to (a) print the salary of Bela, (b) increase the salary of Arjun by 2000, and (c) print the name and salary of every employee who earns more than 40000 after that change. Show the output.`,
  model: `${F(empProg)}\n\nOutput:\n\n${O(pyOut(empProg))}\n\n(a) reads the value of the key "Bela"; (b) updates the value of an existing key; (c) loops over the keys and uses each key to read its value.`,
  sol: 'One mark for each part (a), (b) and (c); the output is checked with the last part.',
  scheme: [['(a) value of a key', 1], ['(b) value updated', 1], ['(c) loop with condition and output', 1]],
}));
const rdProg = code('import random', 'x = random.randint(1, 2)', 'y = random.randrange(0, 6, 3)', 'print(x + y)');
const rdSet = possible(rdProg, [['x', 'range(1, 3)'], ['y', 'range(0, 6, 3)']], 'str(x + y)');
const rdVals = [...rdSet].map(Number).sort((a, b) => a - b);
poss(rdSet, '4', '3', '6');
Q('s3_random_poss', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `Study the program below and list every value it can print. Can it print 3? Can it print 6? Explain how you decided.\n\n${F(rdProg)}`,
  model: `x can be 1 or 2 (both ends of randint are included). y can be 0 or 3 (randrange stops before 6 and moves in steps of 3). The sum takes every combination: 1+0, 1+3, 2+0 and 2+3.\n\nPossible outputs: ${rdVals.join(', ')}.\n\nThe value 3 cannot be printed, because 3 would need x to be 3 or y to be 2 or 1, which are not possible. The value 6 cannot be printed either, because the largest sum is ${rdVals[rdVals.length - 1]}.`,
  sol: 'One mark for the ranges of x and y, one for the list of all possible outputs, one for the answers about 3 and 6 with reasons.',
  scheme: [['Ranges of the two calls', 1], ['List of possible outputs', 1], ['3 and 6 answered with reasons', 1]],
}));
const hypProg = code('import math', 'a = int(input())', 'b = int(input())', 'h = math.sqrt(math.pow(a, 2) + math.pow(b, 2))', 'print(round(h, 2), math.ceil(h))');
Q('s3_hypotenuse', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'Write a program that reads the two shorter sides of a right-angled triangle, finds the hypotenuse with the math module (square root of the sum of the squares), and prints it rounded to two decimals together with the next whole number above it. Show the output for the inputs 7 and 24, and for 3 and 5.',
  model: `${F(hypProg)}\n\nInputs 7 and 24: ${ic(pyOut(hypProg, { stdin: '7\n24\n' }))}\n\nInputs 3 and 5: ${ic(pyOut(hypProg, { stdin: '3\n5\n' }))}\n\nThe module is imported first; pow() and sqrt() come from math; ceil() gives the next whole number at or above the value.`,
  sol: 'One mark for the import and the input, one for the formula with sqrt() and pow(), one for the printed values with both outputs.',
  scheme: [['import and input', 1], ['Formula with sqrt() and pow()', 1], ['Printing and both outputs', 1]],
}));
const smProg = code('import statistics', 'ratings = [7, 9, 4, 9, 6, 8, 9, 5]', 'print("Mean:", statistics.mean(ratings))', 'print("Median:", statistics.median(ratings))', 'print("Mode:", statistics.mode(ratings))', 'above = 0', 'for r in ratings:', '    if r > statistics.mean(ratings):', '        above += 1', 'print("Above the mean:", above)');
Q('s3_stat_program', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'A food-delivery app stores customer ratings in the list `[7, 9, 4, 9, 6, 8, 9, 5]`. Write a program that uses the statistics module to print the mean, the median and the mode, and then counts and prints how many ratings are above the mean. Show the output.',
  model: `${F(smProg)}\n\nOutput:\n\n${O(pyOut(smProg))}\n\nThe three statistics come from mean(), median() and mode(); a loop compares each rating with the mean and counts those that are larger.`,
  sol: 'One mark for the import and the list, one for the three function calls, one for the loop that counts with the output.',
  scheme: [['import and list', 1], ['mean, median and mode', 1], ['Count above the mean and output', 1]],
}));

// ================================================================ long answers (5 marks)
const cfProg2 = code('word = input()', 'freq = {}', 'for ch in word:', '    freq[ch] = freq.get(ch, 0) + 1', 'for ch in freq:', '    print(ch, freq[ch])', 'top = max(freq.values())', 'best = []', 'for ch in freq:', '    if freq[ch] == top:', '        best.append(ch)', 'print("Most frequent:", best, "x", top)');
Q('l_char_freq', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'Write a program that reads a word and uses a dictionary to count how many times each character occurs. It must print every character with its count (in order of first appearance) and then the character or characters that occur most often. Show the output for the inputs assessment and level.',
  model: `${F(cfProg2)}\n\nInput assessment:\n\n${O(pyOut(cfProg2, { stdin: 'assessment\n' }))}\n\nInput level:\n\n${O(pyOut(cfProg2, { stdin: 'level\n' }))}\n\nThe expression freq.get(ch, 0) + 1 starts a count at 1 for a new character; a second loop over the keys finds every character whose count equals the maximum.`,
  sol: 'Marks: the empty dictionary and the loop over the characters, the counting statement, printing each character with its count, finding the highest count with every character that has it, and the two outputs.',
  scheme: [['Dictionary and loop over characters', 1], ['Counting with get() or a test', 1], ['Printing characters with counts', 1], ['Most frequent character(s)', 1], ['Both outputs', 1]],
}));
const menuProg = code('emp = {}', 'while True:', '    print("1 add or change, 2 delete, 3 highest paid, 4 exit")', '    ch = int(input())', '    if ch == 1:', '        name = input()', '        emp[name] = int(input())', '    elif ch == 2:', '        name = input()', '        if name in emp:', '            del emp[name]', '        else:', '            print(name, "not found")', '    elif ch == 3:', '        if len(emp) == 0:', '            print("no employees")', '        else:', '            top = max(emp.values())', '            for name in emp:', '                if emp[name] == top:', '                    print(name, top)', '    elif ch == 4:', '        break', 'print("Employees:", len(emp), emp)');
const menuIn = '1\nAsha\n30000\n1\nBhanu\n45000\n1\nAsha\n47000\n2\nChetan\n3\n2\nBhanu\n3\n4\n';
Q('l_salary_menu', long({
  t: 1, d: 5, c: 'application', marks: 5,
  stem: 'Write a menu-driven program for an office. Choice 1 reads a name and a salary and stores or changes it in a dictionary, choice 2 reads a name and deletes it if present (otherwise it prints a message), choice 3 prints the name and salary of the highest paid employee (or a message if the dictionary is empty), and choice 4 ends the program and prints the number of employees with the dictionary. Show the output for the input 1 Asha 30000, 1 Bhanu 45000, 1 Asha 47000, 2 Chetan, 3, 2 Bhanu, 3, 4 (every value on its own line).',
  model: `${F(menuProg)}\n\nOutput:\n\n${O(pyOut(menuProg, { stdin: menuIn }))}\n\nAssigning to a key adds a new employee or replaces the salary of an existing one; in guards del from a KeyError; max() of the values finds the highest salary, and a loop over the keys finds who earns it.`,
  sol: 'Marks: a loop that ends on choice 4, storing or changing a salary, safe deletion, the highest paid employee with the empty case, and the output.',
  scheme: [['Loop with break on 4', 1], ['Add or change by assignment', 1], ['Safe delete with in', 1], ['Highest paid with the empty case', 1], ['Output for the input', 1]],
}));
const wfProg = code('line = input().lower()', 'words = line.split()', 'freq = {}', 'for w in words:', '    freq[w] = freq.get(w, 0) + 1', 'print("Words:", len(words), "Different:", len(freq))', 'for w in sorted(freq):', '    if freq[w] > 1:', '        print(w, freq[w])');
const wfIn = 'The tea is hot and the Tea is sweet\n';
Q('l_word_freq', long({
  t: 1, d: 4, c: 'application', marks: 5,
  stem: 'Write a program that reads a sentence, converts it to lower case, and uses a dictionary to find the frequency of every word. It must print the number of words, the number of different words, and then (in alphabetical order) every word that occurs more than once with its count. Show the output for the input: The tea is hot and the Tea is sweet',
  model: `${F(wfProg)}\n\nOutput:\n\n${O(pyOut(wfProg, { stdin: wfIn }))}\n\nlower() makes The and the the same key; split() gives the list of words; len(words) counts all words and len(freq) counts the distinct ones; sorted(freq) walks the keys in alphabetical order.`,
  sol: 'Marks: lower() and split(), the frequency dictionary, the two counts, the sorted loop printing only repeated words, and the output.',
  scheme: [['lower() and split()', 1], ['Frequency dictionary', 1], ['Number of words and different words', 1], ['Sorted loop for words above one', 1], ['Output', 1]],
}));
const mkProg = code('marks = {"Rohan": 68, "Sita": 91, "Tanvir": 54, "Uma": 77, "Vimal": 91}', 'total = 0', 'for name in marks:', '    total += marks[name]', 'avg = total / len(marks)', 'print("Average:", avg)', 'best = max(marks.values())', 'for name in marks:', '    if marks[name] == best:', '        print("Topper:", name, best)', 'above = []', 'for name in marks:', '    if marks[name] > avg:', '        above.append(name)', 'print("Above average:", above)', 'grade = {}', 'for name in marks:', '    grade[name] = "A" if marks[name] >= 75 else "B"', 'print(grade)');
Q('l_marks_dict', long({
  t: 1, d: 4, c: 'application', marks: 5,
  stem: 'The marks of five students are stored as `{"Rohan": 68, "Sita": 91, "Tanvir": 54, "Uma": 77, "Vimal": 91}`. Write a program that prints the average mark, prints every topper (a student with the highest mark), prints the list of students who scored above the average, and builds a new dictionary grade with the value "A" for marks of 75 or more and "B" for the others. Show the output.',
  model: `${F(mkProg)}\n\nOutput:\n\n${O(pyOut(mkProg))}\n\nThe total is built by a loop over the keys; max() of the values finds the highest mark, and a second loop prints every key with that value, so a tie shows both students. The new dictionary grade is filled one key at a time.`,
  sol: 'Marks: the average, every topper, the list above the average, the grade dictionary, and the output.',
  scheme: [['Average', 1], ['Every topper', 1], ['List above the average', 1], ['Grade dictionary', 1], ['Output', 1]],
}));
const gdProg = code('import math', 'r = float(input())', 'rate = int(input())', 'area = math.pi * r * r', 'fence = 2 * math.pi * r', 'rolls = math.ceil(fence / 5)', 'print("Area:", round(area, 2))', 'print("Fence:", round(fence, 2))', 'print("Rolls of 5 m:", rolls)', 'print("Cost:", math.floor(area * rate))');
Q('l_garden_math', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'A circular garden of radius r metres is to be fenced and planted. Write a program that reads r (a float) and the planting cost per square metre (an integer), uses the math module to find the area and the fence length, prints both rounded to two decimals, prints how many whole 5-metre fence rolls are needed (rounded up), and prints the planting cost rounded down to whole rupees. Show the output for the inputs 7.5 and 12.',
  model: `${F(gdProg)}\n\nOutput:\n\n${O(pyOut(gdProg, { stdin: '7.5\n12\n' }))}\n\nmath.pi gives the constant; ceil() makes sure the last, partly used roll is counted; floor() drops the paise from the cost.`,
  sol: 'Marks: import and input, area and fence length, rolls with ceil(), cost with floor(), and the output.',
  scheme: [['import math and input', 1], ['Area and fence length with math.pi', 1], ['Rolls with ceil()', 1], ['Cost with floor()', 1], ['Output', 1]],
}));
const sdPrg = code('import statistics', 'import math', 'n = int(input())', 'marks = []', 'for i in range(n):', '    marks.append(int(input()))', 'm = statistics.mean(marks)', 'print("Mean:", m)', 'print("Median:", statistics.median(marks))', 'print("Mode:", statistics.mode(marks))', 'ss = 0', 'for x in marks:', '    ss += (x - m) ** 2', 'print("Spread:", round(math.sqrt(ss / n), 2))');
Q('l_stat_spread', long({
  t: 2, d: 4, c: 'application', marks: 5,
  stem: 'Write a program that reads how many marks follow, reads the marks into a list, and uses the statistics module to print the mean, median and mode. It must also print the spread, computed as the square root of the average of the squared differences between each mark and the mean (use math.sqrt() and round to two decimals). Show the output for the input 6, 12, 15, 12, 18, 9 and 12 (one value per line).',
  model: `${F(sdPrg)}\n\nOutput:\n\n${O(pyOut(sdPrg, { stdin: '6\n12\n15\n12\n18\n9\n12\n' }))}\n\nThe first input is the count; the marks are appended to a list; mean(), median() and mode() give the three statistics; a loop adds up the squared differences, and sqrt() of their average is the spread.`,
  sol: 'Marks: both imports with the list read from input, the three statistics, the loop for the squared differences, the square root with rounding, and the output.',
  scheme: [['Imports and reading the list', 1], ['Mean, median and mode', 1], ['Loop for squared differences', 1], ['sqrt() of the average, rounded', 1], ['Output', 1]],
}));

// ================================================================ case-based (4 marks)
const stSet2 = 'stock = {"onion": 40, "tomato": 25, "okra": 10}';
const stProg2 = code(stSet2, 'stock["tomato"] += 15', 'stock["potato"] = stock.get("potato", 0) + 30', 'sold = stock.pop("okra")', 'for item in stock:', '    if stock[item] < 45:', '        print(item, stock[item])', 'print(sold, len(stock))');
Q('cb_veg_stall', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the vegetable stall of Hari and answer the questions. *(Imagined stall and quantities, written by SOYL for practice.)*',
  passage: `Hari keeps the kilograms of each vegetable at his stall in a dictionary. During the day he receives more tomatoes, brings in a new vegetable, sells out one vegetable completely, and then prints the items that are running low.\n\n${F(stProg2)}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'c', stem: 'What does the program print? (The lines of output are shown separated by a slash.)', opts: distinct([ic('onion 40 / tomato 25 / potato 30 / 10 3'), ic('onion 40 / tomato 40 / potato 30 / 10 4'), ic(pyOut(stProg2).replace(/\n/g, ' / ')), ic('tomato 40 / potato 30 / 10 3')]), sol: 'tomato becomes 40 after += 15. get("potato", 0) is 0 because potato is missing, so potato is stored as 30. pop("okra") removes okra and returns 10. The loop prints the items below 45 in insertion order, and the last line shows the sold quantity and the number of items left.' })),
    child('b', tf({ t: 1, d: 2, c: 'understanding', ans: false, stem: 'True or false? In the loop `for item in stock:`, the variable `item` takes the quantities (values) of the dictionary.', sol: 'A for loop over a dictionary gives its keys, so item is a vegetable name; the quantity is read with stock[item].' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): After the program has run, write a loop that prints the total kilograms of all vegetables left, and give the value.', model: `${F(code('total = 0', 'for q in stock.values():', '    total += q', 'print(total)'))}\n\nOutput: ${ic(pyOut(code(stProg2, 'total = 0', 'for q in stock.values():', '    total += q', 'print(total)')).split('\n').pop())}`, sol: 'One mark for the loop over values() with a running total and one for the printed value.', scheme: [['Loop over the values with a total', 1], ['Printed value', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Hari writes `stock["potato"] = stock["potato"] + 30` instead of the get() line, before potato has been added. Predict what happens and explain why get() avoids it.', model: `Python stops with ${ic(pe(stSet2, 'stock["potato"] = stock["potato"] + 30'))}, because the right side reads a key that does not exist yet.\n\nget("potato", 0) returns the default 0 for a missing key, so the sum is 0 + 30 and the new key is created.`, sol: 'One mark for the KeyError and its cause and one for the role of the default in get().', scheme: [['KeyError and cause', 1], ['Default of get()', 1]] }),
    ]),
  ],
}));
const vtList = '["Meena", "Raj", "Meena", "Zoya", "Raj", "Meena"]';
const vtProg = code(`votes = ${vtList}`, 'tally = {}', 'for v in votes:', '    tally[v] = tally.get(v, 0) + 1', 'print(tally)', 'win = max(tally.values())', 'for name in tally:', '    if tally[name] == win:', '        print("Winner:", name)');
Q('cb_votes', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the class monitor election of Class XI-D and answer the questions. *(Imagined class and votes, written by SOYL for practice.)*',
  passage: `Each ballot of Class XI-D names one candidate. The votes are stored in a list, and a dictionary is used to count them and find the winner.\n\n${F(vtProg)}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'b', stem: 'What is the first line printed by the program?', opts: distinct([ic("{'Meena': 1, 'Raj': 1, 'Zoya': 1}"), ic(pyOut(vtProg).split('\n')[0]), ic("{'Meena': 3, 'Zoya': 1, 'Raj': 2}"), ic("{'Meena': 3, 'Raj': 2}")]), sol: 'Each vote adds 1 to the count of its candidate, and a new candidate starts from the default 0. The keys appear in the order of the first vote of each candidate, and the counts are the numbers of ballots.' })),
    child('b', fb({ t: 1, d: 2, c: 'understanding', stem: 'The number of keys in the dictionary tally, given by `len(tally)`, is the number of ___ candidates.', acc: [['different', 'distinct', 'unique']], sol: 'Every candidate is one key, however many votes the candidate got, so len(tally) counts the different candidates.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write a statement that prints the votes of Zoya, and one that prints the votes of a candidate Dev who may have received none, without an error. Give both values.', model: `${ic('print(tally["Zoya"])')} gives ${ic(pyOut(code(vtProg, 'print(tally["Zoya"])')).split('\n').pop())}.\n\n${ic('print(tally.get("Dev", 0))')} gives ${ic(pyOut(code(vtProg, 'print(tally.get("Dev", 0))')).split('\n').pop())}, because get() returns the default for a missing key.`, sol: 'One mark for each statement with its value.', scheme: [['Zoya with square brackets', 1], ['Dev with get() and a default', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): The votes list is changed so that Raj receives a fourth vote, so that two candidates tie for the most votes. Which of the two candidates are printed as winners, and why does the last loop of the program handle a tie?', model: `With votes ${ic('["Meena", "Raj", "Meena", "Zoya", "Raj", "Meena", "Raj"]')}, the program prints ${ic(pyOut(vtProg.replace(vtList, '["Meena", "Raj", "Meena", "Zoya", "Raj", "Meena", "Raj"]')).split('\n').slice(1).join(' / '))}.\n\nThe last loop prints every key whose count equals the highest count, so all tied candidates are printed, not only the first.`, sol: 'One mark for the output with the tie and one for the explanation of the loop.', scheme: [['Output with the tie', 1], ['Loop prints every key with the top count', 1]] }),
    ]),
  ],
}));
const dcProg = code('import random', 'a = random.randint(1, 6)', 'b = random.randint(1, 6)', 'move = a + b', 'if a == b:', '    move = move * 2', 'print(move)');
const dcSet = possible(dcProg, [['a', 'range(1, 7)'], ['b', 'range(1, 7)']], 'str((a + b) * 2 if a == b else a + b)');
poss(dcSet, '16', '2', '13', '14');
poss(dcSet, '12');
poss(dcSet, '24');
const dcVals = [...dcSet].map(Number).sort((x, y) => x - y);
Q('cb_dice_game', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the board game of the Maple Street Club and answer the questions. *(Imagined club and game, written by SOYL for practice.)*',
  passage: `In the club's board game a player throws two dice. The player moves forward by the total of the two dice, and a double (the same number on both dice) doubles the move. The game is simulated with the random module.\n\n${F(dcProg)}`,
  parts: [
    child('a', mcq({ t: 2, d: 4, c: 'analysis', fixed: true, key: 'd', stem: 'Which one of these values can the program print?', opts: ['`2`', '`13`', '`14`', '`16`'], sol: 'A total of 2 can come only from a double of ones, and that is doubled to 4, so 2 is never printed; an ordinary total is at most 11, and a double gives only 4, 8, 12, 16, 20 or 24, so 13 and 14 cannot be printed; and a double of four, 4 + 4, gives 8 doubled, which is 16.' })),
    child('b', tf({ t: 2, d: 3, c: 'understanding', ans: false, stem: 'True or false? Because each die can show 6, the program can print the number 12 only when both dice show 6.', sol: 'A double of threes gives 6 doubled, which is 12, so 12 can be printed in that way too, and a double of sixes prints 24.' })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Give the smallest and the largest value that the program can print.', model: `The smallest possible output is ${dcVals[0]} and the largest is ${dcVals[dcVals.length - 1]}.\n\nThe smallest comes from 1 and 2, since the double 1 and 1 is doubled to 4; the largest comes from a double of sixes: 12 doubled.`, sol: 'One mark for each of the smallest and the largest value with its reason.', scheme: [['Smallest value with reason', 1], ['Largest value with reason', 1]] }), [
      short({ t: 2, d: 5, c: 'analysis', marks: 2, stem: '**Or** (ii): How many different values can the program print, and are all whole numbers from the smallest to the largest value possible? Name one number between them that cannot be printed.', model: `There are ${dcVals.length} different possible outputs: ${dcVals.join(', ')}.\n\nNot every whole number between ${dcVals[0]} and ${dcVals[dcVals.length - 1]} occurs. For example, 13 cannot be printed, because an ordinary total is at most 11 and the doubled totals are 4, 8, 12, 16, 20 and 24.`, sol: 'One mark for the number of different values and one for a correct impossible number with its reason.', scheme: [['Count of possible values', 1], ['Impossible number with reason', 1]] }),
    ]),
  ],
}));
const svSet = 'import statistics\nimport math';
const svProg = code(svSet, 'pocket = [50, 80, 50, 120, 70, 90, 50, 110]', 'print(statistics.mean(pocket), statistics.median(pocket), statistics.mode(pocket))', 'print(math.ceil(statistics.mean(pocket)), math.floor(statistics.median(pocket) / 7))');
Q('cb_pocket_survey', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the pocket-money survey of Class XI and answer the questions. *(Imagined class and amounts, written by SOYL for practice.)*',
  passage: `A class survey records the weekly pocket money (in rupees) of eight students. The data is summarised with the statistics and math modules.\n\n${F(svProg)}`,
  parts: [
    child('a', mcq({ t: 2, d: 3, c: 'application', fixed: true, key: 'a', stem: 'What does the program print?', opts: distinct([ic(pyOut(svProg).replace(/\n/g, ' / ')), ic('77.5 77.5 50 / 78 11'), ic('77 75 50 / 78 10'), ic('77.5 75.0 90 / 77 10')]), sol: `The mean is the sum, ${pv(svSet + '\npocket = [50, 80, 50, 120, 70, 90, 50, 110]', 'sum(pocket)')}, divided by the 8 values. The median is the average of the two middle sorted values, 70 and 80. The mode is 50, the value that occurs most often. ceil() rounds the mean up, and floor() is applied to the median divided by 7 with ordinary division.` })),
    child('b', fb({ t: 2, d: 2, c: 'recall', stem: 'The mode of a data set is the value that occurs ___.', acc: [['most often', 'most frequently', 'the most', 'most']], sol: 'The mode is the most frequent value; here it is the amount that occurs most often.' })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write a statement that prints the square root of the mean, rounded to two decimals, and give its value.', model: `${F(code(svSet, 'pocket = [50, 80, 50, 120, 70, 90, 50, 110]', 'print(round(math.sqrt(statistics.mean(pocket)), 2))'))}\n\nOutput: ${ic(pyOut(code(svSet, 'pocket = [50, 80, 50, 120, 70, 90, 50, 110]', 'print(round(math.sqrt(statistics.mean(pocket)), 2))')))}`, sol: 'One mark for the statement with sqrt() of mean() and one for round() with the value.', scheme: [['sqrt(mean(...))', 1], ['round() and the value', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Rewrite the imports so that mean, median and mode can be called without the module name, and write the print statement that gives the same first line as the program.', model: `${F(code('from statistics import mean, median, mode', 'pocket = [50, 80, 50, 120, 70, 90, 50, 110]', 'print(mean(pocket), median(pocket), mode(pocket))'))}\n\nOutput: ${ic(pyOut(code('from statistics import mean, median, mode', 'pocket = [50, 80, 50, 120, 70, 90, 50, 110]', 'print(mean(pocket), median(pocket), mode(pocket))')))}`, sol: 'One mark for the from-import of the three functions and one for the print statement with the same output.', scheme: [['from statistics import mean, median, mode', 1], ['print statement and output', 1]] }),
    ]),
  ],
}));
