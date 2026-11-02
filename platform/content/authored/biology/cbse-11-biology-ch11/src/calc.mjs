// ch11 Photosynthesis in Higher Plants — every number used by decks, SVGs and questions is computed (and asserted) here.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
const same = (a, b, what) => {
  if (a !== b) throw new Error(`calc: ${what} = ${a}, expected ${b}`);
};
const eq = (a, b, what) => {
  if (Math.abs(a - b) > 1e-9) throw new Error(`calc: ${what} = ${a}, expected ${b}`);
};

/** Textbook convention for the Calvin cycle (NCERT): per CO2 fixed, reduction uses 2 ATP + 2 NADPH, regeneration of RuBP 1 ATP. */
export const CALVIN = { reductionAtp: 2, reductionNadph: 2, regenAtp: 1 };
CALVIN.atpPerCO2 = CALVIN.reductionAtp + CALVIN.regenAtp; // 3
CALVIN.nadphPerCO2 = CALVIN.reductionNadph; // 2
/** C4 plants spend 2 extra ATP per CO2 to regenerate PEP from pyruvate (textbook: 5 ATP + 2 NADPH per CO2). */
export const C4 = { extraAtp: 2 };
C4.atpPerCO2 = CALVIN.atpPerCO2 + C4.extraAtp; // 5
export const CO2_PER_GLUCOSE = 6;
export const atpFor = (co2, path = 'c3') => co2 * (path === 'c4' ? C4.atpPerCO2 : CALVIN.atpPerCO2);
export const nadphFor = (co2) => co2 * CALVIN.nadphPerCO2;
export const atpNadphRatio = (path = 'c3') => (path === 'c4' ? C4.atpPerCO2 : CALVIN.atpPerCO2) / CALVIN.nadphPerCO2;
/** Carbon bookkeeping for three turns of the Calvin cycle (3 CO2 fixed, 1 G3P gained). */
export const TURN = { co2: 3, rubp: 3, pga: 6, g3p: 6, exported: 1, regenerated: 5 };
TURN.carbonIn = TURN.rubp * 5 + TURN.co2; // 18
TURN.carbonPga = TURN.pga * 3; // 18
TURN.carbonRegenIn = TURN.regenerated * 3; // 15 in 5 G3P
TURN.carbonRubp = TURN.rubp * 5; // 15 in 3 RuBP
TURN.atp = atpFor(TURN.co2); // 9
TURN.nadph = nadphFor(TURN.co2); // 6
export const turnsFor = (g3p) => g3p * 3; // three turns per net G3P
export const turnsForGlucose = (glucose = 1) => glucose * CO2_PER_GLUCOSE;

/** Light reaction: water splitting. 2 H2O -> 4 H+ + 4 e- + O2; each NADPH needs 2 electrons. */
export const oxygenFromWater = (water) => water / 2;
export const electronsFromWater = (water) => water * 2;
export const nadphFromElectrons = (e) => e / 2;
/** Overall equation for one glucose: 6 CO2 + 12 H2O -> glucose + 6 O2 + 6 H2O. */
export const OVERALL = { co2: 6, waterIn: 12, glucose: 1, o2: 6, waterOut: 6 };
OVERALL.waterNet = OVERALL.waterIn - OVERALL.waterOut;

/** Masses (g per mol) for stoichiometry. */
export const MM = { co2: 44, glucose: 180, o2: 32 };
export const co2MassForGlucose = (glucoseG) => round((glucoseG / MM.glucose) * CO2_PER_GLUCOSE * MM.co2, 2);
export const o2MassForGlucose = (glucoseG) => round((glucoseG / MM.glucose) * CO2_PER_GLUCOSE * MM.o2, 2);
export const glucoseFromCo2Mol = (mol) => mol / CO2_PER_GLUCOSE;

/** Paper chromatography of leaf pigments (NCERT order from the top of the strip). */
export const SOLVENT_FRONT = 12;
export const SPOTS = [['Carotenoids', 11.4, 'yellow to yellow-orange'], ['Xanthophylls', 9.0, 'yellow'], ['Chlorophyll a', 6.0, 'bright or blue green'], ['Chlorophyll b', 4.2, 'yellow green']];
export const rf = (d, front = SOLVENT_FRONT) => round(d / front, 2);

/** Blackman's law: the rate is set by the factor nearest its minimum. Arbitrary units; light as percent of full sunlight, CO2 in microlitre per litre. */
export const lightPot = (L) => 4.5 * L;
export const co2Pot = (C) => 0.1 * C;
export const tempPot = (T) => 50 - 4 * Math.max(0, 20 - T, T - 35);
export const rate = (L, C, T = 25) => Math.min(lightPot(L), co2Pot(C), tempPot(T));
export const limiting = (L, C, T = 25) => {
  const f = { light: lightPot(L), 'carbon dioxide': co2Pot(C), temperature: tempPot(T) };
  const m = Math.min(...Object.values(f));
  return Object.keys(f).filter((k) => f[k] === m);
};
export const ppm = (pct) => round(pct * 10000, 0);
export const LIGHT_SAT = (C, T = 25) => Math.min(co2Pot(C), tempPot(T)) / 4.5; // light intensity at which light stops limiting

/** Net and gross photosynthesis from a leaf-disc measurement. */
export const gross = (net, resp) => net + resp;

/** Worked numbers used in slides and questions. */
export const N = {};
N.atp6 = atpFor(6); // 18
N.nadph6 = nadphFor(6); // 12
N.atp6c4 = atpFor(6, 'c4'); // 30
N.atp12 = atpFor(12);
N.nadph12 = nadphFor(12);
N.atp15 = atpFor(15);
N.nadph15 = nadphFor(15);
N.atp9c4 = atpFor(9, 'c4');
N.ratioC3 = atpNadphRatio();
N.ratioC4 = atpNadphRatio('c4');
N.water24 = 24;
N.o2from24 = oxygenFromWater(24); // 12
N.e24 = electronsFromWater(24); // 48
N.nadphFrom48 = nadphFromElectrons(48); // 24
N.co2For9g = co2MassForGlucose(9); // 13.2
N.o2For9g = o2MassForGlucose(9); // 9.6
N.co2For36g = co2MassForGlucose(36); // 52.8
N.turns4glucose = turnsForGlucose(4);
N.turns2g3p = turnsFor(2);
N.turns10g3p = turnsFor(10);
N.glucoseFrom30 = glucoseFromCo2Mol(30); // 5
N.rate5 = rate(4, 300); // light limited
N.rate10 = rate(10, 300);
N.rate10hi = rate(10, 450);
N.rate20hi = rate(20, 450);
N.rate20 = rate(20, 300);
N.rateHot = rate(20, 450, 45);
N.rateCold = rate(20, 450, 10);
N.gross1 = gross(14, 6);
N.gross2 = gross(9, 4);
N.net1 = 22 - 8;
N.ppm004 = ppm(0.04);
N.ppm003 = ppm(0.03);
N.satLight300 = LIGHT_SAT(300);
N.satLight450 = LIGHT_SAT(450);

eq(CALVIN.atpPerCO2, 3, 'ATP per CO2');
eq(CALVIN.nadphPerCO2, 2, 'NADPH per CO2');
eq(C4.atpPerCO2, 5, 'C4 ATP per CO2');
eq(N.atp6, 18, 'ATP per glucose, C3');
eq(N.nadph6, 12, 'NADPH per glucose');
eq(N.atp6c4, 30, 'ATP per glucose, C4');
eq(N.atp12, 36, 'ATP for 12 CO2');
eq(N.nadph12, 24, 'NADPH for 12 CO2');
eq(N.atp15, 45, 'ATP for 15 CO2');
eq(N.nadph15, 30, 'NADPH for 15 CO2');
eq(N.atp9c4, 45, 'ATP for 9 CO2, C4');
eq(N.ratioC3, 1.5, 'ATP:NADPH, C3');
eq(N.ratioC4, 2.5, 'ATP:NADPH, C4');
eq(TURN.carbonIn, TURN.carbonPga, 'carbon in = carbon in PGA');
eq(TURN.carbonRegenIn + TURN.exported * 3, TURN.g3p * 3, 'G3P carbon: 15 regenerates RuBP, 3 exported');
eq(TURN.carbonRegenIn, TURN.carbonRubp, 'regenerated carbon = RuBP carbon');
eq(TURN.atp, 9, 'ATP for three turns');
eq(TURN.nadph, 6, 'NADPH for three turns');
eq(turnsForGlucose(), 6, 'turns per glucose');
eq(N.turns4glucose, 24, 'turns for 4 glucose');
eq(N.turns2g3p, 6, 'turns for 2 G3P');
eq(N.turns10g3p, 30, 'turns for 10 G3P');
eq(N.glucoseFrom30, 5, 'glucose from 30 CO2');
eq(N.o2from24, 12, 'O2 from 24 water');
eq(N.e24, 48, 'electrons from 24 water');
eq(N.nadphFrom48, 24, 'NADPH from 48 electrons');
eq(electronsFromWater(OVERALL.waterIn), 24, 'electrons from 12 water');
eq(nadphFromElectrons(24), OVERALL.waterIn, 'NADPH made equals water split per glucose');
eq(oxygenFromWater(OVERALL.waterIn), OVERALL.o2, 'O2 from 12 water');
eq(OVERALL.waterNet, 6, 'net water consumed');
eq(MM.co2 * 6 + 0, 264, 'CO2 mass for one glucose');
eq(N.co2For9g, 13.2, 'CO2 for 9 g glucose');
eq(N.o2For9g, 9.6, 'O2 for 9 g glucose');
eq(N.co2For36g, 52.8, 'CO2 for 36 g glucose');
same(SPOTS.map(([, d]) => rf(d)).join(), '0.95,0.75,0.5,0.35', 'Rf values');
eq(N.rate5, 18, 'rate at 4 percent light');
eq(N.rate10, 30, 'rate at 10 percent light, 300');
eq(N.rate10hi, 45, 'rate at 10 percent light, 450');
eq(N.rate20hi, 45, 'rate at 20 percent light, 450');
eq(N.rate20, 30, 'rate at 20 percent light, 300');
eq(N.rateHot, 10, 'rate at 45 degrees');
eq(N.rateCold, 10, 'rate at 10 degrees');
eq(N.gross1, 20, 'gross 1');
eq(N.gross2, 13, 'gross 2');
eq(N.net1, 14, 'net 1');
eq(N.ppm004, 400, 'ppm of 0.04 percent');
eq(N.ppm003, 300, 'ppm of 0.03 percent');
eq(round(N.satLight300, 2), 6.67, 'light saturation at 300');
eq(N.satLight450, 10, 'light saturation at 450');
same(limiting(4, 300).join(), 'light', 'limiting at 4 percent light');
same(limiting(10, 300).join(), 'carbon dioxide', 'limiting at 10 percent light, 300');
same(limiting(20, 450, 45).join(), 'temperature', 'limiting at 45 degrees');
eq(5 * 1, 3 + 2, 'RuBP carbon splits into PGA and phosphoglycolate in photorespiration');

// ---- extra worked numbers for the question bank (fresh set-ups)
N.rf9of15 = rf(9, 15);
N.rfDist = round(0.35 * 12, 1);
N.rfCase = { front: 14, spots: [13.3, 10.5, 7, 4.9] };
N.rfCaseRf = N.rfCase.spots.map((d) => rf(d, 14));
N.h6 = 2 * 6; // protons from splitting 6 water (2 H2O gives 4 H+)
N.atp18c3 = atpFor(18);
N.atp18c4 = atpFor(18, 'c4');
N.atp18diff = N.atp18c4 - N.atp18c3;
N.rateA = rate(5, 450);
N.rate6_450 = rate(6, 450);
N.rate15_300 = rate(15, 300);
N.rate8_600 = rate(8, 600);
N.gross3 = gross(11, 5);
N.rateWheat = rate(10, 450, 25);
N.rate40 = rate(20, 450, 40);
N.limitA = limiting(5, 450).join();
eq(N.rf9of15, 0.6, 'Rf 9 of 15');
eq(N.rfDist, 4.2, 'band distance');
same(N.rfCaseRf.join(), '0.95,0.75,0.5,0.35', 'case Rf values');
eq(N.h6, 12, 'protons from 6 water');
eq(N.atp18c3, 54, 'ATP for 18 CO2, C3');
eq(N.atp18c4, 90, 'ATP for 18 CO2, C4');
eq(N.atp18diff, 36, 'extra ATP in C4');
eq(N.rateA, 22.5, 'rate A');
eq(N.rate6_450, 27, 'rate at 6 percent light, 450');
eq(N.rate15_300, 30, 'rate at 15 percent light, 300');
eq(N.rate8_600, 36, 'rate at 8 percent light, 600');
eq(N.gross3, 16, 'gross 3');
eq(N.rate40, 30, 'rate at 40 degrees');
same(N.limitA, 'light', 'limiting at 5 percent light, 450');
