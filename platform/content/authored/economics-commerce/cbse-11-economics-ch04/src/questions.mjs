// CBSE 11 Economics, ch04 Presentation of Data: question bank. Every district, family, factory, clinic and firm is imagined
// and written for this chapter; no real statistics are used. Every figure below is computed with stats.mjs (or plain code)
// from the imagined data and pinned with check() where it is written in prose.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, rnd, check, cumulative, medianGrouped, modeGrouped, mids } from '../../cbse-11-economics-ch01/src/stats.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const S = (x) => String(rnd(x, 2));
export const inr = (x) => `Rs ${x.toLocaleString('en-IN')}`;

// ---------------------------------------------------------------- imagined data (computed)
// 1. Imagined district of Devgarh: crop output (thousand tonnes) by block. Rows = crops, columns = blocks.
export const CROPS = ['Wheat', 'Rice', 'Pulses', 'Oilseeds'];
export const BLOCKS = ['North block', 'Central block', 'South block'];
export const CT = [[42, 36, 20], [30, 45, 36], [12, 15, 8], [16, 24, 16]];
export const rowTot = CT.map(sum);
export const colTot = BLOCKS.map((_, j) => sum(CT.map((r) => r[j])));
export const grand = sum(rowTot);
export const share = BLOCKS.map((_, j) => CT.map((r) => (r[j] / colTot[j]) * 100)); // share[j][i], per cent
check(grand, 300, 0, 'Devgarh grand total');
check(sum(colTot), grand, 0, 'column totals add to the grand total');
check(rowTot[1], 111, 0, 'rice total');
check(share[1][1], 37.5, 2, 'rice share of the Central block');
check(sum(share[0]), 100, 6, 'North shares add to 100');
check(sum(share[1]), 100, 6, 'Central shares add to 100');
check(sum(share[2]), 100, 6, 'South shares add to 100');

// 2. Imagined Rao family monthly budget (pie).
export const BUD = [['Food', 9600], ['Housing', 6000], ['Education', 3600], ['Transport', 2400], ['Health', 1200], ['Other items', 1200]];
export const budTot = sum(BUD.map((b) => b[1]));
export const budAng = BUD.map((b) => (b[1] / budTot) * 360);
export const budPct = BUD.map((b) => (b[1] / budTot) * 100);
check(budTot, 24000, 0, 'Rao family budget');
check(sum(budAng), 360, 6, 'budget angles add to 360');
check(budAng[0], 144, 2, 'food angle');

// 3. Imagined Anand Bolt Works: daily output (crates) over 80 working days, equal classes of width 10.
export const FACT = [[50, 60, 4], [60, 70, 8], [70, 80, 16], [80, 90, 24], [90, 100, 14], [100, 110, 10], [110, 120, 4]];
export const factN = sum(FACT.map((c) => c[2]));
export const factCum = cumulative(FACT.map((c) => c[2]));
export const factMore = FACT.map((_, i) => factN - (i ? factCum[i - 1] : 0));
export const factMed = medianGrouped(FACT);
export const factMode = modeGrouped(FACT);
export const factMarks = mids(FACT);
check(factN, 80, 0, 'Anand Bolt Works days');
check(factMed.median, 85, 2, 'Anand Bolt Works median');
check(factMode.mode, 84.44, 2, 'Anand Bolt Works mode');
// The two ogives meet at the median: interpolate each between its two neighbouring points at x = median.
const interp = (xs, ys, x) => { const i = xs.findIndex((v, k) => v <= x && x <= xs[k + 1]); return ys[i] + ((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i])) * (x - xs[i]); };
export const factUpper = FACT.map((c) => c[1]);
export const factLower = FACT.map((c) => c[0]);
export const factLessAtMed = interp([FACT[0][0], ...factUpper], [0, ...factCum], factMed.median);
export const factMoreAtMed = interp([...factLower, FACT[FACT.length - 1][1]], [...factMore, 0], factMed.median);
check(factLessAtMed, 40, 6, 'less-than ogive at the median');
check(factMoreAtMed, 40, 6, 'more-than ogive at the median');
check(factN / 2, 40, 0, 'N over 2');

// 4. Imagined Kishan Brick Kiln: daily wages (Rs) of 100 labourers, unequal classes.
export const UN = [[300, 400, 12], [400, 500, 20], [500, 700, 36], [700, 1100, 32]];
export const unW = UN.map((c) => c[1] - c[0]);
export const unStd = Math.min(...unW);
export const unAdj = UN.map((c, i) => (c[2] / unW[i]) * unStd);
check(sum(UN.map((c) => c[2])), 100, 0, 'brick kiln labourers');
check(unAdj[2], 18, 2, 'adjusted frequency of 500-700');
check(unAdj[3], 8, 2, 'adjusted frequency of 700-1100');

// 5. Imagined Kaveri Looms: yearly sales (Rs lakh), eight years.
export const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
export const SALES = [42, 48, 45, 53, 60, 57, 66, 72];
export const salesChg = SALES.slice(1).map((v, i) => v - SALES[i]);
export const salesGrowth = ((SALES[7] - SALES[0]) / SALES[0]) * 100;
check(salesGrowth, 71.43, 2, 'Kaveri Looms growth 2017 to 2024');
check(Math.max(...salesChg), 9, 0, 'largest yearly rise');

// 6. Imagined Rajpur clinic: waiting time (minutes) of 50 patients.
export const CL = [[0, 5, 5], [5, 10, 10], [10, 15, 20], [15, 20, 10], [20, 25, 5]];
export const clN = sum(CL.map((c) => c[2]));
export const clCum = cumulative(CL.map((c) => c[2]));
export const clMed = medianGrouped(CL);
check(clN, 50, 0, 'clinic patients');
check(clCum[2], 35, 0, 'waiting less than 15 minutes');
check(clN - clCum[2], 15, 0, 'waiting 15 minutes or more');
check(clMed.median, 12.5, 2, 'clinic median');
export const clMarks = mids(CL);
export const clMoreAt15 = clN - clCum[2];

// 7. Imagined Sunbeam Courier: delivery time (hours) of 50 parcels.
export const COUR = [[0, 2, 6], [2, 4, 14], [4, 6, 20], [6, 8, 8], [8, 10, 2]];
export const courN = sum(COUR.map((c) => c[2]));
export const courCum = cumulative(COUR.map((c) => c[2]));
export const courMore = COUR.map((_, i) => courN - (i ? courCum[i - 1] : 0));
export const courMed = medianGrouped(COUR);
check(courN, 50, 0, 'courier parcels');
check(courMed.median, 4.5, 2, 'courier median');

// 8. Pie-chart items.
export const CAFE = [['Ingredients', 27000], ['Wages', 18000], ['Rent', 9000], ['Other costs', 6000]];
export const cafeTot = sum(CAFE.map((c) => c[1]));
export const cafeAng = CAFE.map((c) => (c[1] / cafeTot) * 360);
check(cafeTot, 60000, 0, 'Sunrise Cafe costs');
check(cafeAng[1], 108, 2, 'wages angle');
check(sum(cafeAng), 360, 6, 'cafe angles add to 360');
export const SCH = { fund: 45000, angle: 72 };
export const schValue = (SCH.angle / 360) * SCH.fund;
check(schValue, 9000, 0, 'school fund sector value');
export const LAK = [['Rent', 20000], ['Salaries', 15000], ['Power and internet', 5000], ['Stationery', 5000], ['Other items', 5000]];
export const lakTot = sum(LAK.map((c) => c[1]));
export const lakAng = LAK.map((c) => (c[1] / lakTot) * 360);
check(lakTot, 50000, 0, 'Lakshya budget');
check(sum(lakAng), 360, 6, 'Lakshya angles add to 360');
export const NAI = [['Food', 14400], ['Rent', 9000], ['Education', 5400], ['Savings', 3600], ['Other items', 3600]];
export const naiTot = sum(NAI.map((c) => c[1]));
export const naiAng = NAI.map((c) => (c[1] / naiTot) * 360);
export const naiPct = NAI.map((c) => (c[1] / naiTot) * 100);
check(naiTot, 36000, 0, 'Naidu budget');
check(naiAng[0], 144, 2, 'Naidu food angle');
check(naiAng[4], 36, 2, 'Naidu other angle');
check(naiPct[3], 10, 2, 'Naidu savings share');
check(sum(naiAng), 360, 6, 'Naidu angles add to 360');
export const MQ = { food: 4800, total: 24000 };
export const mqAng = (MQ.food / MQ.total) * 360;
check(mqAng, 72, 2, 'transport angle');
export const LIBF = [['Books', 4000], ['Journals', 2500], ['Furniture', 1000], ['Repairs', 500]];
export const libTot = sum(LIBF.map((c) => c[1]));
export const libAng = LIBF.map((c) => (c[1] / libTot) * 360);
check(libTot, 8000, 0, 'library fund');
check(libAng[0], 180, 2, 'books angle');
check(libAng[1], 112.5, 2, 'journals angle');
check(sum(libAng), 360, 6, 'library angles add to 360');

// 9. Imagined Ashoka Colony: monthly electricity use (units) of 150 households, unequal classes.
export const AC = [[0, 100, 24], [100, 200, 30], [200, 400, 52], [400, 800, 44]];
export const acW = AC.map((c) => c[1] - c[0]);
export const acAdj = AC.map((c, i) => (c[2] / acW[i]) * Math.min(...acW));
check(sum(AC.map((c) => c[2])), 150, 0, 'Ashoka colony households');
check(acAdj[2], 26, 2, 'adjusted frequency of 200-400');
check(acAdj[3], 11, 2, 'adjusted frequency of 400-800');

// 10. Imagined Gulmohar Residents' Association: monthly water bills (Rs), unequal classes.
export const GW = [[0, 100, 16], [100, 200, 24], [200, 400, 36], [400, 800, 32]];
export const gwW = GW.map((c) => c[1] - c[0]);
export const gwAdj = GW.map((c, i) => (c[2] / gwW[i]) * Math.min(...gwW));
check(sum(GW.map((c) => c[2])), 108, 0, 'Gulmohar households');
check(gwAdj[2], 18, 2, 'Gulmohar adjusted 200-400');
check(gwAdj[3], 8, 2, 'Gulmohar adjusted 400-800');

// 11. Imagined Neel Cycles: yearly units sold, five years.
export const NC_Y = [2019, 2020, 2021, 2022, 2023];
export const NC = [320, 360, 340, 400, 480];
export const ncGrowth = ((NC[4] - NC[0]) / NC[0]) * 100;
check(ncGrowth, 50, 2, 'Neel Cycles growth');
export const ncRise = NC[3] - NC[2];
check(ncRise, 60, 0, 'Neel Cycles rise 2021 to 2022');

// 12. Vegetable market table (long item).
export const VEG = { rows: ['Tuesday', 'Friday'], cols: ['Tomatoes', 'Onions', 'Potatoes'], v: [[120, 90, 60], [150, 110, 75]] };
export const vegRow = VEG.v.map(sum);
export const vegCol = VEG.cols.map((_, j) => VEG.v[0][j] + VEG.v[1][j]);
export const vegAll = sum(vegRow);
check(vegAll, 605, 0, 'vegetable market grand total');
check(sum(vegCol), vegAll, 0, 'vegetable column totals');

// 13. Missing table entry.
export const PW = { known: [18, 26], total: 74 };
export const pwMissing = PW.total - sum(PW.known);
check(pwMissing, 30, 0, 'missing club entry');

// 14. Milk collection table (case).
export const MK = { rows: ['Shivpur', 'Ramgarh', 'Doodhgaon'], cols: ['Winter', 'Summer'], v: [[420, 360], [300, 280], [510, 450]] };
export const mkRow = MK.v.map(sum);
export const mkCol = MK.cols.map((_, j) => sum(MK.v.map((r) => r[j])));
export const mkAll = sum(mkRow);
check(mkRow[2], 960, 0, 'Doodhgaon total');
check(mkAll, 2320, 0, 'milk collection grand total');
check(sum(mkCol), mkAll, 0, 'milk collection columns');

// ================================================================ t01 Tabular presentation
Q('m_captions', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In a table of weekly sales of the imagined Ravi Cycle Mart, the headings written at the top of the vertical columns, such as Week 1, Week 2 and Total, are called',
  opts: ['captions', 'stubs', 'body', 'footnotes'],
  sol: 'Column headings are the captions. Stubs are the row headings at the left, the body holds the figures, and a footnote is a note placed below the table.',
}));
Q('m_stubs', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A table lists Gents cycles, Ladies cycles and Kids cycles down its left-hand side, one name for each horizontal row. These labels are the',
  opts: ['stubs', 'captions', 'source note', 'unit of measurement'],
  sol: 'Row headings written down the left side are stubs. Captions head the columns, the source note says where the figures come from, and the unit says how the figures are measured.',
}));
Q('m_title', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which title is best for a table of tomato arrivals at the imagined Pushpa Mandi?',
  opts: ['Monthly arrivals of tomatoes at Pushpa Mandi, January to June (in quintals)', 'Tomato table', 'Pushpa Mandi', 'Figures of arrivals'],
  sol: 'A good title tells what the data are, where and when they apply, and in what unit. The other titles leave out one or more of these and would not let a reader understand the table on its own.',
}));
Q('m_source', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Below a table of daily wages in the imagined Surajpur Brick Works there is the line: Source: Surajpur Brick Works wage register. This line is the',
  opts: ['source note', 'footnote explaining an exception', 'caption', 'title'],
  sol: 'A line that tells where the figures were obtained is the source note. A footnote explains a particular entry or exception, a caption heads a column and the title describes the whole table.',
}));
Q('m_classif_temporal', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A table gives the number of students enrolled each year from 2018 to 2024 in the imagined Sagar College. The classification of these data is',
  opts: ['temporal, because the data are arranged by time', 'spatial, because the data are arranged by place', 'qualitative, because the data are arranged by an attribute', 'quantitative, because the data are arranged by class intervals of a size'],
  sol: 'When data are arranged by time periods such as years, the classification is temporal. Spatial means by place, qualitative by an attribute such as trade or gender, and quantitative by a measurable size such as income.',
}));
Q('m_classif_spatial', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A table lists the July rainfall recorded in the imagined Lakeview, Hillcrest and Rivergate blocks of one district. This is',
  opts: ['spatial classification', 'temporal classification', 'qualitative classification', 'quantitative classification'],
  sol: 'The rows differ by place, so the classification is spatial (geographical). Nothing here is arranged by time or by an attribute, and the blocks are not classes of a measurable size.',
}));
Q('m_classif_quant', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Households of the imagined Madhav Nagar are grouped by monthly electricity use into 0 to 100 units, 100 to 200 units and 200 to 300 units, and the number of households in each group is given. The classification is',
  opts: ['quantitative', 'qualitative', 'temporal', 'spatial'],
  sol: 'Grouping by the size of a measurable variable, here units used, is quantitative classification. Qualitative classification uses attributes that cannot be measured, such as occupation, and the other two use time and place.',
}));
Q('m_forms', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The three forms in which collected data can be presented are',
  opts: ['textual, tabular and diagrammatic', 'primary, secondary and tertiary', 'census, sample and pilot', 'simple, multiple and component'],
  sol: 'Data can be written in sentences (textual), arranged in rows and columns (tabular) or drawn as pictures and graphs (diagrammatic). The other sets name kinds of data, methods of enquiry, or kinds of bar diagram.',
}));
Q('m_rowtotal', mcq({
  t: 1, d: 2, c: 'application',
  stem: `In the imagined district of Devgarh, rice output in the North, Central and South blocks is ${CT[1].join(', ')} thousand tonnes. The row total shown for rice in the table is`,
  opts: [`${rowTot[1]} thousand tonnes`, `${CT[1][0] + CT[1][1]} thousand tonnes`, `${CT[1][1] + CT[1][2]} thousand tonnes`, `${grand} thousand tonnes`],
  sol: `A row total adds all the entries of the row: ${CT[1].join(' + ')} = ${rowTot[1]}. ${CT[1][0] + CT[1][1]} leaves out the South block, ${CT[1][1] + CT[1][2]} leaves out the North block, and ${grand} is the grand total of all crops.`,
}));

// ================================================================ t02 Diagrams: bar and pie
Q('m_bar_height', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'In a simple bar diagram of yearly rainfall in the imagined Meghnad region, the information is carried by',
  opts: ['the height of each bar only', 'the width of each bar only', 'both the height and the width of each bar', 'the colour of each bar'],
  sol: 'All bars have the same width, so only their height (or length) shows the value. Width and colour are chosen for looks and should not be read as data.',
}));
Q('m_bar_equal', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'While drawing a bar diagram of pulses output for five imagined districts, the bars should be drawn',
  opts: ['with equal width and equal gaps between them', 'with width proportional to the output', 'touching each other with no gaps', 'with different gaps so that larger bars stand out'],
  sol: 'Equal width and equal gaps keep the eye on the heights. Bars that touch are the mark of a histogram, and bars of unequal width would give a false impression of size.',
}));
Q('m_multi_when', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The owner of an imagined tailoring shop wants to compare, month by month for six months, the number of shirts stitched with the number of trousers stitched. The most suitable diagram is',
  opts: ['a multiple (grouped) bar diagram', 'a pie diagram', 'a histogram', 'a less than ogive'],
  sol: 'Two related series over the same months are compared side by side in a multiple bar diagram. A pie diagram shows the parts of one total, and a histogram and an ogive are for frequency distributions of a continuous variable.',
}));
Q('m_component', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In a component (sub-divided) bar diagram of crop output of the imagined Devgarh district, each bar is cut into parts. The parts show',
  opts: ['the components that make up the total shown by the whole bar', 'the same total repeated in different colours', 'the frequencies of class intervals', 'the change in the total over time'],
  sol: 'A sub-divided bar shows the total as the full bar and its components as stacked segments. The segments are not repeated totals, and they are not class frequencies.',
}));
Q('m_pct_comp', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'A percentage component bar diagram of the three blocks of Devgarh differs from the ordinary component bar diagram because',
  opts: ['every bar has the same height, and its parts show shares as percentages of that bar\'s total', 'every bar is divided into equal parts', 'the bars are drawn touching each other', 'the heights of the bars show the totals of the blocks'],
  sol: 'In the percentage form every bar stands for 100 per cent, so the shares of unequal totals can be compared directly. Equal parts would show nothing, touching bars belong to histograms, and the bar heights no longer show totals.',
}));
Q('m_pie_formula', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The angle at the centre of a sector in a pie diagram is found as',
  opts: ['(value of the component ÷ total) × 360°', '(value of the component ÷ total) × 100°', '(total ÷ value of the component) × 360°', 'value of the component × 360°'],
  sol: 'A sector\'s share of the circle must equal the component\'s share of the total, and the full circle is 360 degrees. The other expressions do not give an angle in proportion to the share.',
}));
Q('m_pie_value', mcq({
  t: 2, d: 2, c: 'application',
  stem: `An imagined family spends ${inr(MQ.food)} on transport out of a monthly budget of ${inr(MQ.total)}. In a pie diagram the sector for transport has an angle of`,
  opts: [`${mqAng}°`, `${(MQ.food / MQ.total) * 100}°`, `${mqAng / 2}°`, `${mqAng * 2}°`],
  sol: `Angle = (${MQ.food} ÷ ${MQ.total}) × 360° = ${mqAng}°. ${(MQ.food / MQ.total) * 100}° is the share in per cent mistaken for degrees, ${mqAng / 2}° halves the angle and ${mqAng * 2}° doubles it.`,
}));
Q('m_pie_limit', mcq({
  t: 2, d: 3, c: 'evaluation',
  stem: 'Which of these is a genuine limitation of a pie diagram?',
  opts: ['It is hard to read and compare sectors when there are many small components', 'It cannot show the share of a component in the total', 'It can be drawn only for data in percentages', 'It needs the components to add up to more than the total'],
  sol: 'With many thin sectors a pie becomes crowded, and sectors of near-equal size are hard to compare. A pie does show shares, can be drawn from absolute values by converting to angles, and its components must add up exactly to the total.',
}));

// ================================================================ t03 Frequency diagrams and line graphs
Q('m_hist_gaps', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A histogram of the weights of 60 parcels at the imagined Kulwant Post Office has rectangles standing side by side without gaps because',
  opts: ['the classes are continuous, with the upper limit of one class equal to the lower limit of the next', 'all the frequencies are equal', 'the class widths have been chosen at random', 'a histogram needs less space than a bar diagram'],
  sol: 'A continuous variable has no break between classes, so the rectangles touch. Frequencies need not be equal, class widths are chosen on purpose and saving space is not the reason.',
}));
Q('m_hist_unequal', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'In a histogram of the imagined Kishan Brick Kiln wages, one class is twice as wide as the lowest class. For the areas of the rectangles to stay proportional to the frequencies, the height for that class must be',
  opts: ['its frequency divided by its width, multiplied by the lowest width (the adjusted frequency)', 'its frequency, without any change', 'its class mark', 'its cumulative frequency'],
  sol: 'In a histogram area, not height, represents frequency. A wide class would look too large if its raw frequency were used, so its frequency is spread over a standard width. Class marks and cumulative frequencies are not heights of a histogram.',
}));
Q('m_polygon_join', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A frequency polygon drawn over the histogram of daily output of the imagined Anand Bolt Works is obtained by joining',
  opts: ['the mid-points of the tops of the rectangles with straight lines', 'the upper-right corners of the rectangles with a smooth curve', 'the lower limits of the classes', 'the centres of the bases of the rectangles'],
  sol: 'The polygon joins the points whose x values are the class marks and whose heights are the frequencies, which are the mid-points of the tops of the rectangles. Joining corners or base centres does not give that figure, and a smooth curve would be a frequency curve.',
}));
Q('m_polygon_close', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'To complete the frequency polygon so that it forms a closed figure with the horizontal axis, the polygon is extended at each end to',
  opts: ['the class mark of an imaginary class with zero frequency', 'the origin of the graph', 'the highest frequency', 'the median class'],
  sol: 'An imaginary class with zero frequency is added before the first and after the last class, and the line is brought down to its class mark on the axis. The origin and the median class have no role in closing the figure.',
}));
Q('m_ogive_less', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'To draw a less than ogive, the cumulative frequencies are plotted against',
  opts: ['the upper limits of the classes', 'the lower limits of the classes', 'the class marks', 'the class widths'],
  sol: 'A less than cumulative frequency counts the items below an upper limit, so it is paired with that upper limit. Lower limits are used for the more than ogive.',
}));
Q('m_ogive_more', mcq({
  t: 3, d: 3, c: 'application',
  stem: `For the waiting times of the ${clN} patients of the imagined Rajpur clinic, the point to be plotted for the class starting at 15 minutes on the more than ogive is (15, ${clMoreAt15}). The ${clMoreAt15} stands for`,
  opts: ['patients who waited 15 minutes or more', 'patients who waited less than 15 minutes', 'patients who waited exactly 15 minutes', 'the frequency of the class 15 to 20'],
  sol: `A more than point at a lower limit counts all items at or above it: ${clN} − ${clCum[2]} = ${clMoreAt15}. ${clCum[2]} is the less than figure at 15, and the frequency of the class 15 to 20 is ${CL[3][2]}, not ${clMoreAt15}.`,
}));
Q('m_ogive_cross', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'When the less than and more than ogives of a series are drawn on the same graph, the value of the variable at the point where they intersect is the',
  opts: ['median', 'mean', 'mode', 'range'],
  sol: 'At the crossing point the number of items below the value equals the number above it, so the value divides the series into two equal halves, which is the median. The mean and the mode are not read from this point.',
}));
Q('m_ts_axes', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In an arithmetic line graph (time series graph) of the yearly sales of an imagined firm, the usual arrangement of axes is',
  opts: ['time on the horizontal axis and sales on the vertical axis', 'sales on the horizontal axis and time on the vertical axis', 'class marks on the horizontal axis and frequencies on the vertical axis', 'cumulative frequencies on both axes'],
  sol: 'A time series graph places time on the x-axis and the variable on the y-axis, and the points are joined in time order. The other pairings belong to other diagrams or are not used.',
}));

// ---- assertion-reason
Q('ar_pie_360', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'The angles of all the sectors of a pie diagram add up to 360 degrees.',
  r: 'The sectors together make up the whole circle, which stands for the total of all the components.',
  sol: 'Both are true. Each sector is a share of the circle, and the shares of the total add up to the whole, so the angles must fill the full 360 degrees.',
}));
Q('ar_hist_nogap', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The rectangles of a histogram of a continuous series touch one another.',
  r: 'The bars of a simple bar diagram are kept apart by equal gaps.',
  sol: 'Both statements are true, but R does not explain A. A is true because continuous classes follow each other without a break; R is a separate rule for a different diagram.',
}));
Q('ar_pct_comp', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'A percentage component bar diagram suits a comparison of how the make-up of totals of different sizes varies.',
  r: 'In it every bar has the same height and its parts show shares in per cent of that bar\'s total.',
  sol: 'Both are true and R explains A. When all bars stand for 100 per cent, the difference in the size of the totals is removed and only the make-up is compared.',
}));
Q('ar_ogive_median', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'The less than and more than ogives of a series cross at the median.',
  r: 'At the crossing point the cumulative frequency of each ogive is half the total frequency.',
  sol: 'Both are true and R explains A. The value at which the items below equal the items above, each half of the total, is the median, and that is the point where the two curves meet.',
}));
Q('ar_ts_line', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'In a time series graph the points are plotted with time on the horizontal axis.',
  r: 'A time series graph is drawn by plotting class frequencies against the lower limits of classes.',
  sol: 'A is true. R is false, because plotting frequencies against class limits is how frequency diagrams and ogives are drawn; a time series graph plots the variable against time periods.',
}));
Q('ar_bar_width', ar({
  t: 2, d: 3, c: 'evaluation', verdict: 'A-false-R-true',
  a: 'In a simple bar diagram, a larger value is shown by making its bar wider.',
  r: 'Only the height of a bar carries meaning in a simple bar diagram.',
  sol: 'A is false: bars of a simple bar diagram are equally wide and the value is shown by height. R is true, and it is the reason A is wrong.',
}));

// ---- true-false, fill-blank, match, ordering
Q('tf_pie_sum', tf({
  t: 2, d: 2, c: 'application', ans: true,
  stem: `True or false? For the imagined Sunrise Cafe, the sector angles of ${CAFE.map((c) => c[0].toLowerCase()).join(', ')} come out as ${cafeAng.map((a) => a + '°').join(', ')}, which add up to 360°.`,
  sol: `${cafeAng.join(' + ')} = ${sum(cafeAng)}, so the statement is true.`,
}));
Q('tf_hist_unequal', tf({
  t: 3, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? When the class intervals of a continuous series have unequal widths, the heights of the histogram rectangles can simply be the class frequencies.',
  sol: 'With unequal widths the heights must be adjusted frequencies, so that area stays proportional to frequency; raw frequencies would exaggerate the wide classes.',
}));
Q('tf_source_note', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? A well-made table states the source of its figures, usually in a note below the table.',
  sol: 'The source note tells the reader where the data came from and lets the figures be checked, so it is part of a complete table.',
}));
Q('fb_stub_caption', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The headings of the rows of a table are called ___ and the headings of its columns are called ___.',
  acc: [['stubs', 'stub'], ['captions', 'caption']],
  sol: 'Row headings are stubs, and column headings are captions.',
}));
Q('fb_360', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The sector angles of a pie diagram always add up to ___ degrees.',
  acc: [['360']],
  sol: 'Together the sectors fill the whole circle, which is 360 degrees.',
}));
Q('fb_ogive_median', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'The less than ogive and the more than ogive of a series intersect at the value of its ___.',
  acc: [['median']],
  sol: 'The crossing point marks the median of the series.',
}));
Q('mt_parts', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each part of a table with what it does.',
  pairs: [
    ['Caption', 'Heading of a column'],
    ['Stub', 'Heading of a row'],
    ['Source note', 'Tells where the figures were obtained'],
    ['Unit of measurement', 'Tells in what terms the figures are expressed, such as thousand tonnes'],
  ],
  sol: 'Captions head the columns and stubs head the rows; the source note names the origin of the data; the unit states how the figures are measured.',
}));
Q('mt_diagrams', match({
  t: 3, d: 3, c: 'application',
  stem: 'Match each imagined presentation task with the diagram that suits it best.',
  pairs: [
    ['Showing how the five heads share a college\'s annual budget', 'Pie diagram'],
    ['Showing how many parcels were delivered within 2, 4, 6, 8 and 10 hours', 'Ogive'],
    ['Showing the number of labourers in each wage class of a kiln', 'Histogram'],
    ['Showing the yearly sales of a firm over eight years', 'Arithmetic line graph'],
  ],
  sol: 'Shares of a total call for a pie; cumulative counts for a limit call for an ogive; a continuous frequency distribution is a histogram; values over time are a line graph.',
}));
Q('ord_pie', ord({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Arrange the steps of drawing a pie diagram of an imagined household budget in a sensible order.',
  items: [
    'Add the amounts to get the total',
    'Work out the angle of each component as its share of the total times 360 degrees',
    'Draw a circle and mark a starting radius',
    'Mark off each sector in turn with a protractor and label it',
  ],
  sol: 'The total comes first, then the angles; the circle is drawn and the sectors are marked off one after another.',
}));
Q('ord_ogive', ord({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps of drawing a less than ogive for the delivery times of parcels of an imagined courier.',
  items: [
    'Write the classes with their frequencies',
    'Add the frequencies successively to get cumulative frequencies',
    'Plot each cumulative frequency against the upper limit of its class',
    'Join the plotted points with a smooth curve',
  ],
  sol: 'Cumulative frequencies can be found only after the table of frequencies exists, and they must be found before plotting and joining.',
}));

// ---- numerical
Q('n_angle_cafe', num({
  t: 2, d: 2, c: 'application', value: cafeAng[1], unit: 'degrees',
  stem: `The imagined Sunrise Cafe spends ${inr(cafeTot)} a month: ${CAFE.map((c) => `${c[0].toLowerCase()} ${inr(c[1])}`).join(', ')}. In a pie diagram of these costs, find the angle of the sector for wages.`,
  sol: `Step 1: Share of wages = ${CAFE[1][1]} ÷ ${cafeTot}.\nStep 2: Angle = (${CAFE[1][1]} ÷ ${cafeTot}) × 360° = ${cafeAng[1]}°.`,
}));
Q('n_sector_value', num({
  t: 2, d: 3, c: 'application', value: schValue, unit: 'rupees',
  stem: `A pie diagram of the ${inr(SCH.fund)} fund of the imagined Harsh Valley School shows the sector for sports as ${SCH.angle}°. Find the amount spent on sports in rupees.`,
  sol: `Step 1: The sector is ${SCH.angle} ÷ 360 of the circle.\nStep 2: Amount = (${SCH.angle} ÷ 360) × ${SCH.fund} = ${schValue} rupees.`,
}));
Q('n_share_central', num({
  t: 2, d: 3, c: 'application', value: share[1][1], unit: '%',
  stem: `In the imagined district of Devgarh the Central block grew ${CT.map((r) => r[1]).join(', ')} thousand tonnes of ${CROPS.map((c) => c.toLowerCase()).join(', ')} respectively. In a percentage component bar for this block, what share does rice have, in per cent?`,
  sol: `Step 1: Total for the block = ${CT.map((r) => r[1]).join(' + ')} = ${colTot[1]}.\nStep 2: Rice share = ${CT[1][1]} ÷ ${colTot[1]} × 100 = ${S(share[1][1])} per cent.`,
}));
Q('n_adj_colony', num({
  t: 3, d: 3, c: 'application', value: acAdj[2], unit: 'households',
  stem: `The ${sum(AC.map((c) => c[2]))} households of the imagined Ashoka Colony are grouped by monthly electricity use (units): ${AC.map((c) => `${c[0]} to ${c[1]}: ${c[2]}`).join('; ')}. Taking the lowest class width as the standard, find the adjusted frequency of the class 200 to 400.`,
  sol: `Step 1: Width of 200 to 400 = ${acW[2]}; lowest width = ${Math.min(...acW)}.\nStep 2: Adjusted frequency = ${AC[2][2]} ÷ ${acW[2]} × ${Math.min(...acW)} = ${acAdj[2]}.`,
}));
Q('n_cum_clinic', num({
  t: 3, d: 2, c: 'application', value: clCum[2], unit: 'patients',
  stem: `Waiting times (minutes) of ${clN} patients at the imagined Rajpur clinic: ${CL.map((c) => `${c[0]} to ${c[1]}: ${c[2]}`).join('; ')}. How many patients waited less than 15 minutes?`,
  sol: `Step 1: Add the frequencies of the classes below 15 minutes: ${CL.slice(0, 3).map((c) => c[2]).join(' + ')}.\nStep 2: The less than cumulative frequency at 15 is ${clCum[2]} patients.`,
}));
Q('n_more_clinic', num({
  t: 3, d: 3, c: 'application', value: clMoreAt15, unit: 'patients',
  stem: `Use the waiting-time series of the imagined Rajpur clinic (${CL.map((c) => `${c[0]} to ${c[1]}: ${c[2]}`).join('; ')}). Find the more than cumulative frequency at the lower limit 15 minutes.`,
  sol: `Step 1: Patients waiting less than 15 minutes = ${clCum[2]}.\nStep 2: More than at 15 = ${clN} − ${clCum[2]} = ${clMoreAt15} patients.`,
}));
Q('n_median_clinic', num({
  t: 3, d: 4, c: 'application', value: clMed.median, unit: 'minutes', tol: 0.01,
  stem: `The two ogives of the imagined Rajpur clinic waiting times (${CL.map((c) => `${c[0]} to ${c[1]}: ${c[2]}`).join('; ')}) cross at the median. Find the median waiting time in minutes from the cumulative frequencies.`,
  sol: `Step 1: N ÷ 2 = ${clN} ÷ 2 = ${clN / 2}; cumulative frequencies are ${clCum.join(', ')}, so the median class is ${clMed.L} to ${clMed.L + clMed.h} with cf before it = ${clMed.cf} and f = ${clMed.f}.\nStep 2: Median = ${clMed.L} + (${clN / 2} − ${clMed.cf}) ÷ ${clMed.f} × ${clMed.h} = ${S(clMed.median)} minutes.`,
}));
Q('n_mark_end', num({
  t: 3, d: 2, c: 'application', value: factMarks[factMarks.length - 1] + (FACT[0][1] - FACT[0][0]), unit: 'crates',
  stem: `The daily output of the imagined Anand Bolt Works is grouped in classes ${FACT.map((c) => `${c[0]} to ${c[1]}`).join(', ')} crates. To close the frequency polygon on the right, an imaginary class of the same width is added after the last class. Find its class mark.`,
  sol: `Step 1: The last class is ${FACT[6][0]} to ${FACT[6][1]}, so the imaginary class is ${FACT[6][1]} to ${FACT[6][1] + 10}.\nStep 2: Its class mark = (${FACT[6][1]} + ${FACT[6][1] + 10}) ÷ 2 = ${factMarks[6] + 10} crates.`,
}));
Q('n_growth_cycles', num({
  t: 3, d: 3, c: 'application', value: ncGrowth, unit: '%',
  stem: `Yearly sales of the imagined Neel Cycles, in units, from ${NC_Y[0]} to ${NC_Y[4]}: ${NC.join(', ')}. Read from the line graph, by what percentage did sales in ${NC_Y[4]} exceed those of ${NC_Y[0]}?`,
  sol: `Step 1: Increase = ${NC[4]} − ${NC[0]} = ${NC[4] - NC[0]} units.\nStep 2: Percentage increase = ${NC[4] - NC[0]} ÷ ${NC[0]} × 100 = ${ncGrowth} per cent.`,
}));
Q('n_missing_cell', num({
  t: 1, d: 2, c: 'application', value: pwMissing, unit: 'students',
  stem: `A table of the imagined Pinewood School shows the members of three clubs of Class 11. The column total is ${PW.total} students; two of the three entries are ${PW.known.join(' and ')}. Find the missing entry.`,
  sol: `Step 1: Sum of the known entries = ${PW.known.join(' + ')} = ${sum(PW.known)}.\nStep 2: Missing entry = ${PW.total} − ${sum(PW.known)} = ${pwMissing} students.`,
}));

// ---- short 2-mark
Q('s2_forms', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the three forms of presenting data and state one use of the tabular form.',
  model: 'The three forms are **textual (descriptive)**, **tabular** and **diagrammatic** presentation. A table arranges figures in rows and columns, so that related figures can be compared and totals read at a glance.',
  sol: 'Three forms named, one use of tables.',
  scheme: [['Three forms named', 1], ['One use of tables', 1]],
}));
Q('s2_caption_stub', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'In a table of crop output of the imagined Devgarh district with the crops down the left and the blocks across the top, which are the stubs and which are the captions?',
  model: 'The **stubs** are the row headings, here the names of the crops (wheat, rice, pulses and oilseeds). The **captions** are the column headings, here the names of the blocks (North, Central and South).',
  sol: 'Stubs are the row headings and captions are the column headings.',
  scheme: [['Stubs identified', 1], ['Captions identified', 1]],
}));
Q('s2_unit_footnote', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why does a table state the unit of measurement, and what is a footnote used for?',
  model: 'The **unit** (such as thousand tonnes or rupees) tells the reader how to read every figure, so it is stated above the table or beside the headings. A **footnote** explains a particular entry or exception, for example that a figure is provisional.',
  sol: 'Purpose of the unit and of a footnote.',
  scheme: [['Purpose of the unit', 1], ['Purpose of a footnote', 1]],
}));
Q('s2_classif', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish qualitative classification from quantitative classification with an imagined example of each.',
  model: '**Qualitative** classification groups items by an attribute that cannot be measured in numbers, such as the trade of workers in an imagined mill. **Quantitative** classification groups them by the size of a measurable variable, such as the monthly wages of those workers in class intervals.',
  sol: 'Attribute versus measurable size, each with an example.',
  scheme: [['Qualitative with example', 1], ['Quantitative with example', 1]],
}));
Q('s2_temporal_spatial', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'A table gives the wheat output of three imagined villages for each of five years. State the temporal classification and the spatial classification found in it.',
  model: 'The classification **by years** is **temporal**, since the data are arranged by time. The classification **by villages** is **spatial** (geographical), since the data are arranged by place.',
  sol: 'Years are temporal; villages are spatial.',
  scheme: [['Temporal classification identified', 1], ['Spatial classification identified', 1]],
}));
Q('s2_bar_rules', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two rules to be followed while drawing the bars of a bar diagram. Why must they be followed?',
  model: 'The bars must have **equal width** and **equal gaps** between them. Then only the **height** of a bar changes, so a reader compares values by height and is not misled by differences in width or spacing.',
  sol: 'Equal width and equal gaps; reason is that only height carries meaning.',
  scheme: [['Two rules stated', 1], ['Reason given', 1]],
}));
Q('s2_multi_comp', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A student wants to show both the total crop output of each block of Devgarh and how each total divides among the crops. Should she use a multiple bar or a component bar diagram? Give a reason.',
  model: 'A **component (sub-divided) bar diagram**. Each bar\'s full height shows the block total, and its stacked segments show the crops that make up that total. A multiple bar would show the crops side by side but not the total as a single bar.',
  sol: 'Component bar shows the total and its parts together.',
  scheme: [['Component bar named', 1], ['Reason: total and parts in one bar', 1]],
}));
Q('s2_pie_calc', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `The imagined Orchard Club receives ${inr(libTot)} for its library: books ${inr(libAng.length ? LIBF[0][1] : 0)} and journals ${inr(LIBF[1][1])}, the rest going to furniture and repairs. Find the pie angles for books and for journals.`,
  model: `The angle of a sector is the share of the component in the total, multiplied by 360°. Books: ${LIBF[0][1]} ÷ ${libTot} × 360° = **${libAng[0]}°**. Journals: ${LIBF[1][1]} ÷ ${libTot} × 360° = **${libAng[1]}°**. The remaining two heads share the rest of the circle.`,
  sol: `Angles ${libAng[0]}° and ${libAng[1]}°.`,
  scheme: [['Angle for books', 1], ['Angle for journals', 1]],
}));
Q('s2_hist_bar', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two differences between a histogram and a bar diagram.',
  model: 'A **histogram** has rectangles **touching each other**, because it shows a continuous series, and its **area** represents frequency. A **bar diagram** has **separate bars of equal width** and only the height carries meaning.',
  sol: 'Touching versus separate; area versus height.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
Q('s2_polygon_close', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How is a frequency polygon drawn from a series of equal classes, and how is it closed at both ends?',
  model: 'Plot the **class mark** of each class against its **frequency** and join the points by straight lines. To close it, add an **imaginary class with zero frequency** at each end and bring the line down to the class marks of those classes on the axis.',
  sol: 'Class marks against frequencies, joined; closed with zero-frequency classes.',
  scheme: [['Plotting and joining', 1], ['Closing at both ends', 1]],
}));

// ---- short 3-mark
Q('s3_table_parts', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name any three parts of a table and say what each shows, using a table of crop output of an imagined district as your example.',
  model: '1. **Title:** says what the data are, where and when, for example Crop output by block, Devgarh district.\n2. **Captions and stubs:** column and row headings, here the block names and the crop names.\n3. **Unit and source note:** the unit (thousand tonnes) says how to read the figures, and the source note says where they came from.',
  sol: 'Any three parts, each with its role.',
  scheme: [['First part with role', 1], ['Second part with role', 1], ['Third part with role', 1]],
}));
Q('s3_bar_pie', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare a simple bar diagram with a pie diagram on what is shown, how the values are read and when each is suited.',
  model: '1. **What is shown:** a bar diagram shows the size of each item; a pie shows each part as a share of one total.\n2. **Reading:** in a bar the value is read from height; in a pie from the angle of a sector, worked out as value ÷ total × 360°.\n3. **Suitability:** bars suit comparing many items or separate totals; a pie suits a few components of a single total.',
  sol: 'Three points of comparison.',
  scheme: [['What each shows', 1], ['How values are read', 1], ['When each is suited', 1]],
}));
Q('s3_pie_three', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `The imagined Naidu family spends ${inr(naiTot)} a month: ${NAI.map((c) => `${c[0].toLowerCase()} ${inr(c[1])}`).join(', ')}. Find the angles of the sectors for food, rent and savings in a pie diagram.`,
  model: `The total is ${naiTot}, and each angle is the amount divided by the total and multiplied by 360°. Food: ${NAI[0][1]} ÷ ${naiTot} × 360° = **${naiAng[0]}°**. Rent: ${NAI[1][1]} ÷ ${naiTot} × 360° = **${naiAng[1]}°**. Savings: ${NAI[3][1]} ÷ ${naiTot} × 360° = **${naiAng[3]}°**. The other two heads fill the rest of the circle.`,
  sol: `Angles ${naiAng[0]}°, ${naiAng[1]}° and ${naiAng[3]}°.`,
  scheme: [['Food angle', 1], ['Rent angle', 1], ['Savings angle', 1]],
}));
Q('s3_adjusted', short({
  t: 3, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `A table of the imagined Ashoka Colony groups ${sum(AC.map((c) => c[2]))} households by electricity units: ${AC.map((c) => `${c[0]} to ${c[1]}: ${c[2]}`).join('; ')}. Find the adjusted frequencies for a histogram with the lowest width as the standard.`,
  model: `The widths are ${acW.join(', ')}, so the standard is ${Math.min(...acW)}. Adjusted frequencies: ${AC.map((c, i) => `${c[2]} ÷ ${acW[i]} × ${Math.min(...acW)} = ${acAdj[i]}`).join('; ')}. These are the heights of the rectangles.`,
  sol: `Heights ${acAdj.join(', ')}.`,
  scheme: [['Widths and standard width', 1], ['First two adjusted frequencies', 1], ['Last two adjusted frequencies', 1]],
}));
Q('s3_ogive_median', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `The delivery times (hours) of ${courN} parcels of the imagined Sunbeam Courier have cumulative less than frequencies ${courCum.join(', ')} at the upper limits ${COUR.map((c) => c[1]).join(', ')}. Explain why the two ogives meet at the median, and state the value of the cumulative frequency where they meet.`,
  model: `At the meeting point the number of parcels below the delivery time equals the number above it, so the value splits the ${courN} parcels into two equal halves, which is the median. Each ogive then shows ${courN} ÷ 2 = **${courN / 2}** parcels, and the median is ${S(courMed.median)} hours.`,
  sol: `Equal numbers below and above; cumulative frequency ${courN / 2}; median ${S(courMed.median)} hours.`,
  scheme: [['Equal numbers below and above', 1], ['Cumulative frequency at the crossing computed', 1], ['Median value linked to it', 1]],
}));
Q('s3_ts', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Yearly sales of the imagined Neel Cycles in units for ${NC_Y[0]} to ${NC_Y[4]} are ${NC.join(', ')}. Describe how to draw its arithmetic line graph and state the year in which sales fell.`,
  model: `Mark **time (years)** on the horizontal axis and **sales (units)** on the vertical axis, with a convenient scale and a title. Plot a point for each year and join the points with straight lines in order of time. The line slopes downward only once: sales fell in **${NC_Y[2]}**, from ${NC[1]} to ${NC[2]} units.`,
  sol: `Axes, plotting and joining, and the year of fall, ${NC_Y[2]}.`,
  scheme: [['Axes chosen correctly', 1], ['Points plotted and joined', 1], ['Year of fall identified', 1]],
}));

// ---- long 5-mark
Q('l_table', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `The weekly market of the imagined village of Hariharpur sold ${VEG.v[0].map((v, j) => `${v} kg of ${VEG.cols[j].toLowerCase()}`).join(', ')} on Tuesday, and ${VEG.v[1].map((v, j) => `${v} kg of ${VEG.cols[j].toLowerCase()}`).join(', ')} on Friday. Present these facts as a table with row and column totals, and name the parts you have used.`,
  model: `**Table 1: Vegetables sold at the Hariharpur weekly market (kg)**\n\n| Day | Tomatoes | Onions | Potatoes | Total |\n|---|---|---|---|---|\n| Tuesday | ${VEG.v[0].join(' | ')} | ${vegRow[0]} |\n| Friday | ${VEG.v[1].join(' | ')} | ${vegRow[1]} |\n| Total | ${vegCol.join(' | ')} | ${vegAll} |\n\nSource: market register. The **table number and title** come first; the days are the **stubs**, the vegetables the **captions**; the **unit** is kg and the **source note** is below.`,
  sol: 'Title, headings, correct body, totals and unit with source.',
  scheme: [['Table number and title', 1], ['Stubs and captions', 1], ['Body figures entered correctly', 1], [`Row totals ${vegRow.join(' and ')} and column totals ${vegCol.join(', ')}`, 1], ['Unit and source note', 1]],
}));
Q('l_bars', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the simple, multiple and component bar diagrams, saying what each shows. Also explain how the percentage form of the component bar diagram is useful.',
  model: '1. A **simple bar diagram** shows one series, such as the yearly output of one crop, with one bar for each item.\n2. A **multiple (grouped) bar diagram** puts two or more related series side by side for each item, for comparison.\n3. A **component (sub-divided) bar diagram** divides each bar into parts that show the components of its total.\n4. In every case the bars have **equal width and equal gaps**; only height carries meaning.\n5. The **percentage component bar** makes every bar 100 per cent, so the make-up of totals of unequal size can be compared directly.',
  sol: 'Three types described, the rule on bars, and the use of the percentage form.',
  scheme: [['Simple bar', 1], ['Multiple bar', 1], ['Component bar', 1], ['Equal width and gaps', 1], ['Percentage component bar', 1]],
}));
Q('l_pie', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `The imagined Lakshya Coaching Institute has a monthly budget of ${inr(lakTot)}: ${LAK.map((c) => `${c[0].toLowerCase()} ${inr(c[1])}`).join(', ')}. Compute the sector angles for a pie diagram, show that they add up correctly and describe how the diagram is drawn.`,
  model: `The total is ${lakTot}, so angle = amount ÷ ${lakTot} × 360°. ${LAK.map((c, i) => `${c[0]}: ${c[1]} ÷ ${lakTot} × 360° = **${lakAng[i]}°**`).join('; ')}. Check: ${lakAng.join(' + ')} = **${sum(lakAng)}°**, the full circle. To draw the diagram, make a circle, mark a starting radius, and with a protractor mark off the sectors in turn, then label each with its head and angle.`,
  sol: `Angles ${lakAng.join(', ')}; total ${sum(lakAng)}.`,
  scheme: [['Formula stated', 1], ['First three angles', 1], ['Remaining angles', 1], [`Check that the sum is ${sum(lakAng)}`, 1], ['Method of drawing', 1]],
}));
Q('l_hist_poly', long({
  t: 3, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `The monthly water bills (rupees) of ${sum(GW.map((c) => c[2]))} households of the imagined Gulmohar Residents' Association are grouped as ${GW.map((c) => `${c[0]} to ${c[1]}: ${c[2]}`).join('; ')}. Find the heights for a histogram, and say how a frequency polygon would be added.`,
  model: `Widths are ${gwW.join(', ')}; the standard width is ${Math.min(...gwW)}. Adjusted frequencies: ${GW.map((c, i) => `${c[2]} ÷ ${gwW[i]} × ${Math.min(...gwW)} = ${gwAdj[i]}`).join('; ')}. Draw touching rectangles of these heights. For the **polygon**, join the mid-points of the tops of the rectangles with straight lines, and extend the ends to the axis at the class marks of imaginary classes.`,
  sol: `Heights ${gwAdj.join(', ')}; polygon by joining mid-points.`,
  scheme: [['Widths and standard width', 1], ['Adjusted frequencies computed', 1], ['Histogram described correctly', 1], ['Polygon by joining mid-points', 1], ['Closing at both ends', 1]],
}));
Q('l_ogive', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `The delivery times (hours) of ${courN} parcels of the imagined Sunbeam Courier are ${COUR.map((c) => `${c[0]} to ${c[1]}: ${c[2]}`).join('; ')}. Give the less than and more than cumulative frequencies, and show how the two ogives give the median.`,
  model: `Less than cumulative frequencies at the upper limits: ${COUR.map((c, i) => `${c[1]}: ${courCum[i]}`).join('; ')}. More than cumulative frequencies at the lower limits: ${COUR.map((c, i) => `${c[0]}: ${courMore[i]}`).join('; ')}. Plot the less than points against upper limits and the more than points against lower limits on one graph, and join each set smoothly. The curves cross at a cumulative frequency of ${courN} ÷ 2 = **${courN / 2}**, and the value on the x-axis below that point is the median, **${S(courMed.median)} hours**.`,
  sol: `Cumulative frequencies listed; ogives cross at ${courN / 2} and ${S(courMed.median)} hours.`,
  scheme: [['Less than frequencies', 1], ['More than frequencies', 1], ['Plotting against limits', 1], [`Crossing at ${courN / 2}`, 1], [`Median ${S(courMed.median)} hours`, 1]],
}));
Q('l_forms', long({
  t: 1, d: 3, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Compare textual, tabular and diagrammatic presentation of data, stating a merit and a limit of each, and say when you would choose each.',
  model: '1. **Textual:** data in sentences. Merit: suits a few figures and brings in explanation. Limit: many figures become hard to follow.\n2. **Tabular:** rows and columns. Merit: precise figures, easy comparison and totals. Limit: a long table can tire the eye.\n3. **Diagrammatic:** bars, pies, graphs. Merit: striking, shows pattern at a glance. Limit: exact values are hard to read.\n4. Choose text for a few facts, a table for exact figures and a diagram to show a pattern to a wide audience.',
  sol: 'Three forms with merits and limits, and a choice rule.',
  scheme: [['Textual', 1], ['Tabular', 1], ['Diagrammatic', 1], ['Merit and limit for each', 1], ['Reasoned choice', 1]],
}));

// ---- case-based
Q('cb_budget', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined passage and answer the questions that follow.',
  passage: `**Imagined household budget of the Naidu family**\n\nThe Naidu family of an imagined town has a monthly income of ${inr(naiTot)}. They spend ${NAI.map((c) => `${inr(c[1])} on ${c[0].toLowerCase()}`).join(', ')}. The eldest child draws a pie diagram of this budget for a school project.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the angle of the sector for food.', model: `${NAI[0][1]} ÷ ${naiTot} × 360° = **${naiAng[0]}°**.`, sol: `Food angle ${naiAng[0]}°.`, scheme: [['Correct angle', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'What per cent of the income is saved?', model: `${NAI[3][1]} ÷ ${naiTot} × 100 = **${naiPct[3]} per cent**.`, sol: `Savings are ${naiPct[3]} per cent of income.`, scheme: [['Correct percentage', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Find the angle of the sector for other items and check that the five angles add up to the whole circle.', model: `Other items: ${NAI[4][1]} ÷ ${naiTot} × 360° = **${naiAng[4]}°**. Check: ${naiAng.join(' + ')} = **${sum(naiAng)}°**.`, sol: 'Angle for other items and the check of 360 degrees.', scheme: [['Angle for other items', 1], ['Sum checked to 360 degrees', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): The child wants to compare this family\'s budget with a second family whose income is double. Should she use pie diagrams of the two budgets or percentage component bars? Give a reason.', model: 'A **percentage component bar diagram** is better. Each bar stands for 100 per cent, so shares can be compared directly even though the incomes differ. Two pies of different totals are hard to compare by eye.', sol: 'Percentage bars remove the size difference of the totals.', scheme: [['Percentage component bar chosen', 1], ['Reason: totals of different size', 1]] }),
    ]),
  ],
}));
Q('cb_clinic', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined waiting times at the Rajpur clinic**\n\nThe clinic noted the waiting time, in minutes, of ${clN} patients in one week. Classes and frequencies: ${CL.map((c) => `${c[0]} to ${c[1]}: ${c[2]}`).join('; ')}. The manager wants to show these data in a histogram and a frequency polygon, and with two ogives.`,
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'What is the class mark of the class 15 to 20?', model: `(${CL[3][0]} + ${CL[3][1]}) ÷ 2 = **${clMarks[3]} minutes**.`, sol: `Class mark ${clMarks[3]}.`, scheme: [['Correct class mark', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'How many patients waited less than 20 minutes?', model: `${CL.slice(0, 4).map((c) => c[2]).join(' + ')} = **${clCum[3]} patients**.`, sol: `Cumulative frequency at 20 is ${clCum[3]}.`, scheme: [['Correct cumulative frequency', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Find the class marks of the two imaginary classes needed to close the frequency polygon.', model: `The imaginary classes are −5 to 0 and 25 to 30. Their class marks are **${(-5 + 0) / 2}** and **${(25 + 30) / 2}** minutes. The polygon is brought down to the axis at these points.`, sol: 'Imaginary classes of the same width at each end.', scheme: [['Imaginary classes identified', 1], ['Their class marks', 1]] }), [
      short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Find the median waiting time and state what it shows about the two ogives.', model: `Median = ${clMed.L} + (${clN / 2} − ${clMed.cf}) ÷ ${clMed.f} × ${clMed.h} = **${S(clMed.median)} minutes**. The two ogives intersect at this value, where each shows ${clN / 2} patients.`, sol: `Median ${S(clMed.median)} minutes, found where the ogives cross.`, scheme: [['Median computed', 1], ['Link to the intersection of the ogives', 1]] }),
    ]),
  ],
}));
Q('cb_sales', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined yearly sales of Neel Cycles**\n\nThe imagined firm Neel Cycles sold the following numbers of cycles in successive years: ${NC_Y.map((y, i) => `${y}: ${NC[i]}`).join('; ')}. The owner draws an arithmetic line graph of these figures.`,
  parts: [
    child('a', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'What is plotted on the horizontal axis of the graph?', model: '**Time**, that is, the years.', sol: 'Time goes on the x-axis.', scheme: [['Time', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'By how many cycles did sales rise from 2021 to 2022?', model: `${NC[3]} − ${NC[2]} = **${ncRise} cycles**.`, sol: `Rise of ${ncRise} cycles.`, scheme: [['Correct rise', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Find the percentage growth of sales from 2019 to 2023 and name the year in which the line of the graph slopes downward.', model: `Growth = (${NC[4]} − ${NC[0]}) ÷ ${NC[0]} × 100 = **${ncGrowth} per cent**. The line slopes down in **${NC_Y[2]}**, when sales fell from ${NC[1]} to ${NC[2]}.`, sol: `Growth ${ncGrowth} per cent; fall in ${NC_Y[2]}.`, scheme: [['Percentage growth', 1], ['Year of fall', 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): A friend says that the graph proves the firm earned more profit every year it sold more cycles. Is this a fair reading of the graph? Explain.', model: 'No. The graph shows only the **number of cycles sold**. Profit also depends on **costs and prices**, which the graph does not show, so no conclusion about profit can be drawn from it.', sol: 'The graph shows sales only, not costs.', scheme: [['Not a fair reading', 1], ['Reason: costs and prices not shown', 1]] }),
    ]),
  ],
}));
Q('cb_table', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined passage and answer the questions that follow.',
  passage: `**Imagined milk collection table of a cooperative**\n\nA clerk of an imagined dairy cooperative writes in a register: Shivpur collected ${MK.v[0][0]} litres in winter and ${MK.v[0][1]} in summer; Ramgarh ${MK.v[1][0]} in winter and ${MK.v[1][1]} in summer; Doodhgaon ${MK.v[2][0]} in winter and ${MK.v[2][1]} in summer. He rewrites this as a table with a column for each season and a row for each village, but gives it no title, no unit, no totals and no source.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name two parts of a table that the clerk has left out.', model: 'Any two of: **title, unit of measurement, totals, source note**.', sol: 'The passage lists the missing parts.', scheme: [['Two missing parts named', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'What kind of classification is made by villages?', model: '**Spatial** (geographical) classification.', sol: 'Villages are places, so it is spatial.', scheme: [['Spatial', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the total for Doodhgaon and the grand total of the table.', model: `Doodhgaon: ${MK.v[2][0]} + ${MK.v[2][1]} = **${mkRow[2]} litres**. Grand total: ${mkRow.join(' + ')} = **${mkAll} litres**.`, sol: `Doodhgaon ${mkRow[2]}, grand total ${mkAll}.`, scheme: [['Doodhgaon total', 1], ['Grand total', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Find the column totals for the two seasons and say which season had the larger collection.', model: `Winter: ${MK.v.map((r) => r[0]).join(' + ')} = **${mkCol[0]}** litres; summer: ${MK.v.map((r) => r[1]).join(' + ')} = **${mkCol[1]}** litres. **Winter** had the larger collection.`, sol: `Winter ${mkCol[0]}, summer ${mkCol[1]}; winter larger.`, scheme: [['Both column totals', 1], ['Larger season named', 1]] }),
    ]),
  ],
}));
