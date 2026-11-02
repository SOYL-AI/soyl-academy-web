// ch19 notes and flashcards.
import { T, table, unit, PROV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Chemical Coordination and Integration — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Endocrine glands, hormones and the hypothalamus',
      `Nerve fibres do not innervate every cell, and cellular functions need continuous regulation, so the **neural system** and the **endocrine system** jointly coordinate and integrate the activities of organs.

**Endocrine glands** lack ducts (**ductless glands**); their secretions are **hormones**. The present definition: a hormone is a **non-nutrient chemical** which acts as an **intercellular messenger** and is produced in **trace amounts**. Invertebrates have simple endocrine systems with few hormones; vertebrates use many chemicals as hormones.

The organised endocrine bodies of the human are the **pituitary, pineal, thyroid, adrenal, pancreas, parathyroid, thymus and gonads** (testis in males, ovary in females). Other organs — the **gastrointestinal tract, liver, kidney and heart** — also produce hormones.

**Hypothalamus.** The basal part of the **diencephalon** (forebrain). It contains groups of **neurosecretory cells** called **nuclei**, which make hormones that regulate the synthesis and secretion of pituitary hormones:
- **Releasing hormones** stimulate pituitary secretion — e.g. **gonadotrophin releasing hormone (GnRH)** stimulates the synthesis and release of gonadotrophins.
- **Inhibiting hormones** inhibit it — e.g. **somatostatin** inhibits the release of growth hormone.

These hormones originate in hypothalamic neurons, pass through their axons and are released from the nerve endings. They reach the pituitary through a **portal circulatory system** (hypophysial portal system) and regulate the **anterior pituitary**. The **posterior pituitary** is under the **direct neural regulation** of the hypothalamus.`,
      [kt('Hormone', 'A non-nutrient chemical that acts as an intercellular messenger and is produced in trace amounts.'), kt('Releasing hormone', 'A hypothalamic hormone that stimulates pituitary secretion, such as GnRH.'), kt('Inhibiting hormone', 'A hypothalamic hormone that inhibits pituitary secretion, such as somatostatin.')],
      V.endocrine,
      [1],
    ),
    sec(
      '2. The pituitary gland',
      `The pituitary lies in a bony cavity called the **sella turcica** and is attached to the hypothalamus by a stalk. It has two parts: the **adenohypophysis** (pars distalis and pars intermedia) and the **neurohypophysis** (pars nervosa).

**Pars distalis** (commonly the anterior pituitary):
- **Growth hormone (GH):** over-secretion causes **gigantism**; low secretion causes stunted growth, **pituitary dwarfism**. Excess in adults, especially in middle age, causes **acromegaly** — severe disfigurement, especially of the face, with serious complications and premature death if unchecked; it is hard to diagnose early and often goes undetected for years.
- **Prolactin (PRL):** growth of the mammary glands and formation of milk.
- **TSH:** synthesis and secretion of thyroid hormones.
- **ACTH:** synthesis and secretion of glucocorticoids by the adrenal cortex.
- **LH and FSH (gonadotrophins):** in males LH stimulates androgen secretion from the testis, and FSH with androgens regulates spermatogenesis; in females LH induces ovulation of fully mature (Graafian) follicles and maintains the corpus luteum, and FSH stimulates growth of ovarian follicles.

**Pars intermedia:** only **MSH**, which acts on melanocytes and regulates skin pigmentation. In humans it is almost merged with the pars distalis.

**Neurohypophysis (pars nervosa, posterior pituitary):** stores and releases **oxytocin** and **vasopressin**, which are synthesised in the hypothalamus and transported axonally.
- **Oxytocin** contracts smooth muscle: vigorous uterine contraction at childbirth and milk ejection from the mammary glands.
- **Vasopressin (anti-diuretic hormone, ADH)** acts mainly on the kidney, stimulating **reabsorption of water and electrolytes by the distal tubules** and so reducing diuresis. Impaired synthesis or release of ADH reduces the kidney’s ability to conserve water, causing water loss and dehydration: **diabetes insipidus**.

Counting: 6 (pars distalis) + 1 (pars intermedia) + 2 (pars nervosa) = 9 hormones released, 7 of them made in the pituitary.`,
      [kt('Sella turcica', 'The bony cavity in which the pituitary lies.'), kt('Gonadotrophins', 'LH and FSH, pituitary hormones that stimulate the gonads.'), kt('Acromegaly', 'Disfigurement, especially of the face, from excess growth hormone in adults.'), kt('Diabetes insipidus', 'Loss of large volumes of urine and dehydration when ADH synthesis or release is impaired.')],
      V.axis,
      [1],
    ),
    sec(
      '3. Pineal, thyroid, parathyroid and thymus',
      `**Pineal gland:** on the dorsal side of the forebrain; secretes **melatonin**, which regulates the **24-hour (diurnal) rhythm** — sleep–wake cycle and body temperature — and influences metabolism, pigmentation, the menstrual cycle and defence capability.

**Thyroid:** two lobes on either side of the **trachea**, joined by a thin flap of connective tissue, the **isthmus**. It is made of **follicles** and stromal tissue; each follicle has follicular cells around a cavity. Follicular cells make **tetraiodothyronine (thyroxine, T4)** and **triiodothyronine (T3)**. **Iodine** is essential for their normal rate of synthesis (thyroxine has 4 iodine atoms, triiodothyronine 3; iodine is about 65 percent of thyroxine’s mass). Thyroid hormones regulate the **basal metabolic rate**, support **RBC formation**, control the metabolism of carbohydrates, proteins and fats, and maintain water and electrolyte balance. The thyroid also secretes **thyrocalcitonin (TCT)**, a protein hormone that regulates blood calcium.
- **Iodine deficiency** → **hypothyroidism** and enlarged thyroid, **goitre**.
- Hypothyroidism **during pregnancy** → defective development of the baby: **cretinism** (stunted growth, mental retardation, low IQ, abnormal skin, deaf-mutism). In adult women it may make the menstrual cycle irregular.
- **Hyperthyroidism** (from thyroid cancer or nodules) raises hormone levels; **exophthalmic goitre (Graves’ disease)** shows an enlarged thyroid, protruding eyeballs, increased BMR and weight loss.

**Parathyroid:** **four glands** on the back of the thyroid, one pair in each lobe. They secrete the peptide **parathyroid hormone (PTH)**, regulated by circulating calcium ions. PTH **raises blood calcium** (**hypercalcaemic**): it stimulates **bone resorption** (demineralisation), **reabsorption of calcium by renal tubules** and **absorption of calcium from digested food**. With TCT it maintains calcium balance.

**Thymus:** a lobular structure between the lungs behind the sternum, on the ventral side of the aorta. It secretes peptide **thymosins**, which help **differentiate T-lymphocytes** (cell-mediated immunity) and promote **antibody production** (humoral immunity). The thymus **degenerates in old age**, so immune responses weaken.`,
      [kt('Goitre', 'Enlargement of the thyroid gland, for example from iodine deficiency.'), kt('Cretinism', 'Defective growth and development of a baby whose mother was hypothyroid in pregnancy.'), kt('Exophthalmic goitre', 'A form of hyperthyroidism (Graves’ disease) with protruding eyeballs, high BMR and weight loss.'), kt('Thymosins', 'Thymus peptides that help T-lymphocytes differentiate and promote antibody production.')],
      table(['Gland', 'Hormone', 'Main role'], [['Pineal', 'Melatonin', 'Daily (diurnal) rhythms'], ['Thyroid', 'T4, T3', 'Basal metabolic rate and metabolism'], ['Thyroid', 'Thyrocalcitonin', 'Regulates blood calcium'], ['Parathyroid', 'PTH', 'Raises blood calcium'], ['Thymus', 'Thymosins', 'T-lymphocyte differentiation']], 'Table of pineal, thyroid, parathyroid and thymus hormones'),
      [1],
    ),
    sec(
      '4. Adrenal gland, pancreas and gonads',
      `**Adrenal glands:** one at the anterior part of each kidney, with a central **medulla** and an outer **cortex**.
- **Medulla:** **adrenaline (epinephrine)** and **noradrenaline (norepinephrine)**, the **catecholamines**, secreted rapidly in stress and emergencies — **emergency hormones** or hormones of **fight or flight**. They increase alertness, cause pupillary dilation, piloerection and sweating, increase heart rate, strength of contraction and breathing rate, and stimulate breakdown of glycogen (raising blood glucose), lipids and proteins.
- **Cortex:** three layers — **zona reticularis** (inner), **zona fasciculata** (middle), **zona glomerulosa** (outer) — secreting **corticoids**. **Glucocorticoids** (e.g. **cortisol**) stimulate gluconeogenesis, lipolysis and proteolysis, inhibit cellular uptake and use of amino acids, help maintain the cardiovascular system and kidney function, produce **anti-inflammatory** reactions, suppress the immune response and stimulate RBC production. **Mineralocorticoids** (mainly **aldosterone**) act on renal tubules, stimulating reabsorption of **sodium ions and water** and excretion of **potassium and phosphate ions**, maintaining electrolytes, fluid volume, osmotic pressure and blood pressure. Small amounts of **androgenic steroids** affect growth of axial, pubic and facial hair at puberty. Underproduction causes **Addison’s disease** (acute weakness and fatigue).

**Pancreas:** a **composite gland** (exocrine and endocrine). About **1 to 2 million islets of Langerhans** form only **1 to 2 percent** of the tissue. **α cells** secrete **glucagon**, a peptide that acts mainly on hepatocytes, stimulating **glycogenolysis** and **gluconeogenesis** and reducing cellular glucose uptake: it is **hyperglycaemic**. **β cells** secrete **insulin**, a peptide that acts mainly on hepatocytes and adipocytes, enhancing glucose uptake and use and stimulating **glycogenesis**: it is **hypoglycaemic**. Prolonged hyperglycaemia causes **diabetes mellitus**, with loss of glucose in urine and formation of harmful **ketone bodies**; it is treated with insulin therapy.

**Testis:** in the scrotal sac; seminiferous tubules and interstitial tissue. **Leydig (interstitial) cells** make **androgens**, mainly **testosterone**, which regulate the male accessory sex organs, muscular growth, facial and axillary hair, aggressiveness, low-pitched voice, spermatogenesis, male sexual behaviour (libido) and anabolic effects on protein and carbohydrate metabolism.

**Ovary:** in the abdomen; one ovum per menstrual cycle. **Estrogen** from growing follicles stimulates female secondary sex organs, follicle development, female secondary sex characters (e.g. high-pitched voice), mammary gland development and female sexual behaviour. After ovulation the ruptured follicle becomes the **corpus luteum**, which secretes mainly **progesterone**: it supports pregnancy and stimulates formation of **alveoli** in the mammary glands and milk secretion.

(Blood glucose values in the graph and questions are illustrative typical values; normal ranges and the kidney threshold, often given as about 180 mg per dL, vary between people and laboratories.)`,
      [kt('Catecholamines', 'Adrenaline and noradrenaline from the adrenal medulla, the emergency hormones.'), kt('Corticoids', 'Steroid hormones of the adrenal cortex: glucocorticoids, mineralocorticoids and small amounts of androgens.'), kt('Glycogenolysis', 'Breakdown of glycogen to glucose, stimulated by glucagon and adrenaline.'), kt('Glycogenesis', 'Conversion of glucose to glycogen, stimulated by insulin.'), kt('Leydig cells', 'Interstitial cells of the testis that secrete androgens.')],
      V.glucose,
      [1],
      [table(['Islet cell', 'Hormone', 'Effect on blood glucose'], [['α', 'Glucagon', 'Raises (hyperglycaemic)'], ['β', 'Insulin', 'Lowers (hypoglycaemic)']], 'Table of α and β cell hormones and their effects')],
    ),
    sec(
      '5. Hormones of the heart, kidney and gastrointestinal tract',
      `Hormones are also secreted by some tissues that are not endocrine glands.
- **Heart:** the **atrial wall** secretes **atrial natriuretic factor (ANF)**, which **decreases blood pressure**: when pressure rises, ANF dilates blood vessels.
- **Kidney:** **juxtaglomerular cells** produce the peptide **erythropoietin**, which stimulates **erythropoiesis** (formation of RBCs).
- **Gastrointestinal tract:** endocrine cells secrete four major peptide hormones. **Gastrin** acts on gastric glands, stimulating secretion of **HCl and pepsinogen**. **Secretin** acts on the exocrine pancreas, stimulating secretion of **water and bicarbonate ions**. **Cholecystokinin (CCK)** acts on the **pancreas and gall bladder**, stimulating release of pancreatic enzymes and bile juice. **Gastric inhibitory peptide (GIP)** **inhibits gastric secretion and motility**.
- Several other non-endocrine tissues secrete hormones called **growth factors**, essential for normal growth, repair and regeneration.`,
      [kt('Atrial natriuretic factor', 'A hormone of the atrial wall that dilates blood vessels and lowers blood pressure.'), kt('Erythropoietin', 'A kidney hormone from juxtaglomerular cells that stimulates red blood cell formation.'), kt('Secretin', 'A gut hormone that makes the pancreas secrete water and bicarbonate ions.')],
      table(['Hormone', 'Source', 'Target and action'], [['ANF', 'Atrial wall', 'Blood vessels: dilation, lower blood pressure'], ['Erythropoietin', 'Juxtaglomerular cells', 'Bone marrow: RBC formation'], ['Gastrin', 'Stomach', 'Gastric glands: HCl, pepsinogen'], ['Secretin', 'Intestine', 'Pancreas: water, bicarbonate'], ['CCK', 'Intestine', 'Pancreas and gall bladder: enzymes, bile'], ['GIP', 'Intestine', 'Stomach: inhibits secretion and motility']], 'Table of hormones of the heart, kidney and gut'),
      [1],
    ),
    sec(
      '6. Mechanism of hormone action',
      `Hormones act on target tissues by binding to specific proteins called **hormone receptors**, present only in the target tissues.
- **Membrane-bound receptors** lie on the cell membrane; **intracellular receptors** lie inside the cell, mostly in the nucleus (**nuclear receptors**).
- Binding forms a **hormone–receptor complex**; each receptor is **specific** to one hormone. The complex brings about biochemical changes that regulate the metabolism and functions of the target tissue.

**Chemical classes of hormones:**
1. **Peptide, polypeptide and protein hormones** — insulin, glucagon, pituitary and hypothalamic hormones.
2. **Steroids** — cortisol, testosterone, estradiol, progesterone.
3. **Iodothyronines** — thyroid hormones.
4. **Amino-acid derivatives** — epinephrine.

**Two pathways:**
- Hormones that bind **membrane-bound receptors** normally do **not enter** the target cell; they generate **second messengers** (e.g. **cyclic AMP, IP3, calcium ions**), which regulate cellular metabolism. Such cascades amplify the signal (an illustrative model: 1 × 100 × 50 = 5000 product molecules from one hormone molecule), which is one reason trace amounts suffice.
- Hormones that bind **intracellular receptors** (steroids, iodothyronines) mostly regulate **gene expression** or chromosome function through the hormone–receptor complex interacting with the **genome**.

The cumulative biochemical actions produce physiological and developmental effects.`,
      [kt('Hormone receptor', 'A specific protein in a target tissue to which a hormone binds.'), kt('Second messenger', 'A molecule such as cyclic AMP, IP3 or calcium ions generated inside a cell when a hormone binds a membrane receptor.'), kt('Hormone–receptor complex', 'The structure formed when a hormone binds its receptor; it triggers changes in the target cell.')],
      V.action,
      [2],
    ),
    sec(
      '7. Disorders of the endocrine system',
      `Both **excess** and **deficiency** of a hormone cause disease:
- **Pituitary dwarfism** — low GH in childhood; stunted growth.
- **Gigantism** — excess GH in childhood; **acromegaly** — excess GH in adults.
- **Diabetes insipidus** — impaired ADH; large volumes of urine, dehydration.
- **Goitre and cretinism** — hypothyroidism (often iodine deficiency); **exophthalmic goitre (Graves’ disease)** — hyperthyroidism.
- **Addison’s disease** — underproduction of adrenal cortex hormones; acute weakness and fatigue.
- **Diabetes mellitus** — prolonged hyperglycaemia from lack of insulin action; glucose in urine, ketone bodies; treated with insulin.`,
      [kt('Addison’s disease', 'Acute weakness and fatigue from underproduction of adrenal cortex hormones.'), kt('Diabetes mellitus', 'Prolonged hyperglycaemia with glucose in the urine and ketone bodies, from lack of insulin action.'), kt('Ketone bodies', 'Harmful compounds formed in untreated diabetes mellitus.')],
      table(['Disorder', 'Too much or too little', 'Hormone'], [['Dwarfism', 'Too little', 'GH (child)'], ['Gigantism, acromegaly', 'Too much', 'GH (child, adult)'], ['Diabetes insipidus', 'Too little', 'ADH'], ['Goitre, cretinism', 'Too little', 'Thyroid hormones'], ['Graves’ disease', 'Too much', 'Thyroid hormones'], ['Addison’s disease', 'Too little', 'Cortex hormones'], ['Diabetes mellitus', 'Too little effect', 'Insulin']], 'Table of endocrine disorders by hormone excess or deficiency'),
      [2],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying oxytocin and vasopressin are made in the posterior pituitary (they are made in the hypothalamus and only stored and released there).
- Confusing diabetes insipidus (ADH) with diabetes mellitus (insulin).
- Writing glycogenesis for glucagon or glycogenolysis for insulin.
- Calling PTH hypocalcaemic (it raises blood calcium).
- Listing the cortex zones in the wrong order (outside to inside: glomerulosa, fasciculata, reticularis).
- Saying steroid hormones act through cyclic AMP (they bind intracellular receptors and change gene expression).

**How marks are usually awarded**
- 1-mark items: name a hormone, gland, cell type, zone or disorder.
- 2–3-mark answers: hypothalamic control of the pituitary; thyroid functions; emergency hormones; insulin and glucagon; gut hormones; two kinds of diabetes.
- 5-mark answers: the pituitary; thyroid and parathyroid; adrenal and pancreas; mechanism of hormone action.
- Case-based items: glucose tolerance data, iodine deficiency surveys, stress responses or receptor experiments, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define a hormone.', 'A non-nutrient chemical acting as an intercellular messenger, produced in trace amounts.', 'definition', 1),
    fc(2, 'Why are endocrine glands called ductless?', 'They have no ducts; hormones pass into the blood.', 'concept', 1),
    fc(3, 'Hypothalamic hormone that inhibits GH release?', 'Somatostatin.', 'fact', 1),
    fc(4, 'What does GnRH do?', 'Stimulates pituitary synthesis and release of gonadotrophins.', 'fact', 1),
    fc(5, 'How do hypothalamic hormones reach the anterior pituitary?', 'Through the hypophysial portal circulation.', 'concept', 1),
    fc(6, 'Six hormones of the pars distalis?', 'GH, PRL, TSH, ACTH, LH, FSH.', 'fact', 1),
    fc(7, 'Hormone of the pars intermedia?', 'MSH: regulates skin pigmentation through melanocytes.', 'fact', 1),
    fc(8, 'Where are oxytocin and vasopressin made?', 'In the hypothalamus; stored and released by the posterior pituitary.', 'fact', 1),
    fc(9, 'Two actions of oxytocin?', 'Uterine contraction at childbirth; milk ejection.', 'fact', 1),
    fc(10, 'Cause of diabetes insipidus?', 'Impaired synthesis or release of ADH.', 'concept', 1),
    fc(11, 'Excess GH in a child? In an adult?', 'Gigantism; acromegaly.', 'concept', 1),
    fc(12, 'Hormone of the pineal and its role?', 'Melatonin: regulates the 24-hour (diurnal) rhythm.', 'fact', 1),
    fc(13, 'Two hormones of thyroid follicular cells?', 'Thyroxine (T4) and triiodothyronine (T3).', 'fact', 1),
    fc(14, 'Thyroid hormone regulating blood calcium?', 'Thyrocalcitonin (TCT).', 'fact', 1),
    fc(15, 'Cause of goitre in hill areas?', 'Iodine deficiency causing hypothyroidism.', 'concept', 1),
    fc(16, 'Features of Graves’ disease?', 'Enlarged thyroid, protruding eyeballs, high BMR, weight loss.', 'fact', 1),
    fc(17, 'Three actions of PTH?', 'Bone resorption; renal calcium reabsorption; calcium absorption from food.', 'fact', 1),
    fc(18, 'Role of thymosins?', 'Differentiation of T-lymphocytes; promote antibody production.', 'fact', 1),
    fc(19, 'Why are adrenaline and noradrenaline emergency hormones?', 'Secreted rapidly in stress to prepare for fight or flight.', 'concept', 1),
    fc(20, 'Adrenal cortex zones, outside in?', 'Zona glomerulosa, zona fasciculata, zona reticularis.', 'fact', 1),
    fc(21, 'Main mineralocorticoid and its action?', 'Aldosterone: sodium and water reabsorption, potassium excretion.', 'fact', 1),
    fc(22, 'Cause of Addison’s disease?', 'Underproduction of adrenal cortex hormones.', 'fact', 2),
    fc(23, 'α and β cell hormones?', 'α: glucagon; β: insulin.', 'fact', 1),
    fc(24, 'Glucagon or insulin: glycogenolysis?', 'Glucagon (insulin stimulates glycogenesis).', 'concept', 1),
    fc(25, 'Source of testosterone?', 'Leydig (interstitial) cells of the testis.', 'fact', 1),
    fc(26, 'Main hormone of the corpus luteum?', 'Progesterone.', 'fact', 1),
    fc(27, 'ANF and erythropoietin?', 'ANF (atria) lowers blood pressure; erythropoietin (kidney) makes RBCs.', 'fact', 1),
    fc(28, 'Four gut hormones?', 'Gastrin, secretin, cholecystokinin, gastric inhibitory peptide.', 'fact', 1),
    fc(29, 'Three second messengers?', 'Cyclic AMP, IP3, calcium ions.', 'fact', 2),
    fc(30, 'How do steroid hormones act?', 'Bind intracellular receptors and regulate gene expression.', 'concept', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
