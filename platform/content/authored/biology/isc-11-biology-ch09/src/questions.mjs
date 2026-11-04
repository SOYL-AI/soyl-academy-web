// ISC 11 Biology ch09 Structural Organisation in Animals: Frog — question bank in ISC school-examination style.
// Numbers come from calc.mjs. AR keys (ISC options): a a c b d.
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { MALES2, VOCAL_SACS2, POND2, PADS2, INSECTS2, FEED2, GUT2, GUT2_RATIO, O2B, O2B_SKIN, O2B_REST, BEAT2, OUTPUT2_MIN, SHEET2, SHEET2_DUCTS, NERVE2, NERVE2_MS, CHAMBERS, FOOD_PATH } from './calc.mjs';
import { FROG_EXT_LETTERED, ALIMENTARY_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const frogFig = svgV(FROG_EXT_LETTERED, 'A frog from above with five structures marked A to E');
const alimFig = svgV(ALIMENTARY_LETTERED, 'The alimentary canal of a frog with five parts marked A to E');

// ---------------------------------------------------------------- t01 morphology
add('ck-sex-mcq', mcq({
  stem: 'Two frogs of the same size are placed in a tray. One has a rough dark pad at the base of the first digit of each forelimb and a throat that swells out at the sides when it calls. This frog is',
  right: 'a male, because of the copulatory pads and vocal sacs',
  wrong: ['a female, because of the copulatory pads', 'a female, because of the vocal sacs', 'a male, because it has webbed toes'],
  sol: 'Copulatory pads and vocal sacs are features of the male — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('ext-fig1-mcq', mcq({
  stem: 'In the lettered figure of a frog seen from above, the structure that receives sound waves is marked',
  right: 'B',
  wrong: ['A', 'C', 'E'],
  sol: 'B is the tympanum, the ear drum — option (@K).',
  d: 1, c: 'application', t: [1],
  assets: [frogFig],
}));
add('ext-fig2-mcq', mcq({
  stem: 'In the same figure, the structure that gives the frog a strong thrust when it swims is marked',
  right: 'D',
  wrong: ['A', 'B', 'C'],
  sol: 'D is the webbed foot of the hind limb, which acts as a paddle — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [frogFig],
}));
add('ext-fig3-mcq', mcq({
  stem: 'In the same figure, the opening through which air enters when the frog breathes with its mouth shut is marked',
  right: 'E',
  wrong: ['A', 'B', 'D'],
  sol: 'E is a nostril; air enters the buccal cavity through the nostrils — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [frogFig],
}));
add('camo-mcq', mcq({
  stem: 'A frog sits motionless among wet leaves and is hard to see. Its upper surface is olive green with irregular dark spots. This colouring helps the frog by',
  right: 'camouflage, which hides it from enemies',
  wrong: ['helping it to absorb oxygen', 'attracting a mate', 'warming its body'],
  sol: 'The colour pattern blends with the background and hides the frog — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('nict-mcq', mcq({
  stem: 'A frog swims with its eyes open under water. A clear structure that slides over each eye to protect it is the',
  right: 'nictitating membrane',
  wrong: ['tympanum', 'cornea of the lung', 'vocal sac'],
  sol: 'The nictitating membrane protects the eye under water — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('ar-skin', ar({
  a: 'The skin of a frog must be kept moist.',
  r: 'Oxygen dissolves in the film of mucus on the skin and diffuses across it into the blood.',
  key: 'a',
  sol: 'Both are true, and R explains A: gas exchange across the skin needs a moist surface — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('neck-tf', tf({
  stem: 'The body of an adult frog has a distinct head, neck and trunk.',
  key: 'f',
  sol: 'False: the head joins the trunk directly; there is no neck.',
  d: 1, c: 'recall', t: [1],
}));
add('tym-fill', fill({
  stem: 'The round membrane behind each eye of a frog, which receives sound, is the ______.',
  acc: [['tympanum', 'ear drum']],
  sol: 'Tympanum.',
  d: 1, c: 'recall', t: [1],
}));
add('reason-hind', short({
  marks: 1,
  stem: 'Give a reason: the hind limbs of a frog are longer and more muscular than the forelimbs.',
  model: 'They push the body forward in leaping and in swimming, so they must be long and strong.',
  sol: 'Leaping and swimming.',
  scheme: [['Used for leaping and swimming', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('reason-vocal', short({
  marks: 1,
  stem: 'Give a reason: only male frogs have vocal sacs.',
  model: 'Males call to attract females, and the sacs amplify the call.',
  sol: 'Calling.',
  scheme: [['Amplify the male call', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('sex-short2', short({
  marks: 2,
  stem: 'Frog X calls loudly at night and has a rough dark swelling on the first digit of each forelimb; frog Y has neither. Name the sex of X and the two structures, and state the use of each.',
  model: '**X is a male.** The throat sacs are **vocal sacs**, which act as resonators and make the call louder to attract females. The rough swelling on the first digit is the **copulatory pad**, which helps the male to **grip the female** when he clasps her in mating.',
  sol: 'Sex; two structures with uses.',
  scheme: [['Male; vocal sacs with use', 1], ['Copulatory pad with use', 1]],
  d: 2, c: 'application', t: [1],
}));
add('skin-short2', short({
  marks: 2,
  stem: 'State two features of the skin of a frog and give the use of each.',
  model: 'The skin is **moist and slimy** because of mucus, which keeps it wet so that dissolved gases can pass through it in **cutaneous respiration**. Its **olive green colour with dark spots** gives **camouflage**, helping the frog to hide from enemies among leaves and mud.',
  sol: 'Two features with uses.',
  scheme: [['Moist skin and respiration', 1], ['Colour and camouflage', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('ext-short3', short({
  marks: 3,
  stem: 'Describe the external features of a frog under the heads: divisions of the body, eyes and ears, and limbs.',
  model: 'The body has a **head and a trunk**, with **no neck and no tail**. The head bears a pair of **bulging eyes** with a **nictitating membrane**, a pair of **nostrils**, and a **tympanum** on each side behind the eye as the ear. The **forelimbs** are short with **four digits**; the **hind limbs** are long and muscular with **five webbed toes**.',
  sol: 'Body, eyes and ears, limbs.',
  scheme: [['Head and trunk; no neck or tail', 1], ['Eyes, nostrils, tympanum', 1], ['Forelimbs and hind limbs', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('limbs-short3', short({
  marks: 3,
  stem: 'A frog leaps across a lawn, swims in a pond and burrows into mud in the dry season. Explain how its limbs, eyes and skin suit this life in water and on land.',
  model: 'The **long, muscular hind limbs** push it in leaps, and their **webbed toes** act as paddles when it swims; the short forelimbs absorb the shock of landing. The **bulging eyes** let it see all round while its body is hidden, and the **nictitating membrane** protects them under water. The **moist skin** exchanges gases in water and in mud, and its colour gives camouflage.',
  sol: 'Limbs, eyes, skin.',
  scheme: [['Hind limbs and webbed toes', 1], ['Eyes and nictitating membrane', 1], ['Moist skin', 1]],
  d: 3, c: 'application', t: [1],
}));
add('ext-long', long({
  stem: '(a) Draw a labelled diagram of a frog seen from above, naming at least six parts. [3]\n(b) State two features that help a frog to live on land and in water. [2]',
  model: '(a) A frog with a **head** and **trunk**; two **eyes**, two **nostrils**, a **tympanum** on each side; short **forelimbs** with four digits; long **hind limbs** with five **webbed toes**; labelled.\n\n(b) The **moist skin** allows breathing through the skin in water, and the **webbed hind limbs** allow swimming in water and leaping on land. The **lungs** and buccal cavity allow breathing in air.',
  sol: 'Labelled frog; two features.',
  scheme: [['(a) Body drawn in proportion', 1], ['(a) Six parts labelled', 2], ['(b) First feature', 1], ['(b) Second feature', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [1],
}));
add('pond-num', num({
  stem: `A pond has ${POND2.frogs} frogs, males to females in the ratio ${POND2.maleParts} to ${POND2.femaleParts}. Every male has two vocal sacs. How many vocal sacs are there in the pond?`,
  value: VOCAL_SACS2,
  sol: r`Males $= ${POND2.frogs} \div 5 \times ${POND2.maleParts} = ${MALES2}$; vocal sacs $= ${MALES2} \times 2 = ${VOCAL_SACS2}$.`,
  scheme: [[`${VOCAL_SACS2}`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 120 || 'value');
add('pad-num', num({
  stem: 'A collection of frogs has 36 males. Each male has one copulatory pad on each forelimb. How many copulatory pads do the males have in all?',
  value: PADS2,
  sol: r`$36 \times 2 = ${PADS2}$.`,
  scheme: [[`${PADS2}`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 72 || 'value');

// ---------------------------------------------------------------- t02 digestive, respiratory, circulatory
add('tongue-mcq', mcq({
  stem: 'A frog flicks out its tongue and catches a passing moth. Which statement about its tongue is correct?',
  right: 'It is bilobed and fixed at the front of the mouth, with the free ends behind.',
  wrong: ['It is a single lobe fixed at the back of the mouth.', 'It is bilobed and fixed all round the floor of the mouth.', 'It is bilobed and fixed at the back, with the free ends in front.'],
  sol: 'The tongue is attached at the front and its forked free end can be flicked out — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ck-path-mcq', mcq({
  stem: 'After the stomach, the food of a frog passes into the',
  right: 'duodenum',
  wrong: ['oesophagus', 'rectum', 'pharynx'],
  sol: 'Chyme passes from the stomach to the duodenum, the first part of the intestine — option (@K).',
  d: 1, c: 'recall', t: [2],
}), () => FOOD_PATH.indexOf('duodenum') === FOOD_PATH.indexOf('stomach') + 1 || 'order');
add('bile-mcq', mcq({
  stem: 'The liver of a frog is damaged by a disease. Which secretion would be lacking in the duodenum?',
  right: 'Bile',
  wrong: ['Pancreatic juice', 'Hydrochloric acid', 'Mucus of the oesophagus'],
  sol: 'The liver makes bile, which is stored in the gall bladder and poured into the duodenum — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gut-mcq', mcq({
  stem: 'The intestine of a tadpole, which eats plants, is many times longer in relation to its body than that of an adult frog. The adult frog has a short alimentary canal because it',
  right: 'eats insects and other animal food',
  wrong: ['does not digest its food', 'eats plants as well', 'swallows no food at all'],
  sol: 'A carnivore needs a shorter gut than a plant eater — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ali-fig1-mcq', mcq({
  stem: 'In the lettered figure of the alimentary canal of a frog, the organ that makes bile is marked',
  right: 'A',
  wrong: ['B', 'C', 'D'],
  sol: 'A is the liver — option (@K).',
  d: 1, c: 'application', t: [2],
  assets: [alimFig],
}));
add('ali-fig2-mcq', mcq({
  stem: 'In the same figure, hydrochloric acid and gastric juice are poured on the food in the part marked',
  right: 'B',
  wrong: ['A', 'C', 'D'],
  sol: 'B is the stomach — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [alimFig],
}));
add('ali-fig3-mcq', mcq({
  stem: 'In the same figure, the digested food is absorbed mainly through the villi of the part marked',
  right: 'D',
  wrong: ['A', 'B', 'E'],
  sol: 'D is the ileum, part of the intestine, where absorption takes place — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [alimFig],
}));
add('ck-resp-mcq', mcq({
  stem: 'A frog is kept under water in a tank. Most of the oxygen it takes up then enters through its',
  right: 'skin',
  wrong: ['lungs', 'tongue', 'tympanum'],
  sol: 'Under water a frog respires mainly through its moist skin — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('buccal-mcq', mcq({
  stem: 'A frog on land closes its nostrils and raises the floor of its buccal cavity. The immediate result is that',
  right: 'air is forced through the glottis into the lungs',
  wrong: ['air leaves through the nostrils', 'food is pushed into the stomach', 'the skin takes up more water'],
  sol: 'Raising the floor of the buccal cavity pushes air into the lungs — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ck-heart-mcq', mcq({
  stem: 'The heart of a frog has',
  right: 'three chambers: two atria and one ventricle',
  wrong: ['two chambers: one atrium and one ventricle', 'four chambers: two atria and two ventricles', 'three chambers: one atrium and two ventricles'],
  sol: 'The frog heart is three-chambered with two atria and a single ventricle — option (@K).',
  d: 1, c: 'recall', t: [2],
}), () => CHAMBERS === 3 || 'chambers');
add('mixed-mcq', mcq({
  stem: 'Blood from the lungs enters the left atrium and blood from the body enters the right atrium of a frog. In the single ventricle the blood is',
  right: 'a mixture of oxygenated and deoxygenated blood',
  wrong: ['wholly oxygenated', 'wholly deoxygenated', 'free of red blood cells'],
  sol: 'Both atria empty into one ventricle, so the two kinds of blood mix — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('portal-mcq', mcq({
  stem: 'A vein carries blood from the intestine of a frog to the liver, where it breaks up into capillaries before returning to the heart. This vein belongs to the',
  right: 'hepatic portal system',
  wrong: ['renal portal system', 'pulmonary circulation', 'lymphatic system'],
  sol: 'A vein from the intestine to the liver belongs to the hepatic portal system — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-heart', ar({
  a: 'The ventricle of a frog pumps mixed blood to the body.',
  r: 'The frog heart has only one ventricle into which both atria open.',
  key: 'a',
  sol: 'Both are true, and R explains A: with a single ventricle receiving both kinds of blood, the blood pumped out is mixed — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-short', ar({
  a: 'The alimentary canal of an adult frog is short.',
  r: 'An adult frog is a herbivore.',
  key: 'c',
  sol: 'A is true. R is false: the adult frog is a carnivore, and that is why its canal is short — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-liver', ar({
  a: 'The liver of a frog makes bile.',
  r: 'Bile is stored in the gall bladder of the frog.',
  key: 'b',
  sol: 'Both are true, but R is not the explanation of A: storage in the gall bladder does not explain where bile is made — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('tongue-tf', tf({
  stem: 'The tongue of a frog is attached at the back of the mouth and its forked end lies in front.',
  key: 'f',
  sol: 'False: the tongue is attached at the front of the mouth and its forked free end lies behind, ready to be flicked out.',
  d: 1, c: 'recall', t: [2],
}));
add('duo-fill', fill({
  stem: 'Bile and pancreatic juice are poured into the ______ through a common duct.',
  acc: [['duodenum']],
  sol: 'Duodenum.',
  d: 1, c: 'recall', t: [2],
}));
add('organ-match', match({
  stem: 'Match each part of the digestive system of the frog (column I) with its role (column II).',
  pairs: [['Liver', 'Makes bile'], ['Gall bladder', 'Stores bile'], ['Pancreas', 'Makes pancreatic juice with enzymes'], ['Stomach', 'Hydrochloric acid and gastric juice digest food']],
  order: [1, 3, 0, 2],
  sol: 'Liver makes bile; gall bladder stores it; pancreas makes pancreatic juice; stomach secretes acid and gastric juice.',
  d: 2, c: 'understanding', t: [2],
}));
add('reason-gut', short({
  marks: 1,
  stem: 'Give a reason: the alimentary canal of a frog is short.',
  model: 'The frog is a carnivore and its animal food is easy to digest, so a long canal is not needed.',
  sol: 'Carnivore.',
  scheme: [['Carnivorous food is easily digested', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('reason-moist', short({
  marks: 1,
  stem: 'Give a reason: a frog that is kept out of water for a long time in a dry place becomes weak.',
  model: 'Its skin dries, so it cannot exchange gases through the skin.',
  sol: 'Skin dries.',
  scheme: [['Dry skin cannot exchange gases', 1]],
  d: 2, c: 'application', t: [2],
}));
add('resp-short2', short({
  marks: 2,
  stem: 'Name the three surfaces through which a frog exchanges gases and state which of them it uses when it is under water.',
  model: 'A frog exchanges gases through the **skin** (cutaneous respiration), the lining of the **buccal cavity** and the **lungs** (pulmonary respiration). Under water it uses only the **skin**, through which oxygen dissolved in the water diffuses into the blood.',
  sol: 'Three surfaces; the one used under water.',
  scheme: [['Skin, buccal cavity, lungs', 1], ['Skin only under water', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('heart-short2', short({
  marks: 2,
  stem: 'Name the chambers of the heart of a frog and the vessels or structure through which blood enters each atrium.',
  model: 'The heart has **two atria**, right and left, and **one ventricle**. The **right atrium** receives blood from the body through the **sinus venosus**, into which the veins open. The **left atrium** receives blood from the lungs through the pulmonary veins.',
  sol: 'Chambers; entry of blood.',
  scheme: [['Two atria and one ventricle', 1], ['Right and left atrium sources', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('gland-short2', short({
  marks: 2,
  stem: 'Name the two digestive glands of the frog that open into the duodenum and state what each secretes.',
  model: 'The **liver** secretes **bile**, which is stored in the gall bladder and passes to the duodenum. The **pancreas** secretes **pancreatic juice**, which contains digestive enzymes. Both secretions enter the duodenum through a **common duct** and complete the digestion begun in the stomach.',
  sol: 'Liver and pancreas.',
  scheme: [['Liver and bile', 1], ['Pancreas and pancreatic juice', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('path-short3', short({
  marks: 3,
  stem: 'List, in order, the parts of the alimentary canal of a frog, and say what happens to the food in the stomach and in the duodenum.',
  model: 'The order is **mouth, buccal cavity, pharynx, oesophagus, stomach, duodenum, ileum, rectum and cloaca**. In the **stomach** hydrochloric acid and gastric juice begin the digestion and the food becomes **chyme**. In the **duodenum** the chyme receives **bile and pancreatic juice** through a common duct, and digestion continues.',
  sol: 'Order; stomach; duodenum.',
  scheme: [['Order of the parts', 1], ['Stomach digestion', 1], ['Duodenum secretions', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('portal-short3', short({
  marks: 3,
  stem: 'Name the two portal systems of the frog and say what each connects.',
  model: 'In a **portal system** a vein carries blood from one organ to the capillaries of another before it returns to the heart. The **hepatic portal system** connects the **intestine** to the **liver**. The **renal portal system** connects the **hind limbs and lower body** to the **kidneys**.',
  sol: 'Two portal systems.',
  scheme: [['Meaning of portal system', 1], ['Hepatic portal', 1], ['Renal portal', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('resp-short3', short({
  marks: 3,
  stem: 'A frog is kept in a jar of well-aerated water with wax plugs in its nostrils. It stays alive for many hours. Explain why, and say what changes when it is returned to land.',
  model: 'Under water the frog uses **cutaneous respiration**: oxygen dissolved in the water diffuses across the **moist skin**, so the plugged nostrils do not matter. When the frog returns to land it breathes in air through the **nostrils**, which fill the **buccal cavity**, and forces the air into the **lungs**, while still exchanging gases through the skin.',
  sol: 'Skin in water; lungs on land.',
  scheme: [['Cutaneous respiration in water', 1], ['Nostrils unimportant', 1], ['Buccal cavity and lungs on land', 1]],
  d: 3, c: 'application', t: [2],
}));
add('heart-short3', short({
  marks: 3,
  stem: 'Describe the heart of a frog and state what happens to the blood in the ventricle.',
  model: 'The heart is enclosed in a **pericardium** and has **three chambers**: right and left **atria** and one **ventricle**. The **sinus venosus** opens into the right atrium, and the **truncus arteriosus** leaves the ventricle. Both atria open into the ventricle, where oxygenated blood from the lungs **mixes** with deoxygenated blood from the body.',
  sol: 'Chambers; vessels; mixing.',
  scheme: [['Three chambers', 1], ['Sinus venosus and truncus arteriosus', 1], ['Mixing in the ventricle', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('dig-long', long({
  stem: '(a) Draw a labelled diagram of the alimentary canal of a frog, naming at least six parts. [3]\n(b) State the part of the canal in which the secretions of the liver and the pancreas are received and name the secretions. [2]',
  model: '(a) The **mouth and buccal cavity** with tongue, **pharynx**, **oesophagus**, **stomach**, **duodenum**, **ileum**, **rectum** and **cloaca**, with the **liver**, **gall bladder** and **pancreas** beside the stomach; all labelled.\n\n(b) Both secretions are received in the **duodenum**: the liver gives **bile**, which is stored in the gall bladder, and the pancreas gives **pancreatic juice** with digestive enzymes.',
  sol: 'Labelled canal; secretions.',
  scheme: [['(a) Canal drawn in order', 1], ['(a) Six parts labelled', 2], ['(b) Duodenum', 1], ['(b) Bile and pancreatic juice', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [2],
}));
add('circ-long', long({
  stem: '(a) Draw a labelled diagram of the heart of a frog. [2]\n(b) Describe how blood reaches the heart from the body and from the lungs, and where it goes next. [2]\n(c) Name the two portal systems. [1]',
  model: '(a) A heart with the **right atrium**, **left atrium**, **ventricle**, **sinus venosus** and **truncus arteriosus**, labelled.\n\n(b) Blood from the **body** enters the **right atrium** through the **sinus venosus**; blood from the **lungs** enters the **left atrium**. Both atria open into the **ventricle**, where the blood mixes, and the ventricle pumps it into the **truncus arteriosus**, which sends it to the lungs, body and head.\n\n(c) The **hepatic portal** and **renal portal** systems.',
  sol: 'Heart; route of blood; portal systems.',
  scheme: [['(a) Chambers drawn', 1], ['(a) Labelled', 1], ['(b) Entry to the atria', 1], ['(b) Ventricle to truncus arteriosus', 1], ['(c) Two portal systems', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2],
}));
add('resp-long', long({
  stem: '(a) Name the organs of respiration of the frog. [1]\n(b) Describe how air gets from the outside into the lungs. [2]\n(c) How does the frog breathe when it is buried in mud during hibernation? [2]',
  model: '(a) The **skin**, the **buccal cavity** and the **lungs**.\n\n(b) Air enters through the **nostrils** into the **buccal cavity**; when the **floor of the buccal cavity is raised** the air is forced through the **glottis** into the **lungs**, a pair of sac-like organs in the thorax.\n\n(c) During hibernation the frog does not use its lungs; it takes in dissolved oxygen through its **moist skin** from the damp mud and water, and its **metabolic rate is low**, so little oxygen is needed.',
  sol: 'Organs; path of air; skin in hibernation.',
  scheme: [['(a) Three organs', 1], ['(b) Nostrils to buccal cavity', 1], ['(b) Raised floor forces air into lungs', 1], ['(c) Cutaneous respiration', 1], ['(c) Low metabolic rate', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2],
}));
add('heartout-num', num({
  stem: `The heart of a frog beats ${BEAT2.rate} times a minute and the ventricle pumps ${BEAT2.strokeMl} ml of blood at each beat. How many millilitres of blood does it pump in a minute?`,
  value: OUTPUT2_MIN, unit: 'ml',
  sol: r`$${BEAT2.rate} \times ${BEAT2.strokeMl} = ${OUTPUT2_MIN}$ ml.`,
  scheme: [[`${OUTPUT2_MIN}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 1.5 || 'value');
add('o2-num', num({
  stem: `A frog on land takes up ${O2B.total} ml of oxygen an hour, ${O2B.skinPct} percent of it through the skin. How many millilitres does it take up through the lungs and the buccal cavity together?`,
  value: O2B_REST, unit: 'ml',
  sol: r`Skin $= ${O2B.total} \times ${O2B.skinPct} \div 100 = ${O2B_SKIN}$ ml; the rest $= ${O2B.total} - ${O2B_SKIN} = ${O2B_REST}$ ml.`,
  scheme: [[`${O2B_REST}`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 2.4 || 'value');
add('insect-num', num({
  stem: `A frog in a garden eats ${FEED2.perDay} insects every day. How many insects does it eat in ${FEED2.days} days?`,
  value: INSECTS2,
  sol: r`$${FEED2.perDay} \times ${FEED2.days} = ${INSECTS2}$.`,
  scheme: [[`${INSECTS2}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 200 || 'value');
add('gut-num', num({
  stem: `A frog ${GUT2.body} cm long has an intestine ${GUT2.gut} cm long. By how many times is the intestine longer than the body? (One decimal place.)`,
  value: GUT2_RATIO, tol: 0.05,
  sol: r`$${GUT2.gut} \div ${GUT2.body} = ${GUT2_RATIO}$.`,
  scheme: [[`${GUT2_RATIO}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 1.2 || 'value');

// ---------------------------------------------------------------- t03 excretory, nervous, reproductive
add('ck-duct-mcq', mcq({
  stem: 'In a male frog, the duct that leaves the kidney and carries both urine and sperms to the cloaca is the',
  right: 'urinogenital duct',
  wrong: ['oviduct', 'bile duct', 'duct of the urinary bladder'],
  sol: 'The ureter of a male frog acts as a urinogenital duct — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ck-ferti-mcq', mcq({
  stem: 'Frog eggs collected from a pond are fertilised. Fertilisation in the frog takes place',
  right: 'outside the body of the female, in water',
  wrong: ['inside the oviduct', 'inside the cloaca', 'inside the ovary'],
  sol: 'Fertilisation in the frog is external, in water — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('ck-brain-mcq', mcq({
  stem: 'A pair of optic lobes lies in the',
  right: 'midbrain',
  wrong: ['forebrain', 'hindbrain', 'spinal cord'],
  sol: 'The optic lobes belong to the midbrain — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ureo-mcq', mcq({
  stem: 'Urine collected from an adult frog is analysed. The main nitrogenous waste in it is',
  right: 'urea',
  wrong: ['ammonia', 'uric acid', 'creatinine'],
  sol: 'The frog is ureotelic, so the main waste is urea — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('bladder-mcq', mcq({
  stem: 'In a frog the thin-walled urinary bladder lies in front of the rectum. It opens into the',
  right: 'cloaca',
  wrong: ['rectum', 'ureter', 'oviduct'],
  sol: 'The bladder opens into the cloaca — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cloaca-mcq', mcq({
  stem: 'Which of these open into the cloaca of a female frog?',
  right: 'The rectum, the ureters, the oviducts and the urinary bladder',
  wrong: ['The rectum only', 'The ureters and the rectum, but not the oviducts', 'The ovaries and the kidneys'],
  sol: 'The cloaca is the common chamber that receives the rectum, the ureters, the separate oviducts and the bladder — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('testis-mcq', mcq({
  stem: 'On dissecting a male frog a student finds a pair of yellowish ovoid organs on the kidneys. The organs are the',
  right: 'testes, attached to the upper part of the kidneys',
  wrong: ['ovaries, attached to the bladder', 'fat bodies, attached to the liver', 'adrenals, attached to the cloaca'],
  sol: 'The testes are attached to the upper part of the kidneys — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ovary-mcq', mcq({
  stem: 'On opening a female frog in the breeding season a student sees large masses filled with black and white ova. The ovaries of the frog',
  right: 'have no functional connection with the kidneys',
  wrong: ['open directly into the cloaca', 'are joined to the kidneys by the vasa efferentia', 'lie inside the urinary bladder'],
  sol: 'The ovaries are separate from the kidneys; ova reach the cloaca by the oviducts — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cerebellum-mcq', mcq({
  stem: 'A frog with injury to a part of its brain jumps clumsily and cannot keep its balance. The part is most likely the',
  right: 'cerebellum',
  wrong: ['olfactory lobe', 'optic lobe', 'diencephalon'],
  sol: 'The cerebellum coordinates muscular movement and balance — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ar-ferti', ar({
  a: 'Fertilisation in the frog is internal.',
  r: 'Frog eggs develop inside the body of the female.',
  key: 'd',
  sol: 'Both are false: fertilisation is external, in water, and the eggs develop outside the body, through a tadpole — option (d).',
  d: 3, c: 'understanding', t: [3],
}));
add('cloaca-fill', fill({
  stem: 'The common chamber that receives faeces, urine and gametes in a frog is the ______.',
  acc: [['cloaca']],
  sol: 'Cloaca.',
  d: 1, c: 'recall', t: [3],
}));
add('brain-match', match({
  stem: 'Match each part of the brain of the frog (column I) with its position or role (column II).',
  pairs: [['Olfactory lobes', 'Forebrain; sense of smell'], ['Optic lobes', 'Midbrain; sight'], ['Cerebellum', 'Hindbrain; balance and coordination'], ['Medulla oblongata', 'Hindbrain; passes out as the spinal cord']],
  order: [3, 1, 0, 2],
  sol: 'Olfactory lobes smell; optic lobes sight; cerebellum balance; medulla oblongata continues as the spinal cord.',
  d: 2, c: 'understanding', t: [3],
}));
add('reason-eggs', short({
  marks: 1,
  stem: 'Give a reason: a female frog lays a very large number of eggs at a time.',
  model: 'Fertilisation is external and the eggs and tadpoles are exposed to enemies, so many are lost.',
  sol: 'Many are lost.',
  scheme: [['External fertilisation and heavy loss', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('reason-cloaca', short({
  marks: 1,
  stem: 'Give a reason: the cloaca of a frog is called a common chamber.',
  model: 'Faeces, urine and gametes all pass through it to reach the outside.',
  sol: 'Receives all three.',
  scheme: [['Faeces, urine and gametes pass through it', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('male-short2', short({
  marks: 2,
  stem: 'Describe the path taken by sperms from the testis of a male frog to the outside.',
  model: 'Sperms leave each **testis** through fine tubes, the **vasa efferentia**, which enter the **kidney**. From the kidney they pass into the **urinogenital duct**, the ureter of the male, which carries them to the **cloaca**, from which they are discharged to the outside.',
  sol: 'Testis, vasa efferentia, kidney, duct, cloaca.',
  scheme: [['Vasa efferentia into the kidney', 1], ['Urinogenital duct to the cloaca', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('female-short2', short({
  marks: 2,
  stem: 'Describe how the ova of a female frog reach the outside after they leave the ovary.',
  model: 'The ova are released into the **body cavity** and are drawn into the funnels of the **oviducts**. They travel along the **oviducts**, which open **separately** into the **cloaca**, and are laid in water through the cloacal aperture, where they are fertilised outside the body.',
  sol: 'Body cavity, oviduct, cloaca.',
  scheme: [['Body cavity to oviduct', 1], ['Oviduct to cloaca and outside', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('brain-short2', short({
  marks: 2,
  stem: 'Name the three regions of the brain of a frog and give one part of each.',
  model: 'The **forebrain** includes the **olfactory lobes**, the cerebral hemispheres and the diencephalon. The **midbrain** has a pair of **optic lobes**. The **hindbrain** has the **cerebellum** and the **medulla oblongata**, which continues as the spinal cord.',
  sol: 'Three regions with parts.',
  scheme: [['Forebrain with a part', 1], ['Midbrain and hindbrain with parts', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('ug-short3', short({
  marks: 3,
  stem: 'Describe the kidneys and the ducts of the urinogenital system of a male frog.',
  model: 'A pair of dark red, bean-shaped **kidneys** lies on either side of the backbone, each made of many **nephrons**. A pair of yellowish **testes** is attached to the upper part of the kidneys by a fold of peritoneum. From each kidney a **urinogenital duct** carries both urine and sperms to the **cloaca**, and the **urinary bladder** in front of the rectum also opens into the cloaca.',
  sol: 'Kidneys; testes; ducts.',
  scheme: [['Kidneys and nephrons', 1], ['Testes attached to kidneys', 1], ['Urinogenital duct, bladder and cloaca', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cns-short3', short({
  marks: 3,
  stem: 'Describe the central nervous system of a frog.',
  model: 'The **central nervous system** has the **brain** and the **spinal cord**. The brain lies in the **cranium** and has a **forebrain** with olfactory lobes, cerebral hemispheres and diencephalon, a **midbrain** with two optic lobes, and a **hindbrain** with the cerebellum and the medulla oblongata. The medulla oblongata passes out through the **foramen magnum** and continues as the spinal cord.',
  sol: 'Brain regions; spinal cord.',
  scheme: [['Brain in the cranium; forebrain', 1], ['Midbrain and hindbrain', 1], ['Spinal cord', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('fem-short3', short({
  marks: 3,
  stem: 'A student dissects a female frog. Name the parts of the reproductive system she should find and say how they differ from the reproductive system of a male in their connection with the kidneys and the cloaca.',
  model: 'She should find a pair of **ovaries** with many ova, and a pair of coiled **oviducts**. The ovaries have **no functional connection with the kidneys**, whereas the testes of a male are attached to the kidneys. The oviducts open **separately** into the cloaca, apart from the ureters, whereas in the male a single **urinogenital duct** carries both sperms and urine.',
  sol: 'Parts; two differences.',
  scheme: [['Ovaries and oviducts', 1], ['Connection with the kidneys', 1], ['Separate openings into the cloaca', 1]],
  d: 3, c: 'application', t: [3],
}));
add('ferti-short3', short({
  marks: 3,
  stem: 'Describe fertilisation and development in the frog.',
  model: 'During mating the female lays her **ova** in water and the male sheds **sperms** over them, so **fertilisation is external**. A very large number of ova are laid, as many are lost. The fertilised egg develops into a **tadpole**, which changes into an adult by **metamorphosis**; this is **indirect development**.',
  sol: 'External fertilisation; tadpole.',
  scheme: [['External fertilisation in water', 1], ['Many ova laid', 1], ['Tadpole and metamorphosis', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('male-long', long({
  stem: '(a) Draw a labelled diagram of the urinogenital system of a male frog, naming at least six parts. [3]\n(b) What is the use of the cloaca? [1]\n(c) Name the nitrogenous waste of the frog. [1]',
  model: '(a) A pair of **kidneys**, with a **testis** attached to the upper part of each, **vasa efferentia** entering the kidney, a **urinogenital duct** from each kidney to the **cloaca**, and the **urinary bladder** opening into the cloaca; all labelled.\n\n(b) The **cloaca** is the common chamber through which **faeces, urine and sperms** pass to the outside.\n\n(c) **Urea**; the frog is ureotelic.',
  sol: 'Labelled system; cloaca; urea.',
  scheme: [['(a) System drawn', 1], ['(a) Six parts labelled', 2], ['(b) Cloaca', 1], ['(c) Urea', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [3],
}));
add('female-long', long({
  stem: '(a) Draw a labelled diagram of the urinogenital system of a female frog. [3]\n(b) State two differences from the male system. [2]',
  model: '(a) A pair of **kidneys**, a pair of large **ovaries** with ova, coiled **oviducts**, **ureters** from the kidneys, the **urinary bladder** and the **cloaca**; labelled.\n\n(b) The ovaries have **no connection with the kidneys**, but the testes of the male are attached to the kidneys. In the female the **ureters and oviducts open separately** into the cloaca, while in the male the **urinogenital duct** carries urine and sperms.',
  sol: 'Labelled female system; two differences.',
  scheme: [['(a) System drawn', 1], ['(a) Six parts labelled', 2], ['(b) Connection with kidneys', 1], ['(b) Separate openings', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [3],
}));
add('brain-long', long({
  stem: '(a) Draw a labelled diagram of the brain of a frog in dorsal view, naming at least six parts. [3]\n(b) Name the part concerned with balance and the part concerned with the sense of smell. [2]',
  model: '(a) Two **olfactory lobes**, two **cerebral hemispheres**, the **diencephalon**, two **optic lobes**, the **cerebellum** and the **medulla oblongata** continuing as the **spinal cord**; the forebrain, midbrain and hindbrain are indicated.\n\n(b) The **cerebellum** is concerned with **balance and muscular coordination**; the **olfactory lobes** are concerned with the sense of **smell**.',
  sol: 'Labelled brain; balance and smell.',
  scheme: [['(a) Brain drawn in order', 1], ['(a) Six parts labelled', 2], ['(b) Cerebellum for balance', 1], ['(b) Olfactory lobes for smell', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [3],
}));
add('nerve-num', num({
  stem: `An impulse travels along a nerve ${NERVE2.lengthM} m long at ${NERVE2.speed} m per second. How many milliseconds does it take to cross the nerve?`,
  value: NERVE2_MS, unit: 'ms',
  sol: r`$${NERVE2.lengthM} \div ${NERVE2.speed} = 0.012$ s $= ${NERVE2_MS}$ ms.`,
  scheme: [[`${NERVE2_MS}`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 12 || 'value');
add('sheet-num', num({
  stem: `A dissection sheet lists ${SHEET2.males} male and ${SHEET2.females} female frogs. Each male has two urinogenital ducts and each female has two ureters and two oviducts, all opening into the cloaca. How many ducts open into cloacae on the sheet?`,
  value: SHEET2_DUCTS,
  sol: r`Males: $${SHEET2.males} \times 2 = 20$; females: $${SHEET2.females} \times 4 = 32$; total $= ${SHEET2_DUCTS}$.`,
  scheme: [[`${SHEET2_DUCTS}`, 1]],
  d: 4, c: 'analysis', t: [3],
}), (q) => q.answer.value === 52 || 'value');
