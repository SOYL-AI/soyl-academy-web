// ch07 Redox Reactions — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Redox Reactions — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Oxidation and reduction',
      r`**Classical view:** oxidation is addition of oxygen or an electronegative element, or removal of hydrogen or an electropositive element; reduction is the reverse. **Electron view:** oxidation is **loss** of electrons, reduction is **gain** of electrons (remember: OIL RIG).

The **oxidising agent** accepts electrons and is itself reduced; the **reducing agent** donates electrons and is itself oxidised. Every redox reaction is a pair of **half-reactions**; electrons lost equal electrons gained. For $\ce{Zn + Cu^2+ -> Zn^2+ + Cu}$: oxidation $\ce{Zn -> Zn^2+ + 2e-}$, reduction $\ce{Cu^2+ + 2e- -> Cu}$.`,
      [kt('Oxidation', 'Loss of electrons; increase in oxidation number.'), kt('Reduction', 'Gain of electrons; decrease in oxidation number.'), kt('Oxidising agent', 'The species that accepts electrons and is reduced.'), kt('Reducing agent', 'The species that donates electrons and is oxidised.')],
      [],
      V.daniell,
      [1],
    ),
    sec(
      '2. Oxidation number and its rules',
      r`The **oxidation number** is the hypothetical charge on an atom if all bonding electrons went to the more electronegative atom. Rules: (1) atoms in an element: 0; (2) simple ion: its charge; (3) the sum for a species equals its charge; (4) group 1 is +1, group 2 is +2, fluorine is −1; (5) hydrogen is +1 (−1 in metal hydrides); (6) oxygen is −2, but −1 in peroxides, −½ in superoxides, +2 in $\ce{OF2}$.

A fractional ON is an average (Fe in $\ce{Fe3O4}$ is +8/3; S in $\ce{S4O6^2-}$ is +5/2). ON is **not** the same as valence: ON has a sign, and can be zero or fractional. **Stock notation** gives the metal's ON in Roman numerals: iron(III) oxide, $\ce{Fe2O3}$.`,
      [kt('Oxidation number', 'The charge an atom would have if its bonding electrons were assigned to the more electronegative atom.'), kt('Stock notation', 'Writing the oxidation number of a metal in Roman numerals in brackets after its name.')],
      [fm(r`\sum \text{ON} = \text{charge on the species}`, 'Sum rule')],
      V.mn,
      [1],
      [V.carbon],
    ),
    sec(
      '3. Identifying redox reactions and agents',
      r`A reaction is redox if any oxidation number changes. The species containing the atom whose ON **rises** is oxidised (the **reducing agent**); the species containing the atom whose ON **falls** is reduced (the **oxidising agent**). Neutralisation and precipitation reactions are not redox.

An element at its **highest** ON can only act as an oxidant ($\ce{MnO4-}$, $\ce{Cr2O7^2-}$, $\ce{ClO4-}$); at its **lowest** only as a reductant ($\ce{S^2-}$, $\ce{I-}$, $\ce{H2S}$); at an **intermediate** ON as either ($\ce{H2O2}$, $\ce{SO2}$, $\ce{HNO2}$).`,
      [kt('Intermediate oxidation state', 'An oxidation number between the highest and lowest the element can show; the species can be oxidised or reduced.')],
      [],
      table(['Species', 'Element and ON', 'Can act as'], [[r`$\ce{KMnO4}$`, 'Mn +7 (highest)', 'Oxidant only'], [r`$\ce{H2S}$`, 'S −2 (lowest)', 'Reductant only'], [r`$\ce{SO2}$`, 'S +4 (intermediate)', 'Either'], [r`$\ce{H2O2}$`, 'O −1 (intermediate)', 'Either']], 'Table of species at highest, lowest and intermediate oxidation states'),
      [1],
    ),
    sec(
      '4. Types of redox reactions',
      r`- **Combination:** $\ce{N2 + 3H2 -> 2NH3}$ (redox only if a free element is involved).
- **Decomposition:** $\ce{2KClO3 -> 2KCl + 3O2}$ (redox if an element is formed; $\ce{CaCO3 -> CaO + CO2}$ is not).
- **Displacement:** a more reactive metal displaces a less reactive one ($\ce{Zn + CuSO4 -> ZnSO4 + Cu}$) or hydrogen from an acid; a more reactive halogen displaces a less reactive one ($\ce{Cl2 + 2KBr -> 2KCl + Br2}$). Activity series: K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Ag, Au.
- **Disproportionation:** the same element is both oxidised and reduced: $\ce{2H2O2 -> 2H2O + O2}$; $\ce{Cl2 + 2OH- -> Cl- + ClO- + H2O}$ (cold, dilute alkali); $\ce{P4 + 3OH- + 3H2O -> PH3 + 3H2PO2-}$.

In a **Daniell cell** the zinc anode is oxidised, the copper cathode is reduced, and electrons flow from zinc to copper through the wire; a salt bridge completes the circuit.`,
      [kt('Displacement reaction', 'A reaction in which a more reactive element displaces a less reactive element from its compound.'), kt('Disproportionation', 'A redox reaction in which the same element in one species is simultaneously oxidised and reduced.')],
      [],
      V.cl,
      [2],
    ),
    sec(
      '5. Balancing redox equations',
      r`**Oxidation-number method:** write the skeleton, assign ON, find the total rise and fall, multiply to equalise, balance the other atoms, O and H last. Example: $\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$.

**Half-reaction (ion-electron) method:** write two half-reactions; balance (i) atoms other than O and H, (ii) O with $\ce{H2O}$, (iii) H with $\ce{H+}$, (iv) charge with $\ce{e-}$; multiply to equalise electrons and add. In **basic** medium, add $\ce{OH-}$ equal to the $\ce{H+}$ on both sides and cancel water.

Acidic: $\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 5Fe^3+ + 4H2O}$. Basic: $\ce{2MnO4- + 6I- + 4H2O -> 2MnO2 + 3I2 + 8OH-}$. Always check atoms **and** charge.`,
      [kt('Half-reaction', 'The oxidation or the reduction part of a redox reaction, written with the electrons.'), kt('Ion-electron method', 'Balancing a redox equation by balancing the two half-reactions separately.')],
      [],
      flow('TB', [['a', 'Two half-reactions'], ['b', 'Balance atoms, O with H₂O, H with H⁺'], ['c', 'Balance charge with e⁻'], ['d', 'Equalise electrons and add'], ['e', 'Basic: add OH⁻ to cancel H⁺']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the half-reaction method'),
      [2],
    ),
    sec(
      '6. Redox titrations',
      r`In acid, $\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$, so **1 mol $\ce{MnO4-}$ reacts with 5 mol $\ce{Fe^2+}$**, with 5/2 mol $\ce{H2O2}$, and 5/2 mol $\ce{C2O4^2-}$ ($\ce{2MnO4- + 5C2O4^2- + 16H+ -> 2Mn^2+ + 10CO2 + 8H2O}$). Permanganate is **self-indicating** (end point: first permanent pale pink). Acidify with **dilute sulfuric acid**: hydrochloric acid is oxidised by permanganate and nitric acid is itself an oxidant.

Method: moles of titrant = molarity × volume (L); moles of analyte = moles of titrant × ratio from the balanced equation; molarity = moles ÷ volume of sample (L).`,
      [kt('Self-indicator', 'A reagent whose own colour change signals the end point.'), kt('End point', 'The point at which the titration is stopped, shown here by the first permanent faint pink colour.')],
      [fm(r`n_{\text{analyte}} = n_{\text{titrant}} \times \text{mole ratio}`, 'Titration stoichiometry')],
      V.titr,
      [2],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using −2 for oxygen in peroxides, superoxides and OF₂.
- Calling the reduced species the reducing agent (the reducing agent is oxidised).
- Forgetting that the sum of ONs equals the charge, not zero, for an ion.
- Leaving electrons unequal, or H⁺ in a basic-medium equation, or forgetting to check charge.
- Using the ratio 1 : 1 for MnO₄⁻ and Fe²⁺ (it is 1 : 5) or acidifying with HCl.
- Calling every combination or decomposition reaction redox.

**How marks are usually awarded**
- 1-mark items: ON of an atom, oxidising or reducing agent, type of reaction.
- Balancing (2–3 marks): the two half-reactions (1), equalised electrons (1), final balanced equation checked for charge (1).
- Titration numericals: balanced ratio (1), moles (1), answer with unit (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Oxidation and reduction in terms of electrons?', 'Oxidation: loss of electrons. Reduction: gain of electrons.', 'definition', 1),
    fc(2, 'Oxidising agent?', 'The species that accepts electrons and is itself reduced.', 'definition', 1),
    fc(3, 'Reducing agent?', 'The species that donates electrons and is itself oxidised.', 'definition', 1),
    fc(4, 'Classical oxidation (oxygen and hydrogen)?', 'Addition of oxygen or removal of hydrogen.', 'fact', 1),
    fc(5, 'Why do oxidation and reduction occur together?', 'Electrons lost by one species must be gained by another.', 'concept', 1),
    fc(6, 'What is an oxidation number?', 'The charge an atom would have if bonding electrons went to the more electronegative atom.', 'definition', 1),
    fc(7, 'ON of an atom in an element?', 'Zero (O₂, S₈, Fe).', 'fact', 1),
    fc(8, 'Sum of ONs in an ion?', 'Equal to the charge of the ion.', 'fact', 1),
    fc(9, 'ON of hydrogen in a metal hydride such as NaH?', '−1 (it is +1 in most other compounds).', 'fact', 1),
    fc(10, 'ON of oxygen in H₂O₂, KO₂ and OF₂?', '−1, −½ and +2.', 'example', 1),
    fc(11, 'ON of Fe in Fe₃O₄?', r`$+8/3$ (average of Fe²⁺ and Fe³⁺).`, 'example', 1),
    fc(12, 'ON of S in S₄O₆²⁻?', '+5/2 (average).', 'example', 1),
    fc(13, 'Oxidation number versus valence?', 'ON has a sign and can be zero or fractional; valence is the number of bonds.', 'concept', 1),
    fc(14, 'Stock notation example?', 'Iron(III) oxide for Fe₂O₃: Roman numeral gives the metal ON.', 'example', 1),
    fc(15, 'Which species can only be an oxidising agent?', 'One whose element is in its highest oxidation state (MnO₄⁻, Cr₂O₇²⁻).', 'concept', 1),
    fc(16, 'Which species can only be a reducing agent?', 'One whose element is in its lowest oxidation state (S²⁻, I⁻).', 'concept', 1),
    fc(17, 'Why can H₂O₂ be both oxidant and reductant?', 'Oxygen is at −1, between −2 and 0.', 'concept', 1),
    fc(18, 'Is neutralisation redox?', 'No: no oxidation number changes.', 'fact', 1),
    fc(19, 'Four types of redox reaction?', 'Combination, decomposition, displacement, disproportionation.', 'fact', 2),
    fc(20, 'Define disproportionation.', 'The same element in one species is both oxidised and reduced.', 'definition', 2),
    fc(21, 'Disproportionation of chlorine in cold dilute alkali?', r`$\ce{Cl2 + 2OH- -> Cl- + ClO- + H2O}$`, 'example', 2),
    fc(22, 'Which metals displace hydrogen from dilute acids?', 'Those above hydrogen in the activity series.', 'fact', 2),
    fc(23, 'In a Daniell cell, where does oxidation occur?', 'At the zinc anode; electrons flow through the wire to the copper cathode.', 'diagram', 2),
    fc(24, 'Role of a salt bridge?', 'Lets ions move between the half-cells to keep the circuit complete and solutions neutral.', 'concept', 2),
    fc(25, 'Basis of the oxidation-number method?', 'Total increase in ON equals total decrease in ON.', 'concept', 2),
    fc(26, 'Steps of the half-reaction method in acid?', 'Balance atoms, O with H₂O, H with H⁺, charge with e⁻; equalise electrons and add.', 'concept', 2),
    fc(27, 'How is a basic-medium equation obtained?', 'Balance as in acid, then add OH⁻ equal to H⁺ on both sides and cancel water.', 'concept', 2),
    fc(28, 'Acidic reduction of MnO₄⁻?', r`$\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$`, 'formula', 2),
    fc(29, 'Mole ratio of MnO₄⁻ to Fe²⁺ in acid?', '1 : 5.', 'formula', 2),
    fc(30, 'Why is permanganate titration done in dilute H₂SO₄?', 'HCl is oxidised by permanganate and HNO₃ is itself an oxidant; H₂SO₄ is not oxidised.', 'exam-tip', 2),
  ],
};
