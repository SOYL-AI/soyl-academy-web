// Build CBSE 11 Economics ch03 Organisation of Data. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-economics-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, check } from '../../cbse-11-economics-ch01/src/stats.mjs';

setUnit('cbse-11-economics-ch03', 'economics-commerce');
const Qs = await import('./questions.mjs');
const { MARKS, M, MI, MA, lossActual, lossApprox, totalActual, totalApprox, W, WAGES, wuF, wNumClasses, wRawWidth, wStartClasses, wUnder300, HV, HF, HCF, HN, hhTal, hhAtMost4, hhMore, P, POCKET, STUDY, STI, STA, STF, STAM, BV, AD, SA, adLabel, saLabel, tally, f1 } = Qs;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures (asserted)
check(M.f[2], 8, 0, 'frequency of the class 50 to 60');
check(M.mid[2], 55, 0, 'class mark of 50 to 60');
check(M.cf[3], 28, 0, 'students below 70');
check(M.more[3], 22, 0, 'students with 60 or more');
check(HN, 36, 0, 'households');
check(totalApprox - totalActual, Qs.totalDiff, 2, 'difference of totals');
// figures stated in narration as words
check(M.f[3], 10, 0, 'tallest bar');
check(M.f[6], 2, 0, 'shortest bar');
check(M.cf[2], 18, 0, 'students below 60');
check(HF[3], 11, 0, 'households of four');
check(M.min, 34, 0, 'lowest mark');
check(M.max, 96, 0, 'highest mark');
check(BV.cells[1][1], 9, 0, 'bivariate cell');
check(BV.rows[1], 12, 0, 'bivariate row total');
check(BV.n, 30, 0, 'firms');
check(lossApprox, 105, 0, 'class mark total');
check(lossActual, 107, 0, 'actual total');
check(W.range, 220, 0, 'wage range');
check(wRawWidth, 44, 0, 'trial width');
check(hhAtMost4, 24, 0, 'at most four members');
check(wStartClasses, 6, 0, 'wage classes');
check(M.f[0], 3, 0, 'lowest class');
const sortedFirst10 = [...MARKS.slice(0, 10)].sort((a, b) => a - b);

// ---------------------------------------------------------------- visuals: SVG
const vClassTypes = (() => {
  const s = new Svg(660, 250);
  const boxes = [
    ['Chronological', 'by time', ['Sales of a shop,', 'month by month']],
    ['Spatial', 'by place', ['Crop output,', 'district by district']],
    ['Qualitative', 'by attribute', ['Workers grouped as', 'skilled or unskilled']],
    ['Quantitative', 'by magnitude', ['Families grouped', 'in income bands']],
  ];
  s.text(330, 18, 'Four ways of classifying data', { bold: true, size: 15 });
  boxes.forEach(([t, basis, ex], i) => {
    const x = 12 + i * 162;
    s.rect(x, 38, 150, 190, { fill: 'fill', color: 'accent', sw: 2 });
    s.text(x + 75, 64, t, { bold: true, size: 15, color: 'accent' });
    s.line(x + 12, 82, x + 138, 82, { color: 'muted', sw: 1 });
    s.text(x + 75, 106, 'Basis', { size: 12, muted: true });
    s.text(x + 75, 128, basis, { size: 14, bold: true });
    s.text(x + 75, 156, 'Imagined example', { size: 12, muted: true });
    s.text(x + 75, 178, ex[0], { size: 12 });
    s.text(x + 75, 196, ex[1], { size: 12 });
  });
  return s.visual('Chart of the four types of classification: chronological by time, spatial by place, qualitative by attribute and quantitative by magnitude, each with an imagined example', 'Classification: four bases of grouping');
})();

const vContDisc = (() => {
  const s = new Svg(660, 260);
  s.rect(10, 14, 310, 232, { fill: 'fill', color: 'accent', sw: 2 });
  s.text(165, 36, 'Continuous variable', { bold: true, size: 15, color: 'accent' });
  s.text(165, 60, 'Weight of a rice sack (kg)', { size: 13 });
  s.line(40, 130, 290, 130, { sw: 5, color: 'accent' });
  [48, 49, 50].forEach((v, i) => { const x = 40 + i * 125; s.line(x, 122, x, 138, { sw: 1.6 }); s.text(x, 152, String(v), { size: 13 }); });
  s.text(165, 182, 'Every value on the line is possible,', { size: 12 });
  s.text(165, 200, 'such as 48.6 or 49.27', { size: 12 });
  s.text(165, 228, 'Measured', { size: 13, bold: true });
  s.rect(340, 14, 310, 232, { fill: 'fill', color: 'accent', sw: 2 });
  s.text(495, 36, 'Discrete variable', { bold: true, size: 15, color: 'accent' });
  s.text(495, 60, 'Vehicles owned by a family', { size: 13 });
  s.line(370, 130, 620, 130, { sw: 1.6, color: 'muted' });
  [0, 1, 2, 3, 4].forEach((v, i) => { const x = 380 + i * 55; s.dot(x, 130, 7, 'accent'); s.text(x, 152, String(v), { size: 13 }); });
  s.text(495, 182, 'Only separate whole values,', { size: 12 });
  s.text(495, 200, 'nothing between 1 and 2', { size: 12 });
  s.text(495, 228, 'Counted', { size: 13, bold: true });
  return s.visual('Comparison of a continuous variable, the weight of a rice sack, which can take any value on a line, and a discrete variable, the number of vehicles of a family, which takes only the separate values zero to four', 'Continuous values fill a range; discrete values are separate points');
})();

const vRawToTable = (() => {
  const s = new Svg(680, 330);
  s.text(95, 16, 'Raw marks (first 12 of 40)', { bold: true, size: 13 });
  s.rect(10, 30, 170, 284, { fill: 'fill', color: 'muted', sw: 1.5 });
  MARKS.slice(0, 12).forEach((m, i) => s.text(40 + (i % 3) * 52, 62 + Math.floor(i / 3) * 62, String(m), { size: 16 }));
  s.arrow(188, 172, 244, 172, { sw: 2.2, color: 'accent' });
  s.text(216, 150, 'tally', { size: 12 });
  s.text(216, 196, 'count', { size: 12 });
  const x0 = 252, rowH = 32;
  s.rect(x0, 30, 420, rowH * 9, { color: 'muted', sw: 1.5 });
  s.text(x0 + 55, 46, 'Class', { bold: true, size: 13 });
  s.text(x0 + 205, 46, 'Tally', { bold: true, size: 13 });
  s.text(x0 + 365, 46, 'Frequency', { bold: true, size: 13 });
  s.line(x0, 30 + rowH, x0 + 420, 30 + rowH, { color: 'muted', sw: 1 });
  M.label.forEach((c, i) => {
    const y = 30 + rowH * (i + 1) + rowH / 2;
    s.text(x0 + 55, y, c, { size: 13 });
    s.text(x0 + 205, y, M.tal[i], { size: 13 });
    s.text(x0 + 365, y, String(M.f[i]), { size: 13, bold: true });
  });
  const yt = 30 + rowH * 8 + rowH / 2;
  s.line(x0, 30 + rowH * 8, x0 + 420, 30 + rowH * 8, { color: 'muted', sw: 1 });
  s.text(x0 + 55, yt, 'Total', { bold: true, size: 13 });
  s.text(x0 + 365, yt, String(sum(M.f)), { bold: true, size: 13 });
  return s.visual(`From raw data to a frequency table: the first twelve of ${M.N} raw marks on the left are tallied into the classes ${M.label.join(', ')} with frequencies ${M.f.join(', ')}, totalling ${sum(M.f)}`, 'Raw marks are tallied and counted into a frequency table');
})();

const vBar = (() => {
  const s = new Svg(660, 330);
  const ch = s.chart({ x0: 0, x1: 7, y0: 0, y1: 12, left: 70, top: 28, width: 520, height: 230, xLabel: 'Marks class', yLabel: 'Number of students' });
  M.f.forEach((f, i) => {
    const xa = ch.X(i + 0.1), xb = ch.X(i + 0.9);
    s.rect(xa, ch.Y(f), xb - xa, ch.Y(0) - ch.Y(f), { fill: 'fill', color: 'accent', sw: 1.6, rx: 2 });
    s.text((xa + xb) / 2, ch.Y(f) - 10, String(f), { size: 13, bold: true });
    s.text((xa + xb) / 2, ch.Y(0) + 16, M.label[i].replace(' to ', '-'), { size: 11 });
  });
  [0, 2, 4, 6, 8, 10, 12].forEach((v) => ch.yTick(v, String(v)));
  return s.visual(`Bar chart of the computed frequency distribution of marks of ${M.N} imagined students: frequencies ${M.f.join(', ')} for the classes ${M.label.join(', ')}`, 'Imagined Saraswati Vidyalaya marks: the bars show the frequency of each class');
})();

// ---------------------------------------------------------------- visuals: tables and flows
const vRoute1 = flow('LR', ['Raw data and classification', 'Continuous and discrete variables', 'Class terms', 'Exclusive and inclusive classes', 'Adjusting classes'], 'Route map of Part 1: raw data and classification, continuous and discrete variables, the terms of a frequency distribution, exclusive and inclusive classes, and adjusting inclusive classes', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Discrete distributions', 'Grouped distributions', 'Choosing classes', 'Unequal and open-ended classes', 'Loss of information', 'Bivariate and cumulative tables'], 'Route map of Part 2: discrete distributions, grouped distributions, choosing classes, unequal and open-ended classes, loss of information, and bivariate and cumulative tables', 'Part 2 at a glance');
const vRawOrg = table(
  ['Form of the data', 'First ten marks of the imagined Saraswati Vidyalaya list'],
  [
    ['Raw (as collected)', MARKS.slice(0, 10).join(', ')],
    ['Sorted, still individual values', sortedFirst10.join(', ')],
    ['Organised in classes', `${M.label.slice(0, 3).join(' | ')} | ... with a count for each class`],
  ],
  'Table showing the same imagined marks as raw data, as a sorted list, and as classes with counts',
  'Organising turns a long list into a short table',
);
const vTerms = table(
  ['Term', 'Meaning', `Value for the class ${M.label[2]}`],
  [
    ['Class', 'A group of values of the variable', M.label[2]],
    ['Class limits', 'The lower and the upper end of the class', `${M.lo[2]} and ${M.hi[2]}`],
    ['Class interval (width)', 'Upper limit minus lower limit', `${M.hi[2]} − ${M.lo[2]} = ${M.w[2]}`],
    ['Class mark (mid-value)', '(Upper limit + lower limit) ÷ 2', `(${M.hi[2]} + ${M.lo[2]}) ÷ 2 = ${M.mid[2]}`],
    ['Frequency', 'Number of observations in the class', `${M.f[2]} students`],
  ],
  `Table of the five terms of a frequency distribution applied to the class ${M.label[2]}: limits ${M.lo[2]} and ${M.hi[2]}, interval ${M.w[2]}, class mark ${M.mid[2]} and frequency ${M.f[2]}`,
  'Imagined marks of Saraswati Vidyalaya',
);
const vTermsAll = table(
  ['Class', 'Lower', 'Upper', 'Width', 'Class mark', 'Frequency'],
  [...M.label.map((c, i) => [c, String(M.lo[i]), String(M.hi[i]), String(M.w[i]), String(M.mid[i]), String(M.f[i])]), ['Total', '', '', '', '', String(sum(M.f))]],
  `Table of the seven mark classes of the imagined Saraswati Vidyalaya with lower limit, upper limit, width, class mark and frequency; the frequencies add up to ${sum(M.f)}`,
);
const vExclusive = table(
  ['Exclusive class', 'Which marks belong to it'],
  [
    [M.label[0], `${M.lo[0]} or more, but less than ${M.hi[0]}`],
    [M.label[1], `${M.lo[1]} or more, but less than ${M.hi[1]}`],
    [M.label[2], `${M.lo[2]} or more, but less than ${M.hi[2]}`],
    [`A mark of exactly ${M.lo[1]}`, `goes to ${M.label[1]}, not to ${M.label[0]}`],
  ],
  `Table of exclusive classes ${M.label.slice(0, 3).join(', ')}, showing that a mark equal to an upper limit is counted in the next class`,
);
const vInclusive = table(
  ['Inclusive class', 'Which marks belong to it', 'Gap to the next class'],
  MI.slice(0, 3).map(([l, u], i) => [`${l}–${u}`, `${l} up to and including ${u}`, `${MI[i + 1][0] - u}`]),
  `Table of inclusive classes ${MI.slice(0, 3).map(([l, u]) => `${l}–${u}`).join(', ')} showing that both limits belong to the class and that there is a gap of ${MA.gap} to the next class`,
);
const vAdjust = table(
  ['Inclusive class', 'Gap', 'Half the gap', 'Adjusted class'],
  MI.map(([l, u], i) => [`${l}–${u}`, String(MA.gap), String(MA.half), `${MA.adj[i][0]}–${MA.adj[i][1]}`]),
  `Table adjusting the seven inclusive classes to exclusive form: the gap is ${MA.gap}, half of it is ${MA.half}, and each class becomes, for example, ${MA.adj[0][0]} to ${MA.adj[0][1]}`,
  'Subtract the half-gap from lower limits; add it to upper limits',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Raw data', 'Unorganised, in the order of collection'],
    ['Classification', 'Grouping by common characteristics: time, place, attribute or magnitude'],
    ['Continuous variable', 'Any value in a range; measured'],
    ['Discrete variable', 'Separate values, usually whole numbers; counted'],
    ['Class terms', 'Limits, interval, class mark, frequency'],
    ['Exclusive and inclusive', 'Exclusive leaves out the upper limit; inclusive keeps both; adjust by half the gap'],
  ],
  'Summary table of Part 1: raw data, classification, continuous and discrete variables, the class terms, and exclusive and inclusive classes',
);
const vHH = table(
  ['Members', 'Tally', 'Households', 'Cumulative'],
  [...HV.map((v, i) => [String(v), hhTal[i], String(HF[i]), String(HCF[i])]), ['Total', '', String(sum(HF)), '']],
  `Discrete frequency distribution of the household sizes of the imagined Palash Nagar colony: sizes ${HV.join(', ')} with frequencies ${HF.join(', ')}, totalling ${sum(HF)}`,
  'Imagined survey of Palash Nagar: one row for each value',
);
const vGrouped = table(
  ['Marks class', 'Tally', 'Frequency', 'Class mark'],
  [...M.label.map((c, i) => [c, M.tal[i], String(M.f[i]), String(M.mid[i])]), ['Total', '', String(sum(M.f)), '']],
  `Grouped frequency distribution of the marks of ${M.N} imagined students with tallies, frequencies ${M.f.join(', ')} and class marks ${M.mid.join(', ')}`,
  'Grouped distribution for a continuous variable',
);
const vWidth = table(
  ['Step', 'Imagined wages of the Sunrise Brick Works'],
  [
    ['1. Highest and lowest values', `Rs ${W.max} and Rs ${W.min}`],
    ['2. Range', `${W.max} − ${W.min} = ${W.range}`],
    ['3. Trial width for about 5 classes', `${W.range} ÷ 5 = ${wRawWidth}`],
    ['4. Convenient width', `Rs ${W.w[0]}`],
    ['5. Classes from a round start', `${W.label.join(', ')}: ${wStartClasses} classes`],
  ],
  `Steps for choosing classes for the imagined wages: the range is ${W.range}, the trial width is ${wRawWidth}, a convenient width is ${W.w[0]}, and ${wStartClasses} classes starting at ${W.lo[0]} cover every wage`,
);
const vUnequal = table(
  ['Daily wage class (Rs)', 'Workers', 'Kind of class'],
  [
    ['below 250', String(wuF[0]), 'Open-ended (no lower limit)'],
    ['250 to 300', String(wuF[1]), 'Equal width 50'],
    ['300 to 350', String(wuF[2]), 'Equal width 50'],
    ['350 to 400', String(wuF[3]), 'Equal width 50'],
    ['400 and above', String(wuF[4]), 'Open-ended (no upper limit)'],
    ['Total', String(sum(wuF)), ''],
  ],
  `Table of the imagined wages with open-ended first and last classes: frequencies ${wuF.join(', ')}, totalling ${sum(wuF)}`,
  'Open-ended classes at both ends',
);
const vOpen = table(
  ['Class', 'Can the class mark be found?', 'Why'],
  [
    ['250 to 300', `Yes, ${(250 + 300) / 2}`, 'Both limits are known'],
    ['400 and above', 'Only by assuming a limit', 'There is no upper limit to average with'],
  ],
  'Table showing that the class mark of a closed class can be found directly while that of an open-ended class needs an assumed limit',
);
const vLoss = table(
  [`The ${M.f[0]} students in ${M.label[0]}`, 'Marks'],
  [
    ['Actual marks (raw data)', MARKS.filter((x) => x >= 30 && x < 40).join(', ')],
    ['Actual total', String(lossActual)],
    ['What the table shows', `${M.f[0]} students in ${M.label[0]}`],
    [`Total from the class mark ${M.mid[0]}`, `${M.f[0]} × ${M.mid[0]} = ${lossApprox}`],
  ],
  `Table showing the information lost when the ${M.f[0]} imagined students of the class ${M.label[0]} are replaced by the class mark ${M.mid[0]}: the actual total is ${lossActual} and the total from the class mark is ${lossApprox}`,
);
const vBiv = table(
  ['Advertisement (Rs lakh)', `Sales ${saLabel[0]}`, `Sales ${saLabel[1]}`, `Sales ${saLabel[2]}`, 'Total'],
  [...AD.map((_, i) => [adLabel[i], ...BV.cells[i].map(String), String(BV.rows[i])]), ['Total', ...BV.cols.map(String), String(BV.n)]],
  `Bivariate frequency distribution of ${BV.n} imagined firms by advertisement spending and sales, with row totals ${BV.rows.join(', ')} and column totals ${BV.cols.join(', ')}`,
  'Imagined firms of the Meghna Industrial Estate',
);
const vBivRead = table(
  ['What to read', 'Where', 'Value'],
  [
    [`Firms with advertisement ${adLabel[1]} and sales ${saLabel[1]}`, 'A single cell', String(BV.cells[1][1])],
    [`All firms with advertisement ${adLabel[1]}`, 'Row total', String(BV.rows[1])],
    [`All firms with sales ${saLabel[2]}`, 'Column total', String(BV.cols[2])],
    ['All firms', 'Grand total', String(BV.n)],
  ],
  `Table showing how to read the bivariate table: one cell gives ${BV.cells[1][1]} firms, a row total ${BV.rows[1]}, a column total ${BV.cols[2]} and the grand total ${BV.n}`,
);
const vCum = table(
  ['Marks class', 'Frequency', 'Less than (upper limit)', 'More than (lower limit)'],
  M.label.map((c, i) => [c, String(M.f[i]), `below ${M.hi[i]}: ${M.cf[i]}`, `${M.lo[i]} or more: ${M.more[i]}`]),
  `Cumulative frequencies of the imagined marks: less than series ${M.cf.join(', ')} and more than series ${M.more.join(', ')}`,
  'Less than and more than cumulative frequencies',
);
const vCumRead = table(
  ['Question', 'Working', 'Answer'],
  [
    [`Scored below ${M.hi[3]}`, `${M.f.slice(0, 4).join(' + ')}`, String(M.cf[3])],
    [`Scored ${M.lo[3]} or more`, `${M.f.slice(3).join(' + ')}`, String(M.more[3])],
    ['Check: the two groups together', `${M.cf[2]} + ${M.more[3]}`, String(M.cf[2] + M.more[3])],
  ],
  `Table of cumulative frequency questions: ${M.cf[3]} students scored below ${M.hi[3]}, ${M.more[3]} scored ${M.lo[3]} or more, and the groups below ${M.hi[2]} and from ${M.lo[3]} add up to ${M.N}`,
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Discrete distribution', 'One row for each value; tally, then count'],
    ['Grouped distribution', 'Classes for a continuous variable; frequencies add up to the number of observations'],
    ['Class width', 'Range divided by the number of classes, rounded to a convenient value'],
    ['Open-ended class', 'No limit at one end; class mark not directly available'],
    ['Loss of information', 'Individual values are replaced by the class mark'],
    ['Bivariate table', 'Two variables classified together, with row and column totals'],
    ['Cumulative frequency', 'Less than adds downwards; more than subtracts from the total'],
  ],
  'Summary table of Part 2: discrete and grouped distributions, class width, open-ended classes, loss of information, bivariate tables and cumulative frequencies',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Organisation of Data — Part 1: Classification, Variables and Class Terms',
  goals: [
    'Explain raw data and the four types of classification',
    'Distinguish continuous from discrete variables',
    'Define class, class limits, class interval, class mark and frequency',
    'Use exclusive and inclusive classes and adjust inclusive classes to exclusive form',
  ],
  slides: [
    sl('title', 'Organisation of Data', {
      b: 'Part 1: how **raw data** are grouped, what **variables** are, and the terms of a **frequency distribution**.',
      v: vRoute1,
      n: 'A long list of figures tells us very little. In this part we see how raw data are organised into groups, how variables differ, and the words we use to describe the classes of a table. Then we learn the difference between exclusive and inclusive classes, and how to change one form into the other.',
    }),
    sl('concept', 'Raw data and why we organise them', {
      b: '**Raw data** are figures in the order in which they were collected, with no arrangement. A long raw list is hard to read.',
      bl: ['Arranging data in a short table brings out the pattern.', 'The first step in organising is **classification**.'],
      v: vRawOrg,
      n: `Raw data are figures just as they were collected, in no particular order. Imagine the marks of ${M.N} students written in the order the answer scripts were handed in. It is hard to see how well the class did. By arranging the same marks into a small table of classes, the pattern becomes clear at a glance.`,
    }),
    sl('concept', 'Classification of data', {
      b: '**Classification** is arranging data into groups or classes on the basis of characteristics the items share.',
      bl: ['Items in one class are alike in the chosen respect.', 'Items in different classes differ in that respect.'],
      n: 'Classification means sorting data into groups according to something the items have in common. All the students who scored between fifty and sixty go into one class, those between sixty and seventy into another. Items in the same group are alike in the chosen respect, and items in different groups differ in it.',
    }),
    sl('diagram', 'Four types of classification', {
      v: vClassTypes,
      n: 'Data can be classified in four ways. Chronological classification groups by time, such as sales month by month. Spatial classification groups by place, such as output district by district. Qualitative classification groups by an attribute, such as skilled or unskilled workers. Quantitative classification groups by the size of a measured value, such as families in income bands.',
    }),
    sl('check', 'Quick check: which classification?', {
      b: 'A report lists the tea output of three estates side by side. What kind of classification is this?',
      chk: 'm_spatial',
      n: 'Ask what the groups are. Are they periods of time, places, qualities or sizes of a number? Then choose the matching type.',
    }),
    sl('concept', 'What is a variable?', {
      b: 'A **variable** is a characteristic that takes different values for different units, such as marks, wage or household size.',
      bl: ['**Continuous variable:** can take any value in a range, for example height, weight or income.', '**Discrete variable:** takes only separate values, usually whole numbers, for example number of children or cars.'],
      n: 'A variable is any characteristic whose value changes from one unit to another, like marks, wages or the number of people in a household. A continuous variable can take any value within a range, for example weight or income. A discrete variable takes only certain separate values, usually whole numbers, like the number of cars a family owns.',
    }),
    sl('diagram', 'Continuous versus discrete', {
      v: vContDisc,
      n: 'On the left, the weight of a rice sack is continuous. Any value on the line is possible, such as forty eight point six or forty nine point two seven. On the right, the number of vehicles a family owns is discrete. It can be zero, one, two, three or four, but nothing in between. We measure continuous variables and count discrete ones.',
    }),
    sl('check', 'Quick check: discrete or continuous?', {
      b: 'The number of vehicles owned by each family of an imagined apartment block is recorded. Which kind of variable is it?',
      chk: 'm_disc',
      n: 'Can a family own one and a half vehicles? Think about whether the values are separate whole numbers or can fall anywhere in a range.',
    }),
    sl('concept', 'Frequency distribution', {
      b: 'A **frequency distribution** is a table showing how the values of a variable are distributed over classes, with the **frequency**, the number of observations, in each class.',
      bl: ['The frequencies add up to the total number of observations.', 'It is the commonest way of organising quantitative data.'],
      v: vRawToTable,
      n: 'A frequency distribution shows how the values of a variable are spread over classes, and how many observations fall in each class. On the left are some raw marks. On the right, the same marks are tallied and counted into classes. The count in each class is its frequency, and the frequencies together add up to the number of students.',
    }),
    sl('concept', 'Terms used in a frequency distribution', {
      b: 'Five words describe every class. The table takes the class **50 to 60** of the imagined marks.',
      v: vTerms,
      n: `A class is a group of values, such as fifty to sixty. Its class limits are the lower end, fifty, and the upper end, sixty. The class interval, or width, is the upper limit minus the lower limit, here ten. The class mark is the mid value, here fifty five. And the frequency is the number of students in the class, here ${M.f[2]}.`,
    }),
    sl('example', 'Worked example: class terms for every class', {
      b: `The ${M.N} imagined marks give seven classes. Find the width and the class mark of each.`,
      bl: ['Width = upper limit − lower limit', 'Class mark = (upper limit + lower limit) ÷ 2', `Every width is ${M.w[0]}; the class marks run from ${M.mid[0]} to ${M.mid[6]}, rising by ${M.w[0]}.`],
      v: vTermsAll,
      n: `Take each class in turn. The width is always ten, because each upper limit is ten more than the lower limit. The class marks are found by averaging the limits, so thirty five for thirty to forty, forty five for forty to fifty, and so on up to ninety five. The frequencies add up to forty, which matches the number of students.`,
    }),
    sl('concept', 'Exclusive classes', {
      b: 'In **exclusive** classes the upper limit of a class is **left out** and appears as the lower limit of the next class, for example 30 to 40, 40 to 50.',
      bl: ['No gap between classes.', 'A value equal to a limit goes into the class where it is the lower limit.'],
      v: vExclusive,
      n: 'In exclusive classes, the upper limit does not belong to the class. The classes are written thirty to forty, forty to fifty, and so on, so each class ends where the next begins. A student with exactly forty marks goes into the class forty to fifty, not thirty to forty. There is no gap between classes, which is convenient for continuous variables.',
    }),
    sl('check', 'Quick check: where does the boundary value go?', {
      b: 'With exclusive classes 40 to 50, 50 to 60 and 60 to 70, a student scored exactly 60. Which class does the student belong to?',
      chk: 'm_exclusive',
      n: 'Remember that the upper limit is left out of a class. Then decide where a value equal to a limit must be counted.',
    }),
    sl('concept', 'Inclusive classes', {
      b: 'In **inclusive** classes both limits belong to the class, for example 30–39, 40–49. The next class starts one unit after the upper limit.',
      bl: ['There is a **gap** between the upper limit of one class and the lower limit of the next.', 'Suitable for whole-number data.'],
      v: vInclusive,
      n: `In inclusive classes, both the lower and the upper limit are part of the class. Thirty to thirty nine includes thirty and thirty nine. The next class starts at forty, so there is a gap of ${MA.gap} between thirty nine and forty. This form suits whole number data, but it leaves a gap that must be closed when the variable is continuous.`,
    }),
    sl('example', 'Worked example: adjusting inclusive to exclusive', {
      b: 'To close the gap, **half the gap** is subtracted from every lower limit and added to every upper limit.',
      bl: [`Gap between ${MI[0][1]} and ${MI[1][0]} is ${MA.gap}, so half the gap is ${MA.half}.`, `${MI[0][0]} − ${MA.half} = ${MA.adj[0][0]} and ${MI[0][1]} + ${MA.half} = ${MA.adj[0][1]}.`, 'Now each upper limit equals the next lower limit.'],
      v: vAdjust,
      n: `The gap between thirty nine and forty is one, and half of it is zero point five. Subtract this from each lower limit, so thirty becomes twenty nine point five. Add it to each upper limit, so thirty nine becomes thirty nine point five. The adjusted classes now touch each other, and the class marks are unchanged.`,
    }),
    sl('check', 'Quick check: adjust the classes', {
      b: 'The inclusive classes are 30–39, 40–49 and 50–59. What does the class 40–49 become after adjustment to exclusive form?',
      chk: 'm_adjust',
      n: 'First find the gap between a class and the next. Take half of it, subtract it from the lower limit and add it to the upper limit.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Raw data are unorganised. Classification groups data by time, place, attribute or magnitude. Continuous variables take any value in a range, discrete variables only separate values. A class has limits, a width, a class mark and a frequency. Exclusive classes leave out the upper limit, inclusive classes keep both, and half the gap adjusts one form to the other.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: ['Define **classification** and name all four types with an example each.', 'For continuous versus discrete, give the idea and an example of each.', 'Write the formulas for class interval and class mark before you substitute.', 'When adjusting, show the gap, the half-gap and then the new limits.', 'Check that each adjusted upper limit equals the next lower limit.'],
      n: 'A few tips. Define classification and name its four types, with an example for each. When you separate continuous from discrete variables, give an example of both. Write the formulas for class interval and class mark before substituting numbers. When adjusting classes, show the gap, then half the gap, then the new limits, and check that the classes now touch.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Organisation of Data — Part 2: Constructing Frequency Distributions',
  goals: [
    'Build discrete and grouped frequency distributions using tally marks',
    'Choose the number of classes and the class width',
    'Explain unequal and open-ended classes and the loss of information in grouping',
    'Read a bivariate frequency table and compute cumulative frequencies',
  ],
  slides: [
    sl('title', 'Constructing Frequency Distributions', {
      b: 'Part 2: from **raw lists** to **frequency tables**, bivariate tables and cumulative frequencies.',
      v: vRoute2,
      n: 'In this part we build frequency tables from raw lists. We start with a discrete variable, then a continuous one grouped into classes. We learn how to pick the classes, why some classes are unequal or open ended, what information is lost in grouping, and how to read a table with two variables and a table of cumulative frequencies.',
    }),
    sl('concept', 'Discrete frequency distribution', {
      b: 'For a **discrete variable** with few distinct values, list each value and count how many times it occurs. No classes are needed.',
      bl: ['Go through the raw list once.', 'Make one **tally mark** for each observation against its value.', 'Four strokes are crossed by a fifth; written as text, a group of five is IIII/.'],
      v: vHH,
      n: `Here are the sizes of ${HN} imagined households of one colony. Each size from one to eight has its own row. As we read the raw list, we put a tally mark against the size, and every fifth mark crosses the four before it. Counting the tallies gives the frequencies, which add up to ${HN}, the number of households.`,
    }),
    sl('example', 'Worked example: counting households with tally marks', {
      b: `Households with **${HV[3]} members**: tally ${tally(HF[3])}.`,
      bl: [`${HF[3]} = ${Math.floor(HF[3] / 5)} × 5 + ${HF[3] % 5}, so ${Math.floor(HF[3] / 5)} complete groups and ${HF[3] % 5} single stroke.`, `Total of all frequencies: ${HF.join(' + ')} = ${sum(HF)} households.`, `Households with at most ${HV[3]} members: ${HF.slice(0, 4).join(' + ')} = ${hhAtMost4}.`],
      v: vHH,
      n: `The tally for households with four members is two groups of five and one single stroke, so eleven. Adding all the frequencies gives thirty six, which matches the number of households surveyed. The cumulative column adds frequencies as we go down, and shows that twenty four households have at most four members.`,
    }),
    sl('check', 'Quick check: what kind of table is this?', {
      b: 'A table lists each household size 1, 2, 3 and so on up to 8 with the number of households of that size. What is it called?',
      chk: 'm_discrete_freq',
      n: 'Notice that each separate value has its own row and no classes are formed. Choose the name that matches this.',
    }),
    sl('concept', 'Grouped frequency distribution', {
      b: 'For a **continuous variable**, or a discrete one with many values, group the values into **classes** and count the observations in each.',
      bl: ['Use exclusive classes for continuous data.', 'Tally each value into its class, then count.', 'Class marks stand for the classes in later work.'],
      v: vGrouped,
      n: `Marks of forty students range from thirty four to ninety six, too many different values for a row each. So we group them into classes of width ten. Each mark is tallied against its class and the tallies are counted. The frequencies add up to forty, and the class mark column gives one representative value for each class.`,
    }),
    sl('diagram', 'Bar chart of a frequency distribution', {
      v: vBar,
      n: `The same frequencies can be drawn as a bar chart. Each bar stands for one class, and its height shows the frequency. The tallest bar belongs to the class sixty to seventy with ten students, and the shortest to ninety to one hundred with two. The shape shows at a glance where most students scored.`,
    }),
    sl('concept', 'How many classes and what width?', {
      b: 'There is no fixed rule, but two guides help.',
      bl: ['Too **few** classes hide the pattern; too **many** make the table as long as the raw list.', 'Class width is about the **range ÷ number of classes**, rounded to a convenient figure.', 'Start from a round figure at or below the lowest value.'],
      v: vWidth,
      n: `Too few classes hide the pattern in the data, and too many give a table as long as the raw list. As a guide, divide the range by the number of classes wanted. For the imagined wages the range is two hundred and twenty. Divided by five, it gives forty four, so a convenient width of fifty is chosen, and starting at two hundred we need six classes.`,
    }),
    sl('example', 'Worked example: classes for the wages', {
      b: `Wages of ${W.N} workers range from Rs ${W.min} to Rs ${W.max}.`,
      bl: [`Range = ${W.max} − ${W.min} = ${W.range}.`, `Width of about ${W.range} ÷ 5 = ${wRawWidth}, so use Rs ${W.w[0]}.`, `Classes from ${W.lo[0]}: ${W.label.join(', ')}.`, `Frequencies: ${W.f.join(', ')}; total ${sum(W.f)}.`],
      v: table(['Wage class (Rs)', 'Tally', 'Workers'], [...W.label.map((c, i) => [c, W.tal[i], String(W.f[i])]), ['Total', '', String(sum(W.f))]], `Grouped frequency distribution of the imagined wages with frequencies ${W.f.join(', ')} totalling ${sum(W.f)}`, 'Imagined daily wages, Sunrise Brick Works'),
      n: `Start with the range, two hundred and twenty. A width of fifty is convenient. Classes run from two hundred to two hundred fifty, and so on up to four hundred fifty to five hundred, which covers the highest wage of four hundred fifty five. Tally each wage and count. The frequencies are two, ten, eleven, four, two and one, adding up to thirty.`,
    }),
    sl('concept', 'Equal and unequal class intervals', {
      b: '**Equal** widths make classes easy to compare. **Unequal** widths are used when values are crowded in one part of the range and scattered in another.',
      bl: ['Narrow classes where values are many.', 'Wide classes in the thin tails.'],
      v: vUnequal,
      n: `Classes usually have equal width, which makes frequencies easy to compare. But when most values lie in a narrow range and a few are far away, unequal classes help. The imagined wage table keeps width fifty in the middle, where most workers are, and uses wide classes at the ends. The frequencies add up to thirty again.`,
    }),
    sl('concept', 'Open-ended classes', {
      b: 'An **open-ended** class has no lower limit or no upper limit, such as **below 250** or **400 and above**.',
      bl: ['It lets a few extreme values be grouped without a long list of empty classes.', 'Its class mark cannot be found directly.'],
      v: vOpen,
      n: 'An open ended class lacks a limit at one end, like below two hundred fifty or four hundred and above. It saves space by lumping a few extreme values together. But because one limit is missing, we cannot average the limits to find the class mark. Any calculation that needs the class mark has to assume a limit first.',
    }),
    sl('check', 'Quick check: open-ended class', {
      b: 'The last class of a wage table is written 400 and above. Which statement about it is correct?',
      chk: 'm_openended',
      n: 'Think about what is missing from the class, and what that means for finding its mid value.',
    }),
    sl('concept', 'Loss of information', {
      b: 'Once data are grouped, the **individual values are lost**. The class mark is used to represent every value of the class.',
      bl: ['The table shows how many, not exactly which values.', 'Grouped results are slightly less exact than results from raw data.'],
      v: vLoss,
      n: `Grouping gives a shorter table but costs us detail. The class thirty to forty shows only that three students lie in it, not their exact marks. The class mark thirty five stands for each of them, giving a total of one hundred and five, while the true total is one hundred and seven. A small difference appears whenever we use class marks.`,
    }),
    sl('concept', 'Bivariate frequency distribution', {
      b: 'A **bivariate frequency distribution** is a two-way table that classifies the same units on **two variables** at once.',
      bl: ['One variable runs down the rows and the other across the columns.', 'Each cell counts the units having that pair of classes.', 'Row and column totals are single-variable distributions.'],
      v: vBiv,
      n: `A bivariate distribution classifies each unit on two variables together. Here thirty imagined firms are classified by advertisement spending down the side and sales across the top. Each cell counts the firms with that combination, and the totals at the right and bottom give the separate distributions of each variable. The grand total is thirty.`,
    }),
    sl('example', 'Worked example: reading the bivariate table', {
      b: 'Cells, row totals and column totals answer different questions.',
      bl: [`Firms with advertisement ${adLabel[1]} **and** sales ${saLabel[1]}: ${BV.cells[1][1]}.`, `All firms with advertisement ${adLabel[1]}: ${BV.cells[1].join(' + ')} = ${BV.rows[1]}.`, 'Larger counts lie along the diagonal: firms spending more on advertisement tend to have higher sales.'],
      v: vBivRead,
      n: `A single cell answers a question about both variables. Nine firms spend between five and ten lakh and have sales between twenty and forty lakh. A row total answers a question about one variable alone: twelve firms spend between five and ten lakh. The larger counts lie along the diagonal, so higher advertisement goes with higher sales in this imagined table.`,
    }),
    sl('concept', 'Cumulative frequency', {
      b: '**Less than** cumulative frequency adds the frequencies from the first class downwards; it counts observations **below the upper limit**. **More than** cumulative frequency counts observations **at or above the lower limit**.',
      v: vCum,
      n: `To get the less than series, add the frequencies from the top class by class. The result at each class is the number of observations below its upper limit, and the last value is the total of forty. The more than series starts with the total of forty at the lowest limit and subtracts each class frequency in turn.`,
    }),
    sl('example', 'Worked example: using cumulative frequencies', {
      b: 'Use the two series to answer questions on the marks.',
      bl: [`Below ${M.hi[3]}: ${M.f.slice(0, 4).join(' + ')} = ${M.cf[3]} students.`, `${M.lo[3]} or more: ${M.f.slice(3).join(' + ')} = ${M.more[3]} students.`, `Check: ${M.cf[2]} + ${M.more[3]} = ${M.N}, because the groups below ${M.hi[2]} and from ${M.lo[3]} do not overlap.`],
      v: vCumRead,
      n: `How many students scored below seventy? Add the first four frequencies to get twenty eight. How many scored sixty or more? Add from the class sixty to seventy onwards to get twenty two. As a check, those who scored below sixty, which is eighteen, plus those who scored sixty or more, twenty two, give forty, the total.`,
    }),
    sl('check', 'Quick check: cumulative frequency', {
      b: `Seven classes of marks have frequencies ${M.f.slice(0, 6).join(', ')} and ${M.f[6]}. How many students scored below ${M.hi[3]}?`,
      chk: 'num_cum_less',
      n: 'Add the frequencies of the classes up to the one whose upper limit is seventy.',
    }),
    sl('check', 'Quick check: building a table', {
      b: 'Put the steps of building a grouped frequency distribution in order.',
      chk: 'ord_construct',
      n: 'Start with what you need to know about the data, then decide the classes, then tally, and finish by checking the total.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. A discrete distribution has a row for each value, built with tally marks. A grouped distribution uses classes, whose width is about the range divided by the number of classes. Unequal and open ended classes handle crowded or extreme values. Grouping loses individual values. A bivariate table classifies two variables at once, and cumulative frequencies add or subtract class frequencies.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: ['Always check that the frequencies add up to the number of observations.', 'Show tallies in groups of five, then the count.', 'In exclusive classes a boundary value goes to the higher class.', 'For cumulative frequency, state whether you mean less than or more than.', 'In a bivariate table, add row and column totals and check the grand total.'],
      n: 'A few tips. Always check that your frequencies add up to the number of observations. Show tally marks in groups of five before the count. With exclusive classes, a boundary value goes into the higher class. For cumulative frequency, say whether you mean less than or more than. In a bivariate table, give row and column totals and check the grand total.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Organisation of Data — Notes',
  sections: [
    {
      h: '1. Raw data and classification',
      t: 1,
      b: `**Raw data** are figures in the order of collection, without any grouping; they are hard to read when there are many. **Classification** is arranging data into groups or classes on the basis of common characteristics. Four types:\n\n- **Chronological:** by time (monthly sales over a year).\n- **Spatial:** by place (crop output by district).\n- **Qualitative:** by an attribute that is not a number (workers as skilled or unskilled).\n- **Quantitative:** by the size of a measured value (families in income bands).`,
      terms: [
        ['Raw data', 'Figures as first collected, unorganised and in no set order.'],
        ['Classification', 'The grouping of data into classes on the basis of shared characteristics.'],
      ],
      v: vClassTypes,
      vs: [vRawOrg],
    },
    {
      h: '2. Variables: continuous and discrete',
      t: 1,
      b: `A **variable** is a characteristic that takes different values for different units. A **continuous variable** can take any value within a range (height, weight, income) and is measured. A **discrete variable** takes only separate values, usually whole numbers (number of children, number of cars) and is counted. Continuous data are grouped into classes; a discrete variable with few values can be listed value by value.`,
      terms: [
        ['Variable', 'A characteristic whose value changes from one unit to another.'],
        ['Continuous variable', 'A variable that can take any value in a range.'],
        ['Discrete variable', 'A variable that takes only certain separate values, usually whole numbers.'],
      ],
      v: vContDisc,
    },
    {
      h: '3. Frequency distribution and its terms',
      t: 1,
      b: `A **frequency distribution** shows how the values of a variable are spread over classes, with the number of observations in each. Terms: **class** (a group of values); **class limits** (lower and upper end); **class interval** or width = upper limit − lower limit; **class mark** (mid-value) = (upper limit + lower limit) ÷ 2; **frequency** (number of observations in the class). The frequencies add up to the total number of observations.\n\nFor the imagined class ${M.label[2]}: limits ${M.lo[2]} and ${M.hi[2]}, interval ${M.w[2]}, class mark ${M.mid[2]}, frequency ${M.f[2]}.`,
      terms: [
        ['Frequency distribution', 'A table showing the classes of a variable and the number of observations in each.'],
        ['Class interval', 'The width of a class: upper limit minus lower limit.'],
        ['Class mark', 'The mid-value of a class: (upper limit + lower limit) ÷ 2.'],
        ['Frequency', 'The number of observations that fall in a class.'],
      ],
      v: vTerms,
      vs: [vTermsAll],
    },
    {
      h: '4. Exclusive and inclusive classes',
      t: 1,
      b: `In **exclusive** classes (30 to 40, 40 to 50) the upper limit is left out and counted in the next class. In **inclusive** classes (30–39, 40–49) both limits belong to the class, so a gap of ${MA.gap} separates the classes.\n\n**Adjusting inclusive to exclusive:** take half of the gap between the upper limit of a class and the lower limit of the next (here ${MA.half}), subtract it from every lower limit and add it to every upper limit. ${MI[0][0]}–${MI[0][1]} becomes ${MA.adj[0][0]}–${MA.adj[0][1]}.`,
      terms: [
        ['Exclusive classes', 'Classes in which the upper limit is not part of the class.'],
        ['Inclusive classes', 'Classes in which both limits belong to the class.'],
      ],
      v: vAdjust,
      vs: [vExclusive],
    },
    {
      h: '5. Constructing a frequency distribution',
      t: 1,
      b: `**Discrete distribution:** list each value and tally. **Tally marks** are one stroke per observation, four strokes crossed by a fifth; in text IIII/ stands for five. For ${HF[3]} households: ${tally(HF[3])}.\n\n**Grouped distribution:** find the range, choose the number of classes (too few hide the pattern, too many make a long table), take a width of about range ÷ number of classes rounded to a convenient value, start from a round figure, tally and count. Check that the frequencies add up to the number of observations.\n\n**Unequal and open-ended classes** are used when values crowd in one part of the range and a few lie far away; an open-ended class has no limit at one end and no direct class mark.`,
      terms: [
        ['Tally marks', 'Strokes drawn one per observation to count frequencies, in groups of five.'],
        ['Open-ended class', 'A class that has no lower limit or no upper limit.'],
      ],
      v: vRawToTable,
      vs: [vBar, vHH, vWidth],
    },
    {
      h: '6. Loss of information and bivariate distributions',
      t: 1,
      b: `**Loss of information:** once data are grouped, individual values are lost and the class mark represents the class. In the class ${M.label[0]} the true total of the ${M.f[0]} marks is ${lossActual}, but the class mark gives ${M.f[0]} × ${M.mid[0]} = ${lossApprox}.\n\n**Bivariate frequency distribution:** a two-way table classifying units on two variables at once; each cell gives the number of units with that pair of classes, and the totals give the distribution of each variable. In the imagined table of ${BV.n} firms, ${BV.cells[1][1]} firms have advertisement ${adLabel[1]} and sales ${saLabel[1]}.`,
      terms: [['Bivariate frequency distribution', 'A two-way table that classifies the same units on two variables.']],
      v: vLoss,
      vs: [vBiv],
    },
    {
      h: '7. Cumulative frequency',
      t: 1,
      b: `**Less than cumulative frequency** of a class: the number of observations below its upper limit (add frequencies downwards). **More than cumulative frequency**: the number at or above its lower limit (start from the total and subtract). In the imagined marks, ${M.cf[3]} students scored below ${M.hi[3]} and ${M.more[3]} scored ${M.lo[3]} or more.`,
      terms: [
        ['Less than cumulative frequency', 'The number of observations below the upper limit of a class.'],
        ['More than cumulative frequency', 'The number of observations at or above the lower limit of a class.'],
      ],
      v: vCum,
      vs: [vCumRead],
    },
  ],
  tips: `- Define **raw data, classification, variable, frequency distribution, class mark and class interval** in standard words.\n- Write the **formula first**: width = upper − lower; class mark = (upper + lower) ÷ 2.\n- Show **tally marks in groups of five** and check that the **frequencies add up to the number of observations**.\n- With exclusive classes, a value equal to a limit goes into the **higher** class.\n- For adjustment, show the **gap, the half-gap and the new limits**.\n- Say whether a cumulative frequency is **less than** or **more than**.`,
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Raw data**', 'Figures in the order in which they were collected, with no arrangement.', 'definition', 1],
  ['**Classification**', 'Arranging data into groups or classes using characteristics that items share.', 'definition', 1],
  ['Chronological classification', 'Grouping by time, for example sales of each month.', 'concept', 1],
  ['Spatial classification', 'Grouping by place, for example output of each district.', 'concept', 1],
  ['Qualitative classification', 'Grouping by an attribute that is not a number, for example skilled or unskilled.', 'concept', 1],
  ['Quantitative classification', 'Grouping by the size of a measured value, for example income bands.', 'concept', 1],
  ['**Variable**', 'A characteristic that takes different values for different units.', 'definition', 1],
  ['**Continuous variable**', 'A variable that can take any value in a range, such as height, weight or income.', 'definition', 1],
  ['**Discrete variable**', 'A variable that takes only separate values, usually whole numbers, such as the number of cars.', 'definition', 1],
  ['Measured or counted?', 'Continuous variables are measured; discrete variables are counted.', 'concept', 1],
  ['**Frequency distribution**', 'A table of the classes of a variable with the number of observations in each.', 'definition', 1],
  ['**Class**', 'A group of values of a variable, such as 50 to 60.', 'definition', 1],
  ['**Class limits**', 'The lower and upper ends of a class.', 'definition', 1],
  ['**Class interval** (width)', 'Upper limit minus lower limit.', 'definition', 1],
  ['**Class mark** (mid-value)', '(Upper limit + lower limit) ÷ 2.', 'definition', 1],
  ['**Frequency**', 'The number of observations in a class.', 'definition', 1],
  [`Class mark of ${M.label[2]}`, `(${M.hi[2]} + ${M.lo[2]}) ÷ 2 = ${M.mid[2]}.`, 'example', 1],
  ['**Exclusive classes**', 'Classes in which the upper limit is left out and belongs to the next class, such as 30 to 40, 40 to 50.', 'definition', 1],
  ['**Inclusive classes**', 'Classes in which both limits belong to the class, such as 30–39, 40–49.', 'definition', 1],
  ['Converting inclusive to exclusive', 'Subtract half the gap from each lower limit and add half the gap to each upper limit.', 'concept', 1],
  [`${MI[1][0]}–${MI[1][1]} adjusted`, `Gap ${MA.gap}, half-gap ${MA.half}: ${MA.adj[1][0]} to ${MA.adj[1][1]}.`, 'example', 1],
  ['**Tally marks**', 'One stroke for each observation; four strokes crossed by a fifth make a group of five.', 'definition', 1],
  ['Tally for twelve', `${tally(12)}: two groups of five and two strokes.`, 'example', 1],
  ['**Discrete frequency distribution**', 'One row for each value of a discrete variable, with its frequency; no classes.', 'definition', 1],
  ['Total of the frequencies', 'Equals the number of observations; use it to check the tally.', 'concept', 1],
  ['Choosing the class width', 'About the range divided by the number of classes, rounded to a convenient figure.', 'concept', 1],
  ['Too few or too many classes', 'Too few hide the pattern; too many give a table as long as the raw list.', 'concept', 1],
  ['**Unequal classes**', 'Classes of different widths, used when values crowd in one part of the range.', 'definition', 1],
  ['**Open-ended class**', 'A class with no lower or no upper limit, such as 400 and above; its class mark is not found directly.', 'definition', 1],
  ['Loss of information', 'After grouping, the individual values are lost and the class mark stands for the class.', 'concept', 1],
  ['**Bivariate frequency distribution**', 'A two-way table classifying the same units on two variables, with a count in each cell.', 'definition', 1],
  ['**Less than** cumulative frequency', 'The number of observations below the upper limit of a class.', 'definition', 1],
  ['**More than** cumulative frequency', 'The number of observations at or above the lower limit of a class.', 'definition', 1],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Organisation of Data',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_cont', 'm_class_mark', 'm_cumulative', 'ar_exclusive_adjust'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_variable', 's2_cum', 's3_adjust'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_types', 'l_loss'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the data table and answer all parts. Part (c) has an internal choice.', items: ['cb_marks'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Organisation of Data',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_raw_def', 'm_chrono', 'm_quantitative', 'm_variable_def', 'm_freqdist_def', 'm_class_interval', 'm_inclusive', 'm_loss', 'ar_cum_total', 'ar_loss'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_raw_class', 's2_class_mark', { attempt: 1, keys: ['s2_open', 's2_bivariate'] }, 's3_types', { attempt: 1, keys: ['s3_unequal', 's3_more'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_construct', { attempt: 1, keys: ['l_cum', 'l_biv'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each data table and answer all parts. Part (c) of each has an internal choice.', items: ['cb_wages', 'cb_firms'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topic t01 of cbse-11-economics-ch03 only (variables, classification, frequency distributions, class terms, exclusive and inclusive classes, discrete and grouped distributions, bivariate and cumulative frequencies)',
    originality: 'every data set, school, colony, brick works and firm is imagined and written for this chapter; no NCERT text, example, table or exercise and no board or sample-paper item reused',
    data: 'frequency tables computed with stats.mjs and plain code from imagined raw lists of 40 marks, 30 wages, 36 household sizes, 25 pocket money values, 30 vehicle counts, 30 study hours and 30 firm pairs; totals, class marks, widths, adjusted limits and cumulative counts asserted',
    facts: 'definitions only: raw data, classification (four types), variables, frequency distribution, class terms, exclusive and inclusive classes and adjustment, tally marks, open-ended and unequal classes, bivariate and cumulative frequencies; no real statistics',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
