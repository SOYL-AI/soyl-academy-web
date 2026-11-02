// ch19 Chemical Coordination and Integration — question bank. AR keys: a b c d a.
import { mk, add, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { DEIODINATION_PCT, IODINE, T4_MOLAR, I_MOLAR, T4_IODINE_PCT, GLU, HALF, AMP, PANC, NORMAL, DIABETIC, PEAK, RISE_PCT, RENAL_THRESHOLD, AFTER3, pct } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 hypothalamus and pituitary
add('hormonedef-mcq', mcq({
  stem: 'Which statement matches the present scientific definition of a hormone?',
  right: 'A non-nutrient chemical that acts as an intercellular messenger and is produced in trace amounts',
  wrong: ['A digestive enzyme carried to its site of action through a duct', 'A nutrient stored in the liver and released when needed', 'Any secretion of a gland, with or without a duct'],
  sol: 'Hormones are non-nutrient chemicals which act as intercellular messengers and are produced in trace amounts — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('portal-mcq', mcq({
  stem: 'In an animal experiment, a harmless dye is injected into the capillary bed at the base of the hypothalamus. Through the hypophysial portal veins it reaches capillaries in which region first?',
  right: 'The anterior pituitary (pars distalis)',
  wrong: ['The posterior pituitary (pars nervosa)', 'The pineal gland', 'The thyroid gland'],
  sol: 'The portal circulatory system links the hypothalamus with the anterior pituitary, carrying releasing and inhibiting hormones to it — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('somatostatin-mcq', mcq({
  stem: 'Somatostatin, a hypothalamic hormone, acts on the pituitary to',
  right: 'inhibit the release of growth hormone',
  wrong: ['stimulate the release of gonadotrophins', 'stimulate milk ejection', 'inhibit the release of melatonin'],
  sol: 'Somatostatin is an inhibiting hormone: it inhibits the release of growth hormone from the pituitary — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('intermedia-mcq', mcq({
  stem: 'The only hormone secreted by the pars intermedia acts on',
  right: 'melanocytes, regulating skin pigmentation',
  wrong: ['the uterus, causing contraction', 'the kidney tubules, conserving water', 'the thyroid, stimulating its secretion'],
  sol: 'The pars intermedia secretes MSH, which acts on melanocytes and regulates skin pigmentation — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('oxyorigin-mcq', mcq({
  stem: 'A student writes: “Oxytocin and vasopressin are made by the posterior pituitary.” Which correction is accurate?',
  right: 'They are made by hypothalamic neurons, carried down their axons and only stored and released by the posterior pituitary.',
  wrong: ['They are made by the anterior pituitary and stored in the hypothalamus.', 'They are made by the pars intermedia and released by the pineal gland.', 'They are made in the kidney and stored in the posterior pituitary.'],
  sol: 'The neurohypophysis stores and releases oxytocin and vasopressin, which are synthesised by the hypothalamus and transported axonally — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('di-mcq', mcq({
  stem: 'After a head injury that damaged the hypothalamus and pituitary stalk, a man passes very large volumes of dilute urine and is always thirsty, but his blood glucose is normal. The most likely cause is',
  right: 'reduced release of vasopressin (ADH), causing diabetes insipidus',
  wrong: ['lack of insulin, causing diabetes mellitus', 'excess aldosterone, causing salt retention', 'excess thyroxine, causing a high metabolic rate'],
  sol: 'Without ADH the kidney cannot conserve water, so water is lost and the body dehydrates: diabetes insipidus. Normal glucose rules out diabetes mellitus — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('acro-mcq', mcq({
  stem: 'Over ten years, a 46-year-old woman notices that her rings and shoes no longer fit and her jaw and facial features have become coarse. Tests show a pituitary tumour. Her condition is',
  right: 'acromegaly, from excess growth hormone in adulthood',
  wrong: ['gigantism, from excess growth hormone in childhood', 'pituitary dwarfism, from too little growth hormone', 'cretinism, from too little thyroid hormone'],
  sol: 'Excess growth hormone in adults, especially in middle age, causes severe disfigurement, especially of the face: acromegaly. It is slow and often goes undetected for years — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('dwarf-mcq', mcq({
  stem: 'An eight-year-old boy is much shorter than his classmates, but his body proportions and intelligence are normal. Blood tests show low growth hormone. The likely diagnosis is',
  right: 'pituitary dwarfism',
  wrong: ['acromegaly', 'Addison’s disease', 'exophthalmic goitre'],
  sol: 'Low secretion of growth hormone in childhood results in stunted growth called pituitary dwarfism — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('pineal-mcq', mcq({
  stem: 'A nurse who moves to night shifts finds that her sleep–wake cycle and body temperature rhythm are disturbed. The hormone most closely linked to these daily rhythms is',
  right: 'melatonin, from the pineal gland',
  wrong: ['prolactin, from the anterior pituitary', 'thymosin, from the thymus', 'aldosterone, from the adrenal cortex'],
  sol: 'Melatonin plays a very important role in regulating the 24-hour (diurnal) rhythm, such as the sleep–wake cycle and body temperature — option (@K).',
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t01 pineal, thyroid, parathyroid, thymus
add('iodine-mcq', mcq({
  stem: 'In a hill district where the soil and water are poor in iodine, many adults have a visible swelling at the front of the neck. The swelling is best explained as',
  right: 'goitre, an enlarged thyroid caused by iodine deficiency and hypothyroidism',
  wrong: ['an enlarged thymus caused by infection', 'swollen parathyroid glands caused by excess calcium', 'acromegaly caused by excess growth hormone'],
  sol: 'Iodine is essential for thyroid hormone synthesis; its deficiency causes hypothyroidism and enlargement of the thyroid, called goitre — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cretin-mcq', mcq({
  stem: 'A pregnant woman has hypothyroidism that is not treated. Which outcome is her baby at risk of?',
  right: 'Cretinism: stunted growth, mental retardation, low IQ, abnormal skin and deaf-mutism',
  wrong: ['Gigantism: abnormally rapid growth of the whole body', 'Diabetes insipidus: loss of large volumes of urine', 'Graves’ disease: protruding eyeballs and weight loss'],
  sol: 'Hypothyroidism during pregnancy causes defective development and maturation of the growing baby, leading to cretinism — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('graves-mcq', mcq({
  stem: 'A 30-year-old man has an enlarged thyroid, protruding eyeballs, a raised basal metabolic rate and weight loss despite eating well. His condition is',
  right: 'exophthalmic goitre (Graves’ disease), a form of hyperthyroidism',
  wrong: ['simple goitre caused by iodine deficiency', 'cretinism caused by hypothyroidism', 'Addison’s disease caused by adrenal failure'],
  sol: 'Enlarged thyroid, protrusion of the eyeballs, increased BMR and weight loss characterise exophthalmic goitre, also called Graves’ disease — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('pth-mcq', mcq({
  stem: 'Which of these is NOT an effect of parathyroid hormone?',
  right: 'It stimulates the deposition of calcium in bones.',
  wrong: ['It stimulates bone resorption (demineralisation).', 'It stimulates reabsorption of calcium ions by the renal tubules.', 'It increases absorption of calcium from digested food.'],
  sol: 'PTH raises blood calcium: it stimulates bone resorption, renal reabsorption and intestinal absorption of calcium. Depositing calcium in bone would lower blood calcium — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
add('thymusage-mcq', mcq({
  stem: 'Why do the immune responses of old people usually become weaker?',
  right: 'The thymus degenerates, so less thymosin is made and fewer T-lymphocytes differentiate.',
  wrong: ['The pineal gland enlarges and makes too much melatonin.', 'The thyroid stops making thyrocalcitonin.', 'The adrenal medulla secretes more adrenaline.'],
  sol: 'The thymus degenerates in old individuals, reducing thymosins, which are needed for T-lymphocyte differentiation and antibody production — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t01 adrenal, pancreas, gonads, other organs
add('emergency-mcq', mcq({
  stem: 'Which change is NOT brought about by adrenaline and noradrenaline during an emergency?',
  right: 'Constriction of the pupils',
  wrong: ['Increased heart rate and strength of contraction', 'Breakdown of glycogen, raising blood glucose', 'Raising of hairs (piloerection) and sweating'],
  sol: 'The catecholamines cause pupillary dilation, not constriction, along with the other changes listed — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('cortisol-mcq', mcq({
  stem: 'A doctor prescribes a cortisol-like cream for a patch of red, swollen, itchy skin. Which property of glucocorticoids is being used?',
  right: 'They produce anti-inflammatory reactions and suppress the immune response.',
  wrong: ['They stimulate the reabsorption of sodium ions in the kidney.', 'They stimulate the formation of melanin in the skin.', 'They act as second messengers inside skin cells.'],
  sol: 'Glucocorticoids, particularly cortisol, produce anti-inflammatory reactions and suppress the immune response — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('addison-mcq', mcq({
  stem: 'Underproduction of hormones by the adrenal cortex alters carbohydrate metabolism and causes acute weakness and fatigue. This disease is called',
  right: 'Addison’s disease',
  wrong: ['Graves’ disease', 'diabetes insipidus', 'acromegaly'],
  sol: 'Addison’s disease results from underproduction of adrenal cortex hormones — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('glucagon-mcq', mcq({
  stem: 'After an overnight fast, a girl’s blood glucose stays steady although she has eaten nothing for twelve hours. Which hormone mainly prevents it from falling, and how?',
  right: 'Glucagon, by stimulating glycogenolysis and gluconeogenesis in liver cells',
  wrong: ['Insulin, by moving glucose into fat cells', 'Thyrocalcitonin, by releasing glucose from bones', 'Oxytocin, by stimulating glucose release from muscles'],
  sol: 'Glucagon acts mainly on hepatocytes, stimulating glycogenolysis and gluconeogenesis, so it raises blood glucose — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('anf-mcq', mcq({
  stem: 'During a medical check-up, a man’s blood pressure is found to be much higher than usual. Which hormone would his atrial walls secrete in response, and with what effect?',
  right: 'Atrial natriuretic factor, which dilates blood vessels and lowers blood pressure',
  wrong: ['Erythropoietin, which raises the number of red blood cells', 'Vasopressin, which constricts vessels and raises blood pressure further', 'Aldosterone, which retains sodium and water'],
  sol: 'When blood pressure rises, the atrial wall secretes ANF, which dilates blood vessels and reduces blood pressure — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('epo-mcq', mcq({
  stem: 'A patient with long-standing kidney damage becomes anaemic even though his diet is adequate. Lack of which hormone best explains the anaemia?',
  right: 'Erythropoietin from the juxtaglomerular cells',
  wrong: ['Thymosin from the thymus', 'Gastrin from the stomach', 'Melatonin from the pineal gland'],
  sol: 'Juxtaglomerular cells of the kidney produce erythropoietin, which stimulates erythropoiesis (formation of red blood cells) — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('secretin-mcq', mcq({
  stem: 'Acidic food from the stomach enters the duodenum. Which gut hormone then makes the exocrine pancreas release water and bicarbonate ions?',
  right: 'Secretin',
  wrong: ['Gastrin', 'Gastric inhibitory peptide', 'Insulin'],
  sol: 'Secretin acts on the exocrine pancreas and stimulates secretion of water and bicarbonate ions — option (@K).',
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 mechanism and disorders
add('receptor-mcq', mcq({
  stem: 'TSH travels in the blood to every organ, yet it stimulates only the thyroid. The best explanation is that',
  right: 'only thyroid cells carry receptors specific for TSH',
  wrong: ['TSH is destroyed in all other organs', 'blood reaches only the thyroid in large amounts', 'TSH enters every cell but acts only in the thyroid nucleus'],
  sol: 'Hormones act only on target tissues that carry their specific receptors; each receptor is specific to one hormone — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('secondmsg-mcq', mcq({
  stem: 'Which hormone normally acts on its target cell through a second messenger, without entering the cell?',
  right: 'Glucagon',
  wrong: ['Cortisol', 'Progesterone', 'Thyroxine'],
  sol: 'Glucagon is a peptide hormone that binds a membrane-bound receptor and acts through second messengers; steroids and iodothyronines bind intracellular receptors — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('steroid-mcq', mcq({
  stem: 'In a cell-culture study, a hormone passes through the plasma membrane, binds a receptor in the nucleus and, a few hours later, new proteins appear. The hormone is most likely',
  right: 'testosterone',
  wrong: ['insulin', 'adrenaline', 'glucagon'],
  sol: 'Steroid hormones such as testosterone interact with intracellular (nuclear) receptors and regulate gene expression — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('class-mcq', mcq({
  stem: 'Which hormone is correctly matched with its chemical nature?',
  right: 'Epinephrine — amino-acid derivative',
  wrong: ['Insulin — steroid', 'Cortisol — iodothyronine', 'Estradiol — protein'],
  sol: 'Epinephrine is an amino-acid derivative; insulin is a peptide, cortisol and estradiol are steroids — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('urine-mcq', mcq({
  stem: 'Why does glucose appear in the urine of a person with untreated diabetes mellitus but not in that of a healthy person?',
  right: 'Prolonged high blood glucose exceeds what the kidney tubules can reabsorb, so the extra glucose stays in the urine.',
  wrong: ['The kidney makes glucose when insulin is absent.', 'Glucagon is excreted in the urine and turns into glucose.', 'Healthy kidneys do not filter any glucose from the blood.'],
  sol: 'In diabetes mellitus prolonged hyperglycaemia leads to loss of glucose through urine, because the filtered load exceeds tubular reabsorption — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- assertion-reason
add('adh-ar', ar({
  a: 'Vasopressin is also called the anti-diuretic hormone.',
  r: 'Vasopressin stimulates reabsorption of water and electrolytes by the distal tubules and so reduces the loss of water through urine.',
  key: 'a',
  sol: 'Both are true; reducing diuresis is exactly why vasopressin is called ADH — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('adren-ar', ar({
  a: 'Adrenaline raises the concentration of glucose in the blood.',
  r: 'Adrenaline increases the heart rate and the strength of heart contraction.',
  key: 'b',
  sol: 'Both are true, but A is explained by adrenaline stimulating the breakdown of glycogen, not by its effect on the heart — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('insulin-ar', ar({
  a: 'Insulin lowers the blood glucose level.',
  r: 'Insulin stimulates the breakdown of glycogen in liver cells.',
  key: 'c',
  sol: 'A is true. R is false: insulin stimulates glycogenesis (glucose to glycogen) and glucose uptake; glycogenolysis is stimulated by glucagon — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('steroid-ar', ar({
  a: 'Steroid hormones act on their target cells by generating cyclic AMP as a second messenger.',
  r: 'Steroid hormones interact with intracellular receptors and mostly regulate gene expression.',
  key: 'd',
  sol: 'A is false: second messengers are used by hormones that bind membrane-bound receptors. R is true — option (d).',
  d: 3, c: 'understanding', t: [2],
}));
add('iodine-ar', ar({
  a: 'Lack of iodine in the diet can lead to an enlarged thyroid gland.',
  r: 'Iodine is essential for the normal rate of synthesis of thyroid hormones.',
  key: 'a',
  sol: 'Both are true; without iodine hormone synthesis falls (hypothyroidism) and the gland enlarges as goitre — option (a).',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- tf, fill, match
add('intermedia-tf', tf({
  stem: 'In humans, the pars intermedia is almost merged with the pars distalis.',
  key: 't',
  sol: 'True.',
  d: 2, c: 'recall', t: [1],
}));
add('glucagon-tf', tf({
  stem: 'Glucagon is a hypoglycaemic hormone.',
  key: 'f',
  sol: 'False. Glucagon raises blood glucose, so it is a hyperglycaemic hormone; insulin is hypoglycaemic.',
  d: 1, c: 'recall', t: [1],
}));
add('membrane-tf', tf({
  stem: 'Hormones that bind membrane-bound receptors normally enter the target cell before they act.',
  key: 'f',
  sol: 'False. They normally do not enter the cell; they generate second messengers that regulate cell metabolism.',
  d: 2, c: 'understanding', t: [2],
}));
add('sella-fill', fill({
  stem: 'The pituitary gland lies in a bony cavity of the skull called the sella ______.',
  acc: [['turcica']],
  sol: 'Turcica: the pituitary is located in the sella turcica and is attached to the hypothalamus by a stalk.',
  d: 1, c: 'recall', t: [1],
}));
add('reticularis-fill', fill({
  stem: 'The innermost layer of the adrenal cortex is the zona ______.',
  acc: [['reticularis']],
  sol: 'Reticularis: from inside out the layers are zona reticularis, zona fasciculata and zona glomerulosa.',
  d: 2, c: 'recall', t: [1],
}));
add('hypercal-fill', fill({
  stem: 'Because it raises the calcium level of the blood, parathyroid hormone is described as a ______ hormone.',
  acc: [['hypercalcaemic', 'hypercalcemic']],
  sol: 'Hypercalcaemic (hypercalcemic).',
  d: 2, c: 'recall', t: [1],
}));
add('source-match', match({
  stem: 'Match each hormone (column I) with the cells or tissue that secrete it (column II).',
  pairs: [
    ['Testosterone', 'Leydig (interstitial) cells of the testis'],
    ['Progesterone', 'Corpus luteum of the ovary'],
    ['Insulin', 'β cells of the islets of Langerhans'],
    ['Erythropoietin', 'Juxtaglomerular cells of the kidney'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Testosterone: Leydig cells; progesterone: corpus luteum; insulin: β cells; erythropoietin: juxtaglomerular cells.',
  d: 1, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- numericals
add('deiod-num', num({
  stem: `A thyroxine molecule carries ${IODINE.T4} iodine atoms and a triiodothyronine molecule ${IODINE.T3}. When a tissue converts thyroxine into triiodothyronine, what percentage of the thyroxine’s iodine atoms is removed?`,
  value: DEIODINATION_PCT, unit: '%',
  sol: r`$\dfrac{${IODINE.T4} - ${IODINE.T3}}{${IODINE.T4}} \times 100 = ${DEIODINATION_PCT}$ percent.`,
  scheme: [[`${DEIODINATION_PCT}%`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 25 || 'value');
add('t4mass-num', num({
  stem: `The molar mass of thyroxine is about ${T4_MOLAR} g per mol and that of iodine about ${I_MOLAR} g per mol. Each thyroxine molecule has ${IODINE.T4} iodine atoms. What percentage of the mass of thyroxine is iodine? (One decimal place.)`,
  value: T4_IODINE_PCT, tol: 0.1, unit: '%',
  sol: r`$\dfrac{${IODINE.T4} \times ${I_MOLAR}}{${T4_MOLAR}} \times 100 = \dfrac{${IODINE.T4 * I_MOLAR}}{${T4_MOLAR}} \times 100 \approx ${T4_IODINE_PCT}$ percent. This is why the thyroid needs a steady dietary supply of iodine.`,
  scheme: [[`Mass of iodine per mole: ${IODINE.T4 * I_MOLAR} g`, 0.5], [`${T4_IODINE_PCT}%`, 0.5]],
  d: 4, c: 'application', t: [1],
}), (q) => q.answer.value === 65.4 || 'value');
add('bloodglu-num', num({
  stem: `An adult has about ${GLU.volumeL} litres of blood with a glucose concentration of ${GLU.conc} mg per dL (1 litre = 10 dL). About how many grams of glucose are dissolved in the whole blood?`,
  value: GLU.totalG, tol: 0.01, unit: 'g',
  sol: r`$${GLU.volumeL} \times 10 = ${GLU.dl}$ dL; $${GLU.conc} \times ${GLU.dl} = ${GLU.totalMg}$ mg $= ${GLU.totalG}$ g. Insulin and glucagon keep this small amount steady.`,
  scheme: [[`${GLU.totalG} g`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 4.5 || 'value');
add('halflife-num', num({
  stem: `Hormones are removed from the blood soon after release. Suppose a hormone with a half-life of ${HALF.half} minutes is released in a single burst, and no more is added. What percentage of the burst is still in the blood ${HALF.minutes} minutes later? (Illustrative numbers.)`,
  value: HALF.leftPct, tol: 0.05, unit: '%',
  sol: r`$${HALF.minutes} \div ${HALF.half} = 3$ half-lives; $\left(\dfrac{1}{2}\right)^{3} = \dfrac{1}{8}$, and $\dfrac{1}{8} \times 100 = ${HALF.leftPct}$ percent.`,
  scheme: [[`${HALF.leftPct}%`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 12.5 || 'value');
add('amp-num', num({
  stem: `In a model of a second-messenger cascade, one hormone molecule activates one receptor, which causes ${AMP.cAMPper} molecules of cyclic AMP to be made; each cyclic AMP molecule finally leads to ${AMP.productPer} molecules of product. How many product molecules result from one hormone molecule? (Illustrative numbers.)`,
  value: AMP.total,
  sol: r`$${AMP.receptors} \times ${AMP.cAMPper} \times ${AMP.productPer} = ${AMP.total}$ molecules. Amplification explains why hormones work in trace amounts.`,
  scheme: [[`${AMP.total}`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 5000 || 'value');
add('islet-num', num({
  stem: `A pancreas weighs about ${PANC.mass} g, and its islets of Langerhans make up ${PANC.pct} percent of the tissue. About how many grams of the pancreas are endocrine tissue?`,
  value: PANC.islet, tol: 0.01, unit: 'g',
  sol: r`$${PANC.mass} \times \dfrac{${PANC.pct}}{100} = ${PANC.islet}$ g. Islets form only 1 to 2 percent of the pancreas; the rest is exocrine.`,
  scheme: [[`${PANC.islet} g`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 1.35 || 'value');

// ---------------------------------------------------------------- short answers
add('hypo-short', short({
  marks: 2,
  stem: 'How does the hypothalamus control the anterior pituitary differently from the posterior pituitary?',
  model: '**Anterior pituitary:** hypothalamic neurons release **releasing and inhibiting hormones**, which reach it through the **hypophysial portal system** and regulate its secretion.\n\n**Posterior pituitary:** it is under **direct neural regulation**; its hormones are made in hypothalamic neurons and carried down their **axons** to be stored.',
  sol: 'Portal blood versus axons.',
  scheme: [['Anterior: hormones through the portal system', 1], ['Posterior: direct neural control through axons', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('adh-short', short({
  marks: 2,
  stem: 'A patient’s ADH secretion is impaired. Explain why he passes large volumes of urine and becomes dehydrated, and name the condition.',
  model: 'ADH (vasopressin) normally makes the **distal tubules reabsorb water and electrolytes**. Without it the kidney **cannot conserve water**, so large volumes of dilute urine are lost and the body **dehydrates**. The condition is **diabetes insipidus**.',
  sol: 'ADH role; diabetes insipidus.',
  scheme: [['ADH stimulates water reabsorption; lost without it', 1], ['Diabetes insipidus', 1]],
  d: 2, c: 'application', t: [1],
}));
add('thymus-short', short({
  marks: 2,
  stem: 'A 75-year-old catches infections more easily and recovers more slowly than his teenage grandson. Explain this using the thymus.',
  model: 'The thymus secretes **thymosins**, which help **T-lymphocytes differentiate** (cell-mediated immunity) and promote **antibody production** (humoral immunity). In old age the thymus **degenerates**, so less thymosin is made and **immune responses become weak**.',
  sol: 'Thymosins; degeneration with age.',
  scheme: [['Thymosins: T-cell differentiation and antibodies', 1], ['Thymus degenerates with age', 1]],
  d: 2, c: 'application', t: [1],
}));
add('heartkidney-short', short({
  marks: 2,
  stem: 'Compare atrial natriuretic factor and erythropoietin in terms of the organ that secretes each and its effect.',
  model: '**ANF** is secreted by the **atrial wall of the heart** when blood pressure rises; it **dilates blood vessels** and so **lowers blood pressure**.\n\n**Erythropoietin** is a peptide hormone from the **juxtaglomerular cells of the kidney**; it **stimulates erythropoiesis**, the formation of red blood cells.',
  sol: 'Source and action of each.',
  scheme: [['ANF: atria, dilates vessels, lowers BP', 1], ['Erythropoietin: JG cells, RBC formation', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('mech-short', short({
  marks: 2,
  stem: 'Glucagon needs a second messenger to act on a liver cell, but cortisol does not. Explain the difference.',
  model: 'Glucagon is a **peptide** that binds a **membrane-bound receptor** and does **not enter** the cell, so a **second messenger** such as cyclic AMP carries the signal inside. Cortisol is a **steroid**: it enters the cell, binds an **intracellular receptor** and acts on **gene expression** directly.',
  sol: 'Membrane versus intracellular receptor.',
  scheme: [['Glucagon: membrane receptor, second messenger', 1], ['Cortisol: intracellular receptor, gene expression', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('gigacro-short', short({
  marks: 2,
  stem: 'Two patients both have a growth-hormone-secreting pituitary tumour: one is 12 years old, the other 50. Predict and explain how their conditions differ.',
  model: 'The **12-year-old** will develop **gigantism**: excess GH before growth stops causes **abnormal growth of the whole body**. The **50-year-old** will develop **acromegaly**: in adults excess GH causes severe **disfigurement, especially of the face**, hands and feet, often undetected for years.',
  sol: 'Gigantism versus acromegaly.',
  scheme: [['Child: gigantism, whole-body growth', 1], ['Adult: acromegaly, facial disfigurement', 1]],
  d: 2, c: 'application', t: [2],
}));
add('calcium-short', short({
  marks: 2,
  stem: 'How do parathyroid hormone and thyrocalcitonin together keep blood calcium within limits?',
  model: '**PTH** raises blood calcium: it stimulates **bone resorption**, **reabsorption of calcium by renal tubules** and **absorption from digested food**; its secretion is regulated by blood calcium. **Thyrocalcitonin** from the thyroid acts in the **opposite direction**, lowering calcium, so together they balance it.',
  sol: 'Opposing actions.',
  scheme: [['PTH raises calcium, with actions', 1], ['TCT lowers it; together they balance', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('composite-short', short({
  marks: 2,
  stem: 'Why is the pancreas called a composite gland? Name the endocrine cells and their hormones.',
  model: 'It acts as **both an exocrine gland** (secreting pancreatic juice through a duct) **and an endocrine gland**. Its endocrine part is the **islets of Langerhans**: **α cells secrete glucagon** and **β cells secrete insulin**, which together regulate blood glucose.',
  sol: 'Exocrine and endocrine; α and β cells.',
  scheme: [['Both exocrine and endocrine', 1], ['α glucagon, β insulin', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('thyroid-short', short({
  marks: 3,
  stem: 'Describe the structure of the thyroid gland and list its hormones with their main functions.',
  model: 'The thyroid has **two lobes** on either side of the **trachea**, joined by a thin flap called the **isthmus**. It is made of **follicles** and stromal tissue; follicular cells make **thyroxine (T4)** and **triiodothyronine (T3)**. These regulate the **basal metabolic rate**, support **RBC formation**, control metabolism of carbohydrates, proteins and fats, and maintain **water and electrolyte balance**. The protein hormone **thyrocalcitonin** regulates **blood calcium**.',
  sol: 'Structure, hormones and functions.',
  scheme: [['Two lobes, isthmus, follicles', 1], ['T4, T3 and their functions', 1], ['Thyrocalcitonin regulates calcium', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('fight-short', short({
  marks: 3,
  stem: 'A cyclist swerves to avoid a speeding truck and feels her heart pounding. Name the hormones responsible, give four changes they cause, and say why they are called emergency hormones.',
  model: 'The **adrenal medulla** rapidly releases **adrenaline and noradrenaline** (catecholamines). They **increase heart rate and the strength of contraction**, raise the **rate of breathing**, cause **pupillary dilation**, **sweating** and **piloerection**, and stimulate **breakdown of glycogen**, raising blood glucose. Because they are secreted quickly in response to **stress or danger**, preparing the body for **fight or flight**, they are called emergency hormones.',
  sol: 'Catecholamines; effects; fight or flight.',
  scheme: [['Adrenaline and noradrenaline from the medulla', 1], ['Four changes', 1], ['Reason for the name', 1]],
  d: 2, c: 'application', t: [1],
}));
add('cortex-short', short({
  marks: 3,
  stem: 'Name the three layers of the adrenal cortex from the outside inwards, and state the main roles of glucocorticoids and mineralocorticoids.',
  model: 'From outside: **zona glomerulosa**, **zona fasciculata** and **zona reticularis**.\n\n**Glucocorticoids** such as **cortisol** regulate carbohydrate metabolism: they stimulate **gluconeogenesis, lipolysis and proteolysis**, are **anti-inflammatory**, suppress immunity and stimulate RBC production.\n\n**Mineralocorticoids** such as **aldosterone** make renal tubules **reabsorb sodium and water** and **excrete potassium**, maintaining **fluid volume and blood pressure**.',
  sol: 'Three zones; two hormone groups.',
  scheme: [['Three zones in order', 1], ['Glucocorticoids with roles', 1], ['Mineralocorticoids with roles', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('twodiabetes-short', short({
  marks: 3,
  stem: 'Diabetes mellitus and diabetes insipidus both cause frequent urination. Distinguish them by the hormone involved, the gland concerned and the key feature of the urine.',
  model: '**Diabetes mellitus:** too little **insulin** (from **β cells of the pancreas**) causes prolonged **hyperglycaemia**; **glucose** is lost in the urine and harmful **ketone bodies** form.\n\n**Diabetes insipidus:** too little **ADH (vasopressin)**, made by the **hypothalamus** and released by the **posterior pituitary**; the kidney cannot conserve water, so large volumes of **dilute urine without glucose** are passed and the body dehydrates.',
  sol: 'Hormone, gland and urine for each.',
  scheme: [['Mellitus: insulin, pancreas', 1], ['Insipidus: ADH, hypothalamus and posterior pituitary', 1], ['Urine: glucose versus dilute, no glucose', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('classes-short', short({
  marks: 3,
  stem: 'Sort these hormones into chemical classes and state the type of receptor each class uses: insulin, estradiol, thyroxine, epinephrine.',
  model: '**Insulin:** peptide (protein) hormone — **membrane-bound receptor**, acts through second messengers.\n\n**Epinephrine:** **amino-acid derivative** — **membrane-bound receptor**, second messengers such as cyclic AMP.\n\n**Estradiol:** **steroid** — **intracellular (nuclear) receptor**, regulates gene expression.\n\n**Thyroxine:** **iodothyronine** — **intracellular receptor**, regulates gene expression.',
  sol: 'Class and receptor for each.',
  scheme: [['Classes correct', 1.5], ['Receptor types correct', 1.5]],
  d: 3, c: 'analysis', t: [2],
}));
add('gut-short', short({
  marks: 3,
  stem: 'Name the four major peptide hormones of the gastrointestinal tract and state the action of each.',
  model: '**Gastrin** acts on **gastric glands**, stimulating secretion of **HCl and pepsinogen**.\n\n**Secretin** acts on the **exocrine pancreas**, stimulating secretion of **water and bicarbonate ions**.\n\n**Cholecystokinin (CCK)** acts on the **pancreas and gall bladder**, stimulating release of **pancreatic enzymes and bile**.\n\n**Gastric inhibitory peptide (GIP)** **inhibits gastric secretion and motility**.',
  sol: 'Four hormones and actions.',
  scheme: [['Gastrin and secretin', 1.5], ['CCK and GIP', 1.5]],
  d: 2, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- long answers
add('pituitary-long', long({
  stem: 'Describe the parts of the human pituitary gland and the hormones each part secretes or releases, with their actions. How does abnormal growth hormone secretion affect the body?',
  model: 'The pituitary lies in the **sella turcica** and is attached to the hypothalamus by a stalk. It has an **adenohypophysis** (pars distalis and pars intermedia) and a **neurohypophysis** (pars nervosa).\n\n**Pars distalis (anterior pituitary):** **GH** promotes growth; **prolactin** regulates growth of mammary glands and milk formation; **TSH** stimulates the thyroid; **ACTH** stimulates the adrenal cortex to secrete glucocorticoids; **LH and FSH** (gonadotrophins) stimulate the gonads — LH causes androgen secretion and ovulation and maintains the corpus luteum, while FSH and androgens regulate spermatogenesis and FSH stimulates follicle growth.\n\n**Pars intermedia:** **MSH** regulates skin pigmentation through melanocytes; in humans it is almost merged with the pars distalis.\n\n**Neurohypophysis:** stores and releases **oxytocin**, which contracts the uterus at childbirth and causes milk ejection, and **vasopressin (ADH)**, which makes distal tubules reabsorb water; both are made in the hypothalamus.\n\n**GH disorders:** excess in childhood causes **gigantism**, deficiency causes **pituitary dwarfism**, and excess in middle age causes **acromegaly**, with facial disfigurement.',
  sol: 'Parts, hormones, actions and GH disorders.',
  scheme: [['Location and parts', 1], ['Pars distalis hormones with actions', 2], ['MSH, oxytocin, vasopressin', 1], ['GH disorders', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('thyropara-long', long({
  stem: 'Describe the thyroid and parathyroid glands: their position, the hormones they secrete and their functions. Explain two disorders caused by abnormal thyroid activity.',
  model: '**Thyroid.** Two lobes lie on either side of the trachea, joined by an isthmus. The gland is made of follicles and stromal tissue. Follicular cells synthesise **thyroxine (tetraiodothyronine, T4)** and **triiodothyronine (T3)**, which need **iodine**. They regulate the **basal metabolic rate**, support red blood cell formation, control the metabolism of carbohydrates, proteins and fats, and maintain water and electrolyte balance. The thyroid also secretes **thyrocalcitonin**, which regulates blood calcium.\n\n**Parathyroid.** Four glands lie on the back of the thyroid, one pair in each lobe. They secrete **parathyroid hormone**, regulated by blood calcium. PTH is **hypercalcaemic**: it stimulates bone resorption, renal reabsorption of calcium and absorption of calcium from food; with TCT it maintains calcium balance.\n\n**Disorders.** **Iodine deficiency** causes **hypothyroidism and goitre**; in pregnancy hypothyroidism causes **cretinism** in the baby (stunted growth, mental retardation, deaf-mutism), and in adult women irregular menstrual cycles. **Hyperthyroidism**, from thyroid cancer or nodules, raises hormone levels; **exophthalmic goitre (Graves’ disease)** shows an enlarged thyroid, protruding eyeballs, raised BMR and weight loss.',
  sol: 'Structure, hormones, functions, disorders.',
  scheme: [['Thyroid structure and hormones', 1], ['Thyroid functions incl. TCT', 1], ['Parathyroid position and PTH action', 1.5], ['Two disorders', 1.5]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('adrpanc-long', long({
  stem: 'Describe the hormones of the adrenal gland and of the endocrine pancreas. Explain how the pancreatic hormones keep blood glucose within limits and what happens when this control fails.',
  model: '**Adrenal medulla:** **adrenaline and noradrenaline** (catecholamines) are emergency hormones. They raise alertness, heart rate, strength of contraction and breathing rate, dilate pupils, cause sweating and piloerection, and stimulate breakdown of glycogen, lipids and proteins.\n\n**Adrenal cortex** (zona glomerulosa, fasciculata, reticularis): **glucocorticoids** such as cortisol stimulate gluconeogenesis, lipolysis and proteolysis, are anti-inflammatory and suppress immunity; **mineralocorticoids** such as aldosterone conserve sodium and water and excrete potassium; small amounts of **androgens** affect hair growth at puberty. Underproduction causes **Addison’s disease**.\n\n**Endocrine pancreas:** about 1 to 2 million **islets of Langerhans**. **α cells** secrete **glucagon**, which acts on hepatocytes, stimulating glycogenolysis and gluconeogenesis, so blood glucose rises. **β cells** secrete **insulin**, which makes hepatocytes and adipocytes take up and use glucose and stimulates glycogenesis, so blood glucose falls. Their opposing actions maintain **glucose homeostasis**.\n\n**Failure:** prolonged hyperglycaemia causes **diabetes mellitus**, with loss of glucose in urine and harmful **ketone bodies**; it is treated with insulin therapy.',
  sol: 'Adrenal, pancreas, homeostasis and diabetes.',
  scheme: [['Adrenal medulla', 1], ['Adrenal cortex and Addison’s disease', 1.5], ['Glucagon and insulin actions', 1.5], ['Diabetes mellitus', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1, 2],
}));
add('mech-long', long({
  stem: 'Explain the mechanism of hormone action. Include hormone receptors, the chemical classes of hormones, and the two main pathways by which hormones change the activity of target cells.',
  model: '**Receptors.** A hormone acts only on target tissues that carry its **hormone receptors**. Receptors on the cell membrane are **membrane-bound**; those inside the cell are **intracellular**, mostly nuclear. Each receptor is **specific** to one hormone. Binding forms a **hormone–receptor complex**, which causes biochemical changes that regulate the metabolism and functions of the target tissue.\n\n**Chemical classes.** (i) Peptide, polypeptide and protein hormones such as insulin, glucagon and the pituitary and hypothalamic hormones; (ii) steroids such as cortisol, testosterone, estradiol and progesterone; (iii) iodothyronines (thyroid hormones); (iv) amino-acid derivatives such as epinephrine.\n\n**Pathway 1:** hormones that bind **membrane-bound receptors** (peptides, proteins, amino-acid derivatives) normally do not enter the cell. They generate **second messengers** such as **cyclic AMP, IP3 and calcium ions**, which regulate cell metabolism, often by activating enzymes.\n\n**Pathway 2:** hormones that bind **intracellular receptors** (steroids, iodothyronines) form a complex that interacts with the **genome**, regulating **gene expression** or chromosome function.\n\nThe cumulative biochemical actions produce physiological and developmental effects.',
  sol: 'Receptors, classes, two pathways.',
  scheme: [['Receptors and specificity', 1], ['Four chemical classes with examples', 1.5], ['Membrane receptor and second messengers', 1.5], ['Intracellular receptor and gene expression', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [2],
}));
add('claim-long', long({
  stem: 'A fitness website claims: “Hormones are basically enzymes, they act on every cell they reach, and taking more of a hormone always makes the body work better.” Evaluate each part of this claim, using examples of hormone action and of disorders caused by excess or deficiency.',
  model: '**“Hormones are enzymes.”** Incorrect. Hormones are **non-nutrient chemical messengers** produced in **trace amounts**; they belong to several chemical classes — peptides and proteins (insulin), steroids (cortisol), iodothyronines (thyroxine) and amino-acid derivatives (adrenaline). They do not catalyse reactions themselves; they change the activity of target cells, sometimes by activating enzymes through second messengers.\n\n**“They act on every cell.”** Incorrect. A hormone acts only where its **specific receptors** are present. TSH reaches every organ in the blood but acts only on the thyroid; glucagon acts mainly on hepatocytes.\n\n**“More is always better.”** Incorrect. The body needs the **right amount**, regulated by feedback. Excess growth hormone causes **gigantism** in children and **acromegaly** in adults; excess thyroid hormone causes **hyperthyroidism**, as in Graves’ disease with weight loss and raised BMR. Too little is also harmful: GH deficiency causes **dwarfism**, insulin deficiency causes **diabetes mellitus**, and adrenal cortex failure causes **Addison’s disease**.\n\n**Judgement.** All three parts are wrong. Hormones are specific, finely balanced messengers, and both excess and deficiency cause disease, so hormones should be taken only under medical advice.',
  sol: 'Each part evaluated with examples; judgement.',
  scheme: [['Hormones are not enzymes; classes', 1], ['Specific receptors with example', 1], ['Excess disorders', 1], ['Deficiency disorders', 1], ['Reasoned judgement', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [1, 2],
}));

// ---------------------------------------------------------------- cases
add('gtt-case', mk.case({
  passage: `Two adults, P and Q, each drank a glucose solution after an overnight fast. Their blood glucose (mg per dL) was measured.\n\n| Person | Fasting | Peak | After 3 hours |\n|---|---|---|---|\n| P | ${NORMAL.base} | ${PEAK.normal} | about ${AFTER3.normal} |\n| Q | ${DIABETIC.base} | ${PEAK.diabetic} | about ${AFTER3.diabetic} |\n\nGlucose was found in Q’s urine but not in P’s. The kidney threshold for glucose is typically about ${RENAL_THRESHOLD} mg per dL. (Illustrative values.)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Q’s results are best explained by a deficiency of which hormone?',
      right: 'Insulin',
      wrong: ['Glucagon', 'Adrenaline', 'Cortisol'],
      sol: 'Without enough insulin, glucose is not taken up by liver and fat cells, so blood glucose stays high — option (@K).',
      d: 1, c: 'application', t: [2],
    })),
    part('b', num({
      stem: 'By what percentage did Q’s blood glucose rise from the fasting value to the peak? (One decimal place.)',
      value: RISE_PCT.diabetic, tol: 0.1, unit: '%',
      sol: r`$\dfrac{${PEAK.diabetic} - ${DIABETIC.base}}{${DIABETIC.base}} \times 100 = \dfrac{${PEAK.diabetic - DIABETIC.base}}{${DIABETIC.base}} \times 100 \approx ${RISE_PCT.diabetic}$ percent.`,
      scheme: [[`${RISE_PCT.diabetic}%`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why glucose appeared in Q’s urine but not in P’s.',
      model: `Q’s blood glucose stayed **above the kidney threshold** (about ${RENAL_THRESHOLD}) for hours, so more glucose was filtered than the tubules could **reabsorb**, and the excess passed into the urine. P’s glucose never crossed the threshold, so all filtered glucose was reabsorbed.`,
      sol: 'Above the threshold, reabsorption is exceeded.',
      scheme: [['Q above the threshold; reabsorption exceeded', 1], ['P below it; all reabsorbed', 1]],
      d: 2, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Explain how insulin brought P’s blood glucose back to the fasting level after the drink.',
        model: 'β cells released **insulin**, which acts mainly on **hepatocytes and adipocytes**, enhancing **cellular glucose uptake and utilisation**. It also stimulates **glycogenesis**, converting glucose into glycogen for storage, so the blood glucose level fell back towards normal.',
        sol: 'Uptake and glycogenesis.',
        scheme: [['Uptake by liver and fat cells', 1], ['Glycogenesis', 1]],
        d: 2, c: 'understanding', t: [1],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === 73.3 || 'value');
{
  const adults = 400, cases = 96, p = pct(cases, adults, 0);
  add('goitre-case', mk.case({
    passage: `A health team surveyed ${adults} adults in a remote hill village where food is grown in iodine-poor soil. ${cases} of them had a visible swelling at the front of the neck. Several mothers in the village had children with stunted growth and hearing problems. The team began distributing iodised salt.`,
    d: 2, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The neck swelling seen in the survey is caused by',
        right: 'enlargement of the thyroid due to poor thyroid hormone synthesis without iodine',
        wrong: ['enlargement of the thymus due to infection', 'swelling of the parathyroids due to excess calcium', 'swelling of the pituitary due to excess growth hormone'],
        sol: 'Iodine deficiency reduces thyroid hormone synthesis (hypothyroidism) and the thyroid enlarges as goitre — option (@K).',
        d: 1, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'What percentage of the adults surveyed had the swelling?',
        value: p, unit: '%',
        sol: r`$\dfrac{${cases}}{${adults}} \times 100 = ${p}$ percent.`,
        scheme: [[`${p}%`, 1]],
        d: 1, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why some children of the village have stunted growth and hearing problems.',
        model: 'Their mothers were probably **hypothyroid during pregnancy**. Too little thyroid hormone causes **defective development and maturation** of the growing baby, leading to **cretinism**: stunted growth, mental retardation, low IQ, abnormal skin and **deaf-mutism**.',
        sol: 'Maternal hypothyroidism; cretinism.',
        scheme: [['Maternal hypothyroidism in pregnancy', 1], ['Cretinism with features', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'How will distributing iodised salt help the village over the next few years?',
          model: 'Iodised salt supplies the **iodine** needed for the **normal rate of synthesis** of thyroxine and triiodothyronine. Hormone levels return to normal, so **new goitres are prevented**, and babies of mothers with enough iodine are protected from **cretinism**.',
          sol: 'Iodine restores hormone synthesis.',
          scheme: [['Iodine needed for hormone synthesis', 1], ['Prevents goitre and cretinism', 1]],
          d: 2, c: 'application', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 24 || 'value');
}
add('speech-case', mk.case({
  passage: 'Riya waits backstage before speaking to an audience of a thousand people. Her heart pounds, her palms sweat, her pupils widen and the hairs on her arms stand up. A blood test taken then shows a higher glucose level than her usual resting value.',
  d: 2, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which part of which gland is mainly responsible for these rapid changes?',
      right: 'The medulla of the adrenal gland',
      wrong: ['The cortex of the adrenal gland', 'The posterior lobe of the pituitary', 'The isthmus of the thyroid'],
      sol: 'The adrenal medulla rapidly secretes adrenaline and noradrenaline in response to stress — option (@K).',
      d: 1, c: 'application', t: [1],
    })),
    part('b', mcq({
      stem: 'The raising of hairs on Riya’s arms is called',
      right: 'piloerection',
      wrong: ['vasodilation', 'gluconeogenesis', 'erythropoiesis'],
      sol: 'Raising of hairs is piloerection, one effect of catecholamines — option (@K).',
      d: 1, c: 'recall', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why Riya’s blood glucose was higher than usual, and give one other fuel-related effect of these hormones.',
      model: 'Adrenaline and noradrenaline stimulate the **breakdown of glycogen** (glycogenolysis), releasing glucose and raising its **concentration in the blood**. They also stimulate the **breakdown of lipids and proteins**, making more fuel available for a fight-or-flight response.',
      sol: 'Glycogenolysis; lipid and protein breakdown.',
      scheme: [['Glycogen breakdown raises glucose', 1], ['Lipid or protein breakdown', 1]],
      d: 2, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Contrast the hormones of the adrenal medulla with those of the adrenal cortex in chemical nature and main role.',
        model: 'The **medulla** secretes **catecholamines** (adrenaline, noradrenaline), amino-acid derivatives that act quickly in **emergencies**. The **cortex** secretes **steroid corticoids**: glucocorticoids regulate **carbohydrate metabolism** and inflammation, and mineralocorticoids regulate **water and electrolyte balance**.',
        sol: 'Catecholamines versus corticoids.',
        scheme: [['Medulla: catecholamines, emergency', 1], ['Cortex: steroid corticoids, roles', 1]],
        d: 2, c: 'understanding', t: [1],
      }),
    ]),
  ],
}));
add('lab-case', mk.case({
  passage: `In a laboratory study on cultured cells, hormone X stayed on the outer surface of the cells, and within seconds the amount of cyclic AMP inside them rose sharply. Hormone Y was later found inside the nuclei, and new proteins appeared in the cells only after several hours. In a model of X’s action, each receptor triggers ${AMP.cAMPper} cyclic AMP molecules and each of these leads to ${AMP.productPer} product molecules.`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which pair could hormones X and Y be?',
      right: 'X: adrenaline; Y: estradiol',
      wrong: ['X: cortisol; Y: insulin', 'X: thyroxine; Y: glucagon', 'X: progesterone; Y: testosterone'],
      sol: 'Adrenaline (amino-acid derivative) acts through membrane receptors and cyclic AMP; estradiol (steroid) binds intracellular receptors — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', num({
      stem: 'Using the model, how many product molecules result from one molecule of X binding one receptor?',
      value: AMP.total,
      sol: r`$1 \times ${AMP.cAMPper} \times ${AMP.productPer} = ${AMP.total}$ molecules.`,
      scheme: [[`${AMP.total}`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why hormone Y takes hours to act while hormone X acts within seconds.',
      model: 'Y binds an **intracellular receptor**; the complex acts on the **genome**, so genes must be **expressed** and new **proteins made**, which takes hours. X binds a **membrane-bound receptor** and a **second messenger** at once activates proteins already present in the cell.',
      sol: 'Gene expression versus second messenger.',
      scheme: [['Y: gene expression and protein synthesis', 1], ['X: second messenger acts on existing proteins', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'What is meant by saying that hormone receptors are specific, and what forms when X binds its receptor?',
        model: 'Each receptor is **specific to one hormone only**, so a hormone acts only on target cells carrying its own receptor. When X binds, a **hormone–receptor complex** forms, which brings about **biochemical changes** in the target cell through second messengers.',
        sol: 'Specificity; hormone–receptor complex.',
        scheme: [['One receptor, one hormone', 1], ['Hormone–receptor complex', 1]],
        d: 2, c: 'understanding', t: [2],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === 5000 || 'value');
