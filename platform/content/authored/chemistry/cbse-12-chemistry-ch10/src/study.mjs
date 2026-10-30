// ch10 Biomolecules — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Biomolecules — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Carbohydrates: classification and glucose',
      r`**Carbohydrates** are optically active polyhydroxy aldehydes or ketones, or compounds that give these on hydrolysis.
- **Monosaccharides** (no further hydrolysis): glucose, fructose, ribose. Named by carbonyl type and carbon count — glucose is an **aldohexose**, fructose a **ketohexose**.
- **Oligosaccharides** (2–10 units): sucrose, maltose, lactose. **Polysaccharides**: starch, cellulose, glycogen.
- **Reducing sugars** reduce Tollens’ and Fehling’s reagents (free aldehyde or ketone group available): all monosaccharides, maltose, lactose. Sucrose is **non-reducing**.

**Preparing glucose:** boil sucrose with dilute acid, $\ce{C12H22O11 + H2O ->[H+] C6H12O6 + C6H12O6}$ (glucose + fructose); commercially, hydrolyse starch with dilute H₂SO₄ at 393 K under pressure.

**Open-chain structure — evidence:** HI (prolonged heating) → n-hexane (straight chain of six C); NH₂OH → oxime and HCN → cyanohydrin (C=O); bromine water → gluconic acid (the C=O is an aldehyde); ethanoic anhydride → pentaacetate (five –OH); HNO₃ → saccharic acid (primary –OH at C6). The –OH on C5 is on the right: **D**-configuration; (+) means dextrorotatory.`,
      [kt('Reducing sugar', 'A carbohydrate that reduces Tollens’ reagent and Fehling’s solution, because a free aldehyde or ketone group is available.'), kt('Aldohexose', 'A monosaccharide with an aldehyde group and six carbon atoms, e.g. glucose.')],
      [],
      V.glucose,
      [1],
    ),
    sec(
      '2. Cyclic structures, disaccharides and polysaccharides',
      r`The open chain does not explain why glucose gives no Schiff’s test or NaHSO₃ adduct, or why the pentaacetate does not react with NH₂OH. Glucose is mainly a **six-membered ring** (pyranose): the C5 –OH adds to the C1 aldehyde (hemiacetal). The two ring forms, **α** (m.p. 419 K) and **β** (m.p. 423 K), differ only at C1 — they are **anomers**. In water each slowly changes to an equilibrium mixture (**mutarotation**). **Fructose** (ketohexose, laevorotatory) forms a five-membered **furanose** ring.

**Glycosidic linkage:** two monosaccharides join with loss of water.
- **Sucrose:** α-D-glucose C1 to β-D-fructose C2 — both reducing carbons used, so **non-reducing**. Hydrolysis changes the rotation from + to − (**invert sugar**).
- **Maltose:** two α-D-glucose, C1–C4 — reducing. **Lactose** (milk sugar): β-D-galactose C1 to glucose C4 — reducing.

**Polysaccharides:** **starch** = amylose (15–20%, unbranched α-1,4, water-soluble, blue with iodine) + amylopectin (80–85%, α-1,4 chains branched by α-1,6 links); **cellulose** = unbranched β-1,4 chains of β-glucose (plant cell walls; humans cannot digest it); **glycogen** = highly branched, animal store in liver and muscle. Each glucose unit in a chain has mass $180 - 18 = 162$.

**Importance:** energy source and store (starch, glycogen), structure (cellulose in wood and cotton), raw material for paper, textiles and ethanol; ribose and deoxyribose in nucleic acids.`,
      [kt('Anomers', 'Ring forms of a sugar that differ only in the configuration at the carbonyl (anomeric) carbon, C1 in glucose.'), kt('Glycosidic linkage', 'The ether (C–O–C) link joining two monosaccharide units, formed with loss of water.'), kt('Invert sugar', 'The laevorotatory equimolar mixture of glucose and fructose formed by hydrolysis of dextrorotatory sucrose.')],
      [],
      table(['Carbohydrate', 'Units and linkage', 'Reducing?'], [['Sucrose', 'α-glucose C1 – β-fructose C2', 'No'], ['Maltose', 'α-glucose C1 – glucose C4', 'Yes'], ['Lactose', 'β-galactose C1 – glucose C4', 'Yes'], ['Amylose', 'α-1,4 (unbranched)', 'No'], ['Amylopectin, glycogen', 'α-1,4 with α-1,6 branches', 'No'], ['Cellulose', 'β-1,4 (unbranched)', 'No']], 'Table of disaccharides and polysaccharides with units, linkages and reducing power'),
      [1],
    ),
    sec(
      '3. Proteins',
      r`**α-Amino acids** carry –NH₂ and –COOH on the same carbon, with a side chain R; all except glycine are optically active (L-form in proteins). **Essential** amino acids (e.g. valine, leucine, lysine) must come from food. In water they exist as **zwitterions**, $\ce{H3N+-CHR-COO-}$: amphoteric, crystalline, water-soluble, high-melting.

**Peptide bond:** –COOH of one amino acid + –NH₂ of the next → –CO–NH– + H₂O. A chain of $n$ amino acids has $n - 1$ peptide bonds and is formed with loss of $n - 1$ water molecules. More than about 100 residues: a protein.

**Structure levels:** primary (sequence; covalent peptide bonds), secondary (α-helix or β-pleated sheet; H-bonds between C=O and N–H), tertiary (overall 3D fold; H-bonds, disulfide links, ionic and van der Waals forces), quaternary (arrangement of subunits, e.g. haemoglobin).

**Fibrous** proteins (keratin, myosin): parallel chains, insoluble. **Globular** proteins (insulin, albumin): compact, soluble.

**Denaturation:** heat, pH change or some chemicals disrupt H-bonds and other weak forces, uncoiling secondary and tertiary structure; biological activity is lost but the **primary structure stays**. Examples: boiling an egg, curdling milk.`,
      [kt('Zwitterion', 'A dipolar ion with both positive and negative charges, e.g. H₃N⁺–CHR–COO⁻.'), kt('Peptide bond', 'The amide link –CO–NH– between two amino acids.'), kt('Denaturation', 'Loss of a protein’s secondary and tertiary structure, and of its biological activity, on heating or change of pH.')],
      [],
      V.peptide,
      [2],
    ),
    sec(
      '4. Enzymes and vitamins',
      r`**Enzymes** are biocatalysts, almost all globular proteins. They are highly **specific** (one substrate or reaction), work at body temperature and near-neutral pH, and lower the **activation energy**. Examples: invertase (sucrose → glucose + fructose), maltase (maltose → glucose), amylase (starch → maltose), pepsin and trypsin (proteins → peptides), urease (urea → NH₃ + CO₂).

**Vitamins** are organic compounds needed in small amounts for normal growth and health.
- **Fat-soluble:** A, D, E, K — stored in liver and adipose tissue.
- **Water-soluble:** B group and C — excreted in urine, so must be supplied regularly (except B₁₂, stored in the liver). Vitamin C is destroyed by heat.

| Vitamin | Deficiency disease |
|---|---|
| A | Xerophthalmia, night blindness |
| B₁ | Beriberi |
| B₂ | Cheilosis, digestive disorders |
| B₆ | Convulsions |
| B₁₂ | Pernicious anaemia |
| C | Scurvy (bleeding gums) |
| D | Rickets, osteomalacia |
| E | Fragile red blood cells, muscle weakness |
| K | Increased blood-clotting time |`,
      [kt('Enzyme', 'A biological catalyst, usually a globular protein, that is specific for a reaction and lowers its activation energy.'), kt('Fat-soluble vitamins', 'Vitamins A, D, E and K, which dissolve in fats and are stored in the body.')],
      [],
      table(['Group', 'Vitamins', 'Stored?'], [['Fat-soluble', 'A, D, E, K', 'Yes (liver, adipose tissue)'], ['Water-soluble', 'B group, C', 'No (except B₁₂)']], 'Table of fat-soluble and water-soluble vitamins and whether they are stored'),
      [3, 4],
    ),
    sec(
      '5. Nucleic acids and hormones',
      r`**Nucleic acids** are polymers of **nucleotides**. Nucleoside = base + pentose sugar; nucleotide = nucleoside + phosphate (at C5′). Nucleotides are joined by **phosphodiester** links (C5′ of one sugar to C3′ of the next).
- **DNA:** 2-deoxy-D-ribose; bases A, G, C, T; **double helix** of two antiparallel complementary strands; A pairs with T (two H-bonds), G with C (three H-bonds), so %A = %T and %G = %C.
- **RNA:** D-ribose; bases A, G, C, **U**; usually single-stranded; three types — mRNA (message), tRNA (carries amino acids), rRNA (in ribosomes).

**Functions:** DNA stores hereditary information and **replicates**; RNA directs **protein synthesis** (transcription to mRNA, translation at ribosomes).

**Hormones** are chemical messengers from endocrine glands, carried in blood: **steroids** (oestrogen, testosterone, glucocorticoids), **polypeptides** (insulin, glucagon), **amino acid derivatives** (adrenaline, thyroxine). Insulin lowers and glucagon raises blood glucose; thyroxine controls metabolic rate (iodine deficiency → goitre, hypothyroidism); adrenaline drives the fight-or-flight response; sex hormones control sexual development.`,
      [kt('Nucleotide', 'A unit of a nucleic acid: a nitrogenous base, a pentose sugar and a phosphate group.'), kt('Complementary base pairing', 'A pairs with T (or U in RNA) and G pairs with C, by hydrogen bonds.'), kt('Hormone', 'A chemical messenger secreted by an endocrine gland into the blood to act on a target organ.')],
      [],
      V.dna,
      [5, 6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling sucrose a reducing sugar, or forgetting to explain why it is non-reducing (both anomeric carbons in the glycosidic bond).
- Writing that cellulose is made of α-glucose (it is β-glucose).
- Calling α- and β-glucose enantiomers (they are anomers, differing only at C1).
- Saying denaturation breaks peptide bonds (primary structure is unchanged).
- Putting thymine in RNA or ribose in DNA.
- Listing vitamin C as fat-soluble.

**How marks are usually awarded**
- 1-mark items: a name, linkage, vitamin–disease pair or base pair.
- Structure evidence (2–3 marks): reagent, product and the feature it proves.
- Comparisons (2–3 marks): one mark per correct point of difference (DNA/RNA, fibrous/globular, starch/cellulose).
- Calculations: base percentages, number of peptide bonds or water molecules, glucose units in a polysaccharide.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What are carbohydrates?', 'Polyhydroxy aldehydes or ketones, or compounds that give these on hydrolysis.', 'definition', 1),
    fc(2, 'Glucose is classified as…?', 'An aldohexose (aldehyde group, six carbons).', 'fact', 1),
    fc(3, 'Glucose + HI (prolonged heating) shows…?', 'n-Hexane forms: the six carbons are in a straight chain.', 'concept', 1),
    fc(4, 'Glucose + bromine water shows…?', 'Gluconic acid forms with no carbon lost: the carbonyl is an aldehyde.', 'concept', 1),
    fc(5, 'Glucose pentaacetate shows…?', 'Five –OH groups.', 'fact', 1),
    fc(6, 'What does D mean in D-glucose?', 'The –OH on C5 (lowest chiral carbon) is on the right, as in D-glyceraldehyde.', 'definition', 1),
    fc(7, 'Which facts the open chain cannot explain?', 'No Schiff’s test, no NaHSO₃ adduct, pentaacetate does not react with NH₂OH, two forms α and β.', 'concept', 1),
    fc(8, 'What are anomers?', 'Ring forms differing only at the anomeric carbon (C1 in glucose), e.g. α- and β-glucose.', 'definition', 1),
    fc(9, 'Mutarotation?', 'Slow change in optical rotation of α- or β-glucose in water to an equilibrium value.', 'definition', 1),
    fc(10, 'Ring size of glucose and fructose?', 'Glucose: six-membered (pyranose). Fructose: five-membered (furanose).', 'fact', 1),
    fc(11, 'Why is sucrose non-reducing?', 'Both reducing carbons (glucose C1, fructose C2) are used in the glycosidic bond.', 'concept', 1),
    fc(12, 'What is invert sugar?', 'The laevorotatory 1 : 1 glucose–fructose mixture formed by hydrolysing dextrorotatory sucrose.', 'definition', 1),
    fc(13, 'Units in maltose and lactose?', 'Maltose: two α-glucose (C1–C4). Lactose: β-galactose + glucose (C1–C4).', 'fact', 1),
    fc(14, 'Amylose vs amylopectin?', 'Amylose: unbranched α-1,4, water-soluble (15–20%). Amylopectin: branched by α-1,6 links (80–85%).', 'concept', 1),
    fc(15, 'Why can’t humans digest cellulose?', 'Its β-1,4 glycosidic links are not broken by human digestive enzymes.', 'concept', 1),
    fc(16, 'Mass of one glucose unit in a polysaccharide?', '162 g/mol (180 − 18 for the water lost).', 'formula', 1),
    fc(17, 'What is a zwitterion?', 'A dipolar ion, H₃N⁺–CHR–COO⁻, formed by an amino acid in water.', 'definition', 2),
    fc(18, 'Essential amino acids?', 'Those the body cannot make, so they must be in the diet (e.g. valine, lysine).', 'definition', 2),
    fc(19, 'Peptide bonds in a chain of n amino acids?', 'n − 1 (and n − 1 water molecules lost).', 'formula', 2),
    fc(20, 'Four levels of protein structure?', 'Primary (sequence), secondary (α-helix, β-sheet), tertiary (3D fold), quaternary (subunits).', 'concept', 2),
    fc(21, 'Fibrous vs globular protein?', 'Fibrous: insoluble, parallel chains (keratin). Globular: soluble, compact (insulin, albumin).', 'example', 2),
    fc(22, 'What survives denaturation?', 'The primary structure (peptide bonds); secondary and tertiary structure are lost.', 'concept', 2),
    fc(23, 'How do enzymes speed up reactions?', 'They lower the activation energy; they are specific and work under mild conditions.', 'concept', 3),
    fc(24, 'Invertase catalyses…?', 'Hydrolysis of sucrose to glucose and fructose.', 'example', 3),
    fc(25, 'Fat-soluble vitamins?', 'A, D, E, K.', 'fact', 4),
    fc(26, 'Deficiency of B₁, C and D?', 'B₁: beriberi. C: scurvy. D: rickets.', 'fact', 4),
    fc(27, 'Nucleoside vs nucleotide?', 'Nucleoside = base + sugar. Nucleotide = nucleoside + phosphate.', 'definition', 5),
    fc(28, 'DNA vs RNA (sugar and bases)?', 'DNA: deoxyribose; A, G, C, T. RNA: ribose; A, G, C, U.', 'concept', 5),
    fc(29, 'Base pairing in DNA?', 'A–T (two H-bonds), G–C (three H-bonds); so %A = %T, %G = %C.', 'fact', 5),
    fc(30, 'Insulin vs glucagon?', 'Insulin lowers blood glucose; glucagon raises it (both from the pancreas).', 'fact', 6),
    fc(31, 'Thyroxine?', 'Iodine-containing hormone of the thyroid; controls metabolic rate. Lack: goitre, hypothyroidism.', 'fact', 6),
    fc(32, 'Exam tip: anomers', 'α- and β-glucose are anomers, not enantiomers; they differ only at C1.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
