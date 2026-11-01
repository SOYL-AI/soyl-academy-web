// ICSE 10 Biology ch12 Endocrine System — question bank in ICSE 2027 style.
// Blood-sugar rises, urine volumes and heart-rate changes are computed by calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { SUGAR, URINE, HEART, NORMAL } from './calc.mjs';
import { GLANDS_LETTERED, GLUCOSE } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const glandFig = svgV(GLANDS_LETTERED, 'Outline of the human body with five endocrine glands lettered A to E');
const sugarFig = svgV(GLUCOSE, 'Graph of blood sugar of Ravi and Meena at 0, 1 and 2 hours after a sweet drink');

// ---------------------------------------------------------------- t01 endocrine and exocrine glands; location and shape
add('ductless-mcq', mcq({
  stem: 'Endocrine glands are called ductless glands because they',
  right: 'pour their secretions directly into the blood', wrong: ['have no blood supply of their own', 'secrete only digestive enzymes', 'are found only inside the skull'],
  sol: 'Hormones pass straight from the gland cells into the blood flowing through the gland, so no duct is needed — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('mixed-mcq', mcq({
  stem: 'A gland sends a digestive juice through a duct into the duodenum and also releases two hormones into the blood. The gland is the',
  right: 'pancreas', wrong: ['pituitary', 'thyroid', 'adrenal'],
  sol: 'The pancreas has an exocrine part (pancreatic juice through the duct) and an endocrine part (islets releasing insulin and glucagon) — option (@K).',
  d: 2, c: 'application', t: [1, 2],
}));
add('thyroid-loc-mcq', mcq({
  stem: 'Where in the body is the thyroid gland found?',
  right: 'In the neck, on either side of the windpipe just below the larynx', wrong: ['At the base of the brain, below the hypothalamus', 'On the top of each kidney', 'In the loop of the duodenum, behind the stomach'],
  sol: 'The two lobes of the thyroid lie on either side of the trachea in the neck, joined by a narrow isthmus — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('fig-adrenal-mcq', mcq({
  stem: 'In the figure, which letter marks the gland that sits like a cap on top of a kidney?',
  right: 'C', wrong: ['A', 'B', 'D'],
  sol: 'C is the adrenal gland. A is the pituitary, B the thyroid, D the pancreas and E a testis — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [glandFig],
}));
add('shape-mcq', mcq({
  stem: 'Which pair of gland and shape is correctly matched?',
  right: 'Thyroid — two lobes joined by a narrow bridge, like a butterfly', wrong: ['Pituitary — long and leaf-like', 'Pancreas — the size of a pea', 'Adrenal — two lobes joined by a bridge in the neck'],
  sol: 'The thyroid is two-lobed (H- or butterfly-shaped); the pituitary is pea-sized, the pancreas long and leaf-like, the adrenal cap-shaped — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('endo-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: a chemical messenger made by a ductless gland and carried by the blood to a target organ.',
  model: '**Hormone.**',
  sol: 'Hormone.', scheme: [['Hormone', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-exo', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Salivary gland, Sweat gland, Thyroid, Lacrimal gland.',
  model: '**Thyroid**; the others are **exocrine glands** (they have ducts).',
  sol: 'The thyroid is ductless (endocrine).', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [1],
}));
add('reason-heterocrine', short({
  marks: 1, wl: null,
  stem: 'Give reason: the pancreas is called a heterocrine (mixed) gland.',
  model: 'It has an **exocrine part** (acini that send pancreatic juice through a duct) and an **endocrine part** (islets of Langerhans that release hormones into the blood).',
  sol: 'Both exocrine and endocrine parts.', scheme: [['Exocrine and endocrine parts named', 1]],
  d: 2, c: 'understanding', t: [1, 2],
}));
add('endo-exo-short', short({
  marks: 2,
  stem: 'State two differences between endocrine and exocrine glands, giving one example of each.',
  model: '1. Endocrine glands have **no ducts** and release **hormones into the blood**; exocrine glands release their secretions through **ducts** onto a surface or into a cavity.\n2. Example: **thyroid** (endocrine); **salivary gland** (exocrine).',
  sol: 'Ducts and route of secretion; examples.',
  scheme: [['Difference', 1], ['One example of each', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('glands-draw', short({
  marks: 3, wl: null,
  stem: 'Draw an outline of the human body and mark on it the positions of the pituitary, thyroid, pancreas and adrenal glands.',
  model: 'Outline of head, neck and trunk. **Pituitary**: a small dot at the base of the brain. **Thyroid**: two lobes on either side of the windpipe in the neck. **Pancreas**: a long, leaf-like gland below the stomach, its head in the loop of the duodenum. **Adrenals**: a cap on top of each kidney.',
  sol: 'Four glands correctly placed and labelled.',
  scheme: [['Neat outline', 1], ['Two glands correctly placed', 1], ['Other two glands correctly placed and all labelled', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 pancreas and thyroid
add('insulin-mcq', mcq({
  stem: 'Insulin lowers the level of sugar in the blood by',
  right: 'helping body cells take up glucose and making the liver store it as glycogen', wrong: ['changing the glycogen of the liver into glucose', 'stopping the digestion of starch in the intestine', 'sending more glucose out in the urine'],
  sol: 'Insulin increases glucose uptake by cells and its conversion to glycogen in the liver and muscles — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('glucagon-mcq', mcq({
  stem: 'Tara ran for an hour before breakfast and her blood sugar began to fall. Which hormone will now rise in her blood?',
  right: 'Glucagon, from the alpha cells of the islets', wrong: ['Insulin, from the beta cells of the islets', 'ADH, from the posterior pituitary', 'Oxytocin, from the posterior pituitary'],
  sol: 'Falling blood sugar triggers glucagon, which changes liver glycogen into glucose — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('diabetes-sign-mcq', mcq({
  stem: 'Which set of signs points to too little insulin in the body?',
  right: 'High blood sugar, sugar in the urine, frequent urination and great thirst', wrong: ['Low blood sugar, sweating and fainting', 'Bulging eyes, a fast heartbeat and loss of weight', 'A swollen neck with normal blood sugar'],
  sol: 'Shortage of insulin causes diabetes mellitus: blood sugar rises and spills into the urine, drawing water with it — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('iodine-mcq', mcq({
  stem: 'Iodised salt is supplied in hilly areas mainly to prevent',
  right: 'simple goitre', wrong: ['diabetes mellitus', 'diabetes insipidus', 'acromegaly'],
  sol: 'Iodine is needed to make thyroxine; its shortage enlarges the thyroid (simple goitre) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('cretin-mcq', mcq({
  stem: 'A three-year-old shows stunted growth, a puffy face, a protruding tongue and slow mental development. The most likely cause is',
  right: 'too little thyroxine from early childhood', wrong: ['too much growth hormone', 'too little ADH', 'too much adrenaline'],
  sol: 'These are signs of cretinism, caused by too little thyroxine in childhood — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('exoph-mcq', mcq({
  stem: 'Protruding eyeballs, a rapid heartbeat, nervousness and loss of weight are signs of',
  right: 'exophthalmic goitre, caused by excess thyroxine', wrong: ['myxoedema, caused by too little thyroxine', 'cretinism, caused by too little thyroxine', 'dwarfism, caused by too little growth hormone'],
  sol: 'Excess thyroxine speeds up metabolism and causes exophthalmic goitre — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('myx-mcq', mcq({
  stem: 'In an adult, too little thyroxine causes',
  right: 'myxoedema', wrong: ['cretinism', 'gigantism', 'exophthalmic goitre'],
  sol: 'Hyposecretion of thyroxine in adults causes myxoedema: low metabolic rate, puffy skin, sluggishness — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('insulin-ar', ar({
  a: 'A person whose islets make too little insulin passes sugar in the urine.',
  r: 'Without enough insulin, blood sugar rises above the level that the kidneys can take back into the blood.',
  key: 'c',
  sol: 'Both are true, and the very high blood sugar is exactly why some of it escapes into the urine — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('bmr-ar', ar({
  a: 'Thyroxine raises the rate of metabolism of the body.',
  r: 'Thyroxine contains iodine.',
  key: 'd',
  sol: 'Both statements are true, but the iodine content does not explain why thyroxine raises metabolism — option (d).',
  d: 2, c: 'analysis', t: [2],
}));
add('hypo-ar', ar({
  a: 'An overdose of injected insulin can make a person faint.',
  r: 'Insulin raises the level of sugar in the blood.',
  key: 'a',
  sol: 'The assertion is true: too much insulin drops blood sugar so low that the brain is starved of glucose. The reason is false: insulin lowers blood sugar — option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('glycogen-tf', tf({
  stem: 'Glucagon changes the glycogen stored in the liver into glucose.',
  key: 't',
  sol: 'True. This is how glucagon raises a falling blood sugar level.',
  d: 1, c: 'understanding', t: [2],
}));
add('beta-fill', fill({
  stem: 'Insulin is secreted by the ______ cells of the islets of Langerhans.',
  acc: [['beta', 'β', 'beta (β)']],
  sol: 'Beta cells.',
  d: 1, c: 'recall', t: [2],
}));
add('iodine-fill', fill({
  stem: 'The thyroid gland needs the element ______ to make thyroxine.',
  acc: [['iodine']],
  sol: 'Iodine.',
  d: 1, c: 'recall', t: [2],
}));
add('glycosuria-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the presence of glucose in the urine.',
  model: '**Glycosuria.**',
  sol: 'Glycosuria.', scheme: [['Glycosuria', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('odd-thyroid', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Cretinism, Myxoedema, Simple goitre, Gigantism.',
  model: '**Gigantism**; the others are **disorders of the thyroid gland**.',
  sol: 'Gigantism is a pituitary disorder.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [2, 4],
}));
add('reason-goitre', short({
  marks: 1, wl: null,
  stem: 'Give reason: goitre was once common in hilly regions far from the sea.',
  model: 'The soil, water and food there are **poor in iodine**, so the thyroid cannot make enough thyroxine and **enlarges**.',
  sol: 'Iodine deficiency.', scheme: [['Low iodine, so thyroid enlarges', 1]],
  d: 3, c: 'application', t: [2, 5],
}));
add('cret-myx-short', short({
  marks: 2,
  stem: 'Distinguish between cretinism and myxoedema, giving two points.',
  model: '1. **Cretinism** is due to too little thyroxine in **childhood**; **myxoedema** is due to too little thyroxine in **adults**.\n2. Cretinism causes **stunted growth and delayed mental development**; myxoedema causes **puffy skin, low metabolic rate and sluggishness**.',
  sol: 'Age of onset; effects.',
  scheme: [['Age difference', 1], ['Effects difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('sugar-balance-short', short({
  marks: 3,
  stem: 'Explain how insulin and glucagon together keep the blood sugar level within the normal range.',
  model: `After a meal blood sugar rises, so the **beta cells** release **insulin**: cells take up glucose and the liver stores the extra as **glycogen**, and the level falls. When blood sugar falls, the **alpha cells** release **glucagon**: the liver changes **glycogen back to glucose**, and the level rises. The two act in opposite ways, keeping it near ${NORMAL.low}–${NORMAL.high} mg per 100 mL.`,
  sol: 'Opposite actions of insulin and glucagon.',
  scheme: [['Insulin after a meal: glucose stored as glycogen', 1], ['Glucagon when low: glycogen to glucose', 1], ['Opposite actions keep the level steady', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('ravi-num', num({
  stem: `Study the graph. By how much did Ravi's blood sugar rise during the first hour after the sweet drink (in mg per 100 mL)?`,
  value: SUGAR.raviRise, unit: 'mg per 100 mL',
  sol: `Rise $= ${SUGAR.ravi[1]} - ${SUGAR.ravi[0]} = ${SUGAR.raviRise}$ mg per 100 mL.`,
  scheme: [[`${SUGAR.raviRise}`, 1]],
  d: 2, c: 'application', t: [2],
  assets: [sugarFig],
}), (q) => q.answer.value === 55 || 'value');

// ---------------------------------------------------------------- t03 adrenal gland
add('cortex-mcq', mcq({
  stem: 'The hormones that help to control the balance of salts and water in the body come from the',
  right: 'adrenal cortex', wrong: ['adrenal medulla', 'thyroid gland', 'islets of Langerhans'],
  sol: 'Cortical hormones of the adrenal cortex regulate salt and water balance and help in carbohydrate metabolism — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('fright-mcq', mcq({
  stem: 'Kiran hears a loud crash at night. Her heart races, her pupils widen and she breathes faster. These changes are caused mainly by',
  right: 'adrenaline from the adrenal medulla', wrong: ['thyroxine from the thyroid', 'insulin from the pancreas', 'ADH from the pituitary'],
  sol: 'Sudden fear makes the adrenal medulla release adrenaline, the emergency hormone — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('adr-sugar-mcq', mcq({
  stem: 'In an emergency, adrenaline makes more glucose available to the muscles by',
  right: 'changing liver glycogen into glucose', wrong: ['slowing down the heartbeat', 'storing glucose as glycogen', 'narrowing the pupils'],
  sol: 'Adrenaline, like glucagon, breaks down liver glycogen into glucose, raising blood sugar for energy — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('adrenaline-ar', ar({
  a: 'Adrenaline is called the emergency hormone.',
  r: 'Adrenaline prepares the body to face or escape danger by raising the heartbeat, breathing rate and blood sugar.',
  key: 'c',
  sol: 'Both are true, and its quick preparation of the body for danger is why it is called the emergency hormone — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('adrenaline-tf', tf({
  stem: 'Adrenaline narrows the pupils and slows the heartbeat.',
  key: 'f',
  sol: 'False. Adrenaline widens (dilates) the pupils and speeds up the heartbeat.',
  d: 2, c: 'understanding', t: [3],
}));
add('medulla-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the inner region of the adrenal gland that secretes adrenaline.',
  model: '**Adrenal medulla.**',
  sol: 'Adrenal medulla.', scheme: [['Adrenal medulla', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('odd-adrenal', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Faster heartbeat, Dilated pupils, Raised blood sugar, Slower breathing.',
  model: '**Slower breathing**; the others are **effects of adrenaline** in an emergency.',
  sol: 'Adrenaline makes breathing faster.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [3],
}));
add('cortex-medulla-short', short({
  marks: 2,
  stem: 'Name the hormones of the adrenal cortex and of the adrenal medulla, and state one function of each.',
  model: '**Cortex:** cortical hormones (corticoids such as cortisol and aldosterone); they regulate **salt and water balance** and **carbohydrate metabolism**.\n**Medulla:** **adrenaline**; it prepares the body for an **emergency**.',
  sol: 'Cortical hormones; adrenaline.',
  scheme: [['Cortex hormones and function', 1], ['Medulla hormone and function', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('blood-muscle-short', short({
  marks: 2,
  stem: 'During a fright, adrenaline sends more blood to the skeletal muscles and less to the gut. How does this help the person?',
  model: 'The muscles get **more oxygen and glucose** to release energy quickly for **running or fighting**. Digestion is **not urgent** in danger, so blood is moved away from the gut.',
  sol: 'Energy to muscles; digestion can wait.',
  scheme: [['More oxygen and glucose to muscles for action', 1], ['Digestion not needed in an emergency', 1]],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 pituitary gland
add('master-mcq', mcq({
  stem: 'The pituitary is called the master gland because it',
  right: 'secretes tropic hormones that control several other endocrine glands', wrong: ['is the largest gland in the body', 'secretes insulin and glucagon', 'lies in the neck next to the windpipe'],
  sol: 'Its tropic hormones (TSH, ACTH, FSH, LH) direct the thyroid, adrenal cortex and gonads — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('dwarf-mcq', mcq({
  stem: 'A 14-year-old is much shorter than his classmates, but his body is well proportioned and his schoolwork is normal. The likely cause is',
  right: 'too little growth hormone during childhood', wrong: ['too little thyroxine during childhood', 'too much ADH', 'too much growth hormone in adulthood'],
  sol: 'A short but proportionate body with normal intelligence is pituitary dwarfism — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('acromegaly-mcq', mcq({
  stem: 'Excess growth hormone in an adult causes',
  right: 'acromegaly, with enlarged jaw, hands and feet', wrong: ['gigantism, with a very tall body', 'dwarfism', 'cretinism'],
  sol: 'Once the long bones stop growing, excess growth hormone thickens the bones of the face, hands and feet — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('adh-mcq', mcq({
  stem: 'ADH (vasopressin) acts on the',
  right: 'kidney tubules, increasing the reabsorption of water', wrong: ['muscles of the uterus, causing contractions', 'thyroid, causing the release of thyroxine', 'liver, changing glycogen into glucose'],
  sol: 'ADH makes the kidney tubules take back more water, so less urine is formed — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('oxytocin-mcq', mcq({
  stem: 'Which hormone causes the muscles of the uterus to contract during childbirth?',
  right: 'Oxytocin', wrong: ['ADH', 'TSH', 'Glucagon'],
  sol: 'Oxytocin from the posterior pituitary contracts the uterus and helps release milk — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('insipidus-mcq', mcq({
  stem: `A patient passes about ${URINE.patient} litres of very dilute urine a day and is always thirsty, though his blood sugar is normal. Which hormone is likely to be deficient?`,
  right: 'ADH', wrong: ['Insulin', 'Thyroxine', 'Adrenaline'],
  sol: 'Normal blood sugar rules out diabetes mellitus; lots of dilute urine points to shortage of ADH (diabetes insipidus) — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('master-ar', ar({
  a: 'The pituitary is called the master gland.',
  r: 'The pituitary lies at the base of the brain.',
  key: 'd',
  sol: 'Both are true, but its position does not explain the name; the name comes from its tropic hormones that control other glands — option (d).',
  d: 2, c: 'analysis', t: [4],
}));
add('adh-ar', ar({
  a: 'A person short of ADH passes large amounts of dilute urine.',
  r: 'ADH increases the reabsorption of water from the kidney tubules.',
  key: 'c',
  sol: 'Both are true; without ADH the tubules take back little water, so much dilute urine is passed — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('tropic-ar', ar({
  a: 'ACTH is secreted by the adrenal cortex.',
  r: 'ACTH stimulates the adrenal cortex to secrete its hormones.',
  key: 'b',
  sol: 'The assertion is false: ACTH comes from the anterior pituitary. The reason is true: it acts on the adrenal cortex — option (b).',
  d: 3, c: 'analysis', t: [4, 3],
}));
add('adh-fill', fill({
  stem: 'A shortage of ADH causes diabetes ______.',
  acc: [['insipidus']],
  sol: 'Diabetes insipidus.',
  d: 1, c: 'recall', t: [4],
}));
add('tropic-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: a hormone that stimulates another endocrine gland to release its own hormone.',
  model: '**Tropic (trophic) hormone.**',
  sol: 'Tropic hormone.', scheme: [['Tropic hormone', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('odd-pit', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: TSH, ACTH, Growth hormone, Insulin.',
  model: '**Insulin**; the others are **hormones of the anterior pituitary**.',
  sol: 'Insulin comes from the pancreas.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [4],
}));
add('reason-insipidus', short({
  marks: 1, wl: null,
  stem: 'Give reason: diabetes insipidus does not cause sugar in the urine.',
  model: 'It is due to a shortage of **ADH**, which affects only the **reabsorption of water**, not the control of blood sugar.',
  sol: 'ADH controls water, not sugar.', scheme: [['ADH controls water only', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('dwarf-cretin-short', short({
  marks: 2,
  stem: 'Give two differences between a pituitary dwarf and a cretin.',
  model: '1. A pituitary dwarf lacks **growth hormone**; a cretin lacks **thyroxine**.\n2. A pituitary dwarf has a **proportionate body and normal intelligence**; a cretin has a **disproportionate body and delayed mental development**.',
  sol: 'Hormone; body and mind.',
  scheme: [['Hormone lacking', 1], ['Body and intelligence', 1]],
  d: 3, c: 'analysis', t: [4, 2],
}));
add('gh-excess-short', short({
  marks: 2,
  stem: 'Name the two disorders caused by too much growth hormone, and state when each develops.',
  model: '**Gigantism** develops when growth hormone is in excess in **childhood**, while the long bones can still lengthen. **Acromegaly** develops when the excess occurs in **adulthood**, after the long bones have stopped growing.',
  sol: 'Gigantism (child); acromegaly (adult).',
  scheme: [['Gigantism in childhood', 1], ['Acromegaly in adulthood', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('pit-hormones-short', short({
  marks: 3,
  stem: 'Name three hormones of the anterior pituitary and state the target of each.',
  model: '1. **Growth hormone** — acts on bones and muscles of the whole body.\n2. **TSH** (thyroid-stimulating hormone) — acts on the **thyroid**.\n3. **ACTH** (adrenocorticotropic hormone) — acts on the **adrenal cortex**.\n(FSH and LH, which act on the **gonads**, are also accepted.)',
  sol: 'Any three with targets.',
  scheme: [['First hormone and target', 1], ['Second hormone and target', 1], ['Third hormone and target', 1]],
  d: 2, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- t05 feedback: TSH and thyroxine
add('tsh-low-mcq', mcq({
  stem: 'When the level of thyroxine in the blood falls, the anterior pituitary',
  right: 'releases more TSH', wrong: ['stops releasing TSH', 'releases more ADH', 'releases insulin'],
  sol: 'Low thyroxine is sensed and more TSH is released to stimulate the thyroid — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('feedback-high-mcq', mcq({
  stem: 'A woman takes thyroxine tablets for some months. The TSH level in her blood is most likely to',
  right: 'fall', wrong: ['rise', 'stay exactly the same', 'change into thyroxine'],
  sol: 'High thyroxine in the blood inhibits TSH release (negative feedback) — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('goitre-tsh-mcq', mcq({
  stem: 'In iodine deficiency the thyroid swells because',
  right: 'low thyroxine makes the pituitary release more TSH, which keeps stimulating the thyroid', wrong: ['iodine collects in the neck', 'the thyroid makes too much thyroxine', 'ADH makes the thyroid absorb water'],
  sol: 'Without iodine little thyroxine is made; feedback raises TSH, and the constantly stimulated thyroid enlarges — option (@K).',
  d: 4, c: 'analysis', t: [5, 2],
}));
add('feedback-tf', tf({
  stem: 'In the feedback control of the thyroid, a rise in the thyroxine level reduces the release of TSH.',
  key: 't',
  sol: 'True. This negative feedback stops the thyroid from over-producing thyroxine.',
  d: 2, c: 'understanding', t: [5],
}));
add('feedback-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: a control system in which a rise in a hormone reduces the signal that caused its release.',
  model: '**Negative feedback.**',
  sol: 'Negative feedback.', scheme: [['Negative feedback', 1]],
  d: 2, c: 'recall', t: [5],
}));
add('feedback-short', short({
  marks: 2,
  stem: 'Explain how the level of thyroxine in the blood controls the release of TSH.',
  model: 'When thyroxine is **low**, the pituitary releases **more TSH**, which makes the thyroid secrete more thyroxine. When thyroxine is **high**, TSH release is **reduced**, so the thyroid secretes less. This **negative feedback** keeps thyroxine steady.',
  sol: 'Low thyroxine raises TSH; high thyroxine lowers TSH.',
  scheme: [['Low thyroxine: more TSH', 1], ['High thyroxine: less TSH', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('feedback-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a labelled flow diagram to show the feedback control between the pituitary and the thyroid.',
  model: 'Boxes: **Anterior pituitary** → (TSH) → **Thyroid** → (thyroxine) → **body cells**. A return arrow from thyroxine to the pituitary marked **high thyroxine: less TSH (−)**, and another marked **low thyroxine: more TSH (+)**.',
  sol: 'Loop with TSH, thyroxine and feedback arrows.',
  scheme: [['Pituitary to thyroid with TSH', 1], ['Thyroxine to body cells', 1], ['Feedback arrows labelled', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('sugar-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [insulin, glucagon, glycogen, islets of Langerhans, beta, alpha, thyroxine, diabetes mellitus]\n\nThe endocrine part of the pancreas is made of the (a) ______. Their (b) ______ cells secrete a hormone which, after a meal, is released as (c) ______. It helps the liver store extra glucose as (d) ______. If too little of this hormone is made, the person suffers from (e) ______.',
  acc: [['islets of Langerhans'], ['beta', 'β'], ['insulin'], ['glycogen'], ['diabetes mellitus']],
  sol: '(a) islets of Langerhans; (b) beta; (c) insulin; (d) glycogen; (e) diabetes mellitus.',
  d: 2, c: 'understanding', t: [2],
}));
add('pit-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [ADH, oxytocin, TSH, growth hormone, tropic, master, posterior, anterior]\n\nThe pituitary is called the (a) ______ gland because its (b) ______ hormones control other glands. Its anterior lobe secretes (c) ______, which makes the thyroid release thyroxine. Its (d) ______ lobe releases ADH and (e) ______, which contracts the uterus at childbirth.',
  acc: [['master'], ['tropic', 'trophic'], ['TSH'], ['posterior'], ['oxytocin']],
  sol: '(a) master; (b) tropic; (c) TSH; (d) posterior; (e) oxytocin.',
  d: 2, c: 'understanding', t: [4, 5],
}));
add('gland-match5', match({
  marks: 5,
  stem: 'Study the figure of the human body and match each lettered gland with its function.',
  pairs: [
    ['A', 'Releases hormones that control several other glands'],
    ['B', 'Releases an iodine-containing hormone that sets the rate of metabolism'],
    ['C', 'Releases the emergency hormone and salt-regulating hormones'],
    ['D', 'Releases hormones that raise and lower blood sugar'],
    ['E', 'Releases the hormone that brings about male secondary sexual characters'],
  ],
  order: [3, 0, 4, 2, 1],
  sol: 'A pituitary; B thyroid; C adrenal; D pancreas (islets); E testis.',
  d: 2, c: 'application', t: [1, 2, 3, 4],
  assets: [glandFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, Section B style)
add('glucose-case', mk.case({
  stem: 'Study the graph and answer the questions.',
  passage: `Ravi and Meena each drank a glass of glucose water after an overnight fast. A nurse measured their blood sugar (mg per 100 mL of blood) every hour:\n\n| Time | Ravi | Meena |\n|---|---|---|\n| 0 h | ${SUGAR.ravi[0]} | ${SUGAR.meena[0]} |\n| 1 h | ${SUGAR.ravi[1]} | ${SUGAR.meena[1]} |\n| 2 h | ${SUGAR.ravi[2]} | ${SUGAR.meena[2]} |`,
  d: 3, c: 'analysis',
  assets: [sugarFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which of the two is likely to have diabetes mellitus?', model: '**Meena.**', sol: 'Meena: high fasting level that stays high.', scheme: [['Meena', 1]], d: 1, c: 'application', t: [2] })),
    part('b', num({ marks: 2, stem: "By how much did Meena's blood sugar rise in the first hour (mg per 100 mL)?", value: SUGAR.meenaRise, unit: 'mg per 100 mL', sol: `Rise $= ${SUGAR.meena[1]} - ${SUGAR.meena[0]} = ${SUGAR.meenaRise}$ mg per 100 mL.`, scheme: [['Correct readings used', 1], [`${SUGAR.meenaRise}`, 1]], d: 2, c: 'application', t: [2] })),
    part('c', short({ marks: 2, stem: "Explain why Ravi's blood sugar fell back close to normal within two hours.", model: 'The rise in blood sugar made the **beta cells** of his islets release **insulin**. Insulin made his body cells **take up glucose** and his liver **store it as glycogen**, so the level fell.', sol: 'Insulin released and acted.', scheme: [['Insulin released by beta cells', 1], ['Glucose taken up and stored as glycogen', 1]], d: 2, c: 'understanding', t: [2] })),
    part('d', short({ marks: 2, stem: 'State two signs, other than high blood sugar, that Meena may notice.', model: '1. **Frequent urination**, with sugar in the urine (glycosuria).\n2. **Great thirst**, with tiredness and loss of weight in spite of eating well.', sol: 'Any two signs.', scheme: [['First sign', 1], ['Second sign', 1]], d: 2, c: 'understanding', t: [2] }), [
      short({ marks: 2, stem: 'Give two reasons why insulin is given to patients by injection and not as a tablet.', model: '1. Insulin is a **protein**, so it would be **digested** by enzymes in the stomach and intestine.\n2. An injection puts it **directly into the blood**, where it must act, in a measured dose.', sol: 'Protein digested; direct to blood.', scheme: [['Digested as a protein', 1], ['Reaches the blood directly', 1]], d: 3, c: 'analysis', t: [2] }),
    ]),
    part('e', short({ marks: 3, stem: 'One day Meena injected too much insulin and became shaky, sweaty and faint. Explain why, and name the hormone her body would release to correct it.', model: 'Too much insulin drove her blood sugar **far below normal** (hypoglycaemia). The **brain** depends on glucose, so it was starved of energy and she felt faint. Her **alpha cells** would release **glucagon**, which changes liver **glycogen into glucose** and raises the level.', sol: 'Hypoglycaemia; glucagon corrects it.', scheme: [['Blood sugar too low', 1], ['Brain short of glucose', 1], ['Glucagon converts glycogen to glucose', 1]], d: 3, c: 'analysis', t: [2] })),
  ],
}));
add('fright-case', mk.case({
  passage: `Arun was cycling home when a dog suddenly chased him. A fitness band on his wrist showed his heart rate jump from ${HEART.rest} to ${HEART.fright} beats per minute. He pedalled faster than ever, his mouth went dry and his hair stood on end. Twenty minutes after reaching home, his heart rate was normal again.`,
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the hormone responsible for these changes.', model: '**Adrenaline.**', sol: 'Adrenaline.', scheme: [['Adrenaline', 1]], d: 1, c: 'recall', t: [3] })),
    part('b', num({ stem: "By how many beats per minute did Arun's heart rate rise?", value: HEART.rise, sol: `Rise $= ${HEART.fright} - ${HEART.rest} = ${HEART.rise}$ beats per minute.`, scheme: [[`${HEART.rise}`, 1]], d: 1, c: 'application', t: [3] })),
    part('c', short({ marks: 2, stem: 'State two other changes that this hormone brings about in the body, besides a faster heartbeat.', model: '1. **Faster and deeper breathing** to take in more oxygen.\n2. **Rise in blood sugar**, as liver glycogen changes into glucose; the pupils also **dilate**.', sol: 'Any two other effects.', scheme: [['First change', 1], ['Second change', 1]], d: 2, c: 'understanding', t: [3] })),
    part('d', short({ marks: 3, stem: 'Explain how the faster heartbeat and the rise in blood sugar helped Arun to escape.', model: 'Extra **glucose** in the blood is fuel for the leg muscles. The **faster heartbeat** pumps more blood, so this glucose and more **oxygen** reach the muscles quickly. The muscles can then **release more energy** by respiration, so Arun could pedal **harder and faster** than usual.', sol: 'More glucose and oxygen to muscles, more energy.', scheme: [['Glucose as fuel', 1], ['More blood carries oxygen and glucose', 1], ['More energy for the muscles', 1]], d: 3, c: 'application', t: [3] })),
    part('e', short({ marks: 3, stem: 'Name the gland and the region of it that released this hormone. Where is the gland located? Name one hormone of its other region.', model: '**Adrenal gland**; the inner region, the **adrenal medulla**. It sits like a **cap on top of each kidney**. The outer region, the **adrenal cortex**, secretes **cortical hormones** such as cortisol.', sol: 'Adrenal medulla; on the kidney; cortical hormones.', scheme: [['Adrenal medulla', 1], ['On top of each kidney', 1], ['Cortical hormone of the cortex', 1]], d: 2, c: 'recall', t: [1, 3] }), [
      short({ marks: 3, stem: 'Why is adrenaline called the "fight or flight" hormone? Give three effects that support the name.', model: 'It prepares the body either to **face** danger or to **run** from it. Effects: (1) the **heart beats faster**, sending more blood to the muscles; (2) **breathing quickens**, taking in more oxygen; (3) **blood sugar rises**, giving more fuel for energy.', sol: 'Prepares for action; three effects.', scheme: [['Meaning of the name', 1], ['Two effects', 1], ['Third effect', 1]], d: 2, c: 'understanding', t: [3] }),
    ]),
  ],
}));
add('goitre-case', mk.case({
  passage: 'In a village high in the hills, a health team found that many adults had a swelling at the front of the neck. The soil and drinking water of the area were poor in a particular element. After the shops began selling only iodised salt, far fewer new cases appeared over the next ten years.',
  d: 4, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the condition seen in the villagers.', model: '**Simple goitre** (enlarged thyroid).', sol: 'Simple goitre.', scheme: [['Simple goitre', 1]], d: 1, c: 'application', t: [2] })),
    part('b', short({ marks: 1, wl: null, stem: 'Name the hormone that their thyroid could not make in enough quantity.', model: '**Thyroxine.**', sol: 'Thyroxine.', scheme: [['Thyroxine', 1]], d: 1, c: 'recall', t: [2] })),
    part('c', short({ marks: 3, stem: 'Using the feedback between TSH and thyroxine, explain why the thyroid gland became enlarged.', model: 'Without enough **iodine**, little **thyroxine** was made. The low thyroxine level made the anterior pituitary release **more TSH** (feedback). TSH kept **stimulating the thyroid** to work harder, so the gland grew **larger**, yet it still could not make enough thyroxine.', sol: 'Low thyroxine, high TSH, overstimulated thyroid.', scheme: [['Low thyroxine', 1], ['More TSH by feedback', 1], ['Thyroid overstimulated and enlarges', 1]], d: 4, c: 'analysis', t: [5, 2] })),
    part('d', short({ marks: 2, stem: 'Why did the use of iodised salt reduce new cases?', model: 'Iodised salt supplied the **iodine** needed to make **thyroxine**. With normal thyroxine, TSH release **fell** back to normal, so the thyroid was no longer **overstimulated**.', sol: 'Iodine restored thyroxine and normal TSH.', scheme: [['Iodine for thyroxine', 1], ['TSH returns to normal', 1]], d: 3, c: 'application', t: [2, 5] })),
    part('e', short({ marks: 3, stem: 'A baby born in the village before the change grew slowly and was late to talk. Name the likely condition and give two more signs of it.', model: '**Cretinism**, due to too little thyroxine from early childhood. Other signs: a **puffy face** with a protruding tongue, and **stunted, disproportionate growth** of the body with **delayed mental development**.', sol: 'Cretinism; two signs.', scheme: [['Cretinism', 1], ['First sign', 1], ['Second sign', 1]], d: 3, c: 'application', t: [2] }), [
      short({ marks: 3, stem: 'Give three differences between simple goitre and exophthalmic goitre.', model: '1. Simple goitre: due to **lack of iodine**; exophthalmic: due to **excess thyroxine**.\n2. Simple goitre: **normal or low** metabolic rate; exophthalmic: **high** metabolic rate.\n3. Simple goitre: eyes normal; exophthalmic: **protruding eyeballs**, with a fast heartbeat.', sol: 'Cause, metabolic rate, eyes.', scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]], d: 3, c: 'analysis', t: [2] }),
    ]),
  ],
}));
add('insipidus-case', mk.case({
  passage: `Mr Sen passes about ${URINE.patient} litres of pale, watery urine a day, while a typical adult passes about ${URINE.normal} litres. He is thirsty all the time. Tests show that his blood sugar is normal and his urine contains no glucose. His doctor finds that one hormone of his posterior pituitary is in short supply.`,
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the hormone that is in short supply.', model: '**ADH** (antidiuretic hormone, vasopressin).', sol: 'ADH.', scheme: [['ADH', 1]], d: 2, c: 'application', t: [4] })),
    part('b', num({ stem: 'How many times the typical volume of urine does Mr Sen pass?', value: URINE.times, sol: `$${URINE.patient} \\div ${URINE.normal} = ${URINE.times}$ times.`, scheme: [[`${URINE.times} times`, 1]], d: 2, c: 'application', t: [4] })),
    part('c', short({ marks: 2, stem: 'State the normal action of this hormone and the organ on which it acts.', model: 'ADH acts on the **kidneys**. It makes the kidney tubules **reabsorb more water** into the blood, so a small volume of **concentrated urine** is passed.', sol: 'Kidney tubules, water reabsorption.', scheme: [['Kidney tubules', 1], ['More water reabsorbed', 1]], d: 2, c: 'understanding', t: [4] })),
    part('d', short({ marks: 2, stem: 'Give two differences between Mr Sen\'s condition and diabetes mellitus.', model: '1. Mr Sen has **diabetes insipidus**, due to lack of **ADH**; diabetes mellitus is due to lack of **insulin**.\n2. His urine has **no sugar**; in diabetes mellitus the urine contains **glucose**.', sol: 'Hormone; sugar in urine.', scheme: [['Hormone difference', 1], ['Sugar in urine difference', 1]], d: 3, c: 'analysis', t: [4, 2] })),
    part('e', short({ marks: 2, stem: 'Why does Mr Sen feel thirsty all the time?', model: 'He **loses a lot of water** in his urine, so his blood becomes **more concentrated** and the body runs short of water. Thirst makes him **drink** to replace the loss.', sol: 'Water loss causes thirst.', scheme: [['Large water loss', 1], ['Thirst replaces water', 1]], d: 2, c: 'application', t: [4] })),
    part('f', short({ marks: 2, stem: 'Name the other hormone released from the same lobe of the pituitary and state one of its functions.', model: '**Oxytocin.** It makes the **muscles of the uterus contract** during childbirth and helps the **release of milk** from the breasts.', sol: 'Oxytocin; uterine contraction.', scheme: [['Oxytocin', 1], ['Function', 1]], d: 2, c: 'recall', t: [4] })),
  ],
}));
add('glandfig-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: 'The figure shows the outline of a human male body with five endocrine glands lettered A to E.',
  d: 3, c: 'application',
  assets: [glandFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the gland labelled A and state its shape.', model: '**Pituitary**; it is **pea-sized** (small and rounded).', sol: 'Pituitary, pea-sized.', scheme: [['Pituitary, pea-sized', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', short({ marks: 2, stem: 'Name the hormone of gland B and one effect of its deficiency in an adult.', model: 'B is the thyroid; its hormone is **thyroxine**. Deficiency in an adult causes **myxoedema**: low metabolic rate, puffy skin and sluggishness.', sol: 'Thyroxine; myxoedema.', scheme: [['Thyroxine', 1], ['Myxoedema or its signs', 1]], d: 2, c: 'understanding', t: [2] })),
    part('c', short({ marks: 2, stem: 'Gland D is both exocrine and endocrine. Explain.', model: 'D is the pancreas. Its **acini** make **pancreatic juice**, which flows through a **duct** to the duodenum (exocrine). Its **islets of Langerhans** release **insulin and glucagon** into the blood (endocrine).', sol: 'Acini with duct; islets into blood.', scheme: [['Exocrine part', 1], ['Endocrine part', 1]], d: 2, c: 'understanding', t: [1, 2] })),
    part('d', short({ marks: 2, stem: 'Which lettered gland releases the emergency hormone? Name the hormone and the region of the gland that releases it.', model: '**C**, the adrenal gland that sits on top of the kidney. The emergency hormone is **adrenaline**, released by its inner region, the **adrenal medulla**, when a person is frightened or angry.', sol: 'C, adrenaline, medulla.', scheme: [['C', 1], ['Adrenaline from the medulla', 1]], d: 2, c: 'application', t: [3] })),
    part('e', short({ marks: 3, stem: 'Gland A is called the master gland. Explain why, naming the hormones of A that act on glands B, C and E.', model: 'Gland A secretes **tropic hormones** that control other glands: **TSH** acts on **B** (thyroid), **ACTH** on **C** (adrenal cortex), and **FSH and LH** on **E** (testis). By controlling these glands it directs much of the endocrine system.', sol: 'TSH, ACTH, FSH/LH.', scheme: [['TSH on B', 1], ['ACTH on C', 1], ['FSH or LH on E', 1]], d: 3, c: 'analysis', t: [4] })),
  ],
}));
add('height-case', mk.case({
  passage: 'A clinic recorded three patients:\n\n- **P**, aged 12, is far shorter than other children of his age; his body is well proportioned and he does well at school.\n- **Q**, aged 40, has noticed over some years that his jaw, hands and feet have become larger.\n- **R**, aged 6, is short, has a puffy face and is slow to learn.',
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 3, wl: null, stem: 'Name the disorder of each patient, P, Q and R.', model: 'P: **dwarfism** (pituitary dwarf). Q: **acromegaly**. R: **cretinism**.', sol: 'Dwarfism, acromegaly, cretinism.', scheme: [['P dwarfism', 1], ['Q acromegaly', 1], ['R cretinism', 1]], d: 2, c: 'application', t: [4, 2] })),
    part('b', short({ marks: 2, stem: 'Name the hormone and the gland involved in the disorders of P and Q.', model: 'Both disorders involve **growth hormone**, released by the **anterior lobe of the pituitary**. P made too little of it during childhood, while Q has been making too much of it as an adult.', sol: 'Growth hormone, anterior pituitary.', scheme: [['Growth hormone', 1], ['Anterior pituitary', 1]], d: 2, c: 'recall', t: [4] })),
    part('c', short({ marks: 2, stem: 'Why is R\'s condition not due to the pituitary alone? State the gland and hormone involved.', model: 'R shows **slow mental development** and a **puffy face**, which a lack of growth hormone does not cause. These point to the **thyroid**, which makes too little **thyroxine**.', sol: 'Thyroid, thyroxine.', scheme: [['Mental and facial signs point to the thyroid', 1], ['Thyroxine', 1]], d: 3, c: 'analysis', t: [2, 4] })),
    part('d', short({ marks: 2, stem: 'Q has too much of a growth-promoting hormone, yet he has not grown taller. Why?', model: 'In adults the **long bones** of the arms and legs have **stopped growing in length**. Excess growth hormone can then only **thicken** bones such as those of the **jaw, hands and feet**.', sol: 'Long bones stopped lengthening.', scheme: [['Long bones no longer lengthen', 1], ['Only face, hands, feet thicken', 1]], d: 3, c: 'analysis', t: [4] })),
    part('e', short({ marks: 1, wl: null, stem: 'Which patient would be helped most by thyroxine tablets?', model: '**R.**', sol: 'R (cretinism).', scheme: [['R', 1]], d: 2, c: 'application', t: [2] })),
  ],
}));

