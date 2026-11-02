// ch20 Digestion and Absorption — every number used by decks, SVGs and questions, asserted here.
const check = (cond, msg) => {
  if (!cond) throw new Error('calc: ' + msg);
};
export const round = (x, dp) => Math.round(x * 10 ** dp) / 10 ** dp;
export const pct = (part, whole, dp = 1) => round((part / whole) * 100, dp);

/** Adult human dental formula: teeth in each half of the upper and lower jaw, in the order I, C, PM, M. */
export const HALF_JAW = { I: 2, C: 1, PM: 2, M: 3 };
export const PER_HALF = HALF_JAW.I + HALF_JAW.C + HALF_JAW.PM + HALF_JAW.M;
export const TOTAL_TEETH = PER_HALF * 4;
export const FORMULA = `${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M}`;
check(PER_HALF === 8 && TOTAL_TEETH === 32 && FORMULA === '2123', 'dental formula 2123/2123 gives 32 teeth');
/** Molars in the whole mouth, and the share of all teeth that are molars. */
export const MOLARS = HALF_JAW.M * 4;
export const MOLAR_PCT = pct(MOLARS, TOTAL_TEETH, 1);
check(MOLARS === 12 && MOLAR_PCT === 37.5, '12 molars, 37.5 percent');

/** Physiological fuel values and gross calorific values (kcal per g) as NCERT gives them. */
export const PHYS = { carb: 4, protein: 4, fat: 9 };
export const GROSS = { carb: 4.1, protein: 5.65, fat: 9.45 };
export const KJ_PER_KCAL = 4.184;
/** An illustrative snack: grams of carbohydrate, protein and fat. */
export const MEAL = { carb: 60, protein: 15, fat: 10 };
export const energy = (m, v) => m.carb * v.carb + m.protein * v.protein + m.fat * v.fat;
export const MEAL_PHYS = energy(MEAL, PHYS);
export const MEAL_GROSS = round(energy(MEAL, GROSS), 2);
export const MEAL_KJ = Math.round(MEAL_PHYS * KJ_PER_KCAL);
check(MEAL_PHYS === 390 && MEAL_GROSS === 425.25 && MEAL_KJ === 1632, 'snack energy 390 kcal (physiological), 425.25 kcal (gross), about 1632 kJ');
/** Grams of fat that release as much physiological energy as a given mass of carbohydrate. */
export const FAT_EQUIV = round((MEAL.carb * PHYS.carb) / PHYS.fat, 1);
check(FAT_EQUIV === 26.7, '60 g carbohydrate equals about 26.7 g fat');

/** About 30 percent of starch is hydrolysed in the mouth by salivary amylase. */
export const MOUTH_STARCH_PCT = 30;
export const STARCH = { eaten: 50 };
STARCH.mouth = (STARCH.eaten * MOUTH_STARCH_PCT) / 100;
STARCH.left = STARCH.eaten - STARCH.mouth;
check(STARCH.mouth === 15 && STARCH.left === 35, '15 g in the mouth, 35 g left');

/** Optimum pH values quoted by NCERT. */
export const PH = { saliva: 6.8, stomach: 1.8, intestine: 7.8 };
/** How many times more hydrogen ions per litre at one pH than at another: 10^(difference). */
export const hFold = (lowPH, highPH) => Math.round(10 ** round(highPH - lowPH, 1));
export const FOLD_STOMACH_INTESTINE = hFold(PH.stomach, PH.intestine);
export const FOLD_STOMACH_SALIVA = hFold(PH.stomach, PH.saliva);
check(FOLD_STOMACH_INTESTINE === 1e6 && FOLD_STOMACH_SALIVA === 1e5, 'stomach a million times more acidic than the intestine');

/** Liver mass 1.2 to 1.5 kg in an adult; share of a 60 kg body at the upper value. */
export const LIVER = { min: 1.2, max: 1.5, body: 60 };
LIVER.pct = pct(LIVER.max, LIVER.body, 1);
check(LIVER.pct === 2.5, 'liver 2.5 percent of a 60 kg body');

/** Illustrative surface-area multiplication by circular folds, villi and microvilli (values vary by source). */
export const SURFACE = { folds: 3, villi: 10, microvilli: 20 };
SURFACE.total = SURFACE.folds * SURFACE.villi * SURFACE.microvilli;
check(SURFACE.total === 600, 'about 600 times');

/** Food stays in the stomach for 4 to 5 hours. */
export const STOMACH_HOURS = { min: 4, max: 5 };

/** Illustrative survey for the PEM case. */
export const PEM = { children: 250, kwash: 18, marasmus: 12 };
PEM.total = PEM.kwash + PEM.marasmus;
PEM.pct = pct(PEM.total, PEM.children, 0);
check(PEM.total === 30 && PEM.pct === 12, '30 of 250 children, 12 percent');

/** Dental case: an adult who has had all four third molars (wisdom teeth) removed. */
export const WISDOM_REMOVED = 4;
export const TEETH_LEFT = TOTAL_TEETH - WISDOM_REMOVED;
check(TEETH_LEFT === 28, '28 teeth left');
