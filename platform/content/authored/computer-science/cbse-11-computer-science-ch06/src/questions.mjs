// CBSE 11 Computer Science, ch06 Lists and Tuples — question bank. Every program, scenario and data value is written
// by SOYL (imagined people, shops and schools); no textbook, NCERT or board-paper program is reused. Every output,
// error, count and trace table stated anywhere is produced by running the program with runPy()/pyOut()/pyErr().
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

// ---------------------------------------------------------------- programs reused by decks, notes and items (exported)
export const fruitsSetup = 'fruits = ["mango", "guava", "lychee", "papaya", "kiwi"]';
export const cartSetup = 'cart = ["pen", "ink", "tape", "glue", "clip"]';
/** Trace rows [statement, list] of a list program: every statement is run and the list printed after it. */
export const traceList = (name, stmts, setup = '') =>
  rowsOf(code(setup, 'import json', 'rows = []', ...stmts.flatMap((s) => [s, `rows.append([${JSON.stringify(s)}, str(${name})])`]), 'print(json.dumps(rows))'));
export const swapRows = (a, b, n) => rowsOf(code(`a, b = ${a}, ${b}`, 'import json', 'rows = [[0, a, b]]', `for i in range(1, ${n + 1}):`, '    a, b = b, a + b', '    rows.append([i, a, b])', 'print(json.dumps(rows))'));

// ================================================================ t01-t02 objective items
// ---- multiple choice: lists
Q('m_neg_index', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Ananya keeps her market list in Python as ${ic(fruitsSetup)}. What does ${ic('fruits[-2]')} give?`,
  opts: distinct([ic(pv(fruitsSetup, 'fruits[-2]')), ic(pv(fruitsSetup, 'fruits[2]')), ic(pv(fruitsSetup, 'fruits[-1]')), ic(pv(fruitsSetup, 'fruits[1]'))]),
  sol: `Negative indexes count from the end: -1 is the last item (${pv(fruitsSetup, 'fruits[-1]')}) and -2 the one before it. Index 2 counts from the front and gives ${pv(fruitsSetup, 'fruits[2]')}.`,
}));
const marksSetup = 'marks = [45, 62, 38, 91, 77, 54, 83]';
Q('m_slice_step', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `Rahul's class marks are stored as ${ic(marksSetup)}. Which result does ${ic('marks[1:6:2]')} give?`,
  opts: distinct([ic(pv(marksSetup, 'marks[1:6:2]')), ic(pv(marksSetup, 'marks[1:6]')), ic(pv(marksSetup, 'marks[1:5:2]')), ic(pv(marksSetup, 'marks[2:6:2]'))]),
  sol: `The slice starts at index 1, stops before index 6 and moves 2 places each time, so it takes the items at indexes 1, 3 and 5: ${pv(marksSetup, 'marks[1:6:2]')}. Leaving out the step gives every item from 1 to 5, and stopping at 5 would lose the last item.`,
}));
const numsSetup = 'nums = [3, 8, 12, 5, 9, 14, 2, 7]';
Q('m_slice_back', mcq({
  t: 1, d: 4, c: 'application',
  stem: `For ${ic(numsSetup)}, what does ${ic('nums[6:1:-2]')} evaluate to?`,
  opts: distinct([ic(pv(numsSetup, 'nums[6:1:-2]')), ic(pv(numsSetup, 'nums[1:6:2]')), ic(pv(numsSetup, 'nums[6:1:-1]')), ic(pv(numsSetup, 'nums[::-2]'))]),
  sol: `A negative step walks backwards from index 6 and stops before index 1: it visits indexes 6, 4 and 2, giving ${pv(numsSetup, 'nums[6:1:-2]')}. A step of -1 would visit every index from 6 down to 2.`,
}));
const rl = code('print(len([0] * 4 + [1, 2] * 3))');
Q('m_repeat_len', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Tara builds a game board with the statement ${ic('print(len([0] * 4 + [1, 2] * 3))')}. What does it print?`,
  opts: distinct([outIc(rl), ...differs(pyOut(rl), '8', '6', '24').map(ic)]),
  sol: `${ic('[0] * 4')} has ${val('len([0] * 4)')} items and ${ic('[1, 2] * 3')} has ${val('len([1, 2] * 3)')}; joining the two lists with + adds the lengths. The multiplication binds tighter than the +.`,
}));
const cartNest = 'cart = [["pen", 12], ["ink", 40]]';
Q('m_member_nested', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A stationery bill is stored as ${ic(cartNest)}. What does ${ic('print("ink" in cart, ["ink", 40] in cart)')} print?`,
  opts: distinct([outIc(code(cartNest, 'print("ink" in cart, ["ink", 40] in cart)')), ...differs(pyOut(code(cartNest, 'print("ink" in cart, ["ink", 40] in cart)')), 'True True', 'True False', 'False False').map(ic)]),
  sol: 'The operator in compares with the items of the outer list, and each item is a whole inner list. The string alone is not an item, but the inner list is.',
}));
const slSet = (stmt) => code('a = [10, 20, 30, 40, 50]', stmt, 'print(a)');
Q('m_slice_assign', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Dinesh runs this program on his list of ticket prices. What does it print?\n\n${F(slSet('a[1:3] = [7]'))}`,
  opts: distinct([outIc(slSet('a[1:3] = [7]')), outIc(slSet('a[1] = 7')), outIc(slSet('a[1:3] = [7, 7]')), outIc(slSet('a[1] = [7]'))]),
  sol: 'The slice a[1:3] covers two items, 20 and 30, and the right side is a list with one item, so two items are replaced by one and the list becomes shorter. Assigning to a single index replaces just one item.',
}));
const aliasProg = code('p = [1, 2, 3]', 'q = p', 'q.append(4)', 'r = list(p)', 'r.append(5)', 'print(p, q, r)');
Q('m_alias', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `In the program below, the name q is bound with ${ic('q = p')} and r is made with ${ic('r = list(p)')}. What does it print?\n\n${F(aliasProg)}`,
  opts: distinct([outIc(aliasProg),
    outIc(code('p = [1, 2, 3]', 'q = list(p)', 'q.append(4)', 'r = list(p)', 'r.append(5)', 'print(p, q, r)')),
    outIc(code('p = [1, 2, 3]', 'q = p', 'q.append(4)', 'r = p', 'r.append(5)', 'print(p, q, r)')),
    outIc(code('p = [1, 2, 3]', 'r = list(p)', 'q = p', 'q.append(4)', 'r.append(5)', 'print(p, q, r)'))]),
  sol: 'The statement q = p gives the same list a second name, so appending through q changes what p shows. The call list(p) builds a new, independent list, so appending to r changes only r, and r copies p after the 4 was added.',
}));
const aeProg = code('cart = [1, 2]', 'cart.append([3, 4])', 'cart.extend([5, 6])', 'print(len(cart), cart)');
Q('m_append_extend', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Isha adds items to her list with append() and extend(). What does this program print?\n\n${F(aeProg)}`,
  opts: distinct([outIc(aeProg), outIc(code('cart = [1, 2]', 'cart.extend([3, 4])', 'cart.extend([5, 6])', 'print(len(cart), cart)')), outIc(code('cart = [1, 2]', 'cart.append([3, 4])', 'cart.append([5, 6])', 'print(len(cart), cart)')), outIc(code('cart = [1, 2]', 'cart.extend([3, 4])', 'cart.append([5, 6])', 'print(len(cart), cart)'))]),
  sol: 'append() adds its argument as one single item, so the list [3, 4] becomes one nested item, while extend() adds each item of its argument separately.',
}));
const rpProg = code('t = [5, 8, 5, 2, 8]', 't.remove(5)', 'x = t.pop()', 'y = t.pop(0)', 'print(x, y, t)');
Q('m_remove_pop', mcq({
  t: 1, d: 3, c: 'application',
  stem: `What is the output of this stock-room program?\n\n${F(rpProg)}`,
  opts: distinct([outIc(rpProg), outIc(code('t = [5, 8, 5, 2, 8]', 't.remove(5)', 'x = t.pop()', 'y = t.pop(1)', 'print(x, y, t)')), outIc(code('t = [5, 8, 5, 2, 8]', 't.remove(8)', 'x = t.pop()', 'y = t.pop(0)', 'print(x, y, t)')), outIc(code('t = [5, 8, 5, 2, 8]', 't.remove(5)', 't.remove(5)', 'x = t.pop()', 'y = t.pop(0)', 'print(x, y, t)'))]),
  sol: 'remove(5) deletes only the first 5; pop() with no argument removes and returns the last item, and pop(0) removes and returns the first item of what is left.',
}));
const sortNone = code('data = [30, 10, 20]', 'res = data.sort()', 'print(res, data)');
Q('m_sort_none', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `Meera expects ${ic('res')} to hold the sorted prices. What does her program really print?\n\n${F(sortNone)}`,
  opts: distinct([outIc(sortNone), outIc(code('data = [30, 10, 20]', 'res = sorted(data)', 'print(res, data)')), ...differs(pyOut(sortNone), '[10, 20, 30] [10, 20, 30]', 'None [30, 10, 20]').map(ic)]),
  sol: 'The method sort() rearranges the list in place and returns None, so res holds None while data is sorted. The function sorted() would return a new sorted list and leave the original alone.',
}));
const tempSet = 'temps = [28, 31, 25, 36, 31]';
const meanOpts = ['sum(temps) / len(temps)', 'sum(temps) // len(temps)', 'sum(temps) / (len(temps) - 1)', '(max(temps) + min(temps)) / 2'];
const meanVals = meanOpts.map((e) => pv(tempSet, e));
if (new Set(meanVals).size !== 4) throw new Error('mean options not distinct');
Q('m_mean_expr', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `The list ${ic(tempSet)} holds five daily readings. Which expression gives their arithmetic mean?`,
  opts: meanOpts.map(ic),
  sol: `The mean is the sum divided by the number of values. For these readings, sum(temps) / len(temps) gives ${meanVals[0]}; the floor division gives ${meanVals[1]}, dividing by one less than the length gives ${meanVals[2]}, and the middle of the extremes gives ${meanVals[3]}.`,
}));
const seatSet = 'seats = [["A1", "A2", "A3"], ["B1", "B2", "B3"], ["C1", "C2", "C3"]]';
const seatQ = 'print(seats[1][2], seats[-1][0], len(seats[0]))';
Q('m_nested_idx', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A hall plan is stored as a nested list: ${ic(seatSet)}. What does ${ic(seatQ)} print?`,
  opts: distinct([outIc(code(seatSet, seatQ)), outIc(code(seatSet, 'print(seats[2][1], seats[1][0], len(seats[0]))')), outIc(code(seatSet, 'print(seats[1][1], seats[2][2], len(seats[0]))')), outIc(code(seatSet, 'print(seats[2][1], seats[0][2], len(seats))'))]),
  sol: 'The first index picks the row and the second the item in that row. seats[1][2] is the third item of the second row, seats[-1][0] is the first item of the last row, and len(seats[0]) is the length of the first row.',
}));
const travProg = code('v = [2, 5, 7]', 'for x in v:', '    x = x * 2', 'for i in range(len(v)):', '    v[i] = v[i] + 1', 'print(v)');
Q('m_traverse_modify', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `Hemant uses two loops to change a list of weights. What does the program print?\n\n${F(travProg)}`,
  opts: distinct([outIc(travProg), ...differs(pyOut(travProg), '[2, 5, 7]', '[5, 11, 15]', '[4, 10, 14]').map(ic)]),
  sol: 'In the first loop x is only a copy of each item, so doubling x leaves the list unchanged. The second loop assigns through the index, v[i], which really changes the list.',
}));

// ---- multiple choice: tuples
const oneT = [['(5,)', 'tuple'], ['(5)', 'int'], ['[5]', 'list']];
oneT.forEach(([e, t]) => { if (val(`type(${e}).__name__`) !== t) throw new Error(`type of ${e}`); });
const tupleErr = pyErr('tuple(5)');
Q('m_one_elem', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Nitin wants a tuple that holds exactly one item, the number 5. Which of these statements creates it?',
  opts: ['`t = (5,)`', '`t = (5)`', '`t = [5]`', '`t = tuple(5)`'],
  sol: `It is the comma that makes a tuple, so (5,) is a tuple of one item. The expression (5) is just the number 5 in brackets, of type ${val('type((5)).__name__')}; [5] is a ${val('type([5]).__name__')}; and tuple(5) fails with ${ic(tupleErr)}.`,
}));
const tSet = 't = (3, 6, 9)';
const tStmts = ['t[0] = 5', 'u = t + (12,)', 'u = t * 2', 'u = t[1:]'];
if (!pyErr(code(tSet, tStmts[0])) || tStmts.slice(1).some((s) => pyOut(code(tSet, s)) !== '')) throw new Error('tuple statements');
Q('m_tuple_err', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Pooja has the tuple ${ic(tSet)}. Which one of these statements, run on its own after it, causes an error?`,
  opts: tStmts.map(ic),
  sol: `A tuple cannot be changed after it is created, so assigning to t[0] fails with ${ic(pe(tSet, tStmts[0]))}. Joining, repeating and slicing build a new tuple and leave t alone.`,
}));
const tSl = 't = (7, 2, 9, 4, 6)';
const tSlQ = 'print(t[::-2], t[-3:])';
Q('m_tuple_slice', mcq({
  t: 2, d: 3, c: 'application',
  stem: `For ${ic(tSl)}, what does ${ic(tSlQ)} print?`,
  opts: distinct([outIc(code(tSl, tSlQ)), outIc(code(tSl, 'print(t[::2], t[-3:])')), outIc(code(tSl, 'print(t[::-2], t[:3])')), outIc(code(tSl, 'print(t[::-1], t[-2:])'))]),
  sol: 'A step of -2 starts from the last item and takes every second item going left: 6, 9, 7. The slice t[-3:] takes the last three items. Both slices are tuples.',
}));
const tcProg = code('a = (1, 2)', 'b = a * 2 + (3,)', 'print(len(b), b[-2])');
Q('m_tuple_concat', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Vikram combines tuples with repetition and concatenation. What does this program print?\n\n${F(tcProg)}`,
  opts: distinct([outIc(tcProg), ...differs(pyOut(tcProg), '4 3', '5 3', '3 2').map(ic)]),
  sol: `The tuple a * 2 is ${val('(1, 2) * 2')}; joining (3,) gives ${val('(1, 2) * 2 + (3,)')}, which has ${val('len((1, 2) * 2 + (3,))')} items, and the item at index -2 is the second last.`,
}));
const unpProg = code('x, y, z = 4, 9, 1', 'x, y, z = z, x, y', 'print(x, y, z)');
Q('m_unpack_swap', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Lakshmi rotates three values with one tuple assignment. What does the program print?\n\n${F(unpProg)}`,
  opts: distinct([outIc(unpProg), ...differs(pyOut(unpProg), '4 9 1', '9 1 4', '1 9 4').map(ic)]),
  sol: 'The right side z, x, y is evaluated completely first, as the tuple (1, 4, 9), and only then assigned to x, y and z in order; so no value is overwritten too early.',
}));
const tfSet = 't = (4, 9, 4, 1, 4)';
const tfQ = 'print(t.count(4), t.index(9), sorted(t))';
Q('m_tuple_funcs', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A tuple of shirt sizes is ${ic(tfSet)}. What does ${ic(tfQ)} print?`,
  opts: distinct([outIc(code(tfSet, tfQ)), ...differs(pyOut(code(tfSet, tfQ)), '3 1 (1, 4, 4, 4, 9)', '3 4 [1, 4, 4, 4, 9]', '2 1 [1, 4, 4, 4, 9]').map(ic)]),
  sol: 'count(4) counts the fours, index(9) gives the position of the first 9, and sorted() always returns a list, even when it is given a tuple.',
}));
const ntSet = 'kit = ("pen", [2, 3], (4, 5))';
const ntProg = code(ntSet, 'kit[1].append(9)', 'print(kit)');
Q('m_nested_tuple_mut', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `A kit is stored as a tuple that holds a string, a list and another tuple. What does this program print?\n\n${F(ntProg)}`,
  opts: distinct([outIc(ntProg), `It stops with ${ic(pe(ntSet, 'kit[1] = [9]'))}`, ...differs(pyOut(ntProg), "('pen', [2, 3], (4, 5))", "('pen', [2, 3], (4, 5), 9)").map(ic)]),
  sol: 'The tuple itself is not changed: it still holds the same three objects. But one of those objects is a list, and a list can be changed in place, so appending to kit[1] is allowed. Only assigning a new object to kit[1] would be an error.',
}));
Q('m_tuple_vs_list', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Dhanush stores the number of days in each month of a non-leap year, and the program must never change these values by mistake. Which choice is the best and why?',
  opts: ['A tuple, because its items cannot be changed after it is created', 'A list, because its items can be changed whenever needed', 'A tuple, because it can grow with append()', 'A list, because lists are the only type that supports indexing'],
  sol: 'Fixed data that must stay the same suits a tuple, since assignment to an item raises an error. Tuples have no append(), and both lists and tuples support indexing.',
}));
const stProg = code('t = (5, 2, 8)', 'r = sorted(t)', 'print(type(r) == list, type(r) == tuple)');
Q('m_sorted_type', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Kunal passes a tuple to sorted(), as in the program below, and then checks the type of the result. What does it print?\n\n${F(stProg)}`,
  opts: distinct([outIc(stProg), ...differs(pyOut(stProg), 'False True', 'True True', 'False False').map(ic)]),
  sol: 'sorted() accepts any sequence and always builds a new list from it, so the original tuple is untouched and the result is a list.',
}));

// ---- assertion-reason
Q('ar_alias', ar({
  t: 1, d: 3, c: 'understanding', key: 'd',
  a: 'After the statement `b = a`, changing `b[0]` can never change `a`.',
  r: 'A list name stores a reference to the list, so two names can refer to the same list.',
  sol: 'A is false: b and a refer to one list, so an item changed through b is seen through a as well. R is true; it is the very reason why A fails.',
}));
Q('ar_sorted', ar({
  t: 1, d: 3, c: 'understanding', key: 'b',
  a: 'The function `sorted(L)` leaves the list L unchanged.',
  r: 'The method `L.sort()` arranges the items of L in place.',
  sol: 'Both statements are true, but R does not explain A: sorted() leaves L alone because it builds and returns a new list, not because of what sort() does.',
}));
Q('ar_tuple_imm', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'The statement `t[0] = 5` raises a TypeError when `t` is a tuple.',
  r: 'A tuple is immutable: its items cannot be assigned new values.',
  sol: 'Both are true and R explains A: assignment to an item is not allowed for an immutable sequence, so Python reports a TypeError.',
}));
Q('ar_one_tuple', ar({
  t: 2, d: 3, c: 'understanding', key: 'c',
  a: 'The statement `t = (5,)` creates a tuple with one item.',
  r: 'The brackets are what make a sequence a tuple, so the comma is optional.',
  sol: 'A is true. R is false: the comma makes the tuple, and the brackets are optional in most places, so (5) is only the number 5 and 5, is a tuple.',
}));
Q('ar_slice_copy', ar({
  t: 1, d: 3, c: 'understanding', key: 'a',
  a: 'If `s = L[1:4]`, then changing `s[0]` does not change the list `L`.',
  r: 'A slice copies the chosen items into a new list.',
  sol: 'Both are true and R explains A: s is a different list from L, so changing one of them does not affect the other.',
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_remove_all', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? If the number 7 occurs three times in a list, one call of `remove(7)` deletes all three.',
  sol: 'remove() deletes only the first matching item; the other two sevens stay.',
}));
Q('tf_pop_default', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: 'True or false? When `pop()` is called with no argument on a non-empty list, it removes and returns the last item.',
  sol: 'The default index of pop() is -1, which is the last item.',
}));
Q('tf_tuple_append', tf({
  t: 2, d: 2, c: 'recall', ans: false,
  stem: 'True or false? A tuple has an `append()` method, which adds a new item at its end.',
  sol: 'Tuples cannot change, so they have no append(); calling it gives an AttributeError.',
}));
Q('tf_neg_first', tf({
  t: 1, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? For any non-empty list `L`, the expression `L[-len(L)]` gives the first item.',
  sol: 'The index -len(L) counts back to the very start, so it is the same as index 0.',
}));
Q('fb_len_nested', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'For the list `[[4, 5], [6], [7, 8, 9]]`, the value of `len()` is ___.',
  acc: [['3', 'three']],
  sol: `len() counts the items of the outer list, and each inner list is one item, so the value is ${val('len([[4, 5], [6], [7, 8, 9]])')}.`,
}));
Q('fb_pack_unpack', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Writing `t = 4, 5, 6` is called tuple ___, and writing `a, b, c = t` is called tuple ___.',
  acc: [['packing'], ['unpacking']],
  sol: 'Packing collects several values into one tuple; unpacking spreads the items of a tuple over several variables.',
}));
Q('fb_insert', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The list method ___ adds a new item at a chosen position, while append() adds it only at the end.',
  acc: [['insert']],
  sol: 'insert(index, item) places the item before the given index and shifts the rest to the right.',
}));
Q('fb_slice_end', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'The slice `L[2:7]` of a long list gives the items at positions 2 up to position ___.',
  acc: [['6', 'six']],
  sol: 'The stop index of a slice is excluded, so the last item taken is at position 6.',
}));
Q('mt_list_methods', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each list method used in a billing program with what it does.',
  pairs: [
    ['append(x)', 'Adds x as one item at the end'],
    ['extend(s)', 'Adds each item of s at the end'],
    ['insert(i, x)', 'Adds x before position i'],
    ['pop(i)', 'Removes and returns the item at position i'],
  ],
  sol: 'append adds one item at the end, extend adds the items of another sequence one by one, insert places an item at a position, and pop removes an item and gives it back.',
}));
const tm = [['(1, 2) + (3,)', ''], ['(4, 5) * 2', ''], ['(6, 7, 8)[1:]', ''], ['len((9, 9, 9))', '']].map(([e]) => [e, val(e)]);
Q('mt_tuple_exprs', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each tuple expression, written for a school-trip planner, with its value.',
  pairs: tm.map(([e, v]) => [ic(e), ic(v)]),
  sol: 'Concatenation joins the two tuples, repetition repeats the items, the slice [1:] drops the first item, and len() counts the items.',
}));
Q('ord_max_list', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of the usual program that finds the largest number in a non-empty list, such as the highest daily sale in Gauri\'s shop.',
  items: ['Take the first item as the largest so far', 'Visit each item of the list in turn', 'If the item is bigger than the largest so far, make it the new largest', 'After the loop ends, display the largest'],
  sol: 'The first item starts the search, the loop compares each item, a bigger item replaces the largest, and the result is displayed once all items have been visited.',
}));
Q('ord_search', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of a linear search for a key in a list of roll numbers, from the first step to the last.',
  items: ['Read the key to be searched', 'Start at the first item of the list', 'Compare the current item with the key', 'If they are equal, report the position and stop; otherwise move to the next item', 'If the end is reached with no match, report that the key is not present'],
  sol: 'The key is read, the search starts at the first item, each item is compared in turn, a match ends the search, and only after the last item is the key declared absent.',
}));

// ================================================================ code-output items
const cSlice = code('days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]', 'print(days[2:5])', 'print(days[-2:])', 'print(days[::3])', 'print(days[5:1:-2])');
Q('co_slice_steps', co({
  pre: 'A timetable keeps the days of the week in a list. Write the exact output of the four slices below.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cSlice,
  sol: 'Each slice excludes its stop index: [2:5] takes indexes 2 to 4; [-2:] takes the last two; [::3] takes indexes 0, 3 and 6; and [5:1:-2] walks back from index 5 through 3 to 1 (which is excluded) so it stops after index 3.',
}));
export const cBuild = code('sq = []', 'for k in range(2, 12, 3):', '    sq.append(k * k)', 'print(sq)', 'print(len(sq), sum(sq))');
Q('co_append_loop', co({
  pre: 'Mahesh builds a list of squares with a loop and prints it. Write the output of the program.',
  t: 1, d: 2, c: 'application', marks: 2,
  code: cBuild,
  sol: 'range(2, 12, 3) gives 2, 5, 8 and 11, whose squares are appended in turn; then the list, its length and its sum are printed.',
}));
export const cChain = code('line = ["Anu", "Bala", "Chitra"]', 'line.append("Dev")', 'print(line)', 'line.insert(0, "Esha")', 'print(line)', 'who = line.pop(2)', 'print(who, line)', 'line.reverse()', 'print(line)', 'line.remove("Esha")', 'print(line)');
Q('co_methods_chain', co({
  pre: 'The queue at the school library desk changes as the program below runs. Write exactly what it prints.',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cChain,
  sol: 'After each statement the list is shown: append adds Dev at the end; insert puts Esha at the front; pop(2) removes and returns the item now at index 2; reverse turns the list around in place; remove deletes Esha by value.',
}));
export const cAlias = code('a = [3, 6, 9]', 'b = a', 'c = a[:]', 'b[0] = 100', 'c[1] = 200', 'a.append(12)', 'print(a)', 'print(b)', 'print(c)', 'print(a is b, a is c)');
Q('co_alias', co({
  pre: 'Three names are linked to lists in the program below. Write exactly what it prints.',
  t: 1, d: 4, c: 'analysis', marks: 2,
  code: cAlias,
  sol: 'The name b refers to the same list as a, so the changes made through b and the append show in both; c is a slice, a separate copy made before those changes, so only its own edit appears there. The operator is tells whether two names refer to the very same list.',
}));
export const cNested = code('grid = [[1, 2, 3], [4, 5, 6]]', 'for row in grid:', '    for item in row:', '        print(item * 10, end=" ")', '    print("|", sum(row))');
Q('co_nested_traverse', co({
  pre: 'Sonal prints a small grid of scores row by row. What exactly does this nested-list program print?',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cNested,
  sol: 'The outer loop takes one inner list at a time; the inner loop prints each of its items multiplied by 10 on the same line; then the bar and the row sum end the line.',
}));
export const cSliceAssign = code('shelf = [1, 2, 3, 4, 5, 6]', 'shelf[1:3] = [20, 30, 40]', 'print(shelf)', 'shelf[4:] = []', 'print(shelf)', 'shelf[0] = [0]', 'print(shelf, len(shelf))');
Q('co_slice_assign', co({
  pre: 'A shelf of book numbers is edited by item and slice assignment. Write the exact output of the program.',
  t: 1, d: 4, c: 'analysis', marks: 2,
  code: cSliceAssign,
  sol: 'A slice can be replaced by a list of a different length, so the list grows or shrinks; assigning an empty list deletes the slice; and assigning a list to a single index stores that whole list as one item.',
}));
export const cFreq = code('grades = ["B", "A", "C", "A", "B", "A"]', 'for g in ["A", "B", "C", "D"]:', '    print(g, grades.count(g))', 'print(grades.index("C"), grades.index("A"))');
Q('co_count_index', co({
  pre: 'A teacher counts the grades of a unit test with the program below. What is its exact output?',
  t: 1, d: 2, c: 'understanding', marks: 1, time: 75,
  code: cFreq,
  sol: 'count() gives how many times each grade occurs (0 for D); index() gives the position of the first occurrence of a value.',
}));
export const cSwap = code('a, b = 3, 8', 'print(a, b)', 'a, b = b, a', 'print(a, b)', 't = a, b', 'print(t)', 'x, y = t', 'print(x + y, x * y)');
Q('co_tuple_swap', co({
  pre: 'Two numbers are exchanged and then packed into a tuple in the program below. Write exactly what it prints.',
  t: 2, d: 2, c: 'understanding', marks: 1, time: 75,
  code: cSwap,
  sol: 'The assignment a, b = b, a swaps the values with no helper variable; t = a, b packs them into a tuple, and x, y = t unpacks the tuple again.',
}));
export const cPairs = code('bill = (("tea", 3, 15), ("bun", 2, 12), ("jam", 1, 40))', 'total = 0', 'for item, qty, price in bill:', '    cost = qty * price', '    total = total + cost', '    print(item, cost)', 'print("Total", total)');
Q('co_tuple_unpack_loop', co({
  pre: 'A canteen bill is stored as a tuple of tuples, and the loop unpacks each inner tuple into three names. Write the exact output.',
  t: 2, d: 3, c: 'application', marks: 2,
  code: cPairs,
  sol: 'In every pass, the three items of the current inner tuple are unpacked into item, qty and price; the cost of the line is printed and added to the running total.',
}));
export const cSortRev = code('prices = [45, 12, 78, 30]', 'ordered = sorted(prices)', 'prices.sort(reverse=True)', 'print(prices)', 'print(ordered)', 'print(min(prices), max(ordered), sum(prices))');
Q('co_sort_reverse', co({
  pre: 'A shopkeeper sorts a list of prices in two different ways. What does the program below print?',
  t: 1, d: 3, c: 'application', marks: 2,
  code: cSortRev,
  sol: 'sorted() returns a new list in increasing order and leaves prices alone; sort(reverse=True) then rearranges prices itself in decreasing order. min, max and sum do not depend on the order.',
}));
export const cTupleOps = code('t = (10, 20, 30, 40, 50)', 'w = t[1:4] + (60,)', 'print(w)', 'print(w * 2)', 'print(30 in t, 60 in t, 60 not in t)', 'print(len(w * 2), w.count(30), w.index(60))');
Q('co_tuple_ops', co({
  pre: 'A tuple of timings is sliced, joined and repeated in the program below. Write exactly what it prints.',
  t: 2, d: 3, c: 'application', marks: 2,
  code: cTupleOps,
  sol: 'The slice t[1:4] has three items and (60,) adds one more to make w; repetition doubles it; the membership tests look in t; the last line gives the length of the doubled tuple and the count and first position of values in w.',
}));
export const cAvg = code('count = int(input())', 'nums = []', 'for i in range(count):', '    nums.append(int(input()))', 'mean = sum(nums) / len(nums)', 'print(max(nums), min(nums), mean)');
export const avgIn = '4\n14\n9\n21\n12\n';
Q('co_input_mean', co({
  pre: 'The program below reads how many scores follow and then the scores themselves. It is run with the input 4, 14, 9, 21 and 12, one value per line. Write the exact output.',
  t: 1, d: 3, c: 'application', marks: 2, run: { stdin: avgIn },
  code: cAvg,
  sol: 'The first input, 4, tells the loop how many numbers to read; the four numbers are appended to the list, and the maximum, the minimum and the mean (sum divided by length) are printed.',
}));

// ================================================================ short answers (2 marks)
export const errIdx = code('cities = ["Pune", "Surat", "Indore"]', 'print(cities[3])');
const errIdxFix = code('cities = ["Pune", "Surat", "Indore"]', 'print(cities[len(cities) - 1])');
Q('s2_err_index', short({
  t: 1, d: 2, c: 'analysis', marks: 2,
  stem: `Faisal's program should print the last of his three cities but stops with an error. Name the error, say why it occurs and correct the program.\n\n${F(errIdx)}`,
  model: `Python reports ${ic(pyErr(errIdx))}.\n\nA list of 3 items has the indexes 0, 1 and 2 (or -3, -2 and -1), so index 3 does not exist.\n\n${F(errIdxFix)}\n\nOutput: ${ic(pyOut(errIdxFix))}`,
  sol: 'One mark for naming the error with its cause, one for the corrected program (index 2 or -1).',
  scheme: [['IndexError and its cause', 1], ['Corrected program', 1]],
}));
export const errTup = code('sizes = (38, 40, 42)', 'sizes[1] = 41', 'print(sizes)');
const errTupFix = code('sizes = (38, 40, 42)', 'sizes = sizes[:1] + (41,) + sizes[2:]', 'print(sizes)');
Q('s2_err_tuple', short({
  t: 2, d: 3, c: 'analysis', marks: 2,
  stem: `Rekha's shoe-size program is meant to change the middle size of a tuple, but it fails. Explain the error and show one correct way to get the changed sizes.\n\n${F(errTup)}`,
  model: `Python reports ${ic(pyErr(errTup))}.\n\nA tuple is immutable, so an item cannot be assigned. A new tuple can be built from slices instead:\n\n${F(errTupFix)}\n\nOutput: ${ic(pyOut(errTupFix))}`,
  sol: 'One mark for the TypeError with the reason (immutable), one for a correct way of building the changed tuple.',
  scheme: [['TypeError because a tuple is immutable', 1], ['New tuple built (or a list used) correctly', 1]],
}));
export const errRem = code('stock = ["soap", "oil", "salt"]', 'stock.remove("rice")', 'print(stock)');
const errRemFix = code('stock = ["soap", "oil", "salt"]', 'if "rice" in stock:', '    stock.remove("rice")', 'else:', '    print("rice is not in stock")', 'print(stock)');
Q('s2_err_remove', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: `Jaswant's shop program stops with an error when it removes an item that is not in the list. Find the cause and write a safe version.\n\n${F(errRem)}`,
  model: `Python reports ${ic(pyErr(errRem))}.\n\nremove() raises an error when the value is absent. Test membership first:\n\n${F(errRemFix)}\n\nOutput: ${O(pyOut(errRemFix))}`,
  sol: 'One mark for the ValueError and its cause, one for guarding the call with a membership test.',
  scheme: [['ValueError: value not in the list', 1], ['Guard with in before remove()', 1]],
}));
const acProg = code('a = [1, 2, 3]', 'b = a', 'c = list(a)', 'a.append(4)', 'print(b)', 'print(c)');
Q('s2_alias_copy', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: 'Explain, with a short program, how the statements `b = a` and `c = list(a)` differ when a is a list.',
  model: `${F(acProg)}\n\nOutput:\n\n${O(pyOut(acProg))}\n\nThe statement b = a gives the same list a second name, so b shows the item appended through a. The call list(a) makes a new list with the same items, so c does not change when a changes later.`,
  sol: 'One mark for the aliasing explained with its output, one for the copy explained with its output.',
  scheme: [['b = a: same list, shows the change', 1], ['list(a): independent copy', 1]],
}));
const svProg = code('marks = [52, 38, 71]', 'r1 = sorted(marks)', 'r2 = marks.sort()', 'print(r1, r2, marks)');
Q('s2_sort_vs_sorted', short({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'State two differences between the list method `sort()` and the built-in function `sorted()`, and show them in one program.',
  model: `${F(svProg)}\n\nOutput: ${ic(pyOut(svProg))}\n\n1. sorted() returns a new sorted list and leaves the original unchanged, while sort() rearranges the list in place.\n2. sorted() works on any sequence (a tuple too), while sort() is a list method and returns None.`,
  sol: 'One mark for each difference.',
  scheme: [['New list versus in place', 1], ['Return value / type accepted', 1]],
}));
const aexProg = code('x = [1, 2]', 'x.append([3, 4])', 'y = [1, 2]', 'y.extend([3, 4])', 'print(x, len(x))', 'print(y, len(y))');
Q('s2_append_extend', short({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'With the help of a program that starts from two equal lists, show how `append()` and `extend()` treat a list argument differently.',
  model: `${F(aexProg)}\n\nOutput:\n\n${O(pyOut(aexProg))}\n\nappend() adds the whole list as one nested item, so the length grows by 1. extend() adds each item of the argument separately, so the length grows by the number of items.`,
  sol: 'One mark for each method explained with its output.',
  scheme: [['append: one nested item', 1], ['extend: items added one by one', 1]],
}));
const dSet = 'days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]';
const dSl = ['days[1:4]', 'days[:2]', 'days[-3:]', 'days[::2]'];
Q('s2_slice_results', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: `For ${ic(dSet)}, write the value of each of the following slices: (a) ${ic(dSl[0])} (b) ${ic(dSl[1])} (c) ${ic(dSl[2])} (d) ${ic(dSl[3])}.`,
  model: dSl.map((e, i) => `(${'abcd'[i]}) ${ic(pv(dSet, e))}`).join('\n\n'),
  sol: 'Half a mark for each correct slice.',
  scheme: [['(a) and (b)', 1], ['(c) and (d)', 1]],
}));
const tvlErr = pyErr('t = (1, 2)\nt[0] = 9');
Q('s2_tuple_vs_list', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Give two differences between a list and a tuple in Python, and one situation in which a tuple is the better choice.',
  model: `1. A list is mutable, so its items can be changed, added or removed; a tuple is immutable, and assigning to an item gives ${ic(tvlErr)}.\n2. A list is written in square brackets, a tuple in round brackets (or just with commas); a list has methods such as append() and sort(), a tuple only count() and index().\n\nA tuple is better for fixed data, such as the number of days in each month or the coordinates of a point, which should not be changed by mistake.`,
  sol: 'One mark for two correct differences, one for the situation.',
  scheme: [['Two differences', 1], ['Situation for a tuple', 1]],
}));
Q('s2_one_tuple', short({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'Why is `(7)` not a tuple, and how is a tuple with the single item 7 written? Support your answer by the type that Python reports for each.',
  model: `Round brackets around one value only group it, so ${ic('(7)')} is just an integer: its type is ${ic(val('type((7)).__name__'))}. The comma makes the tuple, so a one-item tuple is written ${ic('(7,)')} (or ${ic('7,')}): its type is ${ic(val('type((7,)).__name__'))}.`,
  sol: 'One mark for the reason and the type of (7), one for the form (7,) and its type.',
  scheme: [['(7) is an int', 1], ['(7,) is a tuple', 1]],
}));
const ppProg = code('point = 12, 35', 'print(point, type(point) == tuple)', 'x, y = point', 'print(x, y)');
Q('s2_pack_unpack', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Explain tuple packing and unpacking with a program that stores the coordinates of a point and then separates them into two variables.',
  model: `${F(ppProg)}\n\nOutput:\n\n${O(pyOut(ppProg))}\n\nThe first statement packs the values 12 and 35 into one tuple. The statement x, y = point unpacks the tuple: its items go to the variables in order, so the number of variables must equal the number of items.`,
  sol: 'One mark for packing with its output and one for unpacking and the condition on the number of variables.',
  scheme: [['Packing explained', 1], ['Unpacking explained', 1]],
}));

// ================================================================ short answers (3 marks)
const tmStmts = ['q.append("Tej")', 'q.insert(1, "Uma")', 'q.remove("Sam")', 'first = q.pop(0)', 'q.extend(["Vir", "Wen"])', 'q.reverse()'];
const tmRows = traceList('q', tmStmts, 'q = ["Ria", "Sam"]');
const tmProg = code('q = ["Ria", "Sam"]', ...tmStmts, 'print(first, q)');
Q('s3_trace_methods', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Dry run the program below and write the list q after each statement, then give the output.\n\n${F(tmProg)}`,
  model: `Starting list: ${ic(pv('q = ["Ria", "Sam"]', 'q'))}\n\n${mdTable(['Statement', 'q afterwards'], tmRows.map(([s, l]) => [ic(s), ic(l)]))}\n\nOutput: ${ic(pyOut(tmProg))}`,
  sol: 'One mark for the first three statements, one for the rest of the table and one for the printed output.',
  scheme: [['First three rows', 1], ['Remaining rows', 1], ['Printed output', 1]],
}));
const bugSrc = (init) => code('temps = [-3, -7, -1, -4]', `warmest = ${init}`, 'for t in temps:', '    if t > warmest:', '        warmest = t', 'print(warmest)');
Q('s3_bug_max', short({
  t: 1, d: 4, c: 'analysis', marks: 3,
  stem: `A hill-station program should print the warmest of four winter night readings, but the answer it gives is not one of the readings.\n\n${F(bugSrc('0'))}\n\nState what it prints, explain the fault and correct the program.`,
  model: `It prints ${ic(pyOut(bugSrc('0')))}, which is not in the list.\n\nThe starting value 0 is larger than every reading, so no comparison ever succeeds. The starting value must be a real item of the list, for example the first one.\n\n${F(bugSrc('temps[0]'))}\n\nOutput: ${ic(pyOut(bugSrc('temps[0]')))}`,
  sol: 'One mark for the wrong output, one for the explanation, one for the correction and its output.',
  scheme: [['Wrong output stated', 1], ['Explanation of the starting value', 1], ['Corrected program', 1]],
}));
const billSet = 'bill = [["tea", 3, 15], ["bun", 2, 12], ["cake", 1, 40]]';
const billTot = code(billSet, 'total = 0', 'for line in bill:', '    total = total + line[1] * line[2]', 'print(total)');
Q('s3_nested_access', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `A canteen bill is a nested list: ${ic(billSet)}, where each inner list holds the item, the quantity and the price. Write an expression for (a) the name of the second item, (b) the quantity of the last item, and (c) a loop that prints the total amount of the bill. Give the values.`,
  model: `(a) ${ic('bill[1][0]')} gives ${ic(pv(billSet, 'bill[1][0]'))}.\n\n(b) ${ic('bill[-1][1]')} gives ${ic(pv(billSet, 'bill[-1][1]'))}.\n\n(c)\n\n${F(billTot)}\n\nOutput: ${ic(pyOut(billTot))}`,
  sol: 'One mark for each part, with the value.',
  scheme: [['(a) expression and value', 1], ['(b) expression and value', 1], ['(c) loop and total', 1]],
}));
const srcProg = code('names = ["Kabir", "Mina", "Omar", "Mina", "Tara"]', 'key = input()', 'pos = -1', 'for i in range(len(names)):', '    if names[i] == key:', '        pos = i', '        break', 'if pos == -1:', '    print(key, "not found")', 'else:', '    print(key, "found at index", pos)');
Q('s3_search_prog', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Write a program that has the list `["Kabir", "Mina", "Omar", "Mina", "Tara"]`, reads a name and uses a linear search to print the index of its first occurrence, or a message when the name is not in the list. Show the output for the inputs Mina and Zara.',
  model: `${F(srcProg)}\n\nInput Mina: ${ic(pyOut(srcProg, { stdin: 'Mina\n' }))}\n\nInput Zara: ${ic(pyOut(srcProg, { stdin: 'Zara\n' }))}\n\nThe loop compares each item with the key and break stops at the first match; the value -1 of pos tells that nothing matched.`,
  sol: 'One mark for the loop with the comparison, one for stopping at the first match and the not-found case, one for both outputs.',
  scheme: [['Loop with comparison', 1], ['break and not-found handling', 1], ['Both outputs', 1]],
}));
const fibRows = swapRows(0, 1, 6);
const fibProg = code('a, b = 0, 1', 'for i in range(6):', '    a, b = b, a + b', 'print(a, b)');
Q('s3_swap_trace', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `Dry run the program below, which uses one tuple assignment inside a loop, with a trace table of a and b after each pass, and give its output.\n\n${F(fibProg)}`,
  model: `${mdTable(['Pass', 'a', 'b'], fibRows.map((r) => (r[0] === 0 ? ['start', r[1], r[2]] : r)))}\n\nOutput: ${ic(pyOut(fibProg))}\n\nThe right side b, a + b is evaluated with the old values of a and b before either variable is changed.`,
  sol: 'One mark for the first rows, one for the rest and one for the output with the reason the old values are used.',
  scheme: [['Start and first passes', 1], ['Remaining passes', 1], ['Output', 1]],
}));
const tlSet = 'order = ("Kiran", [2, 5])';
const tlStmts = ['order[1][0] = 9', 'order[1].append(1)', 'order[1] = [1]'];
const tlRes = tlStmts.map((s) => { try { return ic(pv(code(tlSet, s), 'order')); } catch { return ic(pe(tlSet, s)); } });
Q('s3_tuple_list_inside', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `A tuple holds a name and a list: ${ic(tlSet)}. For each statement below, run on its own after that line, say whether it works and what order shows afterwards, or the error: (a) ${ic(tlStmts[0])} (b) ${ic(tlStmts[1])} (c) ${ic(tlStmts[2])}. Explain the pattern of results.`,
  model: `(a) works: ${tlRes[0]}\n\n(b) works: ${tlRes[1]}\n\n(c) fails: ${tlRes[2]}\n\nThe tuple cannot be given another object at position 1, so (c) fails. But the object at position 1 is a list, which is mutable, so it can be changed in place through the tuple, as in (a) and (b).`,
  sol: 'One mark for each statement with its result; the explanation is credited in the part (c).',
  scheme: [['(a) result', 1], ['(b) result', 1], ['(c) error and explanation', 1]],
}));

// ================================================================ long answers (5 marks)
const statProg = code('count = int(input())', 'nums = []', 'for i in range(count):', '    nums.append(int(input()))', 'biggest = nums[0]', 'smallest = nums[0]', 'for n in nums:', '    if n > biggest:', '        biggest = n', '    if n < smallest:', '        smallest = n', 'mean = sum(nums) / len(nums)', 'print("Max:", biggest, "Min:", smallest, "Mean:", round(mean, 2))');
const statIn = '5\n42\n17\n58\n33\n20\n';
Q('l_stats_input', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'The sports teacher of Mount View School records the heights of players in centimetres. Write a program that reads how many heights follow, reads them into a list, finds the largest and smallest height with a loop (not with max() and min()), computes the mean, and prints all three. Show the output when the input is 5, 42, 17, 58, 33 and 20, one per line.',
  model: `${F(statProg)}\n\nOutput: ${ic(pyOut(statProg, { stdin: statIn }))}\n\nThe list is built with append(); the loop starts from the first item and replaces biggest or smallest when a better item appears; the mean is the sum divided by the length.`,
  sol: 'Marks: reading the count and the items into a list, the loop for the maximum, the loop for the minimum, the mean, and the output.',
  scheme: [['Items read into a list', 1], ['Maximum by a loop', 1], ['Minimum by a loop', 1], ['Mean', 1], ['Output for the input', 1]],
}));
const allProg = code('shops = ["Kiran", "Lata", "Kiran", "Meena", "Lata", "Kiran"]', 'name = input()', 'found = False', 'for i in range(len(shops)):', '    if shops[i] == name:', '        print(name, "at index", i)', '        found = True', 'if not found:', '    print(name, "is not on the list")');
Q('l_search_all', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'A delivery list is stored as `["Kiran", "Lata", "Kiran", "Meena", "Lata", "Kiran"]`. Write a program that reads a name and, by a linear search through the whole list, prints every index at which the name occurs, or a message when it does not occur at all. Show the output for the inputs Kiran, Meena and Pooja.',
  model: `${F(allProg)}\n\nInput Kiran:\n\n${O(pyOut(allProg, { stdin: 'Kiran\n' }))}\n\nInput Meena: ${ic(pyOut(allProg, { stdin: 'Meena\n' }))}\n\nInput Pooja: ${ic(pyOut(allProg, { stdin: 'Pooja\n' }))}\n\nThe loop does not stop at the first match, because every occurrence is wanted; the flag found remembers whether any match was seen.`,
  sol: 'Marks: input and the list, the loop over all the indexes, the comparison with a printed index, the flag and the not-found message, and the three outputs.',
  scheme: [['Input and list', 1], ['Loop over all indexes', 1], ['Comparison and printing the index', 1], ['Flag and not-found message', 1], ['Three outputs', 1]],
}));
const frqProg = code('votes = [3, 1, 2, 3, 3, 1, 4, 2, 3]', 'done = []', 'best = votes[0]', 'for v in votes:', '    if v not in done:', '        done.append(v)', '        c = votes.count(v)', '        print("Candidate", v, "got", c)', '        if c > votes.count(best):', '            best = v', 'print("Winner:", best)');
Q('l_frequency', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: 'In a class election the votes are stored in the list `[3, 1, 2, 3, 3, 1, 4, 2, 3]`, each vote being a candidate number. Write a program that prints every distinct candidate number once with the number of votes it received, and finally prints the candidate with the most votes. Do not use a dictionary. Show the output.',
  model: `${F(frqProg)}\n\nOutput:\n\n${O(pyOut(frqProg))}\n\nThe list done remembers the candidates already reported, so each one is printed once; count() gives the frequency, and best is replaced whenever a candidate has more votes.`,
  sol: 'Marks: the list of reported values, the membership test, the count of each value, the winner logic, and the output.',
  scheme: [['List of values already counted', 1], ['Membership test', 1], ['Frequency by count()', 1], ['Most votes found', 1], ['Output', 1]],
}));
const matProg = code('sales = [[12, 15, 9, 20], [8, 11, 14, 6], [17, 5, 10, 13]]', 'col = [0, 0, 0, 0]', 'grand = 0', 'for r in range(3):', '    rowtotal = 0', '    for c in range(4):', '        rowtotal = rowtotal + sales[r][c]', '        col[c] = col[c] + sales[r][c]', '    print("Shop", r + 1, "total", rowtotal)', '    grand = grand + rowtotal', 'print("Day totals", col)', 'print("Grand total", grand)');
Q('l_matrix', long({
  t: 1, d: 4, c: 'application', marks: 5,
  stem: 'The sales (in packets) of three shops over four days are stored as a nested list `[[12, 15, 9, 20], [8, 11, 14, 6], [17, 5, 10, 13]]`, one inner list per shop. Write a program with nested loops that prints the total of each shop, the total of each day and the grand total, and show its output.',
  model: `${F(matProg)}\n\nOutput:\n\n${O(pyOut(matProg))}\n\nThe outer loop picks a shop and the inner loop visits its four days; the same pass adds each item to the shop total and to the list col at the day's index.`,
  sol: 'Marks: the nested loops over rows and columns, the row total, the day totals, the grand total, and the output.',
  scheme: [['Nested loops with indexes', 1], ['Row totals', 1], ['Day (column) totals', 1], ['Grand total', 1], ['Output', 1]],
}));
const rainProg = code('rain = (12, 0, 25, 18, 0, 9, 18)', 'key = int(input())', 'biggest = rain[0]', 'smallest = rain[0]', 'for r in rain:', '    if r > biggest:', '        biggest = r', '    if r < smallest:', '        smallest = r', 'print("Max", biggest, "Min", smallest, "Mean", round(sum(rain) / len(rain), 2))', 'if key in rain:', '    print(key, "first at index", rain.index(key), "occurs", rain.count(key), "times")', 'else:', '    print(key, "was never recorded")');
Q('l_tuple_stats', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: 'The rainfall (in mm) of seven days is stored in the tuple `(12, 0, 25, 18, 0, 9, 18)`. Write a program that finds the maximum, the minimum and the mean with a loop and sum(), then reads a value and reports whether it is in the tuple, its first index and how many times it occurs. Show the output for the inputs 18 and 30.',
  model: `${F(rainProg)}\n\nInput 18:\n\n${O(pyOut(rainProg, { stdin: '18\n' }))}\n\nInput 30:\n\n${O(pyOut(rainProg, { stdin: '30\n' }))}\n\nA tuple can be read with a loop, indexed, searched with in, and used with sum(), index() and count(); it cannot be changed.`,
  sol: 'Marks: the tuple and the loop for max and min, the mean, the membership test, index and count, and both outputs.',
  scheme: [['Maximum and minimum by a loop', 1], ['Mean', 1], ['Membership test', 1], ['index() and count()', 1], ['Both outputs', 1]],
}));
const menuProg = code('names = []', 'while True:', '    print("1 add, 2 remove, 3 show sorted, 4 exit")', '    ch = int(input())', '    if ch == 1:', '        names.append(input())', '    elif ch == 2:', '        who = input()', '        if who in names:', '            names.remove(who)', '        else:', '            print(who, "not present")', '    elif ch == 3:', '        print(sorted(names))', '    elif ch == 4:', '        break', 'print("Items:", len(names))');
const menuIn = '1\nRiya\n1\nAman\n1\nZoya\n2\nAman\n2\nKabir\n3\n4\n';
Q('l_list_menu', long({
  t: 1, d: 5, c: 'application', marks: 5,
  stem: 'Write a menu-driven program for the attendance list of a club. Choice 1 reads a name and appends it, choice 2 reads a name and removes it if it is present (otherwise it prints a message), choice 3 prints the names in sorted order without changing the list, and choice 4 ends the program and prints how many names remain. Show the output for the input 1 Riya, 1 Aman, 1 Zoya, 2 Aman, 2 Kabir, 3, 4 (every value on its own line).',
  model: `${F(menuProg)}\n\nOutput:\n\n${O(pyOut(menuProg, { stdin: menuIn }))}\n\nThe loop repeats until choice 4 executes break; sorted() leaves names in its original order, and the membership test protects remove() from an error.`,
  sol: 'Marks: a loop that ends on choice 4, append, a safe remove, sorted display, and the output.',
  scheme: [['Loop with break on 4', 1], ['append for choice 1', 1], ['Safe remove for choice 2', 1], ['sorted() for choice 3', 1], ['Output for the input', 1]],
}));

// ================================================================ case-based (4 marks)
const queueSrc = (copyLine) => code('queue = ["Asha", "Bilal", "Chetan"]', 'queue.append("Dev")', 'served = queue.pop(0)', 'queue.insert(1, "Esha")', copyLine, 'copy.remove("Chetan")', 'print(served, queue)');
Q('cb_queue', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read about the ticket counter of Lakeside Cinema and answer the questions. *(Imagined cinema and customers, written by SOYL for practice.)*',
  passage: `The ticket counter of the Lakeside Cinema keeps its waiting customers in a list. Veda writes a program in which one person joins, the first person is served, a late friend is squeezed in, and then a copy of the queue is made so that a customer can be removed.\n\n${F(queueSrc('copy = queue'))}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'c', stem: 'What does the program print?', opts: distinct([ic('Asha [\'Bilal\', \'Esha\', \'Chetan\', \'Dev\']'), ic('Bilal [\'Esha\', \'Chetan\', \'Dev\']'), outIc(queueSrc('copy = queue')), ic('Asha [\'Bilal\', \'Esha\', \'Dev\', \'Chetan\']')]), sol: 'append puts Dev last; pop(0) serves Asha; insert(1, "Esha") puts Esha at index 1. Because copy = queue gives only a second name, removing Chetan through copy changes queue as well.' })),
    child('b', tf({ t: 1, d: 3, c: 'understanding', ans: true, stem: 'True or false? In the program, the names `queue` and `copy` refer to the same list.', sol: 'The statement copy = queue creates no new list; it binds a second name to the existing one.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Trace the list queue after each of the first four statements.', model: mdTable(['Statement', 'queue afterwards'], traceList('queue', ['queue.append("Dev")', 'queue.pop(0)', 'queue.insert(1, "Esha")'], 'queue = ["Asha", "Bilal", "Chetan"]').map(([s, l]) => [ic(s), ic(l)])), sol: 'One mark for the append and the pop rows and one for the insert row.', scheme: [['append and pop rows', 1], ['insert row', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Veda wants queue to stay unchanged when Chetan is removed from the copy. Which statement should replace `copy = queue`, and what does the program print then?', model: `Use a real copy, for example ${ic('copy = list(queue)')} (or ${ic('copy = queue[:]')}).\n\nThe program then prints ${ic(pyOut(queueSrc('copy = list(queue)')))}, because only the copy loses Chetan.`, sol: 'One mark for a statement that makes a real copy and one for the output.', scheme: [['Copy statement', 1], ['Output', 1]] }),
    ]),
  ],
}));
const scSet = 'students = [["Anil", 72, 65, 80], ["Beena", 91, 88, 79], ["Charu", 55, 70, 62]]';
const scProg = code(scSet, 'for s in students:', '    avg = (s[1] + s[2] + s[3]) / 3', '    print(s[0], round(avg, 1))');
Q('cb_scores', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the marks sheet of Class XI-B and answer the questions. *(Imagined students and marks, written by SOYL for practice.)*',
  passage: `Mr Ghosh stores the marks of three tests of each student in a nested list: every inner list holds the name followed by three marks. He prints the average of every student with this program.\n\n${F(scProg)}`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', fixed: true, key: 'b', stem: 'What is the last line printed by the program?', opts: distinct([ic('Charu 62'), ic(pyOut(scProg).split('\n').pop()), ic('Charu 187'), ic('Charu 62.0')]), sol: 'For Charu the three marks 55, 70 and 62 add up to 187, and 187 divided by 3 is rounded to one decimal place.' })),
    child('b', fb({ t: 1, d: 2, c: 'understanding', stem: 'In the program, `s[0]` is the name and `s[3]` is the ___ test mark.', acc: [['third', '3rd']], sol: 'The marks are at indexes 1, 2 and 3, so index 3 holds the third test mark.' })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write the statements that print the name of the student whose first-test mark is the highest.', model: `${F(code('best = students[0]', 'for s in students:', '    if s[1] > best[1]:', '        best = s', 'print(best[0])'))}\n\nOutput: ${ic(pyOut(code(scSet, 'best = students[0]', 'for s in students:', '    if s[1] > best[1]:', '        best = s', 'print(best[0])')))}`, sol: 'One mark for the loop with the comparison of s[1] and one for the printed name.', scheme: [['Loop and comparison of first-test marks', 1], ['Name printed with its output', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Mr Ghosh appends the record `["Dilip", 48, 59, 66]` and then prints the number of students and the second test mark of the new student. Write the statements and give the output.', model: `${F(code('students.append(["Dilip", 48, 59, 66])', 'print(len(students), students[-1][2])'))}\n\nOutput: ${ic(pyOut(code(scSet, 'students.append(["Dilip", 48, 59, 66])', 'print(len(students), students[-1][2])')))}`, sol: 'One mark for append() with the whole record and one for the expression and output.', scheme: [['append of the inner list', 1], ['len and students[-1][2] with output', 1]] }),
    ]),
  ],
}));
const rnSet = 'rain = (12, 0, 25, 18, 0, 9, 18, 30)';
const rnProg = code(rnSet, 'print(max(rain), min(rain), sum(rain) / len(rain), rain.count(0), rain.index(18))');
Q('cb_rainfall', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the rain gauge of Greenwood School and answer the questions. *(Imagined school and readings, written by SOYL for practice.)*',
  passage: `The eco club of Greenwood School records the rainfall (in mm) of eight days in a tuple, because a record must not be altered afterwards. Its program summarises the readings.\n\n${F(rnProg)}`,
  parts: [
    child('a', mcq({ t: 2, d: 3, c: 'application', fixed: true, key: 'd', stem: 'What does the program print?', opts: distinct([ic('30 0 14.0 2 2'), ic('25 0 14.0 2 3'), ic('30 0 14.0 1 3'), outIc(rnProg)]), sol: 'The largest reading is 30, the smallest 0, and the mean is the sum divided by 8; the value 0 occurs twice and the first 18 is at index 3.' })),
    child('b', tf({ t: 2, d: 2, c: 'understanding', ans: false, stem: 'True or false? The club can correct the third reading with the statement `rain[2] = 22`.', sol: 'The record is a tuple and its items cannot be assigned; the statement raises a TypeError.' })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write the output of `print(rain[2:6], rain[::-3], 25 in rain)` for the tuple above.', model: `${ic(pv(rnSet, 'rain[2:6]'))}, ${ic(pv(rnSet, 'rain[::-3]'))} and ${ic(pv(rnSet, '25 in rain'))}, printed as ${ic(pv(rnSet, 'str(rain[2:6]) + " " + str(rain[::-3]) + " " + str(25 in rain)'))}.`, sol: 'One mark for each of the two slices and one for the membership value, taken together as two marks.', scheme: [['Both slices', 1], ['Membership result', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): A correction is allowed after all: the third reading becomes 22. Show how the club can obtain a new record with this change without editing the tuple in place, and print the new mean.', model: `${F(code('fixed = rain[:2] + (22,) + rain[3:]', 'print(fixed)', 'print(sum(fixed) / len(fixed))'))}\n\nOutput:\n\n${O(pyOut(code(rnSet, 'fixed = rain[:2] + (22,) + rain[3:]', 'print(fixed)', 'print(sum(fixed) / len(fixed))')))}`, sol: 'One mark for building the new tuple from slices and one for the printed record and mean.', scheme: [['New tuple by slicing and joining', 1], ['Printed output', 1]] }),
    ]),
  ],
}));
const recSet = 'orders = (("pens", 4, 10), ("books", 2, 45), ("tape", 5, 6))';
const recProg = code(recSet, 'total = 0', 'big = []', 'for name, qty, rate in orders:', '    if qty * rate >= 40:', '        big.append(name)', '    total = total + qty * rate', 'print(big, total)');
Q('cb_records', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read about the order book of a stationery stall and answer the questions. *(Imagined stall and prices, written by SOYL for practice.)*',
  passage: `A stationery stall stores each order line as a tuple of the item, the quantity and the rate, and the whole order as a tuple of these tuples. Sanjay's program collects the names of the lines worth 40 rupees or more and prints them with the total.\n\n${F(recProg)}`,
  parts: [
    child('a', mcq({ t: 2, d: 3, c: 'application', fixed: true, key: 'a', stem: 'What does the program print?', opts: distinct([outIc(recProg), ic("['books'] 160"), ic("['pens', 'books', 'tape'] 160"), ic("['pens', 'books'] 130")]), sol: 'Each inner tuple is unpacked into name, qty and rate. The lines worth 40 or more are pens (4 times 10) and books (2 times 45), whose names are appended to the list big; the total of all three lines is printed with it.' })),
    child('b', fb({ t: 2, d: 1, c: 'recall', stem: 'The loop header `for name, qty, rate in orders:` uses tuple ___ in every pass.', acc: [['unpacking']], sol: 'The header performs tuple unpacking: each inner tuple is split over the three variables in order.' })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Write the value of each of `orders[1][0]`, `orders[-1][2]` and `len(orders)`.', model: `${ic(pv(recSet, 'orders[1][0]'))}, ${ic(pv(recSet, 'orders[-1][2]'))} and ${ic(pv(recSet, 'len(orders)'))}.`, sol: 'One mark for the first two values and one for len(orders).', scheme: [['orders[1][0] and orders[-1][2]', 1], ['len(orders)', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Sanjay tries `orders[0][1] = 6` to change the quantity of the pens. Predict the result and write a way to get a new order tuple with 6 pens.', model: `Python reports ${ic(pe(recSet, 'orders[0][1] = 6'))}, since the inner tuple is immutable.\n\nA new inner tuple has to replace the old one:\n\n${F(code('orders = (("pens", 6, 10),) + orders[1:]', 'print(orders)'))}\n\nOutput: ${ic(pyOut(code(recSet, 'orders = (("pens", 6, 10),) + orders[1:]', 'print(orders)')))}`, sol: 'One mark for the error and its reason, one for building the new tuple.', scheme: [['TypeError with reason', 1], ['New tuple built', 1]] }),
    ]),
  ],
}));
