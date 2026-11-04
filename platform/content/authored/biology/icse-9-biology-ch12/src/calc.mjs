// Computed values for ICSE 9 Biology ch12 The Skin (imagined data; every derived number is computed here).
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;

// Normal body temperature (degrees Celsius): about 37.
export const NORMAL = 37;
export const FEVER = 39;
export const ABOVE = eq(FEVER - NORMAL, 2, 'degrees above normal');
export const FAHR = eq(round((NORMAL * 9) / 5 + 32, 1), 98.6, 'normal temperature in Fahrenheit');

// Deck example: a patch of palm skin 2 cm by 3 cm with 300 sweat glands on every square centimetre (imagined).
export const PALM = { l: 2, w: 3, density: 300 };
export const PALM_AREA = eq(PALM.l * PALM.w, 6, 'area of palm patch (cm2)');
export const PALM_GLANDS = eq(PALM_AREA * PALM.density, 1800, 'sweat glands on the palm patch');
// Bank: a patch of sole skin 4 cm by 2.5 cm with 250 glands on every square centimetre (imagined).
export const SOLE = { l: 4, w: 2.5, density: 250 };
export const SOLE_AREA = eq(SOLE.l * SOLE.w, 10, 'area of sole patch (cm2)');
export const SOLE_GLANDS = eq(SOLE_AREA * SOLE.density, 2500, 'sweat glands on the sole patch');

// Heat lost by evaporation: about 2.4 kilojoules for each millilitre of sweat that evaporates.
export const KJ_PER_ML = 2.4;
export const RUN_SWEAT = 600; // mL in an hour (imagined)
export const RUN_HEAT = eq(round(RUN_SWEAT * KJ_PER_ML, 0), 1440, 'heat lost by a runner in an hour (kJ)');
// Deck example: sweat in a cool room and a hot room.
export const SWEAT = { cool: 20, hot: 120 };
export const SWEAT_RATIO = eq(SWEAT.hot / SWEAT.cool, 6, 'times more sweat in the hot room');
export const SWEAT_EXTRA = eq(SWEAT.hot - SWEAT.cool, 100, 'extra sweat in the hot room (mL)');
export const SWEAT_EXTRA_HEAT = eq(round(SWEAT_EXTRA * KJ_PER_ML, 0), 240, 'extra heat lost (kJ)');

// Cold exposure (imagined): fingertip skin temperature (degrees Celsius) at 0, 5 and 10 minutes.
export const FINGER = [32, 27, 22];
export const FINGER_FALL = eq(FINGER[0] - FINGER[2], 10, 'fall in fingertip temperature');
export const FINGER_PER_MIN = eq(FINGER_FALL / 10, 1, 'mean fall a minute');
// Hot exposure (imagined): forehead skin temperature before and after 10 minutes of exercise.
export const FORE = [33, 36];
export const FORE_RISE = eq(FORE[1] - FORE[0], 3, 'rise in forehead temperature');
// Hot day (imagined): vessel width in a hot and a cold skin, in micrometres.
export const WIDTH = { hot: 60, cold: 20 };
export const WIDTH_RATIO = eq(WIDTH.hot / WIDTH.cold, 3, 'times wider on the hot day');

// Bank: a cyclist sweats 450 mL in an hour (imagined); a second cold-exposure record: toe temperature at 0, 5 and 10 minutes.
export const CYC_SWEAT = 450;
export const CYC_HEAT = eq(round(CYC_SWEAT * KJ_PER_ML, 0), 1080, 'heat lost by a cyclist in an hour (kJ)');
export const TOE = [31, 25, 19];
export const TOE_FALL = eq(TOE[0] - TOE[2], 12, 'fall in toe temperature');
export const TOE_PER_MIN = eq(round(TOE_FALL / 10, 1), 1.2, 'mean fall a minute');
