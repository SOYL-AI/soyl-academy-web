// ICSE 10 Computer Applications, ch11: topics t04 (selection sort) and t05 (bubble sort).
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, oline, distinct, expect, first, rte } from './q_util.mjs';

// ---- shared code
const passLines = ['    String line = "Pass " + (i + 1) + ":";', '    for (int k = 0; k < n; k++)', '        line = line + " " + a[k];', '    System.out.println(line);'];
/** Selection sort; prints the array after every pass. o.desc sorts descending (index of the largest), o.op overrides the comparison. */
export const select = (arr, o = {}) => {
  const v = o.desc ? 'max' : 'min';
  const op = o.op ?? (o.desc ? '>' : '<');
  return code(
    `int[] a = {${arr.join(', ')}};`,
    'int n = a.length;',
    'for (int i = 0; i < n - 1; i++) {',
    `    int ${v} = i;`,
    '    for (int j = i + 1; j < n; j++) {',
    `        if (a[j] ${op} a[${v}])`,
    `            ${v} = j;`,
    '    }',
    '    int t = a[i];',
    `    a[i] = a[${v}];`,
    `    a[${v}] = t;`,
    ...passLines,
    '}',
  );
};
/** Selection sort that counts the swaps actually made (a pass whose smallest element is already in place makes none). */
export const selCount = (arr) => code(
  `int[] a = {${arr.join(', ')}};`,
  'int n = a.length, swaps = 0;',
  'for (int i = 0; i < n - 1; i++) {',
  '    int min = i;',
  '    for (int j = i + 1; j < n; j++) {',
  '        if (a[j] < a[min])',
  '            min = j;',
  '    }',
  '    if (min != i) {',
  '        int t = a[i];',
  '        a[i] = a[min];',
  '        a[min] = t;',
  '        swaps++;',
  '    }',
  '}',
  'System.out.println(swaps);',
);
/** Bubble sort; prints the array after every pass. o.cond, o.jlim and o.print = false change the pieces. */
export const bubble = (arr, o = {}) => code(
  `int[] a = {${arr.join(', ')}};`,
  'int n = a.length;',
  'for (int i = 0; i < n - 1; i++) {',
  `    for (int j = 0; j < ${o.jlim ?? 'n - 1 - i'}; j++) {`,
  `        if (${o.cond ?? 'a[j] > a[j + 1]'}) {`,
  '            int t = a[j];',
  '            a[j] = a[j + 1];',
  '            a[j + 1] = t;',
  '        }',
  '    }',
  ...(o.print === false ? [] : passLines),
  '}',
);
export const bubCount = (arr) => code(
  `int[] a = {${arr.join(', ')}};`,
  'int n = a.length, swaps = 0;',
  'for (int i = 0; i < n - 1; i++) {',
  '    for (int j = 0; j < n - 1 - i; j++) {',
  '        if (a[j] > a[j + 1]) {',
  '            int t = a[j];',
  '            a[j] = a[j + 1];',
  '            a[j + 1] = t;',
  '            swaps++;',
  '        }',
  '    }',
  '}',
  'System.out.println(swaps);',
);
/** Rows [pass label, array text] of a sort program that prints "Pass k: ..." lines. */
export const passRows = (src) => out(src).split('\n').map((l) => { const [p, rest] = l.split(': '); return [p.replace('Pass ', ''), rest]; });
export const SEL_DEMO = [29, 14, 37, 8, 22];

// ================================================================ t04 selection sort
Q('m_sel_def', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'What does selection sort (ascending order) do in each pass?',
  opts: distinct(['It finds the smallest element of the unsorted part and swaps it into its correct position', 'It compares neighbouring elements and swaps them whenever they are out of order', 'It divides the array into two halves and sorts each half separately', 'It copies the elements into a second array in reverse order']),
  sol: 'Selection sort selects the smallest element of the part that is still unsorted and puts it in the next position of the sorted part, so one more element reaches its final place in every pass. Comparing neighbours is bubble sort.',
}));
const cSelP1 = select([48, 31, 62, 9, 20]);
Q('m_sel_pass1', mcq({
  t: 4, d: 3, c: 'application',
  stem: `A canteen sorts these item prices in ascending order with the program below, which displays the array after each pass. Which line is displayed for pass 1?\n\n${F(cSelP1)}`,
  opts: distinct([ic(first(out(cSelP1))), ic(first(out(bubble([48, 31, 62, 9, 20])))), ic(first(out(select([48, 31, 62, 9, 20], { desc: true })))), ic(out(cSelP1).split('\n')[1])]),
  sol: `In the first pass the smallest element, 9 at index 3, is found and swapped with the element at index 0, which gives ${ic(first(out(cSelP1)))}. The other options are the first pass of bubble sort, the first pass of a descending selection sort and the second line of this program.`,
}));
const swArr = [7, 12, 5, 19, 3, 8];
const preSw = `int[] a = {${swArr.join(', ')}};`;
const cSelSwaps = selCount(swArr);
Q('m_sel_swaps', mcq({
  t: 4, d: 3, c: 'application',
  stem: `The program below counts the swaps that selection sort makes (a pass whose smallest element is already in place makes no swap). What is displayed?\n\n${F(cSelSwaps)}`,
  opts: distinct([ic(out(cSelSwaps)), ic(out(bubCount(swArr))), ic(ev('a.length - 1', preSw)), ic(ev('a.length', preSw))]),
  sol: `There are ${ev('a.length - 1', preSw)} passes. The last pass finds 12 already at index 4, so no swap is made there, and the counter shows ${ic(out(cSelSwaps))}. Selection sort makes at most one swap per pass; bubble sort on the same data would make ${ic(out(bubCount(swArr)))} swaps.`,
}));
const dArr = [15, 40, 22, 8];
Q('m_sel_desc', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'A teacher sorts marks in descending order with selection sort. The outer loop and the swap are unchanged, and the inner loop keeps the index of the largest element found so far in the variable max. Which statement must the inner loop contain?',
  opts: distinct([ic('if (a[j] > a[max]) max = j;'), ic('if (a[j] < a[max]) max = j;'), ic('if (a[j] > a[j + 1]) max = j;'), ic('if (a[max] > a[j]) max = j;')]),
  sol: `max must change whenever a larger element is met, so the test is a[j] > a[max]. For {${dArr.join(', ')}} the descending program displays ${ic(out(select(dArr, { desc: true })).split('\n').join(' / '))}. With a[j] < a[max] the same loop would pick the smallest element and display ${ic(out(select(dArr, { desc: true, op: '<' })).split('\n').join(' / '))}; the option a[max] > a[j] means the same as that one.`,
}));
const cPasses = code('int n = 9, passes = 0;', 'for (int i = 0; i < n - 1; i++)', '    passes++;', 'System.out.println(passes);');
Q('m_sel_passes', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `Selection sort uses an outer loop that runs for i = 0 up to n - 2. For an array of 9 elements, the code below counts the passes. What is displayed?\n\n${F(cPasses)}`,
  opts: distinct([ic(out(cPasses)), ic(ev('9')), ic(ev('9 / 2')), ic(ev('9 * 8 / 2'))]),
  sol: `After n - 1 passes the last element is automatically in place, so ${out(cPasses)} passes sort 9 elements. The value ${ev('9 * 8 / 2')} is the number of comparisons made in all the passes together, not the number of passes.`,
}));
Q('ar_sel_swap', ar({
  t: 4, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'Selection sort makes at most one swap in each pass.',
  r: 'In each pass, selection sort compares every element of the unsorted part with the smallest value found so far.',
  sol: `For the array {${swArr.join(', ')}} the 5 passes make only ${ic(out(cSelSwaps))} swaps in all, so (A) is true. (R) is also true, but it describes how the smallest element is found; the single swap is made because the swap statements are written after the inner loop, once the position of the smallest element is known. So (R) does not explain (A).`,
}));
Q('fb_sel_passes', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'To sort an array of n elements, selection sort needs ___ passes, because the last element is then already in its place.',
  acc: [['n - 1', 'n-1', 'n minus 1']],
  sol: 'The outer loop runs from i = 0 to n - 2, which is n - 1 passes; for 9 elements that is 8 passes.',
}));
Q('mt_sort_search', match({
  t: [2, 3, 4, 5], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each technique with its description.',
  pairs: [
    ['linear search', 'compares the key with each element in turn'],
    ['binary search', 'halves a sorted range after every comparison'],
    ['selection sort', 'swaps the smallest remaining element into place in each pass'],
    ['bubble sort', 'swaps adjacent elements that are out of order'],
  ],
  sol: 'The two searches differ in the order they need (any order against sorted) and the two sorts differ in how they move elements: one swap from far away against many swaps of neighbours.',
}));
Q('mt_expr', match({
  t: [1, 3, 5], d: 3, c: 'understanding', marks: 2,
  stem: 'Match each expression or statement with what it does in the usual programs of this chapter.',
  pairs: [
    [ic('a.length - 1'), 'index of the last element'],
    [ic('(low + high) / 2'), 'index of the middle of the range still searched'],
    [ic('low = mid + 1;'), 'discards the middle element and everything to its left'],
    [ic('a[j] > a[j + 1]'), 'test that decides a swap in ascending bubble sort'],
  ],
  sol: 'Indexes start at 0, so the last index is one less than the length; the middle is found by integer division; after an unsuccessful comparison the search continues beyond the middle element; and bubble sort compares each element with the next.',
}));

// ---- code output, t04
const cSelCo = select([34, 9, 51, 17, 26]);
Q('co_sel_passes', co({
  pre: 'A club sorts the points of five players with the program below, which displays the array after every pass. Write the exact output.',
  t: 4, d: 4, c: 'application',
  code: cSelCo,
  sol: 'Pass 1 swaps the smallest value, 9, with the element at index 0. Pass 2 finds the smallest of the rest, 17, and swaps it into index 1. Pass 3 finds 26 and swaps it into index 2. In pass 4 the smaller of the last two values, 34, is already at index 3, so the array does not change.',
}));
const cSelDescCo = select([15, 40, 22, 40, 8], { desc: true });
Q('co_sel_desc', co({
  pre: 'A shop sorts its daily sales in descending order with the program below. Note that the value 40 occurs twice. Write the exact output.',
  t: 4, d: 4, c: 'analysis',
  code: cSelDescCo,
  sol: 'The test a[j] > a[max] is strict, so the first 40 (index 1) is chosen in pass 1 and swapped with index 0. In pass 2 the remaining largest value is the other 40, at index 3, and it is swapped into index 1. After that the rest is already in descending order.',
}));
const cSelShow = select([25, 7, 18, 3, 12]);
Q('s_sel_pass', short({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: 'Show the array {25, 7, 18, 3, 12} after each pass when it is sorted in ascending order by selection sort.',
  model: `In each pass the smallest element of the unsorted part is swapped with the first element of that part.\n\n\`\`\`\n${out(cSelShow)}\n\`\`\`\n\nThese lines are the output of the selection sort program that displays the array after every pass.`,
  sol: 'The smallest of the whole array comes first, then the smallest of the rest, and so on for 4 passes; the fourth pass leaves the array unchanged only if its two elements are already in order.',
  scheme: [['Passes 1 and 2 correct', 1], ['Passes 3 and 4 correct', 1]],
}));
Q('s_sel_vs_bub', short({
  t: [4, 5], d: 3, c: 'analysis', marks: 2,
  stem: 'Distinguish between selection sort and bubble sort.',
  model: `**Selection sort** finds the smallest (or largest) element of the unsorted part in each pass and swaps it into place once, so it makes at most n - 1 swaps. **Bubble sort** compares neighbouring elements and swaps them whenever they are out of order, so the large values move gradually to the end and many swaps may be needed.\n\nFor the array {${swArr.join(', ')}}, selection sort makes ${ic(out(cSelSwaps))} swaps and bubble sort makes ${ic(out(bubCount(swArr)))}.`,
  sol: 'One mark for the working of each sort and one mark for the difference in the number of swaps, with an example.',
  scheme: [['Selection sort: selects the extreme element, one swap per pass; bubble sort: adjacent comparisons and swaps', 1], ['Difference in the number of swaps shown by an example', 1]],
}));

// ================================================================ t05 bubble sort
Q('m_bub_def', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'In bubble sort (ascending order), what is done to two adjacent elements a[j] and a[j + 1] during a pass?',
  opts: distinct(['They are compared and swapped if a[j] is greater than a[j + 1]', 'They are always swapped, whatever their values', 'They are compared and the smaller one is removed from the array', 'They are added and the sum is stored in a[j]']),
  sol: 'Bubble sort repeatedly passes over the array, compares each pair of neighbours and swaps a pair that is in the wrong order. After a pass the largest unsorted element has moved to the end, like a bubble rising.',
}));
const cBubP1 = bubble([53, 18, 40, 7, 26]);
Q('m_bub_pass1', mcq({
  t: 5, d: 3, c: 'application',
  stem: `A garage keeps repair charges in an array and arranges them in ascending order with bubble sort, as in the program below. What does the program display for the first pass?\n\n${F(cBubP1)}`,
  opts: distinct([ic(first(out(cBubP1))), ic(first(out(select([53, 18, 40, 7, 26])))), ic(out(cBubP1).split('\n')[1]), ic(first(out(bubble([53, 18, 40, 7, 26], { cond: 'a[j] < a[j + 1]' }))))]),
  sol: `In pass 1 every adjacent pair is compared once: 53 is swapped past 18, 40, 7 and 26, so the largest value goes to the end and the line is ${ic(first(out(cBubP1)))}. The other options are the first pass of selection sort, the second line of this program and the first pass of the descending version.`,
}));
const bsArr = [3, 8, 1, 6, 2];
const cBubSwaps = bubCount(bsArr);
const preBs = `int[] a = {${bsArr.join(', ')}};`;
Q('m_bub_swaps', mcq({
  t: 5, d: 3, c: 'application',
  stem: `The program below counts the swaps made by bubble sort on five values. What is displayed?\n\n${F(cBubSwaps)}`,
  opts: distinct([ic(out(cBubSwaps)), ic(out(selCount(bsArr))), ic(ev('a.length * (a.length - 1) / 2', preBs)), ic(ev('a.length - 1', preBs))]),
  sol: `Each swap removes one pair that is out of order, and this array has ${out(cBubSwaps)} such pairs (3 is before 1 and 2, 8 is before 1, 6 and 2, and 6 is before 2), so ${out(cBubSwaps)} swaps are made. Selection sort needs only ${ic(out(selCount(bsArr)))} on the same data, the number of comparisons is ${ev('a.length * (a.length - 1) / 2', preBs)}, and the number of passes is ${ev('a.length - 1', preBs)}.`,
}));
const rBad = rte(bubble([5, 2, 8, 1], { jlim: 'n - i', print: false }));
Q('m_bub_inner', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'In bubble sort the inner loop is written as for (int j = 0; j < n - 1 - i; j++) in pass number i (counted from 0). Why is its limit n - 1 - i?',
  opts: distinct(['The last i elements are already in their final places, and a[j + 1] must stay inside the array', 'The first element never needs to be compared with anything', 'The array has only n - 1 elements', 'It makes the inner loop run exactly once in every pass']),
  sol: `Every pass carries the largest remaining value to the end, so the last i elements need no more comparisons, and because the loop reads a[j + 1] the largest allowed j is n - 2 even in the first pass. Writing j < n - i makes the first pass read a[n] and stops the program with ${ic(rBad.err)}.`,
}));
const bubDescArr = [24, 9, 31, 17];
const rMinus = rte(bubble(bubDescArr, { cond: 'a[j] < a[j - 1]', print: false }));
Q('m_bub_desc', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'A bubble sort program arranges numbers in ascending order using the test if (a[j] > a[j + 1]) before the swap. Which test makes the same program arrange them in descending order?',
  opts: distinct([ic('if (a[j] < a[j + 1])'), ic('if (a[j] > a[j + 1])'), ic('if (a[j] == a[j + 1])'), ic('if (a[j] < a[j - 1])')]),
  sol: `For a descending order a pair is wrong when the left element is smaller than the right one, so the test is reversed to a[j] < a[j + 1]. On {${bubDescArr.join(', ')}} the last pass of that program gives ${ic(out(bubble(bubDescArr, { cond: 'a[j] < a[j + 1]' })).split('\n').pop())}. The test a[j] == a[j + 1] swaps only equal values, and a[j] < a[j - 1] fails at j = 0 with ${ic(rMinus.err)}.`,
}));
Q('ar_bubble', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'After the first pass of ascending bubble sort, the largest element of the array is at the last position.',
  r: 'In the first pass every adjacent pair is compared and a larger left element is swapped with its right neighbour, so the largest value keeps being carried to the right.',
  sol: `For {53, 18, 40, 7, 26} the first pass line is ${ic(first(out(bubble([53, 18, 40, 7, 26]))))}, with 53, the largest, at the end, so (A) is true. (R) is true and gives the reason: once the largest value is met it is swapped with every neighbour on its way to the last place.`,
}));
const cSortedBub = bubble([5, 10, 15, 20, 25]);
Q('tf_bub_sorted', tf({
  t: 5, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? A bubble sort written without any early-stop flag still makes all n - 1 passes on an array that is already sorted.',
  sol: `The outer loop always runs n - 1 times, whatever the data. For the sorted array {5, 10, 15, 20, 25} the program displays ${out(cSortedBub).split('\n').length} pass lines and makes no swap at all; a flag that records whether a swap happened in a pass can stop it earlier.`,
}));

// ---- code output, t05
const cBubCo = bubble([23, 41, 6, 18]);
Q('co_bub_passes', co({
  pre: 'A ticket counter arranges four fares in ascending order with the bubble sort program below. Write the exact output.',
  t: 5, d: 4, c: 'application',
  code: cBubCo,
  sol: 'Pass 1: 23 and 41 stay, 41 is swapped past 6 and then past 18, so 41 reaches the end. Pass 2 compares only the first three elements: 23 is swapped past 6 and past 18. Pass 3 compares only the first two elements, which are already in order, so the array is unchanged.',
}));
const cBubDescCo = bubble([14, 30, 22, 5], { cond: 'a[j] < a[j + 1]' });
Q('co_bub_desc', co({
  pre: 'A librarian arranges the number of books issued on four days in descending order with the program below. Write the exact output.',
  t: 5, d: 4, c: 'application',
  code: cBubDescCo,
  sol: 'A pair is swapped when the left value is smaller. Pass 1 swaps 14 with 30 and then 14 with 22, and leaves 14 and 5 alone, so the smallest value of the first three, 14, ends in front of 5. Pass 2 and pass 3 then find the first three and the first two values already in descending order.',
}));
Q('co_err_bub_bound', co({
  pre: 'A student writes the inner loop of a bubble sort with the limit n instead of n - 1 - i. State the error that occurs when the code is run.',
  t: 5, d: 4, c: 'analysis', error: true,
  code: bubble([9, 4, 7, 1], { jlim: 'n', print: false }),
  sol: 'In the first pass j reaches n - 1, and the comparison a[j] > a[j + 1] then reads a[n], one place beyond the last element. The first three comparisons work, the fourth stops the program at run time.',
  scheme: [['Run-time error stated (ArrayIndexOutOfBoundsException) with the index', 1], ['Reason: j + 1 goes beyond the last index; limit should be n - 1 - i', 1]],
}));

// ---- short answers, t05
const cBubSnip = code(
  'int[] rate = {18, 12, 25, 9, 14, 20};',
  'int n = rate.length;',
  'for (int i = 0; i < n - 1; i++) {',
  '    for (int j = 0; j < n - 1 - i; j++) {',
  '        if (rate[j] > rate[j + 1]) {',
  '            int t = rate[j];',
  '            rate[j] = rate[j + 1];',
  '            rate[j + 1] = t;',
  '        }',
  '    }',
  '}',
  'String s = "";',
  'for (int k = 0; k < n; k++)',
  '    s = s + rate[k] + " ";',
  'System.out.println(s.trim());',
);
Q('s_bub_snippet', short({
  t: 5, d: 3, c: 'application', marks: 2,
  stem: 'Write Java statements to arrange the 6 elements of the int array rate in ascending order using bubble sort.',
  model: `${F(cBubSnip)}\n\nWith the values given in the first line, the output is ${ic(out(cBubSnip))}. Two nested loops are used: the outer loop counts the passes and the inner loop compares and swaps adjacent elements.`,
  sol: 'The outer loop makes n - 1 passes, the inner loop stops at n - 1 - i, and a three-statement swap through a temporary variable exchanges a pair that is out of order.',
  scheme: [['Nested loops with correct limits (n - 1 and n - 1 - i)', 1], ['Comparison of adjacent elements and a correct swap with a temporary variable', 1]],
}));
export const cParallel = code(
  'int[] roll = {7, 3, 9, 5};',
  'int[] mark = {62, 85, 47, 71};',
  'int n = mark.length;',
  'for (int i = 0; i < n - 1; i++) {',
  '    for (int j = 0; j < n - 1 - i; j++) {',
  '        if (mark[j] < mark[j + 1]) {',
  '            int t = mark[j];',
  '            mark[j] = mark[j + 1];',
  '            mark[j + 1] = t;',
  '            t = roll[j];',
  '            roll[j] = roll[j + 1];',
  '            roll[j + 1] = t;',
  '        }',
  '    }',
  '}',
  'for (int k = 0; k < n; k++)',
  '    System.out.println(roll[k] + " " + mark[k]);',
);
Q('s_sort_parallel', short({
  t: [4, 5], d: 4, c: 'analysis', marks: 2,
  stem: 'The arrays roll and mark hold the roll numbers and marks of 4 students, with roll[i] belonging to mark[i]. Write the sorting part of a program that arranges the marks in descending order and keeps every roll number with its mark.',
  model: `Whenever two marks are exchanged, the two roll numbers at the same positions must be exchanged as well, otherwise the pairs would be broken.\n\n${F(cParallel)}\n\nThe output, roll number and mark on each line, is:\n\n\`\`\`\n${out(cParallel)}\n\`\`\``,
  sol: 'A descending bubble sort on the marks with a second swap on the roll numbers inside the same if block.',
  scheme: [['Descending test on mark (mark[j] < mark[j + 1]) with a correct swap of the marks', 1], ['The roll numbers swapped together with the marks, in the same block', 1]],
}));
