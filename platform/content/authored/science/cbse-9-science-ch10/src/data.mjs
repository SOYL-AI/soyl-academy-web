// Shared data and pure functions for ch10 Reproduction: day arithmetic for the menstrual-cycle calendar examples
// (a plain calendar, no year-specific facts) and the ovule-to-seed count.

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/** Adds n days to a calendar date in a non-leap year and returns { day, month } (month name). */
export function addDays(monthIndex, day, n) {
  const d = new Date(Date.UTC(2026, monthIndex, day + n));
  return { day: d.getUTCDate(), month: MONTHS[d.getUTCMonth()] };
}
export const monthIndex = (name) => MONTHS.indexOf(name);

/** Seeds expected when a fraction (percent) of the ovules in an ovary is fertilised. */
export const seedsFrom = (ovules, pctFertilised) => (ovules * pctFertilised) / 100;
