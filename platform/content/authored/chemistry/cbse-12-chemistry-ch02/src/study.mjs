// ch02 Electrochemistry — notes and flashcards.
import { T, table, flow, chem, unit, PROV, r } from './lib.mjs';
import { V, condPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electrochemistry — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Galvanic cells and electrode potential',
      r`A **galvanic (voltaic) cell** converts the Gibbs energy of a spontaneous redox reaction into electrical energy. In the **Daniell cell**, zinc is oxidised at the **anode** ($\ce{Zn -> Zn^2+ + 2e-}$) and copper(II) ions are reduced at the **cathode** ($\ce{Cu^2+ + 2e- -> Cu}$); with 1 M solutions the EMF is 1.10 V. A **salt bridge** (KCl or $\ce{NH4NO3}$ in agar) completes the internal circuit and keeps the solutions electrically neutral.

**Cell notation:** anode | anode solution || cathode solution | cathode, e.g. $\ce{Zn(s) | Zn^2+(aq) || Cu^2+(aq) | Cu(s)}$. $E_\text{cell} = E_\text{right} - E_\text{left} = E_\text{cathode} - E_\text{anode}$.

**Electrode potential** is measured against the **standard hydrogen electrode** (Pt, platinum black, $\ce{H2}$ at 1 bar, $[\ce{H+}] = 1\ \text{M}$), assigned $E^\circ = 0$. Standard conditions: 1 M, 1 bar, 298 K. The **electrochemical series** lists standard reduction potentials: the more positive $E^\circ$, the stronger the oxidising agent (F₂ +2.87 V); the more negative, the stronger the reducing agent (Li −3.05 V). A metal with a lower $E^\circ$ displaces the ions of one with a higher $E^\circ$; metals with negative $E^\circ$ liberate hydrogen from dilute acids. $E^\circ$ values are **intensive**: never multiply them by stoichiometric coefficients.`,
      [kt('Anode', 'The electrode at which oxidation occurs (negative in a galvanic cell).'), kt('Cathode', 'The electrode at which reduction occurs (positive in a galvanic cell).'), kt('Salt bridge', 'A tube of an inert electrolyte in agar that connects the two half-cells and keeps them neutral.'), kt('Standard electrode potential', 'The potential of an electrode relative to the SHE when all species are at unit concentration or 1 bar, at 298 K.')],
      [fm(r`E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}`, 'Standard EMF')],
      V.daniell,
      [1],
      [V.she],
    ),
    sec(
      '2. Nernst equation; Gibbs energy and equilibrium constant',
      r`For $\ce{M^{n+} + ne- -> M}$: $E = E^\circ - \dfrac{2.303RT}{nF}\log\dfrac{1}{[\ce{M^{n+}}]}$. At 298 K, $\dfrac{2.303RT}{F} = 0.059\ \text{V}$.

For a cell, $E_\text{cell} = E^\circ_\text{cell} - \dfrac{0.059}{n}\log Q$, where $Q$ = products over reactants (pure solids omitted). For the Daniell cell $Q = [\ce{Zn^2+}]/[\ce{Cu^2+}]$. For a hydrogen electrode at 1 bar, $E = -0.059\,\text{pH}$.

**Gibbs energy:** $\Delta_\text{r}G = -nFE_\text{cell}$ and $\Delta_\text{r}G^\circ = -nFE^\circ_\text{cell}$ ($F = 96500\ \text{C mol}^{-1}$). Positive $E$ ⇒ negative $\Delta G$ ⇒ spontaneous.

**Equilibrium:** at equilibrium $E_\text{cell} = 0$ and $Q = K$, so $E^\circ_\text{cell} = \dfrac{0.059}{n}\log K$ and $\Delta_\text{r}G^\circ = -2.303RT\log K$. For the Daniell cell $\Delta_\text{r}G^\circ = -212.3\ \text{kJ mol}^{-1}$ and $K \approx 10^{37}$.`,
      [kt('Nernst equation', 'Relates the electrode or cell potential to the concentrations of the species involved.'), kt('Faraday constant', r`Charge on one mole of electrons, about $96500\ \text{C mol}^{-1}$.`)],
      [fm(r`E_\text{cell} = E^\circ_\text{cell} - \dfrac{0.059}{n}\log Q`, 'Nernst (298 K)'), fm(r`\Delta_\text{r}G^\circ = -nFE^\circ_\text{cell}`, 'Gibbs energy'), fm(r`\log K = \dfrac{nE^\circ_\text{cell}}{0.059}`, 'Equilibrium constant')],
      table([r`$E^\circ_\text{cell}$`, r`$\Delta_\text{r}G^\circ$`, r`$K$`], [['> 0', '< 0', '> 1'], ['0', '0', '1'], ['< 0', '> 0', '< 1']], 'Table relating the signs of the standard cell EMF and Gibbs energy change to the size of K'),
      [2],
    ),
    sec(
      '3. Conductance of electrolytic solutions',
      r`$R = \rho\dfrac{l}{A}$; conductance $G = 1/R$ (S); conductivity $\kappa = 1/\rho$ ($\text{S cm}^{-1}$ or $\text{S m}^{-1}$). In a conductivity cell, $\kappa = G^*/R$ where the **cell constant** $G^* = l/A$ is found with a standard KCl solution; alternating current is used.

**Molar conductivity** $\Lambda_\text{m} = \dfrac{\kappa \times 1000}{c}$ ($\text{S cm}^2\ \text{mol}^{-1}$, with κ in S cm⁻¹ and c in mol L⁻¹). On dilution **κ decreases** (fewer ions per unit volume) but **Λm increases**.

- **Strong electrolytes:** $\Lambda_\text{m} = \Lambda^\circ_\text{m} - A\sqrt{c}$; $\Lambda^\circ_\text{m}$ by extrapolation to $c = 0$.
- **Weak electrolytes:** Λm rises steeply at low c because the degree of dissociation increases; $\Lambda^\circ_\text{m}$ cannot be extrapolated.

**Kohlrausch’s law:** $\Lambda^\circ_\text{m} = \nu_+\lambda^\circ_+ + \nu_-\lambda^\circ_-$. Uses: $\Lambda^\circ_\text{m}$ of weak electrolytes from strong ones (e.g. $\Lambda^\circ(\ce{NH4OH}) = \Lambda^\circ(\ce{NH4Cl}) + \Lambda^\circ(\ce{NaOH}) - \Lambda^\circ(\ce{NaCl})$); degree of dissociation $\alpha = \Lambda_\text{m}/\Lambda^\circ_\text{m}$; and $K_\text{a} = \dfrac{c\alpha^2}{1 - \alpha}$.`,
      [kt('Conductivity', 'Conductance of a solution between electrodes of unit area placed unit distance apart.'), kt('Cell constant', 'Ratio l/A of a conductivity cell, found by calibration.'), kt('Limiting molar conductivity', 'Molar conductivity at infinite dilution, Λ°m.'), kt('Kohlrausch’s law', 'Λ°m of an electrolyte is the sum of the limiting molar conductivities of its ions, each times its number in the formula.')],
      [fm(r`\kappa = \dfrac{G^*}{R}`, 'Conductivity'), fm(r`\Lambda_\text{m} = \dfrac{\kappa \times 1000}{c}`, 'Molar conductivity'), fm(r`\alpha = \dfrac{\Lambda_\text{m}}{\Lambda^\circ_\text{m}}`, 'Degree of dissociation')],
      condPlot,
      [3],
    ),
    sec(
      '4. Electrolytic cells and electrolysis',
      r`In an **electrolytic cell**, an external source drives a non-spontaneous reaction: reduction at the **cathode** (negative), oxidation at the **anode** (positive).

**Faraday’s first law:** $m = ZIt$ (mass ∝ charge $Q = It$). **Second law:** for the same charge, masses deposited are proportional to $M/n$. One faraday ($F \approx 96500\ \text{C}$) is one mole of electrons: it deposits 1 mol Ag, ½ mol Cu, ⅓ mol Al.

**Products** depend on the electrolyte’s state, the electrodes and $E^\circ$ values (with overpotential):
- molten NaCl: Na at cathode, Cl₂ at anode;
- concentrated aqueous NaCl: H₂ at cathode (water reduced), Cl₂ at anode (oxygen has a high overpotential);
- dilute H₂SO₄ (Pt): H₂ and O₂; concentrated H₂SO₄: H₂ and peroxodisulfate ions;
- aqueous CuSO₄: Cu at cathode; with a copper anode the anode dissolves (refining, plating), with Pt the anode gives O₂.`,
      [kt('Electrolysis', 'Decomposition of an electrolyte, or other chemical change, caused by passing electric current.'), kt('Faraday', 'The charge on one mole of electrons, about 96500 C.'), kt('Overpotential', 'Extra voltage needed beyond the theoretical value for some electrode reactions to proceed at a useful rate.')],
      [fm(r`m = \dfrac{Q}{nF}\times M = \dfrac{ItM}{nF}`, 'Faraday’s laws')],
      V.electrolysis,
      [4],
    ),
    sec(
      '5. Batteries and fuel cells',
      r`**Primary batteries** (not rechargeable): **dry (Leclanché) cell** — zinc container anode, carbon rod cathode with $\ce{MnO2}$, paste of $\ce{NH4Cl}$ and $\ce{ZnCl2}$; about 1.5 V. **Mercury cell** — Zn–Hg amalgam anode, HgO + carbon cathode, KOH/ZnO electrolyte; about 1.35 V, constant over its life because no ion concentration changes.

**Secondary batteries** (rechargeable): **lead storage battery** — Pb anode, $\ce{PbO2}$ cathode, about 38% $\ce{H2SO4}$. Discharge: $\ce{Pb + PbO2 + 2H2SO4 -> 2PbSO4 + 2H2O}$; the acid’s density falls. Charging reverses it. **Nickel–cadmium** cells last longer but cost more.

**Fuel cells** convert the energy of a fuel directly into electricity with continuous feed. **H₂–O₂ cell:** anode $\ce{2H2 + 4OH- -> 4H2O + 4e-}$, cathode $\ce{O2 + 2H2O + 4e- -> 4OH-}$, overall $\ce{2H2 + O2 -> 2H2O}$; about 70% efficient, pollution-free, used in spacecraft.`,
      [kt('Primary battery', 'A cell whose reaction cannot be reversed; discarded after use.'), kt('Secondary battery', 'A cell that can be recharged by passing current in the reverse direction.'), kt('Fuel cell', 'A galvanic cell that converts the energy of a continuously supplied fuel directly into electricity.')],
      [],
      V.fuelcell,
      [5],
      [chem('Pb + PbO2 + 2H2SO4 -> 2PbSO4 + 2H2O', 'Overall discharge reaction of the lead storage battery')],
    ),
    sec(
      '6. Corrosion',
      r`**Corrosion** is the slow destruction of a metal by its surroundings; rusting of iron is an electrochemical process. At an **anodic** spot: $\ce{2Fe -> 2Fe^2+ + 4e-}$. Electrons flow through the metal to a **cathodic** spot: $\ce{O2 + 4H+ + 4e- -> 2H2O}$ ($\ce{H+}$ from $\ce{H2CO3}$ formed by dissolved $\ce{CO2}$). Overall: $\ce{2Fe + O2 + 4H+ -> 2Fe^2+ + 2H2O}$. $\ce{Fe^2+}$ is oxidised further to rust, $\ce{Fe2O3.xH2O}$. Salt water speeds corrosion by increasing conductivity.

**Prevention:** barrier coatings (paint, oil, grease, plastic); **galvanising** (zinc coat, which corrodes preferentially even when scratched); **sacrificial anodes** (magnesium or zinc blocks on ships and pipelines); anti-rust chemicals (e.g. phosphate coatings).`,
      [kt('Corrosion', 'Gradual destruction of a metal by chemical or electrochemical reaction with its surroundings.'), kt('Galvanising', 'Coating iron with zinc, which is oxidised in preference to iron.'), kt('Sacrificial protection', 'Protecting a metal by connecting it to a more reactive metal that corrodes instead.')],
      [],
      V.rust,
      [6],
      [flow('LR', [['a', 'Fe → Fe²⁺ at anodic spot'], ['b', 'e⁻ flow through iron'], ['c', 'O₂ reduced at cathodic spot'], ['d', 'Fe²⁺ oxidised further → rust']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of rusting: iron oxidised at the anode, electrons through the metal, oxygen reduced at the cathode, iron ions oxidised to rust')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Multiplying $E^\\circ$ by the number of electrons when balancing a cell equation.
- Writing $E^\\circ_\\text{cell} = E^\\circ_\\text{anode} - E^\\circ_\\text{cathode}$ (it is cathode minus anode).
- Putting reactants over products in Q, or including pure solids.
- Forgetting the factor 1000 in $\\Lambda_\\text{m} = \\kappa \\times 1000/c$, or giving the wrong unit.
- Saying conductivity increases on dilution (it is molar conductivity that increases).
- Using minutes instead of seconds in $Q = It$.
- Saying oxygen forms at the anode in brine electrolysis without mentioning overpotential.

**How marks are usually awarded**
- 1-mark items: correct option, sign, product or unit.
- Numericals (2–3 marks): formula (½–1) + substitution with units (1) + answer with unit (½–1).
- Cell questions: half-reactions (1) + overall reaction / notation (1) + EMF or prediction (1).
- 5-mark answers: often a definition or law, a labelled diagram (Daniell cell, SHE, fuel cell) and a numerical.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Galvanic vs electrolytic cell?', 'Galvanic: spontaneous reaction makes electricity. Electrolytic: electricity drives a non-spontaneous reaction.', 'concept', 1),
    fc(2, 'Which process happens at the anode?', 'Oxidation — in every kind of cell.', 'fact', 1),
    fc(3, 'Two jobs of a salt bridge?', 'Completes the circuit by letting ions move, and keeps both solutions electrically neutral.', 'concept', 1),
    fc(4, 'Write the Daniell cell in notation.', r`$\ce{Zn | Zn^2+ (1 M) || Cu^2+ (1 M) | Cu}$; $E^\circ = 1.10\ \text{V}$.`, 'example', 1),
    fc(5, 'Formula for standard cell EMF?', r`$E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}$ (right minus left).`, 'formula', 1),
    fc(6, 'What is the SHE?', r`Pt (platinum black) in 1 M $\ce{H+}$ with $\ce{H2}$ at 1 bar; $E^\circ = 0$ by definition.`, 'definition', 1),
    fc(7, 'More positive E° means…?', 'The oxidised form is a stronger oxidising agent (more easily reduced).', 'concept', 1),
    fc(8, 'Strongest reducing agent in the usual series?', r`Lithium ($E^\circ = -3.05\ \text{V}$).`, 'fact', 1),
    fc(9, 'Why does copper not give hydrogen with dilute HCl?', r`Its $E^\circ$ (+0.34 V) is above that of hydrogen, so it cannot reduce $\ce{H+}$.`, 'concept', 1),
    fc(10, 'Nernst equation for a cell at 298 K?', r`$E_\text{cell} = E^\circ_\text{cell} - \dfrac{0.059}{n}\log Q$.`, 'formula', 2),
    fc(11, 'Potential of a hydrogen electrode in terms of pH?', r`$E = -0.059\,\text{pH}$ (298 K, 1 bar).`, 'formula', 2),
    fc(12, 'Relation between ΔG° and E°cell?', r`$\Delta_\text{r}G^\circ = -nFE^\circ_\text{cell}$.`, 'formula', 2),
    fc(13, 'Relation between E°cell and K?', r`$E^\circ_\text{cell} = \dfrac{0.059}{n}\log K$ at 298 K.`, 'formula', 2),
    fc(14, 'What is E of a cell at equilibrium?', 'Zero — the battery is flat.', 'fact', 2),
    fc(15, 'Define conductivity.', r`Conductance of a solution between electrodes of $1\ \text{cm}^2$ area, $1\ \text{cm}$ apart; unit $\text{S cm}^{-1}$.`, 'definition', 3),
    fc(16, 'What is the cell constant?', r`$G^* = l/A$; found using a standard KCl solution; $\kappa = G^*/R$.`, 'definition', 3),
    fc(17, 'Formula for molar conductivity?', r`$\Lambda_\text{m} = \dfrac{\kappa \times 1000}{c}$ in $\text{S cm}^2\ \text{mol}^{-1}$.`, 'formula', 3),
    fc(18, 'Effect of dilution on κ and Λm?', 'κ decreases (fewer ions per cm³); Λm increases.', 'concept', 3),
    fc(19, 'State Kohlrausch’s law.', r`$\Lambda^\circ_\text{m} = \nu_+\lambda^\circ_+ + \nu_-\lambda^\circ_-$: each ion contributes independently at infinite dilution.`, 'formula', 3),
    fc(20, 'Degree of dissociation from conductance?', r`$\alpha = \Lambda_\text{m}/\Lambda^\circ_\text{m}$.`, 'formula', 3),
    fc(21, 'Why use AC to measure conductivity?', 'Direct current would electrolyse the solution and change its concentration at the electrodes.', 'concept', 3),
    fc(22, 'Faraday’s first law?', r`Mass deposited ∝ charge passed: $m = ZIt$.`, 'formula', 4),
    fc(23, 'Value of 1 faraday?', r`About $96500\ \text{C mol}^{-1}$ — the charge on one mole of electrons.`, 'fact', 4),
    fc(24, 'Products of electrolysis of concentrated brine (inert electrodes)?', 'Hydrogen at the cathode, chlorine at the anode (oxygen has a high overpotential); NaOH stays in solution.', 'fact', 4),
    fc(25, 'Copper sulfate with copper electrodes — what happens?', 'Copper deposits on the cathode and the copper anode dissolves (used in refining and plating).', 'example', 4),
    fc(26, 'Primary vs secondary battery?', 'Primary: cannot be recharged (dry cell, mercury cell). Secondary: rechargeable (lead storage, Ni–Cd).', 'concept', 5),
    fc(27, 'Why does a mercury cell give a constant voltage?', 'The overall reaction involves no ions whose concentration changes during use.', 'concept', 5),
    fc(28, 'Overall discharge reaction of a lead storage battery?', r`$\ce{Pb + PbO2 + 2H2SO4 -> 2PbSO4 + 2H2O}$.`, 'formula', 5),
    fc(29, 'Advantages of an H₂–O₂ fuel cell?', 'High efficiency (about 70%), continuous operation, only water as product.', 'fact', 5),
    fc(30, 'What is rust?', r`Hydrated iron(III) oxide, $\ce{Fe2O3.xH2O}$.`, 'definition', 6),
    fc(31, 'Why does galvanised iron not rust even when scratched?', 'Zinc is more reactive (more negative E°) and is oxidised in preference to iron.', 'concept', 6),
    fc(32, 'Exam tip: E° and coefficients', 'Never multiply E° by stoichiometric coefficients — it is an intensive property.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
