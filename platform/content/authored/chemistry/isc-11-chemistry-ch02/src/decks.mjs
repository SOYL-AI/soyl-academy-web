// ISC 11 ch02 — two decks: Part 1 (t01–t03) atomic and molecular masses, mole, formulae, chemical equivalents;
// Part 2 (t04–t05) concentration terms, normality and molarity equations, stoichiometry, limiting reagent.
import { sl, deck, table, flow, svgV, r, sci, dec } from './lib.mjs';
import { MOLE_HUB, EQ_BARS, CONC_DENOM, TITRATION, LIM_BARS } from './svgs.mjs';

const NA = 6.022e23;
// numbers used in the worked examples (computed, then interpolated)
const nh3 = 5.5 / 17;
const nh3Mol = nh3 * NA;
const nh3H = 3 * nh3Mol;
const co2n = 8.8 / 44;
const co2V = co2n * 22.4;
const neon = [[20, 19.992, 90.48], [21, 20.994, 0.27], [22, 21.991, 9.25]];
const neonAvg = neon.reduce((s, [, m, p]) => s + (m * p) / 100, 0);
const glMol = 0.1 / 0.25;
const glNw = 250 / 18;
const glX = 0.1 / (0.1 + glNw);
const glV = (18 + 250) / 1.04 / 1000;
const glC = 0.1 / glV;
const hno3M = (10 * 70 * 1.41) / 63;
const hno3V = (0.5 * 500) / hno3M;
const mgn = 6.0 / 24;
const h2o2n = 6.8 / 34;

export const V = {
  moleHub: svgV(MOLE_HUB, 'Hub diagram: amount in moles connects to mass by molar mass, to number of particles by the Avogadro constant, to gas volume at STP by 22.4 litres, and to a solution by molarity', 'Worked values are for 0.50 mol of carbon dioxide.'),
  eqBars: svgV(EQ_BARS, 'Bar chart comparing molar mass with equivalent weight for HCl, H2SO4, H3PO4, NaOH, Ca(OH)2 and KMnO4 in acidic solution', 'Equivalent weight is the molar mass divided by the n-factor.'),
  concDenom: svgV(CONC_DENOM, 'Beaker of glucose solution and a table showing what each concentration term divides by', 'Check the denominator first: solution or solvent, litres or kilograms.'),
  titration: svgV(TITRATION, 'Burette of 0.120 N acid above a flask of base showing N1V1 equals N2V2 and a base normality of 0.100', 'At the end point the gram equivalents of acid and base are equal.'),
  limBars: svgV(LIM_BARS, 'Bar chart of moles before and after 0.40 mol Al reacts with 0.30 mol Cl2: chlorine is used up, 0.20 mol Al remains and 0.20 mol AlCl3 forms', 'Chlorine runs out first, so it decides how much product forms.'),
};

export const deck1 = deck({
  part: 1,
  title: 'Mole Concept — Part 1: Mole, formulae and chemical equivalents',
  goals: [
    'Calculate moles, molecules and atoms from mass and gas volume at STP',
    'Find empirical and molecular formulae from percentage composition',
    'Calculate equivalent weights of acids, bases, salts and redox agents and relate them to molar mass and valency',
  ],
  slides: [
    sl('title', 'Counting by Weighing', {
      b: 'Part 1: atomic and molecular masses, the mole, formulae from analysis, and chemical equivalents.',
      v: table(['Quantity', 'Link'], [['Mass ↔ moles', 'divide or multiply by molar mass'], ['Moles ↔ particles', r`multiply or divide by $6.022 \times 10^{23}$`], ['Moles ↔ gas volume at STP', 'multiply or divide by 22.4 L'], ['Mass ↔ gram equivalents', 'divide or multiply by equivalent weight']], 'Table of links between mass, moles, particles, volume and equivalents'),
      n: 'Atoms are far too small to count one by one, so chemists count them by weighing. This part builds that bridge. We start with atomic and molecular masses and the mole, then find formulae from percentage composition, and finally meet the ISC idea of chemical equivalents, which links the mass of a substance to its combining power.',
    }),
    sl('concept', 'Atomic and molecular masses', {
      b: 'The **atomic mass unit** (u) is **one twelfth of the mass of a carbon-12 atom**, about $1.66 \\times 10^{-27}$ kg. The atomic mass in the periodic table is the **weighted average** over the isotopes; **molecular mass** is the sum of atomic masses in the molecule.',
      v: table(['Isotope of neon', 'Mass / u', 'Abundance'], neon.map(([a, m, p]) => [`Neon-${a}`, m.toFixed(3), `${p} %`]).concat([['Weighted average', dec(neonAvg, 4), 'periodic-table value']]), 'Table of neon isotopes, their masses and abundances, with the weighted average atomic mass'),
      n: 'The atomic mass unit is defined as one twelfth of the mass of a carbon twelve atom. The atomic mass listed for an element is an average, weighted by how common each isotope is. Neon is mostly neon twenty, with a little neon twenty two, and the weighted average comes to about twenty point one eight. Molecular mass is simply the sum of the atomic masses in a molecule.',
    }),
    sl('diagram', 'The mole, Avogadro constant and molar volume', {
      b: 'One **mole** contains $6.022 \\times 10^{23}$ elementary entities (as many as in 12 g of carbon-12). **Molar mass** in g mol⁻¹ equals the molecular mass in u. At **STP** (273 K, 1 atm) one mole of any gas occupies **22.4 L**.',
      v: V.moleHub,
      n: 'Amount in moles sits at the centre. Multiply by molar mass to get grams. Multiply by the Avogadro constant to get the number of particles. Multiply by twenty two point four litres to get the volume of a gas at standard temperature and pressure. And moles divided by molarity gives the volume of a solution. Whatever you are given, convert to moles first.',
    }),
    sl('example', 'Worked example: mole conversions', {
      b: r`**Problem.** (a) For 5.50 g of ammonia ($\ce{NH3}$, $M = 17$ g mol⁻¹) find the amount, the number of molecules and the number of hydrogen atoms. (b) Find the volume at STP of 8.80 g of carbon dioxide ($M = 44$ g mol⁻¹).

**(a)** $n = 5.50/17 = ${dec(nh3, 3)}$ mol. Molecules $= ${dec(nh3, 3)} \times 6.022 \times 10^{23} = ${sci(nh3Mol, 3)}$. Hydrogen atoms $= 3 \times ${sci(nh3Mol, 3)} = ${sci(nh3H, 3)}$.

**(b)** $n = 8.80/44 = ${co2n.toFixed(3)}$ mol; $V = ${co2n.toFixed(3)} \times 22.4 = ${co2V.toFixed(2)}$ L.`,
      v: table(['Step', 'Ammonia sample', 'Carbon dioxide sample'], [['Amount / mol', dec(nh3, 3), co2n.toFixed(3)], ['Particles', sci(nh3Mol, 3) + ' molecules', '—'], ['Volume at STP', '—', co2V.toFixed(2) + ' L']], 'Table of the mole conversions for ammonia and carbon dioxide samples'),
      n: 'Both parts start by finding moles. For ammonia, divide five point five grams by seventeen to get about zero point three two four mole. Multiply by the Avogadro constant for molecules, then by three for hydrogen atoms. For carbon dioxide, eight point eight grams is exactly zero point two mole, and that many moles of any gas at standard conditions fills four point four eight litres.',
    }),
    sl('check', 'Quick check: moles and atoms', {
      b: 'Convert a mass of an acid to the number of atoms of one element.',
      n: 'Quick check. First convert the mass to moles of molecules using the molar mass. Then multiply by the Avogadro constant, and finally multiply by the number of atoms of the element in one molecule. Do all three steps before looking at the options.',
      chk: 'mole-chk',
    }),
    sl('concept', 'Percentage composition and empirical formula', {
      b: '**Mass percent of an element** $=\\dfrac{\\text{mass of the element in one mole}}{\\text{molar mass}} \\times 100$. The **empirical formula** is the simplest whole-number ratio of atoms; the **molecular formula** is $n \\times$ the empirical formula with $n = M / M_\\text{empirical}$.',
      v: flow('LR', [['a', 'Percentages as grams in 100 g'], ['b', 'Divide each by atomic mass'], ['c', 'Divide by the smallest'], ['d', 'Clear fractions: × 2 for 1.5, × 3 for 1.33'], ['e', 'Empirical formula; × n for molecular']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow from percentage composition to empirical and molecular formula'),
      n: 'To find a formula from analysis, treat the percentages as grams in a hundred gram sample. Divide each by its atomic mass to get moles, then divide all by the smallest to get a ratio. If a ratio is near one point five, multiply everything by two; near one point three three, multiply by three. The molecular formula is a whole number multiple of the empirical formula.',
    }),
    sl('example', 'Worked example: empirical formula', {
      b: r`**Problem.** A compound contains 32.4 % sodium, 22.5 % sulfur and 45.1 % oxygen (Na = 23, S = 32, O = 16). Find its empirical formula.

Moles in 100 g: Na $= 32.4/23 = 1.409$; S $= 22.5/32 = 0.703$; O $= 45.1/16 = 2.819$.

Dividing by 0.703: Na : S : O $= 2.00 : 1 : 4.01 \approx 2 : 1 : 4$. Empirical formula: $\ce{Na2SO4}$.`,
      v: table(['Element', 'Mass in 100 g', 'Moles', 'Ratio'], [['Na', '32.4', '1.409', '2.00'], ['S', '22.5', '0.703', '1'], ['O', '45.1', '2.819', '4.01']], 'Table of the mole calculation for the empirical formula of sodium sulfate'),
      n: 'Treat the percentages as grams in a hundred gram sample and divide by the atomic masses. This gives about one point four moles of sodium, point seven moles of sulfur and two point eight moles of oxygen. Divide all three by the smallest, point seven, and the ratio is two to one to four. The empirical formula is therefore sodium sulfate.',
    }),
    sl('example', 'Worked example: molecular formula', {
      b: r`**Problem.** An oxide of nitrogen contains 30.4 % nitrogen and 69.6 % oxygen and has a molar mass of 92 g mol⁻¹. Find the molecular formula.

Moles: N $= 30.4/14 = 2.171$; O $= 69.6/16 = 4.350$. Ratio $1 : 2.00$, so the empirical formula is $\ce{NO2}$ (mass 46).

$n = 92/46 = 2$, so the molecular formula is $(\ce{NO2})_2 = \ce{N2O4}$.`,
      v: table(['Step', 'Result'], [['Moles N : O', '2.171 : 4.350'], ['Ratio', '1 : 2'], ['Empirical formula mass', '46'], ['n = 92 / 46', '2'], ['Molecular formula', r`$\ce{N2O4}$`]], 'Table of steps from percentage composition to the molecular formula of dinitrogen tetroxide'),
      n: 'Moles of nitrogen and oxygen come out in the ratio one to two, giving the empirical formula with one nitrogen and two oxygen atoms, whose formula mass is forty six. The molar mass given is ninety two, exactly twice that, so every subscript doubles and the molecular formula is dinitrogen tetroxide.',
    }),
    sl('check', 'Quick check: empirical formula', {
      b: 'Find an empirical formula from percentage composition.',
      n: 'Quick check. Treat the percentages as grams, divide by atomic masses, then divide by the smallest number of moles. Round only when the ratios are very close to whole numbers, and multiply up if you see a fraction such as one point five.',
      chk: 'formula-chk',
    }),
    sl('concept', 'Chemical equivalents', {
      b: 'The **equivalent weight** $E$ is the mass that combines with or displaces 1 part of hydrogen (8 parts of oxygen); in grams it is the **gram equivalent weight**. In general $E = M / n$ where $n$ is the **n-factor**.',
      v: table(['Substance', 'n-factor', 'E'], [['Element', 'valency', 'atomic mass / valency'], ['Acid', 'basicity: H⁺ replaced', 'M / basicity'], ['Base', 'acidity: OH⁻ replaced', 'M / acidity'], ['Salt', 'total positive (or negative) charge', 'M / total charge'], ['Oxidising or reducing agent', 'electrons gained or lost per formula unit', 'M / electrons']], 'Table of n-factors and equivalent weights for elements, acids, bases, salts and redox agents'),
      n: 'The equivalent weight of a substance is the mass that combines with or replaces one part of hydrogen. It is found by dividing the molar mass by the n factor. For an acid the n factor is its basicity, for a base its acidity, for a salt the total positive charge, and for an oxidising or reducing agent the number of electrons gained or lost per formula unit.',
    }),
    sl('diagram', 'Molar mass versus equivalent weight', {
      b: 'The same molar mass can give different equivalent weights: $E = M / n$ is **never larger** than $M$.',
      v: V.eqBars,
      n: 'Compare the grey and coloured bars. Hydrochloric acid and sodium hydroxide have an n factor of one, so equivalent weight equals molar mass. Sulfuric acid and calcium hydroxide have an n factor of two, which halves it. Phosphoric acid fully neutralised has three, and permanganate in acid solution gains five electrons, so its equivalent weight is just over thirty one.',
    }),
    sl('concept', 'Variable equivalent weight and gram equivalents', {
      b: 'The n-factor depends on the **reaction**, so some substances have **variable equivalent weight**. The **number of gram equivalents** $=\\dfrac{\\text{mass}}{E}$. For an element, $E = \\dfrac{\\text{atomic mass}}{\\text{valency}}$, so valency $= \\dfrac{\\text{atomic mass}}{E}$.',
      v: table(['Substance', 'Reaction or medium', 'n', 'E / g eq⁻¹'], [['H₃PO₄ (M = 98)', 'one H⁺ replaced', '1', '98.0'], ['', 'two H⁺ replaced', '2', '49.0'], ['', 'three H⁺ replaced', '3', '32.7'], ['KMnO₄ (M = 158)', 'acidic (Mn²⁺)', '5', '31.6'], ['', 'neutral (MnO₂)', '3', '52.7'], ['', 'alkaline (MnO₄²⁻)', '1', '158.0'], ['Iron', 'in FeCl₂ (valency 2)', '2', '28.0'], ['', 'in FeCl₃ (valency 3)', '3', '18.7']], 'Table of variable equivalent weights of phosphoric acid, potassium permanganate and iron'),
      n: 'Because the n factor depends on the reaction, one substance can have several equivalent weights. Phosphoric acid can lose one, two or three hydrogen ions. Permanganate gains five, three or one electrons in acidic, neutral and alkaline media. Iron has different valencies in its two chlorides. The number of gram equivalents is the mass divided by the equivalent weight.',
    }),
    sl('example', 'Worked example: equivalent weights', {
      b: r`**Problem.** Find the equivalent weight of (a) oxalic acid dihydrate, $\ce{H2C2O4.2H2O}$ (M = 126), as an acid; (b) magnesium hydroxide (M = 58); (c) iron(III) chloride (M = 162.5) as a salt; (d) copper in $\ce{CuSO4}$ (Cu = 63.5).

**(a)** Dibasic: $126/2 = 63$.  **(b)** Diacidic: $58/2 = 29$.

**(c)** Total positive charge $= 3$: $162.5/3 = 54.2$.  **(d)** Valency 2: $63.5/2 = 31.75$.`,
      v: table(['Substance', 'n-factor', 'E / g eq⁻¹'], [['Oxalic acid dihydrate', '2 (basicity)', '63'], ['Magnesium hydroxide', '2 (acidity)', '29'], ['Iron(III) chloride', '3 (charge)', '54.2'], ['Copper in copper(II) sulfate', '2 (valency)', '31.75']], 'Table of four equivalent weight calculations with their n-factors'),
      n: 'Each answer is the molar mass divided by the right n factor. Oxalic acid has two replaceable hydrogens, so one hundred twenty six becomes sixty three. Magnesium hydroxide has two hydroxide groups. Iron chloride, as a salt, has a total positive charge of three. And copper has valency two. Always ask first what the n factor is in the reaction concerned.',
    }),
    sl('example', 'Worked example: gram equivalents and valency', {
      b: r`**Problem.** (a) How many gram equivalents are in 7.4 g of $\ce{Ca(OH)2}$ (E = 37)? (b) How many in 10.6 g of $\ce{Na2CO3}$ (E = 53)? (c) A trivalent metal has equivalent weight 9.0. Find its atomic mass.

**(a)** $7.4/37 = 0.20$.  **(b)** $10.6/53 = 0.20$.

**(c)** Atomic mass $= E \times \text{valency} = 9.0 \times 3 = 27$ (aluminium).`,
      v: table(['Sample', 'Mass / g', 'E / g eq⁻¹', 'Gram equivalents'], [['Calcium hydroxide', '7.4', '37', '0.20'], ['Sodium carbonate', '10.6', '53', '0.20'], ['Trivalent metal (E = 9.0)', '—', '9.0', 'atomic mass 27']], 'Table of gram equivalents of two compounds and the atomic mass of a trivalent metal'),
      n: 'Gram equivalents are mass divided by equivalent weight. Seven point four grams of calcium hydroxide and ten point six grams of sodium carbonate both come to point two gram equivalents, although their masses and moles differ. For an element, atomic mass equals equivalent weight times valency, so a trivalent metal of equivalent weight nine has an atomic mass of twenty seven.',
    }),
    sl('check', 'Quick check: equivalent weight', {
      b: 'Decide the n-factor for a given reaction.',
      n: 'Quick check. Read the balanced equation to see how many hydrogen ions are actually replaced, because that number is the n factor. Then divide the molar mass by it. Remember that the same acid can have a different equivalent weight in a different reaction.',
      chk: 'equiv-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Atomic mass unit = 1/12 of a carbon-12 atom; average atomic mass is weighted by abundance.',
        r`1 mol = $6.022 \times 10^{23}$ entities; molar volume at STP = 22.4 L.`,
        'Empirical formula from moles ratio; molecular formula = n × empirical.',
        'E = M / n-factor; gram equivalents = mass / E.',
        'Equivalent weight can vary with the reaction (H₃PO₄, KMnO₄, Fe).',
      ],
      v: table(['Need', 'Tool'], [['Particles from mass', 'moles, then N_A'], ['Formula from analysis', 'moles ratio'], ['Combining power', 'M / n-factor']], 'Summary table of tools for Part 1'),
      n: 'To sum up Part 1. The atomic mass unit is a twelfth of a carbon twelve atom. A mole holds the Avogadro number of particles and a mole of gas fills twenty two point four litres at standard conditions. Mole ratios give empirical formulae. And equivalent weight is molar mass divided by the n factor, which can change with the reaction.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Always convert to moles first; write the molar mass you use.',
        'Count atoms of an element: moles × atoms per molecule × N_A.',
        'Multiply a ratio of 1.5 by 2 and 1.33 by 3 before writing the formula.',
        'State the n-factor and the reaction when giving an equivalent weight.',
        'Equivalent weight of KMnO₄ and H₃PO₄ depends on the medium or the reaction.',
      ],
      v: table(['Slip', 'Fix'], [['Molecules instead of atoms', 'Multiply by atoms per molecule'], ['Rounding 1.5 to 2', 'Double every ratio instead'], ['Using M as the equivalent weight of every acid', 'Divide by basicity']], 'Table of common slips from Part 1 and their fixes'),
      n: 'Exam tips for Part 1. Convert to moles first and write down the molar mass. When counting atoms, remember to multiply by the number of atoms in one molecule. Clear fractional ratios by multiplying, not by rounding. And when you quote an equivalent weight, say which n factor you used, because it depends on the reaction.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Mole Concept — Part 2: Concentration and stoichiometry',
  goals: [
    'Express concentration as w/w, w/v, molarity, molality, normality and mole fraction and convert between them',
    'Use N₁V₁ = N₂V₂ and M₁V₁ = M₂V₂',
    'Do mass-mass, mass-volume and volume-volume calculations and identify the limiting reagent',
  ],
  slides: [
    sl('title', 'Concentration and Stoichiometry', {
      b: 'Part 2: how much solute is in a solution, how solutions react, and how much product a reaction gives.',
      v: table(['Term', 'Divides by'], [['Molarity', 'litres of solution'], ['Molality', 'kilograms of solvent'], ['Normality', 'litres of solution (gram equivalents)'], ['Mole fraction', 'total moles']], 'Table of concentration terms and what each divides by'),
      n: 'This part answers two practical questions. How much solute is dissolved in a solution, and how much product does a reaction give. We meet six ways of stating concentration, the equations that make titrations and dilutions easy, and then use balanced equations to calculate masses and volumes and to find the limiting reagent.',
    }),
    sl('concept', 'Concentration terms', {
      b: 'Percent w/w uses mass of solution; percent w/v uses volume of solution in mL; **molarity** and **normality** use litres of solution; **molality** uses kilograms of solvent; **mole fraction** uses total moles.',
      v: table(['Term', 'Definition'], [['Percent w/w', r`$\dfrac{\text{g solute}}{\text{g solution}} \times 100$`], ['Percent w/v', r`$\dfrac{\text{g solute}}{\text{mL solution}} \times 100$`], ['Molarity, M', r`$\dfrac{n_\text{solute}}{V(\text{L})}$`], ['Molality, m', r`$\dfrac{n_\text{solute}}{m_\text{solvent}(\text{kg})}$`], ['Normality, N', r`$\dfrac{\text{gram equivalents}}{V(\text{L})} = M \times n\text{-factor}$`], ['Mole fraction, x', r`$\dfrac{n_\text{A}}{n_\text{A} + n_\text{B}}$`]], 'Table of the six concentration terms with their definitions'),
      n: 'Percent weight by weight divides by the mass of the solution; percent weight by volume divides by the volume in millilitres. Molarity and normality divide by litres of solution. Molality divides by kilograms of solvent, and mole fraction compares moles of one component with the total. Normality equals molarity multiplied by the n factor.',
    }),
    sl('diagram', 'What goes in the denominator', {
      b: 'Always check the denominator: **solution or solvent**, **litres or kilograms**. Molality and mole fraction do not change with temperature; molarity and normality do.',
      v: V.concDenom,
      n: 'Look at the denominators. Molarity and normality use the volume of the whole solution, so they change when the solution expands on heating. Molality uses the mass of the solvent and mole fraction uses moles, so they do not depend on temperature. Most mistakes in these problems come from using the wrong denominator.',
    }),
    sl('example', 'Worked example: molality, mole fraction and molarity', {
      b: r`**Problem.** 18.0 g of glucose ($M = 180$ g mol⁻¹) is dissolved in 250 g of water; the solution has density 1.04 g mL⁻¹. Find the molality, mole fraction of glucose and molarity.

$n(\text{glucose}) = 18.0/180 = 0.100$ mol.

**Molality** $= 0.100/0.250 = ${glMol.toFixed(3)}$ mol kg⁻¹.

**Mole fraction:** $n(\ce{H2O}) = 250/18 = ${glNw.toFixed(2)}$ mol, so $x = 0.100/(0.100 + ${glNw.toFixed(2)}) = ${glX.toFixed(5)}$.

**Molarity:** solution mass $= 268$ g, volume $= 268/1.04 = ${(glV * 1000).toFixed(1)}$ mL, so $c = 0.100/${glV.toFixed(4)} = ${glC.toFixed(3)}$ mol L⁻¹.`,
      v: table(['Term', 'Value', 'Needs'], [['Molality', '0.400 mol kg⁻¹', 'mass of solvent'], ['Mole fraction', glX.toFixed(5), 'moles of both components'], ['Molarity', `${glC.toFixed(3)} mol L⁻¹`, 'volume of solution (from density)']], 'Table of molality, mole fraction and molarity of the glucose solution'),
      n: 'One solution gives three different numbers because each term uses a different reference. For molality divide the point one mole of glucose by the point two five kilograms of water. For mole fraction, find the moles of water as well. For molarity, use the density to find the volume of the whole solution, about two hundred fifty eight millilitres, and divide.',
    }),
    sl('diagram', 'Normality and the volumetric equations', {
      b: '$N = M \\times n$-factor. At the end point of a titration, **gram equivalents of acid = gram equivalents of base**, so $N_1V_1 = N_2V_2$. On dilution the amount of solute is unchanged: $M_1V_1 = M_2V_2$.',
      v: V.titration,
      n: 'Normality equals molarity multiplied by the n factor. In a titration, the acid and base react in equal numbers of gram equivalents at the end point. Gram equivalents are normality times volume, so the normality of the acid times its volume equals the normality of the base times its volume. When you dilute a solution, molarity times volume stays constant.',
    }),
    sl('example', 'Worked example: neutralisation', {
      b: r`**Problem.** 20.0 mL of 0.0600 M sulfuric acid neutralises 24.0 mL of sodium hydroxide solution. Find the normality, molarity and strength (g L⁻¹) of the base (NaOH $= 40$ g mol⁻¹).

$N_\text{acid} = 0.0600 \times 2 = 0.120$ N.

$N_1V_1 = N_2V_2$: $0.120 \times 20.0 = N_2 \times 24.0$, so $N_2 = 0.100$ N.

NaOH has n-factor 1, so $M = 0.100$ M and strength $= 0.100 \times 40 = 4.00$ g L⁻¹.`,
      v: table(['Quantity', 'Acid', 'Base'], [['Normality', '0.120 N', '0.100 N'], ['Volume', '20.0 mL', '24.0 mL'], ['Milli-equivalents', '2.40', '2.40']], 'Table of normality, volume and milli-equivalents of the acid and base in the neutralisation'),
      n: 'First convert the molarity of the acid to normality: point zero six zero molar sulfuric acid is point one two zero normal. Apply the normality equation: point one two zero times twenty equals the unknown times twenty four, giving point one zero zero normal. Sodium hydroxide has an n factor of one, so its molarity is the same, and its strength is four grams per litre.',
    }),
    sl('check', 'Quick check: concentration', {
      b: 'Calculate a molality from the mass of solute and solvent.',
      n: 'Quick check. Molality divides moles of solute by the mass of the solvent in kilograms, not by the mass of the whole solution or the volume. Convert the grams of solute to moles, convert grams of water to kilograms, and then divide.',
      chk: 'conc-chk',
    }),
    sl('example', 'Worked example: concentrated acid label and dilution', {
      b: r`**Problem.** Concentrated nitric acid is labelled 70 % w/w with density 1.41 g mL⁻¹ ($\ce{HNO3}$, $M = 63$). Find its molarity and normality, and the volume needed to make 500 mL of 0.500 M acid.

In 100 g: 70 g $\ce{HNO3}$ $= 1.111$ mol; volume $= 100/1.41 = 70.9$ mL. $c = 1.111/0.0709 = ${hno3M.toFixed(1)}$ M, or $c = 10 \times 70 \times 1.41/63 = ${hno3M.toFixed(1)}$ M. The n-factor is 1, so $N = ${hno3M.toFixed(1)}$ N.

$M_1V_1 = M_2V_2$: $V_1 = 0.500 \times 500/${hno3M.toFixed(2)} = ${hno3V.toFixed(1)}$ mL.`,
      v: table(['Step', 'Result'], [['Moles in 100 g of acid', '1.111 mol'], ['Volume of 100 g', '70.9 mL'], ['Molarity = normality', `${hno3M.toFixed(1)}`], ['Stock volume for 500 mL of 0.500 M', `${hno3V.toFixed(1)} mL`]], 'Table of the steps from the label of nitric acid to the dilution volume'),
      n: 'Take a hundred grams of the acid. Seventy grams is nitric acid, about one point one one moles, and the hundred grams occupy about seventy one millilitres. Dividing gives about fifteen point seven molar, and because the n factor is one, the normality is the same. To dilute to half a molar in five hundred millilitres, you need about sixteen millilitres of the stock.',
    }),
    sl('concept', 'Stoichiometry: mass, volume and moles', {
      b: 'A balanced equation gives **mole ratios**, and at the same T and P, **volume ratios** for gases. Every calculation goes **through moles**.',
      v: flow('LR', [['a', 'Mass of A (÷ M) or volume of gas A (÷ 22.4 L)'], ['b', 'Moles of A'], ['c', 'Moles of B from the coefficient ratio'], ['d', 'Mass of B (× M) or gas volume of B (× 22.4 L)']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for mass-mass, mass-volume and volume-volume stoichiometry'),
      n: 'A balanced equation tells us how many moles of each substance take part. For mass to mass problems, convert the given mass to moles, use the coefficient ratio to get moles of the wanted substance, and convert back to mass. For gases at standard conditions use twenty two point four litres per mole, and for gases at the same temperature and pressure volume ratios equal mole ratios.',
    }),
    sl('example', 'Worked example: mass to volume', {
      b: r`**Problem.** 6.0 g of magnesium reacts with excess dilute sulfuric acid: $\ce{Mg + H2SO4 -> MgSO4 + H2}$ (Mg = 24, MgSO₄ = 120). Find the volume of hydrogen at STP and the mass of magnesium sulfate formed.

$n(\ce{Mg}) = 6.0/24 = ${mgn.toFixed(2)}$ mol; 1 mol Mg gives 1 mol $\ce{H2}$ and 1 mol $\ce{MgSO4}$.

$V(\ce{H2}) = ${mgn.toFixed(2)} \times 22.4 = ${(mgn * 22.4).toFixed(1)}$ L; $m(\ce{MgSO4}) = ${mgn.toFixed(2)} \times 120 = ${(mgn * 120).toFixed(1)}$ g.`,
      v: table(['Substance', 'Moles', 'Quantity'], [['Mg', mgn.toFixed(2), '6.0 g'], ['H₂', mgn.toFixed(2), `${(mgn * 22.4).toFixed(1)} L at STP`], ['MgSO₄', mgn.toFixed(2), `${(mgn * 120).toFixed(1)} g`]], 'Table of moles and quantities for magnesium, hydrogen and magnesium sulfate'),
      n: 'Six grams of magnesium is a quarter of a mole. The balanced equation shows one to one ratios, so a quarter mole of hydrogen and a quarter mole of magnesium sulfate form. A quarter mole of hydrogen at standard conditions is five point six litres, and a quarter mole of magnesium sulfate weighs thirty grams.',
    }),
    sl('check', 'Quick check: stoichiometry', {
      b: 'Work backwards from a gas volume to a mass of reactant.',
      n: 'Quick check. Here you are given a gas volume and asked for the mass of a solid reactant. Convert the volume to moles by dividing by twenty two point four litres, use the coefficient ratio from the equation, and then multiply the moles of the solid by its molar mass.',
      chk: 'stoich-chk',
    }),
    sl('example', 'Worked example: mass to mass and volume', {
      b: r`**Problem.** Hydrogen peroxide decomposes: $\ce{2H2O2 -> 2H2O + O2}$ ($\ce{H2O2}$ $= 34$ g mol⁻¹). From 6.8 g of hydrogen peroxide find the mass and the STP volume of oxygen.

$n(\ce{H2O2}) = 6.8/34 = ${h2o2n.toFixed(2)}$ mol, so $n(\ce{O2}) = ${h2o2n.toFixed(2)} \times 1/2 = ${(h2o2n / 2).toFixed(2)}$ mol.

$m(\ce{O2}) = ${(h2o2n / 2).toFixed(2)} \times 32 = ${((h2o2n / 2) * 32).toFixed(1)}$ g and $V = ${(h2o2n / 2).toFixed(2)} \times 22.4 = ${((h2o2n / 2) * 22.4).toFixed(2)}$ L.`,
      v: table(['Step', 'Value'], [['n(H₂O₂)', '0.20 mol'], ['Mole ratio H₂O₂ : O₂', '2 : 1'], ['n(O₂)', '0.10 mol'], ['Mass and volume of O₂', '3.2 g and 2.24 L']], 'Table of steps for the decomposition of hydrogen peroxide'),
      n: 'Six point eight grams of hydrogen peroxide is point two mole. The equation gives one mole of oxygen for every two moles of peroxide, so point one mole of oxygen forms. That is three point two grams, or two point two four litres at standard conditions. The coefficient ratio is the only link between the two substances.',
    }),
    sl('diagram', 'Limiting reagent', {
      b: 'The **limiting reagent** is used up first. Divide each amount in moles by its coefficient; the **smaller** quotient is limiting. The product and the leftover of the other reagent are calculated from it.',
      v: V.limBars,
      n: 'Zero point four mole of aluminium meets zero point three mole of chlorine in the ratio two to three. Divide each by its coefficient: aluminium gives point two, chlorine gives point one. Chlorine is smaller, so chlorine runs out first and decides how much product forms. Zero point two mole of aluminium is left, and zero point two mole of aluminium chloride forms.',
    }),
    sl('example', 'Worked example: limiting reagent', {
      b: r`**Problem.** 10.8 g of aluminium reacts with 21.3 g of chlorine: $\ce{2Al + 3Cl2 -> 2AlCl3}$ (Al = 27, Cl = 35.5). Find the limiting reagent, the mass of aluminium chloride formed and the mass of excess reagent left.

$n(\ce{Al}) = 10.8/27 = 0.400$ mol; $n(\ce{Cl2}) = 21.3/71 = 0.300$ mol. Moles ÷ coefficient: Al $0.200$, $\ce{Cl2}$ $0.100$, so chlorine is limiting.

$n(\ce{AlCl3}) = 0.300 \times 2/3 = 0.200$ mol, $m = 0.200 \times 133.5 = 26.7$ g. Al used $= 0.200$ mol, so Al left $= 0.200 \times 27 = 5.4$ g.`,
      v: table(['Quantity', 'Al', 'Cl₂', 'AlCl₃'], [['Initial / mol', '0.400', '0.300', '0'], ['Moles ÷ coefficient', '0.200', '0.100', '—'], ['Final / mol', '0.200', '0', '0.200'], ['Final mass / g', '5.4', '0', '26.7']], 'Table of amounts before and after the reaction of aluminium with chlorine'),
      n: 'Find the moles of each reactant, divide by the coefficients and compare. Chlorine gives the smaller number, so it is limiting. All the product is calculated from chlorine: point two mole of aluminium chloride, which is twenty six point seven grams. The aluminium that did not react is the difference, point two mole or five point four grams.',
    }),
    sl('check', 'Quick check: limiting reagent', {
      b: 'Identify the limiting reagent and the mass of product.',
      n: 'Quick check. Convert both reactant masses to moles, divide each by its coefficient in the balanced equation, and see which is smaller. That reagent decides the amount of product, so use its moles, not the other reagent, to find the mass formed.',
      chk: 'limit-chk',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Molarity and normality use litres of solution; molality uses kg of solvent; mole fraction uses total moles.',
        'N = M × n-factor; N₁V₁ = N₂V₂ at a neutralisation end point; M₁V₁ = M₂V₂ on dilution.',
        'From a label: M = 10 × (percent w/w) × density / M(solute).',
        'Stoichiometry: mass → moles → coefficient ratio → moles → mass or volume.',
        'Limiting reagent: smallest (moles ÷ coefficient).',
      ],
      v: table(['Need', 'Tool'], [['Concentration', 'check the denominator'], ['Titration or dilution', 'NV = NV or MV = MV'], ['Product mass', 'moles of the limiting reagent']], 'Summary table of tools for Part 2'),
      n: 'To sum up Part 2. Choose the right denominator for each concentration term. Normality is molarity times the n factor, and at a neutralisation end point normality times volume is equal on both sides. Stoichiometry always goes through moles and the coefficient ratio. Finally, the limiting reagent, the one with the smallest moles divided by coefficient, decides how much product forms.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write the balanced equation first and check the coefficients.',
        'Convert mL to L before dividing for molarity or normality.',
        'Use the limiting reagent, never the excess one, for the yield.',
        'In the normality equation use the same volume unit on both sides.',
        'State the n-factor when converting between molarity and normality.',
      ],
      v: table(['Slip', 'Fix'], [['Molality with mass of solution', 'Use mass of solvent only'], ['Normality = molarity', 'Multiply by the n-factor'], ['Product from the excess reagent', 'Use the limiting reagent']], 'Table of common slips from Part 2 and their fixes'),
      n: 'Exam tips for Part 2. Always begin with a balanced equation. Convert millilitres to litres before dividing. Use the limiting reagent for the product and subtract to find the excess left. Keep the volume units the same on both sides of the normality equation, and always state the n factor when you convert between molarity and normality.',
    }),
  ],
});
