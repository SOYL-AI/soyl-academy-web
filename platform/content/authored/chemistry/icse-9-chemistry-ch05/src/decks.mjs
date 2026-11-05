// ICSE 9 Chemistry ch05 Water of Crystallisation, Efflorescence, Deliquescence and Drying Agents. Part 1 (t01), Part 2 (t02, t03).
import { sl, deck, table, flow, svgV, chem, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { HEAT, AIR, DRYGAS } from './svgs.mjs';
import * as K from './calc.mjs';

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
export const W = (n) => {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
  return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + W(n % 100) : '');
};

export const V = {
  heat: svgV(HEAT, 'A test tube of hydrated crystals heated in a clamp, with drops of water collecting near the mouth'),
  air: svgV(AIR, 'Washing soda crumbles, ferric chloride turns to solution, concentrated sulphuric acid gains water'),
  drygas: svgV(DRYGAS, 'A wash bottle of concentrated sulphuric acid and a quicklime tower for drying gases'),
};

export const deck1 = deck({
  part: 1,
  title: 'Water of Crystallisation — Part 1: Hydrates, anhydrous salts, heating hydrates and percentage of water',
  goals: [
    'Define water of crystallisation and write the formulae of the prescribed hydrated salts',
    'Name anhydrous salts and describe what happens when a hydrate is heated',
    'Calculate the percentage of water of crystallisation in a hydrated salt',
  ],
  slides: [
    sl('title', 'Water of Crystallisation', {
      b: 'Part 1 — water locked inside crystals, and what happens when it is driven out.',
      v: flow('LR', [['h', 'Blue crystals'], ['x', 'Heat'], ['a', 'White powder + water vapour']], [['h', 'x'], ['x', 'a']], 'Flow: blue crystals are heated and give a white powder and water vapour'),
      n: 'Blue crystals of copper sulphate look completely dry. Yet heat them gently and drops of water appear, while the crystals crumble to a white powder. The water was inside the crystals all along.',
    }),
    sl('concept', 'Hydrated salts', {
      b: '**Water of crystallisation** is the fixed number of water molecules that combine chemically with one formula unit of a salt when it crystallises from solution. A salt that has it is **hydrated**.',
      v: table(['Hydrated salt', 'Formula', 'Colour of crystals'], [['Copper sulphate pentahydrate (blue vitriol)', 'CuSO₄·5H₂O', 'Blue'], ['Ferrous sulphate heptahydrate (green vitriol)', 'FeSO₄·7H₂O', 'Pale green'], ['Sodium carbonate decahydrate (washing soda)', 'Na₂CO₃·10H₂O', 'Colourless'], ['Sodium sulphate decahydrate (Glauber\'s salt)', 'Na₂SO₄·10H₂O', 'Colourless']], 'Table of four hydrated salts with formulae and colours'),
      n: 'Each hydrate holds a fixed number of water molecules for every unit of the salt. Copper sulphate holds five, ferrous sulphate seven, and washing soda and Glauber salt ten each. The water is part of the crystal, not wet on the surface.',
    }),
    sl('concept', 'Anhydrous substances', {
      b: '**Anhydrous** means "without water". An anhydrous salt has **no water of crystallisation**, however it was dried.',
      v: table(['Anhydrous salt', 'Formula'], [['Sodium nitrate', 'NaNO₃'], ['Potassium chloride', 'KCl'], ['Lead chloride', 'PbCl₂'], ['Potassium sulphate', 'K₂SO₄']], 'Table of four anhydrous salts with formulae'),
      n: 'Some salts crystallise with no water at all. Sodium nitrate, potassium chloride, lead chloride and potassium sulphate are examples. Their crystals do not give water drops on heating.',
    }),
    sl('check', 'Quick check: hydrate or not', {
      b: 'Which of these salts has water of crystallisation?',
      chk: 'chk-hydrate',
      n: 'Look for the dot followed by a number of water molecules.',
    }),
    sl('diagram', 'Heating a hydrate', {
      b: 'Use a **hard glass** tube with its mouth **slightly downwards**, so that water formed does not run back onto the hot glass.',
      v: V.heat,
      n: 'Put a little of the crystals in a dry hard glass test tube. Clamp it with the mouth slightly downwards and heat gently. Water vapour leaves the crystals and condenses as drops on the cooler part of the tube. Tilting the mouth down stops the water running back and cracking the hot glass.',
    }),
    sl('concept', 'What you see on heating', {
      v: table(['Hydrate', 'Before', 'After heating'], [['Copper sulphate pentahydrate', 'Blue crystals', 'White powder; water drops condense'], ['Ferrous sulphate heptahydrate', 'Pale green crystals', 'Whitish powder; water drops condense'], ['Washing soda', 'Colourless crystals', 'White powder; water drops condense'], ['Glauber\'s salt', 'Colourless crystals', 'White powder; water drops condense']], 'Table of observations on heating four hydrates'),
      n: 'All four hydrates crumble to a powder on heating, and drops of water collect in the cooler part of the tube. Blue copper sulphate and pale green ferrous sulphate also lose their colour, because the colour belongs to the hydrated form.',
    }),
    sl('check', 'Quick check: the observation', {
      b: 'When blue crystals of hydrated copper sulphate are gently heated in a dry test tube, the residue is…',
      chk: 'chk-heat-obs',
      n: 'Think about what colour the crystals lose.',
    }),
    sl('example', 'Worked example 1: heating ferrous sulphate crystals', {
      b: 'A student heats pale green crystals of ferrous sulphate in a dry test tube. Write the balanced equation and state two observations.',
      ul: ['Step 1: the crystals lose all seven molecules of water of crystallisation.', 'Step 2: equation: $\\ce{FeSO4.7H2O ->[\\Delta] FeSO4 + 7H2O}$.', 'Step 3: observations: the pale green crystals crumble to a whitish powder, and drops of water collect on the cooler part of the tube.'],
      v: chem(r`FeSO4.7H2O ->[\Delta] FeSO4 + 7H2O`, 'Equation: ferrous sulphate heptahydrate on heating gives anhydrous ferrous sulphate and seven molecules of water', 'Heating ferrous sulphate crystals'),
      n: 'Write the hydrate on the left and the anhydrous salt and the water on the right. All seven water molecules leave, so the equation balances with seven waters. You would see pale green crystals crumbling to a whitish powder, with drops of water in the tube.',
    }),
    sl('concept', 'A test for water', {
      b: 'White **anhydrous copper sulphate** turns **blue** when water is added, and gets hot. The change can be reversed by heating.',
      v: chem(r`CuSO4.5H2O <=>[\Delta] CuSO4 + 5H2O`, 'Reversible change between blue hydrated copper sulphate and white anhydrous copper sulphate', 'Reversible change'),
      n: 'White anhydrous copper sulphate takes up water and turns blue again, giving out a little heat. Heating the blue crystals turns them white. This reversible change makes a handy test for the presence of water.',
    }),
    sl('example', 'Worked example 2: percentage of water in a hydrate', {
      b: `Calculate the percentage of water of crystallisation in FeSO₄·7H₂O. (Fe = ${K.A.Fe}, S = ${K.A.S}, O = ${K.A.O}, H = ${K.A.H})`,
      ul: [`Step 1: relative molecular mass of FeSO₄ = ${K.A.Fe} + ${K.A.S} + 4 × ${K.A.O} = ${K.FESO4}.`, `Step 2: seven water molecules = 7 × ${K.H2O} = ${K.W_FE}; the hydrate = ${K.FESO4} + ${K.W_FE} = ${K.FESO4_7}.`, `Step 3: percentage of water = ${K.W_FE} ÷ ${K.FESO4_7} × 100 = **${K.P_FE}%**.`],
      v: table(['Part', 'Mass'], [['FeSO₄', `${K.FESO4}`], ['7H₂O', `${K.W_FE}`], ['FeSO₄·7H₂O', `${K.FESO4_7}`], ['Water, per cent', `${K.P_FE}`]], 'Worked table: ferrous sulphate one hundred and fifty-two, water one hundred and twenty-six, hydrate two hundred and seventy-eight, water forty-five point three per cent'),
      n: `Find the mass of the anhydrous salt, then the mass of the water, and add them to get the hydrate. Water is ${W(K.W_FE)} out of ${W(K.FESO4_7)}. Divide and multiply by one hundred to get about forty-five per cent.`,
    }),
    sl('concept', 'Percentage of water in four hydrates', {
      v: table(['Hydrate', 'Mass of hydrate', 'Mass of water', 'Per cent of water'], [['CuSO₄·5H₂O', `${K.CUSO4_5}`, `${K.W_CU}`, `${K.P_CU}`], ['FeSO₄·7H₂O', `${K.FESO4_7}`, `${K.W_FE}`, `${K.P_FE}`], ['Na₂SO₄·10H₂O', `${K.NA2SO4_10}`, `${K.W_NA2SO4}`, `${K.P_NA2SO4}`], ['Na₂CO₃·10H₂O', `${K.NA2CO3_10}`, `${K.W_NA2CO3}`, `${K.P_NA2CO3}`]], 'Table of the relative mass of each hydrate, the mass of its water and the percentage of water'),
      n: 'Compare the four. Washing soda is nearly two thirds water by mass, while copper sulphate is only about a third. The more water molecules per formula unit, the greater the share, but the mass of the salt matters too.',
    }),
    sl('check', 'Quick check: a percentage', {
      b: `Atomic masses: Na = ${K.A.Na}, C = ${K.A.C}, O = ${K.A.O}, H = ${K.A.H}. The percentage of water in Na₂CO₃·10H₂O is…`,
      chk: 'chk-pct-num',
      n: 'Ten waters out of the whole hydrate. Divide the mass of the water by the mass of the hydrate.',
    }),
    sl('example', 'Worked example 3: mass of residue', {
      b: `Heating ${K.FE_MASS} g of FeSO₄·7H₂O drives off all the water. Find the mass of anhydrous FeSO₄ left.`,
      ul: [`Step 1: ${K.FESO4_7} g of hydrate gives ${K.FESO4} g of FeSO₄.`, `Step 2: ${K.FE_MASS} g gives ${K.FE_MASS} × ${K.FESO4} ÷ ${K.FESO4_7} = **${K.FE_ANH} g**.`, `Step 3: check: water lost = ${K.FE_MASS} − ${K.FE_ANH} = ${K.FE_LOSS} g.`],
      v: table(['Hydrate heated', 'Residue', 'Water lost'], [[`${K.FE_MASS} g`, `${K.FE_ANH} g`, `${K.FE_LOSS} g`]], 'Worked table: five point five six grams of hydrate leaves three point zero four grams of residue and loses two point five two grams of water'),
      n: `Use the ratio of the masses. The anhydrous salt is ${W(K.FESO4)} parts in every ${W(K.FESO4_7)} parts of hydrate. Scale that to your sample to get the residue, and subtract from the starting mass to check the water lost.`,
    }),
    sl('check', 'Quick check: anhydrous crystals', {
      b: 'True or false: crystals of anhydrous potassium chloride contain water of crystallisation.',
      chk: 'chk-anhyd-tf',
      n: 'What does anhydrous mean?',
    }),
    sl('summary', 'Summary', {
      ul: ['Water of crystallisation: fixed water molecules combined with a salt in its crystals.', 'Hydrates: CuSO₄·5H₂O, FeSO₄·7H₂O, Na₂CO₃·10H₂O, Na₂SO₄·10H₂O. Anhydrous: NaNO₃, KCl, PbCl₂, K₂SO₄.', 'Heating a hydrate: powder, loss of colour in coloured hydrates, drops of water.', 'Percentage of water = mass of water ÷ mass of hydrate × 100.'],
      v: table(['Hydrate', 'Colour change on heating'], [['CuSO₄·5H₂O', 'Blue to white'], ['FeSO₄·7H₂O', 'Pale green to whitish'], ['Na₂CO₃·10H₂O', 'Colourless to white powder']], 'Summary table of colour changes on heating hydrates'),
      n: 'To recap. Hydrated salts hold a fixed number of water molecules inside their crystals. Heating drives the water off, leaving an anhydrous powder and drops of water in the tube. The share of water comes from the relative molecular masses.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Write the **dot** and the **number** in a hydrate formula, and balance the water in the equation.', 'Name the **colour change** and mention **drops of water** in a heating observation.', 'Show **each mass** in a percentage calculation and state the atomic masses used.', 'Do not call a dried salt anhydrous unless it never had water of crystallisation or all of it has been removed.'],
      n: 'Exam tips. Write the dot and the number in a hydrate formula and balance the water. Describe the colour change and the drops of water when heating. Show every mass in a percentage calculation. And use the word anhydrous with care.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Water of Crystallisation — Part 2: Efflorescence, deliquescence, hygroscopy, drying and dehydrating agents',
  goals: [
    'Distinguish efflorescent, deliquescent and hygroscopic substances with examples',
    'Distinguish a drying agent from a dehydrating agent using quicklime and concentrated sulphuric acid',
    'Choose a suitable drying agent for a gas',
  ],
  slides: [
    sl('title', 'Left in the Open Air', {
      b: 'Part 2 — substances that lose or gain water when exposed to air, and the agents that remove water.',
      v: flow('LR', [['a', 'Open air'], ['l', 'Loses water'], ['g', 'Gains water']], [['a', 'l'], ['a', 'g']], 'Flow: in the open air a substance may lose water or gain water'),
      n: 'Leave a jar of washing soda crystals open and they crumble. Leave ferric chloride open and it turns into a puddle. Leave concentrated sulphuric acid open and it grows. Air carries water vapour, and different substances treat it differently.',
    }),
    sl('concept', 'Efflorescence, deliquescence, hygroscopy', {
      b: 'All three depend on **moisture in the air**.',
      v: table(['Term', 'What happens', 'Examples'], [['Efflorescence', 'A hydrate loses its water of crystallisation to dry air and crumbles to powder', 'Washing soda, Glauber\'s salt'], ['Deliquescence', 'A solid absorbs moisture from the air and dissolves in it to form a solution', 'Ferric chloride, sodium hydroxide, anhydrous calcium chloride'], ['Hygroscopy', 'A substance absorbs moisture from the air, usually without dissolving', 'Quicklime, concentrated sulphuric acid']], 'Table defining efflorescence, deliquescence and hygroscopy with examples'),
      n: 'Efflorescence is loss of water of crystallisation. Deliquescence is taking in so much moisture that the solid dissolves. Hygroscopy is taking in moisture from the air without becoming a solution. Notice that the first loses water while the others gain it.',
    }),
    sl('diagram', 'Three dishes in the open air', {
      b: 'Efflorescence **loses** water; deliquescence and hygroscopy **gain** water.',
      v: V.air,
      n: 'Washing soda crystals lose water and crumble to a powder. Ferric chloride takes in moisture until it dissolves in it. Concentrated sulphuric acid takes in water vapour, so its level rises and it becomes more dilute.',
    }),
    sl('check', 'Quick check: crumbling crystals', {
      b: 'Colourless crystals left in an open dish crumble to a white powder with no gain in mass. The change is…',
      chk: 'chk-eff',
      n: 'Is water lost or gained?',
    }),
    sl('example', 'Worked example 1: efflorescence of washing soda', {
      b: `${K.EF_SMALL} g of washing soda crystals lose nine of their ten molecules of water on standing in dry air. (Na = ${K.A.Na}, C = ${K.A.C}, O = ${K.A.O}, H = ${K.A.H}.) Find the mass of the powder left.`,
      ul: ['Step 1: equation: $\\ce{Na2CO3.10H2O -> Na2CO3.H2O + 9H2O}$.', `Step 2: Mr of the crystals = ${K.NA2CO3_10}; Mr of the powder = ${K.NA2CO3} + ${K.H2O} = ${K.NA2CO3_1}.`, `Step 3: powder = ${K.EF_SMALL} × ${K.NA2CO3_1} ÷ ${K.NA2CO3_10} = **${K.EF_SMALL_LEFT} g**; water lost = ${K.EF_SMALL} − ${K.EF_SMALL_LEFT} = ${K.EF_SMALL_LOST} g.`],
      v: chem(r`Na2CO3.10H2O -> Na2CO3.H2O + 9H2O`, 'Equation: washing soda loses nine molecules of water to give the monohydrate', 'Efflorescence of washing soda'),
      n: `Write the equation first. The crystals keep one molecule of water and lose nine. The powder is ${W(K.NA2CO3_1)} parts out of every ${W(K.NA2CO3_10)} parts of crystals, so scale that to your sample to find the mass of the powder.`,
    }),
    sl('check', 'Quick check: a puddle', {
      b: 'A solid left in the open air gains mass and finally forms a solution. This behaviour is called…',
      chk: 'chk-delq',
      n: 'It takes in water until it dissolves in it.',
    }),
    sl('concept', 'Telling them apart', {
      b: 'Ask two questions: does the **mass rise or fall**, and does the substance **dissolve**?',
      v: flow('TB', [['q', 'Left in open air'], ['f', 'Mass falls: loses water of crystallisation'], ['r', 'Mass rises'], ['e', 'Efflorescent'], ['d', 'Becomes a solution: deliquescent'], ['h', 'Stays solid or liquid: hygroscopic']], [['q', 'f'], ['q', 'r'], ['f', 'e'], ['r', 'd'], ['r', 'h']], 'Flow chart separating efflorescent, deliquescent and hygroscopic substances by change in mass and whether the substance dissolves'),
      n: 'Use the flow chart. If the mass falls and the crystals crumble, the substance is efflorescent. If the mass rises and a solution forms, it is deliquescent. If the mass rises with no solution, it is hygroscopic.',
    }),
    sl('concept', 'Drying agent or dehydrating agent?', {
      b: 'A **drying agent** takes up water or water vapour from a substance **without reacting with it**. A **dehydrating agent** removes **water chemically combined** in a compound, or even the elements of water (hydrogen and oxygen in the ratio two to one).',
      v: table(['', 'Drying agent', 'Dehydrating agent'], [['Removes', 'Moisture mixed with a gas or a liquid', 'Combined water, or H and O in the ratio 2 to 1'], ['Changes the substance dried?', 'No', 'Yes, forms a new substance'], ['Examples', 'Quicklime (for ammonia), concentrated sulphuric acid (for hydrogen)', 'Concentrated sulphuric acid']], 'Table comparing drying agents and dehydrating agents'),
      n: 'A drying agent only takes away moisture, leaving the dried substance unchanged. A dehydrating agent pulls out water that is part of a compound, so a new substance is formed. Concentrated sulphuric acid can do both, but quicklime is only a drying agent.',
    }),
    sl('diagram', 'Drying a gas', {
      b: 'Match the agent to the gas: a **neutral or acidic** gas through **concentrated sulphuric acid**; **ammonia** through **quicklime**.',
      v: V.drygas,
      n: 'In the wash bottle the moist gas bubbles through concentrated sulphuric acid, which keeps the water. This suits hydrogen, chlorine and hydrogen chloride. Ammonia reacts with the acid, so it is passed through a tower of quicklime instead.',
    }),
    sl('check', 'Quick check: drying ammonia', {
      b: 'Which substance is used to dry ammonia gas?',
      chk: 'chk-dry-nh3',
      n: 'Ammonia is a base. Which drying agent will not react with it?',
    }),
    sl('example', 'Worked example 2: choose the drying agent', {
      b: 'Moist hydrogen and moist ammonia are each to be dried. Choose an agent for each and give a reason.',
      ul: ['Step 1: hydrogen does not react with concentrated sulphuric acid, so the acid in a wash bottle is suitable.', 'Step 2: ammonia reacts with the acid: $\\ce{2NH3 + H2SO4 -> (NH4)2SO4}$, so the acid is unsuitable.', 'Step 3: ammonia does not react with quicklime, so it is dried over lumps of quicklime.'],
      v: table(['Gas', 'Drying agent', 'Reason'], [['Hydrogen', 'Concentrated sulphuric acid', 'No reaction'], ['Ammonia', 'Quicklime', 'Acid would react with the gas']], 'Worked table choosing a drying agent for hydrogen and for ammonia'),
      n: 'A drying agent must not react with the gas it dries. Hydrogen does not react with the acid, so the acid is fine. Ammonia, a base, reacts with the acid to make a salt, so quicklime is used for it.',
    }),
    sl('concept', 'Concentrated sulphuric acid as a dehydrating agent', {
      b: 'It removes **combined water**: blue crystals of copper sulphate turn **white**, and sugar is **charred to black carbon**.',
      v: chem(r`C12H22O11 ->[\text{conc. H2SO4}] 12C + 11H2O`, 'Equation: concentrated sulphuric acid removes the elements of water from sugar and leaves carbon', 'Dehydration of sugar'),
      n: 'The acid pulls out the water that is built into a compound. Blue crystals lose their water of crystallisation and turn white. Sugar loses hydrogen and oxygen in the ratio of water and is left as black carbon. This is dehydration, not mere drying.',
    }),
    sl('check', 'Quick check: dehydrating action', {
      b: 'True or false: quicklime is a dehydrating agent because it chars sugar.',
      chk: 'chk-dehyd-tf',
      n: 'Which substance chars sugar?',
    }),
    sl('summary', 'Summary', {
      ul: ['Efflorescent: loses water of crystallisation (washing soda). Deliquescent: absorbs moisture and dissolves (ferric chloride). Hygroscopic: absorbs moisture (quicklime, concentrated sulphuric acid).', 'Drying agent: removes moisture, no reaction. Dehydrating agent: removes combined water.', 'Dry ammonia with quicklime; dry hydrogen with concentrated sulphuric acid.'],
      v: table(['Term', 'Example'], [['Efflorescent', 'Washing soda'], ['Deliquescent', 'Ferric chloride'], ['Hygroscopic', 'Quicklime'], ['Dehydrating agent', 'Concentrated sulphuric acid']], 'Summary table of terms and examples'),
      n: 'To recap. Efflorescent substances lose water, deliquescent ones dissolve in water from the air, and hygroscopic ones take it in. A drying agent removes moisture without a reaction, while a dehydrating agent removes combined water.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Efflorescence is a **loss** of water; the other two are **gains**.', 'Give a **named example** with each definition.', 'For drying gases, say why the agent does **not react** with the gas.', 'Quote the **observation** for dehydration: blue to white, or sugar to black.'],
      n: 'Exam tips. Remember that efflorescence is a loss of water and the other two are gains. Give an example with each definition. For a drying agent, say it does not react with the gas. And describe the colour change for dehydration.',
    }),
  ],
});
