// Computed values for ICSE 10 Biology ch13 Reproductive System (chromosome numbers, cycle days, gestation).
/** Human body cells are diploid; gametes carry half the number. */
export const BODY = 46;
export const GAMETE = BODY / 2;
export const zygote = (sperm, egg) => sperm + egg;

/** Ovulation happens about 14 days before the next menstruation begins (the luteal phase is fairly constant). */
export const LUTEAL = 14;
export const ovulationDay = (cycleLength) => cycleLength - LUTEAL;

/** Outline of a 28-day cycle (days inclusive). */
export const CYCLE = { length: 28, mensFrom: 1, mensTo: 5, repairFrom: 6, repairTo: 13, ovulation: ovulationDay(28), secretoryFrom: 15, secretoryTo: 28 };
CYCLE.mensDays = CYCLE.mensTo - CYCLE.mensFrom + 1;
CYCLE.secretoryDays = CYCLE.secretoryTo - CYCLE.secretoryFrom + 1;

/** Gestation counted from the first day of the last menstruation (textbook value). */
export const GESTATION = { days: 280 };
GESTATION.weeks = GESTATION.days / 7;

/** Twins: eggs and sperms needed. */
export const TWINS = { identical: { eggs: 1, sperms: 1, zygotes: 1 }, fraternal: { eggs: 2, sperms: 2, zygotes: 2 } };

if (GAMETE !== 23 || zygote(GAMETE, GAMETE) !== 46 || ovulationDay(30) !== 16 || ovulationDay(32) !== 18 || CYCLE.ovulation !== 14 || CYCLE.mensDays !== 5 || CYCLE.secretoryDays !== 14 || GESTATION.weeks !== 40) throw new Error('calc');
