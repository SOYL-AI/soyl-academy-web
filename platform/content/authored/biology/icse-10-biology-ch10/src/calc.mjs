// Computed values for ICSE 10 Biology ch10 (reaction-time ruler test, nerve impulse timings).
export const mean = (xs) => Math.round((xs.reduce((a, b) => a + b, 0) / xs.length) * 10) / 10;
export const pct = (part, whole, dp = 1) => Math.round((part / whole) * 100 * 10 ** dp) / 10 ** dp;

// Ruler-drop test: distance (cm) the ruler fell before it was caught, five tries each.
export const RULER = { before: [18, 16, 15, 17, 14], after: [12, 11, 13, 12, 12] };
RULER.meanBefore = mean(RULER.before);
RULER.meanAfter = mean(RULER.after);
RULER.drop = Math.round((RULER.meanBefore - RULER.meanAfter) * 10) / 10;
RULER.pctShorter = pct(RULER.drop, RULER.meanBefore);

/** Time (ms) for an impulse to travel a distance (m) at a speed (m/s). */
export const travelMs = (metres, speed) => Math.round(((metres / speed) * 1000) * 10) / 10;
// A sensory fibre from the toe to the spinal cord.
export const NERVE = { metres: 1, fast: 100, slow: 1 };
NERVE.fastMs = travelMs(NERVE.metres, NERVE.fast);
NERVE.slowMs = travelMs(NERVE.metres, NERVE.slow);
NERVE.times = Math.round(NERVE.slowMs / NERVE.fastMs);

if (RULER.meanBefore !== 16 || RULER.meanAfter !== 12 || RULER.pctShorter !== 25 || NERVE.fastMs !== 10 || NERVE.slowMs !== 1000 || NERVE.times !== 100) throw new Error('calc');
