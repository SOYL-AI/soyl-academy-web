// Rules for ch07, used for worked-example numbers, the immune-response graph and re-solves.

export const pct = (part, whole) => Math.round((part / whole) * 1000) / 10;
export const pctChange = (before, after) => Math.round(((after - before) / before) * 1000) / 10;

/** An antibody molecule has 2 heavy + 2 light chains (H2L2). */
export const chains = (antibodies) => ({ heavy: 2 * antibodies, light: 2 * antibodies, total: 4 * antibodies });

/** Model antibody level after exposure: primary (slow, low) and secondary (fast, high) responses. */
export function response(day, start, peak, rise) {
  const t = day - start;
  if (t < 0) return 0;
  return peak * (1 - Math.exp(-t / rise)) * Math.exp(-t / (rise * 6));
}
export const PRIMARY = { start: 0, peak: 30, rise: 6 };
export const SECONDARY = { start: 40, peak: 160, rise: 2 };
export function series(days = 70) {
  const pts = [];
  for (let d = 0; d <= days; d += 1) pts.push([d, response(d, PRIMARY.start, PRIMARY.peak, PRIMARY.rise) + response(d, SECONDARY.start, SECONDARY.peak, SECONDARY.rise)]);
  return pts;
}
/** Highest level reached in a window of days. */
export function peakIn(pts, d0, d1) {
  return Math.round(Math.max(...pts.filter(([d]) => d >= d0 && d <= d1).map(([, v]) => v)));
}
