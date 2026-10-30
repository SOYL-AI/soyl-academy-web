// ISC 12 Chemistry ch03 Electrochemical Cells and Electrode Potential — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V, nernstPlot } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electrochemical Cells and Electrode Potential — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Electrolytic and electrochemical cells; the Daniell cell',
      r`**Electrochemical (galvanic/voltaic) cell:** spontaneous redox reaction → electrical energy; anode negative, cathode positive. **Electrolytic cell:** electrical energy drives a non-spontaneous reaction; anode positive, cathode negative. In both, oxidation at the anode, reduction at the cathode.

**Daniell cell:** $\ce{Zn(s) + Cu^2+(aq) -> Zn^2+(aq) + Cu(s)}$; anode $\ce{Zn -> Zn^2+ + 2e-}$, cathode $\ce{Cu^2+ + 2e- -> Cu}$; $E^\circ_\text{cell} = 1.10\ \text{V}$. Electrons flow in the external circuit from Zn to Cu; current flows from Cu to Zn.

**Salt bridge** (KCl, KNO₃ or NH₄NO₃ in agar): completes the circuit, maintains electrical neutrality, prevents mixing of solutions, minimises liquid junction potential.

**Cell notation:** anode | anode electrolyte || cathode electrolyte | cathode; $E_\text{cell} = E_\text{right} - E_\text{left}$.`,
      [kt('Galvanic cell', 'A cell in which a spontaneous redox reaction produces electrical energy.'), kt('Salt bridge', 'A tube of an inert electrolyte in agar that connects the two half-cells and keeps them electrically neutral.'), kt('Anode', 'The electrode at which oxidation occurs.')],
      [],
      V.daniell,
      [1],
    ),
    sec(
      '2. Single electrode potential and the SHE',
      r`An electrode in contact with its ions sets up $\ce{M^{n+} + ne- <=> M}$; the resulting potential difference is the **electrode potential**. Absolute values cannot be measured, so potentials are measured against the **standard hydrogen electrode** (E° = 0 V at all temperatures) and quoted as **reduction potentials** (IUPAC). Standard conditions: 1 M ions, 1 bar gases, 298 K.

**SHE:** Pt foil coated with platinum black in 1 M H⁺, pure H₂ at 1 bar bubbled over it; $\ce{2H+(aq) + 2e- <=> H2(g)}$. **Limitations:** difficult to maintain exactly 1 M H⁺ and 1 bar H₂; Pt easily poisoned; cannot be used in the presence of oxidising agents; cumbersome.

**Measuring E°:** Zn | Zn²⁺(1 M) || SHE gives 0.76 V with Zn as anode, so $E^\circ_{\ce{Zn^2+/Zn}} = -0.76\ \text{V}$; SHE || Cu²⁺(1 M) | Cu gives 0.34 V with Cu as cathode, so $E^\circ_{\ce{Cu^2+/Cu}} = +0.34\ \text{V}$.`,
      [kt('Standard electrode potential', 'The reduction potential of an electrode measured against the SHE with 1 M ions, 1 bar gases at 298 K.'), kt('Standard hydrogen electrode', 'A reference electrode of platinised platinum in 1 M H⁺ with H₂ at 1 bar, assigned zero potential.')],
      [],
      V.she,
      [2],
    ),
    sec(
      '3. Factors affecting electrode potential',
      r`- **Concentration of ions:** for $\ce{M^{n+} + ne- -> M}$, $E = E^\circ + \dfrac{0.059}{n}\log[\ce{M^{n+}}]$ at 298 K; higher [Mⁿ⁺] gives a more positive E.
- **Temperature:** the Nernst factor $2.303RT/nF$ increases with $T$.
- **Nature of the electrode:** metals with low sublimation and ionisation enthalpies and high hydration enthalpy of their ions lose electrons easily and have more negative E°.`,
      [kt('Electrode potential', 'The potential difference between an electrode and the solution of its ions.')],
      [fm(r`E = E^\circ + \frac{0.059}{n}\log[\ce{M^{n+}}]`, 'Metal–ion electrode at 298 K')],
      nernstPlot,
      [3],
    ),
    sec(
      '4. Electrochemical series',
      r`Electrodes arranged in order of standard reduction potential (F₂/F⁻ +2.87 … Li⁺/Li −3.05 V).

**Applications:** (1) relative strengths of oxidising and reducing agents (more positive E° → stronger oxidant); (2) a metal with lower E° displaces one with higher E° from its salt solution; (3) metals with negative E° liberate H₂ from dilute acids; (4) $E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}$; (5) feasibility: a redox reaction is spontaneous if $E^\circ_\text{cell} > 0$.

E° is an **intensive** property: it is not multiplied by stoichiometric coefficients.`,
      [kt('Electrochemical series', 'The arrangement of electrodes in order of their standard reduction potentials.')],
      [fm(r`E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}`, 'Standard cell emf')],
      table(['Couple', 'E° / V'], [['Cl₂/Cl⁻', '+1.36'], ['Ag⁺/Ag', '+0.80'], ['Cu²⁺/Cu', '+0.34'], ['H⁺/H₂', '0.00'], ['Fe²⁺/Fe', '−0.44'], ['Zn²⁺/Zn', '−0.76'], ['Al³⁺/Al', '−1.66']], 'Table of selected standard reduction potentials'),
      [4],
    ),
    sec(
      '5. Nernst equation, Gibbs energy and equilibrium constant',
      r`**Nernst equation:** $E_\text{cell} = E^\circ_\text{cell} - \dfrac{2.303RT}{nF}\log Q = E^\circ_\text{cell} - \dfrac{0.059}{n}\log Q$ (298 K); $Q$ = products ÷ reactants, pure solids omitted. For the hydrogen electrode, $E = -0.059\,\text{pH}$ (1 bar H₂).

**Gibbs energy:** $\Delta G = -nFE_\text{cell}$, $\Delta G^\circ = -nFE^\circ_\text{cell}$; spontaneous if $E > 0$ ($\Delta G < 0$).

**Equilibrium constant:** at equilibrium $E_\text{cell} = 0$, so $E^\circ_\text{cell} = \dfrac{2.303RT}{nF}\log K = \dfrac{0.059}{n}\log K$ (298 K); also $\Delta G^\circ = -2.303RT\log K$.`,
      [kt('Nernst equation', 'Relates the emf of a cell to its standard emf and the reaction quotient.'), kt('Faraday constant', 'The charge on one mole of electrons, about 96500 C mol⁻¹.')],
      [fm(r`E_\text{cell} = E^\circ_\text{cell} - \frac{0.059}{n}\log Q`, 'Nernst equation at 298 K'), fm(r`\Delta G^\circ = -nFE^\circ_\text{cell}`, 'Gibbs energy and emf'), fm(r`\log K = \frac{nE^\circ_\text{cell}}{0.059}`, 'Equilibrium constant at 298 K')],
      table(['E°cell', 'ΔG°', 'K'], [['> 0', '< 0', '> 1'], ['0', '0', '1'], ['< 0', '> 0', '< 1']], 'Table linking the signs of E°cell, ΔG° and the size of K'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling the anode positive in a galvanic cell.
- Multiplying E° by stoichiometric coefficients.
- Writing Q as reactants over products, or including pure solids.
- Forgetting the minus sign in ΔG° = −nFE°, or leaving ΔG° in joules when kJ is asked.
- Getting the sign of E° wrong when a half-cell is measured against the SHE.

**How marks are usually awarded**
- Cell questions: half-reactions with states, cell notation, emf with sign.
- Nernst numericals: correct Q, n and log value, substitution, answer with units.
- SHE: diagram or description (Pt black, 1 M H⁺, 1 bar H₂) and limitations.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Galvanic vs electrolytic cell?', 'Galvanic: chemical → electrical, spontaneous. Electrolytic: electrical → chemical, non-spontaneous.', 'concept', 1),
    fc(2, 'Sign of the anode in a galvanic cell?', 'Negative (oxidation occurs there).', 'fact', 1),
    fc(3, 'Daniell cell reaction?', 'Zn + Cu²⁺ → Zn²⁺ + Cu; E° = 1.10 V.', 'formula', 1),
    fc(4, 'Functions of a salt bridge?', 'Completes the circuit, keeps solutions neutral, prevents mixing, reduces junction potential.', 'concept', 1),
    fc(5, 'Cell notation convention?', 'Anode on the left, cathode on the right; || = salt bridge.', 'definition', 1),
    fc(6, 'Direction of electron flow in the external circuit?', 'From anode to cathode.', 'fact', 1),
    fc(7, 'Why can’t a single electrode potential be measured?', 'Any measurement needs a second electrode; only differences can be measured.', 'concept', 2),
    fc(8, 'E° of the SHE?', '0.00 V at all temperatures (by convention).', 'fact', 2),
    fc(9, 'Why platinum black in the SHE?', 'Large surface area; adsorbs H₂ and speeds the electrode reaction.', 'concept', 2),
    fc(10, 'Two limitations of the SHE?', 'Hard to keep 1 M H⁺ and 1 bar H₂; Pt poisoned; unusable with oxidising agents.', 'concept', 2),
    fc(11, 'E° of Zn²⁺/Zn and how its sign is decided?', '−0.76 V; zinc is the anode when joined to the SHE.', 'fact', 2),
    fc(12, 'E° of Cu²⁺/Cu?', '+0.34 V (copper is the cathode against the SHE).', 'fact', 2),
    fc(13, 'Effect of increasing [Mⁿ⁺] on E of Mⁿ⁺/M?', 'E becomes more positive.', 'concept', 3),
    fc(14, 'Three factors affecting electrode potential?', 'Ion concentration, temperature, nature of the electrode.', 'fact', 3),
    fc(15, 'Slope of E vs log[Cu²⁺] at 298 K?', '0.059/2 = 0.0295 V per decade.', 'formula', 3),
    fc(16, 'Strongest oxidising agent in the series?', 'F₂ (E° = +2.87 V).', 'fact', 4),
    fc(17, 'Strong reducing agents lie…?', 'At the bottom (most negative E°), e.g. Li, K.', 'concept', 4),
    fc(18, 'Condition for a metal to liberate H₂ from dilute acid?', 'Its E° must be negative.', 'concept', 4),
    fc(19, 'Feasibility test for a redox reaction?', 'E°cell = E°cathode − E°anode must be positive.', 'concept', 4),
    fc(20, 'Is E° multiplied by stoichiometric coefficients?', 'No — it is an intensive property.', 'concept', 4),
    fc(21, 'Nernst equation for a cell at 298 K?', 'E = E° − (0.059/n) log Q.', 'formula', 5),
    fc(22, 'Value of 2.303RT/F at 298 K?', '0.059 V.', 'fact', 5),
    fc(23, 'Potential of a hydrogen electrode at pH x?', 'E = −0.059x V (H₂ at 1 bar).', 'formula', 5),
    fc(24, 'ΔG° from E°?', 'ΔG° = −nFE°.', 'formula', 5),
    fc(25, 'K from E° at 298 K?', 'log K = nE°/0.059.', 'formula', 5),
    fc(26, 'Emf of a cell at equilibrium?', 'Zero.', 'fact', 5),
    fc(27, 'Positive E°cell means…?', 'ΔG° negative, K > 1, spontaneous.', 'concept', 5),
    fc(28, 'Which is omitted from Q?', 'Pure solids and liquids.', 'concept', 5),
    fc(29, 'Can CuSO₄ be stored in an iron vessel?', 'No: Fe (−0.44 V) displaces Cu (+0.34 V).', 'example', 4),
    fc(30, 'Value of F?', '96500 C mol⁻¹ (charge on 1 mol of electrons).', 'fact', 5),
    fc(31, 'Exam tip: sign of E°', 'Anode vs SHE → negative E°; cathode vs SHE → positive E°.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
