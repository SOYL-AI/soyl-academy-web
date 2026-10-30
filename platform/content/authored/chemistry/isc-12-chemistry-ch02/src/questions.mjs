// ISC 12 Chemistry ch02 Colligative Properties — question bank (ISC style). MCQ keys are placed by the builder
// (balanced); AR keys planned: a b d c a. Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 relative lowering of vapour pressure
add('rlvp-mcq', mcq({
  stem: 'The relative lowering of vapour pressure of an aqueous solution of a non-volatile solute is 0.010. The mole fraction of water in the solution is:',
  right: '0.99',
  wrong: ['0.010', '0.90', '1.01'],
  sol: 'Relative lowering = x(solute) = 0.010, so x(water) = 1 − 0.010 = 0.99 — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('colligative-mcq', mcq({
  stem: 'Which pair of 0.1 mol kg⁻¹ aqueous solutions would show the same depression of freezing point?',
  right: 'Glucose and urea',
  wrong: ['Glucose and sodium chloride', 'Urea and calcium chloride', 'Sodium chloride and potassium sulfate'],
  sol: 'Both are non-electrolytes giving the same number of particles — option (@K). The salts dissociate into different numbers of ions.',
  d: 2, c: 'understanding', t: [1, 3],
}));
add('vp-order-mcq', mcq({
  stem: 'Each solute below is dissolved (0.1 mol) in 1 kg of water. Which solution has the highest vapour pressure? (Assume complete dissociation of salts.)',
  right: 'Glucose',
  wrong: ['Sodium chloride', 'Calcium chloride', 'Aluminium chloride'],
  sol: 'Glucose gives the fewest particles, so it lowers the vapour pressure least — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('rlvp-ar', ar({
  a: 'Relative lowering of vapour pressure is a colligative property.',
  r: 'Relative lowering of vapour pressure equals the mole fraction of the solute, which depends only on the number of solute particles.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('colligative-tf', tf({
  stem: 'The lowering of vapour pressure caused by a 0.1 m solution of NaCl is about twice that caused by a 0.1 m solution of glucose in the same solvent.',
  key: 't',
  sol: 'True. NaCl gives about two moles of ions per mole, doubling the number of solute particles.',
  d: 2, c: 'application', t: [1],
}));
add('rlvp-num', num({
  marks: 2,
  stem: r`The vapour pressure of pure water at $300\ \text{K}$ is $3.60\ \text{kPa}$. Calculate the vapour pressure of a solution of $9.0\ \text{g}$ of glucose ($M = 180$) in $90\ \text{g}$ of water at this temperature.`,
  value: 3.56, tol: 0.01, unit: 'kPa',
  sol: r`$n_2 = 9.0 \div 180 = 0.050$; $n_1 = 90 \div 18 = 5.0$; $x_2 = 0.050 \div 5.05 = 0.0099$. $p = p^\circ(1 - x_2) = 3.60 \times 0.9901 = 3.56$, so $3.56\ \text{kPa}$.`,
  scheme: [['Mole fraction of glucose 0.0099', 1], ['p = 3.56 kPa', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(3.6 * (1 - 0.05 / 5.05), 3.564, 0.002) || 'rlvp');
add('vp-short', short({
  marks: 2,
  stem: 'Explain why the vapour pressure of water is lowered when a non-volatile solute such as sugar is dissolved in it, and how the relative lowering is related to the composition of the solution.',
  model: 'Solute particles occupy part of the surface, so fewer water molecules escape per unit time and the vapour pressure falls. By Raoult’s law p = p°x₁, so (p° − p)/p° = x₂: the relative lowering equals the mole fraction of the solute.',
  sol: 'Fewer surface solvent molecules; relative lowering = x₂.',
  scheme: [['Reason for lowering', 1], ['Relative lowering = mole fraction of solute', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('colligative-short', short({
  marks: 2,
  stem: 'Why are colligative properties used to find molar masses only for dilute solutions of non-volatile, non-electrolyte solutes?',
  model: 'The equations assume a dilute solution (n₂ ≪ n₁, ideal behaviour) and a solute that does not contribute to the vapour. Electrolytes dissociate and some solutes associate, changing the number of particles, so the molar mass calculated would be abnormal unless corrected with the van’t Hoff factor.',
  sol: 'Assumptions of the equations.',
  scheme: [['Dilute, non-volatile assumption', 1], ['Dissociation/association gives abnormal values', 1]],
  d: 2, c: 'understanding', t: [1, 5],
}));
add('rlvp-short3', short({
  marks: 3,
  stem: 'When 5.0 g of a non-volatile solute is dissolved in 100 g of water, the vapour pressure falls from 17.50 mm Hg to 17.325 mm Hg. Calculate the molar mass of the solute.',
  model: r`Relative lowering $= (17.50 - 17.325) \div 17.50 = 0.010$. For a dilute solution $\dfrac{\Delta p}{p^\circ} = \dfrac{w_2M_1}{M_2w_1}$, so $M_2 = \dfrac{5.0 \times 18}{0.010 \times 100} = 90\ \text{g mol}^{-1}$.`,
  sol: '90 g/mol.',
  scheme: [['Relative lowering 0.010', 1], ['Correct expression', 1], ['M₂ = 90 g/mol', 1]],
  d: 2, c: 'application', t: [1],
}));
add('rlvp-long', long({
  stem: '(a) What are colligative properties? Show that the relative lowering of vapour pressure of a solution of a non-volatile solute equals the mole fraction of the solute. [2]\n\n(b) A solution contains 4.0% (by mass) of urea (M = 60) in water. Calculate the vapour pressure of this solution at 373 K, where pure water has a vapour pressure of 1.013 bar. [3]',
  model: r`(a) Properties of dilute solutions of non-volatile solutes that depend only on the number of solute particles. By Raoult’s law $p = p^\circ x_1 = p^\circ(1 - x_2)$, so $\dfrac{p^\circ - p}{p^\circ} = x_2$.

(b) In $100\ \text{g}$: urea $4.0\ \text{g} = 4.0 \div 60 = 0.0667\ \text{mol}$; water $96\ \text{g} = 96 \div 18 = 5.333\ \text{mol}$. $x_2 = 0.0667 \div 5.400 = 0.0123$. $p = 1.013 \times (1 - 0.0123) = 1.0005\ \text{bar}$, i.e. about $1.000\ \text{bar}$.`,
  sol: 'Definition and proof; p ≈ 1.000 bar.',
  scheme: [['(a) Definition', 1], ['(a) Proof from Raoult’s law', 1], ['(b) Moles', 1], ['(b) Mole fraction', 1], ['(b) Vapour pressure', 1]],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 elevation of boiling point
add('kb-mcq', mcq({
  stem: 'The ebullioscopic constant Kb of a liquid depends on:',
  right: 'the nature of the solvent only',
  wrong: ['the nature of the solute only', 'the concentration of the solution', 'the external pressure only'],
  sol: 'Kb = R(Tb°)²M₁ ÷ (1000 ΔvapH) contains only solvent properties — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('tb-calc-mcq', mcq({
  stem: 'A 0.25 mol kg⁻¹ aqueous solution of sucrose is boiled at 1 atm. At what temperature does it boil? (Kb = 0.52 K kg mol⁻¹; water boils at 373.15 K)',
  right: '373.28 K',
  wrong: ['373.02 K', '373.67 K', '373.15 K'],
  sol: 'ΔTb = 0.52 × 0.25 = 0.13 K; 373.15 + 0.13 = 373.28 K — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('kb-value-mcq', mcq({
  stem: 'A 1.0 mol kg⁻¹ solution of a non-electrolyte in a solvent boils 2.53 K above the solvent’s normal boiling point. The solvent is most likely:',
  right: 'benzene',
  wrong: ['water', 'camphor', 'ethanol, with Kb = 0.52'],
  sol: 'ΔTb = Kb for m = 1; Kb = 2.53 K kg mol⁻¹ is the value for benzene — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('tb-order-mcq', mcq({
  stem: 'Which 0.1 mol kg⁻¹ aqueous solution has the highest boiling point? (Assume complete dissociation.)',
  right: 'Aluminium sulfate, Al₂(SO₄)₃',
  wrong: ['Potassium sulfate, K₂SO₄', 'Sodium chloride', 'Urea'],
  sol: 'Al₂(SO₄)₃ gives 5 ions (i = 5), the most particles — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('derive-mcq', mcq({
  stem: 'In deriving ΔTb = Kb m, it is assumed that ΔTb is proportional to the lowering of vapour pressure. This is justified because:',
  right: 'near the boiling point the vapour pressure curves of solvent and solution are nearly parallel straight lines',
  wrong: ['the solute is volatile', 'the solution is concentrated', 'the vapour pressure of a solution is independent of temperature'],
  sol: 'For small changes the curves are almost straight and parallel, so the temperature gap is proportional to the pressure gap — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('tb-ar', ar({
  a: 'Sea water boils at a higher temperature than pure water at the same pressure.',
  r: 'Sea water has a higher density than pure water.',
  key: 'b',
  sol: 'Both are true, but density is not the reason; dissolved salts lower the vapour pressure, raising the boiling point — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('ebullio-fill', fill({
  stem: 'The molal elevation constant, Kb, is also called the ___ constant.',
  acc: [['ebullioscopic']],
  sol: 'The **ebullioscopic** constant.',
  d: 1, c: 'recall', t: [2],
}));
add('tb-num', num({
  stem: r`What is the elevation of boiling point, in K, of a solution of $6.84\ \text{g}$ of sucrose ($M = 342$) in $200\ \text{g}$ of water? ($K_\text{b} = 0.52\ \text{K kg mol}^{-1}$)`,
  value: 0.052, tol: 0.0005, unit: 'K',
  sol: r`$m = (6.84 \div 342) \div 0.200 = 0.10$; $\Delta T_\text{b} = 0.52 \times 0.10 = 0.052$, so $0.052\ \text{K}$.`,
  scheme: [['0.052 K', 1]],
  d: 1, c: 'application', t: [2],
}), () => near(0.52 * (6.84 / 342 / 0.2), 0.052) || 'tb');
add('kb-num', num({
  marks: 2,
  stem: r`$1.28\ \text{g}$ of naphthalene ($M = 128$) dissolved in $50\ \text{g}$ of a solvent raises its boiling point by $0.48\ \text{K}$. Calculate $K_\text{b}$ of the solvent.`,
  value: 2.4, tol: 0.01, unit: 'K kg/mol',
  sol: r`$m = (1.28 \div 128) \div 0.050 = 0.20\ \text{mol kg}^{-1}$; $K_\text{b} = \Delta T_\text{b} \div m = 0.48 \div 0.20 = 2.4\ \text{K kg mol}^{-1}$.`,
  scheme: [['Molality 0.20', 1], ['Kb = 2.4', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(0.48 / (1.28 / 128 / 0.05), 2.4) || 'kb');
add('cooker-short', short({
  marks: 2,
  stem: 'Two identical pans, one of pure water and one of water with a spoonful of common salt, are heated at the same place. Which boils at the higher temperature? Explain.',
  model: 'The salted water boils at the higher temperature. The dissolved ions lower the vapour pressure of the water, so the solution must be heated further before its vapour pressure equals atmospheric pressure (elevation of boiling point).',
  sol: 'Salt water; lower vapour pressure.',
  scheme: [['Salt water boils higher', 1], ['Lower vapour pressure reaches atmospheric pressure later', 1]],
  d: 2, c: 'application', t: [2],
}));
add('kb-short', short({
  marks: 2,
  stem: 'Calculate the boiling point of a solution of 18 g of glucose (M = 180) in 500 g of water at 1 atm. (Kb = 0.52 K kg mol⁻¹; water boils at 373.15 K)',
  model: r`$m = (18 \div 180) \div 0.500 = 0.20\ \text{mol kg}^{-1}$; $\Delta T_\text{b} = 0.52 \times 0.20 = 0.104\ \text{K}$; $T_\text{b} = 373.15 + 0.104 = 373.25\ \text{K}$.`,
  sol: '373.25 K.',
  scheme: [['Molality and ΔTb', 1], ['Boiling point 373.25 K', 1]],
  d: 2, c: 'application', t: [2],
}));
add('derive-tb-short3', short({
  marks: 3,
  stem: 'Derive the relation ΔTb = Kb m for the elevation of boiling point of a dilute solution of a non-volatile solute.',
  model: r`A liquid boils when its vapour pressure equals the external pressure. The solution has a lower vapour pressure, so it boils at a higher temperature. Near the boiling point the vapour pressure–temperature curves of solvent and solution are almost parallel straight lines, so $\Delta T_\text{b} \propto \Delta p$. As $p^\circ$ is constant, $\Delta T_\text{b} \propto \Delta p/p^\circ = x_2$ (Raoult’s law). For a dilute solution $x_2 \approx n_2/n_1 = mM_1/1000$, so $\Delta T_\text{b} \propto m$, i.e. $\Delta T_\text{b} = K_\text{b}m$, where $K_\text{b}$, the ebullioscopic constant, depends only on the solvent.`,
  sol: 'Parallel curves; x₂ ∝ m.',
  scheme: [['Vapour pressure argument; ΔTb ∝ Δp', 1], ['Δp/p° = x₂ ≈ n₂/n₁', 1], ['∝ m; ΔTb = Kb m with Kb named', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('tb-long', long({
  stem: '(a) Using a vapour pressure–temperature diagram, explain why a solution of a non-volatile solute boils at a higher temperature than the pure solvent, and show that ΔTb = Kb m. [3]\n\n(b) 2.5 g of a non-volatile non-electrolyte dissolved in 75 g of benzene raises the boiling point by 0.66 K. Calculate the molar mass of the solute. (Kb of benzene = 2.53 K kg mol⁻¹) [2]',
  model: r`(a) The solution’s vapour pressure curve lies below that of the pure solvent, so it meets the line of atmospheric pressure at a higher temperature. Near $T_\text{b}^\circ$ the curves are nearly parallel straight lines, so $\Delta T_\text{b} \propto \Delta p$; with $p^\circ$ constant, $\Delta T_\text{b} \propto \Delta p/p^\circ = x_2 \approx n_2/n_1 = mM_1/1000$, giving $\Delta T_\text{b} = K_\text{b}m$.

(b) $M_2 = \dfrac{1000K_\text{b}w_2}{\Delta T_\text{b}w_1} = \dfrac{1000 \times 2.53 \times 2.5}{0.66 \times 75} = \dfrac{6325}{49.5} = 127.8\ \text{g mol}^{-1}$.`,
  sol: 'Diagram argument and derivation; about 128 g/mol.',
  scheme: [['(a) Diagram and explanation', 1], ['(a) Derivation steps', 2], ['(b) Expression', 1], ['(b) 128 g/mol', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 depression of freezing point
add('lowest-fp-mcq', mcq({
  stem: 'Four aqueous solutions, each 0.05 mol kg⁻¹, are cooled slowly side by side. Which one starts to freeze first? (Assume complete dissociation of salts.)',
  right: 'Urea',
  wrong: ['Potassium chloride', 'Magnesium chloride', 'Sodium sulfate'],
  sol: 'The first to freeze has the highest freezing point, i.e. the fewest particles: urea (i = 1) — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('kf-calc-mcq', mcq({
  stem: 'A 0.50 mol kg⁻¹ aqueous solution of urea freezes at (Kf = 1.86 K kg mol⁻¹):',
  right: '−0.93 °C',
  wrong: ['−1.86 °C', '−0.47 °C', '+0.93 °C'],
  sol: 'ΔTf = 1.86 × 0.50 = 0.93 K, so Tf = −0.93 °C — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('camphor-mcq', mcq({
  stem: 'Camphor is often used as the solvent when molar masses are found by freezing point depression because:',
  right: 'its large cryoscopic constant gives a large, easily measured depression',
  wrong: ['it is volatile', 'it has a very small cryoscopic constant', 'it reacts with most solutes'],
  sol: 'Kf of camphor is about 37.7 K kg mol⁻¹, so even small molalities give depressions of several kelvin — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('road-mcq', mcq({
  stem: 'In a snowy town, workers spread common salt on icy roads. The ice melts because:',
  right: 'the salt solution formed has a freezing point below 0 °C',
  wrong: ['salt reacts exothermically with ice', 'salt raises the freezing point of water', 'salt increases the vapour pressure of water'],
  sol: 'Dissolved ions depress the freezing point, so ice in contact with brine melts at temperatures below 0 °C — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('kf-ar', ar({
  a: 'The cryoscopic constant of a solvent depends on the solute dissolved in it.',
  r: 'Kf = R(Tf°)²M₁ ÷ (1000 ΔfusH), where all quantities refer to the solvent.',
  key: 'd',
  sol: 'A is false (Kf depends only on the solvent); R is true and shows why — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('tf-num', num({
  marks: 2,
  stem: r`$0.90\ \text{g}$ of a non-electrolyte dissolved in $50\ \text{g}$ of water lowers the freezing point by $0.186\ \text{K}$. Calculate the molar mass of the solute. ($K_\text{f} = 1.86\ \text{K kg mol}^{-1}$)`,
  value: 180, tol: 0.5, unit: 'g/mol',
  sol: r`$M_2 = \dfrac{1000K_\text{f}w_2}{\Delta T_\text{f}w_1} = \dfrac{1000 \times 1.86 \times 0.90}{0.186 \times 50} = \dfrac{1674}{9.3} = 180$, so $180\ \text{g mol}^{-1}$.`,
  scheme: [['Expression and substitution', 1], ['180 g/mol', 1]],
  d: 2, c: 'application', t: [3],
}), () => near((1000 * 1.86 * 0.9) / (0.186 * 50), 180) || 'tf');
add('road-short', short({
  marks: 2,
  stem: 'Explain why spreading salt on icy roads melts the ice, and why calcium chloride is more effective than the same number of moles of sodium chloride.',
  model: 'Salt dissolves in the thin film of water on the ice, forming a solution whose freezing point is below 0 °C, so ice in contact with it melts. CaCl₂ gives three ions per formula unit (i = 3) while NaCl gives two, so it produces a larger depression of freezing point per mole.',
  sol: 'Freezing point depression; more ions.',
  scheme: [['Depression of freezing point melts ice', 1], ['CaCl₂ gives 3 ions vs 2', 1]],
  d: 2, c: 'application', t: [3, 5],
}));
add('derive-tf-short3', short({
  marks: 3,
  stem: 'With the help of a vapour pressure–temperature diagram, explain why a solution freezes at a lower temperature than the pure solvent and derive ΔTf = Kf m.',
  model: r`At the freezing point the solid and liquid solvent have equal vapour pressures. A solution has a lower vapour pressure than the pure liquid, so its curve meets the steep solid-solvent curve at a lower temperature: the freezing point is depressed. Near $T^\circ_\text{f}$ the curves are nearly straight, so $\Delta T_\text{f} \propto \Delta p \propto \Delta p/p^\circ = x_2 \approx n_2/n_1 = mM_1/1000$. Hence $\Delta T_\text{f} = K_\text{f}m$, where $K_\text{f}$ is the cryoscopic constant of the solvent.`,
  sol: 'Equal vapour pressures; proportionality to m.',
  scheme: [['Condition at freezing point and diagram', 1], ['Lower curve meets solid curve at lower T', 1], ['Derivation to ΔTf = Kf m', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('tf-short3', short({
  marks: 3,
  stem: 'A transport company wants the radiator coolant of its trucks to stay liquid down to −5.58 °C. (a) What mass of ethylene glycol (M = 62) must be added to each 1.0 kg of water? (Kf = 1.86 K kg mol⁻¹) (b) Why is ethylene glycol preferred to methanol for this purpose?',
  model: r`(a) $\Delta T_\text{f} = 5.58\ \text{K}$; $m = 5.58 \div 1.86 = 3.0\ \text{mol kg}^{-1}$; mass $= 3.0 \times 62 = 186\ \text{g}$ per kg of water.

(b) Methanol is volatile and evaporates from a hot engine, while ethylene glycol is practically non-volatile (high boiling point), so it stays in the coolant and also raises its boiling point.`,
  sol: '186 g; glycol non-volatile.',
  scheme: [['Molality 3.0', 1], ['Mass 186 g', 1], ['(b) Non-volatile glycol', 1]],
  d: 3, c: 'application', t: [3],
}));
add('tf-long', long({
  stem: '(a) Explain, using the vapour pressures of the solid and liquid solvent, why the freezing point of a solvent is lowered when a non-volatile solute is dissolved in it. [2]\n\n(b) In the Rast method, 0.30 g of an organic compound is mixed with 15 g of camphor. The melting point of the mixture is 4.0 K lower than that of pure camphor (Kf = 37.7 K kg mol⁻¹). Calculate the molar mass of the compound, and state why camphor is chosen. [3]',
  model: r`(a) At the freezing point the solid and the liquid solvent have the same vapour pressure. A dissolved solute lowers the vapour pressure of the liquid, so the solid and the solution reach equal vapour pressure only at a lower temperature.

(b) $M_2 = \dfrac{1000K_\text{f}w_2}{\Delta T_\text{f}w_1} = \dfrac{1000 \times 37.7 \times 0.30}{4.0 \times 15} = \dfrac{11310}{60} = 188.5\ \text{g mol}^{-1}$. Camphor has a very large $K_\text{f}$, so even small amounts of solute give large, easily measured depressions.`,
  sol: 'Equal vapour pressures; 188.5 g/mol; large Kf.',
  scheme: [['(a) Equal vapour pressure condition', 1], ['(a) Lower curve, lower temperature', 1], ['(b) Substitution', 1], ['(b) 188.5 g/mol', 1], ['(b) Reason for camphor', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 osmosis and osmotic pressure
add('hypertonic-mcq', mcq({
  stem: 'Dry raisins left in water overnight swell up. This happens because:',
  right: 'water enters the raisins by osmosis, since the liquid inside them is more concentrated',
  wrong: ['sugar diffuses from the water into the raisins', 'the raisins are hypotonic to the water', 'water is forced in by reverse osmosis'],
  sol: 'The raisin contents are hypertonic to water, so water flows in through the skin, which acts as a semipermeable membrane — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('osmotic-law-mcq', mcq({
  stem: 'A solution has an osmotic pressure of 2.40 atm at 300 K. Assuming no change in concentration, its osmotic pressure at 330 K is:',
  right: '2.64 atm',
  wrong: ['2.18 atm', '2.40 atm', '26.4 atm'],
  sol: 'Charles–van’t Hoff law: π ∝ T, so π = 2.40 × 330 ÷ 300 = 2.64 atm — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('isotonic-mcq', mcq({
  stem: 'Which solution is isotonic with 0.10 M sodium chloride at the same temperature? (Assume NaCl is fully dissociated.)',
  right: '0.20 M glucose',
  wrong: ['0.10 M glucose', '0.10 M calcium chloride', '0.05 M glucose'],
  sol: '0.10 M NaCl gives 0.20 M of particles; 0.20 M glucose gives the same — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('membrane-mcq', mcq({
  stem: 'To demonstrate osmosis of a sugar solution in the laboratory, which material can act as the semipermeable membrane?',
  right: 'A film of copper ferrocyanide deposited in a porous pot',
  wrong: ['A sheet of filter paper', 'A sheet of glass', 'A cotton cloth'],
  sol: 'Copper ferrocyanide lets water through but not solute molecules — option (@K). Filter paper and cloth let solutes through.',
  d: 1, c: 'recall', t: [4],
}));
add('ro-mcq', mcq({
  stem: 'In a reverse osmosis plant, sea water is purified by:',
  right: 'applying a pressure greater than its osmotic pressure to the sea-water side of the membrane',
  wrong: ['applying a pressure smaller than its osmotic pressure to the sea-water side', 'heating the sea water above its boiling point', 'adding a solute to the fresh-water side'],
  sol: 'Only a pressure exceeding π reverses the natural flow of water — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('diffusion-mcq', mcq({
  stem: 'A drop of ink spreading through a beaker of water is compared with water entering a raisin through its skin. Which statement correctly distinguishes osmosis from diffusion?',
  right: 'In osmosis only solvent molecules pass through a semipermeable membrane',
  wrong: ['In osmosis solute particles move from higher to lower concentration', 'Diffusion requires a semipermeable membrane', 'Osmosis cannot be stopped by applying pressure'],
  sol: 'Osmosis is the movement of solvent alone through a semipermeable membrane — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('van-avogadro-mcq', mcq({
  stem: '0.1 M solutions of glucose and urea at 300 K have equal osmotic pressures. This illustrates the:',
  right: 'Avogadro–van’t Hoff law',
  wrong: ['Boyle–van’t Hoff law', 'Charles–van’t Hoff law', 'Henry’s law'],
  sol: 'Equimolar solutions at the same temperature have equal osmotic pressures — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('osmosis-tf', tf({
  stem: 'During osmosis, solute molecules pass through the semipermeable membrane into the more dilute solution.',
  key: 'f',
  sol: 'False. Only solvent molecules pass, from the dilute side into the more concentrated solution.',
  d: 1, c: 'understanding', t: [4],
}));
add('hypo-fill', fill({
  stem: 'A solution whose osmotic pressure is lower than that of the fluid inside a cell is said to be ___ with respect to the cell.',
  acc: [['hypotonic']],
  sol: '**Hypotonic**; the cell swells in it.',
  d: 1, c: 'recall', t: [4],
}));
add('law-match', match({
  stem: 'Match each statement about the osmotic pressure of dilute solutions with the van’t Hoff law or the process it describes.',
  pairs: [
    ['π ∝ C at constant temperature', 'Boyle–van’t Hoff law'],
    ['π ∝ T at constant concentration', 'Charles–van’t Hoff law'],
    ['Equimolar solutions have equal π at the same T', 'Avogadro–van’t Hoff law'],
    ['Pressure greater than π drives solvent out of a solution', 'Reverse osmosis'],
  ],
  order: [2, 0, 3, 1],
  sol: 'π ∝ C → Boyle; π ∝ T → Charles; equal π → Avogadro; pressure above π → reverse osmosis.',
  d: 1, c: 'recall', t: [4],
}));
add('ro-ar', ar({
  a: 'Fresh water can be obtained from sea water by reverse osmosis.',
  r: 'In reverse osmosis a pressure smaller than the osmotic pressure is applied to sea water.',
  key: 'c',
  sol: 'A is true; R is false — the applied pressure must be greater than the osmotic pressure — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('osm-num', num({
  marks: 2,
  stem: r`Calculate the osmotic pressure, in atm, of a $0.050\ \text{M}$ aqueous solution of sucrose at $27\ ^\circ\text{C}$. ($R = 0.0821\ \text{L atm K}^{-1}\ \text{mol}^{-1}$)`,
  value: 1.23, tol: 0.01, unit: 'atm',
  sol: r`$T = 300\ \text{K}$; osmotic pressure $= CRT = 0.050 \times 0.0821 \times 300 = 1.23$, so $1.23\ \text{atm}$.`,
  scheme: [['T in kelvin and substitution', 1], ['1.23 atm', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(0.05 * 0.0821 * 300, 1.2315, 0.003) || 'osm');
add('osm-mm-num', num({
  stem: r`$5.0\ \text{g}$ of a synthetic polymer is dissolved to make $1.0\ \text{L}$ of solution at $300\ \text{K}$. Its osmotic pressure is $1.245 \times 10^{-3}\ \text{bar}$. What is the molar mass of the polymer, in g mol⁻¹? ($R = 0.083\ \text{L bar K}^{-1}\ \text{mol}^{-1}$)`,
  value: 100000, tol: 100, unit: 'g/mol',
  sol: r`$M_2 = \dfrac{w_2RT}{\pi V} = \dfrac{5.0 \times 0.083 \times 300}{1.245 \times 10^{-3} \times 1.0} = \dfrac{124.5}{0.001245} = 100000$, so $1.0 \times 10^{5}\ \text{g mol}^{-1}$.`,
  scheme: [['1.0 × 10⁵ g/mol', 1]],
  d: 2, c: 'application', t: [4],
}), () => near((5 * 0.083 * 300) / 1.245e-3, 100000) || 'polymer');
add('osmosis-short', short({
  marks: 2,
  stem: 'A crystal of potassium permanganate slowly colours a beaker of water, while water passes through a parchment membrane into a sugar solution. Give two differences between these two processes, diffusion and osmosis.',
  model: 'Diffusion needs no membrane, while osmosis takes place through a semipermeable membrane. In diffusion solute (and solvent) particles move from higher to lower concentration, while in osmosis only solvent molecules move, from the dilute solution into the concentrated one; osmosis can be stopped by applying pressure, diffusion cannot.',
  sol: 'Membrane; what moves.',
  scheme: [['Membrane needed or not', 1], ['What moves and direction', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('iso-short', short({
  marks: 2,
  stem: 'Why must fluids given intravenously be isotonic with blood? What would happen to red blood cells placed in 0.5% (w/v) NaCl solution?',
  model: 'Isotonic fluids have the same osmotic pressure as blood, so there is no net flow of water into or out of the blood cells and they keep their shape. 0.5% NaCl is hypotonic (blood is isotonic with about 0.9%), so water enters the cells by osmosis and they swell and may burst.',
  sol: 'No net flow; cells swell.',
  scheme: [['Isotonic: no net water flow', 1], ['0.5% is hypotonic: cells swell/burst', 1]],
  d: 2, c: 'application', t: [4],
}));
add('ro-short', short({
  marks: 2,
  stem: 'What is reverse osmosis? Give one practical use and state a property required of the membrane.',
  model: 'If a pressure greater than the osmotic pressure is applied to the solution side, solvent is forced out of the solution through the semipermeable membrane: reverse osmosis. It is used to desalinate sea water and in household water purifiers. The membrane must let water through but not dissolved ions, and withstand high pressure (e.g. cellulose acetate).',
  sol: 'Definition; desalination; membrane.',
  scheme: [['Definition', 1], ['Use and membrane property', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('vanthoff-laws-short3', short({
  marks: 3,
  stem: 'State the Boyle–van’t Hoff, Charles–van’t Hoff and Avogadro–van’t Hoff laws for dilute solutions and show how they combine to give π = CRT.',
  model: r`Boyle–van’t Hoff: at constant temperature, osmotic pressure is proportional to molar concentration, $\pi \propto C$. Charles–van’t Hoff: at constant concentration, $\pi \propto T$. Avogadro–van’t Hoff: equimolar solutions at the same temperature have equal osmotic pressures, so the proportionality constant is the same for all solutes. Combining, $\pi \propto CT$, i.e. $\pi = CRT$, and since $C = n/V$, $\pi V = nRT$, where $R$ has the value of the gas constant.`,
  sol: 'Three laws; combination.',
  scheme: [['Boyle–van’t Hoff and Charles–van’t Hoff laws', 1], ['Avogadro–van’t Hoff law', 1], ['Combination to π = CRT', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('osm-short3', short({
  marks: 3,
  stem: 'A solution of 0.60 g of a protein in 50 mL of water has an osmotic pressure of 3.32 × 10⁻³ bar at 300 K. (a) Calculate the molar mass of the protein (R = 0.083 L bar K⁻¹ mol⁻¹). (b) Why is osmotic pressure, rather than freezing point depression, used for this measurement?',
  model: r`(a) $M_2 = \dfrac{w_2RT}{\pi V} = \dfrac{0.60 \times 0.083 \times 300}{3.32 \times 10^{-3} \times 0.050} = \dfrac{14.94}{1.66 \times 10^{-4}} = 90000\ \text{g mol}^{-1}$.

(b) It is measured at room temperature, so the protein is not denatured, and it gives measurable values even for very dilute solutions; the freezing point depression here would be far too small to measure.`,
  sol: '9.0 × 10⁴ g/mol; reasons.',
  scheme: [['Substitution', 1], ['M = 9.0 × 10⁴ g/mol', 1], ['(b) Two reasons', 1]],
  d: 3, c: 'application', t: [4],
}));
add('osm-long', long({
  stem: '(a) Define osmotic pressure. Why is it called a colligative property? [2]\n\n(b) Calculate the osmotic pressure of a solution containing 1.8 g of glucose (M = 180) in 100 mL of solution at 27 °C (R = 0.0821 L atm K⁻¹ mol⁻¹). What concentration of NaCl, in g L⁻¹, would be isotonic with it at the same temperature, assuming complete dissociation? [3]',
  model: r`(a) The excess pressure that must be applied to a solution to prevent the passage of pure solvent into it through a semipermeable membrane. It depends only on the molar concentration of solute particles ($\pi = CRT$), not on their nature.

(b) $C = (1.8 \div 180) \div 0.100 = 0.10\ \text{M}$; osmotic pressure $= 0.10 \times 0.0821 \times 300 = 2.46\ \text{atm}$. NaCl gives two ions, so it must be $0.050\ \text{M}$: $0.050 \times 58.5 = 2.93\ \text{g L}^{-1}$.`,
  sol: 'Definition; 2.46 atm; 2.93 g/L NaCl.',
  scheme: [['(a) Definition', 1], ['(a) Colligative reason', 1], ['(b) Osmotic pressure 2.46 atm', 1.5], ['(b) 0.050 M NaCl = 2.93 g/L', 1.5]],
  d: 3, c: 'application', t: [4, 5],
}));

// ---------------------------------------------------------------- t05 abnormal molar masses, van't Hoff factor
add('vant-hoff-mcq', mcq({
  stem: 'For which solute in the stated solvent is the van’t Hoff factor less than 1?',
  right: 'Benzoic acid in benzene',
  wrong: ['Potassium chloride in water', 'Glucose in water', 'Calcium nitrate in water'],
  sol: 'Benzoic acid dimerises in benzene, reducing the number of particles — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('i-k3fe-mcq', mcq({
  stem: 'Assuming complete dissociation, the van’t Hoff factor of potassium ferricyanide, K₃[Fe(CN)₆], in water is:',
  right: '4',
  wrong: ['3', '10', '1'],
  sol: 'K₃[Fe(CN)₆] → 3K⁺ + [Fe(CN)₆]³⁻: four ions — option (@K). The complex ion does not break up (@3 counts every atom).',
  d: 2, c: 'application', t: [5],
}));
add('abnormal-mcq', mcq({
  stem: 'A salt AB (normal molar mass 100) gives an observed molar mass of 60 from freezing point data. Its degree of dissociation is about:',
  right: '0.67',
  wrong: ['0.40', '0.60', '1.67'],
  sol: 'i = 100 ÷ 60 = 1.67; α = (i − 1) ÷ (2 − 1) = 0.67 — option (@K). 1.67 is i itself (@3).',
  d: 3, c: 'application', t: [5],
}));
add('assoc-mcq', mcq({
  stem: 'If a carboxylic acid dimerises completely in benzene, its van’t Hoff factor is:',
  right: '0.5',
  wrong: ['2', '1', '0.25'],
  sol: 'i = 1 − α + α/2 with α = 1 gives 0.5 — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('vanthoff-tf', tf({
  stem: 'For a solute that dimerises completely, the van’t Hoff factor is 2.',
  key: 'f',
  sol: 'False. Dimerisation halves the number of particles, so i = 0.5.',
  d: 1, c: 'understanding', t: [5],
}));
add('i-match', match({
  stem: 'Match each solute (in the stated solvent) with its approximate van’t Hoff factor.',
  pairs: [
    ['Glucose in water', '1'],
    ['Potassium chloride in water (fully dissociated)', '2'],
    ['Potassium sulfate in water (fully dissociated)', '3'],
    ['Benzoic acid in benzene (fully dimerised)', '0.5'],
  ],
  order: [1, 2, 3, 0],
  sol: 'Glucose 1; KCl 2; K₂SO₄ 3; benzoic acid dimer 0.5.',
  d: 1, c: 'application', t: [5],
}));
add('dimer-ar', ar({
  a: 'The molar mass of benzoic acid determined from the depression of freezing point of its benzene solution is close to 244.',
  r: 'Benzoic acid molecules pair up in benzene through hydrogen bonds.',
  key: 'a',
  sol: 'Both are true and R explains A: dimerisation halves the number of particles, doubling the apparent molar mass (2 × 122) — option (a).',
  d: 3, c: 'analysis', t: [5],
}));
add('alpha-num', num({
  marks: 2,
  stem: r`A $0.20\ \text{mol kg}^{-1}$ aqueous solution of barium chloride freezes at $-0.93\ ^\circ\text{C}$. Calculate the degree of dissociation of the salt. ($K_\text{f} = 1.86\ \text{K kg mol}^{-1}$)`,
  value: 0.75, tol: 0.005, unit: null,
  sol: r`Calculated $\Delta T_\text{f} = 1.86 \times 0.20 = 0.372\ \text{K}$; $i = 0.93 \div 0.372 = 2.5$. $\ce{BaCl2 -> Ba^2+ + 2Cl-}$, $n = 3$: $\alpha = (2.5 - 1) \div 2 = 0.75$.`,
  scheme: [['i = 2.5', 1], ['α = 0.75', 1]],
  d: 3, c: 'application', t: [5],
}), () => near((0.93 / (1.86 * 0.2) - 1) / 2, 0.75) || 'alpha');
add('abnormal-short', short({
  marks: 2,
  stem: 'The molar mass of sodium chloride (58.5) found from the freezing point of its dilute aqueous solution is close to 30. Explain, and calculate the van’t Hoff factor.',
  model: 'NaCl dissociates into Na⁺ and Cl⁻, almost doubling the number of particles, so the depression is about twice the expected value and the calculated molar mass about half the true value. i = normal ÷ observed molar mass = 58.5 ÷ 30 ≈ 1.95.',
  sol: 'Dissociation; i ≈ 1.95.',
  scheme: [['Dissociation doubles particles', 1], ['i ≈ 1.95', 1]],
  d: 2, c: 'application', t: [5],
}));
add('dissoc-short3', short({
  marks: 3,
  stem: '1.0 g of magnesium chloride (M = 95) is dissolved in 100 g of water. The solution freezes at −0.50 °C. Calculate (a) the van’t Hoff factor and (b) the degree of dissociation of the salt. (Kf = 1.86 K kg mol⁻¹)',
  model: r`Molality (no dissociation) $= (1.0 \div 95) \div 0.100 = 0.1053\ \text{mol kg}^{-1}$; calculated $\Delta T_\text{f} = 1.86 \times 0.1053 = 0.196\ \text{K}$.

(a) $i = 0.50 \div 0.196 = 2.55$.

(b) $n = 3$: $\alpha = (2.55 - 1) \div 2 = 0.78$, about $78\%$.`,
  sol: 'i ≈ 2.55; α ≈ 0.78.',
  scheme: [['Calculated ΔTf', 1], ['(a) i ≈ 2.55', 1], ['(b) α ≈ 0.78', 1]],
  d: 3, c: 'application', t: [5],
}));
add('assoc-short3', short({
  marks: 3,
  stem: '0.60 g of ethanoic acid (M = 60) in 25 g of benzene lowers the freezing point by 1.10 K (Kf = 5.12 K kg mol⁻¹). Calculate the van’t Hoff factor and the percentage of the acid that is dimerised.',
  model: r`Normal molality $= (0.60 \div 60) \div 0.025 = 0.40$; calculated $\Delta T_\text{f} = 5.12 \times 0.40 = 2.048\ \text{K}$. $i = 1.10 \div 2.048 = 0.537$. For dimers $i = 1 - \alpha/2$, so $\alpha = 2(1 - 0.537) = 0.926$: about $93\%$ dimerised.`,
  sol: 'i ≈ 0.537; about 93%.',
  scheme: [['Calculated ΔTf', 1], ['i ≈ 0.537', 1], ['α ≈ 0.93 (93%)', 1]],
  d: 3, c: 'application', t: [5],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Arrange the following aqueous solutions in order of increasing boiling point, giving reasons: 0.10 m glucose, 0.10 m NaCl, 0.10 m BaCl₂, 0.05 m AlCl₃. (Assume complete dissociation.)',
  model: 'ΔTb depends on i × m: glucose 1 × 0.10 = 0.10; NaCl 2 × 0.10 = 0.20; BaCl₂ 3 × 0.10 = 0.30; AlCl₃ 4 × 0.05 = 0.20. Increasing boiling point: glucose < NaCl = AlCl₃ < BaCl₂. The more solute particles per kg of water, the higher the boiling point.',
  sol: 'Compare i × m.',
  scheme: [['Values of i × m', 1.5], ['Correct order, noting NaCl = AlCl₃', 1], ['Reason', 0.5]],
  d: 4, c: 'analysis', t: [2, 5],
}));
add('vanthoff-long', long({
  stem: '(a) Define the van’t Hoff factor and write expressions for it in terms of the degree of dissociation and the degree of association. [2]\n\n(b) A 0.10 mol kg⁻¹ aqueous solution of a weak monobasic acid HA freezes at −0.2046 °C. Calculate the degree of dissociation of the acid. (Kf = 1.86 K kg mol⁻¹) [1½]\n\n(c) Predict the freezing point of a 0.10 mol kg⁻¹ aqueous solution of K₄[Fe(CN)₆], assuming complete dissociation. [1½]',
  model: r`(a) $i$ = observed colligative property ÷ calculated value (= normal molar mass ÷ observed molar mass). Dissociation into $n$ ions: $i = 1 + (n-1)\alpha$. Association of $n$ molecules: $i = 1 - \alpha + \alpha/n$.

(b) Calculated $\Delta T_\text{f} = 1.86 \times 0.10 = 0.186\ \text{K}$; $i = 0.2046 \div 0.186 = 1.10$; $\ce{HA <=> H+ + A-}$, $n = 2$: $\alpha = 1.10 - 1 = 0.10$ (10%).

(c) $\ce{K4[Fe(CN)6] -> 4K+ + Fe(CN)6^4-}$: $i = 5$; $\Delta T_\text{f} = 5 \times 1.86 \times 0.10 = 0.93\ \text{K}$; freezing point $-0.93\ ^\circ\text{C}$.`,
  sol: 'Definitions; α = 0.10; −0.93 °C.',
  scheme: [['(a) Definition', 1], ['(a) Two expressions', 1], ['(b) i = 1.10 and α = 0.10', 1.5], ['(c) i = 5 and −0.93 °C', 1.5]],
  d: 3, c: 'application', t: [5],
}));
