// ISC 11 Biology ch21 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { LOW, LOW_START, GTT_LIMITS, NORMAL_RANGE, CA_RANGE, PARATHYROIDS, ADRENAL_CORTEX_LAYERS } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Chemical Coordination and Integration — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The endocrine system, the hypothalamus and pituitary, and feedback',
      `A **hormone** is a **chemical messenger** made by an **endocrine (ductless) gland**, carried in the **blood** and acting in very small amounts on **target cells** that have the right **receptor**. Nervous coordination is fast and short; endocrine coordination is slower and longer lasting.

**Endocrine glands of the human body:** hypothalamus, pituitary, pineal, thyroid, **${PARATHYROIDS} parathyroids** (on the back of the thyroid), thymus, adrenals (above the kidneys), pancreas (islets of Langerhans), and the gonads (testes and ovaries). The gut also makes hormones.

**Hypothalamus:** controls the pituitary. It makes **releasing hormones** (for example TRH, CRH, GnRH, GHRH) and **inhibiting hormones** (for example somatostatin), which reach the **anterior pituitary** through the **hypophysial portal vessels**. It also makes **oxytocin** and **vasopressin (ADH)**, which pass down nerve fibres and are stored and released from the **posterior pituitary**.

**Pituitary (hypophysis)**
| Lobe | Hormone | Action |
|---|---|---|
| Anterior | **Growth hormone (GH)** | Growth of tissues and bones; protein synthesis |
| Anterior | **Prolactin (PRL)** | Growth of the mammary glands; milk formation |
| Anterior | **TSH** (tropic) | Stimulates the thyroid to release thyroxine |
| Anterior | **ACTH** (tropic) | Stimulates the adrenal cortex to release glucocorticoids |
| Anterior | **LH and FSH** (tropic, gonadotropins) | Gonads: gametes and sex hormones |
| Intermediate (small in humans) | **MSH** | Pigment cells of the skin |
| Posterior | **Oxytocin** | Contraction of the uterus at birth; milk ejection |
| Posterior | **ADH (vasopressin)** | Reabsorption of water in the kidney tubules |

**Feedback control of tropic hormones:** a hormone of the target gland usually **inhibits** the hypothalamus and pituitary: **negative feedback**. Thyroxine: hypothalamus (**TRH**) → anterior pituitary (**TSH**) → thyroid (**thyroxine**); thyroxine in the blood **reduces TRH and TSH**, and when thyroxine falls the inhibition is removed and secretion increases. In a simple model with thyroxine at ${LOW_START} percent of normal, TSH is ${LOW[0].tsh} percent and thyroxine returns to about ${Math.round(LOW[LOW.length - 1].t4)} percent within ${LOW.length - 1} steps (illustrative values).`,
      [kt('Hormone', 'Chemical messenger from an endocrine gland acting on target cells.'), kt('Tropic hormone', 'Hormone that controls another endocrine gland (TSH, ACTH, LH, FSH).'), kt('Negative feedback', 'The product of a gland inhibits its own secretion.'), kt('Hypophysial portal vessels', 'Vessels carrying hypothalamic hormones to the anterior pituitary.')],
      V.pituitary,
      [1],
      [V.endocrine, V.feedback],
    ),
    sec(
      '2. Thyroid, parathyroid, pineal and thymus',
      `**Thyroid:** a butterfly-shaped gland on the front of the windpipe, with follicles that make **thyroxine (T4, tetraiodothyronine)** and **triiodothyronine (T3)**, for which **iodine** is needed, and **calcitonin (thyrocalcitonin)** from separate cells.
- **Thyroxine and triiodothyronine:** raise the **basal metabolic rate**; support normal growth, development of the brain, and formation of red blood cells; help to control body temperature.
- **Calcitonin:** **lowers** blood calcium by increasing its deposition in the bones.

**Parathyroids:** ${PARATHYROIDS} small glands on the back of the thyroid. **Parathormone (PTH)** **raises** blood calcium: it increases bone breakdown, reabsorption of calcium by the kidney tubules, and absorption of calcium in the gut (with vitamin D). PTH and calcitonin act in opposite directions to keep calcium within limits (the model range used here is ${CA_RANGE[0]} to ${CA_RANGE[1]} mg per dL; books vary).

**Pineal gland:** makes **melatonin**, which regulates the **sleep-wake (diurnal) rhythm**, body temperature, skin pigmentation and the menstrual cycle.

**Thymus:** makes **thymosin**, which helps the **differentiation of T lymphocytes** and so cell-mediated immunity; the thymus is large in children and **shrinks with age**, so immunity weakens in old age.`,
      [kt('Thyroxine', 'Thyroid hormone with four iodine atoms; raises metabolic rate.'), kt('Calcitonin', 'Thyroid hormone that lowers blood calcium.'), kt('Parathormone', 'Parathyroid hormone that raises blood calcium.'), kt('Melatonin', 'Pineal hormone controlling the sleep-wake rhythm.'), kt('Thymosin', 'Thymus hormone for T lymphocyte differentiation.')],
      table(['Gland', 'Hormone', 'Action'], [['Thyroid', 'Thyroxine', 'Raises BMR'], ['Thyroid', 'Calcitonin', 'Lowers blood calcium'], ['Parathyroid', 'Parathormone', 'Raises blood calcium'], ['Pineal', 'Melatonin', 'Sleep-wake rhythm'], ['Thymus', 'Thymosin', 'T lymphocytes']], 'Table of thyroid, parathyroid, pineal and thymus hormones'),
      [2],
      [V.curve],
    ),
    sec(
      '3. Adrenal glands, pancreas, gonads and the gut',
      `**Adrenal glands:** on the kidneys; the **cortex** has **${ADRENAL_CORTEX_LAYERS} layers** and the **medulla** inside.
- **Zona glomerulosa** (outer): **mineralocorticoids** (aldosterone): reabsorption of sodium and loss of potassium and so water and blood pressure.
- **Zona fasciculata** (middle): **glucocorticoids** (cortisol): raise blood glucose (gluconeogenesis), break down proteins and fats, **anti-inflammatory**, reduce immunity.
- **Zona reticularis** (inner): small amounts of **sex corticoids** (androgens).
- **Medulla:** **adrenaline (epinephrine) and noradrenaline**: **emergency hormones** (fight or flight): faster, stronger heartbeat, wider pupils, more alertness, sweating, **breakdown of glycogen, fats and proteins** to raise blood glucose.

**Pancreas (islets of Langerhans):** **alpha cells** make **glucagon** (raises blood glucose: glycogenolysis and gluconeogenesis in the liver); **beta cells** make **insulin** (lowers blood glucose: uptake by cells, glycogenesis); **delta cells** make **somatostatin** (inhibits both). The fasting blood glucose is taken as ${NORMAL_RANGE[0]} to ${NORMAL_RANGE[1]} mg per dL in the chapter (book values differ); a diabetic is suspected with fasting glucose of ${GTT_LIMITS.fasting} or two-hour glucose of ${GTT_LIMITS.twoHour} mg per dL or more in a tolerance test.

**Gonads:** **testis** (Leydig cells): **androgens (testosterone)**: male characters, spermatogenesis; **ovary**: **oestrogen** (female characters, cycle) and **progesterone** (maintains pregnancy).

**Gastrointestinal tract:** **gastrin** (stomach: secretion of HCl and pepsinogen), **secretin** (duodenum: water and bicarbonate from the pancreas), **cholecystokinin-pancreozymin, CCK-PZ** (duodenum: contraction of the gall bladder and pancreatic enzymes), **gastric inhibitory peptide, GIP** (inhibits gastric secretion and movement).`,
      [kt('Insulin', 'Beta-cell hormone that lowers blood glucose.'), kt('Glucagon', 'Alpha-cell hormone that raises blood glucose.'), kt('Adrenaline', 'Medulla hormone for emergencies.'), kt('Glucocorticoids', 'Cortical hormones such as cortisol, raising glucose and reducing inflammation.'), kt('CCK-PZ', 'Gut hormone: gall bladder contraction and pancreatic enzymes.')],
      V.glucose,
      [3],
      [V.gtt],
    ),
    sec(
      '4. Mechanism of hormone action',
      `A hormone acts only on **target cells** that have its **receptor**.

**Protein, peptide and amino acid hormones (insulin, glucagon, adrenaline, TSH):** **water soluble**, cannot cross the lipid membrane. They bind a **receptor on the cell membrane**, which activates **adenylyl cyclase** through a **G protein**; it converts **ATP to cyclic AMP (cAMP)**, the **second messenger**, which activates **protein kinases and enzymes** and produces the response. (The hormone is the first messenger.) The response is **fast**.

**Steroid hormones (cortisol, testosterone, oestrogen) and thyroid hormones:** **lipid soluble**, they **diffuse through the membrane** and bind an **intracellular receptor** (cytoplasm or nucleus). The **hormone-receptor complex** binds **DNA**, switches **genes** on or off, and changes the synthesis of **mRNA and proteins**. The response is **slower** and longer lasting.

*Note on books:* the thyroid hormones are lipid soluble and act on nuclear receptors like steroids, although they are amino acid derivatives; adrenaline acts through cAMP. Some books use the term "chemical nature" (peptide, steroid, amino acid derivative) as the basis of the two mechanisms.`,
      [kt('Second messenger', 'Substance made inside the cell, such as cyclic AMP, after a hormone binds a membrane receptor.'), kt('Adenylyl cyclase', 'Enzyme that makes cyclic AMP from ATP.'), kt('Intracellular receptor', 'Receptor inside the cell that binds a steroid hormone.')],
      V.mechanism,
      [4],
    ),
    sec(
      '5. Disorders of hypo- and hypersecretion',
      `| Disorder | Gland, hormone and defect | Main features |
|---|---|---|
| **Dwarfism** | Pituitary: **hyposecretion of growth hormone** in childhood | Short stature with normal proportions |
| **Acromegaly** | Pituitary: **hypersecretion of growth hormone** in adults (in children, gigantism) | Enlarged face, hands and feet |
| **Cretinism** | Thyroid: **hyposecretion of thyroxine** in infancy | Stunted growth, mental retardation, low metabolic rate |
| **Goitre** | Thyroid: usually **iodine deficiency**; the gland enlarges as TSH rises | Swelling of the neck; low thyroxine |
| **Exophthalmic goitre (Graves disease)** | Thyroid: **hypersecretion of thyroxine** (autoimmune) | Enlarged thyroid, protruding eyes, high metabolic rate, weight loss |
| **Addison disease** | Adrenal cortex: **hyposecretion of corticoids** | Weakness, low blood pressure, low sodium |
| **Diabetes mellitus** | Pancreas: **lack of insulin** (or poor response) | High blood glucose, glucose in urine, much urine, thirst, weight loss |
| **Diabetes insipidus** | Posterior pituitary: **lack of ADH** | Very large volume of dilute urine, thirst, dehydration; blood glucose normal |

**Diabetes mellitus and diabetes insipidus** both give frequent urination, but the first is due to lack of **insulin** with high blood glucose and sugary urine; the second is due to lack of **ADH**, with normal blood glucose and sugar-free urine.`,
      [kt('Hyposecretion', 'Secretion of less hormone than normal.'), kt('Hypersecretion', 'Secretion of more hormone than normal.'), kt('Goitre', 'Enlargement of the thyroid gland.'), kt('Diabetes insipidus', 'Disorder from lack of ADH, with very large volumes of dilute urine.')],
      table(['Disorder', 'Gland'], [['Dwarfism, acromegaly', 'Pituitary'], ['Cretinism, goitre, Graves disease', 'Thyroid'], ['Addison disease', 'Adrenal cortex'], ['Diabetes mellitus', 'Pancreas'], ['Diabetes insipidus', 'Posterior pituitary']], 'Table matching disorders to glands'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying the pituitary makes oxytocin and ADH (the hypothalamus makes them; the posterior pituitary stores and releases them).
- Mixing up parathormone (raises calcium) and calcitonin (lowers calcium).
- Mixing up insulin (lowers glucose) and glucagon (raises glucose), or the alpha and beta cells.
- Saying thyroxine stimulates TSH (it inhibits it: negative feedback).
- Writing that steroid hormones act through cyclic AMP (they act on intracellular receptors and genes).
- Confusing diabetes mellitus and diabetes insipidus, or acromegaly with gigantism and dwarfism.
- Writing "goitre is caused by too much iodine" (it is lack of iodine, or an overactive gland in Graves disease).

**How marks are usually awarded**
- 1-mark subparts: a gland from its position, a hormone from its action, a tropic hormone, a disorder from a case, a give-a-reason.
- 2–3-mark questions: negative feedback of thyroxine; insulin and glucagon; protein against steroid action; diabetes mellitus against insipidus; gut hormones.
- 5-mark questions in parts: pituitary and its hormones; thyroid and parathyroid with disorders; adrenal and pancreatic hormones; mechanism of hormone action.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define a hormone.', 'Chemical messenger from an endocrine gland, carried in the blood to target cells.', 'definition', 1),
    fc(2, 'Which hormones does the hypothalamus make that the posterior pituitary releases?', 'Oxytocin and ADH.', 'fact', 1),
    fc(3, 'How do hypothalamic hormones reach the anterior pituitary?', 'Through the hypophysial portal vessels.', 'fact', 1),
    fc(4, 'Name four tropic hormones.', 'TSH, ACTH, LH, FSH.', 'fact', 1),
    fc(5, 'Which pituitary hormone makes milk?', 'Prolactin.', 'fact', 1),
    fc(6, 'Action of ADH?', 'Water reabsorption in the kidney tubules.', 'fact', 1),
    fc(7, 'Negative feedback of thyroxine?', 'Thyroxine reduces TRH and TSH secretion.', 'concept', 1),
    fc(8, 'Function of thyroxine?', 'Raises basal metabolic rate; growth and brain development.', 'fact', 2),
    fc(9, 'Which element is needed for thyroxine?', 'Iodine.', 'fact', 2),
    fc(10, 'Hormone that lowers blood calcium?', 'Calcitonin.', 'fact', 2),
    fc(11, 'Hormone that raises blood calcium?', 'Parathormone.', 'fact', 2),
    fc(12, 'How many parathyroid glands?', `${PARATHYROIDS}, on the back of the thyroid.`, 'fact', 2),
    fc(13, 'Hormone of the pineal gland?', 'Melatonin: sleep-wake rhythm.', 'fact', 2),
    fc(14, 'Hormone of the thymus?', 'Thymosin: T lymphocyte differentiation.', 'fact', 2),
    fc(15, 'Layers of the adrenal cortex and their hormones?', 'Mineralocorticoids, glucocorticoids, sex corticoids.', 'fact', 3),
    fc(16, 'Which adrenal hormones prepare the body for emergencies?', 'Adrenaline and noradrenaline (medulla).', 'concept', 3),
    fc(17, 'Action of cortisol?', 'Raises blood glucose; anti-inflammatory.', 'fact', 3),
    fc(18, 'Which cells make insulin?', 'Beta cells of the islets of Langerhans.', 'fact', 3),
    fc(19, 'Which cells make glucagon?', 'Alpha cells.', 'fact', 3),
    fc(20, 'Action of insulin versus glucagon?', 'Insulin lowers blood glucose; glucagon raises it.', 'exam-tip', 3),
    fc(21, 'Name the four gut hormones.', 'Gastrin, secretin, GIP, CCK-PZ.', 'fact', 3),
    fc(22, 'Hormones of the ovary?', 'Oestrogen and progesterone.', 'fact', 3),
    fc(23, 'Second messenger of protein hormones?', 'Cyclic AMP.', 'fact', 4),
    fc(24, 'Where are the receptors of steroid hormones?', 'Inside the cell.', 'concept', 4),
    fc(25, 'Why do protein hormones need a membrane receptor?', 'They are water soluble and cannot cross the membrane.', 'concept', 4),
    fc(26, 'Cause of dwarfism and acromegaly?', 'Too little and too much growth hormone.', 'concept', 5),
    fc(27, 'Cause of cretinism and simple goitre?', 'Too little thyroxine in infancy; lack of iodine.', 'concept', 5),
    fc(28, 'Cause of exophthalmic goitre?', 'Overactive thyroid (Graves disease), autoimmune.', 'concept', 5),
    fc(29, 'Cause of Addison disease?', 'Hyposecretion of the adrenal cortex.', 'concept', 5),
    fc(30, 'Distinguish diabetes mellitus from insipidus.', 'Mellitus: lack of insulin, sugar in urine. Insipidus: lack of ADH, dilute urine.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
