// ICSE 10 Chemistry ch06 Stoichiometry: Formulae and Calculations from Equations — question bank (ICSE 2027 specimen
// style: objective items, 1-mark calculations and definitions, bracket completions, matches and 10-mark structured
// questions with numerical parts). Stems name their own compounds and data. MCQ keys are placed by the builder;
// AR keys planned: a d b c a.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

// ---------------------------------------------------------------- t01 percentage composition, water of crystallisation
add('pc-mcq', mcq({
  stem: 'The percentage of oxygen in calcium carbonate, CaCO₃, is (Ca = 40, C = 12, O = 16):',
  right: '48%',
  wrong: ['16%', '40%', '12%'],
  sol: r`Molar mass $= 40 + 12 + 3 \times 16 = 100$; oxygen $= \frac{48}{100} \times 100 = 48$% — option (@K).`,
  d: 1, c: 'application', t: [1],
}));
add('percent-mcq', mcq({
  stem: 'The percentage of sulphur in sulphur dioxide, SO₂, is (S = 32, O = 16):',
  right: '50%',
  wrong: ['32%', '33.3%', '64%'],
  sol: r`Molar mass $= 32 + 2 \times 16 = 64$; sulphur $= \frac{32}{64} \times 100 = 50$% — option (@K).`,
  d: 1, c: 'application', t: [1],
}));
add('urea-mcq', mcq({
  stem: 'Which fertiliser has the highest percentage of nitrogen by mass? (H = 1, C = 12, N = 14, O = 16, S = 32, Cl = 35.5)',
  right: 'Urea, CO(NH₂)₂ (M = 60)',
  wrong: ['Ammonium nitrate, NH₄NO₃ (M = 80)', 'Ammonium sulphate, (NH₄)₂SO₄ (M = 132)', 'Ammonium chloride, NH₄Cl (M = 53.5)'],
  sol: 'Nitrogen: urea 28 ÷ 60 → 46.7%; ammonium nitrate 28 ÷ 80 → 35%; ammonium sulphate 28 ÷ 132 → 21.2%; ammonium chloride 14 ÷ 53.5 → 26.2% — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('hydrate-mcq', mcq({
  stem: 'The percentage of water of crystallisation in washing soda, Na₂CO₃·10H₂O, is (Na = 23, C = 12, O = 16, H = 1):',
  right: '62.9%',
  wrong: ['37.1%', '10%', '18%'],
  sol: r`Molar mass $= 2 \times 23 + 12 + 3 \times 16 + 10 \times 18 = 286$; water $= \frac{180}{286} \times 100 \approx 62.9$% — option (@K).`,
  d: 3, c: 'application', t: [1],
}));
add('hydrate-ar', ar({
  a: 'Blue crystals of copper(II) sulphate lose mass when they are heated strongly.',
  r: 'Hydrated copper(II) sulphate, CuSO₄·5H₂O, contains 25.6% copper by mass (Cu = 64).',
  key: 'b',
  sol: 'Both statements are true (64 ÷ 250 × 100 = 25.6%), but the loss of mass is due to the water of crystallisation being driven off — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('constant-tf', tf({
  stem: 'A pure sample of a compound has the same percentage composition whatever its source.',
  key: 't',
  sol: 'True: this is the law of constant proportions.',
  d: 1, c: 'understanding', t: [1],
}));
add('crystal-fill', fill({
  stem: 'The water molecules that form part of the crystal structure of a salt, as in CuSO₄·5H₂O, are called water of ___.',
  acc: [['crystallisation', 'crystallization']],
  sol: 'Water of **crystallisation**.',
  d: 1, c: 'recall', t: [1],
}));
add('cano3-num', num({
  stem: 'Calculate the percentage of nitrogen in calcium nitrate, Ca(NO₃)₂. (Ca = 40, N = 14, O = 16)',
  value: 17.1, tol: 0.1, unit: '%',
  sol: r`Molar mass $= 40 + 2 \times 14 + 6 \times 16 = 164$ g. Percentage of nitrogen $= \frac{28}{164} \times 100 \approx 17.1$%.`,
  scheme: [['Molar mass 164', 0.5], ['17.1%', 0.5]],
  d: 2, c: 'application', t: [1],
}), () => near((28 / 164) * 100, 17.07, 0.01) || 'pc');
add('gypsum-num', num({
  stem: 'Calculate the percentage of water of crystallisation in gypsum, CaSO₄·2H₂O. (Ca = 40, S = 32, O = 16, H = 1)',
  value: 20.9, tol: 0.1, unit: '%',
  sol: r`Molar mass $= 40 + 32 + 4 \times 16 + 2 \times 18 = 172$ g. Percentage of water $= \frac{36}{172} \times 100 \approx 20.9$%.`,
  scheme: [['Molar mass 172', 0.5], ['20.9%', 0.5]],
  d: 2, c: 'application', t: [1],
}), () => near((36 / 172) * 100, 20.93, 0.01) || 'pc');
add('cpc-short1', short({
  marks: 1,
  stem: 'Calculate the percentage of carbon in methane, CH₄. (C = 12, H = 1)',
  model: r`Molar mass $= 12 + 4 = 16$; carbon $= \frac{12}{16} \times 100 = 75$%.`,
  sol: 'Mass of carbon ÷ molar mass × 100.',
  scheme: [['75%', 1]],
  d: 1, c: 'application', t: [1],
}));
add('waterdef-short1', short({
  marks: 1,
  stem: 'What is meant by water of crystallisation? Give one example.',
  model: 'The fixed number of water molecules present in one formula unit of a hydrated salt as part of its crystal structure, for example the five water molecules in CuSO₄·5H₂O.',
  sol: 'Definition and example.',
  scheme: [['Definition with example', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('law-short1', short({
  marks: 1,
  stem: 'Name the law which states that a pure chemical compound always contains the same elements combined in the same proportion by mass.',
  model: 'The law of constant proportions (law of definite proportions).',
  sol: 'Name of the law.',
  scheme: [['Law of constant proportions', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('heat-short1', short({
  marks: 1,
  stem: 'State what is observed when blue crystals of hydrated copper(II) sulphate are heated strongly, and why their mass decreases.',
  model: 'The blue crystals change to a white powder (anhydrous copper(II) sulphate); the water of crystallisation is driven off as steam, so the mass decreases.',
  sol: 'Loss of water of crystallisation.',
  scheme: [['Blue to white and loss of water', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('cuso4-short2', short({
  marks: 2,
  stem: 'Calculate the percentage of (a) copper and (b) water in hydrated copper(II) sulphate, CuSO₄·5H₂O. (Cu = 64, S = 32, O = 16, H = 1)',
  model: r`Molar mass $= 64 + 32 + 4 \times 16 + 5 \times 18 = 250$ g. (a) Copper $= \frac{64}{250} \times 100 = 25.6$%. (b) Water $= \frac{90}{250} \times 100 = 36$%.`,
  sol: 'Molar mass of the hydrate, then each percentage.',
  scheme: [['(a) 25.6%', 1], ['(b) 36%', 1]],
  d: 2, c: 'application', t: [1],
}), () => near((64 / 250) * 100, 25.6) && near((90 / 250) * 100, 36) || 'pc');

// ---------------------------------------------------------------- t02 empirical and molecular formula from percentages
add('ef-mcq', mcq({
  stem: 'The empirical formula of glucose, whose molecular formula is C₆H₁₂O₆, is:',
  right: 'CH₂O',
  wrong: ['C₆H₁₂O₆', 'C₂H₄O₂', 'CHO'],
  sol: 'Dividing 6 : 12 : 6 by 6 gives 1 : 2 : 1 — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('cxhy-mcq', mcq({
  stem: 'A hydrocarbon has the empirical formula CH₂ and a vapour density of 21. Its molecular formula is (C = 12, H = 1):',
  right: 'C₃H₆',
  wrong: ['C₂H₄', 'C₄H₈', 'CH₂'],
  sol: r`Molar mass $= 2 \times 21 = 42$; empirical formula mass $= 14$; $n = \frac{42}{14} = 3$ — option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('sameef-mcq', mcq({
  stem: 'Which pair of compounds has the same empirical formula?',
  right: 'Ethyne, C₂H₂, and benzene, C₆H₆',
  wrong: ['Ethane, C₂H₆, and ethene, C₂H₄', 'Methane, CH₄, and ethane, C₂H₆', 'Water, H₂O, and hydrogen peroxide, H₂O₂'],
  sol: 'C₂H₂ and C₆H₆ both reduce to CH — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ratio-mcq', mcq({
  stem: 'While working out an empirical formula, the atom ratio X : Y comes out as 1 : 1.5. The empirical formula is:',
  right: 'X₂Y₃',
  wrong: ['XY', 'XY₂', 'X₃Y₂'],
  sol: '1 : 1.5 is not a whole-number ratio; multiplying by 2 gives 2 : 3 — option (@K).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('sameef-ar', ar({
  a: 'Ethyne, C₂H₂, and benzene, C₆H₆, have the same empirical formula.',
  r: 'The empirical formula shows the simplest whole-number ratio of the atoms in a compound.',
  key: 'a',
  sol: 'Both have C : H = 1 : 1, so both have the empirical formula CH; R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('mfalways-ar', ar({
  a: 'The molecular formula of a compound is always different from its empirical formula.',
  r: 'Molecular formula = n × empirical formula, where n is a whole number.',
  key: 'd',
  sol: 'A is false: when n = 1 the two are the same (H₂O, CH₄, CO₂). R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('efmf-tf', tf({
  stem: 'The empirical formula of a compound can be the same as its molecular formula.',
  key: 't',
  sol: 'True: for example water, H₂O, and methane, CH₄ (n = 1).',
  d: 1, c: 'understanding', t: [2],
}));
add('ef-fill', fill({
  stem: 'The molecular formula of a compound is a whole-number multiple of its ___ formula.',
  acc: [['empirical']],
  sol: 'Its **empirical** formula.',
  d: 1, c: 'recall', t: [2],
}));
add('n-num', num({
  stem: 'A compound has the empirical formula CH₂O and a molar mass of 180 g mol⁻¹. By what whole number must the empirical formula be multiplied to give the molecular formula? (C = 12, H = 1, O = 16)',
  value: 6, tol: 0,
  sol: r`Empirical formula mass $= 12 + 2 + 16 = 30$. $n = \frac{180}{30} = 6$ (molecular formula C₆H₁₂O₆).`,
  scheme: [['Empirical formula mass 30', 0.5], ['n = 6', 0.5]],
  d: 1, c: 'application', t: [2],
}), () => 180 / 30 === 6 || 'n');
add('carbons-num', num({
  stem: 'A gaseous hydrocarbon has the empirical formula CH and a vapour density of 13. How many carbon atoms are there in one molecule? (C = 12, H = 1)',
  value: 2, tol: 0,
  sol: r`Molar mass $= 2 \times 13 = 26$. Empirical formula mass $= 12 + 1 = 13$. $n = \frac{26}{13} = 2$, so the molecular formula is C₂H₂ with 2 carbon atoms.`,
  scheme: [['M = 26, n = 2', 0.5], ['2 carbon atoms', 0.5]],
  d: 2, c: 'application', t: [2],
}), () => (2 * 13) / 13 === 2 || 'n');
add('efdef-short1', short({
  marks: 1,
  stem: 'Define empirical formula.',
  model: 'The empirical formula of a compound shows the simplest whole-number ratio of the atoms of the different elements present in it.',
  sol: 'Definition.',
  scheme: [['Simplest whole-number ratio of atoms', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('mfdef-short1', short({
  marks: 1,
  stem: 'Define molecular formula.',
  model: 'The molecular formula shows the actual number of atoms of each element present in one molecule of a compound.',
  sol: 'Definition.',
  scheme: [['Actual number of atoms in one molecule', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('h2o2-short1', short({
  marks: 1,
  stem: 'The molecular formula of hydrogen peroxide is H₂O₂. Write its empirical formula.',
  model: 'HO (ratio 2 : 2 = 1 : 1).',
  sol: 'Simplest ratio.',
  scheme: [['HO', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('ncount-short1', short({
  marks: 1,
  stem: 'A compound has the empirical formula CH₂ and a molar mass of 70 g mol⁻¹. Write its molecular formula. (C = 12, H = 1)',
  model: r`$n = \frac{70}{14} = 5$, so the molecular formula is C₅H₁₀.`,
  sol: 'n = M ÷ 14.',
  scheme: [['C₅H₁₀', 1]],
  d: 2, c: 'application', t: [2],
}));
add('nh3ef-short2', short({
  marks: 2,
  stem: 'A compound of nitrogen and hydrogen contains 82.35% nitrogen and 17.65% hydrogen by mass. Find its empirical formula. (N = 14, H = 1)',
  model: r`Nitrogen: $\frac{82.35}{14} \approx 5.88$. Hydrogen: $\frac{17.65}{1} = 17.65$. Dividing by the smaller: nitrogen 1, hydrogen $\frac{17.65}{5.88} \approx 3.0$. Empirical formula NH₃.`,
  sol: 'Table method.',
  scheme: [['Division by atomic masses and by the smaller', 1], ['NH₃', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(17.65 / (82.35 / 14), 3, 0.01) || 'ratio');
add('benzene-short3', short({
  marks: 3,
  stem: 'A hydrocarbon contains 92.3% carbon and 7.7% hydrogen by mass, and its vapour density is 39. Find (a) its empirical formula, (b) its molar mass and (c) its molecular formula. (C = 12, H = 1)',
  model: r`(a) Carbon: $\frac{92.3}{12} \approx 7.69$; hydrogen: $\frac{7.7}{1} = 7.7$. Ratio 1 : 1, so the empirical formula is CH (formula mass 13). (b) Molar mass $= 2 \times 39 = 78$. (c) $n = \frac{78}{13} = 6$, so the molecular formula is C₆H₆.`,
  sol: 'Empirical formula, molar mass from vapour density, then n.',
  scheme: [['(a) CH', 1], ['(b) 78', 1], ['(c) C₆H₆', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(7.7 / (92.3 / 12), 1, 0.01) && 78 / 13 === 6 || 'ef');

// ---------------------------------------------------------------- t03 empirical formula from combining masses
add('mass-mcq', mcq({
  stem: '0.24 g of magnesium ribbon is burnt completely in air and gives 0.40 g of magnesium oxide. The empirical formula of the oxide is (Mg = 24, O = 16):',
  right: 'MgO',
  wrong: ['Mg₂O', 'MgO₂', 'Mg₂O₃'],
  sol: r`Oxygen $= 0.40 - 0.24 = 0.16$ g. Magnesium $\frac{0.24}{24} = 0.01$; oxygen $\frac{0.16}{16} = 0.01$; ratio 1 : 1 — option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('no-mcq', mcq({
  stem: 'In an oxide of nitrogen, 1.4 g of nitrogen is combined with 1.6 g of oxygen. The empirical formula of the oxide is (N = 14, O = 16):',
  right: 'NO',
  wrong: ['N₂O', 'NO₂', 'N₂O₃'],
  sol: r`Nitrogen $\frac{1.4}{14} = 0.1$; oxygen $\frac{1.6}{16} = 0.1$; ratio 1 : 1 — option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('cu2o-mcq', mcq({
  stem: '1.44 g of a red oxide of copper is reduced by heating in hydrogen and leaves 1.28 g of copper. The empirical formula of the oxide is (Cu = 64, O = 16):',
  right: 'Cu₂O',
  wrong: ['CuO', 'CuO₂', 'Cu₃O₂'],
  sol: r`Oxygen $= 1.44 - 1.28 = 0.16$ g. Copper $\frac{1.28}{64} = 0.02$; oxygen $\frac{0.16}{16} = 0.01$; ratio 2 : 1 — option (@K).`,
  d: 3, c: 'analysis', t: [3],
}));
add('atomicno-tf', tf({
  stem: 'To find an empirical formula from combining masses, the mass of each element is divided by its atomic number.',
  key: 'f',
  sol: 'False: each mass is divided by the atomic mass of the element, to give the relative number of moles of atoms.',
  d: 1, c: 'recall', t: [3],
}));
add('mox-num', num({
  stem: 'A metal M has an atomic mass of 27. 5.4 g of M combines with 4.8 g of oxygen to form an oxide with the empirical formula M₂Oₓ. Find the value of x. (O = 16)',
  value: 3, tol: 0,
  sol: r`Moles of M atoms $= \frac{5.4}{27} = 0.2$; moles of O atoms $= \frac{4.8}{16} = 0.3$. Ratio M : O $= 1 : 1.5$ $= 2 : 3$, so $x = 1.5 \times 2 = 3$ (the oxide is M₂O₃).`,
  scheme: [['Ratio 0.2 : 0.3', 0.5], ['x = 3', 0.5]],
  d: 3, c: 'analysis', t: [3],
}), () => near(4.8 / 16 / (5.4 / 27) * 2, 3) || 'x');
add('co2ef-short1', short({
  marks: 1,
  stem: 'In a compound, 0.6 g of carbon is combined with 1.6 g of oxygen. Write its empirical formula. (C = 12, O = 16)',
  model: r`Carbon $\frac{0.6}{12} = 0.05$; oxygen $\frac{1.6}{16} = 0.1$; ratio 1 : 2, so CO₂.`,
  sol: 'Ratio of moles of atoms.',
  scheme: [['CO₂', 1]],
  d: 2, c: 'application', t: [3],
}));
add('so3-short2', short({
  marks: 2,
  stem: '3.2 g of sulphur combines with 4.8 g of oxygen to form an oxide. Find the empirical formula of the oxide. (S = 32, O = 16)',
  model: r`Sulphur $\frac{3.2}{32} = 0.1$; oxygen $\frac{4.8}{16} = 0.3$. Dividing by 0.1 gives 1 : 3, so the empirical formula is SO₃.`,
  sol: 'Moles of atoms, then the ratio.',
  scheme: [['Moles 0.1 and 0.3', 1], ['SO₃', 1]],
  d: 2, c: 'application', t: [3],
}));
add('hydrate-short3', short({
  marks: 3,
  stem: '2.46 g of hydrated magnesium sulphate, MgSO₄·xH₂O, is heated until all its water is driven off; 1.20 g of anhydrous magnesium sulphate remains. Calculate (a) the moles of MgSO₄, (b) the moles of water lost and (c) the value of x. (Mg = 24, S = 32, O = 16, H = 1)',
  model: r`(a) Molar mass of MgSO₄ $= 24 + 32 + 4 \times 16 = 120$, so moles $= \frac{1.20}{120} = 0.01$. (b) Water lost $= 2.46 - 1.20 = 1.26$ g, so moles $= \frac{1.26}{18} = 0.07$. (c) $x = \frac{0.07}{0.01} = 7$; the formula is MgSO₄·7H₂O.`,
  sol: 'Moles of anhydrous salt and of water; their ratio.',
  scheme: [['(a) 0.01 mol', 1], ['(b) 0.07 mol', 1], ['(c) x = 7', 1]],
  d: 3, c: 'analysis', t: [1, 3],
}), () => near((2.46 - 1.2) / 18 / (1.2 / 120), 7) || 'x');

// ---------------------------------------------------------------- t04 calculations from equations
add('mm-mcq', mcq({
  stem: 'What mass of calcium oxide is formed when 50 g of calcium carbonate is heated strongly until it decomposes completely? CaCO₃ → CaO + CO₂ (Ca = 40, C = 12, O = 16)',
  right: '28 g',
  wrong: ['56 g', '22 g', '50 g'],
  sol: r`Moles of CaCO₃ $= \frac{50}{100} = 0.5$, giving 0.5 mol of CaO; mass $= 0.5 \times 56 = 28$ g — option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('mv-mcq', mcq({
  stem: 'What volume of hydrogen, measured at STP, is produced when 2.4 g of magnesium reacts with excess dilute hydrochloric acid? Mg + 2HCl → MgCl₂ + H₂ (Mg = 24)',
  right: '2.24 dm³',
  wrong: ['4.48 dm³', '1.12 dm³', '22.4 dm³'],
  sol: r`Moles of Mg $= \frac{2.4}{24} = 0.1$, giving 0.1 mol of H₂; volume $= 0.1 \times 22.4 = 2.24$ dm³ — option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('vv-mcq', mcq({
  stem: 'What volume of oxygen is needed to convert 8 dm³ of sulphur dioxide completely into sulphur trioxide, all volumes at the same temperature and pressure? 2SO₂ + O₂ → 2SO₃',
  right: '4 dm³',
  wrong: ['8 dm³', '16 dm³', '2 dm³'],
  sol: r`Sulphur dioxide and oxygen react in the volume ratio 2 : 1, so oxygen $= 8 \div 2 = 4$ dm³ — option (@K).`,
  d: 1, c: 'application', t: [4],
}));
add('carbon-mcq', mcq({
  stem: 'What mass of oxygen is needed to burn 6 g of carbon completely to carbon dioxide? C + O₂ → CO₂ (C = 12, O = 16)',
  right: '16 g',
  wrong: ['8 g', '32 g', '22 g'],
  sol: r`Moles of carbon $= \frac{6}{12} = 0.5$, needing 0.5 mol of O₂; mass $= 0.5 \times 32 = 16$ g — option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('kclo3-mcq', mcq({
  stem: 'In the reaction 2KClO₃ → 2KCl + 3O₂, how many moles of oxygen are formed from 4 mol of potassium chlorate?',
  right: '6 mol',
  wrong: ['3 mol', '4 mol', '2.67 mol'],
  sol: r`Mole ratio KClO₃ to O₂ is 2 : 3, so oxygen $= 4 \times \frac{3}{2} = 6$ mol — option (@K).`,
  d: 1, c: 'understanding', t: [4],
}));
add('water36-mcq', mcq({
  stem: '4 g of hydrogen and 32 g of oxygen are mixed and exploded: 2H₂ + O₂ → 2H₂O. The mass of water formed is (H = 1, O = 16):',
  right: '36 g',
  wrong: ['18 g', '72 g', '34 g'],
  sol: r`Hydrogen $\frac{4}{2} = 2$ mol and oxygen $\frac{32}{32} = 1$ mol: exactly the 2 : 1 ratio, so 2 mol of water forms, $2 \times 18 = 36$ g (mass is conserved) — option (@K).`,
  d: 3, c: 'analysis', t: [4],
}));
add('nahco3-mcq', mcq({
  stem: 'What volume of carbon dioxide, at STP, is obtained by heating 21 g of sodium hydrogencarbonate until it decomposes completely? 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂ (Na = 23, H = 1, C = 12, O = 16)',
  right: '2.8 dm³',
  wrong: ['5.6 dm³', '1.4 dm³', '22.4 dm³'],
  sol: r`Molar mass $= 23 + 1 + 12 + 3 \times 16 = 84$; moles $= \frac{21}{84} = 0.25$; carbon dioxide $= 0.25 \div 2 = 0.125$ mol; volume $= 0.125 \times 22.4 = 2.8$ dm³ — option (@K).`,
  d: 3, c: 'analysis', t: [4],
}));
add('stoich-mcq', mcq({
  stem: 'The calculation of the quantities of reactants and products from a balanced chemical equation is called:',
  right: 'stoichiometry',
  wrong: ['electrolysis', 'catalysis', 'crystallisation'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('read-mcq', mcq({
  stem: 'Which statement about the equation 2H₂ + O₂ → 2H₂O is correct?',
  right: '2 mol of hydrogen react with 1 mol of oxygen to give 2 mol of water',
  wrong: ['2 g of hydrogen react with 1 g of oxygen to give 2 g of water', '4 mol of reactants give 4 mol of product', '2 volumes of hydrogen react with 1 volume of oxygen to give 2 volumes of liquid water'],
  sol: 'The coefficients are a mole ratio, not a mass ratio; 3 mol of reactants give 2 mol of product, and liquid water has no gas volume — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('mass-ar', ar({
  a: 'In any chemical reaction, the total mass of the reactants used equals the total mass of the products.',
  r: 'In any chemical reaction, the total number of moles of reactants equals the total number of moles of products.',
  key: 'c',
  sol: 'A is true (conservation of mass). R is false: in 2H₂ + O₂ → 2H₂O, 3 mol of reactants give 2 mol of product — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('ratio-ar', ar({
  a: 'In the reaction N₂ + 3H₂ → 2NH₃, 1 mol of nitrogen gives 34 g of ammonia (N = 14, H = 1).',
  r: 'The coefficients of a balanced equation give the ratio in which moles react and are formed.',
  key: 'a',
  sol: '1 mol of N₂ gives 2 mol of NH₃, that is 2 × 17 = 34 g; R explains A — option (a).',
  d: 2, c: 'application', t: [4],
}));
add('eqn-tf', tf({
  stem: 'The coefficients of a balanced equation give the ratio of the masses in which the substances react.',
  key: 'f',
  sol: 'False: the coefficients give the mole ratio; masses are found by multiplying the moles by the molar masses.',
  d: 2, c: 'understanding', t: [4],
}));
add('volume-fill', fill({
  stem: 'When 1 mol of carbon burns completely in oxygen, the volume of carbon dioxide formed at STP is ___ dm³.',
  acc: [['22.4']],
  sol: 'C + O₂ → CO₂: 1 mol of carbon gives 1 mol of carbon dioxide, which occupies **22.4** dm³ at STP.',
  d: 1, c: 'application', t: [4],
}));
add('cuo-num', num({
  stem: 'What mass of copper is obtained when 8 g of copper(II) oxide is reduced completely by hydrogen? CuO + H₂ → Cu + H₂O (Cu = 64, O = 16)',
  value: 6.4, tol: 0.05, unit: 'g',
  sol: r`Molar mass of CuO $= 64 + 16 = 80$; moles $= \frac{8}{80} = 0.1$. Mole ratio 1 : 1, so mass of copper $= 0.1 \times 64 = 6.4$ g.`,
  scheme: [['0.1 mol', 0.5], ['6.4 g', 0.5]],
  d: 2, c: 'application', t: [4],
}), () => near((8 / 80) * 64, 6.4) || 'mass');
add('o2vol-num', num({
  stem: 'What volume of oxygen, at STP, is needed to burn 3.6 g of magnesium completely? 2Mg + O₂ → 2MgO (Mg = 24)',
  value: 1.68, tol: 0.01, unit: 'dm³',
  sol: r`Moles of Mg $= \frac{3.6}{24} = 0.15$. Mole ratio Mg to O₂ is 2 : 1, so oxygen $= 0.15 \div 2 = 0.075$ mol. Volume $= 0.075 \times 22.4 = 1.68$ dm³.`,
  scheme: [['0.075 mol O₂', 0.5], ['1.68 dm³', 0.5]],
  d: 2, c: 'application', t: [4],
}), () => near((3.6 / 24 / 2) * 22.4, 1.68) || 'volume');
add('nh3mass-num', num({
  stem: '6.72 dm³ of nitrogen, measured at STP, reacts completely with hydrogen: N₂ + 3H₂ → 2NH₃. What mass of ammonia is formed? (N = 14, H = 1)',
  value: 10.2, tol: 0.05, unit: 'g',
  sol: r`Moles of N₂ $= \frac{6.72}{22.4} = 0.3$. Mole ratio 1 : 2, so ammonia $= 0.3 \times 2 = 0.6$ mol. Mass $= 0.6 \times 17 = 10.2$ g.`,
  scheme: [['0.6 mol NH₃', 0.5], ['10.2 g', 0.5]],
  d: 3, c: 'application', t: [4],
}), () => near((6.72 / 22.4) * 2 * 17, 10.2) || 'mass');
add('nh3o2-num', num({
  stem: 'In the catalytic oxidation of ammonia, 4NH₃ + 5O₂ → 4NO + 6H₂O, what volume of oxygen reacts with 200 cm³ of ammonia? All volumes are measured at the same temperature and pressure.',
  value: 250, tol: 0, unit: 'cm³',
  sol: r`Volume ratio NH₃ to O₂ is 4 : 5, so oxygen $= 200 \times \frac{5}{4} = 250$ cm³.`,
  scheme: [['Ratio 4 : 5', 0.5], ['250 cm³', 0.5]],
  d: 2, c: 'application', t: [4],
}), () => (200 * 5) / 4 === 250 || 'volume');
add('kclo3-num', num({
  stem: 'What mass of potassium chlorate must be heated to give 3.36 dm³ of oxygen at STP? 2KClO₃ → 2KCl + 3O₂ (K = 39, Cl = 35.5, O = 16)',
  value: 12.25, tol: 0.05, unit: 'g',
  sol: r`Moles of O₂ $= \frac{3.36}{22.4} = 0.15$. Mole ratio KClO₃ to O₂ is 2 : 3, so KClO₃ $= 0.15 \times \frac{2}{3} = 0.1$ mol. Molar mass $= 39 + 35.5 + 3 \times 16 = 122.5$, so mass $= 0.1 \times 122.5 = 12.25$ g.`,
  scheme: [['0.1 mol KClO₃', 0.5], ['12.25 g', 0.5]],
  d: 3, c: 'application', t: [4],
}), () => near((3.36 / 22.4) * (2 / 3) * 122.5, 12.25) || 'mass');
add('h2o-num', num({
  stem: 'What mass of water is formed when 1.12 dm³ of methane, measured at STP, burns completely? CH₄ + 2O₂ → CO₂ + 2H₂O (H = 1, O = 16)',
  value: 1.8, tol: 0.02, unit: 'g',
  sol: r`Moles of CH₄ $= \frac{1.12}{22.4} = 0.05$. Mole ratio 1 : 2, so water $= 0.05 \times 2 = 0.1$ mol. Mass $= 0.1 \times 18 = 1.8$ g.`,
  scheme: [['0.1 mol water', 0.5], ['1.8 g', 0.5]],
  d: 2, c: 'application', t: [4],
}), () => near((1.12 / 22.4) * 2 * 18, 1.8) || 'mass');
add('mm-short1', short({
  marks: 1,
  stem: 'What mass of sodium hydroxide reacts exactly with 0.1 mol of sulphuric acid? 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O (Na = 23, O = 16, H = 1)',
  model: r`Moles of NaOH $= 0.1 \times 2 = 0.2$; mass $= 0.2 \times 40 = 8$ g.`,
  sol: 'Mole ratio 2 : 1.',
  scheme: [['8 g', 1]],
  d: 2, c: 'application', t: [4],
}));
add('moleratio-short1', short({
  marks: 1,
  stem: 'How many moles of oxygen are needed to burn 2 mol of ethane completely? 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O',
  model: 'The equation shows 2 mol of ethane reacting with 7 mol of oxygen, so 7 mol of oxygen is needed.',
  sol: 'Read from the coefficients.',
  scheme: [['7 mol', 1]],
  d: 1, c: 'application', t: [4],
}));
add('vv-short1', short({
  marks: 1,
  stem: 'Why can the volume of a gaseous product be found from the volume of a gaseous reactant without using molar masses?',
  model: "At the same temperature and pressure, gas volumes are in the same ratio as the moles (Gay-Lussac's and Avogadro's laws), so the volume ratio is simply the ratio of the coefficients.",
  sol: 'Volume ratio = mole ratio.',
  scheme: [['Volume ratio equals the ratio of coefficients', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('fe-short2', short({
  marks: 2,
  stem: '2.8 g of iron filings is heated with excess sulphur: Fe + S → FeS. Calculate (a) the moles of sulphur that react and (b) the mass of iron(II) sulphide formed. (Fe = 56, S = 32)',
  model: r`(a) Moles of iron $= \frac{2.8}{56} = 0.05$; mole ratio 1 : 1, so 0.05 mol of sulphur reacts. (b) Molar mass of FeS $= 56 + 32 = 88$; mass $= 0.05 \times 88 = 4.4$ g.`,
  sol: 'Moles of iron, ratio 1 : 1.',
  scheme: [['(a) 0.05 mol', 1], ['(b) 4.4 g', 1]],
  d: 2, c: 'application', t: [4],
}), () => near((2.8 / 56) * 88, 4.4) || 'mass');
add('why-short2', short({
  marks: 2,
  stem: 'A student mixes 1 g of hydrogen with 1 g of oxygen and explodes the mixture: 2H₂ + O₂ → 2H₂O. She expects 2 g of water. Show by calculation how much water actually forms, and explain the difference. (H = 1, O = 16)',
  model: r`Hydrogen $= \frac{1}{2} = 0.5$ mol; oxygen $= \frac{1}{32} = 0.03125$ mol. The oxygen needs only $0.03125 \times 2 = 0.0625$ mol of hydrogen, so oxygen is used up and hydrogen is in excess. Water formed $= 0.0625$ mol $= 0.0625 \times 18 = 1.125$ g. The rest of the 2 g, 0.875 g, is unreacted hydrogen: the amount of product is set by the reactant that runs out, not by the total mass mixed.`,
  sol: 'Oxygen is used up first; hydrogen remains.',
  scheme: [['Moles and the reactant used up (oxygen)', 1], ['1.125 g of water with the explanation', 1]],
  d: 4, c: 'analysis', t: [4],
}), () => near((1 / 32) * 2 * 18, 1.125) && near(1 - (1 / 32) * 2 * 2, 0.875) || 'water');
add('fecl-short3', short({
  marks: 3,
  stem: '5.6 g of iron reacts with excess dilute hydrochloric acid: Fe + 2HCl → FeCl₂ + H₂. Calculate (a) the moles of iron, (b) the volume of hydrogen formed at STP and (c) the mass of iron(II) chloride formed. (Fe = 56, Cl = 35.5)',
  model: r`(a) Moles of iron $= \frac{5.6}{56} = 0.1$. (b) Mole ratio Fe to H₂ is 1 : 1, so volume of hydrogen $= 0.1 \times 22.4 = 2.24$ dm³. (c) Molar mass of FeCl₂ $= 56 + 2 \times 35.5 = 127$; mass $= 0.1 \times 127 = 12.7$ g.`,
  sol: 'Moles, ratio 1 : 1, then volume and mass.',
  scheme: [['(a) 0.1 mol', 1], ['(b) 2.24 dm³', 1], ['(c) 12.7 g', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(0.1 * 127, 12.7) || 'mass');

// ---------------------------------------------------------------- matches and the 3-blank completion
add('three-fill', fill({
  stem: 'Complete each sentence by choosing the correct word from the bracket.\n\n(a) The simplest whole-number ratio of atoms in a compound is shown by its ___ (empirical / molecular) formula.\n\n(b) If an atom ratio works out as 1 : 1.33, all the numbers are multiplied by ___ (2 / 3) to make whole numbers.\n\n(c) For a gas, molar mass = 2 × ___ (vapour density / atomic mass).',
  acc: [['empirical'], ['3'], ['vapour density']],
  sol: '(a) **empirical**; (b) **3** (1.33 × 3 = 4, giving 3 : 4); (c) **vapour density**.',
  d: 1, c: 'recall', t: [2],
}));
add('ef-match', match({
  stem: 'Match each compound in Column A with its empirical formula in Column B.',
  pairs: [
    ['Glucose, C₆H₁₂O₆', 'CH₂O'],
    ['Benzene, C₆H₆', 'CH'],
    ['Hydrogen peroxide, H₂O₂', 'HO'],
    ['Ethane, C₂H₆', 'CH₃'],
    ['Butene, C₄H₈', 'CH₂'],
  ],
  order: [3, 1, 4, 0, 2],
  sol: 'Glucose → CH₂O; benzene → CH; hydrogen peroxide → HO; ethane → CH₃; butene → CH₂ (divide each set of subscripts by their highest common factor).',
  d: 2, c: 'understanding', t: [2],
}));
add('step-match', match({
  stem: 'Match each conversion in Column A with the factor used in Column B.',
  pairs: [
    ['Moles of a gas → volume at STP', '× 22.4 dm³'],
    ['Mass → moles', '÷ molar mass'],
    ['Moles → number of molecules', '× Avogadro’s number'],
    ['Moles of A → moles of B', '× mole ratio from the equation'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Moles of gas → × 22.4 dm³; mass → ÷ molar mass; moles → × Avogadro’s number; moles of A → × mole ratio B : A.',
  d: 1, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('formula-long', long({
  stem: "(a) Distinguish between empirical formula and molecular formula, using glucose, C₆H₁₂O₆, as an example. [2]\n\n(b) Calculate the percentage of water of crystallisation in Glauber's salt, Na₂SO₄·10H₂O. (Na = 23, S = 32, O = 16, H = 1) [2]\n\n(c) An organic compound contains 54.55% carbon, 9.09% hydrogen and 36.36% oxygen. Its vapour density is 44. Find its empirical formula and its molecular formula. (C = 12, H = 1, O = 16) [3]\n\n(d) An oxide of nitrogen contains 30.4% nitrogen. (i) Find its empirical formula. (ii) Its vapour density is 46; find its molecular formula. (N = 14, O = 16) [3]",
  model: r`(a) The empirical formula gives the simplest whole-number ratio of atoms; the molecular formula gives the actual number of atoms in one molecule. Glucose: molecular formula C₆H₁₂O₆, empirical formula CH₂O.

(b) Molar mass $= 2 \times 23 + 32 + 4 \times 16 + 10 \times 18 = 322$. Water $= \frac{180}{322} \times 100 \approx 55.9$%.

(c) Carbon $\frac{54.55}{12} \approx 4.55$; hydrogen $\frac{9.09}{1} = 9.09$; oxygen $\frac{36.36}{16} \approx 2.27$. Dividing by 2.27 gives 2 : 4 : 1, so the empirical formula is C₂H₄O (formula mass 44). Molar mass $= 2 \times 44 = 88$, $n = \frac{88}{44} = 2$, so the molecular formula is C₄H₈O₂.

(d) (i) Oxygen $= 100 - 30.4 = 69.6$%. Nitrogen $\frac{30.4}{14} \approx 2.17$; oxygen $\frac{69.6}{16} = 4.35$; ratio 1 : 2, so NO₂ (formula mass 46). (ii) Molar mass $= 2 \times 46 = 92$, $n = \frac{92}{46} = 2$, so N₂O₄.`,
  sol: 'Definitions; hydrate percentage; table method and n twice.',
  scheme: [['(a) difference', 1], ['(a) glucose example', 1], ['(b) molar mass 322', 1], ['(b) 55.9%', 1], ['(c) ratio table', 1], ['(c) C₂H₄O', 1], ['(c) C₄H₈O₂', 1], ['(d)(i) NO₂', 1.5], ['(d)(ii) N₂O₄', 1.5]],
  d: 3, c: 'application', t: [1, 2],
}), () => near((180 / 322) * 100, 55.9, 0.01) && near((9.09 / 1) / (36.36 / 16), 4, 0.01) && near(4.35 / (30.4 / 14), 2, 0.01) || 'formula');
add('equation-long', long({
  stem: '(a) For the reaction 2CO + O₂ → 2CO₂, state what the equation tells you about (i) the moles and (ii) the volumes of the gases at the same temperature and pressure. [2]\n\n(b) Iron(III) oxide is reduced by carbon monoxide: Fe₂O₃ + 3CO → 2Fe + 3CO₂. Calculate the mass of iron obtained from 80 g of iron(III) oxide. (Fe = 56, O = 16) [2]\n\n(c) For the reaction in (b), calculate the volume of carbon monoxide needed and the volume of carbon dioxide formed, both at STP. [3]\n\n(d) Calculate the mass of the carbon dioxide formed in (c) and the number of its molecules. (C = 12, O = 16; Avogadro’s number = 6 × 10²³) [3]',
  model: r`(a) (i) 2 mol of carbon monoxide react with 1 mol of oxygen to form 2 mol of carbon dioxide. (ii) 2 volumes of carbon monoxide react with 1 volume of oxygen to give 2 volumes of carbon dioxide.

(b) Molar mass of Fe₂O₃ $= 2 \times 56 + 3 \times 16 = 160$; moles $= \frac{80}{160} = 0.5$. Iron $= 0.5 \times 2 = 1$ mol $= 56$ g.

(c) Carbon monoxide $= 0.5 \times 3 = 1.5$ mol; volume $= 1.5 \times 22.4 = 33.6$ dm³. Carbon dioxide $= 1.5$ mol, also 33.6 dm³.

(d) Mass $= 1.5 \times 44 = 66$ g. Molecules $= 1.5 \times 6 \times 10^{23} = 9 \times 10^{23}$.`,
  sol: 'Mole and volume ratios; moles of Fe₂O₃ first.',
  scheme: [['(a)(i) moles', 1], ['(a)(ii) volumes', 1], ['(b) 0.5 mol', 1], ['(b) 56 g', 1], ['(c) 33.6 dm³ of CO', 1.5], ['(c) 33.6 dm³ of CO₂', 1.5], ['(d) 66 g', 1.5], ['(d) 9 × 10²³ molecules', 1.5]],
  d: 3, c: 'application', t: [4],
}), () => near((80 / 160) * 2 * 56, 56) && near(1.5 * 22.4, 33.6) && near(1.5 * 44, 66) || 'eq');
add('lab-long', long({
  stem: '(a) Lead(II) nitrate decomposes on strong heating. Write the balanced equation, and state two observations. [2]\n\n(b) Calculate the molar mass of lead(II) nitrate and the number of moles in 6.62 g of it. (Pb = 207, N = 14, O = 16) [2]\n\n(c) For the decomposition of 6.62 g of lead(II) nitrate, calculate the mass of lead(II) oxide formed and the volume of nitrogen dioxide at STP. [3]\n\n(d) Calculate the volume of oxygen at STP, the total volume of gas given off at STP, and the ratio of the volumes of nitrogen dioxide to oxygen. [3]',
  model: r`(a) $\ce{2Pb(NO3)2 -> 2PbO + 4NO2 + O2}$. Observations (any two): a crackling sound (decrepitation); reddish-brown fumes of nitrogen dioxide; a residue that is reddish-brown when hot and yellow when cold; the gas relights a glowing splint.

(b) Molar mass $= 207 + 2 \times 14 + 6 \times 16 = 331$ g; moles $= \frac{6.62}{331} = 0.02$.

(c) Lead(II) oxide: mole ratio 1 : 1, so 0.02 mol; molar mass $= 207 + 16 = 223$; mass $= 0.02 \times 223 = 4.46$ g. Nitrogen dioxide $= 0.02 \times 2 = 0.04$ mol; volume $= 0.04 \times 22.4 = 0.896$ dm³.

(d) Oxygen $= 0.02 \div 2 = 0.01$ mol; volume $= 0.01 \times 22.4 = 0.224$ dm³. Total gas $= 0.896 + 0.224 = 1.12$ dm³. Ratio NO₂ : O₂ = 4 : 1 (from the coefficients).`,
  sol: 'Balanced equation; moles 0.02; mole ratios 2 : 2 : 4 : 1.',
  scheme: [['(a) equation', 1], ['(a) two observations', 1], ['(b) 331', 1], ['(b) 0.02 mol', 1], ['(c) 4.46 g', 1.5], ['(c) 0.896 dm³', 1.5], ['(d) 0.224 dm³', 1], ['(d) 1.12 dm³', 1], ['(d) 4 : 1', 1]],
  d: 3, c: 'analysis', t: [4],
}), () => near(6.62 / 331, 0.02) && near(0.02 * 223, 4.46) && near(0.896 + 0.224, 1.12) || 'lab');
add('mixture-long', long({
  stem: '(a) 1.08 g of aluminium powder is heated in oxygen and combines with 0.96 g of oxygen. Find the empirical formula of the oxide. (Al = 27, O = 16) [3]\n\n(b) A chloride of iron contains 34.46% iron by mass. Find its empirical formula. (Fe = 56, Cl = 35.5) [3]\n\n(c) 0.42 g of a gaseous hydrocarbon contains 0.36 g of carbon. 224 cm³ of the gas at STP weighs 0.42 g. Find (i) its empirical formula, (ii) its molar mass and (iii) its molecular formula. (C = 12, H = 1) [4]',
  model: r`(a) Aluminium $\frac{1.08}{27} = 0.04$; oxygen $\frac{0.96}{16} = 0.06$. Ratio 1 : 1.5, multiplied by 2 gives 2 : 3: Al₂O₃.

(b) Chlorine $= 100 - 34.46 = 65.54$%. Iron $\frac{34.46}{56} \approx 0.615$; chlorine $\frac{65.54}{35.5} \approx 1.846$. Ratio 1 : 3, so FeCl₃.

(c) (i) Hydrogen $= 0.42 - 0.36 = 0.06$ g. Carbon $\frac{0.36}{12} = 0.03$; hydrogen $\frac{0.06}{1} = 0.06$; ratio 1 : 2, so CH₂ (formula mass 14). (ii) Moles $= \frac{0.224}{22.4} = 0.01$; molar mass $= \frac{0.42}{0.01} = 42$ g mol⁻¹. (iii) $n = \frac{42}{14} = 3$, so C₃H₆.`,
  sol: 'Ratios with × 2; percentage by difference; mass by difference and molar mass from molar volume.',
  scheme: [['(a) moles of atoms', 1.5], ['(a) Al₂O₃', 1.5], ['(b) ratio', 1.5], ['(b) FeCl₃', 1.5], ['(c)(i) CH₂', 1.5], ['(c)(ii) 42', 1], ['(c)(iii) C₃H₆', 1.5]],
  d: 4, c: 'analysis', t: [2, 3],
}), () => near(0.06 / 0.04, 1.5) && near((65.54 / 35.5) / (34.46 / 56), 3, 0.01) && near(0.42 / (0.224 / 22.4), 42) || 'mix');
add('fertiliser-long', long({
  stem: '(a) Calculate the percentage of nitrogen in urea, CO(NH₂)₂, and in ammonium nitrate, NH₄NO₃. Which is the richer source of nitrogen? (C = 12, O = 16, N = 14, H = 1) [3]\n\n(b) Ammonia is made by the reaction N₂ + 3H₂ → 2NH₃. Calculate the volume of hydrogen at STP needed to make 3.4 g of ammonia. [3]\n\n(c) The 3.4 g of ammonia is passed into nitric acid: NH₃ + HNO₃ → NH₄NO₃. Calculate (i) the mass of ammonium nitrate formed and (ii) the mass of nitric acid used. [4]',
  model: r`(a) Urea: molar mass $= 12 + 16 + 2 \times 14 + 4 \times 1 = 60$; nitrogen $= \frac{28}{60} \times 100 \approx 46.7$%. Ammonium nitrate: molar mass $= 80$; nitrogen $= \frac{28}{80} \times 100 = 35$%. Urea is the richer source.

(b) Moles of ammonia $= \frac{3.4}{17} = 0.2$. Mole ratio H₂ to NH₃ is 3 : 2, so hydrogen $= 0.2 \times \frac{3}{2} = 0.3$ mol; volume $= 0.3 \times 22.4 = 6.72$ dm³.

(c) Mole ratio 1 : 1 : 1. (i) Ammonium nitrate $= 0.2$ mol $= 0.2 \times 80 = 16$ g. (ii) Nitric acid: molar mass $= 1 + 14 + 3 \times 16 = 63$; mass $= 0.2 \times 63 = 12.6$ g.`,
  sol: 'Percentages; moles of ammonia; mole ratios.',
  scheme: [['(a) urea 46.7%', 1], ['(a) ammonium nitrate 35%', 1], ['(a) urea richer', 1], ['(b) 0.2 mol NH₃', 1], ['(b) 0.3 mol H₂', 1], ['(b) 6.72 dm³', 1], ['(c)(i) 16 g', 2], ['(c)(ii) 12.6 g', 2]],
  d: 3, c: 'application', t: [1, 4],
}), () => near((3.4 / 17) * 1.5 * 22.4, 6.72) && near(0.2 * 80, 16) && near(0.2 * 63, 12.6) || 'fert');
