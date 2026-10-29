// ch05 Coordination Compounds — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Coordination Compounds — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Werner’s theory and key terms',
      r`**Double salts** (Mohr’s salt, carnallite) give all their simple ions in water; **coordination compounds** keep the complex ion intact ($\ce{K4[Fe(CN)6]}$ gives no free $\ce{Fe^2+}$ or $\ce{CN-}$).

**Werner’s theory:** a metal shows **primary valency** (ionisable; equals the oxidation state; satisfied by anions) and **secondary valency** (non-ionisable; equals the coordination number; satisfied by ligands; directed in space). Silver nitrate precipitates only chloride outside the coordination sphere: $\ce{CoCl3.6NH3}$ → 3 AgCl, $\ce{[Co(NH3)6]Cl3}$; $\ce{CoCl3.5NH3}$ → 2, $\ce{[CoCl(NH3)5]Cl2}$; $\ce{CoCl3.4NH3}$ → 1, $\ce{[CoCl2(NH3)4]Cl}$.

**Terms:** coordination entity, central atom/ion, **ligand** (electron-pair donor), **coordination number** (number of donor atoms bonded), coordination sphere, counter ions, coordination polyhedron, oxidation number, homoleptic and heteroleptic complexes.

**Ligands:** unidentate ($\ce{Cl-}$, $\ce{H2O}$, $\ce{NH3}$), didentate (en, oxalate), polydentate (EDTA⁴⁻, hexadentate). A **chelate** forms when a di- or polydentate ligand closes a ring with the metal; chelates are extra stable. **Ambidentate** ligands bind through either of two atoms: $\ce{NO2-}$/$\ce{ONO-}$, $\ce{SCN-}$/$\ce{NCS-}$.`,
      [kt('Ligand', 'An ion or molecule that donates a pair of electrons to the central metal atom or ion.'), kt('Coordination number', 'The number of ligand donor atoms directly bonded to the central atom.'), kt('Chelate', 'A complex in which a di- or polydentate ligand forms a ring with the metal.'), kt('Ambidentate ligand', 'A ligand that can bond through either of two different donor atoms.')],
      [],
      V.chelate,
      [1],
    ),
    sec(
      '2. IUPAC nomenclature',
      r`1. Name the cation first, then the anion.
2. Inside the complex, name **ligands in alphabetical order** (ignoring di-, tri-, bis-, tris-), then the metal.
3. Prefixes: di-, tri-, tetra-, …; for ligands whose names contain a number (ethane-1,2-diamine), use bis-, tris-, tetrakis- with brackets.
4. Anionic ligands end in -o/-ido (chlorido, cyanido, hydroxido, oxalato); neutral ligands keep their names except **aqua**, **ammine**, **carbonyl**, **nitrosyl**.
5. Give the metal’s oxidation state in Roman numerals.
6. In an **anionic** complex the metal ends in **-ate** (ferrate, cuprate, argentate, aurate, plumbate, stannate, cobaltate, nickelate).
7. Ambidentate ligands: nitrito-N / nitrito-O, thiocyanato-S / thiocyanato-N.

Examples: $\ce{[CoCl2(NH3)4]Cl}$ tetraamminedichloridocobalt(III) chloride; $\ce{K3[Fe(CN)6]}$ potassium hexacyanidoferrate(III); $\ce{[Ni(CO)4]}$ tetracarbonylnickel(0); $\ce{[Co(en)3]Cl3}$ tris(ethane-1,2-diamine)cobalt(III) chloride; $\ce{K3[Al(C2O4)3]}$ potassium trioxalatoaluminate(III).`,
      [kt('-ate ending', 'Used for the metal when the complex ion is negatively charged.')],
      [],
      table(['Formula', 'IUPAC name'], [[r`$\ce{[Ag(NH3)2]Cl}$`, 'Diamminesilver(I) chloride'], [r`$\ce{K2[NiCl4]}$`, 'Potassium tetrachloridonickelate(II)'], [r`$\ce{[Pt(NH3)2Cl(NO2)]}$`, 'Diamminechloridonitrito-N-platinum(II)'], [r`$\ce{[Cu(NH3)4]SO4}$`, 'Tetraamminecopper(II) sulfate']], 'Table of four formulas and their IUPAC names'),
      [2],
    ),
    sec(
      '3. Isomerism',
      r`**Structural isomerism:**
- **Ionisation:** ligand and counter ion interchange — $\ce{[Co(NH3)5(SO4)]Br}$ / $\ce{[CoBr(NH3)5]SO4}$.
- **Linkage:** ambidentate ligand bonds through a different atom — nitrito-N / nitrito-O.
- **Coordination:** ligands interchange between cationic and anionic entities — $\ce{[Co(NH3)6][Cr(CN)6]}$ / $\ce{[Cr(NH3)6][Co(CN)6]}$.
- **Solvate (hydrate):** water inside or outside the sphere — $\ce{[Cr(H2O)6]Cl3}$ (violet) / $\ce{[CrCl(H2O)5]Cl2.H2O}$ (grey-green).

**Stereoisomerism:**
- **Geometrical:** square planar $\ce{[MX2L2]}$ and octahedral $\ce{[MX2L4]}$ give cis and trans; octahedral $\ce{[MA3B3]}$ gives fac and mer. Tetrahedral complexes show none.
- **Optical:** non-superimposable mirror images (d and l), e.g. $\ce{[Co(en)3]^3+}$ and cis-$\ce{[CoCl2(en)2]+}$; trans-$\ce{[CoCl2(en)2]+}$ is optically inactive.`,
      [kt('Linkage isomerism', 'Isomerism caused by an ambidentate ligand bonding through different donor atoms.'), kt('Geometrical isomerism', 'Isomerism due to different relative positions of ligands (cis/trans, fac/mer).'), kt('Optical isomers', 'Non-superimposable mirror-image forms that rotate plane-polarised light in opposite directions.')],
      [],
      V.cistrans,
      [3],
    ),
    sec(
      '4. Bonding: valence bond theory and crystal field theory',
      r`**VBT:** the metal ion uses hybrid orbitals to accept ligand electron pairs. CN 4: $sp^3$ tetrahedral ($\ce{[NiCl4]^2-}$, paramagnetic) or $dsp^2$ square planar ($\ce{[Ni(CN)4]^2-}$, diamagnetic). CN 6: $d^2sp^3$ inner-orbital/low spin ($\ce{[Co(NH3)6]^3+}$, diamagnetic) or $sp^3d^2$ outer-orbital/high spin ($\ce{[CoF6]^3-}$, 4 unpaired). Limitations: no explanation of colour; cannot predict tetrahedral vs square planar; no distinction of weak and strong ligands.

**CFT:** ligands are point charges. Octahedral: $e_g$ ($d_{x^2-y^2}$, $d_{z^2}$) at $+0.6\Delta_o$, $t_{2g}$ at $-0.4\Delta_o$. Tetrahedral: e lower, $t_2$ higher, $\Delta_t \approx \tfrac{4}{9}\Delta_o$ — always high spin.

**Spectrochemical series:** $\ce{I-} < \ce{Br-} < \ce{SCN-} < \ce{Cl-} < \ce{S^2-} < \ce{F-} < \ce{OH-} < \ce{C2O4^2-} < \ce{H2O} < \ce{NCS-} < \text{edta}^{4-} < \ce{NH3} < \text{en} < \ce{CN-} < \ce{CO}$. If $\Delta_o < P$: high spin ($d^4$: $t_{2g}^3e_g^1$); if $\Delta_o > P$: low spin ($t_{2g}^4e_g^0$).

**Colour:** d–d transitions absorb visible light; the complementary colour is seen ($\ce{[Ti(H2O)6]^3+}$ absorbs about 498 nm and looks violet; $\ce{[Ni(H2O)6]^2+}$ green → $\ce{[Ni(en)3]^2+}$ violet). Anhydrous $\ce{CuSO4}$ is white. **Limitation of CFT:** anionic ligands should split most, yet halides are weak; covalent bonding is ignored.`,
      [kt('Crystal-field splitting energy', 'Energy gap between the two sets of d orbitals produced by the ligand field (Δo or Δt).'), kt('Spectrochemical series', 'Ligands arranged in order of increasing crystal-field splitting.'), kt('Low-spin complex', 'A complex in which electrons pair in the lower set because Δ is larger than the pairing energy.')],
      [fm(r`\Delta_t \approx \tfrac{4}{9}\Delta_o`, 'Tetrahedral splitting'), fm(r`\mu = \sqrt{n(n+2)}\ \text{BM}`, 'Spin-only moment')],
      V.split,
      [4],
      [table(['Complex', 'Hybridisation', 'Shape', 'Unpaired e⁻'], [['[Co(NH₃)₆]³⁺', 'd²sp³', 'Octahedral', '0'], ['[CoF₆]³⁻', 'sp³d²', 'Octahedral', '4'], ['[Ni(CN)₄]²⁻', 'dsp²', 'Square planar', '0'], ['[NiCl₄]²⁻', 'sp³', 'Tetrahedral', '2'], ['[Ni(CO)₄]', 'sp³', 'Tetrahedral', '0']], 'Table of five complexes with hybridisation, shape and unpaired electrons')],
    ),
    sec(
      '5. Metal carbonyls and applications',
      r`**Metal carbonyls:** $\ce{[Ni(CO)4]}$ tetrahedral, $\ce{[Fe(CO)5]}$ trigonal bipyramidal, $\ce{[Cr(CO)6]}$ octahedral; $\ce{[Mn2(CO)10]}$ and $\ce{[Co2(CO)8]}$ have metal–metal bonds. **Synergic bonding:** σ donation from the carbon lone pair into an empty metal orbital, plus π back-donation from a filled metal d orbital into the empty π* orbital of CO; the M–C bond is strengthened and the C–O bond weakened.

**Applications:** estimation of hardness of water with EDTA ($\ce{Ca^2+}$, $\ce{Mg^2+}$); extraction of silver and gold as cyanide complexes; purification of nickel by the Mond process via $\ce{[Ni(CO)4]}$; Wilkinson’s catalyst $\ce{[RhCl(PPh3)3]}$ for hydrogenation; photography (AgBr dissolved by hypo as $\ce{[Ag(S2O3)2]^3-}$); medicine (cisplatin against cancer; EDTA to remove lead); biology (chlorophyll Mg, haemoglobin Fe, vitamin B12 Co).`,
      [kt('Synergic bonding', 'Mutually reinforcing σ donation and π back-donation between a metal and a ligand such as CO.'), kt('Mond process', 'Purification of nickel through formation and decomposition of volatile tetracarbonylnickel.')],
      [],
      V.synergic,
      [5],
      [flow('LR', [['a', 'C lone pair → empty M orbital (σ)'], ['b', 'Filled M d → empty CO π* (π)'], ['c', 'M–C stronger, C–O weaker']], [['a', 'b'], ['b', 'c']], 'Flow of synergic bonding: sigma donation, pi back-donation, stronger metal–carbon bond and weaker carbon–oxygen bond')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Counting ligands instead of donor atoms for the coordination number.
- Ordering ligands by charge or by the prefix (tetra-) instead of alphabetically by ligand name.
- Writing "ammonia" or "amine" instead of **ammine**, or forgetting "-ate" for anionic complexes.
- Starting VBT/CFT from the atom's configuration instead of the ion's (Co³⁺ is 3d⁶).
- Calling [NiCl₄]²⁻ square planar (it is tetrahedral, sp³).
- Saying the colour seen is the colour absorbed.

**How marks are usually awarded**
- 1-mark items: correct option, name, formula, coordination number or oxidation state.
- Naming/formula questions: ½ mark each for correct ligand order, prefixes, metal with oxidation state, ending.
- VBT questions: d count (½) + hybridisation (1) + shape (½) + magnetism (1).
- CFT questions: splitting diagram (1) + configuration in t₂g/e_g (1) + spin state or colour reason (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Double salt vs complex in water?', 'Double salt gives all its simple ions; a complex keeps its complex ion intact.', 'concept', 1),
    fc(2, 'Werner’s primary and secondary valency?', 'Primary: ionisable, = oxidation state. Secondary: non-ionisable, = coordination number, directional.', 'definition', 1),
    fc(3, 'Moles of AgCl from 1 mol [CoCl(NH₃)₅]Cl₂?', '2 (only the chlorides outside the brackets).', 'example', 1),
    fc(4, 'Define coordination number.', 'Number of ligand donor atoms bonded directly to the central atom.', 'definition', 1),
    fc(5, 'What is a chelate?', 'A ring formed when a di- or polydentate ligand binds a metal through two or more donor atoms; extra stable.', 'definition', 1),
    fc(6, 'Denticity of EDTA⁴⁻?', 'Hexadentate (2 N + 4 O).', 'fact', 1),
    fc(7, 'Give two ambidentate ligands.', 'NO₂⁻ (N or O) and SCN⁻ (S or N).', 'example', 1),
    fc(8, 'Order of ligands in a name?', 'Alphabetical by ligand name, ignoring multiplying prefixes.', 'concept', 2),
    fc(9, 'IUPAC names for H₂O, NH₃, CO as ligands?', 'Aqua, ammine, carbonyl.', 'fact', 2),
    fc(10, 'When does the metal name end in -ate?', 'When the complex ion is an anion (ferrate, cuprate, argentate…).', 'concept', 2),
    fc(11, 'Name K₃[Fe(CN)₆].', 'Potassium hexacyanidoferrate(III).', 'example', 2),
    fc(12, 'Name [CoCl₂(NH₃)₄]Cl.', 'Tetraamminedichloridocobalt(III) chloride.', 'example', 2),
    fc(13, 'Formula of potassium tetrachloridonickelate(II)?', r`$\ce{K2[NiCl4]}$.`, 'example', 2),
    fc(14, 'What are ionisation isomers?', 'Isomers that give different ions in solution because a ligand and a counter ion exchange places.', 'definition', 3),
    fc(15, 'Example of linkage isomers?', '[Co(NH₃)₅(NO₂)]Cl₂ (nitrito-N) and [Co(NH₃)₅(ONO)]Cl₂ (nitrito-O).', 'example', 3),
    fc(16, 'Which shapes show cis–trans isomerism?', 'Square planar [MX₂L₂] and octahedral [MX₂L₄]; not tetrahedral.', 'concept', 3),
    fc(17, 'Is trans-[CoCl₂(en)₂]⁺ optically active?', 'No — it has a mirror plane. The cis form is optically active.', 'concept', 3),
    fc(18, 'What are fac and mer isomers?', 'Geometrical isomers of an octahedral complex [MA₃B₃], with the three A on one face (fac) or around a meridian (mer).', 'definition', 3),
    fc(19, 'Hybridisation of [Ni(CN)₄]²⁻ and its shape?', 'dsp², square planar, diamagnetic.', 'example', 4),
    fc(20, 'Why is [CoF₆]³⁻ paramagnetic?', 'F⁻ is weak-field: no pairing; sp³d² (outer orbital); 4 unpaired electrons.', 'concept', 4),
    fc(21, 'Octahedral splitting: which set is lower?', 't₂g (−0.4Δo) is lower; e_g (+0.6Δo) is higher.', 'diagram', 4),
    fc(22, 'Relation between Δt and Δo?', r`$\Delta_t \approx \tfrac{4}{9}\Delta_o$; tetrahedral complexes are high spin.`, 'formula', 4),
    fc(23, 'High spin or low spin when Δo > P?', 'Low spin: electrons pair in t₂g first.', 'concept', 4),
    fc(24, 'Strongest and weakest ligands in the spectrochemical series?', 'CO strongest; I⁻ weakest.', 'fact', 4),
    fc(25, 'Why are complexes coloured?', 'd–d transitions absorb visible light; the complementary colour is seen.', 'concept', 4),
    fc(26, 'Why is anhydrous CuSO₄ white?', 'Without water ligands there is no crystal-field splitting in the visible range, so no d–d absorption.', 'concept', 4),
    fc(27, 'One limitation of CFT?', 'Treats ligands as point charges, so cannot explain why neutral CO is a stronger ligand than anions.', 'fact', 4),
    fc(28, 'Shapes of Ni(CO)₄, Fe(CO)₅, Cr(CO)₆?', 'Tetrahedral, trigonal bipyramidal, octahedral.', 'fact', 5),
    fc(29, 'What is synergic bonding?', 'σ donation from CO to the metal plus π back-donation from metal d into CO π*, reinforcing each other.', 'definition', 5),
    fc(30, 'Three uses of coordination compounds?', 'EDTA for water hardness; cyanide complexes for Ag/Au extraction; cisplatin in cancer therapy.', 'fact', 5),
    fc(31, 'Exam tip: VBT answers', 'Start from the ion’s d count, then state hybridisation, shape and magnetism.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
