// ICSE 10 Chemistry ch06 Stoichiometry: Formulae and Calculations from Equations — two decks: Part 1 (t01–t03)
// percentage composition including water of crystallisation, empirical and molecular formulae from percentages and from
// combining masses; Part 2 (t04) mass–mass, mass–volume and volume–volume calculations from balanced equations.
import { sl, deck, table, flow, chem, svgV, r } from './lib.mjs';
import { PERCENT_BARS, STOICH_BRIDGE } from './svgs.mjs';

const V = {
  bars: svgV(PERCENT_BARS, 'Bars showing the percentage by mass of each element in urea and in ammonium nitrate'),
  bridge: svgV(STOICH_BRIDGE, 'Three-step bridge from a given mass or volume of one substance, through moles and the mole ratio, to the mass or volume of another'),
};

export const deck1 = deck({
  part: 1,
  title: 'Stoichiometry — Part 1: Percentage composition and formulae',
  goals: [
    'Calculate the percentage by mass of each element, and of water of crystallisation, in a compound',
    'Find the empirical formula of a compound from its percentage composition',
    'Find the molecular formula from the empirical formula and the vapour density or molar mass',
    'Find an empirical formula from the masses of elements that combine',
  ],
  slides: [
    sl('title', 'What is a compound made of?', {
      b: 'Part 1 — a formula tells us how many atoms of each element are in a compound. Using atomic masses, we can turn a formula into percentages by mass, and percentages back into a formula.',
      v: table(['Compound', 'Formula', 'Molar mass / g'], [['Ammonium nitrate', 'NH₄NO₃', '80'], ['Calcium carbonate', 'CaCO₃', '100'], ['Glucose', 'C₆H₁₂O₆', '180'], ['Hydrated copper(II) sulphate', 'CuSO₄·5H₂O', '250 (Cu = 64)']], 'Table of four compounds with their formulae and molar masses'),
      n: 'Namaste! A farmer buying fertiliser wants to know how much nitrogen is in each bag. A chemist who makes a new compound wants to know its formula. Both questions are answered by the same idea. In this part we turn a formula into percentages by mass, and then work backwards from percentages, or from measured masses, to find a formula.',
    }),
    sl('concept', 'Percentage composition', {
      b: '**Percentage composition** gives the percentage by mass of each element in a compound.\n\n**% of an element = (mass of that element in 1 mol of the compound ÷ molar mass) × 100**\n\nFor urea, CO(NH₂)₂, M = 12 + 16 + 2 × 14 + 4 × 1 = 60, so nitrogen = 28 ÷ 60 × 100 = 46.67%. The percentages of all the elements add up to 100.',
      v: V.bars,
      n: 'Percentage composition tells us what fraction of the mass of a compound comes from each element. Find the molar mass first. Then take the mass of the element in one mole, divide by the molar mass and multiply by one hundred. Urea has a molar mass of sixty, and its two nitrogen atoms weigh twenty eight, so nearly half of urea is nitrogen.',
    }),
    sl('example', 'Worked example: nitrogen in ammonium nitrate', {
      b: r`**Problem.** Calculate the percentage of nitrogen in ammonium nitrate, NH₄NO₃. (N = 14, H = 1, O = 16)

**Step 1.** Molar mass $= 2 \times 14 + 4 \times 1 + 3 \times 16 = 80$ g.

**Step 2.** Mass of nitrogen in 1 mol $= 2 \times 14 = 28$ g (one N in NH₄⁺, one in NO₃⁻).

**Step 3.** Percentage of nitrogen $= \frac{28}{80} \times 100 = 35$%.`,
      v: table(['Element', 'Mass in 1 mol / g', 'Percentage'], [['Nitrogen', '28', '35%'], ['Hydrogen', '4', '5%'], ['Oxygen', '48', '60%'], ['Total', '80', '100%']], 'Table of the mass and percentage of nitrogen, hydrogen and oxygen in ammonium nitrate'),
      n: 'Count the atoms carefully. Ammonium nitrate has two nitrogen atoms, one in the ammonium ion and one in the nitrate ion, four hydrogens and three oxygens. That makes a molar mass of eighty grams, of which twenty eight grams is nitrogen. Twenty eight divided by eighty, times one hundred, gives thirty five percent nitrogen.',
    }),
    sl('concept', 'Water of crystallisation', {
      b: '**Water of crystallisation** is the fixed number of water molecules that form part of the crystal structure of some salts. It is written after a dot: CuSO₄·5H₂O. On strong heating the water is driven off and the crystals lose their shape (and, for copper sulphate, their blue colour).\n\nTo find the **percentage of water**, treat the whole formula, water included, as one unit: % water = (mass of water in 1 mol ÷ molar mass of the hydrated salt) × 100.',
      v: table(['Hydrated salt', 'Formula', 'Molar mass / g', 'Water / g'], [['Blue vitriol', 'CuSO₄·5H₂O', '250 (Cu = 64)', '90'], ['Washing soda', 'Na₂CO₃·10H₂O', '286', '180'], ['Gypsum', 'CaSO₄·2H₂O', '172', '36']], 'Table of three hydrated salts with formulae, molar masses and mass of water in one mole'),
      n: 'Some salts trap a fixed number of water molecules inside their crystals. This is called water of crystallisation, and it is shown after a dot in the formula. Blue copper sulphate crystals, for example, hold five water molecules for each copper sulphate unit. When we calculate the percentage of water, we include the water in the molar mass of the whole crystal.',
    }),
    sl('example', 'Worked example: water in Epsom salt', {
      b: r`**Problem.** Calculate the percentage of water of crystallisation in Epsom salt, MgSO₄·7H₂O. (Mg = 24, S = 32, O = 16, H = 1)

**Step 1.** Molar mass $= 24 + 32 + 4 \times 16 + 7 \times 18 = 246$ g.

**Step 2.** Mass of water in 1 mol $= 7 \times 18 = 126$ g.

**Step 3.** Percentage of water $= \frac{126}{246} \times 100 \approx 51.2$%.`,
      v: table(['Part of the formula', 'Mass in 1 mol / g'], [['MgSO₄', '120'], ['7H₂O', '126'], ['MgSO₄·7H₂O', '246']], 'Table splitting the molar mass of Epsom salt into the anhydrous salt and the water'),
      n: 'Each water molecule weighs eighteen, so seven of them weigh one hundred and twenty six. The magnesium sulphate part weighs one hundred and twenty. Together the crystal has a molar mass of two hundred and forty six. Dividing the water by the total and multiplying by one hundred shows that just over half of Epsom salt, by mass, is water.',
    }),
    sl('check', 'Quick check: percentage composition', {
      b: 'Find the percentage of one element in a compound.',
      n: 'Quick check. Work out the molar mass, then divide the mass of the element in one mole by it and multiply by one hundred.',
      chk: 'pc-mcq',
    }),
    sl('concept', 'Empirical and molecular formulae', {
      b: '- **Empirical formula:** the **simplest whole-number ratio** of the atoms of the elements in a compound.\n- **Molecular formula:** the **actual number** of atoms of each element in one molecule.\n- Molecular formula = *n* × empirical formula, where *n* = molar mass ÷ empirical formula mass (a whole number).\n- For a gas, molar mass = 2 × vapour density.',
      v: table(['Compound', 'Molecular formula', 'Empirical formula', 'n'], [['Glucose', 'C₆H₁₂O₆', 'CH₂O', '6'], ['Benzene', 'C₆H₆', 'CH', '6'], ['Hydrogen peroxide', 'H₂O₂', 'HO', '2'], ['Water', 'H₂O', 'H₂O', '1']], 'Table of four compounds with molecular formula, empirical formula and the multiplying number n'),
      n: 'The empirical formula gives only the simplest ratio of atoms. The molecular formula gives the real number of each kind of atom in a molecule. Glucose has six carbons, twelve hydrogens and six oxygens, but its simplest ratio is one carbon, two hydrogens and one oxygen. The molecular formula is always a whole number multiple of the empirical formula, and sometimes the two are the same, as for water.',
    }),
    sl('concept', 'Finding an empirical formula: the table method', {
      b: '1. Write the **percentage** (or mass) of each element.\n2. **Divide by the atomic mass** to get the relative number of moles of atoms.\n3. **Divide each answer by the smallest** one.\n4. If a ratio is not close to a whole number, **multiply all** by a small number: 1.5 → × 2; 1.33 or 1.67 → × 3; 1.25 → × 4.\n5. Write the empirical formula from the whole-number ratio.',
      v: flow('LR', [['a', 'Percentage of each element'], ['b', '÷ atomic mass'], ['c', '÷ smallest value'], ['d', 'Make whole numbers'], ['e', 'Empirical formula']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the steps for finding an empirical formula from percentage composition'),
      n: 'Here is the method. Write down the percentage of each element. Divide each by its atomic mass to find the relative number of moles of atoms. Then divide every answer by the smallest one. If a number comes out near one and a half, double everything; if it is near one and a third, multiply everything by three. The whole numbers you get give the empirical formula.',
    }),
    sl('example', 'Worked example: from percentages to a molecular formula', {
      b: r`**Problem.** A hydrocarbon contains 85.7% carbon and 14.3% hydrogen. Its vapour density is 28. Find its empirical and molecular formulae. (C = 12, H = 1)

**Step 1.** Carbon: $\frac{85.7}{12} \approx 7.14$. Hydrogen: $\frac{14.3}{1} = 14.3$.

**Step 2.** Divide by the smaller value: carbon 1, hydrogen $\frac{14.3}{7.14} \approx 2.0$. Empirical formula **CH₂** (empirical formula mass $= 12 + 2 = 14$).

**Step 3.** Molar mass $= 2 \times 28 = 56$, so $n = \frac{56}{14} = 4$.

**Step 4.** Molecular formula $=$ (CH₂)₄ $=$ **C₄H₈**.`,
      v: table(['Element', '%', '÷ atomic mass', '÷ smallest', 'Ratio'], [['C', '85.7', '7.14', '1', '1'], ['H', '14.3', '14.3', '2.0', '2']], 'Table of the working for the empirical formula of a hydrocarbon with 85.7 percent carbon'),
      n: 'Divide each percentage by the atomic mass: carbon gives about seven point one four and hydrogen fourteen point three. Dividing both by the smaller number gives one to two, so the empirical formula is C H two, with a formula mass of fourteen. The vapour density is twenty eight, so the molar mass is fifty six. Fifty six is four times fourteen, so the molecular formula has four carbons and eight hydrogens.',
    }),
    sl('check', 'Quick check: empirical formula', {
      b: 'Reduce a molecular formula to its simplest ratio.',
      n: 'Quick check. Divide every subscript by the largest number that divides all of them exactly.',
      chk: 'ef-mcq',
    }),
    sl('concept', 'Empirical formula from combining masses', {
      b: 'Sometimes an experiment gives **masses**, not percentages: a known mass of a metal is burnt and the oxide is weighed, or an oxide is reduced and the metal is weighed.\n\n- Mass of the other element = mass of the compound − mass of the first element.\n- Then use the **same table**: divide each mass by its atomic mass, divide by the smallest, make whole numbers.\n\nPercentages are not needed: masses work directly, because only the **ratio** matters.',
      v: table(['Experiment', 'Masses found'], [['Burn a metal in air', 'Mass of metal; mass of oxide → oxygen by difference'], ['Reduce an oxide with hydrogen', 'Mass of oxide; mass of metal left → oxygen by difference'], ['Heat a metal with sulphur', 'Mass of metal; mass of sulphide → sulphur by difference']], 'Table of three experiments that give the masses of combining elements'),
      n: 'Experiments often give masses instead of percentages. For example, you might burn a weighed piece of metal and weigh the oxide formed. The increase in mass is the oxygen that combined. You do not need percentages at all. Divide each mass by its atomic mass, divide by the smallest number, and turn the ratio into whole numbers, exactly as before.',
    }),
    sl('example', 'Worked example: an oxide of iron', {
      b: r`**Problem.** 8.0 g of an oxide of iron contains 5.6 g of iron. Find its empirical formula. (Fe = 56, O = 16)

**Step 1.** Mass of oxygen $= 8.0 - 5.6 = 2.4$ g.

**Step 2.** Iron: $\frac{5.6}{56} = 0.1$. Oxygen: $\frac{2.4}{16} = 0.15$.

**Step 3.** Divide by the smaller: iron 1, oxygen $\frac{0.15}{0.1} = 1.5$.

**Step 4.** Multiply by 2: iron 2, oxygen 3. Empirical formula **Fe₂O₃**.`,
      v: table(['Element', 'Mass / g', '÷ atomic mass', '÷ smallest', '× 2'], [['Fe', '5.6', '0.1', '1', '2'], ['O', '2.4', '0.15', '1.5', '3']], 'Table of the working for the empirical formula of an iron oxide'),
      n: 'The oxygen is found by difference: eight minus five point six is two point four grams. Dividing by the atomic masses gives one tenth for iron and fifteen hundredths for oxygen. Dividing by the smaller gives one to one and a half. One and a half is not a whole number, so double both, giving two iron atoms to three oxygen atoms.',
    }),
    sl('check', 'Quick check: formula from masses', {
      b: 'Find an empirical formula from combining masses.',
      n: 'Quick check. Find the moles of atoms of each element from its mass, then compare them.',
      chk: 'mass-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Percentage of an element = (its mass in 1 mol ÷ molar mass) × 100.',
        'Include water of crystallisation in the molar mass of a hydrated salt.',
        'Empirical formula = simplest whole-number ratio; molecular formula = n × empirical formula.',
        'Table method: ÷ atomic mass, ÷ smallest, make whole numbers.',
        'For a gas, molar mass = 2 × vapour density; n = molar mass ÷ empirical formula mass.',
      ],
      v: table(['Given', 'Find', 'Key step'], [['Formula', 'Percentage composition', 'Mass of element ÷ molar mass × 100'], ['Percentages or masses', 'Empirical formula', '÷ atomic mass, ÷ smallest'], ['Empirical formula + vapour density', 'Molecular formula', 'n = 2 × VD ÷ empirical formula mass']], 'Summary table of the three kinds of formula calculation'),
      n: 'To sum up Part 1. To find a percentage, divide the mass of the element in one mole by the molar mass and multiply by one hundred. To find an empirical formula, divide by atomic masses, divide by the smallest, and make whole numbers. To find the molecular formula, compare the molar mass, often twice the vapour density, with the empirical formula mass.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Count atoms inside brackets and in the water of crystallisation carefully.',
        'Keep two or three decimal places while dividing; round only at the end.',
        'Never round 1.5 or 1.33 to a whole number: multiply through instead.',
        'Show the table: examiners give step marks for each column.',
      ],
      v: table(['Slip', 'Fix'], [['Rounding 1.5 to 2', 'Multiply all ratios by 2'], ['Forgetting the water in a hydrate', 'Add n × 18 to the molar mass'], ['Dividing % by atomic number', 'Divide by atomic mass']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Count the atoms in brackets and in the water of crystallisation carefully. Keep a few decimal places while you divide, and round only at the end. If a ratio comes out as one and a half, do not round it: multiply every number by two. And always set out the table, because each column earns marks.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Stoichiometry — Part 2: Calculations from equations',
  goals: [
    'Read a balanced equation in moles, masses and gas volumes',
    'Calculate the mass of a product from the mass of a reactant',
    'Calculate the volume of a gas at STP from a mass, and a mass from a volume',
    'Solve volume–volume and multi-step problems',
  ],
  slides: [
    sl('title', 'Reading an equation in moles', {
      b: 'Part 2 — a balanced equation is a recipe. Its coefficients tell us the ratio in which **moles** react and form, and from moles we can reach masses, gas volumes and numbers of particles.',
      v: table(['Read as', '2H₂', 'O₂', '2H₂O'], [['Molecules', '2', '1', '2'], ['Moles', '2 mol', '1 mol', '2 mol'], ['Masses (H = 1, O = 16)', '4 g', '32 g', '36 g'], ['Gas volumes at STP', '44.8 dm³', '22.4 dm³', '(liquid)']], 'Table reading the equation for hydrogen burning in oxygen as molecules, moles, masses and gas volumes'),
      n: 'A balanced equation is like a recipe. Two molecules of hydrogen react with one molecule of oxygen to give two molecules of water. Scale that up by Avogadro’s number and it reads two moles, one mole and two moles. From moles we can find masses, gas volumes and numbers of particles. Notice that the masses on both sides add up to the same total.',
    }),
    sl('concept', 'What a balanced equation tells us', {
      b: 'For a balanced equation:\n\n- The **coefficients** give the **mole ratio** (and, for gases at the same temperature and pressure, the **volume ratio**).\n- **Masses** come from moles × molar mass; the total mass of reactants **equals** the total mass of products.\n- **Gas volumes at STP** come from moles × 22.4 dm³.\n\nThe coefficients are **not** a mass ratio: in 2H₂ + O₂ → 2H₂O, 4 g of hydrogen reacts with 32 g of oxygen.',
      v: V.bridge,
      n: 'The coefficients in a balanced equation give the ratio of moles, not the ratio of masses. To get masses, multiply the moles by the molar masses. For gases, multiply the moles by twenty two point four to get volumes at standard conditions. The bridge in the picture shows the route: change what is given into moles, use the mole ratio, then change the moles back into what is wanted.',
    }),
    sl('concept', 'The three-step method', {
      b: '1. **Given → moles:** moles of A = mass ÷ molar mass (or volume at STP ÷ 22.4).\n2. **Mole ratio:** moles of B = moles of A × (coefficient of B ÷ coefficient of A).\n3. **Moles → wanted:** mass of B = moles × molar mass; volume of B at STP = moles × 22.4; particles = moles × Avogadro’s number.\n\nAlways start from a **balanced** equation.',
      v: flow('LR', [['a', 'Balanced equation'], ['b', 'Moles of the given substance'], ['c', 'Moles of the wanted substance'], ['d', 'Mass, volume or number of particles']], [['a', 'b'], ['b', 'c', 'mole ratio'], ['c', 'd']], 'Flow of the three-step method for calculations from equations'),
      n: 'Every equation problem follows three steps. First, change the given amount into moles. Second, use the coefficients to find the moles of the substance you want. Third, change those moles into a mass, a gas volume or a number of particles. And never start until you are sure the equation is balanced.',
    }),
    sl('example', 'Worked example: mass to mass', {
      b: r`**Problem.** 10 g of sodium hydroxide is neutralised completely by dilute hydrochloric acid: $\ce{NaOH + HCl -> NaCl + H2O}$. What mass of sodium chloride is formed? (Na = 23, O = 16, H = 1, Cl = 35.5)

**Step 1.** Molar mass of NaOH $= 23 + 16 + 1 = 40$ g, so moles $= \frac{10}{40} = 0.25$.

**Step 2.** Mole ratio NaOH to NaCl is 1 : 1, so 0.25 mol of NaCl forms.

**Step 3.** Molar mass of NaCl $= 23 + 35.5 = 58.5$ g. Mass $= 0.25 \times 58.5 = 14.625$ g, about 14.6 g.`,
      v: table(['Step', 'Working', 'Result'], [['Moles of NaOH', '10 ÷ 40', '0.25 mol'], ['Moles of NaCl', '0.25 × 1', '0.25 mol'], ['Mass of NaCl', '0.25 × 58.5', '14.6 g']], 'Table of the three steps for the mass of sodium chloride from sodium hydroxide'),
      n: 'Sodium hydroxide has a molar mass of forty, so ten grams is a quarter of a mole. The equation shows that one mole of sodium hydroxide gives one mole of sodium chloride, so a quarter of a mole of salt forms. Sodium chloride has a molar mass of fifty eight point five, and a quarter of that is about fourteen point six grams.',
    }),
    sl('check', 'Quick check: mass to mass', {
      b: 'Find the mass of a product from the mass of a reactant.',
      n: 'Quick check. Change the given mass into moles, use the mole ratio, then multiply by the molar mass of the product.',
      chk: 'mm-mcq',
    }),
    sl('concept', 'Mass to volume, and volume to mass', {
      b: 'When the wanted substance is a **gas**, finish with **moles × 22.4 dm³** (at STP). When the given substance is a gas volume at STP, start with **volume ÷ 22.4**.\n\n- Volumes in cm³: divide by 22 400 (or convert to dm³ first).\n- If the gas volume is not at STP, it cannot be turned into moles with 22.4.\n- Only gases have a molar volume; never use 22.4 dm³ for a solid or a liquid.',
      v: table(['Given', 'Wanted', 'Route'], [['Mass of a solid', 'Volume of a gas at STP', 'mass ÷ M → mole ratio → × 22.4'], ['Volume of a gas at STP', 'Mass of a solid', '÷ 22.4 → mole ratio → × M'], ['Volume of a gas at STP', 'Mass of another gas', '÷ 22.4 → mole ratio → × M']], 'Table of routes for mass-to-volume and volume-to-mass calculations'),
      n: 'If the substance you want is a gas, the last step is to multiply its moles by twenty two point four, which gives its volume at standard temperature and pressure. If you are given a gas volume at standard conditions, the first step is to divide by twenty two point four. Remember to convert cubic centimetres into litres, and use molar volume only for gases.',
    }),
    sl('example', 'Worked example: mass to volume', {
      b: r`**Problem.** 2.7 g of aluminium reacts with excess dilute hydrochloric acid: $\ce{2Al + 6HCl -> 2AlCl3 + 3H2}$. What volume of hydrogen is produced at STP? (Al = 27)

**Step 1.** Moles of aluminium $= \frac{2.7}{27} = 0.1$.

**Step 2.** Mole ratio Al to H₂ is 2 : 3, so moles of hydrogen $= 0.1 \times \frac{3}{2} = 0.15$.

**Step 3.** Volume $= 0.15 \times 22.4 = 3.36$ dm³.`,
      v: chem('2Al + 6HCl -> 2AlCl3 + 3H2', 'Two aluminium plus six hydrochloric acid gives two aluminium chloride plus three hydrogen', 'Mole ratio Al : H₂ = 2 : 3.'),
      n: 'Aluminium has an atomic mass of twenty seven, so two point seven grams is one tenth of a mole. The equation shows two moles of aluminium giving three moles of hydrogen, so one tenth of a mole gives fifteen hundredths of a mole of hydrogen. Multiplying by twenty two point four gives three point three six litres of hydrogen at standard conditions.',
    }),
    sl('check', 'Quick check: mass to volume', {
      b: 'Find the volume of a gas at STP from the mass of a reactant.',
      n: 'Quick check. Moles of the metal, then the mole ratio, then multiply by twenty two point four.',
      chk: 'mv-mcq',
    }),
    sl('concept', 'Volume to volume', {
      b: 'When **both** substances are **gases** at the same temperature and pressure, use Gay-Lussac’s law directly: **volume ratio = mole ratio = ratio of coefficients**. No molar masses are needed.\n\nExample: 2SO₂ + O₂ → 2SO₃. 100 cm³ of sulphur dioxide needs 50 cm³ of oxygen and gives 100 cm³ of sulphur trioxide vapour (same conditions).\n\nTo get a **mass** from a gas volume, the volume must be at **STP**: moles = volume ÷ 22.4, then × molar mass.',
      v: table(['Gas reaction', 'Volume ratio'], [['H₂ + Cl₂ → 2HCl', '1 : 1 : 2'], ['2SO₂ + O₂ → 2SO₃', '2 : 1 : 2'], ['4NH₃ + 5O₂ → 4NO + 6H₂O (steam)', '4 : 5 : 4 : 6']], 'Table of three gas reactions with their volume ratios'),
      n: 'When the given and the wanted substances are both gases, measured under the same conditions, you do not need moles at all. The volumes react in the same ratio as the coefficients. So one hundred cubic centimetres of sulphur dioxide needs half as much oxygen. But if you want a mass, convert the volume at standard conditions into moles first.',
    }),
    sl('example', 'Worked example: volume to volume, then mass', {
      b: r`**Problem.** 6.72 dm³ of chlorine, measured at STP, reacts completely with hydrogen: $\ce{H2 + Cl2 -> 2HCl}$. Find (a) the volume of hydrogen chloride formed at STP and (b) its mass. (H = 1, Cl = 35.5)

**(a)** Volume ratio Cl₂ to HCl is 1 : 2, so hydrogen chloride $= 6.72 \times 2 = 13.44$ dm³.

**(b)** Moles of HCl $= \frac{13.44}{22.4} = 0.6$. Molar mass $= 1 + 35.5 = 36.5$ g. Mass $= 0.6 \times 36.5 = 21.9$ g.`,
      v: table(['Quantity', 'Chlorine', 'Hydrogen chloride'], [['Volume at STP / dm³', '6.72', '13.44'], ['Moles', '0.3', '0.6'], ['Mass / g', '21.3', '21.9']], 'Table of volumes, moles and masses of chlorine used and hydrogen chloride formed'),
      n: 'Both chlorine and hydrogen chloride are gases, so the volumes follow the coefficients. One volume of chlorine gives two volumes of hydrogen chloride, which is thirteen point four four litres. To find the mass, divide this volume by twenty two point four to get six tenths of a mole, and multiply by the molar mass, thirty six point five. That gives twenty one point nine grams.',
    }),
    sl('check', 'Quick check: volume to volume', {
      b: 'Find a gas volume from another gas volume.',
      n: 'Quick check. For gases under the same conditions, the volumes follow the coefficients directly.',
      chk: 'vv-mcq',
    }),
    sl('concept', 'Counting particles from an equation', {
      b: 'To find the **number of molecules** of a product, find its **moles** and multiply by **Avogadro’s number**. For atoms, multiply the number of molecules by the number of atoms in one molecule.\n\nUse the value given in the question: 6 × 10²³ or 6.022 × 10²³.\n\nAlso remember: mass is conserved, so the **total mass** of the products always equals the total mass of the reactants that actually reacted.',
      v: table(['Moles of product', 'Molecules (6 × 10²³ per mole)'], [['0.1', '6 × 10²²'], ['0.3', '1.8 × 10²³'], ['2', '1.2 × 10²⁴']], 'Table converting moles of a product into numbers of molecules'),
      n: 'Sometimes the question asks how many molecules of a product are formed. Find the moles of that product in the usual way and multiply by Avogadro’s number, using whichever value the question gives. For a number of atoms, multiply again by the atoms in one molecule. And remember that mass is always conserved in a reaction.',
    }),
    sl('example', 'Worked example: heating potassium chlorate', {
      b: r`**Problem.** 24.5 g of potassium chlorate is heated until it decomposes completely: $\ce{2KClO3 -> 2KCl + 3O2}$. Find (a) the volume of oxygen at STP, (b) its mass and (c) the number of oxygen molecules. (K = 39, Cl = 35.5, O = 16; Avogadro’s number $= 6 \times 10^{23}$)

**Moles of KClO₃.** Molar mass $= 39 + 35.5 + 3 \times 16 = 122.5$ g, so moles $= \frac{24.5}{122.5} = 0.2$.

**Moles of O₂.** $0.2 \times \frac{3}{2} = 0.3$.

**(a)** Volume $= 0.3 \times 22.4 = 6.72$ dm³. **(b)** Mass $= 0.3 \times 32 = 9.6$ g. **(c)** Molecules $= 0.3 \times 6 \times 10^{23} = 1.8 \times 10^{23}$.`,
      v: chem('2KClO3 -> 2KCl + 3O2', 'Two potassium chlorate gives two potassium chloride plus three oxygen', 'Mole ratio KClO₃ : O₂ = 2 : 3.'),
      n: 'Potassium chlorate has a molar mass of one hundred and twenty two point five, so twenty four point five grams is two tenths of a mole. Two moles of it give three moles of oxygen, so we get three tenths of a mole of oxygen. That fills six point seven two litres at standard conditions, weighs nine point six grams, and contains one point eight times ten to the twenty three molecules.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Coefficients give the mole ratio (and the volume ratio for gases), not the mass ratio.',
        'Three steps: given → moles; × mole ratio; moles → mass, volume or particles.',
        'Gas at STP: moles = volume in dm³ ÷ 22.4; volume = moles × 22.4.',
        'Gas to gas at the same conditions: use the volume ratio directly.',
        'Total mass of reactants used = total mass of products.',
      ],
      v: V.bridge,
      n: 'To sum up Part 2. The coefficients of a balanced equation give the mole ratio, and for gases the volume ratio. Change the given amount into moles, use the mole ratio, and change the answer into a mass, a gas volume or a number of particles. When both substances are gases under the same conditions, the volumes follow the coefficients directly.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write and check the balanced equation before any arithmetic.',
        'Show the mole ratio as a separate line: it carries a mark.',
        'Give units with every answer: g, dm³ or cm³, mol.',
        'Watch for “excess”: the substance in excess does not limit the product.',
      ],
      v: table(['Slip', 'Fix'], [['Using coefficients as a mass ratio', 'Coefficients are a mole ratio'], ['Forgetting the mole ratio (2 : 3)', 'Multiply by the ratio from the equation'], ['Using 22.4 dm³ for a solid', 'Molar volume is for gases only']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Write the balanced equation first and check it. Show the mole ratio on its own line, because examiners give a mark for it. Put a unit on every answer. And when a question says a reactant is in excess, the amount of product depends on the other reactant.',
    }),
  ],
});
