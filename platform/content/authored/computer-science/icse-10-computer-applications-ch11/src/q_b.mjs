// ICSE 10 Computer Applications, ch11: topics t02 (linear search) and t03 (binary search).
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, oline, distinct, mustFail, expect, first } from './q_util.mjs';

// ---- shared code
/** Linear search with a found flag (position -1 means not found). */
export const linSrc = (arr, key) => code(
  `int[] a = {${arr.join(', ')}};`,
  `int key = ${key};`,
  'int pos = -1;',
  'for (int i = 0; i < a.length; i++) {',
  '    if (a[i] == key) {',
  '        pos = i;',
  '        break;',
  '    }',
  '}',
  'if (pos == -1)',
  '    System.out.println("Not found");',
  'else',
  '    System.out.println("Found at index " + pos);',
);
/** Linear search that counts the comparisons and stops at the first match; prints the count. */
export const linCount = (arr, key) => code(
  `int[] a = {${arr.join(', ')}};`,
  `int key = ${key}, count = 0;`,
  'for (int i = 0; i < a.length; i++) {',
  '    count++;',
  '    if (a[i] == key)',
  '        break;',
  '}',
  'System.out.println(count);',
);
/** Binary search on an ascending array; with trace it prints low, high, mid, a[mid] and the decision at every step. */
export const binSrc = (arr, key, trace = false) => code(
  `int[] a = {${arr.join(', ')}};`,
  `int key = ${key};`,
  'int low = 0, high = a.length - 1, pos = -1;',
  'while (low <= high) {',
  '    int mid = (low + high) / 2;',
  ...(trace ? ['    System.out.println(low + " " + high + " " + mid + " " + a[mid] + " " + (a[mid] == key ? "found" : key > a[mid] ? "right" : "left"));'] : []),
  '    if (a[mid] == key) {',
  '        pos = mid;',
  '        break;',
  '    } else if (key > a[mid])',
  '        low = mid + 1;',
  '    else',
  '        high = mid - 1;',
  '}',
  'if (pos == -1)',
  '    System.out.println("Not found");',
  'else',
  '    System.out.println("Found at index " + pos);',
);
/** Rows [step, low, high, mid, a[mid], decision] and the final message of the traced binary search. */
export const binTrace = (arr, key) => {
  const lines = out(binSrc(arr, key, true)).split('\n');
  const result = lines.pop();
  const word = { found: 'found: stop', right: 'key is greater, so low = mid + 1', left: 'key is smaller, so high = mid - 1' };
  return { rows: lines.map((l, i) => { const [lo, hi, mid, v, d] = l.split(' '); return [String(i + 1), lo, hi, mid, v, word[d]]; }), result };
};
export const BIN_ARR = [5, 12, 19, 27, 34, 41, 56, 63, 78];

const none = (s) => (s === '' ? 'nothing' : s);

// ================================================================ t02 linear search
Q('m_lin_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'What is linear (sequential) search?',
  opts: distinct(['Comparing the key with the elements one by one from the first element until a match is found or the array ends', 'Comparing the key with the middle element and rejecting half of the array each time', 'Arranging the elements in order before looking for the key', 'Reading the elements of the array from the keyboard one after another']),
  sol: 'Linear search starts at the first element and moves forward, so in the worst case it examines every element. Rejecting half of the array at each step is binary search, which needs sorted data, and arranging elements is sorting.',
}));
const busData = [21, 47, 15, 62, 38];
const cBus = (key) => code(
  'int[] bus = {21, 47, 15, 62, 38};',
  `int key = ${key}, c = 0;`,
  'for (int i = 0; i < bus.length; i++) {',
  '    c++;',
  '    if (bus[i] == key) {',
  '        System.out.println("Position " + (i + 1) + ", comparisons " + c);',
  '        break;',
  '    }',
  '}',
);
Q('m_lin_trace', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A depot keeps route numbers of its buses in an array and searches for route 62 with the code below. What is displayed?\n\n${F(cBus(62))}`,
  opts: distinct([ic(out(cBus(62))), ic(out(cBus(15))), ic(out(cBus(38))), ic(out(cBus(21)))]),
  sol: 'The loop compares 21, 47, 15 and then 62, so the fourth element matches. The counter c is increased before every comparison, so it is 4, and the position shown is i + 1 because the code prints positions counted from 1, not the index 3. The other options belong to the keys 15, 38 and 21.',
}));
expect(out(code('int[] bus = {21, 47, 15, 62, 38};', 'int key = 62, c = 0;', 'for (int i = 0; i < bus.length; i++) {', '    c++;', '    if (bus[i] == key) {', '        System.out.println("Position " + (i + 1) + ", comparisons " + c);', '        break;', '    }', '}')), 'Position 4, comparisons 4', 'bus');
const cNoBreak = code('int[] a = {9, 14, 9, 22, 9};', 'int pos = -1;', 'for (int i = 0; i < a.length; i++)', '    if (a[i] == 9)', '        pos = i;', 'System.out.println(pos);');
const cWithBreak = code('int[] a = {9, 14, 9, 22, 9};', 'int pos = -1;', 'for (int i = 0; i < a.length; i++)', '    if (a[i] == 9) {', '        pos = i;', '        break;', '    }', 'System.out.println(pos);');
const cCountNine = code('int[] a = {9, 14, 9, 22, 9};', 'int c = 0;', 'for (int i = 0; i < a.length; i++)', '    if (a[i] == 9)', '        c++;', 'System.out.println(c);');
Q('m_lin_nobreak', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `A search loop for the value 9 has no break statement. What does the following code display?\n\n${F(cNoBreak)}`,
  opts: distinct([ic(out(cNoBreak)), ic(out(cWithBreak)), ic(out(cCountNine)), 'A compile-time error because pos is assigned more than once']),
  sol: `Without a break the loop keeps going after the first match and pos is overwritten at every match, so it finishes holding the index of the last occurrence. With a break the loop stops at the first match and shows ${ic(out(cWithBreak))}. Counting the matches would show ${ic(out(cCountNine))}.`,
}));
const cMissing = linCount([6, 13, 21, 4, 17, 30, 2, 25, 11, 8, 19, 27], 99);
const preMiss = 'int[] a = {6, 13, 21, 4, 17, 30, 2, 25, 11, 8, 19, 27};';
Q('m_lin_cmp', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `A warehouse searches an array of 12 item codes for a code that is not present. How many comparisons does the code below make, and so what is displayed?\n\n${F(cMissing)}`,
  opts: distinct([ic(out(cMissing)), ic(ev('a.length - 1', preMiss)), ic(ev('a.length / 2', preMiss)), ic(ev('a.length + 1', preMiss))]),
  sol: 'When the key is absent, linear search has to compare it with every element before it can say so, and the counter is increased once per comparison. That is the worst case: as many comparisons as there are elements. Half of them or one fewer would be possible only if the search could stop early.',
}));
const cLinUnsorted = binSrc([40, 10, 30, 20, 50], 10);
Q('m_lin_when', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A list of 200 stock numbers is stored in the order in which items arrived and is not sorted. Which search can be used on it directly?',
  opts: distinct(['Linear search', 'Binary search', 'Both searches, but binary search is always faster', 'Neither search, because the array must be sorted first']),
  sol: `Linear search makes no assumption about the order of the elements. Binary search does: on the unsorted array {40, 10, 30, 20, 50} it looks for the key 10, which is present, and wrongly displays ${ic(out(cLinUnsorted))}.`,
}));
Q('tf_lin_sorted', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Linear search can be used only when the elements of the array are already sorted.',
  sol: `Linear search works on any array: it simply checks the elements in turn. For the unsorted array {14, 27, 9, 33, 21, 8} and the key 33 it displays ${ic(out(linSrc([14, 27, 9, 33, 21, 8], 33)))}.`,
}));
const cDups = code('int[] a = {5, 8, 5, 9, 5, 7};', 'int first = -1, last = -1, count = 0;', 'for (int i = 0; i < a.length; i++) {', '    if (a[i] == 5) {', '        if (first == -1)', '            first = i;', '        last = i;', '        count++;', '    }', '}', 'System.out.println(first + " " + last + " " + count);');
expect(out(cDups), '0 4 3', 'duplicates');
Q('co_lin_dups', co({
  pre: 'A teacher scans the scores of six rounds of a quiz for the score 5. Write the exact output.',
  t: 2, d: 3, c: 'application',
  code: cDups,
  sol: 'The value 5 is found at the indexes 0, 2 and 4. first is set only once, at the first match; last is overwritten at every match; count is increased each time.',
}));
const cWhile = code("char[] tag = {'M', 'K', 'R', 'B', 'T'};", "char key = 'B';", 'int i = 0;', 'while (i < tag.length && tag[i] != key)', '    i++;', 'if (i < tag.length)', '    System.out.println("Found at " + i);', 'else', '    System.out.println("Not found");');
expect(out(cWhile), 'Found at 3', 'while search');
Q('co_lin_while', co({
  pre: 'A locker program searches an array of letter codes with a while loop. Write the exact output.',
  t: 2, d: 3, c: 'application',
  code: cWhile,
  sol: 'The loop moves on while the element differs from the key and the index is still inside the array. It stops at i = 3, where the element is B. The test i < tag.length is written first so that tag[i] is never evaluated beyond the end.',
}));
const cLinStepsDemo = linCount([14, 27, 9, 33, 21, 8], 8);
Q('s_lin_algo', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Explain how linear search finds a value in an array. State one advantage and one disadvantage of the method.',
  model: `Linear search compares the **key** with the elements one by one, starting from the first, until a match is found or the end of the array is reached. A flag or a position variable records the result.\n\n**Advantage:** it works on an array in any order, and it is simple to write. **Disadvantage:** it is slow for a long array, because in the worst case every element is compared; for the key at the last position of a 6-element array the code below makes ${ic(out(cLinStepsDemo))} comparisons.\n\n${F(cLinStepsDemo)}`,
  sol: 'One mark for the method (element by element from the start) and one mark for an advantage and a disadvantage.',
  scheme: [['Method: key compared with each element in turn from the first', 1], ['One advantage (no sorting needed, simple) and one disadvantage (slow, up to n comparisons)', 1]],
}));
const cRollSnip = (key) => code(
  'int[] rollNo = {112, 105, 130, 118, 101, 126, 109, 121};',
  `int key = ${key};`,
  'int pos = 0;',
  'for (int i = 0; i < rollNo.length; i++) {',
  '    if (rollNo[i] == key) {',
  '        pos = i + 1;',
  '        break;',
  '    }',
  '}',
  'if (pos == 0)',
  '    System.out.println("Absent");',
  'else',
  '    System.out.println("Position " + pos);',
);
Q('s_lin_snippet', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'The int array rollNo holds 8 roll numbers and the int variable key holds the roll number to be found. Write Java statements to display its position, counted from 1, or the word Absent if it is not in the array.',
  model: `${F(cRollSnip(126))}\n\nFor the key 126 the output is ${ic(out(cRollSnip(126)))}, and for the key 140 it is ${ic(out(cRollSnip(140)))}. Position 0 can serve as the flag for "not found" because positions counted from 1 are never 0.`,
  sol: 'A loop over all elements with a comparison and a break, and a test of the flag after the loop.',
  scheme: [['Loop with comparison rollNo[i] == key, position stored as i + 1, break', 1], ['Flag tested after the loop; Absent displayed when not found', 1]],
}));

// ================================================================ t03 binary search
Q('m_bin_cond', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which condition must be satisfied before binary search can be applied to an array?',
  opts: distinct(['The elements must be arranged in ascending or descending order', 'The array must contain only positive numbers', 'The number of elements must be even', 'The array must not contain repeated values']),
  sol: 'Binary search decides which half to discard by comparing the key with the middle element, which is meaningful only if the elements are in order. Sign, even length and repeated values do not matter to it.',
}));
const midVal = ev('(3 + 12) / 2');
Q('m_bin_mid', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In a binary search, the variable low holds 3 and the variable high holds 12. What is the value of mid = (low + high) / 2, with all three variables of type int?',
  opts: distinct([midVal, ev('(3 + 12 + 1) / 2'), ev('3 + 12 / 2'), ev('3 + 12')]),
  sol: `The sum 15 is divided by 2 using integer division, which discards the .5, so mid is ${midVal}. Writing 3 + 12 / 2 divides only the 12 and gives ${ev('3 + 12 / 2')}; the sum itself is ${ev('3 + 12')}.`,
}));
const trKey41 = binTrace(BIN_ARR, 41);
const rowsK41 = trKey41.rows;
Q('m_bin_next', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'An array sorted in ascending order has low = 0 and high = 8. For the key 41 the middle element is a[mid] = 34 at mid = 4. Which statement does the binary search execute next?',
  opts: distinct([ic('low = mid + 1;'), ic('high = mid - 1;'), ic('low = mid;'), ic('high = mid + 1;')]),
  sol: `The key 41 is greater than 34, so it can only be in the right half; the middle element itself has been rejected, so the search continues from mid + 1. The traced run for this array shows exactly this: after the first step (low ${rowsK41[0][1]}, high ${rowsK41[0][2]}, mid ${rowsK41[0][3]}) the next step has low ${rowsK41[1][1]}, high ${rowsK41[1][2]} and mid ${rowsK41[1][3]}.`,
}));
const BIG = [3, 9, 14, 22, 31, 40, 52, 61, 70, 85, 93];
const cBinSteps = (key) => code(
  `int[] a = {${BIG.join(', ')}};`,
  `int key = ${key}, low = 0, high = a.length - 1, steps = 0;`,
  'while (low <= high) {',
  '    int mid = (low + high) / 2;',
  '    steps++;',
  '    if (a[mid] == key)',
  '        break;',
  '    else if (key > a[mid])',
  '        low = mid + 1;',
  '    else',
  '        high = mid - 1;',
  '}',
  'System.out.println(steps);',
);
expect(out(cBinSteps(93)), '4', 'binary steps for 93');
Q('m_bin_steps', mcq({
  t: 3, d: 4, c: 'application',
  stem: `A sorted array holds 11 readings. The code below counts the comparisons that binary search makes for the key 93. What is displayed?\n\n${F(cBinSteps(93))}`,
  opts: distinct([ic(out(cBinSteps(93))), ic(out(cBinSteps(40))), ic(out(cBinSteps(70))), ic(out(cBinSteps(3)))]),
  sol: 'The key is the last element, so every step moves low to the right: mid is 5, then 8, then 9 and finally 10, which is the element 93. Four comparisons are made. The other options are the counts for the keys 40 (the very first middle element), 70 and 3.',
}));
const cHalve = code('int n = 1000, steps = 0;', 'while (n > 0) {', '    n = n / 2;', '    steps++;', '}', 'System.out.println(steps);');
expect(out(cHalve), '10', 'halvings of 1000');
Q('m_bin_max', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: `Each comparison of binary search throws away about half of the elements that are left. The code below counts how many times 1000 can be halved (with integer division) until nothing is left. What is displayed, which is also the largest number of comparisons binary search needs for 1000 sorted elements?\n\n${F(cHalve)}`,
  opts: distinct([ic(out(cHalve)), ic(ev('1000 / 2')), ic(ev('1000 / 10')), ic(ev('1000'))]),
  sol: `The number of elements goes 1000, 500, 250, 125, 62, 31, 15, 7, 3, 1 and then 0, which is ${out(cHalve)} halvings. Linear search may need ${ev('1000')} comparisons for the same array, while half of 1000 is ${ev('1000 / 2')}, which would be far too many.`,
}));
Q('ar_bin', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Binary search can be applied to any array, whether it is sorted or not.',
  r: 'After each comparison, binary search discards half of the elements that are still under consideration.',
  sol: `(A) is false: for the unsorted array {40, 10, 30, 20, 50} the key 10 is present, yet binary search displays ${ic(out(cLinUnsorted))}. (R) is true, because the middle element is compared and one half is thrown away each time; this is also why the order of the elements is needed.`,
}));
Q('fb_bin_mid', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'In binary search the middle index is found with the statement mid = (___ + ___) / 2, using the variables that mark the two ends of the part still to be searched.',
  acc: [['low', 'high'], ['high', 'low']],
  sol: 'The two variables are low (the first index of the part under search) and high (the last index); the integer division gives the middle index.',
}));
Q('ord_bin_steps', ord({
  t: 3, d: 3, c: 'application',
  stem: 'Arrange the steps of binary search on an ascending array in the correct order.',
  items: ['Set low = 0 and high = a.length - 1', 'While low <= high, find mid = (low + high) / 2', 'Compare a[mid] with the key', 'If they are equal, note the position and stop; otherwise set low = mid + 1 or high = mid - 1', 'If low becomes greater than high, report that the key is not found'],
  sol: 'The ends must be set first, the middle is found and compared inside the loop, the range is cut after an unsuccessful comparison, and when the range becomes empty the search has failed.',
}));
const cBinMiss = code('int[] a = {11, 24, 37, 45, 58, 66, 79};', 'int key = 50, low = 0, high = a.length - 1, steps = 0;', 'boolean found = false;', 'while (low <= high) {', '    int mid = (low + high) / 2;', '    steps++;', '    if (a[mid] == key) {', '        found = true;', '        break;', '    }', '    if (key > a[mid])', '        low = mid + 1;', '    else', '        high = mid - 1;', '}', 'System.out.println(found + " " + steps + " " + low + " " + high);');
expect(out(cBinMiss), 'false 3 4 3', 'binary missing');
Q('co_bin_missing', co({
  pre: 'A school keeps sorted marks in an array and looks for the mark 50, which is not in it. Write the exact output.',
  t: 3, d: 4, c: 'analysis',
  code: cBinMiss,
  sol: 'Trace: mid 3 holds 45, 50 is greater, so low becomes 4; mid 5 holds 66, 50 is smaller, so high becomes 4; mid 4 holds 58, 50 is smaller, so high becomes 3. Now low (4) is greater than high (3), the loop ends after 3 steps and found is still false.',
}));
const cBinDesc = code('int[] a = {90, 75, 60, 45, 30, 15};', 'int key = 30, low = 0, high = 5, mid = 0;', 'while (low <= high) {', '    mid = (low + high) / 2;', '    if (a[mid] == key)', '        break;', '    if (key > a[mid])', '        high = mid - 1;', '    else', '        low = mid + 1;', '}', 'System.out.println(mid);');
expect(out(cBinDesc), '4', 'binary descending');
Q('co_bin_desc', co({
  pre: 'The array below is sorted in descending order, and the binary search is written for that order. Write the exact output.',
  t: 3, d: 4, c: 'analysis',
  code: cBinDesc,
  sol: 'In a descending array a key that is greater than a[mid] lies on the left, so the two assignments are the other way round. First mid is 2 (the element 60); 30 is not greater, so low becomes 3. Then mid is 4 (the element 30), which matches, and the break leaves mid at 4.',
}));
const binDemo = binTrace([8, 15, 23, 31, 42, 50, 67, 74], 74);
Q('s_bin_trace', short({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Trace binary search for the key 74 in the sorted array {8, 15, 23, 31, 42, 50, 67, 74}. Show low, high and mid at each step and state the result.',
  model: `| Step | low | high | mid | a[mid] | Decision |\n|---|---|---|---|---|---|\n${binDemo.rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}\n\nResult: ${ic(binDemo.result)}.`,
  sol: 'Each step finds mid with integer division, compares a[mid] with the key and moves low or high; the search stops when the key is found.',
  scheme: [['Correct low, high and mid at every step', 1], ['Correct decisions and the final result', 1]],
}));
const cHalve1000 = cHalve;
Q('s_bin_vs_lin', short({
  t: [2, 3], d: 3, c: 'analysis', marks: 2,
  stem: 'Differentiate between linear search and binary search.',
  model: `| | Linear search | Binary search |\n|---|---|---|\n| Order of the array | works on any array | the array must be sorted |\n| Method | compares the key with the elements one by one from the start | compares the key with the middle element and discards one half each time |\n| Comparisons for 1000 elements (worst case) | ${ev('1000')} | ${out(cHalve1000)} |\n\nBinary search is much faster for a long sorted array; linear search is simpler and needs no sorting.`,
  sol: 'One mark for the difference in the condition and the method, and one mark for the difference in the number of comparisons.',
  scheme: [['Sorted array needed for binary search, any array for linear search; method of each', 1], ['Number of comparisons: n for linear search against about log n for binary search', 1]],
}));
