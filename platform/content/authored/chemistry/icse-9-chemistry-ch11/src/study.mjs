// ICSE 9 Chemistry ch11 notes and flashcards.
import { T, unit, PROV, table } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Oxidation and Reduction — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Oxidation and reduction: oxygen and hydrogen',
      `The first idea of oxidation and reduction is about the transfer of oxygen and hydrogen.

| | Oxidation | Reduction |
|---|---|---|
| Oxygen | **Addition** of oxygen | **Removal** of oxygen |
| Hydrogen | **Removal** of hydrogen | **Addition** of hydrogen |

| Reaction | Oxidised | Reduced |
|---|---|---|
| $\\ce{2Mg + O2 -> 2MgO}$ | Magnesium (gains oxygen) | Oxygen (it gains electrons; see section 2) |
| $\\ce{PbO + H2 -> Pb + H2O}$ | Hydrogen (gains oxygen) | Lead(II) oxide (loses oxygen) |
| $\\ce{2Mg + CO2 -> 2MgO + C}$ | Magnesium (gains oxygen) | Carbon dioxide (loses oxygen) |
| $\\ce{2CO + O2 -> 2CO2}$ | Carbon monoxide (gains oxygen) | Oxygen (it gains electrons; see section 2) |
| $\\ce{Cl2 + H2S -> 2HCl + S}$ | Hydrogen sulphide (loses hydrogen) | Chlorine (gains hydrogen) |
| $\\ce{MnO2 + 4HCl -> MnCl2 + 2H2O + Cl2}$ | Hydrochloric acid (loses hydrogen) | Manganese(IV) oxide (loses oxygen) |

**Oxidation and reduction occur together.** When one substance gains oxygen, another loses it; when one loses hydrogen, another gains it. A reaction in which both take place is a **redox reaction**.`,
      [kt('Oxidation', 'Addition of oxygen to a substance, or removal of hydrogen from it (and loss of electrons).'), kt('Reduction', 'Removal of oxygen from a substance, or addition of hydrogen to it (and gain of electrons).'), kt('Redox reaction', 'A reaction in which oxidation and reduction take place together.')],
      table(['', 'Oxidation', 'Reduction'], [['Oxygen', 'Gained', 'Lost'], ['Hydrogen', 'Lost', 'Gained']], 'Table of oxidation and reduction in terms of oxygen and hydrogen'),
      [1],
    ),
    sec(
      '2. The electronic concept: loss and gain of electrons',
      `In terms of electrons, **oxidation is loss of electrons** and **reduction is gain of electrons**. The electrons lost by one substance are gained by another, so the two changes always go together.

A change is written as a **half-change**, with electrons shown. Atoms and charge must balance, and each electron has a charge of −1.

| Oxidation (electrons on the right) | Reduction (electrons on the left) |
|---|---|
| $\\ce{Na -> Na+ + e-}$ | $\\ce{Cl2 + 2e- -> 2Cl-}$ |
| $\\ce{Mg -> Mg^2+ + 2e-}$ | $\\ce{Cu^2+ + 2e- -> Cu}$ |
| $\\ce{Al -> Al^3+ + 3e-}$ | $\\ce{Ag+ + e- -> Ag}$ |
| $\\ce{Zn -> Zn^2+ + 2e-}$ | $\\ce{Pb^2+ + 2e- -> Pb}$ |
| $\\ce{Fe^2+ -> Fe^3+ + e-}$ | $\\ce{Fe^3+ + e- -> Fe^2+}$ |
| $\\ce{2I- -> I2 + 2e-}$ | $\\ce{O + 2e- -> O^2-}$ |

**Sodium and chlorine:** a sodium atom (2, 8, 1) loses its outer electron to become $\\ce{Na+}$ (2, 8); a chlorine atom (2, 8, 7) gains one to become $\\ce{Cl-}$ (2, 8, 8). Sodium is oxidised; chlorine is reduced.

**Joining two half-changes.** Multiply each half so that the electrons lost equal the electrons gained, then add them; the electrons cancel.
- $\\ce{Mg -> Mg^2+ + 2e-}$ and $\\ce{Fe^2+ + 2e- -> Fe}$ give $\\ce{Mg + Fe^2+ -> Mg^2+ + Fe}$.
- $2\\times(\\ce{Al -> Al^3+ + 3e-})$ and $3\\times(\\ce{Fe^2+ + 2e- -> Fe})$ (six electrons each way) give $\\ce{2Al + 3Fe^2+ -> 2Al^3+ + 3Fe}$.

**A metal in a salt solution:** magnesium in blue copper(II) sulphate loses electrons ($\\ce{Mg -> Mg^2+ + 2e-}$); copper ions gain them and form reddish-brown copper ($\\ce{Cu^2+ + 2e- -> Cu}$).`,
      [kt('Half-change', 'The oxidation or the reduction part of a redox reaction, written separately with the electrons shown.'), kt('Electronic concept', 'Oxidation is loss of electrons and reduction is gain of electrons.')],
      V.transfer,
      [2],
    ),
    sec(
      '3. Oxidising agents, reducing agents and redox reactions',
      `| | Oxidising agent | Reducing agent |
|---|---|---|
| Effect on the other substance | Oxidises it | Reduces it |
| What happens to the agent | It is **reduced** | It is **oxidised** |
| Oxygen | Gives oxygen | Removes oxygen |
| Hydrogen | Removes hydrogen | Gives hydrogen |
| Electrons | **Gains** electrons | **Loses** electrons |
| Common examples | Oxygen, chlorine, nitric acid, hydrogen peroxide, potassium permanganate, potassium dichromate | Hydrogen, carbon, carbon monoxide, hydrogen sulphide, reactive metals |

**Identifying the agents.** In $\\ce{PbO + H2 -> Pb + H2O}$ hydrogen is the reducing agent and lead(II) oxide the oxidising agent. In $\\ce{Cl2 + H2S -> 2HCl + S}$ chlorine is the oxidising agent and hydrogen sulphide the reducing agent. In $\\ce{Mg + Cu^2+ -> Mg^2+ + Cu}$ magnesium is the reducing agent and the copper(II) ion the oxidising agent.

**Colour changes in redox reactions** (observations): chlorine turns pale green iron(II) chloride solution yellow, $\\ce{2FeCl2 + Cl2 -> 2FeCl3}$; chlorine turns colourless potassium iodide solution brown, $\\ce{2KI + Cl2 -> 2KCl + I2}$; chlorine and hydrogen sulphide give a yellow deposit of sulphur; lead(II) oxide (yellow) changes to grey lead in hydrogen.

**Not every reaction is redox.** Precipitation ($\\ce{AgNO3 + NaCl -> AgCl + NaNO3}$), neutralisation ($\\ce{HCl + NaOH -> NaCl + H2O}$) and thermal decomposition of calcium carbonate involve no change of this kind.`,
      [kt('Oxidising agent', 'A substance that oxidises another substance and is itself reduced; it gains electrons.'), kt('Reducing agent', 'A substance that reduces another substance and is itself oxidised; it loses electrons.')],
      table(['Agent', 'Itself', 'Electrons'], [['Oxidising agent', 'Reduced', 'Gains'], ['Reducing agent', 'Oxidised', 'Loses']], 'Table of oxidising and reducing agents'),
      [3],
      [V.strip],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying that oxidation is the gain of electrons (it is the loss).
- Writing the electrons on the wrong side: oxidation has them on the right, reduction on the left.
- Writing a half-change in which atoms balance but the charge does not.
- Calling the substance that is reduced the reducing agent; the reducing agent is the one that is oxidised.
- Writing ions without the charge, or the charge as a subscript; write Cu²⁺, not Cu₂.
- Naming only the substance oxidised, or only the substance reduced.
- Leaving electrons in a final redox equation, or adding half-changes with unequal numbers of electrons.
- Treating precipitation or neutralisation as redox.

**How marks are usually awarded**
- 1 mark: a half-change, an agent, a colour or a name.
- 2 marks: the substance oxidised and the substance reduced, each with a reason; or two half-changes.
- 3 marks: a balanced equation with the agents named.
- 10-mark structured question: a situation or an experiment in parts: observations, equations, half-changes, agents and a count of electrons.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Oxidation in terms of oxygen?', 'Addition of oxygen to a substance.', 'definition', 1),
    fc(2, 'Reduction in terms of oxygen?', 'Removal of oxygen from a substance.', 'definition', 1),
    fc(3, 'Oxidation in terms of hydrogen?', 'Removal of hydrogen from a substance.', 'definition', 1),
    fc(4, 'Reduction in terms of hydrogen?', 'Addition of hydrogen to a substance.', 'definition', 1),
    fc(5, 'PbO + H₂ → Pb + H₂O: which is oxidised, which is reduced?', 'Hydrogen is oxidised (gains oxygen); lead(II) oxide is reduced (loses oxygen).', 'example', 1),
    fc(6, '2Mg + CO₂ → 2MgO + C: which is oxidised?', 'Magnesium (gains oxygen); carbon dioxide is reduced.', 'example', 1),
    fc(7, 'Cl₂ + H₂S → 2HCl + S: which is oxidised?', 'Hydrogen sulphide (loses hydrogen); chlorine is reduced.', 'example', 1),
    fc(8, 'MnO₂ + 4HCl → MnCl₂ + 2H₂O + Cl₂: which is oxidised?', 'Hydrochloric acid (loses hydrogen); MnO₂ is reduced (loses oxygen).', 'example', 1),
    fc(9, 'What is a redox reaction?', 'A reaction in which oxidation and reduction take place together.', 'definition', 1),
    fc(10, 'Why do oxidation and reduction always occur together?', 'What one substance loses (oxygen, hydrogen or electrons) another substance gains.', 'concept', 1),
    fc(11, 'Oxidation in terms of electrons?', 'Loss of electrons.', 'definition', 2),
    fc(12, 'Reduction in terms of electrons?', 'Gain of electrons.', 'definition', 2),
    fc(13, 'Half-change for sodium becoming a sodium ion?', 'Na → Na⁺ + e⁻ (oxidation).', 'formula', 2),
    fc(14, 'Half-change for chlorine becoming chloride ions?', 'Cl₂ + 2e⁻ → 2Cl⁻ (reduction).', 'formula', 2),
    fc(15, 'Half-change for magnesium becoming a magnesium ion?', 'Mg → Mg²⁺ + 2e⁻ (oxidation).', 'formula', 2),
    fc(16, 'Half-change for a copper(II) ion becoming copper?', 'Cu²⁺ + 2e⁻ → Cu (reduction).', 'formula', 2),
    fc(17, 'Half-change for Fe²⁺ becoming Fe³⁺?', 'Fe²⁺ → Fe³⁺ + e⁻ (oxidation).', 'formula', 2),
    fc(18, 'Where do the electrons appear in an oxidation half-change?', 'On the right-hand side.', 'fact', 2),
    fc(19, 'Where do the electrons appear in a reduction half-change?', 'On the left-hand side.', 'fact', 2),
    fc(20, 'What must balance in a half-change?', 'Both the atoms and the electric charge.', 'fact', 2),
    fc(21, 'Combining Mg → Mg²⁺ + 2e⁻ with Fe²⁺ + 2e⁻ → Fe?', 'Mg + Fe²⁺ → Mg²⁺ + Fe; the electrons cancel.', 'example', 2),
    fc(22, 'What is an oxidising agent?', 'A substance that oxidises another and is itself reduced; it gains electrons.', 'definition', 3),
    fc(23, 'What is a reducing agent?', 'A substance that reduces another and is itself oxidised; it loses electrons.', 'definition', 3),
    fc(24, 'Three common oxidising agents?', 'Oxygen, chlorine, nitric acid (also hydrogen peroxide, potassium permanganate).', 'fact', 3),
    fc(25, 'Four common reducing agents?', 'Hydrogen, carbon, carbon monoxide and hydrogen sulphide (also reactive metals).', 'fact', 3),
    fc(26, 'In Mg + Cu²⁺ → Mg²⁺ + Cu, name the agents.', 'Magnesium is the reducing agent; the copper(II) ion is the oxidising agent.', 'example', 3),
    fc(27, 'Colour change when chlorine reacts with iron(II) chloride solution?', 'Pale green turns yellow: 2FeCl₂ + Cl₂ → 2FeCl₃.', 'fact', 3),
    fc(28, 'What is seen when chlorine is passed into potassium iodide solution?', 'The solution turns brown as iodine forms.', 'fact', 3),
    fc(29, 'Is AgNO₃ + NaCl → AgCl + NaNO₃ a redox reaction?', 'No: the ions only swap partners and no electrons are transferred.', 'concept', 3),
    fc(30, 'Exam tip: naming the agents', 'The reducing agent is the substance that is oxidised; the oxidising agent is the one that is reduced.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
