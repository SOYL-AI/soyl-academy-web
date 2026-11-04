// ch11 The Gaseous State (formative assessment only) — Part 1: gas laws and the ideal gas equation; Part 2: Dalton, real gases, van der Waals, liquefaction.
import { sl, deck, table, svgV, r, dec } from './lib.mjs';
import { BOYLE, CHARLES, ZPLOT, R_BAR, R_ATM } from './svgs.mjs';

export const V = {
  boyle: svgV(BOYLE, 'Boyle isotherms: pressure against volume as hyperbolas and pressure against reciprocal volume as straight lines through the origin', 'One mole of an ideal gas at 300 K and 400 K.'),
  charles: svgV(CHARLES, 'Volume against Celsius temperature at three pressures, extrapolated to zero volume at minus 273.15 degrees Celsius', 'Dashed parts are extrapolated; real gases liquefy before reaching this temperature.'),
  z: svgV(ZPLOT, 'Schematic plot of compressibility factor against pressure for hydrogen, nitrogen, carbon dioxide and an ideal gas', 'Schematic curves, not measured data.'),
};

// computed examples
const bal = { p1: 1.0, T1: 300, V1: 5.0, p2: 0.2, T2: 250 };
bal.V2 = (bal.p1 * bal.V1 * bal.T2) / (bal.T1 * bal.p2);
const flask = { p: 1.2, V: 2.5, T: 300 };
flask.n = (flask.p * flask.V) / (R_BAR * flask.T);
const mix = { nO: 3.2 / 32, nN: 2.8 / 28, V: 4.0, T: 300 };
mix.n = mix.nO + mix.nN;
mix.p = (mix.n * R_BAR * mix.T) / mix.V;
const wat = { Vml: 85.0, T: 300, ptot: 760, pw: 26.7 };
wat.pg = wat.ptot - wat.pw;
wat.patm = wat.pg / 760;
wat.n = (wat.patm * (wat.Vml / 1000)) / (R_ATM * wat.T);
const vd = { a: 3.64, b: 0.0427, n: 1.0, V: 0.5, T: 300 };
vd.pid = (vd.n * R_BAR * vd.T) / vd.V;
vd.pvdw = (vd.n * R_BAR * vd.T) / (vd.V - vd.n * vd.b) - (vd.a * vd.n * vd.n) / (vd.V * vd.V);

const boyleRows = [1, 2, 4, 8].map((p) => {
  const v = (R_BAR * 300) / p;
  return [String(p), v.toFixed(2), (p * v).toFixed(2)];
});
const dens = [['Hydrogen', 2.016], ['Helium', 4.003], ['Ammonia', 17.03], ['Nitrogen', 28.01], ['Oxygen', 32.00], ['Carbon dioxide', 44.01], ['Chlorine', 70.91]].map(([n, M]) => [n, String(M), ((1.0 * M) / (R_BAR * 300)).toFixed(3)]);

export const deck1 = deck({
  part: 1,
  title: 'The Gaseous State — Part 1: Gas laws and the ideal gas equation',
  goals: [
    'Describe the role of intermolecular forces in deciding the state of matter',
    'State Boyle, Charles, Gay-Lussac and Avogadro laws and interpret their graphs',
    'Use pV = nRT with R in different units to find pressure, volume, moles, density and molar mass',
  ],
  slides: [
    sl('title', 'The Gaseous State', {
      b: 'Part 1 — gas laws and the ideal gas equation. **This chapter is formative assessment only:** it is not in the annual theory paper, but it is taught here at textbook depth, with simple numericals, for school tests.',
      v: table(['Variable', 'Symbol', 'Common units', 'Link to SI'], [['Pressure', 'p', 'atm, bar, mmHg, kPa', '1 atm = 101.325 kPa = 760 mmHg; 1 bar = 100 kPa'], ['Volume', 'V', 'L, dm³, mL, m³', '1 L = 1 dm³ = 10⁻³ m³'], ['Temperature', 'T', 'kelvin (K)', 'T = t + 273.15'], ['Amount', 'n', 'mol', 'n = mass ÷ molar mass']], 'Table of the four variables that describe a gas with symbols, units and conversions'),
      n: 'Welcome to the gaseous state. A bicycle tyre, a kitchen cylinder and a balloon at a fair are all gases, and four measurable quantities describe them: pressure, volume, temperature and the amount of gas. This chapter is for formative assessment only, so it will not be in the annual theory paper, but your school tests can ask it. Part one covers the gas laws and the ideal gas equation.',
    }),
    sl('concept', 'Intermolecular forces and the state of matter', {
      b: 'A substance is a gas when the **thermal energy** of its molecules is much greater than the **intermolecular attractions**. Cooling or compressing a gas reduces thermal energy or brings molecules closer, and attraction wins: the gas **liquefies**.',
      v: table(['Force (in brief)', 'Acts between', 'Relative strength', 'Example'], [['Dispersion (London)', 'All molecules, from temporary dipoles', 'Weak, grows with size', 'Noble gases, N₂, CH₄'], ['Dipole–dipole', 'Polar molecules', 'Moderate', 'HCl, SO₂'], ['Hydrogen bonding', 'H on N, O or F and a lone pair', 'Strongest of these three', 'NH₃, H₂O, HF'], ['Ion–dipole', 'Ion and polar molecule', 'Strong', 'Na⁺ in water']], 'Table of the main intermolecular forces with where they act, relative strength and examples'),
      n: 'What decides whether a substance is a gas, a liquid or a solid? A contest between thermal energy, which keeps molecules moving apart, and intermolecular attraction, which pulls them together. Dispersion forces act in every molecule. Dipole attractions act between polar molecules, and hydrogen bonds are the strongest of the three. In a gas the thermal energy wins. Cool it or squeeze it enough and the attraction wins, so the gas liquefies.',
    }),
    sl('concept', 'Boyle’s law: pressure and volume', {
      b: 'At **constant temperature** the volume of a fixed amount of gas is **inversely proportional to its pressure**: $pV = \\text{constant}$, or $p_1V_1 = p_2V_2$.',
      v: table(['p / bar', 'V / L (1 mol, 300 K)', 'p × V / L bar'], boyleRows, 'Table of pressure, volume and the constant product for one mole of ideal gas at 300 kelvin'),
      n: 'Boyle found that squeezing a gas at constant temperature makes its pressure rise in exact proportion. Double the pressure and the volume halves. The product of pressure and volume stays the same. The table shows one mole of gas at three hundred kelvin: whatever the pressure, multiplying it by the volume always gives the same number, about twenty four point nine. That is why a bicycle pump works.',
    }),
    sl('diagram', 'Boyle isotherms', {
      b: 'A graph of $p$ against $V$ at one temperature (an **isotherm**) is a **hyperbola**; $p$ against $1/V$ is a **straight line through the origin** with slope $nRT$. A higher temperature gives a higher curve.',
      v: V.boyle,
      n: 'On the left, pressure against volume is a hyperbola, and the curve for the higher temperature lies above the lower one. On the right, plotting pressure against one over volume turns the curve into a straight line through the origin. Its slope equals the amount times R times the temperature, so the hotter gas has the steeper line. Straight lines are easier to test than curves, which is why this graph matters.',
    }),
    sl('check', 'Quick check: Boyle’s law', {
      b: 'Apply Boyle’s law to a compressed gas.',
      n: 'Quick check. Remember that at constant temperature pressure and volume are inversely proportional.',
      chk: 'chk-boyle',
    }),
    sl('concept', 'Charles’s law and the Kelvin scale', {
      b: 'At **constant pressure** the volume of a fixed amount of gas is **directly proportional to its absolute temperature**: $V/T = \\text{constant}$. A plot of $V$ against $t$ in °C is a straight line which, extrapolated, meets $V = 0$ at **−273.15 °C**, the zero of the Kelvin scale.',
      v: table(['t / °C', 'T / K', 'V / L (1 mol, 1 bar)'], [-173.15, -73.15, 0, 26.85, 126.85].map((t) => [String(t), String(t + 273.15), ((R_BAR * (t + 273.15)) / 1).toFixed(2)]), 'Table of temperature in Celsius and kelvin with the molar volume of an ideal gas at one bar'),
      n: 'Charles found that at constant pressure a gas expands steadily when heated. For each degree Celsius its volume changes by a fixed fraction of its volume at zero degrees. Extend the line backwards and the volume would vanish at minus two hundred seventy three point one five degrees. That temperature is the zero of the Kelvin scale. In every gas law, temperature must be in kelvin, never in Celsius.',
    }),
    sl('diagram', 'The Charles plot', {
      b: 'Lines for different pressures all point to the **same point on the temperature axis, −273.15 °C**. A smaller pressure gives a steeper line (greater volume at the same temperature). Real gases liquefy before this temperature is reached.',
      v: V.charles,
      n: 'Here are three lines of volume against Celsius temperature, one for each pressure. Each is straight, and when extended backwards as the dashed lines, all meet the axis at the same point, minus two hundred seventy three point one five degrees Celsius. At lower pressure the volume at a given temperature is larger, so the line is steeper. Real gases never get there, because they liquefy first.',
    }),
    sl('example', 'Worked example: a weather balloon', {
      b: r`**Problem.** A weather balloon holds ${bal.V1} L of helium at ${bal.p1} bar and ${bal.T1} K at the ground. It rises to a height where the pressure is ${bal.p2} bar and the temperature is ${bal.T2} K. Find its volume, assuming the amount of gas is constant.

**Step 1.** The amount is fixed, so use $\dfrac{p_1V_1}{T_1} = \dfrac{p_2V_2}{T_2}$.

**Step 2.** $V_2 = \dfrac{p_1V_1T_2}{T_1p_2} = \dfrac{${bal.p1} \times ${bal.V1} \times ${bal.T2}}{${bal.T1} \times ${bal.p2}} = ${dec(bal.V2, 3)}$ L.

**Answer:** about ${dec(bal.V2, 2)} L. The fall in pressure (a factor of 5) outweighs the cooling.`,
      v: table(['Quantity', 'Ground', 'High altitude'], [['p / bar', String(bal.p1), String(bal.p2)], ['T / K', String(bal.T1), String(bal.T2)], ['V / L', String(bal.V1), dec(bal.V2, 3)]], 'Table of pressure, temperature and volume of a balloon at the ground and at altitude'),
      n: 'Let us work through it. The amount of gas does not change, so the combined law applies: pressure times volume over temperature stays constant. Multiply the starting pressure, volume and the final temperature, then divide by the starting temperature and the final pressure. The result is about twenty point eight litres, more than four times the starting volume. The pressure fell by a factor of five, which wins over the drop in temperature.',
    }),
    sl('concept', 'Gay-Lussac’s law and Avogadro’s law', {
      b: '**Gay-Lussac:** at constant volume, $p \\propto T$. **Avogadro:** at the same $T$ and $p$, equal volumes of gases contain equal numbers of molecules, so $V \\propto n$.',
      v: table(['Law', 'Constant', 'Relation', 'Everyday case'], [['Boyle', 'n, T', 'p ∝ 1/V', 'Bicycle pump'], ['Charles', 'n, p', 'V ∝ T', 'Hot-air balloon'], ['Gay-Lussac (pressure law)', 'n, V', 'p ∝ T', 'Tyre pressure rises on a hot road'], ['Avogadro', 'p, T', 'V ∝ n', 'Inflating a balloon with more gas']], 'Table of the four gas laws with constants, relations and everyday cases'),
      n: 'Two more laws complete the picture. The pressure law of Gay Lussac says that in a rigid container the pressure is proportional to the kelvin temperature. That is why a sealed tin should not be thrown into a fire. The law of Avogadro says that at the same temperature and pressure, equal volumes of any gases hold equal numbers of molecules, so the volume is proportional to the amount of gas.',
    }),
    sl('check', 'Quick check: pressure law', {
      b: 'Apply Gay-Lussac’s law to a sealed vessel.',
      n: 'Quick check. In a rigid vessel, volume and amount are fixed, so one quantity changes with temperature.',
      chk: 'chk-gl',
    }),
    sl('concept', 'The ideal gas equation and the gas constant', {
      b: 'Combining the four laws gives $pV = nRT$. The value of **R** depends on the units used for $p$ and $V$.',
      m: [r`pV = nRT`, r`R = \dfrac{pV}{nT}`],
      v: table(['Units', 'Value of R'], [['L bar K⁻¹ mol⁻¹', '0.08314'], ['L atm K⁻¹ mol⁻¹', '0.0821'], ['J K⁻¹ mol⁻¹ (SI)', '8.314'], ['L mmHg K⁻¹ mol⁻¹ (L torr)', '62.36'], ['cal K⁻¹ mol⁻¹', '1.987']], 'Table of values of the gas constant R in different units'),
      n: 'Putting the four laws together gives the ideal gas equation: pressure times volume equals the amount times R times the temperature. Its numerical value depends on the units. With pressure in bar and volume in litres it is zero point zero eight three one four. With atmospheres it is zero point zero eight two one. In SI units it is eight point three one four joules per kelvin per mole. Always match R to your units.',
    }),
    sl('example', 'Worked example: moles in a flask', {
      b: r`**Problem.** How many moles of gas are in a ${flask.V} L flask at ${flask.p} bar and ${flask.T} K? Also express R = 0.08314 L bar K⁻¹ mol⁻¹ in J K⁻¹ mol⁻¹.

**Step 1.** $n = \dfrac{pV}{RT} = \dfrac{${flask.p} \times ${flask.V}}{0.08314 \times ${flask.T}} = ${dec(flask.n, 3)}$ mol.

**Step 2.** 1 L bar = 100 kPa × 10⁻³ m³ = 100 J, so $R = 0.08314 \times 100 = 8.314$ J K⁻¹ mol⁻¹.

**Answer:** ${dec(flask.n, 3)} mol of gas.`,
      v: table(['Quantity', 'Value', 'Unit'], [['p', String(flask.p), 'bar'], ['V', String(flask.V), 'L'], ['T', String(flask.T), 'K'], ['R', '0.08314', 'L bar K⁻¹ mol⁻¹'], ['n (calculated)', dec(flask.n, 3), 'mol']], 'Table of the data and result for the number of moles of gas in the flask'),
      n: 'Start from the ideal gas equation and solve for the amount: pressure times volume divided by R times temperature. Use R in litres, bar and kelvin. Substituting one point two bar, two point five litres and three hundred kelvin gives about zero point one two moles. To convert R to joules, remember that one litre bar equals one hundred joules, so zero point zero eight three one four becomes eight point three one four.',
    }),
    sl('concept', 'Density and molar mass of a gas', {
      b: 'Since $n = m/M$, the equation becomes $pV = (m/M)RT$, giving $d = \\dfrac{m}{V} = \\dfrac{pM}{RT}$ and $M = \\dfrac{dRT}{p}$. At fixed $p$ and $T$, **density is proportional to molar mass**.',
      m: [r`d = \dfrac{pM}{RT}`],
      v: table(['Gas', 'M / g mol⁻¹', 'd / g L⁻¹ (1.00 bar, 300 K)'], dens, 'Table of molar mass and calculated density for seven gases at one bar and 300 kelvin'),
      n: 'Replace the amount by mass over molar mass and the ideal gas equation yields a formula for density: pressure times molar mass over R times temperature. At the same pressure and temperature, heavier gases are denser. In the table, hydrogen is the lightest and chlorine the heaviest. Turn the formula around and a measured density gives the molar mass, which is how chemists identify an unknown gas.',
    }),
    sl('check', 'Quick check: density of a gas', {
      b: 'Compare the densities of two gases.',
      n: 'Quick check. At the same pressure and temperature, what does the density depend on?',
      chk: 'chk-dens',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Gases: thermal energy beats intermolecular attraction.',
        'Boyle: pV constant at fixed n, T. Charles: V/T constant. Gay-Lussac: p/T constant. Avogadro: V/n constant.',
        'Absolute zero is −273.15 °C; always use kelvin.',
        'pV = nRT; R = 0.08314 L bar, 0.0821 L atm or 8.314 J per kelvin per mole.',
        'd = pM/RT, so M = dRT/p.',
      ],
      v: table(['Law', 'Formula'], [['Boyle', 'p₁V₁ = p₂V₂'], ['Charles', 'V₁/T₁ = V₂/T₂'], ['Gay-Lussac', 'p₁/T₁ = p₂/T₂'], ['Combined', 'p₁V₁/T₁ = p₂V₂/T₂'], ['Ideal gas', 'pV = nRT']], 'Table summarising the gas law formulas'),
      n: 'Let us sum up Part one. A gas stays a gas when thermal energy beats attraction. Boyle, Charles, Gay Lussac and Avogadro each hold two quantities fixed and link the other two. They combine into the ideal gas equation. Temperature must be in kelvin, and R must match your units. From the equation, density equals pressure times molar mass over R times temperature.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Convert °C to K first; convert mL to L and mmHg to atm to match R.',
        'Write the formula, then substitute with units, then the answer with units.',
        'For graphs, state what is plotted and what stays constant.',
        'Use d = pM/RT for density and molar mass problems.',
      ],
      v: table(['Slip', 'Fix'], [['Using t in °C in V₁/T₁ = V₂/T₂', 'Use T = t + 273.15'], ['Using R = 8.314 with L and bar', 'Use 0.08314 for L bar'], ['Saying V ∝ 1/p at constant T for any amount', 'It holds for a fixed amount of gas']], 'Table of three common slips with gas laws and their fixes'),
      n: 'Tips for tests. Convert the temperature to kelvin before anything else. Change millilitres to litres and mmHg to atmospheres so that they match the value of R you use. Show the formula, then the substitution with units, then the answer. For a graph question, say what is plotted and what is kept constant. And for density and molar mass, use the formula with pressure, molar mass, R and temperature.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'The Gaseous State — Part 2: Mixtures, real gases and liquefaction',
  goals: [
    'Use Dalton’s law, including the vapour pressure of water for gases collected over water',
    'Explain deviations from ideal behaviour and read the compressibility factor curves',
    'Explain the van der Waals equation qualitatively and the idea of critical temperature',
  ],
  slides: [
    sl('title', 'Mixtures and real gases', {
      b: 'Part 2 — gas mixtures, why real gases are not ideal, and how they liquefy. As in Part 1, this chapter is **formative assessment only** and is taught at textbook depth for school tests.',
      v: table(['Ideal gas', 'Real gas'], [['Molecules have no volume', 'Molecules have a small but real volume'], ['No attractions between molecules', 'Weak attractions exist and cause liquefaction'], ['pV = nRT at all p and T', 'Obeys it best at low p and high T'], ['Z = 1 always', 'Z differs from 1']], 'Table contrasting ideal and real gases'),
      n: 'Part two asks what happens when gases are mixed, and why real gases do not always obey the ideal gas equation. We will meet partial pressures, the gas collected over water in the laboratory, the compressibility factor, the van der Waals equation, and the critical temperature above which a gas cannot be liquefied by pressure alone. As before, this chapter is for formative assessment only.',
    }),
    sl('concept', 'Dalton’s law of partial pressures', {
      b: 'For non-reacting gases in a container, the **total pressure is the sum of the partial pressures**: $p_\\text{total} = p_1 + p_2 + \\dots$. The partial pressure of a gas is $p_i = x_i\\,p_\\text{total}$, where $x_i$ is its mole fraction; each gas also obeys $p_iV = n_iRT$.',
      m: [r`p_\text{total} = p_1 + p_2 + p_3`, r`p_i = x_i\,p_\text{total}`],
      v: table(['Term', 'Meaning', 'Formula'], [['Partial pressure', 'Pressure the gas would exert alone in the same volume at the same T', 'pᵢ = nᵢRT/V'], ['Mole fraction', 'Fraction of the molecules that are gas i', 'xᵢ = nᵢ/n total'], ['Dalton’s law', 'Total pressure of a mixture', 'p total = Σ pᵢ'], ['Use', 'Breathing mixtures, gas analysis, collection over water', '—']], 'Table of partial pressure, mole fraction and Dalton law'),
      n: 'The law of Dalton says that in a mixture of gases that do not react, each gas behaves as if it were alone, and the total pressure is the sum of the partial pressures. The partial pressure of a gas is its mole fraction times the total pressure. Because the ideal gas equation applies to each gas separately, the partial pressure also equals the amount of that gas times R times temperature over the container volume.',
    }),
    sl('example', 'Worked example: oxygen and nitrogen in a flask', {
      b: r`**Problem.** 3.2 g of oxygen and 2.8 g of nitrogen are placed in a ${mix.V} L vessel at ${mix.T} K. Find the total pressure and the partial pressure of each gas. (O = 16, N = 14; R = 0.08314 L bar K⁻¹ mol⁻¹)

**Step 1.** $n(\ce{O2}) = 3.2 \div 32 = ${dec(mix.nO, 2)}$ mol and $n(\ce{N2}) = 2.8 \div 28 = ${dec(mix.nN, 2)}$ mol, so $n = ${dec(mix.n, 2)}$ mol.

**Step 2.** $p = \dfrac{nRT}{V} = \dfrac{${dec(mix.n, 2)} \times 0.08314 \times ${mix.T}}{${mix.V}} = ${dec(mix.p, 3)}$ bar.

**Step 3.** The mole fractions are 0.50 each, so each partial pressure is ${dec(mix.p / 2, 3)} bar.`,
      v: table(['Gas', 'n / mol', 'Mole fraction', 'Partial pressure / bar'], [['O₂', dec(mix.nO, 2), '0.50', dec(mix.p / 2, 3)], ['N₂', dec(mix.nN, 2), '0.50', dec(mix.p / 2, 3)], ['Total', dec(mix.n, 2), '1.00', dec(mix.p, 3)]], 'Table of moles, mole fraction and partial pressure of oxygen and nitrogen in the vessel'),
      n: 'Convert each mass to moles using the molar mass: three point two grams of oxygen is zero point one moles, and two point eight grams of nitrogen is also zero point one moles. The total is zero point two moles. Insert this in the ideal gas equation for the whole vessel to get the total pressure, about one point two five bar. The mole fractions are one half each, so each gas contributes half of the total pressure.',
    }),
    sl('concept', 'A gas collected over water', {
      b: 'A gas bubbled through water carries **water vapour** with it. At equilibrium the total pressure equals the atmospheric pressure, so **p(dry gas) = p(total) − p(water vapour)**, where the water vapour pressure (aqueous tension) depends only on temperature.',
      m: [r`p_\text{gas} = p_\text{total} - p_{\ce{H2O}}`],
      v: table(['Temperature / °C', '20', '25', '27', '30', '40'], [['Vapour pressure of water / mmHg', '17.5', '23.8', '26.7', '31.8', '55.3']], 'Table of the vapour pressure of water at five temperatures in mmHg'),
      n: 'In the laboratory we often collect a gas by displacing water. The gas in the jar is a mixture of the gas we made and water vapour. When the water levels inside and outside match, the total pressure equals the air pressure. So the pressure of the dry gas is the total minus the vapour pressure of water at that temperature. The table lists the vapour pressure, which rises quickly with temperature.',
    }),
    sl('check', 'Quick check: partial pressures', {
      b: 'Use Dalton’s law for a gas over water.',
      n: 'Quick check. Subtract the vapour pressure of water from the total.',
      chk: 'chk-dalton',
    }),
    sl('example', 'Worked example: oxygen collected over water', {
      b: r`**Problem.** ${wat.Vml} mL of oxygen is collected over water at ${wat.T} K when the barometer reads ${wat.ptot} mmHg. The vapour pressure of water at ${wat.T} K is ${wat.pw} mmHg. How many moles of oxygen are collected? (R = 0.0821 L atm K⁻¹ mol⁻¹)

**Step 1.** $p(\ce{O2}) = ${wat.ptot} - ${wat.pw} = ${dec(wat.pg, 4)}$ mmHg $= ${dec(wat.pg, 4)} \div 760 = ${dec(wat.patm, 4)}$ atm.

**Step 2.** $n = \dfrac{pV}{RT} = \dfrac{${dec(wat.patm, 4)} \times 0.0850}{0.0821 \times ${wat.T}} = ${dec(wat.n, 3)}$ mol.

**Answer:** about ${(wat.n * 1000).toFixed(2)} millimoles of oxygen.`,
      v: table(['Step', 'Quantity', 'Value'], [['1', 'p(total) / mmHg', String(wat.ptot)], ['2', 'p(water vapour) / mmHg', String(wat.pw)], ['3', 'p(oxygen) / mmHg', dec(wat.pg, 4)], ['4', 'p(oxygen) / atm', dec(wat.patm, 4)], ['5', 'n(oxygen) / mol', dec(wat.n, 3)]], 'Table of steps from total pressure to moles of oxygen collected over water'),
      n: 'Subtract the vapour pressure of water from the barometer reading: seven hundred sixty minus twenty six point seven leaves seven hundred thirty three point three millimetres of mercury for oxygen. Divide by seven hundred sixty to get atmospheres, then use the ideal gas equation with the volume in litres. The answer is a little over three millimoles. If you forgot the water vapour you would overestimate the oxygen by about three and a half percent.',
    }),
    sl('concept', 'Why real gases deviate from ideality', {
      b: 'The ideal gas model assumes (i) molecules have **zero volume** and (ii) there are **no attractions**. Both fail: at **high pressure** the molecular volume becomes a large share of the container; at **low temperature** attractions slow the molecules and reduce the pressure. Real gases are **most ideal at low pressure and high temperature**.',
      v: table(['Condition', 'Which assumption fails', 'Effect on pressure or volume'], [['High pressure', 'Volume of molecules cannot be ignored', 'Volume larger than ideal'], ['Low temperature (moderate p)', 'Attractions matter', 'Pressure lower than ideal'], ['Low pressure, high temperature', 'Both effects small', 'Behaves ideally']], 'Table of conditions for deviation from ideal behaviour and the assumption that fails'),
      n: 'The ideal gas is a model with two assumptions: molecules occupy no space, and they do not attract one another. At high pressure the molecules are packed close and their own volume can no longer be ignored, so the gas is harder to compress than predicted. At low temperature the molecules move slowly and attractions pull them together, so the pressure on the walls is less than predicted. At low pressure and high temperature both fade.',
    }),
    sl('concept', 'The compressibility factor Z', {
      b: '$Z = \\dfrac{pV}{nRT}$ measures the departure from ideality: $Z = 1$ for an ideal gas. **Z < 1** means attractions dominate (gas easier to compress); **Z > 1** means repulsion and molecular volume dominate (harder to compress).',
      m: [r`Z = \dfrac{pV}{nRT}`],
      v: table(['Z', 'Meaning', 'Dominant effect', 'Typical case'], [['Z = 1', 'Ideal', 'None', 'Any gas as p → 0'], ['Z < 1', 'More compressible than ideal', 'Attractions', 'CO₂, N₂ at moderate p and 273 K'], ['Z > 1', 'Less compressible than ideal', 'Molecular volume (repulsion)', 'Any gas at very high p; H₂ and He at 273 K']], 'Table of compressibility factor values with their meaning, dominant effect and typical cases'),
      n: 'Chemists use one number, the compressibility factor, to show how far a gas strays from ideal. It is pressure times volume divided by the amount times R times temperature. For an ideal gas it is exactly one. If it is below one, attractions dominate and the gas squeezes more easily than predicted. If it is above one, the volume of the molecules dominates and the gas resists compression.',
    }),
    sl('diagram', 'Z against p for real gases', {
      b: 'All gases start at $Z = 1$ as $p \\to 0$. **H₂** (very weak attractions) lies above 1 at all pressures at 273 K. **N₂** dips slightly then rises above 1. **CO₂** (strong attractions) dips far below 1 and then rises steeply when the molecular volume takes over.',
      v: V.z,
      n: 'This schematic graph compares gases at about two hundred seventy three kelvin. The dashed line is the ideal gas, with Z equal to one. Hydrogen, whose molecules barely attract, stays above the line all the way. Nitrogen dips a little below it and then climbs above. Carbon dioxide, with much stronger attractions, dips deeply before the molecular volume pushes it up. At very low pressure every curve returns to one.',
    }),
    sl('check', 'Quick check: Z values', {
      b: 'Interpret a value of Z.',
      n: 'Quick check. A value below one tells you which effect dominates.',
      chk: 'chk-z',
    }),
    sl('concept', 'The van der Waals equation', {
      b: 'van der Waals corrected the ideal equation for **molecular volume** (b) and **attractions** (a): $\\left(p + \\dfrac{an^2}{V^2}\\right)(V - nb) = nRT$. **b** is the excluded volume per mole (about four times the volume of the molecules); **a** measures the strength of attractions. A gas with larger a is easier to liquefy.',
      m: [r`\left(p + \dfrac{an^2}{V^2}\right)(V - nb) = nRT`],
      v: table(['Gas', 'a / L² bar mol⁻²', 'b / L mol⁻¹'], [['Helium', '0.0346', '0.0238'], ['Hydrogen', '0.244', '0.0266'], ['Oxygen', '1.378', '0.0318'], ['Nitrogen', '1.408', '0.0391'], ['Ammonia', '4.17', '0.0371'], ['Carbon dioxide', '3.640', '0.0427']], 'Table of van der Waals constants a and b for six gases'),
      n: 'The van der Waals equation fixes both faults of the ideal model. The term n b is subtracted from the volume, because the molecules themselves take up room, so b is the excluded volume per mole. The term a n squared over V squared is added to the pressure, because attractions reduce the pressure on the walls, and a measures how strong they are. Ammonia and carbon dioxide have large a values, and helium has a very small one.',
    }),
    sl('example', 'Worked example: ideal against van der Waals', {
      b: r`**Problem.** Compare the pressure of ${vd.n} mol of $\ce{CO2}$ in ${vd.V} L at ${vd.T} K from (i) the ideal equation and (ii) the van der Waals equation (a = 3.64 L² bar mol⁻², b = 0.0427 L mol⁻¹).

**(i)** $p = \dfrac{nRT}{V} = \dfrac{${vd.n} \times 0.08314 \times ${vd.T}}{${vd.V}} = ${dec(vd.pid, 4)}$ bar.

**(ii)** $p = \dfrac{nRT}{V - nb} - \dfrac{an^2}{V^2} = \dfrac{${dec(vd.n * R_BAR * vd.T, 4)}}{${dec(vd.V - vd.b, 4)}} - \dfrac{3.64}{${vd.V * vd.V}} = ${dec(vd.pvdw, 3)}$ bar.

**Answer:** the real pressure (${dec(vd.pvdw, 3)} bar) is lower than the ideal value because attractions dominate.`,
      v: table(['Model', 'Pressure / bar', 'Reason'], [['Ideal', dec(vd.pid, 4), 'No attractions, no volume'], ['van der Waals', dec(vd.pvdw, 3), 'Attractions lower p (−a term) more than excluded volume raises it']], 'Table comparing the ideal and van der Waals pressure of carbon dioxide'),
      n: 'Compute the ideal pressure first: about fifty bar. For the van der Waals value, subtract the excluded volume from the container volume, which raises the pressure, then subtract the attraction term, which lowers it. Here the attraction term, about fourteen and a half bar, outweighs the volume correction of about four and a half, so the real pressure is about forty bar. It is lower than ideal, as the compressibility factor below one predicts.',
    }),
    sl('concept', 'Liquefaction and critical temperature', {
      b: 'Attractions can liquefy a gas only if molecules are slow enough. The **critical temperature Tc** is the highest temperature at which a gas can be liquefied by pressure; above it, no pressure liquefies it. The **critical pressure pc** is the pressure needed at Tc. Gases with large a have high Tc.',
      v: table(['Gas', 'Tc / K', 'pc / bar', 'Liquefied at 300 K by pressure?'], [['Carbon dioxide', '304.1', '73.8', 'Yes, just below Tc'], ['Ammonia', '405.5', '113.5', 'Yes'], ['Chlorine', '417', '77', 'Yes'], ['Oxygen', '154.6', '50.4', 'No'], ['Nitrogen', '126.2', '33.9', 'No'], ['Hydrogen', '33.2', '13.0', 'No']], 'Table of critical temperature and critical pressure of six gases and whether pressure alone liquefies them at 300 kelvin'),
      n: 'To liquefy a gas we must make attraction win over thermal motion. Squeezing alone is not enough if the molecules are too energetic. Each gas has a critical temperature: above it, no pressure can produce a liquid. Ammonia and chlorine are well above room temperature and are easily liquefied by pressure. Oxygen, nitrogen and hydrogen are far below it, so they must first be cooled. Carbon dioxide is just above room temperature.',
    }),
    sl('check', 'Quick check: critical temperature', {
      b: 'Decide whether a gas can be liquefied.',
      n: 'Quick check. Compare the room temperature with the critical temperature.',
      chk: 'chk-crit',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Dalton: p total = Σ pᵢ and pᵢ = xᵢ p total.',
        'Gas over water: p(gas) = p(total) − p(water vapour).',
        'Real gases deviate because molecules have volume and attract each other; ideal at low p, high T.',
        'Z = pV/nRT: Z < 1 attractions, Z > 1 molecular volume.',
        'van der Waals: (p + an²/V²)(V − nb) = nRT; a for attractions, b for excluded volume.',
        'Above Tc no pressure liquefies a gas.',
      ],
      v: table(['Quantity', 'Ideal gas', 'Real gas'], [['Z', '1', 'Not 1 (below 1 at moderate p, above 1 at high p)'], ['Attractions', 'None', 'Present (a)'], ['Molecular volume', 'None', 'Present (b)'], ['Liquefaction', 'Never', 'Below Tc']], 'Table summarising ideal and real gas behaviour'),
      n: 'Let us sum up Part two. Partial pressures add up to the total, and a gas collected over water is wet, so subtract the vapour pressure of water. Real gases differ from ideal ones because their molecules have volume and attract each other, and the compressibility factor shows how much. The van der Waals equation adds two corrections, a and b. And above the critical temperature no pressure can liquefy a gas.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For gases over water, always subtract the vapour pressure at the experiment temperature.',
        'Link Z < 1 to attractions and Z > 1 to molecular volume.',
        'Say a = attractions, b = excluded volume, and give the unit of each.',
        'Use Tc to decide whether pressure alone can liquefy a gas.',
      ],
      v: table(['Slip', 'Fix'], [['Using total pressure for the dry gas', 'Subtract the vapour pressure of water'], ['Saying b is the volume of molecules', 'b is the excluded volume, about four times that volume'], ['Saying any gas can be liquefied at any temperature by pressure', 'Only below Tc']], 'Table of three common slips about real gases and their fixes'),
      n: 'Tips for tests. When a gas is collected over water, subtract the vapour pressure at that temperature. Link a compressibility factor below one to attractions and above one to molecular volume. Remember that a is for attractions and b is the excluded volume, with their units. And use the critical temperature to decide whether pressure alone can liquefy a gas, because above it, nothing will.',
    }),
  ],
});
