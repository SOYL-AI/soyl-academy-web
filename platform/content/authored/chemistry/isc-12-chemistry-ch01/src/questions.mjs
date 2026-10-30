// ISC 12 Chemistry ch01 Solutions and Their Concentration — question bank (ISC style: 1-mark objective items incl.
// assertion-reason, then 2-, 3- and 5-mark structured questions). MCQ keys are placed by the builder (balanced);
// AR keys planned: a b c b d. Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 types of solutions
add('solid-solution-mcq', mcq({
  stem: 'Palladium metal can absorb many times its own volume of a gas. Which of these is a solution of a gas in a solid?',
  right: 'Hydrogen absorbed in palladium',
  wrong: ['Camphor vapour in air', 'Sodium amalgam', 'Soda water'],
  sol: 'The solvent (palladium) is a solid and the solute (hydrogen) is a gas — option (@K). Camphor in air is a solid in a gas (@1); amalgam is a liquid in a solid (@2).',
  d: 1, c: 'understanding', t: [1],
}));
add('alloy-mcq', mcq({
  stem: 'A jeweller’s 18-carat gold contains gold with copper and silver uniformly mixed. It is best described as:',
  right: 'a solid solution in which gold is the solvent',
  wrong: ['a liquid solution', 'a heterogeneous mixture', 'a colloid of copper in gold'],
  sol: 'Gold (75%) is the major component and the mixture is uniform, so it is a solid solution with gold as solvent — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('amalgam-tf', tf({
  stem: 'Sodium amalgam is a solid solution in which the solute is a liquid.',
  key: 't',
  sol: 'True. Mercury (a liquid) is dissolved in solid sodium.',
  d: 1, c: 'recall', t: [1],
}));
add('solidsol-short', short({
  marks: 2,
  stem: 'Give one example each of (a) a solution of a gas in a liquid and (b) a solid solution of a solid in a solid. Name the solute and the solvent in each.',
  model: '(a) Soda water: solute carbon dioxide (gas), solvent water (liquid). (b) Brass: solute zinc, solvent copper (both solids).',
  sol: 'Example, solute and solvent for each.',
  scheme: [['(a) Example with solute and solvent', 1], ['(b) Example with solute and solvent', 1]],
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- t02 concentration terms
add('temp-unit-mcq', mcq({
  stem: 'Which pair of concentration terms both stay unchanged when a solution is warmed from 15 °C to 35 °C?',
  right: 'Molality and mole fraction',
  wrong: ['Molarity and molality', 'Normality and mole fraction', 'Molarity and normality'],
  sol: 'Molality and mole fraction are built from masses only — option (@K). Molarity and normality use the volume of solution, which expands on warming.',
  d: 2, c: 'understanding', t: [2],
}));
add('normality-mcq', mcq({
  stem: 'What is the normality of a 0.3 M solution of calcium hydroxide, Ca(OH)₂?',
  right: '0.6 N',
  wrong: ['0.3 N', '0.15 N', '0.9 N'],
  sol: 'Ca(OH)₂ gives two OH⁻ per formula unit, so N = 2 × 0.3 = 0.6 — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('equiv-mcq', mcq({
  stem: 'Oxalic acid dihydrate, H₂C₂O₄·2H₂O (M = 126), is used as a primary standard in acid–base titrations. Its equivalent mass is:',
  right: '63',
  wrong: ['126', '45', '90'],
  sol: 'It is dibasic: 126 ÷ 2 = 63 — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('molefrac-mcq', mcq({
  stem: 'A mixture contains 46 g of ethanol (M = 46) and 54 g of water (M = 18). The mole fraction of ethanol is:',
  right: '0.25',
  wrong: ['0.46', '0.33', '0.75'],
  sol: 'n(ethanol) = 1, n(water) = 3; x = 1 ÷ 4 = 0.25 — option (@K). 0.46 is the mass fraction (@1).',
  d: 2, c: 'application', t: [2],
}));
add('molality-mcq', mcq({
  stem: 'What mass of urea (M = 60) must be dissolved in 500 g of water to make a 0.20 molal solution?',
  right: '6.0 g',
  wrong: ['12 g', '3.0 g', '0.6 g'],
  sol: 'Moles = 0.20 × 0.500 = 0.10; mass = 0.10 × 60 = 6.0 g — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ppm-mcq', mcq({
  stem: 'A concentration of 1 ppm (by mass) of a pollutant in water means:',
  right: '1 mg of pollutant in 1 kg of water',
  wrong: ['1 g of pollutant in 1 kg of water', '1 mg of pollutant in 1 g of water', '1 mol of pollutant in 10⁶ L of water'],
  sol: '1 part in 10⁶ parts by mass: 1 mg in 10⁶ mg = 1 kg — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('mix-mcq', mcq({
  stem: '100 mL of 0.50 M NaCl is mixed with 300 mL of 0.10 M NaCl. The molarity of the mixture is:',
  right: '0.20 M',
  wrong: ['0.30 M', '0.15 M', '0.60 M'],
  sol: 'Total moles = 0.050 + 0.030 = 0.080 in 0.400 L: 0.080 ÷ 0.400 = 0.20 M — option (@K). 0.30 M is the simple average (@1).',
  d: 3, c: 'application', t: [2],
}));
add('normality-tf', tf({
  stem: 'The normality of a solution does not change with temperature.',
  key: 'f',
  sol: 'False. Normality uses the volume of solution, which changes with temperature, so normality changes slightly.',
  d: 1, c: 'understanding', t: [2],
}));
add('equiv-fill', fill({
  stem: 'The equivalent mass of sulfuric acid (M = 98) in a reaction in which both of its hydrogen atoms are replaced is ___.',
  acc: [['49']],
  sol: '98 ÷ 2 = **49**.',
  d: 1, c: 'application', t: [2],
}));
add('unit-match', match({
  stem: 'A laboratory label for a sulfuric acid solution can state its strength in several ways. Match each concentration term with its unit.',
  pairs: [
    ['Molarity', 'mol L⁻¹'],
    ['Molality', 'mol kg⁻¹'],
    ['Normality', 'gram equivalents per litre'],
    ['Mole fraction', 'No unit'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Molarity → mol L⁻¹; molality → mol kg⁻¹; normality → g-equiv L⁻¹; mole fraction is a pure number.',
  d: 1, c: 'recall', t: [2],
}));
add('molality-ar', ar({
  a: 'Molality is preferred to molarity when a solution is studied over a range of temperatures.',
  r: 'Molality is defined in terms of masses, which do not change with temperature.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('normality-ar', ar({
  a: 'A 1 M solution of sulfuric acid is 2 N.',
  r: 'Sulfuric acid is a strong acid.',
  key: 'b',
  sol: 'Both are true, but the strength of the acid does not explain A; A follows from its basicity of 2 (n-factor 2) — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('normality-num', num({
  marks: 2,
  stem: r`$10.6\ \text{g}$ of anhydrous sodium carbonate ($\ce{Na2CO3}$, $M = 106$) is dissolved in water to make $250\ \text{mL}$ of solution for titration with acid. Find the normality of the solution.`,
  value: 0.8, tol: 0.005, unit: 'N',
  sol: r`Moles $= 10.6 \div 106 = 0.10$; molarity $= 0.10 \div 0.250 = 0.40\ \text{M}$. $\ce{Na2CO3}$ reacts with two $\ce{H+}$ (n-factor 2), so normality $= 2 \times 0.40 = 0.8\ \text{N}$.`,
  scheme: [['Molarity 0.40 M', 1], ['n-factor 2; 0.8 N', 1]],
  d: 2, c: 'application', t: [2],
}), () => near((10.6 / 106 / 0.25) * 2, 0.8) || 'normality');
add('ppm-num', num({
  stem: r`A $2.5\ \text{kg}$ sample of well water contains $0.75\ \text{mg}$ of lead. Express the lead content in ppm.`,
  value: 0.3, tol: 0.002, unit: 'ppm',
  sol: r`ppm $= \dfrac{0.75 \times 10^{-3}\ \text{g}}{2500\ \text{g}} \times 10^{6} = 0.30$, so $0.30$ ppm.`,
  scheme: [['0.30 ppm', 1]],
  d: 1, c: 'application', t: [2],
}), () => near((0.75e-3 / 2500) * 1e6, 0.3) || 'ppm');
add('conv-num', num({
  marks: 2,
  stem: r`An aqueous potassium hydroxide solution is $2.0\ \text{M}$ and has a density of $1.10\ \text{g mL}^{-1}$ ($M_{\ce{KOH}} = 56$). Calculate its molality.`,
  value: 2.02, tol: 0.01, unit: 'mol/kg',
  sol: r`Take $1\ \text{L}$: mass of solution $= 1000 \times 1.10 = 1100\ \text{g}$; KOH $= 2.0 \times 56 = 112\ \text{g}$; water $= 1100 - 112 = 988\ \text{g}$. Molality $= 2.0 \div 0.988 = 2.02\ \text{mol kg}^{-1}$.`,
  scheme: [['Mass of water 988 g', 1], ['Molality 2.02 mol/kg', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(2 / ((1100 - 112) / 1000), 2.0243, 0.003) || 'molality');
add('dilution-num', num({
  stem: r`What volume of $10\ \text{N}$ sulfuric acid, in mL, is needed to prepare $500\ \text{mL}$ of $0.20\ \text{N}$ acid?`,
  value: 10, tol: 0.05, unit: 'mL',
  sol: r`$N_1V_1 = N_2V_2$: $V_1 = 0.20 \times 500 \div 10 = 10$, so $10\ \text{mL}$.`,
  scheme: [['10 mL', 1]],
  d: 1, c: 'application', t: [2],
}), () => near((0.2 * 500) / 10, 10) || 'dilution');
add('temp-short', short({
  marks: 2,
  stem: 'Explain why the molality of a solution is independent of temperature, whereas its molarity is not.',
  model: 'Molality is moles of solute per kilogram of solvent; both quantities depend only on mass, which does not change with temperature. Molarity is moles per litre of solution; the volume of a solution increases on heating, so its molarity decreases.',
  sol: 'Mass vs volume.',
  scheme: [['Molality uses masses only', 1], ['Volume changes with temperature, so molarity changes', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('normality-short', short({
  marks: 2,
  stem: 'Calculate the normality of a solution made by dissolving 3.15 g of oxalic acid dihydrate, H₂C₂O₄·2H₂O (M = 126), in water to make 250 mL of solution.',
  model: r`Equivalent mass $= 126 \div 2 = 63$. Gram equivalents $= 3.15 \div 63 = 0.05$. Normality $= 0.05 \div 0.250 = 0.20\ \text{N}$.`,
  sol: '0.20 N.',
  scheme: [['Equivalent mass 63 and 0.05 equivalents', 1], ['0.20 N', 1]],
  d: 2, c: 'application', t: [2],
}));
add('ppm-short', short({
  marks: 2,
  stem: 'The safe limit of lead in drinking water is 0.01 ppm. A 2.0 kg sample from a school tank contains 0.05 mg of lead. Is the water safe? Show your working.',
  model: r`ppm $= \dfrac{0.05 \times 10^{-3}}{2000} \times 10^{6} = 0.025$ ppm. This is more than 0.01 ppm, so the water is not safe to drink.`,
  sol: '0.025 ppm, above the limit.',
  scheme: [['0.025 ppm', 1], ['Comparison and conclusion', 1]],
  d: 2, c: 'application', t: [2],
}));
add('conv-short3', short({
  marks: 3,
  stem: 'Concentrated nitric acid used in the laboratory is 63% HNO₃ by mass and has a density of 1.40 g mL⁻¹ (M = 63). Calculate (a) its molarity and (b) its molality.',
  model: r`Take $100\ \text{g}$ of acid: $63\ \text{g}$ HNO₃ $= 1.0\ \text{mol}$; water $= 37\ \text{g}$. Volume $= 100 \div 1.40 = 71.4\ \text{mL}$.

(a) Molarity $= 1.0 \div 0.0714 = 14.0\ \text{M}$.

(b) Molality $= 1.0 \div 0.037 = 27.0\ \text{mol kg}^{-1}$.`,
  sol: '14.0 M; 27.0 mol/kg.',
  scheme: [['Moles in 100 g and volume', 1], ['(a) 14.0 M', 1], ['(b) 27.0 mol/kg', 1]],
  d: 3, c: 'application', t: [2],
}));
add('molefrac-short3', short({
  marks: 3,
  stem: 'A solution is made by dissolving 18 g of glucose (M = 180) in 162 g of water. Calculate (a) the mass percentage of glucose, (b) the mole fraction of glucose and (c) the molality of the solution.',
  model: r`(a) Mass % $= 18 \div 180 \times 100 = 10\%$ (total mass 180 g).

(b) $n_\text{glucose} = 0.10$; $n_\text{water} = 162 \div 18 = 9.0$; $x = 0.10 \div 9.10 = 0.011$.

(c) Molality $= 0.10 \div 0.162 = 0.617\ \text{mol kg}^{-1}$.`,
  sol: '10%; 0.011; 0.617 mol/kg.',
  scheme: [['(a) 10%', 1], ['(b) 0.011', 1], ['(c) 0.617 mol/kg', 1]],
  d: 2, c: 'application', t: [2],
}));
add('normality-short3', short({
  marks: 3,
  stem: 'What volume of 0.25 N sulfuric acid is needed to neutralise exactly 2.0 g of sodium hydroxide (M = 40)? What would the molarity of this acid be?',
  model: r`Equivalents of NaOH $= 2.0 \div 40 = 0.050$. At neutralisation, equivalents of acid $= 0.050$, so $V = 0.050 \div 0.25 = 0.20\ \text{L} = 200\ \text{mL}$. Sulfuric acid has n-factor 2, so its molarity $= 0.25 \div 2 = 0.125\ \text{M}$.`,
  sol: '200 mL; 0.125 M.',
  scheme: [['Equivalents of NaOH', 1], ['Volume 200 mL', 1], ['Molarity 0.125 M', 1]],
  d: 3, c: 'application', t: [2],
}));
add('conc-long', long({
  stem: '(a) Define molality, normality and parts per million. [1½]\n\n(b) 4.9 g of sulfuric acid (M = 98) is dissolved in water to make 500 mL of solution. Calculate its molarity and normality. [1½]\n\n(c) The density of this solution is 1.02 g mL⁻¹. Calculate its molality. [2]',
  model: r`(a) Molality: moles of solute per kilogram of solvent. Normality: gram equivalents of solute per litre of solution. ppm: parts by mass of a component per $10^6$ parts by mass of solution.

(b) Moles $= 4.9 \div 98 = 0.050$; molarity $= 0.050 \div 0.500 = 0.10\ \text{M}$; normality $= 2 \times 0.10 = 0.20\ \text{N}$.

(c) Mass of solution $= 500 \times 1.02 = 510\ \text{g}$; water $= 510 - 4.9 = 505.1\ \text{g}$; molality $= 0.050 \div 0.5051 = 0.099\ \text{mol kg}^{-1}$.`,
  sol: 'Definitions; 0.10 M, 0.20 N; 0.099 mol/kg.',
  scheme: [['(a) Three definitions', 1.5], ['(b) Molarity and normality', 1.5], ['(c) Mass of water', 1], ['(c) Molality 0.099 mol/kg', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 Henry's law
add('kh-mcq', mcq({
  stem: 'At 293 K the Henry’s law constants (in kbar) of four gases in water are: argon 40.3, methane 41.9, ethane 30.6, helium 145. Which gas is the least soluble in water at the same partial pressure?',
  right: 'Helium',
  wrong: ['Ethane', 'Argon', 'Methane'],
  sol: 'x = p ÷ KH, so the largest KH gives the smallest mole fraction — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('henry-temp-mcq', mcq({
  stem: 'When an aqueous solution of oxygen is warmed at constant partial pressure of oxygen, its solubility:',
  right: 'decreases, because the Henry’s law constant increases',
  wrong: ['increases, because the Henry’s law constant increases', 'decreases, because the Henry’s law constant decreases', 'does not change, because pressure is constant'],
  sol: 'KH rises with temperature, so x = p ÷ KH falls — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('nh3-mcq', mcq({
  stem: 'Ammonia does not obey Henry’s law in water mainly because:',
  right: 'it reacts with water to form ammonium and hydroxide ions',
  wrong: ['it is a non-polar gas', 'it is only slightly soluble', 'it has a very large Henry’s law constant'],
  sol: 'Henry’s law holds for gases that do not react with or ionise in the solvent — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('soda-mcq', mcq({
  stem: 'Soft drinks are bottled under a partial pressure of carbon dioxide of about 4 bar. If the same drink were bottled under 2 bar at the same temperature, the dissolved carbon dioxide would be:',
  right: 'about half as much',
  wrong: ['about twice as much', 'the same', 'about one quarter as much'],
  sol: 'By Henry’s law the amount dissolved is proportional to the partial pressure — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('kh-tf', tf({
  stem: 'The Henry’s law constant of a gas in water increases as the temperature rises.',
  key: 't',
  sol: 'True. A larger KH at higher temperature means a lower solubility of the gas.',
  d: 1, c: 'recall', t: [3],
}));
add('henry-ar', ar({
  a: 'Hydrogen chloride does not obey Henry’s law in water.',
  r: 'Hydrogen chloride is a non-polar molecule.',
  key: 'c',
  sol: 'A is true (HCl ionises in water); R is false — HCl is polar — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('henry-num', num({
  stem: r`Nitrogen is present in air at a partial pressure of $0.78\ \text{bar}$. With $K_\text{H}(\ce{N2}) = 76.48\ \text{kbar}$ at $293\ \text{K}$, how many millimoles of nitrogen dissolve in $1.0\ \text{kg}$ of water?`,
  value: 0.567, tol: 0.005, unit: 'mmol',
  sol: r`$x = 0.78 \div 76480 = 1.020 \times 10^{-5}$; moles of water $= 1000 \div 18 = 55.56$; $n_{\ce{N2}} = 1.020 \times 10^{-5} \times 55.56 = 5.67 \times 10^{-4}\ \text{mol}$; in millimoles $5.67 \times 10^{-4} \times 1000 = 0.567$, so $0.567$ mmol.`,
  scheme: [['0.567 mmol', 1]],
  d: 3, c: 'application', t: [3],
}), () => near((0.78 / 76480) * (1000 / 18) * 1000, 0.567, 0.003) || 'henry');
add('henry-short', short({
  marks: 2,
  stem: 'Use Henry’s law to explain why soft drinks are bottled under high pressure, and why a warm bottle loses its fizz faster than a cold one once opened.',
  model: 'High pressure of carbon dioxide above the drink increases its solubility, so more gas is dissolved; when the bottle is opened the pressure falls and gas comes out. Henry’s constant increases with temperature, so a warm drink can hold less carbon dioxide and loses it faster.',
  sol: 'Pressure raises solubility; temperature raises KH.',
  scheme: [['High pressure → more CO₂ dissolved; released on opening', 1], ['Higher temperature → larger KH → less CO₂ held', 1]],
  d: 2, c: 'application', t: [3],
}));
add('nh3-short', short({
  marks: 2,
  stem: 'State two conditions under which Henry’s law is obeyed, and explain why it does not apply to ammonia dissolving in water.',
  model: 'Henry’s law holds at low pressure (and not too low temperature), for dilute solutions, and for gases that do not react with or dissociate in the solvent. Ammonia reacts with water (NH₃ + H₂O ⇌ NH₄⁺ + OH⁻), so much more dissolves than the law predicts.',
  sol: 'Conditions; reaction with water.',
  scheme: [['Two conditions', 1], ['Ammonia reacts with water', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('henry-short3', short({
  marks: 3,
  stem: 'Carbon dioxide is held above 1.0 kg of water at a partial pressure of 3.34 bar at 298 K (KH = 1.67 kbar). (a) Calculate the mass of CO₂ dissolved. (b) How would the mass change if the water were at 318 K? Give a reason.',
  model: r`(a) $x = 3.34 \div 1670 = 0.0020$; moles of water $= 1000 \div 18 = 55.56$; $n_{\ce{CO2}} \approx 0.0020 \times 55.56 = 0.111\ \text{mol}$; mass $= 0.111 \times 44 = 4.89\ \text{g}$.

(b) Less CO₂ would dissolve, because $K_\text{H}$ increases with temperature (dissolving the gas is exothermic).`,
  sol: '4.89 g; less at 318 K.',
  scheme: [['Mole fraction 0.0020', 1], ['Mass 4.89 g', 1], ['(b) Less dissolves; KH rises', 1]],
  d: 3, c: 'application', t: [3],
}));
add('henry-long', long({
  stem: '(a) State Henry’s law and give two of its applications in daily life. [2]\n\n(b) At 293 K, KH for oxygen in water is 34.86 kbar. Calculate the mole fraction of oxygen in water in equilibrium with (i) air, in which the partial pressure of oxygen is 0.21 bar, and (ii) pure oxygen at 1.0 bar. By what factor does breathing pure oxygen raise the amount of dissolved oxygen? [3]',
  model: r`(a) At constant temperature, the solubility of a gas in a liquid is proportional to the partial pressure of the gas: $p = K_\text{H}x$. Applications: soft drinks bottled under high CO₂ pressure; divers’ tanks filled with air diluted with helium to reduce the bends (or anoxia at high altitude).

(b) (i) $x = 0.21 \div 34860 = 6.02 \times 10^{-6}$. (ii) $x = 1.0 \div 34860 = 2.87 \times 10^{-5}$. Factor $= 1.0 \div 0.21 = 4.76$ (the ratio of the two partial pressures).`,
  sol: 'Law and applications; 6.02 × 10⁻⁶, 2.87 × 10⁻⁵, factor 4.76.',
  scheme: [['(a) Statement', 1], ['(a) Two applications', 1], ['(b) (i) mole fraction', 1], ['(b) (ii) mole fraction', 1], ['(b) Factor 4.76', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 Raoult's law, ideal and non-ideal solutions
add('raoult-mcq', mcq({
  stem: 'Liquids A (p° = 60 kPa) and B (p° = 20 kPa) form an ideal solution. What is the vapour pressure of a solution containing equal numbers of moles of A and B?',
  right: '40 kPa',
  wrong: ['80 kPa', '30 kPa', '20 kPa'],
  sol: 'p = 60 × 0.5 + 20 × 0.5 = 40 kPa — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('deviation-mcq', mcq({
  stem: 'Two liquids cool when mixed, and the volume of the mixture is slightly greater than the sum of their volumes. The solution:',
  right: 'shows positive deviation from Raoult’s law',
  wrong: ['shows negative deviation from Raoult’s law', 'is ideal', 'will form a maximum-boiling azeotrope'],
  sol: 'Heat absorbed and expansion mean A–B attractions are weaker, so molecules escape more easily: positive deviation — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ideal-mcq', mcq({
  stem: 'A mixture of n-hexane and n-heptane behaves almost ideally. Which statement about the mixing of these two liquids is correct?',
  right: 'ΔmixH = 0 and ΔmixV = 0',
  wrong: ['ΔmixH > 0 and ΔmixV > 0', 'ΔmixH < 0 and ΔmixV < 0', 'ΔmixH = 0 but ΔmixV > 0'],
  sol: 'In an ideal solution A–B attractions equal A–A and B–B, so there is no heat or volume change on mixing — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('vapour-rich-mcq', mcq({
  stem: 'A nearly ideal liquid mixture contains equal moles of benzene (more volatile) and toluene (less volatile). Compared with the liquid, the vapour in equilibrium with it is:',
  right: 'richer in benzene',
  wrong: ['richer in toluene', 'of exactly the same composition', 'pure benzene'],
  sol: 'yA = pA ÷ ptotal; the more volatile component has the larger partial pressure, so it is enriched in the vapour — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('negdev-mcq', mcq({
  stem: 'Which pair of liquids shows negative deviation from Raoult’s law?',
  right: 'Nitric acid and water',
  wrong: ['Ethanol and water', 'Acetone and carbon disulfide', 'Benzene and toluene'],
  sol: 'Strong attractions between HNO₃ and water lower the vapour pressure — option (@K). Ethanol–water and acetone–CS₂ show positive deviation; benzene–toluene is nearly ideal.',
  d: 2, c: 'understanding', t: [4],
}));
add('nonvolatile-mcq', mcq({
  stem: 'The vapour pressure of pure water at a certain temperature is 30 kPa. What is the vapour pressure of a solution of a non-volatile solute in which the mole fraction of water is 0.90?',
  right: '27 kPa',
  wrong: ['3 kPa', '30 kPa', '33 kPa'],
  sol: 'p = p° x(water) = 30 × 0.90 = 27 kPa — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('raoult-short', short({
  marks: 2,
  stem: 'State Raoult’s law for a solution of two volatile liquids. Show that Raoult’s law is a special case of Henry’s law.',
  model: 'In a solution of volatile liquids, the partial vapour pressure of each component equals the vapour pressure of the pure component multiplied by its mole fraction: pA = p°A xA. Henry’s law has the same form, p = KH x; Raoult’s law is the special case in which the constant KH equals the vapour pressure of the pure component, p°.',
  sol: 'Statement; KH = p°.',
  scheme: [['Statement with equation', 1], ['Same form; KH = p°', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('dev-short', short({
  marks: 2,
  stem: 'When 20 mL of chloroform is mixed with 20 mL of acetone, the mixture becomes warm and its volume is a little less than 40 mL. Explain both observations and name the type of deviation from Raoult’s law.',
  model: 'Chloroform forms hydrogen bonds with the oxygen of acetone (Cl₃C–H···O=C), which are stronger than the attractions in the pure liquids. Forming these bonds releases heat (ΔmixH < 0) and draws the molecules closer (ΔmixV < 0). The vapour pressure is lower than predicted: negative deviation.',
  sol: 'Hydrogen bonding; negative deviation.',
  scheme: [['Stronger A–B attraction (H-bonding) explains warming and contraction', 1], ['Negative deviation', 1]],
  d: 2, c: 'application', t: [4],
}));
add('raoult-short3', short({
  marks: 3,
  stem: 'Liquids A (p° = 80 kPa) and B (p° = 30 kPa) form an ideal solution whose total vapour pressure is 55 kPa at the same temperature. Calculate (a) the mole fraction of A in the liquid and (b) the mole fraction of A in the vapour.',
  model: r`(a) $p = p^\circ_\text{B} + (p^\circ_\text{A} - p^\circ_\text{B})x_\text{A}$: $55 = 30 + 50x_\text{A}$, so $x_\text{A} = 0.50$.

(b) $p_\text{A} = 80 \times 0.50 = 40\ \text{kPa}$; $y_\text{A} = 40 \div 55 = 0.727$.`,
  sol: 'xA = 0.50; yA = 0.727.',
  scheme: [['Expression for total pressure', 1], ['(a) xA = 0.50', 1], ['(b) yA = 0.727', 1]],
  d: 3, c: 'application', t: [4],
}));
add('nonideal-short3', short({
  marks: 3,
  stem: 'Give three differences between an ideal solution and a solution showing negative deviation from Raoult’s law.',
  model: 'An ideal solution obeys Raoult’s law at all compositions, while a solution with negative deviation has a lower vapour pressure than the law predicts. In an ideal solution A–B attractions equal A–A and B–B attractions; with negative deviation they are stronger. For an ideal solution ΔmixH = 0 and ΔmixV = 0; with negative deviation ΔmixH < 0 (heat is released) and ΔmixV < 0 (contraction).',
  sol: 'Vapour pressure, forces, ΔH and ΔV.',
  scheme: [['Vapour pressure', 1], ['Intermolecular forces', 1], ['ΔmixH and ΔmixV', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('graph-short3', short({
  marks: 3,
  stem: 'Sketch and explain the graph of total vapour pressure against mole fraction for (a) an ideal solution and (b) a solution showing positive deviation from Raoult’s law. Give one example of each.',
  model: '(a) For an ideal solution, the total vapour pressure is a straight line joining the vapour pressures of the pure liquids; each partial pressure is also a straight line. Example: n-hexane + n-heptane. (b) For positive deviation, the total vapour pressure curve lies above the straight line, often passing through a maximum, because weaker A–B attractions let molecules escape more easily. Example: ethanol + water.',
  sol: 'Straight line vs curve above.',
  scheme: [['(a) Straight-line graph and example', 1], ['(b) Curve above the line and example', 1], ['Reason (weaker A–B forces)', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('ideal-ar', ar({
  a: 'A mixture of benzene and toluene behaves almost as an ideal solution.',
  r: 'Benzene has a higher vapour pressure than toluene at the same temperature.',
  key: 'b',
  sol: 'Both are true, but R does not explain A; the mixture is ideal because benzene–toluene attractions are very similar to those in the pure liquids — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('raoult-num', num({
  marks: 2,
  stem: 'At 320 K, the vapour pressures of pure liquids A and B are 50 kPa and 20 kPa. For an ideal solution with a mole fraction of A of 0.30, calculate the mole fraction of A in the vapour.',
  value: 0.517, tol: 0.003, unit: null,
  sol: r`$p_\text{A} = 50 \times 0.30 = 15\ \text{kPa}$; $p_\text{B} = 20 \times 0.70 = 14\ \text{kPa}$; $p_\text{total} = 29\ \text{kPa}$; $y_\text{A} = 15 \div 29 = 0.517$.`,
  scheme: [['Partial pressures and total', 1], ['yA = 0.517', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(15 / 29, 0.517, 0.002) || 'raoult');
add('mixture-match', match({
  stem: 'Match each pair of liquids (hexane–heptane, ethanol–water, nitric acid–water, chloroform–acetone) with the description that fits it best.',
  pairs: [
    ['n-Hexane + n-heptane', 'Obeys Raoult’s law closely'],
    ['Ethanol + water', 'Azeotrope at about 95% ethanol'],
    ['Nitric acid + water', 'Azeotrope at about 68% acid'],
    ['Chloroform + acetone', 'Hydrogen bonds form between the two components'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Hexane–heptane → nearly ideal; ethanol–water → minimum-boiling azeotrope (about 95% ethanol); HNO₃–water → maximum-boiling azeotrope (about 68% acid); chloroform–acetone → C–H···O hydrogen bonds (negative deviation).',
  d: 2, c: 'understanding', t: [4, 5],
}));
add('raoult-long', long({
  stem: '(a) State Raoult’s law and derive an expression for the total vapour pressure of an ideal solution of two volatile liquids A and B in terms of the mole fraction of B. [2]\n\n(b) Pure liquids A and B have vapour pressures of 90 kPa and 36 kPa at 300 K. An ideal solution of A and B has a total vapour pressure of 54 kPa at this temperature. Calculate the mole fraction of A in the liquid and in the vapour. [3]',
  model: r`(a) The partial vapour pressure of each volatile component equals its pure vapour pressure times its mole fraction: $p_\text{A} = p^\circ_\text{A}x_\text{A}$, $p_\text{B} = p^\circ_\text{B}x_\text{B}$. By Dalton’s law $p = p_\text{A} + p_\text{B} = p^\circ_\text{A}(1 - x_\text{B}) + p^\circ_\text{B}x_\text{B} = p^\circ_\text{A} + (p^\circ_\text{B} - p^\circ_\text{A})x_\text{B}$.

(b) $54 = 36 + (90 - 36)x_\text{A}$, so $x_\text{A} = 18 \div 54 = 0.333$. $p_\text{A} = 90 \times 0.333 = 30\ \text{kPa}$; $y_\text{A} = 30 \div 54 = 0.556$.`,
  sol: 'Derivation; xA = 0.333; yA = 0.556.',
  scheme: [['(a) Statement', 1], ['(a) Derivation', 1], ['(b) xA = 0.333', 1.5], ['(b) yA = 0.556', 1.5]],
  d: 3, c: 'application', t: [4],
}));
add('nonideal-long', long({
  stem: '(a) What are positive and negative deviations from Raoult’s law? Explain each in terms of intermolecular forces, giving the signs of ΔmixH and ΔmixV and one example of each. [3]\n\n(b) What is an azeotrope? Why cannot the components of an azeotrope be separated by fractional distillation? [2]',
  model: 'In positive deviation, the vapour pressure is higher than Raoult’s law predicts, because A–B attractions are weaker than A–A and B–B; mixing absorbs heat (ΔmixH > 0) and the volume increases (ΔmixV > 0). Example: ethanol + water. In negative deviation, the vapour pressure is lower, because A–B attractions are stronger; mixing releases heat (ΔmixH < 0) and the volume decreases (ΔmixV < 0). Example: chloroform + acetone. An azeotrope is a liquid mixture that boils at a constant temperature and distils without change in composition. At the azeotropic composition the vapour has exactly the same composition as the liquid, so repeated evaporation and condensation cannot change the composition.',
  sol: 'Deviations with forces, signs and examples; azeotrope.',
  scheme: [['(a) Positive deviation with signs and example', 1.5], ['(a) Negative deviation with signs and example', 1.5], ['(b) Definition', 1], ['(b) Reason', 1]],
  d: 2, c: 'understanding', t: [4, 5],
}));

// ---------------------------------------------------------------- t05 azeotropes and fractional distillation
add('azeotrope-mcq', mcq({
  stem: 'A pair of liquids shows a large positive deviation from Raoult’s law. Its azeotrope will:',
  right: 'boil at a lower temperature than either pure liquid',
  wrong: ['boil at a higher temperature than either pure liquid', 'boil between the two boiling points', 'separate completely on fractional distillation'],
  sol: 'Positive deviation raises the vapour pressure, giving a minimum-boiling azeotrope — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('hcl-azeo-mcq', mcq({
  stem: 'Dilute hydrochloric acid (5% HCl) is boiled in an open flask for a long time. The acid left in the flask approaches about 20% HCl because:',
  right: 'HCl and water form a maximum-boiling azeotrope of about that composition',
  wrong: ['HCl and water form a minimum-boiling azeotrope', 'HCl is less volatile than water at all compositions', 'water and HCl form an ideal solution'],
  sol: 'Water boils away first and the residue moves to the maximum-boiling azeotrope — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('azeo-def-mcq', mcq({
  stem: 'Rectified spirit (about 95% ethanol in water) is a constant-boiling mixture. Which statement about such an azeotropic mixture is correct?',
  right: 'Its liquid and vapour have the same composition at the boiling point',
  wrong: ['It always obeys Raoult’s law', 'Its boiling point changes during distillation', 'It can be separated by fractional distillation'],
  sol: 'Equal compositions of liquid and vapour are why the mixture distils unchanged — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('graph-mcq', mcq({
  stem: 'On a boiling point–composition diagram for a pair of liquids, the liquid and vapour curves touch at a minimum in the middle of the diagram. This shows:',
  right: 'a minimum-boiling azeotrope formed by a large positive deviation',
  wrong: ['a maximum-boiling azeotrope formed by a large negative deviation', 'an ideal solution', 'that the liquids are immiscible'],
  sol: 'A minimum in boiling point corresponds to a maximum in vapour pressure, i.e. positive deviation — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('azeo-fill', fill({
  stem: 'A liquid mixture that boils at a constant temperature and distils without any change in composition is called an ___.',
  acc: [['azeotrope', 'azeotropic mixture']],
  sol: 'An **azeotrope** (constant-boiling mixture).',
  d: 1, c: 'recall', t: [5],
}));
add('azeo-ar', ar({
  a: 'Pure ethanol can be obtained by fractional distillation of a mixture of ethanol and water.',
  r: 'Ethanol and water form a minimum-boiling azeotrope.',
  key: 'd',
  sol: 'A is false — the azeotrope (about 95% ethanol) distils over and pure ethanol is not obtained; R is true — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('azeo-short', short({
  marks: 2,
  stem: 'Rectified spirit contains about 95% ethanol. Why can it not be converted into pure ethanol by fractional distillation? Name the type of azeotrope involved.',
  model: 'Ethanol and water show large positive deviation and form a minimum-boiling azeotrope at about 95% ethanol. At this composition the vapour has the same composition as the liquid, so distillation cannot change it any further.',
  sol: 'Minimum-boiling azeotrope; same composition of liquid and vapour.',
  scheme: [['Minimum-boiling azeotrope', 1], ['Liquid and vapour of the same composition', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('azeo-short3', short({
  marks: 3,
  stem: 'Distinguish between minimum-boiling and maximum-boiling azeotropes, stating the kind of deviation that produces each and one example of each.',
  model: 'A minimum-boiling azeotrope boils at a lower temperature than either component; it arises from large positive deviation (higher vapour pressure), e.g. ethanol + water (about 95% ethanol). A maximum-boiling azeotrope boils at a higher temperature than either component; it arises from large negative deviation (lower vapour pressure), e.g. nitric acid + water (about 68% HNO₃).',
  sol: 'Boiling behaviour, deviation, example.',
  scheme: [['Minimum-boiling: positive deviation, example', 1.5], ['Maximum-boiling: negative deviation, example', 1.5]],
  d: 2, c: 'understanding', t: [5],
}));
add('distil-short3', short({
  marks: 3,
  stem: 'Predict what collects as distillate and what remains in the flask when each mixture is fractionally distilled, giving reasons: (a) 30% (by volume) ethanol in water; (b) 10% (by mass) hydrochloric acid.',
  model: '(a) Ethanol–water forms a minimum-boiling azeotrope (about 95% ethanol), the lowest-boiling mixture possible, so the azeotrope distils over and water remains in the flask. (b) HCl–water forms a maximum-boiling azeotrope (about 20% HCl). Since 10% is below this, water (lower boiling) distils over first, and the residue becomes richer in HCl until it reaches the azeotrope, which then distils unchanged.',
  sol: '(a) azeotrope distils, water left; (b) water distils, residue → 20% HCl.',
  scheme: [['(a) Distillate and residue', 1], ['(b) Distillate and residue', 1], ['Reasons based on azeotrope type', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('azeo-long', long({
  stem: '(a) Draw a labelled boiling point–composition diagram for a pair of liquids that forms a maximum-boiling azeotrope, and explain what it shows. [2]\n\n(b) Nitric acid and water form a maximum-boiling azeotrope at about 68% HNO₃. Predict what happens when (i) 40% nitric acid and (ii) 80% nitric acid are fractionally distilled. Explain your answers. [3]',
  model: '(a) The diagram plots boiling temperature against composition. The liquid (lower) and vapour (upper) curves rise from the boiling points of the pure liquids and meet at a maximum at the azeotropic composition; there liquid and vapour have the same composition. (b) (i) 40% is on the water-rich side of the azeotrope. The vapour is richer in water, so water distils over and the residue becomes more concentrated in acid until it reaches about 68% HNO₃, which then distils unchanged. (ii) 80% is on the acid-rich side; here the vapour is richer in HNO₃, so nitric acid distils over first and the residue becomes more dilute, again approaching 68%. In neither case can both pure components be obtained.',
  sol: 'Diagram; residue tends to the azeotrope from both sides.',
  scheme: [['(a) Labelled diagram with maximum', 1], ['(a) Explanation', 1], ['(b)(i) Water distils; residue → 68%', 1.5], ['(b)(ii) HNO₃ distils; residue → 68%', 1.5]],
  d: 4, c: 'analysis', t: [5],
}));
