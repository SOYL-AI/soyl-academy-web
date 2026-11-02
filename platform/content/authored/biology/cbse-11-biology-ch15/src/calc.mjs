// ch15 Body Fluids and Circulation — every number used by decks, SVGs and questions is computed (and checked) here.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
const check = (cond, msg) => {
  if (!cond) throw new Error('calc: ' + msg);
};

/** Typical textbook values (NCERT Class 11, rationalised). Ranges vary between people and laboratories. */
export const BLOOD = {
  plasmaPct: 55, // plasma about 55 percent of blood
  formedPct: 45, // formed elements about 45 percent
  waterInPlasma: [90, 92],
  proteinInPlasma: [6, 8],
  rbcMillion: [5, 5.5], // per cubic millimetre, healthy adult man
  rbcLifeDays: 120,
  hb: [12, 16], // g per 100 mL
  wbc: [6000, 8000], // per cubic millimetre
  platelets: [150000, 350000], // 1.5 to 3.5 lakh per cubic millimetre
  rhPositivePct: 80,
};
check(BLOOD.plasmaPct + BLOOD.formedPct === 100, 'plasma + formed elements = 100');

/** WBC differential (percent of all leucocytes): textbook ranges. */
export const WBC_DIFF = [
  ['Neutrophils', 60, 65],
  ['Lymphocytes', 20, 25],
  ['Monocytes', 6, 8],
  ['Eosinophils', 2, 3],
  ['Basophils', 0.5, 1],
];
check(WBC_DIFF[0][1] > WBC_DIFF[1][2] && WBC_DIFF[1][1] > WBC_DIFF[2][2], 'neutrophils > lymphocytes > monocytes');
export const share = (total, pct) => round((total * pct) / 100, 0);

/** Cardiac cycle and output. */
export const HEART = { rate: 72, stroke: 70, sanRate: [70, 75] };
export const cycleSec = (rate) => 60 / rate;
export const output = (stroke, rate) => stroke * rate; // mL per minute
HEART.cycle = round(cycleSec(HEART.rate), 1); // 0.833 → 0.8 s
HEART.cycleExact = round(cycleSec(HEART.rate), 3);
HEART.output = output(HEART.stroke, HEART.rate); // 5040 mL ≈ 5 L
check(HEART.cycle === 0.8, 'cycle 0.8 s');
check(HEART.cycleExact === 0.833, 'cycle 0.833 s');
check(HEART.output === 5040, 'cardiac output 5040 mL');
export const beatsPerDay = (rate) => rate * 60 * 24;
check(beatsPerDay(72) === 103680, 'beats per day');

/** Heart rate from an ECG strip: QRS complexes counted in a window of t seconds. */
export const rateFromQrs = (n, t) => (n * 60) / t;
check(rateFromQrs(18, 15) === 72, '18 QRS in 15 s');
check(rateFromQrs(10, 6) === 100, '10 QRS in 6 s');

/** ABO and Rh compatibility, computed from antigens and antibodies. */
export const ABO = {
  A: { antigen: ['A'], antibody: ['anti-B'] },
  B: { antigen: ['B'], antibody: ['anti-A'] },
  AB: { antigen: ['A', 'B'], antibody: [] },
  O: { antigen: [], antibody: ['anti-A', 'anti-B'] },
};
/** A donor's red cells are safe if the recipient's plasma has no antibody against any donor antigen. */
export const canGive = (donor, recipient) => ABO[donor].antigen.every((ag) => !ABO[recipient].antibody.includes(`anti-${ag}`));
export const donorsFor = (recipient) => Object.keys(ABO).filter((d) => canGive(d, recipient));
check(donorsFor('AB').length === 4, 'AB universal recipient');
check(Object.keys(ABO).every((r) => canGive('O', r)), 'O universal donor');
check(donorsFor('O').join() === 'O', 'O receives only O');
check(donorsFor('A').join() === 'A,O' && donorsFor('B').join() === 'B,O', 'A and B donors');

/** Blood pressure (mm Hg). */
export const BP = { normal: [120, 80], high: [140, 90] };
export const isHypertensive = ([s, d]) => s >= BP.high[0] || d >= BP.high[1];
check(isHypertensive([150, 85]) && !isHypertensive([118, 78]) && isHypertensive([130, 95]), 'hypertension rule');

/** Worked numbers used in slides and questions. */
export const N = {
  // plasma and formed elements in 5000 mL of blood
  blood: 5000,
};
N.plasma = share(N.blood, BLOOD.plasmaPct);
N.formed = share(N.blood, BLOOD.formedPct);
check(N.plasma === 2750 && N.formed === 2250, 'plasma 2750, formed 2250');
// neutrophils in 7000 WBC per cubic mm at 62 percent
N.neutro = share(7000, 62);
check(N.neutro === 4340, 'neutrophils 4340');
// Rh-positive people in a class of 40 at 80 percent
N.rhClass = share(40, BLOOD.rhPositivePct);
check(N.rhClass === 32, 'Rh+ 32 of 40');
// stroke volume from cardiac output 4.9 L at 70 per minute
N.sv = 4900 / 70;
check(N.sv === 70, 'stroke volume 70 mL');
// athlete: cardiac output 25 L at 180 per minute during exercise (illustrative)
N.svEx = round(25000 / 180, 0);
check(N.svEx === 139, 'exercise stroke volume ≈ 139 mL');
// haemoglobin carried in 5 L blood at 15 g per 100 mL
N.hbTotal = (N.blood / 100) * 15;
check(N.hbTotal === 750, '750 g haemoglobin');
// RBC turnover: fraction of red cells replaced per day, percent
N.rbcDaily = round(100 / BLOOD.rbcLifeDays, 2);
check(N.rbcDaily === 0.83, '0.83 percent per day');
// cycle length at 60 and 90 beats per minute
N.cycle60 = cycleSec(60);
N.cycle90 = round(cycleSec(90), 2);
check(N.cycle60 === 1 && N.cycle90 === 0.67, 'cycle lengths');
// beats in one hour at 72
N.beatsHour = 72 * 60;
check(N.beatsHour === 4320, '4320 beats per hour');
// more worked values
N.lympho7000 = share(7000, 22);
N.plasma6000 = share(6000, BLOOD.plasmaPct);
N.lympho8000 = share(8000, 25);
N.out75 = output(70, 75);
N.rate20 = rateFromQrs(20, 15);
N.rate21 = rateFromQrs(21, 15);
N.out65x80 = output(65, 80);
N.platelets24 = 2.4 * 100000;
check(N.lympho7000 === 1540 && N.plasma6000 === 3300 && N.lympho8000 === 2000, 'shares');
check(N.out75 === 5250 && N.rate20 === 80 && N.rate21 === 84 && N.out65x80 === 5200, 'heart values');
check(N.platelets24 === 240000 && N.platelets24 >= BLOOD.platelets[0] && N.platelets24 <= BLOOD.platelets[1], 'platelets in range');
// platelets: 1.5 lakh = 150000
check(BLOOD.platelets[0] === 1.5e5 && BLOOD.platelets[1] === 3.5e5, 'platelet lakh');
