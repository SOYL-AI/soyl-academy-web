// Numeric intervals used by the number-line drawing code (nl.mjs). The exact (fraction) intervals live in ineq.mjs
// and are converted with draw(). lo/hi are numbers or null (unbounded); loIn/hiIn say whether the end point belongs.
export const iv = (lo, hi, loIn = true, hiIn = true) => ({ lo, hi, loIn: lo === null ? false : loIn, hiIn: hi === null ? false : hiIn });
export const inIv = (I, x) => (I.lo === null || (I.loIn ? x >= I.lo : x > I.lo)) && (I.hi === null || (I.hiIn ? x <= I.hi : x < I.hi));
