// ISC 11 Biology ch21 Chemical Coordination and Integration. Part 1: endocrine system, hypothalamus and pituitary, feedback, thyroid, parathyroid, pineal, thymus (t01, t02).
// Part 2: adrenal glands, pancreas, gonads, gut hormones, mechanism of action and disorders (t03 to t05).
import { sl, deck, table, flow, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { ENDOCRINE, PITUITARY, FEEDBACK, FEEDBACK_CURVE, GLUCOSE, GTT, MECHANISM } from './svgs.mjs';
import { LOOP, LOW, LOW_START, tsh, NORMAL_RANGE, GTT_LIMITS, GTT_TIMES, GN, GD, riseOf, verdict, fallPct, CA_RANGE, CA_PATIENT, caBelow, caBelowPct, URINE, URINE_FOLD, URINE_EXTRA, WEEK_LOSS, PARATHYROIDS, GI_HORMONES, ADRENAL_CORTEX_LAYERS, TSH_AT_50 } from './calc.mjs';

export const V = {
  endocrine: svgV(ENDOCRINE, 'The human body with the endocrine glands marked'),
  pituitary: svgV(PITUITARY, 'Hypothalamus controlling the anterior pituitary by portal vessels and the posterior pituitary by nerve fibres'),
  feedback: svgV(FEEDBACK, 'Negative feedback of thyroxine on the hypothalamus and pituitary'),
  curve: svgV(FEEDBACK_CURVE, 'Thyroxine rising and TSH falling back to the set point after part of the thyroid is removed'),
  glucose: svgV(GLUCOSE, 'Control of blood glucose by insulin and glucagon'),
  gtt: svgV(GTT, 'Glucose tolerance curves for a normal subject and a subject with diabetes mellitus'),
  mechanism: svgV(MECHANISM, 'Action of a protein hormone through cyclic AMP and of a steroid hormone through the nucleus'),
};

const f = (x) => String(x);
const T = (n) => GTT_TIMES.indexOf(n);

export const deck1 = deck({
  part: 1,
  title: 'Chemical Coordination and Integration, Part 1: Endocrine glands, pituitary, feedback and thyroid',
  goals: [
    'Locate the endocrine glands and state the hormones of the hypothalamus and pituitary',
    'Explain the negative feedback control of thyroxine secretion',
    'State the functions of thyroxine, calcitonin and parathormone, and of the pineal gland and thymus',
  ],
  slides: [
    sl('title', 'Hormones and chemical coordination', {
      b: 'Part 1: the glands, the pituitary and the thyroid.',
      v: flow('LR', [['g', 'Endocrine gland'], ['h', 'Hormone in the blood'], ['t', 'Target cells'], ['r', 'Response']], [['g', 'h'], ['h', 't'], ['t', 'r']], 'Endocrine gland releases a hormone into the blood which acts on target cells'),
      n: 'Besides nerves, the body uses chemical messengers called hormones. A gland releases a hormone into the blood, the blood carries it everywhere, and only the target cells that have the right receptor respond.',
    }),
    sl('concept', 'Nervous and endocrine coordination', {
      b: 'A **hormone** is a chemical produced by an endocrine gland, carried in the blood, and acting in small amounts on target cells.',
      v: table(['Feature', 'Nervous system', 'Endocrine system'], [['Messenger', 'Electrical impulse and neurotransmitter', 'Hormone in the blood'], ['Speed', 'Very fast', 'Slower'], ['Duration of effect', 'Short', 'Longer'], ['Reach', 'Specific cells', 'Any cell with the receptor']], 'Table comparing nervous and endocrine coordination'),
      n: 'The two systems work together. Nerves give fast, short responses to specific cells, while hormones give slower and longer lasting effects on any cell that carries the receptor.',
    }),
    sl('diagram', 'The endocrine glands of the human body', {
      b: `The hypothalamus, pituitary, pineal, thyroid, **${PARATHYROIDS} parathyroids**, thymus, adrenal glands, pancreas and gonads (ovaries and testes) are the main endocrine organs.`,
      v: V.endocrine,
      n: 'The hypothalamus, pituitary and pineal gland are in the head. The thyroid is in the neck with the parathyroids behind it. The thymus lies in the chest, the adrenals above the kidneys, the pancreas behind the stomach, and the gonads in the pelvis.',
    }),
    sl('check', 'Quick check: location', {
      b: 'Identify an endocrine gland from its position and description.',
      n: 'Quick check. Which gland hangs below the hypothalamus?',
      chk: 'gland-mcq',
    }),
    sl('diagram', 'The hypothalamus and the pituitary', {
      b: 'The **hypothalamus** controls the pituitary in two ways: **releasing and inhibiting hormones** reach the **anterior pituitary** by **portal vessels**, while **nerve fibres** carry **oxytocin and ADH** (made in the hypothalamus) to the **posterior pituitary**.',
      v: V.pituitary,
      n: 'The pituitary is called the master gland, but the hypothalamus controls it. Releasing hormones travel through a small set of blood vessels to the front lobe, whereas two hormones made in the hypothalamus travel along nerve fibres to the back lobe.',
    }),
    sl('concept', 'Hormones of the pituitary', {
      b: 'The anterior pituitary makes six hormones; the posterior pituitary stores and releases two.',
      v: table(['Hormone', 'Source', 'Action'], [['Growth hormone (GH)', 'Anterior', 'Growth of bones and tissues'], ['Prolactin (PRL)', 'Anterior', 'Milk production'], ['TSH (tropic)', 'Anterior', 'Makes the thyroid secrete thyroxine'], ['ACTH (tropic)', 'Anterior', 'Makes the adrenal cortex secrete glucocorticoids'], ['LH and FSH (tropic)', 'Anterior', 'Gonads: gametes and sex hormones'], ['Oxytocin', 'Posterior', 'Contraction of the uterus; milk ejection'], ['ADH (vasopressin)', 'Posterior', 'Water reabsorption in the kidney']], 'Table of pituitary hormones, source and action'),
      n: 'Growth hormone and prolactin act directly on tissues. Thyroid-stimulating hormone, ACTH, and the two gonad-stimulating hormones are called tropic hormones because they control other glands. Oxytocin and ADH come from the back lobe.',
    }),
    sl('check', 'Quick check: pituitary', {
      b: 'Choose the hormone that acts on another endocrine gland.',
      n: 'Quick check. Which hormone is a tropic hormone?',
      chk: 'anterior-mcq',
    }),
    sl('diagram', 'Negative feedback control of thyroxine', {
      b: 'Hypothalamus releases **TRH**, anterior pituitary releases **TSH**, thyroid releases **thyroxine**. Thyroxine in the blood **inhibits** the hypothalamus and pituitary, so the secretion is kept near a set point: **negative feedback**.',
      v: V.feedback,
      n: 'When thyroxine is high, it switches off the signals that stimulate the thyroid, so secretion falls. When thyroxine is low, the brake is released and secretion rises. This keeps the level steady.',
    }),
    sl('example', 'Worked example 1: a feedback loop in numbers', {
      b: `After part of the thyroid is removed, thyroxine is ${LOW_START} percent of normal. In a model, TSH is ${LOOP.set} plus the shortfall of thyroxine, and each step thyroxine gains one quarter of the gap between TSH and thyroxine. Find TSH and the next two values of thyroxine.`,
      ul: [
        r`TSH $= ${LOOP.set} + (${LOOP.set} - ${LOW[0].t4}) = ${LOW[0].tsh}$.`,
        r`Step 1: thyroxine $= ${LOW[0].t4} + ${LOOP.use} \times (${LOW[0].tsh} - ${LOW[0].t4}) = ${LOW[1].t4}$; TSH $= ${LOW[1].tsh}$.`,
        r`Step 2: thyroxine $= ${LOW[1].t4} + ${LOOP.use} \times (${LOW[1].tsh} - ${LOW[1].t4}) = ${LOW[2].t4}$; TSH $= ${LOW[2].tsh}$.`,
      ],
      v: table(['Step', 'Thyroxine', 'TSH'], LOW.slice(0, 5).map((p) => [f(p.step), f(p.t4), f(p.tsh)]), 'Worked table of thyroxine and TSH over the first four steps'),
      n: 'A low thyroxine level makes the pituitary release much more of the thyroid-stimulating hormone. The thyroid then produces more thyroxine, so it climbs toward normal while the stimulating hormone falls back. This is how negative feedback corrects a deficit.',
    }),
    sl('diagram', 'The feedback loop over time', {
      b: 'Thyroxine returns step by step to the set point and TSH falls back to its normal level: the loop **corrects itself**.',
      v: V.curve,
      n: 'The graph shows thyroxine rising and the stimulating hormone falling until both settle at the normal level. If thyroxine overshot, the opposite would happen, and the loop would pull it down again.',
    }),
    sl('concept', 'Thyroid gland', {
      b: 'The **thyroid** makes **thyroxine** (tetraiodothyronine) and **triiodothyronine**, which need **iodine**, and **calcitonin** from its own separate cells.',
      v: table(['Hormone', 'Main actions'], [['Thyroxine and triiodothyronine', 'Raise the basal metabolic rate; help normal growth, brain development and red blood cell formation'], ['Calcitonin (thyrocalcitonin)', 'Lowers blood calcium by moving calcium into the bones']], 'Table of thyroid hormones and actions'),
      n: 'Thyroid hormones set the pace of metabolism and are essential for normal growth and development of the brain. Calcitonin does a different job: it lowers the calcium level in the blood.',
    }),
    sl('concept', 'Parathyroid, pineal and thymus', {
      b: `The **${PARATHYROIDS} parathyroid glands** make **parathormone (PTH)**, which **raises** blood calcium; with calcitonin it keeps calcium steady. The **pineal gland** makes **melatonin**; the **thymus** makes **thymosin**.`,
      v: table(['Gland', 'Hormone', 'Action'], [['Parathyroid', 'Parathormone', 'Raises blood calcium: bone breakdown, kidney reabsorption, gut absorption'], ['Pineal', 'Melatonin', 'Sleep-wake rhythm, body temperature, skin colour, menstrual cycle'], ['Thymus', 'Thymosin', 'Develops T lymphocytes; immunity; shrinks with age']], 'Table of parathyroid, pineal and thymus hormones'),
      n: 'Parathormone and calcitonin work in opposite directions, so together they hold blood calcium steady. Melatonin sets the daily rhythm of sleep. Thymosin helps the immune cells mature, and the thymus shrinks in old age.',
    }),
    sl('example', 'Worked example 2: calcium below the normal range', {
      b: `The normal range of blood calcium is taken as ${CA_RANGE[0]} to ${CA_RANGE[1]} mg per dL. After neck surgery a patient has ${CA_PATIENT} mg per dL. By how much, and by what percent of the lower limit, is she below normal, and which hormone is lacking?`,
      ul: [
        r`Shortfall $= ${CA_RANGE[0]} - ${CA_PATIENT} = ${caBelow}$ mg per dL.`,
        r`Percent of lower limit $= \dfrac{${caBelow}}{${CA_RANGE[0]}} \times 100 = ${caBelowPct}$ percent.`,
        'Low calcium points to too little parathormone, as the parathyroids may have been damaged.',
      ],
      v: table(['Quantity', 'Value'], [['Normal lower limit (mg per dL)', f(CA_RANGE[0])], ['Patient (mg per dL)', f(CA_PATIENT)], ['Shortfall (mg per dL)', f(caBelow)], ['Shortfall (percent)', f(caBelowPct)]], `Worked table: ${caBelow} below the normal limit`),
      n: 'Subtract the patient value from the lower limit of the normal range, and express the shortfall as a part of that limit. Low blood calcium after neck surgery suggests that the parathyroid glands have been disturbed, so parathormone is lacking.',
    }),
    sl('check', 'Quick check: calcium', {
      b: 'Name the hormone that raises blood calcium.',
      n: 'Quick check. Which gland sits behind the thyroid?',
      chk: 'calcium-mcq',
    }),
    sl('check', 'Quick check: feedback', {
      b: 'Calculate TSH from a given thyroxine level in the model.',
      n: 'Quick check. Add the shortfall of thyroxine to one hundred.',
      chk: 'tsh-num',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Hormones: chemical messengers in the blood acting on target cells.',
        'Hypothalamus: releasing and inhibiting hormones to the anterior pituitary; oxytocin and ADH stored in the posterior pituitary.',
        'Tropic hormones (TSH, ACTH, LH, FSH) control other glands; thyroxine exerts negative feedback on TRH and TSH.',
        'Thyroid: thyroxine, triiodothyronine, calcitonin. Parathyroid: parathormone raises calcium.',
        'Pineal: melatonin. Thymus: thymosin.',
      ],
      v: table(['Gland', 'Hormone'], [['Thyroid', 'Thyroxine, calcitonin'], ['Parathyroid', 'Parathormone'], ['Pineal', 'Melatonin'], ['Thymus', 'Thymosin']], 'Summary table of glands and hormones'),
      n: 'To recap: the hypothalamus controls the pituitary, and the pituitary controls other glands. Thyroxine feeds back to switch itself down, and parathormone and calcitonin balance calcium. Melatonin and thymosin come from the pineal and thymus.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the **feedback loop**: TRH, TSH, thyroxine, with the **negative** arrows.',
        'Name **where** each hormone is made and **what** it does.',
        'State that **parathormone raises** and **calcitonin lowers** blood calcium.',
        'Distinguish **tropic** hormones from those acting directly on tissues.',
      ],
      n: 'Exam tips. Draw the feedback loop with its inhibiting arrows. For every hormone, give the gland and the action. Remember that parathormone raises calcium while calcitonin lowers it. And know which pituitary hormones control other glands.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Chemical Coordination and Integration, Part 2: Adrenal glands, pancreas, hormone action and disorders',
  goals: [
    'State the roles of adrenaline, the cortical hormones, insulin, glucagon, sex hormones and the gut hormones',
    'Compare the mechanisms of action of protein hormones and steroid hormones',
    'Match each endocrine disorder to the gland and hormone involved, and distinguish diabetes mellitus from diabetes insipidus',
  ],
  slides: [
    sl('title', 'Hormones of the body and their action', {
      b: 'Part 2: adrenal glands, pancreas, gonads, gut, mechanisms and disorders.',
      v: flow('LR', [['a', 'Adrenal'], ['p', 'Pancreas'], ['g', 'Gonads and gut'], ['d', 'Disorders']], [['a', 'p'], ['p', 'g'], ['g', 'd']], 'Adrenal glands, pancreas, gonads and gut, then disorders'),
      n: 'In this part we meet the adrenal glands, the pancreas, the gonads and the gut, see how hormones act inside cells, and look at what goes wrong when a gland makes too little or too much.',
    }),
    sl('concept', 'Adrenal glands', {
      b: `The adrenal cortex has **${ADRENAL_CORTEX_LAYERS} layers**; the medulla makes **adrenaline** and **noradrenaline**, the emergency hormones.`,
      v: table(['Part', 'Hormone', 'Main action'], [['Cortex: outer layer', 'Mineralocorticoids (aldosterone)', 'Sodium reabsorption and potassium loss in the kidney'], ['Cortex: middle layer', 'Glucocorticoids (cortisol)', 'Raise blood glucose; anti-inflammatory; reduce immunity'], ['Cortex: inner layer', 'Sex corticoids', 'Small amounts of androgens'], ['Medulla', 'Adrenaline, noradrenaline', 'Fight or flight: faster heartbeat, more glucose, wider pupils']], 'Table of adrenal gland hormones'),
      n: 'The adrenal cortex has three layers: one regulates salts, one controls glucose and inflammation, and one makes small amounts of sex hormones. The medulla releases adrenaline in emergencies, preparing the body for fight or flight.',
    }),
    sl('check', 'Quick check: adrenal', {
      b: 'Match a response to the hormone responsible.',
      n: 'Quick check. Which hormone raises blood glucose and calms inflammation?',
      chk: 'cortisol-mcq',
    }),
    sl('diagram', 'Control of blood glucose', {
      b: '**Insulin** from the **beta cells** lowers blood glucose; **glucagon** from the **alpha cells** raises it; **somatostatin** from the **delta cells** restrains both.',
      v: V.glucose,
      n: 'After a meal, insulin tells the liver, muscle and fat to take up glucose and store it as glycogen. Between meals, glucagon makes the liver break glycogen down and release glucose. Together they hold the level in a narrow range.',
    }),
    sl('concept', 'Pancreatic hormones', {
      b: 'The pancreas is both exocrine (digestive juice) and endocrine (islets of Langerhans).',
      v: table(['Cell', 'Hormone', 'Effect on blood glucose'], [['Beta (β)', 'Insulin', 'Lowers it: uptake, glycogenesis'], ['Alpha (α)', 'Glucagon', 'Raises it: glycogenolysis, gluconeogenesis'], ['Delta (δ)', 'Somatostatin', 'Inhibits the release of insulin and glucagon']], 'Table of the hormones of the islets of Langerhans'),
      n: 'Insulin is the only hormone that lowers blood glucose, so its absence has serious effects. Glucagon does the opposite. Somatostatin acts as a brake on both.',
    }),
    sl('diagram', 'The glucose tolerance test', {
      b: `After a glucose drink the blood glucose is measured over two hours. Diabetes is suspected if the fasting value is ${GTT_LIMITS.fasting} mg per dL or more, or the two-hour value is ${GTT_LIMITS.twoHour} or more.`,
      v: V.gtt,
      n: 'In a healthy person glucose rises a little and returns to near normal within two hours. In diabetes mellitus it starts higher, rises much more and stays high, because insulin is lacking or ineffective.',
    }),
    sl('example', 'Worked example 1: reading a glucose tolerance test', {
      b: `Two subjects drank glucose. Subject P: ${GN.join(', ')} mg per dL at 0, 0.5, 1, 1.5 and 2 hours. Subject Q: ${GD.join(', ')}. Find each rise above the fasting value, the fall of P from its peak, and the verdict using the limits ${GTT_LIMITS.fasting} fasting and ${GTT_LIMITS.twoHour} at two hours.`,
      ul: [
        r`P: rise $= ${Math.max(...GN)} - ${GN[0]} = ${riseOf(GN)}$; fall from peak $= \dfrac{${Math.max(...GN)} - ${GN[4]}}{${Math.max(...GN)}} \times 100 = ${fallPct(GN)}$ percent.`,
        r`Q: rise $= ${Math.max(...GD)} - ${GD[0]} = ${riseOf(GD)}$; at two hours ${GD[4]} is above ${GTT_LIMITS.twoHour}.`,
        `Verdict: P is **${verdict(GN[0], GN[4])}**; Q has **${verdict(GD[0], GD[4])}**.`,
      ],
      v: table(['Subject', 'Fasting', 'Peak', 'Two hours', 'Verdict'], [['P', f(GN[0]), f(Math.max(...GN)), f(GN[4]), verdict(GN[0], GN[4])], ['Q', f(GD[0]), f(Math.max(...GD)), f(GD[4]), verdict(GD[0], GD[4])]], 'Worked table: subject P normal, subject Q diabetes mellitus'),
      n: 'Find how far each curve rises, then compare the fasting and two-hour values with the limits. The first subject returns close to normal, but the second stays far above the limit, which points to diabetes mellitus.',
    }),
    sl('check', 'Quick check: tolerance test', {
      b: 'Work out the rise of glucose above the fasting value.',
      n: 'Quick check. Subtract the fasting value from the highest value.',
      chk: 'gtt-num',
    }),
    sl('concept', 'Hormones of the gonads and the gut', {
      b: 'The **testis** makes **androgens (testosterone)**; the **ovary** makes **oestrogen and progesterone**. The gut makes four peptide hormones.',
      v: table(['Source', 'Hormone', 'Action'], [['Testis', 'Testosterone', 'Male characters; sperm formation'], ['Ovary', 'Oestrogen', 'Female characters; menstrual cycle'], ['Ovary', 'Progesterone', 'Maintains pregnancy'], ['Stomach', 'Gastrin', 'Acid and pepsinogen from gastric glands'], ['Duodenum', 'Secretin', 'Water and bicarbonate from the pancreas'], ['Duodenum', 'CCK-PZ', 'Gall bladder contracts; pancreatic enzymes'], ['Duodenum', 'GIP', 'Inhibits gastric secretion and movement']], 'Table of gonadal and gastrointestinal hormones'),
      n: 'Testosterone drives male development and sperm production. Oestrogen and progesterone control the female cycle and pregnancy. The gut makes four hormones: gastrin, secretin, cholecystokinin and the gastric inhibitory peptide.',
    }),
    sl('diagram', 'How hormones act on cells', {
      b: 'A **protein hormone** binds a **membrane receptor** and works through a **second messenger**, **cyclic AMP**. A **steroid hormone** enters the cell, binds an **intracellular receptor** and acts on **genes**.',
      v: V.mechanism,
      n: 'Protein hormones cannot cross the membrane. They bind a receptor on the surface, which makes the second messenger, cyclic adenosine monophosphate, inside the cell. Steroid hormones pass through the membrane, bind a receptor inside, and switch genes on or off.',
    }),
    sl('concept', 'Two mechanisms compared', {
      b: 'The chemical nature of a hormone decides how it acts.',
      v: table(['Feature', 'Protein hormone', 'Steroid hormone'], [['Examples', 'Insulin, glucagon, adrenaline', 'Cortisol, testosterone, oestrogen'], ['Solubility', 'Water soluble', 'Lipid soluble'], ['Receptor', 'On the cell membrane', 'Inside the cell'], ['Messenger', 'Cyclic AMP', 'None: hormone-receptor complex acts on DNA'], ['Speed of response', 'Fast', 'Slower (new proteins)']], 'Table comparing protein and steroid hormone action'),
      n: 'Water-soluble hormones act at the surface through a second messenger and give a quick response. Lipid-soluble hormones act inside, change gene activity and take longer to show their effect.',
    }),
    sl('check', 'Quick check: mechanism', {
      b: 'Choose the hormone that acts through a membrane receptor.',
      n: 'Quick check. Which hormone cannot cross the cell membrane?',
      chk: 'receptor-mcq',
    }),
    sl('concept', 'Disorders of growth, thyroid and adrenal glands', {
      b: 'Too little (hypo-) or too much (hyper-) of a hormone causes disease.',
      v: table(['Disorder', 'Gland and hormone', 'Main feature'], [['Dwarfism', 'Pituitary: too little growth hormone in childhood', 'Short stature, normal proportions'], ['Acromegaly', 'Pituitary: too much growth hormone in adults', 'Coarse face, large hands and feet'], ['Cretinism', 'Thyroid: too little thyroxine in infancy', 'Stunted growth, mental retardation'], ['Goitre', 'Thyroid: lack of iodine, so enlarged gland', 'Swelling of the neck'], ['Exophthalmic goitre (Graves disease)', 'Thyroid: too much thyroxine, autoimmune', 'Protruding eyes, high metabolic rate'], ['Addison disease', 'Adrenal cortex: too little cortical hormones', 'Weakness, low blood pressure']], 'Table of disorders of growth, thyroid and adrenal glands'),
      n: 'In dwarfism the pituitary makes too little growth hormone, and in acromegaly too much. Too little thyroxine in infancy causes cretinism. Lack of iodine causes simple goitre. Too much thyroxine causes exophthalmic goitre. Too little cortical hormone causes Addison disease.',
    }),
    sl('concept', 'Diabetes mellitus and diabetes insipidus', {
      b: 'Both cause a large volume of urine, but for different reasons.',
      v: table(['Feature', 'Diabetes mellitus', 'Diabetes insipidus'], [['Gland and hormone', 'Pancreas: lack of insulin', 'Posterior pituitary: lack of ADH'], ['Blood glucose', 'High; glucose appears in urine', 'Normal'], ['Urine', 'Large volume, sugary', 'Very large volume, dilute, no sugar'], ['Other features', 'Thirst, hunger, weight loss', 'Intense thirst, dehydration']], 'Table distinguishing diabetes mellitus from diabetes insipidus'),
      n: 'In diabetes mellitus the pancreas makes too little insulin, so blood glucose is high and glucose spills into the urine. In diabetes insipidus the pituitary lacks the antidiuretic hormone, so the kidney cannot save water, but blood glucose is normal.',
    }),
    sl('example', 'Worked example 2: water lost in diabetes insipidus', {
      b: `A healthy adult passes about ${URINE.normal} L of urine a day; a patient with diabetes insipidus passes ${URINE.insipidus} L. Find how many times more urine this is, the extra volume per day and the volume in a week.`,
      ul: [
        r`Ratio $= \dfrac{${URINE.insipidus}}{${URINE.normal}} = ${URINE_FOLD}$ times.`,
        r`Extra $= ${URINE.insipidus} - ${URINE.normal} = ${URINE_EXTRA}$ L per day.`,
        r`Week $= 7 \times ${URINE.insipidus} = ${WEEK_LOSS}$ L.`,
      ],
      v: table(['Quantity', 'Value (L)'], [['Healthy, per day', f(URINE.normal)], ['Patient, per day', f(URINE.insipidus)], ['Extra, per day', f(URINE_EXTRA)], ['Patient, per week', f(WEEK_LOSS)]], `Worked table: ${URINE_FOLD} times the normal urine volume`),
      n: 'Divide the patient volume by the normal volume, subtract for the extra water lost each day, and multiply by seven for the week. Such a loss explains the intense thirst, since the lost water must be replaced.',
    }),
    sl('check', 'Quick check: disorders', {
      b: 'Match a case history to the disorder.',
      n: 'Quick check. Think about the gland and the hormone that are missing.',
      chk: 'disorder-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        `Adrenal cortex (${ADRENAL_CORTEX_LAYERS} layers): mineralocorticoids, glucocorticoids, sex corticoids; medulla: adrenaline and noradrenaline.`,
        'Pancreas: insulin lowers and glucagon raises blood glucose; somatostatin restrains both.',
        `Gut: ${GI_HORMONES.join(', ')}; gonads: testosterone, oestrogen, progesterone.`,
        'Protein hormones act through cyclic AMP; steroid hormones through intracellular receptors and genes.',
        'Disorders: dwarfism, acromegaly, cretinism, goitre, exophthalmic goitre, Addison disease, diabetes mellitus and insipidus.',
      ],
      v: table(['Disorder', 'Cause'], [['Diabetes mellitus', 'Lack of insulin'], ['Diabetes insipidus', 'Lack of ADH'], ['Addison disease', 'Adrenal cortex underactive'], ['Graves disease', 'Overactive thyroid']], 'Summary table of disorders and causes'),
      n: 'To recap: adrenal, pancreatic, gonadal and gut hormones control stress, glucose, reproduction and digestion. Water-soluble hormones act through a second messenger, and steroids act on genes. Each disorder follows from too little or too much of one hormone.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Say **insulin lowers** and **glucagon raises** blood glucose, with the cells that make them.',
        'Distinguish **diabetes mellitus** from **insipidus** by hormone, gland and urine.',
        'Compare protein and steroid hormones in a **table**.',
        'Pair each disorder with its **gland, hormone and a symptom**.',
      ],
      n: 'Exam tips. Be exact about which hormone lowers and which raises blood glucose. Separate the two kinds of diabetes by hormone, gland and urine. Compare protein and steroid hormones in a table. And link each disorder to its gland, its hormone and one symptom.',
    }),
  ],
});
