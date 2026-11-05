// Computed values for ICSE 9 Biology ch09 Nutrition: Food and Balanced Diet. Every number in a stem, answer, table or slide comes from here.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const pct = (part, whole, dp = 0) => Math.round((part / whole) * 100 * 10 ** dp) / 10 ** dp;

// Energy released per gram of food (approximate textbook values, kilojoules): carbohydrate 17, protein 17, fat 37.
export const KJ = { carbohydrate: 17, protein: 17, fat: 37 };
eq(KJ.fat > KJ.carbohydrate && KJ.carbohydrate === KJ.protein, true, 'fat gives the most energy per gram');
KJ.fatRatio = eq(Math.round((KJ.fat / KJ.carbohydrate) * 100) / 100, 2.18, 'fat to carbohydrate energy ratio');
export const energy = (m) => ({ carbohydrate: m.carbohydrate * KJ.carbohydrate, protein: m.protein * KJ.protein, fat: m.fat * KJ.fat });
const total = (e) => e.carbohydrate + e.protein + e.fat;

// Worked example (deck 1): a breakfast of 60 g carbohydrate, 15 g protein and 10 g fat.
export const BREAKFAST = { carbohydrate: 60, protein: 15, fat: 10 };
BREAKFAST.kj = energy(BREAKFAST);
eq(BREAKFAST.kj, { carbohydrate: 1020, protein: 255, fat: 370 }, 'breakfast energy by class');
BREAKFAST.total = eq(total(BREAKFAST.kj), 1645, 'breakfast energy');
BREAKFAST.pctFat = eq(pct(BREAKFAST.kj.fat, BREAKFAST.total, 1), 22.5, 'percentage of breakfast energy from fat');
BREAKFAST.grams = eq(BREAKFAST.carbohydrate + BREAKFAST.protein + BREAKFAST.fat, 85, 'grams of food in breakfast');

// Bank: a lunch of 90 g carbohydrate, 25 g protein and 20 g fat.
export const LUNCH = { carbohydrate: 90, protein: 25, fat: 20 };
LUNCH.kj = energy(LUNCH);
eq(LUNCH.kj, { carbohydrate: 1530, protein: 425, fat: 740 }, 'lunch energy by class');
LUNCH.total = eq(total(LUNCH.kj), 2695, 'lunch energy');
// Bank: a glucose drink of 30 g carbohydrate.
export const DRINK = { grams: 30 };
DRINK.kj = eq(DRINK.grams * KJ.carbohydrate, 510, 'energy of the glucose drink');
// Bank: 20 g of fat compared with 20 g of carbohydrate.
export const FATCARB = { grams: 20 };
FATCARB.fat = eq(FATCARB.grams * KJ.fat, 740, 'energy of 20 g of fat');
FATCARB.carb = eq(FATCARB.grams * KJ.carbohydrate, 340, 'energy of 20 g of carbohydrate');
FATCARB.diff = eq(FATCARB.fat - FATCARB.carb, 400, 'extra energy from fat');

// Body water: about 70 percent of the body mass (approximate); a 50 kg student.
export const WATER = { mass: 50, percent: 70 };
WATER.kg = eq((WATER.mass * WATER.percent) / 100, 35, 'kilograms of water in a 50 kg student');
WATER.other = eq(WATER.mass - WATER.kg, 15, 'kilograms that are not water');

// Calcium: a growing child needs about 1000 mg a day; a glass of milk gives about 250 mg (illustrative values).
export const CALCIUM = { need: 1000, perGlass: 250 };
CALCIUM.glasses = eq(CALCIUM.need / CALCIUM.perGlass, 4, 'glasses of milk for the daily calcium');
CALCIUM.after3 = eq(CALCIUM.need - 3 * CALCIUM.perGlass, 250, 'calcium still needed after three glasses');

// Clinic survey (deck 1 example and a structured question): 60 patients with a vitamin deficiency.
export const CLINIC = { A: 12, B1: 9, C: 15, D: 18, K: 6 };
CLINIC.total = eq(Object.values(CLINIC).reduce((a, b) => a + b, 0), 60, 'clinic patients');
CLINIC.pctD = eq(pct(CLINIC.D, CLINIC.total), 30, 'percentage with vitamin D deficiency');
CLINIC.water = eq(CLINIC.B1 + CLINIC.C, 24, 'patients lacking a water-soluble vitamin');
CLINIC.fat = eq(CLINIC.A + CLINIC.D + CLINIC.K, 36, 'patients lacking a fat-soluble vitamin');
eq(CLINIC.water + CLINIC.fat, CLINIC.total, 'water plus fat soluble');
CLINIC.pctWater = eq(pct(CLINIC.water, CLINIC.total), 40, 'percentage lacking a water-soluble vitamin');

// Fibre: 300 g of vegetables with 3 g of fibre in every 100 g, against a target of 30 g a day (illustrative values).
export const FIBRE = { veg: 300, per100: 3, target: 30 };
FIBRE.got = eq((FIBRE.veg / 100) * FIBRE.per100, 9, 'grams of fibre from the vegetables');
FIBRE.short = eq(FIBRE.target - FIBRE.got, 21, 'grams of fibre still needed');
FIBRE.pct = eq(pct(FIBRE.got, FIBRE.target), 30, 'percentage of the fibre target');

// Malnutrition ward (deck 2 example and a structured question): 40 children.
export const WARD = { children: 40, kwashiorkor: 16, marasmus: 10 };
WARD.mild = eq(WARD.children - WARD.kwashiorkor - WARD.marasmus, 14, 'children with mild malnutrition');
WARD.severe = eq(WARD.kwashiorkor + WARD.marasmus, 26, 'children with kwashiorkor or marasmus');
WARD.pctK = eq(pct(WARD.kwashiorkor, WARD.children), 40, 'percentage with kwashiorkor');
WARD.pctSevere = eq(pct(WARD.severe, WARD.children), 65, 'percentage severe');

// Plate model for a balanced diet (shares of the plate, illustrative): cereals 40, pulses/egg/fish 20, vegetables/fruit 25, milk 10, oil 5.
export const PLATE = { cereals: 40, protein: 20, vegfruit: 25, milk: 10, oil: 5 };
PLATE.total = eq(Object.values(PLATE).reduce((a, b) => a + b, 0), 100, 'plate shares');
PLATE.energyFoods = eq(PLATE.cereals + PLATE.oil, 45, 'plate share of energy-rich foods');

// Bank: weaning fund, a village crèche: 25 infants, 15 breast-fed, rest fed on diluted rice water.
export const CRECHE = { infants: 25, breastfed: 15 };
CRECHE.other = eq(CRECHE.infants - CRECHE.breastfed, 10, 'infants not breast-fed');
CRECHE.pctBreast = eq(pct(CRECHE.breastfed, CRECHE.infants), 60, 'percentage breast-fed');
