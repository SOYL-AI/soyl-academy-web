// Rules for ch08: percentage changes and BOD arithmetic, used for examples, the BOD chart and re-solves.
export const pctFall = (before, after) => Math.round(((before - after) / before) * 1000) / 10;
export const pct = (part, whole) => Math.round((part / whole) * 1000) / 10;
/** Oxygen (mg) consumed by microbes from a volume (L) of water with a given BOD (mg/L). */
export const oxygenDemand = (bodMgPerL, litres) => bodMgPerL * litres;
/** Model BOD of sewage through the treatment stages (mg/L). */
export const STAGES = [['Raw sewage', 300], ['After primary treatment', 200], ['After secondary treatment', 30]];
