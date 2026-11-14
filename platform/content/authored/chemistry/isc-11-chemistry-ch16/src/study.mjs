// ISC 11 Chemistry ch16 Redox Reactions: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { ON, EQ, sg } from './data.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const ce = (eq) => `$\\ce{${eq}}$`;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Redox Reactions — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Oxidation and reduction; oxidising and reducing agents',
      r`| Definition | Oxidation | Reduction |
|---|---|---|
| Oxygen | gain of oxygen | loss of oxygen |
| Hydrogen | loss of hydrogen | gain of hydrogen |
| Electrons | **loss** of electrons | **gain** of electrons |
| Oxidation number | increases | decreases |

The two always occur **together** (redox). The substance that **gains** electrons is reduced and is the **oxidising agent**; the substance that **loses** electrons is oxidised and is the **reducing agent**. Examples: ${ce(EQ.NaCl2)} (Na reducing agent, Cl₂ oxidising agent); ${ce(EQ.Fe2O3CO)} (CO is the reducing agent, Fe₂O₃ the oxidising agent).`,
      [kt('Oxidation', 'Loss of electrons, gain of oxygen, loss of hydrogen; an increase in oxidation number.'), kt('Reduction', 'Gain of electrons, loss of oxygen, gain of hydrogen; a decrease in oxidation number.'), kt('Oxidising agent', 'The substance that gains electrons (is reduced) and so oxidises the other substance.'), kt('Reducing agent', 'The substance that loses electrons (is oxidised) and so reduces the other substance.')],
      [],
      table(['Reaction', 'Oxidised', 'Reduced'], [['2Na + Cl₂ → 2NaCl', 'Na', 'Cl₂'], ['Cl₂ + 2KI → 2KCl + I₂', 'I⁻', 'Cl₂'], ['Fe₂O₃ + 3CO → 2Fe + 3CO₂', 'CO', 'Fe₂O₃']], 'Table of three redox reactions with the species oxidised and reduced'),
      [1],
      [V.etr],
    ),
    sec(
      '2. Oxidation number: the rules',
      r`The **oxidation number (ON)** is the charge an atom would have if all bonding electrons were assigned to the more electronegative atom.

1. ON of an atom in an **element** is 0.
2. ON of a **monatomic ion** equals its charge.
3. The **sum** of ON in a neutral compound is 0; in a polyatomic ion it equals the ion's charge.
4. Group 1 metals are +1, group 2 metals +2, **fluorine −1** always.
5. **Hydrogen +1** (−1 in metal hydrides such as NaH, CaH₂). **Oxygen −2** (−1 in peroxides such as H₂O₂, +2 in OF₂, −½ in superoxides).

The ON can be **fractional** when it is an **average** over atoms of the same element (S in Na₂S₄O₆, Fe in Fe₃O₄).`,
      [kt('Oxidation number', 'The charge an atom would carry if the shared electrons were given to the more electronegative atom.'), kt('Average oxidation number', 'The mean value for atoms of one element in a species where they are not all identical; it may be a fraction.')],
      [],
      table(['Species', 'Atom', 'ON'], [['H₂O₂', 'O', sg(ON.H2O2.O)], ['OF₂', 'O', sg(ON.OF2.O)], ['CaH₂', 'H', sg(ON.CaH2.H)], ['Na₂S₄O₆', 'S (average)', sg(ON.Na2S4O6.S)]], 'Table of exceptional and fractional oxidation numbers'),
      [2],
      [V.cl],
    ),
    sec(
      '3. Calculating oxidation numbers; redox as a change in oxidation number',
      r`Write one equation: (sum of ON of all atoms) $=$ charge of the species.

- $\ce{K2Cr2O7}$: $2(+1) + 2x + 7(-2) = 0$, so Cr $= ${sg(ON.K2Cr2O7.Cr)}$.
- $\ce{S2O3^2-}$: $2x + 3(-2) = -2$, so S $= ${sg(ON.S2O3.S)}$.
- $\ce{MnO4-}$: $x - 8 = -1$, so Mn $= ${sg(ON.MnO4.Mn)}$; $\ce{MnO4^2-}$: Mn $= ${sg(ON.MnO4_2.Mn)}$.

A reaction is **redox** if the ON of some element **changes**; oxidation is an **increase** and reduction a **decrease**, and the **total increase equals the total decrease**. Precipitation and neutralisation are **not** redox.`,
      [kt('Redox reaction', 'A reaction in which the oxidation number of at least one element changes.')],
      [fm(r`\sum(\text{ON}) = \text{charge on the species}`, 'Rule for calculating oxidation numbers')],
      table(['Species', 'Element', 'ON'], [['K₂Cr₂O₇', 'Cr', sg(ON.K2Cr2O7.Cr)], ['S₂O₃²⁻', 'S', sg(ON.S2O3.S)], ['HNO₃', 'N', sg(ON.HNO3.N)], ['NH₄⁺', 'N', sg(ON.NH4.N)]], 'Table of calculated oxidation numbers'),
      [2],
      [],
    ),
    sec(
      '4. Balancing by the oxidation number method',
      r`1. Write the **skeletal** equation. 2. Assign ON and find the atoms that change. 3. Find the **rise** and **fall** per atom. 4. Multiply so that **total rise = total fall**. 5. Balance the remaining atoms: **O with H₂O, H with H⁺** (acidic; with OH⁻ in basic). 6. Check **atoms and charge**.

Worked: $\ce{MnO4- + Fe^2+ -> Mn^2+ + Fe^3+}$ (skeletal). Mn falls by 5, Fe rises by 1: use 5 Fe²⁺. Charge left $-1 + 10 = +9$, right $+17$: add 8 H⁺ on the left; then 4 H₂O on the right. ${ce(EQ.MnFe)}

Also: ${ce(EQ.CuNO3)} (Cu 0 → +2, N +5 → +2, 3 Cu per 2 NO₃⁻).`,
      [kt('Skeletal equation', 'An unbalanced equation that shows only the reactants and products.')],
      [],
      table(['Step', 'MnO₄⁻ + Fe²⁺ (acidic)'], [['ON change', 'Mn +7 → +2 (fall 5); Fe +2 → +3 (rise 1)'], ['Multiply', '5 Fe²⁺ per MnO₄⁻'], ['Balance charge with H⁺', '8 H⁺'], ['Balance O and H with H₂O', '4 H₂O']], 'Table of the oxidation number method steps applied to permanganate and iron(II)'),
      [3],
      [V.onm],
    ),
    sec(
      '5. Balancing by the ion-electron method; acidic and basic media',
      r`Split into **oxidation** and **reduction** half-reactions. In each: balance atoms other than O and H; **O with H₂O**; **H with H⁺**; **charge with electrons**. Multiply to equalise electrons, add and cancel.

Acidic: ${ce(EQ.hMn)} and ${ce(EQ.hFe)} (×5) give ${ce(EQ.MnFe)} Also ${ce(EQ.hCr)} gives ${ce(EQ.CrFe)}

**Basic medium:** after balancing as if acidic, add OH⁻ to both sides equal to the number of H⁺, form H₂O and cancel. Example: ${ce(EQ.CrO2H2O2)} Always check atoms **and** charge.`,
      [kt('Half-reaction', 'The oxidation or the reduction part of a redox reaction, written with the electrons transferred.')],
      [],
      table(['Medium', 'Add to balance O', 'Add to balance H'], [['Acidic', 'H₂O', 'H⁺'], ['Basic', 'H₂O', 'OH⁻, with H₂O on the other side']], 'Table of the species used to balance acidic and basic half-reactions'),
      [3],
      [V.half],
    ),
    sec(
      '6. Types of redox reaction and applications',
      r`- **Combination:** ${ce(EQ.NaCl2)}.
- **Decomposition** (redox when an element changes ON): ${ce(EQ.KClO3)}; ${ce(EQ.HgO)}.
- **Displacement:** ${ce(EQ.ClKI)}; ${ce(EQ.ZnH)}; ${ce(EQ.FeCuSO4)}.
- **Disproportionation:** one element is simultaneously oxidised and reduced, so it must be in an **intermediate ON**: ${ce(EQ.Cl2cold)} and ${ce(EQ.Cl2hot)}.

**Applications:** the same ideas explain combustion, rusting, extraction of metals (reduction of ores), bleaching, and the titration of Fe²⁺ with permanganate or dichromate in acid.`,
      [kt('Displacement reaction', 'A reaction in which a more reactive element displaces a less reactive one from its compound.'), kt('Disproportionation', 'A redox reaction in which the same element is both oxidised and reduced.')],
      [],
      table(['Type', 'Example', 'ON evidence'], [['Combination', '2Na + Cl₂ → 2NaCl', 'Na 0 → +1; Cl 0 → −1'], ['Decomposition', '2KClO₃ → 2KCl + 3O₂', 'Cl +5 → −1; O −2 → 0'], ['Displacement', 'Cl₂ + 2KI → 2KCl + I₂', 'Cl 0 → −1; I −1 → 0'], ['Disproportionation', 'Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O', 'Cl 0 → −1 and +1']], 'Table of the four types of redox reaction with examples and evidence'),
      [4],
      [V.types, V.disp],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Naming the species that is oxidised as the oxidising agent.
- Setting the sum of oxidation numbers to 0 for an ion.
- Balancing atoms but forgetting charge; leaving H⁺ in a basic-medium equation.
- Taking O as −2 in peroxides and OF₂.
- Saying "disproportionation" without showing one element going both up and down.
**Marks**
- Oxidation number: equation (1), answer with sign (1).
- Balancing: ON change or half-reactions (1), multipliers (1), balanced equation (1), check of atoms and charge (1).
- Classification: ON evidence (1), type (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Oxidation in terms of oxygen, hydrogen and electrons?', 'Gain of oxygen, loss of hydrogen, loss of electrons.', 'definition', 1),
    fc(2, 'Reduction in terms of oxygen, hydrogen and electrons?', 'Loss of oxygen, gain of hydrogen, gain of electrons.', 'definition', 1),
    fc(3, 'What is a redox reaction?', 'A reaction in which oxidation and reduction occur together.', 'definition', 1),
    fc(4, 'What is an oxidising agent?', 'The substance that gains electrons and is itself reduced.', 'definition', 1),
    fc(5, 'What is a reducing agent?', 'The substance that loses electrons and is itself oxidised.', 'definition', 1),
    fc(6, 'In 2Na + Cl₂ → 2NaCl name the agents.', 'Na is the reducing agent; Cl₂ is the oxidising agent.', 'example', 1),
    fc(7, 'In Fe₂O₃ + 3CO → 2Fe + 3CO₂ which is reduced?', 'Fe₂O₃ (iron falls from +3 to 0); CO is oxidised.', 'example', 1),
    fc(8, 'Define oxidation number.', 'The charge an atom would have if all bonding electrons went to the more electronegative atom.', 'definition', 2),
    fc(9, 'ON of an atom in an element?', 'Zero (Na, O₂, S₈, P₄).', 'fact', 2),
    fc(10, 'Sum of ON in a neutral compound and in an ion?', 'Zero for a neutral compound; equal to the charge for an ion.', 'fact', 2),
    fc(11, 'ON of fluorine?', 'Always −1 in compounds.', 'fact', 2),
    fc(12, 'Usual ON of hydrogen and its exception?', '+1; −1 in metal hydrides such as NaH.', 'fact', 2),
    fc(13, 'Usual ON of oxygen and its exceptions?', '−2; −1 in peroxides; +2 in OF₂.', 'fact', 2),
    fc(14, 'ON of Cr in K₂Cr₂O₇?', `${sg(ON.K2Cr2O7.Cr)} from 2(+1) + 2x + 7(−2) = 0.`, 'example', 2),
    fc(15, 'ON of S in S₂O₃²⁻?', `${sg(ON.S2O3.S)} from 2x + 3(−2) = −2.`, 'example', 2),
    fc(16, 'ON of Mn in KMnO₄ and in K₂MnO₄?', '+7 and +6.', 'example', 2),
    fc(17, 'Why can an ON be fractional?', 'It is an average over atoms of the same element with different actual numbers, as S in Na₂S₄O₆ (+2.5).', 'concept', 2),
    fc(18, 'How does ON show oxidation and reduction?', 'Oxidation: ON increases. Reduction: ON decreases. Total rise = total fall.', 'concept', 2),
    fc(19, 'Is a precipitation reaction redox?', 'No: no oxidation number changes.', 'concept', 2),
    fc(20, 'Steps of the oxidation number method?', 'Skeletal equation; ON; rise and fall; equalise; balance O, H; check atoms and charge.', 'fact', 3),
    fc(21, 'In MnO₄⁻ → Mn²⁺ how much does the ON of Mn change?', 'It falls by 5 (+7 to +2), so 5 Fe²⁺ (rise 1 each) are needed.', 'example', 3),
    fc(22, 'Balanced equation of MnO₄⁻ with Fe²⁺ in acid?', 'MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺.', 'fact', 3),
    fc(23, 'How many electrons does Cr₂O₇²⁻ gain in acid?', 'Six: Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O.', 'fact', 3),
    fc(24, 'Steps of the ion-electron method?', 'Two half-reactions; balance atoms, O with H₂O, H with H⁺, charge with e⁻; equalise electrons; add.', 'fact', 3),
    fc(25, 'Which side do electrons appear on in a reduction half?', 'On the left (reactant side); in an oxidation half they are on the right.', 'concept', 3),
    fc(26, 'How is a basic-medium equation balanced?', 'Balance as in acid, add OH⁻ to both sides to turn H⁺ into H₂O, and cancel water.', 'concept', 3),
    fc(27, 'What must be checked in a balanced redox equation?', 'Atoms of every element and the total charge on each side.', 'concept', 3),
    fc(28, 'Name the four types of redox reaction.', 'Combination, decomposition, displacement, disproportionation.', 'fact', 4),
    fc(29, 'Define disproportionation with an example.', 'One element is simultaneously oxidised and reduced: Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O.', 'definition', 4),
    fc(30, 'When is a decomposition reaction redox?', 'When an element changes its oxidation number, e.g. 2KClO₃ → 2KCl + 3O₂ but not CaCO₃ → CaO + CO₂.', 'concept', 4),
    fc(31, 'What condition lets an element disproportionate?', 'It must be in an intermediate oxidation number so that it can both rise and fall.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
