// ch04 The d- and f-Block Elements — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V, radiiPlot, lnPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'The d- and f-Block Elements — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Position and electronic configuration',
      r`The **d-block** occupies groups 3–12; its four series (3d, 4d, 5d, 6d) lie in periods 4–7. A **transition element** has an incompletely filled d subshell in its atom or in any of its common oxidation states; so Cu ($\ce{Cu^2+}$ is $3d^9$) is a transition element, while Zn, Cd and Hg ($d^{10}$ in atom and ion) are not.

General configuration $(n-1)d^{1\text{–}10}ns^{1\text{–}2}$. Because 3d and 4s energies are close and half-filled/filled d subshells are extra stable, **Cr is $[\text{Ar}]3d^5 4s^1$** and **Cu is $[\text{Ar}]3d^{10}4s^1$**. On ionisation, **4s electrons are removed before 3d**: $\ce{Fe^2+}$ $3d^6$, $\ce{Fe^3+}$ $3d^5$, $\ce{Mn^2+}$ $3d^5$, $\ce{Cu^2+}$ $3d^9$.

The **f-block** (lanthanoids and actinoids) is placed separately below the table; these are the **inner transition elements**.`,
      [kt('Transition element', 'An element with an incompletely filled d subshell in its atom or in one of its common ions.'), kt('Inner transition elements', 'The f-block elements: lanthanoids (4f) and actinoids (5f).')],
      [fm(r`(n-1)d^{1\text{–}10}\,ns^{1\text{–}2}`, 'General d-block configuration')],
      V.blocks,
      [1],
    ),
    sec(
      '2. General properties of transition elements',
      r`- **Physical:** hard, dense, high melting points (except Zn, Cd, Hg); unpaired d electrons strengthen metallic bonding, so melting point and enthalpy of atomisation peak mid-series.
- **Radii:** fall at first, then nearly constant across a series (poor shielding by 3d balanced by d–d repulsion); 4d and 5d radii almost equal (lanthanoid contraction).
- **Ionisation enthalpy:** rises slowly and irregularly; high second IE for Cr and Cu (stable $d^5$, $d^{10}$ of $\ce{M+}$).
- **Oxidation states:** variable, usually differing by one; maximum +7 at Mn; high states in oxides/fluorides.
- **E° values:** $E^\circ(\ce{M^2+/M})$ negative except Cu (+0.34 V): copper does not displace hydrogen from dilute acids. $\ce{Mn^3+}$ ($E^\circ$ +1.57 V) and $\ce{Co^3+}$ (+1.97 V) are strong oxidants; $\ce{Cr^2+}$ ($E^\circ(\ce{Cr^3+/Cr^2+}) = -0.41$ V) is a reductant.
- **Magnetism:** paramagnetic if unpaired electrons; spin-only $\mu = \sqrt{n(n+2)}$ BM.
- **Colour:** d–d transitions absorb visible light; $d^0$ ($\ce{Sc^3+}$, $\ce{Ti^4+}$) and $d^{10}$ ($\ce{Zn^2+}$, $\ce{Cu+}$) ions are colourless.
- **Catalysis:** variable oxidation states and surface adsorption (Fe in the Haber process, $\ce{V2O5}$ in the contact process, Ni in hydrogenation).
- **Interstitial compounds:** small atoms (H, C, N) in lattice holes, e.g. TiC, $\ce{Mn4N}$, $\ce{Fe3H}$: hard, high melting, chemically inert, metallic conductivity.
- **Alloys:** similar atomic radii allow substitution (brass, bronze, stainless steel). **Complexes:** small, highly charged ions with vacant d orbitals.`,
      [kt('Paramagnetism', 'Attraction into a magnetic field, caused by unpaired electrons.'), kt('Interstitial compound', 'A compound formed when small atoms occupy holes in a metal lattice; usually non-stoichiometric, hard and high melting.'), kt('Enthalpy of atomisation', 'Enthalpy change for converting one mole of an element into gaseous atoms.')],
      [fm(r`\mu = \sqrt{n(n+2)}\ \text{BM}`, 'Spin-only magnetic moment')],
      radiiPlot,
      [2],
      [table(['n', '0', '1', '2', '3', '4', '5'], [['μ / BM', '0', '1.73', '2.83', '3.87', '4.90', '5.92']], 'Spin-only magnetic moments for zero to five unpaired electrons')],
    ),
    sec(
      '3. Potassium dichromate and potassium permanganate',
      r`**K₂Cr₂O₇ preparation:** $\ce{4FeCr2O4 + 8Na2CO3 + 7O2 -> 8Na2CrO4 + 2Fe2O3 + 8CO2}$; $\ce{2Na2CrO4 + 2H+ -> Na2Cr2O7 + 2Na+ + H2O}$; $\ce{Na2Cr2O7 + 2KCl -> K2Cr2O7 + 2NaCl}$. Chromate (yellow, tetrahedral) and dichromate (orange, two tetrahedra sharing an O) interconvert with pH; Cr is +6 in both.

**Oxidising action (acid):** $\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}$ ($E^\circ$ +1.33 V): oxidises $\ce{Fe^2+}$ to $\ce{Fe^3+}$, $\ce{I-}$ to $\ce{I2}$, $\ce{H2S}$ to S, $\ce{Sn^2+}$ to $\ce{Sn^4+}$; orange → green.

**KMnO₄ preparation:** $\ce{2MnO2 + 4KOH + O2 -> 2K2MnO4 + 2H2O}$; manganate (green, $d^1$, paramagnetic) disproportionates in acid, $\ce{3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O}$, or is oxidised electrolytically. Permanganate is purple, tetrahedral, diamagnetic (colour from charge transfer).

**Oxidising action:** acid $\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$ ($E^\circ$ +1.52 V) — oxidises $\ce{Fe^2+}$, oxalate, iodide; it is a self-indicator. Neutral/faintly alkaline $\ce{MnO4- + 2H2O + 3e- -> MnO2 + 4OH-}$, e.g. iodide → iodate. Do not acidify with HCl (chloride is oxidised).

**Titration ratios:** $\ce{Cr2O7^2-} : \ce{Fe^2+} = 1 : 6$; $\ce{MnO4-} : \ce{Fe^2+} = 1 : 5$; $\ce{MnO4-} : \ce{C2O4^2-} = 2 : 5$.`,
      [kt('Disproportionation', 'A reaction in which the same element is both oxidised and reduced.'), kt('Self-indicator', 'A titrant whose own colour marks the end point, as permanganate does.')],
      [fm(r`\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}`, 'Dichromate in acid'), fm(r`\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}`, 'Permanganate in acid')],
      V.chromate,
      [3],
      [V.manganate],
    ),
    sec(
      '4. Lanthanoids and actinoids',
      r`**Lanthanoids** (Ce–Lu) fill 4f: $[\text{Xe}]4f^{1\text{–}14}5d^{0\text{–}1}6s^2$. Common oxidation state **+3**; $\ce{Ce^4+}$ ($4f^0$) is an oxidant, $\ce{Eu^2+}$ ($4f^7$) and $\ce{Yb^2+}$ ($4f^{14}$) are reductants. Only promethium is radioactive.

**Lanthanoid contraction:** steady decrease in atomic and ionic radii from La to Lu, due to the imperfect shielding of one 4f electron by another. **Consequences:** 4d and 5d elements of a group have almost identical radii (Zr 160 pm, Hf 159 pm) and properties, so they are hard to separate; basicity of $\ce{Ln(OH)3}$ decreases from La to Lu; lanthanoids are hard to separate from each other.

**Actinoids** (Th–Lr) fill 5f. 5f, 6d and 7s energies are close and 5f orbitals extend further than 4f, so actinoids show **more oxidation states** (up to +7 for Np, Pu), a **greater actinoid contraction**, more complex formation, and **all are radioactive**.`,
      [kt('Lanthanoid contraction', 'The steady decrease in size of lanthanoid atoms and ions with increasing atomic number, due to poor shielding by 4f electrons.')],
      [fm(r`[\text{Xe}]4f^{1\text{–}14}5d^{0\text{–}1}6s^2`, 'Lanthanoid configuration')],
      lnPlot,
      [4],
      [table(['Feature', 'Lanthanoids', 'Actinoids'], [['Orbitals', '4f', '5f'], ['Oxidation states', 'Mainly +3', '+3 to +7'], ['Radioactive', 'Only Pm', 'All'], ['Contraction', 'Smaller', 'Greater'], ['Complexes', 'Fewer', 'More']], 'Comparison of lanthanoids and actinoids')],
    ),
    sec(
      '5. Applications of d- and f-block elements',
      r`- **Iron and steels:** construction; **stainless steel** (Fe with Cr and Ni) resists corrosion.
- **Titanium:** light, strong alloys for aircraft and medical implants.
- **Catalysts:** $\ce{V2O5}$ (contact process), Fe (Haber process), Ni (hydrogenation of oils), $\ce{TiCl4}$ with $\ce{Al(CH3)3}$ (Ziegler catalyst for polythene), $\ce{PdCl2}$ (Wacker process).
- **Coinage and electrical metals:** Cu, Ag, Au; **AgBr** in photography.
- **Mischmetall:** about 95% lanthanoid metals with about 5% iron (and traces of S, C, Ca, Al) — lighter flints, alloys.
- **Lanthanoid oxides:** phosphors in screens and lamps.
- **Actinoids:** uranium and plutonium as nuclear fuels.`,
      [kt('Mischmetall', 'An alloy of lanthanoid metals with about 5% iron, used in lighter flints.')],
      [],
      table(['Element or compound', 'Use'], [['V₂O₅', 'Catalyst, contact process'], ['Fe', 'Catalyst, Haber process'], ['Ni', 'Hydrogenation catalyst'], ['Mischmetall', 'Lighter flints'], ['U, Pu', 'Nuclear fuel']], 'Table of selected uses of d- and f-block elements'),
      [5],
      [flow('LR', [['a', 'Variable oxidation states'], ['b', 'Surface adsorption'], ['c', 'Good catalysts']], [['a', 'c'], ['b', 'c']], 'Flow: variable oxidation states and surface adsorption make transition metals good catalysts')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Removing 3d electrons before 4s when writing configurations of ions.
- Calling zinc a transition element, or forgetting that copper is one (Cu²⁺ is d⁹).
- Writing that permanganate's purple colour is a d–d transition (it is charge transfer; Mn is d⁰).
- Saying chromate → dichromate is a redox change (Cr is +6 in both).
- Forgetting the 1 : 6 and 1 : 5 ratios in dichromate and permanganate titrations.
- Giving the lanthanoid contraction without its cause (poor 4f shielding) or a consequence (Zr–Hf).

**How marks are usually awarded**
- 1-mark items: correct option, configuration, oxidation state or colour.
- Reasoning (2–3 marks): the fact (1) + the configuration-based reason (1) + an example or consequence (1).
- Equations: correct species (½–1) + balanced atoms and charge (½–1).
- 5-mark answers: preparation with equations, structure, and two or three reactions; or contraction with cause and consequences.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define a transition element.', 'An element with an incompletely filled d subshell in its atom or in a common ion.', 'definition', 1),
    fc(2, 'Why is zinc not a transition element?', 'Zn and Zn²⁺ both have a completely filled 3d¹⁰ subshell.', 'concept', 1),
    fc(3, 'Configuration of Cr and Cu?', r`Cr $[\text{Ar}]3d^5 4s^1$; Cu $[\text{Ar}]3d^{10}4s^1$.`, 'fact', 1),
    fc(4, 'Which electrons leave first when a 3d atom ionises?', 'The 4s electrons.', 'concept', 1),
    fc(5, 'Configuration of Fe³⁺?', r`$[\text{Ar}]3d^5$.`, 'example', 1),
    fc(6, 'Why do melting points peak mid-series?', 'More unpaired d electrons take part in metallic bonding.', 'concept', 2),
    fc(7, 'Why are 3d radii nearly constant mid-series?', 'Increased nuclear charge is balanced by poor shielding and repulsion of added d electrons.', 'concept', 2),
    fc(8, 'Element with the highest oxidation state in the 3d series?', 'Manganese, +7 (in permanganate).', 'fact', 2),
    fc(9, 'Why is E°(Cu²⁺/Cu) positive?', 'High atomisation and ionisation enthalpies are not compensated by its hydration enthalpy.', 'concept', 2),
    fc(10, 'Why is Mn³⁺ a strong oxidising agent?', 'Gaining an electron gives the stable half-filled d⁵ Mn²⁺.', 'concept', 2),
    fc(11, 'Spin-only formula?', r`$\mu = \sqrt{n(n+2)}$ BM, n = number of unpaired electrons.`, 'formula', 2),
    fc(12, 'μ of Mn²⁺?', '5.92 BM (five unpaired electrons).', 'example', 2),
    fc(13, 'Why are transition metal ions coloured?', 'd–d transitions absorb part of visible light; we see the complementary colour.', 'concept', 2),
    fc(14, 'Why are Sc³⁺ and Zn²⁺ colourless?', 'd⁰ and d¹⁰: no d–d transition possible.', 'concept', 2),
    fc(15, 'Two reasons transition metals are good catalysts?', 'Variable oxidation states and the ability to adsorb reactants on their surfaces.', 'concept', 2),
    fc(16, 'What are interstitial compounds? Give an example.', 'Small atoms (H, C, N) trapped in metal lattice holes, e.g. TiC; hard, high melting, inert.', 'definition', 2),
    fc(17, 'Why do transition metals form alloys easily?', 'Their atomic radii are similar.', 'concept', 2),
    fc(18, 'Ore used to make potassium dichromate?', r`Chromite, $\ce{FeCr2O4}$.`, 'fact', 3),
    fc(19, 'Effect of acid on chromate solution?', r`Yellow chromate → orange dichromate: $\ce{2CrO4^2- + 2H+ <=> Cr2O7^2- + H2O}$ (no redox).`, 'formula', 3),
    fc(20, 'Dichromate half-equation in acid?', r`$\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}$.`, 'formula', 3),
    fc(21, 'Permanganate half-equation in acid?', r`$\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$.`, 'formula', 3),
    fc(22, 'Product of permanganate in neutral solution?', r`$\ce{MnO2}$ (brown), with 3 electrons gained.`, 'fact', 3),
    fc(23, 'Why is KMnO₄ not acidified with HCl?', 'Permanganate would oxidise chloride to chlorine.', 'concept', 3),
    fc(24, 'Colour and magnetism of manganate and permanganate?', 'Manganate green, paramagnetic (d¹); permanganate purple, diamagnetic (d⁰).', 'fact', 3),
    fc(25, 'Mole ratio MnO₄⁻ : Fe²⁺ in acid?', '1 : 5.', 'formula', 3),
    fc(26, 'What is the lanthanoid contraction?', 'Steady decrease in size from La to Lu due to poor shielding by 4f electrons.', 'definition', 4),
    fc(27, 'Main consequence of the lanthanoid contraction?', 'Zr and Hf (4d and 5d) have almost equal radii and very similar chemistry.', 'concept', 4),
    fc(28, 'Common oxidation state of lanthanoids?', '+3 (Ce⁴⁺, Eu²⁺, Yb²⁺ are exceptions linked to empty, half-filled or full 4f).', 'fact', 4),
    fc(29, 'Why do actinoids show more oxidation states than lanthanoids?', '5f, 6d and 7s orbitals are close in energy and 5f electrons are less deeply buried.', 'concept', 4),
    fc(30, 'What is mischmetall used for?', 'Lighter flints and alloys (lanthanoids with about 5% iron).', 'example', 5),
    fc(31, 'Exam tip: purple permanganate', 'Its colour is charge transfer, not d–d (Mn is d⁰).', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
