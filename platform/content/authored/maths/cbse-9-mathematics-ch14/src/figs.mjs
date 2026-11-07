// Data sets and figures of CBSE 9 Mathematics ch14 Statistics, shared by the deck builder and the question banks. Every raw data set is
// grouped by code, and the frequencies quoted anywhere are asserted against it; every bar is drawn from its computed height.
import { plot } from './lib.mjs';
import { chartFig, must, close, sum, groupFreq, countEach, classMarks, widths, density, mean, rd } from './h.mjs';

// ---- data set 1: shoe sizes of 30 students (raw, ungrouped)
export const SHOE = [7, 6, 8, 7, 5, 6, 7, 9, 7, 8, 6, 7, 8, 5, 7, 6, 9, 7, 8, 6, 7, 8, 6, 7, 9, 5, 7, 8, 6, 7];
export const SHOE_SIZES = [5, 6, 7, 8, 9];
export const SHOE_F = countEach(SHOE, SHOE_SIZES);
must(SHOE.length === 30 && SHOE_F.join() === '3,7,11,6,3' && sum(SHOE_F) === 30, 'shoe sizes: 3, 7, 11, 6, 3');

// ---- data set 2: minutes of homework of 40 students (raw, grouped in classes of width 15)
export const HW = [44, 12, 58, 30, 62, 22, 48, 70, 35, 15, 52, 41, 66, 8, 57, 36, 28, 51, 60, 43, 25, 55, 34, 64, 46, 18, 72, 40, 59, 32, 68, 45, 20, 54, 38, 78, 50, 42, 85, 56];
export const HW_E = [0, 15, 30, 45, 60, 75, 90];
export const HW_F = groupFreq(HW, HW_E);
must(HW.length === 40 && HW_F.join() === '2,6,11,12,7,2' && sum(HW_F) === 40, 'homework classes: 2, 6, 11, 12, 7, 2');
must(classMarks(HW_E).join() === '7.5,22.5,37.5,52.5,67.5,82.5' && widths(HW_E).every((w) => w === 15), 'homework class marks and widths');

// ---- data set 3: units of electricity used by 50 households in two months (grouped, width 50)
export const EL_E = [100, 150, 200, 250, 300, 350, 400];
export const EL_F = [4, 9, 15, 12, 6, 4];
must(sum(EL_F) === 50 && classMarks(EL_E).join() === '125,175,225,275,325,375', 'electricity: 50 households');

// ---- data set 4: ages of 100 visitors of a science museum (grouped, unequal widths)
export const AGE_E = [10, 20, 30, 40, 60, 100];
export const AGE_F = [18, 30, 24, 20, 8];
export const AGE_D = density(AGE_F, AGE_E);
must(sum(AGE_F) === 100 && widths(AGE_E).join() === '10,10,10,20,40' && AGE_D.join() === '1.8,3,2.4,1,0.2', 'ages: densities 1.8, 3, 2.4, 1, 0.2');
must(AGE_F.every((f, i) => close(AGE_D[i] * (AGE_E[i + 1] - AGE_E[i]), f)), 'area of each bar (density times width) is the frequency');

// ---- data set 5: items sold in a school canteen on five days (stacked)
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const SAMOSA = [30, 25, 40, 35, 45], SANDWICH = [20, 30, 25, 35, 30], JUICE = [15, 20, 10, 25, 20];
export const CANTEEN_TOT = DAYS.map((_, i) => SAMOSA[i] + SANDWICH[i] + JUICE[i]);
must(CANTEEN_TOT.join() === '65,75,75,95,95', 'canteen totals');

// ---- category bar graph on [0, n] with slots of 2 drawing units
export function barGraph(cats, vals, { yMax, yStep, style = 'shade', xTitle, yTitle }, alt, caption) {
  const n = cats.length;
  return chartFig({
    xr: [0, n], W: 2 * n, yMax, yStep, xTitle, yTitle,
    bars: vals.map((v, i) => ({ x0: i + 0.2, x1: i + 0.8, y1: v, style, top: String(v) })),
    xTicks: cats.map((c, i) => ({ x: i + 0.5, text: c })),
  }, alt, caption);
}
/** A stacked bar graph: series = [{ name, vals, style }] stacked in order. */
export function stackGraph(cats, series, { yMax, yStep, xTitle, yTitle, totals = true }, alt, caption) {
  const n = cats.length, bars = [];
  cats.forEach((_, i) => {
    let base = 0;
    series.forEach((s) => {
      bars.push({ x0: i + 0.2, x1: i + 0.8, y0: base, y1: base + s.vals[i], style: s.style, inner: String(s.vals[i]) });
      base += s.vals[i];
    });
    if (totals) bars[bars.length - 1].top = String(base);
  });
  return chartFig({ xr: [0, n], W: 2 * n, yMax, yStep, xTitle, yTitle, bars, xTicks: cats.map((c, i) => ({ x: i + 0.5, text: c })) }, alt, caption);
}
/** A histogram on numeric x with bars between the class edges; heights are the given values (frequencies, or densities). */
export function histogram(edges, heights, { yMax, yStep, xTitle, yTitle, xr, top = (v) => String(v), inner, tickEvery = 1, lines = [], W = 12 }, alt, caption) {
  const bars = heights.map((h, i) => ({ x0: edges[i], x1: edges[i + 1], y1: h, style: 'shade', top: top(h, i), ...(inner ? { inner: inner(h, i) } : {}) }));
  return chartFig({ xr: xr ?? [edges[0], edges[edges.length - 1]], W, yMax, yStep, xTitle, yTitle, bars, lines, xTicks: edges.filter((_, i) => i % tickEvery === 0).map((e) => ({ x: e, text: String(e) })) }, alt, caption);
}

// ---- figures
export const DRINK = { cats: ['Tea', 'Milk', 'Juice', 'Lassi'], vals: [8, 11, 6, 5] };
must(sum(DRINK.vals) === 30, 'drinks: 30 students');
export const fDrinks = barGraph(DRINK.cats, DRINK.vals, { yMax: 12, yStep: 2, xTitle: 'drink', yTitle: 'students' }, 'Bar graph of the favourite drink of 30 students: tea 8, milk 11, juice 6 and lassi 5. The tallest bar is milk.', 'A bar graph: each bar stands for one drink and its height is the number of students.');
export const fShoeBars = barGraph(SHOE_SIZES.map(String), SHOE_F, { yMax: 12, yStep: 2, xTitle: 'size', yTitle: 'students' }, 'Bar graph of the shoe sizes of 30 students: size 5 has 3 students, size 6 has 7, size 7 has 11, size 8 has 6 and size 9 has 3. The tallest bar is size 7.', 'Bar graph of the frequency table of shoe sizes: the height of a bar is the frequency.');
export const fStackCanteen = stackGraph(DAYS, [{ name: 'samosa', vals: SAMOSA, style: 'shade' }, { name: 'sandwich', vals: SANDWICH, style: 'accent' }, { name: 'juice', vals: JUICE, style: 'outline' }], { yMax: 100, yStep: 20, xTitle: 'day', yTitle: 'items' },
  'Stacked bar graph of the items sold in a school canteen from Monday to Friday. Each bar has three parts, from the bottom: samosas, sandwiches and juices. On Monday 30 samosas, 20 sandwiches and 15 juices make 65 items; Tuesday 25, 30 and 20 make 75; Wednesday 40, 25 and 10 make 75; Thursday 35, 35 and 25 make 95; Friday 45, 30 and 20 make 95.',
  'Stacked bars: from the bottom the parts are samosas (shaded), sandwiches (coloured) and juices (outlined); the number above a bar is the total.');
export const fHistHome = histogram(HW_E, HW_F, { yMax: 14, yStep: 2, xTitle: 'minutes', yTitle: 'students', tickEvery: 1 },
  'Histogram of the homework time of 40 students in classes of width 15 minutes. The bars have heights 2, 6, 11, 12, 7 and 2 for the classes 0 to 15, 15 to 30, 30 to 45, 45 to 60, 60 to 75 and 75 to 90. The bars touch each other.', 'Histogram of the homework times: equal class widths, so the height of a bar shows the frequency.');
export const fHistElec = histogram(EL_E, EL_F, { yMax: 16, yStep: 4, xTitle: 'units', yTitle: 'households', xr: [100, 400] },
  'Histogram of the electricity used by 50 households in classes of width 50 units. The heights are 4, 9, 15, 12, 6 and 4 for the classes 100 to 150, 150 to 200, 200 to 250, 250 to 300, 300 to 350 and 350 to 400.', 'Histogram of the units used by 50 households: classes of width $50$ units.');
// frequency polygon over the histogram: class marks of the classes, with an extra class of frequency 0 at each end
export const EL_POLY = [[75, 0], ...classMarks(EL_E).map((m, i) => [m, EL_F[i]]), [425, 0]];
must(EL_POLY.length === 8 && EL_POLY[0][0] === 75 && EL_POLY[7][0] === 425 && EL_POLY[3][0] === 225 && EL_POLY[3][1] === 15, 'electricity polygon vertices');
export const fHistElecPoly = histogram(EL_E, EL_F, { yMax: 16, yStep: 4, xTitle: 'units', yTitle: 'households', xr: [50, 450], lines: [{ pts: EL_POLY }] },
  'The histogram of the electricity used by 50 households with its frequency polygon drawn over it. The polygon joins the mid-points of the tops of the bars, 125, 175, 225, 275, 325 and 375, and is closed on the axis at the class marks 75 and 425 of two extra classes with frequency 0.', 'The frequency polygon joins the mid-points of the tops of the bars; it starts and ends on the axis at the mid-points of the empty classes $50$ to $100$ and $400$ to $450$.');
export const fPolyElec = plot({ x: [50, 450], y: [0, 16], xl: 'units used', yl: 'households', series: [{ label: 'frequency polygon', points: EL_POLY, kind: 'line' }] },
  'Frequency polygon of the electricity used by 50 households: the points are 75 with 0 households, 125 with 4, 175 with 9, 225 with 15, 275 with 12, 325 with 6, 375 with 4 and 425 with 0, joined by straight lines.', 'Frequency polygon: class marks against frequencies, with an empty class at each end.');
export const fHistAge = histogram(AGE_E, AGE_D, { yMax: 3.5, yStep: 0.5, xTitle: 'age', yTitle: 'per year', top: (h) => String(h), inner: (h, i) => `f = ${AGE_F[i]}` },
  'Histogram of the ages of 100 visitors of a science museum with unequal class widths. The height of each bar is the frequency per year of age: 1.8 for 10 to 20, 3 for 20 to 30, 2.4 for 30 to 40, 1 for 40 to 60 and 0.2 for 60 to 100. The areas of the bars are the frequencies 18, 30, 24, 20 and 8.', 'Unequal class widths: the height is the frequency density, so the area of a bar is the frequency.');

export { rd, mean };
