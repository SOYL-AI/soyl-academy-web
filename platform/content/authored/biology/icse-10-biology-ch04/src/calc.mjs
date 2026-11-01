// Computed values for ICSE 10 Biology ch04 Transpiration (imagined experiment readings).
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
export const pct = (part, whole) => r1((part / whole) * 100);

/** Loss-of-weight experiment: two flasks with an oil layer, weighed at 9 a.m. and 5 p.m. (grams). */
export const WEIGHT = {
  hours: 8,
  leafy: { start: 250.0, end: 238.8 },
  leafless: { start: 231.4, end: 230.6 },
};
for (const k of ['leafy', 'leafless']) {
  WEIGHT[k].loss = r1(WEIGHT[k].start - WEIGHT[k].end);
  WEIGHT[k].rate = r2(WEIGHT[k].loss / WEIGHT.hours);
}
WEIGHT.byLeaves = r1(WEIGHT.leafy.loss - WEIGHT.leafless.loss);

/** Potometer: distance moved by the air bubble in 10 minutes under four conditions (mm). */
export const POT = {
  minutes: 10,
  area: 1, // cross-section of the capillary, square millimetres
  rows: [
    { cond: 'Still air, bright light', mm: 12 },
    { cond: 'Fan blowing, bright light', mm: 30 },
    { cond: 'Still air, dark cupboard', mm: 4 },
    { cond: 'Still air, shoot in a clear plastic bag', mm: 5 },
  ],
};
for (const r of POT.rows) {
  r.rate = r1(r.mm / POT.minutes);
  r.vol = r.mm * POT.area; // cubic millimetres
}
POT.fanTimes = r1(POT.rows[1].mm / POT.rows[0].mm);

/** Cobalt chloride papers on a dorsiventral leaf: minutes to turn pink; stomata per square millimetre. */
export const COBALT = { lowerMin: 2, upperMin: 9, lowerStomata: 300, upperStomata: 50 };
COBALT.stomataTimes = COBALT.lowerStomata / COBALT.upperStomata;

/** Water budget of a potted plant over a day (millilitres). */
export const BUDGET = { absorbed: 500, kept: 6 };
BUDGET.lost = BUDGET.absorbed - BUDGET.kept;
BUDGET.pctLost = pct(BUDGET.lost, BUDGET.absorbed);

if (WEIGHT.leafy.loss !== 11.2 || WEIGHT.leafy.rate !== 1.4 || WEIGHT.leafless.loss !== 0.8 || WEIGHT.byLeaves !== 10.4 || POT.rows[0].rate !== 1.2 || POT.fanTimes !== 2.5 || POT.rows[2].vol !== 4 || COBALT.stomataTimes !== 6 || BUDGET.pctLost !== 98.8) throw new Error('calc');
