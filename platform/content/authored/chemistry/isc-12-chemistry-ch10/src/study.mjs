// ISC 12 Chemistry ch10 Coordination Compounds: Terms, Nomenclature and Isomerism — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Coordination Compounds: Terms, Nomenclature and Isomerism — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Double salts, coordination compounds and Werner’s theory',
      `**Double salt** (potash alum, carnallite, Mohr’s salt): exists only as a solid; dissociates completely into simple ions in water. **Coordination compound** (K₄[Fe(CN)₆], [Cu(NH₃)₄]SO₄): the complex ion stays intact in water.

**Werner (1898):** primary valency — ionisable, satisfied by anions, = oxidation state; secondary valency — non-ionisable, satisfied by ligands, = coordination number, fixed for a metal and directed in space (6 → octahedral; 4 → tetrahedral or square planar).

**Evidence:** AgNO₃ precipitates only Cl⁻ outside the sphere; conductivity depends on number of ions: [Co(NH₃)₆]Cl₃ (4 ions, 3 AgCl), [CoCl(NH₃)₅]Cl₂ (3, 2), [CoCl₂(NH₃)₄]Cl (2, 1), [CoCl₃(NH₃)₃] (0, 0).`,
      [kt('Double salt', 'A compound of two salts that exists only in the solid and gives all its simple ions in water.'), kt('Primary valency', 'Ionisable valency of the metal, equal to its oxidation state.'), kt('Secondary valency', 'Non-ionisable valency, equal to the coordination number and directed in space.')],
      [],
      table(['Formula', 'Ions', 'mol AgCl'], [['[Co(NH₃)₆]Cl₃', '4', '3'], ['[CoCl(NH₃)₅]Cl₂', '3', '2'], ['[CoCl₂(NH₃)₄]Cl', '2', '1'], ['[CoCl₃(NH₃)₃]', '0', '0']], 'Table of cobalt ammine chlorides'),
      [1],
    ),
    sec(
      '2. Ligands, coordination number and oxidation state',
      `**Ligand:** Lewis base donating an electron pair to the central atom (Lewis acid). **Denticity:** unidentate (NH₃, Cl⁻), didentate (en, C₂O₄²⁻), tridentate (dien), tetradentate (trien), pentadentate (EDTA³⁻), hexadentate (EDTA⁴⁻). **Chelating ligand:** polydentate ligand forming a ring; chelates are extra stable (chelate effect). **Ambidentate:** NO₂⁻/ONO⁻, SCN⁻/NCS⁻, CN⁻/NC⁻.

**Coordination number** = number of donor atoms. **Oxidation state:** charge on complex = OS + sum of ligand charges. **Homoleptic** (one kind of ligand) vs **heteroleptic**.`,
      [kt('Chelate effect', 'Greater stability of complexes with chelating ligands than of similar complexes with unidentate ligands.'), kt('Ambidentate ligand', 'A ligand that can bind through either of two different donor atoms.'), kt('Coordination number', 'The number of donor atoms bonded to the central metal.')],
      [],
      V.chelate,
      [2],
    ),
    sec(
      '3. IUPAC nomenclature',
      `1. Cation first, then anion. 2. Ligands in **alphabetical order** (ignore di-, tri-), then metal. 3. di/tri/tetra; **bis/tris/tetrakis** for ligands with numbers in their names (en). 4. Anionic ligands end in **-o** (chlorido, cyanido, hydroxido, oxalato); neutral: **aqua, ammine, carbonyl, nitrosyl**. 5. Metal OS in Roman numerals. 6. **Anionic complex:** metal ends in **-ate** (ferrate, cuprate, argentate, aurate, plumbate, stannate, zincate, cobaltate).

Examples: [CrCl₂(H₂O)₄]Cl — tetraaquadichloridochromium(III) chloride; Na₂[Zn(OH)₄] — sodium tetrahydroxidozincate(II); [Fe(CO)₅] — pentacarbonyliron(0); K₃[Al(C₂O₄)₃] — potassium trioxalatoaluminate(III).`,
      [kt('Ammine', 'The name for NH₃ as a ligand.'), kt('-ate ending', 'Used for the metal when the complex ion is an anion.')],
      [],
      table(['Ligand', 'Name'], [['H₂O', 'aqua'], ['NH₃', 'ammine'], ['CO', 'carbonyl'], ['Cl⁻', 'chlorido'], ['CN⁻', 'cyanido'], ['NO₂⁻ (N)', 'nitrito-N']], 'Table of ligand names'),
      [3],
    ),
    sec(
      '4. Isomerism',
      `**Structural:** ionisation ([Pt(NH₃)₄Cl₂]Br₂ / [Pt(NH₃)₄Br₂]Cl₂); linkage ([Mn(CO)₅(SCN)] / [Mn(CO)₅(NCS)]); coordination ([Cu(NH₃)₄][PtCl₄] / [Pt(NH₃)₄][CuCl₄]); hydrate (three forms of CrCl₃·6H₂O).

**Geometrical:** cis/trans in square planar MA₂B₂ and octahedral MA₂B₄; fac/mer in MA₃B₃; none in tetrahedral complexes.

**Optical:** non-superimposable mirror images (d, l): [M(AA)₃] and cis-[MA₂(AA)₂]; trans forms have a mirror plane. [CoCl₂(en)₂]⁺ and [Cr(C₂O₄)₂(H₂O)₂]⁻ each have 3 stereoisomers.`,
      [kt('Linkage isomerism', 'Isomerism due to an ambidentate ligand binding through different donor atoms.'), kt('Enantiomers', 'Non-superimposable mirror-image isomers that rotate plane-polarised light in opposite directions.')],
      [],
      V.cistrans,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Counting ligands instead of donor atoms for the coordination number.
- Writing "amine" for NH₃ or using -ate for cationic complexes.
- Alphabetising by prefixes (di-, tetra-).
- Claiming geometrical isomers for tetrahedral complexes, or optical activity for trans isomers.

**How marks are usually awarded**
- Werner formula (2 marks): ionisable Cl⁻ from AgCl data; formula with correct CN.
- Names/formulas (1 mark each): order, oxidation state and -ate ending all correct.
- Isomerism (2–3 marks): type named and illustrated with formulas or diagrams.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Double salt?', 'Solid compound of two salts; gives all its simple ions in water.', 'definition', 1),
    fc(2, 'Example of a double salt?', 'Potash alum, K₂SO₄·Al₂(SO₄)₃·24H₂O.', 'example', 1),
    fc(3, 'Primary valency?', 'Ionisable; = oxidation state; satisfied by anions.', 'definition', 1),
    fc(4, 'Secondary valency?', 'Non-ionisable; = coordination number; directional.', 'definition', 1),
    fc(5, 'Ions from [CoCl(NH₃)₅]Cl₂?', '3.', 'fact', 1),
    fc(6, 'Which Cl⁻ does AgNO₃ precipitate?', 'Only those outside the coordination sphere.', 'concept', 1),
    fc(7, 'Ligand?', 'Ion or molecule donating an electron pair to the metal (Lewis base).', 'definition', 2),
    fc(8, 'Coordination number?', 'Number of donor atoms bonded to the metal.', 'definition', 2),
    fc(9, 'Denticity of dien?', 'Tridentate (3 N).', 'fact', 2),
    fc(10, 'Denticity of EDTA⁴⁻?', 'Hexadentate (2 N, 4 O).', 'fact', 2),
    fc(11, 'Chelate effect?', 'Chelate complexes are more stable than similar unidentate ones.', 'concept', 2),
    fc(12, 'Ambidentate ligands?', 'NO₂⁻ (N or O), SCN⁻ (S or N).', 'example', 2),
    fc(13, 'OS of Fe in [Fe(H₂O)₅(NO)]²⁺ (NO⁺)?', '+1.', 'fact', 2),
    fc(14, 'Homoleptic?', 'Only one kind of ligand, e.g. [Co(NH₃)₆]³⁺.', 'definition', 2),
    fc(15, 'Naming order?', 'Ligands A→Z, then metal with OS; cation before anion.', 'concept', 3),
    fc(16, 'Name of NH₃ as ligand?', 'Ammine.', 'fact', 3),
    fc(17, 'Name of H₂O as ligand?', 'Aqua.', 'fact', 3),
    fc(18, 'When is -ate used?', 'When the complex is an anion.', 'concept', 3),
    fc(19, 'Iron in an anionic complex?', 'Ferrate.', 'fact', 3),
    fc(20, 'Prefix for two en ligands?', 'bis(ethane-1,2-diamine).', 'fact', 3),
    fc(21, 'Name of K₃[Al(C₂O₄)₃]?', 'Potassium trioxalatoaluminate(III).', 'example', 3),
    fc(22, 'Ionisation isomers?', 'Ligand and counter ion exchange places.', 'definition', 4),
    fc(23, 'Linkage isomers?', 'Ambidentate ligand bonded through different atoms.', 'definition', 4),
    fc(24, 'Coordination isomers?', 'Ligands exchanged between cationic and anionic complexes.', 'definition', 4),
    fc(25, 'Hydrate isomers?', 'Water inside vs outside the sphere, e.g. CrCl₃·6H₂O forms.', 'definition', 4),
    fc(26, 'fac and mer occur in?', 'Octahedral MA₃B₃.', 'fact', 4),
    fc(27, 'Why no cis/trans in tetrahedral complexes?', 'All positions are adjacent.', 'concept', 4),
    fc(28, 'Optically active types?', '[M(AA)₃] and cis-[MA₂(AA)₂].', 'concept', 4),
    fc(29, 'Stereoisomers of [CoCl₂(en)₂]⁺?', '3 (trans, d-cis, l-cis).', 'fact', 4),
    fc(30, 'Why no isomers for [Pt(en)Cl₂]?', 'en must span cis positions.', 'concept', 4),
    fc(31, 'Exam tip: CN', 'Count donor atoms; en and oxalate count 2 each.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
