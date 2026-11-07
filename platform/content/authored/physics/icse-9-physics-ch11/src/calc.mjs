// Computed values for ICSE 9 Physics ch11 Current Electricity.
// Charge of an electron e = 1.6 x 10^-19 C (stated in every stem that uses it). Ohm's law numericals use a metallic conductor at constant temperature.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 2) => Math.round(n * 10 ** dp + 1e-9) / 10 ** dp;
/** n to s significant figures as a number (removes floating-point dust). */
export const sf = (n, s = 6) => Number(n.toPrecision(s));
export const E = 1.6e-19;

// ---------------------------------------------------------------- charge, current and the electron
export const COIL = { q: 540, min: 3 };
export const COIL_T = eq(COIL.min * 60, 180, 'seconds in 3 min');
export const COIL_I = eq(COIL.q / COIL_T, 3, 'current from 540 C in 3 min (A)');
export const FAN = { i: 0.75, min: 40 };
export const FAN_T = eq(FAN.min * 60, 2400, 'seconds in 40 min');
export const FAN_Q = eq(FAN.i * FAN_T, 1800, 'charge from 0.75 A for 40 min (C)');
export const SPARK = { q: 3.2e-6 };
export const SPARK_N = eq(sf(SPARK.q / E, 6), 2e13, 'electrons in 3.2e-6 C');
export const BODY = { n: 5e12 };
export const BODY_Q = eq(sf(BODY.n * E, 6), 8e-7, 'charge of 5e12 electrons (C)');
export const BODY_Q_UNITS = eq(sf(BODY_Q / 1e-7, 6), 8, 'charge in units of 1e-7 C');
export const RATE = { i: 0.8 };
export const RATE_N = eq(sf(RATE.i / E, 6), 5e18, 'electrons per second at 0.8 A');
export const BUZZ = { q: 90, i: 1.5 };
export const BUZZ_T = eq(BUZZ.q / BUZZ.i, 60, 'time for 90 C at 1.5 A (s)');
export const LAMP = { i: 0.2, min: 5 };
export const LAMP_Q = eq(sf(LAMP.i * LAMP.min * 60, 6), 60, 'charge for 0.2 A in 5 min (C)');
export const CHK_I = { q: 24, t: 8 };
export const CHK_I_I = eq(CHK_I.q / CHK_I.t, 3, 'check-slide current (A)');
export const WIRE = { q: 360, min: 2 };
export const WIRE_I = eq(WIRE.q / (WIRE.min * 60), 3, 'wire current (A)');
export const WIRE_N = eq(sf(WIRE.q / E, 6), 2.25e21, 'electrons through the wire');
export const WIRE_N_UNITS = eq(sf(WIRE_N / 1e21, 6), 2.25, 'electrons in units of 1e21');
export const GAIN = { n: 3e12 };
export const GAIN_Q = eq(sf(GAIN.n * E, 6), 4.8e-7, 'charge of 3e12 electrons (C)');
export const CELL_I = { q: 36, t: 12 };
export const ELECTRONS_PER_COULOMB = eq(sf(1 / E, 4), 6.25e18, 'electrons in one coulomb');

// ---------------------------------------------------------------- potential difference and work
export const MOVE = { v: 9, q: 40 };
export const MOVE_W = eq(MOVE.v * MOVE.q, 360, 'work moving 40 C through 9 V (J)');
export const PD = { w: 150, q: 25 };
export const PD_V = eq(PD.w / PD.q, 6, 'p.d. from 150 J for 25 C (V)');
export const CHK_W = { v: 6, q: 5 };
export const CHK_W_W = eq(CHK_W.v * CHK_W.q, 30, 'check-slide work (J)');
export const BULB9 = { v: 9, i: 0.6, min: 2 };
export const BULB9_Q = eq(sf(BULB9.i * BULB9.min * 60, 6), 72, 'charge through the 9 V bulb in 2 min (C)');
export const BULB9_W = eq(sf(BULB9.v * BULB9_Q, 6), 648, 'work done by the 9 V battery (J)');
export const BULB9_R = eq(sf(BULB9.v / BULB9.i, 6), 15, 'resistance of the 9 V bulb (ohm)');

// ---------------------------------------------------------------- Ohm's law
export const OHM = { v: 7.2, i: 0.4 };
export const OHM_R = eq(sf(OHM.v / OHM.i, 6), 18, 'resistance from 7.2 V and 0.4 A (ohm)');
export const COILV = { r: 25, i: 0.36 };
export const COILV_V = eq(sf(COILV.r * COILV.i, 6), 9, 'p.d. across 25 ohm at 0.36 A (V)');
export const MAINS = { v: 230, r: 460 };
export const MAINS_I = eq(MAINS.v / MAINS.r, 0.5, 'current in the 460 ohm bulb (A)');
export const CHK_R = { v: 12, i: 0.5 };
export const CHK_R_R = eq(CHK_R.v / CHK_R.i, 24, 'check-slide resistance (ohm)');
export const CHK_OHM = { r: 20, i: 0.3 };
export const CHK_OHM_V = eq(sf(CHK_OHM.r * CHK_OHM.i, 6), 6, 'check-slide p.d. (V)');
export const HEATER = { r: 40, v: 240, min: 1 };
export const HEATER_I = eq(HEATER.v / HEATER.r, 6, 'heater current (A)');
export const HEATER_Q = eq(HEATER_I * HEATER.min * 60, 360, 'heater charge in 1 min (C)');
export const TORCH = { i: 0.3, min: 20, v: 4.5 };
export const TORCH_Q = eq(sf(TORCH.i * TORCH.min * 60, 6), 360, 'torch charge in 20 min (C)');
export const TORCH_R = eq(sf(TORCH.v / TORCH.i, 6), 15, 'torch bulb resistance (ohm)');

// experiment readings for the structured question: a coil of resistance 12 ohm (constant temperature)
export const READ = { r: 12, i: [0.1, 0.2, 0.3, 0.4, 0.5] };
export const READ_V = READ.i.map((i) => sf(i * READ.r, 6));
eq(READ_V, [1.2, 2.4, 3.6, 4.8, 6], 'experiment voltages (V)');
export const READ_RATIOS = READ.i.map((i, k) => sf(READ_V[k] / i, 6));
eq(READ_RATIOS, [12, 12, 12, 12, 12], 'V over I for every reading');
export const READ_AT08 = eq(sf(0.8 * READ.r, 6), 9.6, 'p.d. for 0.8 A (V)');
export const READ_I_AT = eq(sf(7.2 / READ.r, 6), 0.6, 'current at 7.2 V (A)');

// ---------------------------------------------------------------- structured-question data
export const CIRC = { i: 0.5, min: 2 };
export const CIRC_Q = eq(sf(CIRC.i * CIRC.min * 60, 6), 60, 'charge through the ammeter in 2 min (C)');
export const CH = { q: 480, min: 4 };
export const CH_I = eq(CH.q / (CH.min * 60), 2, 'wire current (A)');
export const CH_N = eq(sf(CH.q / E, 6), 3e21, 'electrons in 480 C');
export const CH_N_UNITS = eq(sf(CH_N / 1e21, 6), 3, 'electrons in units of 1e21');
export const WQ = { v: 12, q: 3 };
export const WQ_W = eq(WQ.v * WQ.q, 36, 'work for 3 C through 12 V (J)');
export const AMP2 = { i: 2 };
export const QCHECKS = [4.8e-19, 2.4e-19, 1.0e-19, 3.0e-19].map((q) => Number.isInteger(sf(q / E, 6)));
eq(QCHECKS, [true, false, false, false], 'only 4.8e-19 C is a whole number of electron charges');
export const HALF_E = eq(sf(2.5e-19 / E, 6) % 1 !== 0, true, '2.5e-19 C is not a whole number of electron charges');
export const GAIN_Q_UNITS = eq(sf(GAIN_Q / 1e-7, 6), 4.8, 'charge of 3e12 electrons in units of 1e-7 C');

// ---------------------------------------------------------------- extra application items
export const QT = { i: 0.4, t: 30 };
export const QT_Q = eq(sf(QT.i * QT.t, 6), 12, 'charge for 0.4 A in 30 s (C)');
export const EL = { q: -3.2e-18 };
export const EL_N = eq(Math.round(Math.abs(EL.q) / E), 20, 'electrons gained for -3.2e-18 C');
export const GR = { v: 10, i: 2 };
export const GR_R = eq(GR.v / GR.i, 5, 'resistance from a graph point (2 A, 10 V) (ohm)');
export const RB = { v: 6, i: 0.4 };
export const RB_R = eq(sf(RB.v / RB.i, 6), 15, 'bulb resistance (ohm)');
export const VW = { q: 15, v: 4 };
export const VW_W = eq(VW.q * VW.v, 60, 'work for 15 C through 4 V (J)');
export const SR = { v: 12, r: 6, t: 10 };
export const SR_I = eq(SR.v / SR.r, 2, 'current through 6 ohm at 12 V (A)');
export const SR_Q = eq(SR_I * SR.t, 20, 'charge in 10 s (C)');
export const S3G = { v: 10, i: 2, i2: 0.5, v2: 15 };
export const S3G_R = eq(S3G.v / S3G.i, 5, 'resistor (ohm)');
export const S3G_V2 = eq(S3G.i2 * S3G_R, 2.5, 'p.d. at 0.5 A (V)');
export const S3G_I3 = eq(S3G.v2 / S3G_R, 3, 'current at 15 V (A)');
