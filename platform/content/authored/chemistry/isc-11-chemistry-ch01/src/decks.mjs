// ISC 11 ch01 — two decks: Part 1 (t01–t03) chemistry and matter, measurement, significant figures, dimensional analysis;
// Part 2 (t04–t05) laws of chemical combination, Gay-Lussac's law, Dalton's atomic theory.
import { sl, deck, table, flow, chem, svgV, r } from './lib.mjs';
import { PREC_ACC, VOL_LADDER, COMBINING_VOLS, RECIP_TRIANGLE, MASS_BARS } from './svgs.mjs';

export const V = {
  precAcc: svgV(PREC_ACC, 'Dot plot of three students’ readings of a 25.00 millilitre standard: student 1 precise and accurate, student 2 precise but not accurate, student 3 scattered with a mean near the true value', 'Closeness of dots to each other is precision; closeness to the dashed line is accuracy.'),
  volLadder: svgV(VOL_LADDER, 'Ladder of volume units: one cubic metre is one thousand cubic decimetres, and one litre is one thousand millilitres', 'Move right by multiplying by one thousand, left by dividing by one thousand.'),
  combVols: svgV(COMBINING_VOLS, 'Boxes of equal volume: one box of nitrogen and three of hydrogen give two of ammonia', 'A simple whole-number volume ratio at constant temperature and pressure.'),
  recip: svgV(RECIP_TRIANGLE, 'Triangle of hydrogen, sulfur and oxygen showing masses combining in hydrogen sulfide, water and sulfur dioxide', 'The direct sulfur to oxygen ratio is a simple fraction of the ratio found through hydrogen.'),
  massBars: svgV(MASS_BARS, 'Two bars of equal height: 4.80 grams of magnesium and 3.20 grams of oxygen before the reaction, 8.00 grams of magnesium oxide after it', 'Total mass before equals total mass after in a sealed vessel.'),
};

export const deck1 = deck({
  part: 1,
  title: 'Some Basic Concepts — Part 1: Chemistry, measurement and dimensional analysis',
  goals: [
    'Give examples of the role of chemistry in medicine, agriculture, industry and the environment',
    'Distinguish precision from accuracy and report results with the right number of significant figures',
    'Convert between units with conversion factors, for example litre to cubic metre and atmosphere to pascal',
  ],
  slides: [
    sl('title', 'Chemistry, Measurement and Units', {
      b: 'Part 1: what chemistry does for us, how matter is classified, and how chemists measure and convert quantities honestly.',
      v: table(['Area', 'A contribution of chemistry'], [['Medicine', 'Antibiotics, anaesthetics, vaccine reagents'], ['Agriculture', 'Fertilisers and soil testing'], ['Industry', 'Plastics, alloys, cement, dyes'], ['Environment', 'Water treatment and cleaner fuels']], 'Table of areas where chemistry is applied with an example for each'),
      n: 'Welcome to the first chapter of Class Eleven chemistry. Chemistry sits behind the medicines in a hospital, the fertiliser in a field, the cement in a building and the filters that clean our water. In this part we see the scope of chemistry, how matter is classified, how measurements are reported with care, and how units are converted with confidence.',
    }),
    sl('concept', 'Scope of chemistry', {
      b: 'Chemistry studies the **composition, structure, properties and changes** of matter. It links physics and biology and supports every industry.',
      v: table(['Field', 'How chemistry helps'], [['Medicine', 'Designs and purifies drugs; develops diagnostic tests'], ['Agriculture', 'Supplies nitrogen, phosphorus and potassium fertilisers; plant protection chemicals'], ['Industry', 'Produces metals, polymers, glass, soaps and fuels'], ['Environment', 'Monitors pollutants; develops green processes that cut waste']], 'Table of fields and the role chemistry plays in each'),
      n: 'Chemistry studies what matter is made of, how it is built, what properties it has and how it changes. In medicine, chemists design and purify drugs. In agriculture they supply fertilisers and test soils. Industry depends on chemistry for metals, plastics, glass and soaps. And in the environment, chemistry measures pollution and develops greener processes that produce less waste.',
    }),
    sl('concept', 'Classification of matter', {
      b: 'A **pure substance** has fixed composition: an **element** (one kind of atom) or a **compound** (different atoms combined in a fixed mass ratio). A **mixture** has variable composition and can be separated by physical methods.',
      v: flow('TB', [['m', 'Matter'], ['p', 'Pure substance'], ['x', 'Mixture'], ['e', 'Element'], ['c', 'Compound'], ['ho', 'Homogeneous mixture'], ['he', 'Heterogeneous mixture']], [['m', 'p'], ['m', 'x'], ['p', 'e'], ['p', 'c'], ['x', 'ho'], ['x', 'he']], 'Flow chart classifying matter into pure substances and mixtures, and each into two kinds'),
      n: 'All matter is either a pure substance or a mixture. A pure substance has a fixed composition and is either an element, made of one kind of atom, or a compound, in which different atoms are combined in a fixed ratio by mass. A mixture has variable composition. It is homogeneous when uniform throughout, like brass or sugar solution, and heterogeneous when different parts can be seen.',
    }),
    sl('concept', 'SI units and scientific notation', {
      b: 'Seven SI base units; derived units are built from them. Write numbers as $N \\times 10^{n}$ with $1 \\le N < 10$.',
      v: table(['Quantity', 'SI unit', 'In base units'], [['Length', 'metre, m', 'm'], ['Mass', 'kilogram, kg', 'kg'], ['Temperature', 'kelvin, K', 'K'], ['Amount of substance', 'mole, mol', 'mol'], ['Pressure', 'pascal, Pa', r`$\text{kg m}^{-1}\text{ s}^{-2}$`], ['Energy', 'joule, J', r`$\text{kg m}^{2}\text{ s}^{-2}$`]], 'Table of SI quantities with their units and expressions in base units'),
      n: 'The International System of units has seven base units, including the metre, the kilogram, the kelvin and the mole. Every other unit is built from them. The pascal for pressure and the joule for energy are derived units. Very large and very small values are written in scientific notation, a number between one and ten multiplied by a power of ten. The litre is not an SI unit.',
    }),
    sl('diagram', 'Precision and accuracy', {
      b: '**Precision**: repeated readings agree with one another. **Accuracy**: readings, or their mean, agree with the true value. A **systematic error** shifts all readings the same way.',
      v: V.precAcc,
      n: 'Look at the three students reading a twenty five millilitre standard. Student one is both precise and accurate. Student two has readings that agree with each other but sit above the true value, so precise but not accurate, which suggests a systematic error. Student three is scattered, not precise, although the mean happens to fall near the true value.',
    }),
    sl('example', 'Worked example: percentage error', {
      b: r`**Problem.** Using the true value 25.00 mL, find the percentage error of the mean for students 2 and 3 of the plot (readings 25.58, 25.62, 25.66 and 24.40, 25.85, 25.10 mL).

**Student 2.** Mean $= (25.58 + 25.62 + 25.66)/3 = 25.62$ mL. Error $= 0.62$ mL, so percentage error $= 0.62 / 25.00 \times 100 = 2.5\ \%$.

**Student 3.** Mean $= (24.40 + 25.85 + 25.10)/3 = 25.12$ mL. Error $= 0.12$ mL, so percentage error $= 0.12 / 25.00 \times 100 \approx 0.5\ \%$. Yet the readings span 1.45 mL: the mean is accurate by luck, not by good technique.`,
      v: table(['Student', 'Mean / mL', 'Spread / mL', 'Percentage error'], [['2', '25.62', '0.08', '2.5 %'], ['3', '25.12', '1.45', '0.5 %']], 'Table comparing mean, spread and percentage error for students 2 and 3'),
      n: 'Percentage error is the absolute error divided by the true value, times one hundred. Student two has a mean that is more than half a millilitre too high, about two and a half percent, but very small spread. Student three has a small error in the mean, about half a percent, but a spread of nearly one and a half millilitres. Accuracy of the mean alone does not prove good technique.',
    }),
    sl('check', 'Quick check: precision and accuracy', {
      b: 'Read the three sets of balance readings and judge each.',
      n: 'Quick check. Three trainee analysts have each weighed the same certified mass. First compare how close the readings of each trainee are to one another, which shows precision. Then compare the mean of each set with the certified value, which shows accuracy. Decide which trainee is both.',
      chk: 'prec-chk',
    }),
    sl('concept', 'Significant figures: counting', {
      b: 'Significant figures are the digits known with certainty plus one estimated digit.',
      v: table(['Rule', 'Example', 'Count'], [['Non-zero digits count', '5.27', '3'], ['Zeros between digits count', '10.04', '4'], ['Leading zeros do not count', '0.0062', '2'], ['Trailing zeros after a decimal point count', '2.500', '4'], ['In scientific notation all coefficient digits count', r`$3.0 \times 10^{5}$`, '2']], 'Table of the rules for counting significant figures with examples'),
      n: 'Count significant figures with a few rules. Non-zero digits always count. Zeros between non-zero digits count. Leading zeros do not count, they only place the decimal point. Trailing zeros count when they come after a decimal point. In scientific notation, every digit in the coefficient counts. Exact numbers, such as counts and defined conversion factors, have unlimited significant figures.',
    }),
    sl('concept', 'Significant figures in calculations', {
      b: '**Add or subtract:** keep the **fewest decimal places**. **Multiply or divide:** keep the **fewest significant figures**. Round only at the final step.',
      v: flow('LR', [['a', 'Add or subtract: match the fewest decimal places'], ['b', 'Multiply or divide: match the fewest significant figures'], ['c', 'Keep an extra digit in between and round once at the end']], [['a', 'b'], ['b', 'c']], 'Flow showing which significant-figure rule to apply and when to round'),
      n: 'When you add or subtract, the answer keeps as many decimal places as the term with the fewest decimal places. When you multiply or divide, the answer keeps as many significant figures as the factor with the fewest. Carry one extra digit through the middle of a calculation and round only once at the end, so that rounding errors do not pile up.',
    }),
    sl('example', 'Worked example: significant figures', {
      b: r`**Problem.** Report each result correctly. (a) $7.805 + 0.34 + 12.1$ (b) $\dfrac{0.0820 \times 15.6}{2.5}$ (c) Write $0.000306$ in scientific notation.

**(a)** Sum $= 20.245$; 12.1 has one decimal place, so the answer is $20.2$.

**(b)** $0.0820 \times 15.6 = 1.2792$ and $1.2792 / 2.5 = 0.51168$. The fewest significant figures is two (2.5), so the answer is $0.51$.

**(c)** $0.000306 = 3.06 \times 10^{-4}$ (three significant figures).`,
      v: table(['Part', 'Rule used', 'Answer'], [['(a)', 'Fewest decimal places', '20.2'], ['(b)', 'Fewest significant figures', '0.51'], ['(c)', 'Scientific notation', r`$3.06 \times 10^{-4}$`]], 'Table of the three significant-figure answers and the rule for each'),
      n: 'In part a, the term with the fewest decimal places is twelve point one, so the sum is rounded to one decimal place. In part b, the divisor has only two significant figures, so the answer has two. In part c, moving the decimal point four places to the right gives ten to the minus four, keeping all three significant figures.',
    }),
    sl('check', 'Quick check: significant figures', {
      b: 'Apply the correct rule to a density calculation.',
      n: 'Quick check. A density is found by dividing a mass by a volume. Count the significant figures in each measured value before you divide, remember the rule for division, and then choose the option that has the correct number of digits. Do not round until the very end.',
      chk: 'sf-chk',
    }),
    sl('concept', 'Dimensional analysis: the factor-label method', {
      b: 'A **conversion factor** is a ratio equal to 1, such as $\\dfrac{101325\\ \\text{Pa}}{1\\ \\text{atm}}$. Multiply by it so that the unwanted unit cancels.',
      v: flow('LR', [['a', 'Write the quantity with its unit'], ['b', 'Choose a factor equal to 1 that cancels the old unit'], ['c', 'Multiply and cancel units'], ['d', 'Check the unit and the significant figures']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the factor-label method for converting units'),
      n: 'Dimensional analysis converts units with conversion factors. A conversion factor is a ratio of two equal quantities written in different units, so it equals one and does not change the size of the quantity. Choose the factor so the unit you want to remove cancels, multiply, and then check that the unit left is the one you need and that the significant figures are right.',
    }),
    sl('example', 'Worked example: unit conversion', {
      b: r`**Problem.** Convert (a) 3.6 L to m³, (b) 0.75 atm to Pa (1 atm $= 101325$ Pa), (c) 90 km h⁻¹ to m s⁻¹.

**(a)** $3.6\ \text{L} \times \dfrac{10^{-3}\ \text{m}^3}{1\ \text{L}} = 3.6 \times 10^{-3}\ \text{m}^3$.

**(b)** $0.75 \times 101325 = 75993.75 \approx 7.6 \times 10^{4}$ Pa (two significant figures).

**(c)** $90 \times \dfrac{1000}{3600} = 25\ \text{m s}^{-1}$.`,
      v: table(['Quantity', 'Factor used', 'Result'], [['3.6 L', r`$10^{-3}\ \text{m}^3\text{ per L}$`, r`$3.6 \times 10^{-3}\ \text{m}^3$`], ['0.75 atm', '101325 Pa per atm', r`$7.6 \times 10^{4}$ Pa`], ['90 km h⁻¹', '1000 m per km, 3600 s per h', r`$25\ \text{m s}^{-1}$`]], 'Table of three unit conversions with the factor used and the result'),
      n: 'For the volume, one litre equals ten to the minus three cubic metres, so three point six litres is three point six times ten to the minus three cubic metres. For the pressure, multiply by one hundred and one thousand three hundred and twenty five pascal per atmosphere and keep two significant figures. For the speed, multiply by one thousand metres per kilometre and divide by three thousand six hundred seconds per hour.',
    }),
    sl('diagram', 'The volume ladder', {
      b: 'Volume units are cubes of length units, so each step between m³, dm³ and cm³ is a factor of $10^{3}$, not 10.',
      v: V.volLadder,
      n: 'Because volume is length cubed, the step from a cubic metre to a cubic decimetre is not ten but one thousand, since ten decimetres make a metre and ten cubed is one thousand. A litre is the same as a cubic decimetre, and a millilitre is the same as a cubic centimetre. Moving right multiplies by one thousand; moving left divides.',
    }),
    sl('concept', 'Applications of dimensional analysis', {
      b: 'Dimensions let us (1) **convert** units, (2) **check** whether an equation is homogeneous, and (3) **find the unit** of a constant. For example $R = \\dfrac{PV}{nT}$ has units $\\dfrac{\\text{Pa m}^3}{\\text{mol K}} = \\text{J K}^{-1}\\text{ mol}^{-1}$.',
      v: table(['Use', 'Example'], [['Convert', 'atm to Pa, L to m³'], ['Check an equation', 'Both sides of $PV = nRT$ must be in energy units'], ['Unit of a constant', 'Unit of $R$ from $PV / nT$'], ['Spot an error', 'Adding a mass to a volume is impossible']], 'Table of applications of dimensional analysis'),
      n: 'Dimensional analysis does more than convert units. It checks that an equation makes sense, because every term must have the same dimensions. It also tells us the unit of a constant: pressure times volume divided by amount and temperature gives joules per kelvin per mole for the gas constant. And it catches errors, since a mass cannot be added to a volume.',
    }),
    sl('example', 'Worked example: pressure times volume', {
      b: r`**Problem.** A gas at 2.0 atm occupies 5.0 L. Express $PV$ in joules, using 1 L $= 10^{-3}$ m³ and 1 atm $= 101325$ Pa.

$P = 2.0 \times 101325 = 202650$ Pa; $V = 5.0 \times 10^{-3}$ m³.

$PV = 202650 \times 5.0 \times 10^{-3} = 1013$ Pa m³ $= 1013$ J $\approx 1.0 \times 10^{3}$ J (two significant figures).`,
      v: table(['Step', 'Result'], [['P in Pa', '202650'], ['V in m³', r`$5.0 \times 10^{-3}$`], ['PV in Pa m³ = J', r`$1.0 \times 10^{3}$`]], 'Table of the steps converting litre atmospheres into joules'),
      n: 'Convert both quantities to base units first. Two atmospheres is about two hundred thousand pascal and five litres is five times ten to the minus three cubic metres. Their product is about one thousand pascal cubic metres, which is exactly one thousand joules, because a pascal times a cubic metre is a newton times a metre, which is a joule.',
    }),
    sl('check', 'Quick check: units', {
      b: 'Convert a gauge reading from pascal to atmospheres.',
      n: 'Quick check. The gauge reads in pascal but the answer is wanted in atmospheres. Choose the conversion factor so that the unit pascal cancels and atmosphere remains, then divide carefully. Keep two significant figures, because the reading has two.',
      chk: 'dim-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Matter: pure substances (elements, compounds) and mixtures (homogeneous, heterogeneous).',
        'Precision is agreement among readings; accuracy is agreement with the true value.',
        'Add and subtract: fewest decimal places. Multiply and divide: fewest significant figures.',
        'Conversion factors equal 1; volume steps between m³, dm³ and cm³ are $10^{3}$.',
        'Dimensional analysis converts units, checks equations and gives units of constants.',
      ],
      v: table(['Need', 'Tool'], [['Which sig-fig rule', 'Operation type'], ['Convert units', 'Factor equal to 1'], ['Check an equation', 'Compare dimensions']], 'Summary table of tools from Part 1'),
      n: 'To sum up Part 1. Matter is classified into pure substances and mixtures. Precision is about agreement among readings and accuracy about agreement with the truth. Use the decimal place rule for sums and the significant figure rule for products. Convert units with factors equal to one, remembering that volume steps are factors of one thousand. Dimensions also check equations.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write units in every step of a conversion and cancel them visibly.',
        'Quote answers to the correct number of significant figures; round at the end.',
        'Use the true value (not the measured one) in the denominator of percentage error.',
        'A litre is a dm³, not a m³.',
        'Defined conversion factors are exact; they never limit significant figures.',
      ],
      v: table(['Slip', 'Fix'], [['Rounding in the middle', 'Round once at the end'], ['1 L = 10⁻⁶ m³', '1 L = 10⁻³ m³'], ['Percent error divided by the measured value', 'Divide by the true value']], 'Table of common slips from Part 1 and their fixes'),
      n: 'Exam tips for Part 1. Write the units in every line and cancel them. Round only at the very end, and use the right number of significant figures. For percentage error, divide by the true value. Remember that one litre is one thousandth of a cubic metre, and that defined conversion factors are exact and never reduce your significant figures.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Some Basic Concepts — Part 2: Laws of chemical combination and Dalton’s theory',
  goals: [
    'State each law of chemical combination and verify it from experimental data',
    'Solve problems on Gay-Lussac’s law of combining volumes',
    'Explain how Dalton’s theory accounts for the laws and state its limitations',
  ],
  slides: [
    sl('title', 'Laws of Chemical Combination', {
      b: 'Part 2: five quantitative laws, the simple volume law for gases, and the atomic theory that explained them.',
      v: table(['Law', 'Proposed by', 'Year'], [['Conservation of mass', 'Lavoisier', '1789'], ['Definite proportions', 'Proust', '1799'], ['Multiple proportions', 'Dalton', '1803'], ['Reciprocal proportions', 'Richter', '1790s'], ['Combining volumes', 'Gay-Lussac', '1808']], 'Table of the laws of chemical combination with their proposers and years'),
      n: 'This part covers the laws that came from careful weighing and measuring. Lavoisier showed mass is conserved. Proust found fixed composition. Richter found the reciprocal proportions. Dalton found multiple proportions, and Gay-Lussac found simple ratios of gas volumes. Then we see how Dalton’s atomic theory explains the first four, and why it needed to be extended.',
    }),
    sl('concept', 'Law of conservation of mass', {
      b: 'In a chemical reaction the **total mass of the reactants equals the total mass of the products**. Atoms are rearranged, not created or destroyed. The law holds only if every substance, including gases, is counted.',
      v: V.massBars,
      n: 'Lavoisier’s law says that in any chemical change, the total mass of the reactants equals the total mass of the products. Here, four point eight grams of magnesium and three point two grams of oxygen make eight grams of magnesium oxide. The two bars have the same height. Apparent losses or gains in open vessels come from gases that entered or escaped.',
    }),
    sl('example', 'Worked example: conservation of mass', {
      b: r`**Problem.** In a closed tube, 5.60 g of iron powder and 3.20 g of sulfur react to form iron(II) sulfide, $\ce{Fe + S -> FeS}$. (a) What mass of iron(II) sulfide forms? (b) If 6.00 g of iron is used with 3.20 g of sulfur, what mass of iron remains, assuming the same mass of FeS forms?

**(a)** Mass of product $= 5.60 + 3.20 = 8.80$ g.

**(b)** The product is still 8.80 g, which uses 5.60 g of iron, so the iron left is $6.00 - 5.60 = 0.40$ g.`,
      v: table(['Case', 'Fe / g', 'S / g', 'FeS / g', 'Fe left / g'], [['(a)', '5.60', '3.20', '8.80', '0.00'], ['(b)', '6.00', '3.20', '8.80', '0.40']], 'Table of masses of iron, sulfur and iron sulfide in two experiments'),
      n: 'In a closed tube nothing escapes, so the mass of iron sulfide equals the sum of the masses of iron and sulfur, eight point eight grams. In the second experiment extra iron is added. The sulfur still reacts only with the same mass of iron, the same eight point eight grams of product forms, and the surplus four tenths of a gram of iron is left unreacted.',
    }),
    sl('concept', 'Law of definite proportions', {
      b: 'A pure compound always contains the **same elements in the same proportion by mass**, whatever its source or method of preparation (Proust).',
      v: table(['Water sample', 'Mass H / g', 'Mass O / g', 'O : H'], [['Tap water', '0.45', '3.60', '8.0 : 1'], ['Rainwater', '1.12', '8.96', '8.0 : 1'], ['Sea water, distilled', '0.30', '2.40', '8.0 : 1']], 'Table showing the same oxygen to hydrogen mass ratio in three samples of water'),
      n: 'Proust showed that a pure compound always contains the same elements in the same mass ratio, no matter where it came from or how it was made. Water from a tap, from rain or distilled from the sea always has eight parts of oxygen to one part of hydrogen by mass. Different ratios would mean a different compound or an impure sample.',
    }),
    sl('concept', 'Law of multiple proportions', {
      b: 'When two elements form more than one compound, the masses of one element that combine with a **fixed mass** of the other are in a **simple whole-number ratio** (Dalton).',
      v: table(['Oxide', 'Formula', 'O combined with 1.00 g N / g', 'Ratio'], [['Dinitrogen oxide', r`$\ce{N2O}$`, '0.571', '1'], ['Nitrogen monoxide', r`$\ce{NO}$`, '1.14', '2'], ['Dinitrogen trioxide', r`$\ce{N2O3}$`, '1.71', '3'], ['Nitrogen dioxide', r`$\ce{NO2}$`, '2.29', '4']], 'Table of four nitrogen oxides with oxygen masses per gram of nitrogen in the ratio 1 : 2 : 3 : 4'),
      n: 'Nitrogen forms several oxides. Fix the mass of nitrogen at one gram and compare the masses of oxygen. They come out as point five seven, one point one four, one point seven one and two point two nine grams, in the simple ratio one to two to three to four. Whole-number ratios like these are what Dalton’s atoms in whole-number combinations would predict.',
    }),
    sl('check', 'Quick check: conservation of mass', {
      b: 'Use the law to find the mass of an unknown product.',
      n: 'Quick check. In a sealed vessel the total mass is unchanged by the reaction. Add up the masses of the two reactants, then subtract the mass of the product that is already known, and what remains must be the mass of the other product.',
      chk: 'cons-chk',
    }),
    sl('example', 'Worked example: multiple proportions', {
      b: r`**Problem.** Copper forms two oxides. Oxide A is 88.8 % copper and oxide B is 79.9 % copper by mass. Show that the data obey the law of multiple proportions.

Oxide A: oxygen $= 100 - 88.8 = 11.2$ g per 88.8 g Cu, so $11.2 / 88.8 = 0.126$ g O per gram of Cu.

Oxide B: oxygen $= 100 - 79.9 = 20.1$ g per 79.9 g Cu, so $20.1 / 79.9 = 0.252$ g O per gram of Cu.

Ratio $0.126 : 0.252 = 1 : 2$. The data obey the law (A is $\ce{Cu2O}$, B is $\ce{CuO}$).`,
      v: table(['Oxide', '% Cu', '% O', 'g O per g Cu'], [['A', '88.8', '11.2', '0.126'], ['B', '79.9', '20.1', '0.252']], 'Table of percentage composition and oxygen per gram of copper for two copper oxides'),
      n: 'Start from the percentage composition. Treat the percentages as grams in a hundred gram sample, subtract to get the oxygen, and divide by the copper to get oxygen per gram of copper. The values point one two six and point two five two are in the ratio one to two, a simple whole number ratio, so the law of multiple proportions holds.',
    }),
    sl('diagram', 'Law of reciprocal proportions', {
      b: 'If two elements combine separately with a fixed mass of a third, they combine with each other in the **same ratio or a simple multiple** of it (Richter).',
      v: V.recip,
      n: 'Richter’s law links three elements. In hydrogen sulfide, one gram of hydrogen takes sixteen grams of sulfur. In water, one gram of hydrogen takes eight grams of oxygen. So through hydrogen, sulfur to oxygen is two to one. In sulfur dioxide the direct ratio is one to one, which is one half of that, a simple fraction, so the law holds.',
    }),
    sl('example', 'Worked example: reciprocal proportions', {
      b: r`**Problem.** Methane has 12.0 g C with 4.00 g H; carbon disulfide has 12.0 g C with 64.0 g S; hydrogen sulfide has 1.00 g H with 16.0 g S. Test the law of reciprocal proportions.

Through carbon: H : S $= 4.00 : 64.0 = 1 : 16$.

Directly, in hydrogen sulfide: H : S $= 1.00 : 16.0 = 1 : 16$.

The ratios are identical (a simple multiple of 1), so the law is obeyed.`,
      v: table(['Compound', 'Masses combined', 'Ratio'], [['Methane', '12.0 g C : 4.00 g H', '—'], ['Carbon disulfide', '12.0 g C : 64.0 g S', '—'], ['H : S through carbon', '4.00 : 64.0', '1 : 16'], ['Hydrogen sulfide (direct)', '1.00 g H : 16.0 g S', '1 : 16']], 'Table comparing the hydrogen to sulfur ratio through carbon with the direct ratio'),
      n: 'Fix the mass of carbon at twelve grams. It combines with four grams of hydrogen in methane and with sixty four grams of sulfur in carbon disulfide, so hydrogen to sulfur through carbon is one to sixteen. In hydrogen sulfide, hydrogen and sulfur combine directly in the ratio one to sixteen. The ratios agree exactly, so the data verify the law.',
    }),
    sl('check', 'Quick check: reciprocal proportions', {
      b: 'Compare the ratio through a common element with the direct ratio.',
      n: 'Quick check. Look at the three sets of masses. First find the ratio of nitrogen to oxygen through the common element hydrogen, using the same mass of hydrogen in both compounds. Then compare it with the ratio of nitrogen to oxygen in the oxide itself.',
      chk: 'recip-chk',
    }),
    sl('diagram', 'Gay-Lussac’s law of combining volumes', {
      b: 'Gases react in **simple whole-number ratios by volume**, and form gaseous products in simple ratios, at the same temperature and pressure. The law applies to gases only.',
      v: V.combVols,
      n: 'Gay-Lussac measured gas volumes. One volume of nitrogen and three volumes of hydrogen give two volumes of ammonia, all at the same temperature and pressure. The ratio one to three to two is a simple whole number ratio. The law applies to gases only, and the volumes of liquids and solids do not follow such ratios.',
    }),
    sl('example', 'Worked example: combining volumes', {
      b: r`**Problem.** 10 mL of ethane is burnt in 50 mL of oxygen: $\ce{2C2H6 + 7O2 -> 4CO2 + 6H2O}$. After cooling to the original temperature and pressure (water liquid), find the volume of each gas left.

Volumes react as $2 : 7 : 4$. O₂ used $= 10 \times 7/2 = 35$ mL; CO₂ formed $= 10 \times 4/2 = 20$ mL; O₂ left $= 50 - 35 = 15$ mL.

Total gas $= 20 + 15 = 35$ mL; shaking with alkali removes the CO₂, leaving 15 mL.`,
      v: table(['Gas', 'Before / mL', 'After / mL'], [['Ethane', '10', '0'], ['Oxygen', '50', '15'], ['Carbon dioxide', '0', '20'], ['Total gas', '60', '35']], 'Table of gas volumes before and after the combustion of ethane'),
      n: 'Use the volume ratio from the balanced equation: two ethane, seven oxygen, four carbon dioxide. Ten millilitres of ethane needs thirty five of oxygen and gives twenty of carbon dioxide. Oxygen left is fifteen, so thirty five millilitres of gas remain after the water condenses. Passing the gas through alkali removes the carbon dioxide and leaves fifteen millilitres of oxygen.',
    }),
    sl('concept', 'Dalton’s atomic theory', {
      b: 'Matter is made of **indivisible atoms**; atoms of one element are **identical in mass and properties** and differ from atoms of other elements; atoms combine in **small whole-number ratios**; reactions only **rearrange** atoms.',
      v: table(['Postulate', 'Explains'], [['Atoms are not created or destroyed', 'Conservation of mass'], ['Compound atoms combine in a fixed whole-number ratio; atoms of an element have fixed mass', 'Definite proportions'], ['The same atoms may combine in more than one whole-number ratio', 'Multiple proportions'], ['Atoms are the units that combine', 'Reciprocal proportions']], 'Table linking each postulate of Dalton’s theory to the law it explains'),
      n: 'Dalton proposed that matter is made of tiny indivisible atoms. Atoms of one element are alike, atoms of different elements differ, and atoms combine in small whole numbers to form compounds. In a reaction they are only rearranged. These ideas explain the laws of conservation of mass, definite proportions, multiple proportions and reciprocal proportions.',
    }),
    sl('concept', 'Limitations of Dalton’s theory', {
      b: 'Later discoveries showed that several postulates need revision.',
      v: table(['Postulate', 'Discovery against it'], [['Atoms are indivisible', 'Electrons, protons and neutrons were found inside atoms'], ['Atoms of an element are identical in mass', 'Isotopes: chlorine-35 and chlorine-37'], ['Gas particles are atoms', 'Gay-Lussac’s volumes need diatomic molecules (Avogadro)'], ['Same atoms give same properties', 'Allotropes: diamond and graphite']], 'Table of limitations of Dalton’s theory with the discoveries that contradict them'),
      n: 'Dalton’s theory was a great step but has limits. Atoms are divisible, since electrons, protons and neutrons exist inside them. Atoms of one element can differ in mass, as isotopes do. Treating the smallest particle of a gas as an atom could not explain Gay-Lussac’s volumes. And diamond and graphite, both carbon, differ widely in properties.',
    }),
    sl('check', 'Quick check: limitations', {
      b: 'Choose the observation that contradicts a Dalton postulate.',
      n: 'Quick check. Dalton said that all atoms of one element are identical in mass. Ask which of the four observations shows that atoms of a single element can differ in mass, and which are only the laws that his theory successfully explained.',
      chk: 'dalton-chk',
    }),
    sl('concept', 'Avogadro’s molecule', {
      b: '**Avogadro (1811):** equal volumes of gases at the same temperature and pressure contain equal numbers of **molecules**; molecules of hydrogen and chlorine are **diatomic**.',
      v: chem(r`H2 + Cl2 -> 2HCl`, 'Equation of hydrogen and chlorine forming two molecules of hydrogen chloride', 'One volume of hydrogen and one of chlorine give two volumes of hydrogen chloride.'),
      n: 'Avogadro solved the puzzle of the volumes. If equal volumes hold equal numbers of molecules, and hydrogen and chlorine molecules each contain two atoms, then one molecule of each makes two molecules of hydrogen chloride, which is one volume plus one volume giving two volumes. The idea of the molecule extended Dalton’s atom.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Conservation of mass; definite proportions; multiple proportions; reciprocal proportions.',
        'To test a law from measurements, compare ratios of masses at a fixed mass of one element.',
        'Gay-Lussac: simple whole-number volume ratios for gases at the same T and P.',
        'Dalton’s postulates explain the mass laws.',
        'Limitations: divisible atoms, isotopes, diatomic gas molecules, allotropes.',
      ],
      v: table(['Law', 'Test with data'], [['Conservation', 'Total mass before = after'], ['Definite', 'Same mass ratio in samples'], ['Multiple', 'Fix one element, ratio of the other'], ['Reciprocal', 'Ratio through third = direct ratio'], ['Gay-Lussac', 'Volume ratio from the equation']], 'Summary table of laws and how each is tested'),
      n: 'To sum up Part 2. Mass is conserved. A compound has a fixed composition. Two elements that form several compounds do so in whole number mass ratios. Two elements that combine with a third combine with each other in the same ratio or a simple multiple. Gases combine in simple volume ratios. Dalton’s atoms explain the mass laws, and his theory needed Avogadro’s molecule and the discovery of subatomic particles.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Name the law and show the ratio calculation for it; give the result as a simple ratio.',
        'For multiple proportions fix the mass of one element, then compare the other.',
        'For reciprocal proportions compare the ratio through the third element with the direct ratio.',
        'For gas volumes write the balanced equation first; remember liquid water has negligible volume.',
        'Give a specific example for each limitation of Dalton’s theory.',
      ],
      v: table(['Slip', 'Fix'], [['Using percentages directly as masses of different totals', 'Convert to grams per gram of one element'], ['Counting liquid water as a gas volume', 'Treat condensed water as zero volume'], ['Calling reciprocal proportions multiple proportions', 'Use three elements for reciprocal']], 'Table of common slips from Part 2 and their fixes'),
      n: 'Exam tips for Part 2. Always name the law you are verifying and show the ratio. For multiple proportions fix one element, for reciprocal proportions use a third element, and compare the ratios. For gas volumes start from the balanced equation, and do not count liquid water as a gas. When asked for limitations of Dalton’s theory, give a specific piece of evidence for each.',
    }),
  ],
});
