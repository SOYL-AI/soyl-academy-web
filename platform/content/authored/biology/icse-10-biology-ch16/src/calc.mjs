// Computed values for ICSE 10 Biology ch16 Pollution (imagined surveys and readings; textbook constants noted).
const r1 = (x) => Math.round(x * 10) / 10;
export const pct = (part, whole) => r1((part / whole) * 100);

/** Imagined DDT levels (parts per million) along a lake food chain. */
export const DDT = [
  { level: 'Lake water', ppm: 0.00002 },
  { level: 'Plankton', ppm: 0.04 },
  { level: 'Small fish', ppm: 0.5 },
  { level: 'Large fish', ppm: 2 },
  { level: 'Fish-eating bird', ppm: 20 },
];
export const factor = (a, b) => Math.round(DDT[b].ppm / DDT[a].ppm);
export const DDT_BIRD_WATER = factor(0, 4);
export const DDT_BIRD_SMALLFISH = factor(2, 4);
export const DDT_LARGE_SMALL = factor(2, 3);

/** Imagined school canteen waste (kg per day). */
export const CANTEEN = { food: 12, paper: 6, plastic: 3, glass: 1, cans: 2 };
CANTEEN.total = Object.values(CANTEEN).reduce((a, b) => a + b, 0);
CANTEEN.bio = CANTEEN.food + CANTEEN.paper;
CANTEEN.nonbio = CANTEEN.total - CANTEEN.bio;
CANTEEN.pctBio = pct(CANTEEN.bio, CANTEEN.total);

/** Imagined sound readings in decibels; long exposure above about 80 dB is taken as harmful. */
export const NOISE_LIMIT = 80;
export const NOISE = [
  { place: 'Library', db: 35 },
  { place: 'Classroom', db: 55 },
  { place: 'Busy road', db: 85 },
  { place: 'Wedding band', db: 100 },
  { place: 'Firecracker nearby', db: 125 },
];
export const NOISY = NOISE.filter((n) => n.db > NOISE_LIMIT);

/** Approximate dissolved oxygen in fresh water at saturation (mg per litre), used for thermal pollution. */
export const DO = { cool: { t: 20, mg: 9.1 }, warm: { t: 30, mg: 7.6 } };
DO.fall = r1(DO.cool.mg - DO.warm.mg);
DO.pctFall = pct(DO.fall, DO.cool.mg);

/** pH: each unit lower is ten times more acidic. Normal rain about 5.6. */
export const timesMoreAcid = (phA, phB) => Math.round(10 ** r1(phA - phB));
export const RAIN = { normal: 5.6, acid: 4.6 };
RAIN.times = timesMoreAcid(RAIN.normal, RAIN.acid);

/** Imagined fuel saved by switching off the engine at red lights. */
export const IDLE = { signals: 8, minutesEach: 1.5, mlPerMinute: 10 };
IDLE.saved = IDLE.signals * IDLE.minutesEach * IDLE.mlPerMinute;

if (DDT_BIRD_WATER !== 1000000 || DDT_BIRD_SMALLFISH !== 40 || DDT_LARGE_SMALL !== 4 || CANTEEN.total !== 24 || CANTEEN.pctBio !== 75 || NOISY.length !== 3 || DO.fall !== 1.5 || DO.pctFall !== 16.5 || RAIN.times !== 10 || IDLE.saved !== 120) throw new Error('calc');
