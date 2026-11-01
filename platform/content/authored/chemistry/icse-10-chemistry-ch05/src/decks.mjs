// ICSE 10 Chemistry ch05 Mole Concept: Gas Laws, Molar Volume and Avogadro's Number — two decks: Part 1 (t01–t02)
// Gay-Lussac's law of combining volumes, volume calculations, Avogadro's law and atomicity; Part 2 (t03–t05) the mole,
// Avogadro's number, gram atomic and gram molecular mass, molar volume at STP and vapour density.
import { sl, deck, table, flow, chem, svgV, r } from './lib.mjs';
import { COMBINING_VOLUMES, EQUAL_VOLUMES, MOLE_MAP } from './svgs.mjs';

const V = {
  volumes: svgV(COMBINING_VOLUMES, 'Boxes showing one volume of nitrogen and three of hydrogen giving two volumes of ammonia, and one volume each of hydrogen and chlorine giving two volumes of hydrogen chloride'),
  equal: svgV(EQUAL_VOLUMES, 'Three equal jars of hydrogen, oxygen and carbon dioxide, each with the same number of molecules but different masses'),
  map: svgV(MOLE_MAP, 'Mole map linking moles to mass, number of particles and volume of gas at STP'),
};

export const deck1 = deck({
  part: 1,
  title: 'Mole Concept — Part 1: Gas volume laws',
  goals: [
    "State Gay-Lussac's law of combining volumes",
    'Calculate the volumes of gases that react or form, using a balanced equation',
    "State Avogadro's law and link gas volumes to numbers of molecules",
    'Explain why hydrogen, oxygen, nitrogen and chlorine are diatomic',
  ],
  slides: [
    sl('title', 'Gases react in simple volume ratios', {
      b: 'Part 1 — when gases react, their volumes (measured under the same conditions) are in small whole-number ratios. Two laws explain this, and they lead us to the mole.',
      v: table(['Reaction (all gases)', 'Volume ratio'], [['Hydrogen + chlorine → hydrogen chloride', '1 : 1 : 2'], ['Nitrogen + hydrogen → ammonia', '1 : 3 : 2'], ['Nitrogen + oxygen → nitrogen monoxide', '1 : 1 : 2'], ['Carbon monoxide + oxygen → carbon dioxide', '2 : 1 : 2']], 'Table of four gas reactions and the simple whole-number ratios of their volumes'),
      n: 'Namaste! In this chapter we learn to count tiny particles by weighing them and by measuring the volumes of gases. We begin with gases. When gases react, their volumes are always in small, simple ratios, as long as all of them are measured at the same temperature and pressure. Two scientists, Gay-Lussac and Avogadro, explained this pattern, and their ideas lead us straight to the mole.',
    }),
    sl('concept', "Gay-Lussac's law of combining volumes", {
      b: "**Gay-Lussac's law:** when gases react, they do so in volumes that bear a **simple whole-number ratio** to one another and to the volumes of the **gaseous products**, provided all the volumes are measured at the **same temperature and pressure**.\n\nFor ammonia: 1 volume of nitrogen + 3 volumes of hydrogen → 2 volumes of ammonia. The ratio of the volumes is the ratio of the **coefficients** in the balanced equation.",
      v: V.volumes,
      n: 'Gay-Lussac found that reacting gases always combine in simple whole number ratios by volume, and that any gaseous product fits the same pattern. For example, one volume of nitrogen reacts with three volumes of hydrogen to give two volumes of ammonia. These numbers are exactly the coefficients in the balanced equation. The law holds only when every volume is measured at the same temperature and pressure.',
    }),
    sl('check', 'Quick check: volume ratios', {
      b: 'Read the volume ratio straight from a balanced equation.',
      n: 'Quick check. For gases at the same temperature and pressure, the volume ratio is the same as the ratio of the coefficients in the balanced equation.',
      chk: 'ratio-mcq',
    }),
    sl('concept', 'Using the law: what counts and what does not', {
      b: '- Only **gases** are counted. Solids and liquids (for example, water at room temperature) take up almost no volume and are **left out**.\n- All volumes must be at the **same temperature and pressure**.\n- The law gives the volumes that **react**; a gas present in **excess** stays partly unused, and the unused part is added to the final volume.\n- Steam is counted as a gas only when the volumes are measured **above 100 °C**.',
      v: table(['Substance in the equation', 'Counted in volume work?'], [['Gaseous reactant (O₂, H₂, CO)', 'Yes'], ['Gaseous product (CO₂, NH₃, SO₂)', 'Yes'], ['Water formed at room temperature', 'No — it condenses to a liquid'], ['Solid (carbon, sulphur)', 'No']], 'Table showing that gaseous reactants and products are counted but liquid water and solids are not'),
      n: 'Use the law with care. Only gases count. Water formed at room temperature turns into a liquid and takes up almost no space, so leave it out. Solids such as carbon are ignored too. Every volume must be measured at the same temperature and pressure. And if one gas is in excess, the extra amount simply remains, so add it to the gas left at the end.',
    }),
    sl('example', 'Worked example: burning propane', {
      b: r`**Problem.** 60 cm³ of propane is burnt completely in oxygen: $\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}$. Find the volume of oxygen used and of carbon dioxide formed (all volumes at room temperature and the same pressure).

**Step 1.** Volume ratio of the gases, propane to oxygen to carbon dioxide, is 1 : 5 : 3 (water is a liquid).

**Step 2.** Oxygen used $= 60 \times 5 = 300$ cm³.

**Step 3.** Carbon dioxide formed $= 60 \times 3 = 180$ cm³.`,
      v: chem('C3H8 + 5O2 -> 3CO2 + 4H2O', 'One propane plus five oxygen gives three carbon dioxide plus four water', 'Gas volumes react in the ratio 1 : 5 : 3.'),
      n: 'Start with the balanced equation. One volume of propane needs five volumes of oxygen and forms three volumes of carbon dioxide. The water condenses at room temperature, so it is not counted. Sixty cubic centimetres of propane therefore uses five times as much oxygen, three hundred cubic centimetres, and forms three times as much carbon dioxide, one hundred and eighty cubic centimetres.',
    }),
    sl('example', 'Worked example: one gas in excess', {
      b: r`**Problem.** 100 cm³ of hydrogen is mixed with 40 cm³ of oxygen and exploded: $\ce{2H2 + O2 -> 2H2O}$. The gas left is cooled to room temperature. Find its volume and name it.

**Step 1.** 40 cm³ of oxygen needs $40 \times 2 = 80$ cm³ of hydrogen, so hydrogen is in excess.

**Step 2.** Hydrogen left over $= 100 - 80 = 20$ cm³.

**Step 3.** The water condenses, so the gas left is **20 cm³ of hydrogen**.`,
      v: flow('LR', [['a', 'Find the volume each gas needs'], ['b', 'Gas used up completely'], ['c', 'Gas in excess: subtract the volume used'], ['d', 'Gas left = excess gas + gaseous products']], [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd']], 'Flow for solving a gas volume problem in which one gas is in excess'),
      n: 'When two gases are mixed, first find which one runs out. Forty cubic centimetres of oxygen needs twice its volume of hydrogen, that is eighty. We have one hundred, so hydrogen is in excess, and twenty cubic centimetres of it is left over. The water formed condenses on cooling, so the only gas left is twenty cubic centimetres of hydrogen.',
    }),
    sl('check', 'Quick check: gas left over', {
      b: 'Find the gas remaining when one reactant is in excess.',
      n: 'Quick check. Work out which gas runs out first, then add up all the gases that are left at room temperature.',
      chk: 'excess-mcq',
    }),
    sl('concept', "Avogadro's law", {
      b: "**Avogadro's law:** **equal volumes of all gases**, under the **same conditions of temperature and pressure**, contain **equal numbers of molecules**.\n\nSo, at a fixed temperature and pressure, the **volume** of a gas is a measure of the **number of its molecules**: twice the volume means twice the molecules. Equal volumes of different gases have different masses, because their molecules have different masses.",
      v: V.equal,
      n: 'Avogadro suggested a simple idea. Equal volumes of all gases, at the same temperature and pressure, contain the same number of molecules. A litre of hydrogen and a litre of carbon dioxide hold exactly the same number of molecules, even though the carbon dioxide is far heavier, because each of its molecules is heavier. So, for gases, measuring a volume is a way of counting molecules.',
    }),
    sl('concept', 'Volumes, molecules and coefficients', {
      b: 'Putting the two laws together, at the same temperature and pressure:\n\n**ratio of volumes = ratio of numbers of molecules = ratio of coefficients**.\n\nIf 10 cm³ of nitrogen contains *x* molecules, then in N₂ + 3H₂ → 2NH₃, *x* molecules of nitrogen react with 3*x* molecules of hydrogen to give 2*x* molecules of ammonia.',
      v: table(['Quantity', 'Nitrogen', 'Hydrogen', 'Ammonia'], [['Coefficient', '1', '3', '2'], ['Volume', '10 cm³', '30 cm³', '20 cm³'], ['Molecules', 'x', '3x', '2x']], 'Table showing that the coefficients, volumes and numbers of molecules in the formation of ammonia are all in the ratio one to three to two'),
      n: 'Put the two laws together. Gay-Lussac tells us that volumes react in the ratio of the coefficients, and Avogadro tells us that equal volumes hold equal numbers of molecules. So the ratio of volumes, the ratio of molecules and the ratio of coefficients are all the same. In ammonia formation, ten cubic centimetres of nitrogen meets thirty of hydrogen, and their molecules react in the same one to three ratio.',
    }),
    sl('example', 'Worked example: counting molecules from volumes', {
      b: r`**Problem.** At a certain temperature and pressure, 20 cm³ of nitrogen contains *x* molecules. How many molecules are there in (a) 60 cm³ of hydrogen and (b) the ammonia formed when the 20 cm³ of nitrogen reacts completely with hydrogen ($\ce{N2 + 3H2 -> 2NH3}$), all at the same temperature and pressure?

**(a)** 60 cm³ is $60 \div 20 = 3$ times the volume, so it holds **3x** molecules (Avogadro's law).

**(b)** Ammonia formed $= 20 \times 2 = 40$ cm³, twice the volume of the nitrogen, so it holds **2x** molecules.`,
      v: table(['Gas', 'Volume / cm³', 'Molecules'], [['Nitrogen', '20', 'x'], ['Hydrogen', '60', '3x'], ['Ammonia formed', '40', '2x']], 'Table of the volumes and numbers of molecules of nitrogen, hydrogen and the ammonia formed'),
      n: 'By Avogadro’s law, the number of molecules is proportional to the volume. Sixty cubic centimetres of hydrogen is three times twenty, so it holds three x molecules. From the equation, twenty cubic centimetres of nitrogen gives twice its volume of ammonia, forty cubic centimetres, and that holds two x molecules.',
    }),
    sl('check', "Quick check: Avogadro's law", {
      b: 'Compare equal volumes of two different gases.',
      n: 'Quick check. Think about what is the same, and what is different, in equal volumes of two gases at the same temperature and pressure.',
      chk: 'avo-mcq',
    }),
    sl('concept', 'Atomicity: why hydrogen and chlorine are diatomic', {
      b: "**Atomicity** is the number of atoms in one molecule of an element.\n\nIn H₂ + Cl₂ → 2HCl, **1 volume** of hydrogen gives **2 volumes** of hydrogen chloride. By Avogadro's law, *n* molecules of hydrogen give 2*n* molecules of hydrogen chloride. Each of these contains at least one hydrogen atom, so every hydrogen molecule must split into **two** atoms: hydrogen is **diatomic**. The same reasoning applies to chlorine, and the formation of ammonia and of nitrogen monoxide shows that **nitrogen** and **oxygen** are diatomic too. (The formal proof is not examined; learn the result.)",
      v: table(['Element', 'Molecule', 'Atomicity'], [['Helium, argon', 'He, Ar', '1 (monatomic)'], ['Hydrogen, oxygen, nitrogen, chlorine', 'H₂, O₂, N₂, Cl₂', '2 (diatomic)'], ['Ozone', 'O₃', '3 (triatomic)'], ['Phosphorus', 'P₄', '4 (tetratomic)']], 'Table of elements with atomicity one, two, three and four'),
      n: 'Atomicity is the number of atoms in a molecule of an element. One volume of hydrogen forms two volumes of hydrogen chloride, so each hydrogen molecule ends up in two molecules of product. That is only possible if each hydrogen molecule contains two atoms. The same reasoning shows that chlorine, nitrogen and oxygen are diatomic. You need the result, not the formal proof.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        "Gay-Lussac's law: reacting gases and gaseous products are in simple whole-number volume ratios (same temperature and pressure).",
        'Volume ratio = ratio of coefficients; leave out liquids and solids; add any excess gas to what is left.',
        "Avogadro's law: equal volumes of gases at the same temperature and pressure contain equal numbers of molecules.",
        'Ratio of volumes = ratio of molecules = ratio of coefficients.',
        'Hydrogen, oxygen, nitrogen and chlorine are diatomic; the noble gases are monatomic.',
      ],
      v: table(['Law', 'Key idea'], [["Gay-Lussac's law", 'Gas volumes react in simple whole-number ratios'], ["Avogadro's law", 'Equal volumes contain equal numbers of molecules']], 'Summary table of the two gas laws of Part 1'),
      n: 'To sum up Part 1. Gases react in simple whole number ratios by volume, the same as the coefficients in the equation, as long as every volume is measured under the same conditions. Equal volumes of gases hold equal numbers of molecules. Leave out liquids and solids, and remember to add any gas left in excess.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the balanced equation first, then read the volume ratio from the coefficients.',
        'Cross out water (a liquid at room temperature) before adding up gas volumes.',
        'In mixture questions, find the gas that is used up first; the excess gas remains.',
        'In both laws, state the condition: same temperature and same pressure.',
      ],
      v: table(['Slip', 'Fix'], [['Counting liquid water as a gas volume', 'Leave it out at room temperature'], ['Forgetting the gas in excess', 'Add it to the final volume'], ["Avogadro's law with “equal numbers of atoms”", 'Equal numbers of molecules']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Always start from the balanced equation. Leave out water if the volumes are measured at room temperature. When gases are mixed, find which one runs out first, and add the excess gas to the final volume. And when you state Avogadro’s law, say molecules, not atoms, and mention the same temperature and pressure.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Mole Concept — Part 2: The mole, molar volume and vapour density',
  goals: [
    "Define the mole and Avogadro's number",
    'Distinguish atomic mass from gram atomic mass, and molecular mass from gram molecular mass',
    'Convert between mass, moles, number of particles and volume of a gas at STP',
    'Use vapour density to find relative molecular mass',
  ],
  slides: [
    sl('title', 'Counting by weighing', {
      b: 'Part 2 — atoms and molecules are far too small to count one by one, so chemists count them in huge bundles called **moles**, by weighing.',
      v: table(['Counting unit', 'Number of items'], [['A pair', '2'], ['A dozen', '12'], ['A ream of paper', '500 sheets'], ['A mole', '6.022 × 10²³ particles']], 'Table comparing a pair, a dozen, a ream and a mole as counting units'),
      n: 'A shopkeeper does not count rice grains one by one. She weighs them. Chemists do the same with atoms and molecules, which are far too tiny to count. They use a counting unit called the mole. Just as a dozen means twelve, a mole means a fixed, enormous number of particles. In this part we learn to move between mass, moles, particles and gas volume.',
    }),
    sl('concept', "The mole and Avogadro's number", {
      b: r`**Mole:** the amount of a substance that contains as many particles (atoms, molecules or ions) as there are atoms in exactly **12 g of carbon-12**.

This number is **Avogadro's number**, $N_\text{A} = 6.022 \times 10^{23}$ (often rounded to $6 \times 10^{23}$).

- 1 mol of carbon contains 6.022 × 10²³ atoms.
- 1 mol of water contains 6.022 × 10²³ molecules.
- 1 mol of sodium chloride contains 6.022 × 10²³ Na⁺ ions and as many Cl⁻ ions.`,
      v: V.map,
      n: 'A mole is the amount of substance that contains as many particles as there are atoms in exactly twelve grams of carbon twelve. That number is called Avogadro’s number, about six point zero two two times ten to the power twenty three. A mole of carbon has that many atoms, a mole of water has that many molecules, and the map shows how moles link mass, particles and gas volume.',
    }),
    sl('concept', 'Gram atomic mass and gram molecular mass', {
      b: '- **Atomic mass** (relative atomic mass): the mass of one atom compared with one-twelfth of the mass of a carbon-12 atom; sodium = 23 (u).\n- **Gram atomic mass**: the atomic mass expressed **in grams**, the mass of **1 mol of atoms**; sodium = 23 g.\n- **Molecular mass** (relative molecular mass): the sum of the atomic masses in one molecule; water = 2 × 1 + 16 = 18 (u).\n- **Gram molecular mass** (molar mass): the molecular mass **in grams**, the mass of **1 mol of molecules**; water = 18 g.',
      v: table(['Substance', 'Atomic or molecular mass', 'Gram atomic or molecular mass', 'Particles in that mass'], [['Sodium, Na', '23 u', '23 g', '6.022 × 10²³ atoms'], ['Water, H₂O', '18 u', '18 g', '6.022 × 10²³ molecules'], ['Carbon dioxide, CO₂', '44 u', '44 g', '6.022 × 10²³ molecules']], 'Table comparing atomic or molecular mass with gram atomic or gram molecular mass for sodium, water and carbon dioxide'),
      n: 'Be clear about two pairs of terms. The atomic mass of sodium is twenty three, which compares one atom with carbon twelve. The gram atomic mass is twenty three grams, the mass of a whole mole of sodium atoms. In the same way, the molecular mass of water is eighteen, while its gram molecular mass, or molar mass, is eighteen grams, the mass of one mole of water molecules.',
    }),
    sl('example', 'Worked example: moles, molecules and atoms', {
      b: r`**Problem.** For 4.4 g of carbon dioxide, find (a) the number of moles, (b) the number of molecules and (c) the number of atoms. (C = 12, O = 16; $N_\text{A} = 6.022 \times 10^{23}$)

**Step 1.** Molar mass of CO₂ $= 12 + 2 \times 16 = 44$ g.

**Step 2.** Moles $= \frac{4.4}{44} = 0.1$ mol.

**Step 3.** Molecules $= 0.1 \times 6.022 \times 10^{23} = 6.022 \times 10^{22}$.

**Step 4.** Each molecule has 3 atoms, so atoms $= 3 \times 6.022 \times 10^{22} = 1.8066 \times 10^{23}$.`,
      v: table(['Quantity', 'Value'], [['Mass', '4.4 g'], ['Moles', '0.1 mol'], ['Molecules', '6.022 × 10²²'], ['Atoms (3 per molecule)', '1.8066 × 10²³']], 'Table of the mass, moles, molecules and atoms in a sample of carbon dioxide'),
      n: 'First find the molar mass of carbon dioxide: twelve plus two times sixteen gives forty four grams. Four point four grams is one tenth of a mole. One tenth of Avogadro’s number gives the number of molecules. Each molecule contains one carbon and two oxygen atoms, so multiply by three to get the total number of atoms.',
    }),
    sl('check', 'Quick check: mass to moles', {
      b: 'Convert a mass into moles.',
      n: 'Quick check. Divide the mass by the molar mass to get the number of moles.',
      chk: 'water-mcq',
    }),
    sl('concept', 'Molar volume of a gas', {
      b: '**Molar volume:** one mole of **any gas** occupies **22.4 dm³** (22.4 litres, or 22 400 cm³) at **STP**.\n\n**STP** (standard temperature and pressure): **273 K** (0 °C) and **1 atm** (760 mm of mercury).\n\nSo **22.4 dm³ of a gas at STP weighs its gram molecular mass**: 22.4 dm³ of oxygen weighs 32 g, and of carbon dioxide, 44 g. This applies only to **gases**, not to liquids or solids. (The derivation of molar volume is not examined.)',
      v: table(['Gas at STP', 'Molar mass / g', 'Volume of 1 mol', 'Mass of 22.4 dm³'], [['Hydrogen', '2', '22.4 dm³', '2 g'], ['Oxygen', '32', '22.4 dm³', '32 g'], ['Carbon dioxide', '44', '22.4 dm³', '44 g'], ['Ammonia', '17', '22.4 dm³', '17 g']], 'Table showing that one mole of hydrogen, oxygen, carbon dioxide and ammonia each occupies 22.4 cubic decimetres at STP and weighs its molar mass'),
      n: 'Because equal volumes of gases hold equal numbers of molecules, one mole of any gas fills the same volume. At standard temperature and pressure, which is zero degrees Celsius and one atmosphere, that volume is twenty two point four litres. So twenty two point four litres of a gas at these conditions weighs its molar mass. Remember, this works only for gases.',
    }),
    sl('example', 'Worked example: identifying a gas from its mass', {
      b: r`**Problem.** 448 cm³ of a gas at STP weighs 1.28 g. Find its molar mass and identify it from oxygen, sulphur dioxide and carbon dioxide. (S = 32, O = 16, C = 12)

**Step 1.** Volume in dm³ $= 448 \div 1000 = 0.448$.

**Step 2.** Moles $= \frac{0.448}{22.4} = 0.02$ mol.

**Step 3.** Molar mass $= \frac{1.28}{0.02} = 64$ g mol⁻¹.

**Step 4.** Sulphur dioxide, SO₂: $32 + 2 \times 16 = 64$. The gas is **sulphur dioxide**.`,
      v: flow('LR', [['a', 'Volume at STP (dm³)'], ['b', 'Moles'], ['c', 'Molar mass'], ['d', 'Identify the gas']], [['a', 'b', '÷ 22.4'], ['b', 'c', 'mass ÷ moles'], ['c', 'd', 'compare']], 'Flow from the volume of a gas at STP to its moles, its molar mass and its identity'),
      n: 'Change four hundred and forty eight cubic centimetres into litres: zero point four four eight. Divide by twenty two point four to get the moles, which is two hundredths of a mole. The molar mass is the mass divided by the moles, sixty four grams per mole. Sulphur dioxide has a molar mass of sixty four, so that is the gas.',
    }),
    sl('check', 'Quick check: molar volume', {
      b: 'Find the volume of a gas at STP from its moles.',
      n: 'Quick check. Multiply the number of moles of gas by twenty two point four to get its volume at standard temperature and pressure.',
      chk: 'n2vol-mcq',
    }),
    sl('concept', 'Vapour density', {
      b: r`**Vapour density (VD)** of a gas: the ratio of the mass of a certain volume of the gas to the mass of the **same volume of hydrogen**, at the **same temperature and pressure**.

Useful relation (its proof is not examined): **relative molecular mass = 2 × vapour density**.

Vapour density is a ratio of two masses, so it has **no unit**. Example: vapour density of oxygen $= 32 \div 2 = 16$.`,
      v: table(['Gas', 'Relative molecular mass', 'Vapour density'], [['Hydrogen', '2', '1'], ['Ammonia', '17', '8.5'], ['Oxygen', '32', '16'], ['Carbon dioxide', '44', '22'], ['Chlorine', '71', '35.5']], 'Table of five gases with relative molecular masses and vapour densities, each vapour density being half the molecular mass'),
      n: 'Vapour density compares how heavy a gas is with hydrogen. It is the mass of some volume of the gas divided by the mass of the same volume of hydrogen, under the same conditions. Since a hydrogen molecule has a mass of two, the relative molecular mass of any gas is twice its vapour density. Vapour density is a ratio, so it has no unit.',
    }),
    sl('example', 'Worked example: using vapour density', {
      b: r`**Problem.** A gas X has a vapour density of 17. (a) Find its relative molecular mass. (b) Find the mass of 5.6 dm³ of X at STP. (c) X is a hydride of sulphur; suggest its formula. (H = 1, S = 32)

**(a)** $M = 2 \times 17 = 34$.

**(b)** Moles $= \frac{5.6}{22.4} = 0.25$, so mass $= 0.25 \times 34 = 8.5$ g.

**(c)** Hydrogen sulphide, H₂S: $2 \times 1 + 32 = 34$, which matches.`,
      v: table(['Step', 'Working', 'Result'], [['Relative molecular mass', '2 × 17', '34'], ['Moles in 5.6 dm³', '5.6 ÷ 22.4', '0.25 mol'], ['Mass', '0.25 × 34 g', '8.5 g']], 'Table of the working for a gas of vapour density seventeen'),
      n: 'Double the vapour density to get the relative molecular mass: two times seventeen is thirty four. Five point six litres is one quarter of twenty two point four, so it is a quarter of a mole, which weighs a quarter of thirty four grams, that is eight point five grams. Hydrogen sulphide, with two hydrogens and one sulphur, has exactly this molecular mass.',
    }),
    sl('check', 'Quick check: vapour density', {
      b: 'Find a vapour density from a formula.',
      n: 'Quick check. Work out the relative molecular mass first, then halve it.',
      chk: 'so2vd-mcq',
    }),
    sl('concept', 'The mole map: putting it together', {
      b: 'Every mole calculation passes through **moles**:\n\n- moles = mass ÷ gram molecular (or atomic) mass\n- moles = number of particles ÷ 6.022 × 10²³\n- moles of a gas = volume at STP in dm³ ÷ 22.4\n- molar mass = 2 × vapour density\n\nConvert what you are given into moles first, then into whatever is asked.',
      v: flow('LR', [['m', 'Mass (g)'], ['n', 'Moles'], ['p', 'Number of particles'], ['v', 'Gas volume at STP (dm³)'], ['d', 'Vapour density'], ['mm', 'Molar mass']], [['m', 'n', '÷ molar mass'], ['n', 'p', '× 6.022 × 10²³'], ['n', 'v', '× 22.4'], ['d', 'mm', '× 2']], 'Flow showing mass divided by molar mass gives moles, moles times Avogadro’s number gives particles, moles times 22.4 gives gas volume at STP, and vapour density times two gives molar mass'),
      n: 'Here is the master plan for every mole problem. Turn whatever you are given into moles first. Divide a mass by the molar mass, divide a number of particles by Avogadro’s number, or divide a gas volume at standard conditions by twenty two point four. Then multiply out to whatever the question asks. If you know the vapour density, double it to get the molar mass.',
    }),
    sl('example', 'Worked example: one sample, four answers', {
      b: r`**Problem.** For 3.4 g of ammonia gas, find (a) the moles, (b) the volume at STP, (c) the number of molecules and (d) the number of hydrogen atoms. (N = 14, H = 1; take $N_\text{A} = 6 \times 10^{23}$)

**(a)** Molar mass $= 14 + 3 \times 1 = 17$ g, so moles $= \frac{3.4}{17} = 0.2$ mol.

**(b)** Volume $= 0.2 \times 22.4 = 4.48$ dm³.

**(c)** Molecules $= 0.2 \times 6 \times 10^{23} = 1.2 \times 10^{23}$.

**(d)** Hydrogen atoms $= 3 \times 1.2 \times 10^{23} = 3.6 \times 10^{23}$.`,
      v: table(['Asked', 'Working', 'Answer'], [['Moles', '3.4 ÷ 17', '0.2 mol'], ['Volume at STP', '0.2 × 22.4', '4.48 dm³'], ['Molecules', '0.2 × 6 × 10²³', '1.2 × 10²³'], ['Hydrogen atoms', '3 × 1.2 × 10²³', '3.6 × 10²³']], 'Table of the working for the moles, volume, molecules and hydrogen atoms in a sample of ammonia'),
      n: 'Ammonia has a molar mass of seventeen, so three point four grams is two tenths of a mole. At standard conditions that fills two tenths of twenty two point four, which is four point four eight litres. The molecules are two tenths of six times ten to the power twenty three. Each ammonia molecule has three hydrogen atoms, so multiply the number of molecules by three.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        "1 mole = 6.022 × 10²³ particles (Avogadro's number).",
        'Gram atomic or gram molecular mass = the mass of 1 mol, in grams.',
        'Molar volume: 1 mol of any gas occupies 22.4 dm³ at STP (273 K, 1 atm).',
        'Relative molecular mass = 2 × vapour density; vapour density has no unit.',
        'Convert everything to moles first.',
      ],
      v: V.map,
      n: 'To sum up Part 2. A mole is Avogadro’s number of particles. The gram molecular mass is the mass of one mole. One mole of any gas fills twenty two point four litres at standard temperature and pressure. The relative molecular mass is twice the vapour density. And in every problem, change what you are given into moles first.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write out the molar mass calculation; it earns a step mark.',
        'Convert cm³ to dm³ (divide by 1000) before dividing by 22.4.',
        'Read the question: molecules or atoms? For atoms, multiply by the number of atoms in one molecule.',
        "Use the value of Avogadro's number given in the question (6 × 10²³ or 6.022 × 10²³).",
        'Give vapour density without a unit; give molar mass in g mol⁻¹.',
      ],
      v: table(['Slip', 'Fix'], [['Dividing cm³ by 22.4', 'Divide by 22 400, or convert to dm³ first'], ['Molecules given when atoms are asked', 'Multiply by the number of atoms per molecule'], ['Molar volume used for water', '22.4 dm³ is for gases only']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Show the molar mass working, because it earns marks. Change cubic centimetres into litres before dividing by twenty two point four. Check whether the question wants molecules or atoms. Use whichever value of Avogadro’s number the question gives. And never use the molar volume for a liquid such as water.',
    }),
  ],
});
