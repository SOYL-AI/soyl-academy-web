// Data sets and figures of CBSE 9 Mathematics ch15 Introduction to Probability, shared by the deck builder and the question banks.
// The coin and die experiments are simulated with a seeded generator, so the numbers below never change; they are asserted against the
// simulation, and every figure is drawn from the computed values.
import { plot } from './lib.mjs';
import { fig, P, chartFig, must, close, sum, rd } from './h.mjs';
import { mulberry32, frac, fs, upto } from './p.mjs';

// ---- experiment 1: 1000 tosses of a coin (seed 2026); the running count of heads
export function simulateCoin(seed, n) {
  const g = mulberry32(seed), tosses = [];
  for (let i = 0; i < n; i++) tosses.push(g() < 0.5 ? 'H' : 'T');
  return tosses;
}
export const COIN = simulateCoin(2026, 1000);
export const headsUpTo = (n) => COIN.slice(0, n).filter((t) => t === 'H').length;
export const COIN_N = [10, 50, 100, 500, 1000];
export const COIN_H = COIN_N.map(headsUpTo);
must(COIN_H.join() === '6,28,48,262,501', 'coin: heads after 10, 50, 100, 500, 1000 tosses are 6, 28, 48, 262, 501');
export const COIN_RUN = upto(1, 100).map((k) => [k * 10, headsUpTo(k * 10) / (k * 10)]);
must(COIN_RUN.length === 100 && COIN_RUN[0][1] === 0.6 && COIN_RUN[99][1] === 0.501, 'coin running frequency: 0.6 at 10 and 0.501 at 1000');
must(Math.abs(COIN_RUN[99][1] - 0.5) < Math.abs(COIN_RUN[0][1] - 0.5), 'more tosses, nearer one half');

// ---- experiment 2: 600 throws of a die (seed 2126)
export function simulateDie(seed, n) {
  const g = mulberry32(seed), throws = [];
  for (let i = 0; i < n; i++) throws.push(1 + Math.floor(g() * 6));
  return throws;
}
export const DIE = simulateDie(2126, 600);
export const faceCounts = (n) => upto(1, 6).map((f) => DIE.slice(0, n).filter((x) => x === f).length);
export const DIE_N = [30, 120, 600];
export const DIE_C = DIE_N.map(faceCounts);
must(DIE_C[0].join() === '9,6,3,5,4,3' && DIE_C[1].join() === '22,20,19,13,22,24' && DIE_C[2].join() === '116,91,102,92,100,99', 'die counts at 30, 120 and 600 throws');
must(DIE_C.every((c, i) => sum(c) === DIE_N[i]), 'die counts add up to the number of throws');
export const SIX = DIE_N.map((_, i) => DIE_C[i][5]);
export const EVEN = DIE_N.map((_, i) => DIE_C[i][1] + DIE_C[i][3] + DIE_C[i][5]);
must(SIX.join() === '3,24,99' && EVEN.join() === '14,57,282', 'sixes 3, 24, 99 and even numbers 14, 57, 282');
export const SIX_RUN = upto(1, 20).map((k) => [k * 30, faceCounts(k * 30)[5] / (k * 30)]);
must(SIX_RUN.length === 20 && SIX_RUN[19][1] === 0.165, 'running frequency of a six ends at 99 over 600');

// ---- data set: the five-colour spinner at a science fair (40 spins)
export const SPIN = { cats: ['Red', 'Blue', 'Green', 'Yellow', 'White'], vals: [9, 6, 11, 8, 6] };
must(sum(SPIN.vals) === 40 && fs(11, 40) === '11/40' && fs(9 + 6, 40) === '3/8', 'spinner: 40 spins, green 11, red or blue 15');

// ---- data set: rainy days in four 30-day periods (Guwahati)
export const RAIN = { cats: ['Period 1', 'Period 2', 'Period 3', 'Period 4'], vals: [24, 27, 21, 18], days: 30 };
must(sum(RAIN.vals) === 90 && RAIN.vals.length * RAIN.days === 120 && fs(90, 120) === '3/4', 'rain: 90 rainy days in 120');

// ---- data set: a jar of beads at a toy stall (equally likely beads)
export const BEADS = { cats: ['Red', 'Blue', 'Green', 'Yellow'], vals: [6, 9, 5, 10] };
must(sum(BEADS.vals) === 30, 'beads: 30 in the jar');

// ---- data set: rainy days in five weeks (case item)
export const WEEKS = { cats: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5'], vals: [4, 6, 3, 5, 2] };
must(sum(WEEKS.vals) === 20 && WEEKS.vals.length * 7 === 35 && fs(20, 35) === '4/7', 'weeks: 20 rainy days in 35');

// ---- category bar graph on [0, n] with slots of 2 drawing units
export function barGraph(cats, vals, { yMax, yStep, style = 'shade', xTitle, yTitle, top = (v) => String(v) }, alt, caption) {
  const n = cats.length;
  return chartFig({
    xr: [0, n], W: 2 * n, yMax, yStep, xTitle, yTitle,
    bars: vals.map((v, i) => ({ x0: i + 0.2, x1: i + 0.8, y1: v, style, top: top(v) })),
    xTicks: cats.map((c, i) => ({ x: i + 0.5, text: c })),
  }, alt, caption);
}

// ---- figures
const ticks = [0, 0.25, 0.5, 0.75, 1], words = ['impossible', 'unlikely', 'even chance', 'likely', 'certain'], vlab = ['0', '1/4', '1/2', '3/4', '1'];
export const fScale = (() => {
  const points = {}, segments = [{ from: 'z0', to: 'z4' }];
  ticks.forEach((t, i) => {
    points[`z${i}`] = P([t * 10, 0], 's', vlab[i]);
    points[`w${i}`] = P([t * 10, 1.4], 'n', words[i]);
    segments.push({ from: `z${i}`, to: `w${i}`, dashed: true });
  });
  return fig({ points, segments, not_to_scale: true }, 'The probability scale: a line from 0 to 1. At 0 the event is impossible, at one quarter it is unlikely, at one half it has an even chance, at three quarters it is likely and at 1 it is certain.', 'The probability scale runs from 0 (impossible) to 1 (certain), with an even chance at one half.', { l: 1.5, r: 1.5, t: 1, b: 1 });
})();
const EVT = [['a 7 on a die', 0, 1.4], ['a 6 on a die', 1 / 6, 3], ['a head on a coin', 1 / 2, 1.4], ['not a 6 on a die', 5 / 6, 3], ['a number 1 to 6 on a die', 1, 1.4]];
const EVT_LAB = ['0', '1/6', '1/2', '5/6', '1'];
export const fScaleEvents = (() => {
  const points = {}, segments = [{ from: 'z0', to: 'z4' }];
  EVT.forEach(([name, p, h], i) => {
    points[`z${i}`] = P([p * 10, 0], 's', EVT_LAB[i]);
    points[`w${i}`] = P([p * 10, h], 'n', name);
    segments.push({ from: `z${i}`, to: `w${i}`, dashed: true });
  });
  return fig({ points, segments, not_to_scale: true }, 'Five events placed on the probability scale: a 7 on a die at 0, a 6 on a die at one sixth, a head on a coin at one half, not a 6 on a die at five sixths, and a number from 1 to 6 on a die at 1.', 'Events placed on the scale by their probabilities.', { l: 2.5, r: 2.5, t: 1, b: 1 });
})();
export const fCoinRun = plot({ x: [0, 1000], y: [0.3, 0.8], xl: 'number of tosses', yl: 'relative frequency of heads', series: [{ label: 'running relative frequency of heads', points: COIN_RUN, kind: 'line' }, { label: 'probability one half', points: [[0, 0.5], [1000, 0.5]], kind: 'line' }] },
  'Graph of the relative frequency of heads in a simulated experiment of 1000 coin tosses. It starts at 0.6 after 10 tosses, swings up and down at first and settles close to 0.5; after 1000 tosses it is 0.501. A straight line marks one half.', 'The relative frequency of heads settles near one half as the number of tosses grows.');
export const fSpin = barGraph(SPIN.cats, SPIN.vals, { yMax: 12, yStep: 2, xTitle: 'colour', yTitle: 'times' }, 'Bar graph of 40 spins of a five-colour spinner at a science fair: red 9, blue 6, green 11, yellow 8 and white 6. The tallest bar is green.', 'Results of 40 spins; the bars add up to 40.');
export const fRain = barGraph(RAIN.cats, RAIN.vals, { yMax: 30, yStep: 5, xTitle: 'period', yTitle: 'rainy days' }, 'Bar graph of the rainy days in four periods of 30 days in a Guwahati record: 24, 27, 21 and 18. In all, rain fell on 90 of the 120 days.', 'Rainy days in each period of 30 days.');
export const fBeads = barGraph(BEADS.cats, BEADS.vals, { yMax: 12, yStep: 2, xTitle: 'colour', yTitle: 'beads' }, 'Bar graph of the beads in a jar at a toy stall: 6 red, 9 blue, 5 green and 10 yellow, 30 in all.', 'The jar holds 30 beads; the height of a bar is the number of beads of that colour.');
export const fWeeks = barGraph(WEEKS.cats, WEEKS.vals, { yMax: 7, yStep: 1, xTitle: 'week', yTitle: 'rainy days' }, 'Bar graph of the rainy days in five weeks of a Kochi record: week 1 has 4, week 2 has 6, week 3 has 3, week 4 has 5 and week 5 has 2. In all, rain fell on 20 of the 35 days.', 'Rainy days in each of five weeks.');
export const fDieBars = chartFig({
  xr: [0, 6], W: 12, yMax: 0.25, yStep: 0.05, xTitle: 'face', yTitle: 'relative frequency',
  bars: DIE_C[2].map((c, i) => ({ x0: i + 0.2, x1: i + 0.8, y1: c / 600, style: 'shade', top: String(rd(c / 600, 3)) })),
  lines: [{ pts: [[0, 1 / 6], [6, 1 / 6]], dashed: true }],
  xTicks: upto(1, 6).map((f) => ({ x: f - 0.5, text: String(f) })),
}, 'Bar graph of the relative frequency of each face in 600 throws of a die: face 1 is 0.193, face 2 is 0.152, face 3 is 0.17, face 4 is 0.153, face 5 is 0.167 and face 6 is 0.165. A dashed line marks the theoretical value one sixth, about 0.167, and every bar is near it.', 'Relative frequencies of the six faces in 600 throws; the dashed line is the theoretical probability one sixth.');
export const fDieRun = plot({ x: [0, 600], y: [0, 0.3], xl: 'number of throws', yl: 'relative frequency of a six', series: [{ label: 'running relative frequency of a six', points: SIX_RUN, kind: 'line' }, { label: 'probability one sixth', points: [[0, 1 / 6], [600, 1 / 6]], kind: 'line' }] },
  'Graph of the relative frequency of a six in a simulated experiment of 600 throws of a die. It is 0.1 after 30 throws, 0.2 after 120 throws and 0.165 after 600 throws, and it settles near one sixth, about 0.167, which is marked by a straight line.', 'The relative frequency of a six settles near one sixth as the throws increase.');
void close; void frac;
