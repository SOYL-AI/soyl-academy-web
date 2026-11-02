// ch09 Biomolecules — two decks: Part 1 (t01 constituents, t02 proteins), Part 2 (t02 polysaccharides and nucleic acids, t03 enzymes).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { AMINO, PEPTIDE, LIPIDS, POLY_NUC, PROTEIN_LEVELS, DNA_LADDER, ENZYME_STEPS, ENERGY, FACTORS } from './svgs.mjs';
import { dryMass, peptideMass, bondsInChain, hBonds, turns, lengthNm, rateAfter, avgRate } from './calc.mjs';

export const V = {
  amino: svgV(AMINO, 'General structure of an amino acid with the alpha carbon, amino group, carboxyl group and R group, with glycine and alanine as examples'),
  peptide: svgV(PEPTIDE, 'Two amino acids joining by a peptide bond with removal of a water molecule'),
  lipids: svgV(LIPIDS, 'Palmitic acid, glycerol, a triglyceride with three fatty acid chains and a phospholipid with a polar head and two tails'),
  polyNuc: svgV(POLY_NUC, 'Branched glycogen chain of glucose units joined by glycosidic bonds, and a nucleotide of base, sugar and phosphate'),
  levels: svgV(PROTEIN_LEVELS, 'Primary, secondary, tertiary and quaternary levels of protein structure'),
  dna: svgV(DNA_LADDER, 'DNA double helix drawn as a ladder with antiparallel backbones and A–T and G–C base pairs'),
  steps: svgV(ENZYME_STEPS, 'Four steps of enzyme action: substrate binding, induced fit, bond breaking and release of products'),
  energy: svgV(ENERGY, 'Energy diagram showing a lower activation energy with an enzyme than without'),
  factors: svgV(FACTORS, 'Graphs of enzyme activity against temperature, pH and substrate concentration'),
};

// ---------------------------------------------------------------- computed numbers
const DRY = { fresh: 40, water: 85 };
DRY.dry = dryMass(DRY.fresh, DRY.water);
const DIA = { mass: peptideMass([89, 89]), bonds50: bondsInChain(50) };
const SEG = { bp: 150, at: 3, gc: 7 };
SEG.turns = turns(SEG.bp);
SEG.len = lengthNm(SEG.bp);
SEG.h = hBonds(SEG.at, SEG.gc);
const RATE = { cooled: rateAfter(8, -10), enz: avgRate([2.4, 4], [6, 10]) };

export const deck1 = deck({
  part: 1,
  title: 'Biomolecules — Part 1: Chemical constituents and proteins',
  goals: [
    'Explain how the chemical composition of a tissue is analysed',
    'Describe amino acids, lipids, nucleotides and metabolites',
    'Distinguish micromolecules and macromolecules',
    'Describe peptide bonds, the structure of proteins and their functions',
  ],
  slides: [
    sl('title', 'Biomolecules', {
      b: 'Part 1 — what living tissue is made of, from small molecules to proteins.',
      v: flow('LR', [['t', 'Living tissue'], ['g', 'Ground in trichloroacetic acid'], ['f', 'Filtrate: acid-soluble pool (micromolecules)'], ['r', 'Retentate: acid-insoluble fraction (macromolecules)']], [['t', 'g'], ['g', 'f'], ['g', 'r']], 'Flow of the analysis of a living tissue into acid-soluble and acid-insoluble fractions'),
      n: 'To find out what a tissue is made of, chemists grind it in trichloroacetic acid and filter the slurry. Thousands of small organic compounds pass into the filtrate, while large molecules stay behind in the retentate. Each part is then analysed.',
    }),
    sl('concept', 'Elements in living and non-living matter', {
      b: 'All the elements of the earth’s crust occur in living tissue, but in very different proportions (percent by weight).',
      v: table(['Element', 'Earth’s crust', 'Human body'], [['Hydrogen', '0.14', '0.5'], ['Carbon', '0.03', '18.5'], ['Oxygen', '46.6', '65.0'], ['Nitrogen', 'Very little', '3.3'], ['Sulphur', '0.03', '0.3'], ['Sodium', '2.8', '0.2'], ['Calcium', '3.6', '1.5'], ['Magnesium', '2.1', '0.1'], ['Silicon', '27.7', 'Negligible']], 'Table comparing elements in the earth’s crust and the human body'),
      n: 'Living matter is especially rich in carbon and hydrogen, while silicon, abundant in rocks, is almost absent from the body. Analysis also reveals inorganic ions such as sodium, potassium, calcium and magnesium, and compounds such as phosphate and sulphate.',
    }),
    sl('diagram', 'Amino acids', {
      b: 'Amino acids have an **amino group** and an acidic **carboxyl group** on the same carbon, the **alpha carbon**. The variable **R group** decides which of the 20 amino acids it is.',
      v: V.amino,
      n: 'Amino acids can be acidic, like glutamic acid, basic, like lysine, or neutral, like valine; tyrosine, phenylalanine and tryptophan are aromatic. Their amino and carboxyl groups are ionisable, so their structure changes with pH, forming a zwitterion at a particular pH.',
    }),
    sl('diagram', 'Lipids', {
      b: 'Lipids are generally **water-insoluble**. A **fatty acid** has a carboxyl group on a hydrocarbon chain of 1 to 19 carbons; **glycerol** is trihydroxy propane.',
      v: V.lipids,
      n: 'Palmitic acid has sixteen carbons and arachidonic acid twenty, counting the carboxyl carbon. Fatty acids are saturated or unsaturated. Glycerol joined to one, two or three fatty acids gives glycerides; oils stay liquid in winter, fats are solid. Phospholipids such as lecithin build cell membranes.',
    }),
    sl('concept', 'Nitrogen bases, nucleosides and nucleotides', {
      b: 'Heterocyclic **nitrogen bases** join a sugar to form **nucleosides**; adding a **phosphate** gives **nucleotides**.',
      v: table(['Base', 'Nucleoside', 'Nucleotide'], [['Adenine', 'Adenosine', 'Adenylic acid'], ['Guanine', 'Guanosine', 'Guanylic acid'], ['Thymine', 'Thymidine', 'Thymidylic acid'], ['Uracil', 'Uridine', 'Uridylic acid'], ['Cytosine', 'Cytidine', 'Cytidylic acid']], 'Table of bases, nucleosides and nucleotides'),
      n: 'Adenine with a sugar is adenosine, a nucleoside. When a phosphate group is also esterified to the sugar, it becomes adenylic acid, a nucleotide. Nucleotides are the building blocks of the nucleic acids, DNA and RNA.',
    }),
    sl('check', 'Quick check: amino acids', {
      b: 'What is the R group of serine?',
      n: 'Quick check. Glycine has hydrogen and alanine a methyl group. What does serine have?',
      chk: 'serine-mcq',
    }),
    sl('concept', 'Primary and secondary metabolites', {
      b: '**Primary metabolites** (amino acids, sugars, nucleotides) have known roles in normal physiology. **Secondary metabolites**, mainly from plants, fungi and microbes, are often useful to people.',
      v: table(['Secondary metabolite', 'Examples'], [['Pigments', 'Carotenoids, anthocyanins'], ['Alkaloids', 'Morphine, codeine'], ['Terpenoids', 'Monoterpenes, diterpenes'], ['Essential oils', 'Lemon grass oil'], ['Toxins', 'Abrin, ricin'], ['Lectins', 'Concanavalin A'], ['Drugs', 'Vinblastin, curcumin'], ['Polymeric substances', 'Rubber, gums, cellulose']], 'Table of kinds of secondary metabolites with examples'),
      n: 'We do not yet understand the role of most secondary metabolites in the organisms that make them, but many are important to human welfare as drugs, dyes, flavours and raw materials such as rubber.',
    }),
    sl('concept', 'Biomacromolecules', {
      b: 'Compounds in the acid-soluble pool are **micromolecules** (below 1000 daltons). **Macromolecules** — proteins, nucleic acids and polysaccharides — are above ten thousand daltons and form the acid-insoluble fraction. Lipids, though small, also appear there because membranes break into insoluble vesicles.',
      v: table(['Component', 'Percent of total cellular mass'], [['Water', '70 to 90'], ['Proteins', '10 to 15'], ['Carbohydrates', '3'], ['Lipids', '2'], ['Nucleic acids', '5 to 7'], ['Ions', '1']], 'Table of the average composition of cells'),
      n: 'Water makes up most of a cell. Among the rest, proteins are the largest share. The acid-soluble pool roughly represents the cytoplasm, while the macromolecules of the cytoplasm and organelles make up the acid-insoluble fraction.',
    }),
    sl('example', 'Worked example 1: water and dry mass', {
      b: `A ${DRY.fresh} g sample of fresh leaf loses ${DRY.water} percent of its mass on drying. What is its dry mass?`,
      ul: [
        r`Dry fraction $= 100 - ${DRY.water} = ${100 - DRY.water}$ percent.`,
        r`Dry mass $= ${DRY.fresh} \times \dfrac{${100 - DRY.water}}{100} = ${DRY.dry}$ g.`,
        'The dry mass contains the organic compounds and minerals; water lies within the 70 to 90 percent range.',
      ],
      v: table(['Quantity', 'Value'], [['Fresh mass', `${DRY.fresh} g`], ['Water lost', `${DRY.water} percent`], ['Dry mass', `${DRY.dry} g`]], `Worked table: dry mass ${DRY.dry} g`),
      n: 'If eighty-five percent is water, fifteen percent is left. Fifteen percent of forty grams is six grams. That small dry mass holds all the proteins, carbohydrates, lipids, nucleic acids and minerals of the sample.',
    }),
    sl('check', 'Quick check: fatty acids', {
      b: 'How many carbon atoms does palmitic acid have?',
      n: 'Quick check. Remember to count the carboxyl carbon.',
      chk: 'palmitic-mcq',
    }),
    sl('diagram', 'The peptide bond', {
      b: 'Proteins are **polypeptides**: linear chains of amino acids linked by **peptide bonds**, formed by **dehydration** between the carboxyl group of one amino acid and the amino group of the next.',
      v: V.peptide,
      n: 'Each time two amino acids join, one molecule of water is removed. A protein is a heteropolymer of up to twenty kinds of amino acids. Amino acids that our body cannot make are essential and must come from the diet; the rest are non-essential.',
    }),
    sl('example', 'Worked example 2: counting bonds and mass', {
      b: 'Alanine has a molecular mass of 89 daltons and water 18 daltons. Find the mass of the dipeptide alanylalanine, and the number of peptide bonds in an unbranched chain of 50 amino acids.',
      ul: [
        r`Dipeptide: $2 \times 89 - 18 = ${DIA.mass}$ daltons.`,
        r`Chain of 50: $50 - 1 = ${DIA.bonds50}$ peptide bonds, and as many water molecules released.`,
        'The same rule, one bond fewer than units, holds for glycosidic bonds in a polysaccharide chain.',
      ],
      v: table(['Polymer', 'Units', 'Bonds (water released)'], [['Dipeptide', '2', '1'], ['Polypeptide', '50', String(DIA.bonds50)]], `Worked table: dipeptide ${DIA.mass} daltons; ${DIA.bonds50} bonds in a chain of fifty`),
      n: 'Joining two alanines removes one water, so subtract eighteen from one hundred and seventy-eight to get one hundred and sixty. In any unbranched chain, the number of bonds is one fewer than the number of units.',
    }),
    sl('diagram', 'Structure of proteins', {
      b: 'Protein structure is described at **four levels**.',
      v: V.levels,
      n: 'The primary structure is the sequence of amino acids, from the N-terminal to the C-terminal end. Parts of the chain coil into right-handed helices, the secondary structure. The chain then folds upon itself like a woollen ball, the tertiary structure. Several chains may assemble into a quaternary structure, as in haemoglobin with two alpha and two beta subunits.',
    }),
    sl('concept', 'Functions of proteins', {
      b: 'Proteins carry nutrients across membranes, fight infection, act as hormones and enzymes, and build structures. **Collagen** is the most abundant protein in the animal world, and **RuBisCO** in the whole biosphere.',
      v: table(['Protein', 'Function'], [['Collagen', 'Intercellular ground substance'], ['Trypsin', 'Enzyme'], ['Insulin', 'Hormone'], ['Antibody', 'Fights infectious agents'], ['Receptor', 'Sensory reception of smell, taste and hormones'], ['GLUT-4', 'Enables glucose transport into cells']], 'Table of proteins and their functions'),
      n: 'Almost every job in a cell is done by a protein. Enzymes speed reactions, hormones carry signals, antibodies defend the body, receptors detect smells and tastes, and transport proteins move substances such as glucose into cells.',
    }),
    sl('check', 'Quick check: proteins', {
      b: 'Which is the most abundant protein in the whole biosphere?',
      n: 'Quick check. Think of the enzyme that fixes carbon dioxide in every green plant.',
      chk: 'rubisco-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Grinding in trichloroacetic acid separates an acid-soluble pool (micromolecules) from an acid-insoluble fraction (macromolecules).',
        'Amino acids: alpha carbon with H, amino, carboxyl and R groups; acidic, basic, neutral, aromatic.',
        'Lipids: fatty acids (palmitic 16 C), glycerol, glycerides, phospholipids (lecithin).',
        'Bases → nucleosides → nucleotides; primary and secondary metabolites.',
        'Proteins: peptide bonds; primary to quaternary structure; collagen and RuBisCO; varied functions.',
      ],
      v: table(['Building block', 'Polymer'], [['Amino acid', 'Protein'], ['Monosaccharide', 'Polysaccharide'], ['Nucleotide', 'Nucleic acid']], 'Summary table of building blocks and their polymers'),
      n: 'To recap: a cell is mostly water, with small molecules in the acid-soluble pool and large ones in the insoluble fraction. Amino acids join by peptide bonds into proteins, whose four levels of structure give each protein its shape and function.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the **general amino acid** with the R group and alpha carbon.',
        'Explain why **lipids** appear in the acid-insoluble fraction.',
        'Distinguish **nucleoside** and **nucleotide**.',
        'Give **four levels** of protein structure with haemoglobin as the example.',
      ],
      n: 'Exam tips. Practise drawing an amino acid. Explain the lipid puzzle in the insoluble fraction. Keep nucleosides and nucleotides apart. And describe all four levels of protein structure, using haemoglobin for the quaternary level.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Biomolecules — Part 2: Polysaccharides, nucleic acids and enzymes',
  goals: [
    'Describe polysaccharides and the glycosidic bond',
    'Describe nucleic acids and the double helix',
    'Explain how enzymes work and what affects their activity',
    'Classify enzymes and describe cofactors',
  ],
  slides: [
    sl('title', 'Polysaccharides, nucleic acids and enzymes', {
      b: 'Part 2 — two more classes of macromolecules, and the proteins that run the chemistry of life.',
      v: flow('LR', [['e', 'Enzyme + substrate'], ['es', 'Enzyme–substrate complex'], ['ep', 'Enzyme–product complex'], ['p', 'Enzyme + products']], [['e', 'es'], ['es', 'ep'], ['ep', 'p']], 'Flow of an enzyme-catalysed reaction through enzyme–substrate and enzyme–product complexes'),
      n: 'Polysaccharides store energy and build walls and shells. Nucleic acids carry hereditary information. And enzymes, most of which are proteins, make the reactions of metabolism happen fast enough to support life.',
    }),
    sl('diagram', 'Polysaccharides and nucleotides', {
      b: 'Polysaccharides are long chains of sugars joined by **glycosidic bonds**, formed by dehydration between two adjacent sugars. In a chain such as glycogen, the right end is **reducing** and the left end **non-reducing**.',
      v: V.polyNuc,
      n: 'A nucleotide has three parts: a nitrogenous base, a pentose sugar and a phosphate. Adenine and guanine are purines; cytosine, uracil and thymine are pyrimidines. The sugar is ribose in RNA and deoxyribose in DNA.',
    }),
    sl('concept', 'Kinds of polysaccharides', {
      b: 'Polysaccharides can be homopolymers or heteropolymers.',
      v: table(['Polysaccharide', 'Monomer', 'Role or feature'], [['Cellulose', 'Glucose (homopolymer)', 'Plant cell walls, paper, cotton; does not hold iodine'], ['Starch', 'Glucose', 'Plant energy store; helices hold iodine and turn blue'], ['Glycogen', 'Glucose', 'Animal energy store'], ['Inulin', 'Fructose', 'Storage polymer'], ['Chitin', 'Amino-sugars (heteropolymer)', 'Exoskeleton of arthropods']], 'Table of polysaccharides with monomers and roles'),
      n: 'Starch forms helical regions that trap iodine, which is why it turns blue-black. Cellulose has no such helices, so cotton and paper do not. Chitin is a complex polysaccharide built from chemically modified sugars such as glucosamine.',
    }),
    sl('diagram', 'Nucleic acids and the double helix', {
      b: 'Nucleotides are joined by **phosphodiester bonds**: the phosphate links the 3′ carbon of one sugar to the 5′ carbon of the next. Watson and Crick described DNA as a **double helix**.',
      v: V.dna,
      n: 'The two strands run in opposite directions and are held together by hydrogen bonds between bases: adenine with thymine by two bonds, guanine with cytosine by three. In the common B form of DNA, one full turn contains ten base pairs and is three point four nanometres long.',
    }),
    sl('example', 'Worked example 1: measuring a stretch of DNA', {
      b: `A B-DNA segment has ${SEG.bp} base pairs. How many turns and how long is it? A smaller piece with ${SEG.at} A–T and ${SEG.gc} G–C pairs: how many hydrogen bonds?`,
      ul: [
        r`Turns $= \dfrac{${SEG.bp}}{10} = ${SEG.turns}$; length $= ${SEG.turns} \times 3.4 = ${SEG.len}$ nm.`,
        r`Hydrogen bonds $= ${SEG.at} \times 2 + ${SEG.gc} \times 3 = ${SEG.h}$.`,
        'More G–C pairs mean more hydrogen bonds, so the strands are harder to separate.',
      ],
      v: table(['Quantity', 'Value'], [['Turns', String(SEG.turns)], ['Length', `${SEG.len} nm`], ['Hydrogen bonds', String(SEG.h)]], `Worked table: ${SEG.turns} turns, ${SEG.len} nanometres, ${SEG.h} hydrogen bonds`),
      n: 'Ten base pairs make one turn, so one hundred and fifty pairs make fifteen turns, each three point four nanometres long, about fifty-one nanometres in all. For hydrogen bonds, count two for each A and T pair and three for each G and C pair.',
    }),
    sl('check', 'Quick check: polysaccharide chains', {
      b: 'True or false: in glycogen the right end of the chain is the reducing end.',
      n: 'Quick check. Recall how the two ends of a polysaccharide chain are named.',
      chk: 'reducing-tf',
    }),
    sl('concept', 'Enzymes: what they are', {
      b: 'Almost all enzymes are **proteins**; some nucleic acids, **ribozymes**, also act as enzymes. The tertiary structure forms an **active site**, a crevice or pocket for the substrate. Rate of a reaction is the amount of product formed per unit time.',
      v: table(['Feature', 'Detail'], [['Inorganic catalysts', 'Work best at high temperatures and pressures'], ['Most enzymes', 'Damaged at high temperatures, say above 40 °C'], ['Enzymes of hot springs organisms', 'Stable at 80 to 90 °C'], ['Carbonic anhydrase', 'About 600,000 molecules of carbonic acid a second, against about 200 an hour without it: about ten million times faster'], ['Uncatalysed reactions', 'Rate roughly doubles for every 10 °C rise']], 'Table of features of enzymes compared with other catalysts'),
      m: [r`\ce{CO2 + H2O <=> H2CO3}`],
      n: 'Carbonic anhydrase shows how powerful enzymes are. Without it, carbon dioxide and water form only a couple of hundred molecules of carbonic acid in an hour. With it, six hundred thousand form every second. Metabolic pathways, such as the ten steps that turn glucose into pyruvic acid, are chains of such catalysed reactions.',
    }),
    sl('diagram', 'How enzymes speed up reactions', {
      b: 'To become product, the substrate must pass through a high-energy **transition state**. The energy needed is the **activation energy**. Enzymes **lower** this barrier.',
      v: V.energy,
      n: 'Even when the product has less energy than the substrate, so that no heat needs to be supplied, the reaction cannot proceed until molecules reach the transition state. By binding the substrate, an enzyme lowers the activation energy, so far more molecules react each second.',
    }),
    sl('diagram', 'Steps of enzyme action', {
      b: 'The enzyme binds the substrate in its active site and releases the products, ready to act again.',
      v: V.steps,
      n: 'First, the substrate binds the active site. This induces the enzyme to change shape and fit more tightly, the induced fit. Next, the active site breaks chemical bonds in the substrate, giving an enzyme–product complex. Finally, the products are released and the free enzyme can bind another substrate molecule.',
    }),
    sl('check', 'Quick check: enzyme action', {
      b: 'What is the change of enzyme shape on binding the substrate called?',
      n: 'Quick check. The substrate induces something.',
      chk: 'inducedfit-mcq',
    }),
    sl('diagram', 'Factors affecting enzyme activity', {
      b: 'Each enzyme has an **optimum temperature** and **optimum pH**. Velocity rises with substrate concentration up to a maximum, **Vmax**.',
      v: V.factors,
      n: 'Below the optimum temperature an enzyme is only temporarily inactive, but high temperature denatures the protein. Activity also falls on either side of the optimum pH. With more substrate the rate climbs until every enzyme molecule is busy; adding still more substrate then has no effect.',
    }),
    sl('concept', 'Inhibitors', {
      b: 'A chemical that shuts off enzyme activity is an **inhibitor**. A **competitive inhibitor** closely resembles the substrate and competes for the substrate-binding site.',
      v: flow('LR', [['s', 'Succinate (substrate)'], ['m', 'Malonate (look-alike)'], ['e', 'Succinic dehydrogenase active site'], ['x', 'Less product formed']], [['s', 'e'], ['m', 'e', 'competes'], ['e', 'x']], 'Flow of malonate competing with succinate for the active site of succinic dehydrogenase'),
      n: 'Malonate looks so like succinate that it occupies the active site of succinic dehydrogenase, which then cannot act on succinate. Competitive inhibitors of this kind are often used to control bacterial pathogens.',
    }),
    sl('example', 'Worked example 2: reading rates', {
      b: 'An uncatalysed reaction runs at 8 units per minute at 30 °C. Estimate its rate at 20 °C. An enzyme reaction has formed 2.4 units of product at 4 minutes and 6.0 units at 10 minutes. Find its average rate over this interval.',
      ul: [
        r`Uncatalysed: a 10 °C fall halves the rate: $\dfrac{8}{2} = ${RATE.cooled}$ units per minute.`,
        r`Enzyme: $\dfrac{6.0 - 2.4}{10 - 4} = \dfrac{3.6}{6} = ${RATE.enz}$ units per minute.`,
        'Rate is the change in product divided by the time taken.',
      ],
      v: table(['Reaction', 'Data', 'Rate'], [['Uncatalysed', '8 at 30 °C, cooled by 10 °C', String(RATE.cooled)], ['Enzyme', '2.4 at 4 min, 6.0 at 10 min', String(RATE.enz)]], `Worked table: rates ${RATE.cooled} and ${RATE.enz} units per minute`),
      n: 'For the uncatalysed reaction, cooling by ten degrees halves the rate, giving four. For the enzyme, three point six units were made in six minutes, so the average rate is zero point six units per minute.',
    }),
    sl('concept', 'Classification of enzymes', {
      b: 'Enzymes are divided into **six classes**, each with subclasses, by the type of reaction they catalyse.',
      v: table(['Class', 'Reaction catalysed'], [['Oxidoreductases (dehydrogenases)', 'Oxidation–reduction between two substrates'], ['Transferases', 'Transfer of a group other than hydrogen between substrates'], ['Hydrolases', 'Hydrolysis of ester, ether, peptide, glycosidic, C–C, C–halide or P–N bonds'], ['Lyases', 'Removal of groups by means other than hydrolysis, leaving double bonds'], ['Isomerases', 'Inter-conversion of optical, geometric or positional isomers'], ['Ligases', 'Linking two compounds, forming C–O, C–S, C–N or P–O bonds']], 'Table of the six classes of enzymes'),
      n: 'Ask what the enzyme does to its substrate. Moving hydrogen or electrons means an oxidoreductase; moving another group, a transferase; splitting with water, a hydrolase; removing a group to leave a double bond, a lyase; rearranging atoms, an isomerase; and joining two molecules, a ligase.',
    }),
    sl('concept', 'Cofactors', {
      b: 'Many enzymes need a **non-protein cofactor**; the protein part is the **apoenzyme**. Activity is lost when the cofactor is removed.',
      v: table(['Cofactor', 'Nature', 'Example'], [['Prosthetic group', 'Organic, tightly bound to the apoenzyme', 'Haem in peroxidase and catalase'], ['Coenzyme', 'Organic, bound only during catalysis; often contains a vitamin', 'NAD and NADP contain niacin'], ['Metal ion', 'Forms coordination bonds at the active site', 'Zinc in carboxypeptidase']], 'Table of three kinds of cofactors with examples'),
      n: 'Peroxidase and catalase break hydrogen peroxide into water and oxygen with the help of haem, which is part of their active site. Coenzymes attach only while the reaction happens, and many are made from vitamins. Metal ions such as zinc bind both enzyme and substrate.',
    }),
    sl('check', 'Quick check: coenzymes', {
      b: 'Which vitamin is found in the coenzymes NAD and NADP?',
      n: 'Quick check. It is one of the B vitamins.',
      chk: 'niacin-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Polysaccharides: glycosidic bonds; cellulose, starch, glycogen, inulin, chitin; starch holds iodine.',
        'Nucleic acids: nucleotides joined by phosphodiester bonds; DNA double helix, A–T two and G–C three hydrogen bonds; 10 base pairs and 3.4 nm per turn.',
        'Enzymes: mostly proteins (also ribozymes); active site; lower activation energy; induced fit.',
        'Activity depends on temperature, pH and substrate concentration (Vmax); competitive inhibitors such as malonate.',
        'Six classes; cofactors: prosthetic groups, coenzymes, metal ions.',
      ],
      v: table(['Bond', 'Joins'], [['Peptide', 'Amino acids'], ['Glycosidic', 'Sugars'], ['Phosphodiester', 'Nucleotides'], ['Hydrogen', 'Base pairs of two DNA strands']], 'Summary table of bonds in biomolecules'),
      n: 'To recap: sugars join by glycosidic bonds, nucleotides by phosphodiester bonds, and two DNA strands by hydrogen bonds. Enzymes lower the activation energy of reactions; they work best at an optimum temperature and pH, can be saturated with substrate and blocked by look-alike inhibitors.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Explain the **iodine test** difference between starch and cellulose.',
        'Count **hydrogen bonds** and **turns** in DNA carefully.',
        'Draw and label the **activation energy** diagram.',
        'Learn the **six enzyme classes** and **three cofactors** with examples.',
      ],
      n: 'Exam tips. Know why starch turns blue with iodine but cellulose does not. Practise counting hydrogen bonds and turns in DNA. Draw the activation energy diagram neatly. And learn the six classes of enzymes and the three kinds of cofactors with one example each.',
    }),
  ],
});
