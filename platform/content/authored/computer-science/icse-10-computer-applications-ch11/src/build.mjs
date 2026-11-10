// Build ICSE 10 Computer Applications ch11 "Single-dimensional Arrays: Searching and Sorting". Run from platform/:
//   npx tsx content/authored/computer-science/icse-10-computer-applications-ch11/src/build.mjs
// Every program output, value and error shown in decks, notes, flashcards and questions is produced by running Java.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg, useJavaCache } from '../../icse-10-computer-applications-ch01/src/lib.mjs';

const SRC = path.dirname(fileURLToPath(import.meta.url));
setUnit('icse-10-computer-applications-ch11', 'computer-science');
useJavaCache(SRC);
const DIR = path.resolve(SRC, '..');

try {
await import('./q_a.mjs');
const B = await import('./q_b.mjs');
const C = await import('./q_c.mjs');
const A = await import('./q_a.mjs');
await import('./q_d.mjs');
const { code, F, ic, ev, out, mustCompile, mustFail, expect, rte, first } = await import('./q_util.mjs');
const lines = (s) => s.split('\n');
const one = (s) => s.split('\n').join(' / ');

// ---------------------------------------------------------------- facts the narration states in words; stop if Java disagrees
expect(one(out(A.cDecl)), '0 / 0.0 / false / 0 / null', 'default values');
const cRead = code('Scanner sc = new Scanner(System.in);', 'int[] m = new int[4];', 'for (int i = 0; i < m.length; i++)', '    m[i] = sc.nextInt();', 'System.out.println(m[0] + " " + m[3]);');
expect(out(cRead, '72 65 88 54\n'), '72 54', 'array read from input');
expect(one(out(A.cStats)), 'Sum = 270 / Max = 61 / Min = 29 / Average = 45.0', 'stats');
expect(out(A.cBoost(true)), '45 80', 'bonus method');
expect(one(out(A.cReverse)), '31 / 22 / 15 / 9 / 4', 'reverse');
expect(out(B.linSrc([14, 27, 9, 33, 21, 8], 33)), 'Found at index 3', 'linear key 33');
expect(out(B.linSrc([14, 27, 9, 33, 21, 8], 50)), 'Not found', 'linear key 50');
const LA = [14, 27, 9, 33, 21, 8];
expect([14, 9, 8, 50].map((k) => out(B.linCount(LA, k))).join(','), '1,3,6,6', 'linear comparisons');
const t41 = B.binTrace(B.BIN_ARR, 41);
const t30 = B.binTrace(B.BIN_ARR, 30);
expect(t41.rows.length, 3, 'steps for 41');
expect(t41.result, 'Found at index 5', 'result for 41');
expect(t30.rows.length, 4, 'steps for 30');
expect(t30.result, 'Not found', 'result for 30');
const halve = (n) => code(`int n = ${n}, steps = 0;`, 'while (n > 0) {', '    n = n / 2;', '    steps++;', '}', 'System.out.println(steps);');
const HN = [16, 100, 1000, 100000];
expect(HN.map((n) => out(halve(n))).join(','), '5,7,10,17', 'halvings');
const unsortedArr = [40, 10, 30, 20, 50];
const descArr = [78, 63, 56, 41, 34];
const dupArr = [10, 20, 20, 20, 30];
expect(out(B.binSrc(unsortedArr, 10)), 'Not found', 'binary on unsorted');
expect(out(B.binSrc(descArr, 41)), 'Not found', 'binary on descending');
expect(out(B.binSrc(dupArr, 20)), 'Found at index 2', 'binary with duplicates');
const selRows = C.passRows(C.select(C.SEL_DEMO));
const bubRows = C.passRows(C.bubble(C.SEL_DEMO));
expect(selRows.map((r) => r[1]).join(' | '), '8 14 37 29 22 | 8 14 37 29 22 | 8 14 22 29 37 | 8 14 22 29 37', 'selection passes');
expect(bubRows.map((r) => r[1]).join(' | '), '14 29 8 22 37 | 14 8 22 29 37 | 8 14 22 29 37 | 8 14 22 29 37', 'bubble passes');
const REV = [50, 40, 30, 20, 10];
expect(t30.rows.map((r) => r[3]).join(','), '4,1,2,3', 'mids for 30');
expect(out(A.cBoost(false)), '40 75', 'bonus method not called');
expect([out(C.selCount(C.SEL_DEMO)), out(C.bubCount(C.SEL_DEMO)), out(C.selCount(REV)), out(C.bubCount(REV))].join(','), '2,6,2,10', 'swap counts');
mustCompile(code('int[] a; a = new int[5];', 'int[] b = {72, 65, 88};', 'int c[] = new int[5];', 'System.out.println(a.length + b.length + c.length);'), 'declaration forms');

// ---------------------------------------------------------------- SVG helpers
const boxRow = (s, x, y, vals, { w = 58, h = 40, mark = [], dim = [] } = {}) => vals.forEach((v, i) => {
  const m = mark.includes(i), d = dim.includes(i);
  s.rect(x + i * w, y, w, h, { rx: 4, fill: m ? 'fill' : undefined, color: d ? 'muted' : 'accent', sw: m ? 2.6 : 1.6, dash: d });
  s.text(x + i * w + w / 2, y + h / 2, String(v), { size: 15, bold: m, muted: d });
});
const tag = (s, x, y, label, w = 70) => { s.rect(x - w / 2, y - 17, w, 34, { rx: 6, fill: 'fill', color: 'accent', sw: 1.6 }); s.text(x, y, label, { size: 14, bold: true }); };

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['What an array is', 'Declare and fill', 'Index and length', 'Process with loops', 'References', 'Linear search'], 'Route map of Part 1: what an array is, declaring and filling it, index and length, processing with loops, arrays as references and linear search', 'Part 1 at a glance');
const vArray = (() => {
  const vals = [72, 65, 88, 54, 91];
  const s = new Svg(520, 150);
  s.text(260, 16, 'int[] marks = {72, 65, 88, 54, 91};', { size: 14, bold: true });
  tag(s, 48, 66, 'marks', 74);
  boxRow(s, 110, 46, vals, { w: 64, h: 40 });
  vals.forEach((_, i) => s.text(110 + i * 64 + 32, 104, String(i), { size: 14, muted: true }));
  s.text(48, 104, 'index', { size: 13, muted: true });
  s.text(110 + 160, 134, 'length: 5 elements, indexes 0 to 4', { size: 13 });
  return s.visual('Diagram of an array named marks with five boxes holding 72, 65, 88, 54 and 91; the indexes 0 to 4 are written below the boxes and a note says the length is 5 elements with indexes 0 to 4', 'An array: one name, elements of one type, indexes from 0.');
})();
const vForms = table(
  ['Statement', 'What it does'],
  [
    [ic('int[] a = new int[5];'), 'declares and creates the array; every element starts at 0'],
    [ic('int a[] = new int[5];'), 'the same, with the brackets after the name'],
    [ic('int[] a = {72, 65, 88};'), 'creates and fills the array in one statement; the length is 3'],
    [ic('int[] a;  a = new int[5];'), 'declaration and creation in two statements'],
  ],
  'Table of four ways to write an array: new with a size, brackets after the name, a list of values in curly brackets, and declaration and creation in separate statements',
  'The size is given with new; a list of values fixes the length itself.',
);
const defLines = lines(out(A.cDecl));
const vDefaults = table(
  ['Array type', 'Default element', 'Printed by the program'],
  [['int', '0', defLines[0]], ['double', '0.0', defLines[1]], ['boolean', 'false', defLines[2]], ['char', 'the null character, code 0', `${defLines[3]} (shown as an int)`], ['String', 'null (no object)', defLines[4]]],
  `Table of default element values: int ${defLines[0]}, double ${defLines[1]}, boolean ${defLines[2]}, char code ${defLines[3]} and String ${defLines[4]}`,
  'new fills every element with the default of its type.',
);
const vRead = table(
  ['i', 'Number read', 'Stored in'],
  ['72', '65', '88', '54'].map((v, i) => [String(i), v, ic(`m[${i}]`)]),
  `Table of a loop filling an array from the keyboard: the four numbers 72, 65, 88 and 54 go into m[0] to m[3], so m[0] and m[3] show ${out(cRead, '72 65 88 54\n')}`,
  'The loop runs while i < m.length.',
);
const aa = 'int[] a = {10, 20, 30, 40, 50};';
const eIdx5 = rte(code(aa, 'System.out.println(a[5]);'));
const eIdxN = rte(code(aa, 'System.out.println(a[-1]);'));
const eLen = mustFail(code(aa, 'System.out.println(a.length());'));
const vIndex = table(
  ['Expression (a has 5 elements)', 'Result'],
  [
    [ic('a[0]'), `${ev('a[0]', aa)} (first element)`],
    [ic('a[a.length - 1]'), `${ev('a[a.length - 1]', aa)} (last element)`],
    [ic('a.length'), `${ev('a.length', aa)} (a property)`],
    [ic('a[5]'), `run-time error: ${eIdx5.err}`],
    [ic('a[-1]'), `run-time error: ${eIdxN.err}`],
    [ic('a.length()'), `compile-time error: ${eLen}`],
  ],
  `Table of array accesses: a[0] gives ${ev('a[0]', aa)}, the last element gives ${ev('a[a.length - 1]', aa)}, length gives ${ev('a.length', aa)}, a[5] fails with ${eIdx5.err}, a[-1] fails with ${eIdxN.err} and a.length() is a compile-time error ${eLen}`,
);
const trS = out(A.cStatsTrace).split('\n').map((l) => l.split(' '));
const vStats = table(
  ['i', 'visitors[i]', 'sum', 'max', 'min'],
  trS,
  `Trace table of the statistics loop over the six visitor counts; after the last element the sum is ${trS[5][2]}, the maximum ${trS[5][3]} and the minimum ${trS[5][4]}`,
  'max and min start at visitors[0], not at 0.',
);
const vRefSvg = (() => {
  const s = new Svg(560, 200);
  tag(s, 80, 56, 'p', 70);
  tag(s, 80, 150, 'q', 70);
  boxRow(s, 250, 82, [3, 40, 9], { w: 70, h: 44 });
  s.arrow(115, 56, 248, 96, { sw: 1.8, color: 'accent' });
  s.arrow(115, 150, 248, 114, { sw: 1.8, color: 'accent' });
  s.text(355, 150, 'one array, two names', { size: 14, bold: true });
  s.text(355, 176, 'after q[1] = 40; p[1] shows 40 as well', { size: 13, muted: true });
  return s.visual('Diagram of int[] q = p: two reference boxes named p and q both have arrows pointing to the same array with the elements 3, 40 and 9, so a change made through q is seen through p', 'p and q refer to one array: the elements are not copied.');
})();
const vBoost = table(
  ['Version of the program', 'marks[0] and marks[2] displayed'],
  [['the call addBonus(marks) is left out', out(A.cBoost(false))], ['the call addBonus(marks) is made', out(A.cBoost(true))]],
  `Table of the bonus program: without the call it displays ${out(A.cBoost(false))} and with the call it displays ${out(A.cBoost(true))}, because the method changes the real array`,
  'The method receives a reference, not a copy.',
);
const revT = out(A.cReverseTrace).split('\n').map((l) => { const [i, ...r] = l.split(' '); return [i, r.join(' ')]; });
const vReverse = table(
  ['Swap', 'Array after the swap'],
  [['start', '4 9 15 22 31'], ...revT.map(([i, r]) => [`i = ${i}: a[${i}] with a[${4 - Number(i)}]`, r])],
  `Trace table of reversing {4, 9, 15, 22, 31}: after the swaps the array is ${revT[1][1]}; the middle element 15 is not moved`,
  'The loop runs n / 2 times.',
);
const vLinFlow = flow('LR', ['Start at index 0', 'Compare a[i] with the key', 'Equal: note the position and stop', 'Not equal: i increases by 1', 'Past the end: not found'], 'Flow of linear search: start at index 0, compare a[i] with the key, if equal note the position and stop, otherwise increase i, and if the end is passed the key is not found', 'Linear search checks the elements in turn.');
const linRuns = [33, 8, 50];
const vLinRuns = table(
  ['key', 'Comparisons made', 'Output'],
  linRuns.map((k) => [String(k), out(B.linCount(LA, k)), ic(out(B.linSrc(LA, k)))]),
  `Table of linear search in {14, 27, 9, 33, 21, 8}: key 33 gives ${out(B.linSrc(LA, 33))} after ${out(B.linCount(LA, 33))} comparisons; key 8 needs ${out(B.linCount(LA, 8))} comparisons; key 50 is not found after ${out(B.linCount(LA, 50))} comparisons`,
  'The array is {14, 27, 9, 33, 21, 8}; pos starts at -1.',
);
const vLinTrace = table(
  ['i', 'a[i]', 'a[i] == 33 ?', 'Action'],
  LA.slice(0, 4).map((v, i) => [String(i), String(v), ev(`${v} == 33`), ev(`${v} == 33`) === 'true' ? 'pos = 3; break' : 'continue']),
  'Trace table of the search for 33: elements 14, 27 and 9 give false, element 33 at index 3 gives true, so pos becomes 3 and the loop stops after four comparisons',
  'The last two elements are never examined.',
);
const linPos = [14, 9, 8, 50];
const vLinCases = table(
  ['Where the key is', 'Key', 'Comparisons (6 elements)'],
  [['first element', '14'], ['third element', '9'], ['last element', '8'], ['not in the array', '50']].map(([w, k]) => [w, k, out(B.linCount(LA, Number(k)))]),
  `Table of the work of linear search on six elements: ${linPos.map((k) => `key ${k} needs ${out(B.linCount(LA, k))}`).join(', ')} comparisons`,
  'Best case: 1 comparison. Worst case: n comparisons.',
);
const vSum1 = table(
  ['Topic', 'Remember'],
  [
    ['declare and create', 'int[] a = new int[n]; elements start at the default value'],
    ['index and length', 'indexes 0 to length - 1; length is a property, written without brackets'],
    ['bad index', 'ArrayIndexOutOfBoundsException at run time'],
    ['processing', 'for loop to length; start max and min with a[0]'],
    ['reference', 'b = a gives one array with two names; a method can change an array it receives'],
    ['linear search', 'compare in turn from the start; pos starts at -1; break when found'],
  ],
  'Summary table of Part 1: declaring an array, index and length, the exception for a bad index, processing with a loop, arrays as references and linear search',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Binary search', 'Comparing the searches', 'Selection sort', 'Descending order', 'Bubble sort', 'Choosing and combining'], 'Route map of Part 2: binary search, comparing the searches, selection sort, descending order, bubble sort, choosing and combining', 'Part 2 at a glance');
const vBinHalf = (() => {
  const A9 = B.BIN_ARR;
  const w = 46;
  const s = new Svg(740, 30 + t41.rows.length * 62 + 20);
  A9.forEach((_, i) => s.text(16 + i * w + w / 2, 12, String(i), { size: 12, muted: true }));
  t41.rows.forEach(([n, lo, hi, mid], k) => {
    const y = 26 + k * 62;
    const dim = A9.map((_, i) => i).filter((i) => i < Number(lo) || i > Number(hi));
    boxRow(s, 16, y, A9, { w, h: 38, mark: [Number(mid)], dim });
    s.text(16 + 9 * w + 16, y + 19, `step ${n}: low ${lo}, high ${hi}, mid ${mid}`, { size: 13, anchor: 'start' });
  });
  return s.visual(`Diagram of binary search for 41 in the sorted array ${A9.join(', ')}: step 1 searches indexes ${t41.rows[0][1]} to ${t41.rows[0][2]} with mid ${t41.rows[0][3]}, step 2 searches ${t41.rows[1][1]} to ${t41.rows[1][2]} with mid ${t41.rows[1][3]}, step 3 searches ${t41.rows[2][1]} to ${t41.rows[2][2]} with mid ${t41.rows[2][3]} and finds 41; boxes outside the range are dashed`, 'Binary search: the middle box (bold) is compared and one half is dropped (dashed).');
})();
const vBinVars = table(
  ['Variable', 'Meaning'],
  [
    [ic('low'), 'index of the first element of the part still searched'],
    [ic('high'), 'index of the last element of that part'],
    [ic('mid'), 'index of the middle element, (low + high) / 2 by integer division'],
    [ic('pos'), 'position found; -1 while the key has not been found'],
  ],
  'Table of the variables of binary search: low, high, mid and pos with their meanings',
  'The loop runs while low <= high.',
);
const trTable = (t) => table(
  ['Step', 'low', 'high', 'mid', 'a[mid]', 'Decision'],
  t.rows,
  `Trace table of binary search with ${t.rows.length} steps; the result is ${t.result}`,
);
const vBin41 = table(['Step', 'low', 'high', 'mid', 'a[mid]', 'Decision'], t41.rows, `Trace table of binary search for the key 41 in the sorted array: ${t41.rows.length} steps and the result ${t41.result}`, `Result: ${t41.result}`);
const vBin30 = table(['Step', 'low', 'high', 'mid', 'a[mid]', 'Decision'], t30.rows, `Trace table of binary search for the key 30, which is not in the array: ${t30.rows.length} steps; low passes high and the result is ${t30.result}`, `Result: ${t30.result}. The loop ended because low > high.`);
const vCompare = table(
  ['Elements n', 'Linear search, worst case', 'Binary search, at most'],
  HN.map((n) => [String(n), String(n), out(halve(n))]),
  `Table of the largest number of comparisons: ${HN.map((n) => `${n} elements need ${n} for linear search and ${out(halve(n))} for binary search`).join('; ')}`,
  'Binary search counts how often n can be halved.',
);
const vPit = table(
  ['Situation', 'Output of the binary search code'],
  [
    [`unsorted array {${unsortedArr.join(', ')}}, key 10 (present)`, out(B.binSrc(unsortedArr, 10))],
    [`descending array {${descArr.join(', ')}}, key 41 (present)`, out(B.binSrc(descArr, 41))],
    [`sorted array with repeated values {${dupArr.join(', ')}}, key 20`, out(B.binSrc(dupArr, 20))],
  ],
  `Table of pitfalls of binary search: an unsorted array gives ${out(B.binSrc(unsortedArr, 10))} for a present key, a descending array with ascending logic gives ${out(B.binSrc(descArr, 41))}, and repeated values give ${out(B.binSrc(dupArr, 20))}, one of the three equal values`,
  'Binary search needs the order its code assumes.',
);
const vSelSvg = (() => {
  const arr = C.SEL_DEMO;
  const mi = arr.indexOf(Math.min(...arr));
  const after = selRows[0][1].split(' ').map(Number);
  const x0 = 110, w = 64;
  const s = new Svg(520, 190);
  s.text(52, 66, 'before', { size: 14, muted: true });
  s.text(52, 146, 'pass 1', { size: 14, muted: true });
  boxRow(s, x0, 46, arr, { w, h: 40, mark: [0, mi] });
  boxRow(s, x0, 126, after, { w, h: 40, mark: [0, mi] });
  s.line(x0 + mi * w + w / 2, 46, x0 + mi * w + w / 2, 24, { sw: 1.6 });
  s.line(x0 + mi * w + w / 2, 24, x0 + w / 2, 24, { sw: 1.6 });
  s.arrow(x0 + w / 2, 24, x0 + w / 2, 44, { sw: 1.6 });
  s.text(x0 + (mi * w) / 2 + w / 2, 12, `smallest is ${arr[mi]} at index ${mi}: swap with index 0`, { size: 13, bold: true });
  s.arrow(x0 + 2.5 * w, 90, x0 + 2.5 * w, 122, { sw: 1.4 });
  return s.visual(`Diagram of pass 1 of selection sort on ${arr.join(', ')}: the smallest element ${arr[mi]} at index ${mi} is swapped with the element at index 0, giving ${after.join(', ')}`, 'Selection sort, pass 1: find the smallest, swap it to the front.');
})();
const vSelVars = table(
  ['Variable', 'Meaning'],
  [
    [ic('i'), 'pass number: the position that receives the smallest element'],
    [ic('min'), 'index of the smallest element found so far in the unsorted part'],
    [ic('j'), 'index of the element being compared, from i + 1 to n - 1'],
    [ic('t'), 'temporary variable used for the swap'],
  ],
  'Table of the variables of selection sort: i for the pass, min for the index of the smallest element, j for the comparison index and t for the swap',
  'There are n - 1 passes and one swap in each.',
);
const diffTxt = (prev, cur) => { const d = cur.map((v, k) => (v === prev[k] ? -1 : k)).filter((k) => k >= 0); return d.length ? `a[${d[0]}] and a[${d[1]}] swapped` : 'already in place: no change'; };
const selArr = (r) => r[1].split(' ').map(Number);
const vSelPasses = table(
  ['Pass', 'Array after the pass', 'What happened'],
  selRows.map((r, k) => [r[0], r[1], diffTxt(k ? selArr(selRows[k - 1]) : C.SEL_DEMO, selArr(r))]),
  `Trace table of selection sort on {${C.SEL_DEMO.join(', ')}}: ${selRows.map((r) => `pass ${r[0]} gives ${r[1]}`).join('; ')}`,
  'Passes 2 and 4 find the smallest element already in place.',
);
const dd = [15, 40, 22, 8];
const vSelDesc = table(
  ['', 'Ascending', 'Descending'],
  [
    ['index variable', ic('min'), ic('max')],
    ['test in the inner loop', ic('a[j] < a[min]'), ic('a[j] > a[max]')],
    [`pass 1 on {${dd.join(', ')}}`, first(out(C.select(dd))), first(out(C.select(dd, { desc: true })))],
    ['after the last pass', out(C.select(dd)).split('\n').pop(), out(C.select(dd, { desc: true })).split('\n').pop()],
  ],
  `Table comparing ascending and descending selection sort: the index variable min or max, the test a[j] < a[min] or a[j] > a[max], and the passes on {${dd.join(', ')}}`,
  'Only the comparison changes; the swap is the same.',
);
const bubTr = out(code(
  'int[] a = {29, 14, 37, 8, 22};',
  'int n = a.length;',
  'for (int j = 0; j < n - 1; j++) {',
  '    System.out.println(j + " " + a[j] + " " + a[j + 1] + " " + (a[j] > a[j + 1] ? "swap" : "no swap"));',
  '    if (a[j] > a[j + 1]) {',
  '        int t = a[j];',
  '        a[j] = a[j + 1];',
  '        a[j + 1] = t;',
  '    }',
  '}',
)).split('\n').map((l) => { const p = l.split(' '); return [p[0], `${p[1]} and ${p[2]}`, p.slice(3).join(' ')]; });
const vBubIdea = table(
  ['j', 'Pair compared (a[j] and a[j + 1])', 'Action'],
  bubTr,
  `Trace table of pass 1 of bubble sort on {${C.SEL_DEMO.join(', ')}}: ${bubTr.map((r) => `${r[1]} ${r[2]}`).join('; ')}; the pass ends with ${bubRows[0][1]}`,
  `After pass 1 the largest element is at the end: ${bubRows[0][1]}.`,
);
const vBubVars = table(
  ['Part of the code', 'Meaning'],
  [
    [ic('i'), 'pass number, from 0 to n - 2'],
    [ic('j < n - 1 - i'), 'the last i elements are already in place; a[j + 1] must stay inside the array'],
    [ic('a[j] > a[j + 1]'), 'a neighbouring pair that is out of order for ascending order'],
    [ic('t'), 'temporary variable used to swap the pair'],
  ],
  'Table of the parts of bubble sort: the pass number i, the inner limit n - 1 - i, the comparison of neighbours and the temporary variable',
  'Compare neighbours, swap if out of order.',
);
const vBubPasses = table(
  ['Pass', 'Array after the pass', 'Elements now final'],
  bubRows.map((r) => [r[0], r[1], `the last ${r[0]}`]),
  `Trace table of bubble sort on {${C.SEL_DEMO.join(', ')}}: ${bubRows.map((r) => `pass ${r[0]} gives ${r[1]}`).join('; ')}`,
  'After pass k the largest k elements are at the end.',
);
const vSortCmp = table(
  ['', 'Selection sort', 'Bubble sort'],
  [
    ['passes for n elements', 'n - 1', 'n - 1 (fewer with an early-stop flag)'],
    ['comparisons for 5 elements', ev('5 * 4 / 2'), `${ev('5 * 4 / 2')} (without a flag)`],
    [`swaps for {${C.SEL_DEMO.join(', ')}}`, out(C.selCount(C.SEL_DEMO)), out(C.bubCount(C.SEL_DEMO))],
    [`swaps for {${REV.join(', ')}}`, out(C.selCount(REV)), out(C.bubCount(REV))],
    ['idea', 'select the extreme element, swap once per pass', 'swap neighbours that are out of order'],
  ],
  `Table comparing selection sort and bubble sort: the swaps for {${C.SEL_DEMO.join(', ')}} are ${out(C.selCount(C.SEL_DEMO))} and ${out(C.bubCount(C.SEL_DEMO))}, and for {${REV.join(', ')}} they are ${out(C.selCount(REV))} and ${out(C.bubCount(REV))}`,
  'Both sorts need n - 1 passes; selection sort swaps less.',
);
const parOut = out(C.cParallel).split('\n').map((l) => l.split(' '));
const vPar = table(
  ['', 'roll[]', 'mark[]'],
  [['before sorting', '7  3  9  5', '62  85  47  71'], ['after sorting (marks descending)', parOut.map((r) => r[0]).join('  '), parOut.map((r) => r[1]).join('  ')]],
  `Table of sorting two parallel arrays: the marks 62, 85, 47 and 71 become ${parOut.map((r) => r[1]).join(', ')}, and the roll numbers move with them to ${parOut.map((r) => r[0]).join(', ')}`,
  'Swap both arrays at the same positions.',
);
const vSum2 = table(
  ['Topic', 'Remember'],
  [
    ['binary search', 'sorted array; mid = (low + high) / 2; low = mid + 1 or high = mid - 1'],
    ['comparisons', 'about log n for binary search against n for linear search'],
    ['selection sort', 'n - 1 passes; find the index of the smallest, one swap per pass'],
    ['descending order', 'selection: a[j] > a[max]; bubble: a[j] < a[j + 1]'],
    ['bubble sort', 'compare neighbours; inner limit n - 1 - i; largest goes to the end'],
    ['parallel arrays', 'swap both arrays together'],
  ],
  'Summary table of Part 2: binary search, comparisons, selection sort, descending order, bubble sort and parallel arrays',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Arrays: Declaring, Processing and Linear Search',
  goals: [
    'Declare, create, initialise and fill a single-dimensional array, and use its index and length',
    'Predict what happens when an index is outside the array, and the default values of elements',
    'Process an array with loops: sum, average, maximum, minimum and reversing',
    'Explain that an array is a reference and write a linear search with a found flag',
  ],
  slides: [
    sl('title', 'Arrays and linear search', {
      b: 'Part 1: **declaring** and **filling** an array, **index** and **length**, processing with loops, arrays as **references** and **linear search**.',
      v: vRoute1,
      n: 'Welcome to arrays and searching. In this part we learn what an array is, how to declare and fill it, and what happens when an index is wrong. We process arrays with loops, learn that an array name is a reference, and finish with linear search.',
    }),
    sl('concept', 'What is an array?', {
      b: 'An **array** stores many values of the **same data type** under one name. Each value is an **element** reached by its **index**, which starts at **0**. The property **length** gives the number of elements.',
      v: vArray,
      n: 'An array stores many values of the same type under one name. Each value is called an element, and each element has an index that starts at zero. The array in the picture has five elements, so the indexes run from zero to four. The length property tells us how many elements there are.',
    }),
    sl('concept', 'Declaring and creating an array', {
      b: 'The type is followed by **[ ]**. The operator **new** creates the array with its size. A list of values in braces creates and fills it at once.',
      v: vForms,
      n: 'The type is followed by square brackets. The operator new creates the array in memory, with the size written in brackets. A list of values in curly brackets creates and fills the array in one statement, and Java counts the values itself. The brackets may come after the type or after the name, but after the type is the usual style.',
    }),
    sl('concept', 'Default values of elements', {
      b: `${F(A.cDecl)}\n\n**new** gives every element the default value of its type. An int array is never full of garbage.`,
      v: vDefaults,
      n: 'The new operator sets every element to a default value. Numbers become zero, a boolean becomes false, a char becomes the null character whose code is zero, and a String, which is an object, becomes null. The program prints one element of each type, and the table shows the real output.',
    }),
    sl('check', 'Quick check: array vocabulary', {
      b: 'Match each term with its meaning.',
      chk: 'mt_arr_terms',
      n: 'Match each term about arrays with its meaning before moving on.',
    }),
    sl('concept', 'Filling an array from the keyboard', {
      b: `${F(cRead)}\n\nA loop visits the indexes **0** to **length - 1**; each pass stores the next number read by Scanner.`,
      v: vRead,
      n: 'A loop fills an array from the keyboard. The loop variable i starts at zero and continues while i is less than the length, and each pass stores the next number read by Scanner. With the input seventy two, sixty five, eighty eight and fifty four, element zero holds seventy two and element three holds fifty four.',
    }),
    sl('concept', 'Index and length', {
      b: 'Valid indexes are **0 to length - 1**. A wrong index compiles but stops the program with an **ArrayIndexOutOfBoundsException**. **length** is a property: no brackets.',
      v: vIndex,
      n: 'Valid indexes run from zero to length minus one. An index outside this range compiles, but stops the program with an ArrayIndexOutOfBoundsException, and the message names the index and the length. Length is a property, so it is written without brackets. With brackets, the compiler reports that it cannot find the symbol.',
    }),
    sl('example', 'Worked example 1: sum, highest, lowest, average', {
      b: `${F(A.cStats)}\n\nTrace the loop over six visitor counts.`,
      v: vStats,
      n: 'Let us process an array with one loop. The program finds the sum, the highest, the lowest and the average of six visitor counts. The maximum and the minimum start with the first element, never with zero. The sum is two hundred seventy, the highest is sixty one, the lowest is twenty nine, and the average is forty five point zero.',
    }),
    sl('check', 'Quick check: default values', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_default',
      n: 'Think about what the new operator does to the elements of an int array.',
    }),
    sl('concept', 'An array name is a reference', {
      b: `${F(A.cAlias)}\n\n**int[] b = a;** copies only the **reference**. To copy the elements, create a new array and copy them in a loop.`,
      v: vRefSvg,
      n: 'An array variable does not hold the elements. It holds a reference to them. The statement b equals a copies only the reference, so a and b are two names for one array, and a change made through b is visible through a. To make an independent copy, create a new array and copy the elements in a loop.',
    }),
    sl('concept', 'Passing an array to a method', {
      b: `${F(A.cBoost(true))}\n\nThe parameter is another name for the same array, so the method can change the original elements.`,
      v: vBoost,
      n: 'When an array is passed to a method, the parameter becomes another name for the same array. So the method can change the original elements. In the program, the bonus method adds five to each mark, and main sees the changed values, forty five and eighty. Without the call, the values stay forty and seventy five.',
    }),
    sl('check', 'Quick check: two names, one array', {
      b: 'Write the exact output.',
      chk: 'co_alias',
      n: 'Remember that both names refer to the same array, and that assigning an element never changes the length.',
    }),
    sl('example', 'Worked example 2: reversing an array', {
      b: `${F(A.cReverse)}\n\nSwap the first element with the last, the second with the second last, and so on.`,
      v: vReverse,
      n: 'To reverse an array, swap the first element with the last, the second with the second last, and so on, for half the length. The loop runs while i is less than n divided by two. With five elements it runs twice, and the middle element stays where it is. The table shows the array after each swap.',
    }),
    sl('concept', 'Searching: linear search', {
      b: '**Searching** means finding the position of a value, the **key**, in an array. **Linear search** compares the key with each element in turn from the first, and needs **no particular order**.',
      v: vLinFlow,
      n: 'Searching means finding where a value, called the key, is stored in an array. Linear search starts at the first element and compares each element with the key in turn. It stops when a match is found or when the array ends. It needs no particular order in the array.',
    }),
    sl('concept', 'Linear search with a found flag', {
      b: `${F(B.linSrc(LA, 33))}\n\n**pos** starts at **-1**; after the loop, -1 means the key was not found.`,
      v: vLinRuns,
      n: 'The position is kept in the variable pos, which starts at minus one. When an element equals the key, pos gets the index and break leaves the loop. After the loop, minus one means the key was not found. For the key thirty three the answer is index three, and for the key fifty the answer is not found.',
    }),
    sl('example', 'Worked example 3: tracing the search', {
      b: `Trace the search for the key **33** in the array {14, 27, 9, 33, 21, 8}.`,
      v: vLinTrace,
      n: 'Trace the search for thirty three. Element zero is fourteen, element one is twenty seven, and element two is nine, so all three comparisons fail. Element three is thirty three, so pos becomes three and the loop stops after four comparisons. The remaining two elements are never examined.',
    }),
    sl('concept', 'How much work does linear search do?', {
      b: 'The work depends on **where the key is**: one comparison at best, **n comparisons** at worst, when the key is last or absent.',
      v: vLinCases,
      n: 'The work depends on where the key is. If it is the first element, one comparison is enough. If it is the last element, or not in the array at all, every element is compared. For six elements that is one comparison at best and six at worst.',
    }),
    sl('check', 'Quick check: the missing break', {
      b: 'Choose the correct output.',
      chk: 'm_lin_nobreak',
      n: 'Think about what happens to the position variable when the loop does not stop at the first match.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part 1. An array is created with new, its elements start with default values, and its indexes run from zero to length minus one. A wrong index stops the program at run time. Loops process arrays, and a maximum should start with the first element. An array name is a reference. Linear search compares in turn, with the position starting at minus one.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Loop conditions: `i < a.length`, never `i <= a.length`.',
        '`length` for an array has no brackets; `length()` belongs to a String.',
        'Start a maximum or minimum with `a[0]`, not with `0`.',
        '`b = a` does not copy an array: both names refer to the same array.',
        'In a search program set the position to `-1` first, use `break` on a match, and test the flag after the loop.',
      ],
      n: 'Some exam tips. Write the loop condition with less than the length, never less than or equal. Length for an array has no brackets. Start a maximum or minimum with the first element. Remember that assigning one array name to another does not copy the elements. In a search program set the position to minus one first, use break on a match, and test the flag after the loop.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Binary Search, Selection Sort and Bubble Sort',
  goals: [
    'Write and trace binary search on a sorted array, showing low, high and mid at every step',
    'Compare linear and binary search by the number of comparisons',
    'Sort an array in ascending or descending order by selection sort and by bubble sort',
    'Show the array after each pass and choose the right sort for a task',
  ],
  slides: [
    sl('title', 'Binary search and sorting', {
      b: 'Part 2: **binary search**, comparing the two searches, **selection sort**, **bubble sort**, descending order and parallel arrays.',
      v: vRoute2,
      n: 'Welcome to the second part. We study binary search on a sorted array and compare it with linear search. Then we learn two sorting methods, selection sort and bubble sort. We show the array after each pass, sort in descending order, and see how two related arrays are sorted together.',
    }),
    sl('concept', 'Binary search: halve the range', {
      b: 'Binary search needs a **sorted** array. It compares the key with the **middle** element and throws away the half that cannot contain it.',
      v: vBinHalf,
      n: 'Binary search needs a sorted array. It compares the key with the middle element and throws away the half that cannot contain the key. In the picture, the key forty one is greater than the middle element, so the left half is dropped. The dashed boxes are no longer searched, and the key is found in the third step.',
    }),
    sl('concept', 'The binary search program', {
      b: `${F(B.binSrc(B.BIN_ARR, 41))}\n\n**low** and **high** mark the part still searched; **mid** is found by integer division.`,
      v: vBinVars,
      n: 'Low and high mark the part of the array that is still searched. Mid is the middle index, found by integer division. If the middle element equals the key, we note the position and stop. If the key is greater, low becomes mid plus one. If it is smaller, high becomes mid minus one. The loop continues while low is not greater than high.',
    }),
    sl('example', 'Worked example 1: the key is present', {
      b: 'Trace the search for the key **41** in the sorted array {5, 12, 19, 27, 34, 41, 56, 63, 78}. The table comes from a copy of the program that prints each step.',
      v: vBin41,
      n: 'Trace the search for forty one. In step one, low is zero, high is eight and mid is four, where the element is thirty four. Forty one is greater, so low becomes five. In step two, mid is six, the element is fifty six, and high becomes five. In step three, mid is five and the element is forty one. The key is found at index five.',
    }),
    sl('example', 'Worked example 2: the key is absent', {
      b: 'Trace the search for the key **30**, which is not in the array.',
      v: vBin30,
      n: 'Now trace the search for thirty, which is not in the array. Mid is four, then one, then two, then three, and each time low or high moves. After four steps low becomes four while high is three, so low is greater than high. The loop ends with pos still at minus one, and the program reports that the key was not found.',
    }),
    sl('check', 'Quick check: steps of binary search', {
      b: 'Arrange the steps in order.',
      chk: 'ord_bin_steps',
      n: 'Remember what must be set before the loop, and what ends it.',
    }),
    sl('concept', 'Linear search against binary search', {
      b: 'Each comparison of binary search halves the range, so the number of comparisons grows very slowly. Linear search may need **n**.',
      v: vCompare,
      n: 'Each comparison of binary search halves the range, so the number of comparisons grows very slowly. For sixteen elements, binary search needs at most five comparisons. For one thousand elements it needs at most ten, and for one lakh elements only seventeen. Linear search may need as many comparisons as there are elements.',
    }),
    sl('concept', 'When binary search fails', {
      b: 'Binary search gives **wrong answers** if the order is not what the code assumes. It finds **one** of several equal values, not necessarily the first.',
      v: vPit,
      n: 'Binary search gives wrong answers if the array is not in the order that the code assumes. On an unsorted array, a key that is present can be reported as not found. A descending array fails with the ascending code. With repeated values, binary search finds one of them, not necessarily the first.',
    }),
    sl('concept', 'Selection sort: select and swap', {
      b: '**Sorting** arranges elements in order. In **selection sort** each pass selects the **smallest** element of the unsorted part and swaps it into the next position.',
      v: vSelSvg,
      n: 'Sorting arranges the elements in order. In selection sort, each pass finds the smallest element of the unsorted part and swaps it into the next position. In the picture, the smallest element is eight, at index three. It is swapped with the element at index zero. After each pass one more element is in its final place.',
    }),
    sl('concept', 'The selection sort program', {
      b: `${F(C.select(C.SEL_DEMO))}\n\nThe outer loop makes **n - 1** passes; the swap is outside the inner loop.`,
      v: vSelVars,
      n: 'The outer loop makes n minus one passes, because the last element is then automatically in place. In each pass the inner loop finds the index of the smallest element, called min. The swap comes after the inner loop, so there is at most one swap per pass. The last four statements of the loop only print the array after the pass.',
    }),
    sl('example', 'Worked example 3: passes of selection sort', {
      b: `Trace the program on the array {${C.SEL_DEMO.join(', ')}}.`,
      v: vSelPasses,
      n: 'Here are the passes on twenty nine, fourteen, thirty seven, eight and twenty two. Pass one swaps the smallest element, eight, to the front. In pass two, fourteen is already in place, so nothing changes. Pass three swaps twenty two into position. In pass four, twenty nine is already in place. After four passes the array is sorted.',
    }),
    sl('check', 'Quick check: descending selection sort', {
      b: 'Choose the statement for the inner loop.',
      chk: 'm_sel_desc',
      n: 'Think about what the index variable must follow when the largest element is wanted.',
    }),
    sl('concept', 'Selection sort in descending order', {
      b: 'To sort in **descending** order, find the index of the **largest** element in each pass. Only the comparison changes.',
      v: vSelDesc,
      n: 'To sort in descending order, find the index of the largest element in each pass instead of the smallest. Only the comparison in the inner loop changes, from less than to greater than, and the swap stays the same. The table shows the first pass and the final result for the same four numbers in both orders.',
    }),
    sl('concept', 'Bubble sort: compare neighbours', {
      b: 'In **bubble sort** each pass compares **adjacent** elements and swaps a pair that is out of order. The largest element **bubbles** to the end.',
      v: vBubIdea,
      n: 'In bubble sort, each pass compares adjacent elements and swaps a pair that is out of order. The table shows pass one on the same five numbers. Twenty nine is swapped with fourteen. Twenty nine and thirty seven are already in order. Then thirty seven is swapped with eight and with twenty two. The largest element has bubbled to the end.',
    }),
    sl('concept', 'The bubble sort program', {
      b: `${F(C.bubble(C.SEL_DEMO))}\n\nThe inner limit **n - 1 - i** keeps **a[j + 1]** inside the array and skips the elements already in place.`,
      v: vBubVars,
      n: 'The outer loop counts the passes. The inner loop compares a pair of neighbours and swaps them if they are out of order. Its limit is n minus one minus i, because after i passes the last i elements are already in their final places, and because the program reads the element after j, which must stay inside the array.',
    }),
    sl('example', 'Worked example 4: passes of bubble sort', {
      b: `Trace the program on the array {${C.SEL_DEMO.join(', ')}}.`,
      v: vBubPasses,
      n: 'Here are the passes of bubble sort on the same array. After pass one the largest element, thirty seven, is at the end. After pass two, twenty nine has reached its place. After pass three the array is already sorted, but a program without a flag still makes pass four, which changes nothing. There are always n minus one passes.',
    }),
    sl('check', 'Quick check: bubble sort passes', {
      b: 'Write the exact output.',
      chk: 'co_bub_passes',
      n: 'Compare each neighbouring pair in turn, and remember that each pass compares one pair fewer.',
    }),
    sl('concept', 'Selection sort or bubble sort?', {
      b: 'Both need **n - 1** passes. **Selection sort** swaps once per pass; **bubble sort** may swap many times. Both are fine for the small arrays of ICSE programs.',
      v: vSortCmp,
      n: 'Both sorts need n minus one passes, and both make the same number of comparisons unless bubble sort uses a flag. They differ in the swaps. On the array twenty nine, fourteen, thirty seven, eight, twenty two, selection sort swaps two times and bubble sort six times. On a reversed array of five values, selection sort swaps twice and bubble sort ten times.',
    }),
    sl('concept', 'Sorting two related arrays', {
      b: 'When roll numbers and marks are stored in **parallel arrays**, a swap in one array must be made in the other at the **same positions**.',
      v: vPar,
      n: 'When roll numbers and marks are stored in two parallel arrays, element i of one belongs to element i of the other. If the marks are sorted, every swap must also be made in the roll number array, at the same positions. Otherwise the pairs would be broken. The table shows the marks in descending order with their roll numbers.',
    }),
    sl('check', 'Quick check: after the first pass', {
      b: 'Choose the correct option.',
      chk: 'ar_bubble',
      n: 'Think about what the first pass of bubble sort does to the largest element.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part 2. Binary search needs a sorted array and halves the range at each step, using low, high and mid. It makes far fewer comparisons than linear search. Selection sort makes n minus one passes, swapping the smallest element into place. Bubble sort compares neighbours. Descending order reverses the comparison. Parallel arrays are swapped together.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Binary search: write `low`, `high` and `mid` in a table for every step.',
        'Always check that the array is sorted before using binary search.',
        'Show the array after each pass exactly as the program prints it, including passes that change nothing.',
        'Bubble sort: the inner limit is `n - 1 - i`; selection sort: swap after the inner loop.',
        'For descending order change only the comparison (`>` in selection sort, `<` in bubble sort).',
      ],
      n: 'Some exam tips. In binary search, write low, high and mid in a table for every step, and make sure the array is sorted. Show the array after each pass exactly as the program prints it, including passes that change nothing. In bubble sort the inner limit is n minus one minus i, and in selection sort the swap comes after the inner loop. For descending order, change only the comparison.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Single-dimensional Arrays: Searching and Sorting: notes',
  sections: [
    {
      h: '1. Arrays: declaration, creation and elements',
      t: 1,
      b: `An **array** is a composite (reference) data type: a named collection of elements of the **same data type**, stored together and reached by an **index** that starts at **0**. The **length** property gives the number of elements; the last index is length - 1.\n\n${F(A.cDecl)}\n\nOutput (one value per line): ${ic(one(out(A.cDecl)))}.\n\n- ${ic('int[] a = new int[5];')} and ${ic('int a[] = new int[5];')} declare and create an array; ${ic('int[] a = {72, 65, 88};')} creates and fills it, and the length is 3.\n- Every element starts with the default value of its type: 0 for int, 0.0 for double, false for boolean, the null character for char, null for String.\n- A list of values and a size must not be given together: javac rejects ${ic('new int[3]{1, 2, 3}')}.`,
      terms: [
        ['Array', 'A named collection of elements of the same data type, each reached by an index starting at 0.'],
        ['Index (subscript)', 'The position number of an element in an array; the first element has index 0.'],
        ['length', 'A property of an array that gives the number of its elements; it is written without brackets.'],
      ],
      v: vArray,
      vs: [vForms, vDefaults, vRead],
    },
    {
      h: '2. Index errors, processing and references',
      t: 1,
      b: `An index outside **0 to length - 1** compiles but stops the program with an **ArrayIndexOutOfBoundsException**: for an array of 5 elements, a[5] gives ${ic(eIdx5.err)} and a[-1] gives ${ic(eIdxN.err)}. A loop must use ${ic('i < a.length')}, not <=. ${ic('a.length()')} is a compile-time error: "${eLen}".\n\n**Processing:** one loop gives the sum, maximum, minimum and average; start max and min with a[0].\n\n${F(A.cStats)}\n\nOutput: ${ic(one(out(A.cStats)))}.\n\n**References:** an array name holds a reference. ${ic('int[] b = a;')} makes two names for one array: for a = {1, 2, 3}, changing b[0] to 50 shows ${ic(out(A.cAlias))} for a[0] and b[0]. Copying the elements into a new array (a loop) gives ${ic(out(A.cCopy))}. An array passed to a method can be changed by the method.`,
      terms: [
        ['ArrayIndexOutOfBoundsException', 'The run-time exception thrown when an index is less than 0 or not less than the length of the array.'],
        ['Reference', 'A value that tells where an object or array is stored; assigning one array variable to another copies only the reference.'],
      ],
      v: vIndex,
      vs: [vStats, vRefSvg, vBoost, vReverse],
    },
    {
      h: '3. Linear search',
      t: 2,
      b: `**Linear (sequential) search** compares the key with each element in turn from the first, until a match is found or the array ends. It works on any array. The position variable starts at -1 and a **break** stops the search at the first match.\n\n${F(B.linSrc(LA, 33))}\n\nOutput for the key 33: ${ic(out(B.linSrc(LA, 33)))}; for the key 50: ${ic(out(B.linSrc(LA, 50)))}.\n\nBest case: 1 comparison (key first). Worst case: n comparisons (key last or absent): the key 8 needs ${out(B.linCount(LA, 8))} comparisons in this 6-element array. Without the break the loop goes on and the position ends as the **last** match.`,
      terms: [
        ['Linear search', 'A search method that compares the key with the elements of an array one by one from the first until a match is found or the end is reached.'],
        ['Key', 'The value that is searched for in an array.'],
      ],
      v: vLinFlow,
      vs: [vLinRuns, vLinTrace, vLinCases],
    },
    {
      h: '4. Binary search',
      t: 3,
      b: `**Binary search** works only on a **sorted** array. It compares the key with the middle element and discards the half that cannot contain it.\n\n${F(B.binSrc(B.BIN_ARR, 41))}\n\nOutput: ${ic(t41.result)} (3 steps). For the absent key 30 the search ends with low greater than high after 4 steps: ${ic(t30.result)}.\n\n- mid = (low + high) / 2 (integer division); key greater: low = mid + 1; key smaller: high = mid - 1; loop while low <= high.\n- At most ${out(halve(1000))} comparisons for 1000 elements, against 1000 for linear search.\n- An unsorted array gives wrong answers (for {40, 10, 30, 20, 50} the present key 10 shows ${ic(out(B.binSrc(unsortedArr, 10)))}); a descending array needs reversed comparisons.`,
      terms: [
        ['Binary search', 'A search method for a sorted array that compares the key with the middle element and discards half of the remaining elements each time.'],
      ],
      v: vBinHalf,
      vs: [vBinVars, vBin41, vBin30, vCompare, vPit],
    },
    {
      h: '5. Selection sort',
      t: 4,
      b: `In **selection sort** each pass finds the index of the smallest element of the unsorted part and swaps it with the element at the start of that part. n elements need **n - 1** passes and at most one swap per pass.\n\n${F(C.select(C.SEL_DEMO))}\n\nOutput (array after each pass):\n\n\`\`\`\n${out(C.select(C.SEL_DEMO))}\n\`\`\`\n\nFor descending order, keep the index of the largest element (${ic('a[j] > a[max]')}).`,
      terms: [
        ['Sorting', 'Arranging the elements of an array in ascending or descending order.'],
        ['Selection sort', 'A sorting method that in each pass selects the smallest (or largest) element of the unsorted part and swaps it into its correct position.'],
      ],
      v: vSelSvg,
      vs: [vSelVars, vSelPasses, vSelDesc],
    },
    {
      h: '6. Bubble sort and choosing a method',
      t: 5,
      b: `In **bubble sort** each pass compares adjacent elements a[j] and a[j + 1] and swaps them if they are out of order, so the largest element moves to the end. The inner limit is **n - 1 - i**.\n\n${F(C.bubble(C.SEL_DEMO))}\n\nOutput (array after each pass):\n\n\`\`\`\n${out(C.bubble(C.SEL_DEMO))}\n\`\`\`\n\nFor descending order use ${ic('a[j] < a[j + 1]')}. A flag set when a swap happens lets the sort stop after a pass without swaps. With the inner limit n instead of n - 1 - i, the program stops with ${ic(rte(C.bubble([9, 4, 7, 1], { jlim: 'n', print: false })).err)}.\n\n**Parallel arrays:** swap both arrays at the same positions. **Selection or bubble:** both need n - 1 passes; for {${C.SEL_DEMO.join(', ')}} selection sort makes ${out(C.selCount(C.SEL_DEMO))} swaps and bubble sort ${out(C.bubCount(C.SEL_DEMO))}. Sorting and searching in double-dimensional arrays is not required.`,
      terms: [
        ['Bubble sort', 'A sorting method that repeatedly compares adjacent elements and swaps them if they are out of order, so that the largest element moves to the end in each pass.'],
        ['Pass', 'One complete round of the outer loop of a sorting method.'],
      ],
      v: vBubIdea,
      vs: [vBubVars, vBubPasses, vSortCmp, vPar],
    },
  ],
  tips: '**Common mistakes**\n- Loop condition `i <= a.length` (index out of bounds), or `a.length()` with brackets.\n- Starting a maximum with 0 when the values can be negative.\n- Thinking `b = a` copies an array.\n- Forgetting `break` in a search, or not testing the flag value `-1` after the loop.\n- Using binary search on an unsorted array, or computing `mid` wrongly (use integer division).\n- Wrong inner limit in bubble sort, or the swap inside the inner search loop of selection sort.\n- Swapping only one of two parallel arrays.\n\n**How marks are usually awarded**\n- Output questions: each line of the passes in the exact order.\n- Trace questions: low, high and mid at every step.\n- Programs (15 marks): class header and Scanner, array filled in a loop, the search or sort logic with correct limits, clear output, variable description.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['What is an array?', 'A named collection of elements of the same data type, each reached by an index that starts at 0.', 'definition', 1],
  ['Declare and create an int array of 6 elements', ic('int[] a = new int[6];'), 'fact', 1],
  ['Two forms of array declaration', `${ic('int[] a = ...;')} and ${ic('int a[] = ...;')}; both are valid.`, 'fact', 1],
  ['Default value of the elements of a new array', 'int 0, double 0.0, boolean false, char the null character, String null.', 'fact', 1],
  ['Index of the first and last element', 'First 0, last length - 1.', 'fact', 1],
  ['How is the number of elements of an array found?', `With the property length, written without brackets: ${ic('a.length')}.`, 'fact', 1],
  ['`a.length()` for an array', `Compile-time error: ${eLen}.`, 'exam-tip', 1],
  ['Index 5 in an array of 5 elements', `Run-time error: ${eIdx5.err}.`, 'exam-tip', 1],
  ['Correct loop condition to visit all elements', ic('i < a.length'), 'exam-tip', 1],
  ['Why start max with a[0] and not 0?', `If all values are negative, max would stay 0, which is not in the array (for {-8, -3, -12} it would show 0).`, 'exam-tip', 1],
  ['What does `int[] b = a;` do?', 'Copies only the reference: a and b are two names for one array.', 'concept', 1],
  ['How is an array copied element by element?', 'Create a new array of the same length and copy each element in a loop.', 'concept', 1],
  ['Can a method change an array passed to it?', 'Yes. The parameter is another name for the same array.', 'concept', 1],
  ['What is the key in a search?', 'The value that is searched for.', 'definition', 2],
  ['What is linear search?', 'Comparing the key with each element in turn from the first until a match is found or the array ends.', 'definition', 2],
  ['Does linear search need a sorted array?', 'No. It works on any array.', 'fact', 2],
  ['Initial value of the position variable in a search', '-1, which means not found.', 'concept', 2],
  ['Linear search: best and worst case', 'Best: 1 comparison. Worst: n comparisons (key last or absent).', 'fact', 2],
  ['Effect of a missing break in a search loop', 'The loop continues and the position ends as the last match.', 'exam-tip', 2],
  ['What is binary search?', 'A search on a sorted array that compares the key with the middle element and discards half of the remaining elements each time.', 'definition', 3],
  ['Condition for binary search', 'The array must be sorted.', 'fact', 3],
  ['Middle index in binary search', ic('mid = (low + high) / 2;') + ' (integer division)', 'fact', 3],
  ['Binary search: key greater than a[mid]', `${ic('low = mid + 1;')}`, 'fact', 3],
  ['Binary search: key smaller than a[mid]', `${ic('high = mid - 1;')}`, 'fact', 3],
  ['Maximum comparisons of binary search for 1000 elements', `${out(halve(1000))}, against 1000 for linear search.`, 'example', 3],
  ['Binary search on an unsorted array', `Wrong answers: for {40, 10, 30, 20, 50} the present key 10 gives ${ic(out(B.binSrc(unsortedArr, 10)))}.`, 'exam-tip', 3],
  ['What is selection sort?', 'A sort that in each pass selects the smallest (or largest) element of the unsorted part and swaps it into its position.', 'definition', 4],
  ['Number of passes of selection sort for n elements', 'n - 1.', 'fact', 4],
  ['Swaps per pass in selection sort', 'At most one, made after the inner loop.', 'fact', 4],
  ['Selection sort for descending order', `Keep the index of the largest element: ${ic('if (a[j] > a[max]) max = j;')}`, 'concept', 4],
  ['Array after each pass: selection sort on 29 14 37 8 22', `${ic(selRows.map((r) => r[1]).join(' / '))}`, 'example', 4],
  ['What is bubble sort?', 'A sort that compares adjacent elements and swaps them if they are out of order; the largest element moves to the end in each pass.', 'definition', 5],
  ['Inner loop limit of bubble sort', ic('j < n - 1 - i'), 'fact', 5],
  ['Bubble sort for descending order', ic('if (a[j] < a[j + 1])'), 'concept', 5],
  ['Array after each pass: bubble sort on 29 14 37 8 22', `${ic(bubRows.map((r) => r[1]).join(' / '))}`, 'example', 5],
]);

// ---------------------------------------------------------------- tests (icse-10-computer-applications chapter-test blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-computer-applications-chapter-test-short',
  title: 'Chapter test (short): Single-dimensional Arrays',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1 to 6 are multiple-choice (1 mark each); questions 7 and 8 carry 2 marks each.', items: ['m_aioobe', 'm_lin_trace', 'm_bin_mid', 'm_sel_pass1', 'm_bub_pass1', 'm_length_prop', 's_ref_vs_copy', 's_sel_vs_bub'] },
    { id: 'B', title: 'Section B: Program (15 marks)', instr: 'Attempt any ONE of the two programs. Write the program in Java with variable descriptions or comments.', items: [{ attempt: 1, keys: ['l_train_lin', 'l_price_bub'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-computer-applications-chapter-test-long',
  title: 'Chapter test (long): Single-dimensional Arrays',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A: Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1 to 10 are multiple-choice (1 mark each); questions 11 to 13 are short answers and questions 14 and 15 are predict-the-output items, 2 marks each.', items: ['m_decl_valid', 'm_default_val', 'm_max_loop', 'm_sum_avg', 'm_lin_cmp', 'm_bin_cond', 'm_bin_steps', 'm_sel_swaps', 'm_bub_swaps', 'm_bub_inner', 's_stat_snippet', 's_bin_vs_lin', 's_bub_snippet', 'co_bin_missing', 'co_sel_passes'] },
    { id: 'B', title: 'Section B: Programs (30 marks)', instr: 'Attempt any TWO of the three programs. Write each program in Java with variable descriptions or comments.', items: [{ attempt: 2, keys: ['l_rain', 'l_roll_bin', 'l_marks_sel'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t05 of icse-10-computer-applications-ch11 only; sorting and searching in double-dimensional arrays is left out as the syllabus removes it',
    originality: 'every program, scenario and data value written for this chapter by SOYL with imagined names; no textbook, specimen or past-paper program reused',
    execution: 'every output, value and error in items, slides, notes and flashcards produced by compiling and running the code with JDK 21 (runJava in lib.mjs); results cached in src/java-cache.json',
    gate: 'schema, pipeline lint, deterministic verify, narration rules and the answer-leak scan run clean in this build',
  },
});
} catch (e) {
  // Flush the Java cache so that a failed run does not lose the programs already compiled, then report the failure.
  try { build({ dir: DIR, decks: [], notes: { sections: [] }, flashcards: { cards: [] }, tests: [] }); } catch { /* ignore */ }
  console.error(e);
  process.exitCode = 1;
}
