// ICSE 9 Chemistry ch04 Water as a Universal Solvent: question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { SOLUBILITY_LETTERED, SATTEST, TYNDALL_LETTERED } from './svgs.mjs';

const { at, KNO3, NACL } = K;
const { mcq, ar, tf, fill, num, short, long, match } = mk;
const curveFig = svgV(SOLUBILITY_LETTERED, 'Solubility graph with curves A, B and C and points D and E lettered');
const tyndallFig = svgV(TYNDALL_LETTERED, 'Three jars P, Q and R in a beam of light');
const satFig = svgV(SATTEST, 'Three beakers tested with a crystal');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-solvent', mcq({
  stem: 'Which of these will not dissolve in water to any noticeable extent?',
  right: 'Cooking oil', wrong: ['Sugar', 'Washing soda', 'Copper sulphate'],
  sol: 'Oil is not polar enough to be pulled apart by water and floats as a layer — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-tyndall', mcq({
  stem: 'A liquid looks clear. A torch beam shows a bright path in it, and nothing settles on standing. It is a',
  right: 'colloid', wrong: ['true solution', 'suspension', 'pure liquid'],
  sol: 'A visible beam with no settling means light is scattered by particles that are small enough to stay afloat: a colloid — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('chk-sat', mcq({
  stem: 'A crystal of the same salt dropped into a solution neither dissolves nor grows. The solution is',
  right: 'saturated', wrong: ['unsaturated', 'supersaturated', 'a suspension'],
  sol: 'No change means the solution holds all it can at that temperature — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('chk-super-tf', tf({
  stem: 'A supersaturated solution is stable and cannot be made to crystallise by adding a crystal.',
  key: 'f',
  sol: 'False. It is unstable: a crystal or a knock makes the extra solute crystallise at once.',
  d: 2, c: 'understanding', t: [2],
}));
add('chk-read', mcq({
  stem: 'From the curves in the chapter, the solubility of potassium nitrate at 60 degrees Celsius is closest to',
  right: `${at(KNO3, 60)} g per 100 g of water`, wrong: [`${at(KNO3, 40)} g per 100 g of water`, `${at(KNO3, 80)} g per 100 g of water`, `${at(NACL, 60)} g per 100 g of water`],
  sol: 'Reading the red curve at 60 degrees gives the value in option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('chk-nacl', mcq({
  stem: 'Which statement about the solubility of sodium chloride in water is correct?',
  right: 'It changes very little as the temperature rises', wrong: ['It rises steeply as the temperature rises', 'It falls steeply as the temperature rises', 'It is almost zero at every temperature'],
  sol: 'The curve of sodium chloride is almost flat — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('chk-cool', mcq({
  stem: 'Crystals of potassium nitrate form when its hot saturated solution cools, because',
  right: 'its solubility becomes smaller at the lower temperature', wrong: ['its solubility becomes greater at the lower temperature', 'the water changes into potassium nitrate', 'cooling adds more solute to the solution'],
  sol: 'Colder water can hold less, so the excess leaves as crystals — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('chk-caso4-tf', tf({
  stem: 'Calcium sulphate is highly soluble and its solubility rises steeply with temperature.',
  key: 'f',
  sol: 'False. It is only slightly soluble and its solubility falls a little at higher temperatures.',
  d: 2, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t01 universal solvent; solutions, colloids and suspensions
add('polar-mcq', mcq({
  stem: 'Salt dissolves readily in water mainly because water molecules',
  right: 'are polar and pull the ions of the salt apart', wrong: ['are heavier than the particles of salt', 'react with salt to form a gas', 'have a lower boiling point than salt'],
  sol: 'The slightly charged ends of water molecules attract the ions — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('muddy-mcq', mcq({
  stem: 'Muddy river water is left in a jar overnight. A layer of soil collects at the bottom. The muddy water was a',
  right: 'suspension', wrong: ['solution', 'colloid', 'pure substance'],
  sol: 'Particles that settle on standing belong to a suspension — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('filter-mcq', mcq({
  stem: 'A mixture is poured through filter paper. The filtrate is clear and the paper keeps a white residue. The mixture was most likely',
  right: 'chalk powder shaken with water', wrong: ['sugar dissolved in water', 'common salt dissolved in water', 'copper sulphate dissolved in water'],
  sol: 'Only a suspension leaves a residue on the paper — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('size-mcq', mcq({
  stem: 'Which list puts the three kinds of mixture in order of increasing particle size?',
  right: 'solution, colloid, suspension', wrong: ['suspension, colloid, solution', 'colloid, solution, suspension', 'solution, suspension, colloid'],
  sol: 'Solution particles are smallest and suspension particles are largest — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('beam-mcq', mcq({
  stem: 'A beam of light passing through a jar of starch paste in water appears as a bright path. This is called',
  right: 'the Tyndall effect', wrong: ['dispersion of light', 'refraction of light', 'the Doppler effect'],
  sol: 'Scattering of light by colloidal particles is the Tyndall effect — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ar-universal', ar({
  a: 'Water is called the universal solvent.',
  r: 'Water can dissolve every substance in any amount.',
  key: 'a',
  sol: 'The assertion is true as a broad description, but the reason is false: oils, wax and sand do not dissolve — option (a).',
  d: 2, c: 'analysis', t: [1],
}));
add('ar-milk', ar({
  a: 'A beam of light is visible in milk diluted with water.',
  r: 'The particles in a true solution are too small to scatter visible light.',
  key: 'd',
  sol: 'Both are true. Milk is a colloid and scatters light, but the reason is about true solutions, so it does not explain the milk observation — option (d).',
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 saturated, unsaturated, supersaturated
add('heat-mcq', mcq({
  stem: 'A saturated solution of potassium nitrate at 30 degrees Celsius is heated to 50 degrees Celsius with no change in the amount of water. The solution now becomes',
  right: 'unsaturated, because the solubility has increased', wrong: ['saturated, because the amount of solute is unchanged', 'supersaturated, because the temperature rose', 'a suspension, because it is hot'],
  sol: 'The solubility of potassium nitrate rises with temperature, so the same solution can now dissolve more — option (@K).',
  d: 3, c: 'application', t: [2, 3],
}));
add('solubdef-mcq', mcq({
  stem: 'The solubility of a solid in water is correctly expressed as',
  right: 'grams of solid that saturate 100 g of water at a given temperature', wrong: ['grams of solid in 100 g of any solution', 'litres of water needed to dissolve 1 g of solid', 'grams of solid dissolved by any amount of water'],
  sol: 'The standard measure is the mass that saturates 100 g of water at a stated temperature — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('supersat-mcq', mcq({
  stem: 'A student cools a hot saturated solution very slowly and no crystals form. A single crystal is then dropped in and many crystals form at once. The solution before the crystal was added was',
  right: 'supersaturated', wrong: ['unsaturated', 'saturated', 'a colloid'],
  sol: 'Extra solute coming out at once after a crystal is added shows the solution held more than normal — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('stirstay-mcq', mcq({
  stem: 'A student adds salt in small portions to water at room temperature, stirring well. After the last portion a few grains stay at the bottom. The clear liquid above them is',
  right: 'saturated', wrong: ['unsaturated', 'supersaturated', 'a suspension'],
  sol: 'Undissolved solid in contact with the liquid shows it can take no more — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-sat', ar({
  a: 'A saturated solution can still be called a solution.',
  r: 'In a saturated solution the dissolved solute stays uniformly spread through the water.',
  key: 'c',
  sol: 'Both are true; the uniform spread explains why it is still a solution — option (c).',
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 solubility curves and calculations
add('steep-mcq', mcq({
  stem: 'A student heats a mixture of potassium nitrate and sodium chloride with water, then cools it. Most of the crystals that appear are those of potassium nitrate because',
  right: 'its solubility drops much more than that of sodium chloride on cooling', wrong: ['it is heavier than sodium chloride', 'sodium chloride cannot dissolve in hot water', 'sodium chloride dissolves more as the water cools'],
  sol: 'A steep curve means a large fall in solubility on cooling — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('caso4-mcq', mcq({
  stem: 'Which statement fits the solubility curve of calcium sulphate drawn in this chapter?',
  right: 'It is very small and falls slightly at higher temperatures', wrong: ['It is very large and rises steeply', 'It is the same as that of sodium chloride', 'It is zero at every temperature'],
  sol: 'The curve is on its own small scale and dips at high temperature — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('temp-mcq', mcq({
  stem: `The solubility of potassium nitrate is ${at(KNO3, 40)} g per 100 g of water at 40 degrees Celsius and ${at(KNO3, 80)} g at 80 degrees Celsius. Heating a saturated solution from 40 to 80 degrees Celsius will let it dissolve`,
  right: 'more solute, with the water unchanged', wrong: ['less solute', 'the same solute', 'no solute at all'],
  sol: 'Solubility rises with temperature, so more solute can dissolve — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('read-mcq', mcq({
  stem: `Using the data ${at(KNO3, 20)} g, ${at(KNO3, 40)} g, ${at(KNO3, 60)} g for potassium nitrate at 20, 40 and 60 degrees Celsius, the temperature at which about ${at(KNO3, 40)} g dissolves in 100 g of water is`,
  right: '40 degrees Celsius', wrong: ['20 degrees Celsius', '60 degrees Celsius', '80 degrees Celsius'],
  sol: 'Match the value to its temperature in the data — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('ratio-mcq', mcq({
  stem: `Between 20 and 80 degrees Celsius the solubility of sodium chloride in the chapter's data changes by only ${K.NACL_RISE} g, while that of potassium nitrate changes by ${K.KNO3_RISE} g. The better salt to purify by cooling a hot saturated solution is`,
  right: 'potassium nitrate', wrong: ['sodium chloride', 'both equally', 'neither, as both stay in solution'],
  sol: 'A large change in solubility gives a large mass of crystals on cooling — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('unsat-mcq', mcq({
  stem: `At 40 degrees Celsius, ${at(KNO3, 40)} g of potassium nitrate saturates 100 g of water. If 50 g of potassium nitrate is stirred into 100 g of water at this temperature, the solution formed is`,
  right: 'unsaturated', wrong: ['saturated', 'supersaturated', 'a colloid'],
  sol: 'Fifty grams is less than the maximum, so all of it dissolves and more could dissolve — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ar-cool', ar({
  a: 'Cooling a hot saturated solution of sodium chloride gives a large mass of crystals.',
  r: 'The solubility of sodium chloride changes very little with temperature.',
  key: 'b',
  sol: 'The assertion is false: little crystallises because solubility changes so little. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('ar-caso4', ar({
  a: 'A saturated solution of calcium sulphate contains very little solute.',
  r: 'Calcium sulphate is only slightly soluble in water.',
  key: 'c',
  sol: 'Both are true, and the low solubility explains the small amount dissolved — option (c).',
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- one-mark items
add('term-solubility', term({
  stem: 'Name the quantity: the number of grams of a solute that saturate 100 g of water at a given temperature.',
  model: '**Solubility.**', sol: 'Solubility.', sch: 'Solubility',
  d: 1, c: 'recall', t: [2],
}));
add('term-tyndall', term({
  stem: 'Name the effect that makes the path of a torch beam visible through a colloid.',
  model: '**The Tyndall effect.**', sol: 'Tyndall effect.', sch: 'Tyndall effect',
  d: 1, c: 'recall', t: [1],
}));
add('odd-mix', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Milk, Chalk shaken in water, Sugar solution, Muddy water.',
  model: '**Sugar solution** is the odd one out (a true solution); the other three are **mixtures whose particles scatter light or settle** (a colloid or suspensions).', sol: 'Sugar solution; the rest are colloid or suspensions.', sch: 'Odd one and category',
  d: 3, c: 'analysis', t: [1],
}));
add('reason-crystals', term({
  stem: 'Give a reason: crystals appear at once when a seed crystal is dropped into a supersaturated solution.',
  model: 'The solution holds **more solute than it normally can**, so the crystal gives the excess a place to settle and crystallise.', sol: 'It holds more than it can; the crystal starts crystallisation.', sch: 'Holds extra solute',
  d: 2, c: 'understanding', t: [2],
}));
add('obs-crystal', term({
  stem: 'State one observation when a crystal of potassium nitrate is added to a saturated solution of potassium nitrate at the same temperature.',
  model: 'The **crystal stays unchanged** and does not dissolve.', sol: 'Crystal unchanged.', sch: 'Crystal unchanged',
  d: 1, c: 'application', t: [2],
}));
add('term-solute', term({
  stem: 'In a solution of copper sulphate in water, name the solute and the solvent.',
  model: 'Solute: **copper sulphate**; solvent: **water**.', sol: 'Solute copper sulphate, solvent water.', sch: 'Solute and solvent named',
  d: 1, c: 'recall', t: [1],
}));
add('reason-nacl', term({
  stem: 'Give a reason: cooling a hot saturated solution of sodium chloride gives almost no crystals.',
  model: 'The **solubility of sodium chloride hardly changes** with temperature, so very little is rejected on cooling.', sol: 'Its solubility is almost constant.', sch: 'Solubility hardly changes',
  d: 2, c: 'understanding', t: [3],
}));
add('term-filter', term({
  stem: 'Name the type of mixture that is retained on filter paper and whose particles settle on standing.',
  model: '**A suspension.**', sol: 'Suspension.', sch: 'Suspension',
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- true-false
add('tf-colloid', tf({
  stem: 'A colloid settles on standing and its particles are retained by ordinary filter paper.',
  key: 'f',
  sol: 'False. The particles of a colloid stay suspended and pass through filter paper.',
  d: 2, c: 'understanding', t: [1],
}));
add('tf-hot', tf({
  stem: 'For every solid, the solubility in water rises when the temperature rises.',
  key: 'f',
  sol: 'False. Sodium chloride changes very little and calcium sulphate falls a little.',
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- numericals
add('num-n1', num({
  stem: `The solubility of potassium nitrate is ${at(KNO3, 60)} g per 100 g of water at 60 degrees Celsius. How many grams dissolve in ${K.N1_WATER} g of water to make a saturated solution at this temperature?`,
  value: K.N1_SOLUTE, unit: 'g',
  sol: `${at(KNO3, 60)} × ${K.N1_WATER} ÷ 100 = ${K.N1_SOLUTE} g.`,
  scheme: [[`${K.N1_SOLUTE} g`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 55 || 'value');
add('num-nacl-water', num({
  stem: `The solubility of sodium chloride is ${at(NACL, 20)} g per 100 g of water at 20 degrees Celsius. What mass of water is needed to dissolve ${K.N4_SOLUTE} g of sodium chloride at this temperature to make a saturated solution?`,
  value: K.N4_WATER, unit: 'g',
  sol: `${K.N4_SOLUTE} ÷ ${at(NACL, 20)} × 100 = ${K.N4_WATER} g.`,
  scheme: [[`${K.N4_WATER} g`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 250 || 'value');
add('num-evap', num({
  stem: `A ${K.N3_SOLN} g sample of a saturated solution of salt X at 30 degrees Celsius is evaporated to dryness and leaves ${K.N3_RESIDUE} g of solid. Calculate the solubility of X at 30 degrees Celsius in g per 100 g of water.`,
  value: K.N3_SOLUBILITY, unit: 'g per 100 g of water',
  sol: `Water = ${K.N3_SOLN} − ${K.N3_RESIDUE} = ${K.N3_WATER} g. Solubility = ${K.N3_RESIDUE} ÷ ${K.N3_WATER} × 100 = ${K.N3_SOLUBILITY}.`,
  scheme: [[`${K.N3_SOLUBILITY}`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 25 || 'value');
add('num-n6', num({
  stem: `At 40 degrees Celsius, ${at(KNO3, 40)} g of potassium nitrate saturates 100 g of water. How many grams of potassium nitrate are needed to saturate ${K.N6_WATER} g of water at 40 degrees Celsius?`,
  value: K.N6_SOLUTE, unit: 'g',
  sol: `${at(KNO3, 40)} × ${K.N6_WATER} ÷ 100 = ${K.N6_SOLUTE} g.`,
  scheme: [[`${K.N6_SOLUTE} g`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 160 || 'value');
add('num-left', num({
  stem: `${K.N5_SOLUTE} g of potassium nitrate is stirred into ${K.N5_WATER} g of water at 40 degrees Celsius, where ${at(KNO3, 40)} g saturates 100 g of water. What mass stays undissolved?`,
  value: K.N5_LEFT, unit: 'g',
  sol: `Dissolves: ${at(KNO3, 40)} × ${K.N5_WATER} ÷ 100 = ${K.N5_CAN} g. Left: ${K.N5_SOLUTE} − ${K.N5_CAN} = ${K.N5_LEFT} g.`,
  scheme: [[`${K.N5_LEFT} g`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 8 || 'value');
add('num-small-out', num({
  stem: `A saturated solution of potassium nitrate is made with ${K.N9B_WATER} g of water at 80 degrees Celsius and cooled to 40 degrees Celsius. The solubility is ${at(KNO3, 80)} g at 80 and ${at(KNO3, 40)} g at 40 degrees Celsius per 100 g of water. How many grams of crystals form?`,
  value: K.N9B_OUT, unit: 'g',
  sol: `Per 100 g water: ${at(KNO3, 80)} − ${at(KNO3, 40)} = ${K.N9_OUT} g. For ${K.N9B_WATER} g: ${K.N9_OUT} × ${K.N9B_WATER} ÷ 100 = ${K.N9B_OUT} g.`,
  scheme: [[`${K.N9B_OUT} g`, 1]],
  d: 4, c: 'application', t: [3],
}), (q) => q.answer.value === 21 || 'value');
add('num-pct', num({
  stem: `A saturated solution of potassium nitrate at 20 degrees Celsius has ${at(KNO3, 20)} g of the salt in every ${100 + at(KNO3, 20)} g of solution. Find the mass of potassium nitrate in 100 g of the solution, correct to one decimal place.`,
  value: K.N8_PCT, tol: 0.05, unit: 'g',
  sol: `${at(KNO3, 20)} ÷ ${100 + at(KNO3, 20)} × 100 = ${K.N8_PCT} g.`,
  scheme: [[`${K.N8_PCT} g`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 24.2 || 'value');
add('num-e1', num({
  stem: `How many grams of sodium chloride dissolve in ${K.E1_WATER} g of water at 20 degrees Celsius to give a saturated solution, if ${at(NACL, 20)} g saturates 100 g of water?`,
  value: K.E1_SOLUTE, unit: 'g',
  sol: `${at(NACL, 20)} × ${K.E1_WATER} ÷ 100 = ${K.E1_SOLUTE} g.`,
  scheme: [[`${K.E1_SOLUTE} g`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 28.8 || 'value');

// ---------------------------------------------------------------- fill and match
add('fill-5', fill({
  marks: 5,
  stem: 'Complete the paragraph with suitable terms, one for each blank. A solution that can still dissolve more solute at a given temperature is called (1) ____. A solution that has dissolved all it can at that temperature is (2) ____. A solution that holds more than that and crystallises when a crystal is added is (3) ____. The amount of solute that saturates 100 g of water is the (4) ____ of the solute. A beam of light is scattered by the particles of a colloid, which is called the (5) ____ effect.',
  acc: [['unsaturated'], ['saturated'], ['supersaturated'], ['solubility'], ['Tyndall']],
  sol: 'Unsaturated; saturated; supersaturated; solubility; Tyndall.',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('curve-match4', match({
  marks: 4,
  stem: 'Study the solubility graph and match each lettered feature with its description.',
  pairs: [
    ['A', 'Solubility rises steeply with temperature'],
    ['B', 'Solubility is almost unchanged with temperature'],
    ['C', 'Very small values, drawn on a separate scale'],
    ['D', 'A point showing a saturated solution at 60 degrees Celsius'],
  ],
  order: [2, 0, 3, 1],
  sol: 'A steep curve; B flat curve; C own scale; D point at 60 degrees.',
  d: 2, c: 'application', t: [3],
  assets: [curveFig],
}));

// ---------------------------------------------------------------- 2-mark short answers
add('s2-diff', short({
  marks: 2,
  stem: 'Distinguish between a true solution and a suspension on the basis of (i) settling on standing and (ii) behaviour with filter paper.',
  model: '(i) A **solution does not settle**, while a **suspension settles** on standing. (ii) A solution **passes through** filter paper, whereas a suspension is **left behind** on it.',
  sol: 'Settling; filter paper.',
  scheme: [['Settling compared', 1], ['Filter paper compared', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-polar', short({
  marks: 2,
  stem: 'Why is water called the universal solvent? State one limitation of this name.',
  model: 'It **dissolves a wider range of substances** (solids, liquids and gases) than most other liquids. **Oil, wax or sand do not dissolve** in it.',
  sol: 'Dissolves many; some exceptions.',
  scheme: [['Dissolves a wide range of substances', 1], ['One limitation given', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-test', short({
  marks: 2,
  stem: 'A student has a clear solution of potassium nitrate at room temperature and wants to know if it is saturated. Describe how to find out and the observation for a saturated solution.',
  model: 'Add **one small crystal of potassium nitrate** to the solution and stir gently. If the solution is saturated, the **crystal stays unchanged**.',
  sol: 'Add a crystal; no change.',
  scheme: [['Adds a crystal of the same solute', 1], ['Saturated: crystal stays unchanged', 1]],
  d: 2, c: 'application', t: [2],
}));
add('s2-tyndall', short({
  marks: 2,
  stem: 'A torch beam is shone through (i) a sugar solution and (ii) starch paste in water. Give the observation in each case.',
  model: '(i) **The beam is not visible** in the sugar solution. (ii) **A bright path of light is seen** in the starch paste, because the larger particles scatter light.',
  sol: 'No beam; visible beam.',
  scheme: [['Sugar solution: no beam seen', 1], ['Starch paste: beam seen', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s2-super', short({
  marks: 2,
  stem: 'How can a supersaturated solution be made from a hot saturated solution? Why does it crystallise when disturbed?',
  model: 'Cool the hot saturated solution **slowly and without disturbing it**. It holds **more solute than it normally can**, so a knock or a crystal lets the excess crystallise.',
  sol: 'Cool undisturbed; unstable.',
  scheme: [['Cooled slowly without disturbance', 1], ['Unstable, holds extra, excess crystallises', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('s2-curves', short({
  marks: 2,
  stem: 'State two differences between the solubility curves of potassium nitrate and sodium chloride.',
  model: 'The potassium nitrate curve **rises steeply**, while the sodium chloride curve is **almost flat**. At 80 degrees the potassium nitrate solubility is **much larger** than that of sodium chloride.',
  sol: 'Steepness; value at high temperature.',
  scheme: [['Steep versus almost flat', 1], ['Second difference stated', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('s2-kettle', short({
  marks: 2,
  stem: 'A student says that heating a saturated solution always makes more solid dissolve. Correct the statement using the curves of potassium nitrate and calcium sulphate.',
  model: 'It is **true for potassium nitrate**, whose solubility rises with temperature, but **not for calcium sulphate**, whose solubility falls a little at higher temperatures.',
  sol: 'Rises for potassium nitrate; falls for calcium sulphate.',
  scheme: [['Potassium nitrate rises', 1], ['Calcium sulphate falls slightly', 1]],
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- 3-mark short answers
add('s3-compare', short({
  marks: 3, wl: null,
  stem: 'Tabulate three differences between a colloid and a suspension.',
  model: '| Colloid | Suspension |\n|---|---|\n| Particles about 1 to 1000 nm | Particles larger than about 1000 nm |\n| **Does not settle** on standing | **Settles** on standing |\n| **Passes through filter paper** | **Retained by filter paper** |',
  sol: 'Particle size; settling; filtering.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s3-calc1', short({
  marks: 3, wl: null,
  stem: `The solubility of potassium nitrate at 40 degrees Celsius is ${at(KNO3, 40)} g per 100 g of water. Calculate the mass of the saturated solution formed from ${K.E2_TEMP_WATER} g of water at 40 degrees Celsius.`,
  model: `Potassium nitrate dissolved = ${at(KNO3, 40)} × ${K.E2_TEMP_WATER} ÷ 100 = **${K.E2_SOLUTE} g**. Mass of solution = ${K.E2_TEMP_WATER} + ${K.E2_SOLUTE} = **${K.E3_SOLN} g**.`,
  sol: `${K.E2_SOLUTE} g dissolves; ${K.E3_SOLN} g of solution.`,
  scheme: [['Method: solubility × water ÷ 100', 1], [`${K.E2_SOLUTE} g`, 1], [`${K.E3_SOLN} g`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => K.E3_SOLN === 492 || 'value');
add('s3-prepare', short({
  marks: 3,
  stem: 'Describe how a saturated solution of common salt can be prepared in the laboratory at room temperature and how you will confirm that it is saturated.',
  model: 'Add salt to water **in small portions, stirring** after each, until a little **stays undissolved**. Pour off the clear liquid. Add **one more crystal of salt**; it **does not dissolve**, which shows the solution is saturated.',
  sol: 'Small portions; leftover solid; crystal test.',
  scheme: [['Adds salt in portions with stirring', 1], ['Stops when some stays undissolved', 1], ['Confirms with an added crystal that does not dissolve', 1]],
  d: 2, c: 'application', t: [2],
}));
add('s3-curves', short({
  marks: 3, wl: [25, 70],
  stem: 'Compare the effect of rise in temperature on the solubility of potassium nitrate, sodium chloride and calcium sulphate in water.',
  model: '**Potassium nitrate:** solubility **increases greatly**. **Sodium chloride:** solubility **changes very little**. **Calcium sulphate:** it is **only slightly soluble** and its solubility **falls a little** at higher temperatures.',
  sol: 'Large rise; almost none; small and slightly falling.',
  scheme: [['Potassium nitrate increases greatly', 1], ['Sodium chloride almost constant', 1], ['Calcium sulphate low and slightly falling', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('s3-explain', short({
  marks: 3,
  stem: 'A hot saturated solution of potassium nitrate is cooled. State what you will see and explain it. How can the crystals be separated?',
  model: '**Crystals of potassium nitrate appear.** The **solubility falls as the solution cools**, so the water cannot hold all the solute and the **excess crystallises**. The crystals are separated by **filtering**.',
  sol: 'Crystals; lower solubility; filtering.',
  scheme: [['Crystals appear', 1], ['Explained by lower solubility on cooling', 1], ['Separated by filtering', 1]],
  d: 2, c: 'application', t: [3],
}));
add('s3-evap', short({
  marks: 3, wl: null,
  stem: `${K.Z_SOLN} g of a saturated solution of salt Z is evaporated to dryness and leaves ${K.Z_RES} g of Z. Calculate the solubility of Z in g per 100 g of water.`,
  model: `Water = ${K.Z_SOLN} − ${K.Z_RES} = **${K.Z_WATER} g**. ${K.Z_RES} g of Z saturates ${K.Z_WATER} g of water, so for 100 g: ${K.Z_RES} ÷ ${K.Z_WATER} × 100 = **${K.Z_SOL} g**.`,
  sol: `Water ${K.Z_WATER} g; solubility ${K.Z_SOL} g per 100 g of water.`,
  scheme: [['Mass of water found', 1], ['Scales to 100 g of water', 1], [`${K.Z_SOL} g per 100 g of water`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => K.Z_SOL === 40 || 'value');

// ---------------------------------------------------------------- 10-mark structured questions
add('y-long', long({
  marks: 10, wl: null,
  stem: `The solubility of salt Y in water is ${K.Y[0].s} g per 100 g at ${K.Y[0].t} degrees Celsius, ${K.Y[1].s} g at ${K.Y[1].t} degrees Celsius and ${K.Y[2].s} g at ${K.Y[2].t} degrees Celsius.\n\n(a) State how the solubility of Y changes with temperature and by how many grams it changes between ${K.Y[0].t} and ${K.Y[2].t} degrees Celsius. [2]\n\n(b) Calculate the mass of Y that dissolves in 50 g of water at ${K.Y[2].t} degrees Celsius and the mass of the saturated solution. [3]\n\n(c) The saturated solution in (b) is cooled to ${K.Y[0].t} degrees Celsius. Calculate the mass of Y that crystallises. [3]\n\n(d) Sketch the general shape of the solubility curve of Y, labelling both axes. [2]`,
  model: `**(a)** The solubility **increases** with temperature, by ${K.Y[2].s} − ${K.Y[0].s} = **${K.Y_GAIN} g** per 100 g of water.\n\n**(b)** Y dissolved = ${K.Y[2].s} × 50 ÷ 100 = **${K.Y_50G_AT_60} g**; solution = 50 + ${K.Y_50G_AT_60} = **${K.Y_SOLN} g**.\n\n**(c)** At ${K.Y[0].t} degrees, 50 g of water holds ${K.Y[0].s} × 50 ÷ 100 = ${K.Y_20_50} g. Crystals = ${K.Y_50G_AT_60} − ${K.Y_20_50} = **${K.Y_CRYST} g**.\n\n**(d)** Axes: **temperature (degrees Celsius)** across and **solubility (g per 100 g of water)** up; a **rising curve** that gets steeper.`,
  sol: `Increases, ${K.Y_GAIN} g; ${K.Y_50G_AT_60} g and ${K.Y_SOLN} g; ${K.Y_CRYST} g; rising curve with labelled axes.`,
  scheme: [['Increases with temperature', 1], [`${K.Y_GAIN} g`, 1], ['Working: solubility × water ÷ 100', 1], [`${K.Y_50G_AT_60} g dissolved`, 1], [`${K.Y_SOLN} g of solution`, 1], [`Holds ${K.Y_20_50} g at ${K.Y[0].t} degrees`, 1], ['Subtracts to find crystals', 1], [`${K.Y_CRYST} g`, 1], ['Both axes labelled', 1], ['Rising curve', 1]],
  d: 3, c: 'application', t: [3],
}), (q) => K.Y_CRYST === 9 || 'crystals');
add('curve-long', long({
  marks: 10, wl: null,
  stem: 'Study the solubility graph. Curves are lettered A, B and C, and two points are lettered D and E. Curve C is drawn on its own scale.\n\n(a) Name the salts that curves A and B are most likely to represent. [2]\n\n(b) Point D lies on curve A at 60 degrees Celsius. State the solubility at D and the mass of the salt that saturates 250 g of water at this temperature. [3]\n\n(c) A saturated solution at D is cooled to 20 degrees Celsius. Use the graph to find the mass of the salt that crystallises from 100 g of water. [3]\n\n(d) Which curve belongs to the slightly soluble salt? State how its solubility changes at higher temperatures. [2]',
  model: `**(a)** A: **potassium nitrate** (steep rise). B: **sodium chloride** (almost flat).\n\n**(b)** At D the solubility is **${K.D_SOL} g per 100 g of water**. For 250 g of water: ${K.D_SOL} × 250 ÷ 100 = **${K.D_250} g**.\n\n**(c)** At 20 degrees the solubility is ${at(KNO3, 20)} g, so crystals = ${K.D_SOL} − ${at(KNO3, 20)} = **${K.D_OUT} g**.\n\n**(d)** **Curve C** (calcium sulphate). Its solubility is very small and **falls slightly at higher temperatures**.`,
  sol: `Potassium nitrate and sodium chloride; ${K.D_SOL} g and ${K.D_250} g; ${K.D_OUT} g; curve C, falls slightly.`,
  scheme: [['A potassium nitrate', 1], ['B sodium chloride', 1], [`${K.D_SOL} g per 100 g`, 1], ['Working for 250 g of water', 1], [`${K.D_250} g`, 1], [`${at(KNO3, 20)} g read at 20 degrees`, 1], ['Subtracts', 1], [`${K.D_OUT} g`, 1], ['Curve C named', 1], ['Falls slightly when hot', 1]],
  d: 3, c: 'application', t: [3],
  assets: [curveFig],
}), (q) => K.D_OUT === 78 || 'out');
add('beam-long', long({
  marks: 10, wl: null,
  stem: 'A student prepares three liquids. Liquid X: fine sand is stirred into water. Liquid Y: potassium permanganate crystals are dissolved in water to give a clear purple liquid. Liquid Z: a little egg white is beaten into water, giving a nearly clear liquid.\n\n(a) Name the type of mixture that each of X, Y and Z is. [3]\n\n(b) Which liquid shows a bright path when a torch beam is shone through it from the side, but does not settle? Name the effect. [2]\n\n(c) Which liquid will leave a residue on filter paper? [1]\n\n(d) Draw a neat, labelled diagram of the arrangement used to show the effect in (b). [4]',
  model: '**(a)** X is a **suspension**. Y is a **solution**. Z is a **colloid**.\n\n**(b)** **Liquid Z**. This is the **Tyndall effect**.\n\n**(c)** **Liquid X**.\n\n**(d)** A **torch** at the side of a **glass jar** of liquid Z, with the **beam of light** drawn crossing the liquid and a **bright path visible**; labels for torch, beam, jar and liquid.',
  sol: 'Suspension, solution, colloid; Z, Tyndall effect; X; labelled torch and jar diagram.',
  scheme: [['X suspension', 1], ['Y solution', 1], ['Z colloid', 1], ['Liquid Z named', 1], ['Tyndall effect', 1], ['Liquid X on filter paper', 1], ['Torch, jar and beam drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [1],
}));
add('sat-long', long({
  marks: 10, wl: null,
  stem: 'A student has three beakers of the same salt solution at 30 degrees Celsius and adds one crystal of the salt to each. In beaker 1 the crystal dissolves. In beaker 2 the crystal falls to the bottom and does not change. In beaker 3 crystals form quickly all around the added crystal.\n\n(a) Name the kind of solution in each beaker. [3]\n\n(b) Which beaker holds more dissolved salt than beaker 2 at the same temperature? Why is its solution unstable? [2]\n\n(c) Describe how a saturated solution of the salt can be prepared and tested. [3]\n\n(d) Draw a neat, labelled diagram of the three beakers after the crystal has been added. [2]',
  model: '**(a)** Beaker 1 **unsaturated**; beaker 2 **saturated**; beaker 3 **supersaturated**.\n\n**(b)** **Beaker 3**. It holds **more than the normal maximum**, so any disturbance or crystal makes the excess crystallise.\n\n**(c)** Add salt **in small portions with stirring** until some **stays undissolved**, pour off the clear liquid, then **add a crystal**: it **does not dissolve**.\n\n**(d)** Three **beakers** with the solution level; a **dissolved crystal** in the first, an **unchanged crystal** in the second, **many crystals** in the third; labels.',
  sol: 'Unsaturated, saturated, supersaturated; beaker 3 unstable; small portions and crystal test; three labelled beakers.',
  scheme: [['Beaker 1 unsaturated', 1], ['Beaker 2 saturated', 1], ['Beaker 3 supersaturated', 1], ['Beaker 3 named', 1], ['Reason for instability', 1], ['Adds salt in portions with stirring', 1], ['Some stays undissolved', 1], ['Crystal test', 1], ['Three beakers drawn', 1], ['Crystal states labelled', 1]],
  d: 3, c: 'analysis', t: [2],
  assets: [satFig],
}));
add('cool-long', long({
  marks: 10, wl: null,
  stem: `A saturated solution of potassium nitrate is made with ${K.L5_WATER} g of water at 60 degrees Celsius and then cooled to 20 degrees Celsius. At 60 and 20 degrees Celsius the solubilities are ${at(KNO3, 60)} g and ${at(KNO3, 20)} g per 100 g of water.\n\n(a) Calculate the mass of potassium nitrate dissolved at 60 degrees Celsius. [2]\n\n(b) Calculate the mass that the solution can hold at 20 degrees Celsius. [2]\n\n(c) Calculate the mass of crystals that form. [2]\n\n(d) Explain why crystals form on cooling, and why a saturated solution of sodium chloride would give almost no crystals. [2]\n\n(e) Name the method used to separate the crystals from the liquid. [2]`,
  model: `**(a)** ${at(KNO3, 60)} × ${K.L5_WATER} ÷ 100 = **${K.L5_HOT} g**.\n\n**(b)** ${at(KNO3, 20)} × ${K.L5_WATER} ÷ 100 = **${K.L5_COLD} g**.\n\n**(c)** ${K.L5_HOT} − ${K.L5_COLD} = **${K.L5_OUT} g**.\n\n**(d)** The **solubility of potassium nitrate falls** on cooling, so the **excess crystallises**. The solubility of **sodium chloride changes very little**, so almost nothing comes out.\n\n**(e)** **Filtration**: the mixture is poured through filter paper, which keeps the crystals (then dried between filter papers).`,
  sol: `${K.L5_HOT} g; ${K.L5_COLD} g; ${K.L5_OUT} g; solubility falls; filtration.`,
  scheme: [['Working for 60 degrees', 1], [`${K.L5_HOT} g`, 1], ['Working for 20 degrees', 1], [`${K.L5_COLD} g`, 1], ['Subtracts', 1], [`${K.L5_OUT} g`, 1], ['Solubility falls on cooling', 1], ['Sodium chloride almost constant', 1], ['Filtration named', 1], ['Crystals kept on the paper', 1]],
  d: 3, c: 'application', t: [3],
}), (q) => K.L5_OUT === 117 || 'out');
add('evap-long', long({
  marks: 10, wl: null,
  stem: `A student weighs a clean china dish, adds ${K.Z_SOLN} g of a saturated solution of salt Z at 20 degrees Celsius and heats it gently until only dry solid is left. The mass of solid Z is ${K.Z_RES} g.\n\n(a) Calculate the mass of water in the sample. [1]\n\n(b) Calculate the solubility of Z at 20 degrees Celsius in g per 100 g of water. [3]\n\n(c) How many grams of Z are needed to saturate 250 g of water at this temperature? [2]\n\n(d) Describe how the student should carry out the experiment and weigh the results. [3]\n\n(e) Is a solution of ${K.Z_30} g of Z in 100 g of water at 20 degrees Celsius saturated? Give a reason. [1]`,
  model: `**(a)** ${K.Z_SOLN} − ${K.Z_RES} = **${K.Z_WATER} g**.\n\n**(b)** ${K.Z_RES} g saturates ${K.Z_WATER} g of water, so for 100 g: ${K.Z_RES} ÷ ${K.Z_WATER} × 100 = **${K.Z_SOL} g per 100 g of water**.\n\n**(c)** ${K.Z_SOL} × 250 ÷ 100 = **${K.Z_250} g**.\n\n**(d)** **Weigh the empty dish**, add the solution and **weigh again**; **heat gently** to dryness, cool and **weigh the dish with the dry solid**; subtract to get the solid and the water.\n\n**(e)** **No**, it is unsaturated, because ${K.Z_30} g is less than ${K.Z_SOL} g.`,
  sol: `${K.Z_WATER} g; ${K.Z_SOL} g per 100 g; ${K.Z_250} g; weighings; unsaturated.`,
  scheme: [[`${K.Z_WATER} g`, 1], ['Water found for the solubility', 1], ['Scales to 100 g of water', 1], [`${K.Z_SOL} g per 100 g of water`, 1], ['Method for 250 g', 1], [`${K.Z_250} g`, 1], ['Weighs empty dish and with solution', 1], ['Heats gently to dryness', 1], ['Weighs the dish with the solid', 1], ['Unsaturated with a reason', 1]],
  d: 4, c: 'analysis', t: [3],
}), (q) => K.Z_250 === 100 || 'z');
add('tyndall-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of three jars, P, Q and R, each lit from the side by a torch. The jar P is clear and the beam cannot be seen in it. In Q the beam is seen as a bright path. R is cloudy and has a layer at the bottom.\n\n(a) Identify the type of mixture in each of P, Q and R. [3]\n\n(b) Which jar has the largest particles and which has the smallest? [2]\n\n(c) State which of the mixtures will pass through filter paper without leaving a residue. [2]\n\n(d) Give one example of each mixture. [3]',
  model: '**(a)** P is a **solution**; Q is a **colloid**; R is a **suspension**.\n\n**(b)** **R** has the largest particles and **P** the smallest.\n\n**(c)** **P and Q** pass through filter paper (R leaves a residue).\n\n**(d)** P: **sugar in water** (or salt). Q: **milk** or starch in water. R: **muddy water** or chalk in water.',
  sol: 'P solution, Q colloid, R suspension; R largest, P smallest; P and Q pass; one example each.',
  scheme: [['P solution', 1], ['Q colloid', 1], ['R suspension', 1], ['R largest', 1], ['P smallest', 1], ['P passes', 1], ['Q passes', 1], ['Example of a solution', 1], ['Example of a colloid', 1], ['Example of a suspension', 1]],
  d: 3, c: 'analysis', t: [1],
  assets: [tyndallFig],
}));

// ---------------------------------------------------------------- extra objective item
add('example-mcq', mcq({
  stem: 'Which pair correctly names a colloid and a suspension?',
  right: 'Starch paste in water; chalk powder in water', wrong: ['Chalk powder in water; starch paste in water', 'Sugar in water; salt in water', 'Muddy water; sugar in water'],
  sol: 'Starch paste scatters light yet does not settle (colloid), while chalk powder settles (suspension) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
