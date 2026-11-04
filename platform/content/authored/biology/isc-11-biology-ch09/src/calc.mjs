// ISC 11 Biology ch09 Structural Organisation in Animals: Frog — tables and every count used in the chapter, asserted with eq.
export function eq(value, expected, what) {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
}

/** Path of food through the alimentary canal. */
export const FOOD_PATH = ['mouth', 'buccal cavity', 'pharynx', 'oesophagus', 'stomach', 'duodenum', 'ileum', 'rectum', 'cloaca'];
export const N_PARTS = eq(FOOD_PATH.length, 9, 'parts of the canal listed');
export const after = (part) => FOOD_PATH[FOOD_PATH.indexOf(part) + 1];
eq(after('oesophagus'), 'stomach', 'after the oesophagus');
eq(after('stomach'), 'duodenum', 'after the stomach');
eq(after('rectum'), 'cloaca', 'after the rectum');
export const PARTS_AFTER_STOMACH = eq(FOOD_PATH.length - 1 - FOOD_PATH.indexOf('stomach'), 4, 'parts the food passes after the stomach');

/** Digestive glands: gland -> secretion. */
export const GLAND = { liver: 'bile', pancreas: 'pancreatic juice', 'gall bladder': 'stores bile (secretes nothing)' };
eq(GLAND.liver, 'bile', 'liver secretion');

/** Heart: chambers and the route of the blood. */
export const HEART = { atria: 2, ventricles: 1 };
export const CHAMBERS = eq(HEART.atria + HEART.ventricles, 3, 'chambers of the frog heart');
export const CHAMBERS_HUMAN = eq(2 + 2, 4, 'chambers of the human heart, for comparison');
export const BEAT = { rate: 45, strokeMl: 0.06 };
export const OUTPUT_MIN = eq(Math.round(BEAT.rate * BEAT.strokeMl * 100) / 100, 2.7, 'millilitres pumped by the ventricle in a minute');
export const OUTPUT_HOUR = eq(Math.round(OUTPUT_MIN * 60 * 10) / 10, 162, 'millilitres pumped in an hour');
export const BEAT2 = { rate: 30, strokeMl: 0.05 };
export const OUTPUT2_MIN = eq(Math.round(BEAT2.rate * BEAT2.strokeMl * 100) / 100, 1.5, 'second frog: millilitres a minute');

/** Gas exchange: share of the oxygen taken up through each surface of a resting frog on land (imagined data), millilitres an hour. */
export const O2 = { total: 2.0, skinPct: 45, lungPct: 50, buccalPct: 5 };
eq(O2.skinPct + O2.lungPct + O2.buccalPct, 100, 'oxygen shares add up to the whole');
export const O2_SKIN = eq((O2.total * O2.skinPct) / 100, 0.9, 'oxygen through the skin (ml an hour)');
export const O2_LUNG = eq((O2.total * O2.lungPct) / 100, 1, 'oxygen through the lungs (ml an hour)');
export const O2_BUCCAL = eq(Math.round(((O2.total * O2.buccalPct) / 100) * 100) / 100, 0.1, 'oxygen through the buccal cavity (ml an hour)');
export const O2_WATER = eq(O2.total, 2.0, 'oxygen taken up in an hour, nearly all through the skin when under water');

/** A pond census (imagined): males to females in the ratio 3 : 2. */
export const POND = { frogs: 120, maleParts: 3, femaleParts: 2 };
export const MALES = eq((POND.frogs / (POND.maleParts + POND.femaleParts)) * POND.maleParts, 72, 'male frogs in the pond');
export const FEMALES = eq(POND.frogs - MALES, 48, 'female frogs in the pond');
export const VOCAL_SACS = eq(MALES * 2, 144, 'vocal sacs in the pond (two to a male)');
export const PADS = eq(MALES * 2, 144, 'copulatory pads in the pond (one on each forelimb of a male)');
export const FEMALE_PADS = eq(FEMALES * 0, 0, 'copulatory pads on the females');

/** Feeding and gut length (imagined data). */
export const FEED = { perDay: 6, days: 30 };
export const INSECTS = eq(FEED.perDay * FEED.days, 180, 'insects eaten in thirty days');
export const GUT = { frogBody: 7, frogGut: 8.4, tadBody: 3, tadGut: 30 };
export const GUT_RATIO_FROG = eq(Math.round((GUT.frogGut / GUT.frogBody) * 10) / 10, 1.2, 'gut length as a multiple of body length in the frog');
export const GUT_RATIO_TAD = eq(GUT.tadGut / GUT.tadBody, 10, 'gut length as a multiple of body length in the tadpole');
export const GUT_TIMES = eq(Math.round((GUT_RATIO_TAD / GUT_RATIO_FROG) * 10) / 10, 8.3, 'how many times longer the tadpole gut is in relation to the body');

/** Dissection sheet (imagined): 24 frogs, 15 male and 9 female. Each male has 2 testes and 2 urinogenital ducts; each female 2 ovaries, 2 oviducts and 2 ureters. */
export const SHEET = { males: 15, females: 9 };
export const SHEET_TOTAL = eq(SHEET.males + SHEET.females, 24, 'frogs on the dissection sheet');
export const GONADS = eq(SHEET_TOTAL * 2, 48, 'gonads (testes and ovaries) on the sheet');
export const MALE_DUCTS = eq(SHEET.males * 2, 30, 'ducts opening into the cloaca from the males');
export const FEMALE_DUCTS = eq(SHEET.females * 4, 36, 'ducts opening into the cloaca from the females (2 ureters and 2 oviducts each)');
export const DUCTS = eq(MALE_DUCTS + FEMALE_DUCTS, 66, 'ducts opening into cloacae on the sheet');

/** Nerve conduction (imagined): a nerve 0.15 m long conducting at 30 m/s. */
export const NERVE = { lengthM: 0.15, speed: 30 };
export const NERVE_MS = eq(Math.round((NERVE.lengthM / NERVE.speed) * 1000 * 10) / 10, 5, 'milliseconds taken by an impulse to cross the nerve');
export const NERVE2 = { lengthM: 0.24, speed: 20 };
export const NERVE2_MS = eq(Math.round((NERVE2.lengthM / NERVE2.speed) * 1000 * 10) / 10, 12, 'milliseconds for the second nerve');

// Extra numbers for the question bank
export const POND2 = { frogs: 150, maleParts: 2, femaleParts: 3 };
export const MALES2 = eq((POND2.frogs / (POND2.maleParts + POND2.femaleParts)) * POND2.maleParts, 60, 'male frogs in the second pond');
export const VOCAL_SACS2 = eq(MALES2 * 2, 120, 'vocal sacs in the second pond');
export const PADS2 = eq(36 * 2, 72, 'copulatory pads on 36 male frogs');
export const FEED2 = { perDay: 8, days: 25 };
export const INSECTS2 = eq(FEED2.perDay * FEED2.days, 200, 'insects eaten in twenty-five days');
export const GUT2 = { body: 8, gut: 9.6 };
export const GUT2_RATIO = eq(Math.round((GUT2.gut / GUT2.body) * 10) / 10, 1.2, 'gut length as a multiple of body length (second frog)');
export const O2B = { total: 4, skinPct: 40 };
export const O2B_SKIN = eq((O2B.total * O2B.skinPct) / 100, 1.6, 'oxygen through the skin (ml an hour), second frog');
export const O2B_REST = eq(Math.round((O2B.total - O2B_SKIN) * 10) / 10, 2.4, 'oxygen through the other surfaces (ml an hour)');
export const SHEET2 = { males: 10, females: 8 };
export const SHEET2_DUCTS = eq(SHEET2.males * 2 + SHEET2.females * 4, 52, 'ducts opening into cloacae on the second sheet');
