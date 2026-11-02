// ch12 Respiration in Plants — every number used by decks, SVGs and questions is computed (and asserted) here.
// ATP convention (NCERT, stated in the notes): 3 ATP per NADH and 2 ATP per FADH2 oxidised in the electron transport system,
// NADH made in glycolysis counted like mitochondrial NADH, giving 38 ATP per glucose. Newer values (2.5 and 1.5) give about 32.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
const eq = (a, b, what) => {
  if (Math.abs(a - b) > 1e-9) throw new Error(`calc: ${what} = ${a}, expected ${b}`);
};
const same = (a, b, what) => {
  if (a !== b) throw new Error(`calc: ${what} = ${a}, expected ${b}`);
};

export const CONV = { nadh: 3, fadh2: 2 }; // textbook ATP per NADH, per FADH2
export const CONV_NEW = { nadh: 2.5, fadh2: 1.5 };

/** Glycolysis per glucose. */
export const GLYC = { atpIn: 2, atpOut: 4, nadh: 2, pyruvate: 2 };
GLYC.netAtp = GLYC.atpOut - GLYC.atpIn;
/** Link reaction (oxidative decarboxylation) per glucose: 2 pyruvate. */
export const LINK = { nadh: 2, co2: 2, acetylCoA: 2 };
/** Citric acid (Krebs) cycle per acetyl CoA. */
export const TCA = { nadh: 3, fadh2: 1, atp: 1, co2: 2 };
export const perGlucoseTca = (k) => TCA[k] * 2;
/** Complete oxidation of glucose. */
export const atpFrom = (nadh, fadh2, conv = CONV) => nadh * conv.nadh + fadh2 * conv.fadh2;
export const TOTAL_NADH = GLYC.nadh + LINK.nadh + perGlucoseTca('nadh'); // 10
export const TOTAL_FADH2 = perGlucoseTca('fadh2'); // 2
export const substrateAtp = GLYC.netAtp + perGlucoseTca('atp'); // 4
export const totalAtp = (conv = CONV) => substrateAtp + atpFrom(TOTAL_NADH, TOTAL_FADH2, conv);
export const SOURCES = [
  ['Glycolysis', GLYC.netAtp + atpFrom(GLYC.nadh, 0)],
  ['Link reaction', atpFrom(LINK.nadh, 0)],
  ['Krebs cycle', perGlucoseTca('atp') + atpFrom(perGlucoseTca('nadh'), perGlucoseTca('fadh2'))],
];
export const co2Aerobic = LINK.co2 + perGlucoseTca('co2'); // 6
export const o2Aerobic = (TOTAL_NADH + TOTAL_FADH2) / 2; // 6: each pair of electrons reduces half an O2
export const atpPerAcetylCoA = TCA.atp + atpFrom(TCA.nadh, TCA.fadh2);

/** Energy: complete oxidation of glucose releases 2870 kJ per mole; hydrolysis of ATP about 30.5 kJ per mole. */
export const GLUCOSE_KJ = 2870;
export const ATP_KJ = 30.5;
export const efficiency = (atp) => round(((atp * ATP_KJ) / GLUCOSE_KJ) * 100, 1);

/** Fermentation (per glucose): 2 pyruvate -> 2 ethanol + 2 CO2, net 2 ATP. Molar masses g per mol. */
export const MM = { glucose: 180, ethanol: 46, co2: 44, o2: 32, h2o: 18 };
export const ethanolFrom = (glucoseG) => round((glucoseG / MM.glucose) * 2 * MM.ethanol, 2);
export const co2FromFerment = (glucoseG) => round((glucoseG / MM.glucose) * 2 * MM.co2, 2);
export const co2Aero = (glucoseG) => round((glucoseG / MM.glucose) * 6 * MM.co2, 2);
export const o2Aero = (glucoseG) => round((glucoseG / MM.glucose) * 6 * MM.o2, 2);
export const atpFerment = (glucoseMol) => glucoseMol * GLYC.netAtp;
export const atpAerobic = (glucoseMol, conv = CONV) => glucoseMol * totalAtp(conv);

/** Respiratory quotient = volume (moles) of CO2 evolved / volume (moles) of O2 consumed, from balanced equations. */
export const rq = (co2, o2) => round(co2 / o2, 2);
export const EQN = {
  glucose: { name: 'Glucose', eq: 'C6H12O6 + 6 O2 → 6 CO2 + 6 H2O', co2: 6, o2: 6 },
  tripalmitin: { name: 'Tripalmitin (a fat)', eq: '2 C51H98O6 + 145 O2 → 102 CO2 + 98 H2O', co2: 102, o2: 145 },
  stearic: { name: 'Stearic acid', eq: 'C18H36O2 + 26 O2 → 18 CO2 + 18 H2O', co2: 18, o2: 26 },
  malic: { name: 'Malic acid', eq: 'C4H6O5 + 3 O2 → 4 CO2 + 3 H2O', co2: 4, o2: 3 },
  oxalic: { name: 'Oxalic acid', eq: '2 C2H2O4 + O2 → 4 CO2 + 2 H2O', co2: 4, o2: 1 },
  ferment: { name: 'Anaerobic (fermentation of glucose)', eq: 'C6H12O6 → 2 C2H5OH + 2 CO2', co2: 2, o2: 0 },
};
export const RQ = Object.fromEntries(Object.entries(EQN).filter(([, e]) => e.o2 > 0).map(([k, e]) => [k, rq(e.co2, e.o2)]));

/** Worked numbers used in slides and questions. */
export const N = {};
N.glyc3 = { atpNet: 3 * GLYC.netAtp, nadh: 3 * GLYC.nadh, pyruvate: 3 * GLYC.pyruvate, atpIn: 3 * GLYC.atpIn, atpOut: 3 * GLYC.atpOut };
N.glyc5 = { atpNet: 5 * GLYC.netAtp, nadh: 5 * GLYC.nadh, pyruvate: 5 * GLYC.pyruvate };
N.ethanol90 = ethanolFrom(90); // 46
N.co2f90 = co2FromFerment(90); // 44
N.ethanol36 = ethanolFrom(36);
N.co2f36 = co2FromFerment(36);
N.yeast2mol = atpFerment(2);
N.aero2mol = atpAerobic(2);
N.tca = { nadh: perGlucoseTca('nadh'), fadh2: perGlucoseTca('fadh2'), atp: perGlucoseTca('atp'), co2: perGlucoseTca('co2') };
N.tcaAtp = atpPerAcetylCoA; // 12
N.total = totalAtp();
N.totalNew = totalAtp(CONV_NEW);
N.effAero = efficiency(N.total);
N.effFerm = efficiency(GLYC.netAtp);
N.kjAero = round(N.total * ATP_KJ, 0);
N.kjFerm = GLYC.netAtp * ATP_KJ;
N.co2g18 = co2Aero(18);
N.o2g18 = o2Aero(18);
N.co2g90 = co2Aero(90);
N.o2g90 = o2Aero(90);
N.nadh7 = 7;
N.atpNadh7 = N.nadh7 * CONV.nadh;
N.fadh2_5 = 5 * CONV.fadh2;
N.oxid = { nadh: 12, fadh2: 8 };
N.atpOxid = atpFrom(N.oxid.nadh, N.oxid.fadh2);
N.seedFat = { o2: 140, co2: 98 };
N.seedRq = rq(N.seedFat.co2, N.seedFat.o2);
N.seedCarb = { o2: 120, co2: 120 };
N.seedProt = { o2: 100, co2: 90 };
N.leaf = { o2: 50, co2: 65 };
N.leafRq = rq(N.leaf.co2, N.leaf.o2);
N.mixed = { carbo: { o2: 60, co2: 60 }, fat: { o2: 40, co2: 28 } };
N.mixedRq = rq(N.mixed.carbo.co2 + N.mixed.fat.co2, N.mixed.carbo.o2 + N.mixed.fat.o2);
N.fruit = { o2: 30, co2: 0 };

same(RQ.glucose + '', '1', 'RQ glucose');
eq(RQ.tripalmitin, 0.7, 'RQ tripalmitin');
eq(RQ.stearic, 0.69, 'RQ stearic');
eq(RQ.malic, 1.33, 'RQ malic acid');
eq(RQ.oxalic, 4, 'RQ oxalic acid');
eq(GLYC.netAtp, 2, 'net ATP in glycolysis');
eq(TOTAL_NADH, 10, 'NADH per glucose');
eq(TOTAL_FADH2, 2, 'FADH2 per glucose');
eq(substrateAtp, 4, 'substrate-level ATP per glucose');
eq(N.total, 38, 'ATP per glucose, textbook convention');
eq(N.totalNew, 32, 'ATP per glucose, newer convention');
same(SOURCES.map(([, v]) => v).join(), '8,6,24', 'ATP by stage');
eq(SOURCES.reduce((s, [, v]) => s + v, 0), 38, 'stages add to 38');
eq(co2Aerobic, 6, 'CO2 per glucose, aerobic');
eq(o2Aerobic, 6, 'O2 per glucose, aerobic');
eq(N.tcaAtp, 12, 'ATP per acetyl CoA');
eq(N.tca.nadh, 6, 'TCA NADH per glucose');
eq(N.tca.fadh2, 2, 'TCA FADH2 per glucose');
eq(N.tca.co2, 4, 'TCA CO2 per glucose');
eq(N.effAero, 40.4, 'aerobic efficiency');
eq(N.effFerm, 2.1, 'fermentation efficiency');
eq(N.kjAero, 1159, 'energy trapped aerobically');
eq(N.kjFerm, 61, 'energy trapped in fermentation');
eq(N.glyc3.atpNet, 6, 'ATP from 3 glucose, glycolysis');
eq(N.glyc3.nadh, 6, 'NADH from 3 glucose');
eq(N.glyc3.pyruvate, 6, 'pyruvate from 3 glucose');
eq(N.glyc3.atpIn, 6, 'ATP spent for 3 glucose');
eq(N.glyc3.atpOut, 12, 'ATP made for 3 glucose');
eq(N.glyc5.atpNet, 10, 'ATP from 5 glucose');
eq(N.ethanol90, 46, 'ethanol from 90 g glucose');
eq(N.co2f90, 44, 'CO2 from 90 g glucose');
eq(N.ethanol90 + N.co2f90, 90, 'mass conserved in fermentation');
eq(N.ethanol36, 18.4, 'ethanol from 36 g glucose');
eq(N.co2f36, 17.6, 'CO2 from 36 g glucose');
eq(N.co2g18, 26.4, 'CO2 from 18 g glucose, aerobic');
eq(N.o2g18, 19.2, 'O2 for 18 g glucose, aerobic');
eq(N.co2g90 - N.o2g90, 132 - 96, 'CO2 and O2 for 90 g');
eq(N.o2g90 + 90, N.co2g90 + round((90 / 180) * 6 * MM.h2o, 2), 'mass conserved in aerobic respiration of 90 g');
eq(N.yeast2mol, 4, 'ATP from 2 mol glucose, fermentation');
eq(N.aero2mol, 76, 'ATP from 2 mol glucose, aerobic');
eq(N.atpNadh7, 21, 'ATP from 7 NADH');
eq(N.fadh2_5, 10, 'ATP from 5 FADH2');
eq(N.atpOxid, 52, 'ATP from 12 NADH and 8 FADH2');
eq(N.seedRq, 0.7, 'seed fat RQ');
eq(rq(N.seedCarb.co2, N.seedCarb.o2), 1, 'seed carbohydrate RQ');
eq(rq(N.seedProt.co2, N.seedProt.o2), 0.9, 'seed protein RQ');
eq(N.leafRq, 1.3, 'leaf RQ');
eq(N.mixedRq, 0.88, 'mixed RQ');

// ---- extra worked numbers for the question bank (fresh set-ups)
N.ethanol54 = ethanolFrom(54);
N.co2f54 = co2FromFerment(54);
N.diff9 = 9 * (totalAtp() - GLYC.netAtp);
N.seedCase = { P: { o2: 80, co2: 80 }, Q: { o2: 150, co2: 105 }, R: { o2: 120, co2: 108 } };
N.seedCaseRq = Object.fromEntries(Object.entries(N.seedCase).map(([k, v]) => [k, rq(v.co2, v.o2)]));
N.ets42 = atpFrom(4, 2);
N.link4 = 4 * LINK.co2;
N.tca3nadh = 3 * perGlucoseTca('nadh');
N.fadh5 = 5 * TCA.fadh2;
N.glucoseEtOH = ethanolFrom(180);
N.co2f180 = co2FromFerment(180);
N.etsAtp = atpFrom(TOTAL_NADH, TOTAL_FADH2); // 34 from NADH and FADH2
N.sprint = { glucose: 9 };
N.tripalmitinCo2 = EQN.tripalmitin.co2;
N.o2Volume = { carbo: 6, fat: 145 };
N.rqFatPerO2 = rq(EQN.tripalmitin.co2, EQN.tripalmitin.o2);
N.mixed2 = rq(45 + 21, 45 + 30);
N.rqAcid = RQ.malic;
N.oxalicRq = RQ.oxalic;
N.ethanolPer = N.glucoseEtOH;
eq(N.ethanol54, 27.6, 'ethanol from 54 g glucose');
eq(N.co2f54, 26.4, 'CO2 from 54 g glucose');
eq(N.diff9, 324, 'extra ATP for 9 glucose aerobic vs fermentation');
same(Object.values(N.seedCaseRq).join(), '1,0.7,0.9', 'seed case RQs');
eq(N.ets42, 16, 'ATP from 4 NADH and 2 FADH2');
eq(N.link4, 8, 'CO2 from link reaction of 4 glucose');
eq(N.tca3nadh, 18, 'NADH from Krebs cycle for 3 glucose');
eq(N.fadh5, 5, 'FADH2 from 5 acetyl CoA');
eq(N.glucoseEtOH + N.co2f180, 180, 'mass conserved for 180 g');
eq(N.etsAtp, 34, 'ATP made by the ETS per glucose');
eq(N.mixed2, 0.88, 'mixed RQ 2');
