// ICSE 9 Chemistry ch02 Chemical Equations and Relative Masses — Part 1 (t01–t02: equations and balancing),
// Part 2 (t03–t04: relative atomic and molecular masses, percentage composition).
import { sl, deck, table, flow, chem, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { RAM_BARS, COMPOSITION, HEAT } from './svgs.mjs';
import { M, P, W, AM, SUMS, AL_SAMPLE, AL_MASS, atoms } from './calc.mjs';

export const V = {
  bars: svgV(RAM_BARS, 'Bar chart of the relative atomic masses of seven elements compared with one-twelfth of a carbon-12 atom'),
  comp: svgV(COMPOSITION, 'Bars showing the percentage composition of magnesium sulphate and of iron(II) sulphate crystals'),
  heat: svgV(HEAT, 'Heating hydrated crystals in a clamped test tube, with drops of water forming on the cool wall'),
};

export const deck1 = deck({
  part: 1,
  title: 'Chemical Equations and Relative Masses — Part 1: Writing and balancing equations',
  goals: [
    'Write word and formula equations for reactions with one or two reactants and one or more products',
    'State the information a balanced chemical equation conveys',
    'Balance simple equations by the hit-and-trial method',
  ],
  slides: [
    sl('title', 'A sentence in the language of chemistry', {
      b: 'Part 1 — a chemical equation tells the story of a reaction in a few symbols, and a balanced equation tells it truthfully.',
      v: flow('LR', [['r', 'Reactants'], ['a', 'Reaction'], ['p', 'Products']], [['r', 'a'], ['a', 'p']], 'Flow: reactants, reaction, products'),
      n: 'When magnesium burns, a bright flame appears and a white powder is left. A chemical equation records exactly what went in and what came out. In this part we learn to write equations and to balance them.',
    }),
    sl('concept', 'Word equation and formula equation', {
      b: 'A **chemical equation** is a shorthand way of showing a chemical change using symbols and formulae. The substances before the arrow are **reactants**; those after it are **products**.',
      v: table(['Kind', 'Magnesium burning in air'], [['Word equation', 'Magnesium + oxygen → magnesium oxide'], ['Formula equation (skeletal)', 'Mg + O₂ → MgO'], ['Balanced formula equation', '2Mg + O₂ → 2MgO']], 'Table showing the word equation, skeletal equation and balanced equation for magnesium burning'),
      n: 'A word equation uses names. A formula equation replaces them with symbols and formulae. The first formula equation we write is skeletal, because it is not yet balanced. The final balanced version has numbers in front of some formulae.',
    }),
    sl('concept', 'One reactant, several products', {
      b: 'Heating **ammonium dichromate**: one reactant breaks into **three** products. The orange crystals swell up and leave a fluffy green powder.',
      v: chem(r`(NH4)2Cr2O7 ->[\Delta] N2 + Cr2O3 + 4H2O`, 'Ammonium dichromate on heating gives nitrogen, chromium(III) oxide and water', 'One reactant, three products.'),
      n: 'Some reactions have only one reactant. When ammonium dichromate is heated, it breaks down into nitrogen gas, green chromium oxide and steam. The triangle above the arrow stands for heat.',
    }),
    sl('concept', 'Two reactants, one product', {
      b: 'Magnesium and oxygen **combine**. Two reactants form a **single** product, magnesium oxide.',
      v: chem('2Mg + O2 -> 2MgO', 'Two magnesium plus one oxygen gives two magnesium oxide', 'Two reactants, one product.'),
      n: 'In this reaction two substances join to make one. Two atoms of magnesium combine with one molecule of oxygen to give two units of magnesium oxide.',
    }),
    sl('concept', 'Two reactants, several products', {
      b: 'Copper reacts with **concentrated nitric acid** to give **three** products: copper nitrate, a brown gas and water.',
      v: chem('Cu + 4HNO3 -> Cu(NO3)2 + 2NO2 + 2H2O', 'Copper plus four nitric acid gives copper nitrate, two nitrogen dioxide and two water', 'Two reactants, three products.'),
      n: 'Many reactions have more than one product. Copper and concentrated nitric acid give copper nitrate, a brown gas called nitrogen dioxide, and water.',
    }),
    sl('check', 'Quick check: reading a reaction', {
      b: 'Copper reacts with concentrated nitric acid to give copper nitrate, nitrogen dioxide and water.',
      v: table(['Reactants', 'Products'], [['Copper, nitric acid', 'Copper nitrate, nitrogen dioxide, water']], 'Reactants and products of the copper and nitric acid reaction'),
      chk: 'chk-types',
      n: 'How many reactants and how many products does this reaction have?',
    }),
    sl('concept', 'What a balanced equation tells us', {
      b: 'Take the balanced equation $\\ce{2Mg + O2 -> 2MgO}$.',
      v: table(['Information', 'From 2Mg + O₂ → 2MgO'], [['Substances', 'Magnesium and oxygen react; magnesium oxide forms'], ['Number of particles', '2 atoms of Mg + 1 molecule of O₂ → 2 units of MgO'], ['Relative masses', `${M.Mg * 2} + ${M.O2} → ${M.MgO * 2}`], ['Conditions and states', 'Heat, written above the arrow, and (s), (l), (g), (aq) if needed']], 'Table of the information given by the equation for magnesium burning'),
      n: 'A balanced equation names the substances, shows how many atoms or molecules of each take part, and gives their relative masses. Forty eight parts of magnesium and thirty two parts of oxygen make eighty parts of magnesium oxide. Nothing is lost.',
    }),
    sl('example', 'Worked example 1: reading an equation', {
      b: r`**Problem.** For $\ce{Zn + H2SO4 -> ZnSO4 + H2}$ find the total relative mass of the reactants and of the products. (Zn = 65, H = 1, S = 32, O = 16)

**Step 1.** Reactants: $65 + 98 = ${SUMS.zn[0]}$.

**Step 2.** Products: $161 + 2 = ${SUMS.zn[1]}$.

**Step 3.** The totals are equal: mass is conserved.`,
      v: table(['Substance', 'Working', 'Relative mass'], [['Zn', '', '65'], ['H₂SO₄', '2 × 1 + 32 + 4 × 16', '98'], ['ZnSO₄', '65 + 32 + 4 × 16', '161'], ['H₂', '2 × 1', '2']], 'Table of the relative masses of the four substances in the zinc and sulphuric acid reaction'),
      n: 'Add the relative masses on each side. Zinc is sixty five and sulphuric acid is ninety eight, so the reactants total one hundred and sixty three. Zinc sulphate is one hundred and sixty one and hydrogen is two, so the products also total one hundred and sixty three. The two sides agree.',
    }),
    sl('check', 'Quick check: what the equation says', {
      b: 'Look at the numbers in front of each formula.',
      v: chem('2Mg + O2 -> 2MgO', 'Two magnesium plus one oxygen gives two magnesium oxide'),
      chk: 'chk-info',
      n: 'Which statement about this equation is correct?',
    }),
    sl('concept', 'Balancing by hit and trial', {
      v: flow('TB', [['a', 'Write the correct formulae of reactants and products'], ['b', 'Count the atoms of each element on both sides'], ['c', 'Put a number in front of a formula to change the count'], ['d', 'Balance the element in the most complex formula first'], ['e', 'Recount; never change a subscript']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Five steps for balancing an equation by hit and trial'),
      n: 'Balancing is a careful game of trial and error. Write the right formulae first. Count the atoms on each side. Then change only the numbers in front of formulae, never the small numbers inside them. Recount at the end.',
    }),
    sl('example', 'Worked example 2: balance aluminium burning in oxygen', {
      b: r`**Problem.** Balance $\ce{Al + O2 -> Al2O3}$.

**Step 1.** Oxygen: 2 on the left, 3 on the right. The least common multiple is 6, so use $3\ce{O2}$ and $2\ce{Al2O3}$.

**Step 2.** Aluminium on the right is now $2 \times 2 = 4$, so use $4\ce{Al}$.

**Step 3.** Check: Al 4 and 4; O 6 and 6.`,
      v: table(['Element', 'Left (4Al + 3O₂)', 'Right (2Al₂O₃)'], [['Al', '4', '4'], ['O', '6', '6']], 'Table checking the atoms of aluminium and oxygen on both sides of the balanced equation'),
      n: 'Oxygen is the awkward one, two on the left and three on the right. Make both six, using three oxygen molecules and two aluminium oxide units. That gives four aluminium atoms on the right, so we need four on the left. Both sides now have four aluminium and six oxygen.',
    }),
    sl('concept', 'Balancing with groups of atoms', {
      b: 'Treat a radical such as hydroxide or phosphate as **one unit** if it appears unchanged on both sides. Balance $\\ce{Ca(OH)2 + H3PO4 -> Ca3(PO4)2 + H2O}$.',
      v: chem('3Ca(OH)2 + 2H3PO4 -> Ca3(PO4)2 + 6H2O', 'Three calcium hydroxide plus two phosphoric acid gives calcium phosphate and six water', 'Ca 3 and 3; phosphate 2 and 2; H 12 and 12; O 14 and 14.'),
      n: 'Keep the phosphate group together. Calcium needs three, so use three calcium hydroxide. Phosphate needs two, so use two phosphoric acid. Hydrogen and oxygen then fix the number of water molecules, which is six.',
    }),
    sl('check', 'Quick check: balancing', {
      b: 'Balance magnesium burning in nitrogen.',
      v: chem('3Mg + N2 -> Mg3N2', 'Three magnesium plus one nitrogen gives magnesium nitride'),
      chk: 'chk-balance',
      n: 'Magnesium reacts with nitrogen to form magnesium nitride. Which set of numbers balances the equation?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'A chemical equation shows reactants and products in symbols.',
        'A balanced equation shows the substances, the number of particles, the relative masses, and the conditions and states.',
        'Balance by changing the number in front of a formula, never a subscript.',
        'Treat an unchanged radical as one unit when balancing.',
      ],
      v: table(['Reaction type', 'Example'], [['One reactant, several products', '(NH₄)₂Cr₂O₇ → N₂ + Cr₂O₃ + 4H₂O'], ['Two reactants, one product', '2Mg + O₂ → 2MgO'], ['Two reactants, several products', 'Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O']], 'Summary table of three kinds of equation'),
      n: 'To sum up Part 1. An equation lists reactants and products. A balanced one has the same atoms on both sides and shows the relative masses. Balance by hit and trial with numbers in front of formulae, and never alter a subscript.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write correct formulae before you balance.',
        'Never change a subscript to balance; change the number in front.',
        'Show a check of the atom count for each element.',
        'Write state symbols and the heat sign if the question gives them.',
      ],
      v: table(['Slip', 'Fix'], [['Writing MgO₂ to balance oxygen', 'The formula is MgO; use 2MgO'], ['Balancing hydrogen and forgetting oxygen', 'Recount every element at the end'], ['Giving a balanced equation with no arrow', 'Always use an arrow']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Exam tips. Get the formulae right first. Fix the numbers in front, never the small numbers. Show your atom count, because it earns marks. And write conditions such as heat above the arrow when the question gives them.',
    }),
  ],
});

const cm = (f, el) => atoms(f)[el];
export const deck2 = deck({
  part: 2,
  title: 'Chemical Equations and Relative Masses — Part 2: Relative masses and percentage composition',
  goals: [
    'Define relative atomic mass and relative molecular mass and state the standard they use',
    'Calculate the relative molecular mass of a compound, including one with water of crystallisation',
    'Calculate the percentage by mass of each element in a compound and the percentage of water in a hydrate',
  ],
  slides: [
    sl('title', 'Weighing atoms by comparison', {
      b: 'Part 2 — atoms are far too small to weigh one by one, so chemists compare their masses with a standard.',
      v: flow('LR', [['a', 'Relative atomic mass'], ['m', 'Relative molecular mass'], ['p', 'Percentage composition']], [['a', 'm'], ['m', 'p']], 'Flow: relative atomic mass, relative molecular mass, percentage composition'),
      n: 'No balance can weigh a single atom. Instead we say how many times heavier an atom is than a standard atom. From these numbers we get molecular masses, and then the percentage of each element in a compound.',
    }),
    sl('diagram', 'Relative atomic mass', {
      b: '**Relative atomic mass** is the number of times one atom of an element is **heavier than one-twelfth of an atom of carbon-12**. It is a ratio and has no unit.',
      v: V.bars,
      n: 'Take one carbon twelve atom and cut its mass into twelve equal parts. One part is our unit. A hydrogen atom weighs one unit, a carbon atom twelve, an oxygen atom sixteen, and an iron atom fifty six. Chlorine is thirty five and a half.',
    }),
    sl('concept', 'The standard for atomic masses', {
      v: table(['Standard', 'Atom compared', 'Where used'], [['Hydrogen atom', 'One hydrogen atom taken as 1', 'Earlier scale'], ['Carbon-12 atom', 'One-twelfth of its mass taken as 1', 'Present scale']], 'Table of the hydrogen standard and the carbon-12 standard'),
      n: 'Earlier, the hydrogen atom was the standard, with a mass of one. Today the standard is one twelfth of a carbon twelve atom. The two scales give almost the same numbers, because a hydrogen atom has a mass very close to one unit.',
    }),
    sl('concept', 'Relative molecular mass', {
      b: '**Relative molecular mass** is the number of times one molecule is heavier than one-twelfth of a carbon-12 atom. It equals the **sum of the relative atomic masses** of all the atoms in the formula.',
      v: table(['Compound', 'Working', 'Relative molecular mass'], [['Water, H₂O', '2 × 1 + 16', `${M.H2O}`], ['Carbon dioxide, CO₂', '12 + 2 × 16', `${M.CO2}`], ['Ammonia, NH₃', '14 + 3 × 1', `${M.NH3}`], ['Sulphuric acid, H₂SO₄', '2 × 1 + 32 + 4 × 16', `${M.H2SO4}`]], 'Table of relative molecular masses of four compounds with working'),
      n: 'To find a relative molecular mass, add the atomic masses of every atom in the formula. Water is two plus sixteen, eighteen. Carbon dioxide is forty four. Ammonia is seventeen and sulphuric acid is ninety eight.',
    }),
    sl('example', 'Worked example 1: aluminium sulphate', {
      b: r`**Problem.** Find the relative molecular mass of $\ce{Al2(SO4)3}$. (Al = 27, S = 32, O = 16)

**Step 1.** Count atoms: Al ${cm('Al2(SO4)3', 'Al')}, S ${cm('Al2(SO4)3', 'S')}, O ${cm('Al2(SO4)3', 'O')}.

**Step 2.** Multiply: $2 \times 27 = 54$; $3 \times 32 = 96$; $12 \times 16 = 192$.

**Step 3.** Add: $54 + 96 + 192 = ${M['Al2(SO4)3']}$.`,
      v: table(['Element', 'Atoms', 'Mass of each', 'Total'], [['Al', '2', '27', '54'], ['S', '3', '32', '96'], ['O', '12', '16', '192'], ['Total', '', '', `${M['Al2(SO4)3']}`]], 'Table working out the relative molecular mass of aluminium sulphate'),
      n: 'First count the atoms inside the bracket carefully. The bracket multiplies each atom by three, so sulphur is three and oxygen is twelve. Two aluminium is fifty four. Three sulphur is ninety six. Twelve oxygen is one hundred and ninety two. The total is three hundred and forty two.',
    }),
    sl('check', 'Quick check: relative molecular mass', {
      b: 'Count the atoms inside the bracket first. (Ca = 40, O = 16, H = 1)',
      v: table(['Element', 'Atoms'], [['Ca', '1'], ['O', '2'], ['H', '2']], 'Atoms in one unit of calcium hydroxide'),
      chk: 'chk-rmm',
      n: 'What is the relative molecular mass of calcium hydroxide? Use the atomic masses given.',
    }),
    sl('diagram', 'Water of crystallisation in the mass', {
      b: 'Crystals such as zinc sulphate crystals hold **water of crystallisation**. Heating drives it off, and the formula is written with a dot: $\\ce{ZnSO4.7H2O}$. Include the water when you add up the mass.',
      v: V.heat,
      n: 'Some crystals carry water inside their structure. Heating them in a test tube drives the water off as steam, which condenses on the cool wall. In the formula, a dot separates the salt from the water, and the water counts in the molecular mass.',
    }),
    sl('example', 'Worked example 2: a hydrated salt', {
      b: r`**Problem.** Find the relative molecular mass of $\ce{ZnSO4.7H2O}$. (Zn = 65, S = 32, O = 16, H = 1)

**Step 1.** Anhydrous part: $65 + 32 + 4 \times 16 = ${M.ZnSO4}$.

**Step 2.** Water part: $7 \times (2 \times 1 + 16) = 7 \times 18 = 126$.

**Step 3.** Total $= ${M.ZnSO4} + 126 = ${M['ZnSO4.7H2O']}$.`,
      v: table(['Part', 'Working', 'Mass'], [['ZnSO₄', '65 + 32 + 64', `${M.ZnSO4}`], ['7H₂O', '7 × 18', '126'], ['ZnSO₄·7H₂O', '161 + 126', `${M['ZnSO4.7H2O']}`]], 'Table working out the relative molecular mass of zinc sulphate crystals'),
      n: 'Split the formula at the dot. The salt part comes to one hundred and sixty one. Seven water molecules weigh seven times eighteen, one hundred and twenty six. Add them to get two hundred and eighty seven.',
    }),
    sl('concept', 'Percentage composition', {
      b: 'The **percentage composition** of a compound is the mass of each element in 100 parts of the compound.',
      v: table(['Step', 'Rule'], [['1', 'Find the relative molecular mass of the compound'], ['2', 'Find the total mass of the element (atoms × atomic mass)'], ['3', 'Divide step 2 by step 1 and multiply by 100'], ['4', 'The percentages must add up to 100']], 'Table of four steps for percentage composition'),
      m: [r`\text{percentage of an element} = \frac{\text{mass of the element in one formula}}{\text{relative molecular mass}} \times 100`],
      n: 'Percentage composition tells us how much of each element is present in a hundred parts of a compound. Divide the mass of the element by the molecular mass of the compound, and multiply by one hundred. The percentages must add up to one hundred.',
    }),
    sl('example', 'Worked example 3: magnesium sulphate', {
      b: r`**Problem.** Find the percentage of each element in $\ce{MgSO4}$. (Mg = 24, S = 32, O = 16)

**Step 1.** Relative molecular mass $= 24 + 32 + 64 = ${M.MgSO4}$.

**Step 2.** Mg: $\frac{24}{${M.MgSO4}} \times 100 = ${P.MgSO4.Mg}\%$; S: $\frac{32}{${M.MgSO4}} \times 100 = ${P.MgSO4.S}\%$; O: $\frac{64}{${M.MgSO4}} \times 100 = ${P.MgSO4.O}\%$.

**Step 3.** Check: $${P.MgSO4.Mg} + ${P.MgSO4.S} + ${P.MgSO4.O} = 100$.`,
      v: table(['Element', 'Mass in one formula', 'Percentage'], [['Mg', '24', `${P.MgSO4.Mg}%`], ['S', '32', `${P.MgSO4.S}%`], ['O', '64', `${P.MgSO4.O}%`]], 'Table of the percentage composition of magnesium sulphate'),
      n: 'The molecular mass of magnesium sulphate is one hundred and twenty. Magnesium is twenty four out of one hundred and twenty, which is exactly twenty percent. Sulphur is just over twenty six percent and oxygen just over fifty three percent. They add up to one hundred.',
    }),
    sl('diagram', 'Seeing the composition', {
      b: 'Each bar stands for 100 percent of the mass of the compound.',
      v: V.comp,
      n: 'In magnesium sulphate, oxygen makes up more than half the mass, although it is a light atom, because there are four of them. In the iron sulphate crystals, nearly half the mass is water of crystallisation.',
    }),
    sl('check', 'Quick check: percentage', {
      b: 'Ethane has the formula C₂H₆. (C = 12, H = 1)',
      v: table(['Item', 'Value'], [['Relative molecular mass', `${M.C2H6}`], ['Mass of carbon in one molecule', '24']], 'Relative molecular mass of ethane and the mass of carbon in it'),
      chk: 'chk-pct',
      n: 'What is the percentage of carbon in ethane?',
    }),
    sl('example', 'Worked example 4: percentage of water of crystallisation', {
      b: r`**Problem.** Find the percentage of water in $\ce{FeSO4.7H2O}$. (Fe = 56, S = 32, O = 16, H = 1)

**Step 1.** Relative molecular mass $= 152 + 126 = ${M['FeSO4.7H2O']}$.

**Step 2.** Water $= 7 \times 18 = 126$.

**Step 3.** Percentage $= \frac{126}{${M['FeSO4.7H2O']}} \times 100 = ${W.Fe}\%$.`,
      v: table(['Part', 'Mass', 'Percentage'], [['FeSO₄', '152', `${(100 - W.Fe).toFixed(1)}%`], ['7H₂O', '126', `${W.Fe}%`]], 'Table of the percentage of anhydrous salt and of water in iron(II) sulphate crystals'),
      n: 'The total mass of the crystals is two hundred and seventy eight. The seven water molecules account for one hundred and twenty six of it. One hundred and twenty six over two hundred and seventy eight, times one hundred, is about forty five point three percent.',
    }),
    sl('check', 'Quick check: water percentage', {
      b: 'Pick the correct expression.',
      v: table(['Item', 'Mass'], [['Water in ZnSO₄·7H₂O', '126'], ['Whole formula', `${M['ZnSO4.7H2O']}`]], 'Masses needed for the percentage of water in zinc sulphate crystals'),
      chk: 'chk-water',
      n: 'Which expression gives the percentage of water of crystallisation in zinc sulphate crystals?',
    }),
    sl('concept', 'Finding the mass of an element in a sample', {
      b: `Use the percentage or the ratio of masses. In ${AL_SAMPLE} g of aluminium oxide, Al₂O₃ (RMM ${M.Al2O3}), the aluminium is $\\frac{54}{${M.Al2O3}} \\times ${AL_SAMPLE} = ${AL_MASS}$ g.`,
      v: table(['Quantity', 'Value'], [['Aluminium in one formula', '2 × 27 = 54'], ['RMM of Al₂O₃', `${M.Al2O3}`], ['Mass of aluminium in 204 g', `${AL_MASS} g`], ['Mass of oxygen in 204 g', `${AL_SAMPLE - AL_MASS} g`]], 'Table finding the mass of aluminium and oxygen in 204 grams of aluminium oxide'),
      n: 'Once you know a ratio, you can scale it. Fifty four parts out of one hundred and two of aluminium oxide are aluminium. In two hundred and four grams of the oxide that is one hundred and eight grams of aluminium, and ninety six grams of oxygen.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Relative atomic mass: how many times an atom is heavier than one-twelfth of a carbon-12 atom; no unit.',
        'Relative molecular mass: the sum of the relative atomic masses in the formula.',
        'Include water of crystallisation in the molecular mass of a hydrate.',
        'Percentage of an element = (mass of the element in the formula ÷ relative molecular mass) × 100.',
      ],
      v: table(['Quantity', 'Example'], [['RMM of Al₂(SO₄)₃', `${M['Al2(SO4)3']}`], ['Mg in MgSO₄', `${P.MgSO4.Mg}%`], ['Water in FeSO₄·7H₂O', `${W.Fe}%`]], 'Summary table of three worked results'),
      n: 'To sum up Part 2. Relative atomic mass compares an atom with one twelfth of carbon twelve. Add atomic masses to get the molecular mass, counting the water in a hydrate. Divide the part by the whole and multiply by one hundred for a percentage.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write the atomic masses you use at the start.',
        'Multiply by the subscript, and by the bracket number, for every atom.',
        'In a hydrate, find the water part separately as the number of water molecules × 18.',
        'Check that the percentages add up to 100.',
      ],
      v: table(['Slip', 'Fix'], [['Counting one oxygen in Ca(OH)₂ as two', 'Two OH groups, so 2 O and 2 H'], ['Leaving out the water in a hydrate', 'Add 7 × 18 for 7H₂O'], ['Putting a unit on relative mass', 'It is a ratio; write the number only']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. State the atomic masses you use. Multiply every atom by its subscript and by the number outside a bracket. Treat the water of a hydrate as a separate part. And always check that your percentages add up to one hundred.',
    }),
  ],
});
