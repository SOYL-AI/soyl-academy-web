// ISC 11 Biology ch11 Biomolecules. Part 1 (t01-t03: carbohydrates, amino acids, proteins) and Part 2 (t04-t06: lipids, enzymes, secondary metabolites).
import { sl, deck, table, flow, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { AMINO, ZWITTER, PROTEIN, ENZYMES, INHIBITION, TRIGLYCERIDE, DISACCHARIDES } from './svgs.mjs';
import { M, D, WATER, hydrolyse, AM, peptide, TRI, fact, bonds, FAM, GLYCEROL, triglyceride, FA, kcal, KIN, KT, rate, ratio } from './calc.mjs';

export const V = {
  amino: svgV(AMINO, 'Structures of glycine, alanine and serine'),
  zwitter: svgV(ZWITTER, 'An amino acid and its zwitterion'),
  protein: svgV(PROTEIN, 'The four levels of protein structure'),
  enzymes: svgV(ENZYMES, 'Enzyme activity against temperature, pH and substrate concentration'),
  inhibition: svgV(INHIBITION, 'Competitive inhibition in three panels'),
  triglyceride: svgV(TRIGLYCERIDE, 'A triglyceride with saturated and unsaturated chains'),
  disacc: svgV(DISACCHARIDES, 'Maltose, lactose and sucrose formed from monosaccharides'),
};

const hy = hydrolyse(171);
const pent = (n) => `${n} amino acids`;
void pent;
const tri = peptide(TRI);

export const deck1 = deck({
  part: 1,
  title: 'Biomolecules — Part 1: Carbohydrates, amino acids and proteins',
  goals: [
    'Classify carbohydrates into mono-, di- and polysaccharides and state one function of each given sugar',
    'Draw glycine, alanine and serine, explain the zwitterion and classify amino acids',
    'Describe the four levels of protein structure, the bonds that stabilise each and the functions of proteins',
  ],
  slides: [
    sl('title', 'Carbohydrates, amino acids and proteins', {
      b: 'Part 1: the sugars that fuel and build cells, and the amino acids that are joined into proteins.',
      v: flow('LR', [['c', 'Carbohydrates'], ['a', 'Amino acids'], ['p', 'Proteins']], [['c', 'a'], ['a', 'p']], 'Path from carbohydrates to amino acids to proteins'),
      n: 'Cells are made of a few kinds of large molecules. We begin with carbohydrates, which supply energy and build structures, and then study amino acids and the proteins that are built from them.',
    }),
    sl('concept', 'Classes of carbohydrates', {
      b: 'Carbohydrates are classified by the number of sugar units joined together.',
      v: table(['Class', 'Examples', 'Role'], [['Monosaccharides', 'Glucose, ribose, deoxyribose', 'Glucose is the main fuel; ribose and deoxyribose form part of RNA and DNA'], ['Disaccharides', 'Maltose, lactose, sucrose', 'Dietary sugars; broken down to monosaccharides'], ['Polysaccharides', 'Glycogen, starch, cellulose, inulin, chitin', 'Stores of energy and structural materials']], 'Table of the three classes of carbohydrates'),
      n: 'One sugar unit makes a monosaccharide, two make a disaccharide, and many make a polysaccharide. Glucose is the common fuel, while ribose and deoxyribose are the sugars of the nucleic acids.',
    }),
    sl('diagram', 'How disaccharides are formed', {
      b: 'Two monosaccharides join by a **glycosidic bond**, and one molecule of **water** is lost.',
      v: V.disacc,
      n: 'Maltose is two glucose units joined together. Lactose, the sugar of milk, is glucose joined to galactose. Sucrose, cane sugar, is glucose joined to fructose. Each joining releases one molecule of water.',
    }),
    sl('concept', 'Polysaccharides', {
      b: 'Polysaccharides are long chains of sugar units; their linkages decide their function.',
      v: table(['Polysaccharide', 'Units', 'Where and what for'], [['Starch', 'Glucose', 'Reserve food of plants'], ['Glycogen', 'Glucose, highly branched', 'Reserve food of animals, in liver and muscle'], ['Cellulose', 'Glucose joined differently from starch', 'Structural material of plant cell walls'], ['Inulin', 'Fructose', 'Reserve food in roots and tubers such as dahlia'], ['Chitin', 'Amino sugar', 'Wall of fungi and the outer skeleton of arthropods']], 'Table of polysaccharides'),
      n: 'Starch and glycogen are stores of glucose, in plants and animals. Cellulose also contains glucose, but joined differently, so it forms strong walls that humans cannot digest. Inulin stores fructose, and chitin builds fungal walls and insect skeletons.',
    }),
    sl('example', 'Worked example 1: hydrolysing sucrose', {
      b: `The mass of one mole of sucrose is ${D.sucrose} grams and that of glucose or fructose ${M.glucose} grams. How much water is needed to hydrolyse ${171} grams of sucrose, and how much glucose and fructose are formed?`,
      ul: [
        `Moles of sucrose = ${171} ÷ ${D.sucrose} = ${hy.mol}.`,
        `One mole of sucrose takes up one mole of water (${WATER} grams), so water used = ${hy.mol} × ${WATER} = ${hy.water} grams.`,
        `Glucose formed = ${hy.mol} × ${M.glucose} = ${hy.each} grams, and fructose also ${hy.each} grams, a total of ${hy.sugars} grams.`,
        `Check: ${171} + ${hy.water} = ${171 + hy.water} = ${hy.sugars}.`,
      ],
      v: table(['Quantity', 'Grams'], [['Sucrose', '171'], ['Water used', String(hy.water)], ['Glucose formed', String(hy.each)], ['Fructose formed', String(hy.each)]], `Worked table: ${hy.water} grams of water used, ${hy.sugars} grams of sugars formed`),
      n: 'Hydrolysis adds water. Half a mole of sucrose takes up half a mole of water and gives half a mole each of glucose and fructose. The mass of the sugars formed equals the mass of sucrose plus the water used.',
    }),
    sl('check', 'Quick check: polysaccharides', {
      b: 'Which polysaccharide is a store of fructose in a dahlia tuber?',
      n: 'Quick check. Which storage carbohydrate is made of fructose units?',
      chk: 'chk-inulin',
    }),
    sl('diagram', 'Amino acids', {
      b: 'An amino acid has an **amino group**, a **carboxyl group**, a hydrogen atom and an **R group** on the same carbon.',
      v: V.amino,
      n: 'Glycine has just a hydrogen atom as its R group. Alanine has a methyl group, and serine has a hydroxymethyl group. Every amino acid has the same backbone and differs only in the R group.',
    }),
    sl('diagram', 'The zwitterion', {
      b: 'In water an amino acid becomes a **zwitterion**: the carboxyl group gives a proton to the amino group.',
      v: V.zwitter,
      n: 'In solution, the carboxyl group loses a proton and the amino group gains one. The molecule then carries a positive and a negative charge, but no net charge. In acid it carries a net positive charge and in alkali a net negative charge.',
    }),
    sl('concept', 'Classes of amino acids', {
      b: 'Amino acids are grouped by their R groups and by whether the body can make them.',
      v: table(['Class', 'Features', 'Examples'], [['Neutral', 'One amino and one carboxyl group', 'Glycine, alanine, serine'], ['Acidic', 'Extra carboxyl group in the R group', 'Aspartic acid, glutamic acid'], ['Basic', 'Extra amino or basic group in the R group', 'Lysine, arginine, histidine'], ['Sulphur-containing', 'Sulphur in the R group', 'Cysteine, methionine'], ['Essential', 'Not made by the body; must come from food', 'Valine, leucine, isoleucine, lysine, methionine, phenylalanine, threonine, tryptophan']], 'Table of the classes of amino acids'),
      n: 'Acidic amino acids have a second carboxyl group, basic ones an extra amino group, and two contain sulphur. Essential amino acids cannot be made by the body, so they must be supplied by food.',
    }),
    sl('example', 'Worked example 2: building a peptide', {
      b: `Glycine weighs ${AM.glycine}, alanine ${AM.alanine} and serine ${AM.serine} (in daltons), and water ${WATER}. Find the mass of the tripeptide made of these three, joined once each, and how many different tripeptides can be made from them.`,
      ul: [
        `Sum of residues = ${AM.glycine} + ${AM.alanine} + ${AM.serine} = ${AM.glycine + AM.alanine + AM.serine}.`,
        `Two peptide bonds form, releasing two waters: ${AM.glycine + AM.alanine + AM.serine} − 2 × ${WATER} = ${tri}.`,
        `Three different residues can be ordered in 3 × 2 × 1 = ${fact(3)} ways, so ${fact(3)} different tripeptides exist. With all twenty amino acids the number would be 20 × 20 × 20 = ${20 ** 3}.`,
      ],
      v: table(['Quantity', 'Value'], [['Sum of residues', String(AM.glycine + AM.alanine + AM.serine)], ['Tripeptide mass', String(tri)], ['Orders of the three', String(fact(3))]], `Worked table: mass ${tri}, ${fact(3)} orders`),
      n: 'Each peptide bond removes one water. Three residues need two bonds, so the tripeptide weighs two waters less than the three amino acids separately. Changing the order gives a different peptide, so there are six.',
    }),
    sl('check', 'Quick check: the zwitterion', {
      b: 'What is the net charge on an amino acid zwitterion?',
      n: 'Quick check. What is the net charge on a zwitterion?',
      chk: 'chk-zwitter',
    }),
    sl('diagram', 'Four levels of protein structure', {
      b: '**Primary:** sequence of amino acids joined by peptide bonds. **Secondary:** helix or pleated sheet. **Tertiary:** folding of the whole chain. **Quaternary:** several chains together.',
      v: V.protein,
      n: 'The primary structure is the order of amino acids. The chain then coils into a helix or folds into a sheet, which is the secondary structure. The whole chain folds into the tertiary structure, and several folded chains may join in the quaternary structure.',
    }),
    sl('concept', 'Bonds and functions of proteins', {
      b: 'Each level is held by its own kind of bond; the final shape decides the function.',
      v: table(['Level', 'Stabilised by'], [['Primary', 'Peptide bonds (covalent)'], ['Secondary', 'Hydrogen bonds between backbone groups'], ['Tertiary', 'Hydrogen bonds, ionic and hydrophobic interactions, disulphide bridges between cysteines'], ['Quaternary', 'Weak bonds between the subunits'], ['Functions', 'Enzymes, structure (collagen, keratin), transport (haemoglobin), hormones (insulin), defence (antibodies), movement (actin, myosin)']], 'Table of the bonds and functions of proteins'),
      n: 'Peptide bonds hold the primary structure. Hydrogen bonds hold the helix and the sheet. The tertiary shape is held by several kinds of bond, including disulphide bridges between cysteines. Proteins act as enzymes and as structural, transport, hormone and defence molecules.',
    }),
    sl('example', 'Worked example 3: counting bonds in a protein', {
      b: `A protein is made of four separate polypeptide chains and has two hundred and eighty amino acids in all. How many peptide bonds does it contain, and how many water molecules were released in making it?`,
      ul: [
        `A chain of n amino acids has n − 1 peptide bonds, so four chains of total length 280 have 280 − 4 = ${bonds(280, 4)} bonds.`,
        `Each bond releases one water, so ${bonds(280, 4)} waters were released.`,
        `The four chains are held together by weak bonds, not peptide bonds: this is the quaternary structure.`,
      ],
      v: table(['Quantity', 'Value'], [['Amino acids', '280'], ['Chains', '4'], ['Peptide bonds', String(bonds(280, 4))], ['Waters released', String(bonds(280, 4))]], `Worked table: ${bonds(280, 4)} peptide bonds`),
      n: 'For each separate chain, the number of peptide bonds is one less than the number of amino acids. So subtract the number of chains from the total. The bonds between chains are weaker links and are not counted.',
    }),
    sl('check', 'Quick check: protein structure', {
      b: 'Which bonds mainly hold the secondary structure of a protein?',
      n: 'Quick check. What kind of bond holds a helix in shape?',
      chk: 'chk-helix',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Carbohydrates: monosaccharides (glucose, ribose, deoxyribose), disaccharides (maltose, lactose, sucrose), polysaccharides (glycogen, starch, cellulose, inulin, chitin).',
        'Disaccharides form by a glycosidic bond with loss of water.',
        'Amino acid: amino group, carboxyl group, hydrogen and R group; zwitterion in water; acidic, basic, neutral, sulphur-containing; essential and non-essential.',
        'Proteins: primary (peptide bonds), secondary (hydrogen bonds), tertiary (several bonds), quaternary (subunits).',
      ],
      v: table(['Idea', 'Key point'], [['Sucrose', 'Glucose plus fructose'], ['Zwitterion', 'No net charge'], ['n amino acids in one chain', 'n − 1 peptide bonds']], 'Summary table of key points'),
      n: 'To recap: sugars join by glycosidic bonds with loss of water; an amino acid exists as a zwitterion in water; and a protein is built in four levels, each with its own kind of bond.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Classify the sugars: give the **monomers** of maltose, lactose and sucrose.',
        'Draw **glycine, alanine and serine** with the amino group, carboxyl group and R group labelled.',
        'Explain the **zwitterion** with both charges.',
        'Name the **bond** at each of the four levels of protein structure.',
      ],
      n: 'Exam tips. Give the building units of the three disaccharides. Draw the three amino acids with labels. Explain the zwitterion using both charges. And name the bond at each level of protein structure.',
    }),
  ],
});

const tg = (a, b, c) => triglyceride(a, b, c);
const [k1, k2] = [KT[1], KT[2]];
export const deck2 = deck({
  part: 2,
  title: 'Biomolecules — Part 2: Lipids, enzymes and secondary metabolites',
  goals: [
    'Explain the difference between saturated fats and unsaturated oils and state the functions of lipids',
    'Classify enzymes, describe cofactors, interpret graphs of enzyme activity and explain competitive inhibition',
    'Define secondary metabolites and give examples such as alkaloids, pigments and gums',
  ],
  slides: [
    sl('title', 'Lipids, enzymes and secondary metabolites', {
      b: 'Part 2: fats and oils, the enzymes that run the chemistry of life, and the extra chemicals made by plants.',
      v: flow('LR', [['l', 'Lipids'], ['e', 'Enzymes'], ['s', 'Secondary metabolites']], [['l', 'e'], ['e', 's']], 'Path from lipids to enzymes to secondary metabolites'),
      n: 'Fats store energy and build membranes. Enzymes speed up nearly every reaction in the cell. And plants make many extra chemicals, the secondary metabolites, that serve them in other ways.',
    }),
    sl('concept', 'Classes and functions of lipids', {
      b: 'Lipids are insoluble in water and soluble in organic solvents.',
      v: table(['Class', 'Examples', 'Functions'], [['Simple lipids', 'Fats, oils, waxes', 'Energy store, insulation, protection, waterproofing'], ['Compound lipids', 'Phospholipids', 'Main part of cell membranes'], ['Derived lipids', 'Fatty acids, glycerol, steroids such as cholesterol', 'Building units and hormones']], 'Table of the classes of lipids'),
      n: 'Simple lipids such as fats, oils and waxes store energy and insulate. Phospholipids form membranes, and steroids such as cholesterol act as hormones or help in membranes. All are insoluble in water.',
    }),
    sl('diagram', 'Fats and oils', {
      b: 'A **triglyceride** is one glycerol joined to three fatty acids by **ester bonds**. **Fats** are solid and **saturated**; **oils** are liquid and **unsaturated**.',
      v: V.triglyceride,
      n: 'Three fatty acids are joined to glycerol, and three molecules of water are lost. If the chains have no double bonds, they pack closely and the fat is solid. A double bond bends a chain, so an unsaturated oil stays liquid.',
    }),
    sl('example', 'Worked example 1: mass and energy of a fat', {
      b: `Glycerol weighs ${GLYCEROL}, palmitic acid ${FAM.palmitic} and oleic acid ${FAM.oleic}. Find the mass of tripalmitin and of triolein, and compare the energy in twenty grams of fat and of carbohydrate (nine and four kilocalories per gram).`,
      ul: [
        `Tripalmitin = ${GLYCEROL} + 3 × ${FAM.palmitic} − 3 × ${WATER} = ${tg('palmitic', 'palmitic', 'palmitic')}.`,
        `Triolein = ${GLYCEROL} + 3 × ${FAM.oleic} − 3 × ${WATER} = ${tg('oleic', 'oleic', 'oleic')}. Oleic acid has ${FA.oleic.dbl} double bond, so it has ${FA.stearic.H - FA.oleic.H} hydrogen atoms fewer than stearic acid.`,
        `Energy: 20 g of fat gives ${kcal('fat', 20)} kilocalories; 20 g of carbohydrate gives ${kcal('carbohydrate', 20)}, so fat gives ${kcal('fat', 20) / kcal('carbohydrate', 20)} times as much.`,
      ],
      v: table(['Quantity', 'Value'], [['Tripalmitin', String(tg('palmitic', 'palmitic', 'palmitic'))], ['Triolein', String(tg('oleic', 'oleic', 'oleic'))], ['Energy, 20 g fat', `${kcal('fat', 20)} kcal`], ['Energy, 20 g carbohydrate', `${kcal('carbohydrate', 20)} kcal`]], 'Worked table: tripalmitin, triolein and energy values'),
      n: 'Three water molecules are lost when glycerol joins three fatty acids. Fat gives more than twice the energy of the same mass of carbohydrate, which is why animals store energy as fat.',
    }),
    sl('check', 'Quick check: fats and oils', {
      b: 'Why is a plant oil liquid at room temperature?',
      n: 'Quick check. What feature of the fatty acids keeps an oil liquid?',
      chk: 'chk-fat',
    }),
    sl('concept', 'Enzymes: properties and naming', {
      b: 'Enzymes are biological catalysts, almost all of them proteins.',
      v: table(['Property', 'Meaning'], [['Catalytic', 'Lower the activation energy; not used up'], ['Specific', 'Each acts on one substrate or a closely related group, through its active site'], ['Sensitive', 'Work best at an optimum temperature and pH; denatured by extremes'], ['Reversible', 'Can speed up a reaction in either direction'], ['Naming', 'Name of substrate or reaction plus -ase: lactase, lipase, dehydrogenase']], 'Table of the properties and naming of enzymes'),
      n: 'An enzyme lowers the energy needed to start a reaction and is not used up. It is specific because of the shape of its active site. Most enzyme names end in a-s-e, built from the substrate or the type of reaction.',
    }),
    sl('concept', 'Six classes of enzymes', {
      b: 'Enzymes are classified by the type of reaction they catalyse.',
      v: table(['Class', 'Reaction', 'Example'], [['Oxidoreductases', 'Transfer of electrons or hydrogen: oxidation and reduction', 'Lactate dehydrogenase'], ['Transferases', 'Transfer of a group, such as phosphate', 'Hexokinase'], ['Hydrolases', 'Breaking bonds by adding water', 'Lipase, lactase'], ['Lyases', 'Removing a group without water, leaving a double bond', 'Decarboxylase'], ['Isomerases', 'Rearranging a molecule into its isomer', 'Glucose phosphate isomerase'], ['Ligases', 'Joining two molecules, using ATP', 'DNA ligase']], 'Table of the six classes of enzymes'),
      n: 'Oxidoreductases move electrons, transferases move groups, hydrolases use water to split bonds, lyases split without water, isomerases rearrange, and ligases join molecules using energy from ATP.',
    }),
    sl('concept', 'Cofactors', {
      b: 'Many enzymes need a non-protein part. The protein alone is the **apoenzyme**; with its cofactor it is the **holoenzyme**.',
      v: table(['Cofactor', 'Nature', 'Example'], [['Prosthetic group', 'Organic, tightly bound to the enzyme', 'Haem in catalase'], ['Coenzyme', 'Organic, loosely bound; often made from a vitamin', 'NAD, made from niacin'], ['Metal ion', 'Activates the enzyme', 'Zinc, magnesium']], 'Table of the three kinds of cofactor'),
      n: 'A prosthetic group stays attached to the enzyme. A coenzyme is a loosely attached organic helper, often built from a vitamin. Metal ions such as zinc and magnesium also activate many enzymes.',
    }),
    sl('diagram', 'Effect of temperature, pH and substrate', {
      b: 'Each enzyme has an **optimum temperature** and **optimum pH**; rate rises with substrate until it reaches a maximum.',
      v: V.enzymes,
      n: 'Activity rises to an optimum and then falls sharply when the enzyme is denatured. Pepsin works best in acid and trypsin in alkali. With increasing substrate, the rate rises and levels off. A competitive inhibitor lowers the rate but the same maximum is approached.',
    }),
    sl('example', 'Worked example 2: reading enzyme rates', {
      b: `For an enzyme, the maximum rate is ${KIN.vmax} units and the Michaelis constant is ${KIN.km}. Find the rate at substrate concentrations of ${k1.s}, ${k2.s} and 30, and say what the constant means.`,
      ul: [
        `Rate = maximum × S ÷ (constant + S). At ${k1.s}: ${KIN.vmax} × ${k1.s} ÷ ${KIN.km + k1.s} = ${k1.free}.`,
        `At ${k2.s}: ${KIN.vmax} × ${k2.s} ÷ ${KIN.km + k2.s} = ${k2.free}, which is half of the maximum, because the concentration equals the constant.`,
        `At 30: ${KIN.vmax} × 30 ÷ ${KIN.km + 30} = ${rate(30)}.`,
        'The constant is the substrate concentration at which the rate is half of the maximum.',
      ],
      v: table(['Substrate', 'Rate'], [[String(k1.s), String(k1.free)], [String(k2.s), String(k2.free)], ['30', String(rate(30))]], `Worked table: rates ${k1.free}, ${k2.free} and ${rate(30)}`),
      n: 'At the point where the rate is half the maximum, the substrate concentration equals the constant. Above it the curve flattens, since nearly all enzyme molecules are already busy.',
    }),
    sl('diagram', 'Competitive inhibition', {
      b: 'A **competitive inhibitor** resembles the substrate and **blocks the active site**; more substrate **overcomes** it. Example: **malonate** and **succinic dehydrogenase**.',
      v: V.inhibition,
      n: 'The inhibitor has a shape like the substrate, so it fits the active site and blocks it. Because it can be displaced, a high concentration of substrate wins the competition. Malonate inhibits succinic dehydrogenase in this way, since it resembles succinate.',
    }),
    sl('example', 'Worked example 3: effect of an inhibitor', {
      b: `With a competitive inhibitor, the substrate concentration needed for half the maximum rate doubles from ${KIN.km} to ${KIN.kmInh}. Compare the rates at ${KT[1].s} and ${KT[5].s} with and without the inhibitor.`,
      ul: [
        `At ${KT[1].s}: without = ${KT[1].free}, with = ${KT[1].inh}; the inhibitor lowers the rate by a factor of ${ratio(10)}.`,
        `At ${KT[5].s}: without = ${KT[5].free}, with = ${KT[5].inh}; the factor is only ${ratio(200)}.`,
        'At very high substrate the two rates almost meet at the same maximum, so a competitive inhibitor does not change the maximum rate.',
      ],
      v: table(['Substrate', 'Without', 'With inhibitor'], KT.map((k) => [String(k.s), String(k.free), String(k.inh)]), 'Worked table of rates with and without a competitive inhibitor'),
      n: 'At low substrate the inhibitor is strongly felt, but at high substrate the substrate crowds it out. The two rates draw close together, so the maximum rate is unchanged.',
    }),
    sl('check', 'Quick check: enzyme classes', {
      b: 'To which class does an enzyme that breaks a bond by adding water belong?',
      n: 'Quick check. Which class of enzymes uses water to break bonds?',
      chk: 'chk-class',
    }),
    sl('check', 'Quick check: inhibition', {
      b: 'What is the effect of a competitive inhibitor at a very high substrate concentration?',
      n: 'Quick check. What happens to the rate when substrate is very high and a competitive inhibitor is present?',
      chk: 'chk-inhib',
    }),
    sl('concept', 'Secondary metabolites', {
      b: '**Secondary metabolites** are compounds that are not directly needed for growth, development or reproduction, but help the plant in other ways.',
      v: table(['Group', 'Examples', 'Use or role'], [['Alkaloids', 'Morphine, quinine, nicotine', 'Defence in the plant; medicines'], ['Pigments', 'Carotenoids, anthocyanins', 'Colour that attracts pollinators and fruit eaters'], ['Gums and resins', 'Gum arabic', 'Seal wounds; food and industry'], ['Others', 'Essential oils, rubber, toxins', 'Scent, defence, industry']], 'Table of secondary metabolites'),
      n: 'Secondary metabolites are not part of the basic chemistry of the cell. Alkaloids defend plants and are used as drugs. Pigments attract animals, and gums seal wounds. Many are valuable to humans.',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Lipids: fats (saturated, solid) and oils (unsaturated, liquid); triglyceride = glycerol + three fatty acids; functions: energy, insulation, membranes, hormones.',
        'Enzymes: catalytic, specific, sensitive; six classes; cofactors: prosthetic group, coenzyme, metal ion.',
        'Optimum temperature and pH; rate rises with substrate to a maximum; competitive inhibitor raises the constant, not the maximum.',
        'Secondary metabolites: alkaloids, pigments, gums and others.',
      ],
      v: table(['Idea', 'Key point'], [['Competitive inhibitor', 'Fits the active site; overcome by more substrate'], ['Coenzyme', 'Loosely bound organic cofactor'], ['Oil', 'Unsaturated and liquid']], 'Summary table of key points'),
      n: 'To recap: fats and oils differ by the saturation of their fatty acids; enzymes are classified by reaction and need cofactors; inhibitors compete for the active site; and secondary metabolites serve plants in other ways.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Explain **saturated fat** and **unsaturated oil** by the **double bonds** in the fatty acids.',
        'Name the **six classes** of enzymes with the reaction of each.',
        'Draw and label the **rate against temperature, pH and substrate** curves.',
        'Explain **competitive inhibition** with malonate and succinic dehydrogenase.',
      ],
      n: 'Exam tips. Explain fats and oils through double bonds. Name the six classes of enzymes. Draw the three enzyme graphs with labels. And explain competitive inhibition with malonate.',
    }),
  ],
});
