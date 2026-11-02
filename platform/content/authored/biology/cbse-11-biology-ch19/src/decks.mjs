// ch19 Chemical Coordination and Integration — two decks: Part 1 (t01: hypothalamus to thymus), Part 2 (t01 adrenal to gut hormones; t02 mechanism and disorders).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { ENDOCRINE, AXIS, ACTION, GLUCOSE } from './svgs.mjs';
import { PITUITARY, PIT_TOTAL, PIT_MADE, IODINE, DEIODINATION_PCT, T4_MOLAR, I_MOLAR, T4_IODINE_PCT, GLU, NORMAL, PEAK, RISE_PCT, AMP, HALF } from './calc.mjs';

export const V = {
  endocrine: svgV(ENDOCRINE, 'Outline of the human body showing the hypothalamus, pituitary, pineal, thyroid with four parathyroids, thymus, adrenals on the kidneys, pancreas and ovaries'),
  axis: svgV(AXIS, 'Hypothalamus above the pituitary: portal veins to the anterior lobe and neurosecretory axons to the posterior lobe'),
  action: svgV(ACTION, 'Two target cells: a peptide hormone acting through a membrane receptor and second messenger, and a steroid hormone acting on genes through a nuclear receptor'),
  glucose: svgV(GLUCOSE, 'Graph of blood glucose after a glucose drink: a healthy curve returning to fasting level and a diabetic curve staying above the kidney threshold'),
};

export const deck1 = deck({
  part: 1,
  title: 'Chemical Coordination and Integration — Part 1: Hypothalamus, pituitary, pineal, thyroid, parathyroid and thymus',
  goals: [
    'Define hormones and locate the human endocrine glands',
    'Explain how the hypothalamus controls the two lobes of the pituitary',
    'State the hormones of the pituitary, pineal, thyroid, parathyroid and thymus with their actions',
    'Relate growth hormone and thyroid disorders to their causes',
  ],
  slides: [
    sl('title', 'Chemical Coordination and Integration', {
      b: 'Part 1 — the endocrine glands of the head, neck and chest, and the hormones they make.',
      v: flow('LR', [['n', 'Neural system: fast, point-to-point'], ['h', 'Endocrine system: hormones in blood'], ['c', 'Coordinated body functions']], [['n', 'c'], ['h', 'c']], 'Flow showing neural and endocrine systems together coordinating body functions'),
      n: 'Nerve fibres do not reach every cell, and cellular functions need continuous regulation. So the neural system works together with a second system, the endocrine system, which sends chemical messages called hormones through the blood. Together they coordinate and integrate the activities of the organs.',
    }),
    sl('concept', 'Endocrine glands and hormones', {
      b: 'Endocrine glands lack ducts and are called **ductless glands**; their secretions are **hormones**. A hormone is a **non-nutrient chemical** which acts as an **intercellular messenger** and is produced in **trace amounts**.',
      v: table(['Feature', 'Exocrine gland', 'Endocrine gland'], [['Duct', 'Present', 'Absent (ductless)'], ['Secretion goes to', 'A surface or cavity through the duct', 'The blood, to distant target organs'], ['Example', 'Salivary gland', 'Thyroid, pituitary']], 'Table comparing exocrine and endocrine glands'),
      n: 'An exocrine gland pours its secretion through a duct. An endocrine gland has no duct, so its hormones enter the blood and reach target organs far away. Invertebrates have simple endocrine systems with few hormones, while vertebrates use many chemicals as hormones.',
    }),
    sl('diagram', 'The human endocrine glands', {
      b: 'The organised glands are the **pituitary, pineal, thyroid, adrenal, pancreas, parathyroid, thymus and gonads** (testis in males, ovary in females). The **hypothalamus**, and organs such as the gut, liver, kidney and heart, also produce hormones.',
      v: V.endocrine,
      n: 'Find each gland on the outline. The hypothalamus and pituitary sit at the base of the brain, the pineal on the upper side of the forebrain, the thyroid and parathyroids in the neck, the thymus in the chest, the adrenals on the kidneys, the pancreas in the abdomen and the gonads lower down.',
    }),
    sl('concept', 'The hypothalamus', {
      b: 'The hypothalamus is the basal part of the **diencephalon** (forebrain). Groups of **neurosecretory cells** called **nuclei** make hormones that regulate the pituitary.',
      v: table(['Kind of hypothalamic hormone', 'Action', 'Example'], [['Releasing hormone', 'Stimulates secretion of a pituitary hormone', 'GnRH stimulates synthesis and release of gonadotrophins'], ['Inhibiting hormone', 'Inhibits secretion of a pituitary hormone', 'Somatostatin inhibits release of growth hormone']], 'Table of releasing and inhibiting hormones of the hypothalamus with examples'),
      n: 'These hormones start in hypothalamic neurons, travel along their axons and are released from the nerve endings. They then reach the pituitary through a portal circulation and regulate the anterior pituitary. The posterior pituitary is under direct neural control of the hypothalamus.',
    }),
    sl('diagram', 'How the hypothalamus controls the pituitary', {
      b: 'The pituitary sits in a bony cavity, the **sella turcica**, joined to the hypothalamus by a stalk. It has an **adenohypophysis** (pars distalis and pars intermedia) and a **neurohypophysis** (pars nervosa).',
      v: V.axis,
      n: 'On the left, releasing and inhibiting hormones enter capillaries at the base of the hypothalamus and are carried by the hypophysial portal veins to the anterior lobe. On the right, oxytocin and vasopressin made in the hypothalamus travel down nerve axons and are stored in the posterior lobe until released.',
    }),
    sl('check', 'Quick check: what is a hormone?', {
      b: 'Choose the statement that matches the present definition of a hormone.',
      n: 'Quick check. Think of three words: non-nutrient, messenger, trace.',
      chk: 'hormonedef-mcq',
    }),
    sl('concept', 'Hormones of the anterior pituitary', {
      b: 'The **pars distalis**, commonly called the anterior pituitary, produces six hormones.',
      v: table(['Hormone', 'Main action'], [['Growth hormone (GH)', 'Growth of the body'], ['Prolactin (PRL)', 'Growth of mammary glands and formation of milk'], ['Thyroid stimulating hormone (TSH)', 'Synthesis and secretion of thyroid hormones'], ['Adrenocorticotrophic hormone (ACTH)', 'Secretion of glucocorticoids by the adrenal cortex'], ['Luteinising hormone (LH)', 'Males: androgen secretion. Females: ovulation of the Graafian follicle and maintenance of the corpus luteum'], ['Follicle stimulating hormone (FSH)', 'Males: with androgens regulates spermatogenesis. Females: growth of ovarian follicles']], 'Table of six anterior pituitary hormones and their actions'),
      n: 'Several of these hormones control other glands, so the anterior pituitary is often called a master gland, though it is itself controlled by the hypothalamus. Luteinising and follicle stimulating hormones act on the gonads and are called gonadotrophins.',
    }),
    sl('concept', 'Pars intermedia and the posterior pituitary', {
      b: 'In humans the pars intermedia is almost merged with the pars distalis.',
      v: table(['Hormone', 'Source', 'Action'], [['MSH', 'Pars intermedia', 'Acts on melanocytes; regulates skin pigmentation'], ['Oxytocin', 'Made in the hypothalamus; released by the pars nervosa', 'Contracts smooth muscle: vigorous uterine contraction at childbirth, milk ejection'], ['Vasopressin (ADH)', 'Made in the hypothalamus; released by the pars nervosa', 'Reabsorption of water and electrolytes by distal tubules; reduces diuresis']], 'Table of MSH, oxytocin and vasopressin with sources and actions'),
      n: 'When the synthesis or release of vasopressin is impaired, the kidney cannot conserve water. Large volumes of urine are lost and the body dehydrates. This condition is diabetes insipidus, which has nothing to do with sugar.',
    }),
    sl('example', 'Worked example 1: counting pituitary hormones', {
      b: 'A student lists every hormone released by the three parts of the pituitary. How many are there, and how many of them are actually made in the pituitary?',
      ul: [
        r`Pars distalis ${PITUITARY.distalis.length} (${PITUITARY.distalis.join(', ')}) + pars intermedia ${PITUITARY.intermedia.length} (MSH) + pars nervosa ${PITUITARY.nervosa.length}: $${PITUITARY.distalis.length} + ${PITUITARY.intermedia.length} + ${PITUITARY.nervosa.length} = ${PIT_TOTAL}$.`,
        r`Oxytocin and vasopressin are made in the hypothalamus, so $${PIT_TOTAL} - ${PITUITARY.nervosa.length} = ${PIT_MADE}$ are made in the pituitary itself.`,
        'The pars nervosa only **stores and releases** its two hormones.',
      ],
      v: table(['Part', 'Hormones released', 'Made there?'], [['Pars distalis', String(PITUITARY.distalis.length), 'Yes'], ['Pars intermedia', String(PITUITARY.intermedia.length), 'Yes'], ['Pars nervosa', String(PITUITARY.nervosa.length), 'No, in the hypothalamus'], ['Total', String(PIT_TOTAL), `${PIT_MADE} made in the pituitary`]], `Worked table: ${PIT_TOTAL} pituitary hormones, ${PIT_MADE} made in the gland`),
      n: 'Six from the pars distalis, one from the pars intermedia and two from the pars nervosa make nine. But the last two are only stored there, having travelled down axons from the hypothalamus, so seven are made in the pituitary itself.',
    }),
    sl('check', 'Quick check: oxytocin and vasopressin', {
      b: 'Correct the student’s statement about where oxytocin and vasopressin are made.',
      n: 'Quick check. Where are these two hormones synthesised, and where are they stored?',
      chk: 'oxyorigin-mcq',
    }),
    sl('concept', 'Growth hormone disorders', {
      b: 'Too much or too little growth hormone, at different ages, gives different disorders.',
      v: table(['Condition', 'Cause', 'Effect'], [['Gigantism', 'Over-secretion of GH (in childhood)', 'Abnormal growth of the whole body'], ['Pituitary dwarfism', 'Low secretion of GH', 'Stunted growth'], ['Acromegaly', 'Excess GH in adults, especially in middle age', 'Severe disfigurement, especially of the face; serious complications and early death if unchecked; often undetected for years']], 'Table of gigantism, pituitary dwarfism and acromegaly'),
      n: 'Age decides the outcome. Before growth has stopped, extra growth hormone makes the whole body grow abnormally large. In middle age it causes acromegaly, with coarse facial features, which is hard to diagnose early and may go unnoticed for many years.',
    }),
    sl('concept', 'Pineal and thyroid glands', {
      b: 'The **pineal** lies on the dorsal side of the forebrain. The **thyroid** has two lobes on either side of the **trachea**, joined by an **isthmus**; it is made of **follicles** and stromal tissue.',
      v: table(['Gland and hormone', 'Roles'], [['Pineal: melatonin', 'Regulates the 24-hour (diurnal) rhythm: sleep–wake cycle, body temperature; influences metabolism, pigmentation, menstrual cycle and defence capability'], ['Thyroid: thyroxine (T4) and triiodothyronine (T3)', 'Regulate basal metabolic rate; support RBC formation; control metabolism of carbohydrates, proteins and fats; maintain water and electrolyte balance'], ['Thyroid: thyrocalcitonin (TCT)', 'A protein hormone that regulates blood calcium']], 'Table of pineal and thyroid hormones and their roles'),
      n: 'Iodine is essential for the normal rate of thyroid hormone synthesis. Its deficiency causes hypothyroidism and an enlarged thyroid called goitre. Hypothyroidism in pregnancy causes cretinism in the baby. Thyroid cancer or nodules can cause hyperthyroidism, and exophthalmic goitre, or Graves disease, brings protruding eyeballs, a high metabolic rate and weight loss.',
    }),
    sl('example', 'Worked example 2: iodine in thyroid hormones', {
      b: `Thyroxine has ${IODINE.T4} iodine atoms and triiodothyronine ${IODINE.T3}. (i) What percentage of thyroxine’s iodine is removed when it becomes triiodothyronine? (ii) With molar masses ${T4_MOLAR} (thyroxine) and ${I_MOLAR} (iodine), what percentage of thyroxine’s mass is iodine?`,
      ul: [
        r`(i) $\dfrac{${IODINE.T4} - ${IODINE.T3}}{${IODINE.T4}} \times 100 = ${DEIODINATION_PCT}$ percent.`,
        r`(ii) $\dfrac{${IODINE.T4} \times ${I_MOLAR}}{${T4_MOLAR}} \times 100 = \dfrac{${IODINE.T4 * I_MOLAR}}{${T4_MOLAR}} \times 100 \approx ${T4_IODINE_PCT}$ percent.`,
        'About two-thirds of the hormone’s mass is iodine, so a diet short of iodine quickly limits hormone synthesis.',
      ],
      v: table(['Quantity', 'Value'], [['Iodine atoms removed', `1 of ${IODINE.T4} (${DEIODINATION_PCT} percent)`], ['Iodine mass per mole of thyroxine', `${IODINE.T4 * I_MOLAR} g`], ['Iodine share of thyroxine mass', `about ${T4_IODINE_PCT} percent`]], `Worked table: ${DEIODINATION_PCT} percent of iodine atoms removed; iodine about ${T4_IODINE_PCT} percent of thyroxine by mass`),
      n: 'Removing one of four iodine atoms removes a quarter of them, twenty-five percent. Four iodine atoms weigh about five hundred and eight units out of seven hundred and seventy-seven, about sixty-five percent of the molecule. No wonder iodine shortage lowers hormone output and leads to goitre.',
    }),
    sl('check', 'Quick check: goitre', {
      b: 'Explain the neck swelling seen in an iodine-poor hill district.',
      n: 'Quick check. Which gland enlarges when iodine is short?',
      chk: 'iodine-mcq',
    }),
    sl('concept', 'Parathyroid glands and thymus', {
      b: '**Four parathyroid glands** lie on the back of the thyroid, one pair in each lobe. The **thymus** is a lobular structure between the lungs, behind the sternum, on the ventral side of the aorta.',
      v: table(['Gland and hormone', 'Roles'], [['Parathyroid: parathyroid hormone (PTH), a peptide', 'Raises blood calcium (hypercalcaemic): stimulates bone resorption, renal reabsorption of calcium and absorption of calcium from digested food; secretion regulated by blood calcium; with TCT keeps calcium balanced'], ['Thymus: thymosins, peptides', 'Differentiation of T-lymphocytes (cell-mediated immunity); promote antibody production (humoral immunity); thymus degenerates with age, so immunity weakens']], 'Table of parathyroid hormone and thymosins with their roles'),
      n: 'Parathyroid hormone dissolves calcium from bone, saves it in the kidney and absorbs more from food, so blood calcium rises. The thymus helps build the immune system; as it shrinks in old age, fewer thymosins are made and immune responses become weaker.',
    }),
    sl('check', 'Quick check: vasopressin', {
      b: 'Judge the assertion and the reason about vasopressin.',
      n: 'Quick check. What does the word diuresis mean?',
      chk: 'adh-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Hormones: non-nutrient intercellular messengers made in trace amounts by ductless glands.',
        'Hypothalamus: releasing (GnRH) and inhibiting (somatostatin) hormones reach the anterior pituitary through the portal system; posterior pituitary under direct neural control.',
        'Pars distalis: GH, PRL, TSH, ACTH, LH, FSH; pars intermedia: MSH; pars nervosa releases oxytocin and vasopressin made in the hypothalamus.',
        'GH: gigantism, dwarfism, acromegaly. ADH lack: diabetes insipidus.',
        'Pineal: melatonin and daily rhythms. Thyroid: T4, T3, TCT; goitre, cretinism, Graves’ disease.',
        'Parathyroid: PTH raises calcium. Thymus: thymosins for T-lymphocytes.',
      ],
      v: table(['Gland', 'Key hormone'], [['Hypothalamus', 'Releasing and inhibiting hormones'], ['Anterior pituitary', 'GH, PRL, TSH, ACTH, LH, FSH'], ['Posterior pituitary', 'Oxytocin, vasopressin (stored)'], ['Pineal', 'Melatonin'], ['Thyroid', 'T4, T3, thyrocalcitonin'], ['Parathyroid', 'PTH'], ['Thymus', 'Thymosins']], 'Summary table of glands and key hormones in Part 1'),
      n: 'To recap: the hypothalamus controls the pituitary through blood vessels and nerves. The pituitary releases nine hormones, two of them made in the hypothalamus. The pineal sets daily rhythms, the thyroid sets metabolic rate, the parathyroids raise calcium, and the thymus supports immunity.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Say that oxytocin and vasopressin are **made in the hypothalamus** and only **stored** in the posterior pituitary.',
        'Separate **gigantism** (child), **dwarfism** (deficiency) and **acromegaly** (adult).',
        'Do not confuse **diabetes insipidus** (ADH) with **diabetes mellitus** (insulin).',
        'Link **iodine deficiency** to goitre and **cretinism**; **Graves’ disease** to hyperthyroidism.',
      ],
      n: 'Exam tips. Oxytocin and vasopressin are made in the hypothalamus. Match growth hormone disorders to age. Keep diabetes insipidus and diabetes mellitus apart. And link iodine to goitre and cretinism, but Graves disease to an overactive thyroid.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Chemical Coordination and Integration — Part 2: Adrenal, pancreas, gonads, other hormones and how hormones act',
  goals: [
    'Describe the hormones of the adrenal medulla and cortex',
    'Explain how insulin and glucagon regulate blood glucose',
    'State the hormones of the gonads, heart, kidney and gut',
    'Explain the mechanism of hormone action and common endocrine disorders',
  ],
  slides: [
    sl('title', 'Adrenal, pancreas, gonads and more', {
      b: 'Part 2 — glands of the abdomen and pelvis, hormones of other organs, and how hormones act on cells.',
      v: flow('LR', [['g', 'Gland secretes hormone'], ['b', 'Blood carries it'], ['r', 'Receptor on target cell'], ['e', 'Response']], [['g', 'b'], ['b', 'r'], ['r', 'e']], 'Flow from gland through blood and receptor to response'),
      n: 'In this part we meet the adrenal glands, the pancreas and the gonads, then hormones from the heart, kidney and gut. Finally we see how a hormone, after reaching its target, binds a receptor and changes what the cell does.',
    }),
    sl('concept', 'Adrenal medulla: emergency hormones', {
      b: 'One adrenal gland sits on the anterior part of each kidney: a central **medulla** and an outer **cortex**. The medulla secretes **adrenaline (epinephrine)** and **noradrenaline (norepinephrine)**, the **catecholamines**.',
      v: table(['System', 'Effect of catecholamines'], [['Nervous and sense', 'Increased alertness, pupillary dilation'], ['Skin', 'Piloerection (raising of hairs), sweating'], ['Heart and lungs', 'Faster heart beat, stronger contraction, faster breathing'], ['Fuels', 'Breakdown of glycogen (blood glucose rises), lipids and proteins']], 'Table of the effects of adrenaline and noradrenaline'),
      n: 'These hormones are secreted rapidly in response to any stress or emergency, so they are called emergency hormones, or hormones of fight or flight. Every effect prepares the body for sudden action, from a faster heart to more glucose in the blood.',
    }),
    sl('concept', 'Adrenal cortex: corticoids', {
      b: 'The cortex has three layers: **zona glomerulosa** (outer), **zona fasciculata** (middle) and **zona reticularis** (inner). Its hormones are the **corticoids**.',
      v: table(['Group', 'Example', 'Roles'], [['Glucocorticoids', 'Cortisol', 'Carbohydrate metabolism: gluconeogenesis, lipolysis, proteolysis; inhibit cellular uptake of amino acids; maintain heart and kidney function; anti-inflammatory; suppress immunity; stimulate RBC production'], ['Mineralocorticoids', 'Aldosterone', 'Renal tubules reabsorb sodium ions and water and excrete potassium and phosphate ions; maintain fluid volume, osmotic pressure and blood pressure'], ['Androgenic steroids', 'Small amounts', 'Growth of axial, pubic and facial hair at puberty']], 'Table of the three groups of adrenal cortex hormones'),
      n: 'Underproduction of cortex hormones alters carbohydrate metabolism and causes acute weakness and fatigue. This is Addison disease. Notice that cortisol both raises glucose production and calms inflammation, which is why cortisol-like medicines are used for swollen, inflamed tissue.',
    }),
    sl('check', 'Quick check: adrenaline', {
      b: 'Which change is NOT caused by the emergency hormones?',
      n: 'Quick check. In fright, do the pupils widen or narrow?',
      chk: 'emergency-mcq',
    }),
    sl('concept', 'Pancreas: insulin and glucagon', {
      b: 'The pancreas is a **composite gland**, both exocrine and endocrine. Its endocrine part is about **1 to 2 million islets of Langerhans**, only **1 to 2 percent** of the pancreatic tissue.',
      v: table(['Islet cell', 'Hormone', 'Action'], [['α cells', 'Glucagon (peptide)', 'Acts mainly on hepatocytes: glycogenolysis and gluconeogenesis; reduces cellular glucose uptake; raises blood glucose (hyperglycaemic)'], ['β cells', 'Insulin (peptide)', 'Acts mainly on hepatocytes and adipocytes: glucose uptake and use; glycogenesis; lowers blood glucose (hypoglycaemic)']], 'Table of glucagon and insulin with their source cells and actions'),
      n: 'Glucagon and insulin pull in opposite directions, keeping glucose within limits. Prolonged hyperglycaemia leads to diabetes mellitus, with loss of glucose in the urine and harmful ketone bodies. Diabetic patients are successfully treated with insulin therapy.',
    }),
    sl('diagram', 'Blood glucose after a glucose drink', {
      b: 'In a healthy person insulin brings glucose back towards the fasting level within about two hours. Without enough insulin, glucose stays high, crosses the kidney threshold and appears in the urine.',
      v: V.glucose,
      n: 'The blue curve rises after the drink and then falls back, as insulin moves glucose into liver and fat cells. The red curve starts higher, rises further and stays above the dashed kidney threshold for hours, so glucose spills into the urine. The values are illustrative.',
    }),
    sl('example', 'Worked example 1: glucose in the blood', {
      b: `An adult has about ${GLU.volumeL} litres of blood at ${GLU.conc} mg of glucose per dL. (i) How many grams of glucose are in the blood? (ii) After a glucose drink the level peaks at ${PEAK.normal} mg per dL. What is the percentage rise?`,
      ul: [
        r`(i) $${GLU.volumeL} \times 10 = ${GLU.dl}$ dL; $${GLU.conc} \times ${GLU.dl} = ${GLU.totalMg}$ mg, that is ${GLU.totalG} g.`,
        r`(ii) $\dfrac{${PEAK.normal} - ${NORMAL.base}}{${NORMAL.base}} \times 100 \approx ${RISE_PCT.normal}$ percent.`,
        'Only a few grams circulate at any moment, so insulin and glucagon must adjust it constantly.',
      ],
      v: table(['Quantity', 'Value'], [['Blood volume', `${GLU.dl} dL`], ['Glucose in blood', `${GLU.totalG} g`], ['Rise to peak', `about ${RISE_PCT.normal} percent`]], `Worked table: ${GLU.totalG} grams of glucose; peak rise about ${RISE_PCT.normal} percent`),
      n: 'Five litres is fifty decilitres. Ninety milligrams in each gives four thousand five hundred milligrams, only four and a half grams of glucose in all the blood. A rise from ninety to one hundred and forty is about fifty-six percent, and in health insulin soon brings it back.',
    }),
    sl('concept', 'Testis and ovary', {
      b: 'The gonads are primary sex organs and endocrine glands.',
      v: table(['Gland', 'Hormone and source', 'Roles'], [['Testis (in the scrotal sac)', 'Androgens, mainly testosterone, from Leydig (interstitial) cells', 'Development and function of male accessory sex organs; muscular growth, facial and axillary hair, low-pitched voice, aggressiveness; spermatogenesis; male sexual behaviour (libido); anabolic effects'], ['Ovary (in the abdomen)', 'Estrogen from growing follicles', 'Growth of female secondary sex organs and follicles; female secondary sex characters such as high-pitched voice; mammary gland development; female sexual behaviour'], ['Ovary', 'Progesterone from the corpus luteum', 'Supports pregnancy; formation of alveoli in mammary glands and milk secretion']], 'Table of testis and ovary hormones and roles'),
      n: 'The testis is made of seminiferous tubules and interstitial tissue; Leydig cells in the spaces between tubules make androgens. The ovary produces one ovum in each menstrual cycle. After ovulation the ruptured follicle becomes the corpus luteum, which secretes mainly progesterone.',
    }),
    sl('concept', 'Hormones of the heart, kidney and gut', {
      b: 'Some organs that are not endocrine glands also secrete hormones.',
      v: table(['Organ and hormone', 'Action'], [['Heart (atrial wall): atrial natriuretic factor', 'Dilates blood vessels; lowers raised blood pressure'], ['Kidney (juxtaglomerular cells): erythropoietin', 'Stimulates erythropoiesis (RBC formation)'], ['Gut: gastrin', 'Gastric glands secrete HCl and pepsinogen'], ['Gut: secretin', 'Exocrine pancreas secretes water and bicarbonate ions'], ['Gut: cholecystokinin', 'Pancreas releases enzymes; gall bladder releases bile'], ['Gut: gastric inhibitory peptide', 'Inhibits gastric secretion and motility']], 'Table of hormones of the heart, kidney and gastrointestinal tract'),
      n: 'Several other non-endocrine tissues secrete hormones called growth factors, needed for normal growth and repair. Notice how the four gut hormones coordinate digestion, switching secretions on and off as food moves along.',
    }),
    sl('check', 'Quick check: blood pressure', {
      b: 'Which hormone would the heart secrete when blood pressure rises sharply?',
      n: 'Quick check. Which chamber wall makes it, and does it raise or lower pressure?',
      chk: 'anf-mcq',
    }),
    sl('concept', 'Chemical nature of hormones', {
      b: 'Hormones act through specific proteins called **hormone receptors**, found only in target tissues. **Membrane-bound** receptors lie on the cell membrane; **intracellular** receptors are mostly nuclear. Each receptor is specific to one hormone.',
      v: table(['Class', 'Examples', 'Receptor'], [['Peptide, polypeptide, protein', 'Insulin, glucagon, pituitary and hypothalamic hormones', 'Membrane-bound'], ['Amino-acid derivatives', 'Epinephrine', 'Membrane-bound'], ['Steroids', 'Cortisol, testosterone, estradiol, progesterone', 'Intracellular'], ['Iodothyronines', 'Thyroid hormones', 'Intracellular']], 'Table of four chemical classes of hormones with examples and receptor types'),
      n: 'When a hormone binds its receptor, a hormone receptor complex forms and causes biochemical changes in the target tissue. Because receptors are specific, a hormone carried everywhere in the blood still acts only on its own target cells.',
    }),
    sl('diagram', 'Mechanism of hormone action', {
      b: 'Membrane-receptor hormones generate **second messengers** (cyclic AMP, IP3, calcium ions). Intracellular-receptor hormones act on the **genome**, regulating **gene expression**.',
      v: V.action,
      n: 'On the left, a peptide or amine hormone stays outside the cell. Its receptor triggers a second messenger, such as cyclic A M P, which changes the cell quickly. On the right, a steroid or thyroid hormone enters the cell, binds a receptor in the nucleus and switches genes on or off, so new proteins are made more slowly.',
    }),
    sl('example', 'Worked example 2: amplification and removal', {
      b: `(i) One hormone molecule activates one receptor, which makes ${AMP.cAMPper} cyclic AMP molecules; each leads to ${AMP.productPer} product molecules. How many products? (ii) A hormone with a half-life of ${HALF.half} minutes is released in one burst. What percentage remains after ${HALF.minutes} minutes? (Illustrative numbers.)`,
      ul: [
        r`(i) $${AMP.receptors} \times ${AMP.cAMPper} \times ${AMP.productPer} = ${AMP.total}$ product molecules.`,
        r`(ii) $\dfrac{${HALF.minutes}}{${HALF.half}} = 3$ half-lives; $\dfrac{1}{8} \times 100 = ${HALF.leftPct}$ percent remains.`,
        'Amplification explains how **trace amounts** work; quick removal lets the signal be switched off.',
      ],
      v: table(['Step', 'Number'], [['Hormone molecules', String(AMP.receptors)], ['Cyclic AMP made', String(AMP.cAMPper)], ['Products', String(AMP.total)], [`Left after ${HALF.minutes} minutes`, `${HALF.leftPct} percent`]], `Worked table: ${AMP.total} products from one hormone; ${HALF.leftPct} percent left after three half-lives`),
      n: 'One times one hundred times fifty gives five thousand product molecules from a single hormone molecule, which is why trace amounts are enough. Thirty minutes is three half-lives, so one half, then a quarter, then an eighth remains, twelve and a half percent.',
    }),
    sl('check', 'Quick check: receptors', {
      b: 'Why does TSH act only on the thyroid?',
      n: 'Quick check. What must a target cell carry?',
      chk: 'receptor-mcq',
    }),
    sl('concept', 'Endocrine disorders', {
      b: 'Too much or too little of a hormone upsets body functions.',
      v: table(['Disorder', 'Hormone problem', 'Main features'], [['Pituitary dwarfism', 'Low GH in childhood', 'Stunted growth'], ['Gigantism and acromegaly', 'Excess GH (child; adult)', 'Abnormal growth; facial disfigurement'], ['Diabetes insipidus', 'Low ADH', 'Large volumes of urine, dehydration'], ['Goitre and cretinism', 'Hypothyroidism (iodine lack)', 'Enlarged thyroid; stunted growth and mental retardation in babies'], ['Exophthalmic goitre', 'Hyperthyroidism', 'Protruding eyes, high BMR, weight loss'], ['Addison’s disease', 'Low adrenal cortex hormones', 'Acute weakness and fatigue'], ['Diabetes mellitus', 'Low insulin effect', 'Hyperglycaemia, glucose in urine, ketone bodies']], 'Table of endocrine disorders with hormone problems and features'),
      n: 'Each disorder points back to one hormone. Ask whether there is too much or too little, and when it began. Growth hormone disorders depend on age, thyroid disorders on iodine and gland activity, and the two kinds of diabetes on two different hormones.',
    }),
    sl('check', 'Quick check: second messengers', {
      b: 'Which hormone acts through a second messenger without entering its target cell?',
      n: 'Quick check. Peptides stay outside; steroids and thyroid hormones go in.',
      chk: 'secondmsg-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Adrenal medulla: adrenaline and noradrenaline, fight or flight. Cortex (glomerulosa, fasciculata, reticularis): cortisol, aldosterone, androgens; Addison’s disease.',
        'Pancreas: α cells glucagon (raises glucose), β cells insulin (lowers glucose); diabetes mellitus.',
        'Testis: androgens from Leydig cells. Ovary: estrogen from follicles, progesterone from the corpus luteum.',
        'ANF lowers blood pressure; erythropoietin makes RBCs; gastrin, secretin, CCK, GIP coordinate digestion.',
        'Receptors are specific: membrane-bound (second messengers) or intracellular (gene expression).',
      ],
      v: table(['Receptor type', 'Hormones', 'Acts by'], [['Membrane-bound', 'Peptides, proteins, amino-acid derivatives', 'Second messengers'], ['Intracellular', 'Steroids, iodothyronines', 'Gene expression']], 'Summary table of the two receptor pathways'),
      n: 'To recap: the adrenal medulla prepares us for emergencies while the cortex manages fuel, salt and water. Insulin and glucagon balance blood glucose. Gonads, heart, kidney and gut all release hormones. And every hormone acts through a specific receptor, either on the membrane or inside the cell.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write **glycogenolysis** for glucagon and **glycogenesis** for insulin; do not swap them.',
        'Name the **three cortex zones** in order and one hormone group from each role.',
        'For mechanism questions, give the **four chemical classes** and the **two receptor pathways** with examples.',
        'Learn the **four gut hormones** with their targets.',
      ],
      n: 'Exam tips. Glucagon breaks glycogen down; insulin builds it up. Name the three cortex zones in order. For mechanism answers give the four classes and two pathways with examples. And learn the four gut hormones with their targets.',
    }),
  ],
});
