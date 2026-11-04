// CBSE 11 Economics, ch03 Organisation of Data: question bank and the computed frequency tables. Every data set below
// (marks, wages, household sizes, pocket money, vehicles, study hours, firms) is imagined and written for this chapter.
// No real statistics are used. Every count, class mark, width and cumulative frequency is computed in code from the raw
// lists and pinned with check() or assert, then interpolated into the text.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, rnd, check, cumulative } from '../../cbse-11-economics-ch01/src/stats.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- helpers
export const tally = (n) => [...Array(Math.floor(n / 5)).fill('IIII/'), ...(n % 5 ? ['I'.repeat(n % 5)] : [])].join(' ');
export const f1 = (x) => rnd(x, 1).toFixed(1);
export const inr = (x) => x.toLocaleString('en-IN');
/** Exclusive classes [l, u): counts, class marks, widths, cumulative "less than" and "more than" frequencies. */
export function makeTable(data, classes) {
  const N = data.length;
  const f = classes.map(([l, u]) => data.filter((x) => x >= l && x < u).length);
  assert.equal(sum(f), N, 'frequencies must add up to the number of observations');
  const cf = cumulative(f);
  const more = classes.map(([l]) => data.filter((x) => x >= l).length);
  more.forEach((m, i) => assert.equal(m, N - (i ? cf[i - 1] : 0), 'more-than count'));
  return {
    data, N, classes, f, cf, more,
    lo: classes.map((c) => c[0]),
    hi: classes.map((c) => c[1]),
    w: classes.map(([l, u]) => u - l),
    mid: classes.map(([l, u]) => (l + u) / 2),
    label: classes.map(([l, u]) => `${l} to ${u}`),
    tal: f.map(tally),
    min: Math.min(...data), max: Math.max(...data), range: Math.max(...data) - Math.min(...data),
  };
}
/** Adjusts inclusive classes [l, u] to exclusive form: half the gap is taken off the lower and put on the upper limits. */
export function adjustInclusive(inc) {
  const gap = inc[1][0] - inc[0][1];
  inc.forEach((c, i) => i && assert.equal(c[0] - inc[i - 1][1], gap, 'equal gaps'));
  const half = gap / 2;
  return { gap, half, adj: inc.map(([l, u]) => [l - half, u + half]) };
}

// ---------------------------------------------------------------- imagined data sets
// 1. Unit-test marks (out of 100) of 40 students of the imagined Saraswati Vidyalaya.
export const MARKS = [47, 62, 35, 78, 55, 68, 42, 81, 59, 73, 64, 38, 52, 91, 66, 45, 70, 57, 83, 49, 61, 34, 76, 58, 67, 44, 88, 53, 71, 63, 40, 69, 56, 75, 48, 65, 96, 60, 51, 72];
export const M = makeTable(MARKS, [30, 40, 50, 60, 70, 80, 90].map((l) => [l, l + 10]));
export const MI = M.classes.map(([l, u]) => [l, u - 1]); // inclusive form 30-39, 40-49, ...
export const MA = adjustInclusive(MI);
MA.adj.forEach((c, i) => {
  assert.deepEqual(c, [M.lo[i] - 0.5, M.hi[i] - 0.5], 'adjusted inclusive classes');
  assert.equal(MARKS.filter((x) => x >= MI[i][0] && x <= MI[i][1]).length, M.f[i], 'inclusive and exclusive counts agree');
});
check(M.N, 40, 0, 'students');
assert.deepEqual(M.f, [3, 7, 8, 10, 7, 3, 2]);
assert.deepEqual(M.cf, [3, 10, 18, 28, 35, 38, 40]);
assert.deepEqual(M.more, [40, 37, 30, 22, 12, 5, 2]);
check(M.min, 34, 0, 'lowest mark');
check(M.max, 96, 0, 'highest mark');
check(M.range, 62, 0, 'range of the marks');
check(MA.gap, 1, 0, 'gap between inclusive classes');
check(MA.half, 0.5, 1, 'half the gap');
// loss of information: the sum of marks in the class 30 to 40, actual and as represented by the class mark
export const lossActual = sum(MARKS.filter((x) => x >= 30 && x < 40));
export const lossApprox = M.mid[0] * M.f[0];
check(lossActual, 107, 0, 'actual total of the lowest class');
check(lossApprox, 105, 0, 'total from the class mark');
export const totalActual = sum(MARKS);
export const totalApprox = sum(M.mid.map((m, i) => m * M.f[i]));
export const totalDiff = totalApprox - totalActual;

// 2. Daily wages (Rs) of 30 workers of the imagined Sunrise Brick Works.
export const WAGES = [240, 285, 310, 265, 350, 420, 295, 330, 275, 380, 255, 305, 340, 290, 360, 235, 315, 270, 400, 325, 300, 345, 280, 250, 455, 310, 370, 260, 335, 320];
export const W = makeTable(WAGES, [200, 250, 300, 350, 400, 450].map((l) => [l, l + 50]));
assert.deepEqual(W.f, [2, 10, 11, 4, 2, 1]);
check(W.range, 220, 0, 'range of the wages');
export const wNumClasses = Math.ceil(W.range / 50);
check(wNumClasses, 5, 0, 'classes needed for width 50 over the wage range');
export const wStartClasses = Math.floor((W.max - W.lo[0]) / 50) + 1;
check(wStartClasses, 6, 0, 'classes of width 50 from 200 to cover 455');
assert.equal(wStartClasses, W.classes.length);
export const wRawWidth = W.range / 5;
check(wRawWidth, 44, 0, 'width from range / 5 classes');
// unequal classes with an open-ended last class: below 250, 250 to 300, 300 to 350, 350 to 400, 400 and above
export const WU = [[-Infinity, 250], [250, 300], [300, 350], [350, 400], [400, Infinity]];
export const wuF = WU.map(([l, u]) => WAGES.filter((x) => x >= l && x < u).length);
assert.equal(sum(wuF), 30);
assert.deepEqual(wuF, [2, 10, 11, 4, 3]);
export const wUnder300 = wuF[0] + wuF[1];
check(wUnder300, 12, 0, 'workers earning under 300');
export const wUnder300pct = (wUnder300 / W.N) * 100;
check(wUnder300pct, 40, 0, 'per cent of workers under 300');

// 3. Household sizes of 36 households of the imagined Palash Nagar colony (discrete variable).
export const HH = [4, 3, 5, 2, 4, 6, 3, 4, 5, 7, 2, 4, 3, 5, 4, 1, 6, 4, 3, 5, 8, 4, 3, 2, 5, 4, 6, 3, 4, 5, 3, 4, 2, 5, 4, 3];
export const HV = [1, 2, 3, 4, 5, 6, 7, 8];
export const HF = HV.map((v) => HH.filter((x) => x === v).length);
assert.equal(sum(HF), HH.length);
assert.deepEqual(HF, [1, 4, 8, 11, 7, 3, 1, 1]);
export const HCF = cumulative(HF);
export const HN = HH.length;
check(HN, 36, 0, 'households');
export const hhAtMost4 = HCF[3];
check(hhAtMost4, 24, 0, 'households with at most 4 members');
export const hhMore = HV.map((v) => HH.filter((x) => x >= v).length);
export const hhAtLeast6 = hhMore[5];
check(hhAtLeast6, 5, 0, 'households with at least 6 members');
export const hhTal = HF.map(tally);

// 4. Weekly pocket money (Rs) of 25 students of the imagined Kaveri Public School.
export const POCKET = [15, 32, 48, 22, 5, 37, 41, 28, 19, 55, 12, 26, 33, 45, 8, 39, 24, 31, 17, 50, 35, 29, 42, 21, 58];
export const P = makeTable(POCKET, [0, 10, 20, 30, 40, 50].map((l) => [l, l + 10]));
assert.deepEqual(P.f, [2, 4, 6, 6, 4, 3]);
assert.deepEqual(P.more, [25, 23, 19, 13, 7, 3]);

// 5. Vehicles owned by each of 30 families of the imagined Gulmohar Apartments (discrete variable).
export const VEH = [1, 2, 0, 1, 3, 2, 1, 1, 2, 0, 1, 2, 2, 4, 1, 0, 2, 1, 3, 1, 2, 1, 1, 0, 2, 2, 1, 3, 1, 2];
export const VV = [0, 1, 2, 3, 4];
export const VF = VV.map((v) => VEH.filter((x) => x === v).length);
assert.deepEqual(VF, [4, 12, 10, 3, 1]);
assert.equal(sum(VF), VEH.length);
export const vAtLeast2 = VF.slice(2).reduce((a, b) => a + b, 0);
check(vAtLeast2, 14, 0, 'families with at least two vehicles');

// 6. Weekly study hours of 30 students of the imagined Tarini Academy, in inclusive classes 0-4, 5-9, ...
export const STUDY = [3, 8, 12, 17, 5, 9, 14, 21, 6, 11, 18, 2, 10, 13, 7, 16, 4, 19, 12, 9, 23, 15, 8, 11, 1, 14, 20, 6, 10, 12];
export const STI = [[0, 4], [5, 9], [10, 14], [15, 19], [20, 24]];
export const STA = adjustInclusive(STI);
export const STF = STI.map(([l, u]) => STUDY.filter((x) => x >= l && x <= u).length);
export const STM = STI.map(([l, u]) => (l + u) / 2);
export const STAM = STA.adj.map(([l, u]) => (l + u) / 2);
assert.deepEqual(STF, [4, 8, 10, 5, 3]);
assert.deepEqual(STM, STAM, 'class marks agree before and after adjustment');
assert.equal(sum(STF), 30);

// 7. Bivariate: advertisement spending and sales (Rs lakh) of 30 firms of the imagined Meghna Industrial Estate.
export const PAIRS = [[2, 12], [3, 18], [4, 15], [1, 10], [6, 25], [7, 32], [8, 28], [5, 22], [9, 38], [11, 45], [12, 52], [10, 41], [13, 55], [14, 48], [3, 24], [6, 30], [8, 44], [2, 16], [12, 36], [9, 26], [4, 35], [7, 21], [11, 58], [13, 42], [5, 14], [10, 29], [14, 57], [1, 19], [6, 43], [8, 33]];
export const AD = [[0, 5], [5, 10], [10, 15]];
export const SA = [[0, 20], [20, 40], [40, 60]];
export function bivariate(pairs) {
  const cells = AD.map(([al, au]) => SA.map(([sl, su]) => pairs.filter(([a, s]) => a >= al && a < au && s >= sl && s < su).length));
  const rows = cells.map((r) => sum(r));
  const cols = SA.map((_, j) => sum(cells.map((r) => r[j])));
  assert.equal(sum(rows), pairs.length);
  assert.equal(sum(cols), pairs.length);
  return { cells, rows, cols, n: pairs.length };
}
export const BV = bivariate(PAIRS);
assert.deepEqual(BV.cells, [[6, 2, 0], [1, 9, 2], [0, 2, 8]]);
assert.deepEqual(BV.rows, [8, 12, 10]);
assert.deepEqual(BV.cols, [7, 13, 10]);
export const BV15 = bivariate(PAIRS.slice(0, 15));
assert.deepEqual(BV15.cells, [[4, 1, 0], [0, 5, 0], [0, 0, 5]]);
export const pairsText = (ps) => ps.map(([a, s]) => `(${a}, ${s})`).join(', ');
export const adLabel = AD.map(([l, u]) => `${l} to ${u}`);
export const saLabel = SA.map(([l, u]) => `${l} to ${u}`);

// a small list used in a discrete-table item: 15 families of the imagined Orchid Heights, children per family
export const KIDS = [2, 1, 3, 2, 0, 2, 1, 4, 2, 1, 3, 2, 0, 1, 2];
export const KV = [0, 1, 2, 3, 4];
export const KF = KV.map((v) => KIDS.filter((x) => x === v).length);
assert.deepEqual(KF, [2, 4, 6, 2, 1]);
assert.equal(sum(KF), KIDS.length);
// tally parsing: 'IIII/ IIII/ II' stands for 12
export const tallyValue = (t) => t.split(' ').reduce((s, g) => s + (g === 'IIII/' ? 5 : g.length), 0);
assert.equal(tallyValue(tally(12)), 12);
assert.equal(tally(12), 'IIII/ IIII/ II');
export const T13 = tally(13);
export const T12 = tally(12);
check(tallyValue(T13), 13, 0, 'tally of 13');

// ---------------------------------------------------------------- t01 objective items (multiple choice)
Q('m_raw_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `The unit-test marks of ${M.N} students of the imagined Saraswati Vidyalaya are written down in the order in which the answer scripts were collected, with no grouping at all. Such a list is called`,
  opts: ['raw data', 'a frequency distribution', 'a cumulative frequency table', 'a bivariate table'],
  sol: `A list in collection order, not arranged or grouped, is raw (unorganised) data. A frequency distribution shows classes and their frequencies, which this list does not. Cumulative and bivariate tables are further ways of organising data.`,
}));
Q('m_classif_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In statistics, classification of data means',
  opts: ['arranging data into groups or classes according to common characteristics', 'collecting data from every unit of a population', 'drawing a diagram from a table of figures', 'finding the average of a set of values'],
  sol: `Classification sorts the observations into groups that share a characteristic. Collecting from every unit is a census, drawing diagrams is presentation, and averaging is an analysis step.`,
}));
Q('m_chrono', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The imagined Dhanvi Stationery Mart lists its total sales for each month from April to March in a single table. The data are classified',
  opts: ['chronologically', 'spatially', 'qualitatively', 'quantitatively'],
  sol: `The figures are arranged by time period, month after month, so the classification is chronological. Spatial classification groups by place, qualitative by attribute, and quantitative by size of the value.`,
}));
Q('m_spatial', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined report gives the tea output of the Nilgiri Hills estate, the Brahmaputra estate and the Dooars estate side by side. The classification is',
  opts: ['spatial, based on place', 'chronological, based on time', 'qualitative, based on an attribute', 'quantitative, based on magnitude'],
  sol: `The groups are the estates, that is, places, so the classification is spatial. Time periods would make it chronological; here no time is involved.`,
}));
Q('m_qualitative', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The children of the imagined Palash Nagar colony are grouped by how they reach school: on foot, by cycle or by bus. This is',
  opts: ['qualitative classification, by an attribute', 'quantitative classification, by magnitude', 'chronological classification', 'spatial classification'],
  sol: `The mode of travel is a quality or attribute that cannot be measured in numbers, so grouping by it is qualitative classification. Quantitative grouping would need a measured size such as distance or time.`,
}));
Q('m_quantitative', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The ${W.N} workers of the imagined Sunrise Brick Works are grouped into daily wage bands of ${W.label[0]}, ${W.label[1]}, ${W.label[2]} and so on, in rupees. This is`,
  opts: ['quantitative classification, by magnitude', 'qualitative classification, by attribute', 'chronological classification', 'spatial classification'],
  sol: `The wage is a measured quantity and the bands are ranges of its size, which is quantitative classification. The grouping uses neither time nor place nor an attribute such as skill.`,
}));
Q('m_variable_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In statistics, a variable is',
  opts: ['a characteristic whose value changes from one unit to another', 'a value that stays the same for all units', 'a table that groups observations into classes', 'the number of units in the population'],
  sol: `A variable is any characteristic that takes different values across the units studied, for example marks or household size. A quantity that never changes is a constant. A table and a count of units are different ideas.`,
}));
Q('m_cont', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which one of these variables is continuous?',
  opts: ['the weight of a sack of rice from the imagined Haripur mill', 'the number of children in a family', 'the number of cars owned by a household', 'the number of goals scored in a match'],
  sol: `A continuous variable can take any value within a range, and weight can be 49.5 kg, 49.73 kg and so on. The other three are counts and take only whole-number values, so they are discrete.`,
}));
Q('m_disc', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The number of vehicles owned by each of ${VEH.length} families of the imagined Gulmohar Apartments is recorded. This variable is`,
  opts: ['discrete, because it takes only whole-number values', 'continuous, because it can take any value in a range', 'continuous, because vehicles differ in size', 'neither, because it is an attribute'],
  sol: `A family owns 0, 1, 2 vehicles and so on; it cannot own 1.5 vehicles. A variable that takes only certain separate values, usually whole numbers, is discrete. Vehicle size is irrelevant, because the variable counts vehicles.`,
}));
Q('m_freqdist_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A frequency distribution is a table that shows',
  opts: ['how the values of a variable are spread over classes, with the number of observations in each', 'only the total number of observations', 'the arithmetic mean of the observations', 'the order in which the observations were collected'],
  sol: `It lists the classes (or values) of the variable and the frequency of each. The total, the mean and the collection order are not what the table is built to show.`,
}));
Q('m_class_interval', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `In the marks table of Saraswati Vidyalaya the class ${M.label[2]} has a lower limit of ${M.lo[2]} and an upper limit of ${M.hi[2]}. Its class interval is`,
  opts: [`${M.w[2]}`, `${M.hi[2]}`, `${M.mid[2]}`, `${M.lo[2] + M.hi[2]}`],
  sol: `Class interval = upper limit minus lower limit = ${M.hi[2]} − ${M.lo[2]} = ${M.w[2]}. The value ${M.mid[2]} is the class mark, and ${M.hi[2]} is only the upper limit.`,
}));
Q('m_class_mark', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `For the wage class ${W.label[2]} of the Sunrise Brick Works table (rupees per day), the class mark is`,
  opts: [`Rs ${W.mid[2]}`, `Rs ${W.w[2]}`, `Rs ${W.lo[2]}`, `Rs ${W.hi[2]}`],
  sol: `Class mark = (upper limit + lower limit) ÷ 2 = (${W.hi[2]} + ${W.lo[2]}) ÷ 2 = ${W.mid[2]}. The value ${W.w[2]} is the width, and the other two are the limits.`,
}));
Q('m_exclusive', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The marks classes of Saraswati Vidyalaya are exclusive: ${M.label[0]}, ${M.label[1]}, ${M.label[2]} and so on. A student who scored exactly ${M.lo[3]} is counted in the class`,
  opts: [`${M.label[3]}, because the upper limit of ${M.label[2]} is excluded`, `${M.label[2]}, because the upper limit is included`, 'both classes', 'neither class'],
  sol: `In exclusive classes the upper limit is not part of the class, so ${M.lo[3]} belongs to the next class, ${M.label[3]}, where it is the lower limit. Counting it twice or not at all would make the total of the frequencies wrong.`,
}));
Q('m_inclusive', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Classes written as ${MI[0][0]}–${MI[0][1]}, ${MI[1][0]}–${MI[1][1]}, ${MI[2][0]}–${MI[2][1]} are called inclusive because`,
  opts: ['both the lower and the upper limit of a class belong to that class', 'the upper limit of a class is left out of that class', 'the classes overlap', 'they have no lower limit'],
  sol: `In an inclusive class an observation equal to either limit is counted in it, so the next class starts one unit later. In an exclusive class the upper limit is left out. The classes do not overlap here, and each has both limits.`,
}));
Q('m_adjust', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The inclusive classes ${MI[0][0]}–${MI[0][1]}, ${MI[1][0]}–${MI[1][1]}, ${MI[2][0]}–${MI[2][1]} are to be adjusted to exclusive form. The adjusted class ${MI[1][0]}–${MI[1][1]} becomes`,
  opts: [`${MA.adj[1][0]} to ${MA.adj[1][1]}`, `${MI[1][0]} to ${MI[2][0]}`, `${MI[1][0] - MA.gap} to ${MI[1][1] + MA.gap}`, `${MI[1][0] + MA.half} to ${MI[1][1] - MA.half}`],
  sol: `The gap between ${MI[0][1]} and ${MI[1][0]} is ${MA.gap}; half of it is ${MA.half}. Subtract ${MA.half} from each lower limit and add ${MA.half} to each upper limit: ${MI[1][0]} − ${MA.half} = ${MA.adj[1][0]} and ${MI[1][1]} + ${MA.half} = ${MA.adj[1][1]}. Taking away or adding the whole gap, or shifting inwards, does not close the gaps correctly.`,
}));
Q('m_ncl', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A researcher groups the daily wages of 30 workers into only two very wide classes. The main drawback of this choice is that',
  opts: ['too much of the pattern in the data is hidden, because many values are lumped together', 'the total of the frequencies no longer equals the number of workers', 'the class marks cannot be found', 'the data stop being quantitative'],
  sol: `Very few classes hide the shape of the distribution; too many classes make the table nearly as long as the raw list. The frequencies still add up to the number of workers, class marks can still be found, and the data remain quantitative.`,
}));
Q('m_width_choice', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The highest daily wage in the Sunrise Brick Works list is Rs ${W.max} and the lowest is Rs ${W.min}, a range of Rs ${W.range}. The owner wants about ${wNumClasses} classes. A convenient class width is`,
  opts: [`Rs ${W.w[0]}, a round figure close to ${wRawWidth}`, `Rs ${W.range}, the range itself`, `Rs ${wNumClasses}, the number of classes`, `Rs ${W.range / 10}, the width for ten classes`],
  sol: `Range ÷ number of classes = ${W.range} ÷ ${wNumClasses} = ${wRawWidth}, so a width near that value is wanted, and a round Rs ${W.w[0]} is convenient and covers the whole range in ${wNumClasses} classes. A width equal to the range gives one class, and a width of ${W.range / 10} gives about ten classes.`,
}));
Q('m_unequal', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Unequal class intervals are most suitable when',
  opts: ['most observations lie in a narrow part of the range and only a few are spread far out', 'all the observations are equally spread over the range', 'the variable is an attribute', 'the number of observations is below ten'],
  sol: `Narrow classes where the values are crowded and wide classes in the thin tail show the pattern without many empty classes. If the values are evenly spread, equal classes serve. Attributes and tiny data sets are not what decides the class widths.`,
}));
Q('m_openended', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `In a table of the Sunrise Brick Works wages, the last class is written as 400 and above. Which statement about it is correct?`,
  opts: ['It is an open-ended class, so its class mark cannot be found without assuming a limit', 'It is an exclusive class with a class mark of 400', 'It is an inclusive class with a width of 400', 'It is a class with no observations'],
  sol: `A class with no stated upper limit is open-ended, so the usual (upper + lower) ÷ 2 cannot be applied without assuming a limit. It is not a class mark of 400, its width is unknown, and it may well contain workers.`,
}));
Q('m_tally', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `A student counts the households of Palash Nagar with ${HV[3]} members by tally marks and writes ${tally(HF[3])}. The number of such households is`,
  opts: [`${HF[3]}`, `${HF[3] - 1}`, `${HF[3] + 1}`, `${tally(HF[3]).split(' ').length}`],
  sol: `Each complete group IIII/ stands for five (four strokes crossed by a fifth) and each single stroke for one. ${tally(HF[3])} gives ${tally(HF[3]).split(' ').filter((g) => g === 'IIII/').length} × 5 + ${HF[3] % 5} = ${tallyValue(tally(HF[3]))}. Counting the groups alone gives ${tally(HF[3]).split(' ').length}, which is wrong.`,
}));
Q('m_loss', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'When raw marks are grouped into classes, which of these is lost?',
  opts: ['the individual values within each class', 'the total number of observations', 'the lower limit of every class', 'the frequency of every class'],
  sol: `Once data are in classes, we know only how many observations fall in each class, not the exact values. The total, the limits and the frequencies are all still shown in the table.`,
}));
Q('m_discrete_freq', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `A table lists the household sizes ${HV[0]}, ${HV[1]}, ${HV[2]} up to ${HV[7]} of the Palash Nagar colony and, beside each, the number of households of that size. This is`,
  opts: ['a discrete (ungrouped) frequency distribution', 'a grouped frequency distribution with open-ended classes', 'a cumulative frequency distribution', 'a bivariate frequency distribution'],
  sol: `Each separate value of a discrete variable has its own frequency, with no classes formed, so the table is a discrete or ungrouped frequency distribution. A grouped table would have class intervals, and a bivariate table would involve a second variable.`,
}));
Q('m_choose_ungrouped', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `The number of vehicles per family in Gulmohar Apartments takes only the values ${VV.join(', ')}. For presenting these ${VEH.length} observations, the better choice is`,
  opts: ['a discrete frequency distribution with one row for each value', 'a grouped table with classes of width 10', 'a table with one class holding all the values', 'no table, because the values are too few'],
  sol: `With only ${VV.length} distinct values, a row for each value loses nothing and is short. Classes of width 10 or a single class would hide every difference, and a table is still useful for so few distinct values.`,
}));
Q('m_bivariate', mcq({
  t: 1, d: 2, c: 'application',
  stem: `A table classifies the ${BV.n} firms of the imagined Meghna Industrial Estate at the same time by their advertisement spending and by their sales. It is`,
  opts: ['a bivariate frequency distribution', 'a univariate frequency distribution', 'a chronological series', 'a list of raw data'],
  sol: `Classifying the same units on two variables at once gives a two-way, bivariate frequency distribution. A univariate table would use one variable, and the table is organised, not raw.`,
}));
Q('m_cumulative', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The "less than" cumulative frequency of a class is the number of observations',
  opts: ['below the upper limit of that class', 'in that class alone', 'at or above the lower limit of that class', 'in the classes after it'],
  sol: `It adds the frequency of the class to those of all earlier classes, so it counts every observation below the upper limit. The frequency of the class alone is the simple frequency, and the count at or above the lower limit is the "more than" cumulative frequency.`,
}));
Q('m_more_than', mcq({
  t: 1, d: 3, c: 'application',
  stem: `In the Saraswati Vidyalaya marks table, ${M.cf[2]} students scored below ${M.hi[2]}. Out of ${M.N} students, the number who scored ${M.lo[3]} or more is`,
  opts: [`${M.more[3]}`, `${M.cf[2]}`, `${M.f[3]}`, `${M.more[2]}`],
  sol: `Students at ${M.lo[3]} or above = total − those below ${M.hi[2]} = ${M.N} − ${M.cf[2]} = ${M.more[3]}. The number ${M.cf[2]} is the "less than" figure and ${M.f[3]} is the frequency of one class.`,
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_exclusive_adjust', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `Inclusive classes such as ${MI[0][0]}–${MI[0][1]} and ${MI[1][0]}–${MI[1][1]} are adjusted to exclusive form when the variable is continuous.`,
  r: `A continuous value such as ${MA.adj[0][1]} would otherwise fall in the gap between ${MI[0][1]} and ${MI[1][0]} and belong to no class.`,
  sol: `Both are true, and R is the reason. For a continuous variable the gap between the upper limit of one class and the lower limit of the next must be closed, otherwise values lying in the gap cannot be placed.`,
}));
Q('ar_cum_total', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `In the marks table of Saraswati Vidyalaya the "less than" cumulative frequency of the last class is ${M.cf[M.cf.length - 1]}, the total number of students.`,
  r: 'Every observation lies below the upper limit of the last class.',
  sol: `Both are true. The cumulative count for the last class includes every observation, because all of them lie below its upper limit, which is why it equals the total.`,
}));
Q('ar_loss', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Grouping raw data into a frequency distribution loses some information.',
  r: 'After grouping, only the class and its frequency are known, not the separate values inside the class.',
  sol: `Both are true, and R explains A: the exact observations are replaced by a class and a count, which is where the information is lost.`,
}));
Q('ar_discrete', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'A-false-R-true',
  a: `The number of vehicles owned by a family of Gulmohar Apartments is a continuous variable.`,
  r: 'The number of vehicles takes only whole-number values.',
  sol: `A is false: a variable that takes only separate whole values is discrete. R is true, and it is the very reason the variable is discrete rather than continuous.`,
}));
Q('ar_equal_width', ar({
  t: 1, d: 3, c: 'evaluation', verdict: 'A-false-R-true',
  a: 'The classes of a frequency distribution must always have the same width.',
  r: 'Equal class widths make the frequencies of different classes directly comparable.',
  sol: `A is false: unequal widths are allowed, for example when the values are crowded in one part of the range or the last class is open-ended. R is true, and equal widths are preferred when the data allow, but they are not compulsory.`,
}));
Q('ar_tally', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Tally marks help count the frequency of each class while going through raw data once.',
  r: 'In tally marks, every sixth stroke is drawn across the previous five.',
  sol: `A is true: one stroke per observation, read off in a single pass. R is false: the fifth stroke is drawn across the four before it, and each group then stands for five.`,
}));

// ---------------------------------------------------------------- true-false
Q('tf_sorted', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: `True or false? Writing the ${M.N} Saraswati Vidyalaya marks in ascending order gives a frequency distribution.`,
  sol: `Sorting only rearranges the raw values, giving an array. A frequency distribution needs classes (or distinct values) with a count for each.`,
}));
Q('tf_exclusive', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: `True or false? In the exclusive classes ${P.label[1]} and ${P.label[2]}, a pocket money of exactly Rs ${P.lo[2]} is counted in the class ${P.label[2]}.`,
  sol: `The upper limit ${P.hi[1]} of the first class is excluded, and the value is the lower limit of ${P.label[2]}, so it is counted there.`,
}));
Q('tf_bivariate', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: 'True or false? A bivariate frequency distribution classifies the same units on two variables in a two-way table.',
  sol: `That is the definition: one variable runs down the rows and the other across the columns, and each cell gives the number of units with that pair of classes.`,
}));

// ---------------------------------------------------------------- fill in the blanks
Q('fb_interval', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The class interval, or width, of a class is the upper limit minus the ___ limit.',
  acc: [['lower']],
  sol: 'Width = upper limit − lower limit, so the lower limit is subtracted.',
}));
Q('fb_mark', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The value halfway between the lower and the upper limit of a class is its class ___.',
  acc: [['mark', 'mid-value', 'mid value', 'midpoint', 'mid-point']],
  sol: 'It is the class mark (mid-value), found as (upper + lower) ÷ 2.',
}));
Q('fb_types', fb({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'The weight of a bag of rice is a ___ variable, while the number of children in a family is a ___ variable.',
  acc: [['continuous'], ['discrete']],
  sol: 'Weight can take any value in a range, so it is continuous; the count of children takes only whole values, so it is discrete.',
}));

// ---------------------------------------------------------------- match
Q('mt_classif', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each imagined arrangement of data with the kind of classification it shows.',
  pairs: [
    ['A factory lists its output month by month for a year', 'Chronological'],
    ['A company lists its sales state by state', 'Spatial'],
    ['Employees are sorted as skilled or unskilled', 'Qualitative'],
    ['Employees are placed in monthly salary bands', 'Quantitative'],
  ],
  sol: 'Time order is chronological, place is spatial, an attribute is qualitative, and ranges of a measured value are quantitative.',
}));
Q('mt_terms', match({
  t: 1, d: 3, c: 'application',
  stem: `For the class ${M.label[2]} of the Saraswati Vidyalaya marks table, match each description with the term.`,
  pairs: [
    [`The pair of values ${M.lo[2]} and ${M.hi[2]}`, 'Class limits'],
    [`The value ${M.w[2]}, found as ${M.hi[2]} − ${M.lo[2]}`, 'Class interval'],
    [`The value ${M.mid[2]}, midway between the limits`, 'Class mark'],
    [`The count ${M.f[2]} of students in the class`, 'Frequency'],
  ],
  sol: `The two end values are the class limits; their difference is the class interval; their average is the class mark; the number of students in the class is the frequency.`,
}));

// ---------------------------------------------------------------- ordering
Q('ord_construct', ord({
  t: 1, d: 3, c: 'understanding',
  stem: 'Arrange the steps of building a grouped frequency distribution from raw marks in a sensible order.',
  items: [
    'Find the highest and lowest values and the range',
    'Decide the number of classes and a convenient class width',
    'Write the class limits so that no value is left out',
    'Go through the raw list once, putting a tally mark against the class of each value',
    'Count the tallies to get frequencies and check that they add up to the number of observations',
  ],
  sol: 'The range guides the choice of classes, the classes must exist before values can be tallied, and the final count is checked against the total.',
}));
Q('ord_adjust', ord({
  t: 1, d: 3, c: 'understanding',
  stem: 'Arrange the steps for converting inclusive classes to exclusive classes in order.',
  items: [
    'Find the gap between the upper limit of one class and the lower limit of the next',
    'Take half of that gap',
    'Subtract the half-gap from every lower limit',
    'Add the half-gap to every upper limit',
    'Check that the upper limit of each class equals the lower limit of the next',
  ],
  sol: 'The size of the correction comes from the gap, which is halved, applied to both limits, and finally verified.',
}));

// ---------------------------------------------------------------- numerical
Q('num_mark', num({
  t: 1, d: 2, c: 'application', value: M.mid[4], unit: 'marks',
  stem: `In the Saraswati Vidyalaya marks table, one class runs from ${M.lo[4]} to ${M.hi[4]} (the upper limit excluded). Find its class mark.`,
  sol: `Class mark = (${M.hi[4]} + ${M.lo[4]}) ÷ 2 = ${M.hi[4] + M.lo[4]} ÷ 2 = ${M.mid[4]} marks.`,
}));
Q('num_freq_marks', num({
  t: 1, d: 2, c: 'application', value: M.f[2], unit: 'students',
  stem: `The marks of ${M.N} students of the imagined Saraswati Vidyalaya are ${MARKS.join(', ')}. How many students scored ${M.lo[2]} or more but less than ${M.hi[2]}?`,
  sol: `Count the values with ${M.lo[2]} ≤ marks < ${M.hi[2]}: ${MARKS.filter((x) => x >= M.lo[2] && x < M.hi[2]).sort((a, b) => a - b).join(', ')}. The count is ${M.f[2]} students.`,
}));
Q('num_cum_less', num({
  t: 1, d: 2, c: 'application', value: M.cf[3], unit: 'students',
  stem: `The ${M.N} students of Saraswati Vidyalaya fall in the classes ${M.label.join(', ')} with frequencies ${M.f.join(', ')} respectively. How many students scored less than ${M.hi[3]}?`,
  sol: `Add the frequencies of the classes up to ${M.label[3]}: ${M.f.slice(0, 4).join(' + ')} = ${M.cf[3]} students.`,
}));
Q('num_cum_more', num({
  t: 1, d: 3, c: 'application', value: P.more[3], unit: 'students',
  stem: `Weekly pocket money of ${P.N} students of the imagined Kaveri Public School is grouped in the classes ${P.label.join(', ')} (rupees) with frequencies ${P.f.join(', ')} respectively. How many students receive Rs ${P.lo[3]} or more a week?`,
  sol: `Add the frequencies of the classes from ${P.label[3]} onwards: ${P.f.slice(3).join(' + ')} = ${P.more[3]} students. Check: ${P.N} − ${P.cf[2]} = ${P.more[3]}.`,
}));
Q('num_adjusted', num({
  t: 1, d: 3, c: 'application', value: MA.adj[2][0], unit: 'marks', tol: 0,
  stem: `Inclusive classes of marks are ${MI.slice(0, 4).map(([l, u]) => `${l}–${u}`).join(', ')}. After adjusting them to exclusive form, what is the lower limit of the class ${MI[2][0]}–${MI[2][1]}?`,
  sol: `Gap = ${MI[2][0]} − ${MI[1][1]} = ${MA.gap}; half-gap = ${MA.half}. Adjusted lower limit = ${MI[2][0]} − ${MA.half} = ${MA.adj[2][0]}.`,
}));
Q('num_pocket', num({
  t: 1, d: 2, c: 'application', value: P.f[2], unit: 'students',
  stem: `The weekly pocket money (rupees) of ${P.N} students of the imagined Kaveri Public School is ${POCKET.join(', ')}. How many students receive Rs ${P.lo[2]} or more but less than Rs ${P.hi[2]}?`,
  sol: `Pick out the values from ${P.lo[2]} up to, but not including, ${P.hi[2]}: ${POCKET.filter((x) => x >= P.lo[2] && x < P.hi[2]).sort((a, b) => a - b).join(', ')}. That is ${P.f[2]} students.`,
}));
Q('num_biv', num({
  t: 1, d: 3, c: 'application', value: BV.cells[1][1], unit: 'firms',
  stem: `The (advertisement spending, sales) pairs, in Rs lakh, of ${BV.n} firms of the Meghna Industrial Estate are ${pairsText(PAIRS)}. How many firms spend Rs ${AD[1][0]} lakh or more but less than Rs ${AD[1][1]} lakh on advertisement and also have sales of Rs ${SA[1][0]} lakh or more but less than Rs ${SA[1][1]} lakh?`,
  sol: `Keep the pairs with advertisement from ${AD[1][0]} to below ${AD[1][1]} and sales from ${SA[1][0]} to below ${SA[1][1]}: ${PAIRS.filter(([a, s]) => a >= AD[1][0] && a < AD[1][1] && s >= SA[1][0] && s < SA[1][1]).map(([a, s]) => `(${a}, ${s})`).join(', ')}. That is ${BV.cells[1][1]} firms.`,
}));
Q('num_hh_cum', num({
  t: 1, d: 2, c: 'application', value: hhAtMost4, unit: 'households',
  stem: `In the imagined Palash Nagar colony the numbers of households with ${HV.join(', ')} members are ${HF.join(', ')} respectively. How many households have at most ${HV[3]} members?`,
  sol: `Cumulate the frequencies up to ${HV[3]} members: ${HF.slice(0, 4).join(' + ')} = ${hhAtMost4} households.`,
}));
Q('num_pct_wages', num({
  t: 1, d: 3, c: 'application', value: wUnder300pct, unit: '%',
  stem: `In an unequal-class table of the ${W.N} Sunrise Brick Works workers, the frequencies of the classes below 250, 250 to 300, 300 to 350, 350 to 400 and 400 and above are ${wuF.join(', ')}. What percentage of the workers earn less than Rs 300 a day?`,
  sol: `Workers below Rs 300 = ${wuF[0]} + ${wuF[1]} = ${wUnder300}. Percentage = ${wUnder300} ÷ ${W.N} × 100 = ${wUnder300pct} per cent.`,
}));
Q('num_veh', num({
  t: 1, d: 3, c: 'application', value: vAtLeast2, unit: 'families',
  stem: `The numbers of families of Gulmohar Apartments owning ${VV.join(', ')} vehicles are ${VF.join(', ')} respectively. How many families own two or more vehicles?`,
  sol: `Add the frequencies for ${VV.slice(2).join(', ')} vehicles: ${VF.slice(2).join(' + ')} = ${vAtLeast2} families.`,
}));
Q('num_classes', num({
  t: 1, d: 3, c: 'application', value: wStartClasses, unit: 'classes',
  stem: `The daily wages of the Sunrise Brick Works workers range from Rs ${W.min} to Rs ${W.max}. Classes of width Rs ${W.w[0]} are formed, starting at the round figure Rs ${W.lo[0]} and written with the upper limit excluded. How many classes are needed to cover every wage?`,
  sol: `The classes run ${W.label.join(', ')}. The highest wage, Rs ${W.max}, falls in ${W.label[W.label.length - 1]}, because it is at least ${W.lo[W.lo.length - 1]} and below ${W.hi[W.hi.length - 1]}. Counting from Rs ${W.lo[0]} in steps of ${W.w[0]}: (${W.max} − ${W.lo[0]}) ÷ ${W.w[0]} = ${(W.max - W.lo[0]) / W.w[0]}, so the whole number part plus one gives ${wStartClasses} classes.`,
}));

// ---------------------------------------------------------------- short answer, 2 marks
Q('s2_raw_class', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What are raw data? Define classification and name its four types.',
  model: `**Raw data** are data as collected, unorganised and in no particular order. **Classification** is arranging data into groups or classes according to common characteristics. The four types are **chronological** (by time), **spatial** (by place), **qualitative** (by attribute) and **quantitative** (by magnitude).`,
  sol: 'Raw data defined; classification defined; four types named.',
  scheme: [['Raw data and classification defined', 1], ['Four types named', 1]],
}));
Q('s2_variable', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish a continuous variable from a discrete variable, giving one imagined example of each from a survey of the families of Orchid Heights.',
  model: `A **continuous variable** can take any value within a range, for example the monthly income of a family. A **discrete variable** takes only certain separate values, usually whole numbers, for example the number of children in a family.`,
  sol: 'Any value in a range versus separate values, with an example of each.',
  scheme: [['Continuous variable with example', 1], ['Discrete variable with example', 1]],
}));
Q('s2_class_mark', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Define class mark. Find the class mark of the class ${M.label[5]} in the Saraswati Vidyalaya marks table.`,
  model: `The **class mark** (mid-value) of a class is the value halfway between its limits, (upper limit + lower limit) ÷ 2. For ${M.label[5]} it is (${M.hi[5]} + ${M.lo[5]}) ÷ 2 = **${M.mid[5]}**.`,
  sol: `Definition and formula, then the computation: ${M.hi[5]} + ${M.lo[5]} = ${M.hi[5] + M.lo[5]}, halved gives ${M.mid[5]}.`,
  scheme: [['Class mark defined', 1], [`Class mark computed as ${M.mid[5]}`, 1]],
}));
Q('s2_excl_incl', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Distinguish exclusive from inclusive classes, using the classes ${P.label[0]}, ${P.label[1]} for pocket money and ${MI[0][0]}–${MI[0][1]}, ${MI[1][0]}–${MI[1][1]} for marks as examples.`,
  model: `In **exclusive** classes such as ${P.label[0]} and ${P.label[1]}, the upper limit is left out and counted in the next class. In **inclusive** classes such as ${MI[0][0]}–${MI[0][1]} and ${MI[1][0]}–${MI[1][1]}, both limits belong to the class, and the next class begins one unit later.`,
  sol: 'Upper limit excluded versus both limits included, each with its example.',
  scheme: [['Exclusive classes explained with example', 1], ['Inclusive classes explained with example', 1]],
}));
Q('s2_tally', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `What are tally marks? Show, using tally marks, the count of ${HF[3]} households with ${HV[3]} members in Palash Nagar, and say how a group of five is drawn.`,
  model: `**Tally marks** are strokes made one per observation while going through raw data, so that frequencies can be counted. Four strokes are crossed by a fifth, shown in text as IIII/. The count ${HF[3]} is written **${tally(HF[3])}**, that is, ${Math.floor(HF[3] / 5)} groups of five and ${HF[3] % 5} single stroke${HF[3] % 5 === 1 ? '' : 's'}.`,
  sol: `Tally marks defined; ${HF[3]} = ${Math.floor(HF[3] / 5)} × 5 + ${HF[3] % 5}, written ${tally(HF[3])}.`,
  scheme: [['Tally marks defined with the group of five', 1], [`Count ${HF[3]} shown correctly`, 1]],
}));
Q('s2_open', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is an open-ended class? Give an example from a wage table and state one difficulty it causes.',
  model: `An **open-ended class** has no lower limit or no upper limit, for example "below 250" or "400 and above" in a table of daily wages. The difficulty is that its **class mark cannot be found** without assuming a limit, so calculations that use class marks become less exact.`,
  sol: 'Meaning with an example, then the problem of finding a class mark.',
  scheme: [['Open-ended class explained with example', 1], ['One difficulty stated', 1]],
}));
Q('s2_freqdist', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: `Define frequency distribution. In a distribution of the ${M.N} marks of Saraswati Vidyalaya, what must the frequencies add up to?`,
  model: `A **frequency distribution** is a table showing how the values of a variable are spread over classes, with the number of observations, the frequency, in each class. The frequencies must add up to **${M.N}**, the total number of students.`,
  sol: `Definition, then total frequency equals the number of observations, ${M.N}.`,
  scheme: [['Frequency distribution defined', 1], [`Total ${M.N} stated`, 1]],
}));
Q('s2_loss', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `The class ${M.label[0]} of the Saraswati Vidyalaya table has ${M.f[0]} students. What can the table not tell you about them, and what does it use to stand for them?`,
  model: `The table does not show the **exact marks** of the ${M.f[0]} students, only that each lies in ${M.label[0]}. It uses the **class mark**, ${M.mid[0]}, to represent all of them, so information is lost.`,
  sol: 'Individual values are lost; the class mark represents the class.',
  scheme: [['Exact values not shown', 1], [`Class mark ${M.mid[0]} used to represent them`, 1]],
}));
Q('s2_cum', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `What is a "less than" cumulative frequency? Find it for the class ${M.label[1]} of the Saraswati Vidyalaya marks table, whose class frequencies are ${M.f.join(', ')}.`,
  model: `The **less than cumulative frequency** of a class is the number of observations below its upper limit, found by adding its frequency to those of all earlier classes. For ${M.label[1]}: ${M.f[0]} + ${M.f[1]} = **${M.cf[1]}** students scored below ${M.hi[1]}.`,
  sol: `Definition and addition: ${M.f[0]} + ${M.f[1]} = ${M.cf[1]}.`,
  scheme: [['Cumulative frequency defined', 1], [`Value ${M.cf[1]} computed`, 1]],
}));
Q('s2_bivariate', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a bivariate frequency distribution? Give an imagined example of two variables for the shops of a market.',
  model: `A **bivariate frequency distribution** is a two-way table that classifies the same units on two variables at once, with the number of units in each combination of classes. For the shops of a market it could classify each shop by **floor area** and by **daily sales**.`,
  sol: 'Two-way table on two variables, with an example.',
  scheme: [['Bivariate distribution defined', 1], ['Suitable example of two variables', 1]],
}));

// ---------------------------------------------------------------- short answer, 3 marks
Q('s3_adjust', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Adjust the inclusive classes ${MI.slice(0, 3).map(([l, u]) => `${l}–${u}`).join(', ')} to exclusive form, showing the gap and the correction.`,
  model: `The gap between the upper limit ${MI[0][1]} and the next lower limit ${MI[1][0]} is **${MA.gap}**, so the correction is half of it, **${MA.half}**. Subtract ${MA.half} from every lower limit and add ${MA.half} to every upper limit. The classes become **${MA.adj.slice(0, 3).map(([l, u]) => `${l}–${u}`).join(', ')}**.`,
  sol: 'Gap, half-gap, then the adjusted limits for all three classes.',
  scheme: [[`Gap ${MA.gap} found`, 1], [`Half-gap ${MA.half} subtracted and added`, 1], ['All three adjusted classes correct', 1]],
}));
Q('s3_types', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name the four types of classification of data and give an imagined example of each.',
  model: `**Chronological:** the monthly sales of a shop over a year. **Spatial:** the rainfall of different districts. **Qualitative:** workers grouped as skilled or unskilled. **Quantitative:** families grouped by income bands. They classify by time, place, attribute and magnitude respectively. Each type answers a different question, namely when, where, what kind or how much, and the type that suits the purpose of the enquiry is the one chosen.`,
  sol: 'Four types, each tied to the basis of grouping and an example.',
  scheme: [['Chronological and spatial with examples', 1], ['Qualitative and quantitative with examples', 1], ['Basis of each type correctly stated', 1]],
}));
Q('s3_width', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The daily wages of the Sunrise Brick Works workers range from Rs ${W.min} to Rs ${W.max}. Find the range, and show how the owner can choose about ${wNumClasses} classes with a convenient class width.`,
  model: `Range = ${W.max} − ${W.min} = **${W.range}**. With ${wNumClasses} classes, the width is about ${W.range} ÷ ${wNumClasses} = ${wRawWidth}. A round width of **Rs ${W.w[0]}** is convenient, giving classes ${W.label[0]}, ${W.label[1]} and so on up to ${W.label[W.label.length - 1]}, which cover every wage.`,
  sol: `Highest minus lowest gives the range; dividing by the number of classes gives a trial width, rounded to a round figure.`,
  scheme: [[`Range ${W.range} found`, 1], [`Trial width ${wRawWidth} found`, 1], [`Convenient width ${W.w[0]} chosen with classes`, 1]],
}));
Q('s3_discrete_table', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The numbers of children in ${KIDS.length} families of the imagined Orchid Heights are ${KIDS.join(', ')}. Prepare a discrete frequency distribution with tally marks.`,
  model: `**Children: tally, frequency** — ${KV.map((v, i) => `${v}: ${KF[i] ? tally(KF[i]) : '-'}, ${KF[i]}`).join('; ')}. The frequencies add up to ${sum(KF)}, the number of families, which confirms that every family was counted exactly once. A discrete variable with only ${KV.length} distinct values needs no classes, so one row is kept for each value and nothing is lost by grouping.`,
  sol: `One row per value of the variable, tallies counted, and the total checked against ${KIDS.length}.`,
  scheme: [['Rows for each value of the variable', 1], ['Tallies and frequencies correct', 1], [`Total ${sum(KF)} checked`, 1]],
}));
Q('s3_unequal', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `The Sunrise Brick Works workers are grouped as below 250, 250 to 300, 300 to 350, 350 to 400 and 400 and above. State the frequencies, and explain why unequal or open-ended classes may be used.`,
  model: `The frequencies are **${wuF.join(', ')}**, totalling ${sum(wuF)}. Unequal or open-ended classes help when a **few extreme values** lie far from the rest: the crowded middle gets narrow classes, and the thin tails are lumped into wide or open classes so the table does not have many empty classes.`,
  sol: `Frequencies from the counts of wages in each band; extreme values justify wide or open classes.`,
  scheme: [['Frequencies correct', 1], ['Reason: few extreme values', 1], ['Effect on the table explained', 1]],
}));
Q('s3_more', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The ${P.N} students of Kaveri Public School fall in the pocket money classes ${P.label.join(', ')} with frequencies ${P.f.join(', ')}. Find the "more than" cumulative frequency at the lower limit of each class.`,
  model: `Starting from the total ${P.N} at the lowest limit and subtracting the frequency of each class in turn: **${P.lo.map((l, i) => `${l}: ${P.more[i]}`).join('; ')}**. For example, ${P.more[0]} − ${P.f[0]} = ${P.more[1]}. The more than series therefore falls steadily from ${P.more[0]} to ${P.more[P.more.length - 1]}, and the last value equals the frequency of the last class, which serves as a check on the working.`,
  sol: `Start from the total and subtract class frequencies one by one; the last value equals the frequency of the last class, ${P.f[P.f.length - 1]}.`,
  scheme: [['Method (total, then subtract each class)', 1], ['First three values correct', 1], ['All values correct', 1]],
}));

// ---------------------------------------------------------------- long answer, 5 marks
Q('l_construct', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `The weekly pocket money (rupees) of ${P.N} students of the imagined Kaveri Public School is ${POCKET.join(', ')}. Prepare a frequency distribution with classes of width 10 starting at 0 (upper limit excluded), showing tallies, frequencies and class marks.`,
  model: `Range ${P.min} to ${P.max}, so classes of width 10 from 0 to 60 are needed. **Class: tally, frequency, class mark** — ${P.label.map((c, i) => `${c}: ${P.tal[i]}, ${P.f[i]}, ${P.mid[i]}`).join('; ')}. The frequencies add up to ${sum(P.f)}, the number of students.`,
  sol: 'Classes chosen from the range, each value tallied once, tallies counted, class marks found and the total checked.',
  scheme: [['Classes chosen to cover the range', 1], ['Tally marks entered correctly', 1], ['Frequencies correct', 1], ['Class marks correct', 1], [`Total ${P.N} checked`, 1]],
}));
Q('l_cum', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `The ${M.N} students of Saraswati Vidyalaya fall in the classes ${M.label.join(', ')} with frequencies ${M.f.join(', ')}. Prepare the "less than" and the "more than" cumulative frequency distributions, and state how many students scored below ${M.hi[3]}.`,
  model: `**Less than:** ${M.hi.map((u, i) => `below ${u}: ${M.cf[i]}`).join('; ')}. **More than:** ${M.lo.map((l, i) => `${l} or more: ${M.more[i]}`).join('; ')}. So **${M.cf[3]}** students scored below ${M.hi[3]}, and the two series agree: ${M.cf[3]} + ${M.more[3]} = ${M.N}.`,
  sol: 'Add frequencies downwards for less than, subtract them from the total for more than, then check that the two series complete each other.',
  scheme: [['Less than series method', 1], ['Less than values correct', 1], ['More than series method', 1], ['More than values correct', 1], [`Answer ${M.cf[3]} and the check`, 1]],
}));
Q('l_inclusive', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `The weekly study hours of ${STUDY.length} students of the imagined Tarini Academy are grouped in the inclusive classes ${STI.map(([l, u]) => `${l}–${u}`).join(', ')} with frequencies ${STF.join(', ')}. Convert the classes to exclusive form, and find the class marks.`,
  model: `The gap between ${STI[0][1]} and ${STI[1][0]} is ${STA.gap}, so the correction is **${STA.half}**. Adjusted classes: **${STA.adj.map(([l, u], i) => `${l}–${u} (f = ${STF[i]})`).join('; ')}**. Class marks: **${STAM.join(', ')}**, which are the same as the marks found before adjustment. The frequencies are unchanged by the adjustment and still add up to ${sum(STF)}, the number of students. Adjusting only closes the gaps between the classes, so that every possible value of the continuous variable falls in exactly one class, and it leaves the class marks as they were.`,
  sol: 'Gap, half-gap, adjusted limits for every class, and class marks by (upper + lower) ÷ 2.',
  scheme: [['Gap and half-gap found', 1], ['Lower limits corrected', 1], ['Upper limits corrected', 1], ['Class marks correct', 1], [`Total frequency ${sum(STF)} stated`, 1]],
}));
Q('l_types', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain, with an imagined example for each, the four types of classification of data.',
  model: `Classification arranges data into groups with common characteristics. **Chronological** classification groups by time, for example a shop's sales in each month. **Spatial** classification groups by place, for example crop output district by district. **Qualitative** classification groups by an attribute that cannot be measured in numbers, for example workers as skilled or unskilled. **Quantitative** classification groups by the size of a measured value, for example families in income bands. The choice depends on what the enquiry wants to show.`,
  sol: 'Definition, then four types with basis and example, and a closing remark on choice.',
  scheme: [['Classification defined', 1], ['Chronological with example', 1], ['Spatial with example', 1], ['Qualitative with example', 1], ['Quantitative with example', 1]],
}));
Q('l_biv', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `The (advertisement spending, sales) pairs, in Rs lakh, of ${BV15.n} firms of the imagined Meghna Industrial Estate are ${pairsText(PAIRS.slice(0, 15))}. Prepare a bivariate frequency table with advertisement classes ${adLabel.join(', ')} (down) and sales classes ${saLabel.join(', ')} (across), with row and column totals.`,
  model: `**Rows are advertisement, columns are sales (${saLabel.join(' | ')}):** ${adLabel.map((a, i) => `${a}: ${BV15.cells[i].join(', ')} (total ${BV15.rows[i]})`).join('; ')}. **Column totals:** ${BV15.cols.join(', ')}. The grand total is ${BV15.n} firms. Firms spending more on advertisement tend to have higher sales, because the non-zero cells lie along the diagonal. Each of the ${BV15.n} firms is placed in exactly one cell, so the cells add up to the grand total, which checks the tabulation.`,
  sol: 'Place every pair in one cell by both variables, then total rows and columns and check the grand total.',
  scheme: [['Table framed with both sets of classes', 1], ['Pairs placed correctly', 2], ['Row and column totals correct', 1], [`Grand total ${BV15.n} checked`, 1]],
}));
Q('l_loss', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Explain how grouping loses information, using the lowest class ${M.label[0]} of the Saraswati Vidyalaya marks table. The ${M.f[0]} students in it scored ${MARKS.filter((x) => x >= 30 && x < 40).join(', ')}.`,
  model: `In the table the ${M.f[0]} students appear only as a count in the class **${M.label[0]}**, so their exact marks are lost. The class mark **${M.mid[0]}** stands for each of them. Their true total is ${MARKS.filter((x) => x >= 30 && x < 40).join(' + ')} = **${lossActual}**, but the class mark gives ${M.f[0]} × ${M.mid[0]} = **${lossApprox}**, a difference of ${lossActual - lossApprox}. Over all classes the same approximation is made, so results from grouped data are slightly less exact than those from raw data, in exchange for a shorter, clearer table.`,
  sol: 'Exact values vanish; the class mark represents them; computing both totals shows the error.',
  scheme: [['Exact values not shown in the table', 1], ['Class mark used to represent the class', 1], ['True total computed', 1], ['Approximate total computed', 1], ['Conclusion on the trade-off', 1]],
}));

// ---------------------------------------------------------------- case-based
const marksTbl = `| Class (marks) | ${M.label.join(' | ')} |\n|---|${M.label.map(() => '---').join('|')}|\n| Number of students | ${M.f.join(' | ')} |`;
Q('cb_marks', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data table and answer the questions that follow.',
  passage: `**Imagined unit-test marks of ${M.N} students of Saraswati Vidyalaya (out of 100)**\n\n${marksTbl}\n\nThe classes are exclusive: a student with exactly ${M.lo[1]} marks is placed in the class ${M.label[1]}.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Is the grouping of the marks a quantitative or a qualitative classification? Give a reason.', model: `**Quantitative**: the students are grouped by the size of a measured value, the marks.`, sol: 'Marks are measured numbers.', scheme: [['Quantitative with reason', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the class mark of the class 60 to 70.', model: `(${M.hi[3]} + ${M.lo[3]}) ÷ 2 = **${M.mid[3]}**.`, sol: `Average of the limits ${M.lo[3]} and ${M.hi[3]}.`, scheme: [['Class mark', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): How many students scored less than 70? Name this cumulative series.', model: `${M.f.slice(0, 4).join(' + ')} = **${M.cf[3]}** students. It is a **less than** cumulative frequency.`, sol: 'Add the frequencies up to the class 60 to 70.', scheme: [['Sum computed', 1], ['Series named', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): The school reports that no one in the class 90 to 100 scored below 90. Explain what the table cannot tell us about the students in this class.', model: `The table shows only that the **${M.f[6]}** students lie in 90 to 100, not their **exact marks**. Grouping has replaced the individual values by the class and its frequency, so information is lost.`, sol: 'Individual marks inside a class are not recoverable.', scheme: [['Exact marks not shown', 1], ['Grouping loses information', 1]] }),
    ]),
  ],
}));
const wageTbl = `| Daily wage (Rs) | below 250 | 250 to 300 | 300 to 350 | 350 to 400 | 400 and above |\n|---|---|---|---|---|---|\n| Number of workers | ${wuF.join(' | ')} |`;
Q('cb_wages', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined data table and answer the questions that follow.',
  passage: `**Imagined wage table of ${W.N} workers of the Sunrise Brick Works**\n\n${wageTbl}\n\nThe owner says that the first and last classes were left open so that two unusually low and three unusually high wages need not be listed separately.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Name the two open-ended classes in the table.', model: `**Below 250** and **400 and above**.`, sol: 'They lack a lower limit and an upper limit respectively.', scheme: [['Both classes named', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'How many workers earn less than Rs 300 a day?', model: `${wuF[0]} + ${wuF[1]} = **${wUnder300}** workers.`, sol: 'Add the first two classes.', scheme: [['Correct count', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why can the class mark of the last class not be found? What problem does this cause?', model: `The class has **no upper limit**, so (upper + lower) ÷ 2 cannot be applied. Calculations based on class marks must **assume a limit**, which makes them less exact.`, sol: 'No upper limit means no mid-value.', scheme: [['No upper limit, so no class mark', 1], ['Calculations need an assumption', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why are the middle classes of this table equal in width while the end classes are open? Give one advantage.', model: `Most of the workers (${wuF[1] + wuF[2] + wuF[3]} of ${W.N}) lie in the middle classes, so those classes keep an **equal width of 50** to show the pattern clearly, while the few extreme wages are lumped into **open classes**, which keeps the table short.`, sol: 'Crowded middle, thin tails.', scheme: [['Middle classes hold most workers', 1], ['Open ends keep the table short', 1]] }),
    ]),
  ],
}));
const hhTbl = `| Members in the household | ${HV.join(' | ')} |\n|---|${HV.map(() => '---').join('|')}|\n| Number of households | ${HF.join(' | ')} |`;
Q('cb_household', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data table and answer the questions that follow.',
  passage: `**Imagined survey of the households of the Palash Nagar colony**\n\n${hhTbl}`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Is the household size a discrete or a continuous variable? Give a reason.', model: `**Discrete**; it takes only whole-number values.`, sol: 'A household cannot have 3.5 members.', scheme: [['Discrete with reason', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'How many households were surveyed in all?', model: `${HF.join(' + ')} = **${HN}** households.`, sol: 'The frequencies add up to the number of units.', scheme: [['Total', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): How many households have at most 4 members, and how many have 6 or more?', model: `At most 4: ${HF.slice(0, 4).join(' + ')} = **${hhAtMost4}**. Six or more: ${HF.slice(5).join(' + ')} = **${hhAtLeast6}**.`, sol: 'Cumulate up to size 4; add the last three rows for 6 or more.', scheme: [['At most 4 correct', 1], ['Six or more correct', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why is each household size shown as a separate row instead of forming classes such as 1 to 3 and 4 to 6?', model: `The variable takes only **${HV.length} distinct values**, so a row for each loses **no information** and the table stays short. Classes would hide the differences between neighbouring sizes without saving much space.`, sol: 'Few distinct values, so no grouping is needed.', scheme: [['Few distinct values', 1], ['Grouping would lose information needlessly', 1]] }),
    ]),
  ],
}));
const bvTbl = `| Advertisement (Rs lakh) | Sales ${saLabel[0]} | Sales ${saLabel[1]} | Sales ${saLabel[2]} | Total |\n|---|---|---|---|---|\n${AD.map((_, i) => `| ${adLabel[i]} | ${BV.cells[i].join(' | ')} | ${BV.rows[i]} |`).join('\n')}\n| Total | ${BV.cols.join(' | ')} | ${BV.n} |`;
Q('cb_firms', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined data table and answer the questions that follow.',
  passage: `**Imagined two-way table of ${BV.n} firms of the Meghna Industrial Estate (Rs lakh)**\n\n${bvTbl}`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'What kind of frequency distribution is this table?', model: `A **bivariate** frequency distribution: two variables, advertisement and sales.`, sol: 'Two variables classified together.', scheme: [['Bivariate', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `How many firms spend Rs ${AD[1][0]} to ${AD[1][1]} lakh on advertisement?`, model: `The row total is **${BV.rows[1]}** firms.`, sol: 'Read the total of the row.', scheme: [['Row total', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): How many firms in the lowest advertisement class also have the lowest sales class, and what does the pattern of the table suggest?`, model: `**${BV.cells[0][0]}** firms. The larger counts lie along the diagonal, so firms that spend **more on advertisement tend to have higher sales**.`, sol: 'Read the first cell; the diagonal pattern shows a positive association.', scheme: [[`Cell value ${BV.cells[0][0]}`, 1], ['Pattern interpreted', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Does the table prove that advertisement causes higher sales? Explain.', model: `No. The table only shows that high advertisement and high sales **occur together** in the cells; other causes, such as firm size, may affect both, so the table shows **association, not cause**.`, sol: 'A tabulated pattern does not establish causation.', scheme: [['Association, not proof of cause', 1], ['A reason, such as another factor', 1]] }),
    ]),
  ],
}));
