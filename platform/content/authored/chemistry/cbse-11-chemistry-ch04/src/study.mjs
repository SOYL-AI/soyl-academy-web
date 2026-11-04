// ch04 Chemical Bonding and Molecular Structure — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { SPECIES, DIATOMICS, mag, BE, BL, DIPOLE } from './data.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const row = (sp) => [sp.name, String(sp.bp), String(sp.lp), sp.shape, sp.hyb];

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Chemical Bonding and Molecular Structure — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Kössel–Lewis approach, ionic bonds and Lewis structures',
      r`Atoms combine to reach a noble-gas configuration: an **octet** (a duplet for H). A **Lewis symbol** shows valence electrons as dots. An **ionic bond** forms by electron transfer; it is favoured by a low ionisation enthalpy of the metal, a negative electron gain enthalpy of the non-metal and a high **lattice enthalpy**, which rises with higher ionic charge and smaller ionic size (NaCl about 788 kJ mol⁻¹; MgO about 3850 kJ mol⁻¹). A **covalent bond** is a shared pair.

**Lewis structure steps:** total valence electrons (adjust for charge); skeleton with the least electronegative atom central; single bonds; complete octets; add multiple bonds if electrons are short; check formal charges. **Exceptions:** incomplete octet (BeCl₂, BF₃), odd-electron (NO, NO₂), expanded octet (PCl₅, SF₆).`,
      [kt('Octet rule', 'Atoms tend to have eight electrons in the outer shell.'), kt('Lattice enthalpy', 'Energy released when gaseous ions form one mole of the crystal.'), kt('Expanded octet', 'More than eight electrons around a period 3 or later central atom.')],
      [],
      table(['Type', 'Example', 'Electrons around centre'], [['Incomplete', 'BF₃', '6'], ['Odd-electron', 'NO₂', '7'], ['Expanded', 'SF₆', '12']], 'Octet exceptions'),
      [1],
    ),
    sec(
      '2. Formal charge',
      r`**Formal charge = V − L − B/2.** In nitrate: N +1, double-bonded O 0, single-bonded O −1 (two), total −1. In ozone (O=O⁺–O⁻): central O +1, terminal O 0 and −1. The preferred structure has the smallest formal charges and puts any negative charge on the more electronegative atom.`,
      [kt('Formal charge', 'Valence electrons of the free atom minus non-bonding electrons minus half the bonding electrons.')],
      [fm(r`\text{FC} = V - L - \dfrac{B}{2}`, 'Formal charge')],
      table(['Atom', 'V', 'L', 'B/2', 'FC'], [['N in NO₃⁻', '5', '0', '4', '+1'], ['Central O in O₃', '6', '2', '3', '+1']], 'Formal charge examples'),
      [1],
    ),
    sec(
      '3. Bond parameters, resonance and polarity',
      r`**Bond length** (nuclear distance), **bond angle**, **bond enthalpy** (energy to break one mole of bonds in the gas phase) and **bond order**. For the same atoms: higher order, shorter and stronger (C–C ${BL['C–C']} pm and ${BE['C–C']} kJ mol⁻¹; C=C ${BL['C=C']} and ${BE['C=C']}; C≡C ${BL['C≡C']} and ${BE['C≡C']}). **Resonance:** the real structure is a hybrid; O₃ bond order 1.5, CO₃²⁻ and NO₃⁻ 1.33.

**Dipole moment** μ = q × d (debye; 1 D = 3.336 × 10⁻³⁰ C m), a vector. HF ${DIPOLE.HF} D, HCl ${DIPOLE.HCl}, HBr ${DIPOLE.HBr}, HI ${DIPOLE.HI}. CO₂, BF₃, CH₄ and CCl₄ are non-polar by symmetry; H₂O ${DIPOLE.H2O} D; NH₃ ${DIPOLE.NH3} D, much more than NF₃ ${DIPOLE.NF3} D because in NF₃ the lone-pair dipole opposes the N–F dipoles.`,
      [kt('Bond order', 'Number of shared electron pairs between two atoms.'), kt('Resonance hybrid', 'The real structure, a blend of the contributing Lewis structures.'), kt('Dipole moment', 'Product of charge and distance of separation; a vector quantity.')],
      [fm(r`\mu = q \times d`, 'Dipole moment')],
      table(['Molecule', 'μ / D'], [['H₂O', String(DIPOLE.H2O)], ['NH₃', String(DIPOLE.NH3)], ['NF₃', String(DIPOLE.NF3)], ['CO₂', '0'], ['BF₃', '0']], 'Dipole moments'),
      [2],
    ),
    sec(
      '4. VSEPR theory',
      r`Electron-pair regions repel: lone pair–lone pair > lone pair–bond pair > bond pair–bond pair; a multiple bond is one region. Lone pairs lower bond angles (CH₄ 109.5°, NH₃ 107°, H₂O 104.5°). In a trigonal bipyramid lone pairs go equatorial; in an octahedron the second lone pair goes trans to the first.`,
      [kt('VSEPR', 'Valence shell electron pair repulsion theory of molecular shape.'), kt('Steric number', 'Number of bonded atoms plus lone pairs on the central atom.')],
      [],
      V.shapes5,
      [3],
      [table(['Species', 'Bond pairs', 'Lone pairs', 'Shape', 'Hybridisation'], [SPECIES.SF4, SPECIES.ClF3, SPECIES.XeF2, SPECIES.BrF5, SPECIES.XeF4, SPECIES.H2O, SPECIES.NH3].map(row), 'Shapes from electron counts'), V.lpB],
    ),
    sec(
      '5. Valence bond theory and hybridisation',
      r`A bond forms by overlap of half-filled orbitals. **σ** bonds: head-on overlap along the axis; **π** bonds: sideways overlap of parallel p orbitals. A double bond = 1σ + 1π; a triple bond = 1σ + 2π. **Hybridisation** (number of hybrid orbitals = steric number): sp linear (BeCl₂, C₂H₂), sp² trigonal planar (BF₃, C₂H₄), sp³ tetrahedral (CH₄, NH₃, H₂O), sp³d trigonal bipyramidal (PCl₅), sp³d² octahedral (SF₆). Ethene has 5σ + 1π; ethyne 3σ + 2π.`,
      [kt('σ bond', 'Bond formed by head-on overlap of orbitals along the bond axis.'), kt('π bond', 'Bond formed by sideways overlap of parallel p orbitals.'), kt('Hybridisation', 'Mixing of atomic orbitals on one atom to form equivalent hybrid orbitals.')],
      [],
      V.overlap,
      [4],
    ),
    sec(
      '6. Molecular orbital theory',
      r`Atomic orbitals combine to give bonding and antibonding molecular orbitals. **Bond order = (Nb − Na)/2.** For Li₂ to N₂ the order is σ2s, σ*2s, π2p, σ2p, π*2p, σ*2p (s–p mixing); for O₂ and F₂, σ2p lies below π2p. N₂ has bond order 3 and is diamagnetic; O₂ has bond order 2 and two unpaired electrons (paramagnetic). O₂⁺ 2.5, O₂⁻ 1.5, O₂²⁻ 1.`,
      [kt('Bonding MO', 'Lower-energy orbital from constructive combination.'), kt('Antibonding MO', 'Higher-energy orbital from destructive combination, marked with *.'), kt('Paramagnetic', 'Having unpaired electrons; attracted by a magnetic field.')],
      [fm(r`\text{bond order} = \dfrac{N_b - N_a}{2}`, 'Bond order')],
      V.moO2,
      [5],
      [V.moN2, table(['Molecule', 'Bond order', 'Unpaired', 'Behaviour'], DIATOMICS.map(([n, m]) => [n, String(m.bo), String(m.unpaired), mag(m)]), 'Bond order and magnetism, H₂ to Ne₂')],
    ),
    sec(
      '7. Hydrogen bonding',
      r`H bonded to F, O or N attracts a lone pair on another F, O or N. **Intermolecular** H bonding (H₂O, HF, NH₃, alcohols) raises boiling points (H₂O 373 K, H₂S 213 K) and gives ice an open structure, so ice is less dense than water. **Intramolecular** H bonding (o-nitrophenol) keeps molecules separate, so the compound is more volatile (steam-volatile) than the para isomer.`,
      [kt('Hydrogen bond', 'Attraction between H bonded to F, O or N and a lone pair on another F, O or N.')],
      [],
      table(['Hydride', 'bp / K'], [['H₂O', '373'], ['H₂S', '213'], ['HF', '293'], ['HCl', '188']], 'Boiling points'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Forgetting the lone pairs when counting steric number (XeF₄ is sp³d², not sp³).
- Giving NH₃ the shape “tetrahedral”; the arrangement is tetrahedral but the shape is trigonal pyramidal.
- Using σ2p below π2p for N₂ (mixing puts π2p lower) or the reverse for O₂.
- Saying CO₂ is non-polar because the C=O bonds are non-polar (the bonds are polar; the dipoles cancel).
- Writing the bond order of carbonate as 2 or 1 instead of 4/3.

**How marks are usually awarded**
- 1-mark items: a shape, a hybridisation, a bond order.
- 2–3 marks: count of pairs, then shape and reason.
- 5 marks: MO configuration, bond order, magnetic behaviour and a comparison.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'State the octet rule.', 'Atoms tend to have eight electrons in the valence shell (two for hydrogen).', 'definition', 1),
    fc(2, 'What is lattice enthalpy?', 'Energy released when gaseous ions form one mole of an ionic crystal.', 'definition', 1),
    fc(3, 'Two factors raising lattice enthalpy?', 'Higher ionic charges and smaller ionic radii.', 'concept', 1),
    fc(4, 'Formula for formal charge?', 'V − L − B/2.', 'formula', 1),
    fc(5, 'Formal charges in NO₃⁻?', 'N +1; double-bonded O 0; each single-bonded O −1; total −1.', 'example', 1),
    fc(6, 'Name three types of octet exception.', 'Incomplete octet (BF₃), odd-electron (NO), expanded octet (SF₆).', 'fact', 1),
    fc(7, 'Why can PCl₅ exist but not NCl₅?', 'P has vacant 3d orbitals for an expanded octet; N has none in its second shell.', 'concept', 1),
    fc(8, 'Define bond enthalpy.', 'Energy required to break one mole of a given bond in the gas phase.', 'definition', 2),
    fc(9, 'Effect of bond order on length and strength?', 'Higher bond order: shorter and stronger bond.', 'concept', 2),
    fc(10, 'What is resonance?', 'Representing a molecule by several Lewis structures that differ in electron positions; the real structure is a hybrid.', 'definition', 2),
    fc(11, 'Bond order of C–O in CO₃²⁻?', '4/3 (about 1.33).', 'example', 2),
    fc(12, 'Bond order of O–O in ozone?', '1.5.', 'example', 2),
    fc(13, 'Dipole moment formula and unit?', 'μ = q × d; debye, 1 D = 3.336 × 10⁻³⁰ C m.', 'formula', 2),
    fc(14, 'Why is CO₂ non-polar?', 'Two equal C=O dipoles act in opposite directions and cancel.', 'concept', 2),
    fc(15, 'Why is μ(NH₃) greater than μ(NF₃)?', 'In NH₃ the lone-pair dipole adds to the N–H dipoles; in NF₃ it opposes the N–F dipoles.', 'concept', 2),
    fc(16, 'Order of electron-pair repulsions?', 'lp–lp > lp–bp > bp–bp.', 'fact', 3),
    fc(17, 'Shape and angle of H₂O?', 'Bent; about 104.5°.', 'fact', 3),
    fc(18, 'Shape of SF₄?', 'See-saw (sp³d; one equatorial lone pair).', 'example', 3),
    fc(19, 'Shape of ClF₃?', 'T-shaped (two equatorial lone pairs).', 'example', 3),
    fc(20, 'Shape of XeF₂?', 'Linear (three equatorial lone pairs).', 'example', 3),
    fc(21, 'Shape of XeF₄?', 'Square planar (sp³d²; lone pairs trans).', 'example', 3),
    fc(22, 'Shape of BrF₅?', 'Square pyramidal (sp³d²; one lone pair).', 'example', 3),
    fc(23, 'Difference between σ and π bonds?', 'σ: head-on overlap along the axis; π: sideways overlap of parallel p orbitals.', 'concept', 4),
    fc(24, 'σ and π bonds in a triple bond?', 'One σ and two π.', 'fact', 4),
    fc(25, 'Hybridisation of C in C₂H₄ and C₂H₂?', 'sp² in ethene; sp in ethyne.', 'fact', 4),
    fc(26, 'Hybridisation of PCl₅ and SF₆?', 'sp³d and sp³d².', 'fact', 4),
    fc(27, 'Bond order formula in MO theory?', '(Nb − Na)/2.', 'formula', 5),
    fc(28, 'Why is O₂ paramagnetic?', 'Its two π*2p orbitals each hold one unpaired electron.', 'concept', 5),
    fc(29, 'Which molecules have bond order zero from H₂ to Ne₂?', 'He₂, Be₂ and Ne₂.', 'fact', 5),
    fc(30, 'Intermolecular versus intramolecular hydrogen bond?', 'Between molecules (H₂O, HF) raises boiling point; within one molecule (o-nitrophenol) keeps molecules apart, so the compound is more volatile.', 'concept', 5),
    fc(31, 'Exam tip: shape questions?', 'Count bond pairs and lone pairs, name the arrangement, then the shape from atoms only.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
