// ch10 Biomolecules — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: b c a a d c a.
// Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 carbohydrates
add('glucose-evidence-mcq', mcq({
  stem: 'Bromine water oxidises glucose to gluconic acid, which still has six carbon atoms. This shows that glucose contains:',
  right: 'an aldehyde group',
  wrong: ['a ketone group', 'five hydroxyl groups', 'a primary alcohol group at C6'],
  sol: 'A mild oxidant converts –CHO into –COOH without losing carbon; ketones are not oxidised this way — option (@K). The –OH count comes from acetylation (@2).',
  d: 2, c: 'understanding', t: [1],
}));
add('nonreducing-mcq', mcq({
  stem: 'Which of these sugars does not reduce Fehling’s solution?',
  right: 'Sucrose',
  wrong: ['Maltose', 'Lactose', 'Fructose'],
  sol: 'In sucrose both reducing carbons (glucose C1 and fructose C2) are used in the glycosidic bond — option (@K). Maltose and lactose keep a free hemiacetal group.',
  d: 1, c: 'recall', t: [1],
}));
add('cellulose-mcq', mcq({
  stem: 'Cotton fibre is almost pure cellulose. Cellulose is a polymer of:',
  right: 'β-D-glucose units joined by unbranched C1–C4 glycosidic links',
  wrong: ['α-D-glucose units joined by unbranched C1–C4 links', 'α-D-glucose units with C1–C6 branch points', 'β-D-fructose units joined by C2–C1 links'],
  sol: 'Cellulose is a straight chain of β-glucose with β-1,4 links — option (@K). Unbranched α-1,4 chains describe amylose (@1); α-1,6 branches occur in amylopectin and glycogen (@2).',
  d: 2, c: 'understanding', t: [1],
}));
add('classify-mcq', mcq({
  stem: 'Ribose, C₅H₁₀O₅, a sugar found in RNA, has an aldehyde group in its open-chain form. It is classified as:',
  right: 'an aldopentose',
  wrong: ['a ketopentose', 'an aldohexose', 'a disaccharide'],
  sol: 'Aldehyde group → aldose; five carbons → pentose — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('nitric-mcq', mcq({
  stem: 'Glucose and gluconic acid both give the same dicarboxylic acid when warmed with nitric acid. That acid is:',
  right: 'saccharic acid',
  wrong: ['gluconic acid', 'ethanoic acid', 'hexanoic acid'],
  sol: 'Nitric acid oxidises both the –CHO (or –COOH already present) end and the –CH₂OH end, giving the C₆ dicarboxylic acid, saccharic acid — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('anomer-mcq', mcq({
  stem: 'α-D-Glucose and β-D-glucose differ in:',
  right: 'the configuration at C1 only',
  wrong: ['the configuration at C5', 'the size of the ring', 'their molecular formula'],
  sol: 'They are anomers: same ring, same formula, differing only at the anomeric carbon C1 — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('invert-mcq', mcq({
  stem: 'A solution of cane sugar with a little acid is kept warm in a polarimeter tube for some hours. The observed angle of rotation:',
  right: 'changes from positive to negative',
  wrong: ['stays positive and increases', 'changes from negative to positive', 'stays exactly the same'],
  sol: 'Sucrose (+66.5°) hydrolyses to glucose (+52.5°) and fructose (−92.4°); the mixture is laevorotatory, so the sign inverts — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('schiff-mcq', mcq({
  stem: 'Which observation cannot be explained by the open-chain structure of glucose?',
  right: 'Glucose does not give Schiff’s test for aldehydes',
  wrong: ['Glucose forms an oxime with hydroxylamine', 'Glucose gives n-hexane on prolonged heating with HI', 'Glucose reduces Tollens’ reagent'],
  sol: 'A free –CHO should give Schiff’s test; its absence points to the cyclic hemiacetal form — option (@K). The other three fit the open chain.',
  d: 3, c: 'analysis', t: [1],
}));
add('lactose-mcq', mcq({
  stem: 'People with lactose intolerance digest milk sugar poorly. Complete hydrolysis of lactose gives:',
  right: 'galactose and glucose',
  wrong: ['glucose and fructose', 'two glucose units', 'galactose and fructose'],
  sol: 'Lactose is β-D-galactose joined to D-glucose — option (@K). Glucose + fructose come from sucrose (@1) and two glucose from maltose (@2).',
  d: 1, c: 'recall', t: [1],
}));
add('fructose-mcq', mcq({
  stem: 'Fructose and glucose have the same molecular formula. Fructose differs because it:',
  right: 'has a ketone group at C2 and forms a five-membered ring',
  wrong: ['has an aldehyde group and is dextrorotatory', 'is a disaccharide of two glucose units', 'cannot reduce Fehling’s solution'],
  sol: 'Fructose is a ketohexose that forms a furanose ring and is laevorotatory; it is still a reducing sugar — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('iodine-mcq', mcq({
  stem: 'A student adds iodine solution to three samples: water in which rice was boiled, wet cotton wool, and a glucose solution. A blue-black colour appears only with:',
  right: 'the rice water, because of amylose from starch',
  wrong: ['the cotton wool, because of cellulose', 'the glucose solution, because glucose is a reducing sugar', 'all three, because all contain glucose units'],
  sol: 'The helical chains of amylose trap iodine, giving the blue-black colour; cellulose and free glucose do not — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('maltose-tf', tf({
  stem: 'Maltose reduces Tollens’ reagent.',
  key: 't',
  sol: 'True. In maltose, C1 of one glucose is joined to C4 of the other, so the second unit keeps a free hemiacetal group that can open to –CHO.',
  d: 2, c: 'understanding', t: [1],
}));
add('anomer-tf', tf({
  stem: 'α-D-Glucose and β-D-glucose are a pair of enantiomers.',
  key: 'f',
  sol: 'False. They are anomers (diastereomers differing only at C1), not mirror images; their specific rotations are +111° and +19.2°, not equal and opposite.',
  d: 2, c: 'analysis', t: [1],
}));
add('mutarotation-fill', fill({
  stem: 'The slow change in the specific rotation of a freshly made solution of α-D-glucose to a steady value is called ___.',
  acc: [['mutarotation']],
  sol: '**Mutarotation**: α and β forms interconvert through the open chain until equilibrium (+52.5°).',
  d: 1, c: 'recall', t: [1],
}));
add('sugar-match', match({
  stem: 'Match each carbohydrate with the products of its complete hydrolysis.',
  pairs: [
    ['Sucrose', 'Glucose and fructose'],
    ['Maltose', 'Glucose only (two units)'],
    ['Lactose', 'Galactose and glucose'],
    ['Cellulose', 'Glucose only (many β units)'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Sucrose → glucose + fructose; maltose → 2 glucose; lactose → galactose + glucose; cellulose → many glucose.',
  d: 1, c: 'recall', t: [1],
}));
add('reaction-match', match({
  stem: 'Match each reagent with the structural feature of glucose that its reaction with glucose reveals.',
  pairs: [
    ['HI, prolonged heating', 'Six carbon atoms in a straight chain'],
    ['Bromine water', 'The carbonyl group is an aldehyde'],
    ['Ethanoic anhydride', 'Five –OH groups'],
    ['Nitric acid', 'A –CH₂OH group at the end of the chain'],
  ],
  order: [3, 1, 0, 2],
  sol: 'HI → n-hexane (straight chain); Br₂ water → gluconic acid (aldehyde); anhydride → pentaacetate (five –OH); HNO₃ → saccharic acid (primary alcohol).',
  d: 2, c: 'understanding', t: [1],
}));
add('sucrose-ar', ar({
  a: 'Sucrose is a non-reducing sugar.',
  r: 'Sucrose is a disaccharide.',
  key: 'b',
  sol: 'Both are true, but being a disaccharide does not explain it (maltose and lactose are reducing disaccharides). Sucrose is non-reducing because both anomeric carbons form the glycosidic bond — option (b).',
  d: 4, c: 'analysis', t: [1],
}));
add('cellulose-ar', ar({
  a: 'Humans cannot digest cellulose.',
  r: 'Cellulose is a branched polymer of α-D-glucose.',
  key: 'c',
  sol: 'A is true; R is false — cellulose is an unbranched polymer of β-D-glucose, and human enzymes cannot hydrolyse β-1,4 links — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('glucose-ar', ar({
  a: 'Glucose pentaacetate does not react with hydroxylamine.',
  r: 'In the cyclic form of glucose, C1 is part of a hemiacetal and there is no free aldehyde group.',
  key: 'a',
  sol: 'Both are true; with C1 locked in the ring (and its –OH acetylated), no –CHO is available to form an oxime — option (a).',
  d: 3, c: 'analysis', t: [1],
}));
add('sucrose-num', num({
  stem: r`What mass of glucose ($M = 180$), in grams, is formed by complete hydrolysis of $34.2\ \text{g}$ of sucrose ($M = 342$)?`,
  value: 18, tol: 0.1, unit: 'g',
  sol: r`$\ce{C12H22O11 + H2O -> C6H12O6 + C6H12O6}$ gives one glucose per sucrose. Moles $= 34.2 \div 342 = 0.1$; mass $= 0.1 \times 180 = 18$, so $18\ \text{g}$.`,
  scheme: [['0.1 mol and 18 g', 1]],
  d: 2, c: 'application', t: [1],
}), () => near((34.2 / 342) * 180, 18) || 'sucrose');
add('maltose-num', num({
  marks: 2,
  stem: r`A brewer hydrolyses $17.1\ \text{g}$ of maltose ($M = 342$) completely with the enzyme maltase. What mass of glucose ($M = 180$), in grams, is formed?`,
  value: 18, tol: 0.1, unit: 'g',
  sol: r`$\ce{C12H22O11 + H2O -> 2C6H12O6}$: each maltose gives two glucose. Moles of maltose $= 17.1 \div 342 = 0.05$; moles of glucose $= 2 \times 0.05 = 0.1$; mass $= 0.1 \times 180 = 18$, so $18\ \text{g}$.`,
  scheme: [['Two glucose per maltose; 0.1 mol glucose', 1], ['18 g', 1]],
  d: 3, c: 'application', t: [1, 3],
}), () => near((17.1 / 342) * 2 * 180, 18) || 'maltose');
add('cellulose-num', num({
  stem: r`A sample of cotton cellulose has an average molar mass of $4.86 \times 10^{5}\ \text{g mol}^{-1}$. How many glucose units does an average chain contain? (Mass of one chain unit, $\ce{C6H10O5}$, $= 162$.)`,
  value: 3000, tol: 10, unit: null,
  sol: r`Number of units $= 486000 \div 162 = 3000$.`,
  scheme: [['3000 units', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(486000 / 162, 3000) || 'cellulose');
add('evidence-short', short({
  marks: 2,
  stem: 'What does each observation tell us about the structure of glucose? (a) Glucose adds HCN to form a cyanohydrin. (b) Warm nitric acid converts glucose into saccharic acid, a six-carbon dicarboxylic acid.',
  model: '(a) Addition of HCN is a typical reaction of a carbonyl group, so glucose contains a C=O group. (b) Both ends of the chain are oxidised to –COOH without loss of carbon, so besides the aldehyde group, glucose has a primary alcohol group (–CH₂OH) at the other end.',
  sol: 'Carbonyl group; primary alcohol group.',
  scheme: [['(a) Carbonyl group', 1], ['(b) Primary –CH₂OH at C6', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('syrup-short', short({
  marks: 2,
  stem: 'A sweet shop boils cane sugar with water and a little lemon juice to make a syrup. A sample of the syrup gives a red precipitate with Fehling’s solution, but a plain cane sugar solution does not. Explain.',
  model: 'Cane sugar (sucrose) is non-reducing because both reducing carbons are tied up in the glycosidic bond. The acid in lemon juice, on boiling, hydrolyses sucrose into glucose and fructose. These are reducing sugars, so the syrup reduces Fehling’s solution to red Cu₂O.',
  sol: 'Acid hydrolysis releases reducing sugars.',
  scheme: [['Sucrose non-reducing (glycosidic bond)', 1], ['Acid hydrolysis gives reducing glucose and fructose', 1]],
  d: 3, c: 'application', t: [1],
}));
add('starch-short', short({
  marks: 2,
  stem: 'Rice and cotton are both made mostly of glucose units. Give two structural differences between starch and cellulose that explain why we can digest rice but not cotton.',
  model: 'Starch is made of α-D-glucose units, while cellulose is made of β-D-glucose units joined by β-1,4 links. Starch is partly branched (amylopectin has α-1,6 branches), whereas cellulose chains are straight and packed tightly by hydrogen bonds into fibres. Our digestive enzymes hydrolyse α-links but not β-links.',
  sol: 'α vs β glucose; branched vs straight.',
  scheme: [['α vs β linkage (enzymes hydrolyse only α)', 1], ['Branching vs straight, H-bonded fibres', 1]],
  d: 3, c: 'application', t: [1],
}));
add('cyclic-short3', short({
  marks: 3,
  stem: 'Give three observations that the open-chain structure of glucose cannot explain, and explain how the cyclic structure accounts for them.',
  model: 'Although glucose has an aldehyde group, it does not give Schiff’s test and does not form an addition product with NaHSO₃. Its pentaacetate does not react with hydroxylamine. Glucose also exists in two crystalline forms, α and β, which show mutarotation in water. In the cyclic structure, the –OH at C5 adds to the C1 aldehyde to form a six-membered hemiacetal ring, so there is little free –CHO. Ring closure makes C1 a new chiral centre, giving the two anomers, which interconvert through the open chain.',
  sol: 'Schiff’s/NaHSO₃, pentaacetate, α and β forms; hemiacetal ring, anomers.',
  scheme: [['Three observations', 1.5], ['Hemiacetal ring explains lack of free –CHO', 1], ['New chiral C1 gives anomers', 0.5]],
  d: 4, c: 'analysis', t: [1],
}));
add('reducing-short3', short({
  marks: 3,
  stem: 'A food lab receives four powders: glucose, sucrose, maltose and starch. Predict which give a red precipitate with Fehling’s solution, and explain the basis of your prediction.',
  model: 'Glucose and maltose give the red precipitate; sucrose and starch do not. A sugar is reducing when it has a free aldehyde or ketone group, or a hemiacetal that can open to one. Glucose is a monosaccharide with such a group, and in maltose the second glucose unit keeps a free hemiacetal at C1. In sucrose both anomeric carbons are joined in the glycosidic bond, and in starch the very few free chain ends are too small a fraction to give a positive test.',
  sol: 'Glucose and maltose reducing; reason based on free hemiacetal.',
  scheme: [['Correct prediction for all four', 1], ['Free carbonyl or hemiacetal needed', 1], ['Reasons for sucrose and starch', 1]],
  d: 3, c: 'application', t: [1],
}));
add('glucose-long', long({
  stem: '(a) Describe two ways of preparing glucose, with an equation for one.\n\n(b) Describe four reactions of glucose and state what each shows about its open-chain structure.\n\n(c) Explain why glucose is said to have a cyclic structure, and what is meant by α- and β-glucose.',
  model: 'Glucose is made by boiling sucrose with dilute acid, C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ (glucose) + C₆H₁₂O₆ (fructose), or commercially by hydrolysing starch with dilute H₂SO₄ at 393 K under pressure. Prolonged heating with HI gives n-hexane, so the six carbons form a straight chain. Formation of an oxime shows a carbonyl group. Bromine water gives gluconic acid, so the carbonyl is an aldehyde. Acetylation gives a pentaacetate, so there are five –OH groups. However, glucose gives no Schiff’s test and no NaHSO₃ adduct, because it exists mainly as a six-membered ring formed when the C5 –OH adds to the C1 aldehyde. The two ring forms, α and β, differ only in the position of the –OH at C1; they are anomers.',
  sol: 'Two preparations; four reactions and inferences; ring closure and anomers.',
  scheme: [['(a) Two methods with an equation', 1], ['(b) Four reactions with inferences', 2], ['(c) Evidence for and description of the ring', 1], ['(c) α and β anomers', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('carb-long', long({
  stem: '(a) Classify carbohydrates on the basis of hydrolysis, giving one example of each class.\n\n(b) Explain why sucrose is called non-reducing and why its hydrolysis product is called invert sugar.\n\n(c) Compare amylose, amylopectin, cellulose and glycogen.',
  model: 'Monosaccharides cannot be hydrolysed further (glucose); oligosaccharides give two to ten units (sucrose, a disaccharide); polysaccharides give many units (starch). In sucrose, C1 of α-glucose is linked to C2 of β-fructose, so neither unit has a free hemiacetal and it cannot reduce Fehling’s or Tollens’ reagent. Sucrose is dextrorotatory, but hydrolysis gives glucose (+52.5°) and fructose (−92.4°); the mixture is laevorotatory, so the sign is inverted. Amylose is an unbranched, water-soluble chain of α-glucose (α-1,4). Amylopectin has α-1,4 chains branched by α-1,6 links. Glycogen is similar but more highly branched and is the animal store. Cellulose is an unbranched chain of β-glucose (β-1,4) that forms plant cell walls.',
  sol: 'Three classes; sucrose non-reducing and inversion; four polysaccharides.',
  scheme: [['(a) Three classes with examples', 1.5], ['(b) Non-reducing reason', 1], ['(b) Inversion of rotation', 0.5], ['(c) Comparison of four polysaccharides', 2]],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 proteins
add('denature-mcq', mcq({
  stem: 'When an egg is boiled, its albumin is denatured. Which level of protein structure remains intact?',
  right: 'Primary structure',
  wrong: ['Secondary structure', 'Tertiary structure', 'Both secondary and tertiary structure'],
  sol: 'Heat breaks hydrogen bonds and other weak forces but not the covalent peptide bonds, so the amino acid sequence survives — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('zwitterion-mcq', mcq({
  stem: 'Amino acids are crystalline solids with high melting points that dissolve in water but not in benzene. The best explanation is that they:',
  right: 'exist as dipolar ions (zwitterions) with strong ionic attractions',
  wrong: ['are large polymers held by peptide bonds', 'form glycosidic linkages with water', 'have no polar groups'],
  sol: 'H₃N⁺–CHR–COO⁻ behaves like a salt: high melting point, soluble in polar water, insoluble in non-polar solvents — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('peptide-bonds-mcq', mcq({
  stem: 'A hexapeptide is made from six amino acid units. How many peptide bonds does it contain?',
  right: '5',
  wrong: ['6', '7', '4'],
  sol: 'A linear chain of n units has n − 1 links: 6 − 1 = 5 — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('secondary-mcq', mcq({
  stem: 'The α-helix and the β-pleated sheet are held in shape mainly by:',
  right: 'hydrogen bonds between C=O and N–H groups of the backbone',
  wrong: ['peptide bonds between side chains', 'disulfide bonds between cysteine units only', 'glycosidic linkages'],
  sol: 'Secondary structure is maintained by backbone C=O···H–N hydrogen bonds — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('globular-mcq', mcq({
  stem: 'Which of these is a fibrous protein?',
  right: 'Keratin',
  wrong: ['Insulin', 'Egg albumin', 'Haemoglobin'],
  sol: 'Keratin (hair, nails) has long parallel chains and is insoluble — option (@K). The others are globular.',
  d: 1, c: 'recall', t: [2],
}));
add('paneer-mcq', mcq({
  stem: 'Paneer is made by adding lemon juice to hot milk. The milk protein separates as a solid mainly because:',
  right: 'the heat and lower pH denature the protein, which coagulates',
  wrong: ['lemon juice hydrolyses the protein into free amino acids', 'citric acid joins lactose units into a polysaccharide', 'vitamin C in the juice oxidises the peptide bonds'],
  sol: 'Acid and heat disrupt the weak forces holding the protein’s shape; the unfolded chains clump together — option (@K). Peptide bonds are not broken (@1).',
  d: 2, c: 'application', t: [2],
}));
add('dipeptide-mcq', mcq({
  stem: 'Using one glycine and one alanine molecule each time, how many different dipeptides can be formed?',
  right: '2',
  wrong: ['1', '3', '4'],
  sol: 'The free –NH₂ end can be either residue: Gly–Ala and Ala–Gly are different compounds — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('denature-tf', tf({
  stem: 'Denaturation of a protein by heat changes the order of its amino acids.',
  key: 'f',
  sol: 'False. Denaturation breaks only weak interactions (hydrogen bonds, ionic and van der Waals forces); the peptide bonds and the amino acid sequence are unchanged.',
  d: 2, c: 'understanding', t: [2],
}));
add('peptide-fill', fill({
  stem: 'The amide link, –CO–NH–, formed between the carboxyl group of one amino acid and the amino group of another is called a ___ bond.',
  acc: [['peptide']],
  sol: 'A **peptide** bond, formed with loss of water.',
  d: 1, c: 'recall', t: [2],
}));
add('zwitterion-ar', ar({
  a: 'Amino acids have high melting points compared with organic compounds of similar molar mass.',
  r: 'In the solid, amino acids exist as zwitterions held by strong electrostatic attractions.',
  key: 'a',
  sol: 'Both are true, and the salt-like ionic lattice explains the high melting points — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('denature-ar', ar({
  a: 'Denaturation of a protein changes its amino acid sequence.',
  r: 'Denaturation disrupts the hydrogen bonds that hold the secondary structure of a protein.',
  key: 'd',
  sol: 'A is false (the primary structure is unchanged); R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('dipeptide-num', num({
  stem: r`What is the molar mass, in $\text{g mol}^{-1}$, of the dipeptide formed from glycine ($M = 75$) and alanine ($M = 89$)? ($\ce{H2O}$: $M = 18$)`,
  value: 146, tol: 0.5, unit: 'g/mol',
  sol: r`One water molecule is lost: $75 + 89 - 18 = 146$, so $146\ \text{g mol}^{-1}$.`,
  scheme: [['Subtract one water; 146', 1]],
  d: 2, c: 'application', t: [2],
}), () => (75 + 89 - 18 === 146) || 'dipeptide');
add('water-num', num({
  stem: 'A polypeptide chain of 150 amino acid residues is formed. How many water molecules are released in forming the chain?',
  value: 149, tol: 0, unit: null,
  sol: r`Each peptide bond releases one water molecule; number of bonds $= 150 - 1 = 149$, so 149 molecules.`,
  scheme: [['149', 1]],
  d: 2, c: 'application', t: [2],
}), () => (150 - 1 === 149) || 'water');
add('fibrous-short', short({
  marks: 2,
  stem: 'Distinguish between fibrous and globular proteins, giving one example of each.',
  model: 'In fibrous proteins the polypeptide chains run parallel and are held together by hydrogen and disulfide bonds, forming fibres that are insoluble in water, e.g. keratin. In globular proteins the chains coil into compact, roughly spherical shapes that are usually soluble in water, e.g. insulin or albumin.',
  sol: 'Parallel insoluble fibres vs compact soluble shapes.',
  scheme: [['Fibrous: structure, insoluble, example', 1], ['Globular: structure, soluble, example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('denature-short', short({
  marks: 2,
  stem: 'Explain what happens to the protein when egg white is boiled, and why boiled egg white does not become clear and runny again on cooling.',
  model: 'Heat breaks the hydrogen bonds and other weak forces that hold the globular albumin in its folded shape, so the chains unfold (denaturation) and tangle together, forming a white solid. On cooling, the randomly tangled chains cannot find their way back to the original folded shape, so the change is not reversed.',
  sol: 'Denaturation and coagulation; irreversible.',
  scheme: [['Weak forces broken, protein unfolds', 1], ['Chains tangle; original shape not regained', 1]],
  d: 3, c: 'application', t: [2],
}));
add('levels-short3', short({
  marks: 3,
  stem: 'Describe the primary, secondary and tertiary structures of a protein, naming the bonds or forces that hold each.',
  model: 'The primary structure is the sequence of amino acids in the chain, held by covalent peptide bonds; a change in a single amino acid can alter the protein’s function. The secondary structure is the regular local folding of the chain into an α-helix or a β-pleated sheet, held by hydrogen bonds between C=O and N–H groups. The tertiary structure is the overall three-dimensional folding of the whole chain, held by hydrogen bonds, disulfide bridges, ionic attractions and van der Waals forces between side chains.',
  sol: 'Three levels with bonds.',
  scheme: [['Primary: sequence, peptide bonds', 1], ['Secondary: α-helix/β-sheet, H-bonds', 1], ['Tertiary: 3D fold, named forces', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('protein-long', long({
  stem: '(a) Explain why amino acids behave as salts and are amphoteric.\n\n(b) Show how two amino acids form a dipeptide, and find how many peptide bonds and water molecules are involved in forming a chain of 20 amino acids.\n\n(c) Explain the quaternary structure of a protein and what happens on denaturation.',
  model: 'In an amino acid the –COOH group gives a proton to the –NH₂ group, forming a zwitterion, H₃N⁺–CHR–COO⁻. This dipolar ion gives salt-like properties: high melting point and solubility in water. It is amphoteric because –NH₃⁺ can donate a proton to a base and –COO⁻ can accept one from an acid. The –COOH of one amino acid condenses with the –NH₂ of another, losing water and forming a –CO–NH– peptide bond. A chain of 20 amino acids has 19 peptide bonds, formed with loss of 19 water molecules. Quaternary structure is the arrangement of two or more polypeptide subunits, as in haemoglobin. Denaturation by heat or pH breaks weak forces, destroying secondary to quaternary structure and activity, but not the primary structure.',
  sol: 'Zwitterion; peptide bond with 19 and 19; quaternary; denaturation.',
  scheme: [['(a) Zwitterion, salt-like, amphoteric', 1.5], ['(b) Peptide bond formation', 1], ['(b) 19 bonds, 19 water molecules', 1], ['(c) Quaternary structure and denaturation', 1.5]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 enzymes
add('enzyme-mcq', mcq({
  stem: 'Enzymes make biochemical reactions faster by:',
  right: 'providing a path with a lower activation energy',
  wrong: ['raising the temperature of the cell', 'shifting the equilibrium towards products', 'increasing the energy of the products'],
  sol: 'Like any catalyst, an enzyme lowers the activation energy and does not alter equilibrium — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('fever-mcq', mcq({
  stem: 'During a very high fever, some enzymes in the body work less well. The most likely reason is that:',
  right: 'the enzyme protein begins to denature, changing the shape it needs to bind its substrate',
  wrong: ['the activation energy of the reaction increases with temperature', 'the substrate molecules decompose at that temperature', 'enzymes are carbohydrates that caramelise when heated'],
  sol: 'Enzymes are globular proteins; heat disrupts their folded shape, so they bind the substrate poorly — option (@K). Activation energy does not rise with temperature (@1).',
  d: 3, c: 'application', t: [2, 3],
}));
add('invertase-mcq', mcq({
  stem: 'Which enzyme catalyses the hydrolysis of cane sugar into glucose and fructose?',
  right: 'Invertase',
  wrong: ['Maltase', 'Urease', 'Pepsin'],
  sol: 'Invertase (sucrase) hydrolyses sucrose — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('enzyme-ar', ar({
  a: 'An enzyme that hydrolyses maltose does not hydrolyse sucrose.',
  r: 'Enzymes are highly specific: each acts on a particular substrate or type of bond.',
  key: 'a',
  sol: 'Both are true and R explains A: maltase acts on the α-1,4 link of maltose, not on the glycosidic bond of sucrose — option (a).',
  d: 3, c: 'application', t: [3],
}));
add('enzyme-short', short({
  marks: 2,
  stem: 'State two characteristics of enzymes, and name one enzyme with the reaction it catalyses.',
  model: 'Enzymes are highly specific, each catalysing one reaction or acting on one type of substrate, and they work under mild conditions of body temperature and near-neutral pH by lowering the activation energy. Example: amylase (diastase) hydrolyses starch to maltose; or pepsin hydrolyses proteins into peptides.',
  sol: 'Specificity, mild conditions; example.',
  scheme: [['Two characteristics', 1], ['Named enzyme with reaction', 1]],
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 vitamins
add('vitamin-mcq', mcq({
  stem: 'Which vitamin is fat-soluble?',
  right: 'Vitamin K',
  wrong: ['Vitamin C', 'Vitamin B₁', 'Vitamin B₆'],
  sol: 'The fat-soluble vitamins are A, D, E and K — option (@K). B vitamins and C are water-soluble.',
  d: 1, c: 'recall', t: [4],
}));
add('beriberi-mcq', mcq({
  stem: 'People who live mainly on highly polished rice, from which the outer layers have been removed, are at risk of beriberi. The vitamin they lack is:',
  right: 'vitamin B₁ (thiamine)',
  wrong: ['vitamin A', 'vitamin D', 'vitamin K'],
  sol: 'Beriberi is caused by thiamine deficiency; the outer layers of the grain contain it — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('cooking-mcq', mcq({
  stem: 'Chopped green vegetables boiled for a long time in an open pan, with the water thrown away, lose most of one vitamin. Which one, and why?',
  right: 'Vitamin C, because it is water-soluble and destroyed by heat',
  wrong: ['Vitamin A, because it is fat-soluble', 'Vitamin D, because it is made only in sunlight', 'Vitamin K, because it is stored in the liver'],
  sol: 'Vitamin C dissolves in the cooking water and is destroyed by prolonged heating — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('vitamin-match', match({
  stem: 'Match each vitamin with the disease caused by its deficiency.',
  pairs: [
    ['Vitamin A', 'Xerophthalmia'],
    ['Vitamin B₁₂', 'Pernicious anaemia'],
    ['Vitamin D', 'Rickets'],
    ['Vitamin E', 'Fragile red blood cells and muscular weakness'],
  ],
  order: [1, 3, 2, 0],
  sol: 'A → xerophthalmia; B₁₂ → pernicious anaemia; D → rickets; E → fragile red blood cells.',
  d: 1, c: 'recall', t: [4],
}));
add('vitamin-tf', tf({
  stem: 'Excess vitamin C taken in food is largely excreted in urine, so it must be supplied in the diet regularly.',
  key: 't',
  sol: 'True. Vitamin C is water-soluble and is not stored, unlike the fat-soluble vitamins A, D, E and K.',
  d: 1, c: 'understanding', t: [4],
}));
add('vitamin-ar', ar({
  a: 'Vitamin C must be supplied in the diet regularly.',
  r: 'Vitamin C is fat-soluble and is stored in adipose tissue.',
  key: 'c',
  sol: 'A is true; R is false — vitamin C is water-soluble and not stored, which is why it must be taken regularly — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('vitamin-short', short({
  marks: 2,
  stem: 'A student eats carrots only once a week but needs citrus fruit or amla almost every day to stay healthy. Use the solubility of vitamins A and C to explain why.',
  model: 'Vitamin A is fat-soluble, so the excess from one meal is stored in the liver and fatty tissue and released as needed; a weekly supply can be enough. Vitamin C is water-soluble, so any excess is excreted in urine and is not stored; it has to be taken in regularly.',
  sol: 'Fat-soluble stored; water-soluble excreted.',
  scheme: [['Vitamin A fat-soluble and stored', 1], ['Vitamin C water-soluble, excreted, needed regularly', 1]],
  d: 2, c: 'application', t: [4],
}));
add('deficiency-short3', short({
  marks: 3,
  stem: 'For each person, name the vitamin most likely to be deficient and suggest one change in diet or habit: (a) an elderly person who rarely goes outdoors and has weak, painful bones; (b) a person with bleeding gums who eats no fresh fruit; (c) a child who cannot see well in dim light.',
  model: '(a) Vitamin D — deficiency causes softening of bones (osteomalacia in adults). Spend some time in sunlight, which lets the skin make vitamin D, and eat egg yolk or fish. (b) Vitamin C — deficiency causes scurvy. Eat fresh citrus fruit, amla or raw vegetables. (c) Vitamin A — deficiency causes night blindness. Eat carrots, green leafy vegetables, milk or fish-liver oil.',
  sol: 'D, C, A with suitable changes.',
  scheme: [['(a) Vitamin D and change', 1], ['(b) Vitamin C and change', 1], ['(c) Vitamin A and change', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 nucleic acids
add('dna-rna-mcq', mcq({
  stem: 'Which base is present in RNA but not in DNA?',
  right: 'Uracil',
  wrong: ['Thymine', 'Adenine', 'Cytosine'],
  sol: 'RNA has uracil in place of thymine — option (@K). Thymine is found only in DNA (@1).',
  d: 1, c: 'recall', t: [5],
}));
add('pairing-mcq', mcq({
  stem: 'One strand of a DNA segment has the base sequence A–T–G–C–C–A. The sequence of bases on the complementary strand, read in the same direction, is:',
  right: 'T–A–C–G–G–T',
  wrong: ['A–T–G–C–C–A', 'U–A–C–G–G–U', 'T–A–G–C–C–T'],
  sol: 'A pairs with T and G with C: A→T, T→A, G→C, C→G, C→G, A→T — option (@K). Uracil does not occur in DNA (@2).',
  d: 2, c: 'application', t: [5],
}));
add('hbond-mcq', mcq({
  stem: 'Two DNA samples of the same length are heated slowly. Sample X has more G–C pairs than sample Y. Which sample needs a higher temperature to separate its strands, and why?',
  right: 'X, because each G–C pair is held by three hydrogen bonds',
  wrong: ['Y, because each A–T pair is held by three hydrogen bonds', 'Both equally, because all base pairs have two hydrogen bonds', 'Neither; heating breaks the phosphodiester bonds first'],
  sol: 'G–C pairs have three hydrogen bonds and A–T two, so G–C-rich DNA holds its strands together more strongly — option (@K).',
  d: 4, c: 'analysis', t: [5],
}));
add('nucleoside-mcq', mcq({
  stem: 'A nucleoside consists of:',
  right: 'a nitrogenous base and a pentose sugar',
  wrong: ['a base, a pentose sugar and a phosphate group', 'a pentose sugar and a phosphate group', 'two bases joined by hydrogen bonds'],
  sol: 'Base + sugar = nucleoside; adding phosphate gives a nucleotide (@1) — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('strand-tf', tf({
  stem: 'The two strands of a DNA double helix have identical base sequences.',
  key: 'f',
  sol: 'False. The strands are complementary, not identical: A on one strand faces T on the other, and G faces C.',
  d: 2, c: 'understanding', t: [5],
}));
add('phosphodiester-fill', fill({
  stem: 'In a nucleic acid chain, the sugar of one nucleotide is linked to the next through a phosphate group; this is called a ___ linkage.',
  acc: [['phosphodiester']],
  sol: 'A **phosphodiester** linkage joins C5′ of one sugar to C3′ of the next.',
  d: 1, c: 'recall', t: [5],
}));
add('dna-ar', ar({
  a: 'In any sample of double-stranded DNA, the number of adenine bases equals the number of thymine bases.',
  r: 'In DNA, adenine pairs only with thymine through hydrogen bonds.',
  key: 'a',
  sol: 'Both are true and R explains A: every A on one strand faces a T on the other — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('base-num', num({
  stem: 'A sample of double-stranded DNA contains 18% guanine. What is the percentage of adenine?',
  value: 32, tol: 0.1, unit: '%',
  sol: r`C = G = 18%, so G + C $= 36\%$; A + T $= 100 - 36 = 64\%$; A $= 64 \div 2 = 32$, so 32%.`,
  scheme: [['32%', 1]],
  d: 2, c: 'application', t: [5],
}), () => ((100 - 2 * 18) / 2 === 32) || 'base');
add('hbond-num', num({
  marks: 2,
  stem: 'A double-stranded DNA segment of 100 base pairs contains 40 G–C pairs; the rest are A–T pairs. How many hydrogen bonds hold the two strands together?',
  value: 240, tol: 0, unit: null,
  sol: r`G–C: $40 \times 3 = 120$. A–T: $(100 - 40) \times 2 = 120$. Total $= 120 + 120 = 240$.`,
  scheme: [['40 × 3 and 60 × 2', 1], ['240', 1]],
  d: 3, c: 'application', t: [5],
}), () => (40 * 3 + 60 * 2 === 240) || 'hbond');
add('dna-short', short({
  marks: 2,
  stem: 'Give two structural differences and one difference in function between DNA and RNA.',
  model: 'DNA contains the sugar 2-deoxyribose, while RNA contains ribose. DNA has thymine, while RNA has uracil instead; DNA is a double helix, while RNA is usually single-stranded. DNA stores hereditary information and replicates, while RNA directs protein synthesis.',
  sol: 'Sugar, base or strands; function.',
  scheme: [['Two structural differences', 1], ['Difference in function', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('functions-short3', short({
  marks: 3,
  stem: 'A cell needs to make the protein insulin. Describe the roles of DNA, messenger RNA and transfer RNA in this process.',
  model: 'The gene for insulin is a sequence of bases in DNA, which carries the hereditary instructions. In transcription, the base sequence of this gene is copied into a molecule of messenger RNA, which leaves the nucleus and binds to a ribosome. At the ribosome, transfer RNA molecules each bring a specific amino acid and pair with the matching codon on the mRNA, so the amino acids are lined up in the order set by the gene and joined by peptide bonds.',
  sol: 'DNA holds code; mRNA carries copy; tRNA brings amino acids.',
  scheme: [['DNA: gene, base sequence', 1], ['mRNA: transcription, carries message to ribosome', 1], ['tRNA: brings amino acids in coded order', 1]],
  d: 3, c: 'application', t: [5],
}));
add('dna-long', long({
  stem: '(a) What are the three components of a nucleotide, and how are nucleotides joined in a nucleic acid?\n\n(b) Describe the double-helix structure of DNA and the base-pairing rules.\n\n(c) A DNA sample contains 26% thymine. Find the percentages of the other bases, and explain why such a calculation is not possible for single-stranded RNA.',
  model: 'A nucleotide has a nitrogenous base, a pentose sugar and a phosphate group; base + sugar alone is a nucleoside. Nucleotides are joined by phosphodiester links between C5′ of one sugar and C3′ of the next, forming a sugar–phosphate backbone. DNA has two antiparallel strands coiled into a double helix, with the bases pointing inwards. Adenine pairs with thymine by two hydrogen bonds and guanine with cytosine by three, so the strands are complementary. If T = 26%, then A = 26%, A + T = 52%, G + C = 48% and G = C = 24%. RNA is usually single-stranded, so its bases are not paired one to one and the amounts need not be equal.',
  sol: 'Three components and linkage; double helix and pairing; 26, 24, 24; single strand.',
  scheme: [['(a) Components and phosphodiester link', 1], ['(b) Double helix and pairing rules', 1.5], ['(c) A 26%, G and C 24% each', 1.5], ['(c) RNA single-stranded', 1]],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 hormones
add('insulin-mcq', mcq({
  stem: 'In a person with untreated type 1 diabetes, blood glucose stays high after meals. This is due to too little of the hormone:',
  right: 'insulin',
  wrong: ['glucagon', 'adrenaline', 'thyroxine'],
  sol: 'Insulin from pancreatic β-cells lowers blood glucose; its lack keeps glucose high — option (@K). Glucagon raises glucose (@1).',
  d: 2, c: 'application', t: [6],
}));
add('steroid-mcq', mcq({
  stem: 'Which of these hormones is a steroid?',
  right: 'Testosterone',
  wrong: ['Insulin', 'Thyroxine', 'Adrenaline'],
  sol: 'Sex hormones are steroids — option (@K). Insulin is a polypeptide; thyroxine and adrenaline are amino acid derivatives.',
  d: 1, c: 'recall', t: [6],
}));
add('hormone-match', match({
  stem: 'Match each hormone with its main role.',
  pairs: [
    ['Glucagon', 'Raises blood glucose level'],
    ['Thyroxine', 'Controls the rate of metabolism'],
    ['Adrenaline', 'Prepares the body for emergencies'],
    ['Oestrogen', 'Controls female sexual development'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Glucagon raises glucose; thyroxine sets metabolic rate; adrenaline gives the fight-or-flight response; oestrogen controls female sexual characteristics.',
  d: 1, c: 'recall', t: [6],
}));
add('hormone-short', short({
  marks: 2,
  stem: 'Salt sold in India is iodised. Explain how a diet lacking iodine affects the body.',
  model: 'Iodine is needed by the thyroid gland to make the hormone thyroxine, which controls the rate of metabolism. Without enough iodine, too little thyroxine is made, causing hypothyroidism (tiredness, slow metabolism), and the thyroid gland enlarges, a condition called goitre.',
  sol: 'Iodine → thyroxine; lack → goitre, hypothyroidism.',
  scheme: [['Iodine needed for thyroxine (metabolic rate)', 1], ['Lack causes hypothyroidism and goitre', 1]],
  d: 2, c: 'application', t: [6],
}));
add('nutrition-long', long({
  stem: '(a) What are enzymes? State two features and give two examples with the reactions they catalyse.\n\n(b) Classify vitamins on the basis of solubility, and explain why the classification matters for diet.\n\n(c) Classify hormones by chemical nature with one example of each, and state the roles of insulin and glucagon.',
  model: 'Enzymes are biological catalysts, mostly globular proteins. They are highly specific and work under mild conditions by lowering the activation energy. Invertase hydrolyses sucrose to glucose and fructose; urease hydrolyses urea to ammonia and carbon dioxide. Vitamins A, D, E and K are fat-soluble and stored in the liver and fatty tissue, while the B vitamins and C are water-soluble and excreted, so they must be eaten regularly (B₁₂ is the exception, being stored). Hormones may be steroids (testosterone), polypeptides (insulin) or amino acid derivatives (thyroxine). Insulin lowers blood glucose by helping cells take it up, and glucagon raises it; together they keep blood sugar within a narrow range.',
  sol: 'Enzymes; vitamin solubility; hormone types; insulin and glucagon.',
  scheme: [['(a) Definition, two features, two examples', 2], ['(b) Fat- and water-soluble with dietary importance', 1.5], ['(c) Three classes with examples; insulin and glucagon', 1.5]],
  d: 2, c: 'understanding', t: [3, 4, 6],
}));

// ---------------------------------------------------------------- case-based
add('honey-case', mk.case({
  passage: 'A food-testing laboratory checks honey samples. Pure honey is mostly a mixture of glucose and fructose with a little water. Some suppliers add cheaper cane-sugar syrup. The laboratory finds that pure honey rotates plane-polarised light to the left and gives a heavy red precipitate with Fehling’s solution. It also records the reducing sugar content of each sample before and after boiling it with dilute acid; in pure honey the value hardly changes. (C = 12, H = 1, O = 16)',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why does pure honey give a red precipitate with Fehling’s solution?',
      right: 'Glucose and fructose are reducing sugars',
      wrong: ['Honey contains a large amount of sucrose', 'Honey contains starch', 'Water in honey reduces Cu²⁺ ions'],
      sol: 'Both monosaccharides have free carbonyl (or hemiacetal) groups that reduce Cu²⁺ to Cu₂O — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: r`What mass of fructose ($M = 180$), in grams, is formed when $171\ \text{g}$ of sucrose ($M = 342$) in an added syrup is completely hydrolysed?`,
      value: 90, tol: 0.5, unit: 'g',
      sol: r`One fructose per sucrose. Moles $= 171 \div 342 = 0.5$; mass $= 0.5 \times 180 = 90$, so $90\ \text{g}$.`,
      scheme: [['0.5 mol and 90 g', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the reducing sugar content of honey adulterated with cane-sugar syrup rises after boiling with dilute acid, while that of pure honey hardly changes.',
      model: 'Sucrose from the syrup is non-reducing, so it is not detected at first. Boiling with acid hydrolyses it into glucose and fructose, which are reducing, so the measured reducing sugar rises. Pure honey already contains its sugars as glucose and fructose, so acid causes little change.',
      sol: 'Hidden non-reducing sucrose is hydrolysed.',
      scheme: [['Sucrose non-reducing, hydrolysed by acid', 1], ['Pure honey already glucose + fructose', 1]],
      d: 3, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Glucose is dextrorotatory, yet pure honey is laevorotatory. Explain.',
        model: 'Honey contains roughly equal amounts of glucose and fructose. Fructose rotates light strongly to the left (about −92°), more strongly than glucose rotates it to the right (about +52.5°). So the net rotation of the mixture is to the left, as in invert sugar.',
        sol: 'Fructose’s larger negative rotation dominates.',
        scheme: [['Roughly equal glucose and fructose', 1], ['Fructose’s larger negative rotation outweighs glucose', 1]],
        d: 3, c: 'application', t: [1],
      }),
    ]),
  ],
}), () => near((171 / 342) * 180, 90) || 'honey');
add('diabetes-case', mk.case({
  passage: 'Rohan, aged 14, has type 1 diabetes: his pancreas makes almost no insulin. He checks his blood with a glucometer, whose test strip carries the enzyme glucose oxidase; the enzyme reacts with glucose but not with other sugars in blood. One morning before breakfast his reading is 180 mg of glucose per 100 mL of blood, well above the normal fasting range of about 70–100 mg per 100 mL. (Glucose: M = 180)',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which hormone acts opposite to insulin, raising Rohan’s blood glucose between meals?',
      right: 'Glucagon',
      wrong: ['Thyroxine', 'Testosterone', 'Oestrogen'],
      sol: 'Glucagon from pancreatic α-cells raises blood glucose — option (@K).',
      d: 1, c: 'recall', t: [6],
    })),
    part('b', num({
      stem: 'Express Rohan’s reading as a concentration in millimoles of glucose per litre of blood.',
      value: 10, tol: 0.1, unit: 'mmol/L',
      sol: r`180 mg per 100 mL $= 1800$ mg per litre. Amount $= 1800 \div 180 = 10$ mmol per litre, so $10\ \text{mmol L}^{-1}$.`,
      scheme: [['10 mmol/L', 1]],
      d: 3, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why is an enzyme used on the test strip rather than Fehling’s solution, which also reacts with glucose?',
      model: 'Fehling’s solution reacts with any reducing sugar and needs heating, so it cannot measure glucose alone. The enzyme glucose oxidase is specific: it reacts only with glucose, and it works quickly at room temperature with a tiny drop of blood.',
      sol: 'Specificity and mild conditions.',
      scheme: [['Fehling’s not specific, needs heat', 1], ['Enzyme specific, works under mild conditions', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Insulin is a protein. Suggest why Rohan has to inject insulin rather than swallow it as a tablet.',
        model: 'In the stomach and intestine, the protein-digesting enzymes such as pepsin and trypsin would hydrolyse the peptide bonds of insulin into smaller peptides and amino acids, and the stomach acid would denature it. It would lose its activity before reaching the blood, so it is injected.',
        sol: 'Digested by proteases.',
        scheme: [['Digestive enzymes hydrolyse peptide bonds / acid denatures', 1], ['Loses activity, so injected', 1]],
        d: 3, c: 'analysis', t: [2, 3],
      }),
    ]),
  ],
}), () => near((1800 / 180), 10) || 'diabetes');
add('protein-case', mk.case({
  passage: 'Meera’s family runs a small dairy in Anand. To make paneer, she heats milk nearly to boiling and stirs in lemon juice; the milk protein casein separates as soft white lumps, leaving a clear greenish whey. She also notices that hair, which is mostly the protein keratin, can be curled with heat and moisture, and that the curl slowly drops out when the hair gets wet. (Alanine: M = 89; water: M = 18)',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'When the milk protein separates on adding lemon juice, which bonds in the protein are mainly broken?',
      right: 'Hydrogen bonds and ionic attractions that hold its folded shape',
      wrong: ['Peptide bonds of the main chain', 'Glycosidic bonds', 'Phosphodiester bonds'],
      sol: 'Acid and heat disrupt the weak forces of secondary and tertiary structure; the peptide bonds survive — option (@K).',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'A short peptide in the whey is a tripeptide of three alanine units. What is its molar mass, in g/mol?',
      value: 231, tol: 0.5, unit: 'g/mol',
      sol: r`Two water molecules are lost: $3 \times 89 - 2 \times 18 = 231$, so $231\ \text{g mol}^{-1}$.`,
      scheme: [['267 − 36 = 231', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why does paneer not turn back into milk when it cools, even though the amino acid sequence of casein is unchanged?',
      model: 'Heating and acid unfolded the protein chains, which then tangled and clumped together in random ways. The chemical sequence is intact, but the original specific folded shape cannot reform from this tangled solid, so the change is not reversed on cooling.',
      sol: 'Denaturation irreversible: shape lost, sequence intact.',
      scheme: [['Chains unfold and aggregate', 1], ['Original folding not regained although primary structure intact', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Explain why heat-curled hair loses its curl when wet, using the bonds that hold keratin’s shape.',
        model: 'Heat breaks hydrogen bonds in keratin and, as the hair cools in a curled shape, new hydrogen bonds form that hold the curl. Water molecules compete for these hydrogen bonds and break them, so the chains relax back towards their original shape, which is held by stronger disulfide bonds.',
        sol: 'Curl held by hydrogen bonds that water breaks.',
        scheme: [['Curl set by re-formed hydrogen bonds', 1], ['Water breaks them; disulfide bonds restore shape', 1]],
        d: 4, c: 'analysis', t: [2],
      }),
    ]),
  ],
}), () => (3 * 89 - 2 * 18 === 231) || 'tripeptide');
add('dna-case', mk.case({
  passage: 'A forensic science laboratory extracts DNA from a small blood sample. Before analysis, the double-stranded DNA is heated to about 95 °C so that the two strands separate; on slow cooling they pair up again. A technician reports that the sample contains 22% cytosine. The laboratory also notes that heating at 95 °C does not break the DNA into separate nucleotides.',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which base pairs with guanine in DNA?',
      right: 'Cytosine',
      wrong: ['Adenine', 'Thymine', 'Uracil'],
      sol: 'G pairs with C by three hydrogen bonds — option (@K).',
      d: 1, c: 'recall', t: [5],
    })),
    part('b', num({
      stem: 'What percentage of the bases in the sample is adenine?',
      value: 28, tol: 0.1, unit: '%',
      sol: r`G = C = 22%, so G + C $= 44\%$; A + T $= 100 - 44 = 56\%$; A $= 56 \div 2 = 28$, so 28%.`,
      scheme: [['28%', 1]],
      d: 2, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why heating separates the two strands but does not break the DNA into nucleotides.',
      model: 'The two strands are held together only by hydrogen bonds between base pairs, which are weak and break on heating. Within each strand, nucleotides are joined by covalent phosphodiester bonds in the sugar–phosphate backbone, which are much stronger and are not broken at this temperature.',
      sol: 'Hydrogen bonds vs covalent phosphodiester bonds.',
      scheme: [['Strands held by weak hydrogen bonds', 1], ['Backbone covalent phosphodiester bonds survive', 1]],
      d: 3, c: 'analysis', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Explain why the separated strands can pair up again correctly on slow cooling.',
        model: 'The strands are complementary: each A on one strand faces a T on the other and each G faces a C. On slow cooling, the bases can find their partners, and the correct pairing gives the greatest number of hydrogen bonds, so the original double helix reforms.',
        sol: 'Complementary base pairing.',
        scheme: [['Complementary strands (A–T, G–C)', 1], ['Correct pairing maximises hydrogen bonding', 1]],
        d: 3, c: 'analysis', t: [5],
      }),
    ]),
  ],
}), () => ((100 - 2 * 22) / 2 === 28) || 'dna');
