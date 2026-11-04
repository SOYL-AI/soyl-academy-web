// ch06 Equilibrium — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Equilibrium — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Physical and chemical equilibrium',
      r`**Physical equilibria** (closed system, fixed T): solid ⇌ liquid at the melting point; liquid ⇌ vapour (vapour pressure); solid ⇌ vapour; solute ⇌ solution in a saturated solution (solubility); gas ⇌ dissolved gas (Henry’s law: solubility ∝ pressure).

**Chemical equilibrium** is **dynamic**: the forward and reverse rates are equal and the macroscopic properties (concentration, colour, pressure) stay constant. It is reached from either side, needs a closed system, and is not altered in position by a catalyst, which only speeds its attainment.`,
      [kt('Dynamic equilibrium', 'State in which forward and reverse processes continue at equal rates, so observable properties stay constant.'), kt('Closed system', 'A system that exchanges energy but not matter with its surroundings.')],
      [],
      V.approach,
      [1],
    ),
    sec(
      '2. Law of mass action, Kc, Kp and Q',
      r`For $a\text{A} + b\text{B} \rightleftharpoons c\text{C} + d\text{D}$: $K_c = \dfrac{[\text{C}]^c[\text{D}]^d}{[\text{A}]^a[\text{B}]^b}$. Pure solids and pure liquids are omitted (e.g. for $\ce{CaCO3(s) <=> CaO(s) + CO2(g)}$, $K_c = [\text{CO}_2]$).

For gases $K_p$ uses partial pressures, and $K_p = K_c(RT)^{\Delta n}$ with $\Delta n = n_\text{gaseous products} - n_\text{gaseous reactants}$ ($R = 0.08314\ \text{L bar K}^{-1}\text{mol}^{-1}$ for $p$ in bar).

**Manipulation:** reverse → $1/K$; multiply coefficients by $n$ → $K^n$; add equations → $K_1K_2$. A **large K** (≫ 1) means products are favoured; small K means reactants are favoured.

**Reaction quotient $Q$:** same form as $K$ with the present concentrations. $Q < K$: net forward; $Q = K$: equilibrium; $Q > K$: net reverse.

**ICE table:** Initial, Change (−ax, +cx), Equilibrium; substitute into $K$ and solve for $x$.`,
      [kt('Equilibrium constant', 'The value of the concentration ratio at equilibrium; depends only on temperature.'), kt('Reaction quotient (Q)', 'The concentration ratio of the same form as K, evaluated at any moment.')],
      [fm(r`K_p = K_c(RT)^{\Delta n}`, 'Relation between Kp and Kc'), fm(r`K_c = \dfrac{[\text{C}]^c[\text{D}]^d}{[\text{A}]^a[\text{B}]^b}`, 'Equilibrium constant')],
      V.qk,
      [2],
    ),
    sec(
      '3. Le Chatelier’s principle',
      r`A system at equilibrium responds to a disturbance by **partly opposing** it.

- **Concentration:** adding a reactant (or removing a product) shifts the equilibrium forward; the opposite shifts it back. $K$ is unchanged.
- **Pressure:** increasing pressure (decreasing volume) shifts the equilibrium towards the side with **fewer moles of gas**; no effect if $\Delta n = 0$. $K$ is unchanged.
- **Temperature:** raising T favours the **endothermic** direction; lowering T favours the exothermic direction. This is the only change that alters $K$.
- **Catalyst:** speeds both directions equally; no shift, no change in $K$.
- **Inert gas:** at constant volume, no shift; at constant pressure the volume grows, favouring the side with more gas moles.

**Haber process** $\ce{N2 + 3H2 <=> 2NH3}$, $\Delta H^\circ = -92\ \text{kJ}$: high pressure and low temperature favour ammonia; about 700 K, high pressure and an iron catalyst are a compromise for rate.`,
      [kt('Le Chatelier’s principle', 'If a system at equilibrium is disturbed, it shifts in the direction that partly cancels the disturbance.')],
      [],
      table(['Disturbance', 'Shift', 'K changes?'], [['Add reactant', 'Forward', 'No'], ['Increase pressure', 'Fewer gas moles', 'No'], ['Raise T (exothermic reaction)', 'Backward', 'Yes: K falls'], ['Catalyst', 'None', 'No']], 'Effects of disturbances on equilibrium'),
      [3],
    ),
    sec(
      '4. Acids, bases and pH',
      r`- **Arrhenius:** acid gives $\ce{H+}$, base gives $\ce{OH-}$ in water.
- **Brønsted–Lowry:** acid = proton donor, base = proton acceptor; each has a **conjugate** partner ($\ce{HCl}/\ce{Cl-}$, $\ce{NH4+}/\ce{NH3}$); water and $\ce{HCO3-}$ are **amphoteric**. A strong acid has a very weak conjugate base.
- **Lewis:** acid = electron-pair acceptor ($\ce{BF3}$, $\ce{H+}$), base = electron-pair donor ($\ce{NH3}$, $\ce{OH-}$).

$K_w = [\text{H}^+][\text{OH}^-] = 1.0 \times 10^{-14}$ at 298 K (increases with temperature). $\text{pH} = -\log[\text{H}^+]$, $\text{pH} + \text{pOH} = 14$ at 298 K. A tenfold change in $[\text{H}^+]$ is one pH unit. For a conjugate pair $K_aK_b = K_w$, i.e. $pK_a + pK_b = pK_w$.`,
      [kt('Conjugate acid–base pair', 'Two species that differ by one proton, e.g. CH₃COOH and CH₃COO⁻.'), kt('Amphoteric species', 'A species that can act as both an acid and a base.')],
      [fm(r`K_w = [\ce{H+}][\ce{OH-}] = 1.0 \times 10^{-14}`, 'Ionic product of water at 298 K'), fm(r`pK_a + pK_b = pK_w`, 'Conjugate pair')],
      V.ph,
      [4],
    ),
    sec(
      '5. Weak electrolytes, common ion effect, hydrolysis and buffers',
      r`**Weak acid** HA: $K_a = c\alpha^2/(1-\alpha) \approx c\alpha^2$; $\alpha = \sqrt{K_a/c}$ (rises on dilution); $[\text{H}^+] = \sqrt{K_ac}$. **Weak base:** $[\text{OH}^-] = \sqrt{K_bc}$. Use the approximation only when $\alpha \ll 1$ (below about 5%).

**Common ion effect:** adding a common ion suppresses the ionisation of a weak electrolyte (and the solubility of a sparingly soluble salt).

**Hydrolysis:** salt of strong acid + strong base: neutral; weak acid + strong base: basic ($K_h = K_w/K_a$, $[\text{OH}^-] = \sqrt{K_hc}$); strong acid + weak base: acidic; weak acid + weak base: depends on $K_a$ and $K_b$.

**Buffers** resist a change in pH on adding small amounts of acid or base. Acidic buffer: weak acid + its salt; basic buffer: weak base + its salt. **Henderson:** $\text{pH} = pK_a + \log([\text{salt}]/[\text{acid}])$; at equal concentrations pH = $pK_a$; useful range about $pK_a \pm 1$.`,
      [kt('Degree of ionisation', 'Fraction of the dissolved electrolyte that is ionised at equilibrium.'), kt('Buffer solution', 'A solution of a weak acid and its conjugate base (or a weak base and its conjugate acid) that resists changes in pH.'), kt('Hydrolysis', 'Reaction of the ions of a salt with water that changes the pH.')],
      [fm(r`\text{pH} = pK_a + \log\dfrac{[\text{salt}]}{[\text{acid}]}`, 'Henderson equation'), fm(r`K_h = \dfrac{K_w}{K_a}`, 'Hydrolysis constant of the anion of a weak acid')],
      flow('LR', [['a', 'Weak acid + its salt'], ['b', 'Add H⁺: salt anion removes it'], ['c', 'Add OH⁻: acid removes it'], ['d', 'Ratio salt/acid changes only slightly']], [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd']], 'Flow chart of how an acidic buffer removes added acid and added base and keeps the pH nearly constant'),
      [4],
    ),
    sec(
      '6. Solubility product',
      r`For $\ce{A_xB_y(s) <=> xA^{y+} + yB^{x-}}$ in a saturated solution, $K_{sp} = [\text{A}^{y+}]^x[\text{B}^{x-}]^y$. With molar solubility $s$: AB, $K_{sp} = s^2$; $\text{AB}_2$ or $\text{A}_2\text{B}$, $K_{sp} = 4s^3$; $\text{A}_3\text{B}$, $K_{sp} = 27s^4$.

A common ion lowers solubility: for AgCl in $c$ mol L⁻¹ NaCl, $s = K_{sp}/c$.

**Precipitation:** compare the ionic product $Q_{sp}$ (using concentrations after mixing) with $K_{sp}$: $Q_{sp} > K_{sp}$, precipitate forms; $Q_{sp} = K_{sp}$, saturated; $Q_{sp} < K_{sp}$, no precipitate. Values used: $K_{sp}(\text{AgCl}) = 1.8 \times 10^{-10}$, $K_{sp}(\text{BaSO}_4) = 1.1 \times 10^{-10}$, $K_{sp}(\text{Ag}_2\text{CrO}_4) = 1.1 \times 10^{-12}$ at 298 K.`,
      [kt('Solubility product (Ksp)', 'Product of the equilibrium concentrations of the ions of a sparingly soluble salt in its saturated solution, each raised to its coefficient.'), kt('Ionic product (Qsp)', 'The same product evaluated for any given solution; compared with Ksp to predict precipitation.')],
      [fm(r`K_{sp} = s^2 \;(\text{AB}), \quad K_{sp} = 4s^3 \;(\text{AB}_2)`, 'Ksp and molar solubility')],
      table(['Salt', 'Ksp (298 K)'], [['AgCl', r`$1.8 \times 10^{-10}$`], ['BaSO₄', r`$1.1 \times 10^{-10}$`], ['Ag₂CrO₄', r`$1.1 \times 10^{-12}$`]], 'Solubility products of three salts'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Including pure solids or liquids in K, or using concentrations of solids in Q.
- Saying that pressure, a catalyst or concentration changes the value of K (only temperature does).
- Using Kp = Kc for reactions with Δn ≠ 0, or the wrong R for the pressure unit.
- Forgetting the coefficient in the ICE change row (+2x for 2HI), or the two OH⁻ in Ba(OH)₂.
- Using √(Ka c) when α is not small, or pH = −log[OH⁻].
- Inverting salt and acid in the Henderson equation.
- Forgetting dilution when two solutions are mixed in a precipitation question.

**How marks are usually awarded**
- 1-mark items: K expression, direction of shift, conjugate base or pH.
- Numericals (2–3 marks): expression (½–1), substitution (1), answer with unit and sign (½–1).
- Reasoning (2–3 marks): the principle used (Le Chatelier, common ion, hydrolysis) and the argument.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is dynamic equilibrium?', 'Forward and reverse processes continue at equal rates, so properties stay constant.', 'definition', 1),
    fc(2, 'Physical equilibrium: liquid ⇌ vapour constant?', 'Vapour pressure at a fixed temperature in a closed vessel.', 'fact', 1),
    fc(3, 'Can equilibrium be reached from both sides?', 'Yes, with the same K at a given temperature.', 'concept', 1),
    fc(4, 'Does a catalyst change the equilibrium position?', 'No; it speeds up forward and reverse reactions equally.', 'concept', 1),
    fc(5, 'Law of mass action?', 'At equilibrium, the ratio of products to reactants (with coefficients as powers) is constant at fixed T.', 'definition', 2),
    fc(6, 'Which species are left out of K?', 'Pure solids and pure liquids.', 'fact', 2),
    fc(7, 'Kc for CaCO₃(s) ⇌ CaO(s) + CO₂(g)?', r`$K_c = [\text{CO}_2]$.`, 'formula', 2),
    fc(8, 'Relation between Kp and Kc?', r`$K_p = K_c(RT)^{\Delta n}$.`, 'formula', 2),
    fc(9, 'When is Kp = Kc?', 'When Δn (gaseous products − gaseous reactants) is zero.', 'concept', 2),
    fc(10, 'K when an equation is reversed?', '1/K.', 'formula', 2),
    fc(11, 'K when coefficients are doubled?', 'K squared.', 'formula', 2),
    fc(12, 'K for the sum of two reactions?', 'Product K₁ × K₂.', 'formula', 2),
    fc(13, 'What does Q < K mean?', 'Too many reactants: net reaction proceeds forward.', 'concept', 2),
    fc(14, 'What does a very large K mean?', 'Equilibrium lies far towards the products.', 'concept', 2),
    fc(15, 'State Le Chatelier’s principle.', 'A system at equilibrium shifts to partly oppose any disturbance.', 'definition', 3),
    fc(16, 'Effect of increasing pressure on N₂ + 3H₂ ⇌ 2NH₃?', 'Shifts forward (4 → 2 moles of gas).', 'example', 3),
    fc(17, 'What alone changes the value of K?', 'Temperature.', 'fact', 3),
    fc(18, 'Raising T on an exothermic reaction?', 'Shifts backward and K decreases.', 'concept', 3),
    fc(19, 'Inert gas at constant volume?', 'No shift: partial pressures unchanged.', 'concept', 3),
    fc(20, 'Brønsted–Lowry acid and base?', 'Acid: proton donor. Base: proton acceptor.', 'definition', 4),
    fc(21, 'Lewis acid and base?', 'Acid: electron-pair acceptor (BF₃). Base: electron-pair donor (NH₃).', 'definition', 4),
    fc(22, 'Conjugate base of H₂PO₄⁻?', 'HPO₄²⁻.', 'example', 4),
    fc(23, 'Kw at 298 K, and pH + pOH?', r`$K_w = 1.0 \times 10^{-14}$; pH + pOH = 14.`, 'fact', 4),
    fc(24, 'Weak acid: α and [H⁺]?', r`$\alpha = \sqrt{K_a/c}$, $[\ce{H+}] = \sqrt{K_ac}$.`, 'formula', 4),
    fc(25, 'Relation between Ka, Kb and Kw?', r`$K_aK_b = K_w$, so $pK_a + pK_b = 14$.`, 'formula', 4),
    fc(26, 'Common ion effect?', 'A common ion suppresses ionisation of a weak electrolyte, e.g. CH₃COONa lowers the ionisation of CH₃COOH.', 'definition', 4),
    fc(27, 'Why is CH₃COONa solution basic?', r`$\ce{CH3COO- + H2O <=> CH3COOH + OH-}$: hydrolysis of the anion of a weak acid.`, 'concept', 4),
    fc(28, 'Henderson equation?', r`$\text{pH} = pK_a + \log([\text{salt}]/[\text{acid}])$.`, 'formula', 4),
    fc(29, 'Ksp of AB₂ in terms of s?', r`$K_{sp} = 4s^3$.`, 'formula', 5),
    fc(30, 'When does a precipitate form?', r`When $Q_{sp} > K_{sp}$ (concentrations after mixing).`, 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
