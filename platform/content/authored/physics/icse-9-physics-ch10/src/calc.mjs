// Computed values for ICSE 9 Physics ch10 Sound and Wave Motion.
// Speed of sound in air is taken as 340 m s^-1 (room temperature) and the speed of light as 3 x 10^8 m s^-1; every stem states the values it uses.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 2) => Math.round(n * 10 ** dp + 1e-9) / 10 ** dp;

export const V_AIR = 340;
export const V_WATER = 1500;
export const V_IRON = 5100;
export const C_LIGHT = 3e8;

// ---------------------------------------------------------------- v = f x lambda, T = 1 / f
export const SLINKY = { spacings: 5, span: 1.5, f: 8 };
export const SLINKY_L = eq(round(SLINKY.span / SLINKY.spacings, 2), 0.3, 'slinky wavelength (m)');
export const SLINKY_V = eq(round(SLINKY.f * SLINKY_L, 2), 2.4, 'slinky wave speed (m/s)');
export const ROPE = { f: 4, l: 0.75 };
export const ROPE_V = eq(ROPE.f * ROPE.l, 3, 'rope wave speed (m/s)');
export const NOTE = { f: 850 };
export const NOTE_L = eq(round(V_AIR / NOTE.f, 3), 0.4, 'wavelength of the 850 Hz note in air (m)');
export const LIMIT = { lo: 20, hi: 20000 };
export const LIMIT_LO = eq(V_AIR / LIMIT.lo, 17, 'wavelength at 20 Hz (m)');
export const LIMIT_HI = eq(round(V_AIR / LIMIT.hi, 3), 0.017, 'wavelength at 20 kHz (m)');
export const BOAT = { f: 500 };
export const BOAT_AIR = eq(round(V_AIR / BOAT.f, 2), 0.68, 'wavelength in air at 500 Hz (m)');
export const BOAT_WATER = eq(V_WATER / BOAT.f, 3, 'wavelength in water at 500 Hz (m)');
export const BOAT_RATIO = eq(round(BOAT_WATER / BOAT_AIR, 1), 4.4, 'water wavelength over air wavelength');
export const BEE = { beats: 12000, t: 60 };
export const BEE_F = eq(BEE.beats / BEE.t, 200, 'bee wing frequency (Hz)');
export const BEE_T = eq(1 / BEE_F, 0.005, 'bee wing period (s)');
export const FORK = { f: 250 };
export const FORK_T = eq(1 / FORK.f, 0.004, 'tuning fork period (s)');
export const CHK_V = { f: 12, l: 0.5 };
export const CHK_V_V = eq(CHK_V.f * CHK_V.l, 6, 'check-slide wave speed (m/s)');
export const SIREN = { l: 0.85, v: V_AIR };
export const SIREN_F = eq(round(SIREN.v / SIREN.l, 3), 400, 'siren frequency (Hz)');
export const RADIO_WAVE = { l: 2.5, f: 136 };
export const FLUTE = { v: V_AIR, l: 0.34 };
export const FLUTE_F = eq(round(FLUTE.v / FLUTE.l, 3), 1000, 'flute note frequency (Hz)');
export const FLUTE_T = eq(1 / FLUTE_F, 0.001, 'flute note period (s)');

// the wave graph for the structured question: amplitude 3 cm, wavelength 0.8 m, frequency 5 Hz
export const WG = { amp: 3, lambda: 0.8, f: 5 };
export const WG_V = eq(WG.f * WG.lambda, 4, 'graph wave speed (m/s)');
export const WG_T = eq(1 / WG.f, 0.2, 'graph wave period (s)');
export const WG_HALF = eq(WG.lambda / 2, 0.4, 'crest to next trough along the axis (m)');
export const WG_PEAK_TO_PEAK = eq(2 * WG.amp, 6, 'crest to trough vertical gap (cm)');

// ---------------------------------------------------------------- speed of sound in different media and with temperature
export const RAIL = { len: 1020 };
export const RAIL_AIR_T = eq(RAIL.len / V_AIR, 3, 'time through air (s)');
export const RAIL_IRON_T = eq(RAIL.len / V_IRON, 0.2, 'time through iron (s)');
export const RAIL_GAP = eq(round(RAIL_AIR_T - RAIL_IRON_T, 1), 2.8, 'gap between the two sounds (s)');
export const WATER5 = { t: 5 };
export const WATER5_D = eq(V_WATER * WATER5.t, 7500, 'distance in water in 5 s (m)');
export const AIR5_D = eq(V_AIR * WATER5.t, 1700, 'distance in air in 5 s (m)');
export const TEMP = { v0: 332, per: 0.6, t: 30 };
export const TEMP_V = eq(round(TEMP.v0 + TEMP.per * TEMP.t, 1), 350, 'speed of sound at 30 C (m/s)');
export const WIRE = { len: 2550, v: 5100 };
export const WIRE_T = eq(WIRE.len / WIRE.v, 0.5, 'time along the iron wire (s)');
export const WIRE_AIR = eq(WIRE.len / V_AIR, 7.5, 'time along the same distance in air (s)');
export const DIVER = { d: 3000 };
export const DIVER_T = eq(DIVER.d / V_WATER, 2, 'time in water over 3000 m (s)');
export const DIVER_AIR_T = eq(round(DIVER.d / V_AIR, 2), 8.82, 'time in air over 3000 m (s)');

// ---------------------------------------------------------------- thunder and lightning
export const THUNDER = { gap: 4.5 };
export const THUNDER_D = eq(V_AIR * THUNDER.gap, 1530, 'distance of the lightning (m)');
export const THUNDER_LIGHT_T = eq(round(THUNDER_D / C_LIGHT, 8), 0.0000051, 'light travel time over 1530 m (s)');
export const THUNDER_LIGHT_US = eq(round(THUNDER_LIGHT_T * 1e6, 1), 5.1, 'light travel time in microseconds');
export const CHK_THUNDER = { gap: 3 };
export const CHK_THUNDER_D = eq(V_AIR * CHK_THUNDER.gap, 1020, 'check-slide thunder distance (m)');
export const FAR = { d: 1700 };
export const FAR_T = eq(FAR.d / V_AIR, 5, 'time for thunder over 1.7 km (s)');
export const STORM = { g1: 6, g2: 10 };
export const STORM_D1 = eq(V_AIR * STORM.g1, 2040, 'first strike distance (m)');
export const STORM_D2 = eq(V_AIR * STORM.g2, 3400, 'second strike distance (m)');
export const STORM_DIFF = eq(STORM_D2 - STORM_D1, 1360, 'extra distance (m)');
export const CRICKET = { d: 170 };
export const CRICKET_T = eq(CRICKET.d / V_AIR, 0.5, 'delay of the bat sound in the stand (s)');
export const LIGHT_FAR = { d: 5100 };
export const LIGHT_FAR_T = eq(round(LIGHT_FAR.d / C_LIGHT, 8), 0.000017, 'light travel time over 5.1 km (s)');
export const SOUND_FAR_T = eq(LIGHT_FAR.d / V_AIR, 15, 'sound travel time over 5.1 km (s)');
export const FLASH = { gap: 8, d: V_AIR * 8 };
export const FLASH_D = eq(FLASH.d, 2720, 'flash distance, 8 s gap (m)');
export const FLASH_KM = eq(round(FLASH_D / 1000, 2), 2.72, 'flash distance in km');
export const RATIO = eq(C_LIGHT / V_AIR > 8.8e5 && C_LIGHT / V_AIR < 8.9e5, true, 'light is about 880 thousand times faster');
export const RATIO_V = Math.round(C_LIGHT / V_AIR);

// ---------------------------------------------------------------- classification of frequencies
export const classify = (f) => (f < 20 ? 'infrasonic' : f <= 20000 ? 'audible' : 'ultrasonic');
export const SOURCES = [
  ['Elephant rumble', 14, 'infrasonic'],
  ['Male speaking voice', 120, 'audible'],
  ['Dog whistle', 25000, 'ultrasonic'],
  ['Mosquito buzz', 600, 'audible'],
  ['Bat squeak', 60000, 'ultrasonic'],
  ['Earthquake tremor', 5, 'infrasonic'],
];
for (const [n, f, c] of SOURCES) eq(classify(f), c, `classification of ${n}`);
export const STORM_LIGHT_T = eq(round(STORM_D1 / C_LIGHT, 9), 0.0000068, 'light travel time over 2040 m (s)');
export const STORM_LIGHT_US = eq(round(STORM_LIGHT_T * 1e6, 1), 6.8, 'light travel time over 2040 m (microseconds)');
export const GUITAR_L = eq(round(V_AIR / 330, 2), 1.03, 'wavelength of a 330 Hz note in air (m)');
