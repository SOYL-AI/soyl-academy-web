// Rules for ISC 12 Biology ch13 (microbes in human welfare). Percentage and BOD helpers are copied from
// cbse-12-biology-ch08/src/calc.mjs (same author) with ISC model values; the curd pH model, bacterial doubling and
// biogas yield are new for ISC.
export const pctFall = (before, after) => Math.round(((before - after) / before) * 1000) / 10;
export const pct = (part, whole) => Math.round((part / whole) * 1000) / 10;
/** Oxygen (mg) consumed by microbes from a volume (L) of water with a given BOD (mg/L). */
export const oxygenDemand = (bodMgPerL, litres) => bodMgPerL * litres;
/** Model BOD of sewage through the treatment stages (mg/L). */
export const STAGES = [['Raw sewage', 360], ['After primary treatment', 240], ['After secondary treatment', 24]];

/** Bacteria after t hours from n0 cells with doubling time d hours. */
export const cellsAfter = (n0, t, d) => n0 * 2 ** Math.floor(t / d);

/** Model pH of milk setting into curd at 37 °C: falls from 6.6 towards 4.4 as lactic acid accumulates. */
export const curdPH = (h) => Math.round((4.4 + 2.2 / (1 + Math.exp((h - 5) / 1.2))) * 100) / 100;

/** Biogas yield from fresh cattle dung, about 40 litres per kilogram. */
export const biogasLitres = (kg, perKg = 40) => kg * perKg;

/** Alcoholic fermentation C6H12O6 -> 2 C2H5OH + 2 CO2 (molar masses 180, 46, 44): masses from g of glucose. */
export const ferment = (g) => ({ ethanol: Math.round((g * 92) / 180 * 10) / 10, co2: Math.round((g * 88) / 180 * 10) / 10 });
