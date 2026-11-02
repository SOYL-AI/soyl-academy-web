// ch14 Breathing and Exchange of Gases — every number used by decks, SVGs and questions, asserted here.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
const check = (cond, msg) => {
  if (!cond) throw new Error(`calc: ${msg}`);
};

// ---------------------------------------------------------------- respiratory volumes (mL)
/** NCERT ranges: TV about 500; IRV 2500–3000; ERV 1000–1100; RV 1100–1200. LOW and HIGH take the two ends. */
export const RANGE = { TV: [500, 500], IRV: [2500, 3000], ERV: [1000, 1100], RV: [1100, 1200] };
/** The four capacities from four volumes. */
export const capacities = ({ TV, IRV, ERV, RV }) => ({ IC: TV + IRV, EC: TV + ERV, FRC: ERV + RV, VC: ERV + TV + IRV, TLC: RV + ERV + TV + IRV });
export const LOW = { TV: 500, IRV: 2500, ERV: 1000, RV: 1100 };
export const HIGH = { TV: 500, IRV: 3000, ERV: 1100, RV: 1200 };
export const CAP_LOW = capacities(LOW);
export const CAP_HIGH = capacities(HIGH);
check(CAP_LOW.IC === 3000 && CAP_LOW.EC === 1500 && CAP_LOW.FRC === 2100 && CAP_LOW.VC === 4000 && CAP_LOW.TLC === 5100, 'low capacities');
check(CAP_HIGH.IC === 3500 && CAP_HIGH.EC === 1600 && CAP_HIGH.FRC === 2300 && CAP_HIGH.VC === 4600 && CAP_HIGH.TLC === 5800, 'high capacities');
check(CAP_HIGH.TLC === CAP_HIGH.VC + HIGH.RV, 'TLC = VC + RV');

/** The spirogram drawn in svgs.mjs (a student with the HIGH values). */
export const SPIRO = HIGH;

/** Minute ventilation: tidal volume × breaths per minute (12–16 at rest gives 6000–8000 mL). */
export const minuteVolume = (tv, rate) => tv * rate;
check(minuteVolume(500, 12) === 6000 && minuteVolume(500, 16) === 8000, 'minute volume range');

// ---------------------------------------------------------------- partial pressures (mm Hg), NCERT table
export const PP = {
  air: { o2: 159, co2: 0.3, name: 'Atmospheric air' },
  alveoli: { o2: 104, co2: 40, name: 'Alveoli' },
  deoxy: { o2: 40, co2: 45, name: 'Deoxygenated blood' },
  oxy: { o2: 95, co2: 40, name: 'Oxygenated blood' },
  tissues: { o2: 40, co2: 45, name: 'Tissues' },
};
export const GRAD = {
  o2Lung: PP.alveoli.o2 - PP.deoxy.o2, // alveoli → blood
  co2Lung: PP.deoxy.co2 - PP.alveoli.co2, // blood → alveoli
  o2Tissue: PP.oxy.o2 - PP.tissues.o2, // blood → tissues
  co2Tissue: PP.tissues.co2 - PP.oxy.co2, // tissues → blood
};
check(GRAD.o2Lung === 64 && GRAD.co2Lung === 5 && GRAD.o2Tissue === 55 && GRAD.co2Tissue === 5, 'gradients');
/** Oxygen in dry air at sea level: 20.9 percent of 760 mm Hg. */
export const ATM = { p: 760, f: 0.209 };
ATM.o2 = round(ATM.p * ATM.f, 2);
check(ATM.o2 === 158.84 && round(ATM.o2) === PP.air.o2, 'pO2 of air');

// ---------------------------------------------------------------- transport
export const O2_SHARE = { rbc: 97, plasma: 3 };
export const CO2_SHARE = { carbamino: '20–25', bicarbonate: 70, dissolved: 7 };
/** Under normal conditions every 100 mL of oxygenated blood delivers about 5 mL of oxygen to the tissues,
 * and every 100 mL of deoxygenated blood delivers about 4 mL of carbon dioxide to the alveoli. */
export const PER100 = { o2: 5, co2: 4 };
export const delivered = (bloodMl, per100) => (bloodMl / 100) * per100;
check(delivered(5000, PER100.o2) === 250 && delivered(5000, PER100.co2) === 200, 'delivery per 5 L');
check(delivered(5000, PER100.co2) / delivered(5000, PER100.o2) === 0.8, 'CO2 : O2 ratio');
/** Carbon dioxide is 20–25 times more soluble than oxygen. */
export const SOLUBILITY = [20, 25];

// ---------------------------------------------------------------- oxygen dissociation curve (illustrative model)
/** Hill-type model of percent saturation; P50 26.8 mm Hg, n 2.7 for the normal curve (typical values, not from NCERT).
 * A right shift (more CO2, more H⁺, higher temperature) is drawn with P50 36. */
export const ODC = { p50: 26.8, n: 2.7, p50Right: 36 };
export const saturation = (po2, p50 = ODC.p50, n = ODC.n) => (100 * po2 ** n) / (p50 ** n + po2 ** n);
export const SAT = { alveoli: round(saturation(PP.alveoli.o2)), tissues: round(saturation(PP.tissues.o2)), tissuesRight: round(saturation(PP.tissues.o2, ODC.p50Right)) };
check(SAT.alveoli === 97 && SAT.tissues === 75 && SAT.tissuesRight === 57, `saturations ${JSON.stringify(SAT)}`);
check(saturation(ODC.p50) === 50, 'P50');

// ---------------------------------------------------------------- worked numbers used in decks and questions
/** Worked example 1 (deck 1): a student’s spirometer readings. */
export const WE1 = { TV: 500, IRV: 2800, ERV: 1050, RV: 1150 };
WE1.cap = capacities(WE1);
check(WE1.cap.VC === 4350 && WE1.cap.TLC === 5500 && WE1.cap.IC === 3300 && WE1.cap.FRC === 2200 && WE1.cap.EC === 1550, 'WE1');
/** Worked example 2 (deck 1): minute ventilation at rest and with faster breathing. */
export const WE2 = { tv: 500, rest: 14, fast: 20 };
WE2.restMin = minuteVolume(WE2.tv, WE2.rest);
WE2.fastMin = minuteVolume(WE2.tv, WE2.fast);
check(WE2.restMin === 7000 && WE2.fastMin === 10000, 'WE2');
/** Worked example 3 (deck 2): oxygen delivered by a given blood flow. */
export const WE3 = { flow: 5000 };
WE3.o2 = delivered(WE3.flow, PER100.o2);
WE3.co2 = delivered(WE3.flow, PER100.co2);
check(WE3.o2 === 250 && WE3.co2 === 200, 'WE3');

/** Question numbers. */
export const Q = {
  ic: { TV: 500, IRV: 2800 },
  vc: { TV: 500, IRV: 2600, ERV: 1000 },
  tlc: { VC: 4200, RV: 1150 },
  minute: { tv: 500, rate: 15 },
  irv: { TLC: 5800, FRC: 2300, TV: 500 },
  deliver: { flow: 6000 },
  bicarb: { co2: 200, pct: 70 },
};
Q.ic.ans = Q.ic.TV + Q.ic.IRV;
Q.vc.ans = Q.vc.TV + Q.vc.IRV + Q.vc.ERV;
Q.tlc.ans = Q.tlc.VC + Q.tlc.RV;
Q.minute.ans = minuteVolume(Q.minute.tv, Q.minute.rate);
Q.irv.ic = Q.irv.TLC - Q.irv.FRC;
Q.irv.ans = Q.irv.ic - Q.irv.TV;
Q.deliver.ans = delivered(Q.deliver.flow, PER100.o2);
Q.bicarb.ans = (Q.bicarb.co2 * Q.bicarb.pct) / 100;
check(Q.ic.ans === 3300 && Q.vc.ans === 4100 && Q.tlc.ans === 5350 && Q.minute.ans === 7500, 'Q volumes');
check(Q.irv.ic === 3500 && Q.irv.ans === 3000, 'Q irv');
check(Q.deliver.ans === 300 && Q.bicarb.ans === 140, 'Q transport');

/** Case numbers. */
export const CASE = {
  spiro: { TV: 500, IRV: 3100, ERV: 1100, RV: 1200 },
  exercise: { tvRest: 500, rateRest: 14, tvRun: 1500, rateRun: 30 },
  quarry: { workers: 160, fibrosis: 24 },
};
CASE.spiro.cap = capacities(CASE.spiro);
CASE.exercise.rest = minuteVolume(CASE.exercise.tvRest, CASE.exercise.rateRest);
CASE.exercise.run = minuteVolume(CASE.exercise.tvRun, CASE.exercise.rateRun);
CASE.exercise.factor = CASE.exercise.run / CASE.exercise.rest;
CASE.quarry.pct = round((CASE.quarry.fibrosis / CASE.quarry.workers) * 100, 1);
check(CASE.spiro.cap.VC === 4700 && CASE.spiro.cap.IC === 3600 && CASE.spiro.cap.FRC === 2300 && CASE.spiro.cap.TLC === 5900, 'spiro case');
check(CASE.exercise.rest === 7000 && CASE.exercise.run === 45000 && round(CASE.exercise.factor, 1) === 6.4, 'exercise case');
check(CASE.quarry.pct === 15, 'quarry case');
