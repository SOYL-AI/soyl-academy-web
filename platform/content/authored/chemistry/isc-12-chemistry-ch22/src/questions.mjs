// ISC 12 Chemistry ch22 Proteins, Vitamins and Nucleic Acids — question bank (ISC style). Stems name their own
// amino acids, proteins, cases and data. No vitamin or nucleic-acid chemical structures (removed topics).
// MCQ keys are placed by the builder; AR keys planned: a b a c a d. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 amino acids
add('zwitter-mcq', mcq({
  stem: 'In an aqueous solution kept at its isoelectric point, glycine exists mainly as:',
  right: 'H₃N⁺CH₂COO⁻',
  wrong: ['H₂NCH₂COOH', 'H₃N⁺CH₂COOH', 'H₂NCH₂COO⁻'],
  sol: 'At the pI both groups are ionised and the net charge is zero — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('essential-mcq', mcq({
  stem: 'Which of these amino acids is essential, so that it must be obtained from food such as pulses, milk or eggs?',
  right: 'Lysine',
  wrong: ['Glycine', 'Alanine', 'Glutamic acid'],
  sol: 'Lysine cannot be made in the human body — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('acidic-mcq', mcq({
  stem: 'Aspartic acid, HOOC–CH₂–CH(NH₂)–COOH, is classified as:',
  right: 'an acidic amino acid',
  wrong: ['a basic amino acid', 'a neutral amino acid', 'a β-amino acid'],
  sol: 'Two –COOH groups and one –NH₂ group — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('migrate-mcq', mcq({
  stem: 'Lysine has an isoelectric point of 9.7. In a buffer of pH 6.0 placed between two electrodes, lysine:',
  right: 'carries a net positive charge and moves towards the cathode',
  wrong: ['carries a net negative charge and moves towards the anode', 'has no net charge and does not move', 'carries a net positive charge and moves towards the anode'],
  sol: 'pH below pI → cation → cathode — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('chiral-mcq', mcq({
  stem: 'Which α-amino acid found in proteins is optically inactive?',
  right: 'Glycine, H₂NCH₂COOH',
  wrong: ['Alanine, CH₃CH(NH₂)COOH', 'Serine, HOCH₂CH(NH₂)COOH', 'Valine, (CH₃)₂CHCH(NH₂)COOH'],
  sol: 'The α-carbon of glycine carries two H atoms, so it is not chiral — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('amphoteric-tf', tf({
  stem: 'Alanine reacts both with dilute hydrochloric acid and with dilute sodium hydroxide solution.',
  key: 't',
  sol: 'True: the zwitter ion is amphoteric.',
  d: 2, c: 'understanding', t: [1],
}));
add('pi-fill', fill({
  stem: 'The pH at which an amino acid such as alanine carries no net charge and does not move in an electric field is called its ___ point.',
  acc: [['isoelectric']],
  sol: '**Isoelectric** point.',
  d: 1, c: 'recall', t: [1],
}));
add('zwitter-ar', ar({
  a: 'Glycine dissolves in water but is almost insoluble in benzene.',
  r: 'In the solid state and in water, glycine exists as a dipolar ion.',
  key: 'a',
  sol: 'Both are true, and the ionic (salt-like) nature explains the solubility — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('pi-num', num({
  marks: 2,
  stem: r`For alanine, $\text{p}K_{a1} = 2.34$ (–COOH) and $\text{p}K_{a2} = 9.69$ (–NH₃⁺). Taking the isoelectric point of a neutral amino acid as the mean of these two values, calculate the pI of alanine.`,
  value: 6.015, tol: 0.01,
  sol: r`$\text{pI} = \dfrac{2.34 + 9.69}{2} = 6.015$ (about 6.0).`,
  scheme: [['Mean of the two pKa values', 1], ['6.02', 1]],
  d: 2, c: 'application', t: [1],
}), () => near((2.34 + 9.69) / 2, 6.015) || 'pI');
add('aa-short', short({
  marks: 2,
  stem: 'Write the zwitter ion of alanine, and give equations to show how it reacts with (a) H⁺ ions and (b) OH⁻ ions.',
  model: r`Zwitter ion: $\ce{CH3CH(NH3+)COO-}$. (a) $\ce{CH3CH(NH3+)COO- + H+ -> CH3CH(NH3+)COOH}$ (–COO⁻ acts as a base). (b) $\ce{CH3CH(NH3+)COO- + OH- -> CH3CH(NH2)COO- + H2O}$ (–NH₃⁺ acts as an acid).`,
  sol: 'Zwitter ion; two equations.',
  scheme: [['Zwitter ion + (a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [1],
}));
add('classify-short3', short({
  marks: 3,
  stem: 'Classify amino acids (a) on the basis of whether the body can make them and (b) on the basis of the numbers of –NH₂ and –COOH groups, giving one example of each class. (c) Why is glycine the only common amino acid that is not optically active?',
  model: '(a) Essential (must be in the diet), e.g. valine or lysine; non-essential (made in the body), e.g. glycine or alanine. (b) Neutral (equal numbers), e.g. alanine; acidic (more –COOH), e.g. glutamic acid; basic (more –NH₂), e.g. lysine. (c) In glycine R = H, so the α-carbon carries two identical H atoms and is not chiral.',
  sol: 'Two classifications with examples; glycine not chiral.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('zwitter-short3', short({
  marks: 3,
  stem: '(a) Explain why amino acids are amphoteric. (b) What is meant by the isoelectric point? (c) Glutamic acid has a pI of 3.2. Towards which electrode will it move at pH 7, and why?',
  model: '(a) They exist as zwitter ions H₃N⁺–CH(R)–COO⁻: the –COO⁻ group accepts a proton from acids and the –NH₃⁺ group donates a proton to bases. (b) The pH at which the amino acid exists mainly as the zwitter ion with no net charge, so it does not migrate in an electric field. (c) pH 7 is above its pI, so it loses a proton and carries a net negative charge: it moves to the anode.',
  sol: 'Zwitter ion; definition; anode.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 peptides and proteins
add('peptidebond-mcq', mcq({
  stem: 'In the dipeptide glycylalanine, H₂NCH₂CO–NHCH(CH₃)COOH, the peptide bond is formed between:',
  right: 'the –COOH group of glycine and the –NH₂ group of alanine',
  wrong: ['the –NH₂ group of glycine and the –COOH group of alanine', 'the –COOH groups of both amino acids', 'the α-carbon atoms of the two amino acids'],
  sol: 'Glycine is written first (N-terminal), so its carboxyl group forms the amide link — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('primary-mcq', mcq({
  stem: 'The exact order in which the 51 amino-acid residues are joined in the two chains of insulin is called the protein’s:',
  right: 'primary structure',
  wrong: ['secondary structure', 'tertiary structure', 'quaternary structure'],
  sol: 'Sequence = primary structure — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('quaternary-mcq', mcq({
  stem: 'Haemoglobin is made of four polypeptide subunits held together in a definite spatial arrangement. This arrangement is its:',
  right: 'quaternary structure',
  wrong: ['primary structure', 'secondary structure', 'tertiary structure'],
  sol: 'Arrangement of subunits — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('fibrous-mcq', mcq({
  stem: 'Serum albumin dissolves in water, whereas the keratin of wool does not. The best explanation is that:',
  right: 'albumin is globular, its chains folded into a compact shape, while keratin is fibrous, with long parallel chains held together by hydrogen and disulfide bonds',
  wrong: ['albumin contains no peptide bonds', 'keratin is a carbohydrate, not a protein', 'albumin has a quaternary structure and keratin has none'],
  sol: 'Shape and inter-chain bonding decide solubility — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('sheet-tf', tf({
  stem: 'The α-helix and the β-pleated sheet are forms of the tertiary structure of proteins.',
  key: 'f',
  sol: 'False: they are forms of the secondary structure.',
  d: 2, c: 'recall', t: [2],
}));
add('nterm-fill', fill({
  stem: 'When a tripeptide is written as Gly–Ala–Val, glycine carries the free –NH₂ group and is called the ___-terminal residue.',
  acc: [['N', 'amino']],
  sol: '**N**-terminal.',
  d: 1, c: 'recall', t: [2],
}));
add('peptide-ar', ar({
  a: 'A tetrapeptide contains three peptide bonds.',
  r: 'Each peptide bond is formed with the loss of one molecule of water.',
  key: 'b',
  sol: 'Both are true, but A follows from four units being joined by three links, not from the loss of water — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('levels-match', match({
  stem: 'Match each level of protein structure with its description.',
  pairs: [
    ['Primary', 'Sequence of amino acids'],
    ['Secondary', 'α-Helix or β-pleated sheet held by hydrogen bonds'],
    ['Tertiary', 'Overall three-dimensional folding of one chain'],
    ['Quaternary', 'Arrangement of several polypeptide subunits'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Primary → sequence; secondary → helix or sheet; tertiary → overall folding; quaternary → subunits.',
  d: 1, c: 'recall', t: [2],
}));
add('tripep-num', num({
  marks: 2,
  stem: r`Glycine ($M = 75$), alanine ($M = 89$) and serine ($M = 105$) join to form the tripeptide Gly–Ala–Ser. Calculate its molar mass in $\text{g mol}^{-1}$. ($\ce{H2O}$: $M = 18$)`,
  value: 233, tol: 0,
  unit: 'g mol⁻¹',
  sol: r`Two peptide bonds release two $\ce{H2O}$: $M = 75 + 89 + 105 - 2 \times 18 = 233$.`,
  scheme: [['Two water molecules lost', 1], ['233', 1]],
  d: 2, c: 'application', t: [2],
}), () => 75 + 89 + 105 - 36 === 233 || 'M');
add('perm-num', num({
  stem: 'How many different tripeptides can be formed from valine, leucine and serine if each amino acid is used exactly once in every tripeptide?',
  value: 6, tol: 0,
  sol: r`Number of sequences $= 3 \times 2 \times 1 = 6$.`,
  scheme: [['6', 1]],
  d: 2, c: 'application', t: [2],
}), () => 3 * 2 * 1 === 6 || 'perm');
add('insulin-num', num({
  stem: 'Human insulin has two polypeptide chains, one of 21 and one of 30 amino-acid residues. How many peptide bonds does it contain in total?',
  value: 49, tol: 0,
  sol: r`$(21 - 1) + (30 - 1) = 20 + 29 = 49$.`,
  scheme: [['49', 1]],
  d: 3, c: 'application', t: [2],
}), () => 20 + 29 === 49 || 'bonds');
add('peptide-short', short({
  marks: 2,
  stem: 'Write an equation for the formation of the dipeptide alanylglycine from alanine and glycine, and identify the peptide bond.',
  model: r`$\ce{CH3CH(NH2)COOH + H2NCH2COOH -> CH3CH(NH2)CONHCH2COOH + H2O}$. The –CO–NH– group joining the alanine carbonyl to the glycine nitrogen is the peptide bond.`,
  sol: 'Equation with water; –CO–NH–.',
  scheme: [['Equation', 1], ['Peptide bond identified', 1]],
  d: 2, c: 'application', t: [2],
}));
add('levels-short', short({
  marks: 2,
  stem: 'Define (a) the secondary structure and (b) the quaternary structure of a protein, naming one protein or feature as an example of each.',
  model: '(a) Secondary: regular folding of the polypeptide chain into an α-helix or β-pleated sheet, held by hydrogen bonds between –CO– and –NH– groups — e.g. the α-helix in keratin. (b) Quaternary: the spatial arrangement of two or more polypeptide subunits — e.g. the four subunits of haemoglobin.',
  sol: 'Two definitions with examples.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('protein-short3', short({
  marks: 3,
  stem: r`For the tripeptide Gly–Ala–Val (glycine $M = 75$, alanine $M = 89$, valine $M = 117$): (a) state the number of peptide bonds, (b) calculate its molar mass and (c) name the N-terminal and C-terminal residues.`,
  model: r`(a) Two. (b) $M = 75 + 89 + 117 - 2 \times 18 = 245\ \text{g mol}^{-1}$. (c) N-terminal: glycine; C-terminal: valine.`,
  sol: '2; 245; Gly and Val.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [2],
}));
add('protein-long', long({
  stem: '(a) Show, with an equation, the formation of the dipeptide glycylalanine, and name the bond formed. [2]\n\n(b) Define the primary, secondary, tertiary and quaternary structures of proteins. [2]\n\n(c) Classify keratin and insulin as fibrous or globular proteins. [1]',
  model: r`(a) $\ce{H2NCH2COOH + H2NCH(CH3)COOH -> H2NCH2CONHCH(CH3)COOH + H2O}$; the –CO–NH– link is a peptide (amide) bond.

(b) Primary: sequence of amino acids. Secondary: α-helix or β-pleated sheet held by hydrogen bonds. Tertiary: overall three-dimensional folding of one chain. Quaternary: arrangement of two or more subunits.

(c) Keratin: fibrous. Insulin: globular.`,
  sol: 'Equation; four definitions; classification.',
  scheme: [['(a) equation', 1], ['(a) bond named', 1], ['(b) primary and secondary', 1], ['(b) tertiary and quaternary', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 denaturation, enzymes, hormones
add('alcohol-mcq', mcq({
  stem: 'A 70% ethanol hand rub kills bacteria by denaturing their proteins. During this denaturation, which bonds remain intact?',
  right: 'The peptide bonds of the polypeptide chains',
  wrong: ['The hydrogen bonds holding the α-helices', 'The interactions that maintain the tertiary folding', 'The attractions between protein subunits'],
  sol: 'Denaturation leaves the primary structure intact — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('heavymetal-mcq', mcq({
  stem: 'A person who has swallowed a solution of a mercury(II) salt is quickly given milk or raw egg white to drink. This first-aid measure works because:',
  right: 'the Hg²⁺ ions denature and precipitate the milk or egg proteins instead of the body’s own proteins',
  wrong: ['milk proteins reduce Hg²⁺ ions to harmless mercury vapour', 'egg white contains enzymes that hydrolyse mercury salts', 'the proteins neutralise the acid formed by mercury salts'],
  sol: 'Heavy-metal ions bind to and precipitate proteins — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('urease-mcq', mcq({
  stem: 'Urease catalyses the hydrolysis of urea to ammonia and carbon dioxide but has no effect on its close relative methylurea. This shows that enzymes are:',
  right: 'highly specific in their action',
  wrong: ['used up in the reactions they catalyse', 'active only at high temperatures', 'non-protein catalysts'],
  sol: 'Each enzyme acts on a particular substrate — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('pepsin-mcq', mcq({
  stem: 'Pepsin, which works in the acidic conditions of the stomach, catalyses the:',
  right: 'hydrolysis of proteins into smaller peptides',
  wrong: ['hydrolysis of starch into maltose', 'hydrolysis of sucrose into glucose and fructose', 'oxidation of glucose to carbon dioxide'],
  sol: 'Pepsin is a protease — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('glucagon-mcq', mcq({
  stem: 'Several hours after a meal, blood glucose begins to fall and the pancreas releases glucagon. Glucagon acts by:',
  right: 'promoting the breakdown of liver glycogen, raising blood glucose',
  wrong: ['converting blood glucose into glycogen, lowering blood glucose', 'increasing the absorption of iodine by the thyroid', 'catalysing the hydrolysis of sucrose in the gut'],
  sol: 'Glucagon opposes insulin — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('adrenaline-mcq', mcq({
  stem: 'A student suddenly sees a snake on the path; her heart races and her blood glucose rises within seconds. The hormone mainly responsible is:',
  right: 'adrenaline',
  wrong: ['insulin', 'thyroxine', 'testosterone'],
  sol: 'Adrenaline prepares the body for emergency — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('enzyme-tf', tf({
  stem: 'An enzyme molecule is used up in the reaction it catalyses and must be replaced after each reaction.',
  key: 'f',
  sol: 'False: like any catalyst, the enzyme is regenerated and used again.',
  d: 1, c: 'recall', t: [3],
}));
add('urease-fill', fill({
  stem: 'The enzyme ___ converts urea into ammonia and carbon dioxide.',
  acc: [['urease']],
  sol: '**Urease**.',
  d: 1, c: 'recall', t: [3],
}));
add('denat-ar', ar({
  a: 'A denatured enzyme loses its catalytic activity.',
  r: 'Denaturation destroys the secondary and tertiary structure on which the shape of the active site depends.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('denat-short', short({
  marks: 2,
  stem: 'Using the idea of denaturation, explain why (a) 70% alcohol is used to disinfect skin before an injection and (b) an enzyme from the human body stops working when heated above about 60 °C.',
  model: '(a) Alcohol breaks hydrogen bonds and other interactions in bacterial proteins, unfolding them so the bacteria die. (b) Heat denatures the enzyme: its secondary and tertiary structure (and so the active site) is lost, although the peptide bonds remain.',
  sol: 'Alcohol and heat both unfold proteins.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [3],
}));
add('urease-short', short({
  marks: 2,
  stem: 'Write the equation for the hydrolysis of urea catalysed by urease, and state two ways in which enzymes differ from inorganic catalysts such as finely divided nickel.',
  model: r`$\ce{NH2CONH2 + H2O ->[urease] 2NH3 + CO2}$. Enzymes are highly specific (one substrate or reaction); they work under mild conditions (body temperature, near-neutral or optimum pH) and are destroyed by heat; they are far more efficient. (Any two.)`,
  sol: 'Equation; two differences.',
  scheme: [['Equation', 1], ['Two differences', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('hormone-short', short({
  marks: 2,
  stem: 'What are hormones? Name the two pancreatic hormones that control blood glucose, and state the effect of each.',
  model: 'Hormones are chemical messengers produced by endocrine glands and carried in the blood to act on target organs. Insulin lowers blood glucose (promotes uptake and storage as glycogen); glucagon raises it (promotes glycogen breakdown in the liver).',
  sol: 'Definition; insulin and glucagon.',
  scheme: [['Definition', 1], ['Insulin and glucagon with effects', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('enzyme-short3', short({
  marks: 3,
  stem: 'A biology class tests the enzyme amylase from saliva on starch at 37 °C, at 80 °C, and at 37 °C in strongly acidic solution. (a) In which experiment is starch digested fastest? (b) Explain the result at 80 °C. (c) Explain the result in strongly acidic solution.',
  model: '(a) At 37 °C (near body temperature and the optimum pH of saliva). (b) At 80 °C the amylase is denatured: hydrogen bonds break, the folded shape and active site are lost, so it no longer catalyses the hydrolysis. (c) The strongly acidic pH is far from the optimum; it changes the charges on the protein and denatures or inactivates it, so little starch is digested.',
  sol: '37 °C fastest; heat and acid denature the enzyme.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('denat-long', long({
  stem: '(a) What is meant by denaturation of a protein? Name two agents that cause it. [2]\n\n(b) Which level of protein structure is unaffected by denaturation, and why? [1]\n\n(c) What are enzymes? State two characteristics and name one enzyme with its reaction. [2]',
  model: r`(a) Loss of the secondary and tertiary (and quaternary) structure of a protein, with loss of biological activity, when hydrogen bonds and other interactions are broken. Agents: heat, change of pH (acid or alkali), alcohol, heavy-metal ions (any two).

(b) The primary structure: denaturation does not break the covalent peptide bonds, so the amino-acid sequence is unchanged.

(c) Enzymes are biological catalysts, mostly globular proteins. They are highly specific and work best at an optimum temperature and pH. Urease: $\ce{NH2CONH2 + H2O -> 2NH3 + CO2}$.`,
  sol: 'Definition and agents; primary structure; enzymes.',
  scheme: [['(a) definition', 1], ['(a) two agents', 1], ['(b)', 1], ['(c) definition and characteristics', 1], ['(c) example', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 vitamins
add('vitgroup-mcq', mcq({
  stem: 'Which set consists only of fat-soluble vitamins?',
  right: 'A, D, E and K',
  wrong: ['B₁, C, D and K', 'A, B₂, C and E', 'C, D, E and K'],
  sol: 'A, D, E, K are fat-soluble; B group and C are water-soluble — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('night-mcq', mcq({
  stem: 'A child whose diet lacks milk, carrots and green vegetables finds it hard to see in dim light, and her eyes become dry. The vitamin most likely lacking is:',
  right: 'vitamin A',
  wrong: ['vitamin B₁', 'vitamin D', 'vitamin K'],
  sol: 'Night blindness and xerophthalmia — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('clot-mcq', mcq({
  stem: 'Before an operation, a patient whose cuts take unusually long to stop bleeding is given a vitamin injection. The vitamin is most likely:',
  right: 'vitamin K',
  wrong: ['vitamin C', 'vitamin E', 'vitamin B₆'],
  sol: 'Vitamin K is needed for blood clotting — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('rickets-mcq', mcq({
  stem: 'Several children in a town with heavy winter smog, who rarely play outdoors, develop soft, bow-shaped leg bones. The deficiency is most likely of:',
  right: 'vitamin D, causing rickets',
  wrong: ['vitamin C, causing scurvy', 'vitamin B₁, causing beriberi', 'vitamin A, causing xerophthalmia'],
  sol: 'Vitamin D is made in skin exposed to sunlight; lack causes rickets — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('b12-mcq', mcq({
  stem: 'Pernicious anaemia, in which red blood cells are deficient in haemoglobin, results from a lack of:',
  right: 'vitamin B₁₂',
  wrong: ['vitamin B₁', 'vitamin B₂', 'vitamin E'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('vite-tf', tf({
  stem: 'Deficiency of vitamin E increases the fragility of red blood cells and can cause muscular weakness.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [4],
}));
add('scurvy-fill', fill({
  stem: 'Sailors on long voyages without fresh fruit once suffered from ___, marked by swollen, bleeding gums, caused by lack of vitamin C.',
  acc: [['scurvy']],
  sol: '**Scurvy**.',
  d: 1, c: 'recall', t: [4],
}));
add('vit-match', match({
  stem: 'Match each deficiency symptom with the vitamin whose lack causes it.',
  pairs: [
    ['Cracked lips and digestive disorders (cheilosis)', 'Vitamin B₂'],
    ['Convulsions', 'Vitamin B₆'],
    ['Fragile red blood cells', 'Vitamin E'],
    ['Increased blood-clotting time', 'Vitamin K'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Cheilosis → B₂; convulsions → B₆; fragile RBCs → E; slow clotting → K.',
  d: 2, c: 'recall', t: [4],
}));
add('fatsol-ar', ar({
  a: 'Vitamin D need not be eaten every day in a normal diet.',
  r: 'Vitamin D is water-soluble.',
  key: 'c',
  sol: 'A is true (it is stored, and made in skin in sunlight); R is false: vitamin D is fat-soluble — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('vit-short', short({
  marks: 2,
  stem: 'A multivitamin label warns against taking more than the recommended dose of vitamins A and D, but gives no such warning for vitamin C. Explain this in terms of solubility and storage in the body.',
  model: 'Vitamins A and D are fat-soluble: excess is stored in the liver and fatty tissue and can build up to harmful levels (hypervitaminosis). Vitamin C is water-soluble: excess is not stored but is excreted in urine, so overdose is far less likely.',
  sol: 'Fat-soluble stored; water-soluble excreted.',
  scheme: [['A and D stored (fat-soluble)', 1], ['C excreted (water-soluble)', 1]],
  d: 3, c: 'application', t: [4],
}));
add('vit-short3', short({
  marks: 3,
  stem: 'Name the vitamin most likely to be deficient in each case, with the name of the condition where there is one: (a) a fisherman away at sea for months with only rice and dried fish develops bleeding gums; (b) a student with sore, cracked corners of the mouth who avoids milk and eggs; (c) a woman who has eaten a strict vegan diet for many years becomes anaemic.',
  model: '(a) Vitamin C — scurvy. (b) Vitamin B₂ — cheilosis. (c) Vitamin B₁₂ — pernicious anaemia (B₁₂ comes mainly from animal foods).',
  sol: 'C; B₂; B₁₂.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [4],
}));
add('nutrition-short3', short({
  marks: 3,
  stem: 'A nutritionist plans meals for a hostel where most students are vegetarian and study indoors all day. Explain why the plan must (a) combine cereals with pulses to supply essential amino acids, (b) include fresh citrus fruit or amla every day, and (c) encourage some time outdoors in sunlight.',
  model: '(a) Essential amino acids cannot be made in the body; cereals are low in lysine and pulses supply it, so together they provide all essential amino acids. (b) Vitamin C is water-soluble and not stored, so it is needed daily; citrus and amla are rich sources (prevents scurvy). (c) Vitamin D is made in the skin in sunlight; indoor living risks deficiency (rickets, osteomalacia).',
  sol: 'Essential amino acids; daily vitamin C; sunlight for vitamin D.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 4, c: 'evaluation', t: [1, 4],
}));
add('vitamin-long', long({
  stem: '(a) What are vitamins? Classify vitamins A, B₁, C, D, E and K as fat-soluble or water-soluble. [2]\n\n(b) Name the disease or symptom caused by deficiency of (i) vitamin A, (ii) vitamin B₁, (iii) vitamin D and (iv) vitamin K. [2]\n\n(c) Why are water-soluble vitamins needed in the diet regularly? [1]',
  model: '(a) Organic compounds required in small amounts in the diet for normal growth and health. Fat-soluble: A, D, E, K. Water-soluble: B₁, C.\n\n(b) (i) Night blindness / xerophthalmia. (ii) Beriberi. (iii) Rickets (children) / osteomalacia (adults). (iv) Increased blood-clotting time.\n\n(c) They are not stored in the body; excess is excreted in urine.',
  sol: 'Definition and classification; four deficiencies; not stored.',
  scheme: [['(a) definition', 1], ['(a) classification', 1], ['(b)(i)–(ii)', 1], ['(b)(iii)–(iv)', 1], ['(c)', 1]],
  d: 2, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- t05 nucleic acids
add('purine-mcq', mcq({
  stem: 'Which pair of bases found in DNA are both purines?',
  right: 'Adenine and guanine',
  wrong: ['Cytosine and thymine', 'Adenine and thymine', 'Guanine and cytosine'],
  sol: 'A and G are purines; C and T are pyrimidines — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('rnacombo-mcq', mcq({
  stem: 'Which combination of sugar and base occurs in RNA but not in DNA?',
  right: 'Ribose and uracil',
  wrong: ['Deoxyribose and thymine', 'Ribose and thymine', 'Deoxyribose and uracil'],
  sol: 'RNA: ribose with A, G, C, U — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('strands-mcq', mcq({
  stem: 'In the Watson–Crick double helix, the two strands of a DNA molecule are:',
  right: 'antiparallel and complementary, held together by hydrogen bonds between bases',
  wrong: ['parallel and identical in base sequence', 'joined by peptide bonds between bases', 'held together by phosphate groups shared between strands'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('trna-mcq', mcq({
  stem: 'During protein synthesis, which nucleic acid brings each amino acid to the ribosome?',
  right: 'Transfer RNA (tRNA)',
  wrong: ['Messenger RNA (mRNA)', 'Ribosomal RNA (rRNA)', 'DNA'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('rnacopy-mcq', mcq({
  stem: 'An RNA strand is built using a DNA strand with the base sequence G–C–A–T–T–A as a template. The base sequence of the RNA, read in the same direction, is:',
  right: 'C–G–U–A–A–U',
  wrong: ['C–G–T–A–A–T', 'G–C–A–U–U–A', 'G–C–U–A–A–U'],
  sol: 'G → C, C → G, A → U, T → A — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('base-ar', ar({
  a: 'In any double-stranded DNA, the number of purine bases equals the number of pyrimidine bases.',
  r: 'Every base pair in DNA consists of one purine and one pyrimidine.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('rna-ar', ar({
  a: 'RNA contains thymine as one of its bases.',
  r: 'The sugar in RNA is ribose.',
  key: 'd',
  sol: 'A is false (RNA has uracil instead); R is true — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('ratio-tf', tf({
  stem: 'For a double-stranded DNA sample, the ratio of (adenine + guanine) to (cytosine + thymine) is equal to 1.',
  key: 't',
  sol: 'True: A = T and G = C, so A + G = T + C.',
  d: 3, c: 'application', t: [5],
}));
add('crick-fill', fill({
  stem: 'The double-helix model of DNA was proposed in 1953 by James Watson and Francis ___.',
  acc: [['Crick']],
  sol: '**Crick**.',
  d: 1, c: 'recall', t: [5],
}));
add('cytosine-num', num({
  marks: 2,
  stem: 'A double-stranded DNA molecule of 2500 base pairs contains 700 adenine bases. How many cytosine bases does it contain?',
  value: 1800, tol: 0,
  sol: r`Total bases $= 2 \times 2500 = 5000$; A + T $= 2 \times 700 = 1400$; G + C $= 5000 - 1400 = 3600$; cytosine $= 3600 \div 2 = 1800$.`,
  scheme: [['Total bases and A + T', 1], ['1800', 1]],
  d: 3, c: 'application', t: [5],
}), () => (2 * 2500 - 2 * 700) / 2 === 1800 || 'C');
add('bases-short', short({
  marks: 2,
  stem: 'Name the purine and pyrimidine bases present in DNA, and state the base-pairing rules, including the number of hydrogen bonds in each pair.',
  model: 'Purines: adenine, guanine. Pyrimidines: cytosine, thymine. Adenine pairs with thymine through two hydrogen bonds; guanine pairs with cytosine through three hydrogen bonds.',
  sol: 'Four bases classified; A–T (2), G–C (3).',
  scheme: [['Bases classified', 1], ['Pairing with H-bonds', 1]],
  d: 2, c: 'recall', t: [5],
}));
add('dnarna-short3', short({
  marks: 3,
  stem: 'Compare DNA and RNA with respect to (a) the pentose sugar and the pyrimidine bases, (b) the number of strands and overall structure and (c) their main biological roles.',
  model: '(a) DNA: 2-deoxyribose; cytosine and thymine. RNA: ribose; cytosine and uracil. (b) DNA: two antiparallel strands in a double helix; RNA: usually a single strand. (c) DNA stores hereditary information and replicates; RNA (mRNA, tRNA, rRNA) carries out protein synthesis.',
  sol: 'Sugar and bases; strands; roles.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('rna-short3', short({
  marks: 3,
  stem: 'Name the three main types of RNA in a cell and state the role of each in making a protein such as haemoglobin.',
  model: 'Messenger RNA (mRNA) carries the coded sequence copied from the haemoglobin gene in DNA to the ribosome. Transfer RNA (tRNA) brings the correct amino acids to the ribosome, each matched to the code. Ribosomal RNA (rRNA) forms part of the ribosome, where the amino acids are joined by peptide bonds.',
  sol: 'mRNA, tRNA, rRNA with roles.',
  scheme: [['mRNA', 1], ['tRNA', 1], ['rRNA', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('nucleic-long', long({
  stem: '(a) Distinguish between a nucleoside and a nucleotide. [1]\n\n(b) Classify the bases adenine, guanine, cytosine, thymine and uracil as purines or pyrimidines, and state which occur in RNA. [2]\n\n(c) Describe the double-helix structure of DNA. [1]\n\n(d) A DNA molecule of 1200 base pairs contains 30% adenine. How many guanine bases does it contain? [1]',
  model: r`(a) Nucleoside = base + pentose sugar; nucleotide = base + sugar + phosphate.

(b) Purines: adenine, guanine. Pyrimidines: cytosine, thymine, uracil. RNA contains A, G, C and U.

(c) Two antiparallel polynucleotide strands wound round a common axis; sugar–phosphate backbones outside; bases inside, paired A–T (2 H-bonds) and G–C (3 H-bonds).

(d) Total bases $= 2 \times 1200 = 2400$; A = T = 30% each, so G = C = 20% each; G $= 0.20 \times 2400 = 480$.`,
  sol: 'Definitions; bases; helix; 480.',
  scheme: [['(a)', 1], ['(b) classification', 1], ['(b) RNA bases', 1], ['(c)', 1], ['(d)', 1]],
  d: 3, c: 'application', t: [5],
}));
