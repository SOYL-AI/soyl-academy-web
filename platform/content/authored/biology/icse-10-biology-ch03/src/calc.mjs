// Computed values for ICSE 10 Biology ch03 (imagined experiment data; every derived number is computed here).
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;
export const pctChange = (start, end) => round(((end - start) / start) * 100, 1);

// Potato strips in sugar solutions of different strength (imagined data). Mass in grams.
export const STRIPS = [
  { conc: 0, start: 5.0, end: 5.6 },
  { conc: 0.1, start: 5.0, end: 5.3 },
  { conc: 0.2, start: 5.0, end: 5.0 },
  { conc: 0.3, start: 5.0, end: 4.7 },
  { conc: 0.4, start: 5.0, end: 4.4 },
].map((s) => ({ ...s, change: pctChange(s.start, s.end) }));
export const ISOTONIC = STRIPS.find((s) => s.change === 0).conc;

// Thistle funnel: level in the stem (mm above the starting mark) at intervals (imagined).
export const FUNNEL = [
  { t: 0, mm: 0 },
  { t: 30, mm: 6 },
  { t: 60, mm: 11 },
  { t: 90, mm: 15 },
  { t: 120, mm: 18 },
];
export const FIRST_HOUR = FUNNEL.find((r) => r.t === 60).mm - FUNNEL[0].mm; // mm in the first hour
export const SECOND_HOUR = FUNNEL.find((r) => r.t === 120).mm - FUNNEL.find((r) => r.t === 60).mm;

if (STRIPS.map((s) => s.change).join() !== '12,6,0,-6,-12' || ISOTONIC !== 0.2 || FIRST_HOUR !== 11 || SECOND_HOUR !== 7) throw new Error('calc');
