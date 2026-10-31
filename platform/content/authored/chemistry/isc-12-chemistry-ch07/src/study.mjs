// ISC 12 Chemistry ch07 Transition (d-Block) Elements — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V, radiiPlot, iePlot } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Transition (d-Block) Elements — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Position, occurrence and electronic configuration',
      r`The d-block lies in **groups 3–12**, periods 4–7: 3d (Sc–Zn), 4d (Y–Cd), 5d (La, Hf–Hg), 6d (Ac, Rf–Cn). A **transition element** has an incompletely filled d subshell in its atom or in a common ion; Zn, Cd and Hg (d¹⁰ throughout) are not typical transition elements. Most 3d metals occur as oxide, sulfide or carbonate ores (haematite Fe₂O₃, chromite FeCr₂O₄, pyrolusite MnO₂, ilmenite FeTiO₃, copper pyrites CuFeS₂, zinc blende ZnS).

General configuration $(n-1)d^{1\text{–}10}ns^{1\text{–}2}$; **Cr 3d⁵4s¹, Cu 3d¹⁰4s¹** (extra stability of d⁵ and d¹⁰). Heavier series show more irregularities: Pd 4d¹⁰5s⁰, W 5d⁴6s², Pt 5d⁹6s¹. **Ions lose ns electrons first** (Fe²⁺ 3d⁶, Fe³⁺ 3d⁵).`,
      [kt('Transition element', 'An element whose atom or one of whose common ions has an incompletely filled d subshell.'), kt('d-block', 'The block of elements in which the last electron enters an (n−1)d subshell.')],
      [],
      V.blocks,
      [1],
    ),
    sec(
      '2. Metallic character, radii and ionisation enthalpy',
      r`All are metals; most are hard, dense and high-melting because **unpaired d electrons add to metallic bonding**; melting points and enthalpies of atomisation peak mid-series; Zn, Cd and Hg are soft and low-melting.

**Radii:** fall at the start of a series, then stay nearly constant (extra nuclear charge balanced by shielding and d–d repulsion). M²⁺ radii decrease gradually. 4d > 3d, but **4d ≈ 5d** (Zr 160, Hf 159 pm) — the **lanthanoid contraction**.

**Ionisation enthalpy:** rises slowly and irregularly. High where d⁵ or d¹⁰ is broken: ΔiH₂ of Cr and Cu, ΔiH₃ of Mn and Zn. ΔiH₁ of Zn is high (3d¹⁰4s²).`,
      [kt('Lanthanoid contraction', 'The steady decrease in size across the lanthanoids, which makes 5d elements almost the same size as the 4d elements above them.'), kt('Enthalpy of atomisation', 'The enthalpy needed to convert one mole of a metal into gaseous atoms; a measure of metallic bonding.')],
      [],
      radiiPlot,
      [2],
      [iePlot],
    ),
    sec(
      '3. Oxidation states and variable valency',
      r`(n−1)d and ns energies are close, so several oxidation states occur, often differing by one. Maximum rises to **+7 at Mn** (sum of 3d and 4s electrons) and then falls as d electrons pair. Highest states appear in oxides, fluorides and oxoanions (Mn₂O₇, VF₅, CrO₄²⁻); zero state in carbonyls (Ni(CO)₄). Lower oxides are basic (MnO), higher ones acidic (Mn₂O₇).

Stability: d⁰, d⁵ and d¹⁰ favoured — Sc³⁺ (d⁰) only; Fe³⁺ (d⁵) more stable than Fe²⁺; Mn²⁺ (d⁵) more stable than Mn³⁺, so Mn³⁺ is oxidising; Cr²⁺ is reducing (to d³ Cr³⁺). In water Cu²⁺ is more stable than Cu⁺ because of the large hydration enthalpy of Cu²⁺.`,
      [kt('Variable valency', 'The ability of an element to show more than one oxidation state in its compounds.')],
      [],
      table(['Ion', 'Configuration', 'Behaviour'], [['Sc³⁺', 'd⁰', 'Only common state'], ['Fe²⁺', 'd⁶', 'Oxidised in air to d⁵ Fe³⁺'], ['Mn³⁺', 'd⁴', 'Oxidising, goes to d⁵ Mn²⁺'], ['Cr²⁺', 'd⁴', 'Reducing, goes to d³ Cr³⁺']], 'Table of ions and their redox behaviour'),
      [3],
    ),
    sec(
      '4. Colour and magnetic properties',
      r`**Colour:** ligands split the d orbitals; a d electron absorbs visible light and is promoted (**d–d transition**); the ion shows the **complementary colour**. d⁰ (Sc³⁺, Ti⁴⁺) and d¹⁰ (Zn²⁺, Cu⁺) ions are colourless. Anhydrous CuSO₄ is white; the hydrate is blue.

**Magnetism:** unpaired electrons → **paramagnetic**; all paired → **diamagnetic**; Fe, Co, Ni are **ferromagnetic**. Spin-only moment $\mu = \sqrt{n(n+2)}$ BM. Fill five d orbitals singly before pairing.`,
      [kt('d–d transition', 'Promotion of a d electron from a lower to a higher set of split d orbitals by absorption of visible light.'), kt('Paramagnetism', 'Attraction into a magnetic field, caused by unpaired electrons.'), kt('Diamagnetism', 'Weak repulsion by a magnetic field, shown when all electrons are paired.')],
      [fm(r`\mu = \sqrt{n(n+2)}\ \text{BM}`, 'Spin-only magnetic moment')],
      table(['n', 'μ / BM'], [['1', '1.73'], ['2', '2.83'], ['3', '3.87'], ['4', '4.90'], ['5', '5.92']], 'Table of spin-only moments'),
      [4],
    ),
    sec(
      '5. Catalysis, complexes, interstitial compounds and alloys',
      r`**Catalysts** because of (i) variable oxidation states (unstable intermediates, e.g. Fe³⁺/Fe²⁺ in the iodide–peroxodisulfate reaction) and (ii) surfaces that adsorb reactants. Examples: Fe (Haber), V₂O₅ (contact), Ni (hydrogenation of oils), Pt/Rh (Ostwald).

**Complexes:** small, highly charged ions with vacant d orbitals of suitable energy accept lone pairs: [Cu(NH₃)₄]²⁺, [Fe(CN)₆]⁴⁻.

**Interstitial compounds:** H, B, C or N in lattice holes (TiC, Mn₄N, Fe₃H); hard, high-melting, metallic conductors, inert, often non-stoichiometric.

**Alloys:** similar atomic radii allow substitution: stainless steel (Fe, Cr, Ni), brass (Cu, Zn), bronze (Cu, Sn), nichrome (Ni, Cr).`,
      [kt('Interstitial compound', 'A compound formed when small atoms occupy holes in a metal lattice.'), kt('Alloy', 'A homogeneous mixture of a metal with other metals or non-metals.')],
      [],
      table(['Property', 'Cause'], [['Catalysis', 'Variable states; adsorption'], ['Complex formation', 'Small, charged ions; vacant d orbitals'], ['Interstitial compounds', 'Holes in lattice'], ['Alloys', 'Similar radii']], 'Table of properties and causes'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Removing 3d electrons before 4s when writing configurations of ions.
- Writing Cr as 3d⁴4s² or Cu as 3d⁹4s².
- Forgetting the square root in the spin-only formula, or pairing electrons before all five d orbitals are singly filled.
- Calling Zn²⁺ or Sc³⁺ coloured.

**How marks are usually awarded**
- Reason questions (2 marks): the configuration involved and the stability argument (d⁰, d⁵ or d¹⁰).
- Magnetic moment (2–3 marks): configuration, number of unpaired electrons, substitution in √(n(n+2)).
- Catalysis (2 marks): both reasons with an example.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Transition element?', 'Incomplete d subshell in the atom or a common ion.', 'definition', 1),
    fc(2, 'Groups of the d-block?', 'Groups 3 to 12.', 'fact', 1),
    fc(3, 'Configuration of Cr?', '[Ar]3d⁵4s¹.', 'fact', 1),
    fc(4, 'Configuration of Cu?', '[Ar]3d¹⁰4s¹.', 'fact', 1),
    fc(5, 'Which electrons leave first when a 3d atom ionises?', 'The 4s electrons.', 'concept', 1),
    fc(6, 'Why is Zn not a typical transition element?', 'd¹⁰ in both the atom and Zn²⁺.', 'concept', 1),
    fc(7, 'Configuration of Pd?', '[Kr]4d¹⁰ (no 5s electron).', 'fact', 1),
    fc(8, 'Ore of chromium?', 'Chromite, FeCr₂O₄.', 'fact', 1),
    fc(9, 'Ore of manganese?', 'Pyrolusite, MnO₂.', 'fact', 1),
    fc(10, 'Why are transition metals hard and high-melting?', 'Unpaired d electrons add to metallic bonding.', 'concept', 2),
    fc(11, 'Why do radii level off across the 3d series?', 'Extra nuclear charge balanced by shielding and repulsion of 3d electrons.', 'concept', 2),
    fc(12, 'Why are Zr and Hf the same size?', 'Lanthanoid contraction.', 'concept', 2),
    fc(13, 'Why is ΔiH₂ of Cu very high?', 'Cu⁺ is 3d¹⁰; removal breaks a filled subshell.', 'concept', 2),
    fc(14, 'Why is ΔiH₃ of Mn high?', 'Mn²⁺ is 3d⁵; removal breaks a half-filled subshell.', 'concept', 2),
    fc(15, 'Why is mercury a liquid?', 'Filled 5d¹⁰6s²: weak metallic bonding.', 'concept', 2),
    fc(16, 'Highest oxidation state in the 3d series?', '+7, manganese (MnO₄⁻).', 'fact', 3),
    fc(17, 'Why variable oxidation states?', '(n−1)d and ns electrons are close in energy.', 'concept', 3),
    fc(18, 'Why is Fe³⁺ more stable than Fe²⁺?', 'Fe³⁺ is d⁵ (half-filled).', 'concept', 3),
    fc(19, 'Why is Mn³⁺ oxidising?', 'Gains an electron to become d⁵ Mn²⁺.', 'concept', 3),
    fc(20, 'Oxidation state of Ni in Ni(CO)₄?', 'Zero.', 'fact', 3),
    fc(21, 'Nature of MnO and Mn₂O₇?', 'MnO basic; Mn₂O₇ acidic.', 'fact', 3),
    fc(22, 'Spin-only formula?', 'μ = √(n(n+2)) BM.', 'formula', 4),
    fc(23, 'μ for five unpaired electrons?', '5.92 BM (Mn²⁺, Fe³⁺).', 'fact', 4),
    fc(24, 'Origin of colour?', 'd–d transition; complementary colour seen.', 'concept', 4),
    fc(25, 'Colourless 3d ions?', 'd⁰ and d¹⁰: Sc³⁺, Ti⁴⁺, Cu⁺, Zn²⁺.', 'fact', 4),
    fc(26, 'Ferromagnetic 3d metals?', 'Fe, Co, Ni.', 'fact', 4),
    fc(27, 'Two reasons for catalytic activity?', 'Variable oxidation states; adsorption on surfaces.', 'concept', 5),
    fc(28, 'Catalyst in the contact process?', 'V₂O₅.', 'fact', 5),
    fc(29, 'Properties of interstitial compounds?', 'Hard, high-melting, conducting, inert.', 'concept', 5),
    fc(30, 'Why do transition metals form alloys?', 'Similar atomic radii.', 'concept', 5),
    fc(31, 'Exam tip: magnetic moments', 'Fill five d orbitals singly before pairing; remember the square root.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
