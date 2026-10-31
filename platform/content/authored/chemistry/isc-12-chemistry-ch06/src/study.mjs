// ISC 12 Chemistry ch06 Activation Energy, Collision Theory and Arrhenius Equation — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V, mbPlot, arrPlot } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Activation Energy, Collision Theory and Arrhenius Equation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Energy barrier, threshold energy and activation energy',
      r`Reactants must cross an **energy barrier** to become products. **Threshold energy:** the minimum energy colliding molecules must have to react. **Activation energy** $E_\text{a}$ = threshold energy − average energy of the reactants. **Activated complex:** the unstable, high-energy arrangement at the top of the barrier (bonds partly broken and partly formed); it may give products or revert to reactants.

Lower $E_\text{a}$ → faster reaction at a given temperature.`,
      [kt('Threshold energy', 'The minimum energy that colliding molecules must possess for the collision to result in reaction.'), kt('Activation energy', 'The extra energy, above the average energy of reactants, needed to reach the threshold energy.'), kt('Activated complex', 'The unstable species at the top of the energy barrier.')],
      [fm(r`E_\text{a} = E_\text{threshold} - E_\text{reactants}`, 'Activation energy')],
      table(['Term', 'Position on the energy profile'], [['Reactants', 'Starting level'], ['Activated complex', 'Peak (threshold energy)'], ['Products', 'Final level'], ['Ea', 'Reactants to peak']], 'Table of positions on an energy profile'),
      [1],
    ),
    sec(
      '2. Energy profiles; effect of a catalyst',
      r`**Exothermic:** products below reactants, $\Delta H < 0$. **Endothermic:** products above reactants, $\Delta H > 0$. In all cases $\Delta H = E_\text{a(forward)} - E_\text{a(reverse)}$, so for an endothermic reaction $E_\text{a(f)} > \Delta H$.

**Catalyst:** provides an alternative path of lower $E_\text{a}$ for both forward and reverse reactions; does not change ΔH, ΔG, K or the position of equilibrium; is regenerated; equilibrium is reached sooner. Enzymes are biological catalysts.`,
      [kt('Catalyst', 'A substance that increases the rate by providing a path of lower activation energy and is regenerated at the end.')],
      [fm(r`\Delta H = E_\text{a(forward)} - E_\text{a(reverse)}`, 'Enthalpy and activation energies')],
      V.profile,
      [1],
      [V.endo],
    ),
    sec(
      '3. Collision theory',
      r`Reactant molecules (treated as hard spheres) must collide. A collision is **effective** only if (i) the energy of the colliding molecules is at least the threshold energy and (ii) the molecules have the **proper orientation**. Rate $= P\,Z_\text{AB}\,e^{-E_\text{a}/RT}$: $Z_\text{AB}$ = collision frequency, $e^{-E_\text{a}/RT}$ = fraction of collisions with enough energy, $P$ = probability (steric) factor.

Raising temperature increases the collision frequency slightly but the **fraction of energetic molecules** greatly (tail of the energy distribution), so the rate rises sharply. (The mathematical treatment of collision theory is not required.)`,
      [kt('Effective collision', 'A collision with energy at least equal to the threshold energy and proper orientation, which leads to reaction.'), kt('Steric factor', 'The probability that a collision has the proper orientation.')],
      [fm(r`\text{Rate} = P\,Z_\text{AB}\,e^{-E_\text{a}/RT}`, 'Collision theory rate')],
      V.orient,
      [2],
      [mbPlot],
    ),
    sec(
      '4. The Arrhenius equation',
      r`$k = A\,e^{-E_\text{a}/RT}$: $A$ = frequency (pre-exponential) factor (same unit as $k$); $e^{-E_\text{a}/RT}$ = fraction of molecules with energy ≥ $E_\text{a}$.

Log form: $\log k = \log A - \dfrac{E_\text{a}}{2.303RT}$. Plot of $\log k$ against $1/T$: straight line, **slope $= -E_\text{a}/2.303R$**, **intercept $= \log A$**.

Two temperatures: $\log\dfrac{k_2}{k_1} = \dfrac{E_\text{a}}{2.303R}\left(\dfrac{T_2 - T_1}{T_1T_2}\right)$.

**Temperature coefficient** $= k_{T+10}/k_T$, usually 2–3; larger for larger $E_\text{a}$. A catalyst lowering $E_\text{a}$ by $\Delta E_\text{a}$ (same $A$) multiplies $k$ by $10^{\Delta E_\text{a}/2.303RT}$.`,
      [kt('Frequency factor', 'The pre-exponential constant A in the Arrhenius equation, related to the frequency of correctly oriented collisions.'), kt('Temperature coefficient', 'Ratio of rate constants at two temperatures differing by 10 K.')],
      [fm(r`k = A\,e^{-E_\text{a}/RT}`, 'Arrhenius equation'), fm(r`\log\frac{k_2}{k_1} = \frac{E_\text{a}}{2.303R}\left(\frac{T_2 - T_1}{T_1T_2}\right)`, 'Two-temperature form')],
      arrPlot,
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Measuring activation energy from zero energy instead of from the reactant level.
- Saying a catalyst changes ΔH, ΔG or the equilibrium constant.
- Using °C, or Ea in kJ with R = 8.314 J K⁻¹ mol⁻¹, in Arrhenius calculations.
- Using slope = −Ea/R for a plot of log₁₀ k (it is −Ea/2.303R).

**How marks are usually awarded**
- Energy profiles (2 marks): axes, reactant and product levels, activated complex, Ea and ΔH labelled; catalysed path lower.
- Collision theory (2 marks): both conditions for an effective collision.
- Arrhenius numericals (3 marks): correct equation, substitution with units in J and K, answer in kJ mol⁻¹.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Threshold energy?', 'Minimum energy colliding molecules need for reaction.', 'definition', 1),
    fc(2, 'Activation energy?', 'Threshold energy minus average energy of reactants.', 'definition', 1),
    fc(3, 'Activated complex?', 'Unstable arrangement at the top of the barrier; bonds partly broken and formed.', 'definition', 1),
    fc(4, 'Exothermic profile?', 'Products lower than reactants; ΔH < 0.', 'concept', 1),
    fc(5, 'Endothermic profile?', 'Products higher than reactants; ΔH > 0.', 'concept', 1),
    fc(6, 'ΔH from activation energies?', 'ΔH = Ea(forward) − Ea(reverse).', 'formula', 1),
    fc(7, 'For an endothermic reaction, Ea(f) vs ΔH?', 'Ea(f) > ΔH.', 'concept', 1),
    fc(8, 'Effect of catalyst on Ea?', 'Lowers it for forward and reverse reactions equally.', 'concept', 1),
    fc(9, 'Does a catalyst change ΔH or K?', 'No.', 'fact', 1),
    fc(10, 'Why do enzymes speed up reactions?', 'They provide a path of lower activation energy.', 'example', 1),
    fc(11, 'Two conditions for an effective collision?', 'Energy ≥ threshold; proper orientation.', 'concept', 2),
    fc(12, 'Steric factor P?', 'Probability that a collision has proper orientation.', 'definition', 2),
    fc(13, 'Why do most collisions fail?', 'Too little energy or wrong orientation.', 'concept', 2),
    fc(14, 'Main reason a 10 K rise speeds up a reaction?', 'The fraction of molecules with energy ≥ Ea increases greatly.', 'concept', 2),
    fc(15, 'Orientation example?', 'OH⁻ must attack CH₃Br at carbon, opposite Br.', 'example', 2),
    fc(16, 'Collision theory rate expression?', 'Rate = P Z_AB e^(−Ea/RT).', 'formula', 2),
    fc(17, 'Arrhenius equation?', 'k = A e^(−Ea/RT).', 'formula', 3),
    fc(18, 'Meaning of e^(−Ea/RT)?', 'Fraction of molecules with energy at least Ea.', 'concept', 3),
    fc(19, 'Unit of A?', 'Same as the rate constant k.', 'fact', 3),
    fc(20, 'Log form of Arrhenius equation?', 'log k = log A − Ea/(2.303RT).', 'formula', 3),
    fc(21, 'Slope of log k vs 1/T?', '−Ea/2.303R.', 'formula', 3),
    fc(22, 'Intercept of log k vs 1/T?', 'log A.', 'formula', 3),
    fc(23, 'Two-temperature Arrhenius equation?', 'log(k₂/k₁) = Ea/(2.303R) × (T₂ − T₁)/(T₁T₂).', 'formula', 3),
    fc(24, 'Temperature coefficient?', 'k(T + 10 K)/k(T), usually 2–3.', 'definition', 3),
    fc(25, 'Ea for which rate doubles from 298 to 308 K?', 'About 53 kJ mol⁻¹.', 'fact', 3),
    fc(26, 'Effect of larger Ea on temperature sensitivity?', 'Rate becomes more sensitive to temperature.', 'concept', 3),
    fc(27, 'Factor by which a catalyst raises k?', '10^(ΔEa/2.303RT) for the same A.', 'formula', 3),
    fc(28, 'Value of R in Arrhenius problems?', '8.314 J K⁻¹ mol⁻¹ (Ea in J).', 'fact', 3),
    fc(29, 'Units of temperature in Arrhenius equation?', 'Kelvin.', 'fact', 3),
    fc(30, 'Activated complex vs intermediate?', 'Complex: at a peak, cannot be isolated; intermediate: in a valley between steps.', 'concept', 1),
    fc(31, 'Exam tip: energy profiles', 'Measure Ea from the reactant level; catalysed hump lower, same end levels.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
