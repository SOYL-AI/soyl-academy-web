// ISC 12 Chemistry ch22 Proteins, Vitamins and Nucleic Acids — two decks: Part 1 (t01–t03) amino acids, zwitter ion
// and isoelectric point, peptide bond, protein classes and the four levels of structure (definitions only),
// denaturation, enzymes and hormones; Part 2 (t04–t05) vitamins and nucleic acids (no vitamin or nucleic-acid
// chemical structures: removed topics).
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { PEPTIDE, DNA } from './svgs.mjs';

const V = {
  peptide: svgV(PEPTIDE, 'Two amino acids joining: the carboxyl group of the first and the amino group of the second lose a water molecule, leaving a peptide bond CO–NH between them'),
  dna: svgV(DNA, 'DNA as a twisted ladder: two sugar–phosphate backbones running in opposite directions, with base-pair rungs A–T held by two hydrogen bonds and G–C by three'),
};

export const deck1 = deck({
  part: 1,
  title: 'Proteins, Vitamins and Nucleic Acids — Part 1: Amino acids and proteins',
  goals: [
    'Classify amino acids and draw the zwitter ion of an amino acid',
    'Explain the isoelectric point and predict the charge of an amino acid at a given pH',
    'Show the formation of a peptide bond and define the four levels of protein structure',
    'Explain denaturation and state the roles of enzymes and hormones',
  ],
  slides: [
    sl('title', 'Molecules of life', {
      b: 'Part 1 — from the twenty amino acids to the proteins they build: hair, muscle, enzymes and hormones.',
      v: table(['Protein', 'Where it works', 'Job'], [['Keratin', 'Hair, nails', 'Structure'], ['Haemoglobin', 'Red blood cells', 'Carries oxygen'], ['Pepsin', 'Stomach', 'Digests proteins'], ['Insulin', 'Blood', 'Hormone: lowers blood glucose'], ['Antibodies', 'Blood', 'Defence']], 'Table of five proteins, where each works and its job'),
      n: 'Namaste! Your hair, your muscles, the enzymes that digest your food and the insulin that controls your blood sugar are all proteins. Every one of them is a chain built from just twenty kinds of amino acid. In this part we meet the amino acids, link them into proteins, and see what happens when a protein loses its shape.',
    }),
    sl('concept', 'Amino acids and their classification', {
      b: 'Proteins are built from **α-amino acids**, H₂N–CH(R)–COOH: the –NH₂ and –COOH groups are on the same carbon. Except **glycine** (R = H), all are chiral and occur as the **L**-form. **By diet:** **essential** amino acids cannot be made in the body and must come from food (e.g. valine, leucine, lysine, phenylalanine, tryptophan); **non-essential** ones can be made (glycine, alanine, glutamic acid). **By groups:** **neutral** (one –NH₂, one –COOH), **acidic** (extra –COOH), **basic** (extra –NH₂).',
      v: table(['Class', 'Example', 'Side chain R'], [['Neutral', 'Glycine', '–H'], ['Neutral', 'Alanine', '–CH₃'], ['Acidic', 'Aspartic acid', '–CH₂COOH'], ['Acidic', 'Glutamic acid', '–CH₂CH₂COOH'], ['Basic', 'Lysine', '–(CH₂)₄NH₂']], 'Table of neutral, acidic and basic amino acids with examples and side chains'),
      n: 'An alpha amino acid has an amino group and a carboxyl group on the same carbon atom, together with a side chain that differs from one amino acid to the next. All except glycine are chiral. Essential amino acids must come from our food because the body cannot make them; non-essential ones can be made in the body. Amino acids are also neutral, acidic or basic, depending on whether they have an extra acid or amino group.',
    }),
    sl('concept', 'The zwitter ion', {
      b: 'In the solid and in water, the acidic –COOH gives H⁺ to the basic –NH₂ of the same molecule, forming a **dipolar ion (zwitter ion)**, H₃N⁺–CH(R)–COO⁻. This explains the salt-like properties: **high melting points** (with decomposition), **solubility in water** but not in non-polar solvents, and **amphoteric** behaviour — –COO⁻ accepts H⁺ from acids, –NH₃⁺ gives H⁺ to bases.',
      m: [r`\ce{H3N+CH2COO- + H+ -> H3N+CH2COOH}`, r`\ce{H3N+CH2COO- + OH- -> H2NCH2COO- + H2O}`],
      v: flow('LR', [['a', 'H₃N⁺CH₂COOH (acid: cation)'], ['b', 'H₃N⁺CH₂COO⁻ (zwitter ion)'], ['c', 'H₂NCH₂COO⁻ (alkali: anion)']], [['b', 'a', '+ H⁺'], ['b', 'c', '+ OH⁻']], 'Flow showing the glycine zwitter ion gaining a proton in acid to form a cation and losing a proton in alkali to form an anion'),
      n: 'Inside a single amino acid molecule, the acid group hands a proton to the amino group. The result is a zwitter ion, which carries both a positive and a negative charge but is neutral overall. Because it is really a salt, an amino acid has a high melting point and dissolves in water rather than in benzene. It also reacts with both acids and bases, so it is amphoteric.',
    }),
    sl('concept', 'Isoelectric point', {
      b: 'The **isoelectric point (pI)** is the pH at which an amino acid exists mainly as the zwitter ion, has **no net charge** and does **not move** in an electric field. Below its pI an amino acid is mainly a **cation** (moves to the cathode); above its pI it is mainly an **anion** (moves to the anode). For a neutral amino acid, pI is the average of the two pKa values.',
      v: table(['Amino acid', 'Type', 'Approximate pI'], [['Glutamic acid', 'Acidic', '3.2'], ['Glycine', 'Neutral', '6.0'], ['Alanine', 'Neutral', '6.0'], ['Lysine', 'Basic', '9.7']], 'Table of four amino acids with their type and approximate isoelectric point'),
      n: 'Every amino acid has a particular pH, its isoelectric point, at which it is almost entirely the zwitter ion and does not move when a voltage is applied. In more acidic solutions it picks up a proton and becomes positive, so it moves towards the cathode. In more alkaline solutions it loses a proton and becomes negative. Acidic amino acids have low isoelectric points and basic ones high.',
    }),
    sl('example', 'Worked example: which way does it move?', {
      b: r`**Problem.** A mixture of glutamic acid (pI 3.2), glycine (pI 6.0) and lysine (pI 9.7) is placed in a buffer of pH 6.0 between two electrodes. Predict the movement of each.

**Glutamic acid:** pH 6.0 > pI → net negative → moves to the **anode**.

**Glycine:** pH = pI → no net charge → **stays** in place.

**Lysine:** pH 6.0 < pI → net positive → moves to the **cathode**.

This is the basis of **electrophoresis**, used to separate amino acids and proteins.`,
      v: table(['Amino acid', 'pI', 'Charge at pH 6.0', 'Moves to'], [['Glutamic acid', '3.2', 'Negative', 'Anode'], ['Glycine', '6.0', 'Zero', 'Stays'], ['Lysine', '9.7', 'Positive', 'Cathode']], 'Table predicting the charge and direction of movement of three amino acids at pH 6'),
      n: 'Compare the pH of the buffer with each isoelectric point. Glutamic acid sits in a solution more alkaline than its isoelectric point, so it is negative and moves to the anode. Glycine is at its isoelectric point and stays put. Lysine is in a solution more acidic than its isoelectric point, so it is positive and moves to the cathode. This separation is called electrophoresis.',
    }),
    sl('check', 'Quick check: amino acids', {
      b: 'Identify the form of an amino acid at a given pH.',
      n: 'Quick check. At the isoelectric point both groups are ionised and the net charge is zero.',
      chk: 'zwitter-mcq',
    }),
    sl('diagram', 'The peptide bond', {
      b: 'The –COOH of one amino acid condenses with the –NH₂ of the next, losing H₂O, to form an amide link, **–CO–NH–**, called a **peptide bond**. Two amino acids give a **dipeptide**, three a tripeptide; many give a **polypeptide**. A chain of n amino acids has **n − 1** peptide bonds. The chain has a free –NH₂ (**N-terminal**, written on the left) and a free –COOH (**C-terminal**, on the right).',
      m: [r`\ce{H2NCH2COOH + H2NCH(CH3)COOH -> H2NCH2CONHCH(CH3)COOH + H2O}`],
      v: V.peptide,
      n: 'When the acid group of one amino acid reacts with the amino group of another, a molecule of water is lost and an amide link forms between them. In proteins this link is called a peptide bond. Two amino acids make a dipeptide, and many make a polypeptide. A chain of n amino acids has one fewer peptide bond than it has amino acids. By convention the end with the free amino group is written on the left.',
    }),
    sl('example', 'Worked example: a tripeptide', {
      b: r`**Problem.** Glycine ($M = 75$), alanine ($M = 89$) and valine ($M = 117$) join to form the tripeptide Gly–Ala–Val. (a) How many peptide bonds and water molecules are involved? (b) What is the molar mass of the tripeptide? (c) How many different tripeptides can be made using each of the three amino acids once?

**(a)** 3 − 1 = **2** peptide bonds and **2** molecules of $\ce{H2O}$ released.

**(b)** $M = 75 + 89 + 117 - 2 \times 18 = 245\ \text{g mol}^{-1}$.

**(c)** $3 \times 2 \times 1 = 6$ sequences (Gly–Ala–Val, Gly–Val–Ala, Ala–Gly–Val, …).`,
      v: table(['Quantity', 'Value'], [['Peptide bonds', '2'], ['Water lost', '2 × 18 g mol⁻¹'], ['Molar mass', '245 g mol⁻¹'], ['Possible sequences', '6']], 'Table of answers for the tripeptide example'),
      n: 'Three amino acids are joined by two peptide bonds, and each bond releases one water molecule. So the molar mass of the tripeptide is the sum of the three amino acids minus two waters, which gives two hundred and forty five. Since the order matters, three different amino acids can be arranged in six different sequences, each a different tripeptide.',
    }),
    sl('check', 'Quick check: peptide bonds', {
      b: 'Locate the peptide bond in a dipeptide.',
      n: 'Quick check. The peptide bond joins the acid group of one unit to the amino group of the next.',
      chk: 'peptidebond-mcq',
    }),
    sl('concept', 'Proteins: classes and levels of structure', {
      b: '**Fibrous** proteins: long parallel chains held by hydrogen and disulfide bonds; insoluble; structural (keratin, collagen, myosin). **Globular** proteins: chains folded into compact, roughly spherical shapes; water-soluble; functional (insulin, albumin, enzymes). **Levels of structure (definitions):** **primary** — the sequence of amino acids; **secondary** — regular folding of the chain into an α-helix or β-pleated sheet, held by hydrogen bonds; **tertiary** — the overall three-dimensional folding of one chain; **quaternary** — the arrangement of two or more polypeptide subunits (haemoglobin has four).',
      v: table(['Level', 'Defined as', 'Example'], [['Primary', 'Sequence of amino acids', 'The 51 residues of insulin in order'], ['Secondary', 'α-Helix or β-pleated sheet (H-bonds)', 'α-Helix in keratin of hair'], ['Tertiary', 'Overall 3D folding of a chain', 'Compact shape of myoglobin'], ['Quaternary', 'Arrangement of subunits', 'Four subunits of haemoglobin']], 'Table defining the four levels of protein structure with an example of each'),
      n: 'Fibrous proteins such as keratin have long chains lying side by side and are insoluble, so they build structures. Globular proteins such as insulin are folded into compact shapes and dissolve in water, so they can work in body fluids. Protein structure is described at four levels: the sequence of amino acids, the regular helix or sheet, the overall folding of each chain, and the arrangement of several chains together.',
    }),
    sl('concept', 'Denaturation', {
      b: 'When a globular protein is exposed to **heat**, a **change of pH**, **alcohol** or **heavy-metal ions**, its hydrogen bonds and other interactions break, so the **secondary and tertiary** (and quaternary) structure is lost. The **primary structure (peptide bonds) remains**. The protein becomes insoluble and **loses its biological activity**. Examples: coagulation of egg white on boiling; curdling of milk as lactic acid forms; 70% alcohol killing bacteria.',
      v: flow('LR', [['a', 'Native protein (folded, active)'], ['b', 'Heat, acid or alkali, alcohol, Hg²⁺/Pb²⁺'], ['c', 'Denatured protein (unfolded, inactive)']], [['a', 'b'], ['b', 'c', 'H-bonds broken; peptide bonds intact']], 'Flow of denaturation from a folded active protein to an unfolded inactive one'),
      n: 'A protein works only when it is folded into the right shape. Heat, strong acids or alkalis, alcohol and heavy metal ions break the hydrogen bonds and other forces that hold this shape. The chain unfolds and the protein loses its activity, although the sequence of amino acids is not changed. Boiled egg white, sour milk and alcohol disinfectants are all examples of denaturation.',
    }),
    sl('concept', 'Enzymes and hormones', {
      b: '**Enzymes** are biological catalysts, almost all **globular proteins**. They are **highly specific**, very efficient, and work best at about body temperature and an **optimum pH**; they lower the activation energy. Examples: invertase (sucrose → glucose + fructose), maltase, pepsin (proteins → peptides), urease (urea → NH₃ + CO₂). **Hormones** are chemical messengers made by endocrine glands and carried in the blood: **insulin** (lowers blood glucose), **glucagon** (raises it), **thyroxine** (controls metabolic rate; contains iodine), **adrenaline** (emergency response), and steroid sex hormones.',
      m: [r`\ce{NH2CONH2 + H2O ->[urease] 2NH3 + CO2}`],
      v: table(['Substance', 'Type', 'Role'], [['Urease', 'Enzyme', 'Hydrolyses urea'], ['Pepsin', 'Enzyme', 'Hydrolyses proteins (stomach)'], ['Insulin', 'Hormone (pancreas)', 'Lowers blood glucose'], ['Glucagon', 'Hormone (pancreas)', 'Raises blood glucose'], ['Thyroxine', 'Hormone (thyroid)', 'Controls metabolic rate']], 'Table of two enzymes and three hormones with their roles'),
      n: 'Enzymes are the catalysts of living cells, and nearly all are globular proteins. Each acts on one particular substance or reaction, and each works best at a certain temperature and pH. Urease, for example, breaks down urea into ammonia and carbon dioxide. Hormones are chemical messengers released by glands into the blood. Insulin lowers blood sugar, glucagon raises it, and thyroxine controls the rate of metabolism.',
    }),
    sl('check', 'Quick check: denaturation and enzymes', {
      b: 'Decide what denaturation changes and what it leaves intact.',
      n: 'Quick check. Denaturation unfolds the chain but does not break peptide bonds.',
      chk: 'alcohol-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'α-Amino acids H₂N–CH(R)–COOH: essential or non-essential; neutral, acidic or basic; all chiral except glycine.',
        'Zwitter ion H₃N⁺–CH(R)–COO⁻: high m.p., water-soluble, amphoteric; no net charge at the isoelectric point.',
        'Peptide bond –CO–NH–; n amino acids → n − 1 bonds; fibrous vs globular proteins.',
        'Primary (sequence), secondary (helix, sheet), tertiary (folding), quaternary (subunits).',
        'Denaturation destroys 2°/3° structure, not 1°; enzymes are specific protein catalysts; hormones are chemical messengers.',
      ],
      v: table(['Idea', 'Key point'], [['Zwitter ion', 'Both groups ionised'], ['pI', 'No net charge'], ['Peptide bond', '–CO–NH–'], ['Denaturation', 'Loss of shape and activity']], 'Summary table of four key ideas from Part 1'),
      n: 'Let us sum up Part 1. Amino acids exist as zwitter ions, which explains their salt-like and amphoteric properties, and each has an isoelectric point. Peptide bonds join them into polypeptides and proteins, whose structure is described at four levels. Denaturation unfolds a protein without breaking its peptide bonds. Enzymes are protein catalysts, and hormones are chemical messengers.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Draw the zwitter ion with both charges shown: H₃N⁺ and COO⁻.',
        'Below pI → cation → cathode; above pI → anion → anode.',
        'For a peptide, mark the –CO–NH– bond and write the N-terminal residue first.',
        'Denaturation never changes the amino acid sequence.',
      ],
      v: table(['Slip', 'Fix'], [['Zwitter ion has net charge', 'Net charge is zero'], ['n amino acids, n peptide bonds', 'n − 1 bonds'], ['Denaturation breaks peptide bonds', 'Only H-bonds and other interactions']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. When you draw a zwitter ion, show both charges. Link pH to charge carefully: below the isoelectric point the amino acid is positive. A chain of n amino acids has one fewer peptide bond than amino acids. And remember that denaturation changes the shape of a protein, never its sequence.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Proteins, Vitamins and Nucleic Acids — Part 2: Vitamins and nucleic acids',
  goals: [
    'Classify vitamins A, B, C, D, E and K as fat-soluble or water-soluble',
    'Match each vitamin with its main function and deficiency disease',
    'Name the purine and pyrimidine bases and describe the DNA double helix',
    'Compare DNA and RNA in sugar, bases, structure and function',
  ],
  slides: [
    sl('title', 'Small needs, big effects', {
      b: 'Part 2 — vitamins, needed in tiny amounts, and the nucleic acids that carry the instructions for every protein.',
      v: flow('LR', [['a', 'DNA (genes)'], ['b', 'RNA (messages)'], ['c', 'Proteins (enzymes)'], ['d', 'Need vitamins to work']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from DNA to RNA to proteins, many of which need vitamins to function'),
      n: 'In Part 2 we look at vitamins, which the body needs only in small amounts but cannot do without, and at the nucleic acids. DNA stores the instructions for making every protein, and RNA carries those instructions out. Many of the enzymes made this way need vitamins to work.',
    }),
    sl('concept', 'Vitamins: fat-soluble and water-soluble', {
      b: '**Vitamins** are organic compounds needed in **small amounts** in the diet for normal growth and health; most cannot be made in the body. **Fat-soluble: A, D, E, K** — stored in the liver and fatty tissue, so large excesses can be harmful. **Water-soluble: B group and C** — not stored (excess is excreted in urine), so they must be supplied **regularly**; they are also easily lost when vegetables are boiled and the water discarded. (Vitamin B₁₂ is an exception: it is stored in the liver.)',
      v: table(['Group', 'Vitamins', 'Storage', 'Supply'], [['Fat-soluble', 'A, D, E, K', 'Liver and fatty tissue', 'Excess can accumulate'], ['Water-soluble', 'B group, C', 'Not stored (except B₁₂)', 'Needed regularly']], 'Table comparing fat-soluble and water-soluble vitamins by members, storage and supply'),
      n: 'Vitamins are organic substances we need in tiny amounts. They fall into two groups. Vitamins A, D, E and K dissolve in fat and are stored in the liver and fatty tissue, so we do not need them every day, and too much can build up and cause harm. The B vitamins and vitamin C dissolve in water and are passed out in urine, so they must be eaten regularly.',
    }),
    sl('concept', 'Functions and deficiency diseases', {
      b: 'Each vitamin has characteristic sources and a characteristic deficiency disease.',
      v: table(['Vitamin', 'Good sources', 'Deficiency disease or symptom'], [['A', 'Carrots, fish-liver oil, milk', 'Night blindness, xerophthalmia (hardening of cornea)'], ['B₁', 'Whole cereals, yeast, milk', 'Beriberi (loss of appetite, retarded growth)'], ['B₂', 'Milk, egg white, liver', 'Cheilosis (cracked lips), digestive disorders'], ['B₆', 'Yeast, cereals, egg yolk', 'Convulsions'], ['B₁₂', 'Meat, fish, eggs, curd', 'Pernicious anaemia'], ['C', 'Citrus fruits, amla, green leafy vegetables', 'Scurvy (bleeding gums)'], ['D', 'Sunlight on skin, fish, egg yolk', 'Rickets in children, osteomalacia in adults'], ['E', 'Vegetable oils, sunflower seeds', 'Fragile red blood cells, muscular weakness'], ['K', 'Green leafy vegetables', 'Increased blood-clotting time']], 'Table of vitamins A, B1, B2, B6, B12, C, D, E and K with sources and deficiency diseases'),
      n: 'This table links each vitamin to its sources and to the disease caused when it is missing. Lack of vitamin A causes night blindness. Shortage of the B vitamins causes beriberi, cracked lips, convulsions or pernicious anaemia. Lack of vitamin C causes scurvy, of vitamin D rickets, of vitamin E fragile red blood cells, and of vitamin K slow clotting of blood.',
    }),
    sl('check', 'Quick check: deficiency diseases', {
      b: 'Link a deficiency symptom with the vitamin.',
      n: 'Quick check. Think about which vitamin is needed for blood to clot.',
      chk: 'clot-mcq',
    }),
    sl('example', 'Worked example: diagnosing a deficiency', {
      b: r`**Problem.** Name the vitamin most likely to be lacking: (a) a sailor on a long voyage with only dried food develops swollen, bleeding gums; (b) a child kept indoors in a smoggy city has soft, bowed leg bones; (c) a patient whose wound keeps bleeding for a long time; (d) a strict vegan for many years becomes anaemic.

**(a)** Vitamin C — scurvy. **(b)** Vitamin D — rickets. **(c)** Vitamin K — slow clotting. **(d)** Vitamin B₁₂ — pernicious anaemia (found mainly in animal foods).`,
      v: table(['Case', 'Vitamin', 'Condition'], [['Sailor', 'C', 'Scurvy'], ['Indoor child', 'D', 'Rickets'], ['Slow-clotting wound', 'K', 'Clotting delay'], ['Long-term vegan', 'B₁₂', 'Pernicious anaemia']], 'Table matching four cases to the vitamin lacking and the condition'),
      n: 'Work from the symptom to the vitamin. Bleeding gums on a long voyage without fresh food point to scurvy and a lack of vitamin C. Soft, bent bones in a child who gets little sunlight point to rickets and vitamin D. Slow clotting points to vitamin K. And because vitamin B twelve comes mainly from animal foods, a strict vegan diet can lead to pernicious anaemia.',
    }),
    sl('check', 'Quick check: vitamin groups', {
      b: 'Sort vitamins into fat-soluble and water-soluble groups.',
      n: 'Quick check. Remember the four fat-soluble vitamins: A, D, E and K.',
      chk: 'vitgroup-mcq',
    }),
    sl('concept', 'Nucleic acids: nucleotides and bases', {
      b: '**Nucleic acids** (DNA and RNA) are polymers of **nucleotides**. Each nucleotide = **nitrogenous base + pentose sugar + phosphate**; base + sugar alone is a **nucleoside**. Nucleotides are joined through phosphate groups (phosphodiester links) into a sugar–phosphate backbone. **Sugar:** 2-deoxyribose in DNA, ribose in RNA. **Bases:** **purines** (two rings) — **adenine (A)** and **guanine (G)**, in both; **pyrimidines** (one ring) — **cytosine (C)** in both, **thymine (T)** in DNA only, **uracil (U)** in RNA only.',
      v: table(['Base', 'Type', 'In DNA?', 'In RNA?'], [['Adenine (A)', 'Purine', 'Yes', 'Yes'], ['Guanine (G)', 'Purine', 'Yes', 'Yes'], ['Cytosine (C)', 'Pyrimidine', 'Yes', 'Yes'], ['Thymine (T)', 'Pyrimidine', 'Yes', 'No'], ['Uracil (U)', 'Pyrimidine', 'No', 'Yes']], 'Table of the five nucleic-acid bases, purine or pyrimidine, and whether each occurs in DNA and RNA'),
      n: 'Nucleic acids are long chains of nucleotides. Each nucleotide has three parts: a nitrogen-containing base, a five-carbon sugar and a phosphate group. The sugar is deoxyribose in DNA and ribose in RNA. Adenine and guanine are the larger purine bases, found in both. Cytosine is a pyrimidine found in both, but thymine occurs only in DNA, and uracil takes its place in RNA.',
    }),
    sl('diagram', 'The DNA double helix', {
      b: 'Watson and Crick (1953): DNA is a **double helix** of two polynucleotide strands wound round a common axis, with the sugar–phosphate backbones outside and the bases inside. The strands are **antiparallel** and **complementary**: **A pairs with T** (two hydrogen bonds) and **G pairs with C** (three hydrogen bonds), always a purine with a pyrimidine. Hence in any double-stranded DNA, A = T and G = C (**Chargaff’s rule**).',
      v: V.dna,
      n: 'In nineteen fifty three Watson and Crick showed that DNA is a double helix, like a twisted ladder. The two sugar phosphate backbones form the sides and run in opposite directions. The rungs are pairs of bases held by hydrogen bonds: adenine always pairs with thymine through two hydrogen bonds, and guanine with cytosine through three. So the two strands are complementary, and the amounts of adenine and thymine are always equal.',
    }),
    sl('example', 'Worked example: base counting', {
      b: r`**Problem.** A double-stranded DNA molecule has 2000 base pairs and contains 560 adenine bases. How many (a) thymine, (b) cytosine and (c) guanine bases does it contain?

**(a)** T = A = **560**.

**(b)** Total bases $= 2 \times 2000 = 4000$; G + C $= 4000 - 2 \times 560 = 2880$; C $= 2880 \div 2 = 1440$.

**(c)** G = C = **1440**.`,
      v: table(['Base', 'Number'], [['Adenine', '560'], ['Thymine', '560'], ['Guanine', '1440'], ['Cytosine', '1440'], ['Total', '4000']], 'Table of the numbers of each base in a DNA molecule of 2000 base pairs'),
      n: 'Each base pair contains two bases, so two thousand pairs means four thousand bases. Thymine equals adenine, five hundred and sixty. Taking adenine and thymine away leaves two thousand eight hundred and eighty bases shared equally between guanine and cytosine, so each is one thousand four hundred and forty.',
    }),
    sl('check', 'Quick check: bases', {
      b: 'Classify bases as purines or pyrimidines.',
      n: 'Quick check. The purines are adenine and guanine.',
      chk: 'purine-mcq',
    }),
    sl('concept', 'RNA, and DNA compared with RNA', {
      b: '**RNA** is usually a **single strand**. Three main types work in protein synthesis: **messenger RNA (mRNA)** carries the coded message from DNA; **transfer RNA (tRNA)** brings amino acids to the ribosome; **ribosomal RNA (rRNA)** forms part of the ribosome. **DNA** stores hereditary information and **replicates** itself, so the information passes to daughter cells.',
      v: table(['Feature', 'DNA', 'RNA'], [['Sugar', '2-Deoxyribose', 'Ribose'], ['Bases', 'A, G, C, T', 'A, G, C, U'], ['Strands', 'Two (double helix)', 'Usually one'], ['Function', 'Stores genetic information; replication', 'Protein synthesis'], ['Location', 'Mainly in the nucleus', 'Nucleus and cytoplasm']], 'Table comparing DNA and RNA by sugar, bases, strands, function and location'),
      n: 'RNA is usually a single strand. Messenger RNA carries the coded instructions from DNA, transfer RNA brings the matching amino acids, and ribosomal RNA forms part of the ribosome where proteins are assembled. DNA is the long-term store of genetic information and can copy itself, so that each new cell receives the same instructions.',
    }),
    sl('example', 'Worked example: an RNA copy', {
      b: r`**Problem.** An RNA strand is copied from a DNA strand whose base sequence is T–A–C–C–G–A. (a) Write the RNA sequence. (b) Which base of the RNA has no partner base of the same name in DNA?

**(a)** Pair each DNA base: T → A, A → **U**, C → G, G → C. RNA: **A–U–G–G–C–U**.

**(b)** **Uracil**: RNA uses U where DNA uses T.`,
      v: table(['DNA base', 'RNA base'], [['T', 'A'], ['A', 'U'], ['C', 'G'], ['G', 'C']], 'Table of DNA bases and the RNA bases that pair with them'),
      n: 'RNA is built using the DNA strand as a template, following the pairing rules, except that RNA uses uracil wherever thymine would appear. So each adenine in DNA is matched by uracil in RNA, each thymine by adenine, each cytosine by guanine and each guanine by cytosine. The sequence T A C C G A gives the RNA A U G G C U.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Fat-soluble vitamins A, D, E, K are stored; water-soluble B and C must be supplied regularly.',
        'A: night blindness; B₁: beriberi; B₁₂: pernicious anaemia; C: scurvy; D: rickets; K: slow clotting.',
        'Nucleotide = base + sugar + phosphate; purines A, G; pyrimidines C, T (DNA), U (RNA).',
        'DNA: double helix, antiparallel complementary strands; A–T (2 H-bonds), G–C (3).',
        'RNA: single strand, ribose, uracil; mRNA, tRNA, rRNA in protein synthesis.',
      ],
      v: table(['Pair', 'H-bonds'], [['A–T', '2'], ['G–C', '3'], ['A–U (RNA)', '2']], 'Summary table of base pairs and hydrogen bonds'),
      n: 'Let us sum up Part 2. Vitamins A, D, E and K are fat-soluble and stored; the B vitamins and vitamin C are water-soluble and needed regularly. Each vitamin has its own deficiency disease. Nucleic acids are chains of nucleotides; DNA is a double helix held by base pairing, and RNA, with ribose and uracil, carries out protein synthesis.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Learn the vitamin–disease pairs as a table; most objective questions test them.',
        'Explain storage differences using solubility in fat or water.',
        'In base calculations, double the base-pair count to get total bases.',
        'Compare DNA and RNA on sugar, bases, strands and function — one mark each.',
      ],
      v: table(['Slip', 'Fix'], [['Vitamin C is fat-soluble', 'Water-soluble'], ['RNA contains thymine', 'Uracil'], ['A pairs with G', 'A–T, G–C']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Learn the vitamins and their deficiency diseases as a table. Explain storage in terms of whether the vitamin dissolves in fat or water. In base-counting problems, remember that each base pair contains two bases. And when comparing DNA with RNA, give the sugar, the bases, the number of strands and the function.',
    }),
  ],
});
