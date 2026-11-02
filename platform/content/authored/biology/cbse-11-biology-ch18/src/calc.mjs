// ch18 Neural Control and Coordination — every number used by decks, SVGs and questions, asserted here.
const check = (cond, msg) => {
  if (!cond) throw new Error('calc: ' + msg);
};
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;

// ---------------------------------------------------------------- membrane potentials (typical values; NCERT gives no numbers)
export const REST = -70; // millivolts, typical resting potential
export const PEAK = 30; // millivolts, typical peak of the action potential
export const AMPLITUDE = PEAK - REST;
check(AMPLITUDE === 100, 'amplitude 100');

// ---------------------------------------------------------------- sodium–potassium pump: 3 Na+ out for 2 K+ in per cycle
export const PUMP = { na: 3, k: 2 };
export const pumpFor = (cycles) => ({ cycles, naOut: PUMP.na * cycles, kIn: PUMP.k * cycles, netOut: (PUMP.na - PUMP.k) * cycles });
export const WE1 = pumpFor(200);
check(WE1.naOut === 600 && WE1.kIn === 400 && WE1.netOut === 200, 'pump worked example');
/** K+ moved in when a given number of Na+ ions have been pumped out. */
export const kForNa = (na) => (na / PUMP.na) * PUMP.k;
check(kForNa(900) === 600, 'K for 900 Na');
export const Q_NET = pumpFor(450);
check(Q_NET.netOut === 450 && Q_NET.naOut === 1350 && Q_NET.kIn === 900, 'net charge 450');

// ---------------------------------------------------------------- conduction (illustrative speeds in metres per second)
/** Time in milliseconds to cover d metres at v metres per second. */
export const ms = (d, v) => round((d / v) * 1000, 3);
export const FAST = 50; // a myelinated fibre, typical
export const SLOW = 1; // a non-myelinated fibre, typical
export const WE2 = { d: 0.8, fast: FAST, slow: SLOW };
WE2.tFast = ms(WE2.d, WE2.fast);
WE2.tSlow = ms(WE2.d, WE2.slow);
WE2.ratio = round(WE2.tSlow / WE2.tFast, 2);
check(WE2.tFast === 16 && WE2.tSlow === 800 && WE2.ratio === 50, 'conduction worked example');
export const Q_COND = { d: 1.2, v: 60 };
Q_COND.t = ms(Q_COND.d, Q_COND.v);
Q_COND.s = round(Q_COND.d / Q_COND.v, 3);
check(Q_COND.t === 20 && Q_COND.s === 0.02, 'conduction 20 ms');
export const Q_RATIO = { d: 0.5, fast: 40, slow: 2 };
Q_RATIO.tFast = ms(Q_RATIO.d, Q_RATIO.fast);
Q_RATIO.tSlow = ms(Q_RATIO.d, Q_RATIO.slow);
Q_RATIO.ratio = round(Q_RATIO.tSlow / Q_RATIO.tFast, 2);
check(Q_RATIO.tFast === 12.5 && Q_RATIO.tSlow === 250 && Q_RATIO.ratio === 20, 'ratio 20');
export const CASE_AXON = { d: 0.15, v: 25 };
CASE_AXON.t = ms(CASE_AXON.d, CASE_AXON.v);
check(CASE_AXON.t === 6, 'case axon 6 ms');

// ---------------------------------------------------------------- reflex timing: afferent + synaptic delay(s) + efferent
export const reflexMs = (aff, eff, v, synapses, delay) => round(ms(aff, v) + ms(eff, v) + synapses * delay, 3);
export const KNEE = { aff: 0.9, eff: 0.9, v: 90, synapses: 1, delay: 0.5 };
KNEE.tAff = ms(KNEE.aff, KNEE.v);
KNEE.tEff = ms(KNEE.eff, KNEE.v);
KNEE.total = reflexMs(KNEE.aff, KNEE.eff, KNEE.v, KNEE.synapses, KNEE.delay);
check(KNEE.tAff === 10 && KNEE.total === 20.5, 'knee jerk 20.5 ms');
export const Q_REFLEX = { aff: 1.0, eff: 0.8, v: 60, synapses: 1, delay: 0.5 };
Q_REFLEX.tAff = ms(Q_REFLEX.aff, Q_REFLEX.v);
Q_REFLEX.tEff = ms(Q_REFLEX.eff, Q_REFLEX.v);
Q_REFLEX.cond = round(Q_REFLEX.tAff + Q_REFLEX.tEff, 3);
Q_REFLEX.total = reflexMs(Q_REFLEX.aff, Q_REFLEX.eff, Q_REFLEX.v, Q_REFLEX.synapses, Q_REFLEX.delay);
check(Q_REFLEX.cond === 30 && Q_REFLEX.total === 30.5, 'reflex question 30.5 ms');
export const CASE_KNEE = { aff: 0.6, eff: 0.6, v: 50, synapses: 1, delay: 0.5 };
CASE_KNEE.total = reflexMs(CASE_KNEE.aff, CASE_KNEE.eff, CASE_KNEE.v, CASE_KNEE.synapses, CASE_KNEE.delay);
check(CASE_KNEE.total === 24.5, 'case knee 24.5 ms');

// ---------------------------------------------------------------- action potential trace for the SVG (time in ms, potential in mV)
export const AP_POINTS = [
  [0, REST], [1, REST], [1.2, -55], [1.5, PEAK], [2.2, REST], [3.5, REST],
];
check(Math.max(...AP_POINTS.map((p) => p[1])) === PEAK && Math.min(...AP_POINTS.map((p) => p[1])) === REST, 'trace limits');
