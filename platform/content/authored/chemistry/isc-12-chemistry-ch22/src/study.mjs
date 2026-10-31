// ISC 12 Chemistry ch22 Proteins, Vitamins and Nucleic Acids — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Proteins, Vitamins and Nucleic Acids — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Amino acids',
      r`**α-Amino acids** H₂N–CH(R)–COOH; all chiral (L) except glycine. **Essential** (from diet: valine, leucine, isoleucine, lysine, threonine, methionine, phenylalanine, tryptophan, arginine, histidine) vs **non-essential** (made in the body: glycine, alanine, glutamic acid). **Neutral** (one –NH₂, one –COOH), **acidic** (extra –COOH: aspartic, glutamic acid), **basic** (extra –NH₂: lysine, arginine).

**Zwitter ion** H₃N⁺–CH(R)–COO⁻: salt-like — high m.p., soluble in water not benzene, **amphoteric**. **Isoelectric point (pI):** pH of zero net charge, no migration in an electric field; below pI → cation (to cathode), above pI → anion (to anode). For neutral amino acids pI ≈ (pKa₁ + pKa₂)/2.`,
      [kt('Zwitter ion', 'A dipolar ion carrying both a positive (–NH₃⁺) and a negative (–COO⁻) charge, neutral overall.'), kt('Isoelectric point', 'The pH at which an amino acid has no net charge and does not move in an electric field.')],
      [fm(r`\ce{H3N+CH2COO- + H+ -> H3N+CH2COOH}`, 'Zwitter ion as a base'), fm(r`\ce{H3N+CH2COO- + OH- -> H2NCH2COO- + H2O}`, 'Zwitter ion as an acid')],
      table(['pH vs pI', 'Form', 'Moves to'], [['pH < pI', 'Cation', 'Cathode'], ['pH = pI', 'Zwitter ion', 'No movement'], ['pH > pI', 'Anion', 'Anode']], 'Table of amino-acid form and migration at pH below, at and above the isoelectric point'),
      [1],
    ),
    sec(
      '2. Peptides and proteins',
      r`**Peptide bond** –CO–NH– from –COOH of one amino acid + –NH₂ of the next, losing H₂O. n amino acids → **n − 1** peptide bonds and n − 1 H₂O; M(peptide) = ΣM(amino acids) − 18(n − 1). N-terminal (free –NH₂) written on the left.

**Fibrous** (keratin, collagen, myosin): parallel chains, H- and disulfide bonds, insoluble, structural. **Globular** (insulin, albumin, enzymes): compact folded chains, soluble, functional.

**Levels (definitions only):** primary — amino-acid sequence; secondary — α-helix or β-pleated sheet (H-bonds); tertiary — overall 3D folding of a chain; quaternary — arrangement of subunits (haemoglobin: four).`,
      [kt('Peptide bond', 'The amide link –CO–NH– joining two amino-acid residues.'), kt('Primary structure', 'The sequence of amino acids in a polypeptide chain.')],
      [fm(r`\ce{H2NCH2COOH + H2NCH(CH3)COOH -> H2NCH2CONHCH(CH3)COOH + H2O}`, 'Glycylalanine')],
      table(['Type', 'Shape', 'Example'], [['Fibrous', 'Long, parallel chains', 'Keratin'], ['Globular', 'Compact, folded', 'Insulin']], 'Table comparing fibrous and globular proteins'),
      [2],
    ),
    sec(
      '3. Denaturation, enzymes and hormones',
      r`**Denaturation:** heat, pH change, alcohol or heavy-metal ions break H-bonds and other interactions; 2°, 3° (and 4°) structure lost, **1° intact**; protein coagulates and loses activity (boiled egg, curdled milk, 70% alcohol on bacteria).

**Enzymes:** biological catalysts, mostly globular proteins; highly specific, efficient, work best near body temperature and an optimum pH; lower activation energy. Invertase (sucrose), maltase (maltose), pepsin (proteins → peptides), urease: $\ce{NH2CONH2 + H2O -> 2NH3 + CO2}$.

**Hormones:** chemical messengers from endocrine glands carried in blood — insulin (lowers blood glucose), glucagon (raises it), thyroxine (metabolic rate; contains iodine), adrenaline (emergency), steroid sex hormones.`,
      [kt('Denaturation', 'Loss of the secondary and tertiary structure, and of biological activity, of a protein without breaking peptide bonds.'), kt('Enzyme', 'A biological catalyst, usually a globular protein, specific for its substrate.')],
      [fm(r`\ce{NH2CONH2 + H2O ->[urease] 2NH3 + CO2}`, 'Urease')],
      table(['Hormone', 'Role'], [['Insulin', 'Lowers blood glucose'], ['Glucagon', 'Raises blood glucose'], ['Thyroxine', 'Metabolic rate']], 'Table of three hormones and their roles'),
      [3],
    ),
    sec(
      '4. Vitamins',
      `**Fat-soluble:** A, D, E, K (stored in liver and fat; excess can be harmful). **Water-soluble:** B group, C (excreted; must be supplied regularly; lost in cooking water). B₁₂ is stored in the liver.

| Vitamin | Deficiency |
|---|---|
| A | Night blindness, xerophthalmia |
| B₁ | Beriberi |
| B₂ | Cheilosis, digestive disorders |
| B₆ | Convulsions |
| B₁₂ | Pernicious anaemia |
| C | Scurvy (bleeding gums) |
| D | Rickets (children), osteomalacia (adults) |
| E | Fragile red blood cells, muscular weakness |
| K | Increased blood-clotting time |`,
      [kt('Vitamin', 'An organic compound needed in small amounts in the diet for normal growth and health.'), kt('Fat-soluble vitamin', 'One of vitamins A, D, E and K, which dissolve in fat and are stored in the body.')],
      [],
      table(['Group', 'Members'], [['Fat-soluble', 'A, D, E, K'], ['Water-soluble', 'B group, C']], 'Table of vitamin groups'),
      [4],
    ),
    sec(
      '5. Nucleic acids',
      r`**Nucleotide** = base + pentose + phosphate (nucleoside = base + sugar); joined by phosphodiester links. **Purines:** adenine, guanine. **Pyrimidines:** cytosine, thymine (DNA), uracil (RNA).

**DNA:** 2-deoxyribose; double helix (Watson and Crick, 1953); antiparallel, complementary strands; A–T (2 H-bonds), G–C (3 H-bonds); A = T, G = C. Stores hereditary information; replicates.

**RNA:** ribose; A, G, C, U; usually single-stranded; mRNA (message), tRNA (carries amino acids), rRNA (ribosome); protein synthesis.

Base counting: total bases = 2 × base pairs.`,
      [kt('Nucleotide', 'The monomer of nucleic acids: a nitrogenous base, a pentose sugar and a phosphate group.'), kt('Complementary strands', 'Two DNA strands whose bases pair A with T and G with C.')],
      [],
      table(['Feature', 'DNA', 'RNA'], [['Sugar', 'Deoxyribose', 'Ribose'], ['Pyrimidines', 'C, T', 'C, U'], ['Strands', 'Two', 'One']], 'Table comparing DNA and RNA'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving the zwitter ion a net charge, or confusing which way an amino acid moves below its pI.
- Counting n peptide bonds for n amino acids (it is n − 1).
- Saying denaturation breaks peptide bonds.
- Listing vitamin C as fat-soluble, or putting thymine in RNA.

**How marks are usually awarded**
- Zwitter ion (1 mark): correct charges; amphoteric equations (1 mark each).
- Vitamins (½–1 mark each): vitamin, group and deficiency disease.
- DNA vs RNA (1 mark per feature): sugar, bases, strands, function.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'General formula of an α-amino acid?', 'H₂N–CH(R)–COOH.', 'formula', 1),
    fc(2, 'Essential amino acid?', 'One the body cannot make; must come from food.', 'definition', 1),
    fc(3, 'Which common amino acid is not chiral?', 'Glycine (R = H).', 'fact', 1),
    fc(4, 'Zwitter ion of glycine?', 'H₃N⁺CH₂COO⁻.', 'formula', 1),
    fc(5, 'Why are amino acids amphoteric?', '–COO⁻ accepts H⁺; –NH₃⁺ donates H⁺.', 'concept', 1),
    fc(6, 'Isoelectric point?', 'pH of zero net charge; no migration in an electric field.', 'definition', 1),
    fc(7, 'Amino acid at pH below its pI?', 'Cation; moves to the cathode.', 'concept', 1),
    fc(8, 'Peptide bond?', '–CO–NH– formed with loss of water.', 'definition', 2),
    fc(9, 'Peptide bonds in a chain of n amino acids?', 'n − 1.', 'fact', 2),
    fc(10, 'Fibrous protein example?', 'Keratin (also collagen, myosin).', 'fact', 2),
    fc(11, 'Globular protein example?', 'Insulin (also albumin).', 'fact', 2),
    fc(12, 'Primary structure?', 'Sequence of amino acids.', 'definition', 2),
    fc(13, 'Secondary structure?', 'α-Helix or β-pleated sheet held by H-bonds.', 'definition', 2),
    fc(14, 'Quaternary structure?', 'Arrangement of polypeptide subunits (haemoglobin: 4).', 'definition', 2),
    fc(15, 'What does denaturation leave intact?', 'Primary structure (peptide bonds).', 'concept', 3),
    fc(16, 'Name three denaturing agents.', 'Heat, pH change, alcohol (also heavy-metal ions).', 'fact', 3),
    fc(17, 'Urease reaction?', 'Urea + H₂O → 2NH₃ + CO₂.', 'formula', 3),
    fc(18, 'Two features of enzymes?', 'Highly specific; work best at optimum temperature and pH.', 'concept', 3),
    fc(19, 'Insulin vs glucagon?', 'Insulin lowers blood glucose; glucagon raises it.', 'fact', 3),
    fc(20, 'Fat-soluble vitamins?', 'A, D, E, K.', 'fact', 4),
    fc(21, 'Why must vitamin C be eaten regularly?', 'Water-soluble; not stored; excreted.', 'concept', 4),
    fc(22, 'Vitamin A deficiency?', 'Night blindness, xerophthalmia.', 'fact', 4),
    fc(23, 'Vitamin B₁₂ deficiency?', 'Pernicious anaemia.', 'fact', 4),
    fc(24, 'Vitamin D deficiency?', 'Rickets (children), osteomalacia (adults).', 'fact', 4),
    fc(25, 'Vitamin K deficiency?', 'Increased blood-clotting time.', 'fact', 4),
    fc(26, 'Parts of a nucleotide?', 'Base, pentose sugar, phosphate.', 'definition', 5),
    fc(27, 'Purine bases?', 'Adenine and guanine.', 'fact', 5),
    fc(28, 'Base in RNA but not DNA?', 'Uracil.', 'fact', 5),
    fc(29, 'Base pairs in DNA?', 'A–T (2 H-bonds), G–C (3 H-bonds).', 'fact', 5),
    fc(30, 'Role of tRNA?', 'Carries amino acids to the ribosome.', 'fact', 5),
    fc(31, 'Exam tip: base counting', 'Total bases = 2 × base pairs; A = T, G = C.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
