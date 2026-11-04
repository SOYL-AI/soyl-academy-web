// ISC 11 Biology ch11 Biomolecules — question bank in the ISC school-examination style. Every number is computed in calc.mjs.
// AR keys (ISC options): a b c d. Deck 'check' items: chk-inulin, chk-zwitter, chk-helix, chk-fat, chk-class, chk-inhib (not used in tests).
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { PROTEIN_L, ENZYMES_L } from './svgs.mjs';
import { M, D, WATER, hydrolyse, AM, peptide, fact, bonds, GLYCEROL, FAM, FA, triglyceride, kcal, KIN, KT, rate, ratio, TCURVE, PCURVE, TT, PP, round, dropPct } from './calc.mjs';

const { mcq, ar, fill, match, num, short, long, part } = mk;
const protFig = svgV(PROTEIN_L, 'Four levels of protein structure marked A to D');
const enzFig = svgV(ENZYMES_L, 'Graphs of enzyme activity with the curves marked A to F');
const at = (arr, xs, x) => arr[xs.indexOf(x)];

// ---------------------------------------------------------------- deck check items (objective)
add('chk-inulin', mcq({
  stem: 'Which polysaccharide is a reserve of fructose units in a dahlia tuber?',
  right: 'Inulin',
  wrong: ['Starch', 'Glycogen', 'Cellulose'],
  sol: 'Inulin is a polymer of fructose and a reserve in tubers such as dahlia — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-zwitter', mcq({
  stem: 'What is the net charge on an amino acid that exists as a zwitterion?',
  right: 'Zero, because one positive and one negative charge are present',
  wrong: ['Positive, because the amino group is charged', 'Negative, because the carboxyl group is charged', 'It depends only on the R group'],
  sol: 'The two charges cancel, so the net charge is zero — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-helix', mcq({
  stem: 'Which bonds mainly hold the secondary structure of a protein?',
  right: 'Hydrogen bonds between groups of the polypeptide backbone',
  wrong: ['Peptide bonds between amino acids', 'Disulphide bridges between cysteines', 'Glycosidic bonds'],
  sol: 'An α-helix or a β-sheet is held by hydrogen bonds — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-fat', mcq({
  stem: 'Why is a plant oil liquid at room temperature?',
  right: 'Its fatty acids have double bonds that bend the chains so that they cannot pack closely',
  wrong: ['Its fatty acids have no double bonds', 'It contains no glycerol', 'It is made of amino acids'],
  sol: 'Double bonds kink the chains of an unsaturated oil — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('chk-class', mcq({
  stem: 'To which class does an enzyme that breaks a bond by adding water belong?',
  right: 'Hydrolase',
  wrong: ['Ligase', 'Isomerase', 'Transferase'],
  sol: 'Hydrolases split bonds by hydrolysis — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('chk-inhib', mcq({
  stem: 'What happens to the rate of an enzyme reaction containing a competitive inhibitor when the substrate concentration is made very high?',
  right: 'It approaches the maximum rate of the uninhibited reaction',
  wrong: ['It falls to zero', 'It stays far below the uninhibited maximum', 'It exceeds the uninhibited maximum'],
  sol: 'Substrate outcompetes the inhibitor, so the maximum rate is almost reached — option (@K).',
  d: 2, c: 'understanding', t: [5],
}), () => rate(1000, true) > 78 || 'rate');

// ---------------------------------------------------------------- t01 carbohydrates
add('sucrose-mcq', mcq({
  stem: 'A sugar solution gives no brick-red colour with Benedict’s solution, but it does after being boiled with a few drops of dilute acid. The sugar is most likely',
  right: 'sucrose',
  wrong: ['maltose', 'lactose', 'glucose'],
  sol: 'Sucrose is non-reducing until acid hydrolyses it to glucose and fructose; the other sugars reduce Benedict’s solution directly — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('lactose-mcq', mcq({
  stem: 'A child lacks the enzyme lactase and cannot digest the sugar of milk. When that sugar is hydrolysed by lactase, which products are formed?',
  right: 'Glucose and galactose',
  wrong: ['Two molecules of glucose', 'Glucose and fructose', 'Galactose and fructose'],
  sol: 'Lactose is glucose joined to galactose — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cellulose-mcq', mcq({
  stem: 'Humans digest starch but not cellulose, although both are made only of glucose. The difference lies in',
  right: 'the way in which the glucose units are linked',
  wrong: ['the number of carbon atoms in each unit', 'the presence of nitrogen in cellulose', 'the solubility of glucose in water'],
  sol: 'The different linkage between glucose units makes cellulose indigestible to human enzymes — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('ribose-mcq', mcq({
  stem: 'Deoxyribose, the sugar of DNA, differs from ribose, the sugar of RNA, in having',
  right: 'one oxygen atom fewer, since carbon 2 has no hydroxyl group',
  wrong: ['one carbon atom more', 'a nitrogen atom in its ring', 'a phosphate group attached to it'],
  sol: `Ribose is C5H10O5 (${M.ribose}) and deoxyribose C5H10O4 (${M.deoxyribose}): one oxygen fewer — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}));
add('sucrose-ar', ar({
  a: 'Sucrose does not reduce Benedict’s solution until it has been boiled with dilute acid.',
  r: 'Boiling with acid hydrolyses sucrose into glucose and fructose, which are reducing sugars.',
  key: 'a',
  sol: 'Both are true, and the hydrolysis to reducing sugars explains the change — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('store-reason', short({
  marks: 1,
  stem: 'Give a reason: Plants store glucose as starch and not as free glucose.',
  model: 'Starch is **insoluble** and **osmotically inactive**, so large amounts can be stored without drawing water into the cell, whereas free glucose is soluble.',
  sol: 'Insoluble, osmotically inactive.',
  scheme: [['Insoluble, does not affect osmosis', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('hyd-num', num({
  stem: `The molar mass of sucrose is ${D.sucrose} g and that of water is ${WATER} g. How many grams of water are used to hydrolyse 684 g of sucrose?`,
  value: hydrolyse(684).water, tol: 0.1, unit: 'g',
  sol: r`$\dfrac{684}{${D.sucrose}} = ${hydrolyse(684).mol}$ mol of sucrose; each mole takes up one mole of water, so $${hydrolyse(684).mol} \times ${WATER} = ${hydrolyse(684).water}$ g.`,
  scheme: [[`${hydrolyse(684).water}`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 36 || 'value');
add('disacc-short2', short({
  marks: 2,
  stem: 'State the monosaccharides that make up maltose and sucrose, and name the bond that joins the two units in a disaccharide.',
  model: '**Maltose** is made of **two glucose** units, and **sucrose** of **glucose and fructose**. In a disaccharide the two units are joined by a **glycosidic bond**, formed with the loss of one molecule of water.',
  sol: 'Maltose; sucrose; glycosidic bond.',
  scheme: [['Units of maltose and sucrose', 1], ['Glycosidic bond with loss of water', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('classify-short3', short({
  marks: 3,
  stem: 'A student has samples of glucose, lactose and glycogen. Classify each as a mono-, di- or polysaccharide and state one function of each.',
  model: '**Glucose** is a **monosaccharide**; it is the main **fuel** of cells. **Lactose** is a **disaccharide** (glucose and galactose) and is the **sugar of milk**, a food for the young. **Glycogen** is a **polysaccharide** of glucose and is the **reserve food of animals**, stored in liver and muscle.',
  sol: 'Class and function of each.',
  scheme: [['Glucose: class and function', 1], ['Lactose: class and function', 1], ['Glycogen: class and function', 1]],
  d: 2, c: 'application', t: [1],
}));
add('poly-short3', short({
  marks: 3,
  stem: 'Distinguish starch from cellulose in terms of where each is found, its role and whether humans can digest it.',
  model: '**Starch** is found in **plant storage organs** such as seeds and tubers and is a **reserve food**; humans **digest** it with amylase. **Cellulose** is found in **plant cell walls** and is a **structural** material; humans **cannot digest** it because their enzymes cannot split the linkage between its glucose units, although it adds fibre to the diet.',
  sol: 'Site, role, digestibility.',
  scheme: [['Site', 1], ['Role', 1], ['Digestibility by humans', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('carb-long', mk.long({
  stem: '(a) Name the three classes of carbohydrates according to the number of sugar units, giving two examples of each. [2]\n(b) Give the source or the function of inulin, cellulose, glycogen and chitin. [2]\n(c) Why is sucrose called a non-reducing sugar? [1]',
  model: '(a) **Monosaccharides** (glucose, ribose), **disaccharides** (maltose, lactose, sucrose) and **polysaccharides** (starch, glycogen, cellulose, inulin, chitin).\n\n(b) **Inulin**: a fructose reserve in roots and tubers such as dahlia. **Cellulose**: structural material of plant cell walls. **Glycogen**: reserve food of animals in liver and muscle. **Chitin**: wall of fungi and exoskeleton of arthropods.\n\n(c) In **sucrose** the reducing groups of both glucose and fructose are **tied up in the glycosidic bond**, so it does not reduce Benedict’s solution unless hydrolysed.',
  sol: 'Classes; polysaccharides; non-reducing.',
  scheme: [['(a) Three classes with examples', 2], ['(b) Four polysaccharides, half a mark each', 2], ['(c) Reducing groups tied up', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 amino acids
add('zwit-mcq', mcq({
  stem: 'A solution of glycine is made strongly alkaline. Compared with the zwitterion, the glycine molecules now carry',
  right: 'a net negative charge, because the amino group has lost its extra proton',
  wrong: ['a net positive charge, because the carboxyl group has gained a proton', 'no charge at all', 'a positive charge on the carboxyl group'],
  sol: 'In alkali the NH3+ group loses a proton, leaving COO−: net negative — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('basic-mcq', mcq({
  stem: 'A protein is unusually rich in lysine and arginine. Near neutral pH it will tend to carry',
  right: 'a net positive charge, because these amino acids have extra basic groups',
  wrong: ['a net negative charge, because they have extra carboxyl groups', 'no net charge, because all proteins are neutral', 'a charge decided only by its peptide bonds'],
  sol: 'Lysine and arginine are basic amino acids — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('essential-mcq', mcq({
  stem: 'People who live mainly on a cereal diet may lack lysine, which the human body cannot make. Lysine is therefore called',
  right: 'an essential amino acid',
  wrong: ['a non-essential amino acid', 'a sulphur-containing amino acid', 'an acidic amino acid'],
  sol: 'An amino acid that must be supplied by food is essential — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('acidic-mcq', mcq({
  stem: 'Aspartic acid and glutamic acid are called acidic amino acids because their R groups contain',
  right: 'a second carboxyl group',
  wrong: ['a second amino group', 'a sulphur atom', 'a hydroxyl group'],
  sol: 'An extra carboxyl group makes the amino acid acidic — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('glycine-ar', ar({
  a: 'Glycine can be made by the human body.',
  r: 'Glycine has the simplest R group, a single hydrogen atom.',
  key: 'b',
  sol: 'Both are true, but being simple is not the reason it is non-essential: the body has the pathways to make it — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('pep-num', num({
  stem: `Glycine, cysteine and serine weigh ${AM.glycine}, ${AM.cysteine} and ${AM.serine} daltons, and water ${WATER}. What is the mass of the tripeptide made of these three amino acids, each used once?`,
  value: peptide(['glycine', 'cysteine', 'serine']), tol: 0, unit: 'daltons',
  sol: r`$${AM.glycine} + ${AM.cysteine} + ${AM.serine} - 2 \times ${WATER} = ${peptide(['glycine', 'cysteine', 'serine'])}$ daltons.`,
  scheme: [[`${peptide(['glycine', 'cysteine', 'serine'])}`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 265 || 'value');
add('order-num', num({
  stem: 'Four different amino acids are each used once to make a tetrapeptide. How many different tetrapeptides are possible?',
  value: fact(4), tol: 0, unit: null,
  sol: r`$4 \times 3 \times 2 \times 1 = ${fact(4)}$ different orders.`,
  scheme: [[`${fact(4)}`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 24 || 'value');
add('struct-short2', short({
  marks: 2,
  stem: 'Name the four groups attached to the central carbon atom of an amino acid, and say which of them differs from one amino acid to another.',
  model: 'The central (alpha) carbon carries an **amino group**, a **carboxyl group**, a **hydrogen atom** and an **R group**. Only the **R group** differs from one amino acid to another; for example it is H in glycine, CH₃ in alanine and CH₂OH in serine.',
  sol: 'Four groups; R varies.',
  scheme: [['Four groups named', 1], ['R group varies, with an example', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('essential-short2', short({
  marks: 2,
  stem: 'Distinguish between essential and non-essential amino acids, and give two examples of essential amino acids.',
  model: '**Essential** amino acids **cannot be made by the body** and must be obtained from food; **non-essential** ones **can be made** by the body from other substances. Examples of essential amino acids are **lysine, methionine, valine, leucine, tryptophan** (any two).',
  sol: 'Distinction; two examples.',
  scheme: [['Distinction', 1], ['Two examples of essential amino acids', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('aaclass-short3', short({
  marks: 3,
  stem: 'Classify amino acids on the basis of their R groups into four classes, with one example of each.',
  model: '**Neutral** amino acids have one amino and one carboxyl group, for example **glycine**. **Acidic** ones have an extra carboxyl group, for example **glutamic acid**. **Basic** ones have an extra basic group, for example **lysine**. **Sulphur-containing** ones carry sulphur in the R group, for example **cysteine**.',
  sol: 'Four classes with examples.',
  scheme: [['Neutral and acidic', 1], ['Basic', 1], ['Sulphur-containing', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('aa-long', mk.long({
  stem: '(a) Draw the structures of glycine, alanine and serine. [2]\n(b) Explain why an amino acid exists as a zwitterion in water. [2]\n(c) Name one essential and one non-essential amino acid. [1]',
  model: '(a) **Diagram:** each has the central carbon bearing **H₂N–**, **–COOH**, **H** and an R group: **glycine** R = H, **alanine** R = CH₃, **serine** R = CH₂OH.\n\n(b) In water the **carboxyl group** (acidic) **gives a proton** to the **amino group** (basic), so the molecule carries **NH₃⁺** and **COO⁻** at the same time: a **zwitterion** with **no net charge**; in acid it is positive and in alkali negative.\n\n(c) **Essential**: lysine (or valine, methionine and others); **non-essential**: glycine, alanine or serine.',
  sol: 'Three structures; zwitterion; examples.',
  scheme: [['(a) Three structures with labels', 2], ['(b) Proton transfer and two charges', 2], ['(c) One of each kind', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 proteins
add('denature-mcq', mcq({
  stem: 'The white of an egg turns solid and opaque when boiled. Which statement describes what has happened to its proteins?',
  right: 'Weak bonds were broken and the folded shape was lost, but the amino-acid sequence is unchanged.',
  wrong: ['The peptide bonds were broken and free amino acids formed.', 'The proteins were converted into carbohydrates.', 'The amino acids were rearranged into a new sequence.'],
  sol: 'Heat denatures a protein by disrupting its secondary and tertiary structure; the primary structure remains — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('sickle-mcq', mcq({
  stem: 'In sickle-cell haemoglobin, one glutamic acid of a chain is replaced by valine. Which level of protein structure is directly altered by this substitution?',
  right: 'The primary structure',
  wrong: ['Only the quaternary structure', 'None, because the number of chains is unchanged', 'The peptide bonds, which are all broken'],
  sol: 'A change of one amino acid changes the sequence, the primary structure — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('fig-bond-mcq', mcq({
  stem: 'In the same figure, the structure marked D is held in shape mainly by',
  right: 'hydrogen bonds between groups of the backbone',
  wrong: ['peptide bonds between the amino acids', 'disulphide bridges between cysteines', 'bonds between several separate chains'],
  sol: 'D is a helix, the secondary structure, held by hydrogen bonds — option (@K).',
  d: 2, c: 'understanding', t: [3], assets: [protFig],
}));
add('fig-cys-mcq', mcq({
  stem: 'In the same figure, in which structure does the dashed line between two parts of the chain represent a bond that can form between two cysteine residues?',
  right: 'A',
  wrong: ['B', 'C', 'D'],
  sol: 'A is the folded chain of the tertiary structure, in which a disulphide bridge can hold two parts together — option (@K).',
  d: 3, c: 'application', t: [3], assets: [protFig],
}));
add('denature-ar', ar({
  a: 'A denatured protein loses its biological activity.',
  r: 'Denaturation breaks the peptide bonds of the primary structure.',
  key: 'c',
  sol: 'The assertion is true, but the reason is false: denaturation breaks only the weak bonds that hold the folded shape, and the peptide bonds remain — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('change-reason', short({
  marks: 1,
  stem: 'Give a reason: Replacing a single amino acid in a protein can change its function.',
  model: 'A different amino acid can alter the **folding** and so the **three-dimensional shape** of the protein, and function depends on shape.',
  sol: 'Changes folding and shape.',
  scheme: [['Changes shape, so function', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('sec-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: Primary structure : sequence of amino acids :: Quaternary structure : ______',
  model: '**Association of two or more folded polypeptide chains** (subunits).',
  sol: 'Association of subunits.',
  scheme: [['Several chains together', 1]],
  wl: [2, 16],
  d: 2, c: 'understanding', t: [3],
}));
add('bond-num', num({
  stem: 'A protein is made of three polypeptide chains containing 417 amino acids in all. How many peptide bonds does it have?',
  value: bonds(417, 3), tol: 0, unit: null,
  sol: r`$417 - 3 = ${bonds(417, 3)}$ peptide bonds (one fewer than the number of amino acids in each chain).`,
  scheme: [[`${bonds(417, 3)}`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 414 || 'value');
add('levels-short2', short({
  marks: 2,
  stem: 'Name the bond that stabilises the primary structure of a protein and the bond that stabilises its secondary structure.',
  model: 'The **primary structure** is held by **peptide bonds**, which are covalent bonds between the carboxyl group of one amino acid and the amino group of the next. The **secondary structure** (helix or sheet) is held by **hydrogen bonds** between groups of the backbone.',
  sol: 'Peptide bonds; hydrogen bonds.',
  scheme: [['Primary: peptide bonds', 1], ['Secondary: hydrogen bonds', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('denature-short3', short({
  marks: 3,
  stem: 'A student boils a solution of egg albumin and it turns cloudy. Explain what happens to the protein at the molecular level and say which level of structure is not changed.',
  model: 'Heat breaks the **weak hydrogen bonds, ionic and hydrophobic interactions** that hold the **secondary and tertiary structures**, so the protein **unfolds** and its **shape is lost** (it is **denatured**), which makes it clump and turn cloudy. The **primary structure** is not changed, because the **peptide bonds** are not broken.',
  sol: 'Weak bonds broken; unfolded; primary unchanged.',
  scheme: [['Weak bonds broken, shape lost', 1], ['Denatured protein clumps', 1], ['Primary structure unchanged', 1]],
  d: 3, c: 'application', t: [3],
}));
add('pfunc-short3', short({
  marks: 3,
  stem: 'Link each protein to its function: keratin, an antibody and myosin.',
  model: '**Keratin** is a **structural protein** that gives strength to hair, nails and the outer skin. An **antibody** is a **defence protein** that binds a foreign substance and helps to remove it. **Myosin** is a **contractile protein** that, with actin, produces movement in muscle.',
  sol: 'Three proteins and functions.',
  scheme: [['Keratin', 1], ['Antibody', 1], ['Myosin', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('protein-long', mk.long({
  stem: '(a) Describe the primary and the secondary structure of a protein, and name the bond that stabilises each. [2]\n(b) Describe the tertiary and the quaternary structure, naming the bonds involved in the tertiary structure. [2]\n(c) State one function each of keratin and haemoglobin. [1]',
  model: '(a) **Primary**: the **sequence of amino acids** in the chain, held by **peptide bonds**. **Secondary**: regular coiling into an **α-helix** or folding into a **β-pleated sheet**, held by **hydrogen bonds**.\n\n(b) **Tertiary**: the **folding of the whole chain** into a three-dimensional shape, held by **hydrogen bonds, ionic and hydrophobic interactions and disulphide bridges** between cysteines. **Quaternary**: the **association of two or more folded chains** (subunits) in one protein, as in haemoglobin.\n\n(c) **Keratin** gives **strength** to hair and skin; **haemoglobin** **carries oxygen** in the blood.',
  sol: 'Four levels with bonds; functions.',
  scheme: [['(a) Primary and secondary with bonds', 2], ['(b) Tertiary with bonds and quaternary', 2], ['(c) Two functions', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 lipids
add('oil-mcq', mcq({
  stem: 'Groundnut oil stays liquid on a cool morning, whereas butter is solid. The main reason is that groundnut oil has more',
  right: 'unsaturated fatty acids, whose double bonds bend the chains',
  wrong: ['saturated fatty acids, whose straight chains pack closely', 'free glycerol', 'phosphate groups on its fatty acids'],
  sol: 'Double bonds keep the chains of an unsaturated oil apart, so it stays liquid — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('energy-mcq', mcq({
  stem: `Fat gives about nine kilocalories per gram and carbohydrate about four. Which is the best reason why animals that must move about keep most of their reserve as fat?`,
  right: `A given mass of fat holds more than twice the energy, so the animal carries less weight`,
  wrong: ['Fat dissolves easily in water and can be carried by blood', 'Fat contains nitrogen needed for muscles', 'Fat is hydrolysed faster than glycogen'],
  sol: `${kcal('fat', 20)} kcal from 20 g of fat against ${kcal('carbohydrate', 20)} kcal from 20 g of carbohydrate — option (@K).`,
  d: 3, c: 'application', t: [4],
}));
add('notlipid-mcq', mcq({
  stem: 'Which of the following is not a lipid?',
  right: 'Inulin',
  wrong: ['Cholesterol', 'Beeswax', 'A steroid hormone'],
  sol: 'Inulin is a polysaccharide; the others are lipids — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('fat-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: Saturated fatty acid : no double bond :: Unsaturated fatty acid : ______',
  model: '**One or more double bonds**.',
  sol: 'One or more double bonds.',
  scheme: [['One or more double bonds', 1]],
  wl: [1, 10],
  d: 1, c: 'recall', t: [4],
}));
add('trig-num', num({
  stem: `A fat has glycerol (${GLYCEROL}) joined to stearic acid (${FAM.stearic}), oleic acid (${FAM.oleic}) and palmitic acid (${FAM.palmitic}). Using water = ${WATER}, find its molecular mass.`,
  value: triglyceride('stearic', 'oleic', 'palmitic'), tol: 0, unit: null,
  sol: r`$${GLYCEROL} + ${FAM.stearic} + ${FAM.oleic} + ${FAM.palmitic} - 3 \times ${WATER} = ${triglyceride('stearic', 'oleic', 'palmitic')}$.`,
  scheme: [[`${triglyceride('stearic', 'oleic', 'palmitic')}`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => q.answer.value === 860 || 'value');
add('fatoil-short2', short({
  marks: 2,
  stem: 'Distinguish between a fat and an oil, with reference to their state, fatty acids and usual source.',
  model: 'A **fat** is **solid** at room temperature, contains mostly **saturated** fatty acids with no double bonds, and is usually of **animal** origin. An **oil** is **liquid** at room temperature, contains many **unsaturated** fatty acids with double bonds, and is usually of **plant** origin.',
  sol: 'State; fatty acids; source.',
  scheme: [['Fat: solid, saturated, animal', 1], ['Oil: liquid, unsaturated, plant', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('lipidclass-short3', short({
  marks: 3,
  stem: 'Classify lipids into three groups and give one example and one function for each group.',
  model: '**Simple lipids**, such as **fats and oils**, are esters of fatty acids and glycerol and **store energy**. **Compound lipids**, such as **phospholipids**, contain a phosphate group and **form the bilayer of cell membranes**. **Derived lipids**, such as **cholesterol and other steroids**, are made from simple or compound lipids and act in membranes or as **hormones**.',
  sol: 'Three groups with examples and functions.',
  scheme: [['Simple lipids', 1], ['Compound lipids', 1], ['Derived lipids', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('lipidfn-short3', short({
  marks: 3,
  stem: 'State three functions of lipids in the body of an animal, naming the kind of lipid concerned in each.',
  model: '**Fats** store energy, giving more than twice the energy per gram of carbohydrate, and form an **insulating layer** under the skin that reduces heat loss and cushions organs. **Phospholipids and cholesterol** are the main components of **cell membranes**, which are built on a bilayer. **Steroids**, such as the sex hormones, act as **chemical messengers** that regulate growth and reproduction.',
  sol: 'Three functions.',
  scheme: [['Energy store or insulation by fats', 1], ['Membranes by phospholipids and cholesterol', 1], ['Hormones by steroids', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('lipid-long', mk.long({
  stem: '(a) Draw the structure of a triglyceride, showing glycerol, the ester bonds and fatty acids. [2]\n(b) How do saturated and unsaturated fatty acids differ in structure, and what effect does this have on the state of the fat? [2]\n(c) Name one lipid that forms membranes. [1]',
  model: '(a) **Diagram:** a **glycerol** molecule with three carbons, each joined through an **ester bond** (–O–CO–) to one of **three fatty acid chains**; three water molecules are lost.\n\n(b) A **saturated** fatty acid has **no double bonds**, so its chain is **straight** and the molecules pack closely, giving a **solid fat**. An **unsaturated** fatty acid has **one or more double bonds** that **bend** the chain, so the molecules pack loosely, giving a **liquid oil**.\n\n(c) A **phospholipid** (or cholesterol).',
  sol: 'Triglyceride; saturated and unsaturated; membrane lipid.',
  scheme: [['(a) Labelled structure', 2], ['(b) Structural difference and effect on state', 2], ['(c) Membrane lipid', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 enzymes
add('ldh-mcq', mcq({
  stem: 'Lactate dehydrogenase removes two hydrogen atoms from lactate to form pyruvate. To which class does this enzyme belong?',
  right: 'Oxidoreductase',
  wrong: ['Hydrolase', 'Ligase', 'Isomerase'],
  sol: 'Removing hydrogen is an oxidation, catalysed by an oxidoreductase — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('niacin-mcq', mcq({
  stem: 'A person who lacks niacin cannot make enough NAD, and many dehydrogenase enzymes fail. In these enzymes NAD acts as a',
  right: 'coenzyme',
  wrong: ['prosthetic group', 'competitive inhibitor', 'metal-ion activator'],
  sol: 'NAD is a loosely bound organic cofactor made from a vitamin, a coenzyme — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('fish-mcq', mcq({
  stem: `Relative activities at 5, 15 and 25 °C were measured for two enzymes: enzyme X ${[5, 15, 25].map((x) => at(TCURVE.fish, TT, x)).join(', ')}; enzyme Y ${[5, 15, 25].map((x) => at(TCURVE.human, TT, x)).join(', ')}. Which conclusion is best supported?`,
  right: 'Enzyme X is probably from a polar fish: its optimum is near 15 °C and it is inactive at 25 °C.',
  wrong: ['Enzyme X is probably from a mammal, because it is active at low temperature.', 'Enzyme Y has its optimum below 15 °C.', 'Both enzymes have the same optimum temperature.'],
  sol: 'X peaks at 15 °C and is lost at 25 °C, as expected of a cold-adapted enzyme, while Y is still rising at 25 °C — option (@K).',
  d: 3, c: 'analysis', t: [5],
}), () => at(TCURVE.fish, TT, 15) === 100 || 'peak');
add('ph-mcq', mcq({
  stem: `A mixture contains pepsin, whose optimum is near pH 2, and trypsin, whose optimum is near pH 8. At pH 3 the relative activities are ${at(PCURVE.pepsin, PP, 3)} for one and ${at(PCURVE.trypsin, PP, 3)} for the other. Which statement is correct?`,
  right: 'Pepsin is the active enzyme, because pH 3 is close to its optimum.',
  wrong: ['Trypsin is the active enzyme, because it prefers weak acid.', 'Both are equally active.', 'Neither can work at any pH below 7.'],
  sol: `Pepsin keeps ${at(PCURVE.pepsin, PP, 3)} percent of its maximum at pH 3 and trypsin ${at(PCURVE.trypsin, PP, 3)} — option (@K).`,
  d: 3, c: 'application', t: [5],
}));
add('sulpha-mcq', mcq({
  stem: 'A sulphonamide drug resembles para-aminobenzoic acid, which bacteria use to make folic acid. The drug stops the bacterial enzyme by acting as a',
  right: 'competitive inhibitor',
  wrong: ['coenzyme', 'prosthetic group', 'product of the reaction'],
  sol: 'A molecule that resembles the substrate and blocks the active site is a competitive inhibitor — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('vmax-mcq', mcq({
  stem: 'A competitive inhibitor is added to an enzyme reaction. At a very high concentration of substrate, the rate of the reaction will',
  right: 'almost reach the same maximum as without the inhibitor',
  wrong: ['remain far below the original maximum', 'fall to zero', 'rise above the original maximum'],
  sol: `The substrate outcompetes the inhibitor: at a concentration of 1000 the rate is ${rate(1000)} without and ${rate(1000, true)} with it — option (@K).`,
  d: 3, c: 'analysis', t: [5],
}), () => rate(1000, true) > 0.97 * KIN.vmax || 'rate');
add('enz-f-mcq', mcq({
  stem: 'In the figure, which curve shows the reaction in the presence of a competitive inhibitor?',
  right: 'F',
  wrong: ['A', 'C', 'E'],
  sol: 'F lies below E at every substrate concentration but approaches the same maximum — option (@K).',
  d: 2, c: 'understanding', t: [5], assets: [enzFig],
}));
add('enz-c-mcq', mcq({
  stem: 'In the same figure, which curve could belong to an enzyme that works in the human stomach?',
  right: 'C',
  wrong: ['A', 'B', 'D'],
  sol: 'C has its optimum at an acid pH, as pepsin has — option (@K).',
  d: 2, c: 'application', t: [5], assets: [enzFig],
}));
add('inhib-ar', ar({
  a: 'A competitive inhibitor lowers the maximum rate of an enzyme-catalysed reaction.',
  r: 'A competitive inhibitor binds permanently to the enzyme.',
  key: 'd',
  sol: 'Both are false: the maximum rate is unchanged, and the binding is reversible so more substrate displaces the inhibitor — option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('heat-reason', short({
  marks: 1,
  stem: 'Give a reason: The activity of most enzymes falls sharply above about 50 °C.',
  model: 'The enzyme protein is **denatured**: heat breaks the weak bonds that hold its shape, so the **active site is lost**.',
  sol: 'Denaturation.',
  scheme: [['Denatured, active site lost', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('km-num', num({
  stem: r`An enzyme has a maximum rate of ${KIN.vmax} units and a Michaelis constant of ${KIN.km} units of substrate. Using $v = \dfrac{V_{\max} S}{K_m + S}$, find the rate at a substrate concentration of 30 units.`,
  value: rate(30), tol: 0.1, unit: 'units',
  sol: r`$v = \dfrac{${KIN.vmax} \times 30}{${KIN.km} + 30} = ${rate(30)}$ units.`,
  scheme: [[`${rate(30)}`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 60 || 'value');
add('inh-num', num({
  stem: `With a competitive inhibitor the same enzyme behaves as if its Michaelis constant were ${KIN.kmInh}, with the maximum unchanged at ${KIN.vmax}. Find the rate at a substrate concentration of 50 units, to one decimal place.`,
  value: rate(50, true), tol: 0.1, unit: 'units',
  sol: r`$v = \dfrac{${KIN.vmax} \times 50}{${KIN.kmInh} + 50} = ${rate(50, true)}$ units, against ${rate(50)} without the inhibitor.`,
  scheme: [[`${rate(50, true)}`, 1]],
  d: 4, c: 'analysis', t: [5],
}), (q) => q.answer.value === 57.1 || 'value');
add('ethanol-short2', short({
  marks: 2,
  stem: 'Methanol is converted by the enzyme alcohol dehydrogenase into a toxic product. Patients with methanol poisoning are given ethanol. Explain, using competitive inhibition, why this helps.',
  model: '**Ethanol** is a **better-fitting substrate** of alcohol dehydrogenase and **competes** with methanol for the **active site**. The enzyme is mostly occupied by ethanol, so **less methanol is converted** into the toxic product and it can be excreted.',
  sol: 'Competition for the active site.',
  scheme: [['Ethanol competes for the active site', 1], ['Less toxic product from methanol', 1]],
  d: 3, c: 'application', t: [5],
}));
add('props-short2', short({
  marks: 2,
  stem: 'State four properties of enzymes.',
  model: 'Enzymes are **biological catalysts** that **lower the activation energy**; they are **specific** for a substrate through the **active site**; they are **not used up** in the reaction; and they are **sensitive to temperature and pH**, being **denatured** by extremes. They are mostly **proteins**.',
  sol: 'Four properties.',
  scheme: [['Two properties', 1], ['Two further properties', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('sixclass-short3', short({
  marks: 3,
  stem: 'Name the six classes of enzymes and state the type of reaction catalysed by any three of them.',
  model: 'The six classes are **oxidoreductases, transferases, hydrolases, lyases, isomerases and ligases**. **Oxidoreductases**, such as lactate dehydrogenase, catalyse **oxidation and reduction**; **transferases**, such as hexokinase, **transfer a group** such as phosphate from one molecule to another; **hydrolases**, such as lipase, **split bonds by adding water**.',
  sol: 'Six classes; three reactions.',
  scheme: [['Six classes named', 1], ['Reactions of three classes', 2]],
  d: 2, c: 'recall', t: [5],
}));
add('dialysis-short3', short({
  marks: 3,
  stem: 'An enzyme extract loses all its activity after dialysis, but activity returns when the small molecules that passed out are added back. Name the type of component that was lost and distinguish it from a prosthetic group.',
  model: 'The lost component is a **coenzyme**, a small **organic cofactor** that is **loosely bound** and can pass through the dialysis membrane. A **prosthetic group** is also an organic cofactor, but it is **tightly bound** to the enzyme and would **not be removed** by dialysis. The protein alone is the apoenzyme and with its cofactor the holoenzyme.',
  sol: 'Coenzyme; loosely against tightly bound.',
  scheme: [['Coenzyme named', 1], ['Loosely bound, removed by dialysis', 1], ['Prosthetic group tightly bound', 1]],
  d: 3, c: 'application', t: [5],
}));
add('temp-short3', short({
  marks: 3,
  stem: 'Explain the shape of a graph of enzyme activity against temperature, from low temperature through the optimum to high temperature.',
  model: 'At **low temperature** molecules have little energy, so the rate is **low** (the enzyme is not destroyed). As the temperature rises, **collisions between enzyme and substrate** become more frequent and the rate **rises** to the **optimum**. Beyond the optimum the enzyme is **denatured**, its shape is lost and the rate **falls sharply**.',
  sol: 'Rise, optimum, fall.',
  scheme: [['Low rate at low temperature', 1], ['Rise to the optimum', 1], ['Denaturation above the optimum', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('inhib-long', mk.long({
  stem: '(a) What is competitive inhibition? Explain it with the example of malonate and succinic dehydrogenase. [3]\n(b) Draw a graph of rate against substrate concentration, with and without a competitive inhibitor. [1]\n(c) How can the effect of the inhibitor be reduced? [1]',
  model: '(a) In **competitive inhibition** a molecule that **resembles the substrate** occupies the **active site** of the enzyme and **blocks it**. **Malonate** looks like **succinate**, the substrate of **succinic dehydrogenase**, so it binds to the active site and **reduces the conversion of succinate to fumarate**. The binding is **reversible**.\n\n(b) **Graph:** two rising curves that level off; the curve **with the inhibitor lies below** the other at low and moderate substrate concentration, but both approach the **same maximum**.\n\n(c) By **raising the substrate concentration**, which **outcompetes** the inhibitor for the active site.',
  sol: 'Definition and example; graph; remedy.',
  scheme: [['(a) Resemblance and blocked active site', 1], ['(a) Malonate and succinic dehydrogenase', 2], ['(b) Two curves, same maximum', 1], ['(c) More substrate', 1]],
  wl: [60, 220],
  d: 3, c: 'application', t: [5],
}));

add('glycosidic-mcq', mcq({
  stem: 'Two glucose molecules join to form maltose. Which small molecule is released in this reaction?',
  right: 'Water',
  wrong: ['Carbon dioxide', 'Hydrogen peroxide', 'Ammonia'],
  sol: `A glycosidic bond forms with the loss of one water: 2 × ${M.glucose} − ${WATER} = ${D.maltose} — option (@K).`,
  d: 1, c: 'understanding', t: [1],
}));
add('sulphur-mcq', mcq({
  stem: 'Which pair of amino acids contains sulphur?',
  right: 'Cysteine and methionine',
  wrong: ['Glycine and alanine', 'Serine and lysine', 'Aspartic acid and glutamic acid'],
  sol: 'Cysteine and methionine are the sulphur-containing amino acids — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('peptide-mcq', mcq({
  stem: 'A student joins the amino acids glycine and alanine to form a dipeptide. Which statement is correct?',
  right: 'One molecule of water is released as the peptide bond forms.',
  wrong: ['Two molecules of water are released.', 'One molecule of water is taken up.', 'No water is released or taken up.'],
  sol: `The mass is ${AM.glycine} + ${AM.alanine} − ${WATER} = ${peptide(['glycine', 'alanine'])} — option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('metal-mcq', mcq({
  stem: 'A kinase works only when magnesium ions are present. When they are removed with a chelating agent the enzyme stops, and it recovers when they are added back. Magnesium acts as',
  right: 'a metal-ion cofactor that activates the enzyme',
  wrong: ['a competitive inhibitor', 'the substrate of the enzyme', 'a coenzyme made from a vitamin'],
  sol: 'Metal ions such as magnesium and zinc are cofactors — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('isom-mcq', mcq({
  stem: 'An enzyme converts glucose 6-phosphate into fructose 6-phosphate, which has the same formula. To which class does it belong?',
  right: 'Isomerase',
  wrong: ['Lyase', 'Ligase', 'Transferase'],
  sol: 'Rearrangement into an isomer is catalysed by an isomerase — option (@K).',
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 secondary metabolites
add('poppy-mcq', mcq({
  stem: 'The latex of the opium poppy contains morphine, which the plant does not need for its growth or respiration. Morphine is',
  right: 'an alkaloid, a secondary metabolite',
  wrong: ['a protein, a primary metabolite', 'a carbohydrate, a primary metabolite', 'a lipid, a structural component'],
  sol: 'Morphine is a nitrogen-containing alkaloid and a secondary metabolite — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('pigment-mcq', mcq({
  stem: 'The red colour of beetroot and the purple of red cabbage come from anthocyanins. In plant chemistry, anthocyanins are',
  right: 'secondary metabolites of the pigment group',
  wrong: ['enzymes of respiration', 'storage polysaccharides', 'components of cell membranes'],
  sol: 'Pigments such as anthocyanins are secondary metabolites — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('sm-reason', short({
  marks: 1,
  stem: 'Give a reason: Many plants make alkaloids although the alkaloids are not needed for their basic metabolism.',
  model: 'Alkaloids help the plant in other ways, for example by **deterring herbivores** or by **protecting against microbes**.',
  sol: 'Defence.',
  scheme: [['Defence against herbivores or microbes', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('sm-short2', short({
  marks: 2,
  stem: 'What are secondary metabolites? Give two examples from different groups.',
  model: '**Secondary metabolites** are compounds that are **not directly needed for the growth, development or reproduction** of an organism, but are useful to it in other ways, for example for defence or attraction. Examples are the **alkaloid morphine** and the **pigment anthocyanin** (or **gum arabic**).',
  sol: 'Definition; two examples.',
  scheme: [['Definition', 1], ['Two examples from different groups', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('sm-short3', short({
  marks: 3,
  stem: 'Give one example each of an alkaloid, a pigment and a gum, and state a use or role of each.',
  model: 'An **alkaloid** such as **quinine** is used as a medicine against malaria and defends the plant. A **pigment** such as **carotenoid or anthocyanin** gives colour to petals and fruits and **attracts pollinators or animals that spread seeds**. **Gum arabic** from Acacia **seals wounds** in the plant and is used in food and industry.',
  sol: 'Three examples with uses.',
  scheme: [['Alkaloid and use', 1], ['Pigment and role', 1], ['Gum and use', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- stimulus cases
{
  const rows = KT.map((k) => `| ${k.s} | ${k.free} | ${k.inh} |`).join('\n');
  add('kin-case', mk.case({
    passage: `The initial rate of an enzyme reaction was measured at six substrate concentrations, with and without a competitive inhibitor (units are arbitrary).\n\n| Substrate | Rate without inhibitor | Rate with inhibitor |\n|---|---|---|\n${rows}`,
    d: 4, c: 'analysis',
    children: [
      part('a', num({
        stem: 'By what percentage is the rate at a substrate concentration of 10 lowered by the inhibitor? (One decimal place.)',
        value: dropPct(10), tol: 0.1, unit: '%',
        sol: r`$\dfrac{${rate(10)} - ${rate(10, true)}}{${rate(10)}} \times 100 = ${dropPct(10)}$ percent.`,
        scheme: [[`${dropPct(10)}`, 1]],
        d: 3, c: 'application', t: [5],
      })),
      part('b', mcq({
        stem: 'Which conclusion do the data support?',
        right: 'The inhibitor is competitive: its effect becomes small at a high substrate concentration.',
        wrong: ['The inhibitor is permanent, since the rate stays low at every concentration.', 'The inhibitor raises the maximum rate of the enzyme.', 'The enzyme is denatured by the inhibitor.'],
        sol: `The rates differ by ${round(rate(5) - rate(5, true), 1)} at 5 but only by ${round(rate(200) - rate(200, true), 1)} at 200, so substrate overcomes the inhibitor — option (@K).`,
        d: 4, c: 'analysis', t: [5],
      })),
      part('c', short({
        marks: 2,
        stem: 'State the substrate concentration at which the uninhibited rate is half of its maximum, and say what happens to this concentration when the competitive inhibitor is present.',
        model: `The uninhibited rate is half of its maximum (${KIN.vmax / 2}) at a concentration of **${KIN.km}**, the Michaelis constant. With the competitive inhibitor the same rate (${KIN.vmax / 2}) needs a concentration of **${KIN.kmInh}**, so the concentration **increases** while the maximum rate is unchanged.`,
        sol: '10; rises to 20.',
        scheme: [['Half maximum at 10', 1], ['Concentration rises with the inhibitor', 1]],
        wl: [10, 60],
        d: 3, c: 'analysis', t: [5],
      }), [
        short({
          marks: 2,
          stem: 'The enzyme concentration is now doubled, without any inhibitor. Predict, with a reason, what happens to the maximum rate.',
          model: 'The maximum rate would **roughly double**, because there are **twice as many active sites** available to work on the substrate at the same time.',
          sol: 'Doubles; more active sites.',
          scheme: [['Maximum rate rises, about doubling', 1], ['More active sites', 1]],
          wl: [10, 60],
          d: 3, c: 'analysis', t: [5],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 33.3 || 'value');
}
{
  const P = ['serine', 'glycine', 'cysteine', 'alanine', 'cysteine'];
  add('pep-case', mk.case({
    passage: `A student makes a pentapeptide by joining the amino acids serine, glycine, cysteine, alanine and cysteine in this order, using the masses ${P.slice(0, 4).map((n) => `${n} ${AM[n]}`).join(', ')} daltons (cysteine is used twice) and water ${WATER}.`,
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'Calculate the mass of the pentapeptide in daltons.',
        value: peptide(P), tol: 0, unit: 'daltons',
        sol: r`Sum of residues $= ${P.reduce((s, n) => s + AM[n], 0)}$; four waters are lost: $${P.reduce((s, n) => s + AM[n], 0)} - 4 \times ${WATER} = ${peptide(P)}$.`,
        scheme: [[`${peptide(P)}`, 1]],
        d: 3, c: 'application', t: [2],
      })),
      part('b', mcq({
        stem: 'Which two residues of the folded peptide could form a bond that helps to stabilise its tertiary structure?',
        right: 'The two cysteine residues, by a disulphide bridge',
        wrong: ['The serine and the glycine, by a peptide bond', 'The alanine and the serine, by a glycosidic bond', 'The glycine and the alanine, by an ester bond'],
        sol: 'Two cysteines can be joined by an S–S bridge — option (@K).',
        d: 3, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'How many peptide bonds does the pentapeptide contain, and which of its amino acids has a hydroxyl group in its R group?',
        model: `It contains **${bonds(5, 1)} peptide bonds** (one fewer than the number of amino acids). **Serine** has a hydroxyl group in its R group (CH₂OH).`,
        sol: 'Four; serine.',
        scheme: [['Four peptide bonds', 1], ['Serine', 1]],
        wl: [8, 50],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Name the classes to which cysteine and glycine belong, and give one difference between their R groups.',
          model: '**Cysteine** is a **sulphur-containing** amino acid and **glycine** a **neutral** one. The R group of cysteine is **CH₂SH** and contains sulphur, whereas that of glycine is **only a hydrogen atom**.',
          sol: 'Sulphur-containing; neutral; R groups.',
          scheme: [['Classes', 1], ['R-group difference', 1]],
          wl: [8, 50],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 439 || 'value');
}
