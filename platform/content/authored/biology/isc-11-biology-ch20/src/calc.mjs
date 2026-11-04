// ISC 11 Biology ch20 Neural Control and Coordination: every number used in a stem, answer, table, slide or diagram is computed here.
// Nerve counts, conduction times, membrane-potential arithmetic, the sodium-potassium pump, refractory period and nodes of Ranvier.
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
/** Throws unless the computed value matches the expected one: guards every number printed in the chapter. */
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};

// ---------------------------------------------------------------- nerves of the peripheral nervous system
export const CRANIAL_PAIRS = 12;
export const SPINAL = { cervical: 8, thoracic: 12, lumbar: 5, sacral: 5, coccygeal: 1 }; // pairs of spinal nerves
export const SPINAL_PAIRS = Object.values(SPINAL).reduce((a, b) => a + b, 0);
export const NERVE_PAIRS = CRANIAL_PAIRS + SPINAL_PAIRS;
export const NERVES = NERVE_PAIRS * 2;
eq(SPINAL_PAIRS, 31, 'spinal nerve pairs');
eq(NERVE_PAIRS, 43, 'pairs of nerves');
eq(NERVES, 86, 'nerves');

// ---------------------------------------------------------------- conduction (metres, metres per second, milliseconds)
export const V_MYELINATED = 100; // illustrative speed of a thick myelinated fibre
export const V_NONMYELINATED = 1; // illustrative speed of a thin non-myelinated fibre
export const timeMs = (distanceM, speed) => round((distanceM / speed) * 1000, 2);
export const speed = (distanceM, ms) => round(distanceM / (ms / 1000), 2);
export const LEN = 0.6; // length of the axon in the conduction examples
export const T_MYELINATED = timeMs(LEN, V_MYELINATED);
export const T_NONMYELINATED = timeMs(LEN, V_NONMYELINATED);
export const FOLD = T_NONMYELINATED / T_MYELINATED;
eq(T_MYELINATED, 6, 'time in a myelinated fibre');
eq(T_NONMYELINATED, 600, 'time in a non-myelinated fibre');
eq(FOLD, 100, 'how many times faster');
/** Nodes of Ranvier along a myelinated axon of length lenM with one node per internodeMm millimetres. */
export const INTERNODE_MM = 1.2;
export const nodes = (lenM, internodeMm) => Math.round((lenM * 1000) / internodeMm);
export const NODES = nodes(LEN, INTERNODE_MM);
eq(NODES, 500, 'nodes of Ranvier');
/** A withdrawal reflex with a relay neuron: afferent and efferent fibres of lenM each at v, and a synaptic delay at each of two synapses. */
export const REFLEX = { len: 0.9, v: 60, delay: 0.5, synapses: 2 };
export const REFLEX_AFF = timeMs(REFLEX.len, REFLEX.v);
export const REFLEX_TOTAL = round(REFLEX_AFF * 2 + REFLEX.delay * REFLEX.synapses, 2);
eq(REFLEX_AFF, 15, 'conduction time in each reflex fibre');
eq(REFLEX_TOTAL, 31, 'total time of the reflex arc');

// ---------------------------------------------------------------- membrane potentials (millivolts)
export const RESTING = -70;
export const THRESHOLD = -55;
export const PEAK = 30;
export const UNDERSHOOT = -76;
export const AMPLITUDE = PEAK - RESTING;
export const TO_THRESHOLD = THRESHOLD - RESTING;
eq(AMPLITUDE, 100, 'action potential amplitude');
eq(TO_THRESHOLD, 15, 'depolarisation needed to reach threshold');
/** Sodium-potassium pump: 3 Na+ out and 2 K+ in per cycle. */
export const PUMP = { na: 3, k: 2 };
export const pump = (cycles) => ({ na: cycles * PUMP.na, k: cycles * PUMP.k, net: cycles * (PUMP.na - PUMP.k) });
export const CYCLES = 500;
eq(pump(CYCLES), { na: 1500, k: 1000, net: 500 }, 'pump over 500 cycles');
export const kFromNa = (naOut) => (naOut / PUMP.na) * PUMP.k;
eq(kFromNa(2100), 1400, 'potassium taken in for 2100 sodium out');
/** Highest firing rate allowed by an absolute refractory period of refMs milliseconds. */
export const maxRate = (refMs) => Math.round(1000 / refMs);
export const REFRACTORY_MS = 2;
eq(maxRate(REFRACTORY_MS), 500, 'maximum firing rate');

/** Model action potential: key points joined by cosine interpolation (time in ms, potential in mV). */
export const AP_KEYS = [[0, RESTING], [1, RESTING], [1.4, THRESHOLD], [1.8, PEAK], [2.6, -30], [3.2, -68], [3.8, UNDERSHOOT], [5, -72], [6, RESTING]];
export const apAt = (t) => {
  if (t <= AP_KEYS[0][0]) return AP_KEYS[0][1];
  for (let i = 1; i < AP_KEYS.length; i++) {
    const [t1, v1] = AP_KEYS[i];
    const [t0, v0] = AP_KEYS[i - 1];
    if (t <= t1) return v0 + ((v1 - v0) * (1 - Math.cos(((t - t0) / (t1 - t0)) * Math.PI))) / 2;
  }
  return AP_KEYS[AP_KEYS.length - 1][1];
};
export const AP_TRACE = Array.from({ length: 121 }, (_, i) => [i * 0.05, apAt(i * 0.05)]);
eq(round(Math.max(...AP_TRACE.map((p) => p[1])), 1), PEAK, 'peak of the model action potential');
eq(round(Math.min(...AP_TRACE.map((p) => p[1])), 1), UNDERSHOOT, 'undershoot of the model action potential');

// ---------------------------------------------------------------- the nerve-conduction experiment (case)
export const FIBRES = [
  { name: 'X', distance: 0.12, ms: 1.2 },
  { name: 'Y', distance: 0.12, ms: 60 },
  { name: 'Z', distance: 0.12, ms: 6 },
];
export const FIBRE_V = FIBRES.map((f) => speed(f.distance, f.ms));
eq(FIBRE_V, [100, 2, 20], 'fibre speeds in the conduction experiment');

// ---------------------------------------------------------------- numbers used only in the question bank
export const TOUCH = { len: 1.5, ms: timeMs(1.5, V_MYELINATED) };
eq(TOUCH.ms, 15, 'touch impulse time');
export const PAIN = { len: 0.3, ms: timeMs(0.3, V_NONMYELINATED) };
eq(PAIN.ms, 300, 'pain impulse time');
export const NODES_Q = { len: 0.45, mm: 1.5, n: nodes(0.45, 1.5) };
eq(NODES_Q.n, 300, 'nodes in the question axon');
export const SPINAL_UPPER = SPINAL.cervical + SPINAL.thoracic + SPINAL.lumbar;
eq(SPINAL_UPPER, 25, 'cervical, thoracic and lumbar pairs');
export const THR_TO_PEAK = PEAK - THRESHOLD;
eq(THR_TO_PEAK, 85, 'threshold to peak');
export const REF_Q = 4;
eq(maxRate(REF_Q), 250, 'firing rate for a 4 ms refractory period');
