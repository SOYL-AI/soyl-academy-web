// ISC 11 Chemistry ch06 Classification of Elements and Periodicity in Properties: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { IE1, RADIUS, IONIC, EGE, EN } from './data.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const fm = (latex, label) => ({ latex, label });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Classification of Elements and Periodicity in Properties — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Need for classification; Mendeleev’s periodic law, merits and defects',
      r`Classifying the elements lets us study their properties through patterns and predict the behaviour of elements not yet studied. **Mendeleev's periodic law (1869):** the properties of the elements are a periodic function of their **atomic masses**.

**Merits:** similar elements fell in one group; **gaps** were left for undiscovered elements, whose properties he predicted (eka-aluminium, atomic mass about 68, found as **gallium**, 69.7; eka-silicon, about 72, found as **germanium**, 72.6; eka-boron, about 44, found as **scandium**, 45); some doubtful atomic masses were corrected; the **noble gases** later fitted in as a new group.

**Defects:** hydrogen has no fixed position; some elements are out of order of atomic mass (Ar and K, Co and Ni, Te and I); isotopes have no separate places; unlike elements are grouped together; lanthanoids and actinoids have no proper place.

**Modern periodic law (Moseley, 1913):** the properties of the elements are a periodic function of their **atomic numbers**. It removes these defects: the order is by atomic number, isotopes share one place, and periodicity arises from the periodic recurrence of similar outer electronic configurations.`,
      [kt('Periodic law (Mendeleev)', 'The properties of elements are a periodic function of their atomic masses.'), kt('Modern periodic law', 'The properties of elements are a periodic function of their atomic numbers.'), kt('Eka-element', 'An element whose existence Mendeleev predicted, named “eka” (one beyond) the element above it.')],
      [],
      table(['Predicted', 'Mass predicted', 'Found', 'Mass found'], [['Eka-aluminium', '68', 'Gallium', '69.7'], ['Eka-silicon', '72', 'Germanium', '72.6'], ['Eka-boron', '44', 'Scandium', '45.0']], 'Table of three elements predicted by Mendeleev and later discovered, with predicted and found atomic masses'),
      [1],
    ),
    sec(
      '2. Long form of the periodic table: periods, groups and blocks',
      r`The long form has **7 periods** and **18 groups**. The **period number** is the highest principal quantum number n of the element; period lengths are 2, 8, 8, 18, 18, 32, 32. **IUPAC** numbers the groups 1 to 18 (the old IA–VIIA, VIII and 0 are also accepted).

The **block** is the subshell that receives the last electron. **s block:** groups 1 and 2 (and He); group = number of valence electrons. **p block:** groups 13 to 18; group = 12 + number of outer p electrons (ns² np¹ to ns² np⁶). **d block:** groups 3 to 12; group = number of (n − 1)d plus ns electrons. **f block:** the 14 lanthanoids and 14 actinoids, placed below the table. Together the blocks hold 14 + 36 + 40 + 28 = 118 elements. Metals lie to the left, non-metals to the right, and the **metalloids** (B, Si, Ge, As, Sb, Te) along the dividing staircase.`,
      [kt('Period', 'A horizontal row of the table; its number is the highest shell occupied.'), kt('Group', 'A vertical column of the table (1 to 18); members have similar valence configurations.'), kt('Block', 'The set of elements whose last electron enters the same type of subshell (s, p, d or f).')],
      [],
      V.table,
      [2],
    ),
    sec(
      '3. IUPAC names for elements with Z > 100',
      r`A new element receives a **temporary systematic name** until the permanent name is approved. Each digit of the atomic number is replaced by a numerical root: **0 nil, 1 un, 2 bi, 3 tri, 4 quad, 5 pent, 6 hex, 7 sept, 8 oct, 9 enn**. The roots are written in order and the ending **-ium** is added; the three-letter symbol uses the first letter of each root (the first letter in capital).

Examples: Z = 114 is un-un-quad, **ununquadium (Uuq)**; Z = 120 is un-bi-nil, **unbinilium (Ubn)**; Z = 117 is un-un-sept, **ununseptium (Uus)**; Z = 101 is un-nil-un, **unnilunium (Unu)**.`,
      [kt('Systematic name', 'A temporary name built from numerical roots for each digit of the atomic number, ending in -ium.')],
      [],
      table(['Z', 'Roots', 'Name', 'Symbol'], [['101', 'un-nil-un', 'Unnilunium', 'Unu'], ['114', 'un-un-quad', 'Ununquadium', 'Uuq'], ['117', 'un-un-sept', 'Ununseptium', 'Uus'], ['120', 'un-bi-nil', 'Unbinilium', 'Ubn']], 'Table of four atomic numbers above one hundred with roots, temporary names and symbols'),
      [2],
    ),
    sec(
      '4. Atomic and ionic radii; nuclear charge, shielding and valence electrons',
      r`**Atomic radius** is half the distance between the nuclei of two bonded atoms of the same element: the **covalent radius** for non-metals and the **metallic radius** for metals. **Across a period** the radius **decreases** (Na ${RADIUS.Na} pm to Cl ${RADIUS.Cl} pm): the nuclear charge rises while electrons enter the same shell, so the shielding by inner electrons hardly changes and the **effective nuclear charge** grows. **Down a group** it **increases** (Li ${RADIUS.Li} pm to Cs ${RADIUS.Cs} pm): extra shells add distance and shielding.

**Valence electrons** increase by one from group to group across a period and are the **same in number** down a group, which is why members of a group are chemically similar.

A **cation is smaller** than its atom (Na ${RADIUS.Na} pm, Na⁺ ${IONIC['Na⁺']} pm); an **anion is larger** (Cl ${RADIUS.Cl} pm, Cl⁻ ${IONIC['Cl⁻']} pm). For **isoelectronic species** the radius falls as the nuclear charge rises: N³⁻ ${IONIC['N³⁻']} > O²⁻ ${IONIC['O²⁻']} > F⁻ ${IONIC['F⁻']} > Na⁺ ${IONIC['Na⁺']} > Mg²⁺ ${IONIC['Mg²⁺']} > Al³⁺ ${IONIC['Al³⁺']} pm.`,
      [kt('Shielding (screening)', 'The reduction of the pull of the nucleus on an outer electron by the inner electrons.'), kt('Effective nuclear charge', 'The net positive charge felt by a valence electron after shielding.'), kt('Isoelectronic species', 'Atoms or ions with the same number of electrons.')],
      [],
      V.radii,
      [3],
      [V.atomion, V.isoel],
    ),
    sec(
      '5. Ionisation enthalpy, electron gain enthalpy, electronegativity and metallic character',
      r`**Ionisation enthalpy:** energy to remove the outermost electron from one mole of gaseous atoms (kJ mol⁻¹, always positive). It rises with nuclear charge and falls with size and shielding. **Across a period** it rises (with dips: B < Be ${IE1.B} < ${IE1.Be}, Al < Mg ${IE1.Al} < ${IE1.Mg}, O < N ${IE1.O} < ${IE1.N}, S < P ${IE1.S} < ${IE1.P}); **down a group** it falls (Li ${IE1.Li}, Na ${IE1.Na}, K ${IE1.K}). A very large jump in successive values marks the removal from an inner shell and gives the number of valence electrons.

**Electron gain enthalpy:** enthalpy change when a gaseous atom gains an electron; negative when energy is released. Halogens are most negative; **Cl (${EGE.Cl}) is more negative than F (${EGE.F})** because of repulsion in the compact 2p shell of F; noble gases are positive.

**Electronegativity:** tendency of a bonded atom to attract the shared electron pair (Pauling scale, no unit; F = ${EN.F}). It rises across a period and falls down a group. **Metallic character** (tendency to lose electrons) falls across a period and rises down a group; non-metallic character is the reverse.`,
      [kt('Ionisation enthalpy', 'The enthalpy change to remove one mole of electrons from one mole of gaseous atoms, X(g) → X⁺(g) + e⁻.'), kt('Electron gain enthalpy', 'The enthalpy change when one mole of gaseous atoms each gain an electron, X(g) + e⁻ → X⁻(g).'), kt('Electronegativity', 'The tendency of an atom in a molecule to attract the shared pair of electrons.')],
      [fm(r`\text{X(g)} \to \text{X}^{+}\text{(g)} + e^{-}`, 'First ionisation enthalpy'), fm(r`\text{X(g)} + e^{-} \to \text{X}^{-}\text{(g)}`, 'Electron gain enthalpy')],
      V.ie,
      [4],
      [V.ege],
    ),
    sec(
      '6. Valence and oxidation states; second-period anomalies; diagonal relationship',
      r`The **valency** of a main-group element toward oxygen equals its group number (1 to 7); toward hydrogen it rises to 4 (group 14) and falls to 1 (group 17). The **oxidation state** is the charge an atom would have if all its bonds were ionic; transition elements show several because ns and (n − 1)d electrons have similar energies.

**Second-period anomalies:** Li to F differ from the other members of their groups because of small size, high electronegativity and ionisation enthalpy, and the absence of d orbitals (maximum covalence 4). Nitrogen forms NCl₃ but not NCl₅, whereas phosphorus forms both; only the second-period elements form strong pπ–pπ multiple bonds (C=C, N≡N, O=O).

**Diagonal relationship:** Li–Mg, Be–Al and B–Si resemble each other (similar electronegativity and charge-to-size ratio). Li and Mg form nitrides directly and their carbonates decompose on heating; Be and Al have amphoteric oxides and covalent chlorides; B and Si form acidic oxides and volatile hydrides.`,
      [kt('Valency', 'The combining capacity of an atom, usually the number of electrons it uses to bond.'), kt('Oxidation state', 'The charge an atom would have if all its bonds were ionic.'), kt('Diagonal relationship', 'The resemblance between an element of period 2 and the element diagonally below and to the right in period 3.')],
      [],
      V.diagonal,
      [5],
    ),
    sec(
      '7. Acidic, basic and amphoteric oxides',
      r`Across period 3 the oxides change from basic to acidic as the bond to oxygen changes from ionic to covalent: Na₂O strongly basic, MgO basic, **Al₂O₃ amphoteric**, SiO₂ weakly acidic, P₄O₁₀ acidic, SO₃ strongly acidic, Cl₂O₇ very strongly acidic. Basic oxides react with acids, acidic oxides with bases and water, and an amphoteric oxide with both. Down a group the oxides become more basic.

$\ce{Na2O + H2O -> 2NaOH}$; $\ce{Al2O3 + 6HCl -> 2AlCl3 + 3H2O}$ and $\ce{Al2O3 + 2NaOH -> 2NaAlO2 + H2O}$ (amphoteric); $\ce{P4O10 + 6H2O -> 4H3PO4}$; $\ce{SO3 + H2O -> H2SO4}$.`,
      [kt('Amphoteric oxide', 'An oxide that reacts with both acids and bases, such as Al₂O₃.'), kt('Acidic oxide', 'An oxide that reacts with bases, or with water to give an acid.'), kt('Basic oxide', 'An oxide that reacts with acids, or with water to give a base.')],
      [],
      V.oxides,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Basing the modern law on atomic mass, or Mendeleev's law on atomic number.
- Finding the group of a d-block element from the 4s electrons only.
- Forgetting nil for the digit zero in a systematic name.
- Calling an anion smaller than its atom, or ordering isoelectronic ions by the radii of the parent atoms.
- Saying that ionisation enthalpy of oxygen exceeds that of nitrogen.
- Claiming fluorine has the most negative electron gain enthalpy.
- Giving a unit for electronegativity.
- Writing unbalanced equations for oxides.

**How marks are usually awarded**
- Laws and definitions: one mark each, with the key phrase (atomic mass, atomic number, gaseous atoms, shared pair).
- Trend explanations: one mark for the trend, one for the reason (nuclear charge, shielding, size, subshell stability).
- Locating an element: one mark each for block, period and group.
- Equations: one mark for correct formulae, one for balancing.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why do we classify the elements?', 'To study many elements through patterns and to predict the properties of new ones.', 'concept', 1),
    fc(2, 'Mendeleev’s periodic law?', 'Properties of elements are a periodic function of their atomic masses.', 'definition', 1),
    fc(3, 'Two merits of Mendeleev’s table?', 'It left gaps and predicted new elements (Ga, Ge, Sc); it corrected doubtful atomic masses.', 'fact', 1),
    fc(4, 'Name the element found as eka-silicon.', 'Germanium (predicted mass 72, found 72.6).', 'fact', 1),
    fc(5, 'Three defects of Mendeleev’s table?', 'Position of hydrogen; elements out of mass order (Ar, K); no place for isotopes.', 'concept', 1),
    fc(6, 'The modern periodic law?', 'Properties of elements are a periodic function of their atomic numbers (Moseley).', 'definition', 1),
    fc(7, 'Why do isotopes occupy one place in the modern table?', 'They have the same atomic number.', 'concept', 1),
    fc(8, 'Number of periods and groups in the long form?', '7 periods and 18 groups.', 'fact', 2),
    fc(9, 'Length of the periods?', '2, 8, 8, 18, 18, 32, 32.', 'fact', 2),
    fc(10, 'Group number of a p-block element?', '12 + number of electrons in the outer p subshell.', 'formula', 2),
    fc(11, 'Group number of a d-block element?', 'Number of (n − 1)d plus ns electrons.', 'formula', 2),
    fc(12, 'Elements in the s, p, d and f blocks?', '14, 36, 40 and 28 (total 118).', 'fact', 2),
    fc(13, 'Name the metalloids.', 'B, Si, Ge, As, Sb, Te.', 'fact', 2),
    fc(14, 'IUPAC numerical roots for 0 to 9?', 'nil, un, bi, tri, quad, pent, hex, sept, oct, enn.', 'fact', 2),
    fc(15, 'Temporary name and symbol of Z = 114?', 'Ununquadium, Uuq.', 'example', 2),
    fc(16, 'Define atomic radius.', 'Half the distance between the nuclei of two bonded atoms: covalent (non-metals) or metallic (metals).', 'definition', 3),
    fc(17, 'Trend of atomic radius across a period and down a group?', 'Decreases across a period; increases down a group.', 'concept', 3),
    fc(18, 'Why does the radius fall across a period?', 'Nuclear charge rises, same shell, shielding about constant, so the effective nuclear charge grows.', 'concept', 3),
    fc(19, 'What is shielding?', 'Reduction of the nuclear pull on an outer electron by the inner electrons.', 'definition', 3),
    fc(20, 'Cation versus atom, anion versus atom: size?', 'A cation is smaller than its atom; an anion is larger.', 'concept', 3),
    fc(21, 'Order of radius for N³⁻, O²⁻, F⁻, Na⁺, Mg²⁺?', 'N³⁻ > O²⁻ > F⁻ > Na⁺ > Mg²⁺ (same electrons, rising Z).', 'example', 3),
    fc(22, 'Define first ionisation enthalpy.', 'Energy to remove the outermost electron from one mole of gaseous atoms (kJ mol⁻¹).', 'definition', 4),
    fc(23, 'Why is the ionisation enthalpy of N higher than that of O?', 'N has a stable half-filled 2p³; in O the paired p electron is removed more easily.', 'concept', 4),
    fc(24, 'Why is B lower than Be in ionisation enthalpy?', 'B’s outer electron is in a 2p orbital, higher in energy and shielded by 2s.', 'concept', 4),
    fc(25, 'Define electron gain enthalpy.', 'Enthalpy change when a gaseous atom gains an electron; negative if energy is released.', 'definition', 4),
    fc(26, 'Which halogen has the most negative electron gain enthalpy?', 'Chlorine (−349 kJ mol⁻¹), not fluorine (−328).', 'fact', 4),
    fc(27, 'Define electronegativity and its unit.', 'Tendency of a bonded atom to attract the shared pair; no unit (Pauling scale, F = 4.0).', 'definition', 4),
    fc(28, 'Trend of metallic character?', 'Decreases across a period; increases down a group.', 'concept', 4),
    fc(29, 'Valency toward oxygen of a main-group element?', 'Equal to the group number (1 to 7).', 'fact', 5),
    fc(30, 'Why is NCl₅ unknown but PCl₅ known?', 'Nitrogen has no d orbitals, so its covalence is limited to 4.', 'concept', 5),
    fc(31, 'Diagonal pairs?', 'Li–Mg, Be–Al, B–Si.', 'fact', 5),
    fc(32, 'Nature of oxides across period 3?', 'Strongly basic (Na₂O) → amphoteric (Al₂O₃) → strongly acidic (Cl₂O₇).', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
