// ch10 Biomolecules — two decks: Part 1 (t01) carbohydrates; Part 2 (t02–t06) proteins, enzymes, vitamins,
// nucleic acids and hormones.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { GLUCOSE, PEPTIDE, DNA } from './svgs.mjs';

export const V = {
  glucose: svgV(GLUCOSE, 'Open-chain structure of D-glucose with six carbons, an aldehyde group at carbon 1, hydroxyl groups on carbons 2 to 6 and the carbon-5 hydroxyl on the right marking the D form'),
  peptide: svgV(PEPTIDE, 'Two amino acids losing a water molecule to form a dipeptide joined by a peptide bond, –CO–NH–'),
  dna: svgV(DNA, 'DNA drawn as a ladder of two backbones with base-pair rungs: adenine with thymine by two hydrogen bonds and guanine with cytosine by three'),
};

export const deck1 = deck({
  part: 1,
  title: 'Biomolecules — Part 1: Carbohydrates',
  goals: [
    'Classify carbohydrates as monosaccharides, oligosaccharides and polysaccharides, and as reducing or non-reducing sugars',
    'Describe the preparation and open-chain structure of glucose and the evidence for it',
    'Explain the cyclic structures of glucose and fructose and the idea of anomers',
    'Describe sucrose, maltose, lactose, starch, cellulose and glycogen and the importance of carbohydrates',
  ],
  slides: [
    sl('title', 'Biomolecules', {
      b: 'Part 1 — carbohydrates: the sugars and starches that fuel living things.',
      v: table(['Biomolecule', 'Example in your body or food'], [['Carbohydrates', 'Rice starch, cane sugar, glycogen in liver'], ['Proteins', 'Muscle, keratin in hair, enzymes'], ['Nucleic acids', 'DNA in chromosomes'], ['Vitamins', 'Vitamin C in amla and citrus fruits'], ['Hormones', 'Insulin, adrenaline']], 'Table of the main classes of biomolecules with examples'),
      n: 'Namaste! Living things are built from a few kinds of large molecules: carbohydrates, proteins, nucleic acids and lipids, helped by vitamins and hormones. The rice and roti we eat are mostly carbohydrate. In this part we study carbohydrates: how they are classified, the structure of glucose, and the sugars and starches made by joining glucose units together.',
    }),
    sl('concept', 'Classifying carbohydrates', {
      b: 'Carbohydrates are **polyhydroxy aldehydes or ketones**, or compounds that give them on hydrolysis. **Monosaccharides** cannot be hydrolysed further; **oligosaccharides** give 2–10 monosaccharide units; **polysaccharides** give many. Sugars that reduce Tollens’ or Fehling’s reagent are **reducing sugars**.',
      v: table(['Class', 'Example', 'Hydrolysis products', 'Reducing?'], [['Monosaccharide (aldose)', 'Glucose', 'None', 'Yes'], ['Monosaccharide (ketose)', 'Fructose', 'None', 'Yes'], ['Disaccharide', 'Sucrose', 'Glucose + fructose', 'No'], ['Disaccharide', 'Maltose', '2 glucose', 'Yes'], ['Disaccharide', 'Lactose', 'Galactose + glucose', 'Yes'], ['Polysaccharide', 'Starch, cellulose', 'Many glucose', 'No']], 'Table classifying carbohydrates with examples, hydrolysis products and whether they are reducing'),
      n: 'Carbohydrates are compounds with several hydroxyl groups and an aldehyde or ketone group, or compounds that give these on hydrolysis. Simple sugars like glucose and fructose cannot be broken into smaller sugars. Two units joined together make a disaccharide such as cane sugar, and long chains make polysaccharides like starch. Sugars with a free aldehyde or ketone group reduce Tollens’ and Fehling’s reagents.',
    }),
    sl('concept', 'Aldoses and ketoses', {
      b: 'Monosaccharides are named by the carbonyl group and the number of carbons: an **aldohexose** has an aldehyde group and six carbons (glucose); a **ketohexose** has a ketone group and six carbons (fructose).',
      v: table(['Carbon atoms', 'Aldose', 'Ketose'], [['3', 'Aldotriose (glyceraldehyde)', 'Ketotriose'], ['5', 'Aldopentose (ribose)', 'Ketopentose'], ['6', 'Aldohexose (glucose, galactose)', 'Ketohexose (fructose)']], 'Table of aldoses and ketoses with three, five and six carbon atoms and examples'),
      n: 'Simple sugars are named by two features: whether they carry an aldehyde or a ketone group, and how many carbon atoms they have. So glucose, with an aldehyde group and six carbons, is an aldohexose, and fructose, with a ketone group and six carbons, is a ketohexose. Ribose in RNA is an aldopentose, with five carbons.',
    }),
    sl('concept', 'Preparing glucose', {
      b: 'Glucose is made by boiling **sucrose** with dilute acid (giving glucose and fructose), or commercially by hydrolysing **starch** with dilute H₂SO₄ at 393 K under pressure.',
      m: [r`\ce{C12H22O11 + H2O ->[H+] C6H12O6 + C6H12O6}`, r`\ce{(C6H10O5)_{n} + nH2O ->[H+][393 K] nC6H12O6}`],
      v: flow('LR', [['a', 'Sucrose'], ['b', 'Glucose + fructose'], ['c', 'Starch'], ['d', 'Glucose']], [['a', 'b', 'dil. HCl, boil'], ['c', 'd', 'dil. H₂SO₄, 393 K, pressure']], 'Flow showing glucose made from sucrose by acid hydrolysis and from starch by acid hydrolysis under pressure'),
      n: 'Glucose occurs free in grapes and honey, but it is made by breaking down larger carbohydrates. Boiling cane sugar with dilute acid splits it into glucose and fructose. Industry hydrolyses starch from maize or potatoes with dilute sulfuric acid at about three hundred and ninety three kelvin under pressure.',
    }),
    sl('diagram', 'The open-chain structure of glucose', {
      b: 'Glucose, C₆H₁₂O₆, has a **straight chain of six carbons**, an **aldehyde group** at C1 and **five –OH groups** (four secondary, one primary). Its configuration is written **D** because the –OH on C5 is on the right, as in D-glyceraldehyde.',
      v: V.glucose,
      n: 'In its open-chain form, glucose has six carbon atoms in a row. Carbon one is an aldehyde group. Carbons two to five each carry a hydroxyl group, and carbon six is a CH two OH group. The letter D tells us that the hydroxyl on carbon five, the lowest chiral carbon, points to the right. The plus sign often written with it tells us that glucose rotates polarised light to the right.',
    }),
    sl('concept', 'Evidence for the open-chain structure', {
      b: 'Reactions of glucose reveal its structure.',
      v: table(['Reaction', 'Product', 'Shows'], [['Prolonged heating with HI', 'n-Hexane', 'Six carbons in a straight chain'], ['NH₂OH; HCN', 'Oxime; cyanohydrin', 'A carbonyl group'], ['Bromine water', 'Gluconic acid (C₆)', 'An aldehyde group (oxidised, no C lost)'], ['Ethanoic anhydride', 'Glucose pentaacetate', 'Five –OH groups'], ['Nitric acid', 'Saccharic acid (dicarboxylic)', 'A primary –OH (–CH₂OH)']], 'Table of reactions of glucose, their products and what each shows about its structure'),
      n: 'Chemists worked out glucose’s structure from its reactions. With hydrogen iodide it gives n-hexane, so the six carbons are in a straight chain. It forms an oxime and a cyanohydrin, so it has a carbonyl group. Mild oxidation by bromine water gives gluconic acid with the same six carbons, so the carbonyl is an aldehyde. Acetylation adds five acetyl groups, so there are five hydroxyl groups, and nitric acid oxidises the end CH two OH group too.',
    }),
    sl('example', 'Worked example: interpreting glucose reactions', {
      b: r`**Problem.** Explain what each observation tells us: (a) glucose gives a pentaacetate with ethanoic anhydride; (b) bromine water oxidises glucose to gluconic acid, $\ce{C6H12O7}$; (c) nitric acid gives saccharic acid, a dicarboxylic acid with six carbons.

**(a)** Five –OH groups, on different carbons (the compound is stable).

**(b)** The carbonyl group is an aldehyde (–CHO → –COOH with no loss of carbon).

**(c)** There is a primary alcohol group (–CH₂OH) at the other end, also oxidised to –COOH.`,
      v: flow('LR', [['a', 'CHO at C1'], ['b', 'COOH (gluconic acid)'], ['c', 'CH₂OH at C6'], ['d', 'COOH (saccharic acid, with C1 also COOH)']], [['a', 'b', 'Br₂ water'], ['c', 'd', 'HNO₃']], 'Flow showing bromine water oxidising only the aldehyde end and nitric acid oxidising both ends of glucose'),
      n: 'Each reaction answers one question. Five acetyl groups mean five hydroxyl groups. Bromine water is a mild oxidant that only attacks aldehydes, so getting an acid with the same carbon count proves an aldehyde group. Nitric acid is stronger and also oxidises the primary alcohol group at carbon six, giving an acid group at each end of the chain.',
    }),
    sl('check', 'Quick check: glucose structure', {
      b: 'Link a reaction of glucose to the structural feature it reveals.',
      n: 'Quick check. Ask which group in glucose each reagent attacks.',
      chk: 'glucose-evidence-mcq',
    }),
    sl('concept', 'The cyclic structure of glucose', {
      b: 'Some facts do **not** fit the open chain: glucose gives **no Schiff’s test** and no NaHSO₃ adduct, and its pentaacetate does not react with NH₂OH. Glucose exists mainly as a **six-membered ring** (pyranose) formed when the C5 –OH adds to the C1 aldehyde (a **hemiacetal**). This creates two forms, **α** and **β**, differing only at C1: they are **anomers**.',
      v: table(['Form', 'OH on C1', 'Melting point', 'Specific rotation'], [['α-D-Glucose', 'Same side as ring O–C5 in Fischer projection (down in Haworth)', '419 K', '+111°'], ['β-D-Glucose', 'Opposite side (up in Haworth)', '423 K', '+19.2°'], ['Equilibrium in water (mutarotation)', 'Both, with a trace of open chain', '—', '+52.5°']], 'Table comparing alpha and beta D-glucose by position of the C1 hydroxyl, melting point and specific rotation, and their equilibrium in water'),
      n: 'The open-chain structure cannot explain everything. Glucose does not give some typical aldehyde tests, and its pentaacetate has no free aldehyde group. The answer is that the hydroxyl group on carbon five adds to the aldehyde group, closing a six-membered ring. The new hydroxyl on carbon one can point either way, giving alpha and beta glucose, called anomers. In water they slowly interconvert, a change in rotation called mutarotation.',
    }),
    sl('concept', 'Fructose', {
      b: '**Fructose**, C₆H₁₂O₆, is a **ketohexose** (C=O at C2), **laevorotatory** (D-(−)-fructose). It forms a five-membered ring (**furanose**) by addition of the C5 –OH to the C2 ketone group. It is a reducing sugar and is the sweetest natural sugar.',
      v: table(['Feature', 'Glucose', 'Fructose'], [['Type', 'Aldohexose', 'Ketohexose'], ['Carbonyl position', 'C1', 'C2'], ['Ring size', 'Six (pyranose)', 'Five (furanose)'], ['Rotation', 'Dextrorotatory (+)', 'Laevorotatory (−)'], ['Reducing sugar?', 'Yes', 'Yes']], 'Table comparing glucose and fructose by type, carbonyl position, ring size, rotation and reducing power'),
      n: 'Fructose has the same formula as glucose, but its carbonyl group is a ketone at carbon two. In solution it closes a five-membered ring rather than a six-membered one. It rotates plane-polarised light to the left, so it is called laevulose, and it is the sweetest of the natural sugars, found in fruit and honey. It still reduces Fehling’s solution.',
    }),
    sl('concept', 'Disaccharides', {
      b: 'Two monosaccharides join by a **glycosidic linkage** (an ether link, with loss of water). Whether the disaccharide is **reducing** depends on whether a free hemiacetal group remains.',
      v: table(['Disaccharide', 'Units and linkage', 'Reducing?', 'Source'], [['Sucrose', 'α-D-glucose C1 – β-D-fructose C2', 'No (both reducing groups used)', 'Cane sugar, beet'], ['Maltose', 'Two α-D-glucose, C1 – C4', 'Yes', 'From starch by diastase'], ['Lactose', 'β-D-galactose C1 – D-glucose C4', 'Yes', 'Milk sugar']], 'Table of sucrose, maltose and lactose with their units, glycosidic linkages, reducing power and sources'),
      n: 'When two sugar units join, they lose a water molecule and form a glycosidic linkage. In sucrose, the link joins carbon one of glucose to carbon two of fructose, using up both reducing groups, so sucrose is a non-reducing sugar. In maltose and lactose, the link leaves one sugar unit with a free hemiacetal group, so they are reducing sugars. Lactose is the sugar of milk.',
    }),
    sl('concept', 'Invert sugar', {
      b: 'Sucrose is **dextrorotatory** (+66.5°). On hydrolysis it gives equal amounts of glucose (+52.5°) and fructose (−92.4°); the mixture is **laevorotatory**, so the sign of rotation is **inverted** — the product is called **invert sugar**.',
      v: table(['Substance', 'Specific rotation'], [['Sucrose', '+66.5°'], ['D-Glucose (equilibrium)', '+52.5°'], ['D-Fructose', '−92.4°'], ['Invert sugar (1 : 1)', 'Negative (about −20°)']], 'Table of specific rotations of sucrose, glucose, fructose and invert sugar'),
      n: 'Cane sugar turns polarised light to the right. When it is hydrolysed, the glucose formed turns light to the right, but the fructose turns it to the left more strongly. So the mixture turns light to the left: the direction of rotation has been inverted. That is why the product is called invert sugar; it is what makes honey and many syrups stay smooth.',
    }),
    sl('example', 'Worked example: why sucrose is non-reducing', {
      b: r`**Problem.** Sucrose does not reduce Fehling’s solution, but after boiling with dilute HCl the solution does. Explain.

**Step 1.** In sucrose, C1 of glucose and C2 of fructose — both reducing (hemiacetal or hemiketal) carbons — are used in the glycosidic bond, so no free carbonyl is available.

**Step 2.** Acid hydrolysis breaks the glycosidic bond: $\ce{C12H22O11 + H2O -> C6H12O6 + C6H12O6}$.

**Step 3.** Free glucose and fructose are reducing sugars, so Fehling’s test is now positive.`,
      v: flow('LR', [['a', 'Sucrose: no free C=O'], ['b', 'Boil with dil. HCl'], ['c', 'Glucose + fructose (free hemiacetals)'], ['d', 'Fehling’s positive']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow explaining why sucrose becomes reducing after acid hydrolysis'),
      n: 'Sucrose cannot reduce Fehling’s solution because its two reducing carbons are locked together in the glycosidic link. Boiling with acid breaks that link and releases glucose and fructose, each with a group that can open to a carbonyl. So after hydrolysis the solution gives a red precipitate with Fehling’s solution.',
    }),
    sl('check', 'Quick check: reducing sugars', {
      b: 'Identify which sugar is non-reducing.',
      n: 'Quick check. Look for the sugar in which both reducing carbons are used in the glycosidic bond.',
      chk: 'nonreducing-mcq',
    }),
    sl('concept', 'Polysaccharides', {
      b: '**Starch** (plants’ store): **amylose** (15–20%, unbranched α-1,4 chains, water-soluble, blue with iodine) and **amylopectin** (80–85%, α-1,4 chains branched by α-1,6 links). **Cellulose** (plant cell walls): unbranched chains of **β**-glucose (β-1,4); humans cannot digest it. **Glycogen** (animal starch): like amylopectin but more highly branched, stored in liver and muscle.',
      v: table(['Polysaccharide', 'Monomer and linkage', 'Branching', 'Role'], [['Amylose', 'α-D-glucose, C1–C4', 'None', 'Energy store (plants)'], ['Amylopectin', 'α-D-glucose, C1–C4 and C1–C6', 'Branched', 'Energy store (plants)'], ['Cellulose', 'β-D-glucose, C1–C4', 'None', 'Structure (cell walls)'], ['Glycogen', 'α-D-glucose, C1–C4 and C1–C6', 'Highly branched', 'Energy store (animals)']], 'Table of amylose, amylopectin, cellulose and glycogen with monomer, linkage, branching and role'),
      n: 'Polysaccharides are long chains of glucose units. Starch, the energy store of plants, is a mixture of unbranched amylose and branched amylopectin, both made of alpha glucose. Cellulose, which makes plant cell walls and cotton, is built from beta glucose; our digestive enzymes cannot break those beta links, so cellulose is roughage for us. Animals store glucose as glycogen, which is even more branched than amylopectin.',
    }),
    sl('example', 'Worked example: counting glucose units', {
      b: r`**Problem.** A sample of amylose has a molar mass of $81000\ \text{g mol}^{-1}$. Estimate the number of glucose units, given that each unit in the chain is $\ce{C6H10O5}$ ($M = 162$).

**Step 1.** Each glucose joined into the chain has lost one $\ce{H2O}$: $180 - 18 = 162$.

**Step 2.** Number of units $= \dfrac{81000}{162} = 500$.`,
      v: table(['Quantity', 'Value'], [['Molar mass of glucose', '180 g/mol'], ['Mass of one chain unit', '162 g/mol'], ['Units in 81 000 g/mol chain', '500']], 'Table of glucose molar mass, chain-unit mass and number of units in the amylose sample'),
      n: 'When glucose molecules join, each link releases a water molecule, so each unit in the chain has a mass of one hundred and sixty two, not one hundred and eighty. Dividing the chain’s molar mass, eighty one thousand, by one hundred and sixty two gives about five hundred glucose units. Real starch chains are often much longer.',
    }),
    sl('check', 'Quick check: polysaccharides', {
      b: 'Distinguish starch, cellulose and glycogen by their linkages and branching.',
      n: 'Quick check. Recall which polysaccharide is made of beta glucose and which one is stored in animals.',
      chk: 'cellulose-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Carbohydrates: polyhydroxy aldehydes/ketones; mono-, oligo-, polysaccharides; reducing vs non-reducing.',
        'Glucose: aldohexose; open chain shown by HI, NH₂OH, Br₂ water, acetylation and HNO₃ reactions.',
        'Cyclic (pyranose) structure with α and β anomers; mutarotation.',
        'Fructose: ketohexose, furanose, laevorotatory.',
        'Sucrose (non-reducing, invert sugar), maltose and lactose (reducing).',
        'Starch (amylose + amylopectin), cellulose (β-1,4), glycogen (highly branched).',
      ],
      v: table(['Sugar', 'Reducing?'], [['Glucose, fructose', 'Yes'], ['Maltose, lactose', 'Yes'], ['Sucrose', 'No'], ['Starch, cellulose', 'No']], 'Summary table of reducing and non-reducing carbohydrates'),
      n: 'Let us sum up Part 1. Carbohydrates are polyhydroxy aldehydes or ketones. Glucose is an aldohexose whose structure was deduced from its reactions; it exists mainly as alpha and beta rings. Fructose is a ketohexose. Sucrose is non-reducing and gives invert sugar, while maltose and lactose are reducing. Starch and glycogen store energy, and cellulose builds plant cell walls.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Know which reaction proves which feature of glucose (HI → straight chain; Br₂ water → aldehyde).',
        'Anomers differ only at C1; they are not enantiomers.',
        'Sucrose is non-reducing because both anomeric carbons are in the glycosidic bond.',
        'Cellulose is β-1,4; starch and glycogen are α-linked.',
        'Each glucose unit in a polysaccharide has mass 162 (glucose − water).',
      ],
      v: table(['Slip', 'Fix'], [['Sucrose is a reducing sugar', 'It is non-reducing'], ['Cellulose is made of α-glucose', 'β-glucose'], ['Fructose is an aldose', 'It is a ketose']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Learn which reaction of glucose proves which part of its structure. Anomers differ only at carbon one. Explain the non-reducing nature of sucrose with the glycosidic bond. Remember that cellulose is made of beta glucose. And in calculations, use one hundred and sixty two for each glucose unit in a chain.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Biomolecules — Part 2: Proteins, enzymes, vitamins, nucleic acids and hormones',
  goals: [
    'Describe amino acids, the peptide bond and the four levels of protein structure, and explain denaturation',
    'Describe enzymes as biocatalysts',
    'Classify vitamins as fat- or water-soluble and link deficiencies to diseases',
    'Distinguish DNA and RNA in structure and function, and state the roles of important hormones',
  ],
  slides: [
    sl('title', 'Proteins and other biomolecules', {
      b: 'Part 2 — the molecules that build, run, inherit and signal in living cells.',
      v: flow('LR', [['a', 'Amino acids'], ['b', 'Peptides and proteins'], ['c', 'Enzymes (proteins that catalyse)'], ['d', 'Nucleic acids (DNA, RNA)'], ['e', 'Vitamins and hormones']], [['a', 'b'], ['b', 'c'], ['d', 'b', 'code for'], ['e', 'c', 'help']], 'Flow linking amino acids, proteins, enzymes, nucleic acids, vitamins and hormones'),
      n: 'In Part 2 we meet the molecules that do most of the work in a cell. Proteins are long chains of amino acids; some are structural, like keratin in hair, and many are enzymes that speed up reactions. Nucleic acids, DNA and RNA, store and use the genetic instructions for making proteins. Vitamins and hormones, needed in small amounts, keep the whole system running.',
    }),
    sl('concept', 'Amino acids', {
      b: 'α-Amino acids have –NH₂ and –COOH on the same carbon, with a side chain R. Of about 20 in proteins, those the body cannot make are **essential** (must be in food). In water they exist as **zwitterions** (H₃N⁺–CHR–COO⁻), so they are crystalline, water-soluble and high-melting, and amphoteric.',
      v: table(['Amino acid', 'R group', 'Note'], [['Glycine', '–H', 'Only one that is not optically active'], ['Alanine', '–CH₃', 'Non-essential'], ['Valine', '–CH(CH₃)₂', 'Essential'], ['Lysine', '–(CH₂)₄NH₂', 'Essential, basic'], ['Aspartic acid', '–CH₂COOH', 'Acidic']], 'Table of five amino acids with their side chains and notes'),
      n: 'Amino acids are the building blocks of proteins. Each has an amino group and a carboxyl group on the same carbon, plus a side chain that makes it unique. In water, the acidic group gives its proton to the basic group, forming a zwitterion with both a positive and a negative charge. That is why amino acids are crystalline solids that dissolve in water and melt at high temperatures. The ones our bodies cannot make are called essential.',
    }),
    sl('diagram', 'The peptide bond', {
      b: 'The –COOH of one amino acid and the –NH₂ of another condense with loss of water, forming a **peptide bond** (–CO–NH–, an amide link). Two amino acids give a dipeptide; many give a **polypeptide**; a protein has more than about 100 residues.',
      v: V.peptide,
      n: 'Amino acids join through peptide bonds. The carboxyl group of one amino acid reacts with the amino group of the next, losing a molecule of water, and the resulting amide link is called a peptide bond. A chain of two amino acids is a dipeptide; a long chain is a polypeptide. Proteins are polypeptides with more than about a hundred amino acids.',
    }),
    sl('concept', 'Levels of protein structure', {
      b: '**Primary:** the sequence of amino acids. **Secondary:** regular folding held by hydrogen bonds — **α-helix** or **β-pleated sheet**. **Tertiary:** overall folding of the chain (hydrogen bonds, disulfide links, van der Waals and ionic attractions). **Quaternary:** arrangement of two or more polypeptide subunits.',
      v: table(['Level', 'Description', 'Held by'], [['Primary', 'Sequence of amino acids', 'Peptide (covalent) bonds'], ['Secondary', 'α-Helix or β-pleated sheet', 'Hydrogen bonds between C=O and N–H'], ['Tertiary', 'Overall 3D folding of one chain', 'H-bonds, S–S bonds, ionic and van der Waals forces'], ['Quaternary', 'Assembly of several chains', 'Same non-covalent forces between chains']], 'Table of the four levels of protein structure with descriptions and the forces holding each'),
      n: 'A protein’s shape is described at four levels. The primary structure is simply the order of amino acids; changing one can change the protein’s function, as in sickle-cell anaemia. Hydrogen bonds fold the chain into helices or sheets, the secondary structure. The whole chain then folds into a compact three-dimensional shape, the tertiary structure. Some proteins, like haemoglobin, are made of several chains packed together: the quaternary structure.',
    }),
    sl('concept', 'Fibrous and globular proteins; denaturation', {
      b: '**Fibrous** proteins have parallel chains held by H-bonds and S–S bonds; insoluble (keratin, myosin). **Globular** proteins are folded into spheres; soluble (insulin, albumin, enzymes). **Denaturation** by heat or pH change disrupts secondary and tertiary structure (but not primary), destroying biological activity.',
      v: table(['Example of denaturation', 'Cause'], [['Egg white sets on boiling', 'Heat'], ['Milk curdles into paneer with lemon juice', 'Change of pH'], ['Hair straightening/perming', 'Breaking and re-forming S–S and H-bonds']], 'Table of everyday examples of protein denaturation and their causes'),
      n: 'Fibrous proteins, like keratin in hair and nails, have long parallel chains and do not dissolve in water. Globular proteins, like insulin and egg albumin, are folded into compact shapes and are usually soluble. Heat or a change in pH can unfold a protein: boiling turns egg white solid, and lemon juice curdles milk to make paneer. This denaturation destroys the protein’s natural shape and activity, though the amino acid sequence is unchanged.',
    }),
    sl('check', 'Quick check: protein structure', {
      b: 'Identify which level of protein structure survives denaturation.',
      n: 'Quick check. Denaturation breaks weak attractions, not covalent peptide bonds. Which level is defined by peptide bonds alone?',
      chk: 'denature-mcq',
    }),
    sl('concept', 'Enzymes', {
      b: 'Enzymes are mostly **globular proteins** that act as **biocatalysts**. They are highly **specific**, work under mild conditions (body temperature, near-neutral pH) and greatly **lower the activation energy**. Many are named with **-ase**.',
      v: table(['Enzyme', 'Reaction catalysed'], [['Invertase', 'Sucrose → glucose + fructose'], ['Maltase', 'Maltose → 2 glucose'], ['Amylase (diastase)', 'Starch → maltose'], ['Pepsin, trypsin', 'Proteins → peptides and amino acids'], ['Urease', 'Urea → ammonia + carbon dioxide']], 'Table of enzymes and the reactions they catalyse'),
      n: 'Enzymes are nature’s catalysts. Almost all are globular proteins, and each speeds up a particular reaction, often by millions of times, at body temperature. For example, invertase splits sucrose, amylase in saliva begins breaking down starch, and pepsin in the stomach breaks down proteins. They work by lowering the activation energy, as we saw in chemical kinetics.',
    }),
    sl('concept', 'Vitamins', {
      b: 'Vitamins are organic compounds needed in **small amounts** for normal health. **Fat-soluble:** A, D, E, K (stored in liver and fat tissue). **Water-soluble:** B group and C (not stored; must be taken regularly). Vitamin B₁₂ is the exception among water-soluble vitamins: it is stored in the liver.',
      v: table(['Vitamin', 'Deficiency disease', 'Sources'], [['A', 'Xerophthalmia, night blindness', 'Carrots, fish-liver oil, milk'], ['B₁ (thiamine)', 'Beriberi', 'Cereals, yeast, milk'], ['B₂ (riboflavin)', 'Cheilosis, digestive disorders', 'Milk, egg white, liver'], ['B₆ (pyridoxine)', 'Convulsions', 'Yeast, cereals, egg yolk'], ['B₁₂', 'Pernicious anaemia', 'Meat, fish, egg, curd'], ['C (ascorbic acid)', 'Scurvy (bleeding gums)', 'Amla, citrus fruits, green vegetables'], ['D', 'Rickets (children), osteomalacia (adults)', 'Sunlight on skin, fish, egg yolk'], ['E', 'Fragile red blood cells, muscular weakness', 'Vegetable oils, nuts'], ['K', 'Increased blood-clotting time', 'Green leafy vegetables']], 'Table of vitamins with their deficiency diseases and sources'),
      n: 'Vitamins are needed only in small amounts, but lacking them causes disease. Vitamins A, D, E and K dissolve in fat and are stored in the body. The B vitamins and vitamin C dissolve in water and are washed out in urine, so we need them regularly; vitamin C is also destroyed by cooking. Night blindness, beriberi, scurvy and rickets are classic deficiency diseases, still seen where diets are poor.',
    }),
    sl('example', 'Worked example: linking deficiency to diet', {
      b: r`**Problem.** Suggest the vitamin involved in each case: (a) a sailor on a long voyage without fresh fruit develops bleeding gums; (b) a child kept indoors with little milk develops soft, bent leg bones; (c) a patient takes a long course of antibiotics and has cuts that keep bleeding.

**(a)** Vitamin C — scurvy.

**(b)** Vitamin D — rickets (little sunlight, little dietary vitamin D and calcium).

**(c)** Vitamin K — partly made by gut bacteria, which antibiotics reduce; deficiency increases clotting time.`,
      v: table(['Case', 'Vitamin', 'Disease'], [['No fresh fruit', 'C', 'Scurvy'], ['No sunlight', 'D', 'Rickets'], ['Long antibiotic course', 'K', 'Poor blood clotting']], 'Table linking three cases to vitamins and diseases'),
      n: 'Work from the symptom and the situation. Bleeding gums after months without fresh fruit point to scurvy, a lack of vitamin C. Soft, bent bones in a child who rarely goes out in the sun point to rickets, a lack of vitamin D. And because bacteria in our gut make some vitamin K, a long course of antibiotics can lower it and slow blood clotting.',
    }),
    sl('check', 'Quick check: vitamins', {
      b: 'Match a vitamin with its solubility or deficiency disease.',
      n: 'Quick check. Remember the four fat-soluble vitamins and the diseases caused by lack of B one, C and D.',
      chk: 'vitamin-mcq',
    }),
    sl('concept', 'Nucleic acids: building blocks', {
      b: 'Nucleic acids are polymers of **nucleotides**. A **nucleoside** = nitrogenous base + pentose sugar; a **nucleotide** = nucleoside + phosphate. Nucleotides are joined by **phosphodiester** links between C5′ of one sugar and C3′ of the next.',
      v: table(['Component', 'DNA', 'RNA'], [['Sugar', '2-Deoxy-D-ribose', 'D-Ribose'], ['Purine bases', 'Adenine (A), guanine (G)', 'Adenine (A), guanine (G)'], ['Pyrimidine bases', 'Cytosine (C), thymine (T)', 'Cytosine (C), uracil (U)'], ['Strands', 'Double helix', 'Usually single strand']], 'Table comparing the sugar, bases and number of strands in DNA and RNA'),
      n: 'Nucleic acids are long chains of nucleotides. Each nucleotide has three parts: a nitrogen-containing base, a five-carbon sugar and a phosphate group. The sugar of one nucleotide is joined to the phosphate of the next, forming a backbone. DNA uses the sugar deoxyribose and the bases adenine, guanine, cytosine and thymine; RNA uses ribose and has uracil instead of thymine.',
    }),
    sl('diagram', 'The DNA double helix', {
      b: 'DNA is a **double helix** of two antiparallel strands. Bases pair by **hydrogen bonds**: **A with T** (two) and **G with C** (three), so the strands are **complementary**. In any DNA, amount of A = T and G = C.',
      v: V.dna,
      n: 'In DNA, two strands wind round each other in a double helix, running in opposite directions. The bases point inwards and pair up: adenine always with thymine, held by two hydrogen bonds, and guanine always with cytosine, held by three. So the order of bases on one strand fixes the order on the other. This is how DNA can be copied exactly when a cell divides.',
    }),
    sl('concept', 'Functions of nucleic acids', {
      b: '**DNA** carries hereditary information and **replicates** itself before cell division. **RNA** helps make proteins: **mRNA** carries the message, **tRNA** brings amino acids and **rRNA** forms ribosomes. The sequence of bases (codons) decides the sequence of amino acids in a protein.',
      v: flow('LR', [['r', 'New DNA copy'], ['a', 'DNA (gene)'], ['b', 'mRNA'], ['c', 'Ribosome (rRNA) + tRNA with amino acids'], ['d', 'Protein']], [['a', 'r', 'replication'], ['a', 'b', 'transcription'], ['b', 'c'], ['c', 'd', 'translation']], 'Flow from DNA through messenger RNA and ribosomes with transfer RNA to protein'),
      n: 'DNA is the cell’s instruction book. Before a cell divides, DNA makes an exact copy of itself, so each new cell gets the full set of instructions. To make a protein, the relevant part of DNA is copied into messenger RNA, which travels to a ribosome. There, transfer RNA molecules bring the right amino acids in the order set by the code, and they are joined into a protein.',
    }),
    sl('example', 'Worked example: base composition', {
      b: r`**Problem.** A sample of double-stranded DNA contains 30% adenine. What are the percentages of thymine, guanine and cytosine?

**Step 1.** A pairs with T, so T $= 30\%$.

**Step 2.** A + T $= 30 + 30 = 60\%$, so G + C $= 100 - 60 = 40\%$.

**Step 3.** G = C, so each $= \dfrac{40}{2} = 20\%$.`,
      v: table(['Base', 'Percentage'], [['Adenine', '30%'], ['Thymine', '30%'], ['Guanine', '20%'], ['Cytosine', '20%']], 'Table of base percentages in the DNA sample'),
      n: 'Because adenine always pairs with thymine, they must be present in equal amounts, so thymine is also thirty percent. Together they make sixty percent, leaving forty percent for guanine and cytosine. These also pair one to one, so each is twenty percent. This equality of paired bases was one of the clues to the double-helix structure.',
    }),
    sl('concept', 'Hormones', {
      b: 'Hormones are chemical messengers made by **endocrine glands** and carried in blood. Chemically they may be **steroids** (oestrogen, testosterone, cortisol), **polypeptides** (insulin, glucagon) or **amino acid derivatives** (adrenaline, thyroxine).',
      v: table(['Hormone', 'Gland', 'Main role'], [['Insulin', 'Pancreas (β-cells)', 'Lowers blood glucose'], ['Glucagon', 'Pancreas (α-cells)', 'Raises blood glucose'], ['Thyroxine', 'Thyroid', 'Controls metabolic rate; lack causes goitre/hypothyroidism'], ['Adrenaline', 'Adrenal medulla', 'Fight-or-flight response'], ['Testosterone, oestrogen', 'Testes, ovaries', 'Sexual development'], ['Glucocorticoids (e.g. cortisol)', 'Adrenal cortex', 'Carbohydrate metabolism, reduce inflammation']], 'Table of hormones with their glands and main roles'),
      n: 'Hormones carry messages between organs through the blood. Insulin and glucagon from the pancreas work in opposite directions to keep blood sugar steady. Thyroxine from the thyroid sets the rate of metabolism; iodine is needed to make it. Adrenaline prepares the body for emergencies. Steroid hormones such as testosterone and oestrogen control sexual development.',
    }),
    sl('check', 'Quick check: nucleic acids', {
      b: 'Distinguish DNA from RNA by sugar or base.',
      n: 'Quick check. Which base is found only in RNA, and which sugar is found only in DNA?',
      chk: 'dna-rna-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Amino acids: zwitterions; essential and non-essential; peptide bond –CO–NH–.',
        'Protein structure: primary, secondary (α-helix, β-sheet), tertiary, quaternary; denaturation keeps primary only.',
        'Enzymes: specific globular-protein catalysts that lower activation energy.',
        'Vitamins: fat-soluble A, D, E, K; water-soluble B, C; deficiency diseases.',
        'DNA (deoxyribose, A G C T, double helix, A=T, G≡C) and RNA (ribose, A G C U, single strand); replication and protein synthesis.',
        'Hormones: steroids, polypeptides, amino-acid derivatives; insulin, glucagon, thyroxine, adrenaline.',
      ],
      v: table(['Biomolecule', 'Monomer'], [['Protein', 'α-Amino acid'], ['Nucleic acid', 'Nucleotide'], ['Starch, cellulose', 'Glucose']], 'Summary table of biomolecules and their monomers'),
      n: 'Let us sum up Part 2. Proteins are chains of amino acids joined by peptide bonds, folded at four levels, and denatured by heat or pH. Enzymes are protein catalysts. Vitamins are needed in small amounts, and their lack causes specific diseases. DNA and RNA are chains of nucleotides that store and use genetic information, and hormones carry chemical messages around the body.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Denaturation destroys secondary and tertiary structure, not the primary structure.',
        'Give one example each of fibrous and globular proteins.',
        'Vitamins A, D, E, K are fat-soluble; B and C water-soluble (B₁₂ is stored).',
        'DNA: deoxyribose and thymine; RNA: ribose and uracil.',
        'In DNA, %A = %T and %G = %C.',
      ],
      v: table(['Slip', 'Fix'], [['Denaturation breaks peptide bonds', 'It breaks weak bonds; primary structure stays'], ['Vitamin C is fat-soluble', 'Water-soluble'], ['RNA contains thymine', 'RNA has uracil']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Some final tips. Denaturation does not break peptide bonds, so the primary structure survives. Learn one fibrous and one globular protein. Sort vitamins correctly into fat-soluble and water-soluble groups. Remember the sugar and base differences between DNA and RNA. And in base-composition problems, use the pairing rules.',
    }),
  ],
});
