// ISC 12 Chemistry ch21 Carbohydrates — question bank (ISC style). Stems name their own sugars and data.
// MCQ keys are placed by the builder; AR keys planned: b a c d a b a. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 classification, reducing sugars
add('sugarclass-mcq', mcq({
  stem: 'Raffinose, a sugar in beans, gives one molecule each of galactose, glucose and fructose on complete hydrolysis and does not reduce Fehling’s solution. Raffinose is best described as:',
  right: 'a non-reducing oligosaccharide (trisaccharide)',
  wrong: ['a reducing trisaccharide', 'a polysaccharide', 'a ketohexose'],
  sol: 'Three units → oligosaccharide; no reaction with Fehling’s → non-reducing — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('formula-mcq', mcq({
  stem: 'Which compound can be written as Cₓ(H₂O)ᵧ but is NOT a carbohydrate?',
  right: 'Lactic acid, CH₃CH(OH)COOH (C₃H₆O₃)',
  wrong: ['Ribose, C₅H₁₀O₅', 'Maltose, C₁₂H₂₂O₁₁', 'Fructose, C₆H₁₂O₆'],
  sol: 'Lactic acid fits C₃(H₂O)₃ but is a hydroxy acid, not a polyhydroxy aldehyde or ketone — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('ketotriose-mcq', mcq({
  stem: 'A pentose, C₅H₁₀O₅, reduces Tollens’ reagent but does not decolourise bromine water. Its cyanohydrin, after hydrolysis and prolonged heating with HI, gives 2-methylpentanoic acid. The sugar is:',
  right: 'a ketopentose with the carbonyl group at C2',
  wrong: ['an aldopentose', 'a ketohexose with the carbonyl group at C2', 'an aldohexose'],
  sol: 'A branched product (methyl on C2 of a five-carbon acid) means the new –COOH went on to C2, so C=O was at C2; the sugar has five carbons, so it is a ketopentose. An aldopentose would give unbranched hexanoic acid; the bromine-water result agrees with a ketose — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('reducing-tf', tf({
  stem: 'Every monosaccharide, whether an aldose or a ketose, reduces Fehling’s solution.',
  key: 't',
  sol: 'True: aldoses have –CHO; ketoses such as fructose isomerise in alkali and also reduce it.',
  d: 2, c: 'understanding', t: [1, 3],
}));
add('oligo-fill', fill({
  stem: 'A carbohydrate that yields between two and ten monosaccharide units on hydrolysis is called an ___.',
  acc: [['oligosaccharide']],
  sol: '**Oligosaccharide**.',
  d: 1, c: 'recall', t: [1],
}));
add('class-match', match({
  stem: 'Match each carbohydrate with its correct description.',
  pairs: [
    ['Galactose', 'Aldohexose (monosaccharide)'],
    ['Lactose', 'Reducing disaccharide'],
    ['Sucrose', 'Non-reducing disaccharide'],
    ['Glycogen', 'Branched polysaccharide'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Galactose → aldohexose; lactose → reducing disaccharide; sucrose → non-reducing disaccharide; glycogen → branched polysaccharide.',
  d: 2, c: 'recall', t: [1, 4, 5],
}));
add('classify-short', short({
  marks: 2,
  stem: 'Two disaccharides are described only by their links. Melibiose: C1 of α-D-galactose joined to C6 of D-glucose. Trehalose: C1 of one α-D-glucose joined to C1 of another. For each, state with a reason whether it is reducing and whether its solution shows mutarotation.',
  model: 'Melibiose: the link uses C1 of galactose and C6 of glucose, so the anomeric carbon (C1) of the glucose unit is free, as a hemiacetal; it can open to –CHO, so melibiose is reducing and shows mutarotation. Trehalose: the link joins C1 to C1, so both anomeric carbons are tied up (no free hemiacetal); it is non-reducing and shows no mutarotation.',
  sol: 'Free anomeric carbon: melibiose yes, trehalose no.',
  scheme: [['Melibiose: reducing, mutarotation, reason', 1], ['Trehalose: non-reducing, no mutarotation, reason', 1]],
  d: 3, c: 'application', t: [1],
}));
add('classify-short3', short({
  marks: 3,
  stem: '(a) Define carbohydrates, and use rhamnose (C₆H₁₂O₅) and ethanoic acid (C₂H₄O₂) to show why “hydrates of carbon” is not a satisfactory definition. (b) Distinguish between sugars and non-sugars, with one example of each. (c) State two uses of carbohydrates other than as food.',
  model: '(a) Optically active polyhydroxy aldehydes or ketones, or compounds that give them on hydrolysis. Rhamnose is a carbohydrate but does not fit Cₓ(H₂O)ᵧ; ethanoic acid fits C₂(H₂O)₂ but is not a carbohydrate. (b) Sugars (mono- and disaccharides) are crystalline, sweet and water-soluble, e.g. sucrose; non-sugars (polysaccharides) are amorphous, tasteless and mostly insoluble, e.g. starch. (c) Cellulose for cotton textiles and paper; fermentation of starch or molasses to ethanol (also: wood for furniture, glucose drips).',
  sol: 'Definition with counter-examples; sugars vs non-sugars; two uses.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('test-short3', short({
  marks: 3,
  stem: 'Four unlabelled solutions contain glucose, fructose, sucrose and starch. Using only iodine solution, Fehling’s solution and bromine water, describe how you would identify each, giving the observations.',
  model: 'Iodine: only starch gives a blue-black colour. Fehling’s on the other three: sucrose gives no red precipitate (non-reducing); glucose and fructose both give red Cu₂O. Bromine water on these two: glucose decolourises it (oxidised to gluconic acid); fructose leaves it orange-brown.',
  sol: 'Iodine → starch; Fehling’s → sucrose; bromine water → glucose vs fructose.',
  scheme: [['Starch by iodine', 1], ['Sucrose by Fehling’s', 1], ['Glucose vs fructose by bromine water', 1]],
  d: 4, c: 'analysis', t: [1, 3, 5],
}));

// ---------------------------------------------------------------- t02 glucose: open chain, cyclic, D/L
add('hi-mcq', mcq({
  stem: 'Glucose gives n-hexane when heated for a long time with hydrogen iodide. This shows that glucose:',
  right: 'has its six carbon atoms in an unbranched chain',
  wrong: ['contains an aldehyde group', 'contains five hydroxyl groups', 'exists as a six-membered ring'],
  sol: 'n-Hexane is the straight-chain C₆ alkane — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('osazone-mcq', mcq({
  stem: 'D-Glucose is warmed with three moles of phenylhydrazine and gives a yellow osazone. The carbon atoms of glucose that take part are:',
  right: 'C1 and C2',
  wrong: ['C1 only', 'C1 and C6', 'C5 and C6'],
  sol: 'C1 (aldehyde) and the adjacent C2 (oxidised to C=O by the second mole) each form =N–NHC₆H₅ — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('acetyl-mcq', mcq({
  stem: 'Sucrose, C₁₂H₂₂O₁₁, has one ring oxygen in each unit and one glycosidic oxygen, and all its other oxygen atoms are in –OH groups. How many moles of acetic anhydride are needed to acetylate 0.25 mol of sucrose completely?',
  right: '2.0 mol',
  wrong: ['2.75 mol', '2.5 mol', '1.25 mol'],
  sol: 'Of 11 oxygen atoms, 3 are in ether links (two ring O, one glycosidic O), leaving 8 –OH groups; 0.25 × 8 = 2.0 mol — option (@K). Counting all 11 oxygens gives 2.75; counting two glucose units at five –OH each gives 2.5; copying glucose’s five gives 1.25.',
  d: 3, c: 'application', t: [2],
}));
add('nitric2-mcq', mcq({
  stem: 'D-Glucose is oxidised to acid X by nitric acid and to acid Y by bromine water. Which statement about X and Y is correct?',
  right: 'X is a dicarboxylic acid (saccharic acid) and Y a monocarboxylic acid (gluconic acid), both with six carbons',
  wrong: ['X and Y are both gluconic acid', 'X has five carbons because nitric acid removes C1', 'Y is a dicarboxylic acid and X a monocarboxylic acid'],
  sol: 'Bromine water oxidises only –CHO; nitric acid also oxidises –CH₂OH — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('dl-mcq', mcq({
  stem: 'In the Fischer projection of a hexose, drawn with the carbonyl group at the top, the –OH on the chiral carbon farthest from the carbonyl group points to the left. The sugar:',
  right: 'belongs to the L series, whatever its sign of rotation',
  wrong: ['must be laevorotatory', 'must be a ketose', 'must be the β-anomer'],
  sol: 'D/L is fixed by configuration relative to glyceraldehyde, not by rotation — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('pyranose-mcq', mcq({
  stem: 'When the C5 hydroxyl group of D-glucose adds to the C1 aldehyde group to close the pyranose ring, which carbon atom becomes a new chiral centre?',
  right: 'C1',
  wrong: ['C2', 'C5', 'C6'],
  sol: 'C1 gains an –OH and an –O– ring bond, becoming the anomeric carbon — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('bisulfite-mcq', mcq({
  stem: 'D-Glucose does not form an addition compound with sodium hydrogensulfite, although its open-chain formula has an aldehyde group. The best explanation is that:',
  right: 'in solution almost all glucose exists as the cyclic hemiacetal, with only a trace of free aldehyde',
  wrong: ['the aldehyde group of glucose is hindered by five –OH groups', 'sodium hydrogensulfite oxidises glucose to gluconic acid', 'glucose is a ketose'],
  sol: 'The aldehyde is tied up in the ring — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('mutarot-mcq', mcq({
  stem: 'A freshly prepared solution of pure β-D-glucose is placed in a polarimeter and observed for several hours. Its specific rotation:',
  right: 'rises slowly from +19.2° to a steady +52.5°',
  wrong: ['falls slowly from +111° to +52.5°', 'stays constant at +19.2°', 'changes slowly to a negative value'],
  sol: 'β converts partly to α until equilibrium (mutarotation) — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('hi-ar', ar({
  a: 'Prolonged heating of glucose with HI gives n-hexane.',
  r: 'Glucose has an aldehyde group at C1.',
  key: 'b',
  sol: 'Both are true, but the formation of n-hexane shows the straight chain, not the aldehyde group — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('anomer-ar', ar({
  a: 'D-Glucose can be obtained in two crystalline forms with different melting points and specific rotations.',
  r: 'Ring closure makes C1 of glucose a new chiral centre, giving two anomers.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('dl-ar', ar({
  a: 'D-Fructose is laevorotatory.',
  r: 'The letter D shows that a sugar rotates plane-polarised light to the right.',
  key: 'c',
  sol: 'A is true; R is false: D refers to configuration, not rotation — option (c).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('mutarot-tf', tf({
  stem: 'During mutarotation, α-D-glucose is converted into its enantiomer.',
  key: 'f',
  sol: 'False: α and β are anomers (diastereomers differing at C1), not enantiomers.',
  d: 2, c: 'understanding', t: [2],
}));
add('pyranose-fill', fill({
  stem: 'The six-membered ring form of glucose, containing five carbon atoms and one oxygen atom, is called the ___ form.',
  acc: [['pyranose']],
  sol: '**Pyranose**.',
  d: 1, c: 'recall', t: [2],
}));
add('evidence-match', match({
  stem: 'Match each reagent used in proving the structure of D-glucose with the product it forms.',
  pairs: [
    ['HI, prolonged heating', 'n-Hexane'],
    ['Hydroxylamine', 'Glucose oxime'],
    ['Acetic anhydride', 'Glucose pentaacetate'],
    ['Nitric acid', 'Saccharic acid'],
  ],
  order: [2, 0, 3, 1],
  sol: 'HI → n-hexane; NH₂OH → oxime; acetic anhydride → pentaacetate; HNO₃ → saccharic acid.',
  d: 1, c: 'recall', t: [2],
}));
add('stereo-num', num({
  stem: 'How many stereoisomers of the open-chain ketohexose HOCH₂–CO–(CHOH)₃–CH₂OH belong to the D series? (D and L forms are equally numerous.)',
  value: 4, tol: 0,
  sol: r`Chiral carbons: C3, C4 and C5 (C1 and C6 are $\ce{CH2OH}$, C2 is $\ce{C=O}$), so $3$ centres; total $= 2^{3} = 8$; half are D, so $8 \div 2 = 4$.`,
  scheme: [['3 chiral carbons, 8 in all', 1]],
  d: 3, c: 'application', t: [2],
}), () => 2 ** 3 / 2 === 4 || 'count');
add('mutarotation-num', num({
  marks: 2,
  stem: r`α-D-Glucose has $[\alpha]_D = +111^\circ$ and β-D-glucose $+19.2^\circ$; an equilibrium solution in water shows $+52.5^\circ$. Ignoring the open-chain form, what percentage of the dissolved glucose is the β-anomer?`,
  value: 63.7, tol: 0.2, unit: '%',
  sol: r`$111(1 - x) + 19.2x = 52.5$, so $x = \dfrac{58.5}{91.8} = 0.637$; percentage β $= 0.637 \times 100 = 63.7$.`,
  scheme: [['Weighted-average equation', 1], ['63.7%', 1]],
  d: 3, c: 'application', t: [2],
}), () => near((111 - 52.5) / (111 - 19.2) * 100, 63.7, 0.002) || 'fraction');
add('acetyl-num', num({
  marks: 2,
  stem: r`$3.60\ \text{g}$ of glucose ($M = 180$) is converted completely into glucose pentaacetate, $\ce{C16H22O11}$ ($M = 390$). What mass of the pentaacetate is formed?`,
  value: 7.8, tol: 0.02, unit: 'g',
  sol: r`$n = 3.60 \div 180 = 0.0200\ \text{mol}$; mass $= 0.0200 \times 390 = 7.80\ \text{g}$.`,
  scheme: [['0.0200 mol', 1], ['7.80 g', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(3.6 / 180 * 390, 7.8) || 'mass');
add('osazone-num', num({
  marks: 2,
  stem: r`What is the minimum mass of phenylhydrazine ($M = 108$) needed to convert $9.00\ \text{g}$ of glucose ($M = 180$) completely into its osazone? ($\ce{C6H12O6 + 3C6H5NHNH2 -> C18H22N4O4 + C6H5NH2 + NH3 + 2H2O}$)`,
  value: 16.2, tol: 0.05, unit: 'g',
  sol: r`$n(\text{glucose}) = 9.00 \div 180 = 0.0500\ \text{mol}$; phenylhydrazine $= 3 \times 0.0500 = 0.150\ \text{mol}$; mass $= 0.150 \times 108 = 16.2\ \text{g}$.`,
  scheme: [['1 : 3 ratio, 0.150 mol', 1], ['16.2 g', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(9 / 180 * 3 * 108, 16.2) || 'mass');
add('evidence-short', short({
  marks: 2,
  stem: 'D-Ribose, HOCH₂(CHOH)₃CHO, a sugar not met in the glucose experiments, is treated with (a) bromine water and (b) excess acetic anhydride. Write a balanced equation for each, giving the formula of the organic product, and state how many moles of acetic anhydride react with one mole of ribose, with your reasoning.',
  model: r`(a) $\ce{HOCH2(CHOH)3CHO + Br2 + H2O -> HOCH2(CHOH)3COOH + 2HBr}$: ribonic acid; only the –CHO is oxidised. (b) The open-chain form has four –OH groups (three secondary and one primary), each acetylated: $\ce{C5H10O5 + 4(CH3CO)2O -> C13H18O9 + 4CH3COOH}$, so 4 mol of acetic anhydride per mole of ribose.`,
  sol: 'Ribonic acid; four –OH groups give a tetraacetate (C₁₃H₁₈O₉) using 4 mol.',
  scheme: [['(a) equation and product', 1], ['(b) equation and 4 mol with reasoning', 1]],
  d: 3, c: 'application', t: [2],
}));
add('dl-short', short({
  marks: 2,
  stem: 'Explain what “D” and “(+)” mean in the name D-(+)-glucose. Why is natural fructose written as D-(−)-fructose?',
  model: 'D: in the Fischer projection, the –OH on the chiral carbon farthest from the carbonyl (C5) is on the right, as in D-glyceraldehyde — a statement about configuration. (+): the sugar rotates plane-polarised light to the right (dextrorotatory). Fructose has the same configuration at C5 (D) but is laevorotatory, so it is D-(−); the two labels are independent.',
  sol: 'D = configuration; (+) = rotation; independent.',
  scheme: [['Meaning of D and (+)', 1], ['Fructose explanation', 1]],
  d: 2, c: 'understanding', t: [2, 3],
}));
add('anomer-short', short({
  marks: 2,
  stem: 'What are anomers? Using rotation values, describe what happens when crystals of α-D-glucose are dissolved in water and the solution is left to stand.',
  model: 'Anomers are cyclic stereoisomers that differ only in configuration at the anomeric carbon (C1 of glucose). A fresh solution of α-D-glucose shows +111°; the ring opens and closes, forming β until equilibrium, and the rotation falls to a constant +52.5° (mutarotation).',
  sol: 'Definition; +111° → +52.5°.',
  scheme: [['Definition', 1], ['Mutarotation with values', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('cyclic-short3', short({
  marks: 3,
  stem: '(a) Name the two groups in open-chain D-glucose that react to form the pyranose ring, and the type of compound formed. (b) Explain why methyl α-D-glucoside, formed with methanol and dry HCl, does not reduce Fehling’s solution, although glucose does. (c) Explain why a solution of glucose shows mutarotation but a solution of methyl α-D-glucoside does not.',
  model: '(a) The C5 –OH adds to the C1 –CHO, forming a cyclic hemiacetal. (b) In the glucoside the anomeric –OH is replaced by –OCH₃ (an acetal), so the ring cannot open to give a free aldehyde; glucose itself has a hemiacetal that opens in alkaline Fehling’s. (c) Mutarotation needs the ring to open and re-close at C1, which a hemiacetal can do; the glucoside is an acetal, locked as one anomer, so its rotation stays constant.',
  sol: 'Hemiacetal; acetal cannot open; no ring opening, no mutarotation.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('evidence-short3', short({
  marks: 3,
  stem: 'D-Glucose is treated separately with (a) acetic anhydride, (b) concentrated nitric acid and (c) excess phenylhydrazine. For each, name the product and state what it reveals about glucose.',
  model: '(a) Glucose pentaacetate: five –OH groups, each on a different carbon. (b) Saccharic acid, HOOC(CHOH)₄COOH: besides –CHO there is a primary –CH₂OH group at the other end of the chain. (c) Glucosazone: the carbonyl group is at C1 next to a –CHOH group (C1 and C2 react).',
  sol: 'Pentaacetate; saccharic acid; osazone.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('mutarot-short3', short({
  marks: 3,
  stem: r`α-D-Galactose has a specific rotation of $+150.7^\circ$ and β-D-galactose $+52.8^\circ$; an equilibrium solution in water shows $+80.2^\circ$. (a) Name the phenomenon. (b) Calculate the percentage of the β-anomer at equilibrium, ignoring the open chain. (c) Which anomer is more stable in water?`,
  model: r`(a) Mutarotation. (b) $150.7(1 - x) + 52.8x = 80.2$, so $x = \dfrac{150.7 - 80.2}{150.7 - 52.8} = \dfrac{70.5}{97.9} = 0.720$: about 72.0% β. (c) The β-anomer, which predominates.`,
  sol: 'Mutarotation; 72.0% β; β more stable.',
  scheme: [['(a)', 0.5], ['(b) equation', 1], ['(b) 72.0%', 1], ['(c)', 0.5]],
  d: 4, c: 'application', t: [2],
}));
add('glucose-long', long({
  stem: '(a) Describe the reactions of D-glucose with (i) HI, (ii) hydroxylamine and (iii) bromine water, and state what each shows about its open-chain structure. [3]\n\n(b) Give two observations that the open-chain structure cannot explain. [1]\n\n(c) What does the letter D in D-glucose signify? [1]',
  model: r`(a) (i) Prolonged heating with HI gives n-hexane: six carbons in an unbranched chain. (ii) $\ce{HOCH2(CHOH)4CHO + NH2OH -> HOCH2(CHOH)4CH=NOH + H2O}$: a carbonyl group. (iii) $\ce{HOCH2(CHOH)4CHO + Br2 + H2O -> HOCH2(CHOH)4COOH + 2HBr}$: no carbon lost, so the carbonyl is an aldehyde.

(b) Any two: no Schiff’s test; no NaHSO₃ adduct; the pentaacetate does not react with NH₂OH; two crystalline forms (α and β) with different rotations; mutarotation.

(c) In the Fischer projection, the –OH on C5 (lowest chiral carbon) is on the right, as in D-glyceraldehyde.`,
  sol: 'Three reactions with inferences; two anomalies; meaning of D.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(a)(iii)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 fructose and the bromine-water test
add('brwater-mcq', mcq({
  stem: 'A laboratory assistant has two unlabelled bottles, one of glucose solution and one of fructose solution. Which reagent will tell them apart?',
  right: 'Bromine water',
  wrong: ['Fehling’s solution', 'Tollens’ reagent', 'Excess phenylhydrazine'],
  sol: 'Only glucose decolourises bromine water; both reduce Fehling’s and Tollens’ and give the same osazone — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('furanose-mcq', mcq({
  stem: 'D-Ribose, HOCH₂(CHOH)₃CHO, closes into a five-membered ring (four carbons and one oxygen). Which hydroxyl group adds to the C1 aldehyde group to form this ring?',
  right: 'the C4 –OH',
  wrong: ['the C5 –OH, the terminal primary –OH', 'the C3 –OH, in the middle of the chain', 'the C2 –OH, the one nearest the carbonyl group'],
  sol: 'The ring contains the ring oxygen plus the carbons from C1 up to the carbon bearing that –OH. Four carbons (C1 to C4) plus oxygen means the C4 –OH closes the ring; the C5 –OH would give a six-membered ring — option (@K).',
  d: 3, c: 'understanding', t: [3],
}));
add('methylhex-mcq', mcq({
  stem: 'Fructose is converted to its cyanohydrin, which is hydrolysed and then heated with HI. The final product is:',
  right: '2-methylhexanoic acid',
  wrong: ['heptanoic acid', 'hexanoic acid', 'n-hexane'],
  sol: 'The new –COOH is on C2, so it forms a branch: CH₃(CH₂)₃CH(CH₃)COOH — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('fehlingfru-mcq', mcq({
  stem: 'Fructose, a ketose, still reduces Fehling’s solution because:',
  right: 'in the alkaline reagent it isomerises through an enediol to aldoses, which are oxidised',
  wrong: ['its ketone group is oxidised directly to a carboxylic acid', 'its furanose ring contains an aldehyde group', 'it is hydrolysed by Fehling’s solution to glucose'],
  sol: 'Alkali causes keto–enol rearrangement (Lobry de Bruyn–van Ekenstein) — option (@K).',
  d: 3, c: 'understanding', t: [3],
}));
add('fehling-ar', ar({
  a: 'Tollens’ reagent can be used to distinguish glucose from fructose.',
  r: 'Fructose is a non-reducing sugar.',
  key: 'd',
  sol: 'Both are false: fructose is a reducing sugar, so glucose and fructose both give a silver mirror and Tollens’ reagent cannot tell them apart — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('brwater-ar', ar({
  a: 'Bromine water oxidises glucose but not fructose.',
  r: 'Bromine water is a mild oxidant that is not alkaline, so it attacks an aldehyde group but cannot first convert a ketose into an aldose.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'understanding', t: [3],
}));
add('osazone-tf', tf({
  stem: 'D-Glucose and D-fructose give the same osazone with excess phenylhydrazine.',
  key: 't',
  sol: 'True: only C1 and C2 react, and C3–C5 are identical in the two sugars.',
  d: 2, c: 'understanding', t: [3],
}));
add('laevo-fill', fill({
  stem: 'Because it turns plane-polarised light to the left, natural fructose is described as ___ (dextrorotatory or laevorotatory).',
  acc: [['laevorotatory', 'levorotatory']],
  sol: '**Laevorotatory**.',
  d: 1, c: 'recall', t: [3],
}));
add('brwater-num', num({
  marks: 2,
  stem: r`A solution containing $0.900\ \text{g}$ of glucose ($M = 180$) is oxidised completely by bromine water. What mass of bromine, $\ce{Br2}$ ($M = 160$), is used? ($\ce{HOCH2(CHOH)4CHO + Br2 + H2O -> HOCH2(CHOH)4COOH + 2HBr}$)`,
  value: 0.8, tol: 0.005, unit: 'g',
  sol: r`$n = 0.900 \div 180 = 0.00500\ \text{mol}$; 1 : 1, so mass of $\ce{Br2} = 0.00500 \times 160 = 0.800\ \text{g}$.`,
  scheme: [['0.00500 mol', 1], ['0.800 g', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(0.9 / 180 * 160, 0.8) || 'mass');
add('fructose-short', short({
  marks: 2,
  stem: 'Write the open-chain formula of fructose, and explain how the formation of 2-methylhexanoic acid (via the cyanohydrin, hydrolysis and HI) proves the position of its carbonyl group.',
  model: 'HOCH₂–CO–(CHOH)₃–CH₂OH. HCN adds at the C=O; the –CN becomes –COOH and HI removes all –OH groups. A branch (–COOH) appears on C2 of a six-carbon chain, so the C=O was at C2 (glucose, with C=O at C1, gives unbranched heptanoic acid).',
  sol: 'Formula; branch on C2.',
  scheme: [['Formula', 1], ['Reasoning', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('distinguish-short', short({
  marks: 2,
  stem: 'Give a chemical test, with an equation, to distinguish glucose from fructose, and explain why Fehling’s solution cannot be used for this purpose.',
  model: r`Bromine water: glucose decolourises it, fructose does not. $\ce{HOCH2(CHOH)4CHO + Br2 + H2O -> HOCH2(CHOH)4COOH + 2HBr}$. Fehling’s is alkaline; fructose isomerises in alkali to aldoses and so reduces it too — both give red Cu₂O.`,
  sol: 'Bromine water; both reduce Fehling’s.',
  scheme: [['Test + equation', 1], ['Reason for Fehling’s', 1]],
  d: 2, c: 'application', t: [3],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Compare glucose and fructose with respect to (a) the type and position of the carbonyl group, (b) the size of the ring in the cyclic form and (c) their behaviour with bromine water.',
  model: '(a) Glucose: aldehyde at C1 (aldohexose); fructose: ketone at C2 (ketohexose). (b) Glucose: six-membered pyranose (C5–OH + C1); fructose: five-membered furanose (C5–OH + C2). (c) Glucose decolourises bromine water (→ gluconic acid); fructose does not react.',
  sol: 'Carbonyl; ring; bromine water.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [2, 3],
}));
add('fructose-long', long({
  stem: '(a) Write the open-chain structure of D-fructose and describe how its cyclic structure is formed, naming the ring type. [2]\n\n(b) Describe, with an equation, a test to distinguish glucose from fructose. [2]\n\n(c) Why do glucose and fructose give the same osazone? [1]',
  model: r`(a) HOCH₂–CO–(CHOH)₃–CH₂OH (ketohexose, C=O at C2). The C5 –OH adds to the C2 ketone, giving a five-membered furanose ring (cyclic hemiketal) with α and β anomers.

(b) Bromine water: decolourised by glucose only. $\ce{HOCH2(CHOH)4CHO + Br2 + H2O -> HOCH2(CHOH)4COOH + 2HBr}$.

(c) Only C1 and C2 react with phenylhydrazine; the configurations at C3, C4 and C5 are the same in both sugars.`,
  sol: 'Structure and furanose; bromine water; C1–C2 only.',
  scheme: [['(a) open chain', 1], ['(a) ring', 1], ['(b) test', 1], ['(b) equation', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 disaccharides
add('linkage-mcq', mcq({
  stem: 'Maltose, formed when the enzyme diastase acts on starch, contains two glucose units joined by:',
  right: 'an α-1,4 glycosidic link',
  wrong: ['a β-1,4 glycosidic link', 'an α-1,6 glycosidic link', 'an α1→β2 glycosidic link'],
  sol: 'C1 of one α-D-glucose to C4 of the next — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('sucroselink-mcq', mcq({
  stem: 'A disaccharide W gives only D-fructose on hydrolysis. W does not reduce Tollens’ reagent and its solution shows no mutarotation. Which link between the two fructose units fits these observations?',
  right: 'C2 of one unit joined to C2 of the other, using both anomeric carbons',
  wrong: ['C2 of one unit joined to C6 of the other', 'C2 of one unit joined to C1 of the other', 'C2 of one unit joined to C4 of the other'],
  sol: 'No reduction and no mutarotation means no free hemiketal: both anomeric carbons (C2 in a ketose) must be in the link. A link from C2 to any other carbon leaves the second unit’s C2 free, so that sugar would reduce and show mutarotation — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('lactoselink-mcq', mcq({
  stem: 'Lactose, the sugar of milk, contains a glycosidic link between:',
  right: 'C1 of β-D-galactose and C4 of D-glucose',
  wrong: ['C1 of α-D-glucose and C2 of β-D-fructose', 'C1 of α-D-glucose and C4 of D-glucose', 'C1 of β-D-glucose and C6 of D-galactose'],
  sol: 'β-1,4 from galactose to glucose — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('mutarotdi-mcq', mcq({
  stem: 'Which of the following shows mutarotation when dissolved in water?',
  right: 'Lactose',
  wrong: ['Sucrose', 'Cellulose', 'Trehalose, in which two glucose units are joined C1 to C1'],
  sol: 'Lactose keeps a free hemiacetal at C1 of its glucose unit; sucrose and trehalose use both anomeric carbons — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('lactose-ar', ar({
  a: 'Lactose is a reducing sugar.',
  r: 'Lactose is made of galactose and glucose units.',
  key: 'b',
  sol: 'Both are true, but the reason for reducing power is the free hemiacetal at C1 of the glucose unit — option (b).',
  d: 2, c: 'understanding', t: [4],
}));
add('ring-tf', tf({
  stem: 'In sucrose, the glucose unit is present as a pyranose ring and the fructose unit as a furanose ring.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [4],
}));
add('glycosidic-fill', fill({
  stem: 'The C–O–C link joining two monosaccharide units through an anomeric carbon, as in maltose, is called a ___ linkage.',
  acc: [['glycosidic']],
  sol: '**Glycosidic**.',
  d: 1, c: 'recall', t: [4],
}));
add('disacch-match', match({
  stem: 'Match each disaccharide with its glycosidic link.',
  pairs: [
    ['Sucrose', 'α-Glucose C1 – β-fructose C2'],
    ['Maltose', 'α-Glucose C1 – glucose C4'],
    ['Lactose', 'β-Galactose C1 – glucose C4'],
    ['Cellobiose (from cellulose)', 'β-Glucose C1 – glucose C4'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Sucrose α1→β2; maltose α1→4; lactose β1→4 (galactose); cellobiose β1→4 (glucose).',
  d: 2, c: 'understanding', t: [4, 5],
}));
add('invert-num', num({
  marks: 2,
  stem: r`Sucrose is hydrolysed completely to an equimolar mixture of D-glucose ($[\alpha]_D = +52.5^\circ$ at equilibrium) and D-fructose ($-92.4^\circ$). Taking the specific rotation of the mixture as the average of the two, calculate it.`,
  value: -19.95, tol: 0.1, unit: '°',
  sol: r`$[\alpha]_D = \dfrac{52.5 - 92.4}{2} = -19.95^\circ$ (about $-20^\circ$): the sign has changed from $+$ to $-$, so the mixture is invert sugar.`,
  scheme: [['Average of the two', 1], ['−19.95°', 1]],
  d: 3, c: 'application', t: [4],
}), () => near((52.5 - 92.4) / 2, -19.95) || 'rotation');
add('disacch-short', short({
  marks: 2,
  stem: 'A student claims: “Maltose, with an α-1,4 link, reduces Tollens’ reagent, but cellobiose, in which two β-D-glucose units are joined C1 to C4, cannot, because only α-links give reducing sugars.” Judge this claim, using the structure of cellobiose to justify your answer.',
  model: 'The claim is wrong. Reducing power depends on whether a free anomeric carbon (hemiacetal) remains, not on whether the link is α or β. In cellobiose the link uses C1 of the first unit and C4 of the second, so C1 of the second glucose unit is still a free hemiacetal; it can open to give –CHO, so cellobiose reduces Tollens’ reagent (and shows mutarotation). Only when both anomeric carbons are in the link, as in sucrose, is a disaccharide non-reducing.',
  sol: 'Claim false; free hemiacetal at C1 of second unit.',
  scheme: [['Verdict: claim is wrong', 1], ['Free anomeric carbon of the second unit', 1]],
  d: 3, c: 'application', t: [4],
}));
add('invert-short', short({
  marks: 2,
  stem: r`A solution of $10.0\ \text{g}$ of sucrose ($M = 342$, $[\alpha]_D = +66.5^\circ$) in $100\ \text{mL}$ is placed in a $1\ \text{dm}$ polarimeter tube. It is then completely hydrolysed by invertase to glucose and fructose ($[\alpha]_D = +52.5^\circ$ and $-92.4^\circ$; $M = 180$ each; $\ce{C12H22O11 + H2O -> C6H12O6 + C6H12O6}$). Calculate the observed rotation before and after hydrolysis, taking the volume as unchanged, and explain the change of sign.`,
  model: r`Before: $\alpha = 66.5 \times 1 \times 0.100 = +6.65^\circ$. After: $10.0\ \text{g}$ sucrose is $10.0 \div 342 = 0.02924\ \text{mol}$, giving $0.02924\ \text{mol}$ each of glucose and fructose, i.e. $0.02924 \times 180 = 5.263\ \text{g}$ of each in $100\ \text{mL}$ ($0.05263\ \text{g mL}^{-1}$). $\alpha = (52.5 - 92.4) \times 0.05263 = -2.10^\circ$. The rotation changes from $+6.65^\circ$ to $-2.10^\circ$ because fructose is more strongly laevorotatory than glucose is dextrorotatory, so the equimolar mixture (invert sugar) is laevorotatory.`,
  sol: 'Initial +6.65°; moles of each product; rotation −2.10°; fructose dominates.',
  scheme: [['Initial rotation +6.65°', 0.5], ['Mass of each product 5.26 g', 0.5], ['Final rotation −2.10°', 0.5], ['Explanation of the sign change', 0.5]],
  d: 3, c: 'application', t: [4],
}));
add('disacch-short3', short({
  marks: 3,
  stem: 'A disaccharide Z reduces Tollens’ reagent. The enzyme lactase hydrolyses it to D-galactose and D-glucose. (a) Identify Z. (b) Describe the glycosidic link in Z. (c) Explain why Z is a reducing sugar whereas sucrose is not.',
  model: '(a) Lactose. (b) β-1,4: C1 of β-D-galactose to C4 of D-glucose. (c) In lactose C1 of the glucose unit is a free hemiacetal that can open to –CHO; in sucrose both anomeric carbons (C1 of glucose, C2 of fructose) are used in the link, so no ring can open.',
  sol: 'Lactose; β-1,4; free hemiacetal.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [4],
}));
add('sucrose-long', long({
  stem: '$3.42\\ \\text{g}$ of a disaccharide Y ($\\ce{C12H22O11}$, $M = 342$) gives only D-glucose on hydrolysis with dilute acid. Y reduces Tollens’ reagent and shows mutarotation.\n\n(a) What do these two observations show about the glycosidic link of Y, and why does Y differ from sucrose in this respect? [2]\n\n(b) Y has eight –OH groups. Calculate the moles of acetic anhydride needed to acetylate the 3.42 g sample completely. [1]\n\n(c) Calculate the mass of glucose obtained when the 3.42 g sample is hydrolysed completely. [2]',
  model: r`(a) The link joins the anomeric carbon (C1) of one glucose unit to a non-anomeric carbon of the other (for example C4 as in maltose), so the second unit keeps a free hemiacetal. That ring can open to give –CHO (reduces Tollens’ reagent) and re-close as α or β (mutarotation). In sucrose both anomeric carbons are used in the link, so neither effect occurs.

(b) $n(\text{Y}) = 3.42 \div 342 = 0.0100\ \text{mol}$; moles of acetic anhydride $= 8 \times 0.0100 = 0.0800\ \text{mol}$.

(c) $\ce{C12H22O11 + H2O -> 2C6H12O6}$: $0.0100\ \text{mol}$ gives $0.0200\ \text{mol}$ glucose; mass $= 0.0200 \times 180 = 3.60\ \text{g}$.`,
  sol: 'Free hemiacetal; 0.0800 mol; 3.60 g.',
  scheme: [['(a) link joins C1 to a non-anomeric carbon', 1], ['(a) free hemiacetal vs sucrose', 1], ['(b) 0.0800 mol', 1], ['(c) 0.0200 mol glucose', 1], ['(c) 3.60 g', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 polysaccharides
add('amylo-mcq', mcq({
  stem: 'Amylopectin, the major component of potato starch, differs from amylose in that amylopectin:',
  right: 'has branches formed by α-1,6 links',
  wrong: ['is built from β-D-glucose', 'gives a deep blue colour with iodine and dissolves readily in water', 'is a polymer of fructose'],
  sol: 'Both use α-1,4 chains; amylopectin is branched through C6 — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('glycogen-mcq', mcq({
  stem: 'After a meal, excess glucose in the body is stored in the liver and muscles as:',
  right: 'glycogen, a highly branched α-glucose polymer',
  wrong: ['cellulose, an unbranched β-glucose polymer', 'amylose, an unbranched α-glucose polymer', 'sucrose, a non-reducing disaccharide'],
  sol: 'Glycogen is animal starch — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('cellhb-mcq', mcq({
  stem: 'Cotton fibres, almost pure cellulose, are strong and do not dissolve in water even though each glucose unit has free –OH groups. The main reason is that:',
  right: 'straight β-1,4 chains lie side by side, held together by many hydrogen bonds',
  wrong: ['cellulose chains are highly branched like glycogen', 'cellulose contains α-1,6 cross-links', 'the –OH groups of cellulose are all acetylated'],
  sol: 'Inter-chain hydrogen bonding in parallel linear chains — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('glycogen-ar', ar({
  a: 'Glycogen can be broken down to glucose more rapidly than amylose.',
  r: 'Glycogen is highly branched, so it has many chain ends at which enzymes can act at the same time.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [5],
}));
add('starch-tf', tf({
  stem: 'Partial hydrolysis of starch by the enzyme diastase gives maltose.',
  key: 't',
  sol: 'True: starch → dextrins → maltose.',
  d: 1, c: 'recall', t: [4, 5],
}));
add('starch-num', num({
  marks: 2,
  stem: r`$48.6\ \text{g}$ of pure starch is hydrolysed completely with dilute acid. What mass of glucose ($M = 180$) is formed? (One chain unit, $\ce{C6H10O5}$, has $M = 162$.)`,
  value: 54, tol: 0.1, unit: 'g',
  sol: r`Units $= 48.6 \div 162 = 0.300\ \text{mol}$; mass of glucose $= 0.300 \times 180 = 54.0\ \text{g}$.`,
  scheme: [['0.300 mol of units', 1], ['54.0 g', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(48.6 / 162 * 180, 54) || 'mass');
add('poly-short', short({
  marks: 2,
  stem: 'Give two differences between amylose and amylopectin.',
  model: 'Amylose is unbranched (α-1,4 only) while amylopectin is branched (α-1,4 chains with α-1,6 branches); amylose is soluble in hot water and gives a deep blue colour with iodine, while amylopectin is insoluble and gives a red-violet colour. (Amylose is 15–20% of starch, amylopectin 80–85%.)',
  sol: 'Branching; solubility/iodine colour.',
  scheme: [['Branching', 1], ['Solubility or iodine colour or proportion', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('poly-short3', short({
  marks: 3,
  stem: 'Compare starch, cellulose and glycogen with respect to (a) the glucose anomer present, (b) the glycosidic links and branching and (c) their function in living things.',
  model: '(a) Starch and glycogen: α-D-glucose; cellulose: β-D-glucose. (b) Starch: α-1,4 (amylose) plus α-1,6 branches (amylopectin); glycogen: α-1,4 with more frequent α-1,6 branches; cellulose: unbranched β-1,4. (c) Starch: energy store in plants; glycogen: energy store in animals (liver, muscle); cellulose: structural material of plant cell walls.',
  sol: 'Anomer; links and branching; function.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('poly-long', long({
  stem: '(a) Describe the structure of starch, naming its two components and their glycosidic links. [2]\n\n(b) Describe the structure of cellulose and explain why humans cannot digest it. [2]\n\n(c) How does glycogen differ from amylopectin, and where is it stored? [1]',
  model: '(a) Starch = amylose (15–20%; unbranched chains of α-D-glucose, α-1,4 links; soluble; blue with iodine) + amylopectin (80–85%; α-1,4 chains branched by α-1,6 links about every 20–25 units; insoluble).\n\n(b) Cellulose: unbranched chains of β-D-glucose with β-1,4 links; chains lie parallel and are hydrogen bonded into fibres. Human digestive enzymes hydrolyse only α-glycosidic links, so β-links are not broken.\n\n(c) Glycogen is more highly branched (α-1,6 branches about every 8–12 units); it is stored in the liver and muscles of animals.',
  sol: 'Amylose + amylopectin; β-1,4 cellulose; glycogen more branched.',
  scheme: [['(a) amylose', 1], ['(a) amylopectin', 1], ['(b) structure', 1], ['(b) digestion', 1], ['(c)', 1]],
  d: 3, c: 'understanding', t: [5],
}));
