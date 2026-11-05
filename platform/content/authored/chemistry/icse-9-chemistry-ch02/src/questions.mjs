// ICSE 9 Chemistry ch02 Chemical Equations and Relative Masses — question bank in ICSE school-examination style
// (calculations with working, balancing, 10-mark structured questions in parts). Numbers come from calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { CA_SAMPLE, CA_PCT_WATER, CA_WATER, M, P, W, P2, ZN_SAMPLE, ZN_WATER, ZN_RESIDUE, NA_SAMPLE, NA_WATER, FE_SAMPLE, FE_MASS, SUMS, HYD_BEFORE, HYD_AFTER, HYD_WATER, HYD_PCT, X_RAM, X_OVER_O, balance, sumCoef, eq, atoms } from './calc.mjs';
import { HEAT_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const heatFig = svgV(HEAT_LETTERED, 'A laboratory set-up for heating hydrated crystals in a test tube with five parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-types', mcq({
  stem: 'Copper reacts with concentrated nitric acid to give copper nitrate, nitrogen dioxide and water. The reaction has',
  right: 'two reactants and three products', wrong: ['one reactant and three products', 'three reactants and two products', 'two reactants and one product'],
  sol: 'Copper and nitric acid are the two reactants; copper nitrate, nitrogen dioxide and water are the three products, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('chk-info', mcq({
  stem: r`Which statement about $\ce{2Mg + O2 -> 2MgO}$ is correct?`,
  right: `${M.Mg * 2} parts by mass of magnesium combine with ${M.O2} parts by mass of oxygen`, wrong: ['2 g of magnesium combine with 1 g of oxygen', 'The magnesium oxide formed weighs less than the magnesium used', '2 atoms of oxygen combine with 1 atom of magnesium'],
  sol: `2 × 24 = ${M.Mg * 2} and 2 × 16 = ${M.O2}; the products weigh ${M.MgO * 2}, option (@K).`,
  d: 2, c: 'application', t: [1],
}));
add('chk-balance', mcq({
  stem: 'Magnesium burns in nitrogen to form magnesium nitride, Mg₃N₂. Which coefficients balance Mg + N₂ → Mg₃N₂?',
  right: '3, 1, 1', wrong: ['1, 1, 1', '2, 1, 1', '3, 3, 1'],
  sol: `Three magnesium atoms are needed on the left to match Mg₃ on the right; the solver gives ${balance(['Mg', 'N2'], ['Mg3N2']).join(', ')}, option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('chk-rmm', mcq({
  stem: 'The relative molecular mass of calcium hydroxide, Ca(OH)₂, is (Ca = 40, O = 16, H = 1)',
  right: `${M['Ca(OH)2']}`, wrong: ['57', '58', '90'],
  sol: `40 + 2 × (16 + 1) = ${M['Ca(OH)2']}, option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('chk-pct', mcq({
  stem: 'The percentage of carbon in ethane, C₂H₆, is (C = 12, H = 1)',
  right: `${P.C2H6.C}%`, wrong: ['20%', '40%', '75%'],
  sol: `24 ÷ ${M.C2H6} × 100 = ${P.C2H6.C}%, option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('chk-water', mcq({
  stem: 'Which expression gives the percentage of water of crystallisation in ZnSO₄·7H₂O?',
  right: `(126 ÷ ${M['ZnSO4.7H2O']}) × 100`, wrong: [`(126 ÷ ${M.ZnSO4}) × 100`, `(${M['ZnSO4.7H2O']} ÷ 126) × 100`, `(7 ÷ ${M['ZnSO4.7H2O']}) × 100`],
  sol: 'The mass of the water divided by the mass of the whole hydrate, times 100, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t01 chemical equations
add('eq-mcq1', mcq({
  stem: 'A student writes: calcium carbonate → calcium oxide + carbon dioxide. This is a',
  right: 'word equation', wrong: ['balanced formula equation', 'skeletal formula equation', 'state symbol'],
  sol: 'Names are used instead of formulae, so it is a word equation, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('eq-mcq2', mcq({
  stem: 'Which equation shows a reaction with one reactant and three products?',
  right: r`$\ce{(NH4)2CO3 -> 2NH3 + H2O + CO2}$`, wrong: [r`$\ce{2Mg + O2 -> 2MgO}$`, r`$\ce{CaCO3 -> CaO + CO2}$`, r`$\ce{Zn + 2HCl -> ZnCl2 + H2}$`],
  sol: 'Ammonium carbonate is the single reactant and ammonia, water and carbon dioxide are the three products, option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('eq-mcq3', mcq({
  stem: r`In $\ce{4Al + 3O2 -> 2Al2O3}$ the relative masses of aluminium, oxygen and aluminium oxide taking part are in the ratio (Al = 27, O = 16)`,
  right: `${M.Al * 4} : ${M.O2 * 3} : ${M.Al2O3 * 2}`, wrong: ['4 : 3 : 2', `${M.Al} : ${M.O2} : ${M.Al2O3}`, `${M.Al * 4} : ${M.O2} : ${M.Al2O3}`],
  sol: '4 × 27 = 108; 3 × 32 = 96; 2 × 102 = 204, option (@K).',
  d: 3, c: 'application', t: [1],
}), () => M.Al * 4 === 108 && M.O2 * 3 === 96 && M.Al2O3 * 2 === 204 || 'ratio');
add('eq-mcq4', mcq({
  stem: 'A balanced chemical equation does NOT tell us',
  right: 'how fast the reaction takes place', wrong: ['the substances that react', 'the number of molecules that react', 'the relative masses taking part'],
  sol: 'Speed of a reaction is not shown by an equation, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('eq-mcq5', mcq({
  stem: 'In a chemical equation the symbol (aq) written after a formula shows that the substance is',
  right: 'dissolved in water', wrong: ['a gas', 'a solid', 'a pure liquid'],
  sol: 'The symbol (aq) means aqueous, that is dissolved in water, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ar-eq', ar({
  a: 'A balanced equation has the same number of atoms of each element on both sides.',
  r: 'Atoms are neither created nor destroyed in a chemical reaction.',
  key: 'c',
  sol: 'Because atoms are conserved, the counts match on both sides, so (R) explains (A), option (c).',
  d: 2, c: 'analysis', t: [1, 2],
}));
add('eq-tf', tf({
  stem: 'The triangle written above the arrow in an equation is one of the products.',
  key: 'f',
  sol: 'False. It shows that heat is supplied; it is a condition, not a substance.',
  d: 1, c: 'recall', t: [1],
}));
add('eq-fill', fill({
  stem: 'The substances written on the left of the arrow in a chemical equation are called ___.',
  acc: [['reactants', 'reactant']],
  sol: 'The **reactants**.',
  d: 1, c: 'recall', t: [1],
}));
add('eq-term1', term({
  stem: 'Write the word equation for heating copper(II) carbonate, which gives copper(II) oxide and carbon dioxide.',
  model: 'Copper(II) carbonate → copper(II) oxide + carbon dioxide (on heating).', sol: 'Copper(II) carbonate gives copper(II) oxide and carbon dioxide.', sch: 'Correct word equation',
  d: 1, c: 'application', t: [1],
}));
add('eq-term2', term({
  stem: r`Balance the equation $\ce{Zn + HCl -> ZnCl2 + H2}$.`,
  model: r`$\ce{Zn + 2HCl -> ZnCl2 + H2}$`, sol: 'Two hydrochloric acid are needed to supply two chlorine atoms.', sch: 'Balanced equation',
  d: 1, c: 'application', t: [1, 2],
}));
add('eq-short2a', short({
  marks: 2,
  stem: 'State two differences between a word equation and a formula equation.',
  wl: null,
  model: 'A word equation uses the **names** of the substances; a formula equation uses **symbols and formulae**. A formula equation can be **balanced** to show the number of atoms and the relative masses, while a word equation cannot.',
  sol: 'Names against formulae; balancing possible only with formulae.',
  scheme: [['Names against symbols and formulae', 1], ['Balancing or quantities only in a formula equation', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('eq-short2b', short({
  marks: 2,
  stem: r`Calcium carbonate decomposes on strong heating: $\ce{CaCO3 ->[\Delta] CaO + CO2}$. State (a) the number of reactants and products and (b) what the sign above the arrow means.`,
  wl: null,
  model: '**(a)** **One** reactant and **two** products.\n\n**(b)** The triangle means that **heat** is supplied.',
  sol: 'One reactant, two products; heat.',
  scheme: [['One reactant and two products', 1], ['Heat', 1]],
  d: 2, c: 'application', t: [1],
}));
add('eq-short3', short({
  marks: 3,
  stem: r`State three items of information that the balanced equation $\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$ gives. (Fe = 56, C = 12, O = 16)`,
  wl: null,
  model: `**1.** The **substances**: iron(III) oxide and carbon monoxide react to give iron and carbon dioxide.\n\n**2.** The **numbers of particles**: 1 unit of oxide and 3 molecules of carbon monoxide give 2 atoms of iron and 3 molecules of carbon dioxide.\n\n**3.** The **relative masses**: ${M.Fe2O3} + ${M.CO * 3} = ${M.Fe * 2} + ${M.CO2 * 3}, that is ${SUMS.fe[0]} on each side.`,
  sol: 'Substances; numbers of particles; relative masses 244 each side.',
  scheme: [['Substances named', 1], ['Numbers of particles', 1], ['Relative masses with totals', 1]],
  d: 3, c: 'application', t: [1],
}), () => SUMS.fe[0] === 244 && SUMS.fe[1] === 244 || 'fe');

// ---------------------------------------------------------------- t02 balancing
add('bal-mcq1', mcq({
  stem: r`The sum of all the coefficients when the skeletal equation $\ce{C2H4 + O2 -> CO2 + H2O}$ is balanced is`,
  right: `${sumCoef(['C2H4', 'O2'], ['CO2', 'H2O'])}`, wrong: ['4', '6', '10'],
  sol: `Balanced: C₂H₄ + 3O₂ → 2CO₂ + 2H₂O; 1 + 3 + 2 + 2 = ${sumCoef(['C2H4', 'O2'], ['CO2', 'H2O'])}, option (@K).`,
  d: 3, c: 'application', t: [2],
}));
add('bal-mcq2', mcq({
  stem: r`When the skeletal equation $\ce{Al + HCl -> AlCl3 + H2}$ is balanced, the coefficient of hydrochloric acid is`,
  right: `${balance(['Al', 'HCl'], ['AlCl3', 'H2'])[1]}`, wrong: ['2', '3', '4'],
  sol: 'The balanced equation is 2Al + 6HCl → 2AlCl₃ + 3H₂, so the coefficient is 6, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('bal-mcq3', mcq({
  stem: 'A student balances H₂ + O₂ → H₂O by writing H₂ + O₂ → H₂O₂. This is wrong because',
  right: 'changing a subscript makes a different substance', wrong: ['water has no oxygen in it', 'the equation now has fewer hydrogen atoms', 'a balanced equation must have the same number of molecules'],
  sol: 'H₂O₂ is hydrogen peroxide, not water, so the substance was changed, option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('bal-mcq4', mcq({
  stem: r`In the balanced equation $\ce{2Na + 2H2O -> 2NaOH + H2}$ the number of hydrogen atoms on each side is`,
  right: `${atoms('H2O').H * 2}`, wrong: ['2', '3', '6'],
  sol: 'Left: 2 × 2 = 4; right: 2 + 2 = 4, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-bal', ar({
  a: 'The equation Mg + O₂ → MgO is balanced.',
  r: 'There is one magnesium atom on each side of the equation.',
  key: 'b',
  sol: 'Oxygen has 2 atoms on the left and 1 on the right, so the equation is not balanced; (A) is false and (R) is true, option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('bal-tf', tf({
  stem: 'An equation may be balanced by changing a subscript inside a formula.',
  key: 'f',
  sol: 'False. Changing a subscript changes the substance; only the number in front of the formula may be changed.',
  d: 1, c: 'recall', t: [2],
}));
add('bal-term1', term({
  stem: 'Name the law which makes it necessary to balance a chemical equation.',
  model: 'The **law of conservation of mass**.', sol: 'Law of conservation of mass.', sch: 'Law of conservation of mass',
  d: 1, c: 'recall', t: [2],
}));
add('bal-term2', term({
  stem: r`Balance the equation $\ce{Na2CO3 + HCl -> NaCl + H2O + CO2}$.`,
  model: r`$\ce{Na2CO3 + 2HCl -> 2NaCl + H2O + CO2}$`, sol: 'Two sodium and two chlorine atoms need 2 on the right and 2 on the left.', sch: 'Balanced equation',
  d: 2, c: 'application', t: [2],
}));
add('bal-short2a', short({
  marks: 2,
  stem: r`Balance the equations (a) $\ce{NH3 + O2 -> N2 + H2O}$ and (b) $\ce{Na + O2 -> Na2O}$.`,
  wl: null,
  model: r`**(a)** $\ce{4NH3 + 3O2 -> 2N2 + 6H2O}$` + '\n\n' + r`**(b)** $\ce{4Na + O2 -> 2Na2O}$`,
  sol: 'Nitrogen and hydrogen first; then oxygen; sodium after the oxide.',
  scheme: [['(a) balanced', 1], ['(b) balanced', 1]],
  d: 3, c: 'application', t: [2],
}), () => balance(['NH3', 'O2'], ['N2', 'H2O']).join() === '4,3,2,6' && balance(['Na', 'O2'], ['Na2O']).join() === '4,1,2' || 'bal');
add('bal-short2b', short({
  marks: 2,
  stem: 'Explain why a subscript must never be changed while balancing an equation, using water, H₂O, and hydrogen peroxide, H₂O₂, as an example.',
  wl: null,
  model: 'The subscripts are part of the **formula of a substance**. Changing H₂O to H₂O₂ gives **hydrogen peroxide, a different substance**, so the equation would no longer describe the real reaction.',
  sol: 'Subscripts define the substance; H₂O₂ is a different compound.',
  scheme: [['Subscript fixes the substance', 1], ['Example: H₂O₂ is a different substance', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('bal-short3', short({
  marks: 3,
  stem: r`Balance the equations (a) $\ce{C2H5OH + O2 -> CO2 + H2O}$, (b) $\ce{KOH + H3PO4 -> K3PO4 + H2O}$ and (c) $\ce{Fe + H2O -> Fe3O4 + H2}$.`,
  wl: null,
  model: r`**(a)** $\ce{C2H5OH + 3O2 -> 2CO2 + 3H2O}$` + '\n\n' + r`**(b)** $\ce{3KOH + H3PO4 -> K3PO4 + 3H2O}$` + '\n\n' + r`**(c)** $\ce{3Fe + 4H2O -> Fe3O4 + 4H2}$`,
  sol: 'Carbon and hydrogen first; potassium first; iron and then oxygen.',
  scheme: [['(a) balanced', 1], ['(b) balanced', 1], ['(c) balanced', 1]],
  d: 3, c: 'application', t: [2],
}), () => balance(['KOH', 'H3PO4'], ['K3PO4', 'H2O']).join() === '3,1,1,3' && balance(['Fe', 'H2O'], ['Fe3O4', 'H2']).join() === '3,4,1,4' || 'bal3');

// ---------------------------------------------------------------- t03 relative atomic and molecular masses
add('ram-mcq1', mcq({
  stem: 'The standard used today for the relative atomic masses of elements is',
  right: 'one-twelfth of the mass of a carbon-12 atom', wrong: ['the mass of an oxygen atom', 'the mass of one hydrogen molecule', 'the mass of a whole carbon-12 atom'],
  sol: 'Today the standard is one-twelfth of the mass of a carbon-12 atom, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ram-mcq2', mcq({
  stem: 'The relative atomic mass of an element has no unit because it is',
  right: 'a ratio of two masses', wrong: ['measured in grams', 'the mass of a mole', 'the mass of one proton'],
  sol: 'It compares the mass of an atom with a standard mass, so the units cancel, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('rmm-mcq1', mcq({
  stem: 'The relative molecular mass of potassium sulphate, K₂SO₄, is (K = 39, S = 32, O = 16)',
  right: `${M.K2SO4}`, wrong: ['135', '126', '207'],
  sol: `2 × 39 + 32 + 4 × 16 = 78 + 32 + 64 = ${M.K2SO4}, option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('rmm-mcq2', mcq({
  stem: 'Which compound has a relative molecular mass of 100? (Ca = 40, Mg = 24, Na = 23, Cl = 35.5, C = 12, O = 16)',
  right: 'Calcium carbonate, CaCO₃', wrong: ['Magnesium carbonate, MgCO₃', 'Sodium carbonate, Na₂CO₃', 'Calcium chloride, CaCl₂'],
  sol: `40 + 12 + 48 = ${M.CaCO3} for CaCO₃; the others give 84, ${M.Na2CO3} and ${M.CaCl2}, option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('rmm-mcq3', mcq({
  stem: 'A molecule of oxygen, O₂, is how many times heavier than a molecule of hydrogen, H₂? (O = 16, H = 1)',
  right: `${M.O2 / M.H2}`, wrong: ['8', '32', '2'],
  sol: `${M.O2} ÷ ${M.H2} = ${M.O2 / M.H2}, option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('rmm-mcq4', mcq({
  stem: 'In the crystals Na₂SO₄·10H₂O (Na = 23, S = 32, O = 16, H = 1) the water of crystallisation contributes to the relative molecular mass',
  right: '180', wrong: ['10', '18', '142'],
  sol: `10 × 18 = 180; the rest is ${M.Na2SO4}, option (@K).`,
  d: 3, c: 'application', t: [3],
}));
add('ar-rmm', ar({
  a: 'The relative molecular mass of water is 18.',
  r: 'It is found by multiplying the relative atomic masses of hydrogen and oxygen.',
  key: 'a',
  sol: 'It is the sum 2 × 1 + 16 = 18, not a product, so (A) is true and (R) is false, option (a).',
  d: 2, c: 'analysis', t: [3],
}));
add('rmm-tf', tf({
  stem: 'The relative molecular mass of a hydrated salt does not include the water of crystallisation.',
  key: 'f',
  sol: 'False. The water of crystallisation is part of the formula, so it is included.',
  d: 2, c: 'understanding', t: [3],
}));
add('ram-fill', fill({
  stem: 'Relative atomic mass is the number of times an atom is heavier than one-twelfth of an atom of ___.',
  acc: [['carbon-12', 'carbon 12', 'carbon']],
  sol: '**Carbon-12**.',
  d: 1, c: 'recall', t: [3],
}));
add('ram-term1', term({
  stem: 'Name the atom that was taken as the standard for atomic masses before carbon-12.',
  model: 'The **hydrogen** atom.', sol: 'Hydrogen.', sch: 'Hydrogen',
  d: 1, c: 'recall', t: [3],
}));
add('rmm-term', term({
  stem: 'State the unit of relative molecular mass.',
  model: '**None**, because it is a ratio.', sol: 'No unit.', sch: 'No unit',
  d: 1, c: 'recall', t: [3],
}));
add('rmm-match', match({
  marks: 5,
  stem: 'Match each compound in Column A with its relative molecular mass in Column B. (Mg = 24, K = 39, Cu = 63.5, Ca = 40, Fe = 56, Cl = 35.5, S = 32, O = 16, H = 1)',
  pairs: [
    ['Mg(OH)₂', `${M['Mg(OH)2']}`],
    ['K₂SO₄', `${M.K2SO4}`],
    ['CuSO₄', `${M.CuSO4}`],
    ['CaCl₂', `${M.CaCl2}`],
    ['Fe₂O₃', `${M.Fe2O3}`],
  ],
  order: [0, 4, 3, 2, 1],
  sol: 'Mg(OH)₂ 58; K₂SO₄ 174; CuSO₄ 159.5; CaCl₂ 111; Fe₂O₃ 160.',
  d: 3, c: 'application', t: [3],
}));
add('ram-short2', short({
  marks: 2,
  stem: 'Define relative atomic mass and give a reason why it has no unit.',
  wl: null,
  model: 'It is the number of times an atom of the element is **heavier than one-twelfth of a carbon-12 atom**. It has no unit because it is the **ratio of two masses**.',
  sol: 'Definition; ratio of masses.',
  scheme: [['Definition with the carbon-12 standard', 1], ['Ratio, so no unit', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('rmm-short2', short({
  marks: 2,
  stem: 'State two differences between relative atomic mass and relative molecular mass.',
  wl: null,
  model: 'Relative atomic mass belongs to **one atom of an element**, whereas relative molecular mass belongs to **a molecule or formula unit of a compound**. The molecular mass is **found by adding** the atomic masses of all the atoms in the formula.',
  sol: 'Atom against molecule; the latter is a sum of the former.',
  scheme: [['Atom of an element against molecule or formula of a compound', 1], ['Molecular mass is the sum of atomic masses', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('rmm-short3', short({
  marks: 3,
  stem: 'Calculate the relative molecular mass of (a) copper(II) nitrate, Cu(NO₃)₂, (b) calcium chloride crystals, CaCl₂·6H₂O. (Cu = 63.5, Ca = 40, Cl = 35.5, N = 14, O = 16, H = 1)',
  wl: null,
  model: `**(a)** 63.5 + 2 × (14 + 3 × 16) = 63.5 + 2 × 62 = **${M['Cu(NO3)2']}**.\n\n**(b)** CaCl₂ = 40 + 2 × 35.5 = ${M.CaCl2}; 6H₂O = 6 × 18 = 108; total **${M['CaCl2.6H2O']}**.`,
  sol: '187.5 and 219.',
  scheme: [['Copper nitrate working', 1], ['Calcium chloride part and water part', 1], ['Totals 187.5 and 219', 1]],
  d: 3, c: 'application', t: [3],
}), () => M['Cu(NO3)2'] === 187.5 && M['CaCl2.6H2O'] === 219 || 'rmm3');

// ---------------------------------------------------------------- numericals
add('rmm-num1', num({
  stem: 'Calculate the relative molecular mass of copper(II) sulphate, CuSO₄. (Cu = 63.5, S = 32, O = 16)',
  value: M.CuSO4, tol: 0,
  sol: `63.5 + 32 + 4 × 16 = ${M.CuSO4}.`,
  scheme: [['Working with the atomic masses', 0.5], [`${M.CuSO4}`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => M.CuSO4 === 159.5 || 'cuso4');
add('rmm-num2', num({
  stem: 'Calculate the relative molecular mass of the hydrated salt FeSO₄·7H₂O. (Fe = 56, S = 32, O = 16, H = 1)',
  value: M['FeSO4.7H2O'], tol: 0,
  sol: `FeSO₄ = ${M.FeSO4}; 7H₂O = 126; total ${M['FeSO4.7H2O']}.`,
  scheme: [['FeSO₄ and 7H₂O parts', 0.5], [`${M['FeSO4.7H2O']}`, 0.5]],
  d: 3, c: 'application', t: [3],
}), () => M['FeSO4.7H2O'] === 278 || 'feso4');
add('ram-num', num({
  stem: `An atom of an element X is ${X_OVER_O} times as heavy as an atom of oxygen (relative atomic mass 16). What is the relative atomic mass of X?`,
  value: X_RAM, tol: 0,
  sol: `${X_OVER_O} × 16 = ${X_RAM}.`,
  scheme: [['Multiplication', 0.5], [`${X_RAM}`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => X_OVER_O * 16 === 56 || 'x');
add('eqmass-num', num({
  stem: r`Find the total relative mass of the reactants in $\ce{2H2S + 3O2 -> 2SO2 + 2H2O}$. (H = 1, S = 32, O = 16)`,
  value: SUMS.h2s[0], tol: 0,
  sol: `2 × 34 + 3 × 32 = 68 + 96 = ${SUMS.h2s[0]}, which equals the total of the products.`,
  scheme: [['Relative masses of 2H₂S and 3O₂', 0.5], [`${SUMS.h2s[0]}`, 0.5]],
  d: 2, c: 'application', t: [1, 3],
}), () => SUMS.h2s[0] === 164 && SUMS.h2s[1] === 164 || 'h2s');
add('pct-num1', num({
  stem: 'Calculate the percentage of iron in iron(III) oxide, Fe₂O₃. (Fe = 56, O = 16)',
  value: P.Fe2O3.Fe, tol: 0.1, unit: '%',
  sol: `112 ÷ ${M.Fe2O3} × 100 = ${P.Fe2O3.Fe}%.`,
  scheme: [['112 ÷ 160', 0.5], [`${P.Fe2O3.Fe}%`, 0.5]],
  d: 2, c: 'application', t: [4],
}));
add('pct-num2', num({
  stem: 'Calculate the percentage of magnesium in magnesium chloride, MgCl₂, correct to one decimal place. (Mg = 24, Cl = 35.5)',
  value: P.MgCl2.Mg, tol: 0.1, unit: '%',
  sol: `24 ÷ ${M.MgCl2} × 100 = ${P.MgCl2.Mg}%.`,
  scheme: [['24 ÷ 95', 0.5], [`${P.MgCl2.Mg}%`, 0.5]],
  d: 2, c: 'application', t: [4],
}));
add('pct-num3', num({
  stem: 'Calculate the percentage of water of crystallisation in ZnSO₄·7H₂O, correct to one decimal place. (Zn = 65, S = 32, O = 16, H = 1)',
  value: W.Zn, tol: 0.1, unit: '%',
  sol: `126 ÷ ${M['ZnSO4.7H2O']} × 100 = ${W.Zn}%.`,
  scheme: [['126 ÷ 287', 0.5], [`${W.Zn}%`, 0.5]],
  d: 3, c: 'application', t: [4],
}));
add('mass-num1', num({
  stem: `How many grams of water are there in ${NA_SAMPLE} g of the crystals Na₂SO₄·10H₂O? (Na = 23, S = 32, O = 16, H = 1)`,
  value: NA_WATER, tol: 0, unit: 'g',
  sol: `RMM = ${M['Na2SO4.10H2O']}; water = 180. Mass of water = 180 ÷ ${M['Na2SO4.10H2O']} × ${NA_SAMPLE} = ${NA_WATER} g.`,
  scheme: [['RMM and water part', 0.5], [`${NA_WATER} g`, 0.5]],
  d: 3, c: 'application', t: [4],
}));
add('mass-num2', num({
  stem: 'How many grams of calcium are there in 148 g of calcium hydroxide, Ca(OH)₂? (Ca = 40, O = 16, H = 1)',
  value: 80, tol: 0, unit: 'g',
  sol: `RMM of Ca(OH)₂ = ${M['Ca(OH)2']}. Calcium = 40 ÷ ${M['Ca(OH)2']} × 148 = 80 g.`,
  scheme: [['40 ÷ 74 × 148', 0.5], ['80 g', 0.5]],
  d: 3, c: 'application', t: [4],
}), () => (40 * 148) / 74 === 80 || 'ca');

// ---------------------------------------------------------------- t04 percentage composition
add('pct-mcq1', mcq({
  stem: 'Which of these compounds has the greatest percentage of oxygen by mass? (H = 1, C = 12, O = 16, Al = 27, Fe = 56)',
  right: 'Water, H₂O', wrong: ['Carbon dioxide, CO₂', 'Aluminium oxide, Al₂O₃', 'Iron(III) oxide, Fe₂O₃'],
  sol: `The percentages of oxygen are H₂O ${P.H2O.O}%, CO₂ ${P.CO2.O}%, Al₂O₃ ${P.Al2O3.O}% and Fe₂O₃ ${P.Fe2O3.O}%, option (@K).`,
  d: 3, c: 'analysis', t: [4],
}));
add('pct-mcq2', mcq({
  stem: 'The percentage of calcium in calcium chloride, CaCl₂, is (Ca = 40, Cl = 35.5)',
  right: `${P.CaCl2.Ca}%`, wrong: ['64%', '18%', '50%'],
  sol: `40 ÷ ${M.CaCl2} × 100 = ${P.CaCl2.Ca}%, option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('pct-mcq3', mcq({
  stem: `Crystals of a hydrated salt weighing ${HYD_BEFORE}.0 g are heated until they lose all their water of crystallisation, and ${HYD_AFTER}.0 g of dry salt remains. The percentage of water in the crystals is`,
  right: `${HYD_PCT}%`, wrong: ['64%', '9%', '56.25%'],
  sol: `Water lost = ${HYD_BEFORE} − ${HYD_AFTER} = ${HYD_WATER} g; ${HYD_WATER} ÷ ${HYD_BEFORE} × 100 = ${HYD_PCT}%, option (@K).`,
  d: 3, c: 'application', t: [4],
}));
add('pct-mcq4', mcq({
  stem: 'Hydrogen makes up 25% by mass of one of these compounds. It is (H = 1, C = 12, N = 14, O = 16)',
  right: 'methane, CH₄', wrong: ['ethane, C₂H₆', 'ammonia, NH₃', 'water, H₂O'],
  sol: `The percentages of hydrogen are CH₄ ${P2.CH4}%, C₂H₆ ${P2.C2H6H}%, NH₃ ${P2.NH3}% and H₂O ${P.H2O.H}%, option (@K).`,
  d: 3, c: 'analysis', t: [4],
}));
add('ar-pct', ar({
  a: 'Oxygen forms the larger part of the mass of water.',
  r: 'A molecule of water contains two atoms of hydrogen and only one atom of oxygen.',
  key: 'd',
  sol: 'Oxygen is 88.9% of water because each oxygen atom is sixteen times heavier than a hydrogen atom; (R) is true but does not explain (A), option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('pct-tf', tf({
  stem: 'The percentages of all the elements in a compound add up to 100.',
  key: 't',
  sol: 'True. They are the parts of 100 parts by mass of the compound.',
  d: 1, c: 'recall', t: [4],
}));
add('pct-fill', fill({
  stem: 'The percentage composition of a compound gives the mass of each element in ___ parts by mass of the compound.',
  acc: [['100', 'hundred', 'one hundred']],
  sol: '**100** parts.',
  d: 1, c: 'recall', t: [4],
}));
add('pct-term', term({
  stem: 'State the mass of water of crystallisation in one formula unit of a hydrate whose formula ends in 5H₂O. (H = 1, O = 16)',
  model: '5 × 18 = **90**.', sol: '90.', sch: '90',
  d: 2, c: 'application', t: [4],
}));
add('pct-short2', short({
  marks: 2,
  stem: 'Magnesium oxide is MgO. Show by calculation that oxygen is 40% of its mass. (Mg = 24, O = 16)',
  wl: null,
  model: 'Relative molecular mass = 24 + 16 = **40**. Oxygen = 16 ÷ 40 × 100 = **40%**.',
  sol: 'RMM 40; 16 ÷ 40 × 100.',
  scheme: [['RMM of MgO', 1], ['16 ÷ 40 × 100 = 40%', 1]],
  d: 2, c: 'application', t: [4],
}));
add('pct-short3', short({
  marks: 3,
  stem: 'Calculate the percentage of each element in magnesium hydroxide, Mg(OH)₂, and show that the percentages add up to 100. (Mg = 24, O = 16, H = 1)',
  wl: null,
  model: `RMM = 24 + 2 × (16 + 1) = **${M['Mg(OH)2']}**.\n\nMg = 24 ÷ ${M['Mg(OH)2']} × 100 = **${P2.MgOH2.Mg}%**; O = 32 ÷ ${M['Mg(OH)2']} × 100 = **${P2.MgOH2.O}%**; H = 2 ÷ ${M['Mg(OH)2']} × 100 = **${P2.MgOH2.H}%**.\n\nCheck: ${P2.MgOH2.Mg} + ${P2.MgOH2.O} + ${P2.MgOH2.H} = 100.`,
  sol: '41.4, 55.2, 3.4; total 100.',
  scheme: [['RMM 58', 1], ['Three percentages', 1], ['Total 100', 1]],
  d: 3, c: 'application', t: [4],
}), () => Math.abs(P2.MgOH2.Mg + P2.MgOH2.O + P2.MgOH2.H - 100) < 0.05 || 'sum');

// ---------------------------------------------------------------- 10-mark structured questions
add('hydrate-long', long({
  marks: 10, wl: null,
  stem: `A student heats ${ZN_SAMPLE} g of hydrated zinc sulphate crystals, ZnSO₄·7H₂O, in the apparatus shown. Its parts are lettered A to E. (Zn = 65, S = 32, O = 16, H = 1)\n\n(a) Name the parts A, B and C. [3]\n\n(b) State why the tube is clamped with its mouth a little lower than its closed end. [1]\n\n(c) Calculate the relative molecular mass of the crystals and the percentage of water of crystallisation in them. [3]\n\n(d) Calculate the mass of water driven off and the mass of dry zinc sulphate left from the ${ZN_SAMPLE} g. [3]`,
  model: `**(a)** **A** is the **hydrated crystals**; **B** is the **(hard glass) test tube**; **C** is the **drops of water** (condensed steam).\n\n**(b)** So that the **water that condenses on the cool wall does not run back on to the hot glass** and crack it.\n\n**(c)** RMM = 65 + 32 + 64 + 126 = **${M['ZnSO4.7H2O']}**. Percentage of water = 126 ÷ ${M['ZnSO4.7H2O']} × 100 = **${W.Zn}%**.\n\n**(d)** Water = 126 ÷ ${M['ZnSO4.7H2O']} × ${ZN_SAMPLE} = **${ZN_WATER} g**; dry salt = ${ZN_SAMPLE} − ${ZN_WATER} = **${ZN_RESIDUE} g**.`,
  sol: 'Crystals, test tube, drops of water; to stop water running back; 287 and 43.9%; 2.52 g and 3.22 g.',
  scheme: [['A crystals', 1], ['B test tube', 1], ['C drops of water', 1], ['Water does not run back to the hot glass', 1], ['RMM 287', 1], ['Working for the percentage', 1], ['43.9%', 1], ['Water 2.52 g', 1], ['Subtraction', 1], ['Dry salt 3.22 g', 1]],
  d: 3, c: 'application', t: [3, 4],
  assets: [heatFig],
}), () => ZN_WATER === 2.52 && ZN_RESIDUE === 3.22 && W.Zn === 43.9 || 'zn');
add('oxide-long', long({
  marks: 10, wl: null,
  stem: 'Haematite is an ore of iron whose main constituent is iron(III) oxide, Fe₂O₃. (Fe = 56, O = 16)\n\n(a) Calculate the relative molecular mass of Fe₂O₃. [2]\n\n(b) Calculate the percentage of iron and of oxygen in it. [3]\n\n(c) Find the mass of iron in 400 g of pure Fe₂O₃. [2]\n\n(d) Balance the skeletal equation Fe + O₂ → Fe₂O₃ for the rusting of iron. [3]',
  model: `**(a)** 2 × 56 + 3 × 16 = 112 + 48 = **${M.Fe2O3}**.\n\n**(b)** Iron = 112 ÷ ${M.Fe2O3} × 100 = **${P.Fe2O3.Fe}%**; oxygen = 48 ÷ ${M.Fe2O3} × 100 = **${P.Fe2O3.O}%**.\n\n**(c)** Iron = ${P.Fe2O3.Fe}% of ${FE_SAMPLE} g = 112 ÷ ${M.Fe2O3} × ${FE_SAMPLE} = **${FE_MASS} g**.\n\n**(d)** ` + r`$\ce{4Fe + 3O2 -> 2Fe2O3}$` + ' (Fe 4 and 4; O 6 and 6).',
  sol: '160; 70% and 30%; 280 g; 4Fe + 3O₂ → 2Fe₂O₃.',
  scheme: [['RMM working', 1], ['RMM 160', 1], ['Iron 70%', 1], ['Oxygen 30%', 1], ['Working for the percentages', 1], ['Working for the mass of iron', 1], ['280 g', 1], ['Correct coefficients', 2], ['Atom count check', 1]],
  d: 3, c: 'application', t: [2, 3, 4],
}), () => FE_MASS === 280 && P.Fe2O3.Fe === 70 || 'fe');
add('balancing-long', long({
  marks: 10, wl: null,
  stem: 'A student writes these skeletal equations in her notebook and has to balance them.\n\n(i) H₂S + O₂ → SO₂ + H₂O\n\n(ii) Fe₂O₃ + CO → Fe + CO₂\n\n(iii) Al(OH)₃ + H₂SO₄ → Al₂(SO₄)₃ + H₂O\n\n(a) Balance the three equations. [6]\n\n(b) For equation (ii), state the ratio of molecules of carbon monoxide to molecules of carbon dioxide and the total relative mass of the reactants. (Fe = 56, C = 12, O = 16) [2]\n\n(c) She tries to balance (iii) by changing Al(OH)₃ to Al₂(OH)₆. Explain why this is not allowed. [2]',
  model: r`**(a)** (i) $\ce{2H2S + 3O2 -> 2SO2 + 2H2O}$` + '\n\n' + r`(ii) $\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$` + '\n\n' + r`(iii) $\ce{2Al(OH)3 + 3H2SO4 -> Al2(SO4)3 + 6H2O}$` + `\n\n**(b)** CO : CO₂ = **3 : 3, that is 1 : 1**; total relative mass of reactants = ${M.Fe2O3} + 3 × ${M.CO} = **${SUMS.fe[0]}**.\n\n**(c)** Al₂(OH)₆ is **not the formula of aluminium hydroxide as the reactant is Al(OH)₃**; changing a subscript changes the substance, so only **the number in front** may be changed.`,
  sol: 'Three balanced equations; 1 : 1 and 244; subscripts fix the substance.',
  scheme: [['(i) balanced', 2], ['(ii) balanced', 2], ['(iii) balanced', 2], ['Ratio 1 : 1', 1], ['Total 244', 1], ['Subscript fixes the substance', 1], ['Change only the coefficient', 1]],
  d: 3, c: 'application', t: [2],
}), () => balance(['H2S', 'O2'], ['SO2', 'H2O']).join() === '2,3,2,2' && balance(['Fe2O3', 'CO'], ['Fe', 'CO2']).join() === '1,3,2,3' && balance(['Al(OH)3', 'H2SO4'], ['Al2(SO4)3', 'H2O']).join() === '2,3,1,6' || 'bal');
add('info-long', long({
  marks: 10, wl: null,
  stem: 'A student drops a few chips of marble (calcium carbonate) into dilute hydrochloric acid. The balanced equation is CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. (Ca = 40, C = 12, O = 16, H = 1, Cl = 35.5)\n\n(a) Write the word equation for the reaction. [2]\n\n(b) Calculate the total relative mass of the reactants and of the products to show that mass is conserved. [4]\n\n(c) State two items of information, other than masses, that the equation gives. [2]\n\n(d) State one observation and name the test for the gas formed. [2]',
  model: `**(a)** **Calcium carbonate + hydrochloric acid → calcium chloride + water + carbon dioxide.**\n\n**(b)** Reactants: ${M.CaCO3} + 2 × ${M.HCl} = **${SUMS.caco3[0]}**. Products: ${M.CaCl2} + ${M.H2O} + ${M.CO2} = **${SUMS.caco3[1]}**. The totals are equal, so **mass is conserved**.\n\n**(c)** The **substances** that react and form, and the **numbers of particles** (1 unit of calcium carbonate reacts with 2 molecules of hydrochloric acid).\n\n**(d)** **Brisk effervescence** (bubbles of gas) is seen; the gas **turns lime water milky**.`,
  sol: 'Word equation; 173 on each side; substances and numbers of particles; fizzing and the lime water test.',
  scheme: [['Reactants named', 1], ['Products named', 1], ['Reactants 173', 1], ['Working for 2HCl', 1], ['Products 173', 1], ['Conclusion about mass', 1], ['Two items of information', 2], ['Observation', 1], ['Lime water test', 1]],
  d: 3, c: 'application', t: [1, 3],
}), () => SUMS.caco3[0] === 173 && SUMS.caco3[1] === 173 || 'caco3');
add('ram-long', long({
  marks: 10, wl: null,
  stem: 'Magnesium chloride, MgCl₂, is used to make tofu and to control dust on roads. (Mg = 24, Cl = 35.5)\n\n(a) Define relative atomic mass. [2]\n\n(b) Calculate the relative molecular mass of magnesium chloride. [2]\n\n(c) Calculate the percentage of chlorine in it, correct to one decimal place. [3]\n\n(d) State how many times heavier one formula unit of MgCl₂ is than (i) one-twelfth of a carbon-12 atom and (ii) a hydrogen atom, and say why the two answers are almost the same. [3]',
  model: `**(a)** The number of times **one atom of the element is heavier than one-twelfth of a carbon-12 atom**.\n\n**(b)** 24 + 2 × 35.5 = 24 + 71 = **${M.MgCl2}**.\n\n**(c)** Chlorine = 71 ÷ ${M.MgCl2} × 100 = **${P.MgCl2.Cl}%**.\n\n**(d)** (i) **${M.MgCl2} times**; (ii) about **${M.MgCl2} times** too (using H = 1). They agree because **a hydrogen atom has a mass of almost one-twelfth of a carbon-12 atom**, that is about one unit.`,
  sol: 'Definition; 95; 74.7%; 95 and 95 since hydrogen is about one unit.',
  scheme: [['Number of times heavier', 1], ['One-twelfth of carbon-12', 1], ['24 + 71', 1], ['95', 1], ['71 ÷ 95 × 100', 1], ['74.7%', 2], ['95 for both standards', 1], ['Reason about the hydrogen atom', 1], ['Link to one unit', 1]].map(([a, b]) => [a, b]),
  d: 3, c: 'application', t: [3, 4],
}), () => M.MgCl2 === 95 && P.MgCl2.Cl === 74.7 || 'mgcl2');
add('lab-long', long({
  marks: 10, wl: null,
  stem: 'Orange crystals of ammonium dichromate, (NH₄)₂Cr₂O₇, are heated in a hard glass test tube. They swell up, glow and give out sparks, and a fluffy green powder is left. Nitrogen gas and steam are given out.\n\n(a) Write the word equation. [1]\n\n(b) Write the balanced formula equation, showing the heat sign. [2]\n\n(c) State two observations from the experiment. [2]\n\n(d) Say how many reactants and how many products there are. [1]\n\n(e) Copy and complete the table to show that the atoms balance. [4]\n\n| Element | Atoms on the left | Atoms on the right |\n|---|---|---|\n| N | | |\n| H | | |\n| Cr | | |\n| O | | |',
  model: r`**(a)** **Ammonium dichromate → nitrogen + chromium(III) oxide + water (steam).**` + '\n\n' + r`**(b)** $\ce{(NH4)2Cr2O7 ->[\Delta] N2 + Cr2O3 + 4H2O}$` + `\n\n**(c)** The orange crystals **swell and glow with sparks**, and a **green powder** is left (nitrogen is given off).\n\n**(d)** **One** reactant and **three** products.\n\n**(e)** N 2 and 2; H 8 and 8; Cr 2 and 2; O 7 and 7.`,
  sol: 'Word equation; balanced equation; swelling with sparks, green powder; 1 and 3; atom table.',
  scheme: [['Word equation', 1], ['Correct formulae', 1], ['Coefficient 4 and heat sign', 1], ['First observation', 1], ['Second observation', 1], ['One reactant and three products', 1], ['N and H counts', 2], ['Cr and O counts', 2]],
  d: 4, c: 'application', t: [1, 2],
}), () => eq(atoms('(NH4)2Cr2O7'), { N: 2, H: 8, Cr: 2, O: 7 }, 'atoms') && true);

// ---------------------------------------------------------------- further recall and understanding items
add('eq-mcq6', mcq({
  stem: 'The new substances formed in a chemical reaction are called',
  right: 'products', wrong: ['reactants', 'catalysts', 'solvents'],
  sol: 'Substances formed are the products; those used up are the reactants, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('bal-mcq5', mcq({
  stem: 'Balancing a chemical equation is based on the law of',
  right: 'conservation of mass', wrong: ['constant composition', 'multiple proportions', 'conservation of volume'],
  sol: 'Atoms are conserved, so the mass of the reactants equals the mass of the products, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ram-mcq3', mcq({
  stem: 'On the ICSE scale the relative atomic mass of sulphur is taken as',
  right: '32', wrong: ['16', '35.5', '64'],
  sol: 'Sulphur is 32, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('pct-mcq5', mcq({
  stem: 'To find the percentage of an element in a compound, the mass of the element in the formula is divided by',
  right: 'the relative molecular mass of the compound', wrong: ['the atomic number of the element', 'the number of atoms in the formula', 'the mass of one mole of the element'],
  sol: 'The part is compared with the whole, option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('ram-tf', tf({
  stem: 'Relative atomic mass is measured in grams.',
  key: 'f',
  sol: 'False. It is a ratio, so it has no unit.',
  d: 1, c: 'recall', t: [3],
}));
add('rmm-fill', fill({
  stem: 'Relative molecular mass is the ___ of the relative atomic masses of all the atoms in the formula.',
  acc: [['sum', 'total']],
  sol: 'The **sum**.',
  d: 1, c: 'recall', t: [3],
}));
add('hyd-tf', tf({
  stem: 'The water of crystallisation in a hydrated salt is held in the crystal as water molecules.',
  key: 't',
  sol: 'True. It forms part of the crystal and is given out as steam on heating.',
  d: 1, c: 'understanding', t: [3, 4],
}));
add('hyd-short3', short({
  marks: 3,
  stem: `Calcium chloride crystals have the formula CaCl₂·6H₂O. (a) Calculate the percentage of water of crystallisation in them, correct to one decimal place. (b) Find the mass of water in ${CA_SAMPLE} g of the crystals. (Ca = 40, Cl = 35.5, O = 16, H = 1)`,
  wl: null,
  model: `**(a)** RMM = 111 + 108 = **${M['CaCl2.6H2O']}**; water = 108 ÷ ${M['CaCl2.6H2O']} × 100 = **${CA_PCT_WATER}%**.\n\n**(b)** Water = 108 ÷ ${M['CaCl2.6H2O']} × ${CA_SAMPLE} = **${CA_WATER} g**.`,
  sol: 'RMM 219; 49.3%; 27 g.',
  scheme: [['RMM 219 with working', 1], ['49.3%', 1], ['27 g', 1]],
  d: 3, c: 'application', t: [4],
}));
