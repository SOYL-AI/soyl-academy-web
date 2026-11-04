// ch11 The Gaseous State — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'The Gaseous State — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Intermolecular forces and the gaseous state',
      r`**This chapter is for formative assessment only** (not in the annual theory paper). A gas is described by $p$, $V$, $T$ and $n$. The state of a substance depends on the balance between **thermal energy** (which keeps molecules apart) and **intermolecular forces** (which pull them together): in a gas thermal energy dominates. Forces in brief: dispersion (all molecules, weak, grows with size), dipole–dipole (polar molecules), hydrogen bonding (H on N, O, F), ion–dipole. Units: 1 atm = 101.325 kPa = 760 mmHg = 1.01325 bar; $T = t + 273.15$.`,
      [kt('Intermolecular force', 'An attraction between neighbouring molecules, much weaker than a chemical bond.'), kt('Dispersion force', 'Attraction between temporary dipoles; present in all molecules.'), kt('Liquefaction', 'Conversion of a gas into a liquid by cooling or compression.')],
      [],
      table(['Force', 'Between', 'Strength'], [['Dispersion', 'All molecules', 'Weak, grows with size'], ['Dipole–dipole', 'Polar molecules', 'Moderate'], ['Hydrogen bond', 'H on N/O/F and a lone pair', 'Strongest of the three'], ['Ion–dipole', 'Ion and polar molecule', 'Strong']], 'Table of intermolecular forces by type, particles involved and strength'),
      [1],
    ),
    sec(
      '2. Boyle’s and Charles’s laws',
      r`**Boyle:** at constant $n$ and $T$, $p \propto 1/V$, so $p_1V_1 = p_2V_2$. $p$ against $V$ is a hyperbola; $p$ against $1/V$ is a straight line of slope $nRT$.

**Charles:** at constant $n$ and $p$, $V \propto T$ (in kelvin), so $V_1/T_1 = V_2/T_2$. $V$ against $t$ in °C is a straight line meeting $V = 0$ at **−273.15 °C**.

**Combined:** $\dfrac{p_1V_1}{T_1} = \dfrac{p_2V_2}{T_2}$.`,
      [kt('Isotherm', 'A curve showing p against V at one temperature.'), kt('Absolute zero', '0 K = −273.15 °C, where the extrapolated volume of an ideal gas would be zero.')],
      [fm(r`p_1V_1 = p_2V_2`, 'Boyle'), fm(r`\dfrac{V_1}{T_1} = \dfrac{V_2}{T_2}`, 'Charles'), fm(r`\dfrac{p_1V_1}{T_1} = \dfrac{p_2V_2}{T_2}`, 'Combined gas law')],
      V.boyle,
      [1],
      [V.charles],
    ),
    sec(
      '3. Gay-Lussac’s law, Avogadro’s law and the ideal gas equation',
      r`**Gay-Lussac (pressure law):** at constant $n$ and $V$, $p \propto T$. **Avogadro:** at the same $T$ and $p$, $V \propto n$; equal volumes of gases have equal numbers of molecules. Together: $pV = nRT$.

**R** depends on units: 0.08314 L bar K⁻¹ mol⁻¹; 0.0821 L atm K⁻¹ mol⁻¹; 8.314 J K⁻¹ mol⁻¹; 62.36 L mmHg K⁻¹ mol⁻¹. (1 L bar = 100 J.)`,
      [kt('Ideal gas', 'A hypothetical gas that obeys pV = nRT at all pressures and temperatures.'), kt('Gas constant R', 'The constant in pV = nRT, equal to pV/nT; its value depends on the units.')],
      [fm(r`pV = nRT`, 'Ideal gas equation')],
      table(['Units', 'R'], [['L bar K⁻¹ mol⁻¹', '0.08314'], ['L atm K⁻¹ mol⁻¹', '0.0821'], ['J K⁻¹ mol⁻¹', '8.314'], ['L mmHg K⁻¹ mol⁻¹', '62.36']], 'Table of values of the gas constant in four units'),
      [1],
    ),
    sec(
      '4. Density, molar mass and Dalton’s law',
      r`**Density and molar mass:** $d = \dfrac{pM}{RT}$ and $M = \dfrac{dRT}{p}$; at fixed $p$ and $T$ density is proportional to molar mass.

**Dalton’s law:** $p_\text{total} = p_1 + p_2 + \dots$, with $p_i = x_i\,p_\text{total}$ and $x_i = n_i/n$.

**Gas collected over water:** $p_\text{gas} = p_\text{total} - p_{\ce{H2O}}$. Vapour pressure of water (mmHg): 17.5 at 20 °C, 23.8 at 25 °C, 26.7 at 27 °C, 31.8 at 30 °C, 55.3 at 40 °C.`,
      [kt('Partial pressure', 'The pressure a gas in a mixture would exert if it alone filled the container at the same temperature.'), kt('Mole fraction', 'Moles of a component divided by total moles.'), kt('Aqueous tension', 'The vapour pressure of water at the temperature of the experiment.')],
      [fm(r`d = \dfrac{pM}{RT}`, 'Density of a gas'), fm(r`p_i = x_i\,p_\text{total}`, 'Partial pressure')],
      table(['T / °C', '20', '25', '27', '30', '40'], [['Vapour pressure of water / mmHg', '17.5', '23.8', '26.7', '31.8', '55.3']], 'Table of the vapour pressure of water at five temperatures'),
      [1],
    ),
    sec(
      '5. Deviations from ideality and the compressibility factor',
      r`Real gases deviate because (i) molecules have a **finite volume** (important at high $p$) and (ii) there are **attractions** (important at low $T$ and moderate $p$). A real gas is closest to ideal at **low pressure and high temperature**.

$Z = \dfrac{pV}{nRT}$. $Z = 1$ ideal; $Z < 1$ attractions dominate; $Z > 1$ molecular volume dominates. Z against p: H₂ and He at 273 K start at 1 and rise; N₂ dips slightly then rises; CO₂ dips far below 1 then rises.`,
      [kt('Compressibility factor', 'Z = pV/nRT, a measure of departure from ideal behaviour.'), kt('Real gas', 'A gas that obeys pV = nRT only approximately, best at low pressure and high temperature.')],
      [fm(r`Z = \dfrac{pV}{nRT}`, 'Compressibility factor')],
      V.z,
      [1],
    ),
    sec(
      '6. van der Waals equation and liquefaction',
      r`$\left(p + \dfrac{an^2}{V^2}\right)(V - nb) = nRT$. **a** (L² bar mol⁻²) corrects for attractions (larger a: easier to liquefy); **b** (L mol⁻¹) is the excluded volume per mole, about four times the actual volume of the molecules. Examples: He a = 0.0346, b = 0.0238; CO₂ a = 3.640, b = 0.0427.

**Liquefaction:** above the **critical temperature Tc** no pressure liquefies a gas; the **critical pressure pc** is the pressure needed at Tc. Tc: CO₂ 304.1 K, NH₃ 405.5 K, Cl₂ 417 K, O₂ 154.6 K, N₂ 126.2 K, H₂ 33.2 K. Gases with large a have high Tc.`,
      [kt('Excluded volume', 'The volume around each molecule into which the centres of other molecules cannot enter; b per mole.'), kt('Critical temperature', 'The highest temperature at which a gas can be liquefied by pressure.'), kt('Critical pressure', 'The pressure needed to liquefy a gas at its critical temperature.')],
      [fm(r`\left(p + \dfrac{an^2}{V^2}\right)(V - nb) = nRT`, 'van der Waals equation')],
      table(['Gas', 'Tc / K', 'pc / bar'], [['CO₂', '304.1', '73.8'], ['NH₃', '405.5', '113.5'], ['O₂', '154.6', '50.4'], ['N₂', '126.2', '33.9'], ['H₂', '33.2', '13.0']], 'Table of critical temperature and critical pressure of five gases'),
      [1],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using temperature in °C, or mixing units of R with the units of p and V.
- Forgetting to subtract the vapour pressure of water for a gas collected over water.
- Saying Z < 1 means repulsion dominates (it is attraction).
- Calling b the actual volume of molecules (it is about four times that volume).
- Thinking a gas can always be liquefied by pressure alone (not above Tc).

**How marks are usually awarded**
- Numericals (2–3 marks): formula (1), substitution with correct units (1), answer with unit (1).
- Deviation questions: two assumptions that fail (1) + conditions for ideal behaviour (1).
- van der Waals: equation (1) + meaning of a and b (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t = 1) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Which intermolecular force acts in all molecules?', 'Dispersion (London) forces, from temporary dipoles.', 'fact'),
    fc(2, 'Why can a gas be liquefied by cooling?', 'Lower temperature reduces thermal energy until attractions win.', 'concept'),
    fc(3, 'State Boyle’s law.', 'At constant temperature the volume of a fixed amount of gas is inversely proportional to its pressure.', 'definition'),
    fc(4, 'Shape of the p–V isotherm, and of p against 1/V?', 'Hyperbola; straight line through the origin (slope nRT).', 'diagram'),
    fc(5, 'State Charles’s law.', 'At constant pressure V is directly proportional to the absolute temperature.', 'definition'),
    fc(6, 'What does the Charles plot extrapolate to?', 'V = 0 at −273.15 °C (0 K), whatever the pressure.', 'diagram'),
    fc(7, 'Combined gas law?', r`$\dfrac{p_1V_1}{T_1} = \dfrac{p_2V_2}{T_2}$`, 'formula'),
    fc(8, 'Gay-Lussac’s pressure law?', 'At constant n and V, p is proportional to T.', 'definition'),
    fc(9, 'Avogadro’s law?', 'At the same T and p, equal volumes of gases contain equal numbers of molecules (V ∝ n).', 'definition'),
    fc(10, 'The ideal gas equation?', r`$pV = nRT$`, 'formula'),
    fc(11, 'R in L bar units?', '0.08314 L bar K⁻¹ mol⁻¹.', 'fact'),
    fc(12, 'R in L atm units?', '0.0821 L atm K⁻¹ mol⁻¹.', 'fact'),
    fc(13, 'R in SI units?', '8.314 J K⁻¹ mol⁻¹ (1 L bar = 100 J).', 'fact'),
    fc(14, '1 atm in other units?', '101.325 kPa = 1.01325 bar = 760 mmHg.', 'fact'),
    fc(15, 'Formula for the density of a gas?', r`$d = \dfrac{pM}{RT}$`, 'formula'),
    fc(16, 'Find M from a measured density.', r`$M = \dfrac{dRT}{p}$`, 'formula'),
    fc(17, 'Dalton’s law?', 'In a mixture of non-reacting gases the total pressure is the sum of the partial pressures.', 'definition'),
    fc(18, 'Partial pressure in terms of mole fraction?', r`$p_i = x_i\,p_\text{total}$`, 'formula'),
    fc(19, 'Pressure of a dry gas collected over water?', 'p(gas) = p(total) − vapour pressure of water at that temperature.', 'formula'),
    fc(20, 'Worked: 0.20 mol of gas at 300 K in 4.0 L, p in bar?', r`$p = nRT/V = 0.20 \times 0.08314 \times 300 \div 4.0 = 1.25$ bar.`, 'example'),
    fc(21, 'Two assumptions of the ideal gas model that fail?', 'Molecules have zero volume; there are no attractions.', 'concept'),
    fc(22, 'When is a real gas most ideal?', 'At low pressure and high temperature.', 'fact'),
    fc(23, 'Define the compressibility factor.', r`$Z = pV/nRT$; $Z = 1$ for an ideal gas.`, 'definition'),
    fc(24, 'What does Z < 1 mean?', 'Attractions dominate; the gas is more compressible than ideal.', 'concept'),
    fc(25, 'What does Z > 1 mean?', 'Molecular volume (repulsion) dominates; the gas is less compressible than ideal.', 'concept'),
    fc(26, 'Sketch Z against p for H₂, N₂ and CO₂.', 'All start at 1; H₂ rises; N₂ dips slightly then rises; CO₂ dips deeply then rises.', 'diagram'),
    fc(27, 'The van der Waals equation?', r`$(p + an^2/V^2)(V - nb) = nRT$`, 'formula'),
    fc(28, 'Meaning of a and b?', 'a measures attractions; b is the excluded volume per mole (about four times the molecular volume).', 'concept'),
    fc(29, 'Define critical temperature.', 'The highest temperature at which a gas can be liquefied by pressure alone.', 'definition'),
    fc(30, 'Which of O₂ (154.6 K), NH₃ (405.5 K) liquefies at 300 K by pressure?', 'NH₃ only, because 300 K is below its Tc but above that of O₂.', 'example'),
    fc(31, 'Which mistake is common with temperature in gas problems?', 'Using °C instead of kelvin.', 'exam-tip'),
  ],
  status: 'draft',
  provenance: PROV,
};
