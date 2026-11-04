// ICSE 9 Biology ch10 Teeth and the Digestive System — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { MOUTH, ADULT_TOTAL, JAW_TOTAL, LEFT_MOLARS, MOLARS_LOST, MOLARS_NO_THIRD, THIRD_MOLARS, EXPT2, EXPT2_RATIO, EXPT2_DIFF, PATCH2, P2_AREA, P2_VILLI, P2_EXTRA, P2_TOTAL, P2_RATIO, PATCH, VILLI, AREA_RATIO, SMALL_M, LARGE_M, LEN_RATIO } from './calc.mjs';
import { TOOTH_LETTERED, DIGESTIVE_LETTERED, VILLUS_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const toothFig = svgV(TOOTH_LETTERED, 'A tooth in section with parts lettered A to E');
const digFig = svgV(DIGESTIVE_LETTERED, 'The human digestive system with organs lettered A to E');
const villusFig = svgV(VILLUS_LETTERED, 'A villus of the small intestine with parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-canine', mcq({
  stem: 'Which type of tooth is pointed and used for tearing food?',
  right: 'Canine', wrong: ['Incisor', 'Premolar', 'Molar'],
  sol: 'Canines are long and pointed and tear food — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-liver', mcq({
  stem: 'Which of these is a digestive gland and not part of the alimentary canal?',
  right: 'Liver', wrong: ['Oesophagus', 'Stomach', 'Rectum'],
  sol: 'Food never passes through the liver, which makes bile — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-bile', mcq({
  stem: 'Bile is made in the',
  right: 'liver', wrong: ['gall bladder', 'pancreas', 'stomach'],
  sol: 'The liver makes bile and the gall bladder stores it — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-pepsin', mcq({
  stem: 'Which enzyme begins the digestion of protein in the stomach?',
  right: 'Pepsin', wrong: ['Amylase', 'Lipase', 'Maltase'],
  sol: 'Pepsin acts on protein in the acid of the stomach — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-fat', mcq({
  stem: 'The end products of the digestion of fats are',
  right: 'fatty acids and glycerol', wrong: ['amino acids and glycerol', 'glucose and fatty acids', 'maltose and glycerol'],
  sol: 'Lipase breaks fat into fatty acids and glycerol — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-villi', mcq({
  stem: 'In a villus, fatty acids and glycerol are taken up by the',
  right: 'lacteal', wrong: ['capillary network', 'epithelium of the stomach', 'gall bladder'],
  sol: 'The central lymph tube, the lacteal, absorbs fats — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chk-glycogen', mcq({
  stem: 'Extra glucose is stored in the liver and muscles as',
  right: 'glycogen', wrong: ['starch', 'maltose', 'cellulose'],
  sol: 'Animals store extra glucose as glycogen — option (@K).',
  d: 1, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- t01 teeth
add('enamel-mcq', mcq({
  stem: 'A dentist warns a girl that frequent sweets and cold drinks can wear away the hard covering of her teeth. The covering is called',
  right: 'enamel', wrong: ['dentine', 'cement', 'pulp'],
  sol: 'The hardest covering of the crown is enamel — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('pain-mcq', mcq({
  stem: 'A boy feels a sharp toothache when decay has gone deep into the centre of a tooth. The decay has reached the part that contains the',
  right: 'nerves, in the pulp cavity', wrong: ['nerves, in the enamel', 'blood, in the cement', 'bone, in the gum'],
  sol: 'Nerves and blood vessels lie in the pulp cavity — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('bite-mcq', mcq({
  stem: 'Meena bites a piece off a whole apple. The teeth that do this job are the',
  right: 'incisors', wrong: ['canines', 'premolars', 'molars'],
  sol: 'Incisors have a flat, sharp edge for cutting and biting — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('grind-mcq', mcq({
  stem: 'A man has lost all his molars. Which of these tasks will he find most difficult?',
  right: 'Grinding food into a fine paste', wrong: ['Biting off a piece of food', 'Tearing soft food', 'Swallowing water'],
  sol: 'Grinding is the work of the molars (and premolars) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('formula-mcq', mcq({
  stem: 'In the dental formula of an adult there are 2 premolars in one half of each jaw. How many premolars are there in the whole mouth?',
  right: '8', wrong: ['2', '4', '16'],
  sol: `Four half jaws × 2 = ${MOUTH.pm} — option (@K).`,
  d: 2, c: 'application', t: [1],
}));
add('figToothC-mcq', mcq({
  stem: 'In the figure of a tooth, which letter marks the part that holds the blood vessels and nerves?',
  right: 'C', wrong: ['A', 'B', 'D'],
  sol: 'C is the pulp cavity; A is enamel, B dentine, D cement and E gum — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [toothFig],
}));
add('figToothA-mcq', mcq({
  stem: 'In the figure of a tooth, which letter marks the hardest substance of the body?',
  right: 'A', wrong: ['B', 'C', 'E'],
  sol: 'A is the enamel — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [toothFig],
}));
add('ar-pulp', ar({
  a: 'A decayed tooth hurts most when the decay reaches the pulp cavity.',
  r: 'The pulp cavity is filled with hard enamel.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: the pulp cavity is soft and holds nerves and blood vessels — option (a).',
  d: 2, c: 'analysis', t: [1],
}));
add('incisor-tf', tf({
  stem: 'Canines are the teeth used mainly for cutting vegetables into thin slices.',
  key: 'f',
  sol: 'False. Incisors cut and bite; canines tear.',
  d: 1, c: 'recall', t: [1],
}));
add('term-formula', term({
  stem: 'Give the biological term: the way of writing the number of each type of tooth in one half of the upper and lower jaw.',
  model: '**Dental formula.**', sol: 'Dental formula.', sch: 'Dental formula',
  d: 1, c: 'recall', t: [1],
}));
add('odd-teeth', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Incisor, Canine, Gum, Molar.',
  model: '**Gum**; the others are **types of teeth**.', sol: 'The gum is soft tissue, not a tooth.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [1],
}));
add('reason-molar', term({
  stem: 'Give reason: molars have broad tops with bumps.',
  model: 'They are meant for **grinding** food into a paste, and a broad bumpy surface grinds better.', sol: 'For grinding.', sch: 'Grinding',
  d: 2, c: 'understanding', t: [1],
}));
add('left-num', num({
  stem: `Two molars are lost from each half jaw in an accident. How many teeth are left in an adult mouth that had the full set of ${ADULT_TOTAL}?`,
  value: LEFT_MOLARS,
  sol: `Teeth lost = 2 × 4 = ${MOLARS_LOST}; left = ${ADULT_TOTAL} − ${MOLARS_LOST} = ${LEFT_MOLARS}.`,
  scheme: [[`${LEFT_MOLARS}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 24 || 'value');
add('third-num', num({
  stem: `An adult never grew the ${THIRD_MOLARS} third molars (wisdom teeth). How many molars does the person have in all?`,
  value: MOLARS_NO_THIRD,
  sol: `An adult normally has ${MOUTH.m} molars; ${MOUTH.m} − ${THIRD_MOLARS} = ${MOLARS_NO_THIRD}.`,
  scheme: [[`${MOLARS_NO_THIRD}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 8 || 'value');
add('tooth-short2', short({
  marks: 2,
  stem: 'Name the part of a tooth that (i) covers the crown and (ii) holds the blood vessels and nerves.',
  model: '(i) **Enamel**, the hardest substance in the body, covers the crown of the tooth. (ii) The **pulp cavity**, at the centre of the tooth, holds the blood vessels and nerves.',
  sol: 'Enamel; pulp cavity.',
  scheme: [['Enamel', 1], ['Pulp cavity', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('types-short', short({
  marks: 2,
  stem: 'State one function each of (i) incisors and (ii) premolars.',
  model: '(i) **Incisors** have a flat, sharp edge and are used to cut and bite food. (ii) **Premolars** have broad tops with two bumps and are used to crush and grind food.',
  sol: 'Incisors cut; premolars grind.',
  scheme: [['Incisors: cutting', 1], ['Premolars: grinding', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('formula-short', short({
  marks: 2,
  stem: 'Write the dental formula of an adult for one half of each jaw and state the total number of teeth in the mouth.',
  model: `Incisors **2**, canines **1**, premolars **2**, molars **3** in each half jaw, upper and lower alike. Each half jaw has 8 teeth, so the mouth has 8 × 4 = **${ADULT_TOTAL}** teeth.`,
  sol: 'Formula 2, 1, 2, 3; 32 teeth.',
  scheme: [['Formula 2, 1, 2, 3', 1], [`${ADULT_TOTAL} teeth`, 1]],
  d: 2, c: 'application', t: [1],
}));
add('teeth-table3', short({
  marks: 3,
  stem: 'Tabulate three differences between incisors and molars.',
  model: `| Incisors | Molars |\n|---|---|\n| **Flat, sharp edge** | **Broad top with bumps** |\n| **Cut and bite** food | **Grind** food |\n| Lie at the **front** of the jaw; ${MOUTH.i} in all | Lie at the **back**; ${MOUTH.m} in all |`,
  sol: 'Shape; function; position or number.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('fn-short3', short({
  marks: 3,
  stem: 'Name the parts of a tooth that (i) fix the root in the jaw bone, (ii) give the tooth its shape and strength, and (iii) protect the crown from wear.',
  model: '(i) **Cement** fixes the root in the jaw bone. (ii) **Dentine** forms most of the tooth and gives it shape and strength. (iii) **Enamel**, the hardest substance of the body, protects the crown.',
  sol: 'Cement; dentine; enamel.',
  scheme: [['Cement', 1], ['Dentine', 1], ['Enamel', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 alimentary canal and glands
add('path-mcq', mcq({
  stem: 'Which sequence shows the correct path taken by food?',
  right: 'Mouth, oesophagus, stomach, small intestine, large intestine', wrong: ['Mouth, stomach, oesophagus, small intestine, large intestine', 'Mouth, oesophagus, small intestine, stomach, large intestine', 'Mouth, small intestine, stomach, oesophagus, large intestine'],
  sol: 'The oesophagus joins the mouth to the stomach, and the small intestine comes before the large — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('gland-mcq', mcq({
  stem: 'Which gland pours its juice into the duodenum through a duct but is not itself part of the alimentary canal?',
  right: 'Pancreas', wrong: ['Gastric gland', 'Salivary gland', 'Intestinal gland'],
  sol: 'The pancreas lies beside the duodenum; gastric and intestinal glands are in the walls of the canal and salivary glands open into the mouth — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('large-mcq', mcq({
  stem: 'Most of the water in the undigested food is taken back into the body in the',
  right: 'large intestine', wrong: ['stomach', 'oesophagus', 'duodenum'],
  sol: 'The large intestine absorbs water and leaves solid waste — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('figLiver-mcq', mcq({
  stem: 'In the figure of the digestive system, which letter marks the gland that makes bile?',
  right: 'B', wrong: ['A', 'C', 'D'],
  sol: 'B is the liver; A is a salivary gland, C the stomach, D the pancreas and E the small intestine — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [digFig],
}));
add('figSmall-mcq', mcq({
  stem: 'In the figure of the digestive system, which letter marks the organ in which most digested food is absorbed?',
  right: 'E', wrong: ['A', 'C', 'D'],
  sol: 'E is the small intestine — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [digFig],
}));
add('ar-bile', ar({
  a: 'The gall bladder makes bile.',
  r: 'The gall bladder stores the bile that the liver makes.',
  key: 'b',
  sol: 'The assertion is false: the liver makes bile. The reason is true — option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('large-tf', tf({
  stem: 'Food passes through the liver on its way from the stomach to the small intestine.',
  key: 'f',
  sol: 'False. The liver is a gland lying beside the canal; food does not enter it.',
  d: 2, c: 'understanding', t: [2],
}));
add('odd-gland', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Liver, Pancreas, Salivary gland, Stomach.',
  model: '**Stomach**; the others are **digestive glands** (the stomach is part of the alimentary canal).', sol: 'The stomach is a part of the canal.', sch: 'Odd one and category',
  d: 3, c: 'analysis', t: [2],
}));
add('len-num', num({
  stem: `The small intestine of an adult is about ${SMALL_M} m long and the large intestine about ${LARGE_M} m. How many times longer is the small intestine than the large intestine?`,
  value: LEN_RATIO,
  sol: `${SMALL_M} ÷ ${LARGE_M} = ${LEN_RATIO} times.`,
  scheme: [[`${LEN_RATIO}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 4 || 'value');
add('gland-short', short({
  marks: 2,
  stem: 'Name the gland that makes (i) saliva and (ii) bile.',
  model: '(i) **Saliva** is made by the **salivary glands**, which pour it into the mouth. (ii) **Bile** is made by the **liver** and is stored in the gall bladder.',
  sol: 'Salivary glands; liver.',
  scheme: [['Salivary glands', 1], ['Liver', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('duct-short', short({
  marks: 2,
  stem: 'The liver and the pancreas help digestion, yet they are not part of the alimentary canal. Give a reason.',
  model: '**Food never passes through them.** They are glands that make juices and send them into the duodenum through **ducts**.',
  sol: 'Food does not pass through; they pour juices through ducts.',
  scheme: [['Food does not pass through them', 1], ['They pour juices into the canal through ducts', 1]],
  d: 3, c: 'application', t: [2],
}));
add('glands-short3', short({
  marks: 3,
  stem: 'Tabulate three digestive glands, giving the secretion of each and the place into which it is poured.',
  model: '| Gland | Secretion | Poured into |\n|---|---|---|\n| **Salivary glands** | Saliva | **Mouth** |\n| **Liver** | Bile | **Duodenum** |\n| **Pancreas** | Pancreatic juice | **Duodenum** |',
  sol: 'Any three glands with secretion and place.',
  scheme: [['First gland with secretion and place', 1], ['Second gland with secretion and place', 1], ['Third gland with secretion and place', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('canal-short3', short({
  marks: 3,
  stem: 'State what happens to the food in (i) the oesophagus, (ii) the stomach and (iii) the large intestine.',
  model: '(i) The **oesophagus** pushes the food down to the stomach by waves of contraction. (ii) In the **stomach** the food is churned and mixed with gastric juice, and protein digestion begins. (iii) The **large intestine** absorbs water and holds the undigested waste.',
  sol: 'Oesophagus: pushes; stomach: churns and starts protein digestion; large intestine: absorbs water.',
  scheme: [['Oesophagus pushes the food', 1], ['Stomach churns, protein digestion begins', 1], ['Large intestine absorbs water', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('match5', match({
  marks: 5,
  stem: 'Study the diagram of the digestive system and match each lettered organ with its description.',
  pairs: [
    ['A', 'Makes saliva, which begins the digestion of starch'],
    ['B', 'Makes bile, which emulsifies fat'],
    ['C', 'Churns food and secretes gastric juice with pepsin'],
    ['D', 'Gland below the stomach that makes juice with amylase, trypsin and lipase'],
    ['E', 'Completes digestion and absorbs most of the digested food'],
  ],
  order: [3, 0, 2, 4, 1],
  sol: 'A salivary gland; B liver; C stomach; D pancreas; E small intestine.',
  d: 2, c: 'application', t: [2],
  assets: [digFig],
}));

// ---------------------------------------------------------------- t03 enzymes
add('amylase-mcq', mcq({
  stem: 'Starch solution was mixed with saliva and kept warm. After some minutes a drop of the mixture no longer turned blue-black with iodine. This shows that the saliva had',
  right: 'changed the starch into a sugar', wrong: ['added more starch', 'changed protein to starch', 'made the iodine inactive'],
  sol: 'Salivary amylase changed starch into maltose, which gives no blue-black colour — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('pepsinmed-mcq', mcq({
  stem: 'Cubes of boiled egg white (a protein) are kept at body temperature in four test tubes, each with pepsin. In which tube will the egg white be digested?',
  right: 'The tube to which dilute hydrochloric acid has been added', wrong: ['The tube to which an alkali has been added', 'The tube to which oil has been added', 'The tube to which nothing else has been added'],
  sol: 'Pepsin works in an acid medium, which the dilute acid provides — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('bile-mcq', mcq({
  stem: 'A patient\'s bile duct is blocked, so bile cannot reach the duodenum. Digestion that will be affected most is that of',
  right: 'fats', wrong: ['starch in the mouth', 'proteins in the stomach', 'sugars in the large intestine'],
  sol: 'Bile emulsifies fats, so lipase cannot work well without it — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('trypsin-mcq', mcq({
  stem: 'The enzyme trypsin, in pancreatic juice, acts on',
  right: 'proteins and peptones', wrong: ['starch', 'fats', 'cellulose'],
  sol: 'Trypsin digests proteins and peptones to peptides and amino acids — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('lactase-mcq', mcq({
  stem: 'A baby cannot digest the sugar in milk because the enzyme that acts on it is missing. The enzyme and the sugar are',
  right: 'lactase and lactose', wrong: ['maltase and lactose', 'lactase and maltose', 'sucrase and lactose'],
  sol: 'Lactase breaks lactose into glucose and galactose — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('ar-pepsin', ar({
  a: 'Pepsin acts on protein in the stomach.',
  r: 'Gastric juice contains hydrochloric acid, which gives the acid medium that pepsin needs.',
  key: 'c',
  sol: 'Both are true, and the acid explains why pepsin works in the stomach — option (c).',
  d: 2, c: 'analysis', t: [3],
}));
add('ar-bile2', ar({
  a: 'Bile helps in the digestion of fats.',
  r: 'Bile contains the enzyme lipase.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: bile has no enzyme; it emulsifies fats — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('hcl-tf', tf({
  stem: 'Hydrochloric acid in gastric juice is an enzyme that digests protein.',
  key: 'f',
  sol: 'False. The acid is not an enzyme; pepsin is the enzyme, and the acid gives it the right medium.',
  d: 2, c: 'understanding', t: [3],
}));
add('bile-tf', tf({
  stem: 'Bile contains the enzyme lipase.',
  key: 'f',
  sol: 'False. Bile has no enzyme; lipase is in pancreatic and intestinal juice.',
  d: 1, c: 'recall', t: [3],
}));
add('term-emul', term({
  stem: 'Give the biological term: the breaking of large fat drops into tiny droplets by bile.',
  model: '**Emulsification.**', sol: 'Emulsification.', sch: 'Emulsification',
  d: 1, c: 'recall', t: [3],
}));
add('odd-enz', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Pepsin, Trypsin, Bile, Lipase.',
  model: '**Bile**; the others are **enzymes**.', sol: 'Bile has no enzyme.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [3],
}));
add('tube-num', num({
  stem: `Saliva was added to starch in tube P at ${EXPT2[0].temp} degrees and in tube Q at ${EXPT2[1].temp} degrees. The starch had gone after ${EXPT2[0].minutes} minutes in P and ${EXPT2[1].minutes} minutes in Q. How many minutes longer did Q take?`,
  value: EXPT2_DIFF,
  sol: `${EXPT2[1].minutes} − ${EXPT2[0].minutes} = ${EXPT2_DIFF} minutes.`,
  scheme: [[`${EXPT2_DIFF}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 8 || 'value');
add('fill-enz', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [pepsin, bile, saliva, lacteal, maltose, glycogen, pancreas, villi]\n\nThe amylase of (a) ______ changes starch into (b) ______. The enzyme (c) ______ begins the digestion of protein in the stomach. Fatty acids and glycerol are absorbed into the (d) ______ of a villus. Extra glucose is stored in the liver as (e) ______.',
  acc: [['saliva'], ['maltose'], ['pepsin'], ['lacteal'], ['glycogen']],
  sol: '(a) saliva; (b) maltose; (c) pepsin; (d) lacteal; (e) glycogen.',
  d: 2, c: 'understanding', t: [3, 4],
}));
add('hcl-short', short({
  marks: 2,
  stem: 'State two functions of hydrochloric acid in gastric juice.',
  model: 'The acid **kills germs** that enter the stomach with the food. It also gives the **acid medium** in which the enzyme pepsin works best.',
  sol: 'Kills germs; acid medium for pepsin.',
  scheme: [['Kills germs', 1], ['Acid medium for pepsin', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('bile-short', short({
  marks: 2,
  stem: 'State two ways in which bile helps in digestion.',
  model: 'Bile **emulsifies fats**, breaking big drops into tiny droplets, and makes the food **alkaline** for the enzymes of the small intestine.',
  sol: 'Emulsifies fats; makes the food alkaline.',
  scheme: [['Emulsifies fats', 1], ['Makes the food alkaline', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('saliva-short', short({
  marks: 2,
  stem: 'Name the enzyme in saliva and state its substrate and end product.',
  model: 'The enzyme in saliva is **salivary amylase**. Its substrate is **starch**, which it changes into the sugar **maltose** in the mouth.',
  sol: 'Salivary amylase; starch; maltose.',
  scheme: [['Salivary amylase', 1], ['Starch to maltose', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('mucus-short', short({
  marks: 2,
  stem: 'Why does the stomach wall not get digested by the pepsin and acid in gastric juice?',
  model: 'A layer of **mucus**, made by cells of the stomach wall, **coats** it and **protects** it from the acid and pepsin.',
  sol: 'Mucus coats and protects.',
  scheme: [['Mucus coats the wall', 1], ['Protects it from acid and pepsin', 1]],
  d: 2, c: 'application', t: [3],
}));
add('enz-table3', short({
  marks: 3,
  stem: 'Tabulate the enzyme, substrate and end product of digestion in (i) the mouth, (ii) the stomach and (iii) the small intestine for fats.',
  model: '| Region | Enzyme | Substrate | End product |\n|---|---|---|---|\n| Mouth | **Salivary amylase** | **Starch** | **Maltose** |\n| Stomach | **Pepsin** | **Protein** | **Peptones** |\n| Small intestine | **Lipase** | **Emulsified fats** | **Fatty acids and glycerol** |',
  sol: 'Amylase; pepsin; lipase, each with substrate and product.',
  scheme: [['Mouth row', 1], ['Stomach row', 1], ['Small intestine row', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('panc-short3', short({
  marks: 3,
  stem: 'Name the three enzymes of pancreatic juice and state the food that each acts on.',
  model: '**Amylase** acts on **starch** and forms maltose. **Trypsin** acts on **proteins** and **peptones** and forms peptides and amino acids. **Lipase** acts on emulsified **fats** and forms fatty acids and glycerol.',
  sol: 'Amylase: starch; trypsin: protein; lipase: fat.',
  scheme: [['Amylase and starch', 1], ['Trypsin and protein', 1], ['Lipase and fat', 1]],
  d: 2, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 absorption and assimilation
add('portal-mcq', mcq({
  stem: 'Glucose absorbed in the small intestine is carried by the hepatic portal vein first to the',
  right: 'liver', wrong: ['heart', 'kidney', 'brain'],
  sol: 'The hepatic portal vein carries absorbed food to the liver — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('villi-mcq', mcq({
  stem: 'Which feature of a villus helps digested food pass quickly into the blood?',
  right: 'Its wall is only one cell thick', wrong: ['Its surface is covered by thick mucus only', 'It contains bile', 'It has no blood supply'],
  sol: 'A very thin wall gives a short path for the food — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('surface-mcq', mcq({
  stem: 'A patient has a short length of small intestine removed and loses weight because less food is absorbed. This is mainly because the',
  right: 'surface area with villi is reduced', wrong: ['stomach makes less acid', 'liver stops making bile', 'teeth cannot grind'],
  sol: 'Fewer villi mean less surface for absorption — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('figVillusC-mcq', mcq({
  stem: 'In the figure of a villus, which letter marks the tube that takes up fatty acids and glycerol?',
  right: 'C', wrong: ['A', 'B', 'D'],
  sol: 'C is the lacteal; A is the epithelium, B the capillary network, D an intestinal gland and E the muscle layer — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [villusFig],
}));
add('ar-small', ar({
  a: 'Most of the digested food is absorbed in the small intestine.',
  r: 'The large intestine absorbs water from the undigested food.',
  key: 'd',
  sol: 'Both are true, but the second statement does not explain the first — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('lacteal-tf', tf({
  stem: 'Fatty acids and glycerol are absorbed into the blood capillaries of the villi.',
  key: 'f',
  sol: 'False. They are absorbed into the lacteals; glucose and amino acids go into the capillaries.',
  d: 2, c: 'understanding', t: [4],
}));
add('small-tf', tf({
  stem: 'Villi are found on the inner wall of the small intestine.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [4],
}));
add('term-assim', term({
  stem: 'Give the biological term: the use of absorbed food by the cells of the body for energy, growth and repair.',
  model: '**Assimilation.**', sol: 'Assimilation.', sch: 'Assimilation',
  d: 1, c: 'recall', t: [4],
}));
add('reason-villi', term({
  stem: 'Give reason: the inner wall of the small intestine is folded into villi.',
  model: 'Villi give a very **large surface area** for absorbing the digested food.', sol: 'Large surface area.', sch: 'Large surface area',
  d: 2, c: 'understanding', t: [4],
}));
add('villi-num', num({
  stem: `A patch of the small intestine wall is ${PATCH.l} mm by ${PATCH.w} mm and has ${PATCH.density} villi on every square millimetre. How many villi are on the patch?`,
  value: VILLI,
  sol: `Area = ${PATCH.l} × ${PATCH.w} = 20 square millimetres; villi = 20 × ${PATCH.density} = ${VILLI}.`,
  scheme: [[`${VILLI}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 500 || 'value');
add('area-num', num({
  stem: `A flat patch of intestine wall has an area of 20 square millimetres. With villi its total absorbing area is 220 square millimetres. How many times larger is the area with villi?`,
  value: AREA_RATIO,
  sol: `220 ÷ 20 = ${AREA_RATIO} times.`,
  scheme: [[`${AREA_RATIO}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 11 || 'value');
add('route-short', short({
  marks: 2,
  stem: 'Name the vessel in a villus that carries away (i) glucose and (ii) fatty acids.',
  model: '(i) Glucose is carried away by the **blood capillaries**. (ii) Fatty acids are taken up by the **lacteal**.',
  sol: 'Capillary; lacteal.',
  scheme: [['Capillary for glucose', 1], ['Lacteal for fatty acids', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('assim-short2', short({
  marks: 2,
  stem: 'State the fate of (i) extra glucose and (ii) amino acids after absorption.',
  model: '(i) Extra glucose is stored as **glycogen** in the liver and muscles. (ii) Amino acids are used to build **proteins** for growth and repair.',
  sol: 'Glycogen; proteins.',
  scheme: [['Glycogen', 1], ['Proteins for growth and repair', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('villi-short3', short({
  marks: 3,
  stem: 'State three ways in which villi are adapted for absorption.',
  model: '1. Millions of villi give a **large surface area**.\n2. Their wall is **one cell thick**, so food passes quickly.\n3. A network of **capillaries** and a **lacteal** carry the absorbed food away.',
  sol: 'Surface; thin wall; capillaries and lacteal.',
  scheme: [['Large surface area', 1], ['Wall one cell thick', 1], ['Capillaries and lacteal', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('assim-short3', short({
  marks: 3,
  stem: 'State what happens to the absorbed (i) glucose, (ii) amino acids and (iii) fatty acids and glycerol in the body.',
  model: '(i) **Glucose** is oxidised for **energy**, and extra is stored as glycogen. (ii) **Amino acids** build **proteins** for growth and repair. (iii) **Fatty acids and glycerol** are used for energy, for making **cell membranes** or stored as **fat**.',
  sol: 'Energy and glycogen; proteins; energy, membranes or stored fat.',
  scheme: [['Glucose', 1], ['Amino acids', 1], ['Fatty acids and glycerol', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('tooth-long', long({
  marks: 10, wl: null,
  stem: `Study the diagram of a tooth in section. Parts are lettered A to E.\n\n(a) Name the parts A, B and C. [3]\n\n(b) State one function each of the parts A and C. [2]\n\n(c) The tooth in the figure is a molar. Write how many molars an adult has in one half of the upper jaw and in the whole mouth, and show how the dental formula gives ${ADULT_TOTAL} teeth in all. [2]\n\n(d) Draw a neat, labelled diagram of the human alimentary canal, naming six parts. [3]`,
  model: `**(a)** A is the **enamel**, B is the **dentine** and C is the **pulp cavity**.\n\n**(b)** **Enamel** protects the crown from wear and acid. The **pulp cavity** holds the blood vessels and nerves that nourish the tooth and give the sense of pain.\n\n**(c)** **3** molars in one half of the upper jaw and **${MOUTH.m}** in the whole mouth. Teeth in one half jaw = 2 + 1 + 2 + 3 = 8; there are 4 half jaws, so 8 × 4 = **${ADULT_TOTAL}**.\n\n**(d)** A tube from the **mouth** through the **oesophagus**, **stomach**, **small intestine** and **large intestine** to the **anus**; six labels.`,
  sol: `Enamel, dentine, pulp cavity; functions; 3 and ${MOUTH.m}, ${ADULT_TOTAL} teeth; labelled alimentary canal.`,
  scheme: [['A enamel', 1], ['B dentine', 1], ['C pulp cavity', 1], ['Function of A', 1], ['Function of C', 1], ['Molars counted', 1], ['Total worked out', 1], ['Canal drawn in order', 1], ['Six labels', 2]],
  d: 3, c: 'application', t: [1],
  assets: [toothFig],
}), () => MOUTH.m === 12 || 'molars');
add('canal-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of the human digestive system. Organs are lettered A to E.\n\n(a) Name the organs A, B and C. [3]\n\n(b) Name the secretion made by B, the organ in which it is stored and the part of the canal that receives it. [2]\n\n(c) Name the organ D and name one enzyme in its juice with the food it acts on. [2]\n\n(d) Draw a neat, labelled diagram of the teeth in the right half of the upper jaw of an adult, naming the four types. [3]',
  model: '**(a)** A is a **salivary gland**, B is the **liver** and C is the **stomach**.\n\n**(b)** B makes **bile**; it is stored in the **gall bladder** and poured into the **duodenum**.\n\n**(c)** D is the **pancreas**. Its juice contains **amylase**, which acts on **starch** (or trypsin on proteins, or lipase on fats).\n\n**(d)** The right half of the upper jaw with **2 incisors, 1 canine, 2 premolars and 3 molars** in order from the front; each type labelled.',
  sol: 'Salivary gland, liver, stomach; bile, gall bladder, duodenum; pancreas, an enzyme; labelled half jaw.',
  scheme: [['A salivary gland', 1], ['B liver', 1], ['C stomach', 1], ['Bile', 1], ['Gall bladder and duodenum', 1], ['D pancreas', 1], ['Enzyme with food', 1], ['Eight teeth in correct order', 1], ['Four types labelled', 2]],
  d: 2, c: 'application', t: [2],
  assets: [digFig],
}));
add('saliva-long', long({
  marks: 10, wl: null,
  stem: `Four test tubes each hold 5 mL of starch solution. Tube P has 2 mL of saliva at ${EXPT2[0].temp} degrees, tube Q has 2 mL of saliva at ${EXPT2[1].temp} degrees, tube R has 2 mL of boiled and cooled saliva at ${EXPT2[0].temp} degrees and tube S has 2 mL of water at ${EXPT2[0].temp} degrees. A drop from each tube is tested with iodine every 2 minutes. The starch has gone from P after ${EXPT2[0].minutes} minutes and from Q after ${EXPT2[1].minutes} minutes. R and S still give a blue-black colour after 60 minutes.\n\n(a) Explain why tubes R and S still give a blue-black colour. [2]\n\n(b) Calculate how many times longer Q took than P and give the reason. [2]\n\n(c) Name the enzyme in saliva and the sugar formed from starch. [2]\n\n(d) Draw a neat, labelled diagram of tube P with the drop being tested on a tile, naming four parts. [4]`,
  model: `**(a)** In **R** the enzyme was **destroyed by boiling**, and in **S** there was **no enzyme** at all, so the starch was not changed.\n\n**(b)** ${EXPT2[1].minutes} ÷ ${EXPT2[0].minutes} = **${EXPT2_RATIO} times** longer. The enzyme works **more slowly at a lower temperature**; ${EXPT2[0].temp} degrees is close to body temperature.\n\n**(c)** **Salivary amylase**; the sugar is **maltose**.\n\n**(d)** A **test tube** holding **starch and saliva**, a **dropper** and a **tile with a drop of iodine**; four labels.`,
  sol: `R boiled, S no enzyme; ${EXPT2_RATIO} times slower in the cold; amylase, maltose; labelled set-up.`,
  scheme: [['R: enzyme destroyed by boiling', 1], ['S: no enzyme', 1], [`${EXPT2_RATIO} times`, 1], ['Enzyme slower at lower temperature', 1], ['Salivary amylase', 1], ['Maltose', 1], ['Set-up drawn', 2], ['Four labels', 2]],
  d: 3, c: 'analysis', t: [3],
}), () => EXPT2_RATIO === 2 || 'ratio');
add('villi-long', long({
  marks: 10, wl: null,
  stem: `A patch of the wall of the small intestine is ${PATCH2.l} mm by ${PATCH2.w} mm. There are ${PATCH2.density} villi on each square millimetre and each villus adds ${PATCH2.add} square millimetre of surface.\n\n(a) Calculate the number of villi on the patch. [2]\n\n(b) Calculate the total absorbing area of the patch and how many times larger it is than the flat area. [3]\n\n(c) State why the wall of a villus is only one cell thick. [1]\n\n(d) Draw a neat, labelled diagram of a villus, naming four parts. [4]`,
  model: `**(a)** Flat area = ${PATCH2.l} × ${PATCH2.w} = ${P2_AREA} square millimetres; villi = ${P2_AREA} × ${PATCH2.density} = **${P2_VILLI}**.\n\n**(b)** Extra area = ${P2_VILLI} × ${PATCH2.add} = ${P2_EXTRA}; total = ${P2_AREA} + ${P2_EXTRA} = **${P2_TOTAL} square millimetres**, which is ${P2_TOTAL} ÷ ${P2_AREA} = **${P2_RATIO} times** the flat area.\n\n**(c)** A **thin wall** gives the digested food a **short path** to pass through quickly into the blood or lymph.\n\n**(d)** A **finger-shaped villus** with **epithelium**, a **capillary network**, a **lacteal** and the **intestinal wall** below; four labels.`,
  sol: `${P2_VILLI} villi; ${P2_TOTAL} square millimetres, ${P2_RATIO} times; thin wall gives a short path; labelled villus.`,
  scheme: [['Flat area', 1], [`${P2_VILLI} villi`, 1], ['Extra area', 1], [`${P2_TOTAL} square millimetres`, 1], [`${P2_RATIO} times`, 1], ['Thin wall gives a short path', 1], ['Villus drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [4],
}), () => P2_VILLI === 600 && P2_RATIO === 9 || 'villi');
add('meal-long', long({
  marks: 10, wl: null,
  stem: 'Ravi eats a meal of boiled rice, dal and a little butter.\n\n(a) Name the type of teeth that bite off a piece of food and the type that grind the rice. [2]\n\n(b) Name the enzyme in his mouth that acts on the rice and the sugar that it forms. [2]\n\n(c) Name the enzyme that begins the digestion of the dal in the stomach and the medium it needs. [2]\n\n(d) Draw a neat, labelled diagram of a tooth in section, naming four parts. [4]',
  model: '**(a)** **Incisors** bite off a piece; **molars** (and premolars) grind the rice.\n\n**(b)** **Salivary amylase**; it forms **maltose** from starch.\n\n**(c)** **Pepsin** begins protein digestion; it needs an **acidic** medium, provided by **hydrochloric acid**.\n\n**(d)** A tooth with **crown, neck and root**, an **enamel** cap, **dentine**, a central **pulp cavity** and **cement** round the root, with four labels.',
  sol: 'Incisors, molars; amylase, maltose; pepsin, acid; labelled tooth.',
  scheme: [['Incisors', 1], ['Molars or premolars', 1], ['Salivary amylase', 1], ['Maltose', 1], ['Pepsin', 1], ['Acidic medium', 1], ['Tooth drawn in section', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [1, 3],
}));
add('gall-long', long({
  marks: 10, wl: null,
  stem: 'A man has had his gall bladder removed. His liver and pancreas work normally. His doctor tells him to avoid very oily food.\n\n(a) Name the juice that was stored in the gall bladder and the organ that makes it. [2]\n\n(b) Explain why very oily food would cause the man discomfort. [2]\n\n(c) Name the juice from another gland that also digests fats, the enzyme in it and the end products. [3]\n\n(d) Draw a neat, labelled diagram of a villus of the small intestine, naming three parts. [3]',
  model: '**(a)** **Bile**, made by the **liver**.\n\n**(b)** Without the gall bladder, bile is not **stored and released in a large amount** when a heavy fatty meal arrives, so the fat is **not emulsified well** and **lipase** cannot digest it fully; the fat stays undigested and causes discomfort.\n\n**(c)** **Pancreatic juice** from the pancreas; the enzyme is **lipase**; the end products are **fatty acids and glycerol**.\n\n**(d)** A **finger-shaped villus** with its **epithelium**, **capillary network** and **lacteal**; three labels.',
  sol: 'Bile, liver; less emulsification; pancreatic juice, lipase, fatty acids and glycerol; labelled diagram.',
  scheme: [['Bile', 1], ['Liver', 1], ['Bile not stored or released in quantity', 1], ['Fat not emulsified so lipase acts poorly', 1], ['Pancreatic juice', 1], ['Lipase', 1], ['Fatty acids and glycerol', 1], ['Villus drawn', 1], ['Three labels', 2]],
  d: 4, c: 'evaluation', t: [2, 3],
}));
