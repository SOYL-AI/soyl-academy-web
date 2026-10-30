// ISC 12 Chemistry ch04 Electrolytic Conductance, Electrolysis, Batteries and Corrosion — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V, condPlot } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electrolytic Conductance, Electrolysis, Batteries and Corrosion — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Metallic and electrolytic conductance; specific conductance and cell constant',
      r`**Metallic conductance:** by electrons, no chemical change, decreases with rise in temperature. **Electrolytic conductance:** by ions, chemical change at electrodes, increases with temperature.

$R = \rho\,l/A$; conductance $G = 1/R$ (S); specific conductance $\kappa = 1/\rho$ (S cm⁻¹); cell constant $G^* = l/A$ (cm⁻¹); $\kappa = G^*/R$. The cell constant is found with a KCl solution of known $\kappa$; AC is used to avoid electrolysis.`,
      [kt('Specific conductance', 'The conductance of a solution contained between electrodes 1 cm² in area and 1 cm apart (S cm⁻¹).'), kt('Cell constant', 'The ratio l/A of a conductivity cell, in cm⁻¹.')],
      [fm(r`\kappa = \frac{G^*}{R}`, 'Specific conductance')],
      table(['Metallic', 'Electrolytic'], [['Electrons move', 'Ions move'], ['No chemical change', 'Chemical change at electrodes'], ['Falls as T rises', 'Rises as T rises']], 'Table contrasting metallic and electrolytic conductance'),
      [1],
    ),
    sec(
      '2. Molar and equivalent conductance; variation with concentration',
      r`$\Lambda_\text{m} = \dfrac{1000\,\kappa}{M}$ (S cm² mol⁻¹); $\Lambda_\text{eq} = \dfrac{1000\,\kappa}{N}$ (S cm² eq⁻¹); $\Lambda_\text{m} = n\,\Lambda_\text{eq}$.

On dilution: $\kappa$ **decreases** (fewer ions per cm³); $\Lambda_\text{m}$ and $\Lambda_\text{eq}$ **increase** (greater ion mobility; for weak electrolytes, more dissociation).

**Strong electrolytes:** $\Lambda_\text{m} = \Lambda^\circ_\text{m} - A\sqrt{c}$ — a straight line extrapolated to $c = 0$. **Weak electrolytes:** low $\Lambda_\text{m}$ rising steeply at high dilution; $\Lambda^\circ_\text{m}$ cannot be found by extrapolation.`,
      [kt('Molar conductance', 'Conductance of all the ions from one mole of electrolyte between electrodes 1 cm apart.'), kt('Equivalent conductance', 'Conductance of all the ions from one gram equivalent of electrolyte between electrodes 1 cm apart.')],
      [fm(r`\Lambda_\text{m} = \frac{1000\,\kappa}{M}`, 'Molar conductance'), fm(r`\Lambda_\text{eq} = \frac{1000\,\kappa}{N}`, 'Equivalent conductance')],
      condPlot,
      [2],
    ),
    sec(
      '3. Kohlrausch’s law',
      r`At infinite dilution each ion makes a definite contribution independent of the other ion: $\Lambda^\circ_\text{m} = \nu_+\lambda^\circ_+ + \nu_-\lambda^\circ_-$.

**Applications:** $\Lambda^\circ_\text{m}$ of weak electrolytes by combining strong ones, e.g. $\Lambda^\circ(\ce{CH3COOH}) = \Lambda^\circ(\ce{HCl}) + \Lambda^\circ(\ce{CH3COOK}) - \Lambda^\circ(\ce{KCl})$; degree of dissociation $\alpha = \Lambda_\text{m}/\Lambda^\circ_\text{m}$; dissociation constant $K_\text{a} = c\alpha^2/(1-\alpha)$; solubility of sparingly soluble salts ($S = 1000\kappa/\Lambda^\circ_\text{m}$).`,
      [kt('Kohlrausch’s law', 'The limiting molar conductance of an electrolyte is the sum of the limiting ionic conductances of its cation and anion.')],
      [fm(r`\Lambda^\circ_\text{m} = \nu_+\lambda^\circ_+ + \nu_-\lambda^\circ_-`, 'Kohlrausch’s law'), fm(r`\alpha = \frac{\Lambda_\text{m}}{\Lambda^\circ_\text{m}}`, 'Degree of dissociation')],
      table(['Ion', 'λ° / S cm² mol⁻¹'], [['H⁺', '349.6'], ['OH⁻', '199.1'], ['K⁺', '73.5'], ['Cl⁻', '76.3'], ['Na⁺', '50.1'], ['CH₃COO⁻', '40.9']], 'Table of limiting ionic conductances'),
      [3],
    ),
    sec(
      '4. Faraday’s laws of electrolysis',
      r`**First law:** $m = ZQ = ZIt$ ($Z$ = electrochemical equivalent). **Second law:** for the same charge, $m_1/m_2 = E_1/E_2$ (equivalent masses).

$F = N_\text{A}e = 6.022 \times 10^{23} \times 1.602 \times 10^{-19} \approx 96500\ \text{C mol}^{-1}$: the charge on one mole of electrons, which deposits one gram equivalent of any substance.

Working: $Q = It$ (t in seconds) → moles of e⁻ $= Q/F$ → moles of product $= Q/(nF)$ → mass $= MQ/(nF)$.`,
      [kt('Faraday', 'The charge on one mole of electrons, about 96500 C.'), kt('Electrochemical equivalent', 'The mass of a substance deposited by one coulomb of charge.')],
      [fm(r`m = \frac{M\,I\,t}{n\,F}`, 'Mass deposited'), fm(r`F = N_\text{A}\,e`, 'Faraday constant')],
      V.electrolysis,
      [4],
    ),
    sec(
      '5. Batteries and fuel cells; corrosion',
      r`**Primary cells** (not rechargeable): **Leclanché dry cell** — anode $\ce{Zn -> Zn^2+ + 2e-}$; cathode $\ce{MnO2 + NH4+ + e- -> MnO(OH) + NH3}$; about 1.5 V. **Mercury cell** — anode $\ce{Zn + 2OH- -> ZnO + H2O + 2e-}$ (zinc amalgam); cathode $\ce{HgO + H2O + 2e- -> Hg + 2OH-}$; overall $\ce{Zn + HgO -> ZnO + Hg}$; constant 1.35 V.

**Secondary cells** (rechargeable): **lead storage battery** — anode $\ce{Pb + SO4^2- -> PbSO4 + 2e-}$; cathode $\ce{PbO2 + SO4^2- + 4H+ + 2e- -> PbSO4 + 2H2O}$; acid density falls on discharge. Ni–Cd cell.

**H₂–O₂ fuel cell:** anode $\ce{2H2 + 4OH- -> 4H2O + 4e-}$; cathode $\ce{O2 + 2H2O + 4e- -> 4OH-}$; about 70% efficient; product water.

**Corrosion of iron:** anode $\ce{Fe -> Fe^2+ + 2e-}$; cathode $\ce{O2 + 4H+ + 4e- -> 2H2O}$; Fe²⁺ → rust (Fe₂O₃·xH₂O). Promoted by moisture, O₂, electrolytes, CO₂/SO₂, contact with less active metals. **Prevention:** barrier coatings, galvanising (Zn), sacrificial anodes (Mg, Zn), alloying (stainless steel), anti-rust solutions.`,
      [kt('Primary cell', 'A cell that cannot be recharged.'), kt('Secondary cell', 'A cell that can be recharged by passing current in the reverse direction.'), kt('Fuel cell', 'A galvanic cell that converts the energy of a continuously supplied fuel directly into electricity.'), kt('Sacrificial protection', 'Protecting iron by connecting it to a more reactive metal that corrodes instead.')],
      [],
      V.fuelcell,
      [5, 6],
      [V.rust],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Omitting the factor 1000, or mixing S m⁻¹ and S cm⁻¹ units.
- Saying specific conductance increases on dilution.
- Extrapolating the graph of a weak electrolyte to find Λ°.
- Leaving time in minutes in Faraday calculations; using molar instead of equivalent masses in the second law.
- Saying tin plating protects iron like galvanising.

**How marks are usually awarded**
- Conductance numericals: formula, substitution with units, answer with correct units.
- Cells: anode and cathode reactions with states, overall reaction, one property or use.
- Corrosion: anodic and cathodic reactions and two prevention methods with reasons.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Charge carriers in metallic vs electrolytic conduction?', 'Electrons vs ions.', 'concept', 1),
    fc(2, 'Effect of temperature on electrolytic conductance?', 'Increases (lower viscosity, more dissociation).', 'concept', 1),
    fc(3, 'Unit of specific conductance?', 'S cm⁻¹.', 'fact', 1),
    fc(4, 'Cell constant?', 'G* = l/A (cm⁻¹); κ = G*/R.', 'formula', 1),
    fc(5, 'Why AC in conductance measurement?', 'To avoid electrolysis and polarisation at the electrodes.', 'concept', 1),
    fc(6, 'Molar conductance formula?', 'Λm = 1000κ/M (S cm² mol⁻¹).', 'formula', 2),
    fc(7, 'Equivalent conductance formula?', 'Λeq = 1000κ/N (S cm² eq⁻¹).', 'formula', 2),
    fc(8, 'Λm and Λeq of CaCl₂ related how?', 'Λm = 2Λeq.', 'formula', 2),
    fc(9, 'On dilution, κ and Λm?', 'κ decreases; Λm increases.', 'concept', 2),
    fc(10, 'Strong electrolyte equation for Λm?', 'Λm = Λ°m − A√c.', 'formula', 2),
    fc(11, 'Why can’t Λ° of a weak electrolyte be extrapolated?', 'Λm rises steeply near zero concentration; no straight line.', 'concept', 2),
    fc(12, 'State Kohlrausch’s law.', 'Λ°m = ν₊λ°₊ + ν₋λ°₋: ions contribute independently at infinite dilution.', 'definition', 3),
    fc(13, 'Λ° of CH₃COOH from strong electrolytes?', 'Λ°(HCl) + Λ°(CH₃COOK) − Λ°(KCl).', 'formula', 3),
    fc(14, 'Degree of dissociation from conductance?', 'α = Λm/Λ°m.', 'formula', 3),
    fc(15, 'Ka from α?', 'Ka = cα²/(1 − α).', 'formula', 3),
    fc(16, 'Faraday’s first law?', 'm = ZIt: mass ∝ charge passed.', 'definition', 4),
    fc(17, 'Faraday’s second law?', 'Same charge: masses ∝ equivalent masses.', 'definition', 4),
    fc(18, 'F in terms of N_A and e?', 'F = N_A e ≈ 96500 C mol⁻¹.', 'formula', 4),
    fc(19, 'Charge to deposit 1 mol of Al?', '3F = 289500 C.', 'example', 4),
    fc(20, 'Mass deposited formula?', 'm = MIt/(nF).', 'formula', 4),
    fc(21, 'Primary vs secondary cell?', 'Primary: not rechargeable. Secondary: rechargeable.', 'definition', 5),
    fc(22, 'Dry cell cathode reaction?', 'MnO₂ + NH₄⁺ + e⁻ → MnO(OH) + NH₃.', 'formula', 5),
    fc(23, 'Why is the mercury cell voltage constant?', 'Overall reaction involves no ions whose concentration changes.', 'concept', 5),
    fc(24, 'Lead storage battery overall reaction?', 'Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O.', 'formula', 5),
    fc(25, 'How is a lead battery’s charge checked?', 'Density of the acid (falls on discharge).', 'concept', 5),
    fc(26, 'Fuel cell advantages?', 'About 70% efficiency, continuous supply, water as product.', 'concept', 5),
    fc(27, 'Cathode reaction in rusting?', 'O₂ + 4H⁺ + 4e⁻ → 2H₂O.', 'formula', 6),
    fc(28, 'Formula of rust?', 'Fe₂O₃·xH₂O.', 'fact', 6),
    fc(29, 'Why does galvanising protect even when scratched?', 'Zn has a more negative E° than Fe and corrodes first.', 'concept', 6),
    fc(30, 'Sacrificial anode for ship hulls?', 'Magnesium (or zinc) blocks.', 'example', 6),
    fc(31, 'Exam tip: Faraday problems', 'Time in seconds; divide by n for moles of product.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
