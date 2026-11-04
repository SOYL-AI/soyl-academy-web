// ISC 11 Biology ch17 Body Fluids and Circulation — every number in a stem, answer, table, slide or diagram is computed here and asserted.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
/** Throws when a computed value does not match the expected one. */
export const eq = (v, e, what) => {
  if (!(v === e || (typeof v === 'number' && typeof e === 'number' && Math.abs(v - e) < 1e-9))) throw new Error(`calc: ${what}: got ${v}, expected ${e}`);
  return v;
};

// ---------------------------------------------------------------- composition of blood
export const PLASMA_PCT = 55;
export const CELLS_PCT = 100 - PLASMA_PCT;
export const split = (volume) => ({ plasma: round((volume * PLASMA_PCT) / 100, 1), cells: round((volume * CELLS_PCT) / 100, 1) });
export const BAG = 450; // mL of blood in one donation
export const BAG_SPLIT = split(BAG);
eq(BAG_SPLIT.plasma, 247.5, 'plasma in one bag');
eq(BAG_SPLIT.cells, 202.5, 'cells in one bag');
export const WATER_PCT = 92;
export const PROTEIN_PCT = 7;
export const plasmaWater = round((BAG_SPLIT.plasma * WATER_PCT) / 100, 1);
export const plasmaProtein = round((BAG_SPLIT.plasma * PROTEIN_PCT) / 100, 2);
eq(plasmaWater, 227.7, 'water in the plasma of one bag');
eq(plasmaProtein, 17.33, 'protein in the plasma of one bag');
// red cells
export const MM3_PER_LITRE = 1_000_000;
export const rbcTotal = (perMm3, litres) => perMm3 * litres * MM3_PER_LITRE;
export const RBC = { perMm3: 5_000_000, litres: 5, lifeDays: 120 };
export const RBC_TOTAL = rbcTotal(RBC.perMm3, RBC.litres);
eq(RBC_TOTAL, 2.5e13, 'red cells in the body');
export const RBC_PER_DAY_BILLION = round(RBC_TOTAL / RBC.lifeDays / 1e9, 1);
eq(RBC_PER_DAY_BILLION, 208.3, 'red cells replaced in a day (billion)');
// white cells
export const absolute = (total, pct) => round((total * pct) / 100);
export const WBC = { total: 12500, neutrophilPct: 71 };
eq(absolute(WBC.total, WBC.neutrophilPct), 8875, 'neutrophils per mm3');
export const WBC_NORMAL = { low: 6000, high: 8000 };
// platelets
export const PLT = { perMm3: 250_000, mm3: 4 };
export const PLT_IN = PLT.perMm3 * PLT.mm3;
eq(PLT_IN, 1_000_000, 'platelets in 4 mm3');

// ---------------------------------------------------------------- ABO and Rh
export const TYPES = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
const antigens = (t) => (t.startsWith('AB') ? ['A', 'B'] : t.startsWith('A') ? ['A'] : t.startsWith('B') ? ['B'] : []);
const rhPos = (t) => t.endsWith('+');
/** Red cells of `donor` can be given to `recipient` (no antigen the recipient lacks: A, B or Rh). */
export const canGive = (donor, recipient) => antigens(donor).every((a) => antigens(recipient).includes(a)) && (!rhPos(donor) || rhPos(recipient));
export const recipientsOf = (d) => TYPES.filter((t) => canGive(d, t));
export const donorsFor = (r) => TYPES.filter((t) => canGive(t, r));
eq(recipientsOf('O-').length, 8, 'recipients of O negative');
eq(donorsFor('O-').length, 1, 'donors for O negative');
eq(donorsFor('AB+').length, 8, 'donors for AB positive');
eq(recipientsOf('AB+').length, 1, 'recipients of AB positive');
eq(recipientsOf('A-').length, 4, 'recipients of A negative');
eq(donorsFor('B-').length, 2, 'donors for B negative');
eq(donorsFor('A+').length, 4, 'donors for A positive');
eq(recipientsOf('B+').length, 2, 'recipients of B positive');
export const compatPairs = TYPES.flatMap((d) => TYPES.filter((r) => canGive(d, r)).map((r) => [d, r])).length;
eq(compatPairs, 27, 'compatible donor-recipient pairs among the eight types');
/** ABO of a child from parental genotypes written with A, B and O (e.g. 'AO', 'BB'). */
export function aboChild(g1, g2) {
  const out = new Map();
  for (const a of g1) for (const b of g2) {
    const s = [a, b].sort().join('');
    const blood = s === 'OO' ? 'O' : s === 'AB' ? 'AB' : s.includes('A') ? 'A' : 'B';
    out.set(blood, (out.get(blood) ?? 0) + 0.25);
  }
  return out;
}
export const P = (m, k) => m.get(k) ?? 0;
eq(P(aboChild('AB', 'AO'), 'A'), 0.5, 'AB x AO gives A');
eq(P(aboChild('AB', 'AO'), 'AB'), 0.25, 'AB x AO gives AB');
eq(P(aboChild('AB', 'AO'), 'B'), 0.25, 'AB x AO gives B');
eq(P(aboChild('AO', 'BO'), 'O'), 0.25, 'AO x BO gives O');
eq(P(aboChild('BO', 'BO'), 'O'), 0.25, 'BO x BO gives O');
eq(P(aboChild('BO', 'BO'), 'B'), 0.75, 'BO x BO gives B');
eq(P(aboChild('AA', 'OO'), 'O'), 0, 'AA x OO gives no O');
/** Rh: genotypes written with D (Rh positive, dominant) and d (Rh negative). Returns P(Rh positive child). */
export function rhPositive(g1, g2) {
  let pos = 0;
  for (const a of g1) for (const b of g2) if (a === 'D' || b === 'D') pos += 0.25;
  return pos;
}
eq(rhPositive('Dd', 'dd'), 0.5, 'Rh positive child of Dd x dd');
eq(rhPositive('DD', 'dd'), 1, 'Rh positive child of DD x dd');
eq(rhPositive('Dd', 'Dd'), 0.75, 'Rh positive child of Dd x Dd');
export const RH_POS_PCT = 85; // about 85 percent of people are Rh positive (textbook figures vary: 80 to 85)
export const rhNeg = (n) => round((n * (100 - RH_POS_PCT)) / 100);
eq(rhNeg(2000), 300, 'Rh negative among 2000');

// ---------------------------------------------------------------- the heart
export const cycleSec = (hr) => round(60 / hr, 2);
export const PHASES = [['Atrial systole', 0.1], ['Ventricular systole', 0.3], ['Joint diastole', 0.4]];
eq(PHASES.reduce((s, [, t]) => s + t, 0), 0.8, 'phases add to one cycle at 75 beats a minute');
eq(cycleSec(75), 0.8, 'cycle at 75');
export const co = (hr, sv) => hr * sv; // mL per minute
export const CO1 = { hr: 64, sv: 85 };
eq(co(CO1.hr, CO1.sv), 5440, 'cardiac output of the first example');
export const CO_DAY_L = round((co(CO1.hr, CO1.sv) * 1440) / 1000, 1);
eq(CO_DAY_L, 7833.6, 'litres pumped in a day');
export const CO_ATH = { hr: 48, sv: 120 };
eq(co(CO_ATH.hr, CO_ATH.sv), 5760, 'athlete cardiac output');
export const CO_EX = { hr: 150, sv: 110 };
eq(co(CO_EX.hr, CO_EX.sv), 16500, 'exercise cardiac output');
export const svFrom = (coMl, hr) => round(coMl / hr);
eq(svFrom(4800, 80), 60, 'stroke volume from output and rate');
eq(svFrom(5760, 48), 120, 'athlete stroke volume');
export const beatsInDay = (hr) => hr * 60 * 24;
eq(beatsInDay(72), 103680, 'beats in a day at 72');
eq(cycleSec(100), 0.6, 'cycle at 100');
eq(cycleSec(80), 0.75, 'cycle at 80');
/** Heart rate from the R-R distance on an ECG strip run at 25 mm per second. */
export const hrFromRR = (mm, speed = 25) => round(60 / (mm / speed), 1);
eq(hrFromRR(15), 100, 'rate from R-R 15 mm');
eq(hrFromRR(30), 50, 'rate from R-R 30 mm');
eq(hrFromRR(20), 75, 'rate from R-R 20 mm');
// output of a patient with heart failure
export const FAIL = { hr: 96, sv: 40 };
eq(co(FAIL.hr, FAIL.sv), 3840, 'cardiac output in heart failure');
// blood pressure
export const HYPERTENSION = { sys: 140, dia: 90 };
export const pulse = (sys, dia) => sys - dia;
eq(pulse(120, 80), 40, 'pulse pressure');
export const BP_SYS = [152, 148, 156, 150];
export const BP_DIA = [96, 94, 98, 92];
export const meanOf = (a) => round(a.reduce((s, x) => s + x, 0) / a.length, 1);
eq(meanOf(BP_SYS), 151.5, 'mean systolic over four days');
eq(meanOf(BP_DIA), 95, 'mean diastolic over four days');

// ---------------------------------------------------------------- joint diastole when only the heart rate changes (systole times kept)
export const SYSTOLE_S = PHASES[0][1] + PHASES[1][1];
export const jd = (hr) => round(cycleSec(hr) - SYSTOLE_S, 2);
eq(jd(80), 0.35, 'joint diastole at 80');
eq(jd(100), 0.2, 'joint diastole at 100');
eq(jd(75), 0.4, 'joint diastole at 75');
// bank numbers
export const RBC_TRILLION = round(RBC_TOTAL / 1e12, 1);
eq(RBC_TRILLION, 25, 'red cells in trillions');
export const PLASMA_300 = split(300);
eq(PLASMA_300.plasma, 165, 'plasma in 300 mL');
export const LYMPH = { litres: 2.5 }; // illustrative: tissue fluid returned to the blood by lymph vessels in a day is about 2 to 4 litres in textbooks
export const MEAN_SYS = meanOf(BP_SYS);
export const MEAN_DIA = meanOf(BP_DIA);
export const OUT_ATH_L = round(co(CO_ATH.hr, CO_ATH.sv) / 1000, 2);
eq(OUT_ATH_L, 5.76, 'athlete output in litres');
export const HR_REST_ATH_BEATS = beatsInDay(CO_ATH.hr);
eq(HR_REST_ATH_BEATS, 69120, 'athlete beats a day');

// ---------------------------------------------------------------- numbers for the question bank (different from the worked examples)
export const UNTRAINED = { hr: 72, sv: 80 };
eq(co(UNTRAINED.hr, UNTRAINED.sv), co(CO_ATH.hr, CO_ATH.sv), 'untrained and athlete have the same output at rest');
export const CO_CHK = { hr: 70, sv: 75 };
eq(co(CO_CHK.hr, CO_CHK.sv), 5250, 'check: cardiac output');
export const HEALTHY_HEART = { hr: 72, sv: 70 };
eq(co(HEALTHY_HEART.hr, HEALTHY_HEART.sv), 5040, 'healthy output');
export const FAIL_DROP = round(((co(HEALTHY_HEART.hr, HEALTHY_HEART.sv) - co(FAIL.hr, FAIL.sv)) / co(HEALTHY_HEART.hr, HEALTHY_HEART.sv)) * 100, 1);
eq(FAIL_DROP, 23.8, 'fall of output in heart failure');
eq(hrFromRR(24), 62.5, 'rate from R-R 24 mm');
export const EX = { untrained: { hr: 170, sv: 95 }, athlete: { hr: 170, sv: 150 } };
eq(co(EX.untrained.hr, EX.untrained.sv), 16150, 'untrained exercise output');
eq(co(EX.athlete.hr, EX.athlete.sv), 25500, 'athlete exercise output');
export const abBO = aboChild('AB', 'BO');
eq(P(abBO, 'A'), 0.25, 'AB x BO gives A');
eq(P(abBO, 'AB'), 0.25, 'AB x BO gives AB');
eq(P(abBO, 'B'), 0.5, 'AB x BO gives B');
eq(donorsFor('AB-').length, 4, 'donors for AB negative');
eq(donorsFor('A-').length, 2, 'donors for A negative');
export const RH_POS_2000 = 2000 - rhNeg(2000);
eq(RH_POS_2000, 1700, 'Rh positive among 2000');
eq(recipientsOf('B-').length, 4, 'recipients of B negative');
export const PULSE_Q = { sys: 148, dia: 92 };
eq(pulse(PULSE_Q.sys, PULSE_Q.dia), 56, 'pulse pressure of the question');
