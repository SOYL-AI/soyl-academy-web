// ICSE 10 Chemistry ch05 Mole Concept: Gas Laws, Molar Volume and Avogadro's Number — question bank (ICSE 2027
// specimen style: objective items, 1-mark statements and short calculations, bracket completions, matches and 10-mark
// structured questions with numerical parts). Stems name their own gases and data. MCQ keys are placed by the builder;
// AR keys planned: a b c d a.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

// ---------------------------------------------------------------- t01 Gay-Lussac's law of combining volumes
add('ratio-mcq', mcq({
  stem: 'For the reaction N₂(g) + 3H₂(g) → 2NH₃(g), with all volumes measured at the same temperature and pressure, the volumes of nitrogen, hydrogen and ammonia are in the ratio:',
  right: '1 : 3 : 2',
  wrong: ['1 : 3 : 4', '1 : 1 : 1', '2 : 3 : 1'],
  sol: 'Gas volumes are in the ratio of the coefficients, 1 : 3 : 2 — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('excess-mcq', mcq({
  stem: '20 cm³ of methane is exploded with 50 cm³ of oxygen: CH₄ + 2O₂ → CO₂ + 2H₂O. After cooling to room temperature, the total volume of gas left (same pressure) is:',
  right: '30 cm³',
  wrong: ['20 cm³', '50 cm³', '70 cm³'],
  sol: r`Methane needs $20 \times 2 = 40$ cm³ of oxygen, so $50 - 40 = 10$ cm³ of oxygen is left; 20 cm³ of carbon dioxide forms and the water condenses. Gas left $= 10 + 20 = 30$ cm³ — option (@K).`,
  d: 3, c: 'application', t: [1],
}));
add('ethyne-mcq', mcq({
  stem: '40 cm³ of ethyne is burnt completely: 2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O. The volume of carbon dioxide formed, measured at room temperature and the same pressure, is:',
  right: '80 cm³',
  wrong: ['40 cm³', '100 cm³', '160 cm³'],
  sol: r`Ethyne and carbon dioxide are in the ratio 2 : 4, that is 1 : 2, so carbon dioxide $= 40 \times 2 = 80$ cm³ — option (@K).`,
  d: 2, c: 'application', t: [1],
}));
add('scope-mcq', mcq({
  stem: "Gay-Lussac's law of combining volumes can be applied to:",
  right: 'gaseous reactants and gaseous products measured at the same temperature and pressure',
  wrong: ['all reactants and products, whatever their physical state', 'solids and liquids only', 'gases measured at different temperatures and pressures'],
  sol: 'The law is about gas volumes, all measured under the same conditions — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('nh3vol-ar', ar({
  a: 'When nitrogen and hydrogen react completely to form ammonia, the total volume of gas decreases (same temperature and pressure).',
  r: 'One volume of nitrogen and three volumes of hydrogen give only two volumes of ammonia.',
  key: 'c',
  sol: 'Four volumes of reactants give two volumes of product, so R explains A — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('water-ar', ar({
  a: "When hydrogen burns in oxygen at room temperature, the volume of the water formed is not counted when applying Gay-Lussac's law.",
  r: 'Water is a compound of hydrogen and oxygen.',
  key: 'd',
  sol: 'Both statements are true, but the reason water is not counted is that it condenses to a liquid at room temperature — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('gl-tf', tf({
  stem: "Gay-Lussac's law of combining volumes applies to solids and liquids as well as to gases.",
  key: 'f',
  sol: 'False: it applies only to gases, all measured at the same temperature and pressure.',
  d: 1, c: 'recall', t: [1],
}));
add('ratio-fill', fill({
  stem: 'Gases react in volumes that bear a simple ___ ratio to one another, provided all volumes are measured at the same temperature and pressure.',
  acc: [['whole-number', 'whole number', 'whole']],
  sol: 'A simple **whole-number** ratio (Gay-Lussac’s law).',
  d: 1, c: 'recall', t: [1],
}));
add('butane-num', num({
  stem: r`What volume of oxygen is needed to burn 50 cm³ of butane completely? $\ce{2C4H10 + 13O2 -> 8CO2 + 10H2O}$ (all volumes at the same temperature and pressure)`,
  value: 325, tol: 0, unit: 'cm³',
  sol: r`By Gay-Lussac’s law, 2 volumes of butane need 13 volumes of oxygen. Oxygen needed $= 50 \times \frac{13}{2} = 325$ cm³.`,
  scheme: [['Ratio 2 : 13', 0.5], ['325 cm³', 0.5]],
  d: 2, c: 'application', t: [1],
}), () => (50 * 13) / 2 === 325 || 'volume');
add('coresidue-num', num({
  stem: '60 cm³ of carbon monoxide is mixed with 50 cm³ of oxygen and sparked: 2CO + O₂ → 2CO₂. What is the total volume of gas after the reaction, measured at the original temperature and pressure?',
  value: 80, tol: 0, unit: 'cm³',
  sol: r`60 cm³ of carbon monoxide needs $60 \div 2 = 30$ cm³ of oxygen, so oxygen left $= 50 - 30 = 20$ cm³. Carbon dioxide formed equals the volume of carbon monoxide, 60 cm³. Total gas $= 20 + 60 = 80$ cm³.`,
  scheme: [['Oxygen left 20 cm³', 0.5], ['80 cm³', 0.5]],
  d: 3, c: 'analysis', t: [1],
}), () => 50 - 60 / 2 + 60 === 80 || 'total');
add('gl-short1', short({
  marks: 1,
  stem: "State Gay-Lussac's law of combining volumes.",
  model: 'When gases react, they do so in volumes that bear a simple whole-number ratio to one another and to the volumes of the gaseous products, all volumes being measured at the same temperature and pressure.',
  sol: 'Statement with the condition of same temperature and pressure.',
  scheme: [['Simple whole-number ratio, same temperature and pressure', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('vol-short1', short({
  marks: 1,
  stem: 'What volume of carbon dioxide is formed when 25 cm³ of ethene burns completely? C₂H₄ + 3O₂ → 2CO₂ + 2H₂O (all volumes at room temperature and the same pressure)',
  model: r`Ethene and carbon dioxide are in the ratio 1 : 2, so carbon dioxide $= 25 \times 2 = 50$ cm³.`,
  sol: 'Ratio 1 : 2.',
  scheme: [['50 cm³', 1]],
  d: 1, c: 'application', t: [1],
}));
add('nh3-short2', short({
  marks: 2,
  stem: '150 cm³ of hydrogen reacts completely with nitrogen to form ammonia: N₂ + 3H₂ → 2NH₃. All volumes are at the same temperature and pressure. Calculate (a) the volume of nitrogen used and (b) the volume of ammonia formed.',
  model: r`(a) Nitrogen used $= 150 \div 3 = 50$ cm³. (b) Ammonia formed $= 50 \times 2 = 100$ cm³.`,
  sol: 'Volume ratio 1 : 3 : 2.',
  scheme: [['(a) 50 cm³', 1], ['(b) 100 cm³', 1]],
  d: 2, c: 'application', t: [1],
}));
add('h2s-short3', short({
  marks: 3,
  stem: '24 cm³ of hydrogen sulphide is burnt in 50 cm³ of oxygen: 2H₂S + 3O₂ → 2H₂O + 2SO₂. All volumes are measured at room temperature and the same pressure. Calculate (a) the volume of oxygen used, (b) the volume of sulphur dioxide formed and (c) the total volume of gas left at the end.',
  model: r`(a) Oxygen used $= 24 \times \frac{3}{2} = 36$ cm³. (b) Hydrogen sulphide and sulphur dioxide are in the ratio 2 : 2, so 24 cm³ of sulphur dioxide forms. (c) Oxygen left $= 50 - 36 = 14$ cm³. The water condenses, so the gas left $= 14 + 24 = 38$ cm³ (14 cm³ of oxygen and 24 cm³ of sulphur dioxide).`,
  sol: 'Volume ratio 2 : 3 : 2 for the gases; water is not counted.',
  scheme: [['(a) 36 cm³', 1], ['(b) 24 cm³', 1], ['(c) 38 cm³', 1]],
  d: 3, c: 'analysis', t: [1],
}), () => (24 * 3) / 2 === 36 && 50 - 36 + 24 === 38 || 'volumes');

// ---------------------------------------------------------------- t02 Avogadro's law and atomicity
add('avo-mcq', mcq({
  stem: 'At the same temperature and pressure, 1 dm³ of oxygen and 1 dm³ of carbon dioxide contain equal:',
  right: 'numbers of molecules',
  wrong: ['masses', 'numbers of atoms', 'densities'],
  sol: "Avogadro's law: equal volumes, equal numbers of molecules. The masses differ, and a carbon dioxide molecule has three atoms against two in oxygen — option (@K).",
  d: 1, c: 'understanding', t: [2],
}));
add('hcl-mcq', mcq({
  stem: "One volume of hydrogen reacts with one volume of chlorine to give two volumes of hydrogen chloride (same temperature and pressure). Using Avogadro's law, this shows that each molecule of hydrogen must contain:",
  right: 'at least two atoms',
  wrong: ['only one atom', 'one atom of hydrogen and one of chlorine', 'three atoms'],
  sol: 'n molecules of hydrogen give 2n molecules of hydrogen chloride, each with at least one hydrogen atom, so each hydrogen molecule must split into two halves — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('count-mcq', mcq({
  stem: 'At a fixed temperature and pressure, 15 cm³ of oxygen contains y molecules. The number of molecules in 45 cm³ of methane under the same conditions is:',
  right: '3y',
  wrong: ['y', 'y/3', '9y'],
  sol: "45 cm³ is three times 15 cm³; by Avogadro's law it holds three times as many molecules — option (@K).",
  d: 2, c: 'application', t: [2],
}));
add('atomicity-mcq', mcq({
  stem: 'Which pair of gases has the same atomicity?',
  right: 'Nitrogen and chlorine',
  wrong: ['Helium and hydrogen', 'Ozone and oxygen', 'Argon and nitrogen'],
  sol: 'N₂ and Cl₂ are both diatomic; He and Ar are monatomic and ozone is triatomic — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('avo-short1', short({
  marks: 1,
  stem: "State Avogadro's law.",
  model: 'Equal volumes of all gases, under the same conditions of temperature and pressure, contain equal numbers of molecules.',
  sol: 'Statement.',
  scheme: [['Equal volumes, equal numbers of molecules, same temperature and pressure', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('atomicity-short1', short({
  marks: 1,
  stem: 'State the atomicity of (i) ozone and (ii) argon.',
  model: '(i) 3 (triatomic, O₃); (ii) 1 (monatomic, Ar).',
  sol: 'Ozone O₃; argon Ar.',
  scheme: [['Both correct', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('volchange-short2', short({
  marks: 2,
  stem: "When hydrogen reacts with chlorine, the total volume of gas does not change, but when nitrogen reacts with hydrogen to form ammonia, the volume decreases (same temperature and pressure). Explain both observations using Avogadro's law.",
  model: "By Avogadro's law, the volume of a gas is proportional to the number of its molecules. In H₂ + Cl₂ → 2HCl, 2 molecules of reactants give 2 molecules of product, so the volume stays the same. In N₂ + 3H₂ → 2NH₃, 4 molecules of reactants give only 2 molecules of product, so the volume falls to half.",
  sol: 'Volume follows the number of molecules.',
  scheme: [['Hydrogen chloride: 2 molecules → 2 molecules', 1], ['Ammonia: 4 molecules → 2 molecules', 1]],
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 mole, Avogadro's number, gram atomic and molecular mass
add('water-mcq', mcq({
  stem: 'How many moles of water are there in 27 g of water? (H = 1, O = 16)',
  right: '1.5 mol',
  wrong: ['0.67 mol', '27 mol', '3 mol'],
  sol: r`Molar mass of water $= 2 \times 1 + 16 = 18$ g; moles $= \frac{27}{18} = 1.5$ — option (@K).`,
  d: 1, c: 'application', t: [3],
}));
add('atoms-mcq', mcq({
  stem: 'The number of atoms in 0.5 mol of sulphur dioxide, SO₂, is (take Avogadro’s number as 6 × 10²³):',
  right: '9 × 10²³',
  wrong: ['3 × 10²³', '6 × 10²³', '1.8 × 10²⁴'],
  sol: r`Molecules $= 0.5 \times 6 \times 10^{23} = 3 \times 10^{23}$. Each molecule has 3 atoms, so atoms $= 3 \times 3 \times 10^{23} = 9 \times 10^{23}$ — option (@K).`,
  d: 3, c: 'analysis', t: [3],
}));
add('most-mcq', mcq({
  stem: 'Which sample contains the largest number of molecules? (H = 1, C = 12, N = 14, O = 16)',
  right: '4 g of hydrogen',
  wrong: ['44 g of carbon dioxide', '28 g of nitrogen', '16 g of oxygen'],
  sol: 'Moles: hydrogen 4 ÷ 2 = 2; carbon dioxide 44 ÷ 44 = 1; nitrogen 28 ÷ 28 = 1; oxygen 16 ÷ 32 = 0.5. Most moles means most molecules — option (@K).',
  d: 2, c: 'analysis', t: [3],
}));
add('gam-mcq', mcq({
  stem: 'The gram atomic mass of calcium (Ca = 40) is:',
  right: '40 g, the mass of 6.022 × 10²³ atoms of calcium',
  wrong: ['40 u, the mass of one atom of calcium', '20 g, the mass of half a mole of calcium', '6.022 × 10²³ g'],
  sol: 'The gram atomic mass is the atomic mass expressed in grams, the mass of one mole of atoms — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('onemol-mcq', mcq({
  stem: 'The mass of one molecule of water is (H₂O = 18; take Avogadro’s number as 6 × 10²³):',
  right: '3 × 10⁻²³ g',
  wrong: ['18 g', '1.08 × 10²⁵ g', '3 × 10²³ g'],
  sol: r`One mole (18 g) contains $6 \times 10^{23}$ molecules, so one molecule weighs $\frac{18}{6 \times 10^{23}} = 3 \times 10^{-23}$ g — option (@K).`,
  d: 3, c: 'application', t: [3],
}));
add('gam-tf', tf({
  stem: 'The gram atomic mass of oxygen and the gram molecular mass of oxygen are the same.',
  key: 'f',
  sol: 'False: the gram atomic mass is 16 g (1 mol of O atoms); oxygen gas is diatomic, so its gram molecular mass is 32 g.',
  d: 2, c: 'understanding', t: [3],
}));
add('avo-fill', fill({
  stem: 'The number of particles in one mole of a substance, 6.022 × 10²³, is called ___ number.',
  acc: [["Avogadro's", 'Avogadro’s', 'Avogadro']],
  sol: "**Avogadro's** number.",
  d: 1, c: 'recall', t: [3],
}));
add('caco3-num', num({
  stem: 'How many moles are present in 25 g of calcium carbonate, CaCO₃? (Ca = 40, C = 12, O = 16)',
  value: 0.25, tol: 0, unit: 'mol',
  sol: r`Molar mass $= 40 + 12 + 3 \times 16 = 100$ g. Moles $= \frac{25}{100} = 0.25$ mol.`,
  scheme: [['Molar mass 100 g', 0.5], ['0.25 mol', 0.5]],
  d: 1, c: 'application', t: [3],
}), () => 25 / (40 + 12 + 48) === 0.25 || 'moles');
add('h2so4-num', num({
  stem: 'What is the mass of 0.3 mol of sulphuric acid, H₂SO₄? (H = 1, S = 32, O = 16)',
  value: 29.4, tol: 0.05, unit: 'g',
  sol: r`Molar mass $= 2 \times 1 + 32 + 4 \times 16 = 98$ g. Mass $= 0.3 \times 98 = 29.4$ g.`,
  scheme: [['Molar mass 98 g', 0.5], ['29.4 g', 0.5]],
  d: 2, c: 'application', t: [3],
}), () => near(0.3 * (2 + 32 + 64), 29.4) || 'mass');
add('glucose-num', num({
  stem: 'A sample of glucose contains 3.011 × 10²³ molecules. How many moles of glucose is this? (Avogadro’s number = 6.022 × 10²³)',
  value: 0.5, tol: 0, unit: 'mol',
  sol: r`Moles $= \frac{3.011 \times 10^{23}}{6.022 \times 10^{23}} = 0.5$ mol.`,
  scheme: [['Division by Avogadro’s number', 0.5], ['0.5 mol', 0.5]],
  d: 2, c: 'application', t: [3],
}), () => near(3.011e23 / 6.022e23, 0.5) || 'moles');
add('mole-short1', short({
  marks: 1,
  stem: 'Define one mole of a substance.',
  model: 'One mole is the amount of a substance that contains as many particles (atoms, molecules or ions) as there are atoms in exactly 12 g of carbon-12, that is 6.022 × 10²³ particles.',
  sol: 'Definition.',
  scheme: [['Definition with carbon-12 or Avogadro’s number', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('gmm-short1', short({
  marks: 1,
  stem: 'Calculate the gram molecular mass of ammonium sulphate, (NH₄)₂SO₄. (N = 14, H = 1, S = 32, O = 16)',
  model: r`$2 \times 14 + 8 \times 1 + 32 + 4 \times 16 = 132$, so the gram molecular mass is 132 g.`,
  sol: 'Sum of atomic masses, in grams.',
  scheme: [['132 g', 1]],
  d: 2, c: 'application', t: [3],
}), () => 2 * 14 + 8 + 32 + 64 === 132 || 'M');
add('particles-short1', short({
  marks: 1,
  stem: 'How many atoms are present in 0.1 mol of ammonia, NH₃? (Avogadro’s number = 6 × 10²³)',
  model: r`Molecules $= 0.1 \times 6 \times 10^{23} = 6 \times 10^{22}$. Each molecule has 4 atoms, so atoms $= 4 \times 6 \times 10^{22} = 2.4 \times 10^{23}$.`,
  sol: 'Molecules × 4.',
  scheme: [['2.4 × 10²³ atoms', 1]],
  d: 2, c: 'application', t: [3],
}));
add('hatoms-short1', short({
  marks: 1,
  stem: 'How many moles of hydrogen atoms are present in 2 mol of methane, CH₄?',
  model: r`Each molecule has 4 hydrogen atoms, so moles of hydrogen atoms $= 2 \times 4 = 8$ mol.`,
  sol: '2 × 4.',
  scheme: [['8 mol', 1]],
  d: 1, c: 'application', t: [3],
}));
add('atommass-short2', short({
  marks: 2,
  stem: 'Distinguish between the atomic mass and the gram atomic mass of chlorine (Cl = 35.5).',
  model: 'The atomic mass of chlorine, 35.5 (u), is the average mass of one chlorine atom compared with one-twelfth of the mass of a carbon-12 atom; it is a relative number. The gram atomic mass of chlorine is 35.5 g, the same number expressed in grams: the mass of 1 mol (6.022 × 10²³) of chlorine atoms.',
  sol: 'Relative mass of one atom versus mass of one mole of atoms.',
  scheme: [['Atomic mass', 1], ['Gram atomic mass', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 molar volume
add('n2vol-mcq', mcq({
  stem: 'What volume does 0.25 mol of nitrogen gas occupy at STP?',
  right: '5.6 dm³',
  wrong: ['22.4 dm³', '2.24 dm³', '89.6 dm³'],
  sol: r`Volume $= 0.25 \times 22.4 = 5.6$ dm³ — option (@K).`,
  d: 1, c: 'application', t: [4],
}));
add('so2mass-mcq', mcq({
  stem: 'The mass of 2.24 dm³ of sulphur dioxide at STP is (S = 32, O = 16):',
  right: '6.4 g',
  wrong: ['64 g', '3.2 g', '0.64 g'],
  sol: r`Moles $= \frac{2.24}{22.4} = 0.1$; mass $= 0.1 \times 64 = 6.4$ g — option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('stp-mcq', mcq({
  stem: 'The conditions called STP in mole calculations are:',
  right: '273 K and 1 atm (760 mm of mercury)',
  wrong: ['298 K and 1 atm', '0 K and 760 mm of mercury', '273 K and 2 atm'],
  sol: 'Standard temperature is 273 K (0 °C) and standard pressure is 1 atm — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('samevol-mcq', mcq({
  stem: 'Which gas sample occupies the same volume at STP as 7 g of nitrogen? (H = 1, C = 12, N = 14, O = 16)',
  right: '8 g of oxygen',
  wrong: ['7 g of oxygen', '1 g of hydrogen', '16 g of methane'],
  sol: 'Nitrogen: 7 ÷ 28 = 0.25 mol. Oxygen: 8 ÷ 32 = 0.25 mol (equal moles, equal volume); 7 g of oxygen is about 0.22 mol, 1 g of hydrogen 0.5 mol and 16 g of methane 1 mol — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('molar-ar', ar({
  a: 'One mole of carbon dioxide and one mole of water contain the same number of molecules.',
  r: 'One mole of any substance occupies 22.4 dm³ at STP.',
  key: 'a',
  sol: 'A is true (each contains 6.022 × 10²³ molecules). R is false: molar volume applies only to gases, and water is not a gas at STP — option (a).',
  d: 2, c: 'understanding', t: [3, 4],
}));
add('water-tf', tf({
  stem: 'At STP, 1 mole of water occupies 22.4 dm³.',
  key: 'f',
  sol: 'False: water is not a gas at 273 K; the molar volume of 22.4 dm³ applies only to gases.',
  d: 2, c: 'understanding', t: [4],
}));
add('co2vol-num', num({
  stem: 'What volume does 8.8 g of carbon dioxide occupy at STP? (C = 12, O = 16)',
  value: 4.48, tol: 0.01, unit: 'dm³',
  sol: r`Molar mass $= 12 + 2 \times 16 = 44$ g. Moles $= \frac{8.8}{44} = 0.2$. Volume $= 0.2 \times 22.4 = 4.48$ dm³.`,
  scheme: [['0.2 mol', 0.5], ['4.48 dm³', 0.5]],
  d: 2, c: 'application', t: [4],
}), () => near((8.8 / 44) * 22.4, 4.48) || 'volume');
add('methane-num', num({
  stem: 'A 280 cm³ sample of a gas, measured at STP, weighs 0.20 g. Calculate the molar mass of the gas in g mol⁻¹.',
  value: 16, tol: 0.1, unit: 'g mol⁻¹',
  sol: r`Volume $= 280 \div 1000 = 0.28$ dm³. Moles $= \frac{0.28}{22.4} = 0.0125$. Molar mass $= \frac{0.20}{0.0125} = 16$ g mol⁻¹.`,
  scheme: [['0.0125 mol', 0.5], ['16 g mol⁻¹', 0.5]],
  d: 3, c: 'application', t: [4],
}), () => near(0.2 / (0.28 / 22.4), 16) || 'M');
add('nh3mol-num', num({
  stem: 'How many moles of ammonia are present in 6.72 dm³ of the gas at STP?',
  value: 0.3, tol: 0, unit: 'mol',
  sol: r`Moles $= \frac{6.72}{22.4} = 0.3$ mol.`,
  scheme: [['Division by 22.4', 0.5], ['0.3 mol', 0.5]],
  d: 1, c: 'application', t: [4],
}), () => near(6.72 / 22.4, 0.3) || 'moles');
add('molvol-short1', short({
  marks: 1,
  stem: 'What volume does 3.2 g of oxygen gas occupy at STP? (O = 16)',
  model: r`Moles $= \frac{3.2}{32} = 0.1$, so volume $= 0.1 \times 22.4 = 2.24$ dm³.`,
  sol: 'Moles × 22.4.',
  scheme: [['2.24 dm³', 1]],
  d: 2, c: 'application', t: [4],
}));
add('stp-short1', short({
  marks: 1,
  stem: 'State the values of temperature and pressure at STP.',
  model: '273 K (0 °C) and 1 atm (760 mm of mercury).',
  sol: 'Standard values.',
  scheme: [['273 K and 1 atm', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('h2-short2', short({
  marks: 2,
  stem: 'For 0.4 g of hydrogen gas, H₂, calculate (a) the number of molecules and (b) its volume at STP. (H = 1; Avogadro’s number = 6 × 10²³)',
  model: r`Moles $= \frac{0.4}{2} = 0.2$. (a) Molecules $= 0.2 \times 6 \times 10^{23} = 1.2 \times 10^{23}$. (b) Volume $= 0.2 \times 22.4 = 4.48$ dm³.`,
  sol: 'Moles first.',
  scheme: [['(a) 1.2 × 10²³', 1], ['(b) 4.48 dm³', 1]],
  d: 2, c: 'application', t: [3, 4],
}));
add('so2-short3', short({
  marks: 3,
  stem: 'For 16 g of sulphur dioxide, SO₂, calculate (a) the number of moles, (b) its volume at STP and (c) the number of oxygen atoms it contains. (S = 32, O = 16; Avogadro’s number = 6 × 10²³)',
  model: r`(a) Molar mass $= 32 + 2 \times 16 = 64$ g, so moles $= \frac{16}{64} = 0.25$. (b) Volume $= 0.25 \times 22.4 = 5.6$ dm³. (c) Each molecule has 2 oxygen atoms, so oxygen atoms $= 2 \times 0.25 \times 6 \times 10^{23} = 3 \times 10^{23}$.`,
  sol: 'Moles, then volume and atoms.',
  scheme: [['(a) 0.25 mol', 1], ['(b) 5.6 dm³', 1], ['(c) 3 × 10²³', 1]],
  d: 3, c: 'application', t: [3, 4],
}), () => near(16 / 64, 0.25) && near(0.25 * 22.4, 5.6) && near(2 * 0.25 * 6e23, 3e23, 1e15) || 'so2');

// ---------------------------------------------------------------- t05 vapour density
add('so2vd-mcq', mcq({
  stem: 'The vapour density of sulphur dioxide, SO₂, is (S = 32, O = 16):',
  right: '32',
  wrong: ['64', '16', '128'],
  sol: r`Relative molecular mass $= 32 + 2 \times 16 = 64$; vapour density $= 64 \div 2 = 32$ — option (@K).`,
  d: 1, c: 'application', t: [5],
}));
add('vd14-mcq', mcq({
  stem: 'A gas has a vapour density of 14. Its molar mass, and the mass of 11.2 dm³ of it at STP, are:',
  right: '28 g mol⁻¹ and 14 g',
  wrong: ['14 g mol⁻¹ and 7 g', '28 g mol⁻¹ and 28 g', '7 g mol⁻¹ and 14 g'],
  sol: r`$M = 2 \times 14 = 28$; 11.2 dm³ is $\frac{11.2}{22.4} = 0.5$ mol, which weighs $0.5 \times 28 = 14$ g — option (@K).`,
  d: 3, c: 'analysis', t: [4, 5],
}));
add('vddef-mcq', mcq({
  stem: 'The vapour density of a gas is the ratio of:',
  right: 'the mass of a volume of the gas to the mass of the same volume of hydrogen, at the same temperature and pressure',
  wrong: ['the mass of the gas to its volume', 'the mass of one molecule of the gas to the mass of one hydrogen atom', 'the volume of the gas to the volume of the same mass of hydrogen'],
  sol: 'Definition of vapour density — option (@K). (The ratio of a molecule’s mass to a hydrogen atom’s mass is the relative molecular mass, twice the vapour density.)',
  d: 2, c: 'recall', t: [5],
}));
add('vdunit-ar', ar({
  a: 'The vapour density of a gas is expressed in g dm⁻³.',
  r: 'Vapour density is the ratio of two masses.',
  key: 'b',
  sol: 'A is false: a ratio of two masses has no unit. R is true — option (b).',
  d: 2, c: 'understanding', t: [5],
}));
add('nh3vd-ar', ar({
  a: 'The vapour density of ammonia, NH₃, is 8.5 (N = 14, H = 1).',
  r: 'The relative molecular mass of a gas is twice its vapour density.',
  key: 'c',
  sol: 'M of NH₃ = 14 + 3 = 17, and 17 ÷ 2 = 8.5; R explains A — option (c).',
  d: 2, c: 'application', t: [5],
}));
add('vd-tf', tf({
  stem: 'Vapour density has no unit.',
  key: 't',
  sol: 'True: it is a ratio of two masses, so the units cancel.',
  d: 1, c: 'recall', t: [5],
}));
add('molar-fill', fill({
  stem: 'One mole of a gas weighs 44 g. Its vapour density is ___.',
  acc: [['22']],
  sol: 'Molar mass 44, so vapour density = 44 ÷ 2 = **22**.',
  d: 2, c: 'application', t: [5],
}));
add('vdmass-num', num({
  stem: 'A gas X has a vapour density of 22. What is the mass of 5.6 dm³ of X at STP?',
  value: 11, tol: 0.05, unit: 'g',
  sol: r`Molar mass $= 2 \times 22 = 44$ g mol⁻¹. Moles $= \frac{5.6}{22.4} = 0.25$. Mass $= 0.25 \times 44 = 11$ g.`,
  scheme: [['M = 44 and 0.25 mol', 0.5], ['11 g', 0.5]],
  d: 3, c: 'application', t: [4, 5],
}), () => near((5.6 / 22.4) * 44, 11) || 'mass');
add('cl2vd-num', num({
  stem: '1120 cm³ of a greenish-yellow gas, measured at STP, weighs 3.55 g. Calculate its vapour density.',
  value: 35.5, tol: 0.1,
  sol: r`Volume $= 1120 \div 1000 = 1.12$ dm³. Moles $= \frac{1.12}{22.4} = 0.05$. Molar mass $= \frac{3.55}{0.05} = 71$. Vapour density $= 71 \div 2 = 35.5$.`,
  scheme: [['Molar mass 71', 0.5], ['35.5', 0.5]],
  d: 4, c: 'analysis', t: [4, 5],
}), () => near(3.55 / (1.12 / 22.4) / 2, 35.5) || 'VD');
add('vd-short1', short({
  marks: 1,
  stem: 'Write the relation between the relative molecular mass of a gas and its vapour density.',
  model: 'Relative molecular mass = 2 × vapour density.',
  sol: 'Relation.',
  scheme: [['M = 2 × VD', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('vdunit-short1', short({
  marks: 1,
  stem: 'Why does vapour density have no unit?',
  model: 'It is the ratio of two masses (the mass of a volume of the gas divided by the mass of the same volume of hydrogen), so the units cancel.',
  sol: 'Ratio.',
  scheme: [['Ratio of two masses', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('vd-short2', short({
  marks: 2,
  stem: 'A gaseous hydrocarbon has a vapour density of 15. (a) Find its relative molecular mass. (b) Which of methane (CH₄), ethane (C₂H₆) and ethene (C₂H₄) could it be? (C = 12, H = 1)',
  model: r`(a) $M = 2 \times 15 = 30$. (b) Ethane: $2 \times 12 + 6 \times 1 = 30$ (methane is 16 and ethene is 28).`,
  sol: 'Double the vapour density, then compare.',
  scheme: [['(a) 30', 1], ['(b) Ethane', 1]],
  d: 2, c: 'application', t: [5],
}));
add('gasx-short3', short({
  marks: 3,
  stem: 'A gas X weighs 0.70 g and occupies 560 cm³ at STP. (a) Calculate its molar mass. (b) Calculate its vapour density. (c) Which of nitrogen, oxygen and carbon dioxide could X be? (N = 14, O = 16, C = 12)',
  model: r`(a) Moles $= \frac{0.56}{22.4} = 0.025$, so molar mass $= \frac{0.70}{0.025} = 28$ g mol⁻¹. (b) Vapour density $= 28 \div 2 = 14$. (c) Nitrogen, N₂, whose molar mass is $2 \times 14 = 28$ (oxygen is 32 and carbon dioxide 44).`,
  sol: 'Moles, molar mass, then compare.',
  scheme: [['(a) 28 g mol⁻¹', 1], ['(b) 14', 1], ['(c) Nitrogen', 1]],
  d: 3, c: 'analysis', t: [4, 5],
}), () => near(0.7 / (0.56 / 22.4), 28) || 'M');

// ---------------------------------------------------------------- matches and the 3-blank completion
add('trio-fill', fill({
  stem: 'Complete each sentence by choosing the correct word from the bracket.\n\n(a) At STP, one mole of any gas occupies ___ (22.4 / 2.24) dm³.\n\n(b) The relative molecular mass of a gas is ___ (half / twice) its vapour density.\n\n(c) Equal volumes of all gases at the same temperature and pressure contain equal numbers of ___ (atoms / molecules).',
  acc: [['22.4'], ['twice'], ['molecules']],
  sol: '(a) **22.4**; (b) **twice**; (c) **molecules**.',
  d: 1, c: 'recall', t: [2, 4, 5],
}));
add('quantity-match', match({
  stem: 'Match each quantity for carbon dioxide in Column A with its value in Column B. (C = 12, O = 16; Avogadro’s number = 6.022 × 10²³)',
  pairs: [
    ['Gram molecular mass', '44 g'],
    ['Vapour density', '22'],
    ['Volume of 1 mol at STP', '22.4 dm³'],
    ['Number of molecules in 1 mol', '6.022 × 10²³'],
    ['Number of moles in 11 g', '0.25'],
  ],
  order: [2, 4, 0, 3, 1],
  sol: 'Gram molecular mass → 44 g; vapour density → 44 ÷ 2 = 22; volume of 1 mol at STP → 22.4 dm³; molecules in 1 mol → 6.022 × 10²³; moles in 11 g → 11 ÷ 44 = 0.25.',
  d: 2, c: 'application', t: [3, 4, 5],
}));
add('law-match', match({
  stem: 'Match each law or relation in Column A with its statement in Column B.',
  pairs: [
    ["Gay-Lussac's law", 'Reacting gas volumes are in a simple whole-number ratio'],
    ["Avogadro's law", 'Equal volumes of gases at the same temperature and pressure contain equal numbers of molecules'],
    ['Molar volume', 'One mole of any gas occupies 22.4 dm³ at STP'],
    ['Vapour density relation', 'Relative molecular mass equals twice the vapour density'],
  ],
  order: [1, 3, 0, 2],
  sol: "Gay-Lussac's law → simple ratio of gas volumes; Avogadro's law → equal volumes, equal molecules; molar volume → 22.4 dm³ at STP; vapour density relation → M = 2 × VD.",
  d: 1, c: 'recall', t: [1, 2, 4, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('gaslaws-long', long({
  stem: "(a) State Gay-Lussac's law of combining volumes and Avogadro's law. [2]\n\n(b) 60 cm³ of nitrogen is mixed with 240 cm³ of hydrogen and passed over a catalyst until the nitrogen has reacted completely: N₂ + 3H₂ → 2NH₃. Calculate the volume of hydrogen left over and the volume of ammonia formed (same temperature and pressure). [2]\n\n(c) One volume of hydrogen combines with one volume of chlorine to form two volumes of hydrogen chloride. Using Avogadro's law, explain what this tells us about the number of atoms in a hydrogen molecule. [3]\n\n(d) 40 cm³ of methane is exploded with 100 cm³ of oxygen: CH₄ + 2O₂ → CO₂ + 2H₂O. Calculate the volume and composition of the gas left after cooling to room temperature. [3]",
  model: r`(a) Gay-Lussac's law: when gases react, they do so in volumes that bear a simple whole-number ratio to one another and to the volumes of the gaseous products, at the same temperature and pressure. Avogadro's law: equal volumes of all gases at the same temperature and pressure contain equal numbers of molecules.

(b) Hydrogen used $= 60 \times 3 = 180$ cm³, so hydrogen left $= 240 - 180 = 60$ cm³. Ammonia formed $= 60 \times 2 = 120$ cm³.

(c) If one volume of hydrogen contains n molecules, one volume of chlorine also contains n molecules and two volumes of hydrogen chloride contain 2n molecules. Each hydrogen chloride molecule contains at least one hydrogen atom, so 2n hydrogen atoms came from n hydrogen molecules. Each hydrogen molecule must therefore contain (at least) two atoms: hydrogen is diatomic.

(d) Oxygen used $= 40 \times 2 = 80$ cm³, so oxygen left $= 100 - 80 = 20$ cm³. Carbon dioxide formed $= 40$ cm³; the water condenses. Gas left $= 40 + 20 = 60$ cm³: 40 cm³ of carbon dioxide and 20 cm³ of oxygen.`,
  sol: 'Laws; volume ratio 1 : 3 : 2; molecules argument; excess oxygen.',
  scheme: [["(a) Gay-Lussac's law", 1], ["(a) Avogadro's law", 1], ['(b) hydrogen left 60 cm³', 1], ['(b) ammonia 120 cm³', 1], ['(c) n and 2n molecules', 1], ['(c) each HCl has a hydrogen atom', 1], ['(c) hydrogen is diatomic', 1], ['(d) oxygen used and left', 1], ['(d) carbon dioxide 40 cm³', 1], ['(d) total 60 cm³ with composition', 1]],
  d: 3, c: 'application', t: [1, 2],
}), () => 240 - 60 * 3 === 60 && 60 * 2 === 120 && 100 - 80 + 40 === 60 || 'volumes');
add('mole-long', long({
  stem: "(a) Define a mole and state the value of Avogadro's number. [2]\n\n(b) Distinguish between the molecular mass and the gram molecular mass of sulphuric acid, H₂SO₄. (H = 1, S = 32, O = 16) [2]\n\n(c) For 4.9 g of sulphuric acid, calculate (i) the number of moles, (ii) the number of molecules and (iii) the number of oxygen atoms. (Avogadro’s number = 6 × 10²³) [3]\n\n(d) Show by calculation whether 1 g of hydrogen gas or 14 g of nitrogen gas contains more molecules, and find the volume each occupies at STP. (H = 1, N = 14) [3]",
  model: r`(a) One mole is the amount of a substance containing as many particles as there are atoms in exactly 12 g of carbon-12. Avogadro's number is $6.022 \times 10^{23}$.

(b) Molecular mass of H₂SO₄ $= 2 \times 1 + 32 + 4 \times 16 = 98$ (u): the relative mass of one molecule. Gram molecular mass $= 98$ g: the mass of one mole ($6.022 \times 10^{23}$ molecules).

(c) (i) Moles $= \frac{4.9}{98} = 0.05$. (ii) Molecules $= 0.05 \times 6 \times 10^{23} = 3 \times 10^{22}$. (iii) Oxygen atoms $= 4 \times 3 \times 10^{22} = 1.2 \times 10^{23}$.

(d) Hydrogen: $\frac{1}{2} = 0.5$ mol. Nitrogen: $\frac{14}{28} = 0.5$ mol. Equal moles, so both contain the same number of molecules ($3 \times 10^{23}$ with Avogadro’s number taken as $6 \times 10^{23}$). Each occupies $0.5 \times 22.4 = 11.2$ dm³ at STP.`,
  sol: 'Definitions; molar mass 98; moles first; equal moles.',
  scheme: [['(a) definition', 1], ["(a) Avogadro's number", 1], ['(b) molecular mass', 1], ['(b) gram molecular mass', 1], ['(c)(i) 0.05 mol', 1], ['(c)(ii) 3 × 10²² molecules', 1], ['(c)(iii) 1.2 × 10²³ atoms', 1], ['(d) 0.5 mol each', 1], ['(d) equal numbers of molecules', 1], ['(d) 11.2 dm³ each', 1]],
  d: 3, c: 'analysis', t: [3, 4],
}), () => near(4.9 / 98, 0.05) && near(4 * 0.05 * 6e23, 1.2e23, 1e15) && near(14 / 28, 1 / 2) || 'mole');
add('molvol-long', long({
  stem: '(a) What is meant by molar volume? State the conditions of STP. [2]\n\n(b) Calculate the mass of 4.48 dm³ of ammonia at STP. (N = 14, H = 1) [2]\n\n(c) A gas cylinder holds 1.2 × 10²⁴ molecules of oxygen. Calculate (i) the number of moles of oxygen, (ii) its mass and (iii) its volume at STP. (O = 16; Avogadro’s number = 6 × 10²³) [3]\n\n(d) 22.4 dm³ of hydrogen and 22.4 dm³ of chlorine, both at STP, contain the same number of molecules but have very different masses. Explain this, and give both masses. (H = 1, Cl = 35.5) [3]',
  model: r`(a) Molar volume is the volume occupied by one mole of any gas: 22.4 dm³ at STP. STP is 273 K (0 °C) and 1 atm (760 mm of mercury).

(b) Moles $= \frac{4.48}{22.4} = 0.2$; molar mass of NH₃ $= 14 + 3 \times 1 = 17$ g; mass $= 0.2 \times 17 = 3.4$ g.

(c) (i) Moles $= \frac{1.2 \times 10^{24}}{6 \times 10^{23}} = 2$. (ii) Mass $= 2 \times 32 = 64$ g. (iii) Volume $= 2 \times 22.4 = 44.8$ dm³.

(d) Each volume is 1 mol, so by Avogadro's law each contains the same number of molecules ($6.022 \times 10^{23}$). But a chlorine molecule (Cl₂, $2 \times 35.5 = 71$ u) is much heavier than a hydrogen molecule (H₂, 2 u). So 22.4 dm³ of hydrogen weighs 2 g and 22.4 dm³ of chlorine weighs 71 g.`,
  sol: 'Molar volume; moles first; molecular masses differ.',
  scheme: [['(a) molar volume', 1], ['(a) STP', 1], ['(b) 0.2 mol', 1], ['(b) 3.4 g', 1], ['(c)(i) 2 mol', 1], ['(c)(ii) 64 g', 1], ['(c)(iii) 44.8 dm³', 1], ['(d) same number of molecules', 1], ['(d) different molecular masses', 1], ['(d) 2 g and 71 g', 1]],
  d: 3, c: 'application', t: [3, 4],
}), () => near((4.48 / 22.4) * 17, 3.4) && near(1.2e24 / 6e23, 2) && near(2 * 22.4, 44.8) || 'molvol');
add('vd-long', long({
  stem: '(a) Define vapour density and state its relation to relative molecular mass. [2]\n\n(b) The vapour density of a gas is 32. Calculate (i) its relative molecular mass and (ii) the volume occupied by 16 g of it at STP. [2]\n\n(c) 1.12 dm³ of a gas Y, measured at STP, weighs 0.85 g. (i) Calculate the molar mass of Y. (ii) Calculate its vapour density. (iii) Y is a hydride of nitrogen; give its formula. (N = 14, H = 1) [3]\n\n(d) A student writes, "The vapour density of carbon dioxide is 22 g." Correct the statement. Air has an average vapour density of about 14.4: use this to explain why carbon dioxide is collected by upward displacement of air. [3]',
  model: r`(a) Vapour density is the ratio of the mass of a certain volume of a gas to the mass of the same volume of hydrogen, at the same temperature and pressure. Relative molecular mass = 2 × vapour density.

(b) (i) $M = 2 \times 32 = 64$. (ii) Moles $= \frac{16}{64} = 0.25$; volume $= 0.25 \times 22.4 = 5.6$ dm³.

(c) (i) Moles $= \frac{1.12}{22.4} = 0.05$; molar mass $= \frac{0.85}{0.05} = 17$ g mol⁻¹. (ii) Vapour density $= 17 \div 2 = 8.5$. (iii) NH₃ ($14 + 3 \times 1 = 17$).

(d) The vapour density of carbon dioxide is 22, with no unit, because it is a ratio of two masses. Its vapour density (22) is greater than that of air (about 14.4), so carbon dioxide is heavier than air. It sinks to the bottom of an upright gas jar and pushes the air up and out: upward displacement of air.`,
  sol: 'Definition; M = 2 × VD; moles from volume; no unit; compare with air.',
  scheme: [['(a) definition', 1], ['(a) relation', 1], ['(b)(i) 64', 1], ['(b)(ii) 5.6 dm³', 1], ['(c)(i) 17 g mol⁻¹', 1], ['(c)(ii) 8.5', 1], ['(c)(iii) NH₃', 1], ['(d) no unit (ratio)', 1], ['(d) 22 > 14.4: heavier than air', 1], ['(d) upward displacement of air', 1]],
  d: 3, c: 'application', t: [4, 5],
}), () => near((16 / 64) * 22.4, 5.6) && near(0.85 / (1.12 / 22.4), 17) || 'vd');
add('mixed-long', long({
  stem: '(a) Calculate the vapour densities of propane, C₃H₈, and carbon dioxide, and use them to compare the masses of 1 dm³ of each gas at STP. (C = 12, H = 1, O = 16) [2]\n\n(b) 2.2 g of propane is burnt completely: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. Calculate the moles of propane and the number of water molecules formed. (Avogadro’s number = 6 × 10²³) [2]\n\n(c) For the 2.2 g of propane in (b), calculate the volume of carbon dioxide formed and the volume of oxygen used, both at STP. [3]\n\n(d) In another experiment, 30 cm³ of propane is burnt in 200 cm³ of oxygen. Find the volume of each gas left after cooling to room temperature (same pressure). [3]',
  model: r`(a) Propane: $M = 3 \times 12 + 8 \times 1 = 44$, so vapour density $= 44 \div 2 = 22$. Carbon dioxide: $M = 12 + 2 \times 16 = 44$, vapour density 22. Equal vapour densities mean equal masses of equal volumes: 1 dm³ of each weighs the same (about 1.96 g at STP).

(b) Moles of propane $= \frac{2.2}{44} = 0.05$. Water formed $= 4 \times 0.05 = 0.2$ mol, so water molecules $= 0.2 \times 6 \times 10^{23} = 1.2 \times 10^{23}$.

(c) Carbon dioxide $= 3 \times 0.05 = 0.15$ mol, volume $= 0.15 \times 22.4 = 3.36$ dm³. Oxygen $= 5 \times 0.05 = 0.25$ mol, volume $= 0.25 \times 22.4 = 5.6$ dm³.

(d) Oxygen used $= 30 \times 5 = 150$ cm³, so oxygen left $= 200 - 150 = 50$ cm³. Carbon dioxide formed $= 30 \times 3 = 90$ cm³. The water condenses, so the gas left is 90 cm³ of carbon dioxide and 50 cm³ of oxygen (140 cm³ in all).`,
  sol: 'Vapour densities; moles and mole ratios; volume ratio with excess oxygen.',
  scheme: [['(a) both vapour densities 22', 1], ['(a) equal masses', 1], ['(b) 0.05 mol', 1], ['(b) 1.2 × 10²³ molecules', 1], ['(c) 3.36 dm³ of carbon dioxide', 1.5], ['(c) 5.6 dm³ of oxygen', 1.5], ['(d) oxygen used 150 cm³', 1], ['(d) oxygen left 50 cm³', 1], ['(d) carbon dioxide 90 cm³', 1]],
  d: 4, c: 'analysis', t: [1, 3, 4, 5],
}), () => near(2.2 / 44, 0.05) && near(0.15 * 22.4, 3.36) && near(0.25 * 22.4, 5.6) && 200 - 150 === 50 && near(44 / 22.4, 1.964, 0.001) || 'mixed');
