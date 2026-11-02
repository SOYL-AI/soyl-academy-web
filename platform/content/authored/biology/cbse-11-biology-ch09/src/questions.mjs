// ch09 Biomolecules — question bank. AR keys: b c a d.
import { mk, add, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { pct, bondsInChain, bondsInChains, peptideMass, dryMass, caFactor, rateAfter, avgRate, hBonds, round } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 chemical constituents of living cells
add('tca-mcq', mcq({
  stem: 'A student grinds a piece of liver in trichloroacetic acid and filters it. Which substances will she find mainly in the filtrate (the acid-soluble pool)?',
  right: 'Small molecules such as amino acids, sugars and nucleotides',
  wrong: ['Proteins, nucleic acids and polysaccharides', 'Only lipid membranes', 'Only cellulose fibres'],
  sol: 'The acid-soluble filtrate holds micromolecules below about 1000 daltons; macromolecules stay in the retentate — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('lipidpool-mcq', mcq({
  stem: 'Lipids have molecular weights below 800 daltons, yet they turn up in the acid-insoluble fraction when tissue is ground. What explains this?',
  right: 'Grinding breaks membranes into vesicles that are not water-soluble, and they separate with the insoluble pool',
  wrong: ['Lipids join with proteins to form polymers above 10000 daltons', 'Lipids are destroyed by the acid', 'Lipids dissolve only in the filtrate'],
  sol: 'Membrane fragments form insoluble vesicles that go with the retentate, though lipids are not true macromolecules — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('elements-mcq', mcq({
  stem: 'Analyses give carbon as about 18.5 percent of the human body by weight but only 0.03 percent of the earth’s crust, while silicon is 27.7 percent of the crust and negligible in the body. What does this suggest?',
  right: 'Living matter selectively builds its compounds mainly from carbon, hydrogen, oxygen and nitrogen',
  wrong: ['Living matter has the same elements in the same proportions as the crust', 'Silicon is the main element of biomolecules', 'Carbon is absent from non-living matter'],
  sol: 'All elements of the crust occur in living tissue, but in very different proportions; carbon and hydrogen are relatively far more abundant in living matter — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('serine-mcq', mcq({
  stem: 'In the amino acid serine, the R group is',
  right: 'a hydroxymethyl group',
  wrong: ['a hydrogen atom', 'a methyl group', 'a second carboxyl group'],
  sol: 'Glycine has H, alanine a methyl group and serine a hydroxymethyl group as R — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('aromatic-mcq', mcq({
  stem: 'Which of these is an aromatic amino acid?',
  right: 'Tryptophan',
  wrong: ['Glycine', 'Alanine', 'Valine'],
  sol: 'Tyrosine, phenylalanine and tryptophan are aromatic — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('zwitterion-mcq', mcq({
  stem: 'Why does the structure of an amino acid change when it is placed in solutions of different pH?',
  right: 'Its amino and carboxyl groups are ionisable and gain or lose protons, so a zwitterionic form exists at a particular pH',
  wrong: ['Its R group breaks off in acid', 'Its alpha carbon changes into silicon', 'It joins with other amino acids to form proteins'],
  sol: 'The ionisable –NH2 and –COOH groups change their charge with pH — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
add('palmitic-mcq', mcq({
  stem: 'Palmitic acid has',
  right: '16 carbon atoms, including the carboxyl carbon',
  wrong: ['20 carbon atoms, including the carboxyl carbon', '3 carbon atoms and three hydroxyl groups', '16 carbon atoms plus a separate carboxyl carbon'],
  sol: 'Palmitic acid has 16 carbons counting the carboxyl carbon; arachidonic acid has 20 — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('lecithin-mcq', mcq({
  stem: 'Lecithin, a lipid found in cell membranes, is a',
  right: 'phospholipid, with phosphorus and a phosphorylated organic compound',
  wrong: ['triglyceride with three fatty acids', 'saturated fatty acid', 'steroid hormone'],
  sol: 'Lecithin is a phospholipid; membranes have phospholipids — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('adenylic-mcq', mcq({
  stem: 'Adenine joined to a sugar is adenosine. What is the compound called when a phosphate group is also esterified to the sugar?',
  right: 'Adenylic acid, a nucleotide',
  wrong: ['Adenosine, a nucleoside', 'Adenine, a purine base', 'Arachidonic acid, a fatty acid'],
  sol: 'Base + sugar is a nucleoside; adding phosphate makes a nucleotide, such as adenylic acid — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('vinblastin-mcq', mcq({
  stem: 'The anticancer drug vinblastin is extracted from a plant, which does not need it for its basic metabolism. In plant chemistry, vinblastin is classed as',
  right: 'a secondary metabolite',
  wrong: ['a primary metabolite', 'a nucleotide', 'an essential amino acid'],
  sol: 'Compounds such as drugs, alkaloids, pigments and toxins with no known role in normal physiology are secondary metabolites — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('lipid-ar', ar({
  a: 'Lipids are found in the acid-insoluble fraction of a ground tissue.',
  r: 'The molecular weights of lipids do not exceed about 800 daltons.',
  key: 'b',
  sol: 'Both are true, but a low molecular weight would put lipids in the soluble pool; they appear in the insoluble fraction because membranes form insoluble vesicles — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('glycerol-fill', fill({
  stem: 'Glycerol, which combines with fatty acids to form fats, is chemically trihydroxy ______.',
  acc: [['propane']],
  sol: 'Trihydroxy propane.',
  d: 1, c: 'recall', t: [1],
}));
add('alpha-fill', fill({
  stem: 'Amino acids are substituted methanes in which four groups occupy the valencies of the ______ carbon.',
  acc: [['alpha', 'α']],
  sol: 'The alpha (α) carbon.',
  d: 1, c: 'recall', t: [1],
}));
add('acidpool-short', short({
  marks: 2,
  stem: 'How is the chemical composition of a living tissue analysed using trichloroacetic acid?',
  model: 'The tissue is **ground in trichloroacetic acid** to a slurry and **filtered**. The **filtrate** (acid-soluble pool) holds **micromolecules** below 1000 daltons; the **retentate** (acid-insoluble fraction) holds **macromolecules** — proteins, nucleic acids, polysaccharides — and membrane lipids. Each is then analysed separately.',
  sol: 'Grinding, filtrate, retentate.',
  scheme: [['Grind in acid and filter', 1], ['Filtrate micromolecules; retentate macromolecules', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('metabolites-short', short({
  marks: 2,
  stem: 'Distinguish between primary and secondary metabolites, with two examples of secondary metabolites.',
  model: '**Primary metabolites** such as amino acids, sugars and nucleotides have **known roles** in normal physiological processes. **Secondary metabolites**, found mainly in plants, fungi and microbes, have no clear role in the organism’s basic physiology but are often useful to people: **alkaloids** (morphine, codeine), **pigments** (carotenoids, anthocyanins), **toxins** (abrin, ricin), **essential oils** and **rubber**.',
  sol: 'Roles and examples.',
  scheme: [['Primary: known roles, examples', 1], ['Secondary: two examples', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('aminoclass-short', short({
  marks: 3,
  stem: 'Describe the structure of an amino acid and classify amino acids by the nature of their R groups, giving examples.',
  model: 'An amino acid has an **alpha carbon** bearing a **hydrogen**, an **amino group** (–NH2), a **carboxyl group** (–COOH) and a variable **R group**; it is a substituted methane. The **R group** decides which of the **20** amino acids it is: H in **glycine**, methyl in **alanine**, hydroxymethyl in **serine**. By the number of amino and carboxyl groups, amino acids are **acidic** (glutamic acid), **basic** (lysine) or **neutral** (valine); **aromatic** ones include **tyrosine, phenylalanine and tryptophan**.',
  sol: 'Structure; classes.',
  scheme: [['Alpha carbon with four groups', 1], ['R group examples', 1], ['Acidic, basic, neutral, aromatic', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('lipidtypes-short', short({
  marks: 3,
  stem: 'Describe fatty acids, glycerides and phospholipids, and distinguish fats from oils.',
  model: 'A **fatty acid** has a **carboxyl group** attached to an R group, a hydrocarbon chain of 1 to 19 carbons: **palmitic acid** has 16 carbons including the carboxyl carbon. Fatty acids are **saturated** (no double bond) or **unsaturated** (one or more C=C bonds). **Glycerol** (trihydroxy propane) esterified with fatty acids gives **mono-, di- and triglycerides**; **oils** have low melting points and stay liquid in winter, while **fats** are solid. **Phospholipids**, such as **lecithin**, contain phosphorus and a phosphorylated organic compound and occur in membranes.',
  sol: 'Fatty acids, glycerides, phospholipids, fats vs oils.',
  scheme: [['Fatty acids, saturated and unsaturated', 1], ['Glycerides; fats vs oils', 1], ['Phospholipids', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('composition-long', long({
  stem: 'Describe how the chemical composition of living tissue is analysed, and summarise the main classes of compounds found in the acid-soluble pool.',
  model: '**Analysis.** A living tissue is ground in **trichloroacetic acid** with a mortar and pestle to give a thick slurry, which is strained through cheesecloth. The **filtrate** is the **acid-soluble pool** and the **retentate** the **acid-insoluble fraction**. Elemental analysis shows that living matter contains the same elements as the earth’s crust but in very different proportions: carbon and hydrogen are relatively far more abundant. Compound analysis reveals inorganic compounds (water, ions such as sodium, potassium, calcium and magnesium, phosphate and sulphate) and organic compounds.\n\n**Amino acids.** Organic compounds with an amino group and an acidic carboxyl group on the alpha carbon, plus hydrogen and a variable **R group** (H in glycine, methyl in alanine, hydroxymethyl in serine). They may be acidic, basic, neutral or aromatic, and their ionisable groups change with pH.\n\n**Lipids.** Water-insoluble; fatty acids (palmitic acid with 16 carbons, arachidonic acid with 20), saturated or unsaturated; glycerol esterified to form mono-, di- and triglycerides (fats and oils); and phospholipids such as lecithin in membranes. Being membrane vesicles after grinding, lipids actually separate with the insoluble fraction.\n\n**Nitrogen bases, nucleosides and nucleotides.** Adenine, guanine, cytosine, uracil and thymine are bases; with a sugar they form nucleosides (adenosine, guanosine, thymidine, uridine, cytidine), and with phosphate added, nucleotides (adenylic, guanylic, thymidylic, uridylic and cytidylic acids).\n\n**Metabolites.** Primary metabolites have identifiable functions; secondary metabolites such as pigments, alkaloids, terpenoids, essential oils, toxins, lectins, drugs and polymers like rubber are mostly of plant, fungal and microbial origin.',
  sol: 'Method; amino acids, lipids, nucleotides, metabolites.',
  scheme: [['Grinding, filtrate and retentate; elements', 1.5], ['Amino acids', 1], ['Lipids', 1], ['Bases, nucleosides, nucleotides', 1], ['Primary and secondary metabolites', 0.5]],
  wl: [80, 320],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 biomacromolecules
add('rubisco-mcq', mcq({
  stem: 'The most abundant protein in the whole biosphere is',
  right: 'RuBisCO',
  wrong: ['collagen', 'haemoglobin', 'insulin'],
  sol: 'RuBisCO is the most abundant protein in the biosphere; collagen is the most abundant in the animal world — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('glut4-mcq', mcq({
  stem: 'What is the function of the protein GLUT-4?',
  right: 'It enables glucose to be transported into cells',
  wrong: ['It digests proteins in the gut', 'It fights infectious agents', 'It forms intercellular ground substance'],
  sol: 'GLUT-4 is a transport protein for glucose; trypsin digests, antibodies fight infection and collagen forms ground substance — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('quaternary-mcq', mcq({
  stem: 'A protein is made of four separately folded polypeptide chains, two of one kind and two of another, held together in a fixed arrangement. This arrangement is its',
  right: 'quaternary structure',
  wrong: ['primary structure', 'secondary structure', 'tertiary structure'],
  sol: 'The assembly of several folded polypeptides, as in adult haemoglobin (2 α + 2 β), is quaternary structure — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('primary-mcq', mcq({
  stem: 'The primary structure of a protein is',
  right: 'its sequence of amino acids, from the N-terminal to the C-terminal amino acid',
  wrong: ['the right-handed helix formed by parts of the chain', 'the folding of the chain into a ball', 'the assembly of several chains'],
  sol: 'Primary structure is the amino acid sequence; the first is the N-terminal, the last the C-terminal amino acid — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('peptidebond-mcq', mcq({
  stem: 'A peptide bond is formed between',
  right: 'the carboxyl group of one amino acid and the amino group of the next, with loss of water',
  wrong: ['two carboxyl groups, with addition of water', 'the R groups of two amino acids', 'a sugar and a phosphate'],
  sol: 'The –COOH of one amino acid reacts with the –NH2 of the next by dehydration — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('phosphodiester-mcq', mcq({
  stem: 'In a nucleic acid, a phosphate links the 3′ carbon of one sugar to the 5′ carbon of the next sugar. This link is a',
  right: 'phosphodiester bond',
  wrong: ['peptide bond', 'glycosidic bond', 'hydrogen bond'],
  sol: 'An ester bond on each side of the phosphate makes a phosphodiester bond — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('iodine-mcq', mcq({
  stem: 'A drop of iodine solution turns a slice of potato blue-black but leaves a piece of cotton wool unchanged. Why?',
  right: 'Starch forms helices that can hold iodine, but cellulose does not have such complex helices',
  wrong: ['Cotton contains no glucose at all', 'Iodine reacts only with proteins in the potato', 'Cellulose dissolves iodine and removes the colour'],
  sol: 'Iodine sits in the helical parts of starch; cellulose, though also a glucose polymer, cannot hold it — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('chitin-mcq', mcq({
  stem: 'The hard shell of a crab is built of a complex polysaccharide containing amino-sugars. This polysaccharide is',
  right: 'chitin, a heteropolymer',
  wrong: ['cellulose, a homopolymer of glucose', 'inulin, a polymer of fructose', 'glycogen, a branched glucose polymer'],
  sol: 'Arthropod exoskeletons are made of chitin, built from chemically modified sugars — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('rna-mcq', mcq({
  stem: 'A purified nucleic acid sample contains ribose and the base uracil. The sample is most likely',
  right: 'RNA',
  wrong: ['DNA', 'a protein', 'a polysaccharide'],
  sol: 'RNA has ribose and uracil; DNA has 2′-deoxyribose and thymine — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gcheat-mcq', mcq({
  stem: 'Two DNA samples of equal length are heated. Sample X, rich in G–C pairs, needs a higher temperature to separate its strands than sample Y, rich in A–T pairs. Why?',
  right: 'G pairs with C through three hydrogen bonds, while A pairs with T through two',
  wrong: ['G–C pairs are joined by peptide bonds', 'Sample X has more phosphodiester bonds between its strands', 'A–T pairs are joined by covalent bonds that melt first'],
  sol: 'More hydrogen bonds per pair hold G–C-rich strands together more strongly — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('cellulose-ar', ar({
  a: 'Cellulose is a homopolymer of glucose.',
  r: 'Cellulose forms complex helices that hold iodine and give a blue colour.',
  key: 'c',
  sol: 'A is true; R is false, because cellulose has no complex helices and does not hold iodine (starch does) — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('righthand-tf', tf({
  stem: 'In the secondary structure of proteins, only right-handed helices are observed.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [2],
}));
add('reducing-tf', tf({
  stem: 'In a polysaccharide chain such as glycogen, the right end is called the reducing end and the left end the non-reducing end.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [2],
}));
add('protein-match', match({
  stem: 'Match each protein (column I) with its function (column II).',
  pairs: [
    ['Collagen', 'Intercellular ground substance'],
    ['Trypsin', 'Enzyme'],
    ['Insulin', 'Hormone'],
    ['Antibody', 'Fights infectious agents'],
  ],
  order: [2, 3, 0, 1],
  sol: 'Collagen forms ground substance, trypsin is an enzyme, insulin a hormone and antibodies fight infection.',
  d: 1, c: 'recall', t: [2],
}));
{
  const v = bondsInChain(51);
  add('peptide-num', num({
    stem: 'How many peptide bonds are there in a single, unbranched polypeptide chain of 51 amino acids?',
    value: v,
    sol: r`One fewer bond than residues: $51 - 1 = ${v}$ peptide bonds.`,
    scheme: [[`${v}`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 50 || 'value');
}
{
  const v = bondsInChain(400);
  add('water-num', num({
    stem: 'An unbranched chain of starch is built from 400 glucose units. How many water molecules were removed in forming its glycosidic bonds?',
    value: v,
    sol: r`One water per glycosidic bond: $400 - 1 = ${v}$ water molecules.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 399 || 'value');
}
{
  const v = peptideMass([75, 75, 75]);
  add('tripeptide-num', num({
    stem: 'Glycine has a molecular mass of 75 daltons and water 18 daltons. What is the molecular mass of a tripeptide made of three glycine units?',
    value: v, unit: 'Da',
    sol: r`Two peptide bonds release two water molecules: $3 \times 75 - 2 \times 18 = 225 - 36 = ${v}$ daltons.`,
    scheme: [[`${v} Da`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 189 || 'value');
}
{
  const v = hBonds(6, 4);
  add('hbond-num', num({
    stem: 'A short DNA segment has 6 A–T pairs and 4 G–C pairs. How many hydrogen bonds hold its two strands together?',
    value: v,
    sol: r`$6 \times 2 + 4 \times 3 = 12 + 12 = ${v}$ hydrogen bonds.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 24 || 'value');
}
add('proteinfn-short', short({
  marks: 2,
  stem: 'Give four functions of proteins, naming one protein for each.',
  model: 'Proteins act as **enzymes** (trypsin), **hormones** (insulin), **structural** material (collagen, the intercellular ground substance), **defence** (antibodies fight infectious agents), **transport** of nutrients across membranes (GLUT-4 carries glucose into cells) and **receptors** for smell, taste and hormones.',
  sol: 'Any four functions with examples.',
  scheme: [['Two functions with proteins', 1], ['Two more', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('proteinlevels-short', short({
  marks: 3,
  stem: 'Describe the four levels of protein structure.',
  model: '**Primary:** the **sequence** of amino acids, from the **N-terminal** to the **C-terminal** amino acid.\n\n**Secondary:** parts of the chain are arranged as a **helix** (only **right-handed** helices occur in proteins); other parts are folded in other forms.\n\n**Tertiary:** the long chain is **folded upon itself** like a hollow woollen ball, giving the 3-D shape needed for many biological activities.\n\n**Quaternary:** several folded **polypeptides** (subunits) are assembled, as in adult haemoglobin with **two α and two β** chains.',
  sol: 'Four levels.',
  scheme: [['Primary and secondary', 1], ['Tertiary', 1], ['Quaternary with haemoglobin', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('polysacch-short', short({
  marks: 3,
  stem: 'Name the polysaccharide that makes up most of (i) a sheet of paper, (ii) the grains in a potato tuber, (iii) the food store in liver and muscle, and (iv) the outer covering of a cockroach, stating its building blocks.',
  model: '(i) **Cellulose**, a homopolymer of **glucose**; paper is made from plant pulp.\n\n(ii) **Starch**, a polymer of **glucose**, the energy store of plants.\n\n(iii) **Glycogen**, a branched polymer of **glucose**, the animal food store.\n\n(iv) **Chitin**, a **complex polysaccharide** (heteropolymer) of **amino-sugars** and chemically modified sugars such as glucosamine.',
  sol: 'Cellulose, starch, glycogen, chitin.',
  scheme: [['(i) and (ii)', 1], ['(iii)', 1], ['(iv) with building blocks', 1]],
  d: 2, c: 'application', t: [2],
}));
add('macromolecules-long', long({
  stem: 'Describe the structure and functions of the three main classes of biomacromolecules: proteins, polysaccharides and nucleic acids.',
  model: '**Biomacromolecules** have molecular weights above ten thousand daltons and are found in the acid-insoluble fraction.\n\n**Proteins** are **polypeptides**, linear chains of amino acids joined by **peptide bonds**, formed by dehydration between the carboxyl group of one amino acid and the amino group of the next. There are 20 kinds of amino acids; those the body cannot make are **essential** and must come from the diet. A protein is a **heteropolymer**. Its structure has four levels: **primary** (sequence from N- to C-terminal), **secondary** (right-handed helices and other folds), **tertiary** (chain folded like a woollen ball) and **quaternary** (several subunits, as in haemoglobin with 2 α and 2 β chains). Proteins carry nutrients across membranes, fight infection, act as hormones and enzymes and form structures: collagen is the most abundant animal protein and **RuBisCO** the most abundant protein in the biosphere.\n\n**Polysaccharides** are long chains of sugars joined by **glycosidic bonds**. **Cellulose** is a homopolymer of glucose forming plant cell walls, paper and cotton; it cannot hold iodine. **Starch**, the plant food store, forms helices that hold iodine and turn blue. **Glycogen** is the animal store, and **inulin** is a polymer of fructose. In a chain the right end is reducing and the left non-reducing. **Chitin** of arthropod exoskeletons is a complex heteropolymer of amino-sugars.\n\n**Nucleic acids** (DNA and RNA) are **polynucleotides**. Each nucleotide has a nitrogenous base (purines adenine and guanine; pyrimidines cytosine, uracil and thymine), a pentose (ribose or 2′-deoxyribose) and a phosphate. Nucleotides are joined by **phosphodiester bonds**. In the **B-DNA** double helix of Watson and Crick, two antiparallel strands are held by hydrogen bonds, A with T (two) and G with C (three); one turn has ten base pairs and is 3.4 nm long.',
  sol: 'Proteins, polysaccharides, nucleic acids.',
  scheme: [['Proteins: bonds, levels, functions', 2], ['Polysaccharides: types and features', 1.5], ['Nucleic acids: nucleotides, bonds, double helix', 1.5]],
  wl: [80, 320],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 enzymes
add('ribozyme-mcq', mcq({
  stem: 'Nucleic acids that behave like enzymes are called',
  right: 'ribozymes',
  wrong: ['apoenzymes', 'coenzymes', 'lectins'],
  sol: 'Almost all enzymes are proteins, but some nucleic acids, ribozymes, also catalyse reactions — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('thermophile-mcq', mcq({
  stem: 'Enzymes purified from bacteria living in hot sulphur springs keep working at 80 °C, whereas enzymes from human cells are damaged above about 40 °C. What does this show?',
  right: 'Some enzymes, from organisms of very hot habitats, are stable at high temperatures',
  wrong: ['All enzymes work best above 80 °C', 'Human enzymes are not proteins', 'Temperature has no effect on enzymes'],
  sol: 'Enzymes from organisms of hot vents and sulphur springs are stable and keep their catalytic power at 80–90 °C — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('activation-mcq', mcq({
  stem: 'A reaction releases energy because its product has less energy than its substrate, yet it proceeds very slowly without a catalyst. Adding an enzyme makes it fast because the enzyme',
  right: 'lowers the activation energy needed to reach the transition state',
  wrong: ['raises the energy of the product', 'supplies heat to the substrate', 'changes the product into a different compound'],
  sol: 'Even an exothermic reaction must pass through a high-energy transition state; enzymes lower this barrier — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('inducedfit-mcq', mcq({
  stem: 'Binding of the substrate makes the enzyme change shape so that it fits more tightly around the substrate. This is called',
  right: 'induced fit',
  wrong: ['competitive inhibition', 'denaturation', 'saturation'],
  sol: 'The substrate induces a change in the enzyme’s shape — induced fit — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('vmax-mcq', mcq({
  stem: 'In an experiment, doubling the substrate concentration from an already high level does not increase the rate of an enzyme reaction at all. The best explanation is that',
  right: 'every enzyme molecule is already bound to substrate, so the rate is at its maximum (Vmax)',
  wrong: ['the extra substrate destroys the enzyme', 'the enzyme has been converted into product', 'the substrate has become a competitive inhibitor'],
  sol: 'Enzyme molecules are fewer than substrate molecules; once all are occupied the velocity cannot rise above Vmax — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('fridge-mcq', mcq({
  stem: 'A laboratory stores its enzyme samples in a refrigerator instead of a warm incubator. Why?',
  right: 'Low temperature keeps enzymes temporarily inactive, whereas high temperature denatures them permanently',
  wrong: ['Enzymes work fastest at low temperature', 'High temperature turns enzymes into ribozymes', 'Cold makes enzymes into competitive inhibitors'],
  sol: 'Low temperature preserves enzymes in an inactive state; heat destroys activity by denaturing the protein — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('malonate-mcq', mcq({
  stem: 'Malonate inhibits the enzyme succinic dehydrogenase because it',
  right: 'closely resembles the substrate succinate and competes for its binding site',
  wrong: ['destroys the enzyme’s protein chain', 'removes the enzyme’s metal cofactor', 'binds the product and blocks its release'],
  sol: 'A competitive inhibitor resembles the substrate and competes for the active site — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('hydrolase-mcq', mcq({
  stem: 'An enzyme breaks the peptide bonds of a protein by adding water. To which class does it belong?',
  right: 'Hydrolases',
  wrong: ['Ligases', 'Isomerases', 'Transferases'],
  sol: 'Hydrolases split ester, ether, peptide, glycosidic and other bonds by hydrolysis — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ligase-mcq', mcq({
  stem: 'An enzyme joins two compounds together by forming a new C–N bond. It belongs to the class',
  right: 'ligases',
  wrong: ['lyases', 'hydrolases', 'oxidoreductases'],
  sol: 'Ligases link two compounds, forming C–O, C–S, C–N or P–O bonds — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('haem-mcq', mcq({
  stem: 'In peroxidase and catalase, which break hydrogen peroxide into water and oxygen, haem is',
  right: 'a prosthetic group, tightly bound to the apoenzyme and part of the active site',
  wrong: ['a coenzyme bound only briefly during catalysis', 'a metal ion cofactor', 'the substrate of the reaction'],
  sol: 'Haem is a prosthetic group: organic, tightly bound and part of the active site — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('niacin-mcq', mcq({
  stem: 'The coenzymes NAD and NADP contain the vitamin',
  right: 'niacin',
  wrong: ['vitamin A', 'vitamin C', 'vitamin D'],
  sol: 'Many coenzymes contain vitamins; NAD and NADP contain niacin — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('zinc-mcq', mcq({
  stem: 'Carboxypeptidase stops working when zinc is removed from it and recovers when zinc is added back. Zinc here is',
  right: 'a metal ion cofactor',
  wrong: ['a coenzyme containing a vitamin', 'an organic prosthetic group', 'a competitive inhibitor'],
  sol: 'Zinc is a metal ion cofactor of the proteolytic enzyme carboxypeptidase; activity is lost without it — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('optimum-mcq', mcq({
  stem: 'An enzyme’s activity (in arbitrary units) is measured at different pH values: pH 4 → 12, pH 6 → 30, pH 7 → 46, pH 8 → 28, pH 10 → 5. Which conclusion is best supported?',
  right: 'Its optimum pH is close to 7, and activity falls on either side of it',
  wrong: ['Activity keeps rising with pH', 'The enzyme works best in strongly acidic conditions', 'pH has no effect on this enzyme'],
  sol: 'The highest reading is at pH 7, with lower activity both below and above it — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('denature-ar', ar({
  a: 'The activity of most enzymes falls sharply at high temperatures.',
  r: 'Enzymes are proteins, and proteins are denatured by heat.',
  key: 'a',
  sol: 'Both are true, and heat denaturation of the protein explains the loss of activity — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('allprotein-ar', ar({
  a: 'All enzymes are proteins.',
  r: 'An enzyme has an active site into which its substrate fits.',
  key: 'd',
  sol: 'A is false, because ribozymes are nucleic acids that act as enzymes; R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('catalyst-tf', tf({
  stem: 'Inorganic catalysts work best at low temperatures, whereas enzymes need high temperatures and pressures.',
  key: 'f',
  sol: 'False. Inorganic catalysts work efficiently at high temperatures and pressures; most enzymes are damaged at high temperatures (say above 40 °C).',
  d: 1, c: 'understanding', t: [3],
}));
add('apoenzyme-fill', fill({
  stem: 'When an enzyme needs a cofactor to be active, its protein part is called the ______.',
  acc: [['apoenzyme']],
  sol: 'Apoenzyme.',
  d: 1, c: 'recall', t: [3],
}));
add('class-match', match({
  stem: 'Match each enzyme class (column I) with the reaction it catalyses (column II).',
  pairs: [
    ['Oxidoreductases', 'Oxidation–reduction between two substrates'],
    ['Transferases', 'Transfer of a group other than hydrogen between substrates'],
    ['Isomerases', 'Inter-conversion of optical, geometric or positional isomers'],
    ['Lyases', 'Removal of groups by means other than hydrolysis, leaving double bonds'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Oxidoreductases transfer hydrogen or electrons, transferases move other groups, isomerases inter-convert isomers and lyases remove groups to leave double bonds.',
  d: 2, c: 'understanding', t: [3],
}));
{
  const v = round(caFactor() / 1e6, 1);
  add('carbonic-num', num({
    stem: 'Without an enzyme, about 200 molecules of carbonic acid form from carbon dioxide and water in an hour; with carbonic anhydrase, about 600000 molecules form every second. How many million times faster is the catalysed reaction? (One decimal place.)',
    value: v, tol: 0.05, unit: 'million',
    sol: r`Per hour with the enzyme: $600000 \times 3600 = 2160000000$; ratio $= \dfrac{2160000000}{200} = 10800000$; in millions, $\dfrac{10800000}{1000000} = ${v}$.`,
    scheme: [[`${v} million`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 10.8 || 'value');
}
{
  const v = rateAfter(3, 20);
  add('doubling-num', num({
    stem: 'An uncatalysed chemical reaction runs at 3 units per minute at 25 °C. If its rate doubles for every 10 °C rise, what will the rate be at 45 °C?',
    value: v,
    sol: r`Two rises of 10 °C: $3 \times 2 \times 2 = ${v}$ units per minute.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 12 || 'value');
}
add('saturation-short', short({
  marks: 2,
  stem: 'A graph of reaction velocity against substrate concentration rises steeply at first and then levels off. Explain both parts of the curve.',
  model: 'At **low substrate** concentration many enzyme molecules are **free**, so adding substrate forms more **enzyme–substrate complexes** and the velocity **rises**. At **high** concentration **all enzyme molecules are occupied** (saturated); since enzymes are fewer than substrate molecules, the velocity reaches **Vmax** and rises no further.',
  sol: 'Free enzyme, then saturation.',
  scheme: [['Rise: free enzyme forms more ES', 1], ['Plateau: saturation at Vmax', 1]],
  d: 3, c: 'application', t: [3],
}));
add('inhibitor-short', short({
  marks: 2,
  stem: 'A drug designed against a bacterial pathogen looks very like the substrate of one of the bacterium’s enzymes. How would it act, and what is this kind of inhibitor called?',
  model: 'Because it **closely resembles the substrate**, it **competes** with the substrate for the **substrate-binding (active) site**; while it is bound, the substrate cannot bind, so the enzyme’s action slows. It is a **competitive inhibitor**, like **malonate** acting on succinic dehydrogenase.',
  sol: 'Competes for the active site.',
  scheme: [['Competes for active site', 1], ['Competitive inhibitor', 1]],
  d: 2, c: 'application', t: [3],
}));
add('fever-short', short({
  marks: 2,
  stem: 'Doctors treat a very high body temperature urgently. Using the effect of temperature on enzymes, explain why.',
  model: 'Each enzyme works best at an **optimum temperature**. Human enzymes are **proteins** that are **damaged at high temperatures** (say above **40 °C**): heat **denatures** them, changing the shape of the **active site**, so many metabolic reactions slow down or stop.',
  sol: 'Denaturation of enzymes.',
  scheme: [['Optimum temperature; proteins', 1], ['Heat denatures, active site lost', 1]],
  d: 2, c: 'application', t: [3],
}));
add('enzymesteps-short', short({
  marks: 3,
  stem: 'Describe the steps by which an enzyme converts its substrate into products.',
  model: '1. The **substrate binds** to the **active site** of the enzyme, a crevice or pocket.\n2. Binding **induces** the enzyme to **alter its shape** so that it fits more tightly around the substrate (**induced fit**), forming the **enzyme–substrate complex**.\n3. The active site, now very close to the substrate, **breaks its chemical bonds**, and an **enzyme–product complex** forms.\n4. The enzyme **releases the products** and is free to bind another substrate molecule and repeat the cycle.',
  sol: 'Four steps.',
  scheme: [['Binding at active site', 0.5], ['Induced fit, ES complex', 1], ['Bonds broken, EP complex', 1], ['Products released, enzyme free', 0.5]],
  d: 2, c: 'understanding', t: [3],
}));
add('cofactor-short', short({
  marks: 3,
  stem: 'What are cofactors? Describe the three kinds, with an example of each.',
  model: '**Cofactors** are **non-protein** constituents bound to an enzyme to make it catalytically active; the protein part is the **apoenzyme**, and activity is lost if the cofactor is removed.\n- **Prosthetic groups:** organic compounds **tightly bound** to the apoenzyme, such as **haem** in peroxidase and catalase.\n- **Coenzymes:** organic compounds bound only **transiently**, during catalysis; many contain **vitamins**, as **NAD and NADP** contain **niacin**.\n- **Metal ions:** form coordination bonds at the active site, such as **zinc** in **carboxypeptidase**.',
  sol: 'Definition and three kinds.',
  scheme: [['Definition, apoenzyme', 0.5], ['Prosthetic group with example', 1], ['Coenzyme with example', 1], ['Metal ion with example', 0.5]],
  d: 2, c: 'understanding', t: [3],
}));
add('enzyme-long', long({
  stem: 'What are enzymes? Explain how they speed up reactions and how temperature, pH, substrate concentration and inhibitors affect their activity.',
  model: '**Enzymes** are biological catalysts. Almost all are **proteins** with a tertiary structure that forms an **active site**, a crevice or pocket into which the substrate fits; some nucleic acids, **ribozymes**, also act as enzymes. Unlike inorganic catalysts, which work best at high temperatures and pressures, most enzymes are damaged above about 40 °C, although enzymes of organisms in hot springs stay stable at 80–90 °C. Enzymes enormously raise reaction rates: carbonic anhydrase makes about 600,000 molecules of carbonic acid a second, compared with about 200 an hour without it.\n\n**How they work.** Every reaction, even one that releases energy, must pass through a high-energy **transition state**; the energy needed is the **activation energy**. An enzyme binds its substrate (**induced fit**) to form an **enzyme–substrate complex**, which lowers the activation energy, so the substrate is converted to product much faster; the enzyme is released unchanged.\n\n**Temperature and pH.** Each enzyme has an **optimum temperature** and **optimum pH**, with lower activity on either side. Low temperature keeps the enzyme temporarily inactive; high temperature **denatures** it.\n\n**Substrate concentration.** Velocity rises with substrate concentration and then reaches **Vmax**, because all enzyme molecules are occupied.\n\n**Inhibitors.** A **competitive inhibitor** resembles the substrate and competes for the active site, as **malonate** inhibits succinic dehydrogenase by mimicking succinate; such inhibitors are used to control bacterial pathogens.',
  sol: 'Nature, mechanism, factors.',
  scheme: [['Nature: proteins, active site, ribozymes', 1], ['Activation energy and ES complex', 1.5], ['Temperature and pH', 1], ['Substrate concentration and inhibitors', 1.5]],
  wl: [80, 320],
  d: 3, c: 'understanding', t: [3],
}));
add('enzymeclass-long', long({
  stem: 'Describe the six classes into which enzymes are divided and explain the role of cofactors, with examples.',
  model: '**Classes.**\n1. **Oxidoreductases (dehydrogenases):** catalyse oxidation–reduction between two substrates, transferring hydrogen or electrons from one to the other.\n2. **Transferases:** transfer a group other than hydrogen from one substrate to another.\n3. **Hydrolases:** hydrolyse ester, ether, peptide, glycosidic, C–C, C–halide or P–N bonds; trypsin is an example.\n4. **Lyases:** remove groups from substrates by mechanisms other than hydrolysis, leaving double bonds.\n5. **Isomerases:** inter-convert optical, geometric or positional isomers.\n6. **Ligases:** link two compounds together, forming C–O, C–S, C–N or P–O bonds.\n\n**Cofactors.** Many enzymes need a **non-protein** part, the **cofactor**, to be active; the protein part is the **apoenzyme**, and activity is lost when the cofactor is removed. **Prosthetic groups** are organic and tightly bound — haem in peroxidase and catalase, which break hydrogen peroxide into water and oxygen, is part of the active site. **Coenzymes** are organic and bound only transiently during catalysis; they serve many enzymes, and many contain **vitamins** — NAD and NADP contain niacin. **Metal ions** form coordination bonds with the active site and the substrate — zinc is the cofactor of carboxypeptidase.',
  sol: 'Six classes; three cofactors.',
  scheme: [['Six classes with reactions', 3], ['Apoenzyme and cofactor', 0.5], ['Prosthetic group, coenzyme, metal ion with examples', 1.5]],
  wl: [80, 300],
  d: 2, c: 'understanding', t: [3],
}));
add('experiment-long', long({
  stem: 'A student says: “Reaction rates double for every 10 °C rise, so salivary enzyme will digest starch about eight times faster at 67 °C than at 37 °C.” Evaluate this prediction, and describe a fair experiment to test it.',
  model: '**Where the claim comes from.** For ordinary chemical reactions the rate roughly **doubles for every 10 °C rise**, so a 30 °C rise would give a factor of 2 × 2 × 2 = 8. Within a safe range, enzyme-catalysed reactions also speed up with temperature, because molecules collide more often and more readily reach the transition state.\n\n**Why it fails here.** Salivary enzyme is a **protein** with an **optimum temperature** close to body temperature. Above about 40 °C human enzymes are **damaged**: heat **denatures** the protein, its tertiary structure and **active site** lose their shape, and the substrate can no longer bind. At 67 °C the rate would therefore be far **lower**, not eight times higher, and the loss would not recover on cooling. Only enzymes from organisms of very hot habitats stay active near 80–90 °C.\n\n**A fair test.** Mix equal volumes of the same starch solution with the same amount of enzyme at a fixed pH, in water baths at, say, 17, 27, 37, 47, 57 and 67 °C. At timed intervals add a drop of the mixture to **iodine**; record the time for the blue colour to disappear. Keep all other conditions constant and repeat each temperature.\n\n**Expected result and judgement.** The rate rises to a peak near 37 °C and falls steeply above it. The prediction is **wrong** because it applies a rule for uncatalysed reactions to an enzyme without allowing for denaturation.',
  sol: 'Rule, denaturation, experiment, judgement.',
  scheme: [['Origin of the claim', 1], ['Optimum and denaturation', 1.5], ['Fair test with controls', 1.5], ['Reasoned judgement', 1]],
  wl: [80, 320],
  d: 4, c: 'evaluation', t: [3],
}));

// ---------------------------------------------------------------- cases
{
  const v = dryMass(50, 78);
  add('grind-case', mk.case({
    passage: 'A class analyses 50 g of fresh liver. A sample dried in an oven loses 78 percent of its mass as water. Another portion is ground in trichloroacetic acid and filtered through cheesecloth; the clear filtrate and the solid retentate are tested separately.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which group of substances would mainly be found in the retentate?',
        right: 'Proteins, nucleic acids, polysaccharides and membrane lipids',
        wrong: ['Amino acids, sugars and nucleotides', 'Water and inorganic ions only', 'Only free fatty acids'],
        sol: 'Macromolecules and membrane-lipid vesicles stay in the acid-insoluble retentate — option (@K).',
        d: 2, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'What is the dry mass of the 50 g of liver, in grams?',
        value: v, unit: 'g',
        sol: r`Dry fraction $= 100 - 78 = 22$ percent; $50 \times \dfrac{22}{100} = ${v}$ g.`,
        scheme: [[`${v} g`, 1]],
        d: 1, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'The filtrate contains compounds of molecular weight below 1000 daltons. Name two classes of such compounds and give an example of each.',
        model: 'The filtrate (acid-soluble pool) holds **micromolecules** such as **amino acids** (glycine, alanine, serine), **sugars** (glucose), **nucleotides** (adenylic acid) and nitrogen bases, besides inorganic ions; these are the building blocks of macromolecules.',
        sol: 'Micromolecules with examples.',
        scheme: [['Two classes', 1], ['Examples', 1]],
        d: 2, c: 'understanding', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Lipids are not macromolecules, yet the class finds them in the retentate. Explain why.',
          model: 'Lipids have molecular weights **below 800 daltons**, but in the tissue they are part of **cell membranes**. Grinding breaks the membranes into **vesicles** that are **not water-soluble**, so these fragments separate with the **acid-insoluble** retentate.',
          sol: 'Membrane vesicles.',
          scheme: [['Low molecular weight but in membranes', 1], ['Insoluble vesicles go with retentate', 1]],
          d: 2, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 11 || 'value');
}
{
  const v = bondsInChains([141, 141, 146, 146]);
  add('haemo-case', mk.case({
    passage: 'The oxygen-carrying protein of adult human red blood cells is made of four polypeptide chains: two identical α chains of 141 amino acids each and two identical β chains of 146 amino acids each. Each chain is first coiled into helices and then folded into a compact shape before the four chains fit together.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The fitting together of the four chains is which level of protein structure?',
        right: 'Quaternary',
        wrong: ['Primary', 'Secondary', 'Tertiary'],
        sol: 'An assembly of several polypeptide subunits is quaternary structure — option (@K).',
        d: 1, c: 'understanding', t: [2],
      })),
      part('b', num({
        stem: 'How many peptide bonds are there in the whole molecule?',
        value: v,
        sol: r`Each chain has one bond fewer than its amino acids: $2 \times 140 + 2 \times 145 = 280 + 290 = ${v}$ peptide bonds.`,
        scheme: [[`${v}`, 1]],
        d: 3, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Describe the secondary and tertiary structure of each chain mentioned in the passage.',
        model: '**Secondary:** parts of each chain are coiled into **helices**; in proteins only **right-handed** helices are found, and other parts fold in other ways. **Tertiary:** the coiled chain is **folded upon itself** like a hollow woollen ball, giving a compact **3-D** shape needed for its activity.',
        sol: 'Helix; folded ball.',
        scheme: [['Secondary: right-handed helix', 1], ['Tertiary: folded 3-D shape', 1]],
        d: 2, c: 'understanding', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'What is meant by the primary structure of the α chain, and why is the order of its amino acids important?',
          model: 'The primary structure is the **sequence** (positional information) of its **141 amino acids**, from the **N-terminal** to the **C-terminal** amino acid. The sequence decides how the chain **coils and folds**, and therefore its **shape and function**.',
          sol: 'Sequence decides folding.',
          scheme: [['Sequence N- to C-terminal', 1], ['Decides folding and function', 1]],
          d: 2, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 570 || 'value');
}
{
  const v = avgRate([0, 0], [18, 5]);
  add('ph-case', mk.case({
    passage: 'An enzyme extracted from an animal’s stomach was tested at 37 °C in buffers of different pH. Activity (arbitrary units): pH 1 → 30; pH 2 → 46; pH 3 → 38; pH 5 → 12; pH 7 → 2. At pH 2, the enzyme formed 18 units of product in the first 5 minutes.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What is the approximate optimum pH of this enzyme?',
        right: 'About 2',
        wrong: ['About 5', 'About 7', 'About 10'],
        sol: 'Activity is highest at pH 2 and lower on either side — option (@K).',
        d: 1, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'What was the average rate of product formation at pH 2 over the first 5 minutes, in units per minute?',
        value: v,
        sol: r`Rate $= \dfrac{18}{5} = ${v}$ units per minute.`,
        scheme: [[`${v}`, 1]],
        d: 1, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the enzyme is almost inactive at pH 7.',
        model: 'Each enzyme shows its **highest activity at an optimum pH**; this one suits the **acidic** stomach. Far from the optimum, at pH 7, the **charges on its ionisable groups change**, altering the shape of the **active site**, so the substrate binds poorly and activity falls.',
        sol: 'Away from optimum, active site altered.',
        scheme: [['Optimum pH is acidic', 1], ['Active site altered away from optimum', 1]],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'The class repeats the test at pH 2 but at 70 °C and finds no activity, even after cooling. Explain.',
          model: 'The enzyme is a **protein**. At 70 °C it is **denatured**: heat destroys its folded structure and the **active site**, so it cannot bind substrate. Denaturation is **permanent**, unlike the temporary inactivity caused by **low** temperature, so activity does not return on cooling.',
          sol: 'Heat denaturation.',
          scheme: [['Denatured by heat', 1], ['Permanent, unlike cold', 1]],
          d: 2, c: 'application', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 3.6 || 'value');
}
{
  const v = pct(40 - 30, 40, 0);
  add('inhibit-case', mk.case({
    passage: 'The enzyme succinic dehydrogenase converts succinate into another compound. In a test tube with a fixed amount of enzyme and a moderate amount of succinate, the rate was 40 units per minute. When malonate, a compound that closely resembles succinate, was added, the rate fell to 30 units per minute. Adding much more succinate brought the rate back up.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Malonate acts here as',
        right: 'a competitive inhibitor',
        wrong: ['a coenzyme', 'a prosthetic group', 'a second substrate'],
        sol: 'It resembles the substrate and competes for the binding site; extra substrate overcomes it — option (@K).',
        d: 2, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'By what percentage did malonate reduce the rate?',
        value: v, unit: '%',
        sol: r`$\dfrac{40 - 30}{40} \times 100 = \dfrac{10}{40} \times 100 = ${v}$ percent.`,
        scheme: [[`${v}%`, 1]],
        d: 1, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why did adding much more succinate bring the rate back up?',
        model: 'Succinate and malonate **compete** for the same **substrate-binding site**. With far more succinate molecules present, succinate is **much more likely to occupy** the active sites than malonate, so most enzyme molecules again bind the real substrate and the rate recovers.',
        sol: 'Competition favours the abundant substrate.',
        scheme: [['Same binding site', 1], ['More substrate outcompetes inhibitor', 1]],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Suggest how competitive inhibitors can be used against bacterial pathogens.',
          model: 'A compound that **closely resembles the substrate** of an enzyme **essential to the bacterium** can be given as a drug. It **competes** for that enzyme’s **active site**, slowing a vital reaction, so the pathogen’s growth is **checked**.',
          sol: 'Block essential bacterial enzyme.',
          scheme: [['Mimics substrate of essential enzyme', 1], ['Slows vital reaction; growth checked', 1]],
          d: 2, c: 'application', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 25 || 'value');
}
