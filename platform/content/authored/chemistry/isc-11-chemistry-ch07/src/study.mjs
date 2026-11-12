// ISC 11 Chemistry ch07 Ionic Bonding: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { BH, bhSteps, bhSum, bhLattice, LATT } from './data.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const mn = (x) => String(x).replace('-', '−');
const nacl = BH.NaCl;
const sNa = bhSteps(nacl);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Ionic Bonding — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Valence electrons, the Kossel–Lewis approach and the octet rule',
      r`**Valence electrons** are the electrons in the outermost shell of an atom; they are the ones that take part in bonding. A **Lewis symbol** shows them as dots round the symbol of the element (singly on four sides first, then paired).

**Kossel and Lewis (1916)** explained bonding by the stability of the noble gases, whose outer shells are complete (8 electrons; 2 for helium). Other atoms reach such an arrangement by **transfer** of electrons (**electrovalent** or ionic bond, between a metal and a non-metal) or by **sharing** of electrons (**covalent** bond, between non-metals). The tendency to have eight electrons in the outermost shell is the **octet rule**; hydrogen, lithium and beryllium reach a **duplet** (two electrons), like helium.`,
      [kt('Valence electrons', 'The electrons of the outermost shell, which take part in bonding.'), kt('Octet rule', 'Atoms combine so that each has eight electrons in its outermost shell (two for H, Li, Be).'), kt('Lewis symbol', 'The symbol of an element with dots for its valence electrons.')],
      [],
      table(['Group', 'Valence electrons', 'Usual way to an octet'], [['1', '1', 'loses 1 electron'], ['2', '2', 'loses 2 electrons'], ['13', '3', 'loses 3 or shares 3'], ['15', '5', 'gains 3 or shares 3'], ['16', '6', 'gains 2 or shares 2'], ['17', '7', 'gains 1 or shares 1']], 'Table of valence electrons and the usual route to an octet for the main groups'),
      [1],
    ),
    sec(
      '2. The ionic bond and electron-dot structures',
      r`An **ionic (electrovalent) bond** is the electrostatic attraction between the positive and negative ions formed when a metal transfers electrons to a non-metal. In an electron-dot structure the cation is shown in brackets with its charge and **no dots** (its outer shell has been lost), and the anion in brackets with **eight dots** and its charge. The number of ions is chosen so that the **total charge is zero**: electrons lost = electrons gained.

NaCl: Na gives 1 e⁻ to Cl. $\ce{Li2O}$, $\ce{Na2S}$: two metal atoms give 1 e⁻ each. MgO, CaO: 2 e⁻. $\ce{MgF2}$: Mg gives 1 e⁻ to each of two F. Formula rule: with metal charge $q_c$ and non-metal charge $q_a$, the ratio of cations to anions is $q_a : q_c$ (in lowest terms).`,
      [kt('Electrovalent bond', 'The bond formed by the electrostatic attraction between ions produced by electron transfer.'), kt('Isoelectronic', 'Having the same number of electrons, e.g. Na⁺, Mg²⁺, F⁻ and O²⁻ (10 electrons).')],
      [],
      V.ionic5,
      [2],
      [V.nacl],
    ),
    sec(
      '3. Conditions for the formation of an ionic bond',
      r`Ionic bonds form readily when: **(1)** the metal has a **low ionisation enthalpy**; **(2)** the non-metal has a **large negative electron gain enthalpy**; **(3)** the **lattice enthalpy** is high (ions of high charge and small size); **(4)** the **electronegativity difference** is large, about **1.7 or more**. Making the gaseous ions from atoms usually absorbs energy (Na–Cl: ${nacl.ie[0]} + (${nacl.ege}) = +${nacl.ie[0] + nacl.ege} kJ mol⁻¹); it is the **lattice enthalpy** that makes the compound stable.`,
      [kt('Ionisation enthalpy', 'The enthalpy change to remove an electron from a gaseous atom or ion.'), kt('Electron gain enthalpy', 'The enthalpy change when a gaseous atom gains an electron (negative for most non-metals).')],
      [],
      V.enscale,
      [2],
    ),
    sec(
      '4. Cations, anions and variable electrovalency',
      r`A **cation is smaller** than its parent atom (the outer shell is lost and the same nuclear charge holds fewer electrons); an **anion is larger** (more electron repulsion, same nuclear charge).

Some elements form more than one cation (**variable electrovalency**). **Unstable core:** after loss of the ns electrons, the d-block atom is left with an incomplete d core that is not a noble gas core, so d electrons may go too: Fe ([Ar] 3d⁶ 4s²) gives Fe²⁺ (3d⁶) and Fe³⁺ (3d⁵, half-filled). **Inert pair effect:** in heavy p-block elements the ns² pair (poorly shielded, close to the nucleus) is slow to take part in bonding, so the state two below the group valence is more stable: Tl⁺, Sn²⁺ and Pb²⁺, Bi³⁺. Pb(IV) is oxidising; Pb(II) is stable.`,
      [kt('Variable electrovalency', 'The ability of an element to form more than one stable cation.'), kt('Unstable core', 'An inner core of electrons (incomplete d subshell) that is not a stable noble gas arrangement, so more electrons can be lost.'), kt('Inert pair effect', 'The reluctance of the ns² electrons of heavy p-block elements to take part in bonding.')],
      [],
      V.variable,
      [3],
    ),
    sec(
      '5. Lattice enthalpy and the Born–Haber cycle',
      r`The **lattice enthalpy** $U$ is the enthalpy change when **one mole of a solid is formed from its gaseous ions**; it is negative and larger for ions with **higher charge** and **smaller radius** (NaF ${mn(LATT.NaF)} > NaCl ${mn(LATT.NaCl)} > NaI ${mn(LATT.NaI)} kJ mol⁻¹; MgO ${mn(LATT.MgO)}).

The **Born–Haber cycle** applies **Hess's law**: $\Delta H_\text{f} = \Delta H_\text{sub} + \tfrac12 D + \text{IE} + \text{EGE} + U$ (use $\tfrac12 D$ for one mole of X atoms from X₂, and multiply IE and EGE steps for 2+ ions or 2 X atoms). For NaCl: $${sNa.sub} + ${sNa.diss} + ${sNa.ie} + (${sNa.ege}) + U = ${nacl.hf}$ gives $U = ${bhLattice(nacl)}$ kJ mol⁻¹. For $\ce{MgCl2}$ with ΔHf = −641 kJ mol⁻¹ the steps total +${bhSum(BH.MgCl2)} and $U = ${bhLattice(BH.MgCl2)}$ kJ mol⁻¹.`,
      [kt('Lattice enthalpy', 'The enthalpy change when one mole of an ionic solid is formed from its gaseous ions.'), kt('Hess’s law', 'The enthalpy change of a reaction is the same whether it takes place in one step or in several.'), kt('Born–Haber cycle', 'A Hess’s-law cycle linking the enthalpy of formation of an ionic solid to atomisation, ionisation, electron gain and lattice enthalpies.')],
      [fm(r`\Delta H_\text{f} = \Delta H_\text{sub} + \tfrac{1}{2}D + \text{IE} + \text{EGE} + U`, 'Born–Haber cycle for a 1 : 1 halide MX'), fm(r`U = \Delta H_\text{f} - (\Delta H_\text{sub} + \tfrac{1}{2}D + \text{IE} + \text{EGE})`, 'Lattice enthalpy from the cycle')],
      V.bhNacl,
      [4],
      [V.bhMgcl2],
    ),
    sec(
      '6. Characteristics of electrovalent compounds',
      r`**Physical state:** hard crystalline solids. **Melting and boiling points:** high, since strong electrostatic forces act in all directions. **Brittle:** a blow shifts a layer so like ions face each other and repel. **Solubility:** dissolve in polar solvents such as water (hydration of ions releases energy) and not in non-polar solvents. **Conductivity:** solid does not conduct (ions fixed); molten and aqueous conduct (ions free). **Reactions:** ionic reactions in solution are fast, because the ions are already present.`,
      [kt('Brittleness', 'The tendency of a crystal to split under a blow; in ionic solids it comes from repulsion between like ions after a layer slips.')],
      [],
      V.lattice,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Showing dots inside the bracket of a cation, or fewer than eight dots on an anion.
- Writing charges that do not cancel, or the wrong ratio of ions (Mg₃N₂, Al₂O₃, MgF₂).
- Using the full Cl–Cl dissociation enthalpy in the NaCl cycle instead of half.
- Forgetting the second ionisation enthalpy of magnesium or doubling the electron gain enthalpy for two Cl.
- Explaining conduction by electrons instead of ions, or saying ionic solids are brittle because the bonds are weak.

**How marks are usually awarded**
- Electron-dot structure: transfer shown (1), ions in brackets with charges and eight dots (1), formula or configuration (1).
- Born–Haber numericals: each step with its sign and the half-dissociation enthalpy (1), the sum (1), the lattice enthalpy with units (1).
- Variable electrovalency: configurations of both ions (1) and the named reason, unstable core or inert pair (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What are valence electrons?', 'The electrons in the outermost shell; they take part in bonding.', 'definition', 1),
    fc(2, 'State the octet rule.', 'Atoms combine so that each has eight electrons in its outermost shell.', 'definition', 1),
    fc(3, 'Which atoms aim for a duplet?', 'H, Li and Be: two electrons, like helium.', 'fact', 1),
    fc(4, 'Why are noble gases unreactive (Kossel–Lewis)?', 'Their outer shells are complete (8 electrons; 2 for He).', 'concept', 1),
    fc(5, 'Two ways an atom can reach an octet?', 'Transfer of electrons (ionic bond) or sharing (covalent bond).', 'concept', 1),
    fc(6, 'How many dots in the Lewis symbol of a Group 16 atom?', 'Six: two pairs and two single dots.', 'fact', 1),
    fc(7, 'What is an ionic (electrovalent) bond?', 'The electrostatic attraction between ions formed by electron transfer.', 'definition', 2),
    fc(8, 'How is a cation shown in an electron-dot structure?', 'In brackets with its charge and no outer dots.', 'concept', 2),
    fc(9, 'How is an anion shown?', 'In brackets with eight dots and its charge.', 'concept', 2),
    fc(10, 'What happens in the formation of Na₂S?', 'Each of two Na atoms gives 1 electron to S, giving 2 Na⁺ and S²⁻.', 'example', 2),
    fc(11, 'What happens in the formation of MgF₂?', 'Mg gives 1 electron to each of two F atoms: Mg²⁺ and 2 F⁻.', 'example', 2),
    fc(12, 'Formula of the compound of Al and O?', r`$\ce{Al2O3}$: 6 electrons move (2 Al lose 6, 3 O gain 6).`, 'example', 2),
    fc(13, 'Four conditions favouring an ionic bond?', 'Low IE of the metal, large negative EGE of the non-metal, high lattice enthalpy, large electronegativity difference.', 'concept', 2),
    fc(14, 'Electronegativity difference above which a bond is mainly ionic?', 'About 1.7.', 'fact', 2),
    fc(15, 'Why does NaCl form although IE + EGE is positive (+147 kJ mol⁻¹)?', 'The lattice enthalpy, −788 kJ mol⁻¹, releases far more energy.', 'concept', 2),
    fc(16, 'Is a cation larger or smaller than its atom? Why?', 'Smaller: the outer shell is lost and the same nuclear charge holds fewer electrons.', 'concept', 3),
    fc(17, 'Is an anion larger or smaller than its atom? Why?', 'Larger: more electron repulsion, same nuclear charge.', 'concept', 3),
    fc(18, 'What is variable electrovalency?', 'The ability of an element to form more than one stable cation.', 'definition', 3),
    fc(19, 'What is an unstable core?', 'An incomplete d core that is not a noble gas arrangement, so more electrons can be lost (Fe²⁺ to Fe³⁺).', 'definition', 3),
    fc(20, 'Why is Fe³⁺ stable?', 'Its 3d⁵ arrangement is half-filled.', 'concept', 3),
    fc(21, 'What is the inert pair effect?', 'The ns² electrons of heavy p-block elements resist taking part in bonding.', 'definition', 3),
    fc(22, 'Which oxidation state is more stable for Pb, Tl?', 'Pb: +2; Tl: +1.', 'fact', 3),
    fc(23, 'Electrons in Pb⁴⁺ (Z = 82)?', '78.', 'example', 3),
    fc(24, 'Define lattice enthalpy.', 'The enthalpy change when one mole of a solid is formed from its gaseous ions.', 'definition', 4),
    fc(25, 'What makes the lattice enthalpy larger?', 'Higher ionic charges and smaller ionic radii.', 'concept', 4),
    fc(26, 'On which law is the Born–Haber cycle based?', 'Hess’s law.', 'concept', 4),
    fc(27, 'Write the Born–Haber sum for a 1 : 1 halide MX.', r`$\Delta H_\text{f} = \Delta H_\text{sub} + \tfrac12 D + \text{IE} + \text{EGE} + U$.`, 'formula', 4),
    fc(28, 'Lattice enthalpy of NaCl from the cycle?', r`$-412 - (108 + 121 + 496 - 349) = -788$ kJ mol⁻¹.`, 'example', 4),
    fc(29, 'What changes for MgCl₂ in the cycle?', 'Two ionisation steps, 2 × EGE, and a whole Cl–Cl dissociation enthalpy for two Cl atoms.', 'concept', 4),
    fc(30, 'Why is an ionic crystal brittle?', 'A shifted layer brings like ions face to face, and they repel.', 'concept', 4),
    fc(31, 'Why does a molten ionic compound conduct but not the solid?', 'Ions are free to move in the melt but fixed in the solid lattice.', 'concept', 4),
    fc(32, 'Why do ionic compounds dissolve in water?', 'Hydration of the ions by polar water molecules releases enough energy to overcome the lattice enthalpy.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
