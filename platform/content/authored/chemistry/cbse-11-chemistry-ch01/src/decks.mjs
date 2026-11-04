// ch01 Some Basic Concepts of Chemistry — two decks: Part 1 (t01–t03) measurement, laws of combination, atomic mass, mole;
// Part 2 (t04–t05) composition, formulae, stoichiometry, limiting reagent, concentration terms.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { MOLE_MAP, LIMITING } from './svgs.mjs';

export const V = {
  moleMap: svgV(MOLE_MAP, 'The mole map: mass, number of particles, gas volume and solution amount all connect to amount of substance in moles through molar mass, the Avogadro constant, molar volume and molarity', 'Arrows show the multiplication or division needed to move from one quantity to another.'),
  limiting: svgV(LIMITING, 'Bar chart of moles before and after the reaction of six moles of magnesium with two moles of oxygen: oxygen is used up, two moles of magnesium remain and four moles of magnesium oxide form', 'Oxygen runs out first, so it decides how much product forms.'),
};

export const deck1 = deck({
  part: 1,
  title: 'Some Basic Concepts of Chemistry — Part 1: Measurement, laws of combination and the mole',
  goals: [
    'Use SI units, scientific notation and significant figures when reporting measurements',
    'State and test the laws of chemical combination against experimental data',
    'Explain Dalton’s atomic theory, atomic mass and molecular mass',
    'Convert between mass, amount in moles and number of particles',
  ],
  slides: [
    sl('title', 'Some Basic Concepts of Chemistry', {
      b: 'Part 1 — how chemists measure, why matter combines in fixed ratios, and how the mole lets us count atoms by weighing.',
      v: table(['Quantity', 'Typical size'], [['Atoms in a grain of salt', r`about $10^{18}$ formula units`], ['Mass of one carbon atom', r`$2.0 \times 10^{-23}$ g`], ['Atoms in 12 g of carbon-12', r`$6.022 \times 10^{23}$`], ['Diameter of an atom', r`about $10^{-10}$ m`]], 'Table of very large and very small quantities met in chemistry'),
      n: 'Welcome. A single grain of salt holds billions of billions of particles, and one carbon atom weighs a tiny fraction of a billionth of a billionth of a gram. Chemistry needs ways to handle such huge and tiny numbers honestly. In this part we learn how to report measurements, the laws that govern how elements combine, and the mole, the chemist’s counting unit.',
    }),
    sl('concept', 'Measurement and SI units', {
      b: 'A measurement is a **number with a unit**. Chemists use the SI system: seven base units, with prefixes to scale them. Volume is often given in litres: $1\\ \\text{L} = 1\\ \\text{dm}^3 = 10^{-3}\\ \\text{m}^3$.',
      v: table(['Quantity', 'SI unit', 'Symbol'], [['Length', 'metre', 'm'], ['Mass', 'kilogram', 'kg'], ['Time', 'second', 's'], ['Temperature', 'kelvin', 'K'], ['Amount of substance', 'mole', 'mol'], ['Prefixes', 'milli, micro, nano, pico', r`$10^{-3}, 10^{-6}, 10^{-9}, 10^{-12}$`]], 'Table of SI base units used in chemistry and common prefixes'),
      n: 'Every measurement has a number and a unit. The SI system gives a base unit for each quantity: metre for length, kilogram for mass, second for time, kelvin for temperature and mole for the amount of a substance. Prefixes such as milli, micro and nano scale these units by powers of ten. Volume in the laboratory is usually measured in litres, where one litre equals one cubic decimetre.',
    }),
    sl('concept', 'Scientific notation, accuracy and precision', {
      b: 'Write numbers as $N \\times 10^{n}$ with $1 \\le N < 10$. **Precision** is closeness of repeated readings to each other; **accuracy** is closeness to the true value.',
      v: table(['Readings of a 10.00 g standard', 'Precise?', 'Accurate?'], [['10.01, 10.02, 10.01', 'Yes', 'Yes'], ['9.52, 9.51, 9.52', 'Yes', 'No'], ['9.8, 10.3, 10.1', 'No', 'Roughly on average']], 'Table comparing three sets of readings for precision and accuracy'),
      n: 'Scientific notation writes a number as a digit part between one and ten times a power of ten, which keeps tiny and huge numbers readable. Next, two words that are often confused. Precision means repeated readings agree with each other. Accuracy means they agree with the true value. A balance can give very consistent readings and still be wrong if it is not calibrated.',
    }),
    sl('concept', 'Significant figures', {
      b: 'Significant figures show how well a quantity is known. **Addition and subtraction:** keep the fewest *decimal places*. **Multiplication and division:** keep the fewest *significant figures*. Exact counts and definitions have unlimited significant figures.',
      v: table(['Rule', 'Example', 'Significant figures'], [['Non-zero digits count', '3.47', '3'], ['Zeros between digits count', '2.0305', '5'], ['Leading zeros do not', '0.00450', '3'], ['Trailing zeros after a decimal point count', '12.00', '4'], ['Trailing zeros in a whole number are ambiguous', r`$1500$ vs $1.50 \times 10^{3}$`, '? vs 3']], 'Table of rules for counting significant figures with examples'),
      n: 'Count significant figures by simple rules. Non-zero digits always count, and so do zeros trapped between them. Zeros at the start do not count, they only place the decimal point. Zeros at the end count when there is a decimal point. When adding, keep the fewest decimal places; when multiplying or dividing, keep the fewest significant figures, and round only at the very end.',
    }),
    sl('example', 'Worked example: significant figures', {
      b: r`**Problem.** Report each result with the correct number of significant figures. (a) $12.11 + 18.0 + 1.013$ (b) $\dfrac{0.0450 \times 12.5}{3.2}$ (c) Write $0.0000560$ in scientific notation.

**(a)** Sum $= 31.123$. The least precise term, 18.0, has one decimal place, so the answer is $31.1$.

**(b)** Numerator $0.0450 \times 12.5 = 0.5625$; dividing by 3.2 gives $0.17578$. The least precise data item (3.2) has two significant figures, so the answer is $0.18$.

**(c)** Move the decimal five places: $5.60 \times 10^{-5}$ (three significant figures).`,
      v: flow('LR', [['a', 'Add or subtract: fewest decimal places'], ['b', 'Multiply or divide: fewest significant figures'], ['c', 'Round only at the last step']], [['a', 'b'], ['b', 'c']], 'Flow showing the order of rules for significant figures in calculations'),
      n: 'Work through the three parts. In the sum, the term with the fewest decimal places is eighteen point zero, so the result is rounded to one decimal place. In the product and quotient, the least precise number has two significant figures, so the answer has two. And in scientific notation, moving the decimal point five places to the right gives ten to the minus five, keeping three significant figures.',
    }),
    sl('check', 'Quick check: significant figures', {
      b: 'Apply the rules to a calculated result.',
      n: 'Quick check. Decide whether the rule for addition or for multiplication applies, then count carefully.',
      chk: 'sf-chk',
    }),
    sl('concept', 'Laws of chemical combination', {
      b: 'Five laws describe how matter combines and form the basis of Dalton’s theory.',
      v: table(['Law', 'Statement', 'Idea'], [['Conservation of mass (Lavoisier, 1789)', 'Total mass of reactants equals total mass of products', 'Atoms are neither created nor destroyed'], ['Constant proportions (Proust, 1799)', 'A pure compound always has the same elements in the same mass ratio', 'Fixed formula'], ['Multiple proportions (Dalton, 1803)', 'When two elements form more than one compound, masses of one that combine with a fixed mass of the other are in small whole-number ratio', 'Different formulae'], ['Gaseous volumes (Gay-Lussac, 1808)', 'Gases react in simple whole-number volume ratios at constant temperature and pressure', 'Volume ratios'], ['Avogadro’s law (1811)', 'Equal volumes of gases at the same temperature and pressure contain equal numbers of molecules', 'Molecules']], 'Table of the five laws of chemical combination with their statements'),
      n: 'Five laws came from careful weighing and measuring of reactions. Lavoisier showed mass is conserved. Proust showed a pure compound always has the same elements in the same mass ratio. Dalton noticed that when two elements form several compounds, their masses combine in small whole-number ratios. Gay-Lussac found simple volume ratios for gases, and Avogadro explained them with equal numbers of molecules in equal volumes.',
    }),
    sl('example', 'Worked example: testing the laws with data', {
      b: r`**Problem.** (a) A magnesium fluoride sample from a mineral has 2.43 g Mg and 3.80 g F; a laboratory sample has 0.729 g Mg and 1.14 g F. Do they obey the law of constant proportions? (b) 1.00 g of iron forms one chloride with 1.27 g of chlorine and another with 1.91 g. Show the law of multiple proportions.

**(a)** Mass ratio F : Mg $= 3.80 / 2.43 = 1.56$ and $1.14 / 0.729 = 1.56$. Same ratio: constant proportions holds.

**(b)** Ratio of chlorine masses $= 1.27 : 1.91 = 1 : 1.50 = 2 : 3$, a simple whole-number ratio, as the law predicts (FeCl₂ and FeCl₃).`,
      v: table(['Sample', 'Mass Mg / g', 'Mass F / g', 'F : Mg'], [['Mineral', '2.43', '3.80', '1.56'], ['Laboratory', '0.729', '1.14', '1.56']], 'Table showing equal fluorine to magnesium mass ratios in two samples of magnesium fluoride'),
      n: 'To test constant proportions, divide the mass of one element by the mass of the other in each sample. If both samples give the same ratio, the law holds. To test multiple proportions, fix the mass of one element, here one gram of iron, and compare the masses of chlorine in the two compounds. A simple ratio such as two to three is the signature of the law.',
    }),
    sl('concept', 'Dalton’s atomic theory', {
      b: 'Matter is made of indivisible **atoms**; atoms of one element are identical in mass and properties; atoms of different elements differ; compounds form when atoms combine in **small whole-number ratios**; atoms are rearranged, never created or destroyed.',
      v: table(['Postulate', 'Explains which law'], [['Atoms are neither created nor destroyed', 'Conservation of mass'], ['Compounds have atoms in fixed whole-number ratio', 'Constant proportions'], ['Same atoms can combine in different ratios', 'Multiple proportions']], 'Table linking postulates of Dalton’s theory to the laws they explain'),
      n: 'Dalton proposed that all matter is made of tiny atoms. Atoms of one element are alike, atoms of different elements differ, and compounds form when atoms join in small whole-number ratios. Chemical reactions only rearrange atoms. This one idea explains why mass is conserved and why compounds have fixed and multiple proportions. Later work showed atoms are divisible, but the theory still serves chemistry well.',
    }),
    sl('concept', 'Atomic mass, molecular mass and formula mass', {
      b: 'One **atomic mass unit** (u) is $\\tfrac{1}{12}$ of the mass of a carbon-12 atom, about $1.66 \\times 10^{-27}$ kg. The atomic mass in the periodic table is a **weighted average** over the naturally occurring isotopes. **Molecular mass** is the sum of atomic masses in a molecule; for ionic solids we use **formula mass**.',
      v: table(['Isotope of chlorine', 'Mass / u', 'Abundance'], [['Chlorine-35', '34.97', '75.77 %'], ['Chlorine-37', '36.97', '24.23 %'], ['Weighted average', '35.45', 'periodic-table value']], 'Table of chlorine isotopes with masses, abundances and the weighted average atomic mass'),
      n: 'We measure atomic mass against a standard, one twelfth of a carbon twelve atom, called the atomic mass unit. The value printed in the periodic table is an average weighted by how common each isotope is. For chlorine, about three quarters is chlorine thirty-five and one quarter chlorine thirty-seven, giving thirty-five point four five. Molecular mass adds up the atomic masses in a molecule.',
    }),
    sl('example', 'Worked example: average atomic mass', {
      b: r`**Problem.** Boron has two isotopes: boron-10 (mass 10.01 u, abundance 19.9 %) and boron-11 (mass 11.01 u, abundance 80.1 %). Find the average atomic mass.

**Step 1.** Weight each mass by its fractional abundance: $0.199 \times 10.01 = 1.992$ and $0.801 \times 11.01 = 8.819$.

**Step 2.** Add: $1.992 + 8.819 = 10.81$ u.`,
      v: table(['Isotope', 'Mass / u', 'Fractional abundance', 'Contribution / u'], [['Boron-10', '10.01', '0.199', '1.992'], ['Boron-11', '11.01', '0.801', '8.819'], ['Total', '', '1.000', '10.81']], 'Table showing the weighted average atomic mass calculation for boron'),
      n: 'Multiply each isotopic mass by its fractional abundance and add the contributions. Boron ten contributes about two units, boron eleven about nine units, giving ten point eight one. Notice the answer lies much closer to eleven than to ten, because the heavier isotope is far more abundant.',
    }),
    sl('check', 'Quick check: laws of combination', {
      b: 'Match experimental data to the law it illustrates.',
      n: 'Quick check. Ask whether the data compare two samples of one compound or two different compounds of the same elements.',
      chk: 'laws-chk',
    }),
    sl('concept', 'The mole and molar mass', {
      b: 'One **mole** is the amount of substance containing as many elementary entities as there are atoms in 12 g of carbon-12: $N_\\text{A} = 6.022 \\times 10^{23}\\ \\text{mol}^{-1}$ (the **Avogadro constant**). **Molar mass** $M$ is the mass of one mole, in g mol⁻¹, numerically equal to the atomic or molecular mass in u.',
      v: table(['Substance', 'Molar mass / g mol⁻¹', 'Particles in one mole'], [['Magnesium', '24.3', r`$6.022 \times 10^{23}$ atoms`], ['Oxygen gas, $\\ce{O2}$', '32.0', r`$6.022 \times 10^{23}$ molecules`], ['Calcium chloride, $\\ce{CaCl2}$', '111.1', r`$6.022 \times 10^{23}$ formula units`]], 'Table of molar masses and particle counts for one mole of three substances'),
      n: 'The mole is the chemist’s dozen. One mole contains six point zero two two times ten to the twenty-third particles, the Avogadro constant. Its great convenience is that the mass of one mole in grams equals the atomic or molecular mass in atomic mass units. So a mole of magnesium weighs about twenty-four grams, and weighing lets us count particles indirectly.',
    }),
    sl('diagram', 'The mole map', {
      b: 'Every conversion in stoichiometry goes **through moles**: mass ÷ molar mass gives moles; moles × $N_\\text{A}$ gives particles.',
      v: V.moleMap,
      n: 'This map is worth memorising. Amount in moles sits at the centre. To go from mass to moles, divide by the molar mass; to go back, multiply. To go from moles to number of particles, multiply by the Avogadro constant. A gas volume and a solution can also be reached from moles. Whatever you are given, convert to moles first, then to what is asked.',
    }),
    sl('example', 'Worked example: mole conversions', {
      b: r`**Problem.** (a) Find the mass of 0.250 mol of sodium carbonate, $\ce{Na2CO3}$ ($M = 106$ g mol⁻¹). For phosphoric acid, $\ce{H3PO4}$ ($M = 98.0$ g mol⁻¹), find (b) the amount in 49.0 g and (c) the number of oxygen atoms in that amount.

**(a)** $m = n \times M = 0.250 \times 106 = 26.5$ g.

**(b)** $n = m / M = 49.0 / 98.0 = 0.500$ mol.

**(c)** Each molecule has 4 O atoms: $0.500 \times 4 \times 6.022 \times 10^{23} = 1.20 \times 10^{24}$ atoms.`,
      v: flow('LR', [['a', 'Mass in g'], ['b', 'Moles: divide by M'], ['c', 'Particles: multiply by N_A'], ['d', 'Atoms: multiply by atoms per molecule']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from mass to moles to molecules to atoms'),
      n: 'Each part is one step on the map. Mass of a known number of moles is moles times molar mass. Moles from a mass is mass divided by molar mass. For atoms, first count molecules with the Avogadro constant, then multiply by the number of atoms of that element in one molecule. Phosphoric acid has four oxygen atoms per molecule, so atoms outnumber molecules four to one.',
    }),
    sl('check', 'Quick check: mole conversion', {
      b: 'Convert between mass and number of particles.',
      n: 'Quick check. Go through moles: first find the amount from the mass, then multiply by the Avogadro constant.',
      chk: 'mole-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'SI units with prefixes; scientific notation $N \\times 10^n$; precision versus accuracy.',
        'Significant figures: add or subtract by decimal places; multiply or divide by significant figures.',
        'Laws: conservation of mass, constant proportions, multiple proportions, Gay-Lussac, Avogadro.',
        'Atomic mass is an isotope-weighted average; 1 u is one twelfth of the mass of carbon-12.',
        'One mole holds $6.022 \\times 10^{23}$ entities; molar mass in g mol⁻¹ equals mass in u.',
      ],
      v: table(['Law', 'Test with data'], [['Conservation of mass', 'Mass before equals mass after'], ['Constant proportions', 'Same mass ratio in different samples'], ['Multiple proportions', 'Small whole-number ratio for a fixed mass']], 'Summary table of how each law is tested with data'),
      n: 'Let us sum up Part 1. Measurements carry units and an honest number of significant figures. Matter obeys the laws of conservation of mass, constant proportions and multiple proportions, which Dalton’s theory explains. Atomic mass is an average over isotopes, and the mole, with its Avogadro constant, links mass to the number of particles. In Part 2 we use all this for formulae and reactions.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Give the final answer with the correct significant figures and the unit.',
        'Do not round intermediate steps; round once at the end.',
        'To identify a law, say which samples are compared and show the ratio.',
        'In mole problems, always go through moles and write the formula M = m / n.',
        'Count atoms, not just molecules, when the question asks for atoms.',
      ],
      v: table(['Slip', 'Fix'], [['Rounding after every step', 'Round only at the end'], ['Using atomic number as molar mass', 'Use atomic mass in g mol⁻¹'], ['Forgetting atoms per molecule', 'Multiply molecules by atoms per molecule']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some exam tips. State the answer with the right number of significant figures and the unit. Avoid rounding in the middle of a calculation. When a question names a law, show the ratio that proves it. Always route mole problems through moles, and remember that when the question asks for atoms you must multiply by the number of atoms in each molecule.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Some Basic Concepts of Chemistry — Part 2: Formulae, stoichiometry and concentration',
  goals: [
    'Calculate percentage composition and derive empirical and molecular formulae',
    'Perform mass-mass calculations from balanced equations',
    'Identify the limiting reagent and find the amount of product',
    'Express and interconvert concentration terms: mass percent, ppm, mole fraction, molarity and molality',
  ],
  slides: [
    sl('title', 'Formulae, reactions and solutions', {
      b: 'Part 2 — from the mass of each element to a formula, from a balanced equation to the mass of product, and from a bottle label to a concentration.',
      v: flow('LR', [['a', 'Percentage composition'], ['b', 'Empirical and molecular formula'], ['c', 'Balanced equation: mole ratio'], ['d', 'Limiting reagent and yield'], ['e', 'Concentration of solutions']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of topics in Part 2: composition, formula, mole ratios, limiting reagent, concentration'),
      n: 'In Part 1 we learned to count atoms by weighing. Now we put the mole to work. First we move between the mass of each element and a formula. Then we use balanced equations to predict how much product a reaction gives, find out which reactant runs out first, and finally describe how concentrated a solution is. These are the everyday calculations of an analytical laboratory.',
    }),
    sl('concept', 'Percentage composition', {
      b: 'Mass percent of an element $= \\dfrac{\\text{mass of the element in one mole of compound}}{\\text{molar mass of the compound}} \\times 100$. The percentages of all elements add up to 100.',
      v: table(['Compound', 'Molar mass / g mol⁻¹', 'Mass percent of the main element'], [['Potassium permanganate, $\\ce{KMnO4}$', '158.0', 'K 24.7, Mn 34.8, O 40.5'], ['Calcium sulfate, $\\ce{CaSO4}$', '136.1', 'Ca 29.4, S 23.6, O 47.0'], ['Iron(III) oxide, $\\ce{Fe2O3}$', '159.7', 'Fe 69.9, O 30.1']], 'Table of percentage composition of three compounds'),
      n: 'Percentage composition tells us how a compound’s mass is shared among its elements. Multiply the atomic mass of the element by the number of its atoms in the formula, divide by the molar mass of the compound, and multiply by one hundred. The percentages of all the elements must add to one hundred, which is a handy check on your arithmetic.',
    }),
    sl('example', 'Worked example: percentage composition', {
      b: r`**Problem.** Find the mass percent of each element in ammonium dihydrogen phosphate, $\ce{NH4H2PO4}$ (N 14.0, H 1.0, P 31.0, O 16.0).

**Step 1.** Molar mass $= 14.0 + 6(1.0) + 31.0 + 4(16.0) = 115.0$ g mol⁻¹.

**Step 2.** N: $14.0 / 115.0 \times 100 = 12.2$ %; H: $6.0 / 115.0 \times 100 = 5.2$ %; P: $31.0 / 115.0 \times 100 = 27.0$ %; O: $64.0 / 115.0 \times 100 = 55.7$ %.

**Check.** $12.2 + 5.2 + 27.0 + 55.7 = 100.1$, equal to 100 within rounding.`,
      v: table(['Element', 'Atoms', 'Mass in 1 mol / g', 'Percent'], [['N', '1', '14.0', '12.2'], ['H', '6', '6.0', '5.2'], ['P', '1', '31.0', '27.0'], ['O', '4', '64.0', '55.7']], 'Table of the mass percent of each element in ammonium dihydrogen phosphate'),
      n: 'First add up all the atomic masses in the formula to get the molar mass. Be careful to count every hydrogen, both the four in the ammonium part and the two in the phosphate part. Then divide each element’s share by the total and multiply by one hundred. The four percentages sum to one hundred, apart from a rounding difference.',
    }),
    sl('concept', 'Empirical and molecular formulae', {
      b: 'The **empirical formula** gives the simplest whole-number ratio of atoms; the **molecular formula** gives the actual numbers: molecular formula $=$ ($n \\times$ empirical formula), with $n = M / M_\\text{empirical}$.',
      v: flow('TB', [['a', 'Mass percent or mass of each element'], ['b', 'Divide by atomic mass: moles'], ['c', 'Divide by the smallest: ratio'], ['d', 'Multiply to remove fractions: empirical formula'], ['e', 'Multiply by n: molecular formula']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the steps from percentage composition to empirical formula to molecular formula'),
      n: 'To find a formula from analysis data, assume a hundred grams so that percentages become grams. Convert each to moles by dividing by atomic mass, then divide all by the smallest to get a ratio. If a value ends in point five, double everything; if it ends in point three three, triple it. That is the empirical formula. Dividing the true molar mass by the empirical mass gives the multiplier.',
    }),
    sl('example', 'Worked example: empirical formula', {
      b: r`**Problem.** An oxide of manganese contains 63.2 % Mn and 36.8 % O by mass (Mn 54.9, O 16.0). Find its empirical formula.

**Step 1.** In 100 g: $n(\text{Mn}) = 63.2 / 54.9 = 1.15$ mol; $n(\text{O}) = 36.8 / 16.0 = 2.30$ mol.

**Step 2.** Divide by 1.15: Mn 1.00, O 2.00.

**Formula.** $\ce{MnO2}$.`,
      v: table(['Element', 'Mass in 100 g / g', 'Moles', 'Simplest ratio'], [['Mn', '63.2', '1.15', '1'], ['O', '36.8', '2.30', '2']], 'Table of the empirical formula determination for an oxide of manganese'),
      n: 'Treat the percentages as grams in a hundred gram sample. Divide the manganese mass by its atomic mass and the oxygen mass by its own. The ratio of moles is the ratio of atoms. Dividing both by the smaller value gives one to two, so the empirical formula is manganese dioxide. Always check that the final ratios are close to whole numbers before rounding.',
    }),
    sl('check', 'Quick check: formulae', {
      b: 'Find a molecular formula from an empirical formula and a molar mass.',
      n: 'Quick check. Compute the mass of the empirical formula unit and divide the molar mass by it.',
      chk: 'emp-chk',
    }),
    sl('concept', 'Stoichiometry from a balanced equation', {
      b: 'The coefficients of a balanced equation give the **mole ratio**. Plan: mass of A $\\rightarrow$ moles of A $\\rightarrow$ moles of B (using coefficients) $\\rightarrow$ mass of B.',
      m: [r`\ce{2Al(OH)3 + 3H2SO4 -> Al2(SO4)3 + 6H2O}`],
      v: flow('LR', [['a', 'Mass of A'], ['b', 'Moles of A (÷ M)'], ['c', 'Moles of B (mole ratio)'], ['d', 'Mass of B (× M)']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for a mass to mass stoichiometry calculation'),
      n: 'Stoichiometry means measuring elements. The balanced equation is a recipe in moles, not in grams. So to find how much of one substance reacts with or forms from another, convert the given mass to moles, use the coefficients as a ratio to get moles of the wanted substance, and then convert back to mass with its molar mass.',
    }),
    sl('example', 'Worked example: mass to mass', {
      b: r`**Problem.** An antacid tablet contains 15.6 g of $\ce{Al(OH)3}$ ($M = 78.0$ g mol⁻¹). What mass of $\ce{H2SO4}$ ($M = 98.0$) can it neutralise, and what mass of $\ce{Al2(SO4)3}$ ($M = 342$) forms?

**Step 1.** $n(\ce{Al(OH)3}) = 15.6 / 78.0 = 0.200$ mol.

**Step 2.** From $2 : 3 : 1$: $n(\ce{H2SO4}) = 0.200 \times 3/2 = 0.300$ mol and $n(\ce{Al2(SO4)3}) = 0.200 \times 1/2 = 0.100$ mol.

**Step 3.** $m(\ce{H2SO4}) = 0.300 \times 98.0 = 29.4$ g; $m(\ce{Al2(SO4)3}) = 0.100 \times 342 = 34.2$ g.`,
      v: table(['Substance', 'Coefficient', 'Moles', 'Mass / g'], [['Al(OH)₃', '2', '0.200', '15.6'], ['H₂SO₄', '3', '0.300', '29.4'], ['Al₂(SO₄)₃', '1', '0.100', '34.2']], 'Table of moles and masses for the neutralisation of aluminium hydroxide by sulfuric acid'),
      n: 'Start by converting fifteen point six grams of aluminium hydroxide to moles, which is point two zero zero. The coefficients two, three and one then give three halves as many moles of acid and one half as many moles of aluminium sulfate. Finally multiply each by its molar mass. Notice that the total mass of reactants equals the total mass of products, as conservation of mass demands.',
    }),
    sl('concept', 'The limiting reagent', {
      b: 'When reactants are not mixed in the exact mole ratio, the one that is used up first is the **limiting reagent**; it decides the amount of product. The other is in **excess**. To find it, divide each amount (in mol) by its coefficient: the smaller value is limiting.',
      v: table(['Step', 'What to do'], [['1', 'Convert every given mass to moles'], ['2', 'Divide each amount by its coefficient'], ['3', 'The smallest quotient marks the limiting reagent'], ['4', 'Use only the limiting reagent to find product']], 'Table of steps for identifying the limiting reagent'),
      n: 'In real reactions, reactants are rarely mixed in perfect proportion. Think of making sandwiches from bread and cheese: whichever runs out first stops the production. In a reaction, the reagent that is used up first is the limiting reagent. Divide each amount of substance by its coefficient; the smallest number tells you which reagent limits, and the product is calculated from that reagent alone.',
    }),
    sl('diagram', 'Limiting reagent in a picture', {
      b: 'Six moles of magnesium and two moles of oxygen: oxygen runs out after using four moles of magnesium, leaving two moles of magnesium unreacted.',
      v: V.limiting,
      n: 'Look at the bars. Before the reaction there are six units of magnesium and two of oxygen. The equation needs two magnesium for each oxygen molecule, so two oxygen molecules need four magnesium. Oxygen is used up and stops the reaction, four units of magnesium oxide form, and two units of magnesium are left over, unreacted.',
    }),
    sl('example', 'Worked example: limiting reagent', {
      b: r`**Problem.** 6.00 g of calcium (40.0 g mol⁻¹) is heated with 2.80 g of nitrogen gas (28.0 g mol⁻¹): $\ce{3Ca + N2 -> Ca3N2}$. Find the limiting reagent, the mass of $\ce{Ca3N2}$ ($M = 148$ g mol⁻¹) formed and the mass of excess reagent left.

**Step 1.** $n(\text{Ca}) = 6.00 / 40.0 = 0.150$ mol; $n(\ce{N2}) = 2.80 / 28.0 = 0.100$ mol.

**Step 2.** Divide by coefficients: Ca $0.150 / 3 = 0.0500$; $\ce{N2}$ $0.100 / 1 = 0.100$. Calcium is limiting.

**Step 3.** $n(\ce{Ca3N2}) = 0.0500$ mol, so $m = 0.0500 \times 148 = 7.40$ g. Nitrogen used is 0.0500 mol, so 0.0500 mol (1.40 g) of nitrogen is left.`,
      v: table(['Reactant', 'Moles', 'Moles ÷ coefficient', 'Role'], [['Ca', '0.150', '0.0500', 'Limiting'], ['N₂', '0.100', '0.100', 'Excess']], 'Table identifying calcium as the limiting reagent and nitrogen as the excess reagent'),
      n: 'Convert both masses to moles. Dividing by the coefficients gives point zero five for calcium and point one for nitrogen. The smaller value belongs to calcium, so calcium is limiting. The product is worked out from calcium only. Half of the nitrogen is used, so half of the original nitrogen, one point four grams, is left over.',
    }),
    sl('check', 'Quick check: limiting reagent', {
      b: 'Identify the limiting reagent from the amounts given.',
      n: 'Quick check. Convert to moles, divide by the coefficients and compare.',
      chk: 'lr-chk',
    }),
    sl('concept', 'Expressing concentration', {
      b: 'Several ways to say how much solute is in a solution; **molarity** changes with temperature (volume changes) but **molality** and **mole fraction** do not (they use masses or amounts).',
      v: table(['Term', 'Definition', 'Unit'], [['Mass percent', r`$\dfrac{\text{mass of solute}}{\text{mass of solution}} \times 100$`, '%'], ['Parts per million', r`$\dfrac{\text{mass of solute}}{\text{mass of solution}} \times 10^{6}$`, 'ppm'], ['Mole fraction, $x_\\text{A}$', r`$\dfrac{n_\text{A}}{n_\text{A} + n_\text{B}}$`, 'none'], ['Molarity, $c$ or M', r`$\dfrac{n_\text{solute}}{V_\text{solution in L}}$`, 'mol L⁻¹'], ['Molality, $m$', r`$\dfrac{n_\text{solute}}{\text{mass of solvent in kg}}$`, 'mol kg⁻¹']], 'Table of five concentration terms with definitions and units'),
      n: 'A solution can be described in several ways. Mass percent and parts per million compare the mass of the solute with the mass of the whole solution. Mole fraction compares moles of one component with total moles. Molarity is moles of solute per litre of solution, and molality is moles of solute per kilogram of solvent. Only molarity depends on temperature, because volumes expand when warmed.',
    }),
    sl('example', 'Worked example: concentration terms', {
      b: r`**Problem.** 9.20 g of glycerol, $\ce{C3H8O3}$ ($M = 92.0$ g mol⁻¹), is dissolved in 90.0 g of water ($M = 18.0$). The solution has density 1.03 g mL⁻¹. Find (a) molality, (b) mole fraction of glycerol, (c) molarity.

**(a)** $n = 9.20 / 92.0 = 0.100$ mol; $m = 0.100 / 0.0900 = 1.11$ mol kg⁻¹.

**(b)** $n(\ce{H2O}) = 90.0 / 18.0 = 5.00$; $x = 0.100 / (0.100 + 5.00) = 0.0196$.

**(c)** Solution mass $= 99.2$ g, so $V = 99.2 / 1.03 = 96.3$ mL $= 0.0963$ L; $c = 0.100 / 0.0963 = 1.04$ mol L⁻¹.`,
      v: table(['Term', 'Value', 'Needs'], [['Molality', '1.11 mol kg⁻¹', 'Mass of solvent'], ['Mole fraction of glycerol', '0.0196', 'Moles of both components'], ['Molarity', '1.04 mol L⁻¹', 'Volume of solution (density)']], 'Table of molality, mole fraction and molarity for the glycerol solution and what each needs'),
      n: 'The same solution gives three different numbers, because each term uses a different reference. Molality uses the mass of the solvent in kilograms. Mole fraction needs the moles of both glycerol and water. Molarity needs the volume of the whole solution, which we obtain from its mass and density. Always check what the denominator is before you divide.',
    }),
    sl('concept', 'Dilution and mixing', {
      b: 'On dilution, the amount of solute is unchanged: $c_1 V_1 = c_2 V_2$. The same relation holds for any unit of volume if both are in the same unit. For a solution given as mass percent with density $\\rho$: $c = \\dfrac{10 \\times \\text{mass percent} \\times \\rho}{M}$ (with $\\rho$ in g mL⁻¹).',
      v: table(['Task', 'Relation'], [['Dilute a stock solution', r`$c_1 V_1 = c_2 V_2$`], ['Molarity from mass percent and density', r`$c = \dfrac{10 \times w \times \rho}{M}$`], ['Molality from molarity', 'find solvent mass from density']], 'Table of dilution and conversion relations for solutions'),
      n: 'When we add solvent to dilute a solution, the amount of solute does not change, so concentration times volume stays constant. That one line answers most dilution questions. For a bottle labelled with mass percent and density, take a hundred grams of solution, find its volume from the density, and calculate the moles of solute, or use the shortcut shown in the table.',
    }),
    sl('check', 'Quick check: concentration', {
      b: 'Use the definition of a concentration term correctly.',
      n: 'Quick check. Decide whether the denominator is the solution or the solvent, and whether it is in kilograms or litres.',
      chk: 'conc-chk',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Percentage composition: element mass in one mole ÷ molar mass × 100.',
        'Empirical formula: moles, divide by the smallest, clear fractions; molecular formula $= n \\times$ empirical.',
        'Balanced equations give mole ratios; always convert through moles.',
        'Limiting reagent: smallest (moles ÷ coefficient); product is based on it.',
        'Molarity (mol per L solution), molality (mol per kg solvent), mole fraction, mass percent, ppm; $c_1V_1 = c_2V_2$.',
      ],
      v: table(['Need', 'Tool'], [['Formula from analysis', 'Moles ratio'], ['Mass of product', 'Mole ratio from equation'], ['Which reactant runs out', 'Moles ÷ coefficient'], ['Concentration', 'Right denominator']], 'Summary table of tools for Part 2'),
      n: 'To sum up Part 2. Percentage composition and mole ratios give empirical and molecular formulae. Balanced equations are recipes in moles, so every mass calculation goes through moles. The limiting reagent decides the amount of product, and concentration terms differ in what they divide by. Molarity depends on temperature, molality does not. Dilution keeps the amount of solute constant.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write the balanced equation first and check the coefficients.',
        'Use the limiting reagent, never the excess one, to find the product.',
        'State the molar masses you use, and keep units in every step.',
        'For molarity use litres of solution; for molality use kilograms of solvent.',
        'Check that percentages add up to 100 before finding a formula.',
      ],
      v: table(['Slip', 'Fix'], [['Using the excess reagent for yield', 'Use the limiting reagent'], ['Molality with mass of solution', 'Use mass of solvent only'], ['Rounding ratios like 1.33 to 1', 'Multiply by 3 to clear the fraction']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Some exam tips. Begin every stoichiometry problem with a balanced equation. Find the limiting reagent first, and use it for the yield. Keep units in every step, and state the molar masses you use. Be careful with the denominators of concentration terms. And when a ratio comes out near one point three three or one point five, multiply to clear the fraction instead of rounding.',
    }),
  ],
});
