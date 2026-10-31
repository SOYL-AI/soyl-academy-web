// Rules for ISC 12 Biology ch11 (infections, cancer and allergies): percentages, the malaria fever cycle, Widal titres and
// tumour cell doublings, used for worked examples, the fever graph and re-solves.
export const pct = (part, whole) => Math.round((part / whole) * 1000) / 10;

/** Body temperature (°C) at hour h for a fever that recurs every `period` hours, each bout lasting `bout` hours. */
export function temp(h, period = 48, bout = 8, base = 37, rise = 3) {
  const phase = h % period;
  if (phase >= bout) return base;
  return Math.round((base + rise * Math.sin((Math.PI * phase) / bout)) * 10) / 10;
}
/** Hours (from 0) at which bouts start within a window. */
export const bouts = (hours, period = 48) => Array.from({ length: Math.floor(hours / period) + 1 }, (_, i) => i * period).filter((h) => h <= hours);

/** Widal titre: the highest dilution (as 1 : n) that still shows agglutination. */
export function titre(dilutions, agglutinated) {
  let best = null;
  dilutions.forEach((d, i) => { if (agglutinated[i]) best = d; });
  return best;
}

/** Number of doublings needed for one cell to give at least n cells. */
export const doublings = (n) => Math.ceil(Math.log2(n));
/** Cells after k doublings from one cell. */
export const cellsAfter = (k) => 2 ** k;
