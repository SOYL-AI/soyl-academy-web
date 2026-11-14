// ISC 11 Chemistry ch15 Common Ion Effect, Salt Hydrolysis, Buffers and Solubility Product: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Common Ion Effect, Salt Hydrolysis, Buffers and Solubility Product — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The common ion effect',
      r`A weak electrolyte ionises only slightly. If a **strong electrolyte with an ion in common** is added, the equilibrium shifts (Le Chatelier) towards the unionised molecules and the ionisation of the weak electrolyte is **suppressed**.

- **Ethanoic acid + sodium ethanoate:** $\ce{CH3COOH <=> CH3COO- + H+}$. The salt supplies $\ce{CH3COO-}$, so $[\ce{H+}]$ falls and the pH rises: $[\ce{H+}] = K_a\,c_{acid}/c_{salt}$.
- **Ammonium hydroxide + ammonium chloride:** $\ce{NH4OH <=> NH4+ + OH-}$. $\ce{NH4+}$ from the salt lowers $[\ce{OH-}]$: $[\ce{OH-}] = K_b\,c_{base}/c_{salt}$; the pH falls.

The degree of ionisation of the weak electrolyte decreases sharply. For a base, find $[\ce{OH-}]$, then pOH, then pH $= 14 -$ pOH.`,
      [kt('Common ion effect', 'Suppression of the ionisation of a weak electrolyte by a strong electrolyte that supplies an ion common to both.'), kt('Degree of ionisation', 'The fraction of the dissolved electrolyte present as ions; for a weak electrolyte alone α = √(K / c).')],
      [fm(r`[\ce{H+}] = K_a\,\frac{c_{acid}}{c_{salt}}`, 'Acid with its salt'), fm(r`[\ce{OH-}] = K_b\,\frac{c_{base}}{c_{salt}}`, 'Base with its salt')],
      table(['Solution', 'Effect of the common ion'], [['CH₃COOH + CH₃COONa', '[H⁺] falls, pH rises'], ['NH₄OH + NH₄Cl', '[OH⁻] falls, pH falls'], ['H₂S + HCl', '[S²⁻] falls (group II)']], 'Table of three systems and the effect of the common ion'),
      [1],
      [V.ci],
    ),
    sec(
      '2. Use of the common ion effect in salt analysis',
      r`Cations are separated into groups by **selective precipitation**; the common ion effect fixes $[\ce{OH-}]$ and $[\ce{S^2-}]$.

- **Group II (Cu²⁺, Cd²⁺, Pb²⁺, …):** H₂S passed in **dilute HCl**. The common $\ce{H+}$ suppresses ionisation of H₂S, so $[\ce{S^2-}]$ is very low and only sulphides with extremely small $K_{sp}$ precipitate.
- **Group III (Fe³⁺, Al³⁺, Cr³⁺):** **NH₄Cl first, then NH₄OH.** The common $\ce{NH4+}$ keeps $[\ce{OH-}]$ low, so only hydroxides of very low $K_{sp}$ precipitate; Mg(OH)₂ stays in solution.
- **Group IV (Zn²⁺, Mn²⁺, Ni²⁺, Co²⁺):** H₂S in **ammoniacal** medium. $\ce{OH-}$ removes $\ce{H+}$, so $[\ce{S^2-}]$ rises and these more soluble sulphides precipitate.

Rule: a salt precipitates only when $Q_{sp} > K_{sp}$; the medium is chosen to make this true for one group at a time.`,
      [kt('Selective precipitation', 'Separating ions by adding a reagent in conditions where only one salt reaches its Ksp.'), kt('Ionic product Qsp', 'The product of the actual ion concentrations, with the same powers as in Ksp.')],
      [],
      table(['Group', 'Reagent and medium', 'Precipitate'], [['II', 'H₂S, dilute HCl', 'CuS, CdS, PbS'], ['III', 'NH₄Cl then NH₄OH', 'Fe(OH)₃, Al(OH)₃, Cr(OH)₃'], ['IV', 'H₂S, NH₄OH', 'ZnS, MnS, NiS, CoS']], 'Table of groups II, III and IV with reagent and precipitate'),
      [1, 4],
      [],
    ),
    sec(
      '3. Hydrolysis of salts',
      r`**Hydrolysis** is the reaction of salt ions with water. Ions of strong acids and bases (Na⁺, Cl⁻, SO₄²⁻) do not hydrolyse.

- **Strong acid + weak base** (NH₄Cl): $\ce{NH4+ + H2O <=> NH3 + H3O+}$; acidic. $K_h = K_w/K_b$; $\text{pH} = 7 - \tfrac12(\text{p}K_b + \log c)$.
- **Weak acid + strong base** (CH₃COONa): $\ce{CH3COO- + H2O <=> CH3COOH + OH-}$; basic. $K_h = K_w/K_a$; $\text{pH} = 7 + \tfrac12(\text{p}K_a + \log c)$.
- **Weak acid + weak base** (CH₃COONH₄, NH₄CN): both ions react; $\text{pH} = 7 + \tfrac12(\text{p}K_a - \text{p}K_b)$, **independent of concentration**.
- **Strong acid + strong base** (NaCl): neutral, pH 7.

The degree of hydrolysis is $h = \sqrt{K_h/c}$: it increases on dilution.`,
      [kt('Hydrolysis', 'Reaction of the ions of a salt with water that alters the pH of the solution.'), kt('Hydrolysis constant', 'Kh = Kw / K of the weak parent acid or base.'), kt('Degree of hydrolysis', 'The fraction of the salt that has hydrolysed, h = √(Kh / c).')],
      [fm(r`\text{pH} = 7 - \tfrac12(\text{p}K_b + \log c)`, 'Strong acid, weak base salt'), fm(r`\text{pH} = 7 + \tfrac12(\text{p}K_a + \log c)`, 'Weak acid, strong base salt'), fm(r`\text{pH} = 7 + \tfrac12(\text{p}K_a - \text{p}K_b)`, 'Weak acid, weak base salt')],
      table(['Salt', 'Parents', 'Nature'], [['NH₄Cl', 'HCl + NH₄OH', 'Acidic'], ['CH₃COONa', 'CH₃COOH + NaOH', 'Basic'], ['CH₃COONH₄', 'CH₃COOH + NH₄OH', 'Neutral'], ['NH₄CN', 'HCN + NH₄OH', 'Basic']], 'Table of four salts with their parents and the nature of their solutions'),
      [2],
      [V.scale],
    ),
    sec(
      '4. Buffer solutions and the Henderson equation',
      r`A **buffer** resists a change in pH on adding a small amount of acid or base (or on dilution).

- **Acidic buffer:** weak acid + its salt with a strong base (CH₃COOH + CH₃COONa), pH below 7.
- **Basic buffer:** weak base + its salt with a strong acid (NH₄OH + NH₄Cl), pH above 7.

**Action (Le Chatelier):** added H⁺ combines with the anion A⁻ of the salt to form HA; added OH⁻ is removed by HA, which ionises further. The ratio $[\text{salt}]/[\text{acid}]$ changes only slightly. **Henderson:** $\text{pH} = \text{p}K_a + \log\dfrac{[\text{salt}]}{[\text{acid}]}$ and $\text{pOH} = \text{p}K_b + \log\dfrac{[\text{salt}]}{[\text{base}]}$. A buffer is most effective when the ratio is 1 (pH $=$ p$K_a$) and works for ratios 0.1 to 10 (p$K_a \pm 1$).`,
      [kt('Buffer solution', 'A solution that resists a change in pH on adding small amounts of acid or base.'), kt('Acidic buffer', 'A weak acid with its salt with a strong base.'), kt('Basic buffer', 'A weak base with its salt with a strong acid.')],
      [fm(r`\text{pH} = \text{p}K_a + \log\frac{[\text{salt}]}{[\text{acid}]}`, 'Henderson equation, acidic buffer'), fm(r`\text{pOH} = \text{p}K_b + \log\frac{[\text{salt}]}{[\text{base}]}`, 'Henderson equation, basic buffer')],
      table(['Added to buffer', 'Species that reacts', 'Result'], [['H⁺', 'A⁻ (from the salt)', 'Forms HA; pH barely falls'], ['OH⁻', 'HA (the acid)', 'Forms A⁻ and H₂O; pH barely rises'], ['Water (dilution)', 'Ratio unchanged', 'pH nearly constant']], 'Table of the response of an acidic buffer to added acid, base and water'),
      [3],
      [V.curve],
    ),
    sec(
      '5. Solubility and solubility product',
      r`For a sparingly soluble salt $\ce{A_xB_y}$ in a saturated solution, $\ce{A_xB_y(s) <=> xA^{y+} + yB^{x-}}$ and $K_{sp} = [\text{A}]^x[\text{B}]^y$. With molar solubility $s$:

- **AB** (AgCl, BaSO₄): $K_{sp} = s^2$, $s = \sqrt{K_{sp}}$.
- **AB₂ and A₂B** (PbI₂, Mg(OH)₂, Ag₂CrO₄): $K_{sp} = 4s^3$, $s = (K_{sp}/4)^{1/3}$.

To convert: $s\,(\text{mol L}^{-1}) = \text{solubility in g L}^{-1} / M$. Salts of **different types** cannot be ranked by Ksp alone. Precipitation: $Q_{sp} > K_{sp}$; no precipitate if $Q_{sp} < K_{sp}$. After mixing, use the diluted concentrations.`,
      [kt('Solubility product (Ksp)', 'The product of the ion concentrations, each to the power of its coefficient, in a saturated solution of a sparingly soluble salt.'), kt('Molar solubility', 'Moles of salt dissolving per litre of saturated solution.')],
      [fm(r`K_{sp} = s^2\ (\text{AB}),\quad K_{sp} = 4s^3\ (\text{AB}_2,\ \text{A}_2\text{B})`, 'Ksp and molar solubility')],
      table(['Condition', 'Meaning'], [['Qsp < Ksp', 'Unsaturated: no precipitate'], ['Qsp = Ksp', 'Saturated'], ['Qsp > Ksp', 'Precipitate forms']], 'Table of ionic product against solubility product'),
      [4],
      [V.kspb, V.qsp],
    ),
    sec(
      '6. Common ion effect on solubility',
      r`If one ion of a sparingly soluble salt is already present at concentration $c$, the solubility falls: for AgCl in NaCl, $s \approx K_{sp}/c$. For PbI₂ in KI of concentration $c$, $s \approx K_{sp}/c^2$. This is Le Chatelier applied to the dissolution equilibrium and is the same effect used to **precipitate ions completely** and to **separate groups**.

When two ions precipitate with the same reagent, the salt that needs the **smaller** reagent concentration precipitates first (AgCl before Ag₂CrO₄ for equal Cl⁻ and CrO₄²⁻).`,
      [kt('Complete precipitation', 'Adding excess of the common ion so that very little of the ion remains in solution.')],
      [],
      table(['AgCl in', 's / mol L⁻¹'], [['Pure water', '1.3 × 10⁻⁵'], ['0.01 M NaCl', '1.8 × 10⁻⁸'], ['0.10 M NaCl', '1.8 × 10⁻⁹']], 'Table of the solubility of silver chloride in water and in sodium chloride solutions'),
      [4],
      [V.agcl],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using [H⁺] = √(Ka c) when a common-ion salt is present.
- Swapping the signs in the two hydrolysis formulae.
- Using s² for an AB₂ salt, or ranking salts of different types by Ksp alone.
- Forgetting dilution when two solutions are mixed before finding Qsp.
- Explaining group II by "acid is added" rather than "common H⁺ lowers [S²⁻]".
**Marks**
- Common-ion numericals: formula (1), substitution (1), pH with unit-free answer (1).
- Buffer problems: Henderson equation (1), ratio and log (1), pH (1).
- Ksp problems: expression in s (1), substitution (1), answer (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define the common ion effect.', 'Suppression of the ionisation of a weak electrolyte by adding a strong electrolyte with an ion in common.', 'definition', 1),
    fc(2, 'Effect of sodium ethanoate on ethanoic acid?', 'Ethanoate ions shift the equilibrium left: [H⁺] falls and the pH rises.', 'concept', 1),
    fc(3, 'Effect of ammonium chloride on ammonium hydroxide?', 'NH₄⁺ shifts the equilibrium left: [OH⁻] falls and the pH falls.', 'concept', 1),
    fc(4, '[H⁺] of a weak acid with its salt?', r`$[\ce{H+}] = K_a\,c_{acid}/c_{salt}$`, 'formula', 1),
    fc(5, '[OH⁻] of a weak base with its salt?', r`$[\ce{OH-}] = K_b\,c_{base}/c_{salt}$`, 'formula', 1),
    fc(6, 'Why is NH₄Cl added before NH₄OH in group III?', 'The common NH₄⁺ keeps [OH⁻] low so only group III hydroxides precipitate.', 'concept', 1),
    fc(7, 'Why is group II precipitated in dilute HCl?', 'Common H⁺ suppresses ionisation of H₂S, so [S²⁻] is low and only the least soluble sulphides precipitate.', 'concept', 1),
    fc(8, 'Why is group IV precipitated in ammoniacal medium?', 'OH⁻ removes H⁺, raising [S²⁻] enough for the more soluble sulphides to precipitate.', 'concept', 1),
    fc(9, 'What is hydrolysis of a salt?', 'Reaction of salt ions with water that changes the pH of the solution.', 'definition', 2),
    fc(10, 'Which ions do not hydrolyse?', 'Ions of strong acids and strong bases, such as Na⁺ and Cl⁻.', 'fact', 2),
    fc(11, 'Nature of a solution of NH₄Cl?', 'Acidic, because NH₄⁺ gives H₃O⁺ with water.', 'fact', 2),
    fc(12, 'Nature of a solution of CH₃COONa?', 'Basic, because CH₃COO⁻ gives OH⁻ with water.', 'fact', 2),
    fc(13, 'Hydrolysis constant of a weak-acid anion?', r`$K_h = K_w/K_a$`, 'formula', 2),
    fc(14, 'Degree of hydrolysis?', r`$h = \sqrt{K_h/c}$; it increases on dilution.`, 'formula', 2),
    fc(15, 'pH of a strong acid, weak base salt?', r`$\text{pH} = 7 - \tfrac12(\text{p}K_b + \log c)$`, 'formula', 2),
    fc(16, 'pH of a weak acid, strong base salt?', r`$\text{pH} = 7 + \tfrac12(\text{p}K_a + \log c)$`, 'formula', 2),
    fc(17, 'pH of a weak acid, weak base salt?', r`$\text{pH} = 7 + \tfrac12(\text{p}K_a - \text{p}K_b)$, independent of concentration.`, 'formula', 2),
    fc(18, 'When is a weak acid weak base salt neutral?', 'When Ka equals Kb (pKa = pKb), as in ammonium ethanoate.', 'concept', 2),
    fc(19, 'What is a buffer solution?', 'A solution that resists a change in pH on adding small amounts of acid or base.', 'definition', 3),
    fc(20, 'Give an acidic and a basic buffer.', 'CH₃COOH + CH₃COONa; NH₄OH + NH₄Cl.', 'example', 3),
    fc(21, 'How does an acidic buffer handle added H⁺?', 'The anion A⁻ of the salt combines with H⁺ to form HA.', 'concept', 3),
    fc(22, 'How does an acidic buffer handle added OH⁻?', 'The weak acid HA neutralises OH⁻ and ionises more to replace H⁺.', 'concept', 3),
    fc(23, 'State the Henderson equation (acidic buffer).', r`$\text{pH} = \text{p}K_a + \log([\text{salt}]/[\text{acid}])$`, 'formula', 3),
    fc(24, 'Henderson equation for a basic buffer?', r`$\text{pOH} = \text{p}K_b + \log([\text{salt}]/[\text{base}])$`, 'formula', 3),
    fc(25, 'Effective range of a buffer?', 'pH = pKa ± 1, that is salt : acid between 0.1 and 10.', 'fact', 3),
    fc(26, 'Define solubility product.', 'The product of ion concentrations, each to the power of its coefficient, in a saturated solution.', 'definition', 4),
    fc(27, 'Ksp in terms of s for AB and AB₂?', 'AB: s²; AB₂ (and A₂B): 4s³.', 'formula', 4),
    fc(28, 'Condition for precipitation?', 'Ionic product Qsp greater than Ksp.', 'fact', 4),
    fc(29, 'Effect of a common ion on solubility?', 'It lowers the solubility, for example AgCl in NaCl solution.', 'concept', 4),
    fc(30, 'Which of two salts precipitates first with a common reagent?', 'The one needing the smaller concentration of the reagent ion.', 'concept', 4),
    fc(31, 'How is s found from solubility in g per litre?', 'Divide by the molar mass to get mol L⁻¹, then use Ksp = s² or 4s³.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
