// ISC 11 Chemistry ch08 Covalent Bonding, VSEPR and Hybridisation: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { BOND, HX, muIonic, pctIonic } from './data.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const f1 = (x) => x.toFixed(1);
const f2 = (x) => x.toFixed(2);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Covalent Bonding, VSEPR and Hybridisation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The covalent bond, Lewis structures, sigma and pi bonds',
      r`A **covalent bond** is formed by the **sharing of electron pairs** between two atoms so that each reaches a noble gas arrangement (octet; duplet for H). It forms between atoms that each need electrons and have similar, high electronegativity. One shared pair gives a **single** bond, two a **double** bond and three a **triple** bond.

**Lewis structures:** $\ce{CH4}$ (4 shared pairs), $\ce{NH3}$ (3 shared pairs, 1 lone pair on N), $\ce{H2O}$ (2 shared pairs, 2 lone pairs on O), $\ce{CO2}$ (O=C=O, 4 shared pairs, 2 lone pairs on each O), ethane (7 shared pairs), ethene (6; C=C has 2) and ethyne (5; C≡C has 3).

A **sigma (σ) bond** is formed by **head-on** overlap along the bond axis; a **pi (π) bond** by **sideways** overlap of parallel p orbitals, and is weaker. Single = 1 σ; double = 1 σ + 1 π; triple = 1 σ + 2 π. So H₂ has 1 σ; O₂ has 1 σ + 1 π; N₂ has 1 σ + 2 π.`,
      [kt('Covalent bond', 'A bond formed by the sharing of one or more electron pairs between two atoms.'), kt('Sigma bond', 'A bond formed by head-on overlap of orbitals along the line joining the nuclei.'), kt('Pi bond', 'A bond formed by sideways overlap of parallel p orbitals, above and below the bond axis.'), kt('Lone pair', 'A pair of valence electrons on one atom that is not used in bonding.')],
      [],
      V.lewisA,
      [1],
      [V.lewisB, V.sigmapi],
    ),
    sec(
      '2. Bond parameters, polarity and dipole moment; covalent against ionic compounds',
      r`**Bond length** is the distance between the nuclei; **bond enthalpy** is the energy to break one mole of the bond (gas phase); **bond order** is the number of shared pairs; **bond angle** is the angle between two bonds. Higher bond order → shorter, stronger bond: C–C ${BOND['C–C'].len} pm, ${BOND['C–C'].enth} kJ mol⁻¹; C=C ${BOND['C=C'].len} pm, ${BOND['C=C'].enth}; C≡C ${BOND['C≡C'].len} pm, ${BOND['C≡C'].enth}.

A bond between atoms of different electronegativity is **polar**. **Dipole moment** $\mu = q \times d$ (debye; 1 D = 3.336 × 10⁻³⁰ C m); it is a **vector**: CO₂ (linear) and BF₃ (planar) have μ = 0 although their bonds are polar; H₂O (bent) has μ ≈ 1.85 D. Percentage ionic character $= \mu_\text{observed}/\mu_\text{ionic} \times 100$, with $\mu_\text{ionic} = e \times d$: HCl ${f1(pctIonic(HX.HCl.mu, HX.HCl.d))} %, HF ${f1(pctIonic(HX.HF.mu, HX.HF.d))} %.

**Covalent compounds:** molecules, weak forces, low melting and boiling points, non-conductors, soluble in non-polar solvents. **Ionic compounds:** lattices of ions, high melting points, conduct when molten or dissolved, soluble in water.`,
      [kt('Bond enthalpy', 'The energy required to break one mole of a bond in the gaseous state.'), kt('Dipole moment', 'The product of the charge and the distance between the charges, μ = q × d, measured in debye.'), kt('Polar covalent bond', 'A covalent bond in which the shared pair is displaced towards the more electronegative atom.')],
      [fm(r`\mu = q \times d`, 'Dipole moment'), fm(r`\text{ionic character} = \frac{\mu_\text{observed}}{e \times d} \times 100\ \%`, 'Percentage ionic character'), fm(r`\mu = 2m\cos\frac{\theta}{2}`, 'Resultant of two equal bond moments m at bond angle θ')],
      table(['Molecule', 'μ (D)', 'd (pm)', 'e × d (D)', 'Ionic character'], [['HF', String(HX.HF.mu), String(HX.HF.d), f2(muIonic(HX.HF.d)), `${f1(pctIonic(HX.HF.mu, HX.HF.d))} %`], ['HCl', String(HX.HCl.mu), String(HX.HCl.d), f2(muIonic(HX.HCl.d)), `${f1(pctIonic(HX.HCl.mu, HX.HCl.d))} %`], ['HBr', String(HX.HBr.mu), String(HX.HBr.d), f2(muIonic(HX.HBr.d)), `${f1(pctIonic(HX.HBr.mu, HX.HBr.d))} %`]], 'Table of dipole moment, bond length and percentage ionic character for HF, HCl and HBr'),
      [2],
      [V.bondcurve, V.dipole],
    ),
    sec(
      '3. Variable covalency, formal charge and deviations from the octet rule',
      r`**Covalency** is the number of covalent bonds an atom forms. Atoms of the third period and below promote an electron to a vacant **d orbital** to increase the number of unpaired electrons: **P: 3, 5** (3s² 3p³ → 3s¹ 3p³ 3d¹); **S: 2, 4, 6**; **Cl: 1, 3, 5, 7**. Second-period atoms have no d orbitals (N forms NCl₃, not NCl₅).

**Formal charge** = V − L − B/2. Examples: N in NH₄⁺ = 5 − 0 − 4 = +1; O in H₃O⁺ = +1; in CO the carbon is −1 and the oxygen +1. The best structure has the smallest formal charges and the sum equal to the charge on the species.

**Incomplete octets:** BeCl₂ (4 electrons on Be), BF₃ (6 on B). **Expanded octets:** PCl₅ (10 on P), SF₆ (12 on S), using vacant 3d orbitals.`,
      [kt('Covalency', 'The number of covalent bonds formed by an atom.'), kt('Formal charge', 'The charge an atom would have if the bonding electrons were shared equally: V − L − B/2.'), kt('Expanded octet', 'A central atom of the third period or below with more than eight electrons round it.')],
      [fm(r`\text{formal charge} = V - L - \tfrac{1}{2}B`, 'Formal charge')],
      V.octet,
      [3],
    ),
    sec(
      '4. Fajan’s rules',
      r`An ionic bond has some **covalent character** when the cation **polarises** the anion. It increases with **(1) a small cation, (2) a high charge on the cation, (3) a large anion, (4) a high charge on the anion**, and with a cation of non-noble-gas type (e.g. Ag⁺, with 18 outer electrons). The **ionic potential** $z/r$ measures the polarising power: Li⁺ ${(1000 / 76).toFixed(1)}, Na⁺ ${(1000 / 102).toFixed(1)}, Mg²⁺ ${(2000 / 72).toFixed(1)}, Al³⁺ ${(3000 / 53.5).toFixed(1)} (× 10⁻³ pm⁻¹).

Hence LiCl is more covalent than NaCl (and is soluble in ethanol); AlCl₃ > MgCl₂ > NaCl (AlCl₃ sublimes easily); LiI is more covalent than LiF.`,
      [kt('Polarisation', 'The distortion of the electron cloud of an anion by a neighbouring cation.'), kt('Polarising power', 'The ability of a cation to distort an anion; it rises with charge and falls with size.')],
      [fm(r`\text{ionic potential} = \frac{z}{r}`, 'Charge-to-radius ratio of a cation')],
      V.fajan,
      [4],
    ),
    sec(
      '5. VSEPR theory and shapes of molecules',
      r`Electron pairs (bond pairs and lone pairs) round the central atom repel each other and take positions as far apart as possible. **Repulsion order:** lone pair–lone pair > lone pair–bond pair > bond pair–bond pair. A multiple bond counts as one region.

Number of pairs and lone pairs from the valence electrons: pairs = (electrons of the central atom + one for each single-bonded monovalent atom ∓ charge) / 2.

**2 pairs:** linear (BeCl₂, 180°). **3:** trigonal planar (BF₃, 120°); with 1 lone pair, bent (SO₂). **4:** tetrahedral (CH₄, 109.5°); 1 lone pair, pyramidal (NH₃, 107°); 2 lone pairs, bent (H₂O, 104.5°). **5:** trigonal bipyramidal (PCl₅); 1 lone pair, see-saw (SF₄); 2, T-shaped (ClF₃); 3, linear (XeF₂); the lone pairs are equatorial. **6:** octahedral (SF₆); 1 lone pair, square pyramidal (BrF₅); 2, square planar (XeF₄).`,
      [kt('VSEPR theory', 'Valence shell electron pair repulsion theory: the shape of a molecule is decided by the repulsion between the electron pairs round the central atom.'), kt('Equatorial position', 'A position in the plane of the trigonal bipyramid, at 120° to the others; lone pairs prefer it.')],
      [],
      table(['Pairs (bond + lone)', 'Shape', 'Example', 'Hybridisation'], [['2 + 0', 'linear', 'BeCl₂', 'sp'], ['3 + 0', 'trigonal planar', 'BF₃', 'sp²'], ['4 + 0', 'tetrahedral', 'CH₄', 'sp³'], ['3 + 1', 'pyramidal', 'NH₃', 'sp³'], ['2 + 2', 'bent', 'H₂O', 'sp³'], ['5 + 0', 'trigonal bipyramidal', 'PCl₅', 'sp³d'], ['4 + 1', 'see-saw', 'SF₄', 'sp³d'], ['2 + 3', 'linear', 'XeF₂', 'sp³d'], ['6 + 0', 'octahedral', 'SF₆', 'sp³d²'], ['4 + 2', 'square planar', 'XeF₄', 'sp³d²']], 'Table of shapes with the numbers of bond pairs and lone pairs, examples and hybridisation'),
      [5],
      [V.vseprIdeal, V.vseprLp1, V.vseprLp2],
    ),
    sec(
      '6. Hybridisation involving s, p and d orbitals',
      r`**Hybridisation** is the mixing of atomic orbitals of the same atom, of nearly equal energy, to give the **same number of equivalent hybrid orbitals** directed in space at fixed angles. After promotion, each hybrid orbital holds one electron (or a lone pair) and forms a σ bond by head-on overlap.

**sp** (BeCl₂, linear, 180°); **sp²** (BF₃, planar, 120°); **sp³** (CH₄, 109.5°; NH₃ and H₂O have lone pairs in sp³ orbitals); **sp³d** (PCl₅, trigonal bipyramidal); **sp³d²** (SF₆, octahedral, 90°). The hybridisation follows from the **number of electron pairs** (a multiple bond counts once).

**Carbon compounds:** ethane, sp³ (C–C single, 1 σ); ethene, sp² (C=C: 1 σ + 1 π from unhybridised p orbitals); ethyne, sp (C≡C: 1 σ + 2 π). The shorter bond has more s character.`,
      [kt('Hybridisation', 'The mixing of atomic orbitals of one atom to form equivalent orbitals of the same number, with fixed directions in space.'), kt('Hybrid orbital', 'One of the equivalent orbitals formed by hybridisation.')],
      [],
      V.hybBoxes,
      [6],
      [V.hybLobes],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Counting a triple bond as three sigma bonds, or a double bond as two sigma bonds.
- Writing "CO₂ is non-polar because the bonds are non-polar": the bonds are polar and the dipoles cancel by symmetry.
- Using the whole bonding electron count in formal charge (halve it), or forgetting to check the sum.
- Saying nitrogen can form NF₅ or have an expanded octet.
- Naming the shape of NH₃ "tetrahedral", or forgetting that lone pairs sit in equatorial positions in a trigonal bipyramid.
- Mixing up the hybridisation (from all the pairs) with the shape (from the atoms only).

**How marks are usually awarded**
- Lewis structure: shared pairs (1), lone pairs and octets (1).
- Dipole-moment numericals: μ_ionic = e × d (1), conversion to debye (1), percentage (1).
- VSEPR: electron count (1), numbers of bond pairs and lone pairs (1), shape and angle (1).
- Hybridisation: orbitals mixed (1), geometry (1), σ and π bonds where asked (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a covalent bond?', 'A bond formed by the sharing of one or more electron pairs between two atoms.', 'definition', 1),
    fc(2, 'How many pairs are shared in single, double and triple bonds?', 'One, two and three pairs.', 'fact', 1),
    fc(3, 'Lewis structure of water: shared pairs and lone pairs?', 'Two shared pairs; two lone pairs on oxygen.', 'example', 1),
    fc(4, 'Lewis structure of CO₂?', 'O=C=O: four shared pairs and two lone pairs on each oxygen.', 'example', 1),
    fc(5, 'Shared pairs in ethane, ethene, ethyne?', '7, 6 and 5 (between the carbons: 1, 2 and 3).', 'fact', 1),
    fc(6, 'What is a sigma bond?', 'A bond formed by head-on overlap of orbitals along the line joining the nuclei.', 'definition', 1),
    fc(7, 'What is a pi bond?', 'A bond formed by sideways overlap of parallel p orbitals, above and below the axis; weaker than σ.', 'definition', 1),
    fc(8, 'Sigma and pi bonds in N₂?', 'One σ and two π.', 'fact', 1),
    fc(9, 'Sigma and pi bonds in ethene?', '5 σ (4 C–H, 1 C–C) and 1 π.', 'example', 1),
    fc(10, 'Define bond enthalpy.', 'The energy needed to break one mole of a bond in the gas phase.', 'definition', 2),
    fc(11, 'How do bond length and enthalpy change with bond order?', 'Length decreases and enthalpy increases.', 'concept', 2),
    fc(12, 'C–C, C=C, C≡C: bond lengths?', '154, 134 and 120 pm.', 'fact', 2),
    fc(13, 'What is a polar covalent bond?', 'One in which the shared pair is pulled towards the more electronegative atom, giving partial charges.', 'definition', 2),
    fc(14, 'Dipole moment: formula and unit?', r`$\mu = q \times d$, in debye; 1 D = 3.336 × 10⁻³⁰ C m.`, 'formula', 2),
    fc(15, 'Why is CO₂ non-polar?', 'It is linear, so the two equal C=O dipoles cancel.', 'concept', 2),
    fc(16, 'Percentage ionic character?', r`$\mu_\text{observed} / (e \times d) \times 100$.`, 'formula', 2),
    fc(17, 'Two differences: covalent against ionic compounds?', 'Covalent: low melting points, non-conductors; ionic: high melting points, conduct when molten or dissolved.', 'concept', 2),
    fc(18, 'What is covalency?', 'The number of covalent bonds formed by an atom.', 'definition', 3),
    fc(19, 'Covalencies of P, S and Cl?', 'P: 3, 5; S: 2, 4, 6; Cl: 1, 3, 5, 7.', 'fact', 3),
    fc(20, 'Why can P but not N have covalency 5?', 'P has vacant 3d orbitals for promotion; N has no 2d orbitals.', 'concept', 3),
    fc(21, 'Formal charge formula?', r`$V - L - \tfrac12 B$.`, 'formula', 3),
    fc(22, 'Formal charge on N in NH₄⁺?', '+1 (5 − 0 − 4).', 'example', 3),
    fc(23, 'Examples of incomplete octets?', 'BeCl₂ (4 electrons on Be) and BF₃ (6 on B).', 'example', 3),
    fc(24, 'Examples of expanded octets?', 'PCl₅ (10 on P) and SF₆ (12 on S).', 'example', 3),
    fc(25, 'State Fajan’s rules in brief.', 'More covalent character with a small, highly charged cation and a large, highly charged anion; non-noble-gas cations polarise more.', 'concept', 4),
    fc(26, 'Which is more covalent, LiCl or NaCl? Why?', 'LiCl: Li⁺ is smaller, so it has greater charge density and polarises Cl⁻ more.', 'concept', 4),
    fc(27, 'Order of covalent character: NaCl, MgCl₂, AlCl₃?', 'NaCl < MgCl₂ < AlCl₃ (z/r rises).', 'fact', 4),
    fc(28, 'State the VSEPR repulsion order.', 'Lone pair–lone pair > lone pair–bond pair > bond pair–bond pair.', 'concept', 5),
    fc(29, 'Shapes and angles of NH₃, H₂O and CH₄?', 'Pyramidal 107°; bent 104.5°; tetrahedral 109.5°.', 'fact', 5),
    fc(30, 'Shapes of SF₄, ClF₃, XeF₂?', 'See-saw; T-shaped; linear (lone pairs equatorial).', 'fact', 5),
    fc(31, 'Hybridisation and shape: BeCl₂, BF₃, CH₄, PCl₅, SF₆?', 'sp linear; sp² trigonal planar; sp³ tetrahedral; sp³d trigonal bipyramidal; sp³d² octahedral.', 'fact', 6),
    fc(32, 'Hybridisation of carbon in ethane, ethene and ethyne?', 'sp³, sp² and sp.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
