// ISC 12 Chemistry ch04 Electrolytic Conductance, Electrolysis, Batteries and Corrosion — question bank (ISC style).
// MCQ keys are placed by the builder (balanced); AR keys planned: a c b d a c. Every numerical is re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 conductance, cell constant
add('cellconst-mcq', mcq({
  stem: 'A conductivity cell filled with 0.02 M KCl (κ = 0.00277 S cm⁻¹) shows a resistance of 500 Ω. Its cell constant is:',
  right: '1.385 cm⁻¹',
  wrong: ['0.00000554 cm⁻¹', '180.5 cm⁻¹', '0.277 cm⁻¹'],
  sol: 'G* = κ × R = 0.00277 × 500 = 1.385 cm⁻¹ — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('metal-mcq', mcq({
  stem: 'When the temperature is raised, the conductance of copper wire falls but that of a salt solution rises. The best explanation is:',
  right: 'lattice vibrations hinder electrons in the metal, while ions in solution move faster through a less viscous medium',
  wrong: ['copper loses electrons on heating while salts gain ions', 'both conduct by ions but in opposite directions', 'heating decomposes copper into ions'],
  sol: 'Metals conduct by electrons scattered more by vibrating ions; electrolytes conduct by ions whose mobility increases — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('unit-mcq', mcq({
  stem: 'The SI-derived unit of specific conductance used in most chemistry calculations is:',
  right: 'S cm⁻¹',
  wrong: ['S cm² mol⁻¹', 'Ω cm', 'cm⁻¹'],
  sol: 'κ = 1/ρ has unit (Ω cm)⁻¹ = S cm⁻¹ — option (@K); S cm² mol⁻¹ is the unit of molar conductance (@1).',
  d: 1, c: 'recall', t: [1],
}));
add('ac-mcq', mcq({
  stem: 'Alternating current is used to measure the resistance of an electrolyte solution in order to:',
  right: 'prevent electrolysis and polarisation at the electrodes',
  wrong: ['increase the conductance', 'heat the solution to a fixed temperature', 'measure the cell constant directly'],
  sol: 'With direct current, products would form at the electrodes and change the resistance — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('conductance-tf', tf({
  stem: 'Electrolytic conduction involves the transfer of matter, whereas metallic conduction does not.',
  key: 't',
  sol: 'True. Ions move through the solution and are discharged at the electrodes.',
  d: 1, c: 'understanding', t: [1],
}));
add('cellconst-fill', fill({
  stem: 'The ratio of the distance between the electrodes to their area of cross-section, l/A, is called the ___ of a conductivity cell.',
  acc: [['cell constant']],
  sol: 'The **cell constant**, in cm⁻¹.',
  d: 1, c: 'recall', t: [1],
}));
add('kappa-num', num({
  stem: r`A cell with cell constant $0.75\ \text{cm}^{-1}$ has a resistance of $1500\ \Omega$ when filled with a solution. What is its specific conductance, in units of $10^{-4}\ \text{S cm}^{-1}$?`,
  value: 5, tol: 0.02, unit: '× 10⁻⁴ S/cm',
  sol: r`$\kappa = G^*/R = 0.75 \div 1500 = 5.0 \times 10^{-4}\ \text{S cm}^{-1}$; in units of $10^{-4}$: $5.0 \times 10^{-4} \times 10^{4} = 5.0$.`,
  scheme: [['5.0', 1]],
  d: 1, c: 'application', t: [1],
}), () => near((0.75 / 1500) * 1e4, 5) || 'kappa');
add('metal-short', short({
  marks: 2,
  stem: 'Give two differences between metallic conductance and electrolytic conductance.',
  model: 'In metallic conductance, electrons carry the current and there is no chemical change or transfer of matter; in electrolytic conductance, ions carry the current, matter is transported and chemical changes occur at the electrodes. Metallic conductance decreases as temperature rises, whereas electrolytic conductance increases.',
  sol: 'Carriers/chemical change; temperature.',
  scheme: [['Carriers and chemical change', 1], ['Effect of temperature', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('cellconst-short', short({
  marks: 2,
  stem: 'Why is the cell constant of a conductivity cell determined using a standard KCl solution rather than by measuring l and A directly? How is κ of an unknown solution then found?',
  model: 'The electrodes are not perfect parallel plates and their exact separation and area are hard to measure, so G* is found by measuring R for a KCl solution of known κ (G* = κR). For an unknown solution, its resistance R is measured in the same cell and κ = G*/R.',
  sol: 'Calibration; κ = G*/R.',
  scheme: [['Reason for calibration with KCl', 1], ['κ = G*/R for the unknown', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 molar and equivalent conductance
add('dilution-mcq', mcq({
  stem: 'A 0.10 M solution of potassium nitrate is diluted to 0.01 M. Which statement is correct?',
  right: 'Specific conductance decreases but molar conductance increases',
  wrong: ['Both specific and molar conductance increase', 'Specific conductance increases but molar conductance decreases', 'Both remain unchanged'],
  sol: 'Fewer ions per cm³ lowers κ; ions from one mole move more freely, raising Λm — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('lambda-mcq', mcq({
  stem: 'A 0.005 M solution of a salt has κ = 6.0 × 10⁻⁴ S cm⁻¹. Its molar conductance is:',
  right: '120 S cm² mol⁻¹',
  wrong: ['0.12 S cm² mol⁻¹', '1.2 × 10⁵ S cm² mol⁻¹', '3.0 × 10⁻⁶ S cm² mol⁻¹'],
  sol: 'Λm = 1000κ/M = 1000 × 6.0 × 10⁻⁴ ÷ 0.005 = 120 S cm² mol⁻¹ — option (@K). Forgetting the factor 1000 gives (@1).',
  d: 2, c: 'application', t: [2],
}));
add('eq-mcq', mcq({
  stem: 'For aluminium sulfate, Al₂(SO₄)₃, the molar conductance is related to the equivalent conductance by:',
  right: 'Λm = 6Λeq',
  wrong: ['Λm = Λeq', 'Λm = 3Λeq', 'Λeq = 6Λm'],
  sol: 'One mole contains 6 equivalents (2 Al³⁺ × 3), so Λm = 6Λeq — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('weak-mcq', mcq({
  stem: 'The limiting molar conductance of ethanoic acid cannot be found by extrapolating a graph of Λm against √c because:',
  right: 'Λm of a weak electrolyte rises steeply at very low concentration, so no straight line can be drawn to c = 0',
  wrong: ['ethanoic acid does not conduct at all', 'its Λm decreases on dilution', 'its graph is a horizontal straight line'],
  sol: 'Dissociation increases sharply on dilution, so the curve is steep near c = 0 — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('dilution-ar', ar({
  a: 'The molar conductance of a strong electrolyte increases slightly on dilution.',
  r: 'On dilution, interionic attractions decrease and the ions move more freely.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('lambda-tf', tf({
  stem: 'The specific conductance of a 0.1 M KCl solution increases when it is diluted to 0.01 M.',
  key: 'f',
  sol: 'False. κ decreases on dilution because the number of ions per unit volume falls; molar conductance increases.',
  d: 1, c: 'understanding', t: [2],
}));
add('lambda-num', num({
  marks: 2,
  stem: r`The specific conductance of a $0.025\ \text{M}$ $\ce{MgSO4}$ solution is $3.0 \times 10^{-3}\ \text{S cm}^{-1}$. Calculate its equivalent conductance in S cm² eq⁻¹.`,
  value: 60, tol: 0.2, unit: 'S cm²/eq',
  sol: r`Normality $= 2 \times 0.025 = 0.050\ \text{N}$; $\Lambda_\text{eq} = 1000\kappa/N = 1000 \times 3.0 \times 10^{-3} \div 0.050 = 60$, so $60\ \text{S cm}^2\ \text{eq}^{-1}$.`,
  scheme: [['Normality 0.050 N', 1], ['60 S cm² eq⁻¹', 1]],
  d: 2, c: 'application', t: [2],
}), () => near((1000 * 3e-3) / 0.05, 60) || 'lambda-eq');
add('lambda-short', short({
  marks: 2,
  stem: 'Explain why, on dilution, the specific conductance of a solution decreases while its molar conductance increases.',
  model: 'Specific conductance is the conductance of 1 cm³ of solution; on dilution there are fewer ions in each cm³, so κ falls. Molar conductance refers to all the ions from one mole; on dilution these ions are farther apart, interionic attractions decrease (and weak electrolytes dissociate more), so they conduct better and Λm rises.',
  sol: 'Ions per cm³ vs ions per mole.',
  scheme: [['κ falls: fewer ions per cm³', 1], ['Λm rises: freer ions from one mole/more dissociation', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('conv-short3', short({
  marks: 3,
  stem: 'A conductivity cell of cell constant 1.2 cm⁻¹ has a resistance of 600 Ω when filled with 0.010 M K₂SO₄ solution. Calculate (a) the specific conductance, (b) the molar conductance and (c) the equivalent conductance.',
  model: r`(a) $\kappa = 1.2 \div 600 = 2.0 \times 10^{-3}\ \text{S cm}^{-1}$.

(b) $\Lambda_\text{m} = 1000 \times 2.0 \times 10^{-3} \div 0.010 = 200\ \text{S cm}^2\ \text{mol}^{-1}$.

(c) $N = 2 \times 0.010 = 0.020$; $\Lambda_\text{eq} = 1000 \times 2.0 \times 10^{-3} \div 0.020 = 100\ \text{S cm}^2\ \text{eq}^{-1}$.`,
  sol: '2.0 × 10⁻³ S/cm; 200; 100.',
  scheme: [['(a) κ', 1], ['(b) Λm', 1], ['(c) Λeq', 1]],
  d: 2, c: 'application', t: [1, 2],
}));
add('graph-short3', short({
  marks: 3,
  stem: 'Sketch the variation of molar conductance with √c for a strong electrolyte and a weak electrolyte. Explain the difference in shape, and state how Λ°m is obtained in each case.',
  model: 'For a strong electrolyte (e.g. KCl), Λm decreases slowly and linearly with √c (Λm = Λ°m − A√c) because it is fully ionised and only interionic attraction changes; Λ°m is obtained by extrapolating the line to c = 0. For a weak electrolyte (e.g. CH₃COOH), Λm is small at ordinary concentrations and rises very steeply at high dilution because the degree of dissociation increases sharply; the curve cannot be extrapolated, so Λ°m is found using Kohlrausch’s law.',
  sol: 'Linear vs steep curve; extrapolation vs Kohlrausch.',
  scheme: [['Sketch/shape for strong electrolyte with reason', 1], ['Shape for weak electrolyte with reason', 1], ['How Λ°m is obtained in each case', 1]],
  d: 3, c: 'understanding', t: [2, 3],
}));

// ---------------------------------------------------------------- t03 Kohlrausch's law
add('kohlrausch-mcq', mcq({
  stem: 'Using λ° values (S cm² mol⁻¹) Mg²⁺ = 106.0 and Cl⁻ = 76.3, the limiting molar conductance of MgCl₂ is:',
  right: '258.6 S cm² mol⁻¹',
  wrong: ['182.3 S cm² mol⁻¹', '288.6 S cm² mol⁻¹', '129.3 S cm² mol⁻¹'],
  sol: 'Λ° = 106.0 + 2 × 76.3 = 258.6 — option (@K). Forgetting the 2 gives (@1).',
  d: 2, c: 'application', t: [3],
}));
add('combo-mcq', mcq({
  stem: 'Which combination gives Λ°m of NH₄OH from the limiting molar conductances of strong electrolytes?',
  right: 'Λ°(NH₄Cl) + Λ°(KOH) − Λ°(KCl)',
  wrong: ['Λ°(NH₄Cl) + Λ°(KCl) − Λ°(KOH)', 'Λ°(KOH) + Λ°(KCl) − Λ°(NH₄Cl)', 'Λ°(NH₄Cl) − Λ°(KOH) − Λ°(KCl)'],
  sol: '(NH₄⁺ + Cl⁻) + (K⁺ + OH⁻) − (K⁺ + Cl⁻) = NH₄⁺ + OH⁻ — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('alpha-mcq', mcq({
  stem: 'A weak acid HA has Λm = 19.5 S cm² mol⁻¹ at a certain concentration and Λ°m = 390 S cm² mol⁻¹. Its degree of dissociation is:',
  right: '0.05',
  wrong: ['0.5', '20', '0.0025'],
  sol: 'α = Λm/Λ°m = 19.5 ÷ 390 = 0.05 — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('kohlrausch-ar', ar({
  a: 'Kohlrausch’s law can be used to find the limiting molar conductance of a weak electrolyte.',
  r: 'Weak electrolytes are only partly dissociated at ordinary concentrations.',
  key: 'b',
  sol: 'Both are true, but R does not explain A; R explains why extrapolation fails, while A rests on the independent contributions of ions at infinite dilution — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('kohl-match', match({
  stem: 'Match each conductance quantity (for strong or weak electrolytes) with the way it is obtained from experimental data.',
  pairs: [
    ['Λ°m of a strong electrolyte', 'Extrapolating Λm against √c to c = 0'],
    ['Λ°m of a weak electrolyte', 'Combining Λ° of strong electrolytes'],
    ['Degree of dissociation', 'Λm ÷ Λ°m'],
    ['Dissociation constant', 'cα² ÷ (1 − α)'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Strong: extrapolation; weak: Kohlrausch combination; α = Λm/Λ°m; Ka = cα²/(1 − α).',
  d: 2, c: 'understanding', t: [3],
}));
add('kohl-num', num({
  stem: r`At 298 K, $\Lambda^\circ_\text{m}$ of $\ce{NaNO3}$, $\ce{HCl}$ and $\ce{NaCl}$ are $121.5$, $425.9$ and $126.4\ \text{S cm}^2\ \text{mol}^{-1}$. Calculate $\Lambda^\circ_\text{m}$ of $\ce{HNO3}$.`,
  value: 421, tol: 0.2, unit: 'S cm²/mol',
  sol: r`$\Lambda^\circ(\ce{HNO3}) = \Lambda^\circ(\ce{HCl}) + \Lambda^\circ(\ce{NaNO3}) - \Lambda^\circ(\ce{NaCl}) = 425.9 + 121.5 - 126.4 = 421.0$, so $421.0\ \text{S cm}^2\ \text{mol}^{-1}$.`,
  scheme: [['421.0', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(425.9 + 121.5 - 126.4, 421) || 'hno3');
add('ka-num', num({
  marks: 2,
  stem: r`The molar conductance of $0.020\ \text{M}$ methanoic acid is $36.4\ \text{S cm}^2\ \text{mol}^{-1}$ and its $\Lambda^\circ_\text{m}$ is $404.2\ \text{S cm}^2\ \text{mol}^{-1}$. Calculate $K_\text{a}$ in units of $10^{-4}$.`,
  value: 1.78, tol: 0.02, unit: '× 10⁻⁴',
  sol: r`$\alpha = 36.4 \div 404.2 = 0.0901$; $K_\text{a} = \dfrac{c\alpha^2}{1-\alpha} = \dfrac{0.020 \times 0.0901^2}{0.9099} = 1.78 \times 10^{-4}$; in units of $10^{-4}$: $1.78 \times 10^{-4} \times 10^{4} = 1.78$.`,
  scheme: [['α = 0.0901', 1], ['Ka = 1.78 × 10⁻⁴', 1]],
  d: 3, c: 'application', t: [3],
}), () => { const a = 36.4 / 404.2; return near((0.02 * a * a) / (1 - a) * 1e4, 1.78, 0.01) || 'ka'; });
add('solubility-num', num({
  marks: 2,
  stem: r`The specific conductance of a saturated solution of silver chloride at 298 K, after subtracting that of the water used, is $1.86 \times 10^{-6}\ \text{S cm}^{-1}$. Given $\Lambda^\circ_\text{m}(\ce{AgCl}) = 138.3\ \text{S cm}^2\ \text{mol}^{-1}$, calculate the solubility of AgCl in units of $10^{-5}\ \text{mol L}^{-1}$.`,
  value: 1.345, tol: 0.007, unit: '× 10⁻⁵ mol/L',
  sol: r`For a saturated solution of a sparingly soluble salt, $\Lambda_\text{m} \approx \Lambda^\circ_\text{m}$, so $S = \dfrac{1000\kappa}{\Lambda^\circ_\text{m}} = \dfrac{1000 \times 1.86 \times 10^{-6}}{138.3} = 1.345 \times 10^{-5}\ \text{mol L}^{-1}$; in units of $10^{-5}$: $1.345 \times 10^{-5} \times 10^{5} = 1.345$.`,
  scheme: [['S = 1000κ/Λ°', 1], ['1.345 × 10⁻⁵ mol/L', 1]],
  d: 3, c: 'application', t: [3],
}), () => near((1000 * 1.86e-6) / 138.3 * 1e5, 1.345, 0.003) || 'solubility');
add('kohl-short', short({
  marks: 2,
  stem: 'State Kohlrausch’s law of independent migration of ions, and give two of its applications.',
  model: 'At infinite dilution, the limiting molar conductance of an electrolyte is the sum of the limiting ionic conductances of its cation and anion, each ion contributing independently: Λ°m = ν₊λ°₊ + ν₋λ°₋. Applications: finding Λ°m of weak electrolytes; finding the degree of dissociation and dissociation constant of weak electrolytes (also the solubility of sparingly soluble salts).',
  sol: 'Statement; two applications.',
  scheme: [['Statement', 1], ['Two applications', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('kohl-short3', short({
  marks: 3,
  stem: 'Using λ° (S cm² mol⁻¹): H⁺ 349.6, Na⁺ 50.1, Cl⁻ 76.3, CH₃COO⁻ 40.9, calculate Λ°m of ethanoic acid. If 0.010 M ethanoic acid has Λm = 16.3 S cm² mol⁻¹, calculate its degree of dissociation and Ka.',
  model: r`$\Lambda^\circ(\ce{CH3COOH}) = 349.6 + 40.9 = 390.5$. $\alpha = 16.3 \div 390.5 = 0.0417$. $K_\text{a} = \dfrac{0.010 \times 0.0417^2}{1 - 0.0417} = 1.82 \times 10^{-5}$.`,
  sol: '390.5; α = 0.0417; Ka ≈ 1.8 × 10⁻⁵.',
  scheme: [['Λ° = 390.5', 1], ['α = 0.0417', 1], ['Ka ≈ 1.8 × 10⁻⁵', 1]],
  d: 3, c: 'application', t: [3],
}));
add('cond-long', long({
  stem: '(a) Define specific conductance and molar conductance, and explain how each varies with dilution. [2]\n\n(b) A 0.0050 M solution of a weak monobasic acid has a resistance of 4000 Ω in a cell of cell constant 0.40 cm⁻¹. Its Λ°m is 400 S cm² mol⁻¹. Calculate (i) κ, (ii) Λm, (iii) α and (iv) Ka. [3]',
  model: r`(a) Specific conductance: the conductance of a solution between electrodes 1 cm² in area and 1 cm apart; molar conductance: the conductance of all ions from one mole of electrolyte, $\Lambda_\text{m} = 1000\kappa/M$. On dilution κ decreases (fewer ions per cm³) while Λm increases (freer ions, more dissociation).

(b) (i) $\kappa = 0.40 \div 4000 = 1.0 \times 10^{-4}\ \text{S cm}^{-1}$. (ii) $\Lambda_\text{m} = 1000 \times 1.0 \times 10^{-4} \div 0.0050 = 20\ \text{S cm}^2\ \text{mol}^{-1}$. (iii) $\alpha = 20 \div 400 = 0.050$. (iv) $K_\text{a} = 0.0050 \times 0.050^2 \div 0.95 = 1.32 \times 10^{-5}$.`,
  sol: 'Definitions and trends; 1.0 × 10⁻⁴; 20; 0.050; 1.32 × 10⁻⁵.',
  scheme: [['(a) Definitions and trends', 2], ['(b)(i) κ', 0.5], ['(b)(ii) Λm', 1], ['(b)(iii) α', 0.5], ['(b)(iv) Ka', 1]],
  d: 3, c: 'application', t: [1, 2, 3],
}));

// ---------------------------------------------------------------- t04 Faraday's laws
add('faraday-mcq', mcq({
  stem: 'How many coulombs are needed to deposit 0.50 mol of copper from Cu²⁺ ions? (F = 96500 C mol⁻¹)',
  right: '96500 C',
  wrong: ['48250 C', '193000 C', '24125 C'],
  sol: '0.50 mol Cu needs 1.0 mol of electrons = 96500 C — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('second-law-mcq', mcq({
  stem: 'The same quantity of electricity is passed through solutions of AgNO₃ and AlCl₃ in series. If 1.08 g of silver is deposited, the mass of aluminium deposited is (Ag = 108, Al = 27):',
  right: '0.09 g',
  wrong: ['0.27 g', '0.81 g', '0.03 g'],
  sol: 'm(Al) = 1.08 × (27/3) ÷ 108 = 0.09 g — option (@K). Using molar masses gives (@1).',
  d: 3, c: 'application', t: [4],
}));
add('charge-mcq', mcq({
  stem: 'What quantity of electricity is needed to liberate 11.2 L of chlorine, measured at STP, by electrolysis of brine?',
  right: '96500 C',
  wrong: ['48250 C', '193000 C', '9650 C'],
  sol: '11.2 L = 0.5 mol Cl₂; 2Cl⁻ → Cl₂ + 2e⁻ needs 1 mol of electrons = 96500 C — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('faraday-n-mcq', mcq({
  stem: 'The faraday constant is the product of:',
  right: 'the Avogadro constant and the charge on an electron',
  wrong: ['the gas constant and the temperature', 'the Avogadro constant and the mass of an electron', 'the charge on an electron and the number of moles of product'],
  sol: 'F = N_A × e ≈ 6.022 × 10²³ × 1.602 × 10⁻¹⁹ C — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('ece-mcq', mcq({
  stem: 'The electrochemical equivalent of a metal is the mass of the metal deposited by:',
  right: '1 coulomb of charge',
  wrong: ['1 faraday of charge', '1 ampere for 1 hour', '1 mole of electrons'],
  sol: 'From m = ZQ, Z is the mass per coulomb — option (@K). One faraday deposits one gram equivalent (@1).',
  d: 2, c: 'understanding', t: [4],
}));
add('faraday-ar', ar({
  a: 'One faraday of electricity deposits 1 mol of silver but only 0.5 mol of copper.',
  r: 'Ag⁺ needs one electron per ion while Cu²⁺ needs two.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('faraday-tf', tf({
  stem: 'The mass of a substance deposited during electrolysis is proportional to its molar mass divided by the charge on its ion, for the same quantity of electricity.',
  key: 't',
  sol: 'True. This is Faraday’s second law: masses are proportional to equivalent masses (M ÷ n).',
  d: 2, c: 'understanding', t: [4],
}));
add('faraday-fill', fill({
  stem: 'In electrolysis calculations, 96500 C — the charge on a mole of electrons — is known as the ___ constant.',
  acc: [['faraday']],
  sol: 'The **Faraday** constant, F.',
  d: 1, c: 'recall', t: [4],
}));
add('ag-num', num({
  marks: 2,
  stem: r`A current of $0.75\ \text{A}$ is passed through silver nitrate solution for $25$ minutes. Calculate the mass of silver deposited ($M = 108$, $F = 96500\ \text{C mol}^{-1}$).`,
  value: 1.259, tol: 0.006, unit: 'g',
  sol: r`$Q = 0.75 \times 1500 = 1125\ \text{C}$; moles of Ag $= 1125 \div 96500 = 0.01166$; mass $= 0.01166 \times 108 = 1.259$, so $1.26\ \text{g}$.`,
  scheme: [['Q = 1125 C', 1], ['1.26 g', 1]],
  d: 2, c: 'application', t: [4],
}), () => near((0.75 * 1500 / 96500) * 108, 1.259, 0.003) || 'ag');
add('time-num', num({
  marks: 2,
  stem: r`How long, in seconds, must a current of $5.0\ \text{A}$ be passed through molten $\ce{AlCl3}$ to deposit $0.90\ \text{g}$ of aluminium ($M = 27$)?`,
  value: 1930, tol: 2, unit: 's',
  sol: r`Moles of Al $= 0.90 \div 27 = 0.0333$; charge $= 3 \times 0.0333 \times 96500 = 9650\ \text{C}$; $t = 9650 \div 5.0 = 1930$, so $1930\ \text{s}$.`,
  scheme: [['Charge 9650 C', 1], ['t = 1930 s', 1]],
  d: 3, c: 'application', t: [4],
}), () => near((3 * (0.9 / 27) * 96500) / 5, 1930) || 'time');
add('faraday-num', num({
  stem: r`Using $N_\text{A} = 6.022 \times 10^{23}\ \text{mol}^{-1}$ and $e = 1.602 \times 10^{-19}\ \text{C}$, calculate the faraday constant in C mol⁻¹.`,
  value: 96472, tol: 30, unit: 'C/mol',
  sol: r`$F = N_\text{A}e = 6.022 \times 10^{23} \times 1.602 \times 10^{-19} = 96472$, so about $9.65 \times 10^{4}\ \text{C mol}^{-1}$.`,
  scheme: [['96 472 C/mol', 1]],
  d: 1, c: 'application', t: [4],
}), () => near(6.022e23 * 1.602e-19, 96472, 0.0005) || 'F');
add('faraday-short', short({
  marks: 2,
  stem: 'State Faraday’s first and second laws of electrolysis, and illustrate the second law with silver and copper deposited by the same quantity of electricity.',
  model: 'First law: the mass of a substance deposited or liberated at an electrode is directly proportional to the quantity of electricity passed (m = ZIt). Second law: when the same quantity of electricity passes through solutions of different electrolytes, the masses of the substances deposited are proportional to their equivalent masses. For example, the charge that deposits 108 g of silver deposits 31.75 g of copper.',
  sol: 'Two laws.',
  scheme: [['First law', 1], ['Second law', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('series-short', short({
  marks: 2,
  stem: 'Three cells containing AgNO₃, CuSO₄ and NiSO₄ solutions are connected in series. When 1.08 g of silver is deposited, what masses of copper and nickel are deposited? (Ag 108, Cu 63.5, Ni 58.7)',
  model: r`Equivalents of Ag $= 1.08 \div 108 = 0.010$, so 0.010 equivalent of each metal is deposited. Cu: $0.010 \times 63.5 \div 2 = 0.3175\ \text{g}$. Ni: $0.010 \times 58.7 \div 2 = 0.2935\ \text{g}$.`,
  sol: 'Cu 0.318 g; Ni 0.294 g.',
  scheme: [['0.010 equivalent', 1], ['Masses of Cu and Ni', 1]],
  d: 2, c: 'application', t: [4],
}));
add('faraday-short3', short({
  marks: 3,
  stem: 'A spoon of surface area 50 cm² is to be coated with silver 0.0020 cm thick by electrolysis of silver nitrate using a current of 1.5 A. How long will it take? (Density of silver 10.5 g cm⁻³, Ag = 108, F = 96500 C mol⁻¹)',
  model: r`Volume of silver $= 50 \times 0.0020 = 0.10\ \text{cm}^3$; mass $= 0.10 \times 10.5 = 1.05\ \text{g}$. Moles $= 1.05 \div 108 = 0.00972$; charge $= 0.00972 \times 96500 = 938\ \text{C}$. Time $= 938 \div 1.5 = 625\ \text{s}$ (about 10.4 minutes).`,
  sol: '1.05 g; 938 C; 625 s.',
  scheme: [['Mass of silver 1.05 g', 1], ['Charge 938 C', 1], ['Time 625 s', 1]],
  d: 4, c: 'application', t: [4],
}));
add('water-short3', short({
  marks: 3,
  stem: 'Acidified water is electrolysed with platinum electrodes using a current of 0.50 A for 3860 s. Calculate the volumes of hydrogen and oxygen evolved at STP (22.4 L mol⁻¹), and explain why their volume ratio is 2 : 1.',
  model: r`$Q = 0.50 \times 3860 = 1930\ \text{C}$; moles of electrons $= 1930 \div 96500 = 0.020$. Cathode $\ce{2H+ + 2e- -> H2}$: $0.010\ \text{mol}$ H₂ $= 0.224\ \text{L}$. Anode $\ce{2H2O -> O2 + 4H+ + 4e-}$: $0.0050\ \text{mol}$ O₂ $= 0.112\ \text{L}$. Each H₂ needs 2 electrons and each O₂ releases 4, so the same charge gives twice as many moles (and volumes) of H₂ as of O₂.`,
  sol: '0.224 L H₂; 0.112 L O₂.',
  scheme: [['Moles of electrons 0.020', 1], ['Volumes 0.224 L and 0.112 L', 1], ['Reason for 2 : 1', 1]],
  d: 3, c: 'application', t: [4],
}));
add('faraday-long', long({
  stem: '(a) State Faraday’s laws of electrolysis and show how the faraday is related to the Avogadro constant and the charge on an electron. [2]\n\n(b) An aqueous solution of copper sulfate is electrolysed with platinum electrodes using a current of 1.93 A for 50 minutes. Calculate (i) the mass of copper deposited at the cathode and (ii) the volume of oxygen, at STP (22.4 L mol⁻¹), evolved at the anode. (Cu = 63.5) [3]',
  model: r`(a) First law: $m = ZIt$; second law: for the same charge, masses deposited are proportional to equivalent masses. One faraday is the charge on one mole of electrons: $F = N_\text{A}e = 6.022 \times 10^{23} \times 1.602 \times 10^{-19} \approx 96500\ \text{C mol}^{-1}$.

(b) $Q = 1.93 \times 3000 = 5790\ \text{C}$; moles of electrons $= 5790 \div 96500 = 0.060$. (i) $\ce{Cu^2+ + 2e- -> Cu}$: $0.030\ \text{mol}$ Cu $= 0.030 \times 63.5 = 1.905\ \text{g}$. (ii) $\ce{2H2O -> O2 + 4H+ + 4e-}$: $0.060 \div 4 = 0.015\ \text{mol}$ O₂ $= 0.015 \times 22.4 = 0.336\ \text{L}$.`,
  sol: 'Laws; F = N_A e; 1.905 g Cu; 0.336 L O₂.',
  scheme: [['(a) Laws', 1], ['(a) F = N_A e', 1], ['(b) Moles of electrons 0.060', 1], ['(b)(i) 1.905 g', 1], ['(b)(ii) 0.336 L', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 cells
add('battery-mcq', mcq({
  stem: 'A car needs a battery that its alternator can recharge while the engine runs. Which of these is a secondary (rechargeable) cell?',
  right: 'Lead storage battery',
  wrong: ['Leclanché dry cell', 'Mercury cell', 'Daniell cell used once and discarded'],
  sol: 'The lead storage battery can be recharged by reversing the cell reaction — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('mercury-mcq', mcq({
  stem: 'The mercury cell is preferred for hearing aids because:',
  right: 'its voltage stays constant throughout its life',
  wrong: ['it can be recharged many times', 'it contains a liquid electrolyte that never dries', 'it produces a very high voltage'],
  sol: 'Its overall reaction, Zn + HgO → ZnO + Hg, involves no ions whose concentration changes — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('lead-mcq', mcq({
  stem: 'During the discharge of a lead storage battery, the density of the electrolyte:',
  right: 'decreases, because sulfuric acid is consumed',
  wrong: ['increases, because sulfuric acid is produced', 'stays the same', 'decreases, because lead is deposited in the acid'],
  sol: 'Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O uses up acid and forms water — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('drycell-mcq', mcq({
  stem: 'In the Leclanché dry cell, the substance reduced at the cathode is:',
  right: 'manganese dioxide',
  wrong: ['zinc', 'ammonium chloride', 'carbon'],
  sol: 'MnO₂ + NH₄⁺ + e⁻ → MnO(OH) + NH₃ at the carbon rod — option (@K). Zinc is oxidised at the anode (@1).',
  d: 2, c: 'recall', t: [5],
}));
add('fuel-mcq', mcq({
  stem: 'In a hydrogen–oxygen fuel cell with an alkaline electrolyte, the reaction at the cathode is:',
  right: r`$\ce{O2(g) + 2H2O(l) + 4e- -> 4OH-(aq)}$`,
  wrong: [r`$\ce{2H2(g) + 4OH-(aq) -> 4H2O(l) + 4e-}$`, r`$\ce{2H2O(l) -> O2(g) + 4H+(aq) + 4e-}$`, r`$\ce{H2(g) -> 2H+(aq) + 2e-}$`],
  sol: 'Oxygen is reduced at the cathode — option (@K); hydrogen is oxidised at the anode (@1).',
  d: 2, c: 'understanding', t: [5],
}));
add('battery-ar', ar({
  a: 'A fuel cell must be recharged from an external source when its voltage falls.',
  r: 'The reactants of a fuel cell are supplied continuously from outside.',
  key: 'd',
  sol: 'A is false — a fuel cell keeps working as long as fuel and oxygen are supplied; R is true — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('battery-match', match({
  stem: 'Match each cell (dry cell, mercury cell, lead storage battery, H₂–O₂ fuel cell) with its anode material.',
  pairs: [
    ['Leclanché dry cell', 'Zinc container'],
    ['Mercury cell', 'Zinc–mercury amalgam'],
    ['Lead storage battery', 'Lead'],
    ['H₂–O₂ fuel cell', 'Porous carbon electrode supplied with hydrogen'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Dry cell → Zn case; mercury cell → Zn amalgam; lead battery → Pb; fuel cell → H₂ electrode.',
  d: 1, c: 'recall', t: [5],
}));
add('battery-short', short({
  marks: 2,
  stem: 'Distinguish between a primary cell and a secondary cell, giving one example of each.',
  model: 'A primary cell cannot be recharged; its reaction is not reversible in practice and it is discarded when used up, e.g. the Leclanché dry cell or mercury cell. A secondary cell can be recharged by passing current through it in the opposite direction, regenerating the reactants, e.g. the lead storage battery or Ni–Cd cell.',
  sol: 'Rechargeable or not; examples.',
  scheme: [['Primary with example', 1], ['Secondary with example', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('lead-short3', short({
  marks: 3,
  stem: 'Write the reactions at the anode and cathode of a lead storage battery during discharge and the overall reaction. How can the state of charge of the battery be checked, and why?',
  model: r`Anode: $\ce{Pb(s) + SO4^2-(aq) -> PbSO4(s) + 2e-}$. Cathode: $\ce{PbO2(s) + SO4^2-(aq) + 4H+(aq) + 2e- -> PbSO4(s) + 2H2O(l)}$. Overall: $\ce{Pb + PbO2 + 2H2SO4 -> 2PbSO4 + 2H2O}$. The density of the acid is measured with a hydrometer: sulfuric acid is consumed and water formed during discharge, so a low density means a discharged battery.`,
  sol: 'Reactions; density check.',
  scheme: [['Anode and cathode reactions', 1.5], ['Overall reaction', 0.5], ['Density check with reason', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('fuel-short3', short({
  marks: 3,
  stem: 'Describe the hydrogen–oxygen fuel cell, writing the electrode reactions, and give two advantages of fuel cells over thermal power generation.',
  model: r`Hydrogen and oxygen are bubbled through porous carbon electrodes (containing a catalyst such as Pt or Pd) into hot concentrated aqueous KOH or NaOH. Anode: $\ce{2H2 + 4OH- -> 4H2O + 4e-}$; cathode: $\ce{O2 + 2H2O + 4e- -> 4OH-}$; overall $\ce{2H2 + O2 -> 2H2O}$. Advantages: high efficiency (about 70%, compared with about 40% for thermal plants); pollution-free (the only product is water); continuous operation while fuel is supplied.`,
  sol: 'Construction; reactions; two advantages.',
  scheme: [['Construction', 1], ['Electrode reactions', 1], ['Two advantages', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('cells-long', long({
  stem: '(a) Describe the Leclanché dry cell and the mercury cell, giving the electrode reactions of each. [3]\n\n(b) Explain why the voltage of a mercury cell remains constant during use, whereas that of a dry cell falls. [2]',
  model: r`(a) Dry cell: a zinc container (anode) holds a moist paste of NH₄Cl and ZnCl₂ around a carbon rod (cathode) surrounded by MnO₂ and carbon. Anode: $\ce{Zn -> Zn^2+ + 2e-}$; cathode: $\ce{MnO2 + NH4+ + e- -> MnO(OH) + NH3}$; about 1.5 V. Mercury cell: zinc–mercury amalgam anode, a paste of HgO and carbon as cathode, electrolyte a paste of KOH and ZnO. Anode: $\ce{Zn + 2OH- -> ZnO + H2O + 2e-}$; cathode: $\ce{HgO + H2O + 2e- -> Hg + 2OH-}$; about 1.35 V.

(b) The overall reaction of the mercury cell, $\ce{Zn + HgO -> ZnO + Hg}$, involves only solids and a liquid; no ion concentration changes, so by the Nernst equation the emf stays constant. In the dry cell, ion concentrations (e.g. NH₄⁺, Zn²⁺) change and products build up around the electrodes, so the voltage falls.`,
  sol: 'Construction and reactions; constant voltage reason.',
  scheme: [['(a) Dry cell construction and reactions', 1.5], ['(a) Mercury cell construction and reactions', 1.5], ['(b) Mercury: no change in ion concentrations', 1], ['(b) Dry cell: concentrations change', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t06 corrosion
add('sacrificial-mcq', mcq({
  stem: 'Which metal could be attached to an underground iron pipeline to protect it as a sacrificial anode? (E°/V: Fe²⁺/Fe −0.44, Cu²⁺/Cu +0.34, Sn²⁺/Sn −0.14, Mg²⁺/Mg −2.37)',
  right: 'Magnesium',
  wrong: ['Copper', 'Tin', 'Silver'],
  sol: 'A sacrificial anode must be oxidised more easily than iron, i.e. have a more negative E° — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('rust-mcq', mcq({
  stem: 'In the electrochemical rusting of iron, the cathodic reaction is:',
  right: r`$\ce{O2(g) + 4H+(aq) + 4e- -> 2H2O(l)}$`,
  wrong: [r`$\ce{Fe(s) -> Fe^2+(aq) + 2e-}$`, r`$\ce{Fe^2+(aq) + 2e- -> Fe(s)}$`, r`$\ce{2H2O(l) -> O2(g) + 4H+(aq) + 4e-}$`],
  sol: 'Oxygen is reduced at the cathodic region — option (@K); iron is oxidised at the anodic region (@1).',
  d: 2, c: 'understanding', t: [6],
}));
add('salt-mcq', mcq({
  stem: 'Iron objects rust faster at the seaside than in a dry desert because:',
  right: 'salt water is a good electrolyte that speeds up the electrochemical process',
  wrong: ['sea air contains less oxygen', 'salt forms a protective coating on iron', 'iron is more reactive near the sea'],
  sol: 'Dissolved salts increase the conductivity of the water film, helping the corrosion cell — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('tin-mcq', mcq({
  stem: 'A scratched tin-plated can rusts faster than a scratched galvanised bucket because:',
  right: 'iron is more reactive than tin, so iron becomes the anode, whereas zinc is more reactive than iron and corrodes first',
  wrong: ['tin is more reactive than iron', 'zinc does not react with oxygen', 'tin forms a protective alloy with iron'],
  sol: 'E° order Zn (−0.76) < Fe (−0.44) < Sn (−0.14): with tin, iron is sacrificed; with zinc, zinc is sacrificed — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('corrosion-ar', ar({
  a: 'Galvanised iron does not rust even when its coating is scratched.',
  r: 'Zinc forms an impermeable layer of zinc oxide that seals the scratch.',
  key: 'c',
  sol: 'A is true; R is false — iron is protected because zinc has a more negative E° and is oxidised in preference (sacrificial protection) — option (c).',
  d: 3, c: 'analysis', t: [6],
}));
add('corrosion-tf', tf({
  stem: 'An iron nail kept in dry air, or in boiled water covered with a layer of oil, does not rust, because rusting of iron requires both oxygen and water.',
  key: 't',
  sol: 'True. Water provides the electrolyte film and oxygen is reduced at the cathodic region.',
  d: 1, c: 'recall', t: [6],
}));
add('corrosion-short', short({
  marks: 2,
  stem: 'Write the anodic and cathodic reactions in the rusting of iron, and name the final product.',
  model: r`Anode: $\ce{Fe(s) -> Fe^2+(aq) + 2e-}$. Cathode: $\ce{O2(g) + 4H+(aq) + 4e- -> 2H2O(l)}$. Fe²⁺ is oxidised further by air to hydrated iron(III) oxide, Fe₂O₃·xH₂O (rust).`,
  sol: 'Two half-reactions; rust.',
  scheme: [['Anodic and cathodic reactions', 1], ['Rust Fe₂O₃·xH₂O', 1]],
  d: 1, c: 'understanding', t: [6],
}));
add('protect-short3', short({
  marks: 3,
  stem: 'Explain how each method prevents corrosion of iron: (a) painting, (b) galvanising, (c) attaching blocks of magnesium to a ship’s hull.',
  model: '(a) Paint forms a barrier that keeps air and moisture from the iron surface, but rusting can start at a scratch. (b) A coating of zinc both acts as a barrier and, because zinc has a more negative reduction potential than iron, is oxidised in preference to iron even where the coating is broken. (c) Magnesium, being more reactive than iron, acts as a sacrificial anode: it is oxidised and supplies electrons to the iron, which becomes the cathode and does not corrode.',
  sol: 'Barrier; sacrificial zinc; sacrificial magnesium.',
  scheme: [['(a) Barrier', 1], ['(b) Galvanising reason', 1], ['(c) Sacrificial anode', 1]],
  d: 2, c: 'application', t: [6],
}));
add('corrosion-long', long({
  stem: '(a) Explain, with equations, the electrochemical theory of rusting of iron. [3]\n\n(b) State two factors that speed up corrosion and two methods of preventing it, giving the principle of each method. [2]',
  model: r`(a) On a moist iron surface, one region acts as an anode where iron is oxidised: $\ce{Fe -> Fe^2+ + 2e-}$. Electrons flow through the metal to another region, the cathode, where oxygen is reduced in the presence of H⁺ (from dissolved CO₂): $\ce{O2 + 4H+ + 4e- -> 2H2O}$. Overall $\ce{2Fe + O2 + 4H+ -> 2Fe^2+ + 2H2O}$. Fe²⁺ ions are further oxidised by air to Fe₂O₃·xH₂O (rust).

(b) Factors: presence of electrolytes such as salt; acidic gases (CO₂, SO₂); moisture; contact with a less active metal. Prevention: barrier protection (paint, grease) keeps out air and water; sacrificial protection (galvanising, magnesium blocks) — a more active metal is oxidised instead of iron.`,
  sol: 'Electrochemical theory; factors and prevention.',
  scheme: [['(a) Anodic reaction', 1], ['(a) Cathodic reaction', 1], ['(a) Formation of rust', 1], ['(b) Two factors', 1], ['(b) Two methods with principles', 1]],
  d: 2, c: 'understanding', t: [6],
}));
