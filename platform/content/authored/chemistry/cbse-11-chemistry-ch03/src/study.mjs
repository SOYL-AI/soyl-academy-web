// ch03 Classification of Elements and Periodicity in Properties — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { IE1, EGE } from './svgs.mjs';
import { nomen, TRIADS, avgOuter } from './data.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Classification of Elements and Periodicity in Properties — Notes',
  language: 'en',
  sections: [
    sec(
      '1. From triads to the modern periodic law',
      r`**Döbereiner (1817):** triads in which the middle atomic mass is close to the mean of the outer two (Li, Na, K: mean of 6.9 and 39.1 is ${avgOuter(TRIADS[0]).toFixed(1)}, close to 23.0 for Na). **Newlands (1866):** law of octaves, every eighth element resembles the first; holds only up to calcium. **Mendeleev (1869):** properties are a periodic function of atomic mass; gaps were left for undiscovered elements (eka-boron, eka-aluminium, eka-silicon, later scandium, gallium, germanium); the order was sometimes reversed to keep similar elements together (Te, I). Limitations: position of hydrogen, isotopes, some pairs in the wrong mass order.

**Moseley (1913)** found that X-ray frequencies depend on nuclear charge, so the **modern periodic law** states that the properties of elements are a periodic function of their **atomic numbers**. This puts Ar before K, Co before Ni and Te before I.`,
      [kt('Triad', 'Three elements of similar properties, the middle mass being the mean of the outer two.'), kt('Octave', 'Newlands’ observation that every eighth element repeats properties.'), kt('Modern periodic law', 'Properties of elements are a periodic function of their atomic numbers.')],
      [],
      table(['Scientist', 'Basis', 'Key idea'], [['Döbereiner', 'Mass', 'Triads'], ['Newlands', 'Mass', 'Octaves'], ['Mendeleev', 'Mass', 'Gaps and predictions'], ['Moseley', 'Atomic number', 'Modern law']], 'Four stages of classification'),
      [1],
    ),
    sec(
      '2. The long form of the table and names for Z > 100',
      r`The long form has **18 groups** and **7 periods**. Period lengths come from the subshells that fill: 2 (1s), 8 (2s 2p), 8 (3s 3p), 18 (4s 3d 4p), 18 (5s 4d 5p), 32 (6s 4f 5d 6p), 32 (7s 5f 6d 7p); total 118.

**IUPAC temporary names:** roots nil (0), un (1), bi (2), tri (3), quad (4), pent (5), hex (6), sept (7), oct (8), enn (9) are joined in the order of the digits and followed by **-ium**; the symbol takes the first letter of each root. Examples: ${nomen(119).name} (${nomen(119).sym}) for Z = 119, ${nomen(120).name} (${nomen(120).sym}) for Z = 120, ${nomen(123).name} (${nomen(123).sym}) for Z = 123.`,
      [kt('Systematic name', 'IUPAC name built from numerical roots for a new element until a permanent name is approved.'), kt('Period', 'A horizontal row; its number is the outermost shell being filled.'), kt('Group', 'A vertical column of the long-form table (1 to 18).')],
      [],
      table(['Digit', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], [['Root', 'nil', 'un', 'bi', 'tri', 'quad', 'pent', 'hex', 'sept', 'oct', 'enn']], 'Numerical roots'),
      [1],
    ),
    sec(
      '3. Blocks, period and group from the configuration',
      r`The **block** is the subshell receiving the last electron: **s** (groups 1 and 2, and He), **p** (groups 13 to 18), **d** (groups 3 to 12) and **f** (lanthanoids and actinoids). **Period** = highest shell number occupied. **Group:** s-block = number of valence electrons; p-block = 12 + number of p electrons; d-block = (n − 1)d electrons + ns electrons. Examples: As (Z = 33) [Ar] 3d¹⁰ 4s² 4p³, p-block, period 4, group 15; Cd (Z = 48) [Kr] 4d¹⁰ 5s², d-block, period 5, group 12; Ba (Z = 56) [Xe] 6s², s-block, period 6, group 2.`,
      [kt('s-block', 'Elements whose last electron enters an s subshell.'), kt('d-block', 'Elements (groups 3–12) whose last electron enters a (n−1)d subshell; transition elements.'), kt('f-block', 'Lanthanoids and actinoids; last electron enters 4f or 5f.')],
      [],
      V.blocks,
      [2],
    ),
    sec(
      '4. Metals, non-metals, metalloids and other categories',
      r`About four-fifths of the elements are **metals** (lustrous, malleable, ductile, good conductors; basic or amphoteric oxides). **Non-metals** lie at the top right and form anions or share electrons. **Metalloids** (B, Si, Ge, As, Sb, Te) lie along the staircase line and show intermediate behaviour. **Representative** elements are s- and p-block elements except group 18; **transition** elements are d-block; **inner transition** elements are f-block; **noble gases** have complete outer shells (ns² np⁶, He 1s²).`,
      [kt('Metalloid', 'An element with properties between those of metals and non-metals.'), kt('Noble gas', 'A group 18 element with a complete outer shell.')],
      [],
      table(['Category', 'Examples'], [['Representative', 'Na, Mg, Al, C, N, O, Cl'], ['Transition', 'Fe, Cu, Zn'], ['Inner transition', 'Ce, U'], ['Noble gas', 'He, Ne, Ar']], 'Categories of elements'),
      [2],
    ),
    sec(
      '5. Atomic and ionic radii',
      r`Radius falls across a period (rising nuclear charge, same shell) and rises down a group (new shells). Atomic radii (pm; metallic for metals, covalent for non-metals): Li 152, Be 111, B 88, C 77, N 74, O 66, F 64; Na 186, Mg 160, Al 143, Si 117, P 110, S 104, Cl 99. Van der Waals radius > covalent radius. A cation is smaller than its atom and an anion larger (Na 186 → Na⁺ 102; Cl 99 → Cl⁻ 181). **Isoelectronic** species: the radius falls as nuclear charge rises, N³⁻ 171 > O²⁻ 140 > F⁻ 133 > Na⁺ 102 > Mg²⁺ 72 > Al³⁺ 54 pm.`,
      [kt('Covalent radius', 'Half the distance between the nuclei of two bonded atoms of the same element.'), kt('Isoelectronic', 'Having the same number of electrons.')],
      [],
      V.iso,
      [3],
    ),
    sec(
      '6. Ionisation enthalpy, electron gain enthalpy and electronegativity',
      r`**Ionisation enthalpy** rises across a period and falls down a group; it increases with nuclear charge and falls with size and screening (penetration s > p > d > f). Exceptions: Be (${IE1.Be}) > B (${IE1.B}) because 2s penetrates more than 2p; N (${IE1.N}) > O (${IE1.O}) because N has half-filled 2p³ and O has a paired electron; likewise Mg > Al and P > S. Successive values jump after the valence electrons are removed.

**Electron gain enthalpy** is most negative for halogens; Cl (${EGE.Cl}) is more negative than F (${EGE.F}) because F is so small that its 2p subshell is crowded; noble gases have positive values; the second electron gain is always positive. **Electronegativity** (Pauling) rises across a period and falls down a group; F = 4.0, O = 3.5, N = 3.0, Cl = 3.0.`,
      [kt('Ionisation enthalpy', 'Enthalpy change for removing an electron from an isolated gaseous atom.'), kt('Electron gain enthalpy', 'Enthalpy change when an isolated gaseous atom gains an electron; negative if energy is released.'), kt('Electronegativity', 'Tendency of an atom in a molecule to attract the shared pair of electrons.')],
      [fm(r`\ce{M(g) -> M+(g) + e-}`, 'First ionisation'), fm(r`\ce{X(g) + e- -> X-(g)}`, 'Electron gain')],
      V.ie,
      [3],
      [V.ege],
    ),
    sec(
      '7. Valency, chemical character, anomalous behaviour and diagonal relationships',
      r`**Valency** is read from hydride or oxide formulae: period 3 hydrides NaH, MgH₂, AlH₃, SiH₄, PH₃, H₂S, HCl show 1, 2, 3, 4, 3, 2, 1. Oxides go **basic** (Na₂O, MgO), **amphoteric** (Al₂O₃) and **acidic** (SiO₂, P₄O₁₀, SO₃, Cl₂O₇) across period 3. Amphoteric: $\ce{Al2O3 + 6HCl -> 2AlCl3 + 3H2O}$ and $\ce{Al2O3 + 2NaOH + 3H2O -> 2NaAl(OH)4}$.

**Second-period anomalies:** small size, high electronegativity and ionisation enthalpy, no d orbitals, so maximum covalence 4 (NCl₃ but PCl₅), and pπ–pπ multiple bonds. **Diagonal relationships:** Li–Mg, Be–Al, B–Si, owing to similar charge-to-size ratio and electronegativity (Be and Al both 1.5).`,
      [kt('Amphoteric oxide', 'An oxide that reacts with both acids and bases.'), kt('Diagonal relationship', 'Resemblance between an element and the one diagonally below and to its right.')],
      [],
      table(['Pair', 'Shared properties'], [['Li and Mg', 'Nitrides; carbonates decompose'], ['Be and Al', 'Amphoteric oxides; covalent chlorides'], ['B and Si', 'Acidic oxides; volatile hydrides']], 'Diagonal pairs and shared properties'),
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing “atomic mass” in the modern periodic law (it is atomic number).
- Forgetting that helium is s-block but placed in group 18.
- Saying fluorine has the most negative electron gain enthalpy (chlorine does).
- Explaining the N/O ionisation anomaly without mentioning half-filled 2p³ and electron pairing in O.
- Comparing isoelectronic ions by atomic number of the neutral atom instead of nuclear charge of the ion.
- Writing names for Z > 100 digit by digit but leaving off the ending “ium”.

**How marks are usually awarded**
- 1-mark items: a definition, a trend or a name.
- 2-mark reasoning: the fact and its cause (nuclear charge, shells, shielding, subshell structure).
- Data items: read the jump, compare values, then give the conclusion.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What was Döbereiner’s triad rule?', 'The mass of the middle element is about the mean of the other two (Li, Na, K).', 'definition', 1),
    fc(2, 'What did Newlands’ law of octaves state?', 'Every eighth element resembles the first when elements are arranged by atomic mass; it held only up to calcium.', 'definition', 1),
    fc(3, 'Mendeleev’s periodic law?', 'Properties of elements are a periodic function of their atomic masses.', 'definition', 1),
    fc(4, 'Which three elements did Mendeleev predict, and what were they later called?', 'Eka-boron, eka-aluminium and eka-silicon, found as scandium, gallium and germanium.', 'fact', 1),
    fc(5, 'Modern periodic law?', 'Properties of elements are a periodic function of their atomic numbers (Moseley).', 'definition', 1),
    fc(6, 'Name two pairs placed against the order of atomic mass by Mendeleev.', 'Te before I, and Co before Ni (also Ar before K).', 'fact', 1),
    fc(7, 'How many elements are in periods 1 to 7?', '2, 8, 8, 18, 18, 32, 32 (total 118).', 'fact', 1),
    fc(8, 'Why does the sixth period have 32 elements?', 'The subshells 6s, 4f, 5d and 6p fill: 2 + 14 + 10 + 6.', 'concept', 1),
    fc(9, 'Root for each digit 0 to 9 in IUPAC names?', 'nil, un, bi, tri, quad, pent, hex, sept, oct, enn.', 'fact', 1),
    fc(10, 'Name and symbol for Z = 119?', 'Ununennium, Uue.', 'example', 1),
    fc(12, 'How is the block of an element decided?', 'By the subshell into which the last electron enters.', 'concept', 2),
    fc(13, 'Group number rule for p-block elements?', '12 + number of p electrons in the valence shell.', 'formula', 2),
    fc(14, 'Group number rule for d-block elements?', '(n − 1)d electrons + ns electrons, giving groups 3 to 12.', 'formula', 2),
    fc(15, 'Period number from configuration?', 'The principal quantum number of the outermost occupied shell.', 'concept', 2),
    fc(16, 'Which s-block element is placed in group 18?', 'Helium, 1s².', 'fact', 2),
    fc(17, 'Which elements are metalloids?', 'B, Si, Ge, As, Sb and Te.', 'fact', 2),
    fc(18, 'What are inner transition elements?', 'The f-block: lanthanoids (4f) and actinoids (5f).', 'definition', 2),
    fc(19, 'Why does atomic radius decrease across a period?', 'Nuclear charge increases while electrons enter the same shell.', 'concept', 3),
    fc(20, 'Why is a cation smaller than its atom?', 'Electrons are lost (often a whole shell) while the nuclear charge stays the same, so the rest are pulled in.', 'concept', 3),
    fc(21, 'Which is larger, Cl or Cl⁻?', 'Cl⁻ (181 pm against 99 pm): extra electron repulsion.', 'fact', 3),
    fc(22, 'Order of radii: Na⁺, Mg²⁺, F⁻, O²⁻?', 'Mg²⁺ < Na⁺ < F⁻ < O²⁻ (isoelectronic; higher nuclear charge is smaller).', 'example', 3),
    fc(23, 'Define ionisation enthalpy.', 'Energy needed to remove an electron from an isolated gaseous atom.', 'definition', 3),
    fc(24, 'Order of penetration of orbitals of one shell?', 's > p > d > f.', 'fact', 3),
    fc(25, 'Why is Be higher than B in ionisation enthalpy?', 'The 2s electron of Be penetrates more than the 2p electron of B.', 'concept', 3),
    fc(26, 'Why is N higher than O in ionisation enthalpy?', 'N has the stable half-filled 2p³; O has a paired 2p electron that is easier to remove.', 'concept', 3),
    fc(27, 'What does a large jump in successive ionisation enthalpies show?', 'That the valence electrons are all removed and the next comes from an inner shell.', 'concept', 3),
    fc(28, 'Why is Cl more negative than F in electron gain enthalpy?', 'The very small 2p subshell of F repels the incoming electron more.', 'concept', 3),
    fc(29, 'Electronegativity trend?', 'Increases across a period, decreases down a group; F = 4.0 is highest.', 'fact', 3),
    fc(30, 'How do oxides change across period 3?', 'Basic (Na₂O, MgO), amphoteric (Al₂O₃), then acidic (SiO₂ to Cl₂O₇).', 'fact', 3),
    fc(31, 'Why is the covalence of nitrogen limited to 4?', 'There are no d orbitals in the second shell.', 'concept', 3),
    fc(32, 'Name three diagonal pairs.', 'Li–Mg, Be–Al and B–Si.', 'fact', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
