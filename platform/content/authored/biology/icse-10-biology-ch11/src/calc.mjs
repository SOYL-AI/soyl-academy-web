// Computed values for ICSE 10 Biology ch11 (fields of view, correcting lens for myopia).

// Horizontal field of view (degrees) of each human eye and of both together.
export const FIELD = { each: 150, total: 180 };
FIELD.overlap = 2 * FIELD.each - FIELD.total;
FIELD.leftFrom = -FIELD.total / 2;
FIELD.leftTo = FIELD.leftFrom + FIELD.each;
FIELD.rightTo = FIELD.total / 2;
FIELD.rightFrom = FIELD.rightTo - FIELD.each;

// A myopic student's far point: a concave lens of focal length equal to the far point makes distant objects appear there.
export const MYOPE = { farPointCm: 200 };
MYOPE.focalCm = -MYOPE.farPointCm;
MYOPE.focalM = MYOPE.focalCm / 100;

// Least distance of distinct vision of a normal young eye (cm).
export const NEAR_POINT = 25;

if (FIELD.overlap !== 120 || FIELD.leftTo !== 60 || FIELD.rightFrom !== -60 || MYOPE.focalM !== -2) throw new Error('calc');
