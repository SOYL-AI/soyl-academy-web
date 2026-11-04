// ISC 11 Biology ch21 Chemical Coordination and Integration: question bank in ISC school-examination style.
// Feedback-model values, glucose-tolerance values, calcium and urine arithmetic come from calc.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { ENDOCRINE_Q } from './svgs.mjs';
import { LOOP, LOW, tsh, TSH_AT_50, NORMAL_RANGE, GTT_LIMITS, GN, GD, GTT_R, GTT_S, riseOf, fallPct, verdict, CA_RANGE, CA2, ca2Below, URINE, URINE_Q, URINE_Q_FOLD, URINE_FOLD, PARATHYROIDS, ADRENAL_CORTEX_LAYERS, round } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const glandFig = svgV(ENDOCRINE_Q, 'A human body with five endocrine glands marked A to E');

// ---------------------------------------------------------------- t01 hypothalamus, pituitary, feedback
add('gland-mcq', mcq({
  stem: 'During an operation at the base of a patient’s brain, a surgeon removes a pea-sized gland that hangs by a stalk below the hypothalamus. The gland removed is the',
  right: 'pituitary gland',
  wrong: ['pineal gland', 'thyroid gland', 'thymus'],
  sol: 'The pituitary is suspended from the hypothalamus by a stalk — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('anterior-mcq', mcq({
  stem: 'Which of these pituitary hormones acts chiefly by stimulating the secretion of another endocrine gland?',
  right: 'ACTH',
  wrong: ['Prolactin', 'Oxytocin', 'ADH'],
  sol: 'ACTH is a tropic hormone: it stimulates the adrenal cortex — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('portal-mcq', mcq({
  stem: 'In an experiment on a rat, the hypophysial portal vessels are cut, but the nerve fibres in the pituitary stalk are left intact. Which secretion will be least affected?',
  right: 'Vasopressin (ADH) released from the posterior pituitary',
  wrong: ['Growth hormone from the anterior pituitary', 'Thyroid-stimulating hormone', 'Luteinising hormone'],
  sol: 'Anterior pituitary hormones depend on the releasing hormones carried by the portal vessels; the posterior pituitary is reached by nerve fibres — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('oxytocin-mcq', mcq({
  stem: 'A doctor injects a woman in labour with a hormone that strengthens the contractions of the uterus. The injected hormone is chemically like the one released from the',
  right: 'posterior pituitary',
  wrong: ['anterior pituitary', 'adrenal medulla', 'pineal gland'],
  sol: 'Oxytocin is released from the posterior pituitary — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('adh-mcq', mcq({
  stem: 'After a long walk in the sun, a hiker has lost much water by sweating. Which hormone helps to conserve water by making the kidney tubules reabsorb more of it?',
  right: 'Vasopressin (ADH)',
  wrong: ['Oxytocin', 'Prolactin', 'Calcitonin'],
  sol: 'ADH increases water reabsorption in the kidney tubules — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('prolactin-mcq', mcq({
  stem: 'A mother’s mammary glands grow and begin to make milk after delivery. Which pituitary hormone is mainly responsible for the formation of milk?',
  right: 'Prolactin',
  wrong: ['Oxytocin', 'Vasopressin', 'Growth hormone'],
  sol: 'Prolactin stimulates milk formation, while oxytocin ejects it — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('feedback-mcq', mcq({
  stem: 'A woman has taken large doses of thyroxine tablets for several months. Tests show a very low TSH level and a small, inactive thyroid. The best explanation is that',
  right: 'high thyroxine in the blood inhibits the pituitary, so TSH is not released and the gland is not stimulated',
  wrong: ['high thyroxine stimulates the hypothalamus to release more TRH', 'the tablets destroy the pituitary', 'TSH acts directly to shrink the thyroid'],
  sol: 'Negative feedback: a high thyroxine level suppresses TSH, so the thyroid is not stimulated — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('glandq-mcq', mcq({
  stem: 'In the figure of the human body, which lettered gland makes thyroxine?',
  right: 'Gland B',
  wrong: ['Gland A', 'Gland C', 'Gland E'],
  sol: 'The butterfly-shaped gland on the windpipe in the neck is the thyroid — option (@K).',
  assets: [glandFig],
  d: 1, c: 'application', t: [1],
}));
add('tsh-fill', fill({
  stem: 'The anterior pituitary hormone that stimulates the thyroid gland to release thyroxine is abbreviated ______.',
  acc: [['TSH']],
  sol: 'TSH.',
  d: 1, c: 'recall', t: [1],
}));
add('oxy-tf', tf({
  stem: 'Oxytocin is made in the posterior lobe of the pituitary gland.',
  key: 'f',
  sol: 'False. Oxytocin is made in the hypothalamus and is stored and released from the posterior pituitary.',
  d: 2, c: 'understanding', t: [1],
}));
add('tsh-num', num({
  stem: `In a simple model of the feedback loop, the level of TSH equals ${LOOP.set} plus the shortfall of thyroxine below ${LOOP.set} (both in percent of normal). What is the TSH level when thyroxine is at 50 percent of normal?`,
  value: TSH_AT_50, unit: 'percent of normal',
  sol: r`$${LOOP.set} + (${LOOP.set} - 50) = ${TSH_AT_50}$.`,
  scheme: [[`${TSH_AT_50}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 150 || 'value');
add('feedback-ar', ar({
  a: 'When the level of thyroxine falls, the secretion of TSH rises.',
  r: 'Thyroxine stimulates the anterior pituitary to release TSH.',
  key: 'c',
  sol: 'A is true. R is false: thyroxine inhibits TSH secretion (negative feedback), so a fall in thyroxine removes the inhibition — option (c).',
  d: 3, c: 'understanding', t: [1],
}));
add('glandq-short', short({
  marks: 2,
  stem: 'In the figure of the human body, name the glands C and D and state one hormone released by each.',
  model: 'Gland **C** is the **thymus**, which releases **thymosin** (needed for the differentiation of T lymphocytes). Gland **D** is the **adrenal gland** (one of the pair above the kidneys), which releases hormones such as **adrenaline** from its medulla and **cortisol** from its cortex.',
  sol: 'C thymus, thymosin; D adrenal, adrenaline or cortisol.',
  scheme: [['C named with thymosin', 1], ['D named with a hormone', 1]],
  assets: [glandFig],
  d: 2, c: 'application', t: [1],
}));
add('pit-short2', short({
  marks: 2,
  stem: 'Name two tropic hormones of the anterior pituitary and state the gland each acts upon.',
  model: '**TSH** (thyroid-stimulating hormone) acts on the **thyroid gland** and makes it release thyroxine; **ACTH** (adrenocorticotropic hormone) acts on the **adrenal cortex** and makes it release glucocorticoids. (LH and FSH likewise act on the gonads.)',
  sol: 'TSH and ACTH with target glands.',
  scheme: [['TSH acting on the thyroid', 1], ['ACTH acting on the adrenal cortex', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('posterior-short2', short({
  marks: 2,
  stem: 'Where are oxytocin and vasopressin made, and where are they stored and released? State one action of each.',
  model: 'Both are made by neurosecretory cells of the **hypothalamus** and pass down nerve fibres to be **stored and released from the posterior pituitary**. **Oxytocin** causes **contraction of the uterus** (and milk ejection); **vasopressin (ADH)** increases **reabsorption of water** in the kidney tubules.',
  sol: 'Made in hypothalamus; released from posterior pituitary; actions.',
  scheme: [['Made in the hypothalamus, released from the posterior pituitary', 1], ['One action of each', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('feedback-short3', short({
  marks: 3,
  stem: 'With the help of a flow diagram in words, explain how the secretion of thyroxine is controlled by negative feedback.',
  model: 'The **hypothalamus** releases **TRH**, which makes the **anterior pituitary** release **TSH**; TSH stimulates the **thyroid** to release **thyroxine**. A **rise in thyroxine** in the blood **inhibits the hypothalamus and the pituitary**, so TRH and TSH fall and thyroid secretion is reduced. When thyroxine falls, the inhibition is lifted and secretion rises, so the level stays near a set point.',
  sol: 'TRH, TSH, thyroxine; inhibition.',
  scheme: [['TRH to TSH to thyroxine', 1], ['Thyroxine inhibits hypothalamus and pituitary', 1], ['Level kept near set point', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('pituitary-short3', short({
  marks: 3,
  stem: 'A tumour destroys the whole anterior lobe of a young woman’s pituitary gland. Name three bodily functions that would be affected and the hormone concerned in each.',
  model: '**Growth** would be affected, because **growth hormone** is lacking; the **thyroid** would be underactive, because **TSH** is lacking, and so would the **adrenal cortex**, because **ACTH** is lacking. Menstrual cycles and fertility would also fail, because **LH and FSH** are lacking, and she would not make milk, because of the lack of **prolactin**.',
  sol: 'Three functions with hormones.',
  scheme: [['Growth with growth hormone', 1], ['Thyroid with TSH', 1], ['Adrenal cortex or gonads with ACTH, LH, FSH', 1]],
  d: 3, c: 'application', t: [1],
}));
add('pituitary-long', long({
  stem: '(a) Draw a labelled diagram to show how the hypothalamus is connected to the anterior and posterior lobes of the pituitary. [2]\n(b) Name the hormones of the anterior pituitary. [2]\n(c) Name the two hormones released from the posterior pituitary. [1]',
  model: '(a) **Diagram:** the **hypothalamus** above, with its **releasing and inhibiting hormones** passing through the **portal vessels** to the **anterior lobe**, and **nerve fibres** running down the **stalk** to the **posterior lobe**; the two lobes are labelled.\n\n(b) The anterior pituitary makes **growth hormone, prolactin, thyroid-stimulating hormone (TSH), adrenocorticotropic hormone (ACTH), luteinising hormone (LH) and follicle-stimulating hormone (FSH)**.\n\n(c) The posterior pituitary stores and releases **oxytocin** and **vasopressin (ADH)**, which are made in the hypothalamus.',
  sol: 'Diagram of hypothalamus and pituitary; six hormones; two hormones.',
  scheme: [['(a) Labelled diagram with portal vessels and nerve fibres', 2], ['(b) Three hormones', 1], ['(b) Three more', 1], ['(c) Oxytocin and ADH', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [1],
}));
add('thyroid-case', mk.case({
  passage: 'Blood tests on three patients with symptoms of thyroid disease gave the results below. (Low and high are relative to the normal range.)\n\n| Patient | Thyroxine | TSH |\n|---|---|---|\n| A | Low | High |\n| B | High | Low |\n| C | Low | Low |',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The pattern of patient A shows that the fault lies in',
      right: 'the thyroid gland itself, which cannot respond to the high TSH',
      wrong: ['the pituitary, which is not making TSH', 'the hypothalamus, which makes too much TRH only', 'the adrenal cortex'],
      sol: 'Low thyroxine with high TSH means the pituitary is responding normally to the lack of thyroxine, so the thyroid is failing — option (@K).',
      d: 3, c: 'analysis', t: [1],
    })),
    part('b', mcq({
      stem: 'Patient C’s results suggest that',
      right: 'the pituitary or hypothalamus is failing to stimulate the thyroid',
      wrong: ['the thyroid is overactive', 'the thyroid gland is failing but the pituitary is normal', 'the feedback loop is working normally'],
      sol: 'With a low thyroxine level the TSH should be high; it is low, so the stimulation from above has failed — option (@K).',
      d: 3, c: 'analysis', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain, using negative feedback, why patient B has a low TSH level.',
      model: 'Patient B has a **high thyroxine** level. High thyroxine **inhibits the hypothalamus and the pituitary**, so **TRH and TSH are reduced**, and the low TSH is the normal response of the feedback loop.',
      sol: 'High thyroxine inhibits TSH.',
      scheme: [['High thyroxine inhibits hypothalamus and pituitary', 1], ['So TSH falls', 1]],
      d: 3, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Explain why patient A is likely to develop an enlarged thyroid gland.',
        model: 'The **high TSH** continues to **stimulate the thyroid** to grow and to try to make more hormone, but because the gland cannot make enough thyroxine, the **feedback does not switch the TSH off**; the gland therefore **enlarges (goitre)**.',
        sol: 'TSH keeps stimulating.',
        scheme: [['High TSH stimulates the gland', 1], ['No effective feedback, so gland enlarges', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}), (q) => q.children[0].answer.option_ids?.length === 1 || 'part a');

add('tsh-tumour-short3', short({
  marks: 3,
  stem: 'Blood tests show that patient X has a high thyroxine level and a high TSH level, while patient Y has a high thyroxine level and a low TSH level. Which gland is most likely at fault in each patient? Use the idea of negative feedback to explain the difference.',
  model: 'In **patient Y** the **thyroid** itself is overactive: the high thyroxine **inhibits the pituitary**, so TSH is **low**, as feedback would predict. In **patient X** the TSH is high **in spite of** the high thyroxine, so the **feedback has failed** and the fault lies **above the thyroid**, probably a **pituitary tumour** that makes TSH without responding to thyroxine, which then drives the thyroid to make too much.',
  sol: 'Y thyroid; X pituitary, feedback fails.',
  scheme: [['Patient Y: thyroid overactive, TSH suppressed by feedback', 1], ['Patient X: TSH high despite high thyroxine, so feedback has failed', 1], ['Fault in the pituitary for X', 1]],
  d: 4, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 thyroid, parathyroid, pineal, thymus
add('calcium-mcq', mcq({
  stem: 'In an animal experiment the glands lying on the back of the thyroid are removed. Which change in the blood is expected?',
  right: 'A fall in the level of calcium',
  wrong: ['A rise in the level of calcium', 'A rise in the level of glucose', 'A fall in the level of sodium'],
  sol: 'Without parathormone the blood calcium level falls — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('thyroxine-mcq', mcq({
  stem: 'A girl is slow, gains weight, feels cold in a warm room and has a slow heartbeat; her blood test shows very low thyroxine. Which function of thyroxine is reduced in her?',
  right: 'Raising the basal metabolic rate',
  wrong: ['Lowering the blood calcium level', 'Raising the blood glucose level', 'Making milk'],
  sol: 'Thyroxine raises the basal metabolic rate; lack of it gives the symptoms of a low metabolic rate — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('melatonin-mcq', mcq({
  stem: 'A traveller who has flown across several time zones takes a tablet to help her sleep at the new local night-time. The tablet contains a hormone normally secreted by the',
  right: 'pineal gland',
  wrong: ['thymus', 'thyroid gland', 'adrenal cortex'],
  sol: 'Melatonin from the pineal gland regulates the sleep-wake rhythm — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('thymus-mcq', mcq({
  stem: 'A child is born without a thymus and has very few mature T lymphocytes. The hormone whose action is missing is',
  right: 'thymosin',
  wrong: ['melatonin', 'calcitonin', 'thyroxine'],
  sol: 'Thymosin promotes the differentiation of T lymphocytes — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('iodine-mcq', mcq({
  stem: 'Health workers recommend iodised salt in the diet because iodine is needed by the thyroid to make',
  right: 'thyroxine',
  wrong: ['calcitonin', 'parathormone', 'thymosin'],
  sol: 'Thyroxine contains iodine — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('calcitonin-mcq', mcq({
  stem: 'Which thyroid hormone is secreted when the level of calcium in the blood becomes too high, and promotes the deposition of calcium in the bones?',
  right: 'Calcitonin',
  wrong: ['Thyroxine', 'Triiodothyronine', 'Parathormone'],
  sol: 'Calcitonin lowers blood calcium — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ca2-num', num({
  stem: `A patient’s blood calcium is ${CA2} mg per dL. If the lower limit of the normal range is taken as ${CA_RANGE[0]} mg per dL, by how many mg per dL is it below the limit?`,
  value: ca2Below, tol: 0.05, unit: 'mg per dL',
  sol: r`$${CA_RANGE[0]} - ${CA2} = ${ca2Below}$ mg per dL.`,
  scheme: [[`${ca2Below}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 0.9 || 'value');
add('calcium-ar', ar({
  a: 'The level of calcium in the blood is controlled by two hormones.',
  r: `There are ${PARATHYROIDS} parathyroid glands, on the back of the thyroid.`,
  key: 'b',
  sol: 'Both are true, but the number of parathyroid glands does not explain the control by parathormone and calcitonin — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('calcium-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: Calcitonin : lowers blood calcium :: parathormone : ______.',
  model: '**Raises blood calcium.**',
  sol: 'Raises blood calcium.',
  scheme: [['Raises blood calcium', 1]],
  wl: null,
  d: 1, c: 'understanding', t: [2],
}));
add('iodine-reason', short({
  marks: 1,
  stem: 'Give a reason: A diet that lacks iodine for a long time can make the neck swell.',
  model: 'Without **iodine** the thyroid cannot make enough **thyroxine**, so the pituitary keeps releasing **TSH**, which makes the thyroid enlarge (**goitre**).',
  sol: 'No iodine; high TSH.',
  scheme: [['Low thyroxine and high TSH enlarge the gland', 1]],
  wl: null,
  d: 2, c: 'application', t: [2],
}));
add('thyroid-short2', short({
  marks: 2,
  stem: 'Name two hormones of the thyroid gland that contain iodine and state two functions of them.',
  model: '**Thyroxine** and **triiodothyronine** contain iodine. They **raise the basal metabolic rate** and are needed for **normal growth and the development of the brain**; they also help the formation of red blood cells.',
  sol: 'Two hormones, two functions.',
  scheme: [['Thyroxine and triiodothyronine', 1], ['Two functions', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('cal-short2', short({
  marks: 2,
  stem: 'Explain how parathormone and calcitonin together keep the calcium level of the blood steady.',
  model: '**Parathormone** from the parathyroids **raises** blood calcium by increasing **bone breakdown**, **reabsorption** by the kidney tubules and **absorption** in the gut. **Calcitonin** from the thyroid **lowers** it by promoting **deposition of calcium in the bones**. Their opposite actions keep the level within limits.',
  sol: 'Opposite actions.',
  scheme: [['Parathormone raises calcium', 1], ['Calcitonin lowers calcium', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('pineal-short3', short({
  marks: 3,
  stem: 'Name the hormone of the pineal gland and the hormone of the thymus, and state two functions of each.',
  model: 'The **pineal gland** secretes **melatonin**, which regulates the **sleep-wake rhythm** and **body temperature** (and affects skin pigmentation and the menstrual cycle). The **thymus** secretes **thymosin**, which promotes the **differentiation of T lymphocytes** and so the **cell-mediated immune response**; the thymus shrinks with age, so immunity weakens in old age.',
  sol: 'Melatonin and thymosin with functions.',
  scheme: [['Melatonin named, a function', 1], ['Thymosin named', 1], ['Functions of thymosin', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('thyroid-short3', short({
  marks: 3,
  stem: 'Compare the actions of thyroxine, calcitonin and parathormone.',
  model: '**Thyroxine** (from the thyroid) **raises the basal metabolic rate** and supports normal growth and the development of the brain. **Calcitonin** (also from the thyroid) **lowers blood calcium** by promoting its deposition in the bones. **Parathormone** (from the parathyroid glands) **raises blood calcium** by increasing the breakdown of bone, the reabsorption of calcium by the kidney tubules and its absorption from the gut, so it opposes calcitonin.',
  sol: 'Three hormones with actions.',
  scheme: [['Thyroxine', 1], ['Calcitonin', 1], ['Parathormone', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('caexp-short3', short({
  marks: 3,
  stem: 'Young rats whose parathyroid glands have been removed develop tremors and spasms of their muscles within days. Explain the cause, and say what injection would relieve the signs.',
  model: 'Without the **parathyroid glands** there is no **parathormone**, so the **calcium level in the blood falls**. Low calcium makes nerves and muscles **over-excitable**, giving tremors and spasms (tetany). The signs would be relieved by an injection of **parathormone** (or of **calcium**), which restores the calcium level.',
  sol: 'No parathormone; low calcium; treatment.',
  scheme: [['No parathormone, so calcium falls', 1], ['Low calcium makes muscles over-excitable', 1], ['Parathormone or calcium relieves it', 1]],
  d: 3, c: 'application', t: [2],
}));
add('calcium-long', long({
  stem: '(a) Name the two hormones of the thyroid gland that control metabolism and state one function of them. [2]\n(b) Explain how parathormone and calcitonin regulate the level of calcium in the blood. [2]\n(c) State the effect on the thyroid gland of a prolonged lack of iodine in the diet. [1]',
  model: '(a) **Thyroxine** and **triiodothyronine**; they **raise the basal metabolic rate** and are needed for **growth and brain development**.\n\n(b) **Parathormone** raises blood calcium through **bone breakdown**, **kidney reabsorption** and **gut absorption**; **calcitonin** lowers it by promoting **deposition in bones**; the two act oppositely and keep the level within limits.\n\n(c) The thyroid makes too little thyroxine, TSH stays high, and the gland **enlarges (goitre)**.',
  sol: 'Thyroid hormones; calcium control; goitre.',
  scheme: [['(a) Two hormones', 1], ['(a) A function', 1], ['(b) Parathormone', 1], ['(b) Calcitonin and balance', 1], ['(c) Goitre', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 adrenal, pancreas, gonads, gut
add('cortisol-mcq', mcq({
  stem: 'During a long examination period a student under stress shows a raised blood glucose level and a weaker resistance to infection. Which hormone of the adrenal cortex is chiefly responsible?',
  right: 'Cortisol',
  wrong: ['Aldosterone', 'Adrenaline', 'Insulin'],
  sol: 'Cortisol (a glucocorticoid) raises blood glucose and suppresses the immune response — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('adrenaline-mcq', mcq({
  stem: 'A deer sprinting away from a tiger shows a faster, stronger heartbeat, widened pupils and a rise in blood glucose. These changes are caused mainly by hormones from the',
  right: 'adrenal medulla',
  wrong: ['adrenal cortex', 'thyroid gland', 'pituitary gland'],
  sol: 'Adrenaline and noradrenaline from the adrenal medulla prepare the body for fight or flight — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('aldosterone-mcq', mcq({
  stem: 'A patient loses sodium in his urine, has low blood pressure and shows failure of the outermost layer of the adrenal cortex. The hormone that is lacking is',
  right: 'aldosterone',
  wrong: ['cortisol', 'adrenaline', 'glucagon'],
  sol: 'Aldosterone, a mineralocorticoid, makes the kidney tubules reabsorb sodium — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('insulin-mcq', mcq({
  stem: 'Within an hour of a large meal of rice, the blood glucose of a healthy man rises and then returns to normal. The rapid release of which hormone brings it down?',
  right: 'Insulin',
  wrong: ['Glucagon', 'Cortisol', 'Somatostatin'],
  sol: 'Insulin from the beta cells lowers blood glucose — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('glucagon-mcq', mcq({
  stem: 'During a long walk without food, the liver of a trekker keeps releasing glucose into the blood. Which hormone mainly stimulates this?',
  right: 'Glucagon',
  wrong: ['Insulin', 'Oestrogen', 'Thymosin'],
  sol: 'Glucagon makes the liver break down glycogen and form glucose — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cortisone-mcq', mcq({
  stem: 'A patient who has taken cortisone tablets for a year has a small, inactive adrenal cortex. Which pituitary hormone is most likely to be at a low level, and why?',
  right: 'ACTH, because the high level of corticoid in the blood inhibits its release',
  wrong: ['TSH, because cortisone destroys the thyroid', 'ADH, because cortisone is made in the hypothalamus', 'Prolactin, because cortisone raises blood calcium'],
  sol: 'Negative feedback: a high corticoid level suppresses ACTH, so the cortex is not stimulated and shrinks — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('castration-mcq', mcq({
  stem: 'A farmer has a young bull castrated so that it will be docile and will not develop the typical male characters. Which hormone is it then unable to make in the testes?',
  right: 'Testosterone',
  wrong: ['Oestrogen', 'Progesterone', 'Thyroxine'],
  sol: 'The Leydig cells of the testes make testosterone — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('delta-mcq', mcq({
  stem: 'Which cells of the islets of Langerhans make somatostatin?',
  right: 'Delta cells',
  wrong: ['Alpha cells', 'Beta cells', 'Acinar cells'],
  sol: 'Delta cells make somatostatin — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('gut-mcq', mcq({
  stem: 'When fatty food enters the duodenum, the gall bladder contracts and the pancreas releases enzymes. Which hormone brings about this?',
  right: 'CCK-PZ',
  wrong: ['Gastrin', 'Insulin', 'Aldosterone'],
  sol: 'Cholecystokinin-pancreozymin acts on the gall bladder and the pancreas — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('gastrin-mcq', mcq({
  stem: 'The presence of food in the stomach stimulates the stomach wall to release a hormone that makes the gastric glands secrete hydrochloric acid and pepsinogen. The hormone is',
  right: 'gastrin',
  wrong: ['secretin', 'GIP', 'glucagon'],
  sol: 'Gastrin stimulates gastric glands — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('testis-fill', fill({
  stem: 'The cells of the testis that secrete androgens such as testosterone are the ______ cells.',
  acc: [['Leydig', 'interstitial']],
  sol: 'Leydig cells.',
  d: 1, c: 'recall', t: [3],
}));
add('insulin-ar', ar({
  a: 'Insulin is called a hypoglycaemic hormone.',
  r: 'Insulin increases the uptake of glucose by cells and the conversion of glucose to glycogen.',
  key: 'a',
  sol: 'Both are true, and R explains how insulin lowers the blood glucose — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('glucagon-ar', ar({
  a: 'Glucagon lowers the level of glucose in the blood.',
  r: 'Glucagon is secreted by the beta cells of the islets of Langerhans.',
  key: 'd',
  sol: 'Both are false: glucagon raises blood glucose and is secreted by the alpha cells — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
{
  add('gtt-num', num({
    stem: `In a glucose tolerance test a subject’s blood glucose was ${GTT_R.join(', ')} mg per dL at 0, 0.5, 1, 1.5 and 2 hours. By how many mg per dL did it rise above the fasting value at its highest?`,
    value: riseOf(GTT_R), unit: 'mg per dL',
    sol: r`$${Math.max(...GTT_R)} - ${GTT_R[0]} = ${riseOf(GTT_R)}$ mg per dL.`,
    scheme: [[`${riseOf(GTT_R)}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 75 || 'value');
  add('gtt2-num', num({
    stem: `For the same subject (${GTT_R.join(', ')} mg per dL), by what percentage of the highest value had the blood glucose fallen by 2 hours? (One decimal place.)`,
    value: fallPct(GTT_R), tol: 0.1, unit: '%',
    sol: r`$\dfrac{${Math.max(...GTT_R)} - ${GTT_R[4]}}{${Math.max(...GTT_R)}} \times 100 = ${fallPct(GTT_R)}$ percent.`,
    scheme: [[`${fallPct(GTT_R)}`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 40.6 || 'value');
}
add('medulla-short2', short({
  marks: 2,
  stem: 'Name the hormones of the adrenal medulla and state four effects they have in an emergency.',
  model: 'The adrenal medulla secretes **adrenaline and noradrenaline**. In an emergency they make the **heart beat faster and harder**, **widen the pupils**, increase **alertness and sweating**, and **raise the blood glucose** by breaking down glycogen (and fats and proteins), preparing the body for **fight or flight**.',
  sol: 'Hormones and four effects.',
  scheme: [['Adrenaline and noradrenaline', 1], ['Four effects', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('insulin-short2', short({
  marks: 2,
  stem: 'Name the cells that make insulin and the cells that make glucagon, and state how the two hormones act on blood glucose.',
  model: '**Beta cells** of the islets of Langerhans make **insulin**, which **lowers** blood glucose by increasing its uptake and its conversion to glycogen. **Alpha cells** make **glucagon**, which **raises** it by breaking down glycogen and forming glucose in the liver.',
  sol: 'Beta cells and insulin; alpha cells and glucagon.',
  scheme: [['Beta cells, insulin lowers glucose', 1], ['Alpha cells, glucagon raises glucose', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('gut-short2', short({
  marks: 2,
  stem: 'State the source and one action of secretin and of gastrin.',
  model: '**Secretin** is released by the **duodenum** and makes the **pancreas** secrete **water and bicarbonate**. **Gastrin** is released by the **stomach wall** and makes the **gastric glands** secrete **hydrochloric acid and pepsinogen**.',
  sol: 'Source and action of each.',
  scheme: [['Secretin source and action', 1], ['Gastrin source and action', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('cortex-short3', short({
  marks: 3,
  stem: 'Compare mineralocorticoids and glucocorticoids with respect to the layer of the cortex that makes them, one example and the main action.',
  model: '**Mineralocorticoids** are made by the **outer layer (zona glomerulosa)**; an example is **aldosterone**, which makes the kidney tubules **reabsorb sodium** and lose potassium. **Glucocorticoids** are made by the **middle layer (zona fasciculata)**; an example is **cortisol**, which **raises blood glucose**, is **anti-inflammatory** and reduces immunity.',
  sol: 'Layer, example, action for each.',
  scheme: [['Layers', 1], ['Examples', 1], ['Actions', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('glucose-short3', short({
  marks: 3,
  stem: 'Explain how the blood glucose of a healthy person is brought back to normal (i) after a sugary meal and (ii) after a long gap without food.',
  model: '(i) After a meal, glucose rises and the **beta cells** release **insulin**; the liver, muscle and fat cells **take up glucose** and the liver stores it as **glycogen**, so the level falls. (ii) After a long fast, the level falls and the **alpha cells** release **glucagon**, which makes the liver **break down glycogen** and form glucose, so the level rises.',
  sol: 'Insulin after a meal; glucagon after a fast.',
  scheme: [['Insulin released after a meal', 1], ['Effect of insulin: uptake and storage', 1], ['Glucagon after a fast with action', 1]],
  d: 3, c: 'application', t: [3],
}));
add('gonad-short3', short({
  marks: 3,
  stem: 'Name the hormones secreted by the testis and the ovary, and state one function of each.',
  model: 'The **testis** secretes **androgens (testosterone)** from its Leydig cells; they control the development of the **male characters** and the **formation of sperms**. The **ovary** secretes **oestrogen**, which controls the **female characters and the menstrual cycle**, and **progesterone**, which prepares the uterus and **maintains pregnancy**.',
  sol: 'Testosterone; oestrogen; progesterone with functions.',
  scheme: [['Testosterone with function', 1], ['Oestrogen with function', 1], ['Progesterone with function', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('adrenal-long', long({
  stem: `(a) Name the ${ADRENAL_CORTEX_LAYERS} layers of the adrenal cortex from the outside to the inside, with the kind of hormone each makes. [2]\n(b) State the part played by adrenaline in an emergency. [2]\n(c) Name the disease that results from underactivity of the adrenal cortex. [1]`,
  model: '(a) The outer **zona glomerulosa** makes **mineralocorticoids** (aldosterone); the middle **zona fasciculata** makes **glucocorticoids** (cortisol); the inner **zona reticularis** makes small amounts of **sex corticoids**.\n\n(b) **Adrenaline** from the medulla makes the **heart beat faster and harder**, **widens the pupils**, raises the **blood glucose** and prepares the body for **fight or flight**.\n\n(c) **Addison disease**.',
  sol: 'Three layers; adrenaline; Addison disease.',
  scheme: [['(a) Three layers named', 1], ['(a) Hormone of each', 1], ['(b) Two effects', 1], ['(b) Fight or flight', 1], ['(c) Addison disease', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [3],
}));
add('pancreas-long', long({
  stem: '(a) Name the three types of cell of the islets of Langerhans and the hormone each secretes. [2]\n(b) Explain how insulin and glucagon keep the blood glucose within the normal range. [2]\n(c) State what happens to the blood glucose if insulin is not secreted. [1]',
  model: `(a) **Alpha cells** secrete **glucagon**, **beta cells** secrete **insulin** and **delta cells** secrete **somatostatin**.\n\n(b) **Insulin** lowers blood glucose by increasing its **uptake** by cells and its **conversion to glycogen**; **glucagon** raises it by **breaking glycogen down** and forming glucose in the liver. The two act oppositely and hold the level near ${NORMAL_RANGE[0]} to ${NORMAL_RANGE[1]} mg per dL when fasting.\n\n(c) The blood glucose stays **high**, as in **diabetes mellitus**.`,
  sol: 'Cells and hormones; action; no insulin.',
  scheme: [['(a) Alpha, beta, delta cells', 1], ['(a) Hormones', 1], ['(b) Insulin', 1], ['(b) Glucagon', 1], ['(c) Blood glucose high', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [3],
}));
{
  const rows = (a) => a.join(' | ');
  add('gtt-case', mk.case({
    passage: `Two subjects, R and S, drank a measured amount of glucose, and their blood glucose (mg per dL) was measured over two hours.\n\n| Time (hours) | 0 | 0.5 | 1 | 1.5 | 2 |\n|---|---|---|---|---|---|\n| Subject R | ${rows(GTT_R)} |\n| Subject S | ${rows(GTT_S)} |\n\nA fasting value of ${GTT_LIMITS.fasting} or more, or a two-hour value of ${GTT_LIMITS.twoHour} or more, is taken as a sign of diabetes mellitus.`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'By how many mg per dL does the glucose of subject S rise above its fasting value at its highest?',
        value: riseOf(GTT_S), unit: 'mg per dL',
        sol: r`$${Math.max(...GTT_S)} - ${GTT_S[0]} = ${riseOf(GTT_S)}$ mg per dL.`,
        scheme: [[`${riseOf(GTT_S)}`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('b', mcq({
        stem: 'Which statement fits the two sets of results?',
        right: 'Subject S has diabetes mellitus; subject R is normal.',
        wrong: ['Subject R has diabetes mellitus; subject S is normal.', 'Both subjects have diabetes mellitus.', 'Neither subject can be judged without a urine test.'],
        sol: `S: fasting ${GTT_S[0]} above ${GTT_LIMITS.fasting} and two-hour ${GTT_S[4]} above ${GTT_LIMITS.twoHour}; R: ${GTT_R[0]} and ${GTT_R[4]}, both below the limits — option (@K).`,
        d: 3, c: 'analysis', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the hormone that is deficient or ineffective in subject S and the cells that make it.',
        model: '**Insulin**, made by the **beta cells** of the islets of Langerhans of the pancreas, is deficient or ineffective, so glucose is not taken up and stays high in the blood.',
        sol: 'Insulin; beta cells.',
        scheme: [['Insulin', 1], ['Beta cells of the islets of Langerhans', 1]],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Why would subject S be expected to feel unusually thirsty and pass much urine?',
          model: 'The very **high blood glucose** is lost in the urine and carries **water with it**, so the **urine volume is large** and the body loses water, which makes S **thirsty**.',
          sol: 'Glucose in urine; water loss.',
          scheme: [['Glucose in the urine draws water out', 1], ['Thirst from water loss', 1]],
          d: 3, c: 'analysis', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 145 || 'value');
}

// ---------------------------------------------------------------- t04 mechanism of hormone action
add('receptor-mcq', mcq({
  stem: 'Which of these hormones binds a receptor on the surface of its target cell, rather than entering the cell?',
  right: 'Adrenaline',
  wrong: ['Cortisol', 'Testosterone', 'Oestrogen'],
  sol: 'Adrenaline is water soluble and acts through a membrane receptor and cyclic AMP; the others are steroids — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('lipid-mcq', mcq({
  stem: 'A hormone is found to dissolve easily in lipids and not in water. Where is its receptor most likely to be located?',
  right: 'Inside the target cell',
  wrong: ['On the outer surface of the cell membrane', 'In the blood plasma', 'In the extracellular fluid only'],
  sol: 'A lipid-soluble hormone crosses the membrane and binds an intracellular receptor — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('camp-mcq', mcq({
  stem: 'When glucagon binds its receptor on a liver cell, the amount of a substance inside the cell rises, and this substance activates enzymes that break down glycogen. The substance is',
  right: 'cyclic AMP',
  wrong: ['ATP', 'glycogen', 'adenylyl cyclase'],
  sol: 'Cyclic AMP is the second messenger — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('adenylyl-fill', fill({
  stem: 'The enzyme that converts ATP into cyclic AMP inside the cell is ______ cyclase.',
  acc: [['adenylyl', 'adenyl', 'adenylate']],
  sol: 'Adenylyl cyclase.',
  d: 1, c: 'recall', t: [4],
}));
add('camp-tf', tf({
  stem: 'Cyclic AMP is called the first messenger of a protein hormone.',
  key: 'f',
  sol: 'False. The hormone is the first messenger; cyclic AMP is the second messenger.',
  d: 2, c: 'understanding', t: [4],
}));
add('receptor-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: Insulin : receptor on the cell membrane :: cortisol : ______.',
  model: '**Receptor inside the cell.**',
  sol: 'Intracellular receptor.',
  scheme: [['Intracellular receptor', 1]],
  wl: null,
  d: 2, c: 'understanding', t: [4],
}));
add('slow-reason', short({
  marks: 1,
  stem: 'Give a reason: The effect of a steroid hormone appears more slowly than that of adrenaline.',
  model: 'A steroid hormone works by changing **gene activity** and so the **synthesis of new proteins**, which takes time, whereas adrenaline acts quickly through a **second messenger** that activates **enzymes already present**.',
  sol: 'New protein synthesis.',
  scheme: [['Steroid acts by new protein synthesis', 1]],
  wl: null,
  d: 3, c: 'understanding', t: [4],
}));
add('mech-short2', short({
  marks: 2,
  stem: 'What is a second messenger? Name the second messenger of the protein hormones and the enzyme that makes it.',
  model: 'A **second messenger** is a substance made **inside the cell** after a hormone (the first messenger) binds its receptor on the membrane, and it passes the message on within the cell. The second messenger of protein hormones is **cyclic AMP**, made from ATP by the enzyme **adenylyl cyclase**.',
  sol: 'Definition; cAMP; adenylyl cyclase.',
  scheme: [['Definition of a second messenger', 1], ['Cyclic AMP and adenylyl cyclase', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('steroid-short2', short({
  marks: 2,
  stem: 'Explain why a steroid hormone can act on the inside of a cell, but a protein hormone such as insulin cannot.',
  model: 'A **steroid hormone is lipid soluble**, so it can **pass through the lipid cell membrane** and bind a receptor inside the cell. **Insulin is a water-soluble protein**, which **cannot cross the membrane**, so it must bind a **receptor on the surface** and act through a **second messenger**.',
  sol: 'Solubility and membrane.',
  scheme: [['Steroid lipid soluble, crosses membrane', 1], ['Insulin water soluble, acts at the surface', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('mech-short3', short({
  marks: 3,
  stem: 'Compare the mechanisms of action of a protein hormone and a steroid hormone on three points.',
  model: 'A **protein hormone** binds a **receptor on the cell membrane**, acts through a **second messenger (cyclic AMP)** and gives a **quick response** by activating enzymes. A **steroid hormone** passes through the membrane, binds an **intracellular receptor**, and the **hormone-receptor complex acts on DNA** to alter the **synthesis of mRNA and proteins**, giving a **slower** response.',
  sol: 'Receptor, messenger, speed.',
  scheme: [['Position of the receptor', 1], ['Second messenger against gene action', 1], ['Speed of response', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('mech-long', long({
  stem: '(a) Draw a labelled diagram to show how a protein hormone acts through cyclic AMP. [2]\n(b) Describe the steps in the action of a steroid hormone. [2]\n(c) Give one example of a protein hormone and one of a steroid hormone. [1]',
  model: '(a) **Diagram:** a **hormone** outside, a **membrane receptor**, a **G protein** and **adenylyl cyclase** in the membrane, **ATP converted to cyclic AMP** inside, which **activates enzymes** to give the response.\n\n(b) The **steroid** diffuses through the membrane and binds an **intracellular receptor**; the **complex enters the nucleus** and binds **DNA**, switching **genes** on or off, so new **mRNA and proteins** are made.\n\n(c) **Insulin** (or glucagon, adrenaline) and **cortisol** (or testosterone, oestrogen).',
  sol: 'cAMP diagram; steroid steps; examples.',
  scheme: [['(a) Labelled diagram', 2], ['(b) Receptor inside the cell', 1], ['(b) Action on DNA and proteins', 1], ['(c) Examples', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 disorders
add('disorder-mcq', mcq({
  stem: 'A four-month-old baby is sluggish, feeds poorly, has dry skin and a large protruding tongue, and tests show very low thyroxine. The condition is',
  right: 'cretinism',
  wrong: ['acromegaly', 'Addison disease', 'diabetes insipidus'],
  sol: 'Hyposecretion of thyroxine in infancy gives cretinism — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('acromegaly-mcq', mcq({
  stem: 'A 48-year-old man finds that his ring and shoe sizes have increased and that his jaw has become heavy, although he is no taller. A scan shows a tumour of the anterior pituitary. His condition results from',
  right: 'too much growth hormone in adult life',
  wrong: ['too little growth hormone in childhood', 'too little thyroxine in infancy', 'too much ADH'],
  sol: 'Hypersecretion of growth hormone in an adult gives acromegaly — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('dwarf-mcq', mcq({
  stem: 'A girl of twelve is only 105 cm tall but has normal body proportions and normal intelligence. Which treatment is most likely to help her?',
  right: 'Injections of growth hormone',
  wrong: ['Injections of insulin', 'Tablets of thyroxine only', 'Injections of vasopressin'],
  sol: 'Short stature with normal proportions is pituitary dwarfism, from too little growth hormone — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('graves-mcq', mcq({
  stem: 'Which feature is associated with exophthalmic goitre (Graves disease)?',
  right: 'Protruding eyeballs with an overactive thyroid gland',
  wrong: ['Stunted growth with mental retardation', 'Weakness with low blood pressure', 'A very large volume of dilute urine'],
  sol: 'Graves disease is hypersecretion of thyroxine with protruding eyes — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('dm-mcq', mcq({
  stem: 'A boy has become very thirsty and hungry, passes much urine that contains sugar, and has lost weight. His blood glucose is high. The most likely cause is',
  right: 'a lack of insulin',
  wrong: ['a lack of ADH', 'too much thyroxine', 'a lack of parathormone'],
  sol: 'High blood glucose with sugar in the urine indicates diabetes mellitus: lack of insulin — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('di-mcq', mcq({
  stem: 'A patient passes about 12 litres of very dilute urine a day. The urine contains no sugar and the blood glucose is normal. The hormone that is lacking is',
  right: 'ADH (vasopressin)',
  wrong: ['insulin', 'aldosterone', 'oxytocin'],
  sol: 'Large volumes of dilute urine with normal blood glucose indicate diabetes insipidus: lack of ADH — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('di-tf', tf({
  stem: 'In diabetes insipidus the blood glucose level is high and the urine contains sugar.',
  key: 'f',
  sol: 'False. Both the blood glucose level and the urine sugar are normal in diabetes insipidus.',
  d: 1, c: 'recall', t: [5],
}));
{
  add('urine-num', num({
    stem: `A healthy adult passes about ${URINE.normal} L of urine a day. A patient with diabetes insipidus passes ${URINE_Q} L a day. How many times the normal volume is this?`,
    value: URINE_Q_FOLD, tol: 0.05, unit: 'times',
    sol: r`$\dfrac{${URINE_Q}}{${URINE.normal}} = ${URINE_Q_FOLD}$ times.`,
    scheme: [[`${URINE_Q_FOLD}`, 1]],
    d: 2, c: 'application', t: [5],
  }), (q) => q.answer.value === 6 || 'value');
}
add('disorder-match', match({
  stem: 'Match each endocrine disorder (column I) with its cause (column II).',
  pairs: [
    ['Cretinism', 'Hypersecretion of growth hormone in an adult'],
    ['Acromegaly', 'Hyposecretion of thyroxine in infancy'],
    ['Addison disease', 'Hypersecretion of thyroxine, an autoimmune disorder'],
    ['Graves disease', 'Hyposecretion of the hormones of the adrenal cortex'],
  ],
  order: [1, 0, 3, 2],
  sol: 'Cretinism — too little thyroxine in infancy; acromegaly — too much growth hormone in an adult; Addison disease — underactive adrenal cortex; Graves disease — overactive thyroid.',
  d: 2, c: 'understanding', t: [5],
}));
add('thirst-reason', short({
  marks: 1,
  stem: 'Give a reason: A person with untreated diabetes mellitus passes a large volume of urine and feels thirsty.',
  model: 'The **excess glucose** in the blood is lost in the **urine** and carries **water with it**, so the **volume of urine rises** and the body becomes short of water.',
  sol: 'Glucose carries water out.',
  scheme: [['Glucose in urine draws out water', 1]],
  wl: null,
  d: 2, c: 'application', t: [5],
}));
add('growth-short2', short({
  marks: 2,
  stem: 'Name the disorders caused by too little growth hormone in childhood and by too much of it in adult life, and state one feature of each.',
  model: '**Dwarfism** results from **too little growth hormone** in childhood: the child is **short but with normal body proportions**. **Acromegaly** results from **too much growth hormone** in an adult: the **face, hands and feet are enlarged** and the jaw becomes heavy. (In a child, too much causes gigantism.)',
  sol: 'Dwarfism; acromegaly; features.',
  scheme: [['Dwarfism with a feature', 1], ['Acromegaly with a feature', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('addison-short2', short({
  marks: 2,
  stem: 'State the cause of Addison disease and two of its symptoms.',
  model: '**Addison disease** is caused by **hyposecretion of the hormones of the adrenal cortex** (glucocorticoids and mineralocorticoids). Symptoms include **weakness and fatigue**, **low blood pressure** because of loss of sodium, and changes in carbohydrate metabolism.',
  sol: 'Underactive adrenal cortex; symptoms.',
  scheme: [['Cause: underactive adrenal cortex', 1], ['Two symptoms', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('thyroiddis-short3', short({
  marks: 3,
  stem: 'Distinguish cretinism, simple goitre and exophthalmic goitre on the basis of cause.',
  model: '**Cretinism** is caused by **too little thyroxine in infancy**, giving stunted growth and mental retardation. **Simple goitre** is caused by **lack of iodine** (so low thyroxine and high TSH), and the thyroid **enlarges**. **Exophthalmic goitre (Graves disease)** is caused by **too much thyroxine** (an autoimmune overactivity), with an enlarged gland and **protruding eyes**.',
  sol: 'Three thyroid disorders and causes.',
  scheme: [['Cretinism', 1], ['Simple goitre', 1], ['Exophthalmic goitre', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('dmdi-short3', short({
  marks: 3,
  stem: 'Two patients both pass much urine. In patient 1 the blood glucose is high and the urine contains sugar; in patient 2 the blood glucose is normal and the urine is very dilute and sugar-free. Name each condition and the hormone concerned, and explain the difference.',
  model: 'Patient 1 has **diabetes mellitus**, due to a lack of **insulin** from the pancreas, so the **blood glucose is high** and spills into the urine. Patient 2 has **diabetes insipidus**, due to a lack of **ADH** from the posterior pituitary, so the kidney tubules **cannot reabsorb water**; blood glucose stays normal. The first is a **disorder of glucose control**, the second of **water balance**.',
  sol: 'Two conditions, two hormones, difference.',
  scheme: [['Diabetes mellitus with insulin', 1], ['Diabetes insipidus with ADH', 1], ['Difference in glucose and water balance', 1]],
  d: 3, c: 'application', t: [5],
}));
add('disorders-long', long({
  stem: '(a) Name the hormone whose lack causes diabetes mellitus, and state two of its features. [2]\n(b) Explain how diabetes insipidus differs from diabetes mellitus. [2]\n(c) Name the disorder caused by a lack of iodine in the diet. [1]',
  model: '(a) A lack of **insulin**; features are **high blood glucose**, **glucose in the urine**, **much urine**, thirst and weight loss.\n\n(b) **Diabetes insipidus** is due to a lack of **ADH** from the posterior pituitary; the **urine is very dilute and large in volume** but contains **no sugar** and the **blood glucose is normal**; diabetes mellitus is a disorder of **glucose** with sugar in the urine.\n\n(c) **Simple goitre** (enlargement of the thyroid).',
  sol: 'Insulin; DM against DI; goitre.',
  scheme: [['(a) Insulin', 1], ['(a) Two features', 1], ['(b) ADH, dilute urine', 1], ['(b) Normal glucose, no sugar', 1], ['(c) Goitre', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [5],
}));
