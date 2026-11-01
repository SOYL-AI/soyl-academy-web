// ICSE 10 Biology ch12 Endocrine System — Part 1 (t01–t02), Part 2 (t03–t05).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { GLANDS, FEEDBACK, PANCREAS, GLUCOSE } from './svgs.mjs';
import { SUGAR, HEART, URINE, NORMAL } from './calc.mjs';

export const V = {
  glands: svgV(GLANDS, 'Positions of the pituitary, thyroid, pancreas, adrenal glands and testes in the human body'),
  feedback: svgV(FEEDBACK, 'Feedback loop between TSH from the pituitary and thyroxine from the thyroid'),
  pancreas: svgV(PANCREAS, 'The pancreas with an exocrine acinus and an endocrine islet of Langerhans'),
  glucose: svgV(GLUCOSE, 'Blood sugar of Ravi and Meena after a sweet drink'),
  sugar: flow('TB', [['hi', 'Blood sugar rises after a meal'], ['ins', 'Beta cells release insulin'], ['st', 'Cells take up glucose; liver stores glycogen'], ['n', 'Normal blood sugar'], ['lo', 'Blood sugar falls between meals'], ['glu', 'Alpha cells release glucagon'], ['rel', 'Liver changes glycogen to glucose']], [['hi', 'ins'], ['ins', 'st'], ['st', 'n', 'level falls'], ['lo', 'glu'], ['glu', 'rel'], ['rel', 'n', 'level rises']], 'Flow: a rise in blood sugar leads to insulin and storage as glycogen; a fall leads to glucagon and release of glucose; both return the level to normal'),
};

export const deck1 = deck({
  part: 1,
  title: 'Endocrine System — Part 1: Glands, the pancreas and the thyroid',
  goals: [
    'Distinguish endocrine from exocrine glands and locate the pituitary, thyroid, adrenals and pancreas',
    'Explain how insulin and glucagon keep blood sugar steady',
    'Relate too little or too much insulin or thyroxine to their disorders',
  ],
  slides: [
    sl('title', 'The Endocrine System', {
      b: 'Part 1 — chemical messengers, the glands that make them, and how the pancreas and thyroid control the body.',
      v: flow('LR', [['g', 'Endocrine gland'], ['h', 'Hormone into blood'], ['t', 'Target organ'], ['r', 'Response']], [['g', 'h'], ['h', 't'], ['t', 'r']], 'Flow: an endocrine gland releases a hormone into the blood, which carries it to a target organ that responds'),
      n: 'Your nerves send fast electrical messages. But your body also has a slower postal service. Glands release chemical messengers called hormones into the blood, and the blood delivers them to organs far away. In this part we meet the glands and two important hormone systems.',
    }),
    sl('concept', 'Endocrine and exocrine glands', {
      b: '**Endocrine glands** are **ductless**: they pour **hormones** straight into the blood. **Exocrine glands** send their secretions through **ducts**.',
      v: table(['Point', 'Endocrine gland', 'Exocrine gland'], [['Duct', 'Absent (ductless)', 'Present'], ['Secretion', 'Hormones', 'Enzymes, sweat, tears, saliva'], ['Goes to', 'Blood, then the target organ', 'A surface or a cavity'], ['Examples', 'Thyroid, pituitary, adrenal', 'Salivary, sweat, lacrimal glands']], 'Table comparing endocrine and exocrine glands on ducts, secretion, destination and examples'),
      n: 'An exocrine gland is like a tap with a pipe. Saliva and sweat flow through ducts to where they are needed. An endocrine gland has no pipe. Its hormone soaks into the blood running through it and is carried all over the body.',
    }),
    sl('diagram', 'Where the glands are', {
      b: '**Pituitary**: pea-sized, at the base of the brain. **Thyroid**: two lobes in the neck. **Pancreas**: long and leaf-like, behind the stomach. **Adrenals**: a cap on each kidney.',
      v: V.glands,
      n: 'Start at the head. The pea sized pituitary hangs below the brain. In the neck, the thyroid wraps its two lobes around the windpipe. Lower down, the long pancreas lies behind the stomach, and each kidney wears an adrenal gland like a cap.',
    }),
    sl('diagram', 'The pancreas: a mixed gland', {
      b: 'The **acini** send pancreatic juice through a **duct** (exocrine). The **islets of Langerhans** release hormones into the **blood** (endocrine): **beta cells** make **insulin**, **alpha cells** make **glucagon**.',
      v: V.pancreas,
      n: 'Most of the pancreas makes digestive juice, which flows through a duct to the duodenum. Scattered among these cells are tiny islands, the islets of Langerhans. Their beta cells make insulin and their alpha cells make glucagon, and both hormones go straight into the blood.',
    }),
    sl('check', 'Quick check: a mixed gland', {
      b: 'Which gland sends juice through a duct and also releases two hormones?',
      chk: 'mixed-mcq',
      n: 'Think of the gland that sits in the loop of the duodenum.',
    }),
    sl('diagram', 'Insulin and glucagon keep sugar steady', {
      b: `**Insulin** lowers blood sugar; **glucagon** raises it. Together they hold it near **${NORMAL.low}–${NORMAL.high} mg per 100 mL** of blood.`,
      v: V.sugar,
      n: 'After a meal, sugar floods into the blood. The beta cells answer with insulin, and the liver stores the extra as glycogen. Between meals the level drops, so the alpha cells release glucagon and the liver turns glycogen back into glucose. The two hormones pull in opposite directions.',
    }),
    sl('example', 'Worked example 1: reading a sugar test', {
      b: 'Ravi and Meena drank glucose water after an overnight fast.',
      ul: [`Step 1: Ravi rose by ${SUGAR.ravi[1]} − ${SUGAR.ravi[0]} = **${SUGAR.raviRise}** in one hour, then fell by **${SUGAR.raviFall}**: insulin is working.`, `Step 2: Meena started at **${SUGAR.meena[0]}**, above normal even when fasting, and rose by **${SUGAR.meenaRise}**.`, `Step 3: after two hours Meena is still **${SUGAR.gapAt2h}** above Ravi: too little insulin, so **diabetes mellitus**.`],
      v: V.glucose,
      n: 'Read the graph in three steps. Ravi rises and then falls back towards normal, which is what a healthy pancreas does. Meena starts high and stays high two hours later. Her body is not making enough insulin, a sign of diabetes mellitus.',
    }),
    sl('concept', 'Too little or too much insulin', {
      v: table(['Condition', 'Cause', 'Signs'], [['Diabetes mellitus', 'Too little insulin', 'High blood sugar, sugar in urine, frequent urination, thirst, weight loss'], ['Hypoglycaemia', 'Too much insulin (an overdose)', 'Low blood sugar, shaking, sweating, fainting']], 'Table of insulin disorders: diabetes mellitus from too little insulin, hypoglycaemia from too much'),
      n: 'Too little insulin lets sugar build up in the blood until it spills into the urine and drags water with it. Too much insulin does the opposite. Blood sugar crashes, the brain is starved of fuel, and the person may faint.',
    }),
    sl('check', 'Quick check: insulin cells', {
      b: 'Fill in: insulin is secreted by the ______ cells of the islets.',
      chk: 'beta-fill',
      n: 'Alpha or beta? Which one lowers sugar?',
    }),
    sl('concept', 'The thyroid and thyroxine', {
      b: '**Thyroxine** contains **iodine**. It controls the **basal metabolic rate** and is needed for normal **growth and mental development**.',
      v: table(['Condition', 'Cause', 'Main signs'], [['Cretinism', 'Too little thyroxine in childhood', 'Stunted growth, delayed mental development, puffy face'], ['Myxoedema', 'Too little thyroxine in adults', 'Low metabolic rate, puffy skin, sluggishness'], ['Simple goitre', 'Lack of iodine in food', 'Swelling of the thyroid in the neck'], ['Exophthalmic goitre', 'Too much thyroxine', 'Bulging eyes, fast heartbeat, weight loss, nervousness']], 'Table of thyroid disorders with cause and main signs'),
      n: 'Thyroxine sets the pace at which your cells burn food. Too little in a child slows growth and learning. Too little in an adult makes the person slow and puffy. Too much speeds everything up. And a lack of iodine makes the gland swell.',
    }),
    sl('example', 'Worked example 2: naming the disorder', {
      b: 'Match the signs to the gland and the disorder.',
      ul: ['Step 1: ask **which gland** controls the sign (sugar: pancreas; metabolism and growth: thyroid).', 'Step 2: ask **too much or too little**?', 'Step 3: ask **child or adult**, then name the disorder.'],
      v: table(['Signs', 'Gland, too much or too little', 'Disorder'], [['Thirst, sugar in urine', 'Pancreas, too little insulin', 'Diabetes mellitus'], ['Child with stunted growth and slow learning', 'Thyroid, too little thyroxine', 'Cretinism'], ['Bulging eyes, weight loss', 'Thyroid, too much thyroxine', 'Exophthalmic goitre']], 'Worked table linking three sets of signs to the gland and the disorder'),
      n: 'Three questions crack most of these problems. Which gland controls the sign? Is there too much hormone or too little? And is the patient a child or an adult? Answer them in order and the disorder names itself.',
    }),
    sl('check', 'Quick check: iodised salt', {
      b: 'Iodised salt is supplied mainly to prevent…',
      chk: 'iodine-mcq',
      n: 'Which hormone needs iodine?',
    }),
    sl('summary', 'Summary', {
      ul: ['Endocrine glands are ductless and release hormones into the blood.', 'Pituitary at the base of the brain; thyroid in the neck; pancreas behind the stomach; adrenal on each kidney.', 'Insulin (beta cells) lowers blood sugar; glucagon (alpha cells) raises it.', 'Thyroxine controls metabolic rate, growth and mental development.'],
      v: table(['Hormone', 'Too little', 'Too much'], [['Insulin', 'Diabetes mellitus', 'Hypoglycaemia'], ['Thyroxine', 'Cretinism (child), myxoedema (adult)', 'Exophthalmic goitre']], 'Summary table of disorders from too little or too much insulin and thyroxine'),
      n: 'To recap. Hormones travel in the blood from ductless glands. Insulin and glucagon balance blood sugar. Thyroxine sets the pace of the body, and too little or too much of either hormone causes disease.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Write **beta cells → insulin**, **alpha cells → glucagon**; do not swap them.', 'For a disorder, give the **hormone**, **too much or too little**, and **child or adult**.', 'Diabetes **mellitus** is about **insulin**; do not confuse it with diabetes insipidus.', 'Draw glands in their **correct positions** on a body outline.'],
      n: 'Exam tips. Keep alpha and beta cells straight. When you name a disorder, say which hormone, whether it is too much or too little, and at what age. And never mix up diabetes mellitus with diabetes insipidus.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Endocrine System — Part 2: Adrenal, pituitary and feedback',
  goals: [
    'Describe the emergency effects of adrenaline and the role of the cortical hormones',
    'Explain why the pituitary is the master gland and state the effects of growth hormone and ADH imbalance',
    'Explain with a flow diagram how thyroxine controls TSH by feedback',
  ],
  slides: [
    sl('title', 'Adrenal, Pituitary and Feedback', {
      b: 'Part 2 — the emergency gland, the master gland, and how hormones keep themselves in check.',
      v: flow('LR', [['p', 'Pituitary'], ['t', 'Thyroid'], ['a', 'Adrenal cortex'], ['g', 'Gonads']], [['p', 't', 'TSH'], ['p', 'a', 'ACTH'], ['p', 'g', 'FSH, LH']], 'Flow: the pituitary sends TSH to the thyroid, ACTH to the adrenal cortex, and FSH and LH to the gonads'),
      n: 'One small gland under the brain sends orders to several others. In this part we meet that master gland, the adrenal gland that prepares you for emergencies, and the clever loop that stops a hormone from being over produced.',
    }),
    sl('concept', 'The adrenal gland', {
      b: 'Each adrenal gland has an outer **cortex** and an inner **medulla**.',
      v: table(['Region', 'Hormones', 'Main role'], [['Cortex (outer)', 'Cortical hormones (corticoids)', 'Salt and water balance; carbohydrate metabolism; some sex hormones'], ['Medulla (inner)', 'Adrenaline', 'Prepares the body for an emergency']], 'Table of the two regions of the adrenal gland, their hormones and main roles'),
      n: 'The adrenal gland is really two glands in one. The outer cortex makes cortical hormones that keep salts, water and sugar in balance every day. The inner medulla makes adrenaline, which is saved for emergencies.',
    }),
    sl('concept', 'Adrenaline: fight or flight', {
      v: table(['Effect of adrenaline', 'How it helps'], [['Faster, stronger heartbeat', 'More blood to the muscles'], ['Faster, deeper breathing', 'More oxygen'], ['Liver glycogen changed to glucose', 'More fuel for energy'], ['Pupils dilate', 'Better view of the danger'], ['Less blood to the gut and skin', 'More blood for the muscles']], 'Table of five effects of adrenaline and how each helps in an emergency'),
      n: 'Imagine a sudden loud crash. Within seconds your heart pounds, you breathe faster, your pupils widen and your blood fills with sugar. Every change gets the muscles ready to face the danger or to run from it. That is why adrenaline is called the emergency hormone.',
    }),
    sl('check', 'Quick check: emergency sugar', {
      b: 'How does adrenaline give the muscles more glucose?',
      chk: 'adr-sugar-mcq',
      n: 'Where is glycogen stored?',
    }),
    sl('example', 'Worked example 1: a fright in numbers', {
      b: `Arun's heart rate jumped from **${HEART.rest}** to **${HEART.fright}** beats per minute when a dog chased him.`,
      ul: [`Step 1: rise = ${HEART.fright} − ${HEART.rest} = **${HEART.rise}** beats per minute.`, 'Step 2: the hormone is **adrenaline** from the **adrenal medulla**.', 'Step 3: link the change to its use: more blood, oxygen and glucose to the leg muscles.'],
      v: table(['Reading', 'Heart rate (beats per minute)'], [['At rest', String(HEART.rest)], ['During the chase', String(HEART.fright)], ['Rise', String(HEART.rise)]], `Worked table: heart rate ${HEART.rest} at rest, ${HEART.fright} during the chase, a rise of ${HEART.rise}`),
      n: 'Subtract to find the rise, then explain it. Adrenaline made Arun’s heart beat much faster, so more oxygen and sugar reached his leg muscles and he could pedal away. Once the danger passed, his heart rate slowly came back to normal.',
    }),
    sl('diagram', 'The pituitary: master gland', {
      b: 'The **anterior lobe** makes **growth hormone** and the **tropic hormones** (TSH, ACTH, FSH, LH). The **posterior lobe** releases **ADH** and **oxytocin**.',
      v: V.glands,
      n: 'The pituitary sits just under the brain. Its front lobe makes growth hormone and tropic hormones, which switch on the thyroid, the adrenal cortex and the gonads. That control over other glands is why it is called the master gland. Its back lobe releases ADH and oxytocin.',
    }),
    sl('concept', 'Pituitary hormones and their work', {
      v: table(['Hormone', 'Lobe', 'Action'], [['Growth hormone', 'Anterior', 'Growth of bones and muscles'], ['TSH', 'Anterior', 'Makes the thyroid release thyroxine'], ['ACTH', 'Anterior', 'Makes the adrenal cortex release its hormones'], ['FSH and LH', 'Anterior', 'Act on the testes and ovaries'], ['ADH (vasopressin)', 'Posterior', 'More water reabsorbed in the kidney tubules'], ['Oxytocin', 'Posterior', 'Contracts the uterus at childbirth; releases milk']], 'Table of six pituitary hormones, their lobe and their action'),
      n: 'Learn the hormones lobe by lobe. The anterior lobe gives growth hormone and four tropic hormones. The posterior lobe gives just two: ADH, which saves water in the kidneys, and oxytocin, which acts on the uterus and breasts.',
    }),
    sl('concept', 'When pituitary hormones go wrong', {
      v: table(['Hormone', 'Too little', 'Too much'], [['Growth hormone', 'Dwarfism (short, proportionate, normal intelligence)', 'Gigantism in children; acromegaly in adults'], ['ADH', 'Diabetes insipidus: much dilute urine, thirst', 'Little, concentrated urine; water retained']], 'Table of the effects of too little and too much growth hormone and ADH'),
      n: 'Too little growth hormone in a child gives a short but well proportioned body. Too much gives a giant. In an adult the long bones cannot lengthen, so excess hormone enlarges the jaw, hands and feet instead. Too little ADH means large amounts of watery urine.',
    }),
    sl('check', 'Quick check: childbirth', {
      b: 'Which hormone contracts the uterus during childbirth?',
      chk: 'oxytocin-mcq',
      n: 'It comes from the posterior lobe.',
    }),
    sl('example', 'Worked example 2: why so much urine?', {
      b: `Mr Sen passes about **${URINE.patient}** litres of urine a day; a typical adult passes about **${URINE.normal}** litres.`,
      ul: [`Step 1: ${URINE.patient} ÷ ${URINE.normal} = **${URINE.times}** times the usual volume.`, 'Step 2: blood sugar normal and no sugar in urine, so **not** diabetes mellitus.', 'Step 3: dilute urine means water is not reabsorbed: shortage of **ADH**, called **diabetes insipidus**.'],
      v: table(['Clue', 'What it rules in or out'], [['Very large volume of urine', 'Kidneys not saving water'], ['No sugar in urine', 'Rules out diabetes mellitus'], ['Always thirsty', 'Body losing water']], 'Worked table of three clues and what each tells the doctor'),
      n: `Use the clues one at a time. Mr Sen passes about ${URINE.times} times the usual urine. There is no sugar, so insulin is not the problem. The urine is watery, so his kidneys are not taking water back. The missing hormone is ADH.`,
    }),
    sl('diagram', 'Feedback: TSH and thyroxine', {
      b: '**Low thyroxine → more TSH → thyroid makes more thyroxine. High thyroxine → less TSH.** This is **negative feedback**.',
      v: V.feedback,
      n: 'Think of a room heater with a thermostat. When thyroxine falls, the pituitary sends out more TSH and the thyroid works harder. When thyroxine rises too high, the pituitary sends less TSH. The level of thyroxine controls its own production.',
    }),
    sl('check', 'Quick check: low thyroxine', {
      b: 'When thyroxine falls, the anterior pituitary…',
      chk: 'tsh-low-mcq',
      n: 'Which way does the feedback push?',
    }),
    sl('concept', 'Feedback explains simple goitre', {
      v: flow('LR', [['i', 'Too little iodine'], ['t', 'Little thyroxine made'], ['s', 'Pituitary releases more TSH'], ['g', 'Thyroid overstimulated and enlarges']], [['i', 't'], ['t', 's'], ['s', 'g']], 'Flow: too little iodine means little thyroxine, so the pituitary releases more TSH, and the overstimulated thyroid enlarges into a goitre'),
      n: 'Feedback also explains goitre. Without iodine the thyroid cannot make enough thyroxine. The pituitary keeps sending more and more TSH, and the thyroid, pushed to work harder and harder, grows into a swelling in the neck.',
    }),
    sl('summary', 'Summary', {
      ul: ['Adrenal cortex: cortical hormones for salts, water and sugar; medulla: adrenaline for emergencies.', 'Pituitary is the master gland: tropic hormones control other glands.', 'Growth hormone: dwarfism, gigantism, acromegaly. ADH: diabetes insipidus.', 'Thyroxine controls TSH release by negative feedback.'],
      v: table(['Gland', 'Key hormone', 'Key word'], [['Adrenal medulla', 'Adrenaline', 'Emergency'], ['Anterior pituitary', 'TSH, growth hormone', 'Master'], ['Posterior pituitary', 'ADH, oxytocin', 'Water, birth']], 'Summary table of three glands, their key hormones and a key word'),
      n: 'To recap. Adrenaline prepares you for danger. The pituitary directs the other glands and controls growth and water balance. And negative feedback between thyroxine and TSH keeps the thyroid working at just the right pace.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['**Dwarf vs cretin:** a pituitary dwarf has **normal intelligence**; a cretin does not.', '**Gigantism** is in children, **acromegaly** in adults.', 'In a feedback answer, say what happens when thyroxine is **high** and when it is **low**.', 'ADH acts on the **kidney tubules**; oxytocin on the **uterus**.'],
      n: 'Exam tips. A pituitary dwarf has a normal mind; a cretin does not. Gigantism happens in children, acromegaly in adults. In feedback answers describe both directions. And remember where ADH and oxytocin act.',
    }),
  ],
});
