// ICSE 9 Chemistry ch03 Chemical Changes and Reactions — Part 1 (t01–t02: direct combination, decomposition by heat,
// light and electricity), Part 2 (t03–t05: displacement, double decomposition and energy changes).
import { sl, deck, table, flow, chem, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { ELECTROLYSIS, ACTIVITY, PPT } from './svgs.mjs';
import { TEMPS } from './calc.mjs';

export const V = {
  elec: svgV(ELECTROLYSIS, 'Electrolysis of acidified water, with hydrogen and oxygen collected in two tubes'),
  activity: svgV(ACTIVITY, 'The activity series of metals from potassium to gold with hydrogen as a reference'),
  ppt: svgV(PPT, 'Three test tubes holding a white, a white curdy and a yellow precipitate'),
};

export const deck1 = deck({
  part: 1,
  title: 'Chemical Changes and Reactions — Part 1: Direct combination and decomposition',
  goals: [
    'Identify direct combination reactions and write balanced equations for examples',
    'Write balanced equations for decomposition by heat, light and electricity',
    'Describe the observations that go with each reaction',
  ],
  slides: [
    sl('title', 'Joining and splitting', {
      b: 'Part 1 — in a **direct combination** two substances join; in a **decomposition** one substance splits. Each is a different kind of chemical change.',
      v: flow('LR', [['a', 'A + B'], ['c', 'Combination'], ['ab', 'AB'], ['d', 'Decomposition'], ['ab2', 'A + B']], [['a', 'c'], ['c', 'ab'], ['ab', 'd'], ['d', 'ab2']], 'Flow: A and B combine to give AB, which can decompose again into A and B'),
      n: 'Chemical changes can be sorted by what happens to the substances. Sometimes two substances join to make one new substance. Sometimes one substance splits up into simpler ones. We start with joining and then look at splitting.',
    }),
    sl('concept', 'Direct combination', {
      b: 'In a **direct combination** reaction two or more substances unite to form **one** product.',
      v: table(['Reactants', 'Product', 'Condition', 'What is seen'], [['Iron + sulphur', 'Iron(II) sulphide', 'Heat', 'Red glow; black solid that a magnet does not attract'], ['Magnesium + oxygen', 'Magnesium oxide', 'Heat', 'Dazzling white flame; white ash'], ['Carbon + oxygen', 'Carbon dioxide', 'Heat', 'Glowing; colourless gas'], ['Hydrogen + chlorine', 'Hydrogen chloride', 'Sunlight', 'Misty fumes in moist air']], 'Table of four direct combination reactions with conditions and observations'),
      n: 'In a direct combination, the reactants unite to give a single product. Heated iron and sulphur glow red and make a black solid which a magnet cannot pick up. Magnesium burns with a dazzling white flame and leaves white ash.',
    }),
    sl('concept', 'Equations for direct combination', {
      v: table(['Reaction', 'Balanced equation'], [['Iron and sulphur', 'Fe + S → FeS'], ['Magnesium and oxygen', '2Mg + O₂ → 2MgO'], ['Carbon and oxygen', 'C + O₂ → CO₂'], ['Hydrogen and chlorine', 'H₂ + Cl₂ → 2HCl'], ['Nitrogen and oxygen (electric spark)', 'N₂ + O₂ → 2NO']], 'Table of five balanced equations for direct combination reactions'),
      n: 'Here are balanced equations for five direct combinations. Notice that the number of atoms of each kind is the same on both sides. In the last one, an electric spark makes nitrogen and oxygen of the air join to form nitrogen monoxide.',
    }),
    sl('concept', 'Compounds can combine too', {
      b: 'The reactants need not be elements. A **compound** can combine with another compound or element to give one product.',
      v: chem('CaO + H2O -> Ca(OH)2', 'Calcium oxide plus water gives calcium hydroxide', 'Quicklime and water: much heat is given out.'),
      n: 'Quicklime joins with water to form slaked lime. The mixture hisses, turns hot and may give off steam. Another example is ammonia gas meeting hydrogen chloride gas, which gives dense white fumes of ammonium chloride.',
    }),
    sl('check', 'Quick check: direct combination', {
      b: 'Look at the number of products.',
      v: chem('Zn + S -> ZnS', 'Zinc plus sulphur gives zinc sulphide'),
      chk: 'chk-comb',
      n: 'Zinc powder and sulphur are heated and form zinc sulphide. Which kind of reaction is this?',
    }),
    sl('concept', 'Decomposition', {
      b: 'In a **decomposition** reaction one compound splits into two or more simpler substances. Energy is needed: **heat**, **light** or **electricity**.',
      v: flow('TB', [['d', 'Decomposition'], ['h', 'Heat: thermal decomposition'], ['l', 'Light: photo decomposition'], ['e', 'Electricity: electrolytic decomposition']], [['d', 'h'], ['d', 'l'], ['d', 'e']], 'Flow from decomposition to heat, light and electricity'),
      n: 'Decomposition is the opposite of combination. One compound is split into simpler substances. It never happens without energy, which may come as heat, as light, or as an electric current.',
    }),
    sl('concept', 'Decomposition by heat', {
      v: table(['Substance heated', 'Products', 'What is seen'], [['Copper(II) carbonate', 'Copper(II) oxide + carbon dioxide', 'Green powder turns black; gas turns lime water milky'], ['Zinc carbonate', 'Zinc oxide + carbon dioxide', 'White solid; residue yellow when hot, white when cold'], ['Zinc nitrate', 'Zinc oxide + nitrogen dioxide + oxygen', 'Brown fumes; residue yellow when hot, white when cold'], ['Potassium chlorate (with manganese dioxide)', 'Potassium chloride + oxygen', 'Gas that relights a glowing splint']], 'Table of four thermal decomposition reactions with products and observations'),
      n: 'Heating can decompose carbonates and nitrates. Green copper carbonate turns black and gives carbon dioxide. Zinc nitrate gives brown fumes of nitrogen dioxide, and a residue that is yellow when hot and white when cold. Potassium chlorate gives oxygen.',
    }),
    sl('example', 'Worked example 1: heating copper carbonate', {
      b: r`**Problem.** Green copper(II) carbonate is heated in a dry test tube. Write the balanced equation and state two observations.

**Step 1.** Products: black copper(II) oxide and carbon dioxide.

**Step 2.** Equation: $\ce{CuCO3 ->[\Delta] CuO + CO2}$ (Cu, C and O balance as they are).

**Step 3.** Observations: the green powder turns **black**, and the gas turns lime water **milky**.`,
      v: chem(r`CuCO3 ->[\Delta] CuO + CO2`, 'Copper carbonate on heating gives copper oxide and carbon dioxide', 'One reactant, two products.'),
      n: 'Heat splits copper carbonate into black copper oxide and carbon dioxide gas. Count the atoms: one copper, one carbon and three oxygen on each side, so the equation is already balanced. You see a colour change from green to black, and the gas turns lime water milky.',
    }),
    sl('concept', 'Decomposition by light', {
      b: 'Silver chloride and silver bromide split in **sunlight** to give silver and a halogen. This is why they are stored in dark bottles and used on photographic film.',
      v: chem('2AgCl ->[light] 2Ag + Cl2', 'Silver chloride in light gives silver and chlorine', 'White silver chloride turns grey as silver forms.'),
      n: 'Some compounds are sensitive to light. White silver chloride turns grey in sunlight because tiny particles of silver form, and chlorine is given off. Silver bromide does the same, which is the basis of black and white photography.',
    }),
    sl('diagram', 'Decomposition by electricity', {
      b: 'Passing a current through **acidified water** splits it into hydrogen at the **cathode** and oxygen at the **anode**, in the volume ratio **2 : 1**.',
      v: V.elec,
      n: 'In this set-up, an electric current splits water into its elements. Hydrogen collects over the negative electrode and oxygen over the positive electrode. There is twice as much hydrogen as oxygen by volume. A little acid makes the water conduct.',
    }),
    sl('check', 'Quick check: electrolysis', {
      b: 'Look at the volumes in the two tubes.',
      v: chem(r`2H2O ->[electricity] 2H2 + O2`, 'Water gives hydrogen and oxygen on passing electricity'),
      chk: 'chk-electro',
      n: 'In the electrolysis of acidified water, which gas is collected in the larger volume, and at which electrode?',
    }),
    sl('example', 'Worked example 2: heating zinc nitrate', {
      b: r`**Problem.** Balance $\ce{Zn(NO3)2 -> ZnO + NO2 + O2}$ and state what is seen on heating.

**Step 1.** Oxygen is the awkward element, so try $2\ce{Zn(NO3)2}$ on the left: Zn 2, N 4, O 12.

**Step 2.** Right side: $2\ce{ZnO}$, $4\ce{NO2}$ and $\ce{O2}$: Zn 2, N 4, O $2 + 8 + 2 = 12$.

**Step 3.** Observations: brown fumes; the residue is yellow when hot and white when cold.`,
      v: chem(r`2Zn(NO3)2 ->[\Delta] 2ZnO + 4NO2 + O2`, 'Two zinc nitrate give two zinc oxide, four nitrogen dioxide and one oxygen', 'Zn 2 = 2; N 4 = 4; O 12 = 12.'),
      n: 'Start with zinc nitrate, which has two nitrate groups, and balance with two units. That gives two zinc, four nitrogen and twelve oxygen on the left. On the right, two zinc oxide, four nitrogen dioxide and one oxygen molecule also give twelve oxygen atoms. Brown fumes are seen.',
    }),
    sl('check', 'Quick check: heat decomposition', {
      b: 'Think about what is left in the tube.',
      v: table(['Substance heated', 'Seen'], [['Zinc carbonate', 'White solid, yellow when hot']], 'Observation when zinc carbonate is heated'),
      chk: 'chk-thermal',
      n: 'Zinc carbonate is heated strongly. Which statement describes what is observed and what is formed?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Direct combination: two or more substances form one product (Fe + S → FeS).',
        'Decomposition: one compound splits into simpler substances.',
        'Heat: carbonates and nitrates; light: silver chloride and bromide; electricity: acidified water.',
        'Always balance the equation and note the colour changes and gases.',
      ],
      v: table(['Type', 'Example'], [['Combination', '2Mg + O₂ → 2MgO'], ['Thermal decomposition', 'CuCO₃ → CuO + CO₂'], ['Photo decomposition', '2AgCl → 2Ag + Cl₂'], ['Electrolytic decomposition', '2H₂O → 2H₂ + O₂']], 'Summary table of four reaction types and one example each'),
      n: 'To sum up Part 1. In combination, substances join. In decomposition, a compound splits, using heat, light or electricity. Examples are magnesium burning, copper carbonate heated, silver chloride in sunlight and water split by electricity.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Say what energy is used: heat, light or electricity.',
        'Write colours with the substance: green copper carbonate turns black.',
        'In electrolysis of water, hydrogen is twice the volume of oxygen.',
        'Balance the equation and check each element.',
      ],
      v: table(['Slip', 'Fix'], [['Calling heating copper carbonate a combination', 'It splits: a decomposition'], ['Writing the water test gas as oxygen at the cathode', 'Hydrogen is at the cathode'], ['Forgetting the delta sign', 'Write the condition above the arrow']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Exam tips. Name the form of energy. Give colours with the substances. Remember that hydrogen has twice the volume of oxygen in electrolysis. And balance every equation you write.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Chemical Changes and Reactions — Part 2: Displacement, double decomposition and energy changes',
  goals: [
    'Predict whether a metal will displace another metal from its salt solution',
    'Write balanced equations for the three prescribed double displacement reactions and state the colour of each precipitate',
    'Classify reactions as exothermic or endothermic and give examples involving heat, light and electricity',
  ],
  slides: [
    sl('title', 'Swapping partners', {
      b: 'Part 2 — in a **displacement** reaction one element pushes another out of a compound. In a **double displacement** two compounds exchange partners. Finally we ask where the energy goes.',
      v: flow('LR', [['a', 'A + BC'], ['b', 'Displacement'], ['c', 'AC + B']], [['a', 'b'], ['b', 'c']], 'Flow: A plus BC gives AC plus B in a displacement reaction'),
      n: 'Some metals are more eager to react than others. A more reactive metal can push a less reactive metal out of its salt. We will use the order of reactivity to predict this, then look at reactions where two salts swap partners and form a precipitate.',
    }),
    sl('diagram', 'The activity series', {
      b: 'A metal **higher** in the series displaces any metal **lower** than itself from a solution of its salt.',
      v: V.activity,
      n: 'Here the metals are listed from most to least reactive. Potassium is at the top and gold at the bottom. Hydrogen is added as a reference point. A metal can push out any metal below it, but not one above it.',
    }),
    sl('example', 'Worked example 1: zinc in copper sulphate', {
      b: r`**Problem.** A piece of zinc is placed in blue copper(II) sulphate solution. Predict the reaction, write the equation and state the observations.

**Step 1.** Zinc is above copper in the series, so zinc **displaces** copper.

**Step 2.** $\ce{Zn + CuSO4 -> ZnSO4 + Cu}$.

**Step 3.** The blue colour **fades** and a reddish-brown deposit of **copper** forms on the zinc.`,
      v: chem('Zn + CuSO4 -> ZnSO4 + Cu', 'Zinc plus copper sulphate gives zinc sulphate plus copper', 'Zinc is more reactive than copper.'),
      n: 'Zinc is more reactive than copper, so it pushes copper out of the solution. The blue colour of the copper sulphate fades, because colourless zinc sulphate is forming, and reddish brown copper settles on the zinc.',
    }),
    sl('concept', 'Will it react?', {
      v: table(['Metal', 'Salt solution', 'Reaction?', 'Reason'], [['Iron', 'Copper sulphate', 'Yes', 'Iron is above copper'], ['Copper', 'Zinc sulphate', 'No', 'Copper is below zinc'], ['Zinc', 'Lead nitrate', 'Yes', 'Zinc is above lead'], ['Silver', 'Copper sulphate', 'No', 'Silver is below copper']], 'Table predicting four displacement reactions from the activity series'),
      n: 'Always compare positions. Iron is above copper, so it displaces copper. Copper is below zinc, so nothing happens. Zinc is above lead, so zinc pushes out lead. Silver is below copper, so there is no reaction.',
    }),
    sl('check', 'Quick check: displacement', {
      b: 'Use the activity series.',
      v: table(['Pair', 'Question'], [['Magnesium and iron(II) sulphate', 'Does it react?'], ['Copper and zinc sulphate', 'Does it react?']], 'Two metal and salt pairs to predict'),
      chk: 'chk-displace',
      n: 'A strip of magnesium is placed in iron sulphate solution. What happens?',
    }),
    sl('example', 'Worked example 2: copper wire in silver nitrate', {
      b: r`**Problem.** A coil of copper wire is hung in colourless silver nitrate solution. What is seen?

**Step 1.** Copper is above silver, so copper displaces silver.

**Step 2.** $\ce{Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag}$.

**Step 3.** Shiny grey **silver** crystals grow on the wire and the solution turns **blue**.`,
      v: chem('Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag', 'Copper plus two silver nitrate gives copper nitrate plus two silver', 'Two silver atoms are displaced.'),
      n: 'Copper is above silver, so it displaces silver. Shiny silver crystals form on the copper wire. The solution slowly turns blue, because copper nitrate is blue.',
    }),
    sl('concept', 'Double displacement and precipitates', {
      b: 'In **double displacement** (double decomposition) the positive parts of two compounds **exchange** partners: $\\ce{AB + CD -> AD + CB}$. One product is often an insoluble solid, a **precipitate**.',
      v: flow('LR', [['a', 'Solution 1: A⁺ B⁻'], ['b', 'Solution 2: C⁺ D⁻'], ['c', 'New pairs A⁺ D⁻ and C⁺ B⁻'], ['d', 'Insoluble pair settles: precipitate']], [['a', 'c'], ['b', 'c'], ['c', 'd']], 'Flow showing two solutions exchanging partners to give a precipitate'),
      n: 'Two solutions are mixed. The positive and negative parts swap partners. If one of the new pairs does not dissolve, it appears as solid particles, called a precipitate, and the liquid turns cloudy.',
    }),
    sl('concept', 'The three prescribed reactions', {
      v: table(['Mix', 'Precipitate', 'Colour'], [['Sodium sulphate + barium chloride', 'Barium sulphate', 'White'], ['Silver nitrate + sodium chloride', 'Silver chloride', 'White, curdy'], ['Lead nitrate + potassium iodide', 'Lead iodide', 'Yellow']], 'Table of the three double displacement reactions and the colours of the precipitates'),
      n: 'These are the three reactions to remember. Sodium sulphate with barium chloride gives a white precipitate of barium sulphate. Silver nitrate with sodium chloride gives a white, curdy precipitate of silver chloride. Lead nitrate with potassium iodide gives a bright yellow precipitate of lead iodide.',
    }),
    sl('diagram', 'Three precipitates side by side', {
      v: V.ppt,
      n: 'Here are the three test tubes. In the first two the solid is white, though the silver chloride looks curdy, like cheese. The third tube holds the bright yellow lead iodide. The colour is the clue to the identity of the precipitate.',
    }),
    sl('check', 'Quick check: precipitate colours', {
      b: 'Match the reaction to the colour.',
      v: table(['Reaction', 'Colour?'], [['Lead nitrate + potassium iodide', '?']], 'Reaction with the colour of its precipitate to find'),
      chk: 'chk-ppt',
      n: 'Lead nitrate solution is added to potassium iodide solution. What do you see?',
    }),
    sl('example', 'Worked example 3: silver nitrate and sodium chloride', {
      b: r`**Problem.** Write the balanced equation for silver nitrate with sodium chloride and give the colour of the precipitate.

**Step 1.** Exchange partners: silver goes with chloride, sodium with nitrate.

**Step 2.** $\ce{AgNO3 + NaCl -> AgCl + NaNO3}$. Ag 1 and 1; N 1 and 1; O 3 and 3; Na 1 and 1; Cl 1 and 1.

**Step 3.** Silver chloride is a **white, curdy precipitate**. It slowly turns grey in sunlight.`,
      v: chem(r`AgNO3 + NaCl -> AgCl v + NaNO3`, 'Silver nitrate plus sodium chloride gives silver chloride precipitate plus sodium nitrate', 'The downward arrow marks the precipitate.'),
      n: 'Swap the partners. Silver joins chloride to make silver chloride, and sodium joins nitrate to make sodium nitrate. The equation is already balanced. Silver chloride is the white curdy solid. It turns grey in sunlight, as we saw in Part 1.',
    }),
    sl('check', 'Quick check: balancing a double displacement', {
      b: 'Count the chlorine atoms.',
      v: chem('Na2SO4 + BaCl2 -> BaSO4 + 2NaCl', 'Sodium sulphate plus barium chloride gives barium sulphate plus two sodium chloride'),
      chk: 'chk-dd',
      n: 'Why is a two needed in front of sodium chloride in this equation?',
    }),
    sl('concept', 'Energy changes: exothermic and endothermic', {
      b: 'An **exothermic** reaction gives out energy to the surroundings. An **endothermic** reaction takes energy in. The energy may be heat, light or electricity.',
      v: table(['Form of energy', 'Evolved (exothermic)', 'Absorbed (endothermic)'], [['Heat', 'Burning carbon; quicklime with water', 'Heating calcium carbonate'], ['Light', 'Magnesium burning with a white flame', 'Photosynthesis; silver chloride in sunlight'], ['Electricity', 'A cell, such as a zinc and copper cell', 'Electrolysis of water']], 'Table of examples of reactions that give out or take in heat, light and electricity'),
      n: 'Exothermic reactions give out energy. Burning carbon gives heat, burning magnesium gives dazzling light, and a cell makes electricity. Endothermic reactions take energy in. Heating calcium carbonate needs heat, photosynthesis needs light, and electrolysis needs electricity.',
    }),
    sl('example', 'Worked example 4: classify from temperature data', {
      b: `**Problem.** Three reactions are done in a polythene cup. Quicklime in water: ${TEMPS[0].start} °C to ${TEMPS[0].end} °C. Acid with alkali: ${TEMPS[1].start} °C to ${TEMPS[1].end} °C. Baking soda with citric acid: ${TEMPS[2].start} °C to ${TEMPS[2].end} °C. Classify each.\n\n**Step 1.** A rise in temperature means heat given out: exothermic (first two).\n\n**Step 2.** A fall means heat taken in: endothermic (the third).`,
      v: table(['Reaction', 'Temperature change', 'Type'], TEMPS.map((t) => [t.what, `${t.dT > 0 ? '+' : ''}${t.dT} °C`, t.kind]), 'Table classifying three reactions from their temperature changes'),
      n: 'A thermometer gives the answer. If the temperature rises, the reaction gave out heat to the liquid and is exothermic. If it falls, the reaction took heat from the liquid, so it is endothermic. Quicklime and the acid with alkali rise, and the baking soda mixture falls.',
    }),
    sl('check', 'Quick check: energy', {
      b: 'Think about where the energy goes.',
      v: table(['Process', 'Energy'], [['Photosynthesis', 'Light']], 'Photosynthesis and the energy it uses'),
      chk: 'chk-energy',
      n: 'Plants make food from carbon dioxide and water using light. Is photosynthesis exothermic or endothermic?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'A more reactive metal displaces a less reactive metal from its salt solution.',
        'Double displacement: two compounds swap partners; an insoluble product is a precipitate.',
        'Barium sulphate is white, silver chloride is white and curdy, lead iodide is yellow.',
        'Exothermic reactions give out energy, endothermic reactions take it in (heat, light, electricity).',
      ],
      v: table(['Reaction', 'Result'], [['Zn + CuSO₄', 'Cu deposited; blue fades'], ['Pb(NO₃)₂ + 2KI', 'Yellow PbI₂'], ['CaCO₃ heated', 'Endothermic']], 'Summary table of three results from Part 2'),
      n: 'To sum up Part 2. Use the activity series to predict displacement. In double displacement, look for a precipitate and remember the three colours. And decide whether a reaction gives out or takes in energy.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Say which metal is more reactive before you predict a displacement.',
        'Give the colour of the precipitate and write the downward arrow in the equation.',
        'Balance both sides: for double displacement count each ion.',
        'Link exothermic with heat given out and a rise in temperature.',
      ],
      v: table(['Slip', 'Fix'], [['Saying copper displaces zinc', 'Copper is below zinc; no reaction'], ['Giving silver chloride as yellow', 'It is white and curdy'], ['Calling a cooling mixture exothermic', 'A fall in temperature means endothermic']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. Compare the reactivities first. State the precipitate colour and mark it with a downward arrow. Count both sides when you balance. And link a temperature rise with an exothermic reaction.',
    }),
  ],
});
