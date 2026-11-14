// ISC 11 Chemistry ch13 Chemical Equilibrium: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { RA, esterX, alphaFromKp, f2, f3 } from './data.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const xe = esterX(1, 1);
const a1 = alphaFromKp(0.5, 1);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Chemical Equilibrium — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Reversible and irreversible reactions; physical equilibria',
      r`An **irreversible** reaction goes (almost) to completion in one direction (magnesium burning in air). A **reversible** reaction can proceed in both directions (⇌); in a **closed vessel** it reaches **equilibrium**, with reactants and products present together.

**Physical equilibria** involve changes of state only, in a closed system at constant temperature: **solid ⇌ liquid** (ice ⇌ water at 273.15 K, 1 atm; constant melting point), **liquid ⇌ vapour** (water in a closed vessel; constant vapour pressure) and **solid ⇌ vapour** (iodine or camphor in a closed flask).`,
      [kt('Reversible reaction', 'A reaction that can take place in both directions; in a closed vessel both reactants and products are present at equilibrium.'), kt('Physical equilibrium', 'An equilibrium between two phases of the same substance, such as ice and water.')],
      [],
      table(['Type', 'Example', 'Constant property'], [['Solid ⇌ liquid', 'ice ⇌ water', 'melting point'], ['Liquid ⇌ vapour', 'water ⇌ vapour (closed)', 'vapour pressure'], ['Solid ⇌ vapour', 'iodine ⇌ vapour (closed)', 'vapour pressure']], 'Table of the three types of physical equilibrium'),
      [1],
    ),
    sec(
      '2. Dynamic nature and characteristics of equilibrium',
      r`At equilibrium the **rate of the forward reaction equals the rate of the reverse reaction**; neither has stopped, so the equilibrium is **dynamic**. Evidence: heavy water added to liquid water in a closed vessel soon appears in the vapour although the vapour pressure is unchanged.

**Characteristics:** the system is closed at constant temperature; observable properties (concentration, pressure, colour) are constant; the same equilibrium is reached from either side (N₂O₄ or NO₂ as starting material); a **catalyst** speeds up the approach but does not change the position or K.`,
      [kt('Dynamic equilibrium', 'A state in which the forward and reverse changes continue at equal rates, so the macroscopic properties stay constant.')],
      [],
      V.phys,
      [1],
      [V.both],
    ),
    sec(
      '3. Law of mass action; Kc and Kp',
      r`**Law of mass action:** at a given temperature the rate of a reaction is proportional to the product of the active masses (molar concentrations) of the reactants, each raised to the power of its coefficient. For $a\text{A} + b\text{B} \rightleftharpoons c\text{C} + d\text{D}$ at equilibrium:

$K_c = \dfrac{[C]^c[D]^d}{[A]^a[B]^b}$ and, for gases, $K_p = \dfrac{p_C^c\,p_D^d}{p_A^a\,p_B^b}$.

Pure solids and liquids are left out (constant activity). **Units:** $K_c$ in (mol L⁻¹)^Δn and $K_p$ in (atm)^Δn, where Δn = moles of gaseous products − moles of gaseous reactants; no unit if Δn = 0.`,
      [kt('Law of mass action', 'The rate of a reaction is proportional to the product of the molar concentrations of the reactants, each raised to the power of its coefficient.'), kt('Δn', 'Moles of gaseous products minus moles of gaseous reactants in the balanced equation.')],
      [fm(r`K_c = \frac{[C]^c[D]^d}{[A]^a[B]^b}`, 'Equilibrium constant in concentrations'), fm(r`K_p = \frac{p_C^c\,p_D^d}{p_A^a\,p_B^b}`, 'Equilibrium constant in partial pressures')],
      table(['Reaction', 'Δn', 'Unit of Kc', 'Unit of Kp'], [['N₂ + O₂ ⇌ 2NO', '0', 'none', 'none'], ['N₂O₄ ⇌ 2NO₂', '+1', 'mol L⁻¹', 'atm'], ['2NO + O₂ ⇌ 2NO₂', '−1', 'L mol⁻¹', 'atm⁻¹'], ['N₂ + 3H₂ ⇌ 2NH₃', '−2', 'L² mol⁻²', 'atm⁻²']], 'Table of the units of Kc and Kp'),
      [2],
    ),
    sec(
      '4. Relation between Kp and Kc (derivation); characteristics of K',
      r`**Derivation.** For an ideal gas $pV = nRT$, so $p = \dfrac{n}{V}RT = [\text{gas}]RT$. Substituting in $K_p$:

$K_p = \dfrac{([C]RT)^c([D]RT)^d}{([A]RT)^a([B]RT)^b} = \dfrac{[C]^c[D]^d}{[A]^a[B]^b}(RT)^{(c+d)-(a+b)}$, so **$K_p = K_c(RT)^{\Delta n}$**. With R = 0.0821 L atm K⁻¹ mol⁻¹ for pressures in atm; $K_p = K_c$ when Δn = 0.

**Characteristics of K:** depends only on temperature; reverse the equation → 1/K; multiply the equation by n → Kⁿ; add equations → multiply the K values; independent of initial amounts, pressure and catalyst. Large K: products favoured; small K: reactants favoured. Recap from thermodynamics (Chapter 12): $\Delta G^\circ = -2.303\,RT\log K$, so a negative $\Delta G^\circ$ means $K > 1$.`,
      [kt('Reaction quotient Q', 'The same expression as K evaluated with non-equilibrium concentrations; Q < K means the net reaction goes forward, Q > K backward.')],
      [fm(r`K_p = K_c(RT)^{\Delta n}`, 'Relation between Kp and Kc'), fm(r`\Delta n = (c+d)-(a+b)`, 'Change in moles of gas')],
      table(['Operation on the equation', 'Effect on K'], [['Reverse', 'K′ = 1 / K'], ['Multiply by 2', 'K′ = K²'], ['Add two equations', 'K₃ = K₁ × K₂']], 'Table of the effect of changing the equation on K'),
      [2],
    ),
    sec(
      '5. Equilibrium calculations',
      r`**ICE method:** write Initial, Change (use x or α) and Equilibrium amounts; substitute in K. **Esterification** ($K_c = 4.0$): 1.0 mol acid + 1.0 mol alcohol gives x²/(1 − x)² = 4, x = ${f2(xe)} mol of ester; with 1.0 mol acid and 3.0 mol alcohol, 3x² − 16x + 12 = 0 and x = ${f3(esterX(1, 3))} mol (the excess alcohol raises the conversion).

**Degree of dissociation α** of N₂O₄ ⇌ 2NO₂ at total pressure P: moles 1 − α, 2α, total 1 + α, so $K_p = \dfrac{4\alpha^2P}{1-\alpha^2}$ and $\alpha = \sqrt{\dfrac{K_p}{K_p + 4P}}$. With K_p = 0.50 atm at 330 K and P = 1.0 atm, α = ${f3(a1)}. Also α = M(theoretical) / M(observed) − 1.

**Br₂ + Cl₂ ⇌ 2BrCl** ($K_c = 7.0$): when the starting amounts are equal take the square root of K_c: 2x/(c − x) = 2.646.`,
      [kt('Degree of dissociation', 'The fraction of the original amount of a substance that has dissociated at equilibrium.'), kt('ICE table', 'Initial, change and equilibrium rows used to find equilibrium amounts.')],
      [fm(r`K_p = \frac{4\alpha^2 P}{1-\alpha^2}`, 'N2O4 dissociation')],
      table(['', 'CH₃COOH', 'C₂H₅OH', 'ester', 'H₂O'], [['Initial / mol', '1.0', '1.0', '0', '0'], ['Change / mol', '−x', '−x', '+x', '+x'], ['Equilibrium / mol', '1 − x', '1 − x', 'x', 'x']], 'ICE table for esterification'),
      [2],
    ),
    sec(
      "6. Le Chatelier's principle and conditions for maximum yield",
      r`**Le Chatelier's principle:** if a system at equilibrium is subjected to a change of concentration, temperature or pressure, the equilibrium shifts in the direction that opposes the change.

**Concentration:** adding a reactant or removing a product shifts forward (K unchanged). **Temperature:** raising T favours the endothermic direction and changes K (increases for endothermic, decreases for exothermic). **Pressure:** raising P favours the side with fewer moles of gas; no effect if Δn = 0. **Catalyst:** lowers the activation energy of both directions equally; no change of position or K. **Inert gas:** at constant volume no shift; at constant pressure the volume increases and the equilibrium shifts to the side with more moles of gas.

**Haber process** (ΔH = −92.4 kJ): about 200 atm, 700–720 K, Fe with Mo promoter; NH₃ liquefied and removed, gases recycled. **Contact process** (ΔH = −196 kJ): about 720–725 K, 1–2 atm, V₂O₅. **N₂O₄ ⇌ 2NO₂** (endothermic, 1 → 2 mol): high T, low P. **Ester hydrolysis** (Δn = 0): excess water, remove a product, pressure has no effect; **esterification**: excess alcohol, conc. H₂SO₄ removes water.`,
      [kt("Le Chatelier's principle", 'A system at equilibrium responds to a disturbance by shifting in the direction that opposes the disturbance.'), kt('Promoter', 'A substance that improves the action of a catalyst, such as molybdenum with iron in the Haber process.')],
      [],
      V.stress,
      [3, 4],
      [V.catalyst, V.haber],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Including pure solids or liquids in K, or using moles instead of concentrations.
- Forgetting that Δn counts gaseous species only, or using °C in RT.
- Saying a catalyst increases the yield, or that pressure changes K.
- Applying a pressure argument when Δn = 0, or to a reaction in solution.
- Not saying whether the volume or the pressure is constant when an inert gas is added.

**How marks are usually awarded**
- Derivation of Kp = Kc(RT)^Δn: p = [gas]RT (1), substitution (1), Δn defined and result (1).
- Equilibrium numericals: expression (1), ICE amounts (1), solving (1), unit (1).
- Le Chatelier predictions: direction (1) and the reason, using ΔH or Δn (1).
- Industrial conditions: pressure with reason (1), temperature as a compromise (1), catalyst (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a reversible reaction?', 'One that can proceed in both directions; in a closed vessel reactants and products coexist at equilibrium.', 'definition', 1),
    fc(2, 'Name the three physical equilibria.', 'Solid ⇌ liquid, liquid ⇌ vapour, solid ⇌ vapour.', 'fact', 1),
    fc(3, 'Condition for the ice–water equilibrium?', '273.15 K and 1 atm.', 'fact', 1),
    fc(4, 'Property that is constant in a liquid–vapour equilibrium?', 'The vapour pressure at that temperature.', 'fact', 1),
    fc(5, 'Why is chemical equilibrium called dynamic?', 'Forward and reverse reactions continue at equal rates; nothing has stopped.', 'concept', 1),
    fc(6, 'Which evidence shows that equilibrium is dynamic?', 'Heavy water added to liquid water in a closed vessel appears in the vapour although the pressure stays constant.', 'example', 1),
    fc(7, 'Can equilibrium be reached from either side?', 'Yes: the same composition results at a given temperature.', 'concept', 1),
    fc(8, 'State the law of mass action.', 'The rate of a reaction is proportional to the product of the molar concentrations (active masses) of the reactants, each raised to its coefficient.', 'definition', 2),
    fc(9, 'Write Kc for aA + bB ⇌ cC + dD.', r`$K_c = \dfrac{[C]^c[D]^d}{[A]^a[B]^b}$`, 'formula', 2),
    fc(10, 'Which species are left out of K?', 'Pure solids and pure liquids.', 'fact', 2),
    fc(11, 'Write Kp for N₂ + 3H₂ ⇌ 2NH₃.', r`$K_p = \dfrac{p_{NH_3}^2}{p_{N_2}\,p_{H_2}^3}$, unit atm⁻².`, 'formula', 2),
    fc(12, 'Define Δn for Kp and Kc.', 'Moles of gaseous products minus moles of gaseous reactants.', 'definition', 2),
    fc(13, 'Unit of Kc when Δn = +1?', 'mol L⁻¹.', 'fact', 2),
    fc(14, 'Unit of Kc for 2NO + O₂ ⇌ 2NO₂?', 'L mol⁻¹ (Δn = −1).', 'example', 2),
    fc(15, 'Relation between Kp and Kc?', r`$K_p = K_c(RT)^{\Delta n}$`, 'formula', 2),
    fc(16, 'First step in deriving Kp = Kc(RT)^Δn?', 'Use pV = nRT to write p = (n/V)RT = [gas]RT for each gas.', 'concept', 2),
    fc(17, 'When is Kp = Kc?', 'When Δn = 0, for example H₂ + I₂ ⇌ 2HI.', 'fact', 2),
    fc(18, 'What happens to K when an equation is reversed?', 'K′ = 1/K.', 'fact', 2),
    fc(19, 'What happens to K when two equations are added?', 'The K values are multiplied.', 'fact', 2),
    fc(20, 'What does K depend on?', 'Temperature only.', 'fact', 2),
    fc(21, 'Kp of N₂O₄ in terms of α and total pressure P?', r`$K_p = \dfrac{4\alpha^2 P}{1-\alpha^2}$`, 'formula', 2),
    fc(22, 'State Le Chatelier\'s principle.', 'A system at equilibrium responds to a change of concentration, temperature or pressure by shifting in the direction that opposes the change.', 'definition', 3),
    fc(23, 'Effect of raising the temperature on an exothermic equilibrium?', 'Shifts backward; K decreases.', 'fact', 3),
    fc(24, 'Effect of raising the pressure?', 'Favours the side with fewer moles of gas; none if Δn = 0.', 'fact', 3),
    fc(25, 'Effect of a catalyst on equilibrium?', 'Faster approach only: no change in position, composition or K.', 'concept', 3),
    fc(26, 'Inert gas added at constant volume?', 'No shift: the concentrations are unchanged.', 'concept', 3),
    fc(27, 'Inert gas added at constant pressure?', 'The volume increases; the equilibrium shifts to the side with more moles of gas.', 'concept', 3),
    fc(28, 'Conditions for the Haber process?', 'About 200 atm, 700–720 K, finely divided iron with molybdenum promoter; NH₃ removed and gases recycled.', 'fact', 4),
    fc(29, 'Conditions for the contact process?', 'About 720–725 K, 1–2 atm, V₂O₅ catalyst.', 'fact', 4),
    fc(30, 'Conditions that give maximum NO₂ from N₂O₄?', 'High temperature (endothermic) and low pressure (1 → 2 mol).', 'fact', 4),
    fc(31, 'How is the yield of an ester increased?', 'Excess alcohol or acid and removal of water (conc. H₂SO₄) or of the ester.', 'fact', 4),
    fc(32, 'Why has pressure no effect on ester hydrolysis?', 'Δn_g = 0 and the reaction takes place in the liquid phase.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
