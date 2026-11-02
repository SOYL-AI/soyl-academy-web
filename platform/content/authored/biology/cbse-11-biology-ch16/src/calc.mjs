// ch16 Excretory Products and their Elimination — every number used by decks, SVGs and questions is computed (and checked) here.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
const check = (cond, msg) => {
  if (!cond) throw new Error('calc: ' + msg);
};

/** Typical textbook values (NCERT Class 11, rationalised). Real values vary with body size, diet and water intake. */
export const KIDNEY = {
  length: [10, 12], width: [5, 7], thick: [2, 3], mass: [120, 170], // cm, cm, cm, g
  nephrons: 1e6, // nearly one million per kidney
  bloodFlow: [1100, 1200], // mL of blood filtered by the kidneys per minute
  gfr: 125, // mL per minute
  reabsorbedPct: 99, // nearly 99 percent of filtrate
  urinePerDay: [1, 1.5], // litres
  ureaPerDay: [25, 30], // g
  urinePH: 6.0,
  osm: { cortex: 300, inner: 1200 }, // mOsmol per litre
  pctPct: [70, 80], // percent of electrolytes and water reabsorbed in the PCT
  lungsCO2: 200, // mL per minute
};

export const MIN_PER_DAY = 24 * 60;
/** Filtrate per day in litres from a GFR in mL per minute. */
export const filtrateL = (gfrMlMin) => (gfrMlMin * MIN_PER_DAY) / 1000;
/** Percentage of filtrate reabsorbed when `urineL` of urine comes from `filtL` of filtrate. */
export const reabsorbedPct = (filtL, urineL, dp = 2) => round(((filtL - urineL) / filtL) * 100, dp);

KIDNEY.filtrate = filtrateL(KIDNEY.gfr);
check(KIDNEY.filtrate === 180, 'GFR 125 mL/min = 180 L/day');
check(KIDNEY.nephrons * 2 === 2e6, 'two kidneys, about two million nephrons');

/** Worked numbers. */
export const N = {};
// 1.5 L urine from 180 L filtrate
N.urine = 1.5;
N.reabL = KIDNEY.filtrate - N.urine; // 178.5 L
N.reabPct = reabsorbedPct(KIDNEY.filtrate, N.urine); // 99.17
check(N.reabL === 178.5 && N.reabPct === 99.17, 'reabsorption 178.5 L, 99.17 percent');
// 1 L urine: 99.44 percent
N.reab1 = reabsorbedPct(KIDNEY.filtrate, 1);
check(N.reab1 === 99.44, '1 L urine → 99.44 percent');
// GFR falling to 100 mL/min
N.filt100 = filtrateL(100);
check(N.filt100 === 144, 'GFR 100 → 144 L/day');
// GFR 120 mL/min → filtrate per hour
N.filtHour120 = (120 * 60) / 1000;
check(N.filtHour120 === 7.2, '7.2 L per hour');
// PCT: 70–80 percent of 180 L
N.pctLow = (KIDNEY.filtrate * KIDNEY.pctPct[0]) / 100;
N.pctHigh = (KIDNEY.filtrate * KIDNEY.pctPct[1]) / 100;
check(N.pctLow === 126 && N.pctHigh === 144, 'PCT 126–144 L');
// concentrating power: 1200 / 300
N.concFactor = KIDNEY.osm.inner / KIDNEY.osm.cortex;
check(N.concFactor === 4, 'nearly four times');
// osmolarity gradient levels (linear sketch for the diagram)
N.osmLevels = [0, 1, 2, 3].map((i) => KIDNEY.osm.cortex + (i * (KIDNEY.osm.inner - KIDNEY.osm.cortex)) / 3);
check(N.osmLevels.join() === '300,600,900,1200', 'osmolarity levels');
// urea concentration: 28 g in 1.4 L
N.ureaPerL = round(28 / 1.4, 1);
check(N.ureaPerL === 20, '20 g per L');
// lungs: carbon dioxide removed per hour
N.co2Hour = (KIDNEY.lungsCO2 * 60) / 1000; // litres
check(N.co2Hour === 12, '12 L carbon dioxide per hour');
// fraction of cardiac output reaching kidneys: 1100 of 5000 mL
N.renalShare = round((KIDNEY.bloodFlow[0] / 5000) * 100, 0);
check(N.renalShare === 22, 'about one fifth (22 percent)');
// filtered per minute vs flow: 125 of 1100 mL of blood
N.gfrOfFlow = round((KIDNEY.gfr / KIDNEY.bloodFlow[0]) * 100, 1);
check(N.gfrOfFlow === 11.4, '125 of 1100 = 11.4 percent');
// two days' filtrate
N.filt2days = 2 * KIDNEY.filtrate;
check(N.filt2days === 360, '360 L');
// case values
N.filt90 = round(filtrateL(90), 1);
check(N.filt90 === 129.6, 'GFR 90 → 129.6 L/day');
N.reab06 = reabsorbedPct(180, 0.6);
check(N.reab06 === 99.67, '0.6 L urine → 99.67 percent');
N.ureaDrop = round(((150 - 50) / 150) * 100, 1);
check(N.ureaDrop === 66.7, 'urea 150 → 50: 66.7 percent removed');
// urea: 25–30 g per day; 4 days at 27 g
N.urea4 = 4 * 27;
check(N.urea4 === 108, '108 g');
