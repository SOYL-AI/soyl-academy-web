// ICSE 9 Chemistry ch04 Water as a Universal Solvent: Solutions and Solubility. Part 1 (t01, t02), Part 2 (t03).
import { sl, deck, table, flow, svgV } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { SOLUBILITY, SATTEST, TYNDALL } from './svgs.mjs';
import { TEMPS, KNO3, NACL, at, N1_WATER, N1_SOLUTE, N1_SOLUTION, N2_WATER, N2_HOT, N2_COLD, N2_CRYST, N5_SOLUTE, N5_WATER, N5_CAN, N5_LEFT, N7_KNO3_OUT, N7_NACL_OUT } from './calc.mjs';

// numbers in words for narration (0 to 999)
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
export const W = (n) => {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
  return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + W(n % 100) : '');
};

export const V = {
  curves: svgV(SOLUBILITY, 'Illustrative solubility curves of potassium nitrate, sodium chloride and calcium sulphate'),
  sattest: svgV(SATTEST, 'Three beakers tested with a crystal: the crystal dissolves, stays unchanged, or sets off crystals forming at once'),
  tyndall: svgV(TYNDALL, 'A solution, a colloid and a suspension in a beam of light'),
};

export const deck1 = deck({
  part: 1,
  title: 'Water as a Universal Solvent — Part 1: Water as a solvent, kinds of mixtures and saturated solutions',
  goals: [
    'Explain why water is called a universal solvent',
    'Compare solutions, colloids and suspensions in particle size, stability and visibility',
    'Distinguish unsaturated, saturated and supersaturated solutions and describe how to test one',
  ],
  slides: [
    sl('title', 'Water as a Universal Solvent', {
      b: 'Part 1 — what dissolves in water, and how to tell a solution from other mixtures.',
      v: flow('LR', [['s', 'Solute'], ['w', 'Water (solvent)'], ['x', 'Solution']], [['s', 'w'], ['w', 'x']], 'Flow: solute and water give a solution'),
      n: 'Sugar vanishes in tea. Salt disappears in soup. Water makes this happen for thousands of substances, which is why we call it the universal solvent. Let us see how, and where the name is not quite true.',
    }),
    sl('concept', 'Why water is a universal solvent', {
      b: 'Water molecules are **polar**: one end is slightly negative and the other slightly positive, so they pull ionic compounds and many polar substances apart.',
      v: table(['Dissolves well in water', 'Hardly dissolves in water'], [['Common salt, sugar, washing soda, copper sulphate', 'Cooking oil, wax, kerosene'], ['Ammonia, hydrogen chloride and carbon dioxide gases (to different extents)', 'Sand, chalk and many metals']], 'Table of substances that dissolve well in water and substances that hardly dissolve'),
      n: 'Water dissolves more substances than any other common liquid, including solids, liquids and gases. It dissolves most ionic compounds and many polar substances. But oil, wax and sand do not dissolve, so universal is a strong word.',
    }),
    sl('check', 'Quick check: a poor solvent case', {
      b: 'Which of these will **not** dissolve in water to any noticeable extent?',
      chk: 'chk-solvent',
      n: 'Think of a substance that floats as a separate layer on water.',
    }),
    sl('concept', 'Solution, colloid or suspension?', {
      v: table(['Property', 'Solution', 'Colloid', 'Suspension'], [['Particle size', 'Smaller than one nanometre', 'About one to one thousand nanometres', 'Larger than one thousand nanometres'], ['Appearance', 'Clear', 'Appears clear or slightly cloudy', 'Cloudy'], ['Settles on standing?', 'No', 'No', 'Yes'], ['Beam of light', 'Path not seen', 'Path seen (Tyndall effect)', 'Path seen; liquid cloudy'], ['Through filter paper', 'Passes', 'Passes', 'Stays behind'], ['Example', 'Sugar in water', 'Milk, starch in water', 'Chalk powder in water']], 'Table comparing solutions, colloids and suspensions'),
      n: 'Compare the three by particle size. In a solution the particles are tiny and never settle. In a colloid they are larger, scatter light and still never settle. In a suspension they are large, make the liquid cloudy and slowly settle out.',
    }),
    sl('diagram', 'The Tyndall effect', {
      b: 'A narrow beam of light is **scattered** by colloidal particles, so its path shows up in the liquid.',
      v: V.tyndall,
      n: 'Shine a torch through each jar from the side. In the solution the particles are too small to scatter light, so the beam is invisible. In the colloid the beam lights up as a bright path. In the suspension the liquid is cloudy and a layer settles at the bottom.',
    }),
    sl('check', 'Quick check: the beam of light', {
      b: 'A liquid looks clear. A torch beam shows a bright path in it, and nothing settles on standing. It is a…',
      chk: 'chk-tyndall',
      n: 'Which mixture scatters light but does not settle?',
    }),
    sl('example', 'Worked example 1: sort the mixtures', {
      b: 'Three mixtures are made in water: **P** salt, **Q** powdered chalk, **R** starch paste. P is clear and shows no beam. Q is cloudy and leaves a white layer after an hour. R is almost clear but shows a bright beam and does not settle.',
      ul: ['Step 1: P is clear and shows no beam, so it is a **solution**.', 'Step 2: Q is cloudy and settles, so it is a **suspension**.', 'Step 3: R shows a beam but does not settle, so it is a **colloid**.'],
      v: table(['Mixture', 'Clue', 'Type'], [['P', 'Clear, no beam', 'Solution'], ['Q', 'Cloudy, settles', 'Suspension'], ['R', 'Beam seen, no settling', 'Colloid']], 'Worked table sorting three mixtures by their observations'),
      n: 'Use the clues one at a time. No beam and clear liquid means a solution. A cloudy liquid that settles is a suspension. A beam of light that is visible while nothing settles means a colloid. Always check both clues.',
    }),
    sl('concept', 'Solute, solvent and solubility', {
      b: 'A **solution** has a **solute** (the part that dissolves) in a **solvent** (the liquid that dissolves it). **Solubility** is the mass of solute that saturates **100 g of solvent** at a given temperature.',
      v: table(['Term', 'Meaning', 'In salt water'], [['Solute', 'Substance that dissolves', 'Common salt'], ['Solvent', 'Liquid that does the dissolving', 'Water'], ['Solution', 'Uniform mixture of both', 'The salt water'], ['Solubility', 'Grams of solute that saturate 100 g of water', 'About 36 g at 20 degrees Celsius']], 'Table of the terms solute, solvent, solution and solubility'),
      n: 'The substance that dissolves is the solute. The liquid it dissolves in is the solvent. Together they make the solution. Solubility counts how many grams of solute saturate one hundred grams of water at a stated temperature.',
    }),
    sl('concept', 'Unsaturated, saturated, supersaturated', {
      v: table(['Type', 'What it holds', 'Test with one crystal'], [['Unsaturated', 'Can dissolve more solute at that temperature', 'Crystal dissolves'], ['Saturated', 'Holds as much solute as it can at that temperature', 'Crystal stays unchanged'], ['Supersaturated', 'Holds more than a saturated solution (unstable)', 'Extra solute crystallises out at once']], 'Table of the three kinds of solution and the crystal test for each'),
      n: 'An unsaturated solution can take more solute. A saturated solution is full at that temperature. A supersaturated solution holds even more than that, but it is unstable. A single crystal makes the extra solid appear.',
    }),
    sl('diagram', 'Testing with a crystal', {
      b: 'Add one small crystal of the **same solute**, stir gently and watch.',
      v: V.sattest,
      n: 'Add a single crystal of the same salt to each solution. If it dissolves, the solution was unsaturated. If it stays unchanged, the solution is saturated. If crystals suddenly grow all around it, the solution was supersaturated.',
    }),
    sl('check', 'Quick check: reading the test', {
      b: 'A crystal of the same salt dropped into a solution neither dissolves nor grows. The solution is…',
      chk: 'chk-sat',
      n: 'The crystal does nothing at all. What does that say about the solution?',
    }),
    sl('example', 'Worked example 2: how to make a saturated solution', {
      b: 'A student wants a saturated solution of salt at room temperature.',
      ul: ['Step 1: warm or stir water in a beaker and add salt in **small portions**.', 'Step 2: keep stirring after each portion until it dissolves.', 'Step 3: stop when a little salt **stays undissolved** after long stirring; decant or filter the clear liquid.', 'Step 4: confirm it is saturated by adding one more crystal; it does not dissolve.'],
      v: flow('LR', [['a', 'Add salt in portions and stir'], ['b', 'Some salt stays undissolved'], ['c', 'Filter the clear liquid'], ['d', 'Test with one crystal']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for making and testing a saturated solution'),
      n: 'Add the salt a little at a time and stir. When a few grains remain at the bottom after thorough stirring, no more will dissolve at that temperature. Pour off the clear liquid. A fresh crystal will not dissolve, which confirms it.',
    }),
    sl('concept', 'A supersaturated solution', {
      b: 'Cool a **hot saturated** solution slowly and **without disturbing it**; extra solute may stay dissolved for a while.',
      v: flow('LR', [['h', 'Hot saturated solution'], ['c', 'Cool slowly, undisturbed'], ['s', 'Supersaturated solution'], ['x', 'Add a crystal or shake'], ['k', 'Excess crystallises out']], [['h', 'c'], ['c', 's'], ['s', 'x'], ['x', 'k']], 'Flow from a hot saturated solution to a supersaturated solution that crystallises when disturbed'),
      n: 'If a hot saturated solution cools very slowly and is left undisturbed, the extra solute may stay dissolved. This unstable state is called supersaturated. A crystal dropped in, or a knock, sets the extra solute crystallising at once.',
    }),
    sl('check', 'Quick check: supersaturation', {
      b: 'True or false: a supersaturated solution is stable and cannot be made to crystallise by adding a crystal.',
      chk: 'chk-super-tf',
      n: 'Is a supersaturated solution stable?',
    }),
    sl('summary', 'Summary', {
      ul: ['Water dissolves many but not all substances, so it is a universal solvent only in a broad sense.', 'Solution: tiny particles, clear, no beam, no settling. Colloid: scatters light, no settling. Suspension: cloudy, settles.', 'Test with a crystal: dissolves is unsaturated, unchanged is saturated, crystals appear is supersaturated.'],
      v: table(['Mixture', 'Beam of light', 'Settles?'], [['Solution', 'Not seen', 'No'], ['Colloid', 'Seen', 'No'], ['Suspension', 'Seen, cloudy', 'Yes']], 'Summary table of the three mixtures'),
      n: 'To recap. Water dissolves a great many substances. Solutions, colloids and suspensions differ in particle size, in whether a beam is visible, and in whether they settle. One crystal tells you whether a solution is unsaturated, saturated or supersaturated.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Give **two** differences when asked to distinguish: particle size plus one observation.', 'Define solubility with **100 g of water** and a **stated temperature**.', 'In the crystal test, name **both** the observation and the type of solution.', 'Do not call every clear liquid a solution; check for a beam of light.'],
      n: 'Exam tips. Give two differences when you distinguish things. When you define solubility, say one hundred grams of water and the temperature. In the crystal test, give the observation and the conclusion. And remember that a clear liquid is not always a solution.',
    }),
  ],
});

const row = (t) => [`${t} degrees Celsius`, `${at(KNO3, t)}`, `${at(NACL, t)}`];
export const deck2 = deck({
  part: 2,
  title: 'Water as a Universal Solvent — Part 2: Solubility curves, temperature and crystallisation',
  goals: [
    'Interpret solubility curves to compare how solubility changes with temperature',
    'Calculate solute, water and crystals formed from solubility data',
    'Explain why potassium nitrate crystallises out when a hot saturated solution is cooled',
  ],
  slides: [
    sl('title', 'Solubility Curves', {
      b: 'Part 2 — how temperature changes the amount that dissolves, and what the curves tell us.',
      v: flow('LR', [['t', 'Temperature'], ['s', 'Solubility'], ['c', 'Curve']], [['t', 's'], ['s', 'c']], 'Flow: temperature, solubility, curve'),
      n: 'A hot drink dissolves more sugar than a cold one. But not every solid behaves like sugar. A solubility curve shows the full story for one substance, in a single picture.',
    }),
    sl('concept', 'Reading solubility', {
      b: 'Solubility is measured in **grams of solute per 100 grams of water** at a stated temperature. A solubility curve plots it against temperature.',
      v: table(['Temperature', 'Potassium nitrate', 'Sodium chloride'], [row(20), row(40), row(60), row(80)], 'Table of the solubility of potassium nitrate and sodium chloride at four temperatures; illustrative values'),
      n: 'This table gives grams of solute per hundred grams of water. The numbers are rounded and illustrative, in the shape textbooks draw. Notice how fast potassium nitrate changes, and how little sodium chloride does.',
    }),
    sl('diagram', 'The three curves', {
      b: 'Data are **illustrative** and rounded. Calcium sulphate is drawn on its own scale because so little dissolves.',
      v: V.curves,
      n: 'The red curve for potassium nitrate climbs steeply. The blue curve for sodium chloride is almost flat. Calcium sulphate dissolves so little that it needs its own small graph, and its curve even dips at higher temperatures.',
    }),
    sl('check', 'Quick check: reading a curve', {
      b: 'From the curves, the solubility of potassium nitrate at sixty degrees Celsius is closest to…',
      chk: 'chk-read',
      n: 'Go up from sixty on the temperature axis to the red curve, then across.',
    }),
    sl('concept', 'Three behaviours', {
      v: table(['Substance', 'Shape of curve', 'Meaning'], [['Potassium nitrate', 'Rises steeply', 'Solubility increases greatly with temperature'], ['Sodium chloride', 'Almost flat', 'Temperature has very little effect'], ['Calcium sulphate', 'Very low; slight rise then fall', 'Slightly soluble; falls a little in hot water']], 'Table of the three behaviours of solubility curves'),
      n: 'Three behaviours. Potassium nitrate becomes far more soluble when heated. Sodium chloride hardly changes. Calcium sulphate is only slightly soluble and gets a little less soluble in very hot water.',
    }),
    sl('check', 'Quick check: sodium chloride', {
      b: 'Which statement about sodium chloride is correct?',
      chk: 'chk-nacl',
      n: 'Look at the shape of the blue curve.',
    }),
    sl('example', 'Worked example 1: how much dissolves?', {
      b: `Potassium nitrate has a solubility of ${at(KNO3, 60)} g per 100 g of water at 60 °C. How much dissolves in ${N1_WATER} g of water to make a saturated solution, and what is the mass of that solution?`,
      ul: [`Step 1: ${at(KNO3, 60)} g saturate 100 g, so for ${N1_WATER} g: ${at(KNO3, 60)} × ${N1_WATER} ÷ 100 = ${N1_SOLUTE} g.`, `Step 2: mass of solution = water + solute = ${N1_WATER} + ${N1_SOLUTE} = ${N1_SOLUTION} g.`],
      v: table(['Water', 'Solute dissolved', 'Saturated solution'], [[`${N1_WATER} g`, `${N1_SOLUTE} g`, `${N1_SOLUTION} g`]], 'Worked table: fifty grams of water dissolves fifty-five grams and makes one hundred and five grams of solution'),
      n: `Scale the solubility to the water you have. One hundred grams of water takes ${W(at(KNO3, 60))} grams, so ${W(N1_WATER)} grams takes ${W(N1_SOLUTE)} grams. Then add the water and the solute to get the mass of the solution, ${W(N1_SOLUTION)} grams.`,
    }),
    sl('concept', 'Cooling a hot saturated solution', {
      b: 'Because potassium nitrate is much less soluble when cold, the **excess crystallises out** as the solution cools.',
      v: flow('LR', [['h', 'Saturated at a high temperature'], ['c', 'Cool the solution'], ['l', 'Solubility falls'], ['x', 'Excess crystallises'], ['f', 'Filter off the crystals']], [['h', 'c'], ['c', 'l'], ['l', 'x'], ['x', 'f']], 'Flow from a hot saturated solution, cooling, lower solubility, crystals forming and filtering'),
      n: 'A hot saturated solution of potassium nitrate holds a lot. As it cools, the solubility falls, so the solution can no longer hold it all. The extra comes out as crystals, which you can filter off.',
    }),
    sl('example', 'Worked example 2: crystals on cooling', {
      b: `A saturated solution is made with ${N2_WATER} g of water at 80 °C and cooled to 20 °C. (Solubility of potassium nitrate: ${at(KNO3, 80)} g at 80 °C and ${at(KNO3, 20)} g at 20 °C per 100 g of water.)`,
      ul: [`Step 1: at 80 °C, ${N2_WATER} g of water holds ${at(KNO3, 80)} × ${N2_WATER} ÷ 100 = ${N2_HOT} g.`, `Step 2: at 20 °C it can hold only ${at(KNO3, 20)} × ${N2_WATER} ÷ 100 = ${N2_COLD} g.`, `Step 3: crystals formed = ${N2_HOT} − ${N2_COLD} = ${N2_CRYST} g.`],
      v: table(['Temperature', 'Dissolved in the water'], [['80 °C', `${N2_HOT} g`], ['20 °C', `${N2_COLD} g`], ['Crystals formed', `${N2_CRYST} g`]], 'Worked table: three hundred and thirty-eight grams at eighty degrees, sixty-four at twenty, so two hundred and seventy-four grams of crystals'),
      n: `Find what the water holds at each temperature, then subtract. At the higher temperature it holds ${W(N2_HOT)} grams. At the lower temperature it holds only ${W(N2_COLD)} grams. The difference, ${W(N2_CRYST)} grams, comes out as crystals.`,
    }),
    sl('check', 'Quick check: why crystals appear', {
      b: 'Why do crystals of potassium nitrate form when its hot saturated solution cools?',
      chk: 'chk-cool',
      n: 'What happens to the solubility as the temperature falls?',
    }),
    sl('example', 'Worked example 3: saturated or not?', {
      b: `${N5_SOLUTE} g of potassium nitrate is stirred into ${N5_WATER} g of water at 40 °C. (Solubility at 40 °C: ${at(KNO3, 40)} g per 100 g of water.)`,
      ul: [`Step 1: the most that dissolves in ${N5_WATER} g of water = ${at(KNO3, 40)} × ${N5_WATER} ÷ 100 = ${N5_CAN} g.`, `Step 2: ${N5_SOLUTE} g is more than ${N5_CAN} g, so the solution is **saturated**.`, `Step 3: undissolved solid = ${N5_SOLUTE} − ${N5_CAN} = ${N5_LEFT} g.`],
      v: table(['Added', 'Can dissolve', 'Left undissolved'], [[`${N5_SOLUTE} g`, `${N5_CAN} g`, `${N5_LEFT} g`]], 'Worked table: forty grams added, thirty-two grams dissolve, eight grams left'),
      n: `Work out the most the water can hold. It is ${W(N5_CAN)} grams. You added ${W(N5_SOLUTE)}, which is more, so the solution is saturated and ${W(N5_LEFT)} grams stays undissolved at the bottom.`,
    }),
    sl('concept', 'Separating two salts by cooling', {
      b: 'Cool a hot saturated mixture of potassium nitrate and sodium chloride. Mostly **potassium nitrate** crystallises, because sodium chloride changes so little with temperature.',
      v: table(['100 g of water, 60 °C to 20 °C', 'Crystallises out'], [['Potassium nitrate', `${N7_KNO3_OUT} g`], ['Sodium chloride', `${N7_NACL_OUT} g`]], 'Table of the mass of each salt that crystallises from one hundred grams of water on cooling from sixty to twenty degrees'),
      n: `The two curves behave very differently. On cooling from sixty to twenty degrees, about ${W(N7_KNO3_OUT)} grams of potassium nitrate come out of a hundred grams of water, but only about ${W(N7_NACL_OUT)} gram of sodium chloride. Cooling separates them.`,
    }),
    sl('check', 'Quick check: calcium sulphate', {
      b: 'True or false: calcium sulphate is highly soluble and its solubility rises steeply with temperature.',
      chk: 'chk-caso4-tf',
      n: 'Why did it need its own small graph?',
    }),
    sl('summary', 'Summary', {
      ul: ['Solubility is grams of solute per 100 g of water at a stated temperature.', 'Potassium nitrate: steep rise. Sodium chloride: nearly flat. Calcium sulphate: very low.', 'Solute in a mass of water = solubility × water ÷ 100.', 'Cooling a hot saturated solution of potassium nitrate makes crystals.'],
      v: table(['Quantity', 'Method'], [['Solute for a given water', 'Solubility × water ÷ 100'], ['Crystals on cooling', 'Held when hot minus held when cold']], 'Summary table of two calculation methods'),
      n: 'To recap. Read the curve at the stated temperature. Scale the solubility to your mass of water. To find crystals formed on cooling, subtract what the water holds when cold from what it held when hot.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Read the graph at the **exact temperature**; draw dotted lines to the axes.', 'Show **each step** and include the unit, g per 100 g of water.', 'Compare curves by **steepness**: say which one rises steeply and which hardly changes.', 'Note when a table or graph says its data are **illustrative**.'],
      n: 'Exam tips. Read the graph at the exact temperature and draw guide lines. Show every step of a calculation and keep the unit. Compare curves by steepness. And use the data you are given, not numbers you remember.',
    }),
  ],
});
