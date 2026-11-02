// ch20 Digestion and Absorption — two decks: Part 1 (t01: alimentary canal and glands), Part 2 (t01: digestion and absorption; t02: disorders).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { CANAL, TEETH, WALL, DUCTS, VILLUS } from './svgs.mjs';
import { HALF_JAW, PER_HALF, TOTAL_TEETH, MOLARS, MOLAR_PCT, LIVER, SURFACE, STARCH, MOUTH_STARCH_PCT, PH, FOLD_STOMACH_SALIVA, MEAL, PHYS, GROSS, MEAL_PHYS, MEAL_GROSS, MEAL_KJ, KJ_PER_KCAL, FAT_EQUIV, round } from './calc.mjs';

export const V = {
  canal: svgV(CANAL, 'Front view of the alimentary canal from mouth to anus with the salivary glands, liver, gall bladder and pancreas'),
  teeth: svgV(TEETH, `One jaw seen from above with ${PER_HALF * 2} teeth coloured by type and the dental formula ${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M} over ${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M}`),
  wall: svgV(WALL, 'Cross-section of the gut wall showing serosa, two muscle layers, sub-mucosa with vessels, and mucosa with villi around the lumen'),
  ducts: svgV(DUCTS, 'Liver, gall bladder and pancreas with their ducts joining as the hepato-pancreatic duct at the sphincter of Oddi in the duodenum'),
  villus: svgV(VILLUS, 'A single villus with brush border, blood capillaries and a central lacteal, and an inset epithelial cell with microvilli'),
};

export const deck1 = deck({
  part: 1,
  title: 'Digestion and Absorption — Part 1: The alimentary canal and digestive glands',
  goals: [
    'Trace the human alimentary canal from mouth to anus',
    'Describe human teeth and work with the dental formula',
    'Describe the four layers of the gut wall, villi and microvilli',
    'Describe the salivary glands, liver and pancreas and their ducts',
  ],
  slides: [
    sl('title', 'Digestion and Absorption', {
      b: 'Part 1 — the organs of the digestive system. This chapter is CBSE reading material for formative (school) assessment only.',
      v: flow('LR', [['i', 'Ingestion'], ['d', 'Digestion'], ['a', 'Absorption'], ['s', 'Assimilation'], ['e', 'Egestion']], [['i', 'd'], ['d', 'a'], ['a', 's'], ['s', 'e']], 'Flow from ingestion through digestion, absorption and assimilation to egestion'),
      n: 'Our food contains carbohydrates, proteins and fats, which are too large to be used directly. Digestion breaks them into simple, absorbable substances, by mechanical and biochemical methods. The digestive system has two parts: the alimentary canal and the associated glands.',
    }),
    sl('concept', 'What digestion must achieve', {
      b: 'Biomacromolecules in food must be converted into small, soluble units before they can be absorbed.',
      v: table(['Food component', 'Absorbable end products'], [['Carbohydrates (starch, sugars)', 'Monosaccharides such as glucose, fructose, galactose'], ['Proteins', 'Amino acids'], ['Fats', 'Fatty acids and glycerol'], ['Nucleic acids', 'Sugars and bases']], 'Table of food components and their absorbable end products'),
      n: 'Each large molecule has its own end products. Starch ends as glucose, proteins as amino acids, fats as fatty acids and glycerol, and nucleic acids as sugars and bases. Enzymes from several glands do this work along the canal.',
    }),
    sl('diagram', 'The human alimentary canal', {
      b: 'The canal runs from the **mouth** to the **anus**: buccal cavity, pharynx, oesophagus, stomach, small intestine and large intestine. The **salivary glands, liver and pancreas** pour secretions into it.',
      v: V.canal,
      n: 'Follow the canal from the mouth. Food passes through the pharynx and the long oesophagus into the J shaped stomach, then the C shaped duodenum, the coiled jejunum and ileum, and finally the caecum, colon and rectum. The liver, gall bladder and pancreas lie close to the duodenum.',
    }),
    sl('concept', 'The mouth: teeth and tongue', {
      b: 'The mouth leads into the **buccal (oral) cavity**, which has teeth and a muscular **tongue**.',
      v: table(['Feature', 'Meaning'], [['Thecodont', 'Each tooth is embedded in a socket of the jaw bone'], ['Diphyodont', 'Two sets of teeth: milk (deciduous) teeth replaced by permanent teeth'], ['Heterodont', 'Teeth of four types: incisors, canines, premolars, molars'], ['Enamel', 'Hard chewing surface that helps in mastication'], ['Tongue', 'Freely movable muscular organ attached to the floor by the frenulum; papillae, some with taste buds']], 'Table of features of human teeth and tongue'),
      n: 'Human teeth are set in sockets, come in two sets during life, and are of four kinds. The hard enamel surface grinds food. The tongue is attached to the floor of the mouth by a fold called the frenulum, and some of its small projections, the papillae, carry taste buds.',
    }),
    sl('diagram', 'The dental formula', {
      b: `The arrangement of teeth in each half of the upper and lower jaw, in the order I, C, PM, M, is the **dental formula**: **${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M}/${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M}** for an adult human.`,
      v: V.teeth,
      n: 'Count from the front of one half of a jaw: two incisors, one canine, two premolars and three molars. The upper and lower jaws are written as a fraction, upper over lower. Every half jaw has eight teeth.',
    }),
    sl('example', 'Worked example 1: reading the dental formula', {
      b: `Use the formula ${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M}/${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M} to find (i) the total number of teeth and (ii) the percentage of them that are molars.`,
      ul: [
        r`(i) One half jaw: $${HALF_JAW.I} + ${HALF_JAW.C} + ${HALF_JAW.PM} + ${HALF_JAW.M} = ${PER_HALF}$; four half jaws: $${PER_HALF} \times 4 = ${TOTAL_TEETH}$.`,
        r`(ii) Molars: $${HALF_JAW.M} \times 4 = ${MOLARS}$; $\dfrac{${MOLARS}}{${TOTAL_TEETH}} \times 100 = ${MOLAR_PCT}$ percent.`,
        'The formula always describes **one half** of each jaw, so multiply by four.',
      ],
      v: table(['Type', 'Per half jaw', 'Whole mouth'], [['Incisors', String(HALF_JAW.I), String(HALF_JAW.I * 4)], ['Canines', String(HALF_JAW.C), String(HALF_JAW.C * 4)], ['Premolars', String(HALF_JAW.PM), String(HALF_JAW.PM * 4)], ['Molars', String(HALF_JAW.M), String(MOLARS)], ['Total', String(PER_HALF), String(TOTAL_TEETH)]], `Worked table: ${TOTAL_TEETH} teeth, ${MOLARS} molars`),
      n: 'Two plus one plus two plus three is eight teeth in each half jaw. There are four half jaws, so thirty-two teeth in all. Three molars in each half give twelve molars, which is thirty-seven and a half percent of the set.',
    }),
    sl('check', 'Quick check: teeth', {
      b: 'Each human tooth is fixed in a socket of the jaw bone. What is this called?',
      n: 'Quick check. Which word means set in a socket?',
      chk: 'thecodont-mcq',
    }),
    sl('concept', 'Pharynx, oesophagus and stomach', {
      b: 'The pharynx is a **common passage for food and air**; the **epiglottis** stops food entering the glottis during swallowing.',
      v: table(['Part', 'Key features'], [['Oesophagus', 'Thin, long tube through the neck, thorax and diaphragm; opens into the stomach through the gastro-oesophageal sphincter'], ['Stomach', 'J-shaped bag in the upper left abdomen: cardiac portion (oesophagus opens here), fundic region, pyloric portion'], ['Pyloric sphincter', 'Guards the opening of the stomach into the duodenum']], 'Table of the oesophagus, stomach regions and pyloric sphincter'),
      n: 'Both the oesophagus and the windpipe open into the pharynx, so swallowing must be coordinated. The cartilage flap called the epiglottis covers the glottis while food passes. The stomach then receives food at its cardiac end and releases it at the pyloric end.',
    }),
    sl('concept', 'Small and large intestines', {
      b: 'The **small intestine** has three regions; the **large intestine** has three parts.',
      v: table(['Region', 'Features'], [['Duodenum', 'C-shaped first part'], ['Jejunum', 'Long, coiled middle portion'], ['Ileum', 'Highly coiled; opens into the large intestine'], ['Caecum', 'Small blind sac with symbiotic micro-organisms; the vestigial vermiform appendix arises from it'], ['Colon', 'Ascending, transverse, descending and sigmoid parts'], ['Rectum', 'Opens out through the anus']], 'Table of the regions of the small and large intestines'),
      n: 'Remember the small intestine in order: duodenum, jejunum, ileum. The large intestine begins with the caecum, which carries the narrow vermiform appendix, continues as the four parts of the colon, and ends in the rectum.',
    }),
    sl('diagram', 'The wall of the alimentary canal', {
      b: 'From the oesophagus to the rectum the wall has four layers: **serosa, muscularis, sub-mucosa and mucosa**.',
      v: V.wall,
      n: 'Outside is the serosa, a thin mesothelium. Next come the muscle layers, usually inner circular and outer longitudinal. The sub-mucosa carries nerves, blood and lymph vessels. The mucosa lines the lumen, forming irregular folds called rugae in the stomach and finger-like villi in the small intestine.',
    }),
    sl('diagram', 'Villi and microvilli', {
      b: 'Cells lining the villi bear **microvilli**, giving a **brush border**. Each villus has a network of **capillaries** and a large lymph vessel, the **lacteal**. Goblet cells secrete mucus; crypts lie between the villi.',
      v: V.villus,
      n: 'A villus is a tiny finger of the mucosa. Its surface cells are covered in microvilli, which make the surface look like a brush. Inside, blood capillaries collect sugars and amino acids, while the central lacteal collects fats. Together, villi and microvilli increase the surface area enormously.',
    }),
    sl('check', 'Quick check: microvilli', {
      b: 'What do the microvilli on intestinal cells mainly do?',
      n: 'Quick check. Think of the brush border.',
      chk: 'villi-mcq',
    }),
    sl('concept', 'Digestive glands', {
      b: 'Three kinds of glands pour secretions into the canal.',
      v: table(['Gland', 'Position and structure', 'Secretion'], [['Salivary glands (three pairs)', 'Parotids (cheek), sub-maxillary or sub-mandibular (lower jaw), sub-linguals (below the tongue)', 'Saliva'], ['Liver', `Largest gland, about ${LIVER.min} to ${LIVER.max} kg; two lobes below the diaphragm; hepatic lobules with Glisson’s capsule`, 'Bile, stored and concentrated in the gall bladder'], ['Pancreas', 'Between the limbs of the C-shaped duodenum; exocrine and endocrine', 'Alkaline pancreatic juice; insulin and glucagon']], 'Table of salivary glands, liver and pancreas with positions and secretions'),
      n: 'Saliva comes from three pairs of salivary glands. The liver, the largest gland of the body, makes bile in its hepatic lobules. The pancreas is both exocrine, making pancreatic juice, and endocrine, making the hormones insulin and glucagon.',
    }),
    sl('diagram', 'How bile and pancreatic juice reach the duodenum', {
      b: 'The **cystic duct** from the gall bladder and the **hepatic duct** form the **common bile duct**. It joins the **pancreatic duct** as the **common hepato-pancreatic duct**, guarded by the **sphincter of Oddi**.',
      v: V.ducts,
      n: 'Bile leaves the liver along the hepatic duct and is stored in the gall bladder. When needed it flows down the cystic duct and the common bile duct. This joins the duct from the pancreas, and the two secretions enter the duodenum together through one opening controlled by the sphincter of Oddi.',
    }),
    sl('example', 'Worked example 2: size and surface', {
      b: `(i) An adult weighing ${LIVER.body} kg has a liver of ${LIVER.max} kg. What percentage of body mass is the liver? (ii) In a model, folds multiply the intestinal surface by ${SURFACE.folds}, villi by ${SURFACE.villi} and microvilli by ${SURFACE.microvilli}. What is the total factor? (Illustrative values.)`,
      ul: [
        r`(i) $\dfrac{${LIVER.max}}{${LIVER.body}} \times 100 = ${LIVER.pct}$ percent.`,
        r`(ii) $${SURFACE.folds} \times ${SURFACE.villi} \times ${SURFACE.microvilli} = ${SURFACE.total}$ times.`,
        'Real estimates of the surface gain vary between sources; the point is that the factors **multiply**.',
      ],
      v: table(['Quantity', 'Value'], [['Liver share of body mass', `${LIVER.pct} percent`], ['Surface factor', `${SURFACE.total} times`]], `Worked table: liver ${LIVER.pct} percent of body mass; surface ${SURFACE.total} times larger`),
      n: 'One and a half kilograms out of sixty is two and a half percent, a large share for one gland. For the surface, the three factors multiply: three times ten times twenty is six hundred. That is why the small intestine, though narrow, absorbs so well.',
    }),
    sl('check', 'Quick check: bile', {
      b: 'Bile has no enzymes. How does it still help fat digestion?',
      n: 'Quick check. Think of breaking big fat drops into tiny ones.',
      chk: 'bile-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Canal: buccal cavity → pharynx → oesophagus → stomach (cardiac, fundic, pyloric) → duodenum, jejunum, ileum → caecum, colon, rectum → anus.',
        `Teeth: thecodont, diphyodont, heterodont; ${TOTAL_TEETH} permanent teeth; formula ${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M}/${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M}.`,
        'Wall: serosa, muscularis, sub-mucosa, mucosa (rugae, villi, microvilli, goblet cells, crypts).',
        'Glands: three pairs of salivary glands; liver (bile, gall bladder); pancreas (pancreatic juice, insulin, glucagon).',
        'Bile and pancreatic ducts open together through the hepato-pancreatic duct and sphincter of Oddi.',
      ],
      v: table(['Structure', 'Key point'], [['Teeth', `${TOTAL_TEETH}, formula ${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M}/${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M}`], ['Villi', 'Capillaries and lacteal'], ['Liver', 'Bile'], ['Pancreas', 'Exocrine and endocrine']], 'Summary table of key structures in Part 1'),
      n: 'To recap: the canal runs from mouth to anus through regions with distinct jobs. Human teeth are thecodont, diphyodont and heterodont. The gut wall has four layers, and villi with microvilli give a huge surface. The salivary glands, liver and pancreas supply the digestive juices.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write the **dental formula** as upper over lower jaw for **one half** of each jaw.',
        'Name the **four wall layers** in order from outside.',
        'Draw and label the **duct system** up to the **sphincter of Oddi**.',
        'This chapter is assessed in school (formative) tests, not in a board paper.',
      ],
      n: 'Exam tips. The dental formula describes one half of each jaw. Learn the four layers of the gut wall from outside in. Practise labelling the ducts up to the sphincter of Oddi. And remember this chapter is for school tests, not a board paper.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Digestion and Absorption — Part 2: Digestion, absorption and disorders',
  goals: [
    'Explain digestion in the mouth, stomach and small intestine with enzymes and products',
    'Explain the mechanisms of absorption, including fats',
    'State where substances are absorbed, and describe assimilation and egestion',
    'Describe common digestive and nutritional disorders',
  ],
  slides: [
    sl('title', 'Digestion, absorption and disorders', {
      b: 'Part 2 — how food is broken down along the canal, how the products are absorbed, and what can go wrong.',
      v: flow('LR', [['m', 'Mouth: starch begins'], ['s', 'Stomach: proteins begin'], ['i', 'Small intestine: all completed and absorbed'], ['l', 'Large intestine: water and minerals']], [['m', 's'], ['s', 'i'], ['i', 'l']], 'Flow of digestion along the canal from mouth to large intestine'),
      n: 'Digestion is a relay. Starch digestion starts in the mouth, protein digestion in the stomach, and the small intestine finishes everything and absorbs the products. The large intestine mainly absorbs water and minerals. The activities of the gut are controlled by nerves and local hormones.',
    }),
    sl('concept', 'Digestion in the mouth', {
      b: 'Teeth and tongue **masticate** food and mix it with saliva; mucus helps form a **bolus**, which is swallowed (**deglutition**) and carried down the oesophagus by **peristalsis**.',
      v: table(['Component of saliva', 'Role'], [['Electrolytes (sodium, potassium, chloride, bicarbonate ions)', 'Medium for enzymes'], ['Salivary amylase', `Hydrolyses about ${MOUTH_STARCH_PCT} percent of starch to maltose at optimum pH ${PH.saliva}`], ['Lysozyme', 'Antibacterial agent that prevents infections'], ['Mucus', 'Lubricates and sticks food particles into a bolus']], 'Table of the components of saliva and their roles'),
      n: 'Chemical digestion begins in the mouth. Salivary amylase splits starch into the sugar maltose, which is why bread chewed for a while tastes sweet. Lysozyme protects against bacteria. Successive waves of muscle contraction, called peristalsis, then push the bolus down to the stomach.',
    }),
    sl('example', 'Worked example 1: starch and acidity', {
      b: `(i) A meal has ${STARCH.eaten} g of starch, and about ${MOUTH_STARCH_PCT} percent is hydrolysed in the mouth. How much is left for the intestine? (ii) Saliva works at pH ${PH.saliva} and gastric juice at pH ${PH.stomach}. How many times more hydrogen ions does gastric juice have?`,
      ul: [
        r`(i) $${STARCH.eaten} \times \dfrac{${MOUTH_STARCH_PCT}}{100} = ${STARCH.mouth}$ g hydrolysed; $${STARCH.eaten} - ${STARCH.mouth} = ${STARCH.left}$ g left.`,
        r`(ii) $${PH.saliva} - ${PH.stomach} = 5$ pH units, so $10^{5}$, that is ${FOLD_STOMACH_SALIVA.toLocaleString('en-IN')} times.`,
        'Amylase stops working once the bolus is mixed with acid in the stomach.',
      ],
      v: table(['Quantity', 'Value'], [['Starch hydrolysed in the mouth', `${STARCH.mouth} g`], ['Starch left for the intestine', `${STARCH.left} g`], ['Acidity, stomach compared with saliva', `${FOLD_STOMACH_SALIVA.toLocaleString('en-IN')} times`]], `Worked table: ${STARCH.mouth} grams hydrolysed, ${STARCH.left} grams left; stomach a hundred thousand times more acidic`),
      n: 'Thirty percent of fifty grams is fifteen grams, so thirty-five grams of starch still reach the intestine. A difference of five pH units means ten multiplied by itself five times, one lakh times more hydrogen ions. No wonder salivary amylase cannot keep working in the stomach.',
    }),
    sl('check', 'Quick check: saliva', {
      b: 'Which component of saliva is antibacterial?',
      n: 'Quick check. It is not an enzyme for food.',
      chk: 'lysozyme-mcq',
    }),
    sl('concept', 'Digestion in the stomach', {
      b: 'Food is stored for **4 to 5 hours**, churned with acidic gastric juice and called **chyme**.',
      v: table(['Gastric gland cell', 'Secretion', 'Role'], [['Mucus neck cells', 'Mucus', 'With bicarbonates, lubricates and protects the lining from acid'], ['Peptic (chief) cells', 'Pepsinogen', 'Converted by HCl to pepsin: proteins to proteoses and peptones'], ['Parietal (oxyntic) cells', 'HCl and intrinsic factor', `HCl gives pH ${PH.stomach} for pepsin; intrinsic factor needed to absorb vitamin B12`]], 'Table of gastric gland cells, their secretions and roles'),
      n: 'Pepsinogen is harmless until hydrochloric acid turns it into pepsin, which begins protein digestion. Mucus and bicarbonates shield the stomach wall from the acid. In infants, rennin helps digest milk proteins, and small amounts of lipase are also secreted.',
    }),
    sl('concept', 'Digestion in the small intestine', {
      b: 'Three secretions act here: **bile**, **pancreatic juice** and **intestinal juice (succus entericus)**. The medium is kept alkaline, about **pH 7.8**.',
      v: table(['Secretion', 'Contents and action'], [['Bile (no enzymes)', 'Bile pigments (bilirubin, biliverdin), bile salts, cholesterol, phospholipids; emulsifies fats into micelles; activates lipases'], ['Pancreatic juice', 'Trypsinogen (activated by enterokinase to trypsin, which activates the rest), chymotrypsinogen, procarboxypeptidases, amylases, lipases, nucleases'], ['Succus entericus', 'Brush border and goblet cell secretions: maltase and other disaccharidases, dipeptidases, lipases, nucleosidases'], ['Products', 'Dipeptides to amino acids; maltose, lactose, sucrose to monosaccharides; fats to fatty acids and glycerol; nucleotides to sugars and bases']], 'Table of bile, pancreatic juice and succus entericus with their actions'),
      n: 'Most breakdown happens in the duodenum. Pancreatic enzymes turn proteins into dipeptides, starch into disaccharides and fats into glycerides, and enzymes of the brush border finish the job. Mucus and bicarbonate from the pancreas protect the lining and keep the medium alkaline.',
    }),
    sl('concept', 'How nutrients are absorbed', {
      b: 'Absorption moves end products through the intestinal mucosa into **blood or lymph**.',
      v: table(['Mechanism', 'What it moves'], [['Simple diffusion (down a concentration gradient)', 'Small amounts of glucose, amino acids, chloride ions'], ['Facilitated transport (with carrier ions such as sodium ions)', 'Fructose, some amino acids'], ['Osmosis (osmotic gradient)', 'Water'], ['Active transport (against the gradient, uses energy)', 'Amino acids, glucose, sodium ions']], 'Table of absorption mechanisms and the substances they move'),
      n: 'Some substances simply diffuse in when they are more concentrated in the gut. Others need carriers, or energy to move against the gradient. Water follows by osmosis. Fats need a special route, which we look at next.',
    }),
    sl('diagram', 'Absorption of fats', {
      b: 'Fatty acids and glycerol are **insoluble**, so they cannot enter the blood directly.',
      v: flow('LR', [['f', 'Fatty acids and glycerol'], ['m', 'Micelles'], ['c', 'Chylomicrons in mucosa cells'], ['l', 'Lacteals (lymph)'], ['b', 'Blood stream']], [['f', 'm'], ['m', 'c'], ['c', 'l'], ['l', 'b']], 'Flow of fat absorption from micelles to chylomicrons, lacteals and blood'),
      n: 'First the fatty acids and glycerol are packed into tiny droplets called micelles, which move into the mucosa. There they are rebuilt into protein coated fat globules called chylomicrons. These pass into the lacteal of each villus, and the lymph vessels finally empty them into the blood.',
    }),
    sl('check', 'Quick check: fat absorption', {
      b: 'Choose the correct sequence for absorbing digested fat.',
      n: 'Quick check. Which comes first, micelles or chylomicrons?',
      chk: 'chylomicron-mcq',
    }),
    sl('concept', 'Where absorption happens; assimilation and egestion', {
      b: 'The **small intestine** is the principal organ of absorption.',
      v: table(['Part', 'What is absorbed'], [['Mouth', 'Certain drugs, through the mucosa of the mouth and under the tongue'], ['Stomach', 'Water, simple sugars, alcohol'], ['Small intestine', 'Glucose, fructose, fatty acids, glycerol, amino acids'], ['Large intestine', 'Water, some minerals and drugs; no significant digestion; mucus binds and lubricates waste']], 'Table of absorption in different parts of the canal'),
      n: 'Absorbed substances reach the tissues, which use them: this is assimilation. Undigested waste enters the caecum through the ileo-caecal valve, which stops back flow, and is stored in the rectum. Its removal through the anus, called defaecation, is voluntary and is carried out by a mass peristaltic movement.',
    }),
    sl('example', 'Worked example 2: energy from a snack', {
      b: `A snack has ${MEAL.carb} g of carbohydrate, ${MEAL.protein} g of protein and ${MEAL.fat} g of fat. Find its energy using (i) physiological fuel values ${PHYS.carb}, ${PHYS.protein}, ${PHYS.fat} kcal per g and (ii) gross calorific values ${GROSS.carb}, ${GROSS.protein}, ${GROSS.fat} kcal per g.`,
      ul: [
        r`(i) $${MEAL.carb} \times ${PHYS.carb} + ${MEAL.protein} \times ${PHYS.protein} + ${MEAL.fat} \times ${PHYS.fat} = ${MEAL_PHYS}$ kcal, about ${MEAL_KJ} kJ.`,
        r`(ii) $${MEAL.carb} \times ${GROSS.carb} + ${MEAL.protein} \times ${GROSS.protein} + ${MEAL.fat} \times ${GROSS.fat} = ${MEAL_GROSS}$ kcal.`,
        `Gram for gram, fat gives more than twice the energy: ${MEAL.carb} g of carbohydrate equals only about ${FAT_EQUIV} g of fat.`,
      ],
      v: table(['Value used', 'Energy (kcal)'], [['Physiological', String(MEAL_PHYS)], ['Gross (calorimeter)', String(MEAL_GROSS)], ['Difference', String(round(MEAL_GROSS - MEAL_PHYS, 2))]], `Worked table: ${MEAL_PHYS} kilocalories physiological, ${MEAL_GROSS} gross`),
      n: 'Using the body values, two hundred and forty plus sixty plus ninety gives three hundred and ninety kilocalories. The calorimeter gives more, about four hundred and twenty-five, because the body does not digest, absorb and oxidise everything completely. One kilocalorie is about four point two kilojoules.',
    }),
    sl('check', 'Quick check: absorption', {
      b: 'Judge the assertion and the reason about the small intestine.',
      n: 'Quick check. Where is digestion completed?',
      chk: 'villi-ar',
    }),
    sl('concept', 'Disorders of the digestive system', {
      b: 'Inflammation of the intestinal tract, often from **bacterial or viral infection**, is the most common ailment; parasites such as tapeworm, roundworm, threadworm, hookworm and pinworm also cause infections.',
      v: table(['Disorder', 'Description'], [['Jaundice', 'Liver affected; skin and eyes turn yellow from deposited bile pigments'], ['Vomiting', 'Ejection of stomach contents through the mouth; reflex controlled by the vomit centre in the medulla; usually preceded by nausea'], ['Diarrhoea', 'Abnormal frequency of bowel movement and more liquid faeces; reduces absorption of food'], ['Constipation', 'Faeces retained in the rectum as bowel movements occur irregularly'], ['Indigestion', 'Food not properly digested, feeling of fullness; from inadequate enzymes, anxiety, food poisoning, over-eating, spicy food']], 'Table of digestive disorders with descriptions'),
      n: 'Most digestive disorders are short-lived but can be serious in small children. Diarrhoea and vomiting quickly drain water and salts, so rehydration matters. Jaundice signals that the liver is not handling bile pigments properly.',
    }),
    sl('concept', 'Protein–energy malnutrition', {
      b: 'Diets lacking proteins and total food calories cause **protein–energy malnutrition (PEM)** in infants and children.',
      v: table(['Feature', 'Kwashiorkor', 'Marasmus'], [['Cause', 'Protein deficiency, enough calories (e.g. early weaning to a starchy diet)', 'Simultaneous deficiency of proteins and calories (mother’s milk replaced early by poor food)'], ['Age', 'Young children', 'Infants under a year'], ['Signs', 'Muscle wasting, thin limbs, poor growth and brain development, oedema and swelling', 'Extreme emaciation, thin limbs, dry thin wrinkled skin, impaired growth and brain development']], 'Table comparing kwashiorkor and marasmus'),
      n: 'The two forms of malnutrition look different. A child with kwashiorkor gets enough energy but too little protein, so the body swells with fluid. An infant with marasmus lacks both protein and energy, so the body wastes away with no swelling.',
    }),
    sl('check', 'Quick check: malnutrition', {
      b: 'Identify the condition of the very thin infant with dry, wrinkled skin.',
      n: 'Quick check. Is there swelling, and are calories short too?',
      chk: 'marasmus-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        `Mouth: salivary amylase (pH ${PH.saliva}) digests about ${MOUTH_STARCH_PCT} percent of starch to maltose; lysozyme; bolus, deglutition, peristalsis.`,
        `Stomach: HCl (pH ${PH.stomach}) activates pepsinogen to pepsin; rennin in infants; mucus protects; chyme after 4 to 5 hours.`,
        `Small intestine (pH ${PH.intestine}): bile emulsifies; enterokinase activates trypsin; pancreatic and brush-border enzymes finish digestion.`,
        'Absorption: diffusion, facilitated and active transport, osmosis; fats as micelles → chylomicrons → lacteals.',
        'Disorders: jaundice, vomiting, diarrhoea, constipation, indigestion; PEM as kwashiorkor and marasmus.',
      ],
      v: table(['Food', 'Main enzymes', 'End product'], [['Starch', 'Salivary and pancreatic amylase, maltase', 'Glucose'], ['Proteins', 'Pepsin, trypsin, chymotrypsin, carboxypeptidase, dipeptidases', 'Amino acids'], ['Fats', 'Lipases (with bile)', 'Fatty acids and glycerol']], 'Summary table of enzymes and end products'),
      n: 'To recap: starch digestion starts in the mouth, protein digestion in the stomach, and the small intestine completes everything and absorbs it, fats taking the lymph route. Know the common digestive disorders and the two forms of protein energy malnutrition.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'State the **pH** at which each juice works: saliva 6.8, stomach 1.8, intestine 7.8.',
        'Say that **bile has no enzymes**; it emulsifies fats and activates lipases.',
        'Explain **enterokinase → trypsin → other enzymes** as a chain.',
        'Compare **kwashiorkor** and **marasmus** by cause and signs.',
      ],
      n: 'Exam tips. Learn the working pH of saliva, gastric juice and intestinal juice. Remember bile has no enzymes. Explain how enterokinase starts the chain of enzyme activation. And compare kwashiorkor with marasmus by cause and by signs.',
    }),
  ],
});
