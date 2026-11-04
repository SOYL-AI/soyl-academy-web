// ICSE 9 Biology ch10 Teeth and the Digestive System — Part 1 (t01–t02), Part 2 (t03–t04).
import { sl, deck, table, flow, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { TOOTH, DIGESTIVE, VILLUS } from './svgs.mjs';
import { HALF, MOUTH, ADULT_TOTAL, JAW_TOTAL, LEFT_AFTER, TUBES, TUBE_RATIO, PATCH, PATCH_AREA, VILLI, EXTRA, TOTAL_AREA, AREA_RATIO } from './calc.mjs';

export const V = {
  tooth: svgV(TOOTH, 'A tooth in section showing enamel, dentine, pulp cavity, cement, gum and jaw bone, with crown, neck and root marked'),
  digestive: svgV(DIGESTIVE, 'The human digestive system with the mouth, salivary gland, oesophagus, liver, gall bladder, stomach, pancreas, small intestine, large intestine, rectum and anus'),
  villus: svgV(VILLUS, 'A villus of the small intestine with epithelium, capillary network and lacteal, and arrows for absorbed food'),
};

export const deck1 = deck({
  part: 1,
  title: 'Teeth and the Digestive System — Part 1: Teeth, the alimentary canal and the digestive glands',
  goals: [
    'Label a tooth and state the function of each type of tooth',
    'Write the adult dental formula and use it to count teeth',
    'Name the organs of the alimentary canal and the digestive glands with their secretions',
  ],
  slides: [
    sl('title', 'Teeth and the Digestive System', {
      b: 'Part 1 — how food is cut, ground and moved along, and which glands help.',
      v: flow('LR', [['t', 'Teeth cut and grind food'], ['a', 'Alimentary canal moves it'], ['g', 'Glands add juices']], [['t', 'a'], ['a', 'g']], 'Flow from teeth to the alimentary canal to the digestive glands'),
      n: 'Food is of no use to the body until it is made small and soluble. The teeth begin the job by cutting and grinding. The alimentary canal then carries the food along while glands pour in juices that digest it.',
    }),
    sl('diagram', 'Structure of a tooth', {
      b: 'Three regions: the **crown** above the gum, the **neck** at the gum and the **root** in the jaw bone.',
      v: V.tooth,
      n: 'A tooth has a crown that shows above the gum, a neck at the gum line and a root fixed in the jaw bone. The crown is covered by enamel. Inside lies dentine, and at the centre is the pulp cavity with blood vessels and nerves.',
    }),
    sl('concept', 'Parts of a tooth and what they do', {
      v: table(['Part', 'Description', 'Function'], [['Enamel', 'Hardest substance in the body; covers the crown', 'Protects the tooth from wear and acid'], ['Dentine', 'Bone-like, yellowish; forms most of the tooth', 'Gives the tooth its shape and strength'], ['Pulp cavity', 'Soft; blood vessels and nerves', 'Brings food and oxygen; gives the sense of pain and temperature'], ['Cement', 'Thin bony layer round the root', 'Fixes the root in the jaw bone'], ['Gum', 'Soft tissue round the neck', 'Holds the tooth firmly and protects the root']], 'Table of the parts of a tooth with their description and function'),
      n: 'Enamel is the hardest part and protects the crown. Dentine forms most of the tooth. The pulp cavity holds blood vessels and nerves, which is why a decayed tooth that reaches it hurts. Cement fixes the root in the jaw, and the gum holds the neck.',
    }),
    sl('concept', 'Four types of teeth', {
      v: table(['Type', 'Shape', 'In an adult mouth', 'Function'], [['Incisors', 'Flat, sharp edge', String(MOUTH.i), 'Cutting and biting food'], ['Canines', 'Pointed, long', String(MOUTH.c), 'Tearing and piercing'], ['Premolars', 'Broad, two bumps', String(MOUTH.pm), 'Crushing and grinding'], ['Molars', 'Broadest, many bumps', String(MOUTH.m), 'Grinding food finely']], 'Table of the four types of teeth with shape, number and function'),
      n: 'The four types of teeth suit four jobs. Incisors cut and bite. Canines tear. Premolars and molars have broad tops with bumps, and they crush and grind the food into a paste that is easy to swallow.',
    }),
    sl('check', 'Quick check: the tearing tooth', {
      b: 'Which type of tooth is pointed and used for tearing food?',
      chk: 'chk-canine',
      n: 'Think of the long pointed tooth next to the incisors.',
    }),
    sl('concept', 'The dental formula of an adult', {
      b: 'For **one half** of each jaw: incisors, canines, premolars, molars.',
      v: table(['', 'Incisors', 'Canines', 'Premolars', 'Molars', 'Half jaw'], [['Upper', String(HALF.i), String(HALF.c), String(HALF.pm), String(HALF.m), '8'], ['Lower', String(HALF.i), String(HALF.c), String(HALF.pm), String(HALF.m), '8']], 'Table giving two, one, two and three teeth for each type in the upper and lower half jaw'),
      n: 'The dental formula shows the teeth in one half of the upper jaw and one half of the lower jaw. In an adult it reads two, one, two, three above and two, one, two, three below. Each half jaw has eight teeth.',
    }),
    sl('example', 'Worked example 1: counting all the teeth', {
      b: 'Use the dental formula to find the teeth of each type and the total in an adult mouth.',
      ul: [`Step 1: a mouth has 4 half jaws (2 upper, 2 lower).`, `Step 2: incisors 2 × 4 = **${MOUTH.i}**; canines 1 × 4 = **${MOUTH.c}**; premolars 2 × 4 = **${MOUTH.pm}**; molars 3 × 4 = **${MOUTH.m}**.`, `Step 3: total = ${MOUTH.i} + ${MOUTH.c} + ${MOUTH.pm} + ${MOUTH.m} = **${ADULT_TOTAL}**; one jaw has **${JAW_TOTAL}**.`],
      v: table(['Type', 'Per half jaw', 'Whole mouth'], [['Incisors', String(HALF.i), String(MOUTH.i)], ['Canines', String(HALF.c), String(MOUTH.c)], ['Premolars', String(HALF.pm), String(MOUTH.pm)], ['Molars', String(HALF.m), String(MOUTH.m)], ['Total', '8', String(ADULT_TOTAL)]], 'Worked table: eight incisors, four canines, eight premolars, twelve molars and thirty-two teeth in all'),
      n: 'There are four half jaws, so multiply each number in the formula by four. That gives eight incisors, four canines, eight premolars and twelve molars. Together they make thirty-two teeth, sixteen in each jaw.',
    }),
    sl('diagram', 'The human digestive system', {
      b: 'The **alimentary canal** is one long tube from mouth to anus; the **glands** lie beside it.',
      v: V.digestive,
      n: 'The alimentary canal begins at the mouth and runs through the oesophagus, stomach, small intestine and large intestine to the anus. The salivary glands, liver and pancreas lie outside the tube but pour their juices into it through ducts.',
    }),
    sl('concept', 'Organs of the alimentary canal', {
      v: table(['Organ', 'What happens'], [['Mouth', 'Teeth chew; saliva wets the food and starts starch digestion'], ['Oesophagus', 'Pushes food down by waves of contraction'], ['Stomach', 'Churns food; gastric juice starts protein digestion'], ['Small intestine', 'Digestion is completed and food is absorbed'], ['Large intestine', 'Absorbs water; holds undigested waste'], ['Rectum and anus', 'Store and pass out faeces']], 'Table of the organs of the alimentary canal and what happens in each'),
      n: 'In the mouth food is chewed and mixed with saliva. The oesophagus pushes it to the stomach, where it is churned. Digestion ends and absorption happens in the small intestine. The large intestine absorbs water, and the rest leaves through the anus.',
    }),
    sl('check', 'Quick check: not part of the canal', {
      b: 'Which of these is a digestive gland and not part of the alimentary canal?',
      chk: 'chk-liver',
      n: 'The food never passes through it.',
    }),
    sl('concept', 'The digestive glands', {
      v: table(['Gland', 'Secretion', 'Poured into'], [['Salivary glands', 'Saliva', 'Mouth'], ['Gastric glands', 'Gastric juice', 'Stomach'], ['Liver', 'Bile (stored in the gall bladder)', 'Duodenum'], ['Pancreas', 'Pancreatic juice', 'Duodenum'], ['Intestinal glands', 'Intestinal juice', 'Small intestine']], 'Table of five digestive glands with their secretions and where each is poured'),
      n: 'There are five sets of digestive glands. Salivary glands give saliva to the mouth. Gastric glands give gastric juice to the stomach. The liver gives bile and the pancreas gives pancreatic juice, both to the duodenum. Intestinal glands give intestinal juice.',
    }),
    sl('example', 'Worked example 2: teeth lost in an accident', {
      b: 'A patient lost all four canines and all eight premolars. How many teeth are left, and can he still grind food?',
      ul: [`Step 1: teeth lost = ${MOUTH.c} + ${MOUTH.pm} = **${MOUTH.c + MOUTH.pm}**.`, `Step 2: teeth left = ${ADULT_TOTAL} − ${MOUTH.c + MOUTH.pm} = **${LEFT_AFTER}**.`, `Step 3: ${MOUTH.m} molars remain, so he can still **grind**, but he will find it hard to **tear** tough food.`],
      v: table(['Type', 'Before', 'Lost', 'Left'], [['Incisors', String(MOUTH.i), '0', String(MOUTH.i)], ['Canines', String(MOUTH.c), String(MOUTH.c), '0'], ['Premolars', String(MOUTH.pm), String(MOUTH.pm), '0'], ['Molars', String(MOUTH.m), '0', String(MOUTH.m)], ['Total', String(ADULT_TOTAL), String(MOUTH.c + MOUTH.pm), String(LEFT_AFTER)]], 'Worked table: thirty-two teeth before, twelve lost, twenty left'),
      n: 'Add the canines and premolars lost to get twelve. Subtract from thirty-two to leave twenty teeth. The incisors and molars are still there, so cutting and grinding are possible, but tearing is poor because the canines are gone.',
    }),
    sl('check', 'Quick check: bile', {
      b: 'Bile is made in the',
      chk: 'chk-bile',
      n: 'It is stored in the gall bladder but made elsewhere.',
    }),
    sl('summary', 'Summary', {
      ul: ['A tooth: enamel, dentine, pulp cavity, cement; crown, neck, root.', 'Incisors cut, canines tear, premolars and molars grind; adult formula gives thirty-two teeth.', 'The alimentary canal is a tube; the salivary glands, liver and pancreas pour juices into it.'],
      v: table(['Teeth', 'Function'], [['Incisors', 'Cut'], ['Canines', 'Tear'], ['Premolars and molars', 'Grind']], 'Summary table of the types of teeth and their functions'),
      n: 'To recap. Enamel covers the crown and the pulp cavity holds the nerves. Incisors cut, canines tear, and premolars and molars grind. An adult has thirty-two teeth. Food passes along the alimentary canal while five sets of glands add their juices.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['In a tooth diagram, show **enamel, dentine, pulp cavity, cement** and the **gum**, with **crown, neck, root**.', 'Write the formula for **one half** of each jaw, then double it to get **32**.', 'Say the **liver makes bile** and the **gall bladder stores** it.', 'Name each gland with its **secretion**.'],
      n: 'Exam tips. Draw the tooth with all its layers and name crown, neck and root. Write the dental formula for one half of each jaw and double it. Remember the liver makes bile and the gall bladder only stores it. Always name a gland together with its secretion.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Teeth and the Digestive System — Part 2: Digestive enzymes, absorption and assimilation',
  goals: [
    'Tabulate the enzymes, substrates and end products in the mouth, stomach and small intestine',
    'Explain how villi are adapted for absorption',
    'Describe how absorbed nutrients are carried and assimilated',
  ],
  slides: [
    sl('title', 'Enzymes, Absorption and Assimilation', {
      b: 'Part 2 — how large food molecules become small ones, and where they go next.',
      v: flow('LR', [['l', 'Large food molecules'], ['e', 'Enzymes digest'], ['s', 'Small soluble molecules'], ['b', 'Blood and lymph']], [['l', 'e'], ['e', 's'], ['s', 'b']], 'Flow from large molecules through enzymes to small molecules and then to blood and lymph'),
      n: 'Starch, protein and fat are too large to pass into the blood. Enzymes break them into small soluble molecules. These are then absorbed into the blood and lymph and carried to every cell of the body.',
    }),
    sl('concept', 'In the mouth', {
      v: table(['Secretion', 'Enzyme', 'Substrate', 'End product'], [['Saliva', 'Salivary amylase', 'Starch', 'Maltose']], 'Table of the digestive enzyme in the mouth with its substrate and end product'),
      b: 'Saliva is slightly alkaline and also contains mucus, which makes the food slippery. Chewing for a long time lets more starch change to maltose.',
      n: 'In the mouth, saliva wets the food. It holds an enzyme called salivary amylase, which changes some starch into maltose, a sugar. That is why a piece of rice or bread tastes a little sweeter if you chew it for long.',
    }),
    sl('concept', 'In the stomach', {
      v: table(['Part of gastric juice', 'Action'], [['Hydrochloric acid', 'Makes the stomach acidic, kills germs and helps pepsin work'], ['Pepsin (enzyme)', 'Protein to peptones (partly digested protein)'], ['Rennin (enzyme, young children)', 'Curdles milk so that it stays longer in the stomach'], ['Mucus', 'Coats the stomach wall and protects it from acid']], 'Table of the parts of gastric juice and what each does'),
      n: 'Gastric juice has hydrochloric acid, the enzyme pepsin and mucus. The acid kills germs and gives pepsin the acidic conditions it needs. Pepsin starts to break protein into peptones. Mucus protects the stomach wall from the acid.',
    }),
    sl('check', 'Quick check: the protein enzyme of the stomach', {
      b: 'Which enzyme begins the digestion of protein in the stomach?',
      chk: 'chk-pepsin',
      n: 'Think of the acid in the stomach.',
    }),
    sl('concept', 'In the small intestine', {
      v: table(['Juice', 'Source', 'Enzymes and action'], [['Bile', 'Liver (stored in gall bladder)', 'No enzyme; makes the food alkaline and breaks fat into tiny droplets (emulsification)'], ['Pancreatic juice', 'Pancreas', 'Amylase (starch), trypsin (protein), lipase (fat)'], ['Intestinal juice', 'Intestinal glands', 'Maltase, sucrase, lactase (sugars), erepsin (peptides to amino acids), lipase']], 'Table of bile, pancreatic juice and intestinal juice with their sources and actions'),
      n: 'Bile has no enzymes. It makes the food alkaline and breaks large fat drops into tiny droplets. Pancreatic juice has enzymes for starch, protein and fat. Intestinal juice completes the job by turning sugars into simple sugars and peptides into amino acids.',
    }),
    sl('concept', 'The master table of digestion', {
      v: table(['Region', 'Enzyme', 'Substrate', 'End product'], [['Mouth', 'Salivary amylase', 'Starch', 'Maltose'], ['Stomach', 'Pepsin', 'Protein', 'Peptones'], ['Small intestine', 'Pancreatic amylase', 'Starch', 'Maltose'], ['Small intestine', 'Trypsin', 'Proteins and peptones', 'Peptides and amino acids'], ['Small intestine', 'Lipase', 'Emulsified fats', 'Fatty acids and glycerol'], ['Small intestine', 'Maltase', 'Maltose', 'Glucose'], ['Small intestine', 'Sucrase', 'Sucrose', 'Glucose and fructose'], ['Small intestine', 'Lactase', 'Lactose', 'Glucose and galactose'], ['Small intestine', 'Erepsin', 'Peptides', 'Amino acids']], 'Master table of digestive enzymes by region with substrate and end product'),
      n: 'This table is worth learning by heart. In the mouth, amylase gives maltose. In the stomach, pepsin gives peptones. In the small intestine, amylase, trypsin and lipase continue the work, and maltase, sucrase, lactase and erepsin finish it, giving glucose, amino acids, fatty acids and glycerol.',
    }),
    sl('example', 'Worked example 1: following starch through the canal', {
      b: 'A mouthful of boiled rice is mostly starch. Trace what happens to its starch until it can be absorbed.',
      ul: ['Step 1: **mouth**: salivary amylase changes some starch to maltose.', 'Step 2: **stomach**: no starch digestion; the acid stops salivary amylase.', 'Step 3: **small intestine**: pancreatic amylase changes the rest of the starch to maltose.', 'Step 4: **small intestine**: maltase changes maltose to **glucose**, which is absorbed.'],
      v: flow('LR', [['s', 'Starch'], ['m', 'Maltose'], ['g', 'Glucose']], [['s', 'm', 'amylase'], ['m', 'g', 'maltase']], 'Flow showing starch changing to maltose by amylase and maltose changing to glucose by maltase'),
      n: 'Follow the starch. Salivary amylase changes some of it to maltose in the mouth. The acid in the stomach stops that enzyme. In the small intestine pancreatic amylase changes the rest to maltose, and maltase then changes maltose to glucose, which is absorbed.',
    }),
    sl('example', 'Worked example 2: reading an enzyme experiment', {
      b: `Saliva was added to starch solution in two tubes. A was kept at ${TUBES[0].temp} degrees and B at ${TUBES[1].temp} degrees. Starch disappeared (no blue-black colour with iodine) after ${TUBES[0].minutes} minutes in A and ${TUBES[1].minutes} minutes in B. What do the results show?`,
      ul: [`Step 1: B took ${TUBES[1].minutes} ÷ ${TUBES[0].minutes} = **${TUBE_RATIO}** times as long.`, 'Step 2: the enzyme in saliva works **faster at body temperature** than at a low temperature.', 'Step 3: the starch was changed to sugar, which does not give the blue-black colour with iodine.'],
      v: table(['Tube', 'Temperature (degrees)', 'Minutes until starch is gone'], TUBES.map((t) => [t.name, String(t.temp), String(t.minutes)]), 'Worked table of the two tubes with temperature and time for starch to disappear'),
      n: 'Compare the two times. The cold tube took four times as long as the warm one. Salivary amylase works best at about body temperature, and it is slowed down when it is cold. The starch is turned into sugar, so the iodine test turns negative.',
    }),
    sl('check', 'Quick check: end products of fat digestion', {
      b: 'The end products of the digestion of fats are',
      chk: 'chk-fat',
      n: 'Lipase breaks fat into two kinds of molecule.',
    }),
    sl('diagram', 'A villus of the small intestine', {
      b: 'The inner wall of the small intestine is covered with millions of finger-like **villi**.',
      v: V.villus,
      n: 'A villus is a tiny finger-like fold of the wall. Its surface layer is one cell thick. Inside there is a network of blood capillaries and a central tube called the lacteal. Glucose and amino acids enter the capillaries. Fatty acids and glycerol enter the lacteal.',
    }),
    sl('example', 'Worked example 3: what villi add to the surface', {
      b: `A patch of intestine wall is ${PATCH.l} mm by ${PATCH.w} mm. There are ${PATCH.density} villi on every square millimetre, and each adds ${PATCH.add} square millimetre of surface. Find the villi and the gain in surface.`,
      ul: [`Step 1: flat area = ${PATCH.l} × ${PATCH.w} = **${PATCH_AREA}** square millimetres.`, `Step 2: villi = ${PATCH_AREA} × ${PATCH.density} = **${VILLI}**.`, `Step 3: extra area = ${VILLI} × ${PATCH.add} = **${EXTRA}**; total = ${PATCH_AREA} + ${EXTRA} = **${TOTAL_AREA}**, which is **${AREA_RATIO}** times the flat area.`],
      v: table(['Quantity', 'Value'], [['Flat area (square millimetres)', String(PATCH_AREA)], ['Number of villi', String(VILLI)], ['Extra area from villi (square millimetres)', String(EXTRA)], ['Total absorbing area (square millimetres)', String(TOTAL_AREA)], ['Times larger than flat', String(AREA_RATIO)]], 'Worked table: twenty flat, five hundred villi, two hundred extra, two hundred twenty in all, eleven times larger'),
      n: 'Multiply the length by the width to get the flat area. Multiply that by the number of villi in each square millimetre. Then add the extra area the villi bring. The surface becomes eleven times larger, so much more food can be absorbed.',
    }),
    sl('concept', 'How villi are adapted for absorption', {
      v: table(['Feature', 'How it helps'], [['Millions of finger-like villi', 'Very large surface area for absorption'], ['Wall one cell thick', 'Digested food passes through quickly'], ['Dense network of capillaries', 'Carries glucose and amino acids away at once'], ['A lacteal in the middle', 'Takes up fatty acids and glycerol'], ['Muscle in the wall', 'Moves villi and keeps fresh food in contact']], 'Table of the adaptations of villi and how each helps absorption'),
      n: 'Villi are well suited to absorption. Millions of them give a large surface. Their wall is one cell thick, so food passes through easily. Capillaries carry away glucose and amino acids, and the lacteal takes up fatty acids and glycerol.',
    }),
    sl('check', 'Quick check: the lacteal', {
      b: 'In a villus, fatty acids and glycerol are taken up by the',
      chk: 'chk-villi',
      n: 'It is the central tube, not a blood vessel.',
    }),
    sl('concept', 'Absorption and assimilation', {
      v: flow('TB', [['d', 'Digested food in the small intestine'], ['c', 'Glucose and amino acids into capillaries'], ['l', 'Fatty acids and glycerol into lacteals'], ['p', 'Hepatic portal vein to the liver'], ['b', 'Blood to all body cells'], ['a', 'Assimilation: energy, growth, repair, storage']], [['d', 'c'], ['d', 'l'], ['c', 'p'], ['p', 'b'], ['l', 'b'], ['b', 'a']], 'Flow from digested food through capillaries and lacteals to the blood and to assimilation in body cells'),
      n: 'Glucose and amino acids pass into the capillaries of the villi and go by the hepatic portal vein to the liver. Fatty acids and glycerol enter the lacteals and reach the blood later. Assimilation is the use of this food by cells for energy, growth, repair and storage.',
    }),
    sl('check', 'Quick check: storing glucose', {
      b: 'Extra glucose is stored in the liver and muscles as',
      chk: 'chk-glycogen',
      n: 'It is a branched carbohydrate.',
    }),
    sl('summary', 'Summary', {
      ul: ['Saliva: amylase, starch to maltose. Stomach: pepsin, protein to peptones.', 'Small intestine: bile, pancreatic juice and intestinal juice finish digestion.', 'Villi absorb; glucose and amino acids go to capillaries, fatty acids and glycerol to lacteals.', 'Assimilation: the use of absorbed food by cells.'],
      v: table(['Food', 'End product', 'Absorbed into'], [['Carbohydrate', 'Glucose', 'Capillary'], ['Protein', 'Amino acids', 'Capillary'], ['Fat', 'Fatty acids and glycerol', 'Lacteal']], 'Summary table of the end products of digestion and where each is absorbed'),
      n: 'To recap. Amylase works in the mouth, pepsin in the stomach, and many enzymes in the small intestine. Glucose, amino acids, fatty acids and glycerol are absorbed by villi. Assimilation is the use of this food by the cells.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Always give **enzyme, substrate and end product** together.', 'Do not call **bile** an enzyme: it has **none**; it **emulsifies** fat.', 'Say that villi have a **large surface**, a wall **one cell thick**, **capillaries** and a **lacteal**.', 'Fats go into the **lacteal**; glucose and amino acids go into **capillaries**.'],
      n: 'Exam tips. Give the enzyme, its substrate and its end product together. Bile has no enzyme, it only breaks fat into droplets. For villi, mention the large surface, the thin wall, the capillaries and the lacteal. Remember that fats go into the lacteal.',
    }),
  ],
});
