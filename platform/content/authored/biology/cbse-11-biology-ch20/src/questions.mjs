// ch20 Digestion and Absorption — question bank. AR keys: a b c d a.
import { mk, add, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { HALF_JAW, PER_HALF, TOTAL_TEETH, MOLARS, MOLAR_PCT, PHYS, GROSS, MEAL, MEAL_PHYS, MEAL_GROSS, MEAL_KJ, KJ_PER_KCAL, STARCH, MOUTH_STARCH_PCT, PH, FOLD_STOMACH_INTESTINE, SURFACE, PEM, WISDOM_REMOVED, TEETH_LEFT, round } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 alimentary canal and glands
add('thecodont-mcq', mcq({
  stem: 'Each human tooth is fixed in a socket of the jaw bone. This type of attachment is described as',
  right: 'thecodont',
  wrong: ['diphyodont', 'heterodont', 'homodont'],
  sol: 'Teeth embedded in sockets of the jaw bone are thecodont — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('diphyodont-mcq', mcq({
  stem: 'A seven-year-old loses a front tooth, and a few months later a larger tooth grows in its place. Which term describes this feature of human dentition?',
  right: 'Diphyodont: a temporary set of milk teeth is replaced by permanent teeth',
  wrong: ['Thecodont: teeth are set in sockets of the jaw', 'Heterodont: teeth are of different types', 'Homodont: all teeth are alike'],
  sol: 'Forming two sets of teeth, deciduous then permanent, is diphyodont dentition — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('formula-mcq', mcq({
  stem: 'A dentist’s chart of an adult shows, in each half of each jaw from the front, two incisors, one canine, two premolars and three molars. Which dental formula is this?',
  right: '2123/2123',
  wrong: ['2133/2133', '1223/1223', '2102/2102'],
  sol: 'The order is I, C, PM, M: 2, 1, 2, 3 in each half of the upper and lower jaw, written 2123/2123 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('epiglottis-mcq', mcq({
  stem: 'During swallowing, food does not enter the windpipe because',
  right: 'the epiglottis, a cartilaginous flap, closes the glottis',
  wrong: ['the gastro-oesophageal sphincter closes the pharynx', 'the tongue blocks the oesophagus', 'the trachea does not open into the pharynx'],
  sol: 'The epiglottis prevents the entry of food into the glottis (opening of the windpipe) during swallowing — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('layers-mcq', mcq({
  stem: 'In a slide of the ileum wall, a student sees a layer of loose connective tissue with nerves, blood vessels and lymph vessels, lying between the muscle layers and the innermost lining. This layer is the',
  right: 'sub-mucosa',
  wrong: ['serosa', 'muscularis', 'mucosa'],
  sol: 'The sub-mucosa is loose connective tissue containing nerves, blood and lymph vessels, between the muscularis and the mucosa — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('villi-mcq', mcq({
  stem: 'What do the microvilli on the cells lining the intestinal villi mainly do?',
  right: 'They enormously increase the surface area and give a brush border appearance.',
  wrong: ['They secrete hydrochloric acid into the lumen.', 'They store bile between meals.', 'They carry chylomicrons to the liver.'],
  sol: 'Microvilli give a brush border appearance and, with villi, increase the surface area enormously — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('bile-mcq', mcq({
  stem: 'Bile contains no digestive enzymes. How does it still help in the digestion of fats?',
  right: 'Its bile salts emulsify fats into very small micelles, and it activates lipases.',
  wrong: ['It converts fats directly into glycerol and fatty acids.', 'It makes the duodenum strongly acidic for lipase.', 'It carries fats from the liver to the gall bladder.'],
  sol: 'Bile emulsifies fats, breaking them into very small micelles, and also activates lipases — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('oddi-mcq', mcq({
  stem: 'A stone lodges in the common hepato-pancreatic duct just above the sphincter of Oddi. Which secretions are prevented from reaching the duodenum?',
  right: 'Both bile and pancreatic juice',
  wrong: ['Only bile', 'Only pancreatic juice', 'Only intestinal juice'],
  sol: 'The bile duct and the pancreatic duct open together into the duodenum as the common hepato-pancreatic duct, so a block there stops both — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('lysozyme-mcq', mcq({
  stem: 'Which component of saliva acts as an antibacterial agent that helps prevent infections in the mouth?',
  right: 'Lysozyme',
  wrong: ['Salivary amylase', 'Mucus', 'Bicarbonate ions'],
  sol: 'Lysozyme in saliva is antibacterial — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('b12-mcq', mcq({
  stem: 'After surgery that removed most of his stomach, a patient develops a deficiency of vitamin B12 even though his diet is unchanged. The best explanation is the loss of',
  right: 'intrinsic factor from the parietal (oxyntic) cells',
  wrong: ['pepsinogen from the chief (peptic) cells', 'mucus from the mucus neck cells', 'rennin from the gastric glands'],
  sol: 'Parietal or oxyntic cells secrete HCl and intrinsic factor, which is essential for the absorption of vitamin B12 — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('rennin-mcq', mcq({
  stem: 'A two-month-old baby feeds only on milk. Which enzyme in the baby’s gastric juice especially helps to digest milk proteins?',
  right: 'Rennin',
  wrong: ['Maltase', 'Lysozyme', 'Enterokinase'],
  sol: 'Rennin is a proteolytic enzyme found in the gastric juice of infants which helps in the digestion of milk proteins — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('enterokinase-mcq', mcq({
  stem: 'A child is born unable to make enterokinase. Why would the digestion of proteins in the small intestine be badly affected?',
  right: 'Trypsinogen would not be activated to trypsin, and trypsin is needed to activate the other pancreatic proenzymes.',
  wrong: ['Pepsin would not be formed in the stomach.', 'Bile would not be released by the gall bladder.', 'Dipeptidases would digest the intestinal wall.'],
  sol: 'Enterokinase from the intestinal mucosa activates trypsinogen to trypsin, which in turn activates the other enzymes of pancreatic juice — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('lactose-mcq', mcq({
  stem: 'The products formed when lactase in succus entericus acts on lactose are',
  right: 'glucose and galactose',
  wrong: ['glucose and fructose', 'glucose and glucose', 'fatty acids and glycerol'],
  sol: 'Lactose is hydrolysed by lactase into glucose and galactose — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('alkaline-mcq', mcq({
  stem: 'Chyme leaving the stomach is very acidic, yet intestinal enzymes work at about pH 7.8. What creates this alkaline medium in the intestine?',
  right: 'Bicarbonates from the pancreas with mucus, helped by the sub-mucosal (Brunner’s) glands',
  wrong: ['Hydrochloric acid from the parietal cells', 'Lysozyme from the salivary glands', 'Bile pigments from the gall bladder'],
  sol: 'Mucus along with bicarbonates from the pancreas protects the intestinal mucosa from acid and provides an alkaline medium (pH 7.8); Brunner’s glands also help — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('fructose-mcq', mcq({
  stem: 'Fructose and some amino acids are absorbed with the help of carrier ions such as sodium ions. This mechanism is called',
  right: 'facilitated transport',
  wrong: ['simple diffusion', 'osmosis', 'egestion'],
  sol: 'Absorption with the help of carrier ions like sodium ions is facilitated transport — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('chylomicron-mcq', mcq({
  stem: 'A student traces a drop of dietary fat after it has been digested to fatty acids and glycerol. Which sequence is correct?',
  right: 'Micelles → intestinal mucosa → chylomicrons → lacteals → blood',
  wrong: ['Chylomicrons → blood capillaries of villi → micelles → lacteals', 'Micelles → blood capillaries directly → liver → lacteals', 'Glycerol → stomach wall → chylomicrons → bile'],
  sol: 'Insoluble fatty acids and glycerol form micelles, enter the mucosa, are re-formed into protein-coated chylomicrons, enter lacteals and finally reach the blood — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('largeint-mcq', mcq({
  stem: 'After part of his colon is removed, a patient’s faeces become more watery than before. Which function of the large intestine has been reduced?',
  right: 'Absorption of water and some minerals',
  wrong: ['Digestion of proteins by trypsin', 'Emulsification of fats', 'Secretion of salivary amylase'],
  sol: 'The large intestine absorbs some water, minerals and certain drugs; no significant digestion occurs there — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('stomachabs-mcq', mcq({
  stem: 'Which of these is absorbed in the stomach?',
  right: 'Water, simple sugars and alcohol',
  wrong: ['Fatty acids through lacteals', 'Most amino acids from digested proteins', 'Bile salts from the liver'],
  sol: 'Absorption of water, simple sugars and alcohol occurs in the stomach — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('defaecation-mcq', mcq({
  stem: 'Which statement about defaecation is correct?',
  right: 'It is a voluntary process carried out by a mass peristaltic movement.',
  wrong: ['It is an involuntary reflex that cannot be controlled.', 'It is controlled by the vomit centre in the medulla.', 'It is the absorption of water from faeces in the rectum.'],
  sol: 'Faeces in the rectum start a neural reflex causing the urge; their egestion through the anus is a voluntary process carried out by a mass peristaltic movement — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 disorders
add('jaundice-mcq', mcq({
  stem: 'A man recovering from a liver infection notices that the whites of his eyes and his skin have turned yellow. The yellow colour is due to',
  right: 'deposits of bile pigments, as in jaundice',
  wrong: ['excess melanin in the skin', 'loss of red blood cells in diarrhoea', 'excess carotene from the diet in indigestion'],
  sol: 'In jaundice the liver is affected and the skin and eyes turn yellow due to the deposit of bile pigments — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('vomit-mcq', mcq({
  stem: 'Vomiting, the ejection of stomach contents through the mouth, is a reflex controlled by',
  right: 'the vomit centre in the medulla',
  wrong: ['the hypothalamus', 'the sphincter of Oddi', 'the cerebellum'],
  sol: 'Vomiting is a reflex action controlled by the vomit centre in the medulla; nausea usually comes first — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('diarrhoea-mcq', mcq({
  stem: 'A toddler has had frequent, watery stools for three days and has lost weight. Apart from the loss of water, why is she losing weight?',
  right: 'Diarrhoea reduces the absorption of food.',
  wrong: ['Diarrhoea stops the secretion of saliva.', 'Diarrhoea makes the liver store more glycogen.', 'Diarrhoea increases the digestion of fats.'],
  sol: 'Diarrhoea is abnormally frequent bowel movement with more liquid faeces, and it reduces the absorption of food — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('constipation-mcq', mcq({
  stem: 'A condition in which faeces are retained in the rectum because bowel movements occur irregularly is called',
  right: 'constipation',
  wrong: ['diarrhoea', 'indigestion', 'jaundice'],
  sol: 'Retention of faeces in the rectum from irregular bowel movements is constipation — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('indigestion-mcq', mcq({
  stem: 'After a late-night wedding feast of rich, spicy food, a guest feels uncomfortably full for hours. Which disorder and cause does this best fit?',
  right: 'Indigestion, from over-eating and spicy food',
  wrong: ['Jaundice, from deposits of bile pigments', 'Marasmus, from lack of proteins and calories', 'Constipation, from a vomit reflex'],
  sol: 'In indigestion food is not properly digested, giving a feeling of fullness; causes include inadequate enzymes, anxiety, food poisoning, over-eating and spicy food — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('kwash-mcq', mcq({
  stem: 'A two-year-old was weaned early onto a diet of rice water and sugar, which gives enough calories but little protein. He now has swollen legs and belly, thin limbs and poor growth. The condition is',
  right: 'kwashiorkor',
  wrong: ['marasmus', 'jaundice', 'constipation'],
  sol: 'Kwashiorkor is protein deficiency with an adequate calorie intake; oedema and swelling, wasting of muscles and thin limbs are typical — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('marasmus-mcq', mcq({
  stem: 'An eight-month-old whose mother’s milk was replaced too early by watery cereal that is poor in both protein and calories becomes extremely thin, with dry, wrinkled skin and no swelling. The condition is',
  right: 'marasmus',
  wrong: ['kwashiorkor', 'indigestion', 'diarrhoea'],
  sol: 'Marasmus is a simultaneous deficiency of proteins and calories, usually in infants under a year: extreme emaciation, thin limbs and dry, thin, wrinkled skin — option (@K).',
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- assertion-reason
add('mucus-ar', ar({
  a: 'The lining of the stomach is not damaged by the highly concentrated hydrochloric acid of gastric juice.',
  r: 'Mucus and bicarbonates in gastric juice lubricate and protect the mucosal epithelium from excoriation by the acid.',
  key: 'a',
  sol: 'Both are true, and the protective mucus and bicarbonates explain A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('teeth-ar', ar({
  a: 'Human beings are diphyodont.',
  r: 'The hard chewing surface of human teeth is made of enamel.',
  key: 'b',
  sol: 'Both are true, but having two sets of teeth (milk and permanent) is not explained by the enamel of the chewing surface — option (b).',
  d: 2, c: 'analysis', t: [1],
}));
add('fat-ar', ar({
  a: 'Fatty acids and glycerol are first taken into lacteals rather than directly into the blood.',
  r: 'Fatty acids and glycerol are highly soluble in water.',
  key: 'c',
  sol: 'A is true. R is false: they are insoluble, so they are carried as micelles and then chylomicrons into the lymph vessels (lacteals) — option (c).',
  d: 3, c: 'understanding', t: [1],
}));
add('colon-ar', ar({
  a: 'Most of the digestion of proteins takes place in the large intestine.',
  r: 'No significant digestive activity occurs in the large intestine.',
  key: 'd',
  sol: 'A is false: proteins are digested in the stomach and small intestine. R is true — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('villi-ar', ar({
  a: 'The small intestine is the principal organ for the absorption of nutrients.',
  r: 'Digestion is completed in the small intestine, and its villi and microvilli give it an enormous absorptive surface.',
  key: 'a',
  sol: 'Both are true, and R explains why absorption is concentrated in the small intestine — option (a).',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- tf, fill, match
add('bile-tf', tf({
  stem: 'Bile contains lipases that digest fats in the duodenum.',
  key: 'f',
  sol: 'False. Bile contains bile pigments, bile salts, cholesterol and phospholipids but no enzymes; it emulsifies fats and activates lipases.',
  d: 2, c: 'understanding', t: [1],
}));
add('stomach-tf', tf({
  stem: 'Food is stored in the stomach for about four to five hours.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [1],
}));
add('appendix-tf', tf({
  stem: 'The vermiform appendix is a narrow tubular projection that arises from the caecum.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [1],
}));
add('pyloric-fill', fill({
  stem: 'The opening of the stomach into the duodenum is guarded by the ______ sphincter.',
  acc: [['pyloric']],
  sol: 'Pyloric.',
  d: 1, c: 'recall', t: [1],
}));
add('glisson-fill', fill({
  stem: 'Each hepatic lobule of the liver is covered by a thin connective tissue sheath called ______ capsule.',
  acc: [["Glisson's", 'Glisson’s', 'Glisson']],
  sol: 'Glisson’s capsule (Glisson).',
  d: 2, c: 'recall', t: [1],
}));
add('ph-fill', fill({
  stem: 'Hydrochloric acid gives the stomach a pH of about ______, which is optimal for pepsin.',
  acc: [[String(PH.stomach)]],
  sol: `${PH.stomach}.`,
  d: 2, c: 'recall', t: [1],
}));
add('enzyme-match', match({
  stem: 'Match each enzyme (column I) with the change it brings about (column II).',
  pairs: [
    ['Salivary amylase', 'Starch to maltose'],
    ['Pepsin', 'Proteins to proteoses and peptones'],
    ['Nucleases', 'Nucleic acids to nucleotides'],
    ['Dipeptidases', 'Dipeptides to amino acids'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Salivary amylase: starch to maltose; pepsin: proteins to proteoses and peptones; nucleases: nucleic acids to nucleotides; dipeptidases: dipeptides to amino acids.',
  d: 1, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- numericals
add('teeth-num', num({
  stem: `The dental formula of an adult human is ${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M}/${HALF_JAW.I}${HALF_JAW.C}${HALF_JAW.PM}${HALF_JAW.M}. Using it, work out the total number of permanent teeth.`,
  value: TOTAL_TEETH,
  sol: r`Each half jaw: $${HALF_JAW.I} + ${HALF_JAW.C} + ${HALF_JAW.PM} + ${HALF_JAW.M} = ${PER_HALF}$; four half jaws: $${PER_HALF} \times 4 = ${TOTAL_TEETH}$ teeth.`,
  scheme: [[`${TOTAL_TEETH}`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 32 || 'value');
add('snack-num', num({
  stem: `A snack contains ${MEAL.carb} g of carbohydrate, ${MEAL.protein} g of protein and ${MEAL.fat} g of fat. Using physiological fuel values of ${PHYS.carb}, ${PHYS.protein} and ${PHYS.fat} kcal per g respectively, how much energy does it provide, in kcal?`,
  value: MEAL_PHYS, unit: 'kcal',
  sol: r`$${MEAL.carb} \times ${PHYS.carb} + ${MEAL.protein} \times ${PHYS.protein} + ${MEAL.fat} \times ${PHYS.fat} = ${MEAL.carb * PHYS.carb} + ${MEAL.protein * PHYS.protein} + ${MEAL.fat * PHYS.fat} = ${MEAL_PHYS}$ kcal.`,
  scheme: [[`${MEAL_PHYS} kcal`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 390 || 'value');
add('gross-num', num({
  stem: `The same snack (${MEAL.carb} g carbohydrate, ${MEAL.protein} g protein, ${MEAL.fat} g fat) is burnt in a bomb calorimeter. Using gross calorific values of ${GROSS.carb}, ${GROSS.protein} and ${GROSS.fat} kcal per g, what energy is released, in kcal? (Two decimal places.)`,
  value: MEAL_GROSS, tol: 0.01, unit: 'kcal',
  sol: r`$${MEAL.carb} \times ${GROSS.carb} + ${MEAL.protein} \times ${GROSS.protein} + ${MEAL.fat} \times ${GROSS.fat} = 246 + 84.75 + 94.5 = ${MEAL_GROSS}$ kcal, more than the physiological value because the body does not release all of this energy.`,
  scheme: [[`${MEAL_GROSS} kcal`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 425.25 || 'value');
add('phfold-num', num({
  stem: `Gastric juice has a pH of about ${PH.stomach} and the intestinal medium about ${PH.intestine}. Each unit fall in pH means ten times more hydrogen ions. How many times more hydrogen ions per litre does gastric juice contain than the intestinal medium?`,
  value: FOLD_STOMACH_INTESTINE,
  sol: r`Difference $= ${PH.intestine} - ${PH.stomach} = 6$ units, so $10^{6} = 1000000$ times. This is why chyme must be neutralised by bicarbonates before intestinal enzymes can work.`,
  scheme: [['Six pH units', 0.5], ['1000000 times', 0.5]],
  d: 4, c: 'application', t: [1],
}), (q) => q.answer.value === 1e6 || 'value');
add('starch-num', num({
  stem: `About ${MOUTH_STARCH_PCT} percent of the starch in food is hydrolysed in the mouth by salivary amylase. If a meal contains ${STARCH.eaten} g of starch, about how many grams are hydrolysed before the food is swallowed?`,
  value: STARCH.mouth, unit: 'g',
  sol: r`$${STARCH.eaten} \times \dfrac{${MOUTH_STARCH_PCT}}{100} = ${STARCH.mouth}$ g; the remaining ${STARCH.left} g is digested later by pancreatic amylase.`,
  scheme: [[`${STARCH.mouth} g`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 15 || 'value');
add('surface-num', num({
  stem: `In a simple model of the small intestine, circular folds multiply the inner surface by ${SURFACE.folds}, villi multiply it by a further ${SURFACE.villi}, and microvilli by a further ${SURFACE.microvilli}. By what factor do these three together increase the absorptive surface? (Illustrative values; estimates vary.)`,
  value: SURFACE.total,
  sol: r`$${SURFACE.folds} \times ${SURFACE.villi} \times ${SURFACE.microvilli} = ${SURFACE.total}$ times.`,
  scheme: [[`${SURFACE.total}`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 600 || 'value');

// ---------------------------------------------------------------- short answers
add('heterodont-short', short({
  marks: 2,
  stem: 'What is meant by heterodont dentition? Name the four types of human teeth and write the adult dental formula.',
  model: 'Heterodont dentition has **teeth of different types** for different jobs. An adult human has **32 permanent teeth** of four types: **incisors (I), canines (C), premolars (PM) and molars (M)**. The dental formula, for each half of the upper over the lower jaw, is **2123/2123**.',
  sol: 'Definition, types, formula.',
  scheme: [['Heterodont defined; four types', 1], ['Formula 2123/2123', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('choke-short', short({
  marks: 2,
  stem: 'Children are told not to laugh or talk while swallowing. Explain the danger, and describe how food normally passes from the pharynx to the stomach.',
  model: 'The pharynx is a **common passage for food and air**. During swallowing the **epiglottis** closes the glottis; talking or laughing can open it, letting food enter the **windpipe** and cause choking. Normally the bolus is swallowed (**deglutition**) and moved down the oesophagus by **peristalsis**, through the **gastro-oesophageal sphincter** into the stomach.',
  sol: 'Epiglottis; deglutition and peristalsis.',
  scheme: [['Common passage; epiglottis', 1], ['Deglutition, peristalsis, sphincter', 1]],
  d: 2, c: 'application', t: [1],
}));
add('gastric-short', short({
  marks: 2,
  stem: 'Name the three major types of cells in the gastric glands and the secretion of each.',
  model: '**Mucus neck cells** secrete **mucus**. **Peptic or chief cells** secrete the proenzyme **pepsinogen**. **Parietal or oxyntic cells** secrete **hydrochloric acid** and **intrinsic factor**, which is essential for the absorption of vitamin B12.',
  sol: 'Three cell types and secretions.',
  scheme: [['Mucus neck and chief cells with secretions', 1], ['Parietal cells: HCl and intrinsic factor', 1]],
  d: 2, c: 'recall', t: [1],
}));
add('trypsin-short', short({
  marks: 2,
  stem: 'Pancreatic juice contains trypsinogen, not active trypsin. Explain how trypsin is formed in the duodenum and suggest why releasing the inactive form is useful.',
  model: '**Enterokinase**, secreted by the intestinal mucosa, converts trypsinogen into active **trypsin**, which then **activates the other proenzymes** of pancreatic juice. Releasing an inactive form means the protein-digesting enzyme **cannot digest the pancreas and its duct** before it reaches the intestine.',
  sol: 'Enterokinase; protection.',
  scheme: [['Enterokinase activates; trypsin activates others', 1], ['Protects the pancreas', 1]],
  d: 3, c: 'application', t: [1],
}));
add('bile-short', short({
  marks: 2,
  stem: 'A patient whose gall bladder has been removed is advised to eat small, low-fat meals. Explain this advice using the role of bile.',
  model: 'Bile is made by the liver and normally **stored and concentrated in the gall bladder**, then released when food arrives. Bile salts **emulsify fats into micelles** and bile **activates lipases**. Without stored bile, a large fatty meal cannot be **emulsified** well, so small, low-fat meals are easier to digest.',
  sol: 'Storage and emulsification.',
  scheme: [['Gall bladder stores and concentrates bile', 1], ['Emulsification and lipase activation', 1]],
  d: 2, c: 'application', t: [1],
}));
add('largeint-short', short({
  marks: 2,
  stem: 'State the functions of the large intestine, and name the valve through which material enters it.',
  model: 'No significant digestion occurs in the large intestine. It **absorbs some water, minerals and certain drugs**, and **secretes mucus**, which sticks waste particles together and **lubricates** them for easy passage. Material enters the caecum through the **ileo-caecal valve**, which prevents back flow.',
  sol: 'Functions and valve.',
  scheme: [['Absorption and mucus', 1], ['Ileo-caecal valve', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('yellow-short', short({
  marks: 2,
  stem: 'A teenager’s skin and eyes turn yellow after a viral infection. Name the disorder and the organ affected, and explain the yellow colour.',
  model: 'The disorder is **jaundice**, in which the **liver** is affected. Bile pigments such as **bilirubin**, made from the breakdown of haemoglobin and normally sent out in bile, **accumulate in the blood** and are **deposited in the skin and eyes**, turning them yellow.',
  sol: 'Jaundice; liver; bile pigments.',
  scheme: [['Jaundice; liver', 1], ['Deposited bile pigments', 1]],
  d: 2, c: 'application', t: [2],
}));
add('diaconst-short', short({
  marks: 2,
  stem: 'Distinguish between diarrhoea and constipation.',
  model: '**Diarrhoea:** abnormal **frequency of bowel movement** with **increased liquidity** of faeces; it reduces the **absorption of food** and causes loss of water.\n\n**Constipation:** faeces are **retained in the rectum** because bowel movements occur **irregularly**.',
  sol: 'Two definitions.',
  scheme: [['Diarrhoea', 1], ['Constipation', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('wall-short', short({
  marks: 3,
  stem: 'Describe the four layers of the wall of the alimentary canal from the outside inwards.',
  model: '**Serosa:** the outermost layer, a thin **mesothelium** with some connective tissue.\n\n**Muscularis:** smooth muscle, usually an **inner circular** and an **outer longitudinal** layer; an oblique layer in some regions.\n\n**Sub-mucosa:** loose connective tissue with **nerves, blood and lymph vessels**; glands in the duodenum.\n\n**Mucosa:** lines the lumen; forms **rugae** in the stomach and **villi** in the small intestine; has **goblet cells** and forms glands.',
  sol: 'Four layers.',
  scheme: [['Serosa and muscularis', 1.5], ['Sub-mucosa and mucosa', 1.5]],
  d: 2, c: 'understanding', t: [1],
}));
add('bread-short', short({
  marks: 3,
  stem: 'A student chews a piece of plain bread for three minutes without swallowing and notices that it starts to taste slightly sweet. Explain this, describing both the mechanical and the chemical digestion in the mouth.',
  model: '**Mechanical:** the **teeth and tongue** masticate the bread and mix it with saliva; **mucus** lubricates the particles and helps form a **bolus**.\n\n**Chemical:** saliva contains **salivary amylase**, which at about **pH 6.8** hydrolyses starch into the disaccharide **maltose**; about **30 percent** of starch is digested in the mouth. Maltose tastes sweet. Saliva also has **lysozyme**, an antibacterial agent.',
  sol: 'Mastication and amylase.',
  scheme: [['Mastication and bolus', 1], ['Amylase, pH, maltose', 1.5], ['Link to sweetness', 0.5]],
  d: 2, c: 'application', t: [1],
}));
add('absorb-short', short({
  marks: 3,
  stem: 'State how each of these is absorbed and justify your answer: (i) glucose against its concentration gradient; (ii) fructose; (iii) water.',
  model: '(i) **Active transport**: moving glucose **against a concentration gradient** needs **energy**; amino acids and sodium ions are also absorbed this way.\n\n(ii) **Facilitated transport**: fructose, and some amino acids, are absorbed with the help of **carrier ions such as sodium ions**.\n\n(iii) **Passive transport**: water moves according to the **osmotic gradient**, without energy.',
  sol: 'Mechanism with reason for each.',
  scheme: [['(i) Active transport, energy', 1], ['(ii) Facilitated transport, carrier ions', 1], ['(iii) Osmotic gradient', 1]],
  d: 2, c: 'application', t: [1],
}));
add('fatpath-short', short({
  marks: 3,
  stem: 'Trace the path of digested fat from the lumen of the small intestine to the blood, explaining why it does not enter blood capillaries directly.',
  model: 'Lipases, helped by bile, break fats into **fatty acids and glycerol**. Being **insoluble**, these cannot be absorbed into the blood directly. They are packed into small droplets called **micelles**, which move into the **intestinal mucosa**. There they are re-formed into tiny **protein-coated fat globules, chylomicrons**, which pass into the **lacteals** of the villi. The lymph vessels finally release them into the **blood stream**.',
  sol: 'Micelles, chylomicrons, lacteals.',
  scheme: [['Insoluble; micelles', 1], ['Chylomicrons in mucosa', 1], ['Lacteals, then blood', 1]],
  d: 3, c: 'application', t: [1],
}));
add('glands-short', short({
  marks: 3,
  stem: 'Name the three main digestive glands and give the location and secretion of each.',
  model: '**Salivary glands:** three pairs — **parotids** (cheek), **sub-maxillary or sub-mandibular** (lower jaw) and **sub-linguals** (below the tongue) — secrete **saliva**.\n\n**Liver:** the largest gland, about **1.2–1.5 kg**, below the diaphragm; its hepatic cells secrete **bile**, stored in the gall bladder.\n\n**Pancreas:** between the limbs of the C-shaped duodenum; secretes alkaline **pancreatic juice** (and the hormones insulin and glucagon).',
  sol: 'Three glands.',
  scheme: [['Salivary glands', 1], ['Liver', 1], ['Pancreas', 1]],
  d: 2, c: 'recall', t: [1],
}));
add('upset-short', short({
  marks: 3,
  stem: 'After drinking contaminated water at a fair, a boy has repeated vomiting and watery stools. Explain each of these disorders, and why he soon feels weak and dehydrated.',
  model: '**Vomiting** is the ejection of stomach contents through the mouth, a **reflex** controlled by the **vomit centre in the medulla**, usually preceded by **nausea**. **Diarrhoea** is an abnormal frequency of bowel movement with **more liquid faeces**; such inflammation of the intestinal tract is often due to **bacterial or viral infection**. Both cause **loss of water and salts**, and diarrhoea **reduces the absorption of food**, so he becomes dehydrated and weak.',
  sol: 'Vomiting, diarrhoea, consequences.',
  scheme: [['Vomiting: reflex, medulla', 1], ['Diarrhoea and infection', 1], ['Water loss, poor absorption', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- long answers
add('canal-long', long({
  stem: 'Describe the human alimentary canal from the mouth to the anus, naming the regions of the stomach and of the small and large intestines, and describe the general structure of its wall.',
  model: '**Mouth and pharynx.** The mouth leads to the **buccal cavity**, with **32 thecodont, diphyodont and heterodont teeth** (dental formula 2123/2123) and a muscular **tongue**, attached to the floor by the **frenulum** and bearing papillae, some with taste buds. The short **pharynx** is a common passage for food and air; the **epiglottis** guards the glottis.\n\n**Oesophagus and stomach.** The thin, long **oesophagus** passes through the neck, thorax and diaphragm to the **J-shaped stomach**, guarded by the gastro-oesophageal sphincter. The stomach, in the upper left abdomen, has a **cardiac** portion, a **fundic** region and a **pyloric** portion.\n\n**Small intestine.** The pyloric sphincter opens into the **C-shaped duodenum**, followed by the long coiled **jejunum** and the highly coiled **ileum**.\n\n**Large intestine.** The ileum opens into the **caecum**, a blind sac with symbiotic micro-organisms, from which the **vermiform appendix** arises; then the **colon** (ascending, transverse, descending and sigmoid) and the **rectum**, which opens at the **anus**.\n\n**Wall.** From oesophagus to rectum there are four layers: **serosa** (mesothelium), **muscularis** (inner circular and outer longitudinal smooth muscle), **sub-mucosa** (loose connective tissue with nerves, blood and lymph vessels) and **mucosa**, which forms rugae in the stomach and villi with microvilli in the small intestine.',
  sol: 'Regions and wall.',
  scheme: [['Mouth, teeth, pharynx', 1], ['Oesophagus and stomach regions', 1], ['Small intestine regions', 1], ['Large intestine regions', 1], ['Four wall layers', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('glands-long', long({
  stem: 'Describe the salivary glands, liver and pancreas: their position, structure where relevant, secretions, and how the secretions of the liver and pancreas reach the duodenum.',
  model: '**Salivary glands.** Three pairs produce most of the saliva: the **parotids** in the cheeks, the **sub-maxillary (sub-mandibular)** glands in the lower jaw and the **sub-linguals** below the tongue. Saliva contains electrolytes, **salivary amylase**, **lysozyme** and mucus.\n\n**Liver.** The largest gland, about **1.2 to 1.5 kg** in an adult, lies just below the diaphragm and has **two lobes**. Its structural and functional units are **hepatic lobules**, with hepatic cells in cords, each lobule covered by **Glisson’s capsule**. Hepatic cells secrete **bile**, which passes through the **hepatic ducts** and is stored and concentrated in the **gall bladder**. The **cystic duct** joins the hepatic duct to form the **common bile duct**.\n\n**Pancreas.** A compound, elongated organ between the limbs of the C-shaped duodenum. Its **exocrine** part secretes alkaline **pancreatic juice** containing enzymes; its **endocrine** part secretes **insulin and glucagon**.\n\n**Route to the duodenum.** The bile duct and the **pancreatic duct** open together into the duodenum as the **common hepato-pancreatic duct**, guarded by the **sphincter of Oddi**.',
  sol: 'Three glands and the duct system.',
  scheme: [['Salivary glands', 1], ['Liver structure and bile', 1.5], ['Pancreas', 1], ['Ducts and sphincter of Oddi', 1.5]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('digestion-long', long({
  stem: 'Describe the digestion of carbohydrates, proteins and fats as food passes through the alimentary canal, naming the enzymes, where they act and the products formed.',
  model: '**Carbohydrates.** In the **mouth**, salivary amylase (pH 6.8) hydrolyses about 30 percent of starch into **maltose**. In the **small intestine**, **pancreatic amylase** converts the remaining polysaccharides into **disaccharides**. Enzymes of **succus entericus** finish the job: **maltase** gives glucose, **lactase** gives glucose and galactose, and **sucrase** gives glucose and fructose.\n\n**Proteins.** In the **stomach**, HCl converts pepsinogen into **pepsin**, which at pH 1.8 changes proteins into **proteoses and peptones**; in infants **rennin** digests milk proteins. In the **duodenum**, enterokinase activates **trypsinogen** to trypsin, which activates the other proenzymes; **trypsin, chymotrypsin and carboxypeptidase** form **dipeptides**, and **dipeptidases** of succus entericus give **amino acids**.\n\n**Fats.** Gastric glands secrete small amounts of lipase. In the small intestine **bile** emulsifies fats into micelles and activates **lipases**, which give di- and **monoglycerides**; intestinal lipases complete the breakdown into **fatty acids and glycerol**.\n\nBreakdown of these biomacromolecules occurs mainly in the **duodenum**, and the simple products are absorbed in the jejunum and ileum; the intestinal medium is kept alkaline (pH 7.8).',
  sol: 'Enzymes, sites, products.',
  scheme: [['Carbohydrates', 1.5], ['Proteins', 2], ['Fats', 1.5]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('absorption-long', long({
  stem: 'What is absorption? Explain the mechanisms of absorption of digested food, the absorption of fats, and the absorption that takes place in different parts of the alimentary canal. End by explaining assimilation and egestion.',
  model: '**Absorption** is the process by which the end products of digestion pass through the intestinal mucosa into the **blood or lymph**.\n\n**Mechanisms.** Small amounts of glucose, amino acids and chloride ions are absorbed by **simple diffusion**, down a concentration gradient. Fructose and some amino acids are absorbed with **carrier ions such as sodium ions** (**facilitated transport**). Water follows the **osmotic gradient**. **Active transport** moves amino acids, glucose and sodium ions **against the concentration gradient**, using energy.\n\n**Fats.** Insoluble fatty acids and glycerol form **micelles**, enter the mucosa, are re-formed into **chylomicrons** and pass into the **lacteals**, which later empty into the blood.\n\n**Different parts.** In the **mouth**, certain drugs are absorbed through the mucosa below the tongue. The **stomach** absorbs water, simple sugars and alcohol. The **small intestine** is the principal organ of absorption: glucose, fructose, fatty acids, glycerol and amino acids. The **large intestine** absorbs water, some minerals and drugs.\n\n**Assimilation** is the use of absorbed substances by the tissues for their activities. **Egestion**: faeces in the rectum start a neural reflex, and **defaecation** through the anus is a **voluntary** process carried out by a mass peristaltic movement.',
  sol: 'Definition, mechanisms, fats, sites, assimilation, egestion.',
  scheme: [['Definition and four mechanisms', 1.5], ['Fat absorption', 1], ['Absorption in different parts', 1.5], ['Assimilation and egestion', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('blog-long', long({
  stem: 'A health blogger writes: “The stomach digests everything we eat, and the small intestine is just a tube that carries food to the colon, so losing part of it would not affect nutrition.” Evaluate this claim, using what you know about digestion and absorption.',
  model: '**“The stomach digests everything.”** Incorrect. The stomach only begins protein digestion: pepsin converts proteins into proteoses and peptones, rennin acts on milk proteins in infants, and only small amounts of lipase are secreted. Carbohydrate digestion starts in the mouth, and most of it, and nearly all fat digestion, happen in the small intestine.\n\n**“The small intestine is just a tube.”** Incorrect. In the duodenum, bile emulsifies fats; pancreatic juice supplies trypsin, chymotrypsin, carboxypeptidase, amylase, lipases and nucleases; and succus entericus supplies maltase, lactase, sucrase, dipeptidases and nucleosidases. Breakdown of biomacromolecules occurs mainly in the duodenum.\n\n**Absorption.** The jejunum and ileum are the principal sites of absorption. Villi and microvilli give an enormous surface, with capillaries for glucose and amino acids and lacteals for fats carried as chylomicrons. Absorption uses diffusion, facilitated transport and active transport. The large intestine absorbs only water, some minerals and drugs, with no significant digestion.\n\n**Judgement.** The claim is wrong. Losing a large part of the small intestine would reduce both digestion and absorption, leading to poor nutrition and weight loss, as happens when absorption is reduced in diarrhoea.',
  sol: 'Each part evaluated; judgement.',
  scheme: [['Stomach’s limited role', 1], ['Digestion in the small intestine', 1.5], ['Absorption and villi', 1.5], ['Reasoned judgement', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [1, 2],
}));

// ---------------------------------------------------------------- cases
add('wisdom-case', mk.case({
  passage: `A dental chart for a 30-year-old shows the full adult set except for the four third molars (wisdom teeth), which were removed because they had no room to grow. The dentist explains that humans grow two sets of teeth in a lifetime, that each tooth sits in a socket of the jaw bone, and that the four kinds of teeth do different jobs. In each half of each jaw an adult normally has ${HALF_JAW.I} incisors, ${HALF_JAW.C} canine, ${HALF_JAW.PM} premolars and ${HALF_JAW.M} molars.`,
  d: 2, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Teeth of four different kinds that do different jobs make human dentition',
      right: 'heterodont',
      wrong: ['homodont', 'acrodont', 'monophyodont'],
      sol: 'Teeth of different types are heterodont — option (@K).',
      d: 1, c: 'recall', t: [1],
    })),
    part('b', num({
      stem: 'How many teeth does this person now have?',
      value: TEETH_LEFT,
      sol: r`$${PER_HALF} \times 4 = ${TOTAL_TEETH}$; $${TOTAL_TEETH} - ${WISDOM_REMOVED} = ${TEETH_LEFT}$ teeth.`,
      scheme: [[`${TEETH_LEFT}`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Name the two other features of human dentition described by the dentist, and explain each term.',
      model: '**Diphyodont:** humans form **two sets of teeth** — temporary milk (deciduous) teeth that are replaced by permanent adult teeth. **Thecodont:** each tooth is **embedded in a socket** of the jaw bone, which holds it firmly for chewing.',
      sol: 'Diphyodont and thecodont.',
      scheme: [['Diphyodont explained', 1], ['Thecodont explained', 1]],
      d: 2, c: 'understanding', t: [1],
    }), [
      short({
        marks: 2,
        stem: `Molars make up ${MOLARS} of the ${TOTAL_TEETH} teeth of a full adult set. Calculate their percentage share and suggest why molars suit their position at the back of the mouth.`,
        model: r`$\dfrac{${MOLARS}}{${TOTAL_TEETH}} \times 100 = ${MOLAR_PCT}$ percent. Molars sit at the back, near the jaw hinge, where the **biting force is greatest**; their broad, hard **enamel** surfaces **grind and crush** food during mastication.`,
        sol: 'Percentage and grinding role.',
        scheme: [[`${MOLAR_PCT} percent`, 1], ['Grinding with broad enamel surfaces', 1]],
        d: 3, c: 'application', t: [1],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === 28 || 'value');
add('snack-case', mk.case({
  passage: `A student’s school snack contains ${MEAL.carb} g of carbohydrate (mostly starch), ${MEAL.protein} g of protein and ${MEAL.fat} g of fat. Using physiological fuel values (${PHYS.carb}, ${PHYS.protein} and ${PHYS.fat} kcal per g), it provides ${MEAL_PHYS} kcal. When the same snack is burnt completely in a bomb calorimeter, using gross calorific values (${GROSS.carb}, ${GROSS.protein} and ${GROSS.fat} kcal per g), it releases ${MEAL_GROSS} kcal. One kcal equals ${KJ_PER_KCAL} kJ.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which nutrient in the snack provides the most energy per gram?',
      right: 'Fat',
      wrong: ['Carbohydrate', 'Protein', 'All three provide the same'],
      sol: `Fat provides ${PHYS.fat} kcal per g against ${PHYS.carb} for carbohydrate and protein — option (@K).`,
      d: 1, c: 'application', t: [2],
    })),
    part('b', num({
      stem: 'Convert the physiological energy of the snack to kilojoules, to the nearest whole number.',
      value: MEAL_KJ, tol: 1, unit: 'kJ',
      sol: r`$${MEAL_PHYS} \times ${KJ_PER_KCAL} = ${round(MEAL_PHYS * KJ_PER_KCAL, 2)} \approx ${MEAL_KJ}$ kJ.`,
      scheme: [[`${MEAL_KJ} kJ`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Suggest why the energy the body obtains from the snack is less than the energy released in the calorimeter.',
      model: 'In the body food is **not completely digested and absorbed**, so some energy is lost in faeces. Proteins are also **not fully oxidised**: their nitrogen leaves as **urea**, which still contains energy. A calorimeter burns everything completely, so its value is higher.',
      sol: 'Incomplete digestion and oxidation.',
      scheme: [['Incomplete digestion and absorption', 1], ['Proteins not fully oxidised; urea', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Trace what happens to the starch in the snack from the mouth to absorption, naming the enzymes involved.',
        model: 'In the mouth **salivary amylase** converts about 30 percent of the starch to **maltose**. In the small intestine **pancreatic amylase** turns the rest into disaccharides, and **maltase** of succus entericus forms **glucose**, which is absorbed into the blood in the **jejunum and ileum**.',
        sol: 'Amylases, maltase, absorption.',
        scheme: [['Salivary and pancreatic amylase', 1], ['Maltase; glucose absorbed', 1]],
        d: 2, c: 'understanding', t: [1],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === 1632 || 'value');
add('stone-case', mk.case({
  passage: 'A 45-year-old woman has pain after fatty meals, pale clay-coloured stools, and a yellow tinge in her eyes and skin. A scan shows a stone blocking her common bile duct, between the gall bladder and the point where the duct joins the pancreatic duct.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The yellow tinge in her eyes and skin is caused by',
      right: 'bile pigments building up in the blood and being deposited in the tissues',
      wrong: ['excess lysozyme in the saliva', 'too much bicarbonate in pancreatic juice', 'enzymes leaking from the stomach'],
      sol: 'With bile unable to leave, bile pigments (bilirubin, biliverdin) accumulate and are deposited, as in jaundice — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', mcq({
      stem: 'Digestion of which food component will be most affected by the blockage?',
      right: 'Fats',
      wrong: ['Starch in the mouth', 'Proteins in the stomach', 'Sucrose in the intestine'],
      sol: 'Without bile, fats are not emulsified and lipases are less active — option (@K).',
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why her fatty meals are poorly digested and absorbed while the stone remains.',
      model: 'Bile cannot reach the duodenum, so fats are **not emulsified into micelles**, giving lipases only a small surface to act on, and lipases are **not activated** by bile. Fatty acids and glycerol are also absorbed only after forming **micelles**, so both digestion and absorption of fat fall.',
      sol: 'No emulsification, no activation, no micelles.',
      scheme: [['No emulsification or lipase activation', 1], ['Micelles needed for absorption', 1]],
      d: 3, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Trace the normal path of bile from the liver cells to the duodenum, naming every duct and the sphincter on the way.',
        model: 'Hepatic cells secrete bile into the **hepatic ducts**; it is stored in the **gall bladder** and leaves through the **cystic duct**, which joins the hepatic duct to form the **common bile duct**. This joins the pancreatic duct as the **hepato-pancreatic duct**, guarded by the **sphincter of Oddi**, opening into the duodenum.',
        sol: 'Ducts in order.',
        scheme: [['Hepatic, cystic and common bile ducts', 1], ['Hepato-pancreatic duct and sphincter of Oddi', 1]],
        d: 2, c: 'recall', t: [1],
      }),
    ]),
  ],
}));
add('pem-case', mk.case({
  passage: `A nutrition team examined ${PEM.children} children under five in a drought-hit district. ${PEM.kwash} children had swollen bodies, thinning limbs and poor growth, and had been weaned onto starchy foods that gave enough calories but little protein. ${PEM.marasmus} infants under a year were extremely thin, with dry, wrinkled skin; their mothers’ milk had been replaced early by watery cereals poor in both protein and calories.`,
  d: 2, c: 'application',
  children: [
    part('a', mcq({
      stem: `The ${PEM.kwash} children with swollen bodies most likely have`,
      right: 'kwashiorkor',
      wrong: ['marasmus', 'jaundice', 'indigestion'],
      sol: 'Protein deficiency with adequate calories, with oedema and swelling, is kwashiorkor — option (@K).',
      d: 1, c: 'application', t: [2],
    })),
    part('b', num({
      stem: 'What percentage of the children examined showed protein-energy malnutrition of either kind?',
      value: PEM.pct, unit: '%',
      sol: r`$\dfrac{${PEM.kwash} + ${PEM.marasmus}}{${PEM.children}} \times 100 = \dfrac{${PEM.total}}{${PEM.children}} \times 100 = ${PEM.pct}$ percent.`,
      scheme: [[`${PEM.pct}%`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Distinguish the condition of the thin infants from that of the swollen children in cause and signs.',
      model: 'The thin infants have **marasmus**: a **simultaneous deficiency of proteins and calories**, causing **extreme emaciation**, thin limbs and **dry, thin, wrinkled skin**. The swollen children have **kwashiorkor**: **protein deficiency with adequate calories**, causing muscle wasting and **oedema** (swelling).',
      sol: 'Marasmus versus kwashiorkor.',
      scheme: [['Marasmus: protein and calorie deficiency, emaciation', 1], ['Kwashiorkor: protein deficiency, oedema', 1]],
      d: 2, c: 'understanding', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Suggest two practical feeding steps that would help prevent such malnutrition in the district, with a reason for each.',
        model: '**Continue breastfeeding** through the first year, since mother’s milk supplies both protein and energy; early replacement causes marasmus. When weaning, **add protein-rich foods** such as pulses, milk or eggs to cereals, because a starchy diet with little protein causes kwashiorkor.',
        sol: 'Breastfeeding; protein-rich weaning foods.',
        scheme: [['Breastfeeding with reason', 1], ['Protein-rich weaning foods with reason', 1]],
        d: 2, c: 'application', t: [2],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === 12 || 'value');

