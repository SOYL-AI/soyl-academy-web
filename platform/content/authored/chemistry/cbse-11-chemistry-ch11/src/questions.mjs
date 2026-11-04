// ch11 The Gaseous State — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c.
// Numbers are computed here, interpolated into stems and solutions, and re-solved by the checks passed to add().
import { mk, add, r, dec, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const RB = 0.08314; // L bar K-1 mol-1
const RA = 0.0821; // L atm K-1 mol-1
const rn = (x, p = 100) => Math.round(x * p) / p;

// ---------------------------------------------------------------- check-slide MCQs (not used in either test)
add('chk-boyle', mcq({
  stem: 'A sample of gas occupies 3.0 L at 1.0 bar. It is compressed slowly at constant temperature until its volume is 1.5 L. The new pressure is:',
  right: '2.0 bar',
  wrong: ['0.50 bar', '1.5 bar', '4.5 bar'],
  sol: String.raw`Boyle's law: $p_2 = p_1V_1/V_2 = 1.0 \times 3.0 \div 1.5 = 2.0$ bar — option (@K).`,
  d: 1, c: 'application', t: [1],
}), () => near((1.0 * 3.0) / 1.5, 2.0) || 'boyle');
add('chk-gl', mcq({
  stem: 'A sealed rigid steel vessel is heated so that its kelvin temperature doubles. Which quantity doubles?',
  right: 'The pressure of the gas',
  wrong: ['The volume of the vessel', 'The number of moles of gas', 'The density of the gas in the vessel'],
  sol: 'V and n are fixed, so by the pressure law p ∝ T and the pressure doubles. Density stays constant because the mass and volume are unchanged — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('chk-dens', mcq({
  stem: 'At the same temperature and pressure, which of these gases has the highest density?',
  right: 'Carbon dioxide',
  wrong: ['Nitrogen', 'Helium', 'Hydrogen'],
  sol: 'Density d = pM/RT is proportional to molar mass at fixed p and T. CO₂ (44 g mol⁻¹) is heaviest — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('chk-dalton', mcq({
  stem: 'A mixture of 0.50 mol of oxygen and 1.50 mol of nitrogen exerts a total pressure of 4.0 bar. The partial pressure of oxygen is:',
  right: '1.0 bar',
  wrong: ['0.50 bar', '2.0 bar', '3.0 bar'],
  sol: String.raw`Mole fraction of O₂ $= 0.50 \div 2.00 = 0.25$, so $p(\ce{O2}) = 0.25 \times 4.0 = 1.0$ bar — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near((0.5 / 2) * 4, 1.0) || 'dalton');
add('chk-z', mcq({
  stem: 'At a high pressure a gas has a compressibility factor Z = 1.3. This shows that:',
  right: 'the volume of the molecules is the dominant effect',
  wrong: ['intermolecular attractions are the dominant effect', 'the gas behaves ideally', 'the gas is below its critical temperature and must be liquid'],
  sol: 'Z > 1 means the gas is harder to compress than an ideal gas, because the molecular volume (repulsion) outweighs the attractions — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('chk-crit', mcq({
  stem: 'Critical temperatures are O₂ 154.6 K, CO₂ 304.1 K, NH₃ 405.5 K and Cl₂ 417 K. Which of these cannot be liquefied by pressure alone at 300 K?',
  right: 'Oxygen',
  wrong: ['Carbon dioxide', 'Ammonia', 'Chlorine'],
  sol: 'A gas can be liquefied by pressure only below its Tc. At 300 K, oxygen is far above its Tc of 154.6 K, whereas the other three are below theirs — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => 300 > 154.6 && 300 < 304.1 && 300 < 405.5 && 300 < 417 || 'tc');

// ---------------------------------------------------------------- MCQs
add('m-boyle-graph', mcq({
  stem: 'For a fixed amount of an ideal gas at constant temperature, which graph is a straight line passing through the origin?',
  right: 'p against 1/V',
  wrong: ['p against V', 'V against p', 'pV against p'],
  sol: 'Since p = nRT × (1/V), p against 1/V is a straight line through the origin with slope nRT. p against V is a hyperbola, and pV against p is a horizontal line — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
{
  const p2 = (6.0 * 450) / 300;
  add('m-rigid', mcq({
    stem: 'A sealed rigid cylinder holds a gas at 6.0 bar and 300 K. If it is heated to 450 K, the pressure becomes:',
    right: `${dec(p2, 2)} bar`,
    wrong: ['4.0 bar', '6.0 bar', '13.5 bar'],
    sol: String.raw`At constant $V$: $p_2 = p_1T_2/T_1 = 6.0 \times 450 \div 300 = ${dec(p2, 2)}$ bar — option (@K).`,
    d: 2, c: 'application', t: [1],
  }), () => near(p2, 9.0) || 'rigid');
}
add('m-double', mcq({
  stem: 'A gas occupies 1.0 L at 27 °C and a fixed pressure. At what temperature, in °C, will its volume be doubled at the same pressure?',
  right: '327 °C',
  wrong: ['54 °C', '600 °C', '154 °C'],
  sol: String.raw`$V \propto T$, so $T_2 = 2 \times 300 = 600$ K, that is $600 - 273 = 327$ °C — option (@K). Doubling the Celsius value (@1) is a common slip.`,
  d: 2, c: 'application', t: [1],
}), () => near(2 * 300 - 273, 327) || 'double');
add('m-avogadro', mcq({
  stem: 'A 5.0 L flask of hydrogen and a 5.0 L flask of carbon dioxide are at the same temperature and pressure. They contain the same:',
  right: 'number of molecules',
  wrong: ['mass of gas', 'number of atoms', 'density'],
  sol: 'By Avogadro’s law equal volumes of gases at the same T and p hold equal numbers of molecules — option (@K). H₂ and CO₂ differ in molar mass (so in mass and density) and in atoms per molecule (2 against 3).',
  d: 2, c: 'application', t: [1],
}));
add('m-lbar', mcq({
  stem: 'One litre bar (1 L × 1 bar) is equal to:',
  right: '100 J',
  wrong: ['1 J', '10 J', '101.3 J'],
  sol: String.raw`$1\ \text{bar} = 10^5$ Pa and $1\ \text{L} = 10^{-3}$ m³, so $1\ \text{L bar} = 10^5 \times 10^{-3} = 100$ J — option (@K). (101.3 J is 1 L atm.)`,
  d: 2, c: 'understanding', t: [1],
}));
{
  const ratio = 64 / 16;
  add('m-density-ratio', mcq({
    stem: 'At the same temperature and pressure the density of sulfur dioxide (M = 64 g mol⁻¹) is greater than that of methane (M = 16 g mol⁻¹) by a factor of:',
    right: '4',
    wrong: ['2', '8', '1/4'],
    sol: String.raw`$d = pM/RT$, so at fixed $p$ and $T$ the ratio of densities equals the ratio of molar masses: $64 \div 16 = ${ratio}$ — option (@K).`,
    d: 1, c: 'application', t: [1],
  }), () => ratio === 4 || 'ratio');
}
{
  const xH = 1.0 / 3.0;
  add('m-dalton', mcq({
    stem: 'A mixture contains 2.0 g of hydrogen and 8.0 g of helium (H = 1, He = 4) and the total pressure is 6.0 bar. The partial pressure of hydrogen is:',
    right: '2.0 bar',
    wrong: ['1.0 bar', '3.0 bar', '4.0 bar'],
    sol: String.raw`$n(\ce{H2}) = 2.0 \div 2.0 = 1.0$ mol and $n(\ce{He}) = 8.0 \div 4.0 = 2.0$ mol, so $x(\ce{H2}) = 1/3$ and $p = 6.0 \times 1/3 = 2.0$ bar — option (@K).`,
    d: 3, c: 'application', t: [1],
  }), () => near(xH * 6, 2.0) || 'dalton');
}
add('m-water', mcq({
  stem: 'A gas is collected over water and the water levels inside and outside the jar are made equal. The pressure of the gas in the jar, compared with the atmospheric pressure, is:',
  right: 'lower, because water vapour also contributes to the total',
  wrong: ['equal, because the levels are equal', 'higher, because water exerts a hydrostatic pressure', 'zero, because the gas is dissolved in water'],
  sol: 'With equal levels the total pressure inside equals the atmospheric pressure, but this total is the sum of the gas pressure and the water vapour pressure. The pressure of the dry gas is therefore lower — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('m-dev', mcq({
  stem: 'Under which of these conditions would methane deviate most from ideal behaviour?',
  right: '200 K and 100 atm',
  wrong: ['400 K and 1 atm', '500 K and 0.1 atm', '350 K and 0.5 atm'],
  sol: 'Deviation is largest at low temperature and high pressure, when molecules are close together and slow. Option (@K) combines both; the others are at high temperature, low pressure or both.',
  d: 2, c: 'application', t: [1],
}));
add('m-zlt1', mcq({
  stem: 'A gas has Z = 0.85 at 100 atm and 300 K. Compared with an ideal gas under the same conditions, its molar volume is:',
  right: 'smaller, because attractions dominate',
  wrong: ['smaller, because the molecules repel each other', 'larger, because attractions dominate', 'the same, because Z is close to 1'],
  sol: String.raw`$Z = pV/nRT = 0.85 < 1$, so the real molar volume is 15% below the ideal value. This happens when attractions dominate — option (@K).`,
  d: 3, c: 'analysis', t: [1],
}));
add('m-vdwa', mcq({
  stem: 'The van der Waals constants a (L² bar mol⁻²) are: He 0.0346, N₂ 1.408, CO₂ 3.640, NH₃ 4.17. Which gas is the easiest to liquefy?',
  right: 'Ammonia',
  wrong: ['Helium', 'Nitrogen', 'Carbon dioxide'],
  sol: 'A larger a means stronger intermolecular attractions and a higher critical temperature, so the gas is easier to liquefy. NH₃ has the largest a — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('m-units', mcq({
  stem: 'In the van der Waals equation, the units of the constants a and b are, respectively:',
  right: 'L² bar mol⁻² and L mol⁻¹',
  wrong: ['L bar mol⁻¹ and L² mol⁻²', 'L mol⁻¹ and L² bar mol⁻²', 'bar L⁻² mol² and mol L⁻¹'],
  sol: String.raw`In $(p + an^2/V^2)$, the term $an^2/V^2$ has units of pressure, so $a$ has bar L² mol⁻². In $(V - nb)$ the term $nb$ is a volume, so $b$ has L mol⁻¹ — option (@K).`,
  d: 2, c: 'analysis', t: [1],
}));
add('m-crit', mcq({
  stem: 'The critical temperature of ammonia is 405.5 K and that of nitrogen is 126.2 K. This shows that, compared with nitrogen, ammonia has:',
  right: 'stronger intermolecular attractions',
  wrong: ['weaker intermolecular attractions', 'a smaller molar mass in every respect', 'a larger excluded volume per mole by a factor of three'],
  sol: 'A high Tc means that the gas can be liquefied by pressure even at high temperature, which requires strong attractions (NH₃ also has hydrogen bonding) — option (@K).',
  d: 2, c: 'analysis', t: [1],
}));
add('m-ideal', mcq({
  stem: 'At 300 K and 1 bar, which of these gases is expected to behave most nearly as an ideal gas?',
  right: 'Helium',
  wrong: ['Ammonia', 'Carbon dioxide', 'Sulfur dioxide'],
  sol: 'Helium has the weakest attractions (a = 0.0346) and the smallest molecules, so its Z is closest to 1 — option (@K).',
  d: 1, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- assertion-reason
add('ar-boyle', ar({
  a: 'The pressure of a gas rises when it is compressed into a smaller volume at constant temperature.',
  r: 'In a smaller volume the molecules strike the walls more often.',
  key: 'a',
  sol: 'Both are true. With the same speed (same T), molecules in a smaller volume collide with the walls more frequently, which raises the pressure; R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-water', ar({
  a: 'A gas collected over water must be corrected for water vapour when its amount is calculated.',
  r: 'The vapour pressure of water increases with temperature.',
  key: 'b',
  sol: 'Both statements are true, but R is not the reason for A: the correction is needed because the jar contains water vapour that contributes to the total pressure, whatever the temperature — option (b).',
  d: 2, c: 'analysis', t: [1],
}));
add('ar-balloon', ar({
  a: 'A hot-air balloon rises when the air inside it is heated.',
  r: 'On heating at constant pressure the density of a gas increases.',
  key: 'c',
  sol: 'A is true, R is false: at constant pressure the gas expands on heating and its density decreases (d = pM/RT), so the balloon becomes lighter than the surrounding air — option (c).',
  d: 2, c: 'application', t: [1],
}));
add('ar-b', ar({
  a: 'The van der Waals constant b equals the actual volume occupied by one mole of gas molecules.',
  r: 'The constant b is called the excluded volume and is about four times the actual volume of the molecules.',
  key: 'd',
  sol: 'A is false: b is the excluded volume, about four times the true molecular volume. R is true — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
add('ar-liq', ar({
  a: 'Ammonia is liquefied much more easily than nitrogen.',
  r: 'The van der Waals constant a of ammonia is much larger than that of nitrogen.',
  key: 'a',
  sol: 'Both are true. Ammonia has a = 4.17 against 1.408 for nitrogen, meaning stronger attractions and a higher Tc (405.5 K against 126.2 K); R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-ideal', ar({
  a: 'The ideal gas equation is obeyed best by real gases at low pressure and high temperature.',
  r: 'Under these conditions intermolecular attractions between gas molecules are large.',
  key: 'c',
  sol: 'A is true. R is false: at low pressure and high temperature the molecules are far apart and fast, so attractions are negligible — option (c).',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- true-false
add('tf-celsius', tf({
  stem: 'Charles’s law, V₁/T₁ = V₂/T₂, can be applied with the temperatures expressed in degrees Celsius.',
  key: 'f',
  sol: 'False. V is proportional to the absolute temperature, so T must be in kelvin (T = t + 273.15).',
  d: 1, c: 'recall', t: [1],
}));
add('tf-dalton', tf({
  stem: 'Dalton’s law of partial pressures applies to a mixture of gases that do not react with one another.',
  key: 't',
  sol: 'True. For non-reacting ideal gases the total pressure is the sum of the partial pressures.',
  d: 1, c: 'recall', t: [1],
}));
add('tf-crit', tf({
  stem: 'Above its critical temperature, a gas can still be liquefied if a sufficiently high pressure is applied.',
  key: 'f',
  sol: 'False. Above Tc the thermal energy of the molecules is too high for attractions to hold them together, so no pressure can liquefy the gas.',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- fill in the blank
add('fill-abs', fill({
  stem: 'The zero of the Kelvin scale corresponds to ___ °C.',
  acc: [['−273.15', '-273.15', '−273', '-273', '273.15']],
  sol: 'Absolute zero is **−273.15** °C (0 K).',
  d: 1, c: 'recall', t: [1],
}));
add('fill-z', fill({
  stem: 'For an ideal gas the compressibility factor Z has the value ___.',
  acc: [['1', 'one', 'unity']],
  sol: 'Z = pV/nRT = **1** (one) at all pressures for an ideal gas.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-b', fill({
  stem: 'The van der Waals constant ___ corrects for the finite volume of gas molecules.',
  acc: [['b']],
  sol: 'The constant **b** (excluded volume per mole) corrects the volume; a corrects the pressure.',
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- match
add('match-laws', match({
  stem: 'Match each law in Column I with its statement in Column II.',
  pairs: [
    ['Boyle’s law', 'p ∝ 1/V at constant n and T'],
    ['Charles’s law', 'V ∝ T at constant n and p'],
    ['Gay-Lussac’s law', 'p ∝ T at constant n and V'],
    ['Avogadro’s law', 'V ∝ n at constant p and T'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Boyle: p and V inversely proportional; Charles: V and T; Gay-Lussac: p and T; Avogadro: V and n.',
  d: 1, c: 'recall', t: [1],
}));
add('match-terms', match({
  stem: 'Match each quantity in Column I with its meaning in Column II.',
  pairs: [
    ['Constant a (van der Waals)', 'Measures the strength of intermolecular attractions'],
    ['Constant b (van der Waals)', 'Excluded volume per mole of gas'],
    ['Compressibility factor Z', 'pV divided by nRT'],
    ['Critical temperature', 'Highest temperature at which pressure alone can liquefy the gas'],
  ],
  order: [2, 0, 3, 1],
  sol: 'a goes with attractions, b with excluded volume, Z with pV/nRT and Tc with the limit of liquefaction by pressure.',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- numericals
{
  const p2 = (1.0 * 60) / 15;
  add('num-syringe', num({
    stem: 'A syringe holds 60 mL of air at 1.00 atm. The plunger is pushed in slowly, at constant temperature, until the air occupies 15 mL. What is the final pressure, in atm?',
    value: p2, tol: 0.02, unit: 'atm',
    sol: String.raw`$p_1V_1 = p_2V_2$, so $p_2 = \dfrac{1.00 \times 60}{15} = ${dec(p2, 3)}$ atm.`,
    scheme: [['Boyle’s law, p₁V₁ = p₂V₂', 0.5], ['p₂ = 4.00 atm', 0.5]],
    d: 1, c: 'application', t: [1],
  }), () => near(p2, 4.0) || 'syringe');
}
{
  const V2 = (2.5 * 360) / 300;
  add('num-charles', num({
    stem: 'A balloon holds 2.50 L of air at 27 °C. At constant pressure it is placed in a warm room at 87 °C. What is its new volume, in litres?',
    value: V2, tol: 0.02, unit: 'L',
    sol: String.raw`$T_1 = 300$ K and $T_2 = 360$ K. $V_2 = V_1T_2/T_1 = \dfrac{2.50 \times 360}{300} = ${dec(V2, 3)}$ L.`,
    scheme: [['Converts to 300 K and 360 K', 0.5], ['V₂ = 3.00 L', 0.5]],
    d: 2, c: 'application', t: [1],
  }), () => near(V2, 3.0) || 'charles');
}
{
  const V2 = (2.0 * 3.0 * 300) / (280 * 1.0);
  add('num-bubble', num({
    stem: 'An air bubble of volume 2.0 mL at the bottom of a lake, where the pressure is 3.0 atm and the temperature 280 K, rises to the surface, where the pressure is 1.0 atm and the temperature 300 K. What is its volume at the surface, in mL?',
    value: rn(V2, 100), tol: 0.05, unit: 'mL',
    sol: String.raw`$V_2 = \dfrac{p_1V_1T_2}{T_1p_2} = \dfrac{3.0 \times 2.0 \times 300}{280 \times 1.0} = ${dec(V2, 3)}$ mL.`,
    scheme: [['Combined gas law', 0.5], ['V₂ = 6.43 mL', 0.5]],
    d: 2, c: 'application', t: [1],
  }), () => near(V2, 6.4286, 0.001) || 'bubble');
}
{
  const n = (150 * 10.0) / (RB * 300);
  const m = (n * 32) / 1000;
  add('num-cylinder', num({
    stem: 'A 10.0 L steel cylinder contains oxygen at 150 bar and 300 K. Calculate the mass of oxygen in kilograms. (R = 0.08314 L bar K⁻¹ mol⁻¹; O = 16)',
    value: rn(m, 100), tol: 0.01, unit: 'kg',
    sol: String.raw`$n = \dfrac{pV}{RT} = \dfrac{150 \times 10.0}{0.08314 \times 300} = ${dec(n, 4)}$ mol. Mass $= ${dec(n, 4)} \times 32 = ${dec(n * 32, 4)}$ g $= ${dec(m, 3)}$ kg.`,
    scheme: [['n = 60.1 mol', 0.5], ['Mass 1.92 kg', 0.5]],
    d: 2, c: 'application', t: [1],
  }), () => near(m, 1.9246, 0.002) || 'cylinder');
}
{
  const M = (2.86 * RB * 300) / 1.0;
  add('num-molar', num({
    stem: 'A gaseous element has a density of 2.86 g L⁻¹ at 1.00 bar and 300 K. Calculate its molar mass in g mol⁻¹. (R = 0.08314 L bar K⁻¹ mol⁻¹)',
    value: rn(M, 10), tol: 0.2, unit: 'g mol⁻¹',
    sol: String.raw`$M = \dfrac{dRT}{p} = \dfrac{2.86 \times 0.08314 \times 300}{1.00} = ${dec(M, 3)}$ g mol⁻¹ (close to Cl₂, 70.9).`,
    scheme: [['M = dRT/p', 0.5], ['71.3 g mol⁻¹', 0.5]],
    d: 2, c: 'application', t: [1],
  }), () => near(M, 71.33, 0.002) || 'molar');
}
{
  const p = (2.0 * RB * 300) / 5.0;
  add('num-dalton', num({
    stem: 'A 5.0 L vessel at 300 K contains 2.0 mol of hydrogen and 2.0 mol of helium. Calculate the partial pressure of helium in bar. (R = 0.08314 L bar K⁻¹ mol⁻¹)',
    value: rn(p, 100), tol: 0.05, unit: 'bar',
    sol: String.raw`Each gas fills the whole vessel: $p(\ce{He}) = \dfrac{nRT}{V} = \dfrac{2.0 \times 0.08314 \times 300}{5.0} = ${dec(p, 3)}$ bar.`,
    scheme: [['p = nRT/V for helium alone', 0.5], ['9.98 bar', 0.5]],
    d: 2, c: 'application', t: [1],
  }), () => near(p, 9.9768, 0.002) || 'dalton num');
}
{
  const pg = 755 - 23.8;
  const n = ((pg / 760) * 0.120) / (RA * 298);
  add('num-water', num({
    stem: 'A student collects 120 mL of hydrogen over water at 298 K when the barometer reads 755 mmHg. The vapour pressure of water at 298 K is 23.8 mmHg. How many millimoles of hydrogen are collected? (R = 0.0821 L atm K⁻¹ mol⁻¹; 760 mmHg = 1 atm)',
    value: rn(n * 1000, 100), tol: 0.03, unit: 'mmol',
    sol: String.raw`$p(\ce{H2}) = 755 - 23.8 = ${dec(pg, 4)}$ mmHg $= ${dec(pg / 760, 4)}$ atm. $n = \dfrac{pV}{RT} = \dfrac{${dec(pg / 760, 4)} \times 0.120}{0.0821 \times 298} = ${dec(n, 3)}$ mol $= ${dec(n * 1000, 3)}$ mmol.`,
    scheme: [['Dry-gas pressure 731.2 mmHg', 0.5], ['n = 4.72 mmol', 0.5]],
    d: 3, c: 'application', t: [1],
  }), () => near(n * 1000, 4.719, 0.002) || 'water');
}
{
  const p = (RB * 300) / (1.0 - 0.0427) - 3.64 / 1.0;
  add('num-vdw', num({
    stem: 'Using the van der Waals equation, calculate the pressure exerted by 1.00 mol of carbon dioxide in a 1.00 L vessel at 300 K, in bar. (a = 3.64 L² bar mol⁻², b = 0.0427 L mol⁻¹, R = 0.08314 L bar K⁻¹ mol⁻¹)',
    value: rn(p, 10), tol: 0.2, unit: 'bar',
    sol: String.raw`$p = \dfrac{nRT}{V - nb} - \dfrac{an^2}{V^2} = \dfrac{${dec(RB * 300, 4)}}{${dec(1 - 0.0427, 4)}} - 3.64 = ${dec(p, 3)}$ bar. (The ideal value would be 24.9 bar.)`,
    scheme: [['Substitutes into the van der Waals equation', 0.5], ['22.4 bar', 0.5]],
    d: 3, c: 'application', t: [1],
  }), () => near(p, 22.41, 0.003) || 'vdw');
}

// ---------------------------------------------------------------- short answer, 2 marks
add('s2-boyle', short({
  marks: 2,
  stem: 'Explain Boyle’s law in terms of the motion of gas molecules in a cylinder whose piston is pushed in at constant temperature.',
  model: 'At constant temperature the average speed of the molecules is unchanged. When the volume is reduced the molecules travel a shorter distance between collisions with the walls, so they hit the walls more often per second and the force per unit area, the pressure, rises as the volume falls.',
  sol: 'Same speed, more frequent collisions.',
  scheme: [['Average speed unchanged at constant T', 1], ['More frequent wall collisions, higher pressure', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-kelvin', short({
  marks: 2,
  stem: 'A student uses 27 °C and 57 °C directly in Charles’s law and gets a volume ratio of 2.1. Explain the error and give the correct ratio of volumes V₂/V₁.',
  model: 'Volume is proportional to the absolute temperature, so Celsius values cannot be used. The correct temperatures are 300 K and 330 K, and the volume ratio is 330 divided by 300, which is 1.10. The student’s ratio of 57 to 27 is wrongly large because the Celsius zero is not a true zero.',
  sol: 'Use kelvin; ratio 1.10.',
  scheme: [['Charles’s law needs kelvin', 1], ['Ratio 330/300 = 1.10', 1]],
  d: 3, c: 'evaluation', t: [1],
}), () => near(330 / 300, 1.1) && near(57 / 27, 2.11, 0.01) || 'ratio');
add('s2-lbar', short({
  marks: 2,
  stem: 'Show that R = 0.08314 L bar K⁻¹ mol⁻¹ is equal to 8.314 J K⁻¹ mol⁻¹.',
  model: r`One bar is $10^5$ Pa and one litre is $10^{-3}$ m³, so 1 L bar $= 10^5 \times 10^{-3}$ Pa m³ $= 100$ J. Hence $0.08314 \times 100 = 8.314$ J K⁻¹ mol⁻¹, because pascal times cubic metre is joule.`,
  sol: 'Conversion of L bar to J.',
  scheme: [['1 L bar = 100 J', 1], ['0.08314 × 100 = 8.314', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s2-density', short({
  marks: 2,
  stem: 'Using the ideal gas equation, explain why carbon dioxide is denser than nitrogen at the same temperature and pressure.',
  model: r`Putting $n = m/M$ in $pV = nRT$ gives density $d = pM/RT$. At the same $p$ and $T$ the density is proportional to molar mass, and carbon dioxide (44 g mol⁻¹) is heavier than nitrogen (28 g mol⁻¹), so its density is higher.`,
  sol: 'd = pM/RT.',
  scheme: [['d = pM/RT derived', 1], ['M larger for CO₂', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s2-water', short({
  marks: 2,
  stem: 'Why must the vapour pressure of water be subtracted when finding the amount of oxygen collected over water in a jar?',
  model: 'The oxygen in the jar is mixed with water vapour. By Dalton’s law the total pressure, which equals the atmospheric pressure when the levels are equal, is the sum of the oxygen pressure and the vapour pressure of water, so the oxygen pressure is the total minus the vapour pressure.',
  sol: 'Dalton’s law.',
  scheme: [['Jar contains oxygen and water vapour', 1], ['p(oxygen) = p(total) − p(vapour)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-ideal', short({
  marks: 2,
  stem: 'State the conditions under which a real gas behaves most nearly as an ideal gas and give the reason.',
  model: 'A real gas is nearly ideal at low pressure and high temperature. At low pressure the molecules are far apart, so their own volume is negligible compared with the container volume, and at high temperature they move so fast that intermolecular attractions have little effect.',
  sol: 'Low p, high T.',
  scheme: [['Low pressure and high temperature', 1], ['Negligible molecular volume and attractions', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('s2-zco2', short({
  marks: 2,
  stem: 'The compressibility factor of carbon dioxide at 273 K is below 1 at moderate pressures but above 1 at very high pressures. Explain both observations.',
  model: 'At moderate pressures the strong attractions between CO₂ molecules reduce the pressure on the walls, so the gas is easier to compress than an ideal gas and Z is below 1. At very high pressures the molecules are so close that their own volume and repulsion dominate, so the gas is harder to compress and Z exceeds 1.',
  sol: 'Attractions then molecular volume.',
  scheme: [['Z < 1: attractions dominate', 1], ['Z > 1: molecular volume dominates', 1]],
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- short answer, 3 marks
add('s3-dev', short({
  marks: 3,
  stem: 'Name the two assumptions of the ideal gas model that fail for real gases and explain how each causes deviation, at high pressure and at low temperature respectively.',
  model: 'The ideal gas model assumes that molecules have no volume and no attractions. At high pressure the molecules are crowded, their own volume is a significant fraction of the container, and the gas is harder to compress, so Z is above 1. At low temperature the molecules are slow, attractions pull them together and reduce the pressure on the walls, so Z is below 1.',
  sol: 'Two assumptions and their effects.',
  scheme: [['Two assumptions named', 1], ['High pressure: molecular volume, Z > 1', 1], ['Low temperature: attractions, Z < 1', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s3-vdw', short({
  marks: 3,
  stem: 'Write the van der Waals equation for n moles of gas and explain the meaning of the constants a and b.',
  model: r`The equation is $\left(p + \dfrac{an^2}{V^2}\right)(V - nb) = nRT$. The constant $a$ allows for intermolecular attractions, which reduce the pressure; a larger $a$ means stronger attractions. The constant $b$ is the excluded volume per mole, about four times the actual volume of the molecules, and is subtracted from the volume.`,
  sol: 'Equation, a and b.',
  scheme: [['Correct equation', 1], ['a: attractions', 1], ['b: excluded volume', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s3-crit', short({
  marks: 3,
  stem: 'Define the critical temperature. Using critical temperatures of 405.5 K for ammonia and 154.6 K for oxygen, explain why ammonia can be liquefied at room temperature by pressure alone but oxygen cannot.',
  model: 'The critical temperature is the highest temperature at which a gas can be liquefied by applying pressure. Room temperature, about 300 K, is below the critical temperature of ammonia, so compression alone liquefies it. It is far above the critical temperature of oxygen, so oxygen must first be cooled below 154.6 K before pressure will liquefy it.',
  sol: 'Definition and comparison with 300 K.',
  scheme: [['Definition of Tc', 1], ['300 K below 405.5 K, so NH₃ liquefies', 1], ['300 K above 154.6 K, so O₂ does not', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s3-charles', short({
  marks: 3,
  stem: 'State Charles’s law. What is obtained on extrapolating a plot of volume against Celsius temperature at constant pressure, and what is its significance?',
  model: 'At constant pressure the volume of a fixed amount of gas is directly proportional to its absolute temperature. The plot of volume against temperature in degrees Celsius is a straight line which, extended backwards, meets zero volume at −273.15 °C for every gas and pressure. This point is the zero of the Kelvin scale, absolute zero.',
  sol: 'Statement, extrapolation and zero of the Kelvin scale.',
  scheme: [['Statement of the law', 1], ['Extrapolates to V = 0 at −273.15 °C', 1], ['Absolute zero, origin of the Kelvin scale', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s3-zplot', short({
  marks: 3,
  stem: 'Describe how the compressibility factor of hydrogen and of carbon dioxide at 273 K changes with pressure, and give the reason for the difference.',
  model: 'For hydrogen Z rises steadily above 1 as pressure increases, because its attractions are very weak and molecular volume dominates. For carbon dioxide Z first falls well below 1 because its strong attractions dominate, reaches a minimum, and then rises above 1 at very high pressure. Both curves start at Z equal to 1 at very low pressure.',
  sol: 'Z curves with reasons.',
  scheme: [['H₂ above 1 throughout, weak attractions', 1], ['CO₂ dips below 1, strong attractions', 1], ['CO₂ rises above 1 at high p; both start at 1', 1]],
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- long answer, 5 marks
add('l-laws', long({
  stem: 'State Boyle’s law and Charles’s law. Draw (in words) the shape of the p–V and p–1/V graphs for Boyle’s law, and combine the laws to obtain p₁V₁/T₁ = p₂V₂/T₂.',
  model: r`Boyle: at constant temperature $V \propto 1/p$ for a fixed amount of gas. The p–V graph at one temperature is a hyperbola, and p against 1/V is a straight line through the origin. Charles: at constant pressure $V \propto T$ (kelvin). Combining, $V \propto T/p$ when n is fixed, so $pV/T$ is a constant. For two states of the same gas this gives $\dfrac{p_1V_1}{T_1} = \dfrac{p_2V_2}{T_2}$, the combined gas law. Both laws hold only for a fixed amount of gas, with the temperature always in kelvin, and the combined law reduces to Boyle’s law when T is constant and to Charles’s law when p is constant.`,
  sol: 'Two laws, graphs and the combination.',
  scheme: [['Boyle’s law statement', 1], ['Shapes of the two graphs', 1], ['Charles’s law statement', 1], ['V ∝ T/p combination', 1], ['Combined gas law written', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('l-ideal', long({
  stem: 'Obtain the ideal gas equation from the gas laws, state the values of R in L bar, L atm and SI units, and deduce the expression for the density of a gas.',
  model: r`Boyle gives $V \propto 1/p$, Charles gives $V \propto T$ and Avogadro gives $V \propto n$. Together $V \propto nT/p$, so $pV = nRT$. R is 0.08314 L bar K⁻¹ mol⁻¹, 0.0821 L atm K⁻¹ mol⁻¹ and 8.314 J K⁻¹ mol⁻¹. Putting $n = m/M$ gives $pV = (m/M)RT$, and since density $d = m/V$, $d = \dfrac{pM}{RT}$, so density is proportional to molar mass at fixed p and T. Thus a heavier gas such as carbon dioxide is denser than nitrogen under the same conditions, and a measured density gives the molar mass through $M = dRT/p$.`,
  sol: 'Derivation, three values of R, density formula.',
  scheme: [['Combination of the three laws', 1], ['pV = nRT', 1], ['Three values of R', 1], ['Substitution n = m/M', 1], ['d = pM/RT', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('l-dalton', long({
  stem: 'State Dalton’s law of partial pressures and write the relation between partial pressure and mole fraction. A gas is collected over water at 300 K; explain how the pressure of the dry gas is obtained and why the correction is needed.',
  model: 'Dalton’s law: in a mixture of non-reacting gases the total pressure is the sum of the partial pressures of the components. The partial pressure of a gas is its mole fraction times the total pressure. A gas collected over water is mixed with water vapour. At equal water levels the total pressure equals the atmospheric pressure, so the pressure of the dry gas is the atmospheric pressure minus the vapour pressure of water at 300 K, about 26.7 mmHg.',
  sol: 'Law, mole-fraction relation and correction.',
  scheme: [['Statement of the law', 1], ['p(i) = x(i) × p(total)', 1], ['Gas mixed with water vapour', 1], ['p(dry) = p(total) − p(water)', 1], ['Value of vapour pressure at 300 K', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('l-dev', long({
  stem: 'Why do real gases deviate from ideal behaviour? Define the compressibility factor and explain, with the shape of the curves, how Z varies with pressure for hydrogen, nitrogen and carbon dioxide at 273 K.',
  model: r`Real molecules have a finite volume and attract one another, unlike the ideal model. The compressibility factor is $Z = pV/nRT$, equal to 1 for an ideal gas. Z less than 1 shows attractions dominate, and Z greater than 1 shows molecular volume dominates. At 273 K hydrogen rises above 1 at all pressures, nitrogen dips slightly below 1 and then rises, and carbon dioxide dips deeply below 1 before rising. All start at 1 as p tends to zero.`,
  sol: 'Causes, Z defined and interpreted, three curves.',
  scheme: [['Two causes of deviation', 1], ['Z defined, Z = 1 for ideal', 1], ['Meaning of Z < 1 and Z > 1', 1], ['Curves for H₂ and N₂', 1], ['Curve for CO₂ and the common start', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('l-vdw', long({
  stem: 'Write the van der Waals equation and explain how it corrects the ideal gas equation. What do the constants a and b represent? Define critical temperature and relate it to the constant a.',
  model: r`The equation is $\left(p + \dfrac{an^2}{V^2}\right)(V - nb) = nRT$. The volume is reduced by $nb$ because molecules occupy space, and the pressure is increased by $an^2/V^2$ because attractions reduce the force on the walls. The constant a measures the attractions and b is the excluded volume per mole, about four times the molecular volume. The critical temperature is the highest temperature at which pressure alone liquefies a gas; a larger a means stronger attractions and a higher critical temperature.`,
  sol: 'Equation, corrections, a and b, Tc linked to a.',
  scheme: [['Correct equation', 1], ['Volume correction nb', 1], ['Pressure correction and meaning of a', 1], ['Meaning of b', 0.5], ['Tc defined and linked to a', 1.5]],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- case-based
{
  const V = (1.32 * 1.0 * RA * 273) / 500;
  add('c-z', mk.case({
    passage: String.raw`A student plots compressibility factors from the following illustrative data for three gases at 273 K.

| Gas | Z at 1 atm | Z at 100 atm | Z at 500 atm |
|---|---|---|---|
| Hydrogen | 1.00 | 1.07 | 1.32 |
| Nitrogen | 1.00 | 0.98 | 1.30 |
| Carbon dioxide | 0.99 | 0.46 | 1.50 |

R = 0.0821 L atm K⁻¹ mol⁻¹.`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'At 100 atm which gas shows the greatest influence of intermolecular attractions?',
        right: 'Carbon dioxide',
        wrong: ['Hydrogen', 'Nitrogen', 'All three equally'],
        sol: 'The lowest Z (0.46) means the largest decrease below the ideal value, which is caused by attractions — option (@K).',
        d: 1, c: 'analysis', t: [1],
      })),
      part('b', num({
        stem: 'Calculate the volume, in litres, occupied by 1.00 mol of hydrogen at 273 K and 500 atm using Z = 1.32.',
        value: rn(V, 10000), tol: 0.0005, unit: 'L',
        sol: String.raw`$V = \dfrac{ZnRT}{p} = \dfrac{1.32 \times 1.00 \times 0.0821 \times 273}{500} = ${dec(V, 3)}$ L.`,
        scheme: [['V = ZnRT/p', 0.5], ['0.0592 L', 0.5]],
        d: 3, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why Z for carbon dioxide is 0.46 at 100 atm but 1.50 at 500 atm.',
        model: 'At 100 atm the molecules are close enough for their strong attractions to pull them together, so the gas is much more compressible than an ideal gas and Z is below 1. At 500 atm they are packed so tightly that their own volume and repulsion dominate, so Z rises above 1.',
        sol: 'Attractions then molecular volume.',
        scheme: [['Attractions dominate at 100 atm', 1], ['Molecular volume dominates at 500 atm', 1]],
        d: 3, c: 'analysis', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Explain why hydrogen has Z greater than 1 even at 100 atm.',
          model: 'Hydrogen molecules are very small and attract one another only very weakly, so attractions cannot lower the pressure noticeably. The volume of the molecules is then the main correction, which makes the gas harder to compress than an ideal gas, so Z is greater than 1.',
          sol: 'Weak attractions, molecular volume.',
          scheme: [['Very weak attractions in H₂', 1], ['Molecular volume dominates, Z > 1', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), () => near(V, 0.05917, 0.002) || 'z case');
}
{
  const TcC = 304.1 - 273.15;
  add('c-crit', mk.case({
    passage: String.raw`Critical constants of some gases are given below.

| Gas | Tc / K | pc / bar |
|---|---|---|
| Methane | 190.6 | 46.0 |
| Carbon dioxide | 304.1 | 73.8 |
| Ammonia | 405.5 | 113.5 |
| Hydrogen | 33.2 | 13.0 |

Cooking gas in a cylinder is a liquid under pressure at room temperature, whereas a cylinder of compressed hydrogen holds only gas.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which of these gases can be liquefied by compression alone at 298 K?',
        right: 'Carbon dioxide',
        wrong: ['Methane', 'Hydrogen', 'None of them'],
        sol: 'Only carbon dioxide has Tc (304.1 K) above 298 K; methane (190.6 K) and hydrogen (33.2 K) are far above their critical temperatures at 298 K — option (@K).',
        d: 2, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'Express the critical temperature of carbon dioxide in °C.',
        value: rn(TcC, 100), tol: 0.1, unit: '°C',
        sol: String.raw`$t = T - 273.15 = 304.1 - 273.15 = ${dec(TcC, 4)}$ °C.`,
        scheme: [['T − 273.15', 0.5], ['30.95 °C', 0.5]],
        d: 1, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why hydrogen cannot be liquefied by compression at room temperature but must first be cooled.',
        model: 'Hydrogen has a very low critical temperature of 33.2 K because its attractions are very weak. At room temperature, far above this, the molecules move too fast for attractions to bind them whatever the pressure, so hydrogen must be cooled below 33.2 K before pressure can liquefy it.',
        sol: 'Room temperature above Tc.',
        scheme: [['Tc of hydrogen is 33.2 K, very low', 1], ['Room temperature is above Tc, so cooling is needed first', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Explain why ammonia has a much higher critical temperature than methane.',
          model: 'Ammonia molecules are polar and form hydrogen bonds, so their intermolecular attractions are much stronger than the weak dispersion forces between methane molecules. Stronger attractions allow ammonia to remain liquid at higher temperatures, hence its higher critical temperature.',
          sol: 'Hydrogen bonding in ammonia.',
          scheme: [['Ammonia has hydrogen bonding and polarity', 1], ['Stronger attraction, higher Tc', 1]],
          d: 2, c: 'understanding', t: [1],
        }),
      ]),
    ],
  }), () => near(TcC, 30.95, 0.001) || 'tc c');
}
{
  const pg = 750 - 26.7;
  const n = ((pg / 760) * 0.150) / (RA * 300);
  add('c-water', mk.case({
    passage: String.raw`In a laboratory experiment, 150 mL of hydrogen is produced by the action of zinc on dilute hydrochloric acid and collected over water in an inverted measuring cylinder at 300 K. The water levels inside and outside the cylinder are made equal, and the barometer reads 750 mmHg. The vapour pressure of water at 300 K is 26.7 mmHg. R = 0.0821 L atm K⁻¹ mol⁻¹ and 760 mmHg = 1 atm.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The pressure of the dry hydrogen in the cylinder is:',
        right: '723.3 mmHg',
        wrong: ['750 mmHg', '776.7 mmHg', '26.7 mmHg'],
        sol: String.raw`$p(\ce{H2}) = 750 - 26.7 = ${dec(pg, 4)}$ mmHg — option (@K).`,
        d: 1, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'Calculate the number of millimoles of hydrogen collected.',
        value: rn(n * 1000, 100), tol: 0.03, unit: 'mmol',
        sol: String.raw`$n = \dfrac{pV}{RT} = \dfrac{${dec(pg / 760, 4)} \times 0.150}{0.0821 \times 300} = ${dec(n, 3)}$ mol $= ${dec(n * 1000, 3)}$ mmol.`,
        scheme: [['p = 0.9517 atm', 0.5], ['5.80 mmol', 0.5]],
        d: 3, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the water levels inside and outside the cylinder are made equal before the reading is taken.',
        model: 'With equal levels there is no difference in hydrostatic pressure, so the total pressure of the gas mixture inside equals the atmospheric pressure read on the barometer. The dry-gas pressure can then be found by subtracting the vapour pressure of water from the barometer reading.',
        sol: 'Total pressure equals atmospheric pressure.',
        scheme: [['Equal levels: gas pressure equals atmospheric pressure', 1], ['Allows p(dry) = p(atm) − vapour pressure', 1]],
        d: 2, c: 'understanding', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Predict, with a reason, whether the correction for water vapour would be larger or smaller if the experiment were done at 313 K.',
          model: 'The correction would be larger. The vapour pressure of water rises quickly with temperature, so at 313 K more of the total pressure is due to water vapour, and the pressure of the dry hydrogen is correspondingly smaller for the same barometer reading.',
          sol: 'Vapour pressure increases with temperature.',
          scheme: [['Larger correction', 1], ['Vapour pressure rises with temperature', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), () => near(n * 1000, 5.796, 0.002) || 'water case');
}
{
  const p = (RB * 300) / (2.0 - 0.0371) - 4.17 / 4.0;
  add('c-vdw', mk.case({
    passage: String.raw`The van der Waals constants of some gases are given below.

| Gas | a / L² bar mol⁻² | b / L mol⁻¹ |
|---|---|---|
| Helium | 0.0346 | 0.0238 |
| Nitrogen | 1.408 | 0.0391 |
| Carbon dioxide | 3.640 | 0.0427 |
| Ammonia | 4.17 | 0.0371 |

R = 0.08314 L bar K⁻¹ mol⁻¹.`,
    d: 4, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'Which gas in the table has the strongest intermolecular attractions?',
        right: 'Ammonia',
        wrong: ['Helium', 'Nitrogen', 'Carbon dioxide'],
        sol: 'The constant a measures attractions, and ammonia has the largest value (4.17) — option (@K).',
        d: 1, c: 'analysis', t: [1],
      })),
      part('b', num({
        stem: 'Calculate the pressure, in bar, of 1.00 mol of ammonia in a 2.00 L vessel at 300 K using the van der Waals equation.',
        value: rn(p, 100), tol: 0.05, unit: 'bar',
        sol: String.raw`$p = \dfrac{nRT}{V - nb} - \dfrac{an^2}{V^2} = \dfrac{${dec(RB * 300, 4)}}{${dec(2 - 0.0371, 4)}} - \dfrac{4.17}{4.00} = ${dec(p, 4)}$ bar.`,
        scheme: [['Substitution in the van der Waals equation', 0.5], ['11.66 bar', 0.5]],
        d: 3, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the real pressure of ammonia in part (b) is lower than the ideal pressure.',
        model: 'The ideal pressure, 12.5 bar, ignores attractions. Ammonia has a large a, so attractions between its molecules lower the force of collisions on the wall, an effect that exceeds the small increase caused by the excluded volume. The real pressure is therefore lower than the ideal value.',
        sol: 'Attractions dominate.',
        scheme: [['Large a means strong attractions lowering the pressure', 1], ['Excluded-volume effect smaller', 1]],
        d: 3, c: 'analysis', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Explain which of nitrogen and carbon dioxide would deviate more from ideal behaviour at 300 K and moderate pressure.',
          model: 'Carbon dioxide would deviate more. Its constant a (3.640) is much larger than that of nitrogen (1.408), so attractions between its molecules are stronger, and its Z is therefore further below 1 at moderate pressure.',
          sol: 'Larger a for CO₂.',
          scheme: [['Carbon dioxide', 1], ['Larger a, stronger attractions', 1]],
          d: 2, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), () => near(p, 11.66, 0.002) || 'vdw case');
}
