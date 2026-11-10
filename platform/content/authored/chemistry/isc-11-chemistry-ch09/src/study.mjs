// ISC 11 Chemistry ch09 Molecular Orbital Theory, Coordinate Bonds, Resonance and Hydrogen Bonding: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { MO, config, fmtBO, magnet, LEN, ENTH, BP, resBO, clOxState } from './data.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const bo = (k) => fmtBO(MO[k].bo);
const nm = (k) => MO[k].name;
const row = (k) => [nm(k), String(MO[k].ev), bo(k), String(MO[k].unpaired), magnet(k)];

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Molecular Orbital Theory, Coordinate Bonds, Resonance and Hydrogen Bonding — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Molecular orbital theory: bonding and antibonding orbitals',
      r`In **molecular orbital (MO) theory** the atomic orbitals of the combining atoms merge into **molecular orbitals** that belong to the whole molecule. $n$ atomic orbitals always give $n$ molecular orbitals.

- **In phase** (addition of wave functions): a **bonding MO**, with high electron density between the nuclei and **lower energy** than the atomic orbitals.
- **Out of phase** (subtraction): an **antibonding MO** (marked *), with a **node** between the nuclei and **higher energy**.

Two 1s orbitals give σ1s and σ*1s; two 2s orbitals give σ2s and σ*2s; the 2p orbitals give σ2pz, σ*2pz (head-on) and two **degenerate** π2p and two degenerate π*2p (sideways overlap). Electrons fill the MOs by the **Aufbau principle**, the **Pauli exclusion principle** (at most two, with opposite spins) and **Hund's rule** (one electron in each degenerate orbital before pairing).

**Bond order** $= (N_b - N_a)/2$. A molecule is stable only if the bond order is above zero. **H₂:** bond order ${bo('H2')}; **He₂:** ${bo('He2')}, so it does not exist.`,
      [kt('Bonding MO', 'A molecular orbital formed by in-phase combination; electron density is concentrated between the nuclei and the energy is lower than that of the atomic orbitals.'), kt('Antibonding MO', 'A molecular orbital formed by out-of-phase combination, with a node between the nuclei and a higher energy.'), kt('Bond order', 'Half the difference between the number of electrons in bonding and antibonding molecular orbitals.')],
      [fm(r`\text{bond order} = \frac{N_b - N_a}{2}`, 'Bond order')],
      V.shapes,
      [1],
      [V.h2],
    ),
    sec(
      '2. Energy-level diagrams from H₂ to Ne₂: two orderings',
      r`Only the valence MOs are shown; the filled σ1s and σ*1s pair cancels. There are **two orderings** of the MOs formed from n = 2 orbitals:

- **Li₂ to N₂ (s–p mixing):** σ2s < σ*2s < **π2p < σ2pz** < π*2p < σ*2pz. The 2s and 2p energies are close, so mixing pushes σ2pz above the π2p pair.
- **O₂, F₂, Ne₂ (no mixing):** σ2s < σ*2s < **σ2pz < π2p** < π*2p < σ*2pz.

Filling the valence MOs gives the table below (electron counts are valence electrons only).`,
      [kt('s–p mixing', 'Interaction between the 2s and 2pz orbitals when their energies are close (up to nitrogen), which raises σ2pz above the π2p pair.'), kt('Degenerate orbitals', 'Orbitals of equal energy, such as the two π2p orbitals.')],
      [],
      table(['Molecule', 'Valence electrons', 'Bond order', 'Unpaired electrons', 'Magnetism'], ['H2', 'Li2', 'Be2', 'B2', 'C2', 'N2', 'O2', 'F2', 'Ne2'].map(row), 'Table of valence electrons, bond order, unpaired electrons and magnetic behaviour of homonuclear diatomic molecules from hydrogen to neon'),
      [1],
      [V.orders],
    ),
    sec(
      '3. Nitrogen and oxygen; paramagnetism and relative stability (t02)',
      r`**N₂** (10 valence electrons): ${config(MO.N2)}; bond order ${bo('N2')}, diamagnetic, N≡N bond ${LEN.N2} pm, ${ENTH.N2} kJ mol⁻¹.

**O₂** (12 valence electrons): ${config(MO.O2)}; the last two electrons go **singly into the two degenerate π*2p orbitals with parallel spins (Hund's rule)**: bond order ${bo('O2')}, **two unpaired electrons**, so O₂ is **paramagnetic** (attracted by a magnet). Lewis structure O=O cannot show this.

**Oxygen species:** removing an electron from π*2p raises bond order; adding one lowers it.
**Nitrogen species:** N₂⁺ and N₂⁻ differ because an electron is removed from a bonding orbital (σ2pz) or added to an antibonding one (π*2p).`,
      [kt('Paramagnetic', 'Attracted by a magnetic field because the species has one or more unpaired electrons.'), kt('Diamagnetic', 'Weakly repelled by a magnetic field because all electrons are paired.')],
      [],
      table(['Species', 'Valence electrons', 'Bond order', 'Unpaired electrons', 'Magnetism'], ['O2+', 'O2', 'O2-', 'O2 2-', 'N2+', 'N2', 'N2-', 'N2 2-'].map(row), 'Table of bond order, unpaired electrons and magnetism of the oxygen and nitrogen species'),
      [2],
      [V.n2, V.o2, V.series],
    ),
    sec(
      '4. Coordinate (dative) bond',
      r`A **coordinate bond** is a covalent bond in which **both electrons of the shared pair come from one atom** (the **donor**, with a lone pair); the other atom (the **acceptor**) has a vacant orbital. It is drawn as an arrow, donor → acceptor. Once formed, it is indistinguishable from other covalent bonds of the same atoms.

- **NH₄⁺:** $\ce{NH3 + H+ -> NH4+}$; the lone pair on N is donated to H⁺, which has a vacant 1s orbital. All four N–H bonds are equal.
- **H₃O⁺:** $\ce{H2O + H+ -> H3O+}$; one lone pair of oxygen is donated.
- **Oxyacids of chlorine:** Cl in HOCl, HOClO, HOClO₂, HOClO₃ forms 0, 1, 2, 3 dative bonds to oxygen, using its lone pairs; oxidation states ${[1, 2, 3, 4].map(clOxState).map((x) => '+' + x).join(', ')}.
- **HNO₃:** one coordinate bond N→O; **O₃:** O=O→O.`,
      [kt('Coordinate bond', 'A covalent bond in which the shared electron pair is supplied by one atom only.'), kt('Donor', 'The atom that supplies the lone pair in a coordinate bond.'), kt('Acceptor', 'The atom or ion with a vacant orbital that accepts the lone pair.')],
      [],
      V.dative,
      [3],
      [V.clOxy, V.hno3],
    ),
    sec(
      '5. Resonance',
      r`When one Lewis structure cannot describe a molecule, we write two or more **resonance (canonical) structures** that differ only in the positions of electrons, joined by a double-headed arrow ↔. The real molecule is a **resonance hybrid**, **more stable** than any contributing structure (the difference is the **resonance energy**). The structures do not interconvert.

- **O₃:** two structures; both O–O bonds equal (128 pm); bond order $= (2 + 1)/2 = ${resBO('O3')}$.
- **CO₂:** O=C=O with minor forms O⁺≡C–O⁻; C=O 116 pm, shorter than a normal C=O.
- **CO₃²⁻ and NO₃⁻:** three equivalent structures; bond order $= 4/3 = ${resBO('CO3').toFixed(2)}$; three equal bonds, each atom O carrying $-2/3$ in CO₃²⁻ and $-1/3$ in NO₃⁻.`,
      [kt('Resonance hybrid', 'The real structure of a molecule, an average of all its contributing resonance structures.'), kt('Resonance energy', 'The extra stability of the hybrid compared with the most stable single contributing structure.')],
      [fm(r`\text{bond order of hybrid} = \frac{\text{bonds in one structure}}{\text{equivalent positions}}`, 'Bond order of a resonance hybrid')],
      V.resA,
      [4],
      [V.resB],
    ),
    sec(
      '6. Hydrogen bonding: conditions, types and effects',
      r`A **hydrogen bond** is the electrostatic attraction between a hydrogen atom bonded to a **small, highly electronegative atom (F, O or N)** and a lone pair on another F, O or N atom: X–H···Y. It is much weaker than a covalent bond (about 10–40 kJ mol⁻¹) but much stronger than dispersion forces.

**Intermolecular** (between molecules): HF zigzag chains; water (each molecule up to four bonds); **ice**, an open hexagonal lattice with empty spaces, so it is **less dense (0.92 g cm⁻³)** than water and floats; ethanol (O–H···O chains).
**Intramolecular** (within one molecule, forming a ring): **o-nitrophenol**, so it is volatile, steam-distillable and sparingly soluble in water; **p-nitrophenol** forms intermolecular bonds, so it has a higher melting point and boiling point.

**Effects:** abnormally high boiling points of NH₃, H₂O and HF (${BP[16][0][0]} ${BP[16][0][1]} K against ${BP[16][1][0]} ${BP[16][1][1]} K); high solubility of alcohols in water; low density of ice.`,
      [kt('Hydrogen bond', 'An attraction between a hydrogen atom bonded to F, O or N and a lone pair on another F, O or N atom.'), kt('Intramolecular hydrogen bond', 'A hydrogen bond formed within a single molecule, closing a ring (o-nitrophenol).'), kt('Intermolecular hydrogen bond', 'A hydrogen bond between different molecules.')],
      [],
      V.hfWater,
      [5],
      [V.ice, V.hOrg, V.bp],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using the N₂ ordering (π2p below σ2pz) for O₂ or F₂, or the reverse.
- Forgetting that the π*2p orbitals are degenerate: the two electrons of O₂ go in singly, not paired.
- Counting the filled σ1s and σ*1s core pair in a valence bond-order count (it cancels, but do not lose track of the other electrons).
- Describing resonance as a rapid switch between structures: only the hybrid exists.
- Calling a hydrogen bond a covalent bond, or allowing it for C–H.

**Marks**
- MO configuration: ordering (1), electron count (1), bond order and magnetism (1).
- Resonance: all contributing structures (1), the hybrid and equal bond lengths (1), bond order of the hybrid (1).
- Hydrogen bonding: atoms involved and X–H···Y (1), the property affected (1), the explanation (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'How many molecular orbitals form from n atomic orbitals?', 'n molecular orbitals.', 'fact', 1),
    fc(2, 'What is a bonding molecular orbital?', 'One formed by in-phase combination, with high density between the nuclei and lower energy.', 'definition', 1),
    fc(3, 'What is an antibonding molecular orbital?', 'One formed by out-of-phase combination, with a node between the nuclei and higher energy.', 'definition', 1),
    fc(4, 'Bond order formula in MO theory?', r`$(N_b - N_a)/2$.`, 'formula', 1),
    fc(5, 'Why does He₂ not exist?', 'Its four electrons fill σ1s and σ*1s equally, so the bond order is zero.', 'concept', 1),
    fc(6, 'Three rules for filling molecular orbitals?', 'Aufbau principle, Pauli exclusion principle and Hund’s rule.', 'fact', 1),
    fc(7, 'Orbital order for Li₂ to N₂?', 'σ2s < σ*2s < π2p < σ2pz < π*2p < σ*2pz.', 'fact', 1),
    fc(8, 'Orbital order for O₂, F₂ and Ne₂?', 'σ2s < σ*2s < σ2pz < π2p < π*2p < σ*2pz.', 'fact', 1),
    fc(9, 'What causes the change in order after nitrogen?', 'Mixing between 2s and 2pz is strong up to nitrogen; from oxygen the 2s–2p gap is larger and mixing is weak.', 'concept', 1),
    fc(10, 'What is degeneracy?', 'Two or more orbitals of equal energy, such as the two π2p orbitals.', 'definition', 1),
    fc(11, 'Bond order of H₂, Li₂, B₂, C₂, N₂, O₂, F₂?', `${['H2', 'Li2', 'B2', 'C2', 'N2', 'O2', 'F2'].map(bo).join(', ')}.`, 'fact', 1),
    fc(12, 'Magnetic behaviour of B₂ and C₂?', 'B₂ is paramagnetic (two unpaired electrons in π2p); C₂ is diamagnetic.', 'fact', 1),
    fc(13, 'Valence MO configuration of N₂?', config(MO.N2) + '; bond order 3; diamagnetic.', 'fact', 1),
    fc(14, 'Valence MO configuration of O₂?', config(MO.O2) + '; bond order 2; paramagnetic.', 'fact', 2),
    fc(15, 'Why is O₂ paramagnetic?', 'Its last two electrons occupy the two degenerate π*2p orbitals singly with parallel spins.', 'concept', 2),
    fc(16, 'Bond order of O₂⁺, O₂, O₂⁻, O₂²⁻?', `${['O2+', 'O2', 'O2-', 'O2 2-'].map(bo).join(', ')}.`, 'fact', 2),
    fc(17, 'Stability order of the oxygen species?', 'O₂⁺ > O₂ > O₂⁻ > O₂²⁻ (the bond length increases in the same order).', 'fact', 2),
    fc(18, 'Bond order of N₂⁺, N₂, N₂⁻, N₂²⁻?', `${['N2+', 'N2', 'N2-', 'N2 2-'].map(bo).join(', ')}.`, 'fact', 2),
    fc(19, 'Which nitrogen species are paramagnetic?', 'N₂⁺ (one unpaired electron), N₂⁻ (one) and N₂²⁻ (two); N₂ itself is diamagnetic.', 'fact', 2),
    fc(20, 'What is a coordinate bond?', 'A covalent bond in which both shared electrons come from one atom, the donor.', 'definition', 3),
    fc(21, 'How is NH₄⁺ formed?', 'NH₃ donates its lone pair to H⁺ (vacant 1s orbital); all four N–H bonds are then equal.', 'concept', 3),
    fc(22, 'How is H₃O⁺ formed?', 'A lone pair on oxygen of water is donated to H⁺.', 'concept', 3),
    fc(23, 'Number of coordinate bonds from Cl in HOCl, HClO₂, HClO₃, HClO₄?', '0, 1, 2 and 3.', 'fact', 3),
    fc(24, 'Coordinate bonds in HNO₃ and O₃?', 'One each: N→O in HNO₃ and O=O→O in O₃.', 'fact', 3),
    fc(25, 'What is resonance?', 'Description of a molecule as a hybrid of two or more Lewis structures that differ only in the positions of electrons.', 'definition', 4),
    fc(26, 'Bond order of each O–O bond in ozone?', '1.5, because one double and one single bond are shared over two positions.', 'fact', 4),
    fc(27, 'Why are all C–O bonds in CO₃²⁻ equal?', 'The hybrid of three equivalent structures gives each C–O bond a bond order of 4/3.', 'concept', 4),
    fc(28, 'Charge on each oxygen of CO₃²⁻ and of NO₃⁻?', '−2/3 in carbonate and −1/3 in nitrate (on the three equivalent oxygen atoms).', 'fact', 4),
    fc(29, 'Condition for hydrogen bonding?', 'H bonded to a small, highly electronegative atom (F, O or N) with a lone pair on a neighbouring F, O or N.', 'concept', 5),
    fc(30, 'Why does ice float on water?', 'Hydrogen bonding makes ice an open hexagonal lattice with empty spaces, so it is less dense (0.92 g cm⁻³).', 'concept', 5),
    fc(31, 'Intermolecular against intramolecular hydrogen bonding?', 'Between molecules (HF, water, ethanol) against within one molecule forming a ring (o-nitrophenol).', 'concept', 5),
    fc(32, 'Why is o-nitrophenol more volatile than p-nitrophenol?', 'o-Nitrophenol has an intramolecular hydrogen bond; p-nitrophenol is associated by intermolecular bonds.', 'concept', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
